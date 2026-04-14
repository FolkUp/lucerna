#!/bin/bash

# setup-staging-environment.sh - FlightPath3D Staging Environment Setup
# Created: 2026-04-13
# Purpose: Automated staging environment preparation for deployment testing
# Compliance: Banking-level isolation and security standards

set -euo pipefail

# Configuration
STAGING_ROOT="${STAGING_ROOT:-/var/www/staging}"
STAGING_DOMAIN="${STAGING_DOMAIN:-staging-lucerna.folkup.app}"
PRODUCTION_ROOT="${PRODUCTION_ROOT:-/var/www/flightpath3d}"
NGINX_STAGING_CONFIG="${NGINX_STAGING_CONFIG:-/etc/nginx/sites-available/staging-flightpath3d}"
SSL_STAGING_DIR="${SSL_STAGING_DIR:-/etc/ssl/staging/flightpath3d}"
STAGING_LOG="${STAGING_LOG:-/var/log/flightpath3d/staging-setup.log}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/flightpath3d/staging}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging
log_staging() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
    local entry="$timestamp [STAGING] [$level] $message"

    echo "$entry" | tee -a "$STAGING_LOG"

    case "$level" in
        "PASS") echo -e "${GREEN}✅ $message${NC}" ;;
        "FAIL") echo -e "${RED}❌ $message${NC}" ;;
        "WARN") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Pre-flight checks
preflight_checks() {
    log_staging "INFO" "Running pre-flight checks"

    # Check if running as root/sudo
    if [[ $EUID -ne 0 ]]; then
        log_staging "FAIL" "This script must be run as root or with sudo"
        return 1
    fi

    # Check required commands
    local required_commands=("nginx" "openssl" "certbot" "rsync" "git")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            log_staging "FAIL" "Required command not found: $cmd"
            return 1
        fi
    done

    # Check disk space (minimum 2GB for staging)
    local available_space=$(df "$STAGING_ROOT" --output=avail 2>/dev/null | tail -1 || echo "0")
    if [[ $available_space -lt 2000000 ]]; then
        log_staging "FAIL" "Insufficient disk space. Available: ${available_space}KB, Required: 2GB"
        return 1
    fi

    log_staging "PASS" "Pre-flight checks completed"
    return 0
}

# Create staging directory structure
setup_staging_structure() {
    log_staging "INFO" "Setting up staging directory structure"

    # Create main staging directories
    local staging_dirs=(
        "$STAGING_ROOT/flightpath3d"
        "$STAGING_ROOT/flightpath3d/releases"
        "$STAGING_ROOT/flightpath3d/shared"
        "$STAGING_ROOT/flightpath3d/shared/config"
        "$STAGING_ROOT/flightpath3d/shared/logs"
        "$STAGING_ROOT/flightpath3d/shared/uploads"
        "$STAGING_ROOT/flightpath3d/backups"
        "$BACKUP_DIR"
        "$(dirname "$STAGING_LOG")"
    )

    for dir in "${staging_dirs[@]}"; do
        if ! mkdir -p "$dir"; then
            log_staging "FAIL" "Failed to create directory: $dir"
            return 1
        fi
        chmod 755 "$dir"
    done

    # Set appropriate ownership
    chown -R www-data:www-data "$STAGING_ROOT/flightpath3d"
    chown -R www-data:www-data "$BACKUP_DIR"

    log_staging "PASS" "Staging directory structure created"
    return 0
}

# Setup staging SSL certificates
setup_staging_ssl() {
    log_staging "INFO" "Setting up staging SSL certificates"

    mkdir -p "$SSL_STAGING_DIR"

    # Check if staging certificates already exist
    if [[ -f "$SSL_STAGING_DIR/cert.pem" && -f "$SSL_STAGING_DIR/privkey.pem" ]]; then
        log_staging "INFO" "Staging SSL certificates already exist"
        return 0
    fi

    # Generate self-signed certificates for staging
    log_staging "INFO" "Generating self-signed SSL certificates for staging"

    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$SSL_STAGING_DIR/privkey.pem" \
        -out "$SSL_STAGING_DIR/cert.pem" \
        -subj "/C=US/ST=Test/L=Test/O=FolkUp Staging/OU=IT/CN=$STAGING_DOMAIN" \
        2>/dev/null

    if [[ $? -ne 0 ]]; then
        log_staging "FAIL" "Failed to generate SSL certificates"
        return 1
    fi

    # Set appropriate permissions
    chmod 600 "$SSL_STAGING_DIR/privkey.pem"
    chmod 644 "$SSL_STAGING_DIR/cert.pem"
    chown www-data:www-data "$SSL_STAGING_DIR"/*.pem

    log_staging "PASS" "Staging SSL certificates configured"
    return 0
}

# Configure nginx for staging
setup_staging_nginx() {
    log_staging "INFO" "Configuring nginx for staging"

    # Backup existing staging config if it exists
    if [[ -f "$NGINX_STAGING_CONFIG" ]]; then
        cp "$NGINX_STAGING_CONFIG" "$NGINX_STAGING_CONFIG.backup.$(date +%s)"
    fi

    # Create staging nginx configuration
    cat > "$NGINX_STAGING_CONFIG" << EOF
server {
    listen 80;
    server_name $STAGING_DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $STAGING_DOMAIN;

    # SSL Configuration
    ssl_certificate $SSL_STAGING_DIR/cert.pem;
    ssl_certificate_key $SSL_STAGING_DIR/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';" always;

    # Staging Banner
    add_header X-Environment "STAGING" always;
    add_header X-Warning "This is a staging environment - not for production use" always;

    # Root directory
    root $STAGING_ROOT/flightpath3d/current/public;
    index index.html index.htm;

    # Rate limiting for staging
    limit_req_zone \$binary_remote_addr zone=staging_limit:10m rate=10r/m;
    limit_req zone=staging_limit burst=20 nodelay;

    # FlightPath3D search location with Basic Auth
    location /search/flightpath3d/ {
        auth_basic "FlightPath3D Staging Access";
        auth_basic_user_file $STAGING_ROOT/flightpath3d/shared/config/.htpasswd;

        # CORS for staging
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

        # Handle OPTIONS requests
        if (\$request_method = 'OPTIONS') {
            return 204;
        }

        try_files \$uri \$uri/ =404;
    }

    # Main location block
    location / {
        try_files \$uri \$uri/ =404;

        # Cache static assets
        location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1h;
            add_header Cache-Control "public, immutable";
        }
    }

    # Security: Block access to sensitive files
    location ~ /\\. {
        deny all;
    }

    location ~ \\.(yaml|yml|json|md)$ {
        deny all;
    }

    # Logging
    access_log /var/log/nginx/staging-flightpath3d-access.log;
    error_log /var/log/nginx/staging-flightpath3d-error.log;
}
EOF

    # Test nginx configuration
    if ! nginx -t 2>/dev/null; then
        log_staging "FAIL" "Invalid nginx configuration"
        return 1
    fi

    # Enable staging site
    if [[ ! -L "/etc/nginx/sites-enabled/staging-flightpath3d" ]]; then
        ln -sf "$NGINX_STAGING_CONFIG" "/etc/nginx/sites-enabled/staging-flightpath3d"
    fi

    log_staging "PASS" "Nginx staging configuration completed"
    return 0
}

# Setup staging authentication
setup_staging_auth() {
    log_staging "INFO" "Setting up staging authentication"

    local htpasswd_file="$STAGING_ROOT/flightpath3d/shared/config/.htpasswd"
    local staging_username="${STAGING_USERNAME:-staging_user}"
    local staging_password

    # Generate secure staging password
    staging_password=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-20)

    # Create htpasswd file
    if ! htpasswd -cb "$htpasswd_file" "$staging_username" "$staging_password" 2>/dev/null; then
        log_staging "FAIL" "Failed to create staging auth file"
        return 1
    fi

    # Set secure permissions
    chmod 600 "$htpasswd_file"
    chown www-data:www-data "$htpasswd_file"

    # Save credentials securely
    local credentials_file="$STAGING_ROOT/flightpath3d/shared/config/staging-credentials.txt"
    cat > "$credentials_file" << EOF
# FlightPath3D Staging Credentials
# Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')

Username: $staging_username
Password: $staging_password
Domain: $STAGING_DOMAIN
Auth URL: https://$STAGING_DOMAIN/search/flightpath3d/

# IMPORTANT: This file contains sensitive credentials
# Store securely and remove after noting credentials
EOF

    chmod 600 "$credentials_file"
    chown www-data:www-data "$credentials_file"

    log_staging "PASS" "Staging authentication configured"
    log_staging "INFO" "Staging credentials saved to: $credentials_file"

    return 0
}

# Create staging environment variables
setup_staging_env() {
    log_staging "INFO" "Setting up staging environment variables"

    local env_file="$STAGING_ROOT/flightpath3d/shared/config/.env"

    cat > "$env_file" << EOF
# FlightPath3D Staging Environment Configuration
# Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')

# Environment
NODE_ENV=staging
STAGING=true
DEBUG=true

# Paths
STAGING_ROOT=$STAGING_ROOT
CURRENT_RELEASE_DIR=$STAGING_ROOT/flightpath3d/current
SHARED_DIR=$STAGING_ROOT/flightpath3d/shared
BACKUP_DIR=$BACKUP_DIR

# Domain and SSL
STAGING_DOMAIN=$STAGING_DOMAIN
SSL_CERT_PATH=$SSL_STAGING_DIR/cert.pem
SSL_KEY_PATH=$SSL_STAGING_DIR/privkey.pem

# Authentication
HTPASSWD_FILE=$STAGING_ROOT/flightpath3d/shared/config/.htpasswd

# Logging
LOG_LEVEL=debug
ACCESS_LOG=/var/log/nginx/staging-flightpath3d-access.log
ERROR_LOG=/var/log/nginx/staging-flightpath3d-error.log

# Security
STAGING_MODE=true
ALLOW_STAGING_ACCESS=true
SECURITY_HEADERS=true

# FlightPath3D specific
DOSSIERS_PATH=$STAGING_ROOT/flightpath3d/current/dossiers
SEARCH_INDEX_PATH=$STAGING_ROOT/flightpath3d/current/public/search
PII_SCANNER_ENABLED=true
INTEGRITY_MONITORING=true
EOF

    chmod 600 "$env_file"
    chown www-data:www-data "$env_file"

    log_staging "PASS" "Staging environment variables configured"
    return 0
}

# Setup staging monitoring
setup_staging_monitoring() {
    log_staging "INFO" "Setting up staging monitoring"

    # Create staging health check endpoint
    local health_check="$STAGING_ROOT/flightpath3d/shared/health-check.html"

    cat > "$health_check" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlightPath3D Staging Health Check</title>
    <style>
        body {
            font-family: monospace;
            margin: 2rem;
            background: #f5f5f5;
        }
        .status { padding: 1rem; margin: 1rem 0; border-radius: 4px; }
        .healthy { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
    </style>
</head>
<body>
    <h1>🏥 FlightPath3D Staging Health Check</h1>

    <div class="status healthy">
        <h2>✅ Staging Environment Active</h2>
        <p>Domain: $STAGING_DOMAIN</p>
        <p>Environment: STAGING</p>
        <p>Check Time: <span id="checkTime"></span></p>
    </div>

    <div class="status warning">
        <h2>⚠️ Staging Environment Notice</h2>
        <p>This is a staging environment for testing purposes only.</p>
        <p>Data may be reset without notice.</p>
        <p>Not for production use.</p>
    </div>

    <script>
        document.getElementById('checkTime').textContent = new Date().toISOString();
    </script>
</body>
</html>
EOF

    chmod 644 "$health_check"
    chown www-data:www-data "$health_check"

    # Create monitoring script
    local monitor_script="$STAGING_ROOT/flightpath3d/shared/staging-monitor.sh"

    cat > "$monitor_script" << 'EOF'
#!/bin/bash
# Staging environment monitoring script

STAGING_DOMAIN="$1"
LOG_FILE="/var/log/flightpath3d/staging-monitor.log"

check_staging_health() {
    local timestamp=$(date -u '+%Y-%m-%d %H:%M:%S UTC')

    # Check HTTPS response
    local http_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
        "https://$STAGING_DOMAIN/health-check.html" || echo "000")

    # Check SSL certificate
    local ssl_status=$(echo | openssl s_client -connect "$STAGING_DOMAIN:443" \
        -servername "$STAGING_DOMAIN" 2>/dev/null | grep -q "Verify return code: 18" && echo "self-signed" || echo "error")

    # Log results
    echo "$timestamp [MONITOR] HTTP: $http_status, SSL: $ssl_status" >> "$LOG_FILE"

    if [[ "$http_status" == "200" ]]; then
        echo "✅ Staging environment healthy"
        return 0
    else
        echo "❌ Staging environment unhealthy (HTTP: $http_status)"
        return 1
    fi
}

check_staging_health
EOF

    chmod +x "$monitor_script"
    chown www-data:www-data "$monitor_script"

    log_staging "PASS" "Staging monitoring configured"
    return 0
}

# Reload nginx
reload_nginx() {
    log_staging "INFO" "Reloading nginx configuration"

    if systemctl reload nginx 2>/dev/null; then
        log_staging "PASS" "Nginx reloaded successfully"
        return 0
    else
        log_staging "FAIL" "Failed to reload nginx"
        return 1
    fi
}

# Generate staging summary
generate_staging_summary() {
    log_staging "INFO" "Generating staging setup summary"

    local summary_file="$STAGING_ROOT/flightpath3d/STAGING-SETUP-SUMMARY.md"

    cat > "$summary_file" << EOF
# FlightPath3D Staging Environment Setup

**Setup Date:** $(date -u '+%Y-%m-%d %H:%M:%S UTC')
**Environment:** STAGING

## Configuration

- **Domain:** $STAGING_DOMAIN
- **Root Directory:** $STAGING_ROOT/flightpath3d
- **SSL Certificates:** $SSL_STAGING_DIR (self-signed)
- **Auth Config:** $STAGING_ROOT/flightpath3d/shared/config/.htpasswd
- **Environment Variables:** $STAGING_ROOT/flightpath3d/shared/config/.env

## Access Information

- **Staging URL:** https://$STAGING_DOMAIN
- **Health Check:** https://$STAGING_DOMAIN/health-check.html
- **FlightPath3D Search:** https://$STAGING_DOMAIN/search/flightpath3d/

## Authentication

Staging credentials are available in:
\`$STAGING_ROOT/flightpath3d/shared/config/staging-credentials.txt\`

## Important Notes

- This is a STAGING environment - not for production use
- SSL certificates are self-signed (browser warnings expected)
- Data may be reset without notice during testing
- Rate limiting is more relaxed than production

## Next Steps

1. Deploy content using the automation pipeline
2. Run validation tests
3. Verify all functionality works as expected
4. Review logs for any issues

## Support Files

- Nginx Config: $NGINX_STAGING_CONFIG
- Monitor Script: $STAGING_ROOT/flightpath3d/shared/staging-monitor.sh
- Environment File: $STAGING_ROOT/flightpath3d/shared/config/.env
EOF

    chmod 644 "$summary_file"
    chown www-data:www-data "$summary_file"

    log_staging "PASS" "Staging setup summary created: $summary_file"
    return 0
}

# Main execution
main() {
    log_staging "INFO" "Starting FlightPath3D staging environment setup"

    # Create log directory
    mkdir -p "$(dirname "$STAGING_LOG")"

    # Run setup steps
    preflight_checks || exit 1
    setup_staging_structure || exit 1
    setup_staging_ssl || exit 1
    setup_staging_nginx || exit 1
    setup_staging_auth || exit 1
    setup_staging_env || exit 1
    setup_staging_monitoring || exit 1
    reload_nginx || exit 1
    generate_staging_summary || exit 1

    log_staging "PASS" "FlightPath3D staging environment setup completed successfully"
    echo -e "\n${GREEN}🎉 Staging environment ready!${NC}"
    echo -e "URL: ${BLUE}https://$STAGING_DOMAIN${NC}"
    echo -e "Credentials: ${YELLOW}$STAGING_ROOT/flightpath3d/shared/config/staging-credentials.txt${NC}"
    echo -e "Summary: ${BLUE}$STAGING_ROOT/flightpath3d/STAGING-SETUP-SUMMARY.md${NC}"

    return 0
}

# Help function
show_help() {
    cat << EOF
FlightPath3D Staging Environment Setup

Usage: $0 [options]

Options:
    --staging-root DIR      Staging root directory (default: /var/www/staging)
    --staging-domain DOMAIN Staging domain name (default: staging-lucerna.folkup.app)
    --staging-username USER Username for basic auth (default: staging_user)
    --help                  Show this help message

Environment Variables:
    STAGING_ROOT            Staging root directory
    STAGING_DOMAIN          Staging domain name
    STAGING_USERNAME        Basic auth username
    SSL_STAGING_DIR         SSL certificates directory
    BACKUP_DIR              Backup directory

Examples:
    $0                                          # Setup with defaults
    $0 --staging-domain test.example.com       # Custom domain
    $0 --staging-root /opt/staging              # Custom staging directory
EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --staging-root)
            STAGING_ROOT="$2"
            shift 2
            ;;
        --staging-domain)
            STAGING_DOMAIN="$2"
            shift 2
            ;;
        --staging-username)
            STAGING_USERNAME="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute main function
main "$@"