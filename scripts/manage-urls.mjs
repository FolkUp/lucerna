#!/usr/bin/env node
/**
 * manage-urls.mjs — Public URL Management for Lucerna
 *
 * Reads deploy/public-urls.conf and generates nginx location blocks
 * with auth_request off + security headers.
 *
 * Usage:
 *   node scripts/manage-urls.mjs                    # Print generated blocks to stdout
 *   node scripts/manage-urls.mjs --check            # Validate config (no duplicates, valid format)
 *   node scripts/manage-urls.mjs --diff             # Compare config vs current nginx-default.conf
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const configPath = resolve(projectRoot, "deploy/public-urls.conf");
const nginxPath = resolve(projectRoot, "deploy/nginx-default.conf");

const mode = process.argv[2] || "--generate";

// Parse the config file
function parseConfig(content) {
  const entries = [];
  const seen = new Set();
  const errors = [];

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^(exact|prefix|regex)\s+(\S+)(?:\s+#.*)?$/);
    if (!match) {
      errors.push(`Invalid line: ${line}`);
      continue;
    }

    const [, type, path] = match;
    const key = `${type}:${path}`;

    if (seen.has(key)) {
      errors.push(`Duplicate: ${key}`);
      continue;
    }

    seen.add(key);
    entries.push({ type, path, comment: (line.match(/#\s*(.*)$/) || [])[1] || "" });
  }

  return { entries, errors };
}

// Generate nginx location block
function generateBlock(entry) {
  const { type, path, comment } = entry;
  const commentLine = comment ? `    # ${comment}\n` : "";
  const headers = "        include /etc/nginx/snippets/security-headers-public.conf;";

  let directive;
  switch (type) {
    case "exact":
      directive = `location = ${path}`;
      break;
    case "prefix":
      directive = `location ${path}`;
      break;
    case "regex":
      directive = `location ~ ${path}`;
      break;
  }

  return `${commentLine}    ${directive} {\n        auth_request off;\n${headers}\n    }`;
}

// Main
const content = readFileSync(configPath, "utf-8");
const { entries, errors } = parseConfig(content);

if (mode === "--check") {
  if (errors.length > 0) {
    console.error("Validation errors:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log(`Config valid: ${entries.length} entries, 0 errors.`);
  process.exit(0);
}

if (mode === "--diff") {
  const nginx = readFileSync(nginxPath, "utf-8");
  const configPaths = entries.map((e) => e.path).sort();
  const nginxAuthOff = [];

  // Extract paths from nginx that have auth_request off
  const locationRegex = /location\s+(?:=\s+|~\*?\s+|~\s+)?(\S+)\s*\{[^}]*auth_request\s+off/g;
  let m;
  while ((m = locationRegex.exec(nginx)) !== null) {
    nginxAuthOff.push(m[1]);
  }
  nginxAuthOff.sort();

  const inConfigOnly = configPaths.filter((p) => !nginxAuthOff.includes(p));
  const inNginxOnly = nginxAuthOff.filter((p) => !configPaths.includes(p));

  if (inConfigOnly.length === 0 && inNginxOnly.length === 0) {
    console.log("Config and nginx are in sync.");
  } else {
    if (inConfigOnly.length > 0) {
      console.log("In config but NOT in nginx:");
      inConfigOnly.forEach((p) => console.log(`  + ${p}`));
    }
    if (inNginxOnly.length > 0) {
      console.log("In nginx but NOT in config:");
      inNginxOnly.forEach((p) => console.log(`  - ${p}`));
    }
  }
  process.exit(0);
}

// Default: generate
if (errors.length > 0) {
  console.error("Config errors (fix before generating):");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log("# Auto-generated nginx location blocks");
console.log(`# Source: deploy/public-urls.conf (${entries.length} entries)`);
console.log(`# Generated: ${new Date().toISOString()}\n`);

for (const entry of entries) {
  console.log(generateBlock(entry));
  console.log();
}
