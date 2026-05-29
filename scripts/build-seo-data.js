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
if (!zd || !Array.isArray(zd.relics) || !Array.isArray(zd.maps) || !Array.isArray(zd.games)) {
  throw new Error('src/data.js did not expose the expected Group 935 data.');
}

const mapsById = new Map(zd.maps.map((map) => [map.id, map]));
const gamesById = new Map(zd.games.map((game) => [game.id, game]));
const mapName = (id) => {
  const map = mapsById.get(id);
  return map ? map.name : id || '';
};
const gameTitle = (id) => {
  const game = gamesById.get(id);
  return game ? game.title : id || '';
};
const mapGameTitle = (mapId) => {
  const map = mapsById.get(mapId);
  return map ? gameTitle(map.game) : '';
};
const relics = zd.relics.map((relic) => {
  const map = mapsById.get(relic.map);
  return {
    id: relic.id,
    name: relic.name,
    map: relic.map,
    mapName: map ? map.name : relic.map,
    tier: relic.tier || '',
    difficulty: relic.difficulty || '',
    cursed: relic.cursed || '',
    status: relic.status || '',
    effect: relic.effect || '',
    requirements: Array.isArray(relic.requirements) ? relic.requirements : [],
    unlock: Array.isArray(relic.unlock) ? relic.unlock : [],
    portal: relic.portal || '',
    trial: relic.trial || '',
    save: relic.save || '',
    prep: Array.isArray(relic.prep) ? relic.prep : [],
  };
});
const easterEggs = []
  .concat((zd.classicEasterEggs || []).map((ee) => ({ ...ee, era: 'classic' })))
  .concat((zd.bo7EasterEggs || []).map((ee) => ({ ...ee, era: 'bo7' })))
  .map((ee) => ({
    id: ee.id,
    title: ee.title,
    map: ee.map || '',
    mapName: mapName(ee.map),
    gameTitle: mapGameTitle(ee.map),
    era: ee.era,
    summary: ee.summary || '',
    requirements: Array.isArray(ee.requirements) ? ee.requirements : [],
    stepCount: Array.isArray(ee.steps) ? ee.steps.length : 0,
  }));

const seoData = {
  generatedAt: new Date().toISOString(),
  games: zd.games.map((game) => ({
    id: game.id,
    code: game.code || '',
    title: game.title,
    year: game.year || '',
    era: game.era || '',
    mapCount: game.mapCount || zd.maps.filter((map) => map.game === game.id).length,
  })),
  maps: zd.maps.map((map) => ({
    id: map.id,
    name: map.name,
    game: map.game,
    gameTitle: gameTitle(map.game),
    location: map.location || '',
    difficulty: map.difficulty || '',
    eeCount: map.eeCount || 0,
    relicCount: relics.filter((relic) => relic.map === map.id).length || map.relicCount || 0,
    summary: map.summary || '',
    tags: Array.isArray(map.tags) ? map.tags : [],
  })),
  easterEggs,
  relics,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(seoData, null, 2) + '\n', 'utf8');

console.log(`Built dist/seo-data.json with ${relics.length} relic records and ${easterEggs.length} Easter egg records`);
