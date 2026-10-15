const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');

function checkGuideContent({ staticPages = true } = {}) {
  const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
  const context = {
    console, setTimeout, clearTimeout, URL,
    location: { pathname: '/', protocol: 'https:', hostname: 'localhost', hash: '', search: '' },
    document: { getElementById: () => ({}), body: { classList: { add() {} } } },
    __bootShow(label, error) { throw new Error(label + ': ' + error); },
    ReactDOM: { createRoot: () => ({ render() {} }) },
  };
  let state = [], cursor = 0;
  const readKeys = [];
  context.localStorage = { getItem(key) { readKeys.push(key); return null; }, setItem() {} };
  context.React = {
    Component: class {},
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
    useState(initial) {
      const slot = cursor++;
      if (!(slot in state)) state[slot] = typeof initial === 'function' ? initial() : initial;
      return [state[slot], (next) => { state[slot] = typeof next === 'function' ? next(state[slot]) : next; }];
    },
    useMemo: (fn) => fn(), useCallback: (fn) => fn, useEffect() {},
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(read('dist/data.js'), context);
  vm.runInContext(read('dist/app.js'), context);
  const data = context.ZD;
  const guide = data.sampleEE;
  assert.equal(guide.id, 'kindertot', 'Existing guide URL must stay available');
  assert.equal(guide.title, 'Citadelle des Morts');
  assert.equal(guide.guideStatus, 'partial');
  assert.equal(guide.steps.length, 4);
  assert.equal(guide.rewards.length, 0, 'Do not retain unverified rewards');
  for (const name of ['Caliburn', 'Durendal', 'Balmung', 'Solais']) assert(JSON.stringify(guide).includes(name));
  assert(!/Stachel|Krause|\bUll\b|blacksmith|Carolingian|Seal the Rift|Awaken the Knight|chapel basement/i.test(JSON.stringify(guide)));
  assert.equal(guide.sources.length, 2);
  for (const source of guide.sources) assert.equal(new URL(source.url).hostname, 'www.callofduty.com');
  const legacy = { window: {} };
  vm.createContext(legacy); vm.runInContext(read('data/zombies-data.js'), legacy);
  assert.equal(JSON.stringify(guide), JSON.stringify(legacy.window.ZD.sampleEE), 'Prototype data must not reintroduce old instructions');

  const walk = (node, predicate, found = []) => {
    if (!node || typeof node !== 'object') return found;
    if (Array.isArray(node)) { for (const child of node) walk(child, predicate, found); return found; }
    if (predicate(node)) found.push(node);
    for (const child of node.children || []) walk(child, predicate, found);
    return found;
  };
  const text = (node) => node == null || node === false ? '' : typeof node !== 'object' ? String(node) : (Array.isArray(node) ? node : node.children || []).map(text).join(' ');
  const render = (component, fresh = false) => { if (fresh) state = []; cursor = 0; return component.type(component.props); };
  const pageAt = (route) => {
    context.location.pathname = route;
    state = []; cursor = 0;
    return context.PackAPunch().children[0];
  };
  const eggs = [data.sampleEE, ...data.classicEasterEggs, ...data.bo7EasterEggs];
  for (const [route, tutorials, bo7] of [
    ['/black-ops-7-easter-eggs/', false, true], ['/black-ops-7-easter-egg-tutorials/', true, true],
    ['/zombies-easter-eggs/', false, false], ['/zombies-easter-egg-tutorials/', true, false],
  ]) {
    const page = pageAt(route);
    assert.equal(page.props.key, route.slice(1, -1), 'Hub changes must reset filter state');
    let tree = render(page, true);
    assert(text(tree).includes(tutorials ? 'setup requirements are in each guide' : 'Choose a map'), 'Hub guidance must render visibly');
    let cards = walk(tree, (node) => typeof node.type === 'function' && node.type.name === 'MapCard');
    const expected = data.maps.filter((map) => (!bo7 || map.game === 'bo7') && (!tutorials || eggs.some((ee) => ee.map === map.id && ee.steps.length)));
    assert.equal(cards.length, expected.length, 'Wrong hub scope: ' + route);
    for (const card of cards) {
      const link = render(card, true);
      assert.equal(link.props.to.name, tutorials ? 'ee' : 'map');
      assert.equal(card.props.map.game === 'bo7' || !bo7, true);
      if (tutorials) assert(card.props.detail.includes('steps'));
    }
    // Repeated filter clicks and a sort change must preserve scope and targets.
    tree = render(page, true);
    if (tutorials && !bo7) {
      const emptyGame = walk(tree, (node) => node.type === 'button' && text(node) === 'BO2')[0];
      emptyGame.props.onClick(); tree = render(page);
      assert(text(tree).includes('No walkthroughs published for this game yet'));
      assert.equal(walk(tree, (node) => typeof node.type === 'function' && node.type.name === 'MapCard').length, 0);
    }
    const all = walk(tree, (node) => node.type === 'button' && text(node) === 'All')[0];
    all.props.onClick(); all.props.onClick();
    const byName = walk(tree, (node) => node.type === 'button' && text(node) === 'Name')[0];
    byName.props.onClick();
    tree = render(page);
    cards = walk(tree, (node) => typeof node.type === 'function' && node.type.name === 'MapCard');
    assert.equal(cards.length, expected.length);
    const names = cards.map((card) => card.props.map.name);
    assert.equal(JSON.stringify(names), JSON.stringify([...names].sort((a,b) => a.localeCompare(b))));
  }
  const normalMaps = render(pageAt('/maps/'), true);
  assert.equal(walk(normalMaps, (node) => typeof node.type === 'function' && node.type.name === 'MapCard').length, data.maps.length);
  const page = pageAt('/easter-eggs/kindertot/');
  readKeys.length = 0;
  let tree = render(page, true);
  assert(readKeys.filter((key) => key.includes('kindertot')).every((key) => key.endsWith('verified-setup-v1')), 'Old fabricated-step progress must not carry into corrected steps');
  assert.equal(walk(tree, (node) => node.type === 'a' && (node.props.href || '').startsWith('https://www.callofduty.com/')).length, 2);
  assert(text(tree).includes('Partial setup guide'));
  assert(text(tree).includes(guide.summary), 'The scope limitation must render visibly, not only in ignored header props');
  const next = () => walk(tree, (node) => node.type === 'button' && text(node).startsWith('Next'))[0];
  for (let i = 1; i < guide.steps.length; i++) { next().props.onClick(); tree = render(page); }
  assert(next().props.disabled);
  assert(text(next()).includes('Setup guide complete'));
  const markDone = walk(tree, (node) => node.type === 'button' && text(node) === 'Mark step complete')[0];
  markDone.props.onClick(); tree = render(page);
  assert(walk(tree, (node) => node.type === 'button' && text(node) === 'Step complete')[0].props.disabled);

  if (staticPages) {
    const html = read('easter-eggs/kindertot/index.html');
    assert(html.includes('Citadelle des Morts Setup Guide'));
    assert(html.includes('Partial setup guide'));
    for (const source of guide.sources) assert(html.includes(source.url));
    assert(!/Stachel|Krause|\bUll\b|blacksmith|Carolingian|Seal the Rift|Awaken the Knight/.test(html));
    for (const prefix of ['black-ops-7', 'zombies']) {
      const overview = read(prefix + '-easter-eggs/index.html');
      const tutorial = read(prefix + '-easter-egg-tutorials/index.html');
      const main = (value) => value.match(/<main id="seo-static-content"[^>]*>([\s\S]*?)<\/main>/)[1];
      assert.notEqual(main(overview), main(tutorial));
      assert(main(overview).includes('href="/maps/'));
      assert(main(tutorial).includes('href="/easter-eggs/'));
      assert(main(tutorial).includes('Party:'));
      assert(main(tutorial).includes('steps'));
    }
  }
  console.log('Guide content checks passed: source accuracy guards, 4 live hub scopes/targets, repeated filters/sort, partial-guide progression and source links' + (staticPages ? ', generated content.' : ' (static pages not checked).'));
}
module.exports = checkGuideContent;
if (require.main === module) checkGuideContent({ staticPages: !process.argv.includes('--source-only') });
