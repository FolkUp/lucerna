#!/usr/bin/env node
/**
 * encrypt-reviews.mjs
 *
 * Encrypts HTML files in public/reviews/ using StatiCrypt (AES-256-CBC, client-side).
 * Run AFTER `hugo --gc --minify` and BEFORE deployment.
 *
 * Usage:
 *   node scripts/encrypt-reviews.mjs --password <password> [--input public/reviews] [--output deploy/reviews]
 *
 * Each review file can have its own password via a config file:
 *   scripts/reviews-passwords.json (gitignored)
 *   Format: { "review-client-a.html": "password-a", "review-client-b.html": "password-b" }
 *
 * If no per-file config exists, uses the --password flag for all files.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const inputDir = getArg("input", "public/reviews");
const outputDir = getArg("output", "deploy/reviews");
const defaultPassword = getArg("password", "");
const configPath = "scripts/reviews-passwords.json";

if (!existsSync(inputDir)) {
  console.error(`Input directory not found: ${inputDir}`);
  console.error("Run 'hugo --gc --minify' first to generate public/ output.");
  process.exit(1);
}

// Load per-file passwords if available
let passwords = {};
if (existsSync(configPath)) {
  passwords = JSON.parse(readFileSync(configPath, "utf-8"));
  console.log(`Loaded per-file passwords from ${configPath}`);
}

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Find HTML files to encrypt
const htmlFiles = readdirSync(inputDir).filter(
  (f) => f.endsWith(".html") && f !== "index.html"
);

if (htmlFiles.length === 0) {
  console.log("No review HTML files found to encrypt (index.html is skipped).");
  console.log("Add individual review pages under content/reviews/ to encrypt them.");
  process.exit(0);
}

let encrypted = 0;
let errors = 0;

for (const file of htmlFiles) {
  const password = passwords[file] || defaultPassword;
  if (!password) {
    console.error(`No password for ${file} — skipping. Set via config or --password flag.`);
    errors++;
    continue;
  }

  const inputPath = join(inputDir, file);
  const outputPath = join(outputDir, file);

  try {
    execFileSync(
      "npx",
      ["staticrypt", inputPath, "-p", password, "-o", outputPath, "--short"],
      { stdio: "pipe", shell: false }
    );
    console.log(`Encrypted: ${file}`);
    encrypted++;
  } catch (err) {
    console.error(`Failed to encrypt ${file}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone: ${encrypted} encrypted, ${errors} errors.`);
if (errors > 0) process.exit(1);
