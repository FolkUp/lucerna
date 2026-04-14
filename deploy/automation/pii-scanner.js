#!/usr/bin/env node

/**
 * pii-scanner.js - FlightPath3D PII Detection and Compliance Scanner
 * Created: 2026-04-13
 * Purpose: Automated PII detection for legal evidence with banking-level compliance
 * Integration: Hugo build process with comprehensive audit trail
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// PII Detection Patterns (Portuguese Legal Context)
const PII_PATTERNS = {
    // Email addresses
    email: {
        pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        severity: 'HIGH',
        description: 'Email address'
    },

    // Portuguese phone numbers
    phone_pt: {
        pattern: /(?:\+351|00351)?\s*[29]\d{8}|\b[29]\d{2}\s?\d{3}\s?\d{3}\b/g,
        severity: 'HIGH',
        description: 'Portuguese phone number'
    },

    // Portuguese ID numbers (Cartão de Cidadão)
    citizen_id: {
        pattern: /\b\d{8}\s?\d{1}\s?[A-Z]{2}\d{1}\b/g,
        severity: 'CRITICAL',
        description: 'Portuguese Citizen ID'
    },

    // Portuguese tax numbers (NIF)
    nif: {
        pattern: /\b[1-3,5,6,8,9]\d{8}\b/g,
        severity: 'CRITICAL',
        description: 'Portuguese Tax Number (NIF)'
    },

    // IBAN numbers
    iban: {
        pattern: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/g,
        severity: 'CRITICAL',
        description: 'IBAN bank account'
    },

    // Credit card numbers (basic pattern)
    credit_card: {
        pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
        severity: 'CRITICAL',
        description: 'Credit card number'
    },

    // Portuguese addresses (basic pattern)
    address: {
        pattern: /\b\d{4}-\d{3}\s+[A-ZÀÁÂÃÇÉÊÍÓÔÕÚ][a-zàáâãçéêíóôõú\s]+(?:Portugal)?\b/g,
        severity: 'MEDIUM',
        description: 'Portuguese postal address'
    },

    // IP addresses
    ip_address: {
        pattern: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
        severity: 'LOW',
        description: 'IP address'
    },

    // Payoneer account references
    payoneer_ref: {
        pattern: /\b\d{6}-\d{6}\b/g,
        severity: 'HIGH',
        description: 'Payoneer reference number'
    }
};

// Legal evidence whitelist (approved for case context)
const LEGAL_WHITELIST = {
    companies: ['FlightPath3D', 'Smart Travel', 'Betria'],
    legal_terms: ['voluntary disclosure', 'settlement', 'evidence', 'case'],
    court_refs: /\bProc\.\s?\d+\/\d{4}\b/g,  // Portuguese court case references
};

class PIIScanner {
    constructor(options = {}) {
        this.basePath = options.basePath || './dossiers/flightpath3d';
        this.outputDir = options.outputDir || './deploy/automation/reports';
        this.logFile = path.join(this.outputDir, 'pii-scan.log');
        this.reportFile = path.join(this.outputDir, 'pii-compliance-report.json');
        this.whitelistFile = options.whitelistFile || './deploy/automation/pii-whitelist.json';

        this.stats = {
            filesScanned: 0,
            piiInstancesFound: 0,
            criticalFindings: 0,
            complianceScore: 0
        };

        this.findings = [];
        this.whitelist = new Set();
    }

    async initialize() {
        // Create output directory
        await fs.mkdir(this.outputDir, { recursive: true });

        // Load whitelist if exists
        try {
            const whitelistData = await fs.readFile(this.whitelistFile, 'utf8');
            const whitelist = JSON.parse(whitelistData);
            this.whitelist = new Set(whitelist.approved_patterns || []);
        } catch (error) {
            this.log('Whitelist file not found, using default patterns');
        }
    }

    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} [${level}] ${message}`;
        console.log(logEntry);

        // Append to log file
        fs.appendFile(this.logFile, logEntry + '\n').catch(() => {});
    }

    calculateFileHash(content) {
        return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    }

    isWhitelisted(match, context) {
        // Check against legal whitelist
        for (const company of LEGAL_WHITELIST.companies) {
            if (match.includes(company)) return true;
        }

        // Check court references
        if (LEGAL_WHITELIST.court_refs.test(match)) return true;

        // Check custom whitelist
        if (this.whitelist.has(match)) return true;

        return false;
    }

    async scanFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const fileHash = this.calculateFileHash(content);
            const relativePath = path.relative(this.basePath, filePath);

            this.stats.filesScanned++;

            const fileFindings = [];

            for (const [patternName, config] of Object.entries(PII_PATTERNS)) {
                const matches = content.match(config.pattern);

                if (matches) {
                    for (const match of matches) {
                        // Skip whitelisted matches
                        if (this.isWhitelisted(match, content)) {
                            continue;
                        }

                        const lines = content.substring(0, content.indexOf(match)).split('\n');
                        const lineNumber = lines.length;
                        const contextStart = Math.max(0, lineNumber - 2);
                        const contextEnd = Math.min(lines.length + 2, content.split('\n').length);
                        const context = content.split('\n')
                            .slice(contextStart, contextEnd)
                            .map((line, idx) => `${contextStart + idx + 1}: ${line}`)
                            .join('\n');

                        const finding = {
                            file: relativePath,
                            fileHash: fileHash,
                            patternType: patternName,
                            match: match,
                            severity: config.severity,
                            description: config.description,
                            lineNumber: lineNumber,
                            context: context,
                            timestamp: new Date().toISOString()
                        };

                        fileFindings.push(finding);
                        this.stats.piiInstancesFound++;

                        if (config.severity === 'CRITICAL') {
                            this.stats.criticalFindings++;
                        }
                    }
                }
            }

            if (fileFindings.length > 0) {
                this.findings.push(...fileFindings);
                this.log(`Found ${fileFindings.length} PII instances in ${relativePath}`, 'WARN');
            }

        } catch (error) {
            this.log(`Error scanning ${filePath}: ${error.message}`, 'ERROR');
        }
    }

    async scanDirectory(dirPath) {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                if (entry.isDirectory()) {
                    // Skip hidden directories and backup dirs
                    if (!entry.name.startsWith('.') && !entry.name.includes('backup')) {
                        await this.scanDirectory(fullPath);
                    }
                } else if (entry.isFile()) {
                    // Scan text files only
                    const ext = path.extname(entry.name).toLowerCase();
                    if (['.md', '.txt', '.csv', '.json', '.html', '.eml'].includes(ext)) {
                        await this.scanFile(fullPath);
                    }
                }
            }
        } catch (error) {
            this.log(`Error scanning directory ${dirPath}: ${error.message}`, 'ERROR');
        }
    }

    calculateComplianceScore() {
        if (this.stats.filesScanned === 0) return 100;

        const criticalPenalty = this.stats.criticalFindings * 20;
        const highPenalty = this.findings.filter(f => f.severity === 'HIGH').length * 10;
        const mediumPenalty = this.findings.filter(f => f.severity === 'MEDIUM').length * 5;
        const lowPenalty = this.findings.filter(f => f.severity === 'LOW').length * 1;

        const totalPenalty = criticalPenalty + highPenalty + mediumPenalty + lowPenalty;
        const score = Math.max(0, 100 - (totalPenalty / this.stats.filesScanned));

        return Math.round(score);
    }

    async generateReport() {
        this.stats.complianceScore = this.calculateComplianceScore();

        const report = {
            scanTimestamp: new Date().toISOString(),
            basePath: this.basePath,
            statistics: this.stats,
            findings: this.findings,
            complianceStatus: this.stats.complianceScore >= 95 ? 'COMPLIANT' :
                             this.stats.complianceScore >= 80 ? 'REVIEW_REQUIRED' : 'NON_COMPLIANT',
            recommendations: this.generateRecommendations()
        };

        await fs.writeFile(this.reportFile, JSON.stringify(report, null, 2));
        this.log(`Compliance report written to ${this.reportFile}`);

        return report;
    }

    generateRecommendations() {
        const recommendations = [];

        if (this.stats.criticalFindings > 0) {
            recommendations.push('CRITICAL: Remove or redact all critical PII before deployment');
        }

        if (this.stats.complianceScore < 95) {
            recommendations.push('Review all PII findings and apply appropriate redaction');
        }

        if (this.findings.some(f => f.severity === 'HIGH')) {
            recommendations.push('High-severity PII detected - verify legitimate business need');
        }

        recommendations.push('Update whitelist for approved legal context patterns');

        return recommendations;
    }

    async run() {
        this.log('Starting FlightPath3D PII compliance scan');
        await this.initialize();

        const startTime = Date.now();
        await this.scanDirectory(this.basePath);
        const duration = Date.now() - startTime;

        this.log(`Scan completed in ${duration}ms`);
        this.log(`Files scanned: ${this.stats.filesScanned}`);
        this.log(`PII instances found: ${this.stats.piiInstancesFound}`);
        this.log(`Critical findings: ${this.stats.criticalFindings}`);

        const report = await this.generateReport();

        // Exit with non-zero code if compliance issues found
        if (report.complianceStatus === 'NON_COMPLIANT') {
            this.log('COMPLIANCE FAILURE: Critical PII issues must be resolved', 'ERROR');
            process.exit(1);
        }

        return report;
    }
}

// CLI execution
if (require.main === module) {
    const scanner = new PIIScanner({
        basePath: process.argv[2] || './dossiers/flightpath3d',
        outputDir: process.argv[3] || './deploy/automation/reports'
    });

    scanner.run().catch(error => {
        console.error('PII scan failed:', error);
        process.exit(1);
    });
}

module.exports = PIIScanner;