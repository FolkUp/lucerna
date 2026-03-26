// Merge translation data from agent outputs into documents.json and timeline.json
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = import.meta.dirname;

// Read agent output files
const agent1Raw = readFileSync(String.raw`C:\Users\ankle\AppData\Local\Temp\claude\C--Users-ankle\tasks\af8368f.output`, 'utf8');
const agent2Raw = readFileSync(String.raw`C:\Users\ankle\AppData\Local\Temp\claude\C--Users-ankle\tasks\a48048f.output`, 'utf8');

// Extract JSON from agent output (wrapped in ```json blocks)
function extractJSON(raw) {
  const matches = raw.match(/```json\s*\n([\s\S]*?)\n```/g);
  if (!matches) throw new Error('No JSON block found');
  return matches.map(m => {
    const inner = m.replace(/^```json\s*\n/, '').replace(/\n```$/, '');
    return JSON.parse(inner);
  });
}

// Agent 1: single JSON object with keys "1".."83"
const agent1Blocks = extractJSON(agent1Raw);
const trans1 = agent1Blocks[agent1Blocks.length - 1]; // last JSON block is the result

// Agent 2: JSON for docs 84-127, then ---TIMELINE--- separator, then timeline array
// But they're in a single code block with ---TIMELINE--- inside
// Let's extract differently
const agent2LastBlock = agent2Raw.match(/```json\s*\n([\s\S]*?)\n```/g);
const agent2Content = agent2LastBlock[agent2LastBlock.length - 1]
  .replace(/^```json\s*\n/, '').replace(/\n```$/, '');

let trans2, timelineTrans;
if (agent2Content.includes('---TIMELINE---')) {
  const [docPart, tlPart] = agent2Content.split('---TIMELINE---');
  trans2 = JSON.parse(docPart.trim());
  timelineTrans = JSON.parse(tlPart.trim());
} else {
  // Two separate JSON blocks
  const blocks = extractJSON(agent2Raw);
  trans2 = blocks[blocks.length - 2];
  timelineTrans = blocks[blocks.length - 1];
}

// Merge all doc translations
const allDocTrans = { ...trans1, ...trans2 };

console.log(`Doc translations loaded: ${Object.keys(allDocTrans).length} entries`);
console.log(`Timeline translations loaded: ${timelineTrans.length} entries`);

// === MERGE INTO DOCUMENTS.JSON ===
const docsPath = join(DATA_DIR, 'documents.json');
const docs = JSON.parse(readFileSync(docsPath, 'utf8'));

let merged = 0;
let missing = 0;
for (const section of docs.sections) {
  for (const doc of section.documents) {
    const key = String(doc.docNum);
    if (allDocTrans[key]) {
      doc.description_ru = allDocTrans[key].description_ru;
      doc.description_en = allDocTrans[key].description_en;
      doc.relevance_ru = allDocTrans[key].relevance_ru;
      doc.relevance_en = allDocTrans[key].relevance_en;
      merged++;
    } else {
      console.warn(`MISSING translation for doc ${key}: ${doc.description}`);
      missing++;
    }
  }
}

// Update metadata
docs.metadata.lastUpdated = "20.03.2026";

writeFileSync(docsPath, JSON.stringify(docs, null, 2), 'utf8');
console.log(`Documents: ${merged} merged, ${missing} missing`);

// === MERGE INTO TIMELINE.JSON ===
const tlPath = join(DATA_DIR, 'timeline.json');
const timeline = JSON.parse(readFileSync(tlPath, 'utf8'));

if (timelineTrans.length !== timeline.length) {
  console.warn(`Timeline length mismatch: file=${timeline.length}, translations=${timelineTrans.length}`);
}

let tlMerged = 0;
for (let i = 0; i < timeline.length && i < timelineTrans.length; i++) {
  timeline[i].description_ru = timelineTrans[i].description_ru;
  timeline[i].description_en = timelineTrans[i].description_en;
  tlMerged++;
}

writeFileSync(tlPath, JSON.stringify(timeline, null, 2), 'utf8');
console.log(`Timeline: ${tlMerged} events merged`);

// === UPDATE META.JSON ===
const metaPath = join(DATA_DIR, 'meta.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
meta.buildTimestamp = new Date().toISOString();
meta.documentCount = merged;
writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
console.log(`Meta updated: buildTimestamp=${meta.buildTimestamp}, documentCount=${meta.documentCount}`);

console.log('\nDone! All translations merged.');
