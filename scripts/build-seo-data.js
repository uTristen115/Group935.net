const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src', 'data.js');
const outputDir = path.join(root, 'dist');
const outputPath = path.join(outputDir, 'seo-data.json');

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: 'src/data.js' });

const zd = context.window.ZD;
if (!zd || !Array.isArray(zd.relics) || !Array.isArray(zd.maps)) {
  throw new Error('src/data.js did not expose the expected Group 935 data.');
}

const mapsById = new Map(zd.maps.map((map) => [map.id, map]));
const relics = zd.relics.map((relic) => {
  const map = mapsById.get(relic.map);
  return {
    id: relic.id,
    name: relic.name,
    map: relic.map,
    mapName: map ? map.name : relic.map,
    tier: relic.tier || '',
    difficulty: relic.difficulty || '',
    status: relic.status || '',
    effect: relic.effect || '',
    unlock: Array.isArray(relic.unlock) ? relic.unlock : [],
    portal: relic.portal || '',
    trial: relic.trial || '',
    save: relic.save || '',
    prep: Array.isArray(relic.prep) ? relic.prep : [],
  };
});

const seoData = {
  generatedAt: new Date().toISOString(),
  maps: zd.maps
    .filter((map) => map.game === 'bo7')
    .map((map) => ({
      id: map.id,
      name: map.name,
      relicCount: relics.filter((relic) => relic.map === map.id).length,
    })),
  relics,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(seoData, null, 2) + '\n', 'utf8');

console.log(`Built dist/seo-data.json with ${relics.length} relic records`);
