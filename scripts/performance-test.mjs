#!/usr/bin/env node

/**
 * Performance Testing Suite for Lucerna
 * Measures Core Web Vitals with focus on LCP optimization
 *
 * Usage: npm run perf-test [URL]
 * Example: npm run perf-test http://localhost:1313/investigations/oxymiron-organizatsiya/
 */

import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const config = {
  // Default test URL (local Hugo server)
  defaultUrl: 'http://localhost:1313/investigations/oxymiron-organizatsiya/',

  // Performance thresholds
  thresholds: {
    lcp: 2500, // ms - Good LCP threshold
    fid: 100,  // ms - Good FID threshold
    cls: 0.1,  // Good CLS threshold
    performance: 90, // Lighthouse performance score
  },

  // Lighthouse options
  lighthouse: {
    onlyCategories: ['performance'],
    settings: {
      onlyAudits: [
        'first-contentful-paint',
        'largest-contentful-paint',
        'first-meaningful-paint',
        'speed-index',
        'total-blocking-time',
        'cumulative-layout-shift',
      ],
    },
  }
};

/**
 * Measure Core Web Vitals using Puppeteer
 */
async function measureWebVitals(url) {
  console.log(`📊 Measuring Core Web Vitals for: ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Enable performance monitoring
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();

    // Navigate and wait for network idle
    console.log('🔄 Loading page...');
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Measure Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        let vitals = {};

        // LCP measurement
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = Math.round(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS measurement
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          vitals.cls = Math.round(clsValue * 1000) / 1000;
        }).observe({ type: 'layout-shift', buffered: true });

        // FCP from Navigation API
        const navEntry = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');

        vitals.fcp = Math.round(paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0);
        vitals.domContentLoaded = Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
        vitals.loadComplete = Math.round(navEntry.loadEventEnd - navEntry.loadEventStart);

        // Check for multimedia elements that could affect LCP
        const images = document.querySelectorAll('img').length;
        const iframes = document.querySelectorAll('iframe').length;
        const videos = document.querySelectorAll('video').length;
        const youtubeEmbeds = document.querySelectorAll('[src*="youtube.com"]').length;

        vitals.multimedia = {
          images,
          iframes,
          videos,
          youtubeEmbeds,
          totalElements: images + iframes + videos
        };

        setTimeout(() => resolve(vitals), 2000);
      });
    });

    // Get coverage data
    const jsCoverage = await page.coverage.stopJSCoverage();
    const cssCoverage = await page.coverage.stopCSSCoverage();

    // Calculate unused code percentage
    const totalJSBytes = jsCoverage.reduce((acc, entry) => acc + entry.text.length, 0);
    const usedJSBytes = jsCoverage.reduce((acc, entry) => {
      const used = entry.ranges.reduce((acc, range) => acc + (range.end - range.start), 0);
      return acc + used;
    }, 0);

    const jsUnusedPercent = totalJSBytes > 0 ? ((totalJSBytes - usedJSBytes) / totalJSBytes * 100) : 0;

    return {
      ...webVitals,
      coverage: {
        jsUnusedPercent: Math.round(jsUnusedPercent * 10) / 10,
        totalJSBytes,
        usedJSBytes
      }
    };

  } finally {
    await browser.close();
  }
}

/**
 * Run Lighthouse audit
 */
async function runLighthouseAudit(url) {
  console.log('🔍 Running Lighthouse audit...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const { lhr } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: 'json',
      ...config.lighthouse
    });

    return {
      performance: lhr.categories.performance.score * 100,
      metrics: {
        fcp: lhr.audits['first-contentful-paint'].numericValue,
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        fmp: lhr.audits['first-meaningful-paint'].numericValue,
        si: lhr.audits['speed-index'].numericValue,
        tbt: lhr.audits['total-blocking-time'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
      },
      opportunities: lhr.audits['largest-contentful-paint-element']?.details?.items || []
    };

  } finally {
    await browser.close();
  }
}

/**
 * Format and display results
 */
function formatResults(webVitals, lighthouse) {
  const results = {
    timestamp: new Date().toISOString(),
    webVitals,
    lighthouse,
    assessment: {}
  };

  // Assess performance against thresholds
  results.assessment = {
    lcp: webVitals.lcp <= config.thresholds.lcp ? 'PASS' : 'FAIL',
    cls: webVitals.cls <= config.thresholds.cls ? 'PASS' : 'FAIL',
    performance: lighthouse.performance >= config.thresholds.performance ? 'PASS' : 'FAIL',
    overall: 'CALCULATING...'
  };

  const failCount = Object.values(results.assessment).filter(v => v === 'FAIL').length;
  results.assessment.overall = failCount === 0 ? 'PASS' : `FAIL (${failCount} issues)`;

  return results;
}

/**
 * Main performance test function
 */
async function runPerformanceTest() {
  const url = process.argv[2] || config.defaultUrl;

  console.log('🚀 Starting Performance Test Suite');
  console.log(`📍 Target URL: ${url}`);
  console.log('=' .repeat(60));

  try {
    // Run tests in parallel
    const [webVitals, lighthouse] = await Promise.all([
      measureWebVitals(url),
      runLighthouseAudit(url)
    ]);

    const results = formatResults(webVitals, lighthouse);

    // Display results
    console.log('\n📊 CORE WEB VITALS');
    console.log(`LCP: ${webVitals.lcp}ms ${results.assessment.lcp === 'PASS' ? '✅' : '❌'} (threshold: ${config.thresholds.lcp}ms)`);
    console.log(`FCP: ${webVitals.fcp}ms`);
    console.log(`CLS: ${webVitals.cls} ${results.assessment.cls === 'PASS' ? '✅' : '❌'} (threshold: ${config.thresholds.cls})`);
    console.log(`DOM Content Loaded: ${webVitals.domContentLoaded}ms`);
    console.log(`Load Complete: ${webVitals.loadComplete}ms`);

    console.log('\n🎬 MULTIMEDIA ELEMENTS');
    console.log(`Images: ${webVitals.multimedia.images}`);
    console.log(`iFrames: ${webVitals.multimedia.iframes}`);
    console.log(`YouTube embeds: ${webVitals.multimedia.youtubeEmbeds}`);
    console.log(`Total multimedia: ${webVitals.multimedia.totalElements}`);

    console.log('\n🔍 LIGHTHOUSE AUDIT');
    console.log(`Performance Score: ${lighthouse.performance}/100 ${results.assessment.performance === 'PASS' ? '✅' : '❌'}`);
    console.log(`Speed Index: ${Math.round(lighthouse.metrics.si)}ms`);
    console.log(`Total Blocking Time: ${Math.round(lighthouse.metrics.tbt)}ms`);

    console.log('\n💾 CODE COVERAGE');
    console.log(`Unused JS: ${webVitals.coverage.jsUnusedPercent}%`);

    if (lighthouse.opportunities.length > 0) {
      console.log('\n🎯 LCP OPPORTUNITIES');
      lighthouse.opportunities.forEach((opp, i) => {
        console.log(`${i + 1}. ${opp.node?.nodeLabel || 'Element'}: ${opp.node?.snippet || 'N/A'}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🏁 OVERALL ASSESSMENT: ${results.assessment.overall}`);

    // Save results to file
    const reportPath = resolve(__dirname, '../_meta/performance-report.json');
    await writeFile(reportPath, JSON.stringify(results, null, 2));
    console.log(`📋 Report saved to: ${reportPath}`);

    // Exit with appropriate code
    process.exit(results.assessment.overall.includes('FAIL') ? 1 : 0);

  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceTest();
}