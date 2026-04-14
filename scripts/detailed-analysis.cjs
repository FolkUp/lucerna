const fs = require('fs/promises');
const path = require('path');

async function detailedAnalysis() {
  console.log('🔍 Detailed FlightPath3D Evidence Analysis');
  console.log('==========================================\n');

  const evidenceDir = './dossiers/flightpath3d/evidence';

  try {
    const entries = await fs.readdir(evidenceDir, { withFileTypes: true });

    let fileCount = 0;
    let dirCount = 0;
    let totalSize = 0;
    let documents = [];

    console.log('📁 Directory Contents:');
    for (const entry of entries) {
      const fullPath = path.join(evidenceDir, entry.name);

      if (entry.isDirectory()) {
        dirCount++;
        console.log(`  📂 ${entry.name}/`);

        // Recursively check subdirectories
        try {
          const subFiles = await fs.readdir(fullPath, { withFileTypes: true });
          for (const subFile of subFiles) {
            if (subFile.isFile()) {
              const subPath = path.join(fullPath, subFile.name);
              const stats = await fs.stat(subPath);
              console.log(`     📄 ${subFile.name} (${(stats.size / 1024).toFixed(1)} KB)`);
              documents.push({
                name: subFile.name,
                path: subPath,
                size: stats.size,
                type: path.extname(subFile.name)
              });
              totalSize += stats.size;
              fileCount++;
            }
          }
        } catch (err) {
          console.log(`     ❌ Error reading directory: ${err.message}`);
        }

      } else if (entry.isFile()) {
        fileCount++;
        const stats = await fs.stat(fullPath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  📄 ${entry.name} (${sizeKB} KB)`);

        documents.push({
          name: entry.name,
          path: fullPath,
          size: stats.size,
          type: path.extname(entry.name)
        });
        totalSize += stats.size;
      } else {
        console.log(`  ❓ ${entry.name} (unknown type)`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Files: ${fileCount}`);
    console.log(`   Directories: ${dirCount}`);
    console.log(`   Total Size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);

    // Group by file type
    const typeStats = {};
    documents.forEach(doc => {
      const ext = doc.type || 'no-extension';
      if (!typeStats[ext]) {
        typeStats[ext] = { count: 0, size: 0 };
      }
      typeStats[ext].count++;
      typeStats[ext].size += doc.size;
    });

    console.log('\n📄 File Types:');
    Object.entries(typeStats).forEach(([ext, stats]) => {
      console.log(`   ${ext}: ${stats.count} files, ${(stats.size / 1024).toFixed(1)} KB`);
    });

    // List largest files
    console.log('\n🔍 Largest Files:');
    documents
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach(doc => {
        console.log(`   ${(doc.size / 1024).toFixed(1)} KB - ${doc.name}`);
      });

  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
}

detailedAnalysis();