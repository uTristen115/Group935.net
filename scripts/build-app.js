const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { writeBundle } = require('./bundle-manifest');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src', 'app.jsx');

const source = fs.readFileSync(sourcePath, 'utf8');
const result = babel.transformSync(source, {
  filename: 'src/app.jsx',
  sourceType: 'script',
  presets: [
    [require.resolve('@babel/preset-react'), { runtime: 'classic' }],
  ],
  comments: false,
  compact: true,
  minified: true,
});

if (!result || !result.code) {
  throw new Error('Babel did not produce compiled app code.');
}

const bundle = writeBundle({
  name: 'app',
  source: 'scripts/build-app.js from src/app.jsx',
  code: result.code,
});

console.log(`Built dist/app.js and dist/${bundle.file} from src/app.jsx`);
