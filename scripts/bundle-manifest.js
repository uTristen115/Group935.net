const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'dist');
const manifestPath = path.join(outputDir, 'asset-manifest.json');

function readManifest() {
  if (!fs.existsSync(manifestPath)) return { bundles: {} };
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return parsed && parsed.bundles ? parsed : { bundles: {} };
  } catch (err) {
    return { bundles: {} };
  }
}

function writeManifest(manifest) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

function removeStaleHashedBundles(name, currentFile) {
  const hashedBundlePattern = new RegExp('^' + name + '\\.[0-9a-f]{12}\\.js$');
  for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (entry.name === currentFile) continue;
    if (!hashedBundlePattern.test(entry.name)) continue;
    fs.unlinkSync(path.join(outputDir, entry.name));
  }
}

function contentHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
}

function writeBundle({ name, source, code }) {
  const banner = `/* Generated from ${source}. Do not edit dist/${name}.js directly. */`;
  const content = [banner, code, ''].join('\n');
  const hash = contentHash(content);
  const stableFile = `${name}.js`;
  const hashedFile = `${name}.${hash}.js`;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, stableFile), content, 'utf8');
  fs.writeFileSync(path.join(outputDir, hashedFile), content, 'utf8');
  removeStaleHashedBundles(name, hashedFile);

  const manifest = readManifest();
  manifest.bundles[name] = {
    file: hashedFile,
    stableFile,
    hash,
    bytes: Buffer.byteLength(content, 'utf8'),
  };
  writeManifest(manifest);

  return manifest.bundles[name];
}

module.exports = { outputDir, writeBundle };
