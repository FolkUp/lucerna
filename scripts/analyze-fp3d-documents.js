#!/usr/bin/env node
/**
 * FlightPath3D Document Analysis Script
 * LCRN-060 Phase 3 - Document Processing Pipeline
 * Banking-level standards - PII awareness required
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const FP3D_ROOT = './dossiers/flightpath3d';
const EVIDENCE_DIR = path.join(FP3D_ROOT, 'evidence');

// PII patterns to detect (banking-level security)
const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phoneNumber: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
  iban: /[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}/g,
  creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
  ssn: /\b\d{3}-?\d{2}-?\d{4}\b/g
};

/**
 * Analyze a single document file
 */
async function analyzeDocument(filePath) {
  const stats = await fs.stat(filePath);
  const ext = path.extname(filePath).toLowerCase();

  let content = '';
  let frontmatter = {};
  let piiIssues = [];

  try {
    if (ext === '.md') {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsed = matter(fileContent);
      frontmatter = parsed.data;
      content = parsed.content;
    } else if (ext === '.txt') {
      content = await fs.readFile(filePath, 'utf-8');
    } else {
      // Binary files (PDF, etc.) - will need special handling
      content = '[BINARY_FILE]';
    }

    // PII detection for text content
    if (content && content !== '[BINARY_FILE]') {
      for (const [type, pattern] of Object.entries(PII_PATTERNS)) {
        const matches = content.match(pattern);
        if (matches) {
          piiIssues.push({
            type,
            count: matches.length,
            samples: matches.slice(0, 3) // First 3 matches for review
          });
        }
      }
    }

  } catch (error) {
    console.warn(`Warning: Could not process ${filePath}: ${error.message}`);
  }

  return {
    path: filePath,
    relativePath: path.relative(FP3D_ROOT, filePath),
    size: stats.size,
    extension: ext,
    lastModified: stats.mtime,
    contentLength: content.length,
    hasFrontmatter: Object.keys(frontmatter).length > 0,
    frontmatter,
    piiIssues,
    searchable: ext === '.md' || ext === '.txt',
    needsRedaction: piiIssues.length > 0
  };
}

/**
 * Recursively find and analyze all documents
 */
async function findDocuments(dir) {
  const documents = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        const subDocs = await findDocuments(fullPath);
        documents.push(...subDocs);
      } else if (entry.isFile()) {
        // Analyze document
        const analysis = await analyzeDocument(fullPath);
        documents.push(analysis);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }

  return documents;
}

/**
 * Generate analysis report
 */
function generateReport(documents) {
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const totalFiles = documents.length;
  const searchableFiles = documents.filter(doc => doc.searchable).length;
  const filesWithPII = documents.filter(doc => doc.needsRedaction).length;

  const extensionStats = documents.reduce((stats, doc) => {
    const ext = doc.extension || 'unknown';
    stats[ext] = (stats[ext] || 0) + 1;
    return stats;
  }, {});

  const piiStats = documents.reduce((stats, doc) => {
    doc.piiIssues.forEach(issue => {
      stats[issue.type] = (stats[issue.type] || 0) + issue.count;
    });
    return stats;
  }, {});

  return {
    summary: {
      totalFiles,
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      searchableFiles,
      filesWithPII,
      piiRedactionRequired: filesWithPII > 0
    },
    extensionBreakdown: extensionStats,
    piiDetected: piiStats,
    documents: documents.sort((a, b) => b.size - a.size) // Sort by size desc
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Analyzing FlightPath3D documents...');
  console.log(`📁 Scanning: ${EVIDENCE_DIR}\n`);

  try {
    const documents = await findDocuments(EVIDENCE_DIR);
    const report = generateReport(documents);

    // Output analysis report
    console.log('📊 ANALYSIS REPORT');
    console.log('==================');
    console.log(`Total Files: ${report.summary.totalFiles}`);
    console.log(`Total Size: ${report.summary.totalSizeMB} MB`);
    console.log(`Searchable Files: ${report.summary.searchableFiles}`);
    console.log(`Files requiring PII redaction: ${report.summary.filesWithPII}\n`);

    console.log('📄 File Extensions:');
    Object.entries(report.extensionBreakdown).forEach(([ext, count]) => {
      console.log(`  ${ext}: ${count} files`);
    });

    if (Object.keys(report.piiDetected).length > 0) {
      console.log('\n⚠️  PII Detected:');
      Object.entries(report.piiDetected).forEach(([type, count]) => {
        console.log(`  ${type}: ${count} instances`);
      });
    }

    console.log('\n📋 Documents requiring attention:');
    const problemDocs = report.documents.filter(doc => doc.needsRedaction);
    problemDocs.forEach(doc => {
      console.log(`  📄 ${doc.relativePath}`);
      doc.piiIssues.forEach(issue => {
        console.log(`     ⚠️  ${issue.type}: ${issue.count} instances`);
      });
    });

    // Save detailed report
    const reportPath = './scripts/fp3d-analysis-report.json';
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Detailed report saved: ${reportPath}`);

    // Banking-level security warning
    if (report.summary.piiRedactionRequired) {
      console.log('\n🚨 BANKING-LEVEL SECURITY ALERT:');
      console.log('   PII redaction REQUIRED before search indexing');
      console.log('   Review КиберГонзо PII audit findings before proceeding');
    } else {
      console.log('\n✅ No PII detected - safe for indexing');
    }

  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzeDocument, findDocuments, generateReport };