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
      id: 'astra', game: 'bo7', name: 'Astra Malorum',
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
    { id: 'wisp-tea', name: 'Wisp Tea', summary: '' },
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
    "id": "kindertot",
    "map": "citadelle",
    "mapName": "Citadelle des Morts",
    "title": "Citadelle des Morts",
    "difficulty": "Hard",
    "duration": "Varies by preparation",
    "party": "Solo or co-op",
    "guideStatus": "complete",
    "progressVersion": "verified-main-quest-v1",
    "summary": "Complete the Citadelle des Morts main quest: upgrade all four swords, unlock the incantations, solve the book and knight puzzles, charge the Mystic Orb, and defeat the Guardian.",
    "requirements": [
      "This walkthrough follows Standard mode. All four elemental swords and all four incantations are required, including when playing solo.",
      "Unlock Pack-a-Punch and speak to Krafft. Stamps start dropping from helmeted Templar zombies on round 10.",
      "Buy Melee Macchiato for the Undercroft wall and put Dead Wire on a firearm for the lightning-rod electrical box.",
      "Use your current match’s symbols and Roman numerals; the puzzle solutions and knight order are not one universal sequence."
    ],
    "rewards": [
      "Standard main-quest completion: Jackknife Operator Skin for Weaver, 5,000 XP, and the quest-completion Calling Card."
    ],
    "sources": [
      {
        "label": "Official map and sword guide",
        "url": "https://www.callofduty.com/guides/blackops6/zombies/call-of-duty-guides-black-ops-6-round-based-zombies-citadelle-des-morts"
      },
      {
        "label": "Official Standard-mode quest rewards",
        "url": "https://www.callofduty.com/uk/en/blog/2024/12/call-of-duty-black-ops-6-warzone-zombies-season-01-reloaded-announcement"
      },
      {
        "label": "Official reward-window update",
        "url": "https://www.callofduty.com/patchnotes/2024/11/call-of-duty-black-ops-6-season-01-patch-notes"
      }
    ],
    "steps": [
      {
        "n": 1,
        "title": "Open the Castle and Pack-a-Punch",
        "body": "Follow the opening objectives into the castle and activate Pack-a-Punch in the Oubliette.",
        "bullets": [
          "Castle entrance: Open a route to the Ramparts cannon, turn it toward the castle doors, and fire. Continue through the castle toward the underground objective.",
          "Sealed container: Shoot all three locks off the container in the Oubliette. Kill the Doppelghast it releases and collect the Blood Aetherium Crystal.",
          "Pack-a-Punch: Put the crystal into the red portal inside the container to reveal the machine."
        ],
        "sources": [
          {
            "label": "Gameranx: opening and quest route",
            "url": "https://gameranx.com/features/id/520080/article/black-ops-6-zombies-citadelle-des-morts-main-quest-easter-egg-guide/"
          }
        ]
      },
      {
        "n": 2,
        "title": "Speak to Krafft and Prepare",
        "body": "Krafft’s conversation enables the magical quest interactions.",
        "bullets": [
          "Krafft: Interact with the wooden cell door behind Quick Revive in the Dungeon and let the conversation finish. The passage to the Alchemical Lab opens behind the Dining Hall knights.",
          "Required tools: Obtain Melee Macchiato for the rune-wall puzzle and a gun with Dead Wire for a lightning rod. Keep improving your weapon, armor, and perks as you earn resources.",
          "Solo route: You can complete every required branch alone. Return swords to their Dining Hall statues when you need to exchange them; one player does not need to carry four swords at once."
        ],
        "sources": [
          {
            "label": "Gameranx: opening and quest route",
            "url": "https://gameranx.com/features/id/520080/article/black-ops-6-zombies-citadelle-des-morts-main-quest-easter-egg-guide/"
          }
        ]
      },
      {
        "n": 3,
        "title": "Exchange Stamps for the Four Swords",
        "body": "Starting on round 10, helmeted Templar zombies drop Stamps. Each knight statue requires one Stamp.",
        "bullets": [
          "Collect and exchange: Kill the helmeted zombies, pick up their Stamps, and interact with all four sword-bearing statues in the Dining Hall.",
          "Animal crests: Dragon becomes Caliburn (fire); Stag becomes Durendal (lightning); Raven becomes Balmung (dark); Lion becomes Solais (light). Match the crest on the statue to the branch below.",
          "Complete the set: Upgrade every sword. Ritual-item collection can overlap with these upgrades, but each incantation chest needs its matching elemental sword."
        ],
        "sources": [
          {
            "label": "Gaming Intel: swords and quest prerequisites",
            "url": "https://gamingintel.com/citadelle-des-morts-main-quest-easter-egg-black-ops-6-zombies/"
          }
        ]
      },
      {
        "n": 4,
        "title": "Forge Caliburn, the Fire Sword",
        "body": "Use the Dragon sword to feed three separate flames to the dragon statue.",
        "bullets": [
          "Place the sword: Insert the Dragon Bastard Sword into the dragon statue above the Entrance Hall stairs.",
          "Three fire runs: Take fire from the brazier on the Village Rampart near the cannon, the Nature Path by the Town Square gate, and Town Square near the Rampage Inducer. Carry one flame at a time back to the dragon statue and interact to deposit it.",
          "Survive and collect: Carrying fire drains health; melee-kill zombies on the return trip to heal. After all three deposits, retrieve Caliburn. These braziers are separate from the fire-incantation wood piles."
        ],
        "sources": [
          {
            "label": "Official map and sword guide",
            "url": "https://www.callofduty.com/guides/blackops6/zombies/call-of-duty-guides-black-ops-6-round-based-zombies-citadelle-des-morts"
          }
        ]
      },
      {
        "n": 5,
        "title": "Collect Durendal’s Lightning Rods",
        "body": "Take the Stag sword and gather all three rods before starting its storm ritual.",
        "bullets": [
          "Ground pickup: Collect the lightning rod beside Deadshot Daiquiri.",
          "Electrical box: Shoot the box near Speed Cola with your Dead Wire firearm, then collect the rod it drops.",
          "Zombie drop: After obtaining the Stag sword, kill the armored zombie carrying a rod and pick it up. Check the Dungeon and Quick Revive area."
        ],
        "sources": [
          {
            "label": "Gameranx: Durendal upgrade",
            "url": "https://gameranx.com/features/id/519737/article/black-ops-6-zombies-how-to-get-the-lightning-sword-on-citadelle-des-morts-durendal-wonder-weapon-guide/"
          }
        ]
      },
      {
        "n": 6,
        "title": "Forge Durendal, the Lightning Sword",
        "body": "Bring the Stag sword and three rods to the metal urn on the Hillside Ramparts near Elemental Pop.",
        "bullets": [
          "Start the storm: Insert the three rods into the urn and remain nearby with the sword drawn.",
          "Transfer three charges: When lightning electrifies the blade, melee the urn. Repeat the lightning strike and transfer three times; ordinary zombie kills are not the charge cue.",
          "Claim Durendal: Interact with the charged urn to insert the sword. Wait for the upgrade, then take it back."
        ],
        "sources": [
          {
            "label": "Gameranx: Durendal upgrade",
            "url": "https://gameranx.com/features/id/519737/article/black-ops-6-zombies-how-to-get-the-lightning-sword-on-citadelle-des-morts-durendal-wonder-weapon-guide/"
          }
        ]
      },
      {
        "n": 7,
        "title": "Open the Lion Door",
        "body": "The Lion sword and its glowing parasites reveal the way to Solais.",
        "bullets": [
          "Find the door: Go to the lion-knocker door in Village Ascent on the route below Speed Cola.",
          "Light four runes: Melee one bright yellow parasite with the Lion sword, then strike the door with the glowing blade. Repeat four times, charging separately for each rune. Avoid spending the glow on another enemy.",
          "Enter: Interact once all four door symbols glow. If you lose the parasites before finishing, continue on the next round."
        ],
        "sources": [
          {
            "label": "Gameranx: Solais upgrade",
            "url": "https://gameranx.com/features/id/519736/article/black-ops-6-zombies-how-to-get-the-light-sword-on-citadelle-des-morts-solais-wonder-weapon-guide/"
          }
        ]
      },
      {
        "n": 8,
        "title": "Forge Solais, the Light Sword",
        "body": "Complete the timed symbol sequence inside the Lion passage.",
        "bullets": [
          "Begin: Put the Lion sword into the pedestal. You have one minute to complete its sequence.",
          "Match the symbols: Read the symbol currently displayed on the pedestal and shoot its matching floating symbol. Do this four times, following each new pedestal symbol rather than firing randomly.",
          "Collect or retry: Retrieve Solais after success. If the timer expires and ejects you, retry on the following round."
        ],
        "sources": [
          {
            "label": "Gameranx: Solais upgrade",
            "url": "https://gameranx.com/features/id/519736/article/black-ops-6-zombies-how-to-get-the-light-sword-on-citadelle-des-morts-solais-wonder-weapon-guide/"
          }
        ]
      },
      {
        "n": 9,
        "title": "Solve Balmung’s Antiquity Dial",
        "body": "With the Raven sword, collect the Antiquity from the Alchemical Lab and take it to the Tavern Cellar dial.",
        "bullets": [
          "Find the Antiquity: Search the lab’s shelves, counters, and small table for paired raven skulls, a jaw, fish fossil, scorpion fossil, or horn. Only one of these five appears in a match.",
          "Load the mechanism: Place the Antiquity in the circular wall mechanism in the Tavern Cellar, then insert the Raven sword.",
          "Match your item: Paired raven skulls = Air + Gemini (♊); jaw = Fire + Leo (♌); fish = Water + Pisces (♓); scorpion = Water + Scorpio (♏); horn = Fire + Aries (♈).",
          "Align and submit: Turn the inner element and outer zodiac rings so the correct pair meets the bottom pointer. Fire is an upright triangle, Water an inverted triangle, and Air an upright triangle with a horizontal line."
        ],
        "sources": [
          {
            "label": "Destructoid: Antiquity dial solutions",
            "url": "https://www.destructoid.com/how-to-unlock-the-raven-balmung-sword-in-black-ops-6-zombies/"
          }
        ]
      },
      {
        "n": 10,
        "title": "Forge Balmung, the Dark Sword",
        "body": "The solved dial sends slow purple orbs after you. Lead them into the portals.",
        "bullets": [
          "Cellar portal: Move so three pursuing orbs pass into the floor portal. Keep your distance; contact makes an orb explode.",
          "Follow upstairs: Repeat with three orbs at the Tavern ground-floor portal, then three more at the upstairs portal. Nine successful orb deliveries finish the sequence.",
          "Collect Balmung: Return to the cellar dial and interact. The sword descends into the rift and returns upgraded."
        ],
        "sources": [
          {
            "label": "Gameranx: Balmung portal sequence",
            "url": "https://gameranx.com/features/id/519738/article/black-ops-6-zombies-how-to-get-the-dark-sword-on-citadelle-des-morts-balmung-wonder-weapon-guide/"
          }
        ]
      },
      {
        "n": 11,
        "title": "Unlock the Fire Incantation",
        "body": "Collect Ra’s Ankh, complete its soul ritual, and open the chest with Caliburn.",
        "bullets": [
          "Ignite three wood piles: Use Molotovs or Caliburn’s charged special attack on the piles above the castle entrance opposite the cannon, above the Elemental Pop room on the rampart, and on the hill beyond the oil trap toward Speed Cola. These are not the sword’s flame-carrying braziers.",
          "Collect the Ankh: Defeat the enemies released by each pile. Kill the Doppelghast from the final pile and pick up Ra’s Ankh.",
          "Courtyard ritual: Place the Ankh on the gold circle near the Arsenal and the entrance from Speed Cola. Kill zombies near it until a gold chest rises. Strike the chest with Caliburn and collect the Fire Incantation."
        ],
        "sources": [
          {
            "label": "Gameranx: Fire Incantation",
            "url": "https://gameranx.com/features/id/520044/article/black-ops-6-zombies-how-to-unlock-the-fire-incantation-on-citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 12,
        "title": "Unlock the Electric Incantation",
        "body": "Turn Otto’s Horseshoe into Pegasus’ Horseshoe before attempting the ritual.",
        "bullets": [
          "Horseshoe: Shoot it down from above the doorway inside the stable beside Deadshot Daiquiri and pick it up.",
          "Lightning flight: Carry it into the cannon and spend 500 Essence to launch toward Town Square. After lightning hits during the flight, find the small storm cloud above a village path and collect Pegasus’ Horseshoe beneath it.",
          "Town Square ritual: Place the charged horseshoe on the gold circle beside the Nature Path gate. Kill zombies nearby until the chest appears, open it with Durendal, and take the Electric Incantation."
        ],
        "sources": [
          {
            "label": "Gameranx: Electric Incantation",
            "url": "https://gameranx.com/features/id/520033/article/black-ops-6-zombies-how-to-unlock-the-electric-incantation-on-citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 13,
        "title": "Unlock the Dark Incantation",
        "body": "Retrieve the Raven’s Talon by hitting the bird both on the slide and outside.",
        "bullets": [
          "Cave Slide: Equip a firearm and take the 500-Essence slide from the Oubliette/Pack-a-Punch area. Shoot the perched raven on your right near the end of the ride. Ride again if you miss it.",
          "Raven’s Talon: After exiting, find the raven flying outside, shoot it, and collect its dropped Talon.",
          "Undercroft ritual: Place the Talon on the gold circle near the tombstones. Kill zombies nearby until the chest forms. Open it with Balmung and collect the Dark Incantation."
        ],
        "sources": [
          {
            "label": "Gameranx: Dark Incantation",
            "url": "https://gameranx.com/features/id/520045/article/black-ops-6-zombies-how-to-unlock-the-dark-incantation-on-citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 14,
        "title": "Unlock the Light Incantation",
        "body": "Redirect the crystal beams to reveal Paladin’s Brooch.",
        "bullets": [
          "Start the beam: Shoot the red crystal above Vulture Aid in the Dining Hall. Adjust your shooting position until its beam becomes solid and points at the next crystal.",
          "Follow the chain: Continue through the crystal above the Entrance Hall doorway, the one above the Lion knight, the Alchemical Lab crystal above the bookshelf, and the lab crystal above the Arsenal. Adjust each from the angle needed to connect it to the next.",
          "Paladin’s Brooch: Direct the final beam at the bust and collect the Brooch.",
          "Dining Hall ritual: Put it on the lion-marked gold circle, kill nearby zombies, and open the resulting chest with Solais. Take the Light Incantation. Incantations occupy Tactical Equipment; return to their chests to replenish the one needed for later steps."
        ],
        "sources": [
          {
            "label": "Gameranx: Light Incantation",
            "url": "https://gameranx.com/features/id/520043/article/black-ops-6-zombies-how-to-unlock-the-light-incantation-on-citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 15,
        "title": "Collect the Four Torn Pages",
        "body": "Find all four red-symbol pages in and around the Sitting Rooms near Stamin-Up.",
        "bullets": [
          "Search the room: Check the boxes and walls by the Entrance Hall door, the bunk beds, and the TV/sofa area.",
          "Check the passage: Search the connecting corridor toward the Alchemical Lab and downstairs route as well. Pickup positions can vary within these areas; collect all four before repairing the book."
        ],
        "sources": [
          {
            "label": "COD Zombies community: pages and trap locations",
            "url": "https://www.reddit.com/r/CODZombies/wiki/citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 16,
        "title": "Record the Six Tavern Symbols",
        "body": "The numbered Tavern vials supply this match’s rune-wall code.",
        "bullets": [
          "Ground-floor vials: Interact with vial I on the bar, II on the table near the Arsenal, and III on the corner table beside the bar. Record the symbol beside each Roman numeral.",
          "Remaining vials: Check IV on the upstairs shelf by the pool table, V on the table across from II, and VI on the small table near the doorway. Trust the printed I–VI labels when identifying them.",
          "Keep the order: Write the six symbols in I, II, III, IV, V, VI order. The symbols change between matches."
        ],
        "sources": [
          {
            "label": "Destructoid: Tavern code and boss preparation",
            "url": "https://www.destructoid.com/bo6-zombies-citadelle-des-morts-easter-egg-main-quest-guide/"
          }
        ]
      },
      {
        "n": 17,
        "title": "Reveal the Rune Wall and Repair the Book",
        "body": "Use the Tavern code to open the book recess in the Undercroft.",
        "bullets": [
          "Break the wall: With Melee Macchiato, punch the weak blue-glowing brickwork in the Undercroft to expose the glyph grid.",
          "Enter the code: Shoot the six symbols in Tavern-vial order, I through VI. The grid moves after each correct hit, so find the next glyph again before firing.",
          "Repair and read: Interact with the revealed book to insert all four pages. Read the trap images top-left, bottom-left, top-right, then bottom-right. Record their complete designs, including rays, lashes, and outlines."
        ],
        "sources": [
          {
            "label": "PCGamesN: rune wall and book order",
            "url": "https://www.pcgamesn.com/call-of-duty-black-ops-6/citadelle-des-morts-main-quest"
          }
        ]
      },
      {
        "n": 18,
        "title": "Complete the Four Point of Power Traps",
        "body": "Match the floor traps to the book and charge them in its exact page order.",
        "bullets": [
          "Find the matching design: Check the traps by Deadshot/the barn, the Village Ascent wishing well, the Courtyard, the Dungeon near Quick Revive, the Oubliette/Pack-a-Punch room, and the Sitting Rooms near Stamin-Up.",
          "Charge each trap: Activate the trap matching the next book image and kill zombies while standing in its area. Follow top-left, bottom-left, top-right, bottom-right. Similar eye designs are not interchangeable.",
          "Confirm progress: A completed trap shuts off early and its book image fades to gray. Check that cue before moving on. The fourth matching trap is in the Sitting Rooms.",
          "Find the knight code: After the fourth succeeds, follow the red light to the animal-emblem wall in the downstairs passage. Read the emblems alongside Roman numerals I–IV."
        ],
        "sources": [
          {
            "label": "Detonated: Point of Power trap sequence",
            "url": "https://detonated.com/full-black-ops-6-zombies-citadelle-des-morts-main-easter-egg-guide-jack-knife-operator-skin/"
          },
          {
            "label": "COD Zombies community: pages and trap locations",
            "url": "https://www.reddit.com/r/CODZombies/wiki/citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 19,
        "title": "Salute the Four Knight Statues",
        "body": "Use the newly revealed I–IV animal order. This order varies by match.",
        "bullets": [
          "Match the equipment: For the next animal, equip its upgraded sword and collect its matching incantation: Dragon/fire, Stag/electric, Raven/dark, Lion/light.",
          "Cast, then inspect: Face that animal’s Dining Hall statue, cast the incantation at it, and immediately use Weapon Inspect with the matching sword drawn. This is the weapon-inspection action, not a melee swing.",
          "Wait for the salute: Let the statue salute and turn gold before repeating for the next numbered animal. After all four, collect the Mystic Orb in the Dining Hall center."
        ],
        "sources": [
          {
            "label": "Community walkthrough: knight salutes",
            "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=3379436490"
          }
        ]
      },
      {
        "n": 20,
        "title": "Charge the Mystic Orb: Fire Trial",
        "body": "Complete all four Orb trials, in any order. Place the Orb in a holder and interact again to start its challenge.",
        "bullets": [
          "Courtyard holder: Find the socket by the trap/tree near the Arsenal. Start its trial and stay near the holder.",
          "Fire kills: Use the Fire Incantation or Caliburn’s charged special attack to kill nearby enemies. A plain sword slash is not a substitute for elemental damage.",
          "Retrieve the Orb: When the trial succeeds and a fire light orbits it, pick the Orb back up before leaving."
        ],
        "sources": [
          {
            "label": "COD Zombies Guides: Fire and Light trials",
            "url": "https://www.codzombiesguides.com/main-quests/black-ops-6/citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 21,
        "title": "Charge the Mystic Orb: Dark Trial",
        "body": "Take the Orb to the Undercroft wall socket beside the Dark Incantation chest.",
        "bullets": [
          "Start and charge: Place the Orb, interact again, and kill nearby enemies with the Dark Incantation or Balmung’s charged vortex.",
          "Confirm and collect: Wait for the successful charge and its added orbiting light, then retrieve the Orb. Refill your incantation from its chest as needed."
        ],
        "sources": [
          {
            "label": "Niche Gamer: Mystic Orb elemental trials",
            "url": "https://nichegamer.com/black-ops-6-citadelle-des-morts-easter-egg-guide/"
          }
        ]
      },
      {
        "n": 22,
        "title": "Charge the Mystic Orb: Electric Trial",
        "body": "Bring the Orb to the Town Square holder beside the Nature Path gate.",
        "bullets": [
          "Start and charge: Place the Orb, interact again, and use the Electric Incantation or Durendal’s charged special attack for nearby elemental kills.",
          "Confirm and collect: Once the electric light joins the Orb, take it back. Keep each completed charge as you continue to the remaining holders."
        ],
        "sources": [
          {
            "label": "Niche Gamer: Mystic Orb elemental trials",
            "url": "https://nichegamer.com/black-ops-6-citadelle-des-morts-easter-egg-guide/"
          }
        ]
      },
      {
        "n": 23,
        "title": "Charge the Mystic Orb: Light Trial",
        "body": "This trial requires collecting lights, rather than an elemental-kill quota.",
        "bullets": [
          "Dining Hall holder: Place the Orb upstairs above the Entrance Hall doorway, opposite Vulture Aid, and interact again.",
          "Collect the wisps: Move through the glowing green wisps around the Dining Hall until they are absorbed. Keep collecting until the trial completes.",
          "Retrieve the Orb: Pick it up after the light charge appears. All four elements must be complete before returning to the animal-symbol wall."
        ],
        "sources": [
          {
            "label": "COD Zombies Guides: Fire and Light trials",
            "url": "https://www.codzombiesguides.com/main-quests/black-ops-6/citadelle-des-morts/"
          }
        ]
      },
      {
        "n": 24,
        "title": "Open the Secret Study and Take the Guardian Key",
        "body": "Return the fully charged Orb to the wall below the Sitting Rooms.",
        "bullets": [
          "Open the study: Insert the Orb into the center socket of the animal-emblem wall to reveal the Secret Study.",
          "Recording and key: Interact with the Ancient Mystic Recording on the table, listen to the Owl, and collect the Guardian Key."
        ],
        "sources": [
          {
            "label": "KeenGamer: Secret Study and Guardian Key",
            "url": "https://www.keengamer.com/articles/guides/call-of-duty-black-ops-6-zombies-complete-guide-to-citadelle-des-morts-easter-egg-and-how-to-get-the-elemental-swords/"
          }
        ]
      },
      {
        "n": 25,
        "title": "Prepare and Activate the Guardian",
        "body": "Finish your preparation before committing to the arena.",
        "bullets": [
          "Recommended supplies: Bring a strong Pack-a-Punch III, high-rarity firearm, tier-three armor, perks, ammunition, and a self-revive. A bullet weapon helps with precise weak-point hits. These are recommendations, not puzzle requirements.",
          "Begin the battle: When the squad is ready, insert the Guardian Key into the socket at the feet of the giant Town Square statue. Accept the squad start vote if prompted. The Guardian transports you to its arena."
        ],
        "sources": [
          {
            "label": "Destructoid: Tavern code and boss preparation",
            "url": "https://www.destructoid.com/bo6-zombies-citadelle-des-morts-easter-egg-main-quest-guide/"
          },
          {
            "label": "Community walkthrough: Guardian activation",
            "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=3379436490"
          }
        ]
      },
      {
        "n": 26,
        "title": "Defeat the Guardian: First Phase",
        "body": "Break armor and target the exposed glowing weak points.",
        "bullets": [
          "Keep moving: Avoid hammer swings, stomps, fireballs, and lava.",
          "Damage windows: Shoot exposed weak points rather than repeatedly spending ammunition on intact armor."
        ],
        "sources": [
          {
            "label": "Gameranx: Guardian battle and final amulet",
            "url": "https://gameranx.com/features/id/520079/article/black-ops-6-zombies-how-to-beat-the-guardian-citadelle-des-morts-boss-fight-guide/"
          }
        ]
      },
      {
        "n": 27,
        "title": "Defeat the Guardian: Second Phase",
        "body": "At roughly two-thirds health, the boss becomes temporarily immune.",
        "bullets": [
          "Transition wave: Stop shooting the immune boss and defeat the enemies, including Doppelghasts.",
          "Resume damage: The arena contracts with lava. Dodge the faster attacks and jumping slam while breaking remaining armor and hitting weak points."
        ],
        "sources": [
          {
            "label": "Gameranx: Guardian battle and final amulet",
            "url": "https://gameranx.com/features/id/520079/article/black-ops-6-zombies-how-to-beat-the-guardian-citadelle-des-morts-boss-fight-guide/"
          }
        ]
      },
      {
        "n": 28,
        "title": "Defeat the Guardian: Final Phase",
        "body": "At roughly one-third health, another immune phase begins.",
        "bullets": [
          "Survive the wave: Clear the enemies, including Amalgams, while preserving a route through the smaller safe area.",
          "Finish the Guardian: When it reactivates, focus its exposed chest weak point. Use your survival equipment before you become trapped."
        ],
        "sources": [
          {
            "label": "Gameranx: Guardian battle and final amulet",
            "url": "https://gameranx.com/features/id/520079/article/black-ops-6-zombies-how-to-beat-the-guardian-citadelle-des-morts-boss-fight-guide/"
          }
        ]
      },
      {
        "n": 29,
        "title": "Collect the Amulet and Complete the Quest",
        "body": "Defeating the Guardian is followed by one final interaction.",
        "bullets": [
          "Claim the amulet: Interact with the dropped Obscurus Altilium to trigger the ending.",
          "Finish the ending: Let the final sequence complete. Standard-mode rewards are listed in the quest file. The special early-completion Calling Card variant was only available through the end of Season 01 and is no longer earnable."
        ],
        "sources": [
          {
            "label": "Gameranx: Guardian battle and final amulet",
            "url": "https://gameranx.com/features/id/520079/article/black-ops-6-zombies-how-to-beat-the-guardian-citadelle-des-morts-boss-fight-guide/"
          },
          {
            "label": "Official Standard-mode quest rewards",
            "url": "https://www.callofduty.com/uk/en/blog/2024/12/call-of-duty-black-ops-6-warzone-zombies-season-01-reloaded-announcement"
          },
          {
            "label": "Official reward-window update",
            "url": "https://www.callofduty.com/patchnotes/2024/11/call-of-duty-black-ops-6-season-01-patch-notes"
          }
        ]
      }
    ]
  };

  return { games, maps, characters, wonderWeapons, perks, timeline, sampleEE };
})();
