const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
module.exports = function checkRoutePages(data) {
  const pages = require('./build-route-pages')(data);
  assert.equal(new Set(pages.map((p) => p.route)).size, pages.length, 'Duplicate route');
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page.route, 'index.html'), 'utf8');
    assert(html.includes(page.html), 'Static content mismatch: ' + page.route);
    assert(html.includes('https://group935.net' + page.route + '/'), 'Missing canonical: ' + page.route);
    for (const match of page.html.matchAll(/href="(\/[^"#?]*)"/g)) {
      assert(fs.existsSync(path.join(root, match[1], 'index.html')), 'Broken link: ' + page.route + ' -> ' + match[1]);
    }
  }
  const fallback = fs.readFileSync(path.join(root, '404.html'), 'utf8');
  assert(fallback.includes('<h1>Page not found</h1>'));
  assert(fallback.includes('content="noindex, follow"'));
  assert(!fallback.includes('<link rel="canonical"'));
  const seo = JSON.parse(fs.readFileSync(path.join(root, 'dist/seo-data.json'), 'utf8'));
  for (const map of seo.maps) assert.equal(map.relicCount, data.relics.filter((r) => r.map === map.id).length, 'Wrong relic count: ' + map.id);
  for (const game of data.games) {
    const route = game.id === 'bo7' ? 'black-ops-7' : 'games/' + game.id;
    assert(fs.existsSync(path.join(root, route, 'index.html')), 'Missing game: ' + game.id);
  }
  console.log('Route coverage passed: ' + pages.filter((p) => p.indexable).length + ' additional content entries; ' + pages.filter((p) => !p.indexable).length + ' noindex utilities; fallback and relic counts.');
};
