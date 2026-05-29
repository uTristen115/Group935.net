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
  'black-ops-7-relics',
  'zombies-easter-eggs',
  'zombies-easter-egg-tutorials',
  'cod-zombies',
  'call-of-duty-zombies',
  'black-ops-zombies',
  'treyarch-zombies',
  'easter-eggs',
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
  const checks = [
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
  for (const phrase of ['Group 935 Site Index', '/zombies-easter-eggs/', '/maps/nacht/', '/black-ops-7-relics/summoning-key/', '/gobblegums/']) {
    if (!siteIndex.includes(phrase)) throw new Error('Site index is missing expected crawl link/content: ' + phrase);
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
smokeSharedBundles(bundles);

console.log('Build check passed: ' + htmlFiles.length + ' HTML files, ' + scriptCount + ' inline scripts, ' + jsonLdCount + ' JSON-LD blocks, shared bundle smoke.');
