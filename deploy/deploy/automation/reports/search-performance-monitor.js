// FlightPath3D Search Performance Monitor
// Auto-injected during build process

(function() {
    'use strict';

    class SearchPerformanceMonitor {
        constructor() {
            this.queryTimes = [];
            this.slowQueries = [];
            this.noResultQueries = [];
            this.popularQueries = new Map();
            this.startTime = null;
        }

        startQuery(query) {
            this.startTime = performance.now();
            this.popularQueries.set(query, (this.popularQueries.get(query) || 0) + 1);
        }

        endQuery(query, resultCount) {
            if (!this.startTime) return;

            const duration = performance.now() - this.startTime;
            this.queryTimes.push(duration);

            // Track slow queries (>500ms)
            if (duration > 500) {
                this.slowQueries.push({ query, duration, timestamp: new Date().toISOString() });
            }

            // Track no-result queries
            if (resultCount === 0) {
                this.noResultQueries.push({ query, timestamp: new Date().toISOString() });
            }

            // Log performance data (development only)
            if (window.location.hostname === 'localhost' || window.location.hostname.includes('staging')) {
                console.log(`Search: "${query}" - ${Math.round(duration)}ms - ${resultCount} results`);
            }

            this.startTime = null;
        }

        getPerformanceReport() {
            const avgTime = this.queryTimes.length > 0 ?
                this.queryTimes.reduce((a, b) => a + b, 0) / this.queryTimes.length : 0;

            return {
                totalQueries: this.queryTimes.length,
                averageQueryTime: Math.round(avgTime),
                slowQueries: this.slowQueries.slice(-10), // Last 10 slow queries
                noResultQueries: this.noResultQueries.slice(-10),
                popularQueries: Array.from(this.popularQueries.entries())
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
            };
        }

        // Send analytics to server (if enabled)
        sendAnalytics() {
            const report = this.getPerformanceReport();

            // Only send if we have significant data
            if (report.totalQueries < 5) return;

            try {
                fetch('/api/search-analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(report)
                }).catch(() => {
                    // Silently fail if analytics endpoint unavailable
                });
            } catch (error) {
                // Silently fail
            }
        }
    }

    // Initialize monitor
    window.searchPerformanceMonitor = new SearchPerformanceMonitor();

    // Send analytics periodically
    setInterval(() => {
        if (window.searchPerformanceMonitor) {
            window.searchPerformanceMonitor.sendAnalytics();
        }
    }, 300000); // Every 5 minutes

    // Send on page unload
    window.addEventListener('beforeunload', () => {
        if (window.searchPerformanceMonitor) {
            window.searchPerformanceMonitor.sendAnalytics();
        }
    });
})();