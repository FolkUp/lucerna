const fs = require('fs/promises');
const path = require('path');

/**
 * FlightPath3D Search Content Preparation
 * LCRN-060 Phase 3 - Step 2: Document Processing Pipeline
 *
 * Processes documents for search indexing with PII awareness
 */

const FP3D_ROOT = './dossiers/flightpath3d';
const EVIDENCE_DIR = path.join(FP3D_ROOT, 'evidence');
const OUTPUT_DIR = path.join(FP3D_ROOT, 'search-content');

// PII redaction patterns (banking-level security)
const PII_REDACTION_PATTERNS = [
  { name: 'email', pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replacement: '[EMAIL_REDACTED]' },
  { name: 'phone', pattern: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g, replacement: '[PHONE_REDACTED]' },
  { name: 'iban', pattern: /[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}/g, replacement: '[IBAN_REDACTED]' },
  { name: 'card', pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g, replacement: '[CARD_REDACTED]' },
  { name: 'ssn', pattern: /\b\d{3}-?\d{2}-?\d{4}\b/g, replacement: '[SSN_REDACTED]' }
];

// Skip binary and problematic files
const SKIP_EXTENSIONS = ['.pdf', '.jpg', '.png', '.zip', '.doc', '.docx'];
const SKIP_PATTERNS = [
  /cross-reference && mkdir/, // Command artifact
  /node_modules/,
  /\.git/
];

/**
 * Apply PII redaction to text content
 */
function redactPII(content) {
  let redactedContent = content;
  let redactionsMade = [];

  for (const { name, pattern, replacement } of PII_REDACTION_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      redactionsMade.push({ type: name, count: matches.length });
      redactedContent = redactedContent.replace(pattern, replacement);
    }
  }

  return { content: redactedContent, redactions: redactionsMade };
}

/**
 * Extract searchable content from .eml files
 */
function extractEmailContent(emlContent) {
  const lines = emlContent.split('\n');
  let subject = '';
  let body = '';
  let inBody = false;

  for (const line of lines) {
    if (line.startsWith('Subject:')) {
      subject = line.replace('Subject:', '').trim();
    } else if (line.trim() === '' && !inBody) {
      inBody = true;
    } else if (inBody) {
      body += line + '\n';
    }
  }

  return {
    subject: subject || '[No Subject]',
    body: body.trim() || '[No Body Content]',
    searchableText: `${subject} ${body}`.trim()
  };
}

/**
 * Process a single document file
 */
async function processDocument(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const relativePath = path.relative(EVIDENCE_DIR, filePath);

  // Skip files that shouldn't be processed
  if (SKIP_EXTENSIONS.includes(ext)) {
    return { skipped: true, reason: 'Binary/unsupported format' };
  }

  for (const pattern of SKIP_PATTERNS) {
    if (pattern.test(filePath)) {
      return { skipped: true, reason: 'Matched skip pattern' };
    }
  }

  try {
    const stats = await fs.stat(filePath);

    // Skip very large files (>10MB) as they might be PDFs or archives
    if (stats.size > 10 * 1024 * 1024) {
      return { skipped: true, reason: 'File too large' };
    }

    let rawContent = await fs.readFile(filePath, 'utf-8');
    let searchableText = '';
    let metadata = {
      originalPath: relativePath,
      fileName: baseName,
      extension: ext,
      size: stats.size,
      lastModified: stats.mtime.toISOString(),
      processedAt: new Date().toISOString()
    };

    // Process based on file type
    if (ext === '.eml') {
      const emailData = extractEmailContent(rawContent);
      searchableText = emailData.searchableText;
      metadata.type = 'email';
      metadata.subject = emailData.subject;
    } else if (ext === '.md') {
      // For markdown, extract content without frontmatter
      const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
      if (frontmatterMatch) {
        searchableText = frontmatterMatch[2];
        metadata.type = 'markdown';
      } else {
        searchableText = rawContent;
        metadata.type = 'markdown';
      }
    } else if (ext === '.txt') {
      searchableText = rawContent;
      metadata.type = 'text';
    } else {
      searchableText = rawContent;
      metadata.type = 'other';
    }

    // Apply PII redaction
    const { content: redactedContent, redactions } = redactPII(searchableText);

    if (redactions.length > 0) {
      metadata.piiRedacted = true;
      metadata.redactions = redactions;
    }

    return {
      skipped: false,
      metadata,
      content: redactedContent.trim(),
      originalSize: rawContent.length,
      processedSize: redactedContent.length
    };

  } catch (error) {
    return {
      skipped: true,
      reason: `Processing error: ${error.message}`,
      error: true
    };
  }
}

/**
 * Recursively find and process all documents
 */
async function processAllDocuments(dir) {
  const processedDocs = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subDocs = await processAllDocuments(fullPath);
        processedDocs.push(...subDocs);
      } else if (entry.isFile()) {
        console.log(`Processing: ${entry.name}`);
        const result = await processDocument(fullPath);
        result.fileName = entry.name;
        processedDocs.push(result);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }

  return processedDocs;
}

/**
 * Generate search index data
 */
async function generateSearchIndex(processedDocs) {
  const searchableDocs = processedDocs.filter(doc => !doc.skipped);

  const searchIndex = {
    generated: new Date().toISOString(),
    totalDocuments: processedDocs.length,
    searchableDocuments: searchableDocs.length,
    skippedDocuments: processedDocs.filter(doc => doc.skipped).length,
    documents: searchableDocs.map((doc, index) => ({
      id: index + 1,
      title: doc.metadata.subject || doc.metadata.fileName || `Document ${index + 1}`,
      content: doc.content,
      url: `#doc-${index + 1}`,
      metadata: doc.metadata
    }))
  };

  return searchIndex;
}

/**
 * Main processing function
 */
async function main() {
  console.log('🔄 Processing FlightPath3D documents for search...');
  console.log(`📁 Input: ${EVIDENCE_DIR}`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Process all documents
    console.log('📄 Processing documents...');
    const processedDocs = await processAllDocuments(EVIDENCE_DIR);

    // Generate statistics
    const totalDocs = processedDocs.length;
    const searchableDocs = processedDocs.filter(doc => !doc.skipped);
    const skippedDocs = processedDocs.filter(doc => doc.skipped);
    const redactedDocs = searchableDocs.filter(doc => doc.metadata.piiRedacted);

    console.log('\n📊 Processing Summary:');
    console.log(`   Total files processed: ${totalDocs}`);
    console.log(`   Searchable documents: ${searchableDocs.length}`);
    console.log(`   Skipped documents: ${skippedDocs.length}`);
    console.log(`   PII redacted documents: ${redactedDocs.length}`);

    if (skippedDocs.length > 0) {
      console.log('\n⚠️  Skipped files:');
      skippedDocs.slice(0, 10).forEach(doc => {
        console.log(`   📄 ${doc.fileName}: ${doc.reason}`);
      });
      if (skippedDocs.length > 10) {
        console.log(`   ... and ${skippedDocs.length - 10} more`);
      }
    }

    // Generate search index
    console.log('\n🔍 Generating search index...');
    const searchIndex = await generateSearchIndex(processedDocs);

    // Save search index
    const indexPath = path.join(OUTPUT_DIR, 'search-index.json');
    await fs.writeFile(indexPath, JSON.stringify(searchIndex, null, 2));

    // Save processing report
    const reportPath = path.join(OUTPUT_DIR, 'processing-report.json');
    const report = {
      summary: {
        totalDocs,
        searchableDocs: searchableDocs.length,
        skippedDocs: skippedDocs.length,
        redactedDocs: redactedDocs.length
      },
      processedDocuments: processedDocs,
      generatedAt: new Date().toISOString()
    };
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n✅ Processing complete!`);
    console.log(`📄 Search index: ${indexPath}`);
    console.log(`📋 Report: ${reportPath}`);

    if (redactedDocs.length > 0) {
      console.log('\n🚨 BANKING-LEVEL SECURITY NOTICE:');
      console.log(`   ${redactedDocs.length} documents had PII redacted`);
      console.log('   Review redaction log before deployment');
    }

  } catch (error) {
    console.error('❌ Processing failed:', error.message);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = { processDocument, processAllDocuments, generateSearchIndex };