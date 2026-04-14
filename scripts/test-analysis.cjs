const fs = require('fs/promises');
const path = require('path');

async function testAnalysis() {
  console.log('Testing document analysis...');

  const evidenceDir = './dossiers/flightpath3d/evidence';
  console.log('Looking for evidence in:', evidenceDir);

  try {
    const stats = await fs.stat(evidenceDir);
    console.log('Directory exists:', stats.isDirectory());

    const files = await fs.readdir(evidenceDir);
    console.log('Found files:', files.length);

    for (const file of files.slice(0, 5)) {
      console.log(' -', file);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAnalysis();