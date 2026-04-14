// LCRN-060 PoC: Cloudflare Worker JWT Authentication
// Validates Alpha concern: "JWT endpoints НЕ СУЩЕСТВУЮТ на static hosting"

import { sign, verify } from '@tsndr/cloudflare-worker-jwt'

// Environment variables needed:
// JWT_SECRET, HTPASSWD_DATA (base64 encoded htpasswd file)

const JWT_SECRET = 'your-secret-key' // TODO: Use environment variable
const HTPASSWD_DATA = 'ZnAzZF9hZG1pbjokMnkkMTAkLi4u' // Base64 htpasswd data

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://lucerna.folkup.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      // Authentication endpoints
      if (url.pathname === '/api/auth/login') {
        return await handleLogin(request, env, corsHeaders)
      }

      if (url.pathname === '/api/auth/verify') {
        return await handleVerify(request, env, corsHeaders)
      }

      if (url.pathname === '/api/auth/refresh') {
        return await handleRefresh(request, env, corsHeaders)
      }

      // Protected resource proxy
      if (url.pathname.startsWith('/search/')) {
        return await handleProtectedResource(request, env, corsHeaders)
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders })

    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  }
}

async function handleLogin(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders })
  }

  const body = await request.json()
  const { username, password } = body

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: 'Username and password required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }

  // Validate credentials against htpasswd data
  const isValid = await validateCredentials(username, password, env.HTPASSWD_DATA || HTPASSWD_DATA)

  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }

  // Generate JWT token
  const payload = {
    user: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 60) // 30 minutes
  }

  const token = await sign(payload, env.JWT_SECRET || JWT_SECRET)

  return new Response(
    JSON.stringify({
      token,
      user: username,
      expires: payload.exp,
      success: true
    }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=1800`
      }
    }
  )
}

async function handleVerify(request, env, corsHeaders) {
  const token = extractToken(request)

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'No token provided' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }

  try {
    const isValid = await verify(token, env.JWT_SECRET || JWT_SECRET)

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
      )
    }

    const payload = JSON.parse(atob(token.split('.')[1]))

    return new Response(
      JSON.stringify({
        valid: true,
        user: payload.user,
        expires: payload.exp
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Token verification failed' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }
}

async function handleRefresh(request, env, corsHeaders) {
  const token = extractToken(request)

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'No token provided' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }

  try {
    const isValid = await verify(token, env.JWT_SECRET || JWT_SECRET)

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
      )
    }

    const payload = JSON.parse(atob(token.split('.')[1]))

    // Check if token is within refresh window (last 5 minutes)
    const now = Math.floor(Date.now() / 1000)
    const timeToExpiry = payload.exp - now

    if (timeToExpiry > 300) { // More than 5 minutes left
      return new Response(
        JSON.stringify({ error: 'Token not eligible for refresh yet' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
      )
    }

    // Generate new token
    const newPayload = {
      user: payload.user,
      iat: now,
      exp: now + (30 * 60) // 30 minutes
    }

    const newToken = await sign(newPayload, env.JWT_SECRET || JWT_SECRET)

    return new Response(
      JSON.stringify({
        token: newToken,
        user: payload.user,
        expires: newPayload.exp,
        success: true
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Set-Cookie': `auth_token=${newToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=1800`
        }
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Token refresh failed' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }
}

async function handleProtectedResource(request, env, corsHeaders) {
  const token = extractToken(request)

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }

  try {
    const isValid = await verify(token, env.JWT_SECRET || JWT_SECRET)

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
      )
    }

    // Proxy to original nginx static files
    const originalUrl = request.url.replace('https://auth.lucerna.folkup.app', 'https://lucerna.folkup.app')
    const response = await fetch(originalUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })

    return new Response(response.body, {
      status: response.status,
      headers: { ...corsHeaders, ...Object.fromEntries(response.headers) }
    })

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Authentication verification failed' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )
  }
}

function extractToken(request) {
  // Try Authorization header first
  const authHeader = request.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Try cookie as fallback
  const cookies = request.headers.get('Cookie')
  if (cookies) {
    const match = cookies.match(/auth_token=([^;]+)/)
    if (match) {
      return match[1]
    }
  }

  return null
}

async function validateCredentials(username, password, htpasswdData) {
  try {
    // Decode base64 htpasswd data
    const htpasswdContent = atob(htpasswdData)
    const lines = htpasswdContent.split('\n').filter(line => line.trim())

    for (const line of lines) {
      const [user, hash] = line.split(':')
      if (user === username) {
        // For PoC: simplified bcrypt validation
        // In production: use proper bcrypt library
        return await bcryptValidate(password, hash)
      }
    }

    return false

  } catch (error) {
    console.error('Credential validation error:', error)
    return false
  }
}

async function bcryptValidate(password, hash) {
  // PoC: Simplified validation - in production use proper bcrypt
  // This is just for testing the auth flow
  if (hash.startsWith('$2y$') || hash.startsWith('$2b$')) {
    // For PoC, accept any password for testing
    // TODO: Implement proper bcrypt validation
    return true
  }
  return false
}