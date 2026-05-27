const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { writeBundle } = require('./bundle-manifest');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src', 'data.js');

const source = fs.readFileSync(sourcePath, 'utf8');

if (!/window\.ZD\s*=\s*\(function\s*\(\)\s*\{/.test(source)) {
  throw new Error('src/data.js does not look like the Group 935 data source.');
}

const result = babel.transformSync(source, {
  filename: 'src/data.js',
  sourceType: 'script',
  comments: false,
  compact: true,
  minified: true,
});

if (!result || !result.code) {
  throw new Error('Babel did not produce compiled data code.');
}

const bundle = writeBundle({
  name: 'data',
  source: 'scripts/build-data.js from src/data.js',
  code: result.code,
});

console.log(`Built dist/data.js and dist/${bundle.file} from src/data.js`);
