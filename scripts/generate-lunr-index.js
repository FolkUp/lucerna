/**
 * LCRN-060 Phase 3: Lunr.js Search Index Generation
 * Banking-level search implementation with multilingual support
 */

import fs from 'fs/promises';
import path from 'path';
import lunr from 'lunr';

// Configuration
const SEARCH_CONTENT_DIR = './dossiers/flightpath3d/search-content';
const OUTPUT_DIR = './static/search';
const INDEX_FILE = path.join(SEARCH_CONTENT_DIR, 'search-index.json');

// Language detection patterns
const LANGUAGE_PATTERNS = {
  pt: /\b(?:com|uma|para|que|não|por|mais|como|seu|sua|esta|este|sobre|depois|muito|bem|alguns|todos|mesmo|onde|quando|porque|sem|contra|entre|durante|antes|depois|já|ainda|sempre|nunca|aqui|ali|então|mas|ou|se|assim|cada|outro|outros|outras|primeiro|primeira|segundo|última|último)\b/gi,
  ru: /\b(?:это|что|как|для|так|все|они|был|была|были|будет|есть|или|если|где|когда|только|уже|еще|может|должен|должна|можно|нужно|хорошо|плохо|сейчас|здесь|там|тут|потом|после|перед|между|через|под|над|при|без|против|вместо|кроме|около|вокруг|внутри|снаружи)\b/gi,
  en: /\b(?:the|and|for|are|but|not|you|all|can|had|her|was|one|our|out|day|get|has|him|his|how|man|new|now|old|see|two|way|who|boy|did|its|let|put|say|she|too|use)\b/gi
};

/**
 * Detect document language based on content patterns
 */
function detectLanguage(content) {
  const scores = {};
  const sampleText = content.slice(0, 2000); // Sample first 2KB

  for (const [lang, pattern] of Object.entries(LANGUAGE_PATTERNS)) {
    const matches = sampleText.match(pattern);
    scores[lang] = matches ? matches.length : 0;
  }

  // Find language with highest score
  let maxScore = 0;
  let detectedLang = 'en';

  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang;
    }
  }

  return detectedLang;
}

/**
 * Clean and optimize text for search indexing
 */
function preprocessText(text) {
  return text
    // Remove PII redaction markers but keep structure
    .replace(/\[EMAIL_REDACTED\]/g, '[EMAIL]')
    .replace(/\[PHONE_REDACTED\]/g, '[PHONE]')
    .replace(/\[IBAN_REDACTED\]/g, '[IBAN]')
    .replace(/\[CARD_REDACTED\]/g, '[CARD]')
    .replace(/\[SSN_REDACTED\]/g, '[SSN]')
    // Remove markdown formatting but preserve structure
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/\|/g, ' ') // Table separators
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate language-specific Lunr index
 */
function createLanguageIndex(documents, language) {
  console.log(`Creating ${language.toUpperCase()} index with ${documents.length} documents...`);

  return lunr(function() {
    // Use default English configuration for all languages for now
    // TODO: Add language-specific stemmers when available

    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content', { boost: 1 });
    this.field('fileName', { boost: 5 });
    this.field('type', { boost: 2 });

    documents.forEach(doc => {
      this.add({
        id: doc.id,
        title: preprocessText(doc.title),
        content: preprocessText(doc.content),
        fileName: doc.metadata.fileName,
        type: doc.metadata.type
      });
    });
  });
}

/**
 * Generate search statistics
 */
function generateSearchStats(searchIndex) {
  const stats = {
    totalDocuments: searchIndex.searchableDocuments,
    skippedDocuments: searchIndex.skippedDocuments,
    languageDistribution: {},
    typeDistribution: {},
    sizeDistribution: {
      small: 0,   // <10KB
      medium: 0,  // 10KB-100KB
      large: 0    // >100KB
    },
    piiRedactionStats: {
      documentsWithPii: 0,
      totalRedactions: 0,
      redactionTypes: {}
    }
  };

  searchIndex.documents.forEach(doc => {
    // Language detection
    const lang = detectLanguage(doc.content);
    stats.languageDistribution[lang] = (stats.languageDistribution[lang] || 0) + 1;

    // Type distribution
    const type = doc.metadata.type;
    stats.typeDistribution[type] = (stats.typeDistribution[type] || 0) + 1;

    // Size distribution
    const size = doc.metadata.size;
    if (size < 10240) stats.sizeDistribution.small++;
    else if (size < 102400) stats.sizeDistribution.medium++;
    else stats.sizeDistribution.large++;

    // PII redaction stats
    if (doc.metadata.piiRedacted) {
      stats.piiRedactionStats.documentsWithPii++;
      if (doc.metadata.redactions) {
        stats.piiRedactionStats.totalRedactions += doc.metadata.redactions.length;
        doc.metadata.redactions.forEach(redaction => {
          const type = redaction.type;
          stats.piiRedactionStats.redactionTypes[type] =
            (stats.piiRedactionStats.redactionTypes[type] || 0) + redaction.count;
        });
      }
    }
  });

  return stats;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔍 LCRN-060 Phase 3: Lunr.js Search Index Generation');
  console.log('Banking-level search implementation\n');

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Load processed search index
    console.log('📖 Loading processed documents...');
    const rawData = await fs.readFile(INDEX_FILE, 'utf-8');
    const searchIndex = JSON.parse(rawData);

    console.log(`   Documents: ${searchIndex.searchableDocuments} searchable, ${searchIndex.skippedDocuments} skipped`);

    // Group documents by language
    const documentsByLanguage = {};
    searchIndex.documents.forEach(doc => {
      const lang = detectLanguage(doc.content);
      if (!documentsByLanguage[lang]) {
        documentsByLanguage[lang] = [];
      }
      documentsByLanguage[lang].push(doc);
    });

    console.log('\n📊 Language distribution:');
    Object.entries(documentsByLanguage).forEach(([lang, docs]) => {
      console.log(`   ${lang.toUpperCase()}: ${docs.length} documents`);
    });

    // Generate language-specific Lunr indexes
    const indexes = {};
    for (const [language, docs] of Object.entries(documentsByLanguage)) {
      indexes[language] = createLanguageIndex(docs, language);
    }

    // Generate search statistics
    console.log('\n📊 Generating search statistics...');
    const stats = generateSearchStats(searchIndex);

    // Prepare client-side search data
    const clientSearchData = {
      metadata: {
        generated: new Date().toISOString(),
        version: '1.0.0',
        totalDocuments: searchIndex.totalDocuments,
        searchableDocuments: searchIndex.searchableDocuments,
        languages: Object.keys(documentsByLanguage),
        stats: stats
      },
      indexes: {},
      documents: searchIndex.documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        url: doc.url,
        fileName: doc.metadata.fileName,
        type: doc.metadata.type,
        size: doc.metadata.size,
        lastModified: doc.metadata.lastModified,
        piiRedacted: doc.metadata.piiRedacted,
        language: detectLanguage(doc.content),
        excerpt: preprocessText(doc.content).slice(0, 200) + '...'
      }))
    };

    // Serialize indexes for client-side use
    for (const [language, index] of Object.entries(indexes)) {
      clientSearchData.indexes[language] = index;
    }

    // Save client search data
    const clientDataFile = path.join(OUTPUT_DIR, 'search-data.json');
    await fs.writeFile(clientDataFile, JSON.stringify(clientSearchData, null, 2));

    // Save search statistics
    const statsFile = path.join(OUTPUT_DIR, 'search-stats.json');
    await fs.writeFile(statsFile, JSON.stringify(stats, null, 2));

    // Generate search interface
    await generateSearchInterface();

    console.log('\n✅ Lunr.js search index generation complete!');
    console.log(`📄 Client data: ${clientDataFile}`);
    console.log(`📊 Statistics: ${statsFile}`);
    console.log(`🔍 Search interface: ${path.join(OUTPUT_DIR, 'search.html')}`);

    // Display final statistics
    console.log('\n📊 Final Statistics:');
    console.log(`   Total searchable documents: ${clientSearchData.metadata.searchableDocuments}`);
    console.log(`   Languages detected: ${clientSearchData.metadata.languages.join(', ')}`);
    console.log(`   Documents with PII redaction: ${stats.piiRedactionStats.documentsWithPii}`);
    console.log(`   Total PII redactions: ${stats.piiRedactionStats.totalRedactions}`);

  } catch (error) {
    console.error('❌ Index generation failed:', error.message);
    process.exit(1);
  }
}

/**
 * Generate HTML search interface
 */
async function generateSearchInterface() {
  const searchHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlightPath3D Document Search</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 30px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }

        .header h1 {
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 1.1em;
        }

        .search-box {
            margin-bottom: 30px;
        }

        .search-input {
            width: 100%;
            padding: 15px 20px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 6px;
            transition: border-color 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }

        .search-filters {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .filter-group label {
            font-weight: 600;
            color: #555;
            font-size: 14px;
        }

        .filter-group select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
        }

        .search-stats {
            background: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #555;
        }

        .results {
            margin-top: 30px;
        }

        .result-item {
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 15px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            background: white;
        }

        .result-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .result-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .result-meta {
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #666;
        }

        .result-meta span {
            background: #f8f9fa;
            padding: 3px 8px;
            border-radius: 3px;
            border: 1px solid #dee2e6;
        }

        .result-excerpt {
            color: #555;
            line-height: 1.5;
        }

        .pii-warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 12px;
            color: #856404;
        }

        .no-results {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>FlightPath3D Document Search</h1>
            <p>Banking-level secure search with PII redaction</p>
        </div>

        <div class="search-box">
            <input type="text" id="searchInput" class="search-input" placeholder="Search documents..." />
        </div>

        <div class="search-filters">
            <div class="filter-group">
                <label for="languageFilter">Language</label>
                <select id="languageFilter">
                    <option value="">All Languages</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="typeFilter">Document Type</label>
                <select id="typeFilter">
                    <option value="">All Types</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="piiFilter">PII Status</label>
                <select id="piiFilter">
                    <option value="">All Documents</option>
                    <option value="true">PII Redacted</option>
                    <option value="false">No PII</option>
                </select>
            </div>
        </div>

        <div id="searchStats" class="search-stats" style="display: none;">
            <span id="statsText"></span>
        </div>

        <div id="results" class="results">
            <div class="loading">Loading search data...</div>
        </div>
    </div>

    <script src="https://unpkg.com/lunr/lunr.min.js"></script>
    <script>
        let searchData = null;
        let currentResults = [];

        // Load search data
        fetch('./search-data.json')
            .then(response => response.json())
            .then(data => {
                searchData = data;
                initializeInterface();
                performSearch('');
            })
            .catch(error => {
                document.getElementById('results').innerHTML =
                    '<div class="no-results">Error loading search data: ' + error.message + '</div>';
            });

        function initializeInterface() {
            // Populate filters
            const languageFilter = document.getElementById('languageFilter');
            searchData.metadata.languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = lang.toUpperCase();
                languageFilter.appendChild(option);
            });

            const typeFilter = document.getElementById('typeFilter');
            const types = [...new Set(searchData.documents.map(doc => doc.type))];
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                typeFilter.appendChild(option);
            });

            // Add event listeners
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            document.getElementById('languageFilter').addEventListener('change', handleSearch);
            document.getElementById('typeFilter').addEventListener('change', handleSearch);
            document.getElementById('piiFilter').addEventListener('change', handleSearch);
        }

        function handleSearch() {
            const query = document.getElementById('searchInput').value;
            performSearch(query);
        }

        function performSearch(query) {
            if (!searchData) return;

            const languageFilter = document.getElementById('languageFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const piiFilter = document.getElementById('piiFilter').value;

            let results = [];

            if (query.trim()) {
                // Search using appropriate language index
                const searchLang = languageFilter || 'en';
                const index = lunr.Index.load(searchData.indexes[searchLang]);

                try {
                    const searchResults = index.search(query + '~1'); // Fuzzy search
                    results = searchResults.map(result => {
                        const doc = searchData.documents.find(d => d.id.toString() === result.ref);
                        return {
                            ...doc,
                            score: result.score
                        };
                    });
                } catch (error) {
                    console.error('Search error:', error);
                    results = [];
                }
            } else {
                // No query - show all documents
                results = searchData.documents.map(doc => ({ ...doc, score: 1 }));
            }

            // Apply filters
            if (languageFilter) {
                results = results.filter(doc => doc.language === languageFilter);
            }

            if (typeFilter) {
                results = results.filter(doc => doc.type === typeFilter);
            }

            if (piiFilter) {
                const piiValue = piiFilter === 'true';
                results = results.filter(doc => doc.piiRedacted === piiValue);
            }

            // Sort by relevance score
            results.sort((a, b) => b.score - a.score);

            currentResults = results;
            displayResults(results, query);
        }

        function displayResults(results, query) {
            const resultsContainer = document.getElementById('results');
            const searchStats = document.getElementById('searchStats');
            const statsText = document.getElementById('statsText');

            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="no-results">No documents found matching your search.</div>';
                searchStats.style.display = 'none';
                return;
            }

            // Update search stats
            const piiCount = results.filter(doc => doc.piiRedacted).length;
            statsText.textContent = \`Found \${results.length} document\${results.length === 1 ? '' : 's'}\${query ? \` matching "\${query}"\` : ''} (\${piiCount} with PII redacted)\`;
            searchStats.style.display = 'block';

            // Render results
            resultsContainer.innerHTML = results.map(doc => \`
                <div class="result-item">
                    <div class="result-title">\${escapeHtml(doc.title)}</div>
                    <div class="result-meta">
                        <span>Type: \${doc.type}</span>
                        <span>Language: \${doc.language.toUpperCase()}</span>
                        <span>Size: \${formatFileSize(doc.size)}</span>
                        <span>Modified: \${formatDate(doc.lastModified)}</span>
                        \${doc.score < 1 ? \`<span>Score: \${(doc.score * 100).toFixed(1)}%</span>\` : ''}
                    </div>
                    <div class="result-excerpt">\${escapeHtml(doc.excerpt)}</div>
                    \${doc.piiRedacted ? '<div class="pii-warning">⚠️ This document contains redacted PII for security compliance</div>' : ''}
                </div>
            \`).join('');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString();
        }
    </script>
</body>
</html>`;

  await fs.writeFile(path.join(OUTPUT_DIR, 'search.html'), searchHTML);
}

// Execute if run directly
if (import.meta.url === new URL(import.meta.url, 'file:///' + process.cwd().replace(/\\\\/g, '/') + '/').href) {
  main();
}

export { main, generateSearchStats, detectLanguage };