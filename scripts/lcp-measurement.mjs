#!/usr/bin/env node

/**
 * LCP-focused measurement tool for facade pattern verification
 * Specifically designed to verify YouTube and audio facade performance impact
 *
 * Usage: npm run lcp-check [URL]
 */

import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Measure LCP with detailed element analysis
 */
async function measureLCPDetails(url) {
  console.log(`🔍 Analyzing LCP for facade pattern verification: ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Collect performance entries
    await page.evaluateOnNewDocument(() => {
      window.lcpData = [];
      window.resourceLoadTimes = [];

      // Track LCP candidates
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          window.lcpData.push({
            startTime: entry.startTime,
            size: entry.size,
            element: entry.element?.tagName || 'unknown',
            id: entry.element?.id || '',
            url: entry.url || '',
            loadTime: entry.loadTime || 0
          });
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // Track resource loading
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('youtube.com') ||
              entry.name.includes('spotify.com') ||
              entry.name.includes('img.youtube.com')) {
            window.resourceLoadTimes.push({
              name: entry.name,
              startTime: entry.startTime,
              responseEnd: entry.responseEnd,
              duration: entry.duration,
              initiatorType: entry.initiatorType
            });
          }
        });
      }).observe({ type: 'resource', buffered: true });
    });

    // Load page with network monitoring
    const response = await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for LCP to stabilize
    await page.waitForTimeout(3000);

    // Extract facade-specific metrics
    const metrics = await page.evaluate(() => {
      // Get LCP data
      const lcpEntries = window.lcpData || [];
      const finalLCP = lcpEntries[lcpEntries.length - 1];

      // Get multimedia facades info
      const youtubeFacades = document.querySelectorAll('.youtube-facade');
      const audioFacades = document.querySelectorAll('.audio-preview');
      const loadedIframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="spotify.com"]');

      // Check for external resource blocking
      const externalResources = window.resourceLoadTimes || [];

      // Analyze facade implementations
      const facadeAnalysis = {
        youtubeFacades: youtubeFacades.length,
        audioFacades: audioFacades.length,
        loadedIframes: loadedIframes.length,
        facadeClickHandlers: document.querySelectorAll('[data-video-id], .youtube-facade__play-button').length,
        preloadedThumbnails: document.querySelectorAll('img[src*="img.youtube.com"]').length
      };

      return {
        lcp: {
          time: finalLCP?.startTime || 0,
          element: finalLCP?.element || 'unknown',
          size: finalLCP?.size || 0,
          allCandidates: lcpEntries.length
        },
        facades: facadeAnalysis,
        externalResources: externalResources.length,
        resourceDetails: externalResources,
        timestamp: Date.now()
      };
    });

    // Check if facade pattern is working (no iframes loaded on initial load)
    const facadeEffectiveness = {
      youtubeFacadesPresent: metrics.facades.youtubeFacades > 0,
      iframesBlocked: metrics.facades.loadedIframes === 0,
      thumbnailsOptimized: metrics.facades.preloadedThumbnails <= metrics.facades.youtubeFacades,
      externalRequestsMinimal: metrics.externalResources < 5
    };

    return {
      ...metrics,
      facadeEffectiveness,
      assessment: assessFacadePerformance(metrics, facadeEffectiveness)
    };

  } finally {
    await browser.close();
  }
}

/**
 * Assess facade pattern performance
 */
function assessFacadePerformance(metrics, effectiveness) {
  const issues = [];
  const successes = [];

  // LCP assessment
  if (metrics.lcp.time > 2500) {
    issues.push(`LCP too slow: ${Math.round(metrics.lcp.time)}ms > 2500ms`);
  } else {
    successes.push(`LCP good: ${Math.round(metrics.lcp.time)}ms`);
  }

  // Facade pattern assessment
  if (!effectiveness.iframesBlocked) {
    issues.push(`Facade pattern FAIL: ${metrics.facades.loadedIframes} iframes loaded on page load`);
  } else {
    successes.push('Facade pattern SUCCESS: No iframes loaded initially');
  }

  // External resources assessment
  if (metrics.externalResources > 10) {
    issues.push(`Too many external resources: ${metrics.externalResources}`);
  } else {
    successes.push(`External resources optimized: ${metrics.externalResources}`);
  }

  // Overall verdict
  const verdict = issues.length === 0 ? 'PASS' : 'FAIL';

  return {
    verdict,
    issues,
    successes,
    score: Math.max(0, 100 - (issues.length * 25))
  };
}

/**
 * Test facade pattern specifically
 */
async function testFacadePattern(url) {
  console.log('🎭 Testing Facade Pattern Implementation');
  console.log('=' .repeat(50));

  try {
    const results = await measureLCPDetails(url);

    // Display results
    console.log('\n📊 LCP ANALYSIS');
    console.log(`LCP Time: ${Math.round(results.lcp.time)}ms`);
    console.log(`LCP Element: ${results.lcp.element}`);
    console.log(`LCP Candidates: ${results.lcp.allCandidates}`);

    console.log('\n🎭 FACADE EFFECTIVENESS');
    console.log(`YouTube Facades: ${results.facades.youtubeFacades}`);
    console.log(`Audio Previews: ${results.facades.audioFacades}`);
    console.log(`Loaded iFrames: ${results.facades.loadedIframes} ${results.facadeEffectiveness.iframesBlocked ? '✅' : '❌'}`);
    console.log(`Thumbnail Preloads: ${results.facades.preloadedThumbnails}`);

    console.log('\n🌐 EXTERNAL RESOURCES');
    console.log(`Total External: ${results.externalResources}`);
    if (results.resourceDetails.length > 0) {
      console.log('Resource details:');
      results.resourceDetails.forEach((resource, i) => {
        console.log(`  ${i + 1}. ${resource.name.substring(0, 60)}... (${Math.round(resource.duration)}ms)`);
      });
    }

    console.log('\n📋 ASSESSMENT');
    console.log(`Verdict: ${results.assessment.verdict} (Score: ${results.assessment.score}/100)`);

    if (results.assessment.successes.length > 0) {
      console.log('\n✅ Successes:');
      results.assessment.successes.forEach(success => {
        console.log(`  • ${success}`);
      });
    }

    if (results.assessment.issues.length > 0) {
      console.log('\n❌ Issues:');
      results.assessment.issues.forEach(issue => {
        console.log(`  • ${issue}`);
      });
    }

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS');
    if (results.facades.loadedIframes > 0) {
      console.log('  • Ensure facade pattern blocks iframe loading until user interaction');
    }
    if (results.lcp.time > 2500) {
      console.log('  • Optimize LCP element loading');
      console.log('  • Consider facade pattern for above-the-fold multimedia');
    }
    if (results.externalResources > 10) {
      console.log('  • Reduce external resource dependencies');
      console.log('  • Implement more facade patterns for third-party content');
    }
    if (results.facades.youtubeFacades === 0 && results.facades.audioFacades === 0) {
      console.log('  • No facade patterns detected - consider implementing for multimedia content');
    }

    console.log('\n' + '='.repeat(50));
    console.log(`🏁 FACADE PATTERN: ${results.assessment.verdict}`);

    // Save detailed report
    const reportPath = resolve(__dirname, '../_meta/lcp-facade-report.json');
    await writeFile(reportPath, JSON.stringify(results, null, 2));
    console.log(`📋 Detailed report saved to: ${reportPath}`);

    return results.assessment.verdict === 'PASS';

  } catch (error) {
    console.error('❌ LCP measurement failed:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  const url = process.argv[2] || 'http://localhost:1313/investigations/oxymiron-organizatsiya/';
  const success = await testFacadePattern(url);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}