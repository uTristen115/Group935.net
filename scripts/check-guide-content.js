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
  assert.equal(guide.guideStatus, 'complete', 'Citadelle must retain a complete main quest walkthrough');
  assert(guide.steps.length >= 20, 'Do not replace the full quest with a short setup excerpt');
  assert.deepEqual(Array.from(guide.steps, (step) => step.n), Array.from({ length: guide.steps.length }, (_, i) => i + 1));
  for (const step of guide.steps) {
    assert(step.body && step.bullets && step.bullets.length >= 2, 'Each quest phase needs actionable instructions: ' + step.title);
    assert(step.sources && step.sources.length > 0, 'Each quest phase needs source coverage: ' + step.title);
  }
  for (const phase of [/Pack-a-Punch/i, /Krafft/i, /Caliburn/i, /Durendal/i, /Balmung/i, /Solais/i, /Incantation/i, /Pages/i, /Traps/i, /Statues/i, /Orb/i, /Guardian/i]) {
    assert(guide.steps.some((step) => phase.test(step.title)), 'Missing complete-quest phase: ' + phase);
  }
  for (const name of ['Caliburn', 'Durendal', 'Balmung', 'Solais']) assert(JSON.stringify(guide).includes(name));
  const phaseText = (pattern) => JSON.stringify(guide.steps.find((step) => pattern.test(step.title)) || {});
  for (const pair of ['Air + Gemini', 'Fire + Leo', 'Water + Pisces', 'Water + Scorpio', 'Fire + Aries']) assert(phaseText(/Antiquity Dial/).includes(pair), 'Missing randomized Antiquity solution: ' + pair);
  assert(phaseText(/Repair the Book/).includes('top-left, bottom-left, top-right, then bottom-right'), 'Preserve the book reading order');
  assert(phaseText(/Knight Statues/).includes('Weapon Inspect') && phaseText(/Knight Statues/).includes('varies by match'), 'Knight ceremony must explain the action and randomized order');
  assert(phaseText(/Light Trial/).includes('wisps') && phaseText(/Light Trial/).includes('rather than an elemental-kill quota'), 'The Light Orb trial needs its distinct collection mechanic');
  assert(phaseText(/Collect the Amulet/).includes('Obscurus Altilium'), 'Do not stop the walkthrough at boss death');
  assert(!/Stachel|Krause|\bUll\b|blacksmith|Carolingian|Seal the Rift|Awaken the Knight|chapel basement/i.test(JSON.stringify(guide)));
  assert(guide.sources.length >= 3, 'Full quest needs source coverage beyond the official setup-only guide');
  for (const source of guide.sources) assert.equal(new URL(source.url).protocol, 'https:');
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
  assert(readKeys.filter((key) => key.includes('kindertot')).every((key) => key.endsWith('verified-main-quest-v1')), 'Setup-only or fabricated-step progress must not carry into the complete quest');
  assert(text(tree).includes('Quest file'));
  assert(!text(tree).includes('Partial setup guide'));
  const next = () => walk(tree, (node) => node.type === 'button' && text(node).startsWith('Next'))[0];
  for (let i = 0; i < guide.steps.length; i++) {
    const step = guide.steps[i];
    assert(text(tree).includes(step.title) && text(tree).includes(step.body), 'Quest step is not rendered: ' + step.title);
    for (const source of step.sources) assert.equal(walk(tree, (node) => node.type === 'a' && node.props.href === source.url).length, 1, 'Current step source is missing: ' + step.title);
    const substeps = walk(tree, (node) => node.type === 'button' && String(node.props.className).includes('pap-ee-substep'));
    assert.equal(substeps.length, step.bullets.length, 'Every detailed substep must remain available');
    substeps[0].props.onClick(); tree = render(page);
    assert(walk(tree, (node) => node.type === 'button' && String(node.props.className).includes('pap-ee-substep is-done')).length >= 1);
    if (i < guide.steps.length - 1) { next().props.onClick(); tree = render(page); }
  }
  assert(next().props.disabled);
  assert(text(next()).includes('Quest complete'));
  const markDone = walk(tree, (node) => node.type === 'button' && text(node) === 'Mark substeps complete')[0];
  markDone.props.onClick(); tree = render(page);
  assert(walk(tree, (node) => node.type === 'button' && text(node) === 'Step complete')[0].props.disabled);

  if (staticPages) {
    const html = read('easter-eggs/kindertot/index.html');
    assert(html.includes('Citadelle des Morts Easter Egg Walkthrough'));
    assert(!html.includes('Partial setup guide'));
    for (const step of guide.steps) {
      assert(html.includes(step.title), 'Static quest step is missing: ' + step.title);
      for (const source of step.sources) assert(html.includes(source.url), 'Static source is missing: ' + step.title);
    }
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
  console.log('Guide content checks passed: complete quest coverage, 4 live hub scopes/targets, repeated filters/sort, all quest steps/substeps, progression and source links' + (staticPages ? ', generated content.' : ' (static pages not checked).'));
}
module.exports = checkGuideContent;
if (require.main === module) checkGuideContent({ staticPages: !process.argv.includes('--source-only') });
