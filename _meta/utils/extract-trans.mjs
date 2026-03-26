import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = import.meta.dirname;
const TEMP = 'C:/Users/ankle/AppData/Local/Temp/claude/C--Users-ankle/tasks';

function extractLastAssistantJSON(outputFile) {
  const raw = readFileSync(join(TEMP, outputFile), 'utf8');
  const lines = raw.trim().split('\n');

  // Find last line with assistant message
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const obj = JSON.parse(lines[i]);
      if (obj.message && obj.message.role === 'assistant' && obj.message.content) {
        const text = obj.message.content[0].text;
        return text;
      }
    } catch (e) {
      continue;
    }
  }
  throw new Error('No assistant message found');
}

// Agent 1: docs 1-83
const text1 = extractLastAssistantJSON('af8368f.output');
const match1 = text1.match(/```json\s*\n([\s\S]*?)\n```/);
if (!match1) throw new Error('No JSON in agent 1');
const trans1 = JSON.parse(match1[1]);
console.log(`Agent 1: ${Object.keys(trans1).length} doc translations`);

// Agent 2: docs 84-127 + timeline
const text2 = extractLastAssistantJSON('a48048f.output');
// May have ```json block or ``` block
const match2 = text2.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
if (!match2) throw new Error('No JSON in agent 2');

const content2 = match2[1];
let trans2, timelineTrans;

if (content2.includes('---TIMELINE---')) {
  const parts = content2.split('---TIMELINE---');
  trans2 = JSON.parse(parts[0].trim());
  timelineTrans = JSON.parse(parts[1].trim());
} else {
  // Try to find two separate JSON blocks
  const allMatches = [...text2.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)];
  if (allMatches.length >= 2) {
    trans2 = JSON.parse(allMatches[allMatches.length - 2][1]);
    timelineTrans = JSON.parse(allMatches[allMatches.length - 1][1]);
  } else {
    throw new Error('Cannot parse agent 2 output');
  }
}

console.log(`Agent 2: ${Object.keys(trans2).length} doc translations`);
console.log(`Timeline: ${timelineTrans.length} events`);

// Merge all doc translations
const allDocTrans = { ...trans1, ...trans2 };
console.log(`Total doc translations: ${Object.keys(allDocTrans).length}`);

// === MERGE INTO DOCUMENTS.JSON ===
const docsPath = join(DATA_DIR, 'documents.json');
const docs = JSON.parse(readFileSync(docsPath, 'utf8'));

let merged = 0, missing = 0;
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
console.log(`Meta: buildTimestamp=${meta.buildTimestamp}, documentCount=${meta.documentCount}`);

console.log('\nDone!');
