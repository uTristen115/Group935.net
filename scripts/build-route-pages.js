// Static entry content for existing app routes. Read only the archive's source
// records; do not manufacture filter combinations or unpublished guide content.
module.exports = function buildRoutePages(data) {
  const esc = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const p = (value) => value ? '<p>' + esc(value) + '</p>' : '';
  const link = (route, label) => '<a href="' + esc(route) + '/">' + esc(label) + '</a>';
  const list = (items) => '<ul>' + items.map((item) => '<li>' + item + '</li>').join('') + '</ul>';
  const gamePath = (id) => id === 'bo7' ? '/black-ops-7' : '/games/' + id;
  const gameLinks = (ids) => list(data.games.filter((g) => ids.includes(g.id)).map((g) => link(gamePath(g.id), g.title)));
  const pages = [];
  const add = (route, title, description, body, indexable = true) => pages.push({route, title: title + ' | Group 935', description, html: '<h1>' + esc(title) + '</h1>' + body, indexable});
  const eggs = [data.sampleEE, ...data.classicEasterEggs, ...data.bo7EasterEggs].filter(Boolean);
  for (const game of data.games.filter((g) => g.id !== 'bo7')) {
    const maps = data.maps.filter((m) => m.game === game.id);
    const quests = eggs.filter((e) => maps.some((m) => m.id === e.map));
    const weapons = data.wonderWeapons.filter((w) => (w.gameIds || []).includes(game.id));
    const perks = data.perks.filter((v) => (v.gameIds || []).includes(game.id));
    add(gamePath(game.id), game.title + ' Zombies Maps, Easter Eggs', game.description,
      p(game.description) + p([game.year, game.era].filter(Boolean).join(' · ')) + '<h2>Maps</h2>' + list(maps.map((m) => link('/maps/' + m.id, m.name) + ' — ' + esc(m.location))) +
      (quests.length ? '<h2>Published Easter egg walkthroughs</h2>' + list(quests.map((e) => link('/easter-eggs/' + e.id, e.title) + p(e.summary))) : '') +
      '<h2>Wonder weapons</h2>' + list(weapons.map((w) => link('/wonder-weapons/' + w.id, w.name) + ' — ' + esc(w.type))) +
      '<h2>Perks</h2>' + list(perks.map((v) => link('/perks/' + v.id, v.name) + ' — ' + esc(v.effect))) +
      '<p>' + link('/games', 'All Zombies games') + '</p>');
  }
  add('/characters', 'Zombies Characters and Crews', 'Browse Treyarch Zombies character records, roles, origins and crews.',
    list(data.characters.map((c) => link('/characters/' + c.id, c.name) + ' — ' + esc(c.role) + p(c.origin))));
  for (const c of data.characters) add('/characters/' + c.id, c.name + ' Zombies Character File', [c.name, c.role, c.origin].filter(Boolean).join(' · '),
    '<h2>Dossier</h2>' + p(c.role) + p(c.origin) + p(c.summary) +
    (c.portraits ? '<h2>Archive portraits</h2>' + list(Object.values(c.portraits).map((v) => esc(v.label))) : '') +
    '<p>' + link('/characters', 'All characters and crews') + '</p>');
  add('/wonder-weapons', 'Zombies Wonder Weapons', 'Browse Zombies wonder weapon types and game appearances.',
    list(data.wonderWeapons.map((w) => link('/wonder-weapons/' + w.id, w.name) + ' — ' + esc(w.type))));
  for (const w of data.wonderWeapons) add('/wonder-weapons/' + w.id, w.name + ' Wonder Weapon', [w.name, w.type].filter(Boolean).join(' · ') + '. Game appearances and weapon archive.',
    '<h2>Weapon file</h2>' + p(w.type) + p(w.summary) + '<h2>Game appearances</h2>' + gameLinks(w.gameIds || []) + '<p>' + link('/wonder-weapons', 'All wonder weapons') + '</p>');
  const slug = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const songs = data.maps.flatMap((m) => (m.songs || []).map((s) => ({...s, route:'/songs/' + slug(m.id) + '-' + slug(s.name), map:m})));
  add('/songs', 'Zombies Hidden Songs', 'Hidden Zombies songs, artists, maps and activation methods.',
    list(songs.map((s) => link(s.route, s.name) + ' — ' + esc(s.artist) + ' · ' + link('/maps/' + s.map.id, s.map.name) + p(s.activation))));
  for (const s of songs) add(s.route, s.name + ' — ' + s.map.name + ' Hidden Song', [s.name, s.artist, s.map.name, s.activation].filter(Boolean).join(' · '),
    p(s.artist) + '<p>Map: ' + link('/maps/' + s.map.id, s.map.name) + '</p><h2>Activation</h2>' + p(s.activation) + '<p>' + link(gamePath(s.map.game), data.games.find((g) => g.id === s.map.game).title) + '</p><p>' + link('/songs', 'All hidden songs') + '</p>');
  add('/timeline', 'Kronorium Zombies Timeline', 'Read the Zombies timeline and Kronorium archive of Aether story events.',
    data.timeline.map((t) => '<section><h2>' + esc([t.year, t.title].filter(Boolean).join(' — ')) + '</h2>' + p(t.body) + '</section>').join(''));
  add('/about', 'About the Archive', 'About the fan-built Group 935 Treyarch Zombies archive.',
    p('group935.net is a fan-built field archive for Treyarch Zombies: map dossiers, image galleries, crew files, weapons, perks, songs, relic notes, and the larger story tying it all together.') + p('Not affiliated with Activision, Treyarch, or any other rights holder.') + '<p>' + link('/site-index', 'Browse the archive') + '</p>');
  add('/search', 'Search the Archive', 'Search the Group 935 archive.', '<p>' + link('/site-index', 'Browse all archive files') + '</p>', false);
  for (const [id, name] of [['maps','Maps'],['weapons','Wonder Weapons'],['perks','Perks'],['characters','Characters']]) {
    const route = id === 'maps' ? '/vote' : '/vote-' + id;
    add(route, 'Favorite Zombies ' + name, 'Community voting for Zombies ' + name.toLowerCase() + '.', '<p>Community votes load in the interactive archive.</p>', false);
    add('/vote-ranking/' + id, 'Zombies ' + name + ' Rankings', 'Community rankings for Zombies ' + name.toLowerCase() + '.', '<p>Live rankings load in the interactive archive.</p>', false);
  }
  return pages;
};
