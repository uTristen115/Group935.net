// Shared content used by all three design directions.
// Shared structured content. Summary fields are intentionally left blank for owner-written copy.

window.ZD = (function () {
  const games = [
    { id: 'waw', code: 'WaW', title: 'World at War', year: 2008, era: 'Origins of Origins', mapCount: 4, color: '#6a5232' },
    { id: 'bo1', code: 'BO',  title: 'Black Ops', year: 2010, era: 'The Aether Story Begins', mapCount: 7, color: '#7a3b32' },
    { id: 'bo2', code: 'BO2', title: 'Black Ops II', year: 2012, era: 'Maxis vs. Richtofen', mapCount: 5, color: '#3f5a6b' },
    { id: 'bo3', code: 'BO3', title: 'Black Ops III', year: 2015, era: 'The Final Chapter', mapCount: 9, color: '#5a3a6b' },
    { id: 'bo4', code: 'BO4', title: 'Black Ops 4',  year: 2018, era: 'The Chaos Divergence', mapCount: 8, color: '#2f5a4a' },
    { id: 'cw',  code: 'CW',  title: 'Cold War',     year: 2020, era: 'The Dark Aether', mapCount: 5, color: '#3a4a6b' },
    { id: 'bo6', code: 'BO6', title: 'Black Ops 6',  year: 2024, era: 'Pact with the Dark', mapCount: 4, color: '#5a2f2f' },
    { id: 'bo7', code: 'BO7', title: 'Black Ops 7',  year: 2025, era: 'Relics & Rift Walkers', mapCount: 4, color: '#6b4a2a' },
  ];

  const maps = [
    {
      id: 'nacht', game: 'waw', name: 'Nacht der Untoten',
      location: 'Unknown bunker, 1945',
      difficulty: 1, eeCount: 0, relicCount: 0,
      summary: '',
      tags: ['classic', 'survival', 'origin'],
    },
    {
      id: 'verruckt', game: 'waw', name: 'Verrückt',
      location: 'Wittenau Sanatorium, Berlin, 1945',
      difficulty: 2, eeCount: 0, relicCount: 0,
      summary: '',
      tags: ['classic', 'perks', 'lore'],
    },
    {
      id: 'shino', game: 'waw', name: 'Shi No Numa',
      location: 'Rising Sun Facility, Imperial Japan',
      difficulty: 2, eeCount: 0, relicCount: 0,
      summary: '',
      tags: ['classic', 'crew-debut', 'hellhounds'],
    },
    {
      id: 'derriese', game: 'waw', name: 'Der Riese',
      location: 'Group 935 main facility, Breslau',
      difficulty: 3, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['classic', 'teleporter', 'pack-a-punch'],
    },
    {
      id: 'kino', game: 'bo1', name: 'Kino der Toten',
      location: 'Abandoned cinema, East Germany, 1960s',
      difficulty: 2, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['classic', 'teleporter', 'samantha'],
    },
    {
      id: 'ascension', game: 'bo1', name: 'Ascension',
      location: 'Soviet cosmodrome, 1963',
      difficulty: 3, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['perks', 'space-monkeys', 'wonder-grenade'],
    },
    {
      id: 'moon', game: 'bo1', name: 'Moon',
      location: 'Griffin Station, lunar far side',
      difficulty: 5, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['endgame', 'space', 'great-leap'],
    },
    {
      id: 'origins', game: 'bo2', name: 'Origins',
      location: 'Excavation Site 64, Northern France',
      difficulty: 4, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['primis', 'elemental-staves', 'time-loop'],
    },
    {
      id: 'shadows', game: 'bo3', name: 'Shadows of Evil',
      location: 'Morg City, 1940s',
      difficulty: 4, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['noir', 'apothicons', 'gobblegums'],
    },
    {
      id: 'eisendrache', game: 'bo3', name: 'Der Eisendrache',
      location: 'Austrian mountain castle, 1945',
      difficulty: 3, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['castle', 'bows', 'primis'],
    },
    {
      id: 'mob', game: 'bo3', name: 'Mob of the Dead',
      location: 'Alcatraz Island, 1933',
      difficulty: 4, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['purgatory', 'acidgat', 'noir'],
    },
    {
      id: 'revelations', game: 'bo3', name: 'Revelations',
      location: 'The Aether',
      difficulty: 4, eeCount: 1, relicCount: 0,
      summary: '',
      tags: ['endgame', 'patchwork', 'cycle'],
    },
    {
      id: 'diemaschine', game: 'cw', name: 'Die Maschine',
      location: 'Projekt Endstation, Morasko, 1984',
      difficulty: 2, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['dark-aether', 'requiem', 'reboot'],
    },
    {
      id: 'firebase', game: 'cw', name: 'Firebase Z',
      location: 'Outpost 25, Vietnam, 1984',
      difficulty: 3, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['dark-aether', 'mimics', 'peck'],
    },
    {
      id: 'mauer', game: 'cw', name: 'Mauer der Toten',
      location: 'East Berlin, 1984',
      difficulty: 3, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['dark-aether', 'klaus', 'urban'],
    },
    {
      id: 'forsaken', game: 'cw', name: 'Forsaken',
      location: 'Ural Mountains, 1984',
      difficulty: 4, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['dark-aether', 'finale', 'elder'],
    },
    {
      id: 'terminus', game: 'bo6', name: 'Terminus',
      location: 'Atlantic prison facility, 1991',
      difficulty: 3, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['bo6', 'terminus', 'maya'],
    },
    {
      id: 'liberty', game: 'bo6', name: 'Liberty Falls',
      location: 'West Virginia, 1991',
      difficulty: 2, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['bo6', 'small-town', 'richtofen'],
    },
    {
      id: 'citadelle', game: 'bo6', name: 'Citadelle des Morts',
      location: 'Alsace, 1991',
      difficulty: 4, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['bo6', 'castle', 'elemental-swords'],
    },
    {
      id: 'tomb', game: 'bo6', name: 'The Tomb',
      location: 'Eastern Europe, 1991',
      difficulty: 4, eeCount: 1, relicCount: 6,
      summary: '',
      tags: ['bo6', 'underground', 'staff'],
    },
    {
      id: 'ashes', game: 'bo7', name: 'Ashes of the Damned',
      location: 'Dark Aether construct',
      difficulty: 4, eeCount: 1, relicCount: 9,
      summary: '',
      tags: ['bo7', 'dark-aether', 'relics'],
    },
    {
      id: 'astro', game: 'bo7', name: 'Astro Malorum',
      location: 'Mountaintop research site',
      difficulty: 3, eeCount: 0, relicCount: 6,
      summary: '',
      tags: ['bo7', 'relics', 'observatory'],
    },
    {
      id: 'paradox', game: 'bo7', name: 'Paradox Junction',
      location: 'Liminal transit hub',
      difficulty: 3, eeCount: 0, relicCount: 3,
      summary: '',
      tags: ['bo7', 'relics', 'liminal'],
    },
    {
      id: 'totenreich', game: 'bo7', name: 'Totenreich',
      location: 'Aetheric reconstruction',
      difficulty: 4, eeCount: 0, relicCount: 6,
      summary: '',
      tags: ['bo7', 'relics', 'finale-hint'],
    },
  ];

  const characters = [
    {
      id: 'dempsey', name: 'Tank Dempsey', role: 'Marine · Primis',
      origin: 'Wisconsin, USA',
      summary: '',
      quote: 'Right between the eyes.',
      hue: 16,
    },
    {
      id: 'nikolai', name: 'Nikolai Belinski', role: 'Soviet Soldier · Primis',
      origin: 'Soviet Union',
      summary: '',
      quote: 'Now I drink to my new friends. And my old wives.',
      hue: 0,
    },
    {
      id: 'takeo', name: 'Takeo Masaki', role: 'Imperial Officer · Primis',
      origin: 'Empire of Japan',
      summary: '',
      quote: 'Honour requires it.',
      hue: 40,
    },
    {
      id: 'richtofen', name: 'Edward Richtofen', role: 'Group 935 · Both Crews',
      origin: 'German Empire',
      summary: '',
      quote: 'Everything is going to be okay.',
      hue: 280,
    },
    {
      id: 'samantha', name: 'Samantha Maxis', role: 'Aether Keeper',
      origin: 'Group 935 facility',
      summary: '',
      quote: 'Get them, Fluffy.',
      hue: 200,
    },
    {
      id: 'maxis', name: 'Dr. Ludvig Maxis', role: 'Group 935 · Voice in the Static',
      origin: 'Germany',
      summary: '',
      quote: 'My friends. We are so close.',
      hue: 220,
    },
    {
      id: 'maya', name: 'Maya Aguinaldo', role: 'Operative · BO6 era',
      origin: 'Philippines',
      summary: '',
      quote: 'I came here for him. I’ll leave when I have him.',
      hue: 320,
    },
    {
      id: 'weaver', name: 'Grigori Weaver', role: 'Requiem Lead',
      origin: 'Eastern Bloc defector',
      summary: '',
      quote: 'You should’ve asked first.',
      hue: 100,
    },
  ];

  const wonderWeapons = [
    { id: 'raygun', name: 'Ray Gun', map: 'Many', summary: '' },
    { id: 'thundergun', name: 'Thundergun', map: 'Kino der Toten', summary: '' },
    { id: 'wunderwaffe', name: 'Wunderwaffe DG‑2', map: 'Shi No Numa', summary: '' },
    { id: 'staves', name: 'Elemental Staves', map: 'Origins', summary: '' },
    { id: 'bows', name: 'Bows of the Keep', map: 'Der Eisendrache', summary: '' },
    { id: 'rai', name: 'R.A.I. K‑84', map: 'Die Maschine', summary: '' },
  ];

  const perks = [
    { id: 'jugg', name: 'Juggernog', summary: '' },
    { id: 'qr', name: 'Quick Revive', summary: '' },
    { id: 'sc', name: 'Speed Cola', summary: '' },
    { id: 'ddc', name: 'Double Tap II', summary: '' },
    { id: 'sf', name: 'Stamin‑Up', summary: '' },
    { id: 'mule', name: 'Mule Kick', summary: '' },
    { id: 'phd', name: 'PhD Flopper', summary: '' },
    { id: 'tomb', name: 'Tombstone Soda', summary: '' },
  ];

  const timeline = [
    { year: '1294', title: 'The Vril Discovery', body: 'Templar excavations in the Alsace region uncover an Element 115 deposit and the first relics. The Order seals the site.' },
    { year: '1918', title: 'Generation Station 64', body: 'A buried 115 weapon system is breached during a German offensive. Four soldiers and a Maxis are pulled into a recurring loop that will become the Origin Cycle.' },
    { year: '1939', title: 'Group 935 Founded', body: 'Dr. Ludvig Maxis assembles a multinational research collective under German backing. Officially: medical applications. Actually: 115 weaponisation.' },
    { year: '1943', title: 'Division 9 Splits Off', body: 'An Imperial Japanese cell of Group 935 establishes the Rising Sun Facility and the swamp testing grounds known later as Shi No Numa.' },
    { year: '1945', title: 'The Giant Falls', body: 'The crew’s teleporter test at Der Riese scatters them across time and space. Group 935 collapses behind them. Samantha enters the MPD.' },
    { year: '1963', title: 'Ascension', body: 'A Soviet cosmodrome inherits 115 from the Reich and tries to weaponise it. Dr. Gersh asks the crew for help. The Vril‑ya answer.' },
    { year: '1968', title: 'The Great Leap', body: 'Richtofen completes the Moon ritual. Three missiles strike Earth. The Original timeline ends in a planet on fire and a soul swap.' },
    { year: '1984', title: 'Projekt Endstation', body: 'A buried Group 935 site near Morasko tears open. Requiem and Omega arrive at the same time. The Dark Aether era begins.' },
    { year: '1989', title: 'The Forsaken Seal', body: 'Requiem closes the largest rift yet, at a cost — Maxis is on the other side, and the Sentinel Artifact is on the move.' },
    { year: '1991', title: 'The New Richtofen', body: 'A briefing in a Pentagon basement opens the BO6 cycle. Maya Aguinaldo accepts the file. The Order is already three steps ahead.' },
  ];

  // One sample Easter Egg walkthrough — used across all three directions.
  const sampleEE = {
    id: 'kindertot',
    map: 'citadelle',
    mapName: 'Citadelle des Morts',
    title: 'Kinder der Toten',
    difficulty: 'Hard',
    duration: '60–90 min',
    party: 'Recommended 2‑4 players',
    summary: 'Forge four elemental swords, wake the knight at the altar, and seal the rift in the courtyard before the eighth wave of Doppelganger zombies.',
    rewards: ['Permanent perk slot', 'Calling card: Carolingian', 'Dark Aether story shard #4'],
    steps: [
      { n: 1, title: 'Activate Power', body: 'Restore power in the chapel basement. Three breakers, all on the north walls. The third only flips after you’ve killed a zombie within two metres of it.' },
      { n: 2, title: 'Find the Sword Hilt', body: 'A blacksmith’s anvil in the courtyard. Drop a Sword Hilt charge near it. The hilt appears after one full round of melee‑only kills.' },
      { n: 3, title: 'Forge the Elemental Blade', body: 'Carry the hilt through the elemental shrine matching your chosen path — Solais (light), Stachel (fire), Krause (lightning), or Ull (frost). Each shrine requires a different kill condition.' },
      { n: 4, title: 'Awaken the Knight', body: 'Place your forged sword in the altar in the great hall. The knight rises and walks the perimeter. Follow him; he opens doors no key opens.' },
      { n: 5, title: 'Defeat the Doppelganger', body: 'A reflection of your character spawns in the keep. Same loadout, same perks, same health. Outlast it. Do not let it down you.' },
      { n: 6, title: 'Seal the Rift', body: 'Hold the centre of the courtyard for ninety seconds. The knight defends the four cardinal points; you defend the centre. Kill nothing inside the seal radius or it resets.' },
    ],
  };

  return { games, maps, characters, wonderWeapons, perks, timeline, sampleEE };
})();
