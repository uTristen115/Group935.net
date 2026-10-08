const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const htmlRoots = [
  'index.html',
  '404.html',
  'site-index',
  'games',
  'maps',
  'perks',
  'gobblegums',
  'relics',
  'black-ops-7',
  'black-ops-7-easter-eggs',
  'black-ops-7-easter-egg-tutorials',
  'black-ops-7-relics',
  'zombies-easter-eggs',
  'zombies-easter-egg-tutorials',
  'cod-zombies',
  'call-of-duty-zombies',
  'black-ops-zombies',
  'treyarch-zombies',
  'easter-eggs',
  'contribute',
];
const manifestPath = path.join(root, 'dist', 'asset-manifest.json');

function readManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const dataFile = manifest && manifest.bundles && manifest.bundles.data && manifest.bundles.data.file;
  const appFile = manifest && manifest.bundles && manifest.bundles.app && manifest.bundles.app.file;
  if (!dataFile || !appFile) throw new Error('dist/asset-manifest.json is missing data/app bundle filenames.');
  for (const file of [dataFile, appFile, 'data.js', 'app.js']) {
    if (!fs.existsSync(path.join(root, 'dist', file))) {
      throw new Error('Missing dist bundle: ' + file);
    }
  }
  return { dataFile, appFile };
}

function assertCleanDist(bundles) {
  const allowed = new Set(['asset-manifest.json', 'data.js', 'app.js', bundles.dataFile, bundles.appFile]);
  const stale = [];
  for (const entry of fs.readdirSync(path.join(root, 'dist'), { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!/^(app|data)\.[0-9a-f]{12}\.js$/.test(entry.name)) continue;
    if (!allowed.has(entry.name)) stale.push(entry.name);
  }
  if (stale.length) {
    throw new Error('Stale hashed bundles found in dist: ' + stale.join(', '));
  }
}

function walkHtml(target) {
  const full = path.join(root, target);
  if (!fs.existsSync(full)) return [];
  const stat = fs.statSync(full);
  if (stat.isFile()) return target.endsWith('.html') ? [full] : [];
  const files = [];
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const child = path.join(full, entry.name);
    if (entry.isDirectory()) files.push(...walkHtml(path.relative(root, child)));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(child);
  }
  return files;
}

function parseInlineScripts(files) {
  let checked = 0;
  const failures = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = scriptRe.exec(html))) {
      const attrs = match[1] || '';
      if (/\bsrc\s*=/.test(attrs)) continue;
      const type = attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i);
      if (type && !/^(text|application)\/javascript$/i.test(type[1]) && !/^module$/i.test(type[1])) continue;
      const code = match[2].trim();
      if (!code) continue;
      try {
        new Function(code);
        checked += 1;
      } catch (err) {
        failures.push(path.relative(root, file) + ': ' + err.message);
      }
    }
  }
  if (failures.length) {
    throw new Error('Inline script parse failures:\n' + failures.join('\n'));
  }
  return checked;
}

function parseJsonLd(files) {
  let checked = 0;
  const failures = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = scriptRe.exec(html))) {
      const attrs = match[1] || '';
      if (!/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
      const json = match[2].trim();
      if (!json) continue;
      try {
        JSON.parse(json);
        checked += 1;
      } catch (err) {
        failures.push(path.relative(root, file) + ': ' + err.message);
      }
    }
  }
  if (failures.length) {
    throw new Error('JSON-LD parse failures:\n' + failures.join('\n'));
  }
  return checked;
}

function assertRelicSeoRoutes() {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  if (!sitemap.includes('https://group935.net/black-ops-7-relics/')) {
    throw new Error('Sitemap is missing the Black Ops 7 relics canonical route.');
  }
  if (sitemap.includes('https://group935.net/relics/')) {
    throw new Error('Sitemap should list Black Ops 7 relic canonical URLs, not /relics/ aliases.');
  }
  const landing = fs.readFileSync(path.join(root, 'black-ops-7-relics', 'index.html'), 'utf8');
  if (!landing.includes('Black Ops 7 Zombies Relics Guide') || !landing.includes('/black-ops-7-relics/lawyers-pen/')) {
    throw new Error('Black Ops 7 relic landing page is missing static SEO content.');
  }
  for (const file of walkHtml('black-ops-7-relics').concat(walkHtml('relics'))) {
    const html = fs.readFileSync(file, 'utf8');
    if (/Relic Relic/.test(html)) {
      throw new Error('Duplicate relic label found in ' + path.relative(root, file));
    }
  }
}

function assertTopicSeoRoutes() {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const canonicalRoutes = [
    'https://group935.net/black-ops-7/',
    'https://group935.net/black-ops-7-easter-eggs/',
    'https://group935.net/black-ops-7-easter-egg-tutorials/',
    'https://group935.net/zombies-easter-eggs/',
    'https://group935.net/zombies-easter-egg-tutorials/',
    'https://group935.net/cod-zombies/',
    'https://group935.net/black-ops-zombies/',
    'https://group935.net/treyarch-zombies/',
  ];
  for (const url of canonicalRoutes) {
    if (!sitemap.includes(url)) throw new Error('Sitemap is missing topic route: ' + url);
  }
  if (sitemap.includes('https://group935.net/call-of-duty-zombies/')) {
    throw new Error('Sitemap should list /cod-zombies/, not the call-of-duty-zombies alias.');
  }
  if (sitemap.includes('https://group935.net/games/bo7/')) {
    throw new Error('Sitemap should list /black-ops-7/, not the /games/bo7/ alias.');
  }
  const checks = [
    ['black-ops-7', 'Black Ops 7 Zombies'],
    ['black-ops-7-easter-eggs', 'Black Ops 7 Easter Eggs'],
    ['black-ops-7-easter-egg-tutorials', 'Black Ops 7 Easter Egg Tutorials'],
    ['zombies-easter-eggs', 'Zombies Easter Eggs'],
    ['zombies-easter-egg-tutorials', 'Zombies Easter Egg Tutorials'],
    ['cod-zombies', 'Call of Duty Zombies'],
    ['black-ops-zombies', 'Black Ops Zombies'],
    ['treyarch-zombies', 'Treyarch Zombies'],
  ];
  for (const [dir, phrase] of checks) {
    const html = fs.readFileSync(path.join(root, dir, 'index.html'), 'utf8');
    if (!html.includes(phrase) || !html.includes('pap-route-jsonld')) {
      throw new Error('Topic SEO route is missing static content or JSON-LD: ' + dir);
    }
  }
  const alias = fs.readFileSync(path.join(root, 'call-of-duty-zombies', 'index.html'), 'utf8');
  if (!alias.includes('https://group935.net/cod-zombies/')) {
    throw new Error('/call-of-duty-zombies/ alias is not canonicalized to /cod-zombies/.');
  }
  const bo7Alias = fs.readFileSync(path.join(root, 'games', 'bo7', 'index.html'), 'utf8');
  if (!bo7Alias.includes('https://group935.net/black-ops-7/')) {
    throw new Error('/games/bo7/ alias is not canonicalized to /black-ops-7/.');
  }
}

function assertSiteIndexRoutes() {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const required = [
    'https://group935.net/site-index/',
    'https://group935.net/maps/nacht/',
    'https://group935.net/maps/kino/',
    'https://group935.net/maps/totenreich/',
    'https://group935.net/gobblegums/',
  ];
  for (const url of required) {
    if (!sitemap.includes(url)) throw new Error('Sitemap is missing crawl index route: ' + url);
  }
  const siteIndex = fs.readFileSync(path.join(root, 'site-index', 'index.html'), 'utf8');
  for (const phrase of ['Group 935 Site Index', '/black-ops-7/', '/black-ops-7-easter-eggs/', '/zombies-easter-eggs/', '/maps/nacht/', '/black-ops-7-relics/summoning-key/', '/gobblegums/']) {
    if (!siteIndex.includes(phrase)) throw new Error('Site index is missing expected crawl link/content: ' + phrase);
  }
  const ashes = fs.readFileSync(path.join(root, 'maps', 'ashes', 'index.html'), 'utf8');
  if (!ashes.includes('Ashes of the Damned Black Ops 7 Easter Egg Guide') || !ashes.includes('/black-ops-7-easter-eggs/')) {
    throw new Error('Generated Black Ops 7 map SEO page is missing targeted map metadata.');
  }
  const kino = fs.readFileSync(path.join(root, 'maps', 'kino', 'index.html'), 'utf8');
  if (!kino.includes('Kino der Toten Zombies Easter Egg Guide') || kino.includes('map file for Black Ops 7 Zombies')) {
    throw new Error('Generated classic map SEO page has incorrect map metadata.');
  }
}

function assertGeneratedShells(files, bundles) {
  const failures = [];
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    if (html.includes('replace(//$')) failures.push(rel + ': malformed loader regex');
    if (/text\/babel|@babel\/standalone|react\.development|react-dom\.development/.test(html)) {
      failures.push(rel + ': development runtime found');
    }
    if (!html.includes("loadScript(base + '/' + dataBundle") || !html.includes("loadScript(base + '/' + appBundle")) {
      failures.push(rel + ': shared data/app loader missing');
    }
    if (!html.includes(`window.G935_DATA_BUNDLE = '${bundles.dataFile}'`)) {
      failures.push(rel + ': current data bundle filename missing');
    }
    if (!html.includes(`window.G935_APP_BUNDLE = '${bundles.appFile}'`)) {
      failures.push(rel + ': current app bundle filename missing');
    }
  }
  if (failures.length) {
    throw new Error('Generated shell checks failed:\n' + failures.join('\n'));
  }
}

function readSourceData() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'src', 'data.js'), 'utf8'), context, { filename: 'src/data.js' });
  return context.window.ZD;
}

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
  return String(value).replace(/[&<>"']/g, (char) => entities[char]);
}

function readStaticContent(route) {
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  const matches = [...html.matchAll(/<main id="seo-static-content" class="seo-static-content">([\s\S]*?)<\/main>/g)];
  if (matches.length !== 1 || !matches[0][1].includes('<h1>')) {
    throw new Error('Expected one substantive static content block: ' + (route || '/'));
  }
  return matches[0][1];
}

function assertContainsText(html, value, label) {
  if (value && !html.includes(escapeHtml(value))) throw new Error('Static content missing ' + label + ': ' + value);
}

function sourceEasterEggs(data) {
  return [data.sampleEE, ...(data.classicEasterEggs || []), ...(data.bo7EasterEggs || [])]
    .filter(Boolean)
    .filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index);
}

function assertSubstantiveStaticContent(data) {
  const eggs = sourceEasterEggs(data);
  for (const egg of eggs) {
    const html = readStaticContent('easter-eggs/' + egg.id);
    for (const field of ['title', 'summary', 'difficulty', 'duration', 'party']) {
      assertContainsText(html, egg[field], egg.id + ' ' + field);
    }
    for (const field of ['requirements', 'rewards']) {
      const values = egg[field] || [];
      if (!values.length) continue;
      const heading = field[0].toUpperCase() + field.slice(1);
      const section = html.match(new RegExp('<h2>' + heading + '</h2>([\\s\\S]*?)(?=<h2>|$)'));
      if (!section) throw new Error('Missing ' + field + ' section: ' + egg.id);
      for (const value of values) assertContainsText(section[1], value, egg.id + ' ' + field);
    }
    if ((html.match(/<h3>/g) || []).length !== (egg.steps || []).length) {
      throw new Error('Incomplete walkthrough step count: ' + egg.id);
    }
    for (const step of egg.steps || []) {
      assertContainsText(html, step.title, egg.id + ' step title');
      assertContainsText(html, step.body, egg.id + ' step body');
      for (const bullet of step.bullets || []) assertContainsText(html, bullet, egg.id + ' step bullet');
    }
    if (!html.includes('href="/maps/' + escapeHtml(egg.map) + '/"')) {
      throw new Error('Guide is missing its map link: ' + egg.id);
    }
  }

  for (const map of data.maps) {
    const html = readStaticContent('maps/' + map.id);
    for (const field of ['name', 'location', 'summary']) assertContainsText(html, map[field], map.id + ' ' + field);
    for (const tag of map.tags || []) assertContainsText(html, tag, map.id + ' tag');
    for (const song of map.songs || []) {
      for (const field of ['name', 'artist', 'activation']) assertContainsText(html, song[field], map.id + ' song ' + field);
    }
    for (const egg of eggs.filter((egg) => egg.map === map.id)) {
      if (!html.includes('href="/easter-eggs/' + escapeHtml(egg.id) + '/"')) {
        throw new Error('Map is missing its published guide link: ' + map.id);
      }
    }
  }

  const perkHub = readStaticContent('perks');
  for (const perk of data.perks) {
    const html = readStaticContent('perks/' + perk.id);
    for (const field of ['name', 'effect', 'introduced', 'summary']) assertContainsText(html, perk[field], perk.id + ' ' + field);
    for (const id of perk.gameIds || []) {
      const game = data.games.find((game) => game.id === id);
      if (game) assertContainsText(html, game.title, perk.id + ' game appearance');
    }
    assertContainsText(perkHub, perk.effect, perk.id + ' hub effect');
    if (!perkHub.includes('href="/perks/' + escapeHtml(perk.id) + '/"')) throw new Error('Perk hub is missing: ' + perk.id);
  }
  for (const hub of ['maps', 'games']) {
    const html = readStaticContent(hub);
    for (const map of data.maps) {
      if (!html.includes('href="/maps/' + escapeHtml(map.id) + '/"')) throw new Error(hub + ' hub is missing: ' + map.id);
    }
  }
  const home = readStaticContent('');
  for (const href of ['/maps/', '/games/', '/perks/', '/zombies-easter-eggs/', '/black-ops-7-relics/']) {
    if (!home.includes('href="' + href + '"')) throw new Error('Homepage is missing archive link: ' + href);
  }
}

function assertSitemapIntegrity(data, files) {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!urls.length || new Set(urls).size !== urls.length) throw new Error('Sitemap is empty or contains duplicate URLs.');
  if (/<lastmod>/.test(sitemap)) throw new Error('Sitemap must not claim per-build modification dates without verified content timestamps.');
  const expectedRoutes = new Set([
    '/', '/games/', '/maps/', '/site-index/', '/black-ops-7/', '/black-ops-7-easter-eggs/',
    '/black-ops-7-easter-egg-tutorials/', '/black-ops-7-relics/', '/zombies-easter-eggs/',
    '/zombies-easter-egg-tutorials/', '/cod-zombies/', '/black-ops-zombies/', '/treyarch-zombies/',
    '/perks/', '/gobblegums/', '/contribute/',
    ...data.maps.map((item) => '/maps/' + item.id + '/'),
    ...data.perks.map((item) => '/perks/' + item.id + '/'),
    ...data.relics.map((item) => '/black-ops-7-relics/' + item.id + '/'),
    ...sourceEasterEggs(data).map((item) => '/easter-eggs/' + item.id + '/'),
  ]);
  const actualRoutes = new Set();
  for (const url of urls) {
    const parsed = new URL(url);
    if (parsed.origin !== 'https://group935.net' || parsed.search || parsed.hash || !parsed.pathname.endsWith('/')) {
      throw new Error('Invalid canonical sitemap URL: ' + url);
    }
    if (!expectedRoutes.has(parsed.pathname)) throw new Error('Unexpected or alias sitemap route: ' + parsed.pathname);
    actualRoutes.add(parsed.pathname);
    const file = path.join(root, parsed.pathname.slice(1), 'index.html');
    if (!fs.existsSync(file)) throw new Error('Sitemap URL has no generated file: ' + url);
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('<link rel="canonical" href="' + url + '"')) throw new Error('Sitemap/file canonical mismatch: ' + url);
  }
  for (const route of expectedRoutes) {
    if (!actualRoutes.has(route)) throw new Error('Sitemap is missing app content: ' + route);
  }
  for (const file of files) {
    const relative = path.relative(root, file).replace(/\\/g, '/');
    if (relative === '404.html') continue;
    let route = relative === 'index.html' ? '/' : '/' + relative.replace(/index\.html$/, '');
    route = route.replace(/^\/relics(?=\/)/, '/black-ops-7-relics');
    if (route === '/games/bo7/') route = '/black-ops-7/';
    if (route === '/call-of-duty-zombies/') route = '/cod-zombies/';
    const html = fs.readFileSync(file, 'utf8');
    if (!actualRoutes.has(route) || !html.includes('<link rel="canonical" href="https://group935.net' + route + '"')) {
      throw new Error('Generated file has an incorrect or unlisted canonical: ' + relative);
    }
  }
}

function assertHomepageBranding(files) {
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const title = escapeHtml('Group935 | CoD Zombies Easter Eggs, Maps & Relics');
  for (const expected of ['<title>' + title + '</title>', '<meta property="og:title" content="' + title + '"', '<meta name="twitter:title" content="' + title + '"']) {
    if (!home.includes(expected)) throw new Error('Homepage branding mismatch: ' + expected);
  }
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('<meta property="og:site_name" content="Group935"')) throw new Error('Incorrect OG site name: ' + path.relative(root, file));
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap((match) => { const schema = JSON.parse(match[1]); return schema['@graph'] || [schema]; });
    if (!schemas.some((schema) => schema['@type'] === 'WebSite' && schema.name === 'Group935')) {
      throw new Error('Missing Group935 WebSite name: ' + path.relative(root, file));
    }
  }
}

function smokeSharedBundles(bundles) {
  const errors = [];
  let mounted = false;
  const context = {
    console,
    setTimeout,
    clearTimeout,
    window: null,
    document: {
      getElementById(id) { return { id }; },
      body: { classList: { add(cls) { if (cls === 'booted') mounted = true; } } },
    },
    location: { pathname: '/', protocol: 'file:', hostname: 'localhost', hash: '', search: '' },
    history: { pushState() {}, replaceState() {} },
    navigator: { userAgent: 'build-smoke' },
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
    fetch() { return Promise.resolve({ ok: true, json: () => Promise.resolve({}) }); },
    __bootShow(label, err) { errors.push({ label, err: String((err && err.message) || err) }); },
  };
  context.window = context;
  context.React = {
    Component: class { constructor(props) { this.props = props || {}; this.state = {}; } },
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
    useState(initial) { return [typeof initial === 'function' ? initial() : initial, () => {}]; },
    useMemo(fn) { return fn(); },
    useEffect() {},
    useCallback(fn) { return fn; },
  };
  context.ReactDOM = {
    createRoot() { return { render() { mounted = true; } }; },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', bundles.dataFile), 'utf8'), context, { filename: 'dist/' + bundles.dataFile });
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', bundles.appFile), 'utf8'), context, { filename: 'dist/' + bundles.appFile });
  if (!context.window.ZD) throw new Error('ZD missing after data bundle.');
  if (!context.window.PackAPunch) throw new Error('PackAPunch missing after app bundle.');
  if (context.window.__papBuildRoutePath({ name: 'ee', id: 'ashes-main-quest' }) !== '/easter-eggs/ashes-main-quest/') {
    throw new Error('Client route builder must return the canonical trailing-slash Easter egg URL.');
  }
  if (context.window.__papBuildRoutePath({ name: 'game', id: 'bo7' }) !== '/black-ops-7/') {
    throw new Error('Client route builder must canonicalize Black Ops 7 to /black-ops-7/.');
  }
  context.window.G935_ROUTE_PATH = '/maps/kino';
  context.location.protocol = 'https:';
  context.location.pathname = '/';
  if (context.window.__papParseCurrentRoute().name !== 'home') {
    throw new Error('Live navigation to home must ignore the initial static entry route.');
  }
  context.location.pathname = '/maps/ascension/';
  let currentRoute = context.window.__papParseCurrentRoute();
  if (currentRoute.name !== 'map' || currentRoute.id !== 'ascension') {
    throw new Error('Live map navigation must follow the current URL, not the initial static entry route.');
  }
  context.location.protocol = 'file:';
  currentRoute = context.window.__papParseCurrentRoute();
  if (currentRoute.name !== 'map' || currentRoute.id !== 'kino') {
    throw new Error('Local file entry pages must retain the static G935_ROUTE_PATH fallback.');
  }
  if (!mounted) throw new Error('App did not reach the mount path.');
  if (errors.length) throw new Error('Boot errors: ' + JSON.stringify(errors));
}

const htmlFiles = htmlRoots.flatMap(walkHtml);
const bundles = readManifest();
assertCleanDist(bundles);
assertGeneratedShells(htmlFiles, bundles);
const scriptCount = parseInlineScripts(htmlFiles);
const jsonLdCount = parseJsonLd(htmlFiles);
assertRelicSeoRoutes();
assertTopicSeoRoutes();
assertSiteIndexRoutes();
const sourceData = readSourceData();
assertSubstantiveStaticContent(sourceData);
assertSitemapIntegrity(sourceData, htmlFiles);
assertHomepageBranding(htmlFiles);
smokeSharedBundles(bundles);

console.log('Build check passed: ' + htmlFiles.length + ' HTML files, ' + scriptCount + ' inline scripts, ' + jsonLdCount + ' JSON-LD blocks, shared bundle smoke.');
