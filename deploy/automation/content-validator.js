#!/usr/bin/env node

/**
 * content-validator.js - Hugo Build Integration with PII Compliance
 * Created: 2026-04-13
 * Purpose: Pre-build validation hooks for FlightPath3D legal evidence
 * Integration: Hugo build process with banking-level compliance gates
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const PIIScanner = require('./pii-scanner.js');

class ContentValidator {
    constructor(options = {}) {
        this.hugositeDir = options.hugositeDir || './';
        this.contentDir = path.join(this.hugositeDir, 'content');
        this.staticDir = path.join(this.hugositeDir, 'static');
        this.outputDir = options.outputDir || './deploy/automation/reports';
        this.logFile = path.join(this.outputDir, 'content-validation.log');

        this.validationResults = {
            piiCompliance: null,
            brokenLinks: [],
            missingAssets: [],
            frontmatterErrors: [],
            contentIntegrity: null,
            buildTest: null
        };

        this.exitCode = 0;
    }

    async initialize() {
        await fs.mkdir(this.outputDir, { recursive: true });
        await this.log('Content validation starting', 'INFO');
    }

    async log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} [${level}] ${message}`;
        console.log(logEntry);

        try {
            await fs.appendFile(this.logFile, logEntry + '\n');
        } catch (error) {
            // Continue if logging fails
        }
    }

    // PII Compliance Check using existing scanner
    async validatePIICompliance() {
        await this.log('Running PII compliance validation');

        try {
            const scanner = new PIIScanner({
                basePath: this.hugositeDir,
                outputDir: this.outputDir
            });

            const report = await scanner.run();
            this.validationResults.piiCompliance = report;

            if (report.complianceStatus === 'NON_COMPLIANT') {
                await this.log('PII compliance FAILED - critical issues found', 'ERROR');
                this.exitCode = 1;
            } else if (report.complianceStatus === 'REVIEW_REQUIRED') {
                await this.log('PII compliance WARNING - review required', 'WARN');
            } else {
                await this.log('PII compliance PASSED', 'INFO');
            }

            return report.complianceStatus !== 'NON_COMPLIANT';

        } catch (error) {
            await this.log(`PII validation error: ${error.message}`, 'ERROR');
            this.exitCode = 1;
            return false;
        }
    }

    // Hugo frontmatter validation
    async validateFrontmatter() {
        await this.log('Validating frontmatter structure');

        try {
            const contentFiles = await this.findMarkdownFiles(this.contentDir);
            const errors = [];

            for (const filePath of contentFiles) {
                try {
                    const content = await fs.readFile(filePath, 'utf8');
                    const relativePath = path.relative(this.hugositeDir, filePath);

                    // Check for frontmatter existence
                    if (!content.startsWith('---')) {
                        errors.push({
                            file: relativePath,
                            error: 'Missing frontmatter delimiter',
                            severity: 'ERROR'
                        });
                        continue;
                    }

                    // Extract frontmatter
                    const frontmatterEnd = content.indexOf('---', 3);
                    if (frontmatterEnd === -1) {
                        errors.push({
                            file: relativePath,
                            error: 'Unclosed frontmatter',
                            severity: 'ERROR'
                        });
                        continue;
                    }

                    const frontmatter = content.substring(3, frontmatterEnd).trim();

                    // Check required fields for legal documents
                    const requiredFields = ['title', 'date', 'status', 'evidence_type'];

                    for (const field of requiredFields) {
                        if (!frontmatter.includes(`${field}:`)) {
                            errors.push({
                                file: relativePath,
                                error: `Missing required field: ${field}`,
                                severity: 'WARN'
                            });
                        }
                    }

                    // Check for chain of custody fields in evidence files
                    if (relativePath.includes('/evidence/')) {
                        const custodyFields = ['chain_of_custody', 'evidence_hash', 'collection_date'];

                        for (const field of custodyFields) {
                            if (!frontmatter.includes(`${field}:`)) {
                                errors.push({
                                    file: relativePath,
                                    error: `Missing chain of custody field: ${field}`,
                                    severity: 'ERROR'
                                });
                            }
                        }
                    }

                } catch (error) {
                    errors.push({
                        file: path.relative(this.hugositeDir, filePath),
                        error: `File read error: ${error.message}`,
                        severity: 'ERROR'
                    });
                }
            }

            this.validationResults.frontmatterErrors = errors;

            const errorCount = errors.filter(e => e.severity === 'ERROR').length;
            const warnCount = errors.filter(e => e.severity === 'WARN').length;

            if (errorCount > 0) {
                await this.log(`Frontmatter validation FAILED: ${errorCount} errors, ${warnCount} warnings`, 'ERROR');
                this.exitCode = 1;
                return false;
            } else if (warnCount > 0) {
                await this.log(`Frontmatter validation PASSED with ${warnCount} warnings`, 'WARN');
            } else {
                await this.log('Frontmatter validation PASSED', 'INFO');
            }

            return true;

        } catch (error) {
            await this.log(`Frontmatter validation error: ${error.message}`, 'ERROR');
            this.exitCode = 1;
            return false;
        }
    }

    // Test Hugo build process
    async testBuild() {
        await this.log('Testing Hugo build process');

        return new Promise((resolve) => {
            const hugo = spawn('hugo', ['--gc', '--minify', '--quiet'], {
                cwd: this.hugositeDir,
                stdio: 'pipe'
            });

            let stdout = '';
            let stderr = '';

            hugo.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            hugo.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            hugo.on('close', async (code) => {
                this.validationResults.buildTest = {
                    exitCode: code,
                    stdout: stdout,
                    stderr: stderr
                };

                if (code === 0) {
                    await this.log('Hugo build test PASSED', 'INFO');
                    resolve(true);
                } else {
                    await this.log(`Hugo build test FAILED (exit code: ${code})`, 'ERROR');
                    if (stderr) {
                        await this.log(`Build errors: ${stderr}`, 'ERROR');
                    }
                    this.exitCode = 1;
                    resolve(false);
                }
            });

            hugo.on('error', async (error) => {
                await this.log(`Hugo build error: ${error.message}`, 'ERROR');
                this.exitCode = 1;
                resolve(false);
            });
        });
    }

    // Content integrity verification
    async validateContentIntegrity() {
        await this.log('Validating content integrity');

        try {
            const integrityReport = {
                totalFiles: 0,
                checksumVerified: 0,
                missingFiles: [],
                modifiedFiles: [],
                timestamp: new Date().toISOString()
            };

            // Check for existing checksums file
            const checksumsFile = path.join(this.hugositeDir, 'SHA256SUMS');

            if (await this.fileExists(checksumsFile)) {
                const checksums = await fs.readFile(checksumsFile, 'utf8');
                const lines = checksums.trim().split('\n');

                for (const line of lines) {
                    if (!line.trim()) continue;

                    const [expectedHash, filePath] = line.split(/\s+(.+)/);
                    const fullPath = path.join(this.hugositeDir, filePath);

                    integrityReport.totalFiles++;

                    if (await this.fileExists(fullPath)) {
                        const currentHash = await this.calculateFileHash(fullPath);

                        if (currentHash === expectedHash) {
                            integrityReport.checksumVerified++;
                        } else {
                            integrityReport.modifiedFiles.push({
                                file: filePath,
                                expectedHash: expectedHash,
                                currentHash: currentHash
                            });
                        }
                    } else {
                        integrityReport.missingFiles.push(filePath);
                    }
                }
            } else {
                await this.log('No checksums file found - generating new checksums', 'INFO');
                await this.generateChecksums();
            }

            this.validationResults.contentIntegrity = integrityReport;

            if (integrityReport.missingFiles.length > 0 || integrityReport.modifiedFiles.length > 0) {
                await this.log(`Content integrity issues: ${integrityReport.missingFiles.length} missing, ${integrityReport.modifiedFiles.length} modified`, 'WARN');
            } else {
                await this.log('Content integrity PASSED', 'INFO');
            }

            return true;

        } catch (error) {
            await this.log(`Content integrity validation error: ${error.message}`, 'ERROR');
            this.exitCode = 1;
            return false;
        }
    }

    // Helper functions
    async findMarkdownFiles(dir) {
        const files = [];

        try {
            const entries = await fs.readdir(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory() && !entry.name.startsWith('.')) {
                    files.push(...await this.findMarkdownFiles(fullPath));
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    files.push(fullPath);
                }
            }
        } catch (error) {
            // Directory might not exist
        }

        return files;
    }

    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    async calculateFileHash(filePath) {
        const crypto = require('crypto');
        const content = await fs.readFile(filePath);
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    async generateChecksums() {
        const crypto = require('crypto');
        const { execSync } = require('child_process');

        try {
            const command = 'find . -type f -not -name "SHA256SUMS" -not -path "./.git/*" -exec sha256sum {} \\;';
            const output = execSync(command, {
                cwd: this.hugositeDir,
                encoding: 'utf8'
            });

            const checksumsFile = path.join(this.hugositeDir, 'SHA256SUMS');
            await fs.writeFile(checksumsFile, output);

            await this.log('Generated new checksums file', 'INFO');
        } catch (error) {
            await this.log(`Checksum generation failed: ${error.message}`, 'ERROR');
        }
    }

    // Generate comprehensive validation report
    async generateReport() {
        const reportFile = path.join(this.outputDir, 'content-validation-report.json');

        const report = {
            timestamp: new Date().toISOString(),
            hugositeDir: this.hugositeDir,
            validationResults: this.validationResults,
            overallStatus: this.exitCode === 0 ? 'PASSED' : 'FAILED',
            exitCode: this.exitCode
        };

        await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
        await this.log(`Validation report written to: ${reportFile}`);

        return report;
    }

    // Main validation process
    async run() {
        await this.initialize();

        const validations = [
            { name: 'PII Compliance', fn: () => this.validatePIICompliance() },
            { name: 'Frontmatter Structure', fn: () => this.validateFrontmatter() },
            { name: 'Content Integrity', fn: () => this.validateContentIntegrity() },
            { name: 'Hugo Build Test', fn: () => this.testBuild() }
        ];

        for (const validation of validations) {
            await this.log(`Running ${validation.name} validation`);

            try {
                const result = await validation.fn();
                if (result) {
                    await this.log(`${validation.name}: PASSED`, 'INFO');
                } else {
                    await this.log(`${validation.name}: FAILED`, 'ERROR');
                }
            } catch (error) {
                await this.log(`${validation.name}: ERROR - ${error.message}`, 'ERROR');
                this.exitCode = 1;
            }
        }

        const report = await this.generateReport();

        if (this.exitCode === 0) {
            await this.log('🎯 Content validation PASSED - ready for deployment', 'INFO');
        } else {
            await this.log('❌ Content validation FAILED - deployment blocked', 'ERROR');
        }

        return report;
    }
}

// CLI execution
if (require.main === module) {
    const validator = new ContentValidator({
        hugositeDir: process.argv[2] || './',
        outputDir: process.argv[3] || './deploy/automation/reports'
    });

    validator.run()
        .then(() => process.exit(validator.exitCode))
        .catch(error => {
            console.error('Content validation failed:', error);
            process.exit(1);
        });
}

module.exports = ContentValidator;