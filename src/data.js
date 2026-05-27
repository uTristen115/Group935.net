// Extracted from index.html. Run npm run build:data after editing this file.
window.ZD = (function () {
  const games = [
    { id: 'waw', code: 'WaW', title: 'World at War', year: 2008, era: 'Origins of Origins', mapCount: 4, color: '#6a5232',
      imgDir: 'World at War',       imgBase: 'CoDWaW.png', imgHover: ['CoDWaWZ1.png','CoDWaWZ2.png'] },
    { id: 'bo1', code: 'BO',  title: 'Black Ops', year: 2010, era: 'The Aether Story Begins', mapCount: 7, color: '#7a3b32',
      imgDir: 'Black Ops',          imgBase: 'CoDBO1.png', imgHover: ['CoDBO1Z.png'] },
    { id: 'bo2', code: 'BO2', title: 'Black Ops II', year: 2012, era: 'Maxis vs. Richtofen', mapCount: 5, color: '#3f5a6b',
      imgDir: 'Black Ops 2',        imgBase: 'CoDBO2.png', imgHover: ['CoDBO2Z.png'] },
    { id: 'bo3', code: 'BO3', title: 'Black Ops III', year: 2015, era: 'The Final Chapter', mapCount: 9, color: '#5a3a6b',
      imgDir: 'Black Ops 3',        imgBase: 'CoDBO3.png', imgHover: ['CoDBO3Z.png'] },
    { id: 'bo4', code: 'BO4', title: 'Black Ops 4',  year: 2018, era: 'The Chaos Divergence', mapCount: 8, color: '#2f5a4a',
      imgDir: 'Black Ops 4',        imgBase: 'CoDBO4.png', imgHover: ['CoDBO4Z.png'] },
    { id: 'cw',  code: 'CW',  title: 'Cold War',     year: 2020, era: 'The Dark Aether', mapCount: 5, color: '#3a4a6b',
      imgDir: 'Black Ops Cold War', imgBase: 'CoDCW.png',  imgHover: ['CoDCWZ.png'] },
    { id: 'bo6', code: 'BO6', title: 'Black Ops 6',  year: 2024, era: 'Pact with the Dark', mapCount: 4, color: '#5a2f2f',
      imgDir: 'Black Ops 6',        imgBase: 'CoDBO6.png', imgHover: ['CoDBO6Z.png'] },
    { id: 'bo7', code: 'BO7', title: 'Black Ops 7',  year: 2025, era: 'Relics & Rift Walkers', mapCount: 4, color: '#6b4a2a',
      imgDir: 'Black Ops 7',        imgBase: 'CoDBO7.png', imgHover: ['CoDBO7Z.png'] },
  ];
  const maps = [
    { id: 'nacht',     game: 'waw', name: 'Nacht der Untoten', location: 'Unknown bunker, 1945', difficulty: 1, eeCount: 0, relicCount: 0, summary: '', tags: ['classic', 'survival', 'origin'] },
    { id: 'verruckt',  game: 'waw', name: 'Verrückt', location: 'Wittenau Sanatorium, Berlin, 1945', difficulty: 2, eeCount: 0, relicCount: 0, summary: '', tags: ['classic', 'perks', 'lore'] },
    { id: 'shino',     game: 'waw', name: 'Shi No Numa', location: 'Rising Sun Facility, Imperial Japan', difficulty: 2, eeCount: 0, relicCount: 0, summary: '', tags: ['classic', 'crew-debut', 'hellhounds'] },
    { id: 'derriese',  game: 'waw', name: 'Der Riese', location: 'Group 935 main facility, Breslau', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['classic', 'teleporter', 'pack-a-punch'] },
    { id: 'kino',      game: 'bo1', name: 'Kino der Toten', location: 'Abandoned cinema, East Germany, 1960s', difficulty: 2, eeCount: 1, relicCount: 0, summary: '', tags: ['classic', 'teleporter', 'samantha'] },
    { id: 'ascension', game: 'bo1', name: 'Ascension', location: 'Soviet cosmodrome, 1963', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['perks', 'space-monkeys', 'wonder-grenade'] },
    { id: 'moon',      game: 'bo1', name: 'Moon', location: 'Griffin Station, lunar far side', difficulty: 5, eeCount: 1, relicCount: 0, summary: '', tags: ['endgame', 'space', 'great-leap'] },
    { id: 'origins',   game: 'bo2', name: 'Origins', location: 'Excavation Site 64, Northern France', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['primis', 'elemental-staves', 'time-loop'] },
    { id: 'shadows',   game: 'bo3', name: 'Shadows of Evil', location: 'Morg City, 1940s', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['noir', 'apothicons', 'gobblegums'] },
    { id: 'eisendrache', game: 'bo3', name: 'Der Eisendrache', location: 'Austrian mountain castle, 1945', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['castle', 'bows', 'primis'] },
    { id: 'mob',       game: 'bo3', name: 'Mob of the Dead', location: 'Alcatraz Island, 1933', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['purgatory', 'acidgat', 'noir'] },
    { id: 'revelations', game: 'bo3', name: 'Revelations', location: 'The Aether', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['endgame', 'patchwork', 'cycle'] },
    { id: 'diemaschine', game: 'cw', name: 'Die Maschine', location: 'Projekt Endstation, Morasko, 1984', difficulty: 2, eeCount: 1, relicCount: 6, summary: '', tags: ['dark-aether', 'requiem', 'reboot'] },
    { id: 'firebase',  game: 'cw',  name: 'Firebase Z', location: 'Outpost 25, Vietnam, 1984', difficulty: 3, eeCount: 1, relicCount: 6, summary: '', tags: ['dark-aether', 'mimics', 'peck'] },
    { id: 'mauer',     game: 'cw',  name: 'Mauer der Toten', location: 'East Berlin, 1984', difficulty: 3, eeCount: 1, relicCount: 6, summary: '', tags: ['dark-aether', 'klaus', 'urban'] },
    { id: 'forsaken',  game: 'cw',  name: 'Forsaken', location: 'Ural Mountains, 1984', difficulty: 4, eeCount: 1, relicCount: 6, summary: '', tags: ['dark-aether', 'finale', 'elder'] },
    { id: 'terminus',  game: 'bo6', name: 'Terminus', location: 'Atlantic prison facility, 1991', difficulty: 3, eeCount: 1, relicCount: 6, summary: '', tags: ['bo6', 'terminus', 'maya'] },
    { id: 'liberty',   game: 'bo6', name: 'Liberty Falls', location: 'West Virginia, 1991', difficulty: 2, eeCount: 1, relicCount: 6, summary: '', tags: ['bo6', 'small-town', 'richtofen'] },
    { id: 'citadelle', game: 'bo6', name: 'Citadelle des Morts', location: 'Alsace, 1991', difficulty: 4, eeCount: 1, relicCount: 6, summary: '', tags: ['bo6', 'castle', 'elemental-swords'] },
    { id: 'tomb',      game: 'bo6', name: 'The Tomb', location: 'Eastern Europe, 1991', difficulty: 4, eeCount: 1, relicCount: 6, summary: '', tags: ['bo6', 'underground', 'staff'] },
    { id: 'ashes',     game: 'bo7', name: 'Ashes of the Damned', location: 'Dark Aether construct', difficulty: 4, eeCount: 1, relicCount: 9, summary: '', tags: ['bo7', 'dark-aether', 'relics'] },
    { id: 'astra',     game: 'bo7', name: 'Astra Malorum', location: 'Mountaintop research site', difficulty: 3, eeCount: 0, relicCount: 6, summary: '', tags: ['bo7', 'relics', 'observatory'] },
    { id: 'paradox',   game: 'bo7', name: 'Paradox Junction', location: 'Liminal transit hub', difficulty: 3, eeCount: 0, relicCount: 3, summary: '', tags: ['bo7', 'relics', 'liminal'] },
    { id: 'totenreich',game: 'bo7', name: 'Totenreich', location: 'Aetheric reconstruction', difficulty: 4, eeCount: 0, relicCount: 6, summary: '', tags: ['bo7', 'relics', 'finale-hint'] },
  ];
  const characters = [
    { id: 'dempsey',   name: 'Tank Dempsey',      role: 'Marine · Primis',           origin: 'Wisconsin, USA',          summary: '', quote: null, hue: 16 },
    { id: 'nikolai',   name: 'Nikolai Belinski',  role: 'Soviet Soldier · Primis',   origin: 'Soviet Union',            summary: '', quote: null, hue: 0 },
    { id: 'takeo',     name: 'Takeo Masaki',      role: 'Imperial Officer · Primis', origin: 'Empire of Japan',         summary: '', quote: null, hue: 40 },
    { id: 'richtofen', name: 'Edward Richtofen',  role: 'Group 935 · Both Crews',     origin: 'German Empire',           summary: '', quote: "I do what I do only to secure a better tomorrow.", hue: 280 },
    { id: 'samantha',  name: 'Samantha Maxis',    role: 'Aether Keeper',                  origin: 'Group 935 facility',      summary: '', quote: null, hue: 200 },
    { id: 'maxis',     name: 'Dr. Ludvig Maxis',  role: 'Group 935 · Voice in the Static', origin: 'Germany',           summary: '', quote: null, hue: 220 },
    { id: 'marlton',   name: 'Marlton Johnson',   role: 'Survivor · Victis Crew',     origin: 'Hanford, USA',            summary: '', quote: null, hue: 60 },
    { id: 'misty',     name: 'Abigail “Misty” Briarton', role: 'Survivor · Victis Crew', origin: 'Hanford, Washington', summary: '', quote: null, hue: 340 },
    { id: 'russman',   name: 'Russman',           role: 'Survivor · Victis Crew',     origin: 'Broken Arrow facility',   summary: '', quote: null, hue: 100 },
    { id: 'stuhlinger',name: 'Samuel J. Stuhlinger', role: 'Survivor · Victis Crew',  origin: 'Camden, NJ',              summary: '', quote: null, hue: 280 },
    { id: 'maya',      name: 'Maya Aguinaldo',    role: 'Operative · BO6 era',        origin: 'Philippines',             summary: '', quote: null, hue: 320 },
    { id: 'weaver',    name: 'Grigori Weaver',    role: 'Requiem Lead',                   origin: 'Eastern Bloc defector',   summary: '', quote: null, hue: 100 },
  ];
  const wonderWeapons = [
    { id: 'raygun',     name: 'Ray Gun',          map: 'Many',             summary: '' },
    { id: 'thundergun', name: 'Thundergun',       map: 'Kino der Toten',   summary: '' },
    { id: 'wunderwaffe',name: 'Wunderwaffe DG‑2', map: 'Shi No Numa', summary: '' },
    { id: 'staves',     name: 'Elemental Staves', map: 'Origins',          summary: '' },
    { id: 'bows',       name: 'Bows of the Keep', map: 'Der Eisendrache',  summary: '' },
    { id: 'rai',        name: 'R.A.I. K‑84', map: 'Die Maschine',     summary: '' },
  ];
  const perks = [
    { id: 'jugg', name: 'Juggernog',     summary: '' },
    { id: 'qr',   name: 'Quick Revive',                summary: '' },
    { id: 'sc',   name: 'Speed Cola',              summary: '' },
    { id: 'ddc',  name: 'Double Tap II', summary: '' },
    { id: 'sf',   name: 'Stamin‑Up',              summary: '' },
    { id: 'mule', name: 'Mule Kick',              summary: '' },
    { id: 'phd',  name: 'PhD Flopper',                  summary: '' },
    { id: 'tomb', name: 'Tombstone Soda',     summary: '' },
  ];
  const kronoriumText = `IN THE BEGINNING
There was only the Aether and the Keepers. Among them were two beings who would later be known by many names. One would be known as Doctor Monty, the other as the Shadowman

SEPTEMBER 3RD, 5AD
Knowing the planet has a gateway to Agartha, the Apothicons send meteors of Element 115 to Earth. They believe humanity will one day use Element 115 to wage war amongst themselves, opening a rift that will allow the Apothicons to escape the Dark Aether.

JANUARY 15TH, 1292
The Great War between humanity and the Apothicons begins.

APRIL 14TH, 1294
Sir Pablo Marinus is saved from the clutches of a Margwa by the four unknown heroes. They would later become known as Primis.

DECEMBER 31ST, 1299
Together with the Keepers, Primis defeats the Apothicons, bringing the Great War to an end.

JANUARY 1ST, 1300
Before they seemingly disappear from history, Primis instructs the Wolf King to begin building Der Eisendrache.

SEPTEMBER 19TH, 1318
Honoring the Wolf King's dying request, his loyal servant Arthur scatters and buries his bones in the grounds of Der Eisendrache, accompanied by the King's Wolf.

SEPTEMBER 20th, 1318
Temporal Rifts teleport Arthur to Resolution 1295 in 2025 Angola.

JUNE 30TH, 1908
A meteor containing Element 115 crashes near the Stony Tunguska River.

AUGUST 30TH, 1925
Doctor Edward Richtofen joins the Illuminati.

FEBRUARY 4TH, 1931
Large deposits of Element 115 are discovered near Breslau Germany. Doctor Ludvig Maxis, a german scientist, is sent to investigate.

MAY 10TH, 1931
Maxis forms Group 935, an experimental organization dedicated to the study of Element 115. Maxis tells his scientists they "represent the future of technological advancement" and will be "pioneers of human discovery." The group swears to work in secrecy from their respective governments. As Maxis says, "we cannot afford to let this power fall into the wrong hands."

NOVEMBER 5TH, 1934
Samantha Maxis is born. Her mother dies in childbirth.

AUGUST 11TH, 1936
Maxis invites Richtofen to join Group 935. He agrees, secretly acting on behalf of the Illuminati’s interests.

APRIL 10TH, 1937
The Imperial Japanese Army discovers Element 115 meteor fragments in a swamp within Japanese territories. They build the Rising Sun Facility to continue research. Division 9 is created to oversee its operation.

JUNE 14TH, 1937
The United States Government discovers deposits of Element 115 at Groom Lake, Nevada.

JULY 2ND, 1939
Maxis and Richtofen begin teleportation experiments with the Matter Transference Prototype, to mild success. The subjects are teleported, but their chemical composition is altered, leaving them catatonic and changed.

AUGUST 5TH, 1939
Using Element 115, Maxis and Richtofen resurrect one of the teleported corpses for the first time. Initially it obeys, but soon becomes rabid and attacks them. The test subject is euthanized.

SEPTEMBER 3RD, 1939
Richtofen begins development of the Wunderwaffe DG-2.

NOVEMBER 23RD, 1939
Maxis turns to the Reichstag for additional fundraising. Germany agrees to the request, expressing interest in their weapons research, teleportation technology, and the reanimated undead subjects.

DECEMBER 4TH, 1939
During Test Trial 151, Richtofen and Doctor Schuster successfully teleport a walnut. This is first successful test where the chemical composition of the object is maintained throughout the process.

DECEMBER 5TH, 1939
"Edward’s Walnut Delivery" fails to impress Maxis, who declares it was a waste of time. He reveals to Richtofen that Group 935 will soon be funded by Germany. Richtofen worries this will lead to massive defections, he and Schuster decide to continue their teleportation experiments behind Maxis’ back.

JANUARY 4TH, 1940
Richtofen and Schuster conduct their first human teleportation test, Richtofen is so confident in its success, he volunteers himself. Teleported to the Moon, he encounters the MPD, the Aether Pyramid hidden by the Apothicons. While inspecting the device, Richtofen is electrocuted and begins hearing the many voices of corruption, including that of the Shadowman. The device then teleports him to Shangri-La. Corrupted by the Dark Aether, Richfoten is gradually driven insane by an obsession to find Agartha.

JANUARY 5TH, 1940
Richtofen is worshipped by the natives of Shangri-La: an altar is built in his name. Richtofen encounters the Focusing Stone for the first time.

JANUARY 23TH, 1940
After a near month absence Richtofen returns to Schuster with a plan to build Griffin Station.

JANUARY 24TH, 1940
Richtofen renounces his involvement with the Illuminati. When asked how he could abandon his obligation to the order he says, "Teddy was a liar."

MARCH 13TH, 1940
Construction of Griffin Station on the Moon begins. Frustrated with Maxis’ alignment with Germany, other disgruntled Group 935 scientists join the cause.

JULY 13TH, 1940
Maxis instructs his assistant Sophia to write a letter to the Reichstag High Command requesting additional funds. Though he reports that mass production will soon be under way shortly, Der Reise lacks not only the funding, but sufficient volumes of Element 115.

AUGUST 1ST, 1940
In response to Maxis’ request, Germany creates two new facilities for Group 935. They are the Kino Facility, a repurposed theatre, and the Asylum Facility at the Wittenau Sanatorium in Berlin.

AUGUST 18TH, 1940
As per Germany’s request, the Japanese Imperial Army hands over the Rising Sun Facility to Group 935. Division 9 remains involved on site.

OCTOBER 3RD, 1940
Group 935 establishes a research facility in Siberia near the Tunguska River.

NOVEMBER 6TH, 1940
Group 935 establishes a research facility at Der Eisendrache.

JUNE 24TH, 1941
Nikolai Belinski’s wife is killed during the German advance into the Soviet Union. In an effort to numb the pain, Nikolai increasingly turns to Vodka.

JANUARY 11TH 1942
Maxis gives Fluffy to Samantha. The dog is expecting a litter.

JANUARY 20TH 1942
Maxis tests the first file for storage on the data servant.

JANUARY 26TH 1942
On the data servant, Maxis catalogs locations with prominent Element 115 deposits. He includes information about its various applications and cities that the reanimation of dead cells is a possible side effect.

JANUARY 30TH 1942
Richtofen completes the Wunderwaffe DG-2 prototype.

FEBRUARY 1ST 1942
With Griffin Station completed Richtofen names Doctor Groph lead scientist and returns to Earth to continue the charade with Maxis. Working alongside Schuster Groph is left to discover the power of the MPD.

FEBRUARY 2ND 1942
In a speech to his staff, Groph talks optimistically about Griffin Station’s establishment as a permanent base of operations.

APRIL 17TH 1942
Maxis develops the Ray Gun prototype at the Rising Sun Facility. H. Porter works on developing the 2nd Generation Model.

JUNE 13TH 1942
A result of temporal rifts in 1963 Kino, Monty reaches across time and offers little nudges. One nudge is developing Group 935’s Element 115 fused elixirs. They create four medicinal beverages known colloquially as Juggernog, Quick Revive, Speed Cola, and Double Tap.

JUNE 28TH 1942
Group 935 continues development of a weapons upgrade machine.

JULY 18TH 1942
Groph and Schuster unwittingly discover how to charge the MPD. When Schuster killas a rat near the device, its death inexplicably begins filling the tank, charging the device. They report their findings to Richtofen.

JULY 20TH 1942
Richtofen begins sending soldiers and scientists to the moon to be sacrificed; their souls used to charge the MPD.

NOVEMBER 5TH 1942
Takeo Masaki is dispatched by the Emperor to oversee the work of Group 935 and Division 9 at the Rising Sun Facility.

DECEMBER 8TH 1942
Richtofen shares the Element 115-based Elixir Recipes with Griffin Station. They develop Mule Kick.

DECEMBER 9TH 1942
Nikolai’s brother is killed in the Battle of Stalingrad.

DECEMBER 14TH 1942
Richtofen creates the Monkey Bomb.

DECEMBER 16TH 1942
In a personal log, Maxis expresses concern over Element 115’s impact on Richtofen’s behavior. No longer trusting him, he wonders if it was a mistake to invite him to Group 935.

DECEMBER 20TH 1942
Accompanied by Sophia, Maxis is transferred to the Kino facility to focus on creating Germany’s undead army. Samantha is left in Richtofen’s care.

JANUARY 8TH 1943
Maxis worries he and Sophia have grown too close. He considers sending her away.

JANUARY 16TH 1943
Nikolai is captured by German Forces during the Battle of Stalingrad. He becomes a subject in Group 935 experiments.

JANUARY 27TH 1943
Maxis reports success with Subject Two-Six, whose "violent outbursts have been greatly reduced." Maxis believes "this method of treatment will be 100 percent effective in most cases."

FEBRUARY 2ND 1943
The Battle Stalingrad ends.

FEBRUARY 10TH 1943
Maxis reports the treatment has been perfected. He believes if "Subject Two-Six can retain the impressions longer than twenty-six hours, then the delivery of the zombie army can be accelerated."

FEBRUARY 12TH 1943
After attacking a handler, Subject Two-Six is killed and deemed "another setback."

MAY 18TH 1943
Harvey Yena begins his work with Group 935.

JUNE 4TH 1943
Primis arrives from Dimension 63. In an effort to prevent the events that are about to unfold they formulate a plan to stop this dimension’s Richtofen.

JUNE 11TH 1943
Richtofen is contacted from the House by Maxis, who warns that "The test subjects must never be allowed to be awakened, the havoc that could be awakened upon the future by such simple-minded individuals would be catastrophic."

JUNE 15TH 1943
Takeo reports to the Emperor that the work being done at the Rising Sun Facility is "unacceptable."

JUNE 19TH 1943
Primis Richtofen is teleported to the House in Agartha, reuniting him with Maxis.

JUNE 24TH 1943
On the orders of the Emperor, Takeo is taken prisoner by Group 935 and Division 9. He is used as a test subject for experiments.

JULY 14TH 1944
After the setbacks with Subject Two-Six, Maxis reports new success with the undead Army. However, he maintains his belief that the undead cannot be controlled or maintained.

SEPTEMBER 2ND 1944
Pablo Manius, a Mexican Spy, is captured by Group 935 at Der Eisendrache.

MAY 9TH 1945
In his cell, Pablo writes of visions of a great war. He describes a "great battle against strange demon-like creatures who were trying to devour the Earth." In his vision, he sees four knights protect him from certain death. He makes a note that the knights wore tunics similar to those in Der Eisendrache.

JUNE 4TH 1945 - NACHT DER UNTOTEN
An Allied plane malfunctions over an airfield and crashes. German Army trucks, transporting the undead and Element 115 between Group 935 facilities is struck in struck in the crash. The marines surviving the crash hold out against the undead as long as they can.

JUNE 17TH 1945
Peter McCain infiltrates Group 935 at Der Riese.

JUNE 29TH 1945
Groph and Schuster develop the Wave Gun.

JULY 15TH 1945
Richtofen travels to the siberia Facility to do further research on "live specimens." As her temporary guardian, he takes Samantha with him. Group 935 begins transferring three test subjects for experimentation: Nikolai, Pablo, and Takeo.

JULY 29TH 1945
While Richtofen works at the Siberian Facility, Group 935 begins development of Deadshot Daiquiri.

AUGUST 1ST 1945
The test subjects arrive at the Siberian facility for Richtofen’s experiments.

AUGUST 31ST 1945
CIA Handler Cornelius Pernell confirms that Peter McCain has successfully infiltrated Group 935 and has been transferred to the Asylum Facility. Cornelius suspects Group 935 is losing control of their experiments and has sent in a Marine Recon unit to extract McCain. Tank Dempsey is the lead to the Squad.

SEPTEMBER 1ST 1945
Peter is outed as a spy and captured by Group 935.

SEPTEMBER 2ND 1945
Richtofen reports Pablo has died following a spleen removal. He also reveals he’s been performing experiments on Samantha. WW2 ends. Group 935 continues their research. Temporal Rifts begin to affect the asylum facility. An Orderly reports increasing problems with test subjects.

SEPTEMBER 2ND 1945
Many in the facility have begun hearing voices coming from the walls, including the sobbing of a boy and a girl, screaming, and "a man shouting for children to close the windows."

SEPTEMBER 3RD 1945
An outbreak occurs at the Asylum facility. Peter McCain escapes.

SEPTEMBER 6TH 1945 - VERRUCKT
Dempsey, John Banana, Smokey and a fourth marine arrive at the Asylum Facility to find it overrun by zombies. They fight off the horde as long as they can. Dempsey is apprehended by group 935.

SEPTEMBER 7TH 1945
John Banana writes messages and records his last words while being eaten alive by an undead Smokey.

SEPTEMBER 10TH 1945
Richtofen reports another spy has been captured and will be brought in to replace "the Mexican." The subject is Dempsey.

SEPTEMBER 13TH 1945
Cornelius Pernell attempts to send a transmission to Peter McCain, telling him to rendezvous at the Rising Sun Facility.

SEPTEMBER 17TH 1945
Dempsey arrives at the Siberian Facility.

SEPTEMBER 20TH 1945
Richtofen documents the personality traits of his test subjects. Dempsey’s "intellect seems low, but his will is strong." Takeo is "still staring at the floor, muttering what sounds like some kind of proverb over and over again." Nikolai has "recently begun responding to stimuli, but only after injections of a new serum made primarily from vodka." Richtofen notes that their minds have been almost entirely broken, with no memory remaining who they once were.

SEPTEMBER 27TH 1945
Richtofen returns to Der Riese with Dempsey, Nikolai, Takeo Samantha.

OCTOBER 1ST 1945
Maxis reports on Richtofen’s findings with his live test subjects, noting that while their baseline psyche remains intact, all specific memories have been lost.

OCTOBER 1ST 1945
Infuriated to learn that Maxis has not been mass producing the DG-2 as he swore he would, Richtofen revels in his plot to destroy Maxis and Samantha, vowing that he will no longer continue to work his undead army.

OCTOBER 8TH 1945
Groph reports to Richtofen the MPD is nearly ready.

OCTOBER 12TH 1945
Grophs radios Richtofen to inform him that the device has been powered up and is awaiting the conduit. Richtofen says he will proceed with Operation Shield and dispose of Maxis and Samantha.

OCTOBER 13TH 1945
Though frustrated that the “matter transference tests… have been largely unsuccessful,” Maxis acknowledges that the test subjects departure from their original point of origins is undeniable.” However, Richtofen’s suggestion that the subjects have been transported not through space, but time itself causes Maxis to worry if his “irrationality may soon prove a liability to our endeavors.

OCTOBER 13TH 1945
Maxis and Richtofen perform teleportation test trials on Test Subjects Number 3, 4, and 5. All fail, including Test 5, where Maxis uses Fluffy. As Test 6 chamber. Samantha sees fluffy and runs into the teleporter. Maxis chases after her. Richtofen seals them both in the test chamber and teleports all three of them.

OCTOBER 13TH 1945
Samantha is teleported to the moon while Groph and Schuster work on the MPD. Running into the MPD, she is drawn inside of it, where she becomes corrupted by the Dark Aether. Maxis is teleported to the Crazy Place and develops the power to merge with electricity. Richtofen returns to the moon. Learning Samantha is trapped in the MPD, he orders Groph to teleport Maxis there to coax her out of the device. He also warns Groph to keep an eye out for an "evil looking dog." Richtofen returns to the moon.

OCTOBER 13TH 1945
In an effort to free Samantha, Maxis approaches the MPD and persuades her to come out. Once she does, Maxis gives her an instruction, "Kill them... all." Maxis kills himself and merges with the technology of Griffin Station, while Samantha unleashes the undead upon the base.

OCTOBER 14TH 1945
H. Porter activates the alarm as an outbreak occurs at Der Reise. Before taking a cyanide capsule, he says he's "all out of hope... god forgive us all."

OCTOBER 14TH 1945
Richtofen returns to Der Reise and awakens Dempsey, Takeo, and Nikolai. With no recollection of who they are or who Richtofen is, they agree to help him. The four would become known as Ultimis.

OCTOBER 18TH 1945
Peter McCain parachutes over the Rising Sun Facility. He dies shortly after.

OCTOBER 21ST 1945 - SHI NO NUMA
Ultimis travels to the Rising Sun Facility to recover Richtofen's diary. Upon reading it, Richtofen begins to form his plan to defeat Samantha.

OCTOBER 28TH 1945 - DER REISE
Ultimis returns to Der Reise. With his diary, Richtofen plans to use the teleporter to return to the moon and confront Samantha. Unfortunately the Wunderwaffe DG-2 overloads the teleporter and sends them through time - causing Richtofen to drop his diary.

NOVEMBER 5TH 1945
Group 935 is disbanded.

JANUARY 19TH 1946
The United States and the Soviet Union share the resources recovered from Group 935's various research stations. Richtofen's diary is among the items recovered by the Soviet Union.

JANUARY 27TH 1946
The Pentagon hires many former Group 935 scientists in an effort to replicate their work.

JANUARY 29TH 1946
As with their US counterparts, the Soviets hire many former Group 935 scientists. Among them is Harvey Yena, who forms the Ascension Group.

JULY 29TH 1952
The Pentagon begins experiments involving their own versions of the undead.

MAY 12TH 1955
The US Government transfers a number of Element 115 experiments to the Groom Lake Facility.

OCTOBER 19TH 1955
Gersh and Yuri Zavoyski begin working for the Ascension Group.

APRIL 25TH 1956
Explorers Brock and Gary discover Shangri-La. During an eclipse, they're unwittingly trapped in a time loop. Sally, sent back in time from 2011, is trapped in the same loop. Ultimis arrives in Shangri-La. With the help of Brock and Gary, they acquire the Focusing Stone.

JUNE 3RD 1959
The Pentagon constructs their own prototype teleporter, and commence experimentation.

MARCH 15TH 1962
Studying Group 935's medicinal elixir research, The Ascension Group develops PhD Flopper and Stamin-Up.

NOVEMBER 11TH 1962
Gersh begins work on Project Thunder.

DECEMBER 12TH 1962
Gersh and Yuri begin work on the Gersh Device, codenamed Project Mercury.

JUNE 15TH 1963
The Pentagon begins development on their own version of the Wunderwaffe DG-2.

AUGUST 17TH 1963
The Pentagon begins development on their own version of the Winter's Howl.

OCTOBER 28TH 1963 - KINO DER TOTEN
From Der Reise, Ultimis teleports to Kino. This marks the first time Ultimis travels across space and time. Temporal Rifts occur across dimensions. In light of these developments, Monty feels obligated to step in, and begins to make changes in the background across time. He helps Group 935 invent Perk machines. He adds chalk drawings to walls. Little nudges. Ultimis locates a Lunar Lander and fly to the Ascension Facility.

OCTOBER 29TH 1963
Gersh informs the senior staff that Yuri has been removed from Project Mercury and has been transferred to Rocket Research.

OCTOBER 29TH 1963
Yuri begins to notice the appearance of children's toys around the facility.

NOVEMBER 1ST 1963
Upon reading Richtofen's diary, Yuri begins to hear Samantha's voice. Over several days, her voice will consume him, driving him to resume work on the Gersh Device. He obeys.

NOVEMBER 4TH 1963
Gersh announces to the Committee that Project Thunder is nearing completion. gersh reveals Yuri may need to be removed from Ascension entirely, having observed his being "hostile towards other scientists... and frequently observed muttering to himself."

NOVEMBER 5TH 1963
Obeying Samantha's wishes, Yuri tricks Gersh into activating the Gersh Device. The rift created absorbs him and allows Samantha to travel through. Yuri is also absorbed and transported to the Pentagon.

NOVEMBER 6TH 1963 - ASCENSION
Ultimis arrives at the Soviet Cosmodrome and free Gersh from the Casimir Mechanism. Richtofen recovers his diary, and learns that they need the Vril Device from the Siberian Facility for his plan. Maintaining his ethereal form, Gersh sends them into a rift to their next destination before beginning his travels across space and time.

NOVEMBER 6TH 1963 - FIVE
In the Pentagon, John F. Kennedy, Richard Nixon, and Robert McNamara meet with Fidel Castro in the aftermath of the Cuban Missile Crisis. Due to the events at the cosmodrome, a zombie outbreak occurs. Samantha sends Yuri to the Pentagon to thwart their survival. After Gersh is freed and Ultimis departs from the Cosmodrome, the outbreak ends at the Pentagon. All four survive.

NOVEMBER 19TH 1963
In an effort to avoid another undead outbreak, the US Government creates the Broken Arrow program, establishing several facilities across the country. The Groom Lake Program is folded into Broken Arrow.

AUGUST 11TH 1973
Broken Arrow recovers a shard of Element 115 from Division 9.

SEPTEMBER 19TH 1979
Russman begins work at Broken Arrow. Over the course of his employment, his extensive exposure to Element 115 leads to significant memory loss.

APRIL 20TH 1983
Broken Arrow begins live animal experiments with the shard, creating Bios.

JUNE 24TH 1986
A containment breach involving the Bios occurs at one of the Broken Arrow facilities. Russman is one of the few to escape alive. The facility is shut down and abandoned. Its projects are transferred to other locations.

JUNE 24TH 1996
Victis arrives at the abandoned Broken Arrow facility. Still being pursued by undead Richtofen, they recover the Element 115 Shard and depart through another rift.

MARCH 17TH, 2011 - CALL OF THE DEAD
After entering the rift, Ultimis arrives at the Siberian Facility in 2011, where they find themselves trapped in a closet while George A. Romero films his latest project at the location. Samantha, in her pursuit of Ultimis, unleashes an undead outbreak. The film's stars fight the undead horde, ultimately recovering the Vril Device for Richtofen. Ultimis teleports to Shangri-La in an effort to acquire the next artifact required to defeat Samantha: The Focusing Stone.

APRIL 11TH, 2011
Following the disappearance of the Call of the Dead cast and crew, Romero's assistant Sally begins the search for her boss. Her journey leads her to Shangri-La during an eclipse, which sends her back in time to April 25th, 1956.

APRIL 10TH, 2023
Broken Arrow creates the Denizens.

JULY 8TH, 2025
Broken Arrow accidentally creates Avogadro.

SEPTEMBER 1ST, 2025
In desperate need of more Element 115, Broken Arrow uses an excavator to drill near the Nuclear Testing Facility known as Nuketown.

OCTOBER 13TH, 2025 - MOON
Using the Vril Device and the Focusing Stone, Richtofen completes his Grand Scheme and swaps bodies with Samantha on the Moon, giving him full control of the zombies and the Aether. Maxis contacts the remaining members of Ultimis through the station's electronics and asks for their help to defeat Richtofen. They agree. they launch missiles at Earth, leaving it fractured and broken. They sever Richtofen's connection with the Aether, but he maintains control over the zombies. Once Maxis controls the Aether in 2035 he returns to the Moon and plucks Samantha from Richtofen's body to join him in Agartha.

OCTOBER 13TH, 2025 - NUKETOWN ZOMBIES
A nuclear bomb explodes outside of Nuketown as a result of Broken Arrow's drilling. CIA and CDC operatives arrive to find an undead outbreak already in progress. One of the missiles from the moon hits Nuketown, killing all on site... except for Marlton Johnson, who survives by hiding in a nuclear bunker.

OCTOBER 13TH, 2025
The Earth fracturing triggers further Temporal Rifts, teleporting an 1800s American Western Town underneath a Mining Facility in Angola. Arthur is pulled through the rift from 1318, arriving in the now buried town.

NOVEMBER 5TH, 2025
Broken Arrow is disbanded after the primary facility is lost in a fire. It is later believed to be an act of arson committed by employees destroying evidence implicating them in the outbreak. Russman, his mind broken after over forty years of exposure to Element 115, begins to wander the Earth.

MARCH 18TH, 2027
In a distress call, Former CDC Assistant Director George Barkley reveals that the infectious contaminants have gone airborne. He advises caution regarding any allies showing signs of "short term memory loss, psychosis, delusion, and paranoia."

MARCH 27TH, 2027
A society of survivors who eat the undead is formed. They are The Flesh.

MAY 12TH, 2027
Samuel J. Stuhlinger joins The Flesh.

JUNE 18TH, 2027
Through the consumption of the undead meat, The Flesh begin hearing Richtofen's voice. He tries to persuade them to build global polarization devices for him in pursuit of his new plan: to mend the Rift in space time and acquire full control over the Aether.

JUNE 28TH, 2027
Maxis begins communicating to survivors on Earth, telling those willing to listen to build global polarization devices for him in pursuit of his new plan: to open Agartha and reunite him with Samantha, even though it will result in the destruction of the Earth.

APRIL 4TH, 2028
The Flesh broadcast their message across all frequencies. They tell others to "heed our call" and that the "path to enlightenment" can be achieved by consuming the undead.

DECEMBER 9TH, 2028
Maxis' followers begin constructing a spire near the Hanford Site Facility.

JANUARY 3RD, 2029
Maxis' followers begin to doubt him, believing he may in fact be evil. They destroy their electronics.

MARCH 2ND, 2029
Maxis' followers attempt to speak to him again. Many have begun to hear Richtofen... and those loyal to Maxis eagerly await further instruction.

AUGUST 15TH, 2029
A broadcast is sent out confirming the fall of "The Flesh" and Maxis' followers. With each group hearing the voice of Richtofen or Maxis, a battle broke out between them. As they fought, a zombie horde moved in and destroyed all who remained. Stuhlinger is one of the few to escape. Richtofen and Maxis are left with no one to communicate near Green Run, where the first polarization device must be constructed.

OCTOBER 13TH, 2035
Stuhlinger bumps into Russman, who has stolen a bus from an abandoned Broken Arrow facility.

OCTOBER 21ST, 2035 - TRANZIT
Stuhlinger and Russman run into Marlton and Abigail "Misty" Briarton at a diner near the Hanford Site facility. Maxis asks them to complete the polarization device in his favor. Stuhlinger, having consumed zombie meat, is contacted by Richtofen, who orders Stuhlinger to construct the device for him instead. The crew constructs the device for Maxis. The four would become known as Victis.

OCTOBER 22ND, 2035 - DIE RISE
Still hoping to regain control, Richtofen teleports Victis to Province 22, where he demands that Stuhlinger activate the second polarization device. Once again, the crew sides with Maxis. The voices cease for some time, leaving Victis to wander the earth.

DECEMBER 31ST, 2035 - BURIED
Victis arrives at an old western town now located beneath a mining facility in Angola. They discover Arthur in a jail cell; he assists them on their journey. The voices of Maxis and Richtofen return. They activate the final polarization device in Maxis' favor. Now corrupted by the Dark Aether, he reveals his true intentions to Victis and punishes Richtofen by trapping his soul in a zombie. Drawn into Agartha by her Father, Samantha witnesses the evil that has corrupted him. When a rift opens in Dimension 63 in 1918, she reaches out to that timeline's Maxis for help.

JANUARY 10TH, 2036
Richtofen instructs undead Richtofen to pursue Victis and recover their blood vials.

JANUARY 19TH, 2036
Primis Richtofen begins to manipulate Stuhlinger, opening a rift for Victis to begin their new journey. Pursued by undead Richtofen and an army of the undead, Victis enters the rift.

JANUARY 19TH, 2036
Maxis destroys Earth and all its surviving inhabitants.

DIMENSION 63
JANUARY 15TH, 1292
The great war between humanity and the Apothicon begins.

APRIL 14TH, 1294
Sir Pablo Marinus is saved from the clutches of a Margwa by four unknown heroes. They would later become known as Primis.

DECEMBER 31ST, 1299
Together with the Keepers, Primis defeats the Apothicon, bringing the great war to an end.

JANUARY 1ST, 1300
Before they seemingly disappear from history, Primus instructs the wolf King to begin building Der Eisendrache.

FEBRUARY 18TH, 1300
Pablo begins documenting the Great War, including all he has learned about the Keepers, Apothicons, and Element 115. Regarding Element 115’s power, he notes that a site in Northern France contains massive deposits of the element.

JUNE 4TH, 1300
In Northern France, a tomb is constructed to honor the fallen soldiers of The great War. Within it, statues of Primis are constructed to symbolize the hope that if one day a great evil falls upon mankind, they may return.

JULY 17TH, 1898
Edward Richtofen’s parents die.

FEBRUARY 20TH, 1905
Takeo Masaki fights the battle of Mukden.

AUGUST 11TH, 1906
Richtofen begins his studies at Heidelberg University under the tutelage of Doctor Ludvig Maxis. Having lost his parents, Richtofen comes to view him as a father figure.

JULY 3RD, 1912
Richtofen and Maxis join group 935.

JUNE 4TH, 1914
Richtofen is visited by another version of himself. Handing him some blood vials, he explains - "you will need this blood. When the time comes, it will protect you." before stepping back through the rift.

JANUARY 5TH, 1915
Maxis invents the Mauser Prototype.

AUGUST 28TH, 1916
The Journal of Sir Pablo Marinus, knight of the great war, is discovering by group 935.

MARCH 23RD, 1917
Using information gathered from Pablo’s Journal, group 935 begins work at dig site in northern France, where they discover a series of underground tombs.

APRIL 21ST, 1917
Group 935 discover what appears to be the entrance to the tomb’s main chamber. They struggle to gain access.

MAY 11TH, 1917
Unable to access the main chamber, soldiers listen to a gramophone to alleviate their frustration when listening to a recording of "La Source Noire", the entrance to the main chamber unexpectedly opens. The camp’s exposure to Element 115 begins.

MAY 21ST, 1917
Using information from Pablo’s journal and the tomb’s main chamber, Maxis draws schematics for the creation of four Elemental Staffs and instructs Richtofen to begin their construction.

MAY 29TH, 1917
The more Maxis reads of the great war, the more he begins to question his understanding of the scientific world, and the true nature of the universe itself. He "finds himself open to the possibility of a higher power…"

JUNE 11TH, 1917
As group 935 experiments with Element 115, they successfully create "localized energy fields which appear to function as portals," Nothing that objects can pass through them, Maxis speculates that the rifts may have have opened gateways across space and time. The rifts allow Samantha to reach out to Maxis from Agartha. She begs for his help and ultimately reveals she is his daughter.

JUNE 15TH, 1917
An "ancient box" with the power of manifest weapons from different eras arrives through a portal. Maxis fears that Element 115 is disrupting the space time continuum.

JULY 1ST, 1917
Following the installation of Element 115 powered generators, reports surfaced regarding "ancient figures emerging" from the dig site, corresponding with the mysterious deaths of a number of group 935 soldiers. The ancient figures are undead knights from the Great War.

AUGUST 3RD, 1917
Nikolai Belinski is sent into exile.

SEPTEMBER 10TH, 1917
Using Element 115, group 935 constructs Freya, Odin, and Thor - giant robots who they believe will secure victory for the Central Powers.

SEPTEMBER 22ND, 1917
Richtofen notes that inspite group 935’ progress at the dig site he is troubled by Maxis’ growing obsession with Pablo’s diary.

OCTOBER 6TH, 1917
Takeo Masaki is dispatched to France by the Emperor to gather intel on group 935’s weapon technology.

NOVEMBER 19TH, 1917
Following reports of "prototype armored weaponry…strange lights in the sky… a mysterious plague… and even giant metal men," Tank Dempsey is deployed in northern France to assess the extent of group 935’s capabilities.

DECEMBER 10TH, 1917
Already exiled in Europe, Nikolai receives new orders from the Imperial Russian Army to investigate the enemy "War Machine." Still loyal to the motherland, he willing obliges.

FEBURARY 23RD, 1918
Nikolai writes of the ongoing civil war in his homeland. He does not expect peace to last long, but is he enjoying his time in France…

MARCH 2ND, 1918
Learning that the Emperor wishes to meet him to discuss a "matter of great importance to our Nation," Takeo writes that he feels a " growing sense of dread" in the wake of his recent dark, twisted dreams.

APRIL 14TH, 1918
Despite ongoing battles, Dempsey fares well in northern France. In a personal letter, he reveals that both the Japanese and Russian Armies have also sent spies to investigate the activities of group 935.

MAY 1ST, 1918
Maxis is obsessed with the voice of Samantha, who now speaks to him constantly. He believes her to be "the key to everything."

MAY 12TH, 1918
Believing that his mentor has been affected by Element 115 like other at the dig site, Richtofen reports Maxis’ erratic behavior to group 935’s senior staff.

MAY 13TH, 1918
Richtofen learns from Pablo’s journal that the northern France dig site may be the single largest deposit of element 115 on Earth. He believes this explains why it has affected so many at the site.

MAY 14TH, 1918
Now completely consumed by Samantha’s voice, Maxis swears he will no longer serve group 935’s mission.

JUNE 4TH, 1918 - ORIGINS
Element 115 awakens the undead knights from the Great war and quickly consumes the camp. Maxis is rendered catatonic by the the element, Richtofen removes his brain before he turns. Dempsey, Nikolai, and Takeo unite with Richtofen on the battlefield and help free Samantha from her imprisonment in Agartha. Primis has been reunited. Samantha send Primis to their next destination. Maxis’ brain arrives in Agartha and Doctor Monty decides to step in. Monty brings Maxis’ brain to the house and wipes Maxis corrupted by Dark Aether form existence.

MOB OF THE DEAD
JULY 18TH, 1922
Salvatore "Sal" DeLuca opens gambling houses across Chicago. This marks the beginning of the Deluca crime family.

FEBRUARY 17TH, 1923
Billy handsome joins the Deluca crime family as a hitman. Sal will come to look at Billy as the son he never had.

SEPTEMBER 18TH, 1923
An expert in gambling and rigging sporting events, Michael "Finn" O’leary begins working for Sal.

MARCH 23RD, 1924
Finn marries Angelina Bow, an aspiring starlet with delusions of grandeur.

MARCH 1ST, 1929
Sal writes of his frustration with "Chicago's Finest". After many years of successful bribes with the city, it becomes clear that is no longer an option.

MAY 11TH, 1930
Sal begins to work with Albert "Al" Arlington, an associate in Los Angeles known for being a "master schemer and bank robber"

OCTOBER 14TH, 1930
Finn informs his lawyer he will not accept divorce from Angela, saying "she can leave this marriage the day she leaves this Earth"

OCTOBER 11TH, 1931
After an LA heist for Sal goes wrong, Al wakes up in the hospital.

OCTOBER 28TH, 1931
While in the hospital, Al submits "Icarus from Mars" for publication as a comic strip. It is his third attempt - it is denied again.

NOVEMBER 11TH, 1931
Angry and frustrated with his collapsing empire Sal kills a prostitute. No longer willing to turn a blind eye, Chicago PD arrests him.

DECEMBER 1ST, 1931
In an operation against the Deluca Crime Family, Billy is arrested for multiple homicides.

DECEMBER 19TH, 1931
In an operation against the Deluca Crime Family, Finn is arrested by Chicago PD when his wife offers evidence against him.

JANUARY 19TH, 1932
Al is arrested for his role in the LA heist.

MAY 14TH, 1932
Sal is found guilty of murder. He is sentenced to life in prison at Alcatraz.

MAY 16TH, 1932
Billy is found guilty 116 counts of murder. He is sentenced to life in prison at Alcatraz.

MAY 30TH, 1932
Finn is found guilty of 16 counts of gambling fraud. He will serve his sentence at Alcatraz.

JUNE 13TH, 1932
Sal and Billy arrive at Alcatraz Island.

JUNE 30TH, 1932
Finn arrives at Alcatraz Island.

JULY 1ST, 1932
Al is found guilty of grand larceny, grand theft auto, arson, conspiracy and battery. He will serve his sentence at Alcatraz.

AUGUST 3RD, 1932
Al arrives at Alcatraz Island.

JANURARY 1ST, 1933
Stanley Ferguson begins working at Alcatraz Island.

APRIL 1ST, 1933
Al convinces Sal, Finn, and Billy that they can build a plane and escape Alcatraz.

DECEMBER 2RD, 1933
Realizing the plane will never be completed and embittered with rage, Sal, Finn and Billy plot to get revenge on Al.

DECEMBER 31ST, 1933
Finn, Sal and Billy lure Al to the roof and kill him.

JANUARY 11TH, 1934
Stepping through a rift, Richtofen secures the blood samples of Sal and Finn.

JANUARY 19TH, 1934
Found guilty of Al’s murder, Sal, Finn and Billy are executed by electric chair.

MOB OF THE DEAD
Sal, Finn, Billy and Al battle waves of undead as they find themselves trapped in a seemingly endless cycle.

APRIL 16TH, 1940
Richtofen arrives in Dimension 63, where he contacted members of the illuminati and enlists their help to build a laboratory facility beneath Alcatraz.

APRIL 18TH, 1940
Richtofen meets with Stanley Ferguson and convinces him to assist with the illuminati's construction of the alcatraz laboratory.

JULY 3RD, 1941
Stanley Ferguson reports that the laboratory has been completed, and that the subjects will be placed in the stasis chambers upon arrival.

JULY 4TH, 1941
Richtofen returns to the lab under Alcatraz where we meet Victis, arriving from the empty earth with the kronorium. Upon reading the kronorium, Richtofen discovers numerous timelines documenting their fates and learns about the blood vials. He would later write on the page "I know what I must do - E.R. 4/7/41." Richtofen enters a rift to acquire the blood of Sal and Finn After delivering the blood to his younger self and recovering the blood vials belonging to Victis he returns. Victis is placed ‘on ice’, to be kept safe until they are needed next.

JULY 4TH, 1941
Primis arrives to collect the Victis blood samples from Richtofen, Following Primis departure, Richtofen learns the location of the summoning key and travels to his next destination.

OCTOBER 1ST, 1942
Stanley Ferguson leaves employment at Alcatraz.

OCTOBER 21ST, 1943
Posing as Mr. Rapt the Shadowman hires the reporter to recover artifacts from the South Pacific and Russia.

DECEMBER 14TH, 1943
The reporter recovers the artifacts from the South Pacific and Russia among them is the Summoning key.

DECEMBER 25TH, 1943
As per Mr. Rapt’s request the reporter speaks to Stanley Ferguson, a retired guard from Alcatraz, Stanley gives a detailed account of the deaths of Al Arlington, Bill handsome, Finn O’Leary and Sal Deluca.

DECEMBER 31ST, 1943
At Mr. Rapt’s request the reporter arrives in Morg City to take in the sights, sounds and smells.

JANUARY 15TH, 1943
A meteor shower rains over Morg city.

JANUARY 30TH, 1944
The reporter notes strange mold now growing all over the city. He also notes people are getting sick and acting delirious.

FEBRUARY 13TH, 1944
A fruit vender tells the reporter about the ancient order of the keepers, and how they’re the only ones holding back the forces of the apocalypse. He talks of the people hearing chantin... From beneath the city.

MARCH 30TH, 1944
The reporter sends Mr. Rapt a telegram providing details and contact information for Nero, Jessica Rose, Floyd Campbell, and Jack Vincent.

APRIL 5TH, 1944
Aware of the Shadowman’s actions, Monty writes to the reporter, warning him to not give the summoning key to anyone.

APRIL 10TH, 1944
Jessica Rose learns a photographer is in possession of compromising pictures of her.

APRIL 20TH, 1944
Pretending to be a company executive, the Shadowman tells Nero’s Lawyer that Nero’s wife has taken out substantial loans in his name, Nero has 15 days to settle before the company seeks reparation, Facing multiple debts due to his wife’s spending habits, Nero decided to kill his wife and get life insurance to pay off the debt. Masquerading as an Internal Affairs officer, the Shadowman tried to convince Jack Vincent’s partner to admit that Jack plots to kill the snitch who could provide evidence against him.

APRIL 20TH, 1944
The Shadowman poses as a film director interested in hiring Jessica for a leading role. He tells her producer the part is her’s. Afraid that the photographer could jeopardize her chance at stardom, she asks him to meet her, so they can "sort stuff out"

APRIL 20TH, 1944
Posing as a journalist the Shadowman suggests Floyd Campbell is a "journeyman fighter" to Floyd’s Promoter. Wanting to guarantee his shot at the title, Floyd decides to wear brass knuckles under his gloves for his fight with Tony King.

APRIL 21ST, 1944
Nero misses a call from his lawyer, informing him the documents were forged and there is nothing to worry about. Jack misses a call from his partner he has his back with internal affairs and has nothing to worry about. Floyd misses a call from his promoter that the fight was a success and that he has a shot at the title.

APRIL 21ST, 1944
Jessica misses a call from her producer. He says he didn’t have a good feeling about the director and it didn’t work out. However he scored her a lead in a musical he and his partner are financing.

APRIL 21ST, 1944
Jessica kills the photographer and secures the incriminating photographs. Jack Kills the snitch who could turn him over to International Affairs. Floyd kills Tony the King in the boxing match and cash on his winnings. Nero Kills his wife in a "work accident", cashing in her life insurance policy to square away the debts.

APRIL 21ST, 1944
Richtofen arrives in Morg City to secure the Summoning Key.

APRIL 22ND, 1944
Richtofen learns The Reporter has the Summoning Key and confronts him. The Reporter waves Monty’s letter at Richtofen and orders him to stay away before attacking him. Richtofen kills the Reporter in self-defense.

APRIL 25TH, 1944 - SHADOWS OF EVIL
Nero, Jack, Floyd and Jessica are knocked unconscious at the Blake Lake Burlesque club. They wake up in a twisted version of Morg City, Shifted slightly from reality. Told they can atone for their sins by the Shadowman, all four are tricked into performing rituals. Jessica sacrifices her producer, Jake sacrifices his partner, Floyd sacrifices his promoter, and Nero sacrifices his lawyer. Completing the required rituals, the Apothicons are given access to Dimension 63. Realizing they’ve been duped, the four work with the Keepers to defeat the Shadowman. They trap him in the summoning key, but before they can hand it over to the Keepers, Primis Rictofen arrives and steals the key. Rictofen travels to Dimension 2210 to secure an innocent Rictofen soul. He delivers the soul to the House. From within the Summoning Key the Shadowman states, "I’ll be seeing you…"

APRIL 26TH, 1944
The Apothicons destroy Dimension 63.

AGARTHA
THE SUMMONING KEY
The keepers crafting the Summoning Key. A device that allows them to manipulate the Aether. Holding power to alter reality itself, they use it to create Agartha.

THE FIRST TRANSFERENCE DEVICE
The Keepers master the ability to travel between Dimensions.

THE DARK AETHER
Some Keepers begin to experiment with the Dark Aether, Which corrupts and corrodes their souls. Among them is the Shadowman.

THE AETHER PYRAMID
The corrupted Keepers create the Aether Pyramid, a device capable of absolute power. A Schism forms between them and the keepers untainted by the Dark Aether.

THE WAR OF AGARTHA BEGINS
War breaks out between the corrupted and uncorrupted keepers.

THE WAR OF AGARTHA ENDS
Facing defeat, the Corrupted Keepers hide the Aether Pyramid on a moon within one of the newly discovered dimensions. After banishing the Corrupted Keepers to the Dark Aether beneath creation, the remaining Keepers take on the mantle of Guardians. Trapped in the Dark Aether, The Corrupted Keepers contort and evolve over Eons, ultimately becoming the Apothicans. They desire, above all else, to return to Agartha.

THE FIRST ARRIVAL
With Doctor Montys help the Maxis Drone arrives at the house in Agartha. Despite the absence of his soul, Monty recreates a physical manifestation of his Dimension 63 form.

THE ARRIVAL OF SAMANTHA
Monty brings Samantha to the House, reuniting her with the Dimension 63 incarnation of the father.

SAMANTHA'S CORRUPTION
Knowing that Samantha is corrupted by the Dark Aether, Monty takes her away from Maxis and the house.

THE ISOLATION OF MAXIS
Alone in the House and missing his daughter, Maxis worries if Richtofen will have the courage to fulfil the vow he made all those years ago.

THE REDISCOVERY OF THE EMPTY EARTH
Having observed Monty for some time. Maxis uses the Teleporter in the basement of the House to study and explore other dimensions. Among them is the Empty Earth, where an alternate Maxis had constructed Zero Base, a facility that houses artifacts and replicas collected from a multitude of different timelines. However, his attempts to manipulate The Empty Earth create a reality too fragile to be sustained.

THE RESTORATION OF INNOCENCE
Monty returns Samantha to Maxis, her innocence restored.

MONTYS PLAN
Monty explains to Maxis that the paradox wrought by a multiverse must be resolved. A new reality can be created – one free of the Apothicans – but only if they enlist the aid of souls who had lived through and survived the fracturing.

THE KRONORIUM SECURED
Among the Artifacts that Maxis collected in Zero Base, is an ancient book known as the Kronorium – a complete record of the entire history and future of all reality. Protected by various countermeasures, the facility can only be accessed by those possessing a soul…

RICHTOFENS JOURNEY BEGINS
Maxis tells Richtofen the plan to secure the Kronorium and locate the Summoning Key. Hearing the echoes of his other selves, Richtofen discovers his connection with Samuel Stuhlinger and decides to use Victus to acquire the Kronorium.

THE MANIPULATION OF STUHLINGER
Having overseen the construction of a laboratory beneath Alcatraz, Richtofen returns to the house where he begins to communicate with Stuhlinger. Together, they persuade Victus to travel to a variety of locations in order to Recover the Kronorium.

THE KRONORIUM RETRIEVED
Upon arriving at Zero Base, Victus provides blood samples that allow them to access the Empty Earth and recover the Kronorium.

THE BLOOD ACQUIRED
Richtofen collects the Victus blood sample from Undead Richtofen.

THE ARRIVAL OF EDWARD
Richtofen collects Eddies innocent soul from Dimension 2210 and Monty gives him a physical form in the House.

SAMANTHA MEETS EDWARD
Eddie and Samantha meet each other for the first time. Samantha writes in her diary that Edward "doesn’t like to share toys."

THE HAPPINESS OF THE CHILDREN
Monty Brings Eddie and Samantha more toys.

THE FRAGILITY OF MEMORY
Maxis notes that teleportation and travel between dimensions could have a profound impact on the mind. He fears that the confusion caused by the collision of memories past,present and future could lead to the collapse of reality itself.

THE ARRIVAL OF THE SOULS
The souls arrive. Maxis tells Samantha and Eddie to “Put the toys away…. And to make sure the windows are locked before they come down to the basement.

THE ARRIVAL OF PRIMIS
Now soulless, Primis brings the summoning key to the house, Where Maxis unwittingly release the Shadowman. Who in turn frees the Apothicons from the Dark Aether. Unaware that they would be wiped from existence once they have served their purpose, Primis battles alongside Monty in his final battle against the Shadowman.

REVELATIONS
With the Shadowman and the Apothicons vanquished Monty Discovers that Primis has consumed the blood of souls from dimensions that no longer exist. The paradox must be resolved.

FRACTURES:
DECEPTIO FRACTURE
OCTOBER 13TH, 1945 - THE GIANT
As a zombie outbreak occurs, Primis Dempsey, Takeo and Nikolai confront Ultimis Richtofen moments after he teleports Maxis and Samantha. As they try to reason with him to wake their counterparts, Primis Richtofen arrives through the teleporter and kills his Ultimis self - triggering fractures across space-time. As Primis fights the undead, Group 935 secure the Dempsey subject and transport him to Der Eisendrache. Primis pursues them in a German Giant.

OCTOBER 29TH, 1945
Doctor Groph takes control of Group 935 in Richtofen’s absence, not realizing his fate at the hands of Primis.

OCTOBER 31ST, 1945
In the wake of haunted dreams and rumors that Samantha may be roaming Giffin Station, Groph worries the MPD may be corrupting the facility.

NOVEMBER 5TH, 1945 - DER EISENDRACHE
Recovering the Dempsey test subject from a rocket bound for the moon, Richtofen secures his soul and reveals to primus his intention to set things right. Primis destroys Griffin Station and the Moon.

PRODITONE FRACTURE
APRIL 12TH, 1942
Overrun by the undead, the rising Sun Facility is lost.

JULY 8TH, 1942
Division 9 begins construction of the Island Facility.

OCTOBER 9TH, 1942
With construction complete, Division 9 continue their projects at the Island Facility.

NOVEMBER 5TH, 1942
Takeo is dispatched by the Emperor to oversee the work of Division 9 at the Island Facility.

FEBRUARY 6TH, 1943
Division 9 expands experimentation to include use of prisoners of war, Division 9 staff, arachnids and "mystical beasts."

JUNE 15TH, 1943
Takeo reports to the Emperor the work being done at the Island Facility is "unacceptable."

JULY 24TH, 1943
On the orders of the emperor Takeo is taken prisoner by Division 9. He is used as a test subject for their Organic Plant based experiments.

SEPTEMBER 13TH, 1945
Cornelis attempts to send a transmission to Peter Mccain. Telling him to rendezvous at the abandoned Rising Sun facility.

OCTOBER 1ST, 1945 - ZETSUBOU NO SHIMA
Primis secure Takeos soul after they help him commit Seppuku. Richtofen takes the crew to dimension 63 to collect "their blood". For the "insurance policy", they return to the island before traveling to their next destination.

OCTOBER 18TH, 1945
Peter Mccain makes his jump into Shi No Numa as a temporal rift opens below him as a result of Primis Universe Fractures, the rift teleports him to Gorod Krovi.

AGONIA FRACTURE
NOVEMBER 11TH, 1942
Groph confirms that Division 9 has "completed the resurrection of the ancient beasts for [the battle on the] eastern front." Reports suggest that the "specimens... are still extremely dangerous... [but the German's] stalemate on the Eastern front with the Russians will soon come to an end" thanks to their involvement.

JANUARY 3RD, 1943
The Russians use stolen Group 935 research to create the Russian Gigant, the Russian Mangler and the Ray Gun Mark 3.

FEBRUARY 2ND, 1943
The Battle of Stalingrad doesn’t end. Thanks to technological advancements on both sides, World War 2 continues indefinitely.

FEBRUARY 13TH, 1943
Working with Maxis at the Kino facility, Sophia reveals she was attacked by Subject Two-Six.

FEBRUARY 14TH, 1943
Having learned Sophia was attacked by Subject Two-Six, Maxis kills her and transfers her brain into a machine, the Strategic Operation Planning Heuristic Intelligence Analyzer (SOPHIA).

JULY 7TH, 1943
SOPHIA is transferred to Stalingrad to oversee Group 935’s operations.

SEPTEMBER 2ND, 1943
Harvey Yena reports the dragons have proven beneficial the war effort at Stalingrad. Heconfirms that Die Glocke research continues to explore "time displacement" and "movement across dimensions."

NOVEMBER 6TH, 1943
SOPHIA confirms the existence of Project Rasputin, the Russian Mangler Soldier.

FEBRUARY 13TH, 1943
Working with Maxis at the Kino facility, Sophia reveals she was attacked by Subject Two-Six.

FEBRUARY 14TH, 1943
Having learned Sophia was attacked by Subject Two-Six, Maxis kills her and transfers her brain into a machine, the Strategic Operation Planning Heuristic Intelligence Analyzer (SOPHIA).

JULY 7TH, 1943
SOPHIA is transferred to Stalingrad to oversee Group 935’s operations.

SEPTEMBER 2ND, 1943
Harvey Yena reports the dragons have proven beneficial the war effort at Stalingrad. Heconfirms that Die Glocke research continues to explore "time displacement" and "movement across dimensions."

NOVEMBER 6TH, 1943
SOPHIA confirms the existence of Project Rasputin, the Russian Mangler Soldier.

NOVEMBER 6TH, 1945
Drifting through space and time in his ethereal form, Gersh arrives in the fracture.

NOVEMBER 6TH, 1945 - GOROD KROVI
Primis arrives and frees Sophia and acquires Nikolais soul. Richtofen teleports the soul. Richtofen teleports the souls of Dempsey, Takeo, and Nikolai to Maxis at the house. Monty announces his existence to primis for the first time.

APRIL 25TH, 1956
While travelling to Shangri-La, Brock and Gary’s plane crashes in the mountains as a result of a "freak atmospheric event" – another side effect of the Temporal Rifts created Primis while travelling to Gorod Krovi.

NOVEMBER 6TH, 1963
Hiding in a closet at the Pentagon, Mcnamara records a message confirming that John F. Kennedy, Richard Nixon, and Fidel Castro have died as a result of a zombie outbreak. He dies moments later.`;
  function isKronoriumDateHeading(head) {
    return head === 'IN THE BEGINNING' || /^[A-Z]+\s+\d{1,2}(?:ST|ND|RD|TH|th)?,?\s+\d{1,4}/.test(head);
  }
  function splitKronoriumHeading(head) {
    const match = head.match(/^(.*?)\s+-\s+(.+)$/);
    if (match) return { year: match[1], title: match[2] };
    if (isKronoriumDateHeading(head)) return { year: head, title: '' };
    return { year: 'Kronorium', title: head.replace(/:$/, '') };
  }
  function parseKronorium(text) {
    return text.trim().split(/\n\s*\n/).map((block) => {
      const lines = block.split(/\n+/).map((line) => line.trim()).filter(Boolean);
      const head = lines.shift() || 'Kronorium';
      const split = splitKronoriumHeading(head);
      return { year: split.year, title: split.title, body: lines.join(' ') };
    });
  }
  const timeline = parseKronorium(kronoriumText);
  const sampleEE = {
    id: 'kindertot', map: 'citadelle', mapName: 'Citadelle des Morts',
    title: 'Kinder der Toten', difficulty: 'Hard', duration: '60–90 min', party: 'Recommended 2‑4 players',
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

  // ─── augmentations ────────────────────────────────────────────────────
  // Keeps the core arrays above clean while letting us attach richer data
  // per game / per map. Edit the entries below to expand the site.

  const ASCENSION_SCREENSHOT_DIR = 'Black Ops 3/Maps/Zombies Chronicles/Ascension/Screenshots';
  const ascensionShot = (file, label) => ({ dir: ASCENSION_SCREENSHOT_DIR, file, label });
  const COTD_IMAGE_DIR = 'Black Ops/Maps/Call of the Dead';
  const cotdShot = (file, label, options = {}) => ({ dir: COTD_IMAGE_DIR, file, label, ...options });
  const SHANGRI_IMAGE_DIR = 'Black Ops/Maps/Shangri-La';
  const shangriShot = (file, label, options = {}) => ({ dir: SHANGRI_IMAGE_DIR, file, label, objectFit: 'contain', ...options });
  const MOON_IMAGE_DIR = 'Black Ops/Maps/Moon';
  const moonShot = (file, label, options = {}) => ({ dir: MOON_IMAGE_DIR, file, label, objectFit: 'contain', ...options });
  const FIREBASE_Z_IMAGE_DIR = 'Black Ops Cold War/Maps/Firebase Z';
  const firebaseZShot = (file, label, options = {}) => ({ dir: FIREBASE_Z_IMAGE_DIR, file, label, ...options });
  const SHATTERED_VEIL_IMAGE_DIR = 'Black Ops 6/Maps/Shattered Veil';
  const shatteredVeilShot = (file, label, options = {}) => ({ dir: SHATTERED_VEIL_IMAGE_DIR, file, label, ...options });
  const RECKONING_IMAGE_DIR = 'Black Ops 6/Maps/The Reckoning';
  const reckoningShot = (file, label, options = {}) => ({ dir: RECKONING_IMAGE_DIR, file, label, ...options });

  const classicEasterEggs = [
    {
      id: 'ascension-casimir-mechanism',
      map: 'ascension',
      mapName: 'Ascension',
      title: 'Casimir Mechanism',
      difficulty: 'Hard',
      duration: '45-75 min',
      party: '4 players required',
      summary: 'Link the Lunar Landers, activate each Casimir node, spell LUNA from the sky, and free Gersh from the device.',
      heroImage: ascensionShot('Terminal_Under_stairs.png', 'Casimir Mechanism terminal'),
      requirements: [
        '4 players',
        '2x Pack-a-Punched Ray Gun or Ray Gun Mark II (BO3)',
        'Thundergun',
        'Matryoshka Dolls',
        'Gersh Devices',
      ],
      rewards: [
        'Death Machines for 90 seconds in Black Ops',
        'All perks in Zombies Chronicles',
      ],
      steps: [
        {
          n: 1,
          title: 'Power, Landers, Rocket',
          body: 'Open the map and complete the launch sequence before starting the Casimir nodes.',
          bullets: [
            'Turn on the power.',
            'Link Lunar Lander F in the scrapyard near Stamin-Up.',
            'Link Lunar Lander B near Speed Cola and the Sickle.',
            "Link Lunar Lander D near PhD Flopper in Black Ops or Widow's Wine in BO3.",
            'Return to the power switch and launch the rocket.',
            'Get Gersh Devices from the Mystery Box.',
            "Throw a Gersh Device at the generator outside the map boundary near PhD Flopper or Widow's Wine.",
          ],
          images: [
            ascensionShot('Lander_Near_Staminup.png', 'Lander F near Stamin-Up'),
            ascensionShot('Lander_Near_Speed.png', 'Lander B near Speed Cola'),
            ascensionShot('Lander_Near_PhD.png', "Lander D near PhD Flopper or Widow's Wine"),
            ascensionShot('EE_Generator_GerschSuck.png', 'Generator outside the map boundary'),
          ],
        },
        {
          n: 2,
          title: 'Activate the First Node',
          body: 'Use the scrapyard terminal to activate the first node.',
          bullets: [
            'Go to Stamin-Up and enter the scrapyard near Lander F.',
            'Look under the metal stairs for the computer monitor showing static.',
            'Interact with the monitor to reveal the Illuminati pyramid.',
            'Node 1 completes and the first Casimir Mechanism light turns on.',
          ],
          images: [
            { ...ascensionShot('Terminal_Under_stairs.png', 'Activate the Illuminati Terminal'), layout: 'natural', maxWidth: '50%', showOverlay: true, kind: 'STEP 2' },
          ],
        },
        {
          n: 3,
          title: 'Press the Four Buttons',
          body: 'This step must be completed during a Space Monkey round.',
          bullets: [
            'Wait for the Space Monkey round to begin.',
            'Send one player to the button near Stamin-Up.',
            'Send one player to the button opposite Juggernog.',
            "Send one player to the button in the PhD Flopper room in Black Ops or Widow's Wine room in BO3.",
            'Send one player to the button near Speed Cola.',
            'Press all four buttons at the same time.',
            'If done correctly, the buttons sink into the walls and Node 2 completes.',
          ],
          images: [
            ascensionShot('Staminup_Button.png', 'Button near Stamin-Up'),
            ascensionShot('JuggernogButton.png', 'Button opposite Juggernog'),
            ascensionShot('PhDButton.png', "Button in the PhD Flopper or Widow's Wine room"),
            ascensionShot('Speed_Cola_Button.png', 'Button near Speed Cola'),
          ],
        },
        {
          n: 4,
          title: 'Hold the Pressure Plate',
          body: 'Hold the plate outside Pack-a-Punch until the node confirms.',
          bullets: [
            'Go to the area just outside the Pack-a-Punch room.',
            'Find the circular pressure plate near the wall clock.',
            'All four players must stand on the plate together.',
            'Hold the plate for 2 minutes.',
            'When complete, a Nuke power-up activates and Node 3 completes.',
          ],
          images: [
            ascensionShot('PressurePlateStep_Clock.png', 'Pressure plate clock'),
          ],
        },
        {
          n: 5,
          title: 'Spell LUNA',
          body: 'Collect the floating letters by calling the Lunar Lander along the correct route.',
          bullets: [
            'Park the lander at Spawn.',
            'Choose one player to stay on the lander while the others call it between pads.',
            'Call the lander from Spawn to Lander F near Stamin-Up to collect L.',
            'Call the lander back to Spawn to collect U.',
            'Call the lander to Lander B near Speed Cola to collect N.',
            'Call the lander back to Lander F near Stamin-Up to collect A.',
            'Once LUNA is complete, Node 4 completes.',
          ],
          images: [
            ascensionShot('Lander_Near_Staminup.png', 'Lander F route for L and A'),
            ascensionShot('Lander_Near_Speed.png', 'Lander B route for N'),
            ascensionShot('Lander_Near_PhD.png', 'Third lander reference'),
          ],
        },
        {
          n: 6,
          title: 'Free Gersh',
          body: 'Use the required weapons on the final light to free Gersh.',
          bullets: [
            'Complete all four nodes first.',
            'Look for the fifth white light on the ground in front of the Casimir Mechanism.',
            'Throw a Gersh Device as close to the white light as possible.',
            'Shoot the active Gersh Device with one upgraded Thundergun.',
            'Shoot it with two upgraded Ray Guns.',
            'Throw one set of Matryoshka Dolls into it.',
            "If done correctly, Gersh's soul is freed and the Easter Egg is complete.",
          ],
          images: [
            ascensionShot('EE_Generator_GerschSuck.png', 'Gersh Device generator target'),
          ],
        },
      ],
    },
    {
      id: 'call-of-the-dead-ensemble-cast',
      map: 'callofthedead',
      mapName: 'Call of the Dead',
      title: 'Ensemble Cast',
      difficulty: 'Medium-Hard',
      duration: '50-80 min',
      party: '2-4 players for Ensemble Cast',
      summary: 'Help Ultimis escape the locked room beneath PhD Flopper by powering the ship, repairing their fuse box, decoding the lighthouse signal, and sending the Vril Device through the vault tube.',
      heroImage: cotdShot('CotD_LoadingScreen.png', 'Ultimis locked behind the lighthouse door'),
      requirements: [
        'Power turned on',
        'Path to PhD Flopper open',
        'Semtex or other explosives',
        'V-R11 from the Mystery Box',
      ],
      rewards: [
        'Wunderwaffe DG-2 power-up',
        'Ensemble Cast achievement or trophy',
        'George Romero drops Wunderwaffe instead of Death Machine',
      ],
      steps: [
        {
          n: 1,
          title: 'Power the Ship',
          body: 'Open the map until you can reach the ship bridge. As usual, the main quest starts by restoring power to the facility.',
          bullets: [
            'Move through the ship until you reach the bridge on the top level.',
            'Flip the power switch in the bridge.',
            'Open the route back toward the lighthouse and PhD Flopper building.',
            'Start working on a V-R11 early, since the final sequence cannot be completed without it.',
          ],
          images: [
            cotdShot('Power_Switch.png', 'Power switch on the ship bridge'),
          ],
        },
        {
          n: 2,
          title: 'Restore the Vault Circuit',
          body: 'Drop into the room below PhD Flopper and get the crew talking through the sealed vault. Once the argument settles, Richtofen needs a replacement fuse for the busted panel.',
          bullets: [
            'Hit or use the vault door until Ultimis begins the request.',
            'Sweep the PhD Flopper floor and the adjacent lower room for the loose fuse.',
            'Look over desk surfaces, cabinet spaces, and small cluttered work areas for the pickup prompt.',
            'Carry the fuse back downstairs and install it in the wall panel next to the sealed door.',
            'Trigger the door again so the crew moves on to the next problem.',
          ],
          images: [
            cotdShot('DoorCrewIsBehind.png', 'Door to the trapped Ultimis crew'),
            cotdShot('Fuse_By_Locker.png', 'Fuse spawn by the locker'),
            cotdShot('Fuse_Nextto_PhD.png', 'Fuse spawn next to PhD Flopper'),
            cotdShot('Fuse_Opposite_PhD.png', 'Fuse spawn opposite PhD Flopper'),
          ],
        },
        {
          n: 3,
          title: 'Break the Security Grid',
          body: 'Nikolai trips the MDT security grid, leaving four red-lit units active across the coast. Use explosives and land the blast directly on the glowing machinery.',
          bullets: [
            'Semtex is ideal because it sticks, but any reliable explosive can work if the detonation hits the red light.',
            'One unit sits opposite the vault area, visible from the door side of the room.',
            'Another is tucked past the ship railing, down by the water near Double Tap.',
            'A third is lodged among the icy gaps in the central ship section.',
            'The last one is outside the playable path near a Stamin-Up window.',
            'When all four stop glowing, report back to the vault.',
          ],
          images: [
            cotdShot('CrewDoorGenerator.png', 'Generator by the crew door'),
            cotdShot('HeadofBoatGenerator.png', 'Generator at the head of the ship'),
            cotdShot('MidMapGenerator.png', 'Generator in the central ship section'),
            cotdShot('StaminupGenerator.png', 'Generator near Stamin-Up'),
          ],
        },
        {
          n: 4,
          title: 'Send Nikolai a Drink',
          body: 'Co-op only. Nikolai asks for vodka next, because of course he does. The bottle hangs in a block of ice above a lower walkway, so this step takes two players in sync.',
          bullets: [
            'Put one player at the bottle and one player on the lower path beneath it.',
            'The top player knifes the ice; the lower player catches the falling bottle.',
            'Check the ramp that joins the broken ship sections.',
            'Check the Mystery Box area on the upper PhD Flopper side.',
            'Check the high ledge near the MPL wall buy.',
            'Check the stairs that descend from the upper Mystery Box spot toward PhD Flopper.',
            'Feed the bottle into the left-side tube beside the vault.',
          ],
          images: [
            cotdShot('VodkaSpot1.png', 'Vodka bottle spawn 1'),
            cotdShot('VodkaSpot2.png', 'Vodka bottle spawn 2'),
            cotdShot('VodkaSpot3.png', 'Vodka bottle spawn 3'),
            cotdShot('VodkaSpot4.png', 'Vodka bottle spawn 4'),
          ],
        },
        {
          n: 5,
          title: 'Wake the Sky Signal',
          body: 'Co-op only. Four radios have to be used in sequence. Done correctly, the map answers with a blinking light in the sky.',
          bullets: [
            'Start below the power room and use the radio resting on the right-side electrical cabinet.',
            'Move to Stamin-Up and use the radio perched on the nearby barrel.',
            'Go to the zipline-exit side of the ship and find the sideways radio inside the shipping container.',
            'Finish beside the vault with the radio on the cabinet tucked under the stairs.',
            'Keep the activations close together so the sequence does not drop.',
            'Watch the sky for the blinking confirmation once the fourth radio registers.',
          ],
          images: [
            cotdShot('Radio1.png', 'Radio below the power room'),
            cotdShot('Radio2.png', 'Radio near Stamin-Up'),
            cotdShot('Radio3.png', 'Radio inside the ship container'),
            cotdShot('Radio4.png', 'Radio beside the vault stairs'),
          ],
        },
        {
          n: 6,
          title: 'Solve the Bridge Controls',
          body: 'Return to the bridge controls opposite the power switch. The wheel and lever positions translate the signal into the submarine setup.',
          bullets: [
            'Rotate the wheel until the brown handle sits in the lower-right position.',
            'Move to the three-lever panel beside the wheel.',
            'Pull the left lever one time.',
            'Leave the middle lever alone.',
            'Pull the right-most lever three times.',
            'The accepted setup is marked by the ship horn sounding off.',
          ],
          images: [
            cotdShot('ShipSteeringWheel.png', 'Bridge steering wheel setting'),
            cotdShot('Levers.png', 'Three-lever panel'),
            cotdShot('WheelandLevers.png', 'Wheel and lever control station'),
          ],
        },
        {
          n: 7,
          title: 'Call the Submarine',
          body: 'Co-op only. The foghorns have their own order. Hit them correctly and the submarine lines its green beam up with the lighthouse.',
          bullets: [
            'Start at the shoreline horn on the right side of the AK-74u wall buy.',
            'Use the horn around the right-hand corner after the slide toward Speed Cola.',
            'Return to the AK-74u area and use the horn on the left side near the building base.',
            'Finish with the horn straight ahead from the Speed Cola slide exit.',
            'The successful sequence pulls a green submarine beam into the lighthouse shaft.',
          ],
          images: [
            cotdShot('Foghorn1_WaterByLighthouse.png', 'Foghorn by the water near the lighthouse'),
            cotdShot('Foghorn2_LeftofSpeedCola.png', 'Foghorn left of Speed Cola'),
            cotdShot('FogHorn3_LighthouseBase.png', 'Foghorn at the lighthouse base'),
            cotdShot('FogHorn4_AheadofSpeed.png', 'Foghorn ahead of Speed Cola'),
            cotdShot('Submarine.png', 'Submarine beam lined up with the lighthouse'),
          ],
        },
        {
          n: 8,
          title: 'Align the Tower Dials',
          body: 'Co-op only. Each lighthouse floor has a numbered color dial. The solved stack reads 2746 from the top floor down, but every turn can disturb another floor.',
          bullets: [
            'Begin with the top yellow dial and put it on 2.',
            'Use the blue-floor dial to move orange into 7.',
            'Set the bottom purple dial to 6.',
            'Use the orange-floor dial to bring blue onto 4.',
            'Go back to yellow and correct it to 2 if the linked turns moved it.',
            'Before leaving, verify the order as yellow 2, orange 7, blue 4, purple 6.',
            'Purple loops back to yellow, so a final pass through all four floors is worth the time.',
          ],
          images: [
            cotdShot('TopFloorButton_Yellow_wide.png', 'Top floor yellow dial'),
            cotdShot('Floor3Button_Orange_Wide.png', 'Third floor orange dial'),
            cotdShot('Floor2Button_Blue_Wide.png', 'Second floor blue dial'),
            cotdShot('Floor1Button_Purple_Wide.png', 'Bottom floor purple dial'),
          ],
        },
        {
          n: 9,
          title: 'Feed the Lighthouse Beam',
          body: 'One player needs the V-R11 from the Mystery Box. With the green beam active, use the weapon at the lighthouse base to create the sacrifice target.',
          bullets: [
            'Lead a regular zombie onto the bottom floor of the lighthouse.',
            'Hit it with the V-R11 so it changes form and sprints for the beam.',
            'Let the runner enter the green light in the spiral stairwell.',
            'Once the target begins floating upward, kill it before it disappears at the top.',
            'The Scavenger, explosives, or concentrated fire can end the float quickly.',
          ],
          images: [
            cotdShot('HumanSacrifice.png', 'V-R11 target floating in the lighthouse beam'),
            cotdShot('Golden_Rod.png', 'Vril Device drops through the lighthouse'),
          ],
        },
        {
          n: 10,
          title: 'Hand Off the Vril Device',
          body: 'After the portal sequence resolves, the Vril Device descends through the lighthouse. Get it back to Ultimis and close out the escape.',
          bullets: [
            'Grab the Vril Device when it reaches the lower lighthouse floor.',
            'Run it back to the vault room under PhD Flopper.',
            'Load the device into the left tube that previously accepted Nikolai\'s vodka.',
            'Wait for Richtofen to finish his dialogue.',
            'Strike or use the fuse panel on the right side of the vault to send the crew out.',
            'Pick up the Wunderwaffe DG-2 reward after the crew leaves.',
            'After the quest, defeating George Romero rewards a Wunderwaffe drop in place of the usual Death Machine.',
          ],
          images: [
            cotdShot('Golden_Rod.png', 'Vril Device ready for the vault tube'),
            cotdShot('EE_Reward.png', 'Wunderwaffe DG-2 quest reward'),
            cotdShot('GeorgeRomero.png', 'George Romero reward reference'),
          ],
        },
      ],
    },
    {
      id: 'shangri-time-travel-will-tell',
      map: 'shangri',
      mapName: 'Shangri-La',
      title: 'Time Travel Will Tell',
      difficulty: 'Hard',
      duration: '60-90 min',
      party: '4 players required',
      summary: 'Enter eclipse loops, help Brock and Gary through the temple mechanisms, move the crystals, and claim the Focusing Stone from the Pack-a-Punch shrine.',
      heroImage: shangriShot('ShangMoonEclipseOn.png', 'Shangri-La eclipse mode', { objectFit: 'cover' }),
      requirements: [
        '4 players from start to finish',
        'Power on and all doors open',
        '31-79 JGb215, upgraded to The Fractalizer for the crystal and meteor steps',
        'Spikemores in Black Ops or Trip Mines in Zombies Chronicles',
        'A live Napalm Zombie for the gas step',
      ],
      rewards: [
        'Time Travel Will Tell achievement or trophy',
        'Focusing Stone',
        'All perks for the player who picks up the Focusing Stone',
      ],
      steps: [
        {
          n: 1,
          title: 'Power and Eclipse Setup',
          body: 'Open the temple, restore power, and use the four eclipse buttons around Spawn whenever the team is ready to start a timed step.',
          bullets: [
            'Turn on both power switches.',
            'Open the water slide, tunnels, mud room, mine cart, and Pack-a-Punch routes before committing to the quest loop.',
            'Start chasing the 31-79 JGb215 early, since the later crystal steps need it.',
            'Have all four players press the eclipse buttons around Spawn at the same time.',
            'Use the sun and moon symbols to confirm whether the map is in normal time or eclipse time.',
          ],
          images: [
            shangriShot('PowerSwitches.png', 'Twin power switches'),
            shangriShot('ShangSunEclipseOff.png', 'Sun symbols before eclipse'),
            shangriShot('ShangMoonEclipseOn.png', 'Moon symbols during eclipse'),
            shangriShot('Shang_StairstoPap_EclipseOn.png', 'Pack-a-Punch stairs during eclipse'),
          ],
        },
        {
          n: 2,
          title: 'Contact Brock and Gary',
          body: 'In eclipse mode, trigger the wall button near the MPL side to start the Brock and Gary sequence and reveal the matching floor slabs.',
          bullets: [
            'Enter eclipse mode.',
            'Move to the wall near the MPL side of the map.',
            'Press the round stone button under the statue relief.',
            'Listen for Brock and Gary, then split players between the matching slab areas.',
          ],
          images: [
            shangriShot('BrockAndGaryButtonStep1.png', 'Brock and Gary wall button'),
          ],
        },
        {
          n: 3,
          title: 'Match the Stone Slabs',
          body: 'Two sides of the map receive matching floor symbols. Pair the symbols correctly before the eclipse timer expires.',
          bullets: [
            'Keep one player on each slab side so callouts are fast.',
            'Have one player read a glowing symbol and the other find its match.',
            'Step on both matching slabs together to sink the pair.',
            'Avoid stepping on a wrong match, or the puzzle can reset.',
            'Finish every pair inside the same eclipse cycle.',
          ],
        },
        {
          n: 4,
          title: 'Trigger the Water Slide Plate',
          body: 'Use the water slide and lower pressure plate to release the next crystal from the temple machinery.',
          bullets: [
            'Enter eclipse mode again.',
            'Send three players to the lower steel grate or pressure plate near the water slide landing.',
            'Have the fourth player take the water slide while hugging the right side.',
            'Keep everyone planted on the plate until the step confirms and the eclipse ends.',
          ],
          images: [
            shangriShot('WaterSlide.png', 'Water slide route'),
          ],
        },
        {
          n: 5,
          title: 'Move the Crystal to the Geyser',
          body: 'Knock the crystal loose, shrink it, and move it through the slide route until the geyser launches it back into position.',
          bullets: [
            'At the top of the water slide, knock the wall crystal down with an explosive.',
            'Shrink the fallen crystal with the 31-79 JGb215.',
            'Knife or push the shrunken crystal down the water slide path.',
            'Guide it into the geyser at the lower landing.',
            'Stand on the geyser to launch the crystal onto its tower and complete the step.',
          ],
          images: [
            shangriShot('WaterSlideKnockDownCrystal.png', 'Crystal above the water slide'),
            shangriShot('CrystalKnockedDown.png', 'Crystal knocked down'),
            shangriShot('CrystalInGeyser.png', 'Crystal in the geyser'),
            shangriShot('CrystalAfterGeyser.png', 'Crystal after geyser launch'),
            shangriShot('CrystalForHelpingBrockNGary.png', 'Crystal tower confirmation'),
          ],
        },
        {
          n: 6,
          title: 'Light the Gas Leaks',
          body: 'Use a live Napalm Zombie to ignite the gas through the tunnel route, then return to the valve station to free the mechanism.',
          bullets: [
            'Wait until a Napalm Zombie is active before starting this sequence.',
            'Enter eclipse mode and move to the gas valve near the MPL tunnel route.',
            'Turn the valve four times to start the leaks.',
            'Lead the Napalm Zombie through the tunnel so each gas leak catches fire.',
            'When the leaks are lit, return to the valve station and pull the lever beside it.',
          ],
          images: [
            shangriShot('Valve_For_GasStep.png', 'Gas valve'),
            shangriShot('GasLeak1.png', 'Gas leak 1'),
            shangriShot('GasLeak2.png', 'Gas leak 2'),
            shangriShot('GasLeak3.png', 'Gas leak 3'),
          ],
        },
        {
          n: 7,
          title: 'Plug the Spikemore Holes',
          body: 'Set Spikemores or Trip Mines against the tunnel holes and use zombies to detonate them into the wall.',
          bullets: [
            'Enter eclipse mode.',
            'Go to the tunnel route that leads toward the waterfall side.',
            'Place one Spikemore or Trip Mine facing each wall hole.',
            'Lure zombies through the traps so the mines fire into the holes.',
            'After all four holes are sealed, press the reservoir button by the waterfall to end the step.',
          ],
          images: [
            shangriShot('Spikemore.png', 'Spikemore setup'),
            shangriShot('SpikeMoreHole1.png', 'Spikemore wall hole 1'),
            shangriShot('SpikemoreHole2.png', 'Spikemore wall hole 2'),
            shangriShot('SpikemoreHole3.png', 'Spikemore wall hole 3'),
            shangriShot('SpikemoreHole4.png', 'Spikemore wall hole 4'),
          ],
        },
        {
          n: 8,
          title: 'Activate the Wall Slabs',
          body: 'Knife the twelve wall slabs around the temple, then blow open the out-of-bounds frame near the mine cart area.',
          bullets: [
            'Enter eclipse mode.',
            'Knife the wall slabs around Spawn, the mud room, the mine cart area, the Stakeout room, and the power-side path.',
            'Confirm each slab is activated before moving on.',
            'At the mine cart side, throw an explosive toward the wooden frame or tent structure outside the playable path.',
            'Wait for the explosion and dialogue confirmation before leaving the eclipse cycle.',
          ],
        },
        {
          n: 9,
          title: 'Set the Mud Room Dials',
          body: 'Rotate the four mud room dials until each symbol is sitting in the correct top position.',
          bullets: [
            'Enter eclipse mode.',
            'Use the mud room layout from the PM63 side toward Quick Revive.',
            'Set the first dial to the three-dot symbol.',
            'Set the second dial to the C-shaped symbol with the line and dot.',
            'Set the third dial to the four-dot symbol.',
            'Set the fourth dial to the one-dot symbol.',
          ],
        },
        {
          n: 10,
          title: 'Find the Correct Gongs',
          body: 'Use the crystal reactions to identify the four correct gongs before attempting the dynamite drop.',
          bullets: [
            'Enter eclipse mode.',
            'Knife candidate gongs one at a time.',
            'If the crystals flash red, that gong is wrong for the current run.',
            'Keep testing until four correct gongs have been hit.',
            'When the correct sequence is active, the crystals glow yellow and the dynamite crystal is ready.',
          ],
        },
        {
          n: 11,
          title: 'Drop and Catch the Dynamite',
          body: 'Use the Pack-a-Punched shrink ray on the crystal path and catch the dynamite as it falls.',
          bullets: [
            'Upgrade the 31-79 JGb215 into The Fractalizer.',
            'Position one player under the dynamite near the crystal tower.',
            'Shoot the correct crystal with The Fractalizer so the beam bounces across the crystal network.',
            'Catch the dynamite before it hits the ground.',
            'If the dynamite is missed, repeat the gong and crystal setup.',
          ],
          images: [
            shangriShot('CrystalForHelpingBrockNGary.png', 'Crystal tower reference'),
          ],
        },
        {
          n: 12,
          title: 'Shrink the Meteor',
          body: 'Fire the upgraded shrink ray through the final crystal path, then use the Pack-a-Punch stairs to deliver the dynamite.',
          bullets: [
            'Enter eclipse mode if needed and return to the mud room crystal path.',
            'Shoot the crystal with The Fractalizer so the beam reaches the meteor above the shrine.',
            'Stand on the four Pack-a-Punch pressure plates to raise the stairs.',
            'Move up the shrine and place the dynamite in the wall opening.',
            'Back away before the blast resolves.',
          ],
          images: [
            shangriShot('Shang_StairstoPap_EclipseOff.png', 'Pack-a-Punch stairs before eclipse'),
            shangriShot('Shang_StairstoPap_EclipseOn.png', 'Pack-a-Punch stairs during eclipse'),
          ],
        },
        {
          n: 13,
          title: 'Claim the Focusing Stone',
          body: 'Return to the shrine after the blast and let one player take the Focusing Stone reward.',
          bullets: [
            'Reactivate Pack-a-Punch access if the stairs are down.',
            'Return to the wall where the dynamite was placed.',
            'Have the chosen player pick up the Focusing Stone.',
            'That player receives all perks for the rest of the game.',
            'Use the radio at the base of the shrine if the team wants to repeat the quest for another player.',
          ],
          images: [
            shangriShot('Shang_StairstoPap_EclipseOn.png', 'Focusing Stone shrine route'),
          ],
        },
      ],
    },
    {
      id: 'shattered-veil-main-quest',
      map: 'shatteredveil',
      mapName: 'Shattered Veil',
      title: 'Shattered Veil Main Quest',
      difficulty: 'Very Hard',
      duration: '90-120 min',
      party: 'Solo or squad',
      summary: 'Open the mansion, secure the Ray Gun Mark II, build the W, R, and P variants, clear the three liminal painting trials, return the Sentinel Artifact to S.A.M., and defeat the Z-Rex.',
      heroImage: shatteredVeilShot('SV1.png', 'Shattered Veil manor approach'),
      requirements: [
        'Power + Pack-a-Punch',
        'Ray Gun Mark II',
        'Three Empty Canisters',
        'Ray Gun Mark II-W',
        'Ray Gun Mark II-R',
        'Ray Gun Mark II-P',
        'Aether Shroud recommended',
        'Boss-ready loadout',
      ],
      rewards: [
        'PhDeadly Carver operator skin',
        'Shattered Veil calling card',
        '5,000 XP',
        'Main quest completion',
      ],
      steps: [
        {
          n: 1,
          title: 'Open Pack-a-Punch',
          body: 'The first part is guided, but doing it cleanly matters because every later quest route uses the elevator, Mainframe Chamber, and mansion shortcuts.',
          bullets: [
            'Open the route into the Library and kill the maintenance worker zombie that carries the Fuse.',
            'Move toward the elevator objective to trigger the Circuit Board task.',
            'Go to the Director\'s Quarters and break Richtofen\'s computer to recover the Circuit Board.',
            'Return to the Banquet Hall elevator and repair it from the back side with the Fuse and Circuit Board.',
            'Call the elevator from the front and clear the zombies that spill out.',
            'Rappel down the elevator shaft, meet S.A.M. in the Mainframe Chamber, and use the stairs route to reach Pack-a-Punch.',
          ],
          images: [
            shatteredVeilShot('SV1.png', 'Shattered Veil opening route', { height: 300 }),
          ],
        },
        {
          n: 2,
          title: 'Claim the Ray Gun Mark II',
          body: 'You can pull the base Ray Gun Mark II from the Mystery Box, but the guaranteed path uses the Lab Technician, a fax-machine code, and the Armory scanner.',
          bullets: [
            'Starting around Round 10, look for a purple-eyed Lab Technician in the Mainframe Chamber or nearby Service Tunnel route.',
            'Kill the Lab Technician and take the Floppy Disk.',
            'Use the Floppy Disk on the fax machine in the East Foyer and defend the area while it prints.',
            'Read the printed note and write down the four-letter word for your match.',
            'Go to the Nursery chalkboard and convert each letter into a digit by counting the size of the letter group it belongs to.',
            'Enter the four-digit code on the glass door keypad in the Service Tunnel.',
            'Kill the Doppelghast inside and pick up the Severed Arm.',
            'Take the arm to the Armory scanner and use the handprint to open the Ray Gun Mark II case.',
          ],
          images: [
            shatteredVeilShot('SV2.png', 'Ray Gun Mark II route reference', { height: 300 }),
          ],
        },
        {
          n: 3,
          title: 'Collect Three Empty Canisters',
          body: 'Each Mark II variant needs an Empty Canister. Gather three before committing to the variant devices.',
          bullets: [
            'Rear Patio canister: craft or find an LT-53 Kazimir, then throw it outside the zombie window below Double Tap to pull the canister out.',
            'Mainframe canister: note whether the cryo chamber shows A or B.',
            'Service Tunnel valves: throw one Combat Axe at the center orange valve, then another at the A or B valve matching the Mainframe letter.',
            'Return to the Mainframe Chamber, blow open the gassed cryo tube with an explosive, and collect the canister.',
            'Crystal canister: shoot the large blue crystals that can appear high in Conservatory, East Foyer, Service Tunnel, or South West Balcony until one drops the canister.',
            'Do not place a canister into a variant device until you are ready for that specific variant path.',
          ],
        },
        {
          n: 4,
          title: 'Craft the Ray Gun Mark II-W',
          body: 'The W variant starts outside at Shem\'s Henge and uses Abomination attacks to charge the stone formation.',
          bullets: [
            'Take one Empty Canister to the device near Speed Cola at Shem\'s Henge.',
            'Place the canister to spawn an Abomination in the rock circle.',
            'Keep the Abomination alive and bait its eye beam into the three smaller stones until each glows blue.',
            'Bait the Abomination charge attack through each glowing stone so the stones lift into the air.',
            'Survive the lockdown and protect the central portal until the event completes.',
            'Pick up the charged canister and take it to the Ray Gun workbench across from the Armory in the Service Tunnel.',
            'Craft the Ray Gun Mark II-W.',
          ],
          images: [
            shatteredVeilShot('SV3.png', 'Shattered Veil exterior ritual area', { height: 300 }),
          ],
        },
        {
          n: 5,
          title: 'Clear the Distillery Trial',
          body: 'The first painting route uses the Mark II-W and ends with a shielded Elite in the Liminal Distillery.',
          bullets: [
            'Find the loose sconce and place it beside the matching lamp near Juggernog in the Grand Foyer.',
            'Interact with the lamps and repeat the light sequence until the hidden Distillery room opens.',
            'With the Ray Gun Mark II-W equipped, interact with the machine beside the Distillery painting and charge the portal by killing zombies.',
            'Enter the Liminal Distillery and collect the requested pieces: bell, flask, and bar-related item route.',
            'For the flask step, use Brain Rot on a zombie where needed so it can help open the blocked pickup.',
            'Return the completed item set to the Liminal Distillery objective.',
            'Place the Sentinel Artifact on the pedestal and survive the lockdown.',
            'Use the Ray Gun Mark II-W to break the Elite\'s blue shield, then finish the Elite and reclaim the Artifact.',
          ],
        },
        {
          n: 6,
          title: 'Craft the Ray Gun Mark II-R',
          body: 'The R variant grows from the outdoor plant route and the Conservatory planters.',
          bullets: [
            'Destroy four orb-shaped plants around the outdoor map areas with the Ray Gun Mark II or explosives.',
            'Check Garden Pond, Conservatory, Motor Court, Rear Patio, South West Balcony, West Balcony, and the Double Tap side of the mansion.',
            'Take the four Plant Seeds and an Empty Canister to the Conservatory.',
            'Place the canister in the Conservatory device.',
            'Plant one seed in a planter and defend it from the purple-eyed zombies until it matures.',
            'Repeat until all four plants are grown. Planting one at a time is safer for solo runs.',
            'Collect the Toxic Canister and use the Garden Pond workbench to craft the Ray Gun Mark II-R.',
          ],
          images: [
            shatteredVeilShot('SV4.png', 'Conservatory and garden route reference', { height: 300 }),
          ],
        },
        {
          n: 7,
          title: 'Clear the Library Trial',
          body: 'The Library route uses the Mark II-R and Aether Shroud to find Colton\'s requested records.',
          bullets: [
            'With the Ray Gun Mark II-R equipped, charge the Library painting portal by killing zombies near its machine.',
            'Enter the Liminal Library and listen to Colton\'s requested items.',
            'Use Aether Shroud to safely search for the spectral records, including the Audio Log, Ledger, and Nuclear Plant ID Badge.',
            'Return the items to the Liminal Library objective.',
            'Back in the real Library, follow the new book or shelf interactions until the hidden report route opens.',
            'Take the recovered inspection report back through the Library portal.',
            'Place the Sentinel Artifact, survive the lockdown, and use the Ray Gun Mark II-R to strip the Amalgam shield.',
            'Kill the Amalgam and take the Sentinel Artifact back.',
          ],
        },
        {
          n: 8,
          title: 'Craft the Ray Gun Mark II-P',
          body: 'The P variant uses light routing, Refractors, and an Essence Bomb to open the hidden Service Tunnel chamber.',
          bullets: [
            'Find the two Refractors in the Conservatory fountain and the South West Balcony fountain.',
            'Break white Project Janus crates around the map until an Essence Bomb drops.',
            'Place the Essence Bomb on the cracked wall past the Level 3 Armor wall buy in the Service Tunnel.',
            'Enter the newly opened room and place an Empty Canister in the device.',
            'Use the Refractors to route the blue beam toward one of the three Doppelghast statues.',
            'Trigger the crystal pulse to destroy the targeted statue, then kill the Doppelghast that spawns.',
            'Repeat the beam route for all three statues.',
            'Collect the Light Canister and craft the Ray Gun Mark II-P at the Director\'s Quarters workbench.',
          ],
        },
        {
          n: 9,
          title: 'Clear the Banquet Hall Trial',
          body: 'The Banquet Hall route uses the Mark II-P and ends with the last shielded Elite before the boss.',
          bullets: [
            'With the Ray Gun Mark II-P equipped, charge the Banquet Hall painting portal.',
            'Enter the Liminal Banquet Hall and collect the ritual item that starts the goblet route.',
            'Search the marked mansion spaces for the required goblets and defeat the Elder Disciples tied to them.',
            'Use the elevator shaft wall numbers to build the six-digit safe code.',
            'Open the blue safe in the West Hallways and take the Antler Carving.',
            'Return to the Liminal Banquet Hall and place the Sentinel Artifact.',
            'Use the Ray Gun Mark II-P to break the final Elite shield during the lockdown.',
            'Finish the fight and recover the Sentinel Artifact one last time.',
          ],
          images: [
            shatteredVeilShot('SV5.png', 'Banquet Hall trial reference', { height: 300 }),
          ],
        },
        {
          n: 10,
          title: 'Prepare for the Z-Rex',
          body: 'Once all three painting trials are complete, the next S.A.M. handoff starts the finale. Treat the handoff as a point of no return.',
          bullets: [
            'Pack-a-Punch the Ray Gun Mark II variant you are taking into the fight. The W variant is a strong general pick.',
            'Bring a second high-rarity weapon for zombie control and emergency damage.',
            'Buy Tier III armor and as many core perks as possible, especially Juggernog, Stamin-Up, Quick Revive, Speed Cola, Double Tap, and Deadshot Daiquiri.',
            'A Chopper Gunner is useful for burning a dangerous phase, especially late in the fight.',
            'Kazimirs, Monkey Bombs, Decoys, or Stim Shots can save revives and reload windows.',
            'When ready, return to S.A.M. in the Mainframe Chamber and hand over the Sentinel Artifact.',
          ],
        },
        {
          n: 11,
          title: 'Defeat the Z-Rex',
          body: 'The Z-Rex fight has four phases. Stay mobile, clear the arena, and shoot the weak spots whenever the boss exposes them.',
          bullets: [
            'Shoot the eyes whenever you have a clean angle.',
            'When the Z-Rex eats a Toxic Zombie, watch for the glowing patch that appears on its ribs or side and focus it immediately.',
            'Avoid acid pools because they damage and slow you, which can trap you during a tail swing or charge.',
            'When the boss jumps away and becomes immune, thin the zombie horde, re-plate, and reload.',
            'Later phases add heavier movement pressure, dive attacks, and faster charges.',
            'Use Scorestreaks or field upgrades when the boss is vulnerable, not while it is immune or moving out of the arena.',
            'After the final phase, the ending sequence plays and Shattered Veil main quest completion is awarded.',
          ],
          images: [
            shatteredVeilShot('SV7.png', 'Shattered Veil finale reference', { height: 300 }),
          ],
        },
      ],
    },
    {
      id: 'reckoning-main-quest',
      map: 'reckoning',
      mapName: 'The Reckoning',
      title: 'The Reckoning Main Quest',
      difficulty: 'Very Hard',
      duration: '90-120 min',
      party: 'Solo or squad',
      summary: 'Break into Janus Towers, restore the accelerator, secure the DNA route into Teleportation Lab, build the Gorgofex, wake Franken-Klaus, power the portal, and choose the final S.A.M. or Richtofen path.',
      heroImage: reckoningShot('Reckoning_Gorgofex.png', 'Gorgofex in The Reckoning', { objectFit: 'contain' }),
      requirements: [
        'Power + Pack-a-Punch',
        'Gorgofex Wonder Weapon',
        'Melee Macchiato',
        'Explosive lethal',
        'Two Klaus arms from special rounds',
        'Boss-ready loadout',
      ],
      rewards: [
        "Blood, Sweat, an' Gears Grey operator skin",
        'Ending-specific calling card',
        'Weapon charm',
        'XP and main quest completion',
      ],
      steps: [
        {
          n: 1,
          title: 'Open Pack-a-Punch',
          body: 'Use the guided opener to bring Janus Towers online before starting the hidden quest work. This gives you the movement routes, the accelerator room, and the Pack-a-Punch machine.',
          bullets: [
            'Move through Project Janus HQ and buy enough doors to keep the later route between Tower 1, Tower 2, and Sublevel 10 fast.',
            'Follow the objective path through the Executive Office and down to Sublevel 10.',
            'Restore the Particle Accelerator system.',
            'Destroy the nearby Aetherium crystal growths until Pack-a-Punch appears.',
            'During early Kommando Klaus rounds, shoot or kill enough robots to collect two Klaus arms for the later Franken-Klaus step.',
          ],
          images: [
            reckoningShot('Reckoning1.png', 'Janus Towers opening route', { height: 300 }),
          ],
        },
        {
          n: 2,
          title: 'Secure the DNA Route',
          body: 'The Teleportation Lab route starts in Mutant Research and ends with the Fowler Mutant Injection opening the Tower 2 scanner door.',
          bullets: [
            'In T1 Mutant Research, kill the Geneticist zombie and take the Keycard.',
            'Use the Keycard on the locked cabinet near the Richtofen family tanks and take the DNA Vial.',
            'Pick up the Syringe from the small table near the Mangler tank in Mutant Research.',
            'Ride the Particle Accelerator beam in Sublevel 10 and collide with the suspended corpse to knock it down.',
            'Use the Syringe on the fallen body to collect Dr. Fowler blood, then return the Syringe to the Mutant Research machine.',
            'Defeat the HVT Mangler that spawns and take the Fowler Mutant Injection.',
            'Use the Injection at the scanner door in T2 Dark Entity Containment to open the Teleportation Lab route.',
          ],
        },
        {
          n: 3,
          title: 'Build the Gorgofex',
          body: 'The Gorgofex can appear from the box, but the quest path gives a reliable build route through Mutant Research, Bioweapons Lab, Quantum Computing, and Dark Entity Containment.',
          bullets: [
            'In T1 Mutant Research, watch the static monitors near the family tanks and Deadshot Daiquiri. Note the first letter shown on each monitor.',
            'Match the one-letter or two-letter clue to an element on the nearby periodic table.',
            'Use that element number as the keypad code for T1 Bioweapons Lab. Add leading zeroes if the code is shorter than three digits.',
            'Inside Bioweapons Lab, feed the Cyst three Vermin first, then three regular zombies. Pick up the Cyst after the container opens.',
            'Take the Cyst to the three glowing Aetheric Flora spots around T1 Quantum Computing and drain each one.',
            'In T2 Dark Entity Containment, start the Power Surge terminal route and hit the active terminals before the window expires.',
            'When Uber Klaus appears, break its shoulder generators and lure it onto the charged panel in front of The Forsaken.',
            'Defeat the possessed Uber Klaus form, then interact with the released essence to create the Gorgofex.',
          ],
          images: [
            reckoningShot('Reckoning_Gorgofex.png', 'Gorgofex Wonder Weapon', { objectFit: 'contain', height: 300, showOverlay: false }),
          ],
        },
        {
          n: 4,
          title: 'Assemble Franken-Klaus',
          body: 'Build the hanging Klaus body in Android Assembly, then force an Uber Klaus electric attack to wake it.',
          bullets: [
            'Bring the two Klaus arms from special rounds to T2 Android Assembly.',
            'Find the left and right Klaus legs in Android Assembly. Check shelves, scrap piles, behind panels or doors, and the floor around the work area.',
            'Attach all four limbs to the hanging Klaus body.',
            'Bait Uber Klaus into firing its electric attack at the assembled body.',
            'After Franken-Klaus activates, let him work at the Android Assembly terminal.',
            'Advance a round when needed, then follow him to the S.A.M. Trial area in T2 Dark Entity Containment.',
            'Complete the kill trial so Franken-Klaus can move to the T2 Teleportation Lab terminal.',
          ],
          images: [
            reckoningShot('Reckoning_UberKlaus.png', 'Uber Klaus reference', { height: 300 }),
          ],
        },
        {
          n: 5,
          title: 'Give Klaus the Code',
          body: 'Franken-Klaus needs a four-digit access code built from Maxis file folders scattered through the offices and Teleportation Lab.',
          bullets: [
            'Search T1 Executive Suite, T1 Director\'s Office, and T2 Teleportation Lab for four folders tied to Maxis personal items.',
            'Possible files include the BND Badge, Notso\'s Collar, Scarf, Wristwatch, Combat Goggles, and Katana.',
            'Each folder gives a date and a digit. Write both down.',
            'Order the digits from the oldest folder date to the newest folder date.',
            'Enter the resulting four-digit code into the T2 Teleportation Lab computer that Franken-Klaus is working on.',
          ],
        },
        {
          n: 6,
          title: 'Move the Project Janus Brain',
          body: 'Use Melee Macchiato to break open the correct Janus container, then carry the brain to the Teleportation Lab.',
          bullets: [
            'Buy Melee Macchiato before leaving the Teleportation Lab route.',
            'Go to T1 Quantum Computing Core and find the Project Janus container that can be broken by a Melee Macchiato punch.',
            'Punch the container open and pick up the purple brain.',
            'While carrying the brain, treat yourself as vulnerable and take the safest route back.',
            'Place the brain into the red-lit containment unit beside Franken-Klaus in T2 Teleportation Lab.',
          ],
        },
        {
          n: 7,
          title: 'Break the Portal Crystals',
          body: 'Charge the Gorgofex with Quantum Vermin energy, then spend that charge on the blocked portal in Teleportation Lab.',
          bullets: [
            'Go to T2 Sublevel 10 and activate the red-button terminal to start the Quantum Vermin event.',
            'Kill the blue Quantum Vermin with the Gorgofex until the control-room canister produces a blue orb.',
            'Interact with the orb so the charge attaches to the Gorgofex.',
            'Do not fire the Gorgofex on the way back. If the charge is wasted, repeat the Vermin event.',
            'Return to T2 Teleportation Lab and fire a charged Gorgofex shot into the crystals blocking the portal.',
          ],
        },
        {
          n: 8,
          title: 'Cleanse the Fungal Head',
          body: 'The portal still needs a charged organic anchor. Set up the water bucket, knock down the Fungal Head, clean it, and feed it souls.',
          bullets: [
            'Find a yellow mop bucket in T1 Project Janus Reception or T2 Android Assembly and melee it under a sprinkler.',
            'If the sprinkler is inactive, use an explosive lethal on the nearby smoke detector to start the water.',
            'In T1 Quantum Computing Core, look for the high square opening in the wall and fire a charged Gorgofex shot into it.',
            'Pick up the Fungal Head that drops.',
            'Place the Fungal Head into the bucket, wait for it to clean, then pick it back up.',
            'Kill zombies while carrying the head until it stops absorbing souls. Watch for the shadowy attacker that harasses the carrier.',
            'Take the charged head to T2 Teleportation Lab and place it in the center of the portal frame.',
          ],
        },
        {
          n: 9,
          title: 'Power the Portal',
          body: 'After the Fungal Head is placed, blue Project Janus canisters open and purple anomalies begin floating around the map.',
          bullets: [
            'Open a blue Project Janus canister and take the Vacuum-Seal Device inside.',
            'Find the nearby floating purple object and throw the device at it from a little distance.',
            'Pick the filled device back up after it captures the object.',
            'Repeat until four Vacuum-Seal Devices are filled.',
            'Insert all four filled devices into the portal console in T2 Teleportation Lab.',
            'During lockdown, turn each red switch green while managing the zombie pressure. The number of switches can scale with squad size.',
            'When the lockdown ends, the portal becomes the boss-fight entry point.',
          ],
        },
        {
          n: 10,
          title: 'Prepare Before Entering',
          body: 'The portal is a point of no return. Do not enter until the whole team is set up for the chosen finale.',
          bullets: [
            'Aim for Legendary rarity, Pack-a-Punch III, Tier III armor, Self-Revive, and full ammo.',
            'Keep the Gorgofex for quest utility, but bring a reliable boss-damage weapon as your main damage source.',
            'For the S.A.M. fight, high burst damage and cover discipline matter more than range.',
            'For the Richtofen fight, ranged precision weapons, Smoke Grenades, and Aether Shroud are much safer.',
            'Useful perks include Juggernog, Quick Revive, Stamin-Up, Deadshot Daiquiri, Speed Cola, and Vulture Aid.',
            'Combat Stims, Death Machine, Decoys, or Smokes can rescue a bad phase.',
          ],
        },
        {
          n: 11,
          title: 'Choose the Finale Path',
          body: 'Enter the portal, interact with the Sentinel Artifact, and commit to one of the two ending paths. Read the prompt carefully, since the choice determines the boss route and ending card for that run.',
          bullets: [
            'After the choice, ride the elevator sequence into the Dark Aether arena route.',
            'Charge the three L.T.G. Canisters by killing zombies close to each canister.',
            'Ride to the next level and destroy the Aether crystals blocking the ascent.',
            'Use the transition time to reload, re-plate, and call out ammo or revive problems before the roof.',
            'The next arena starts the selected boss fight.',
          ],
        },
        {
          n: 12,
          title: 'Defeat S.A.M. or Uber Richtofen',
          body: 'Both finales reward completion, but they play very differently. S.A.M. is more pattern-based; Uber Richtofen is faster, messier, and less forgiving.',
          bullets: [
            'S.A.M. path: stay near cover, clear zombies between attacks, and wait for weak points to expose after major beam or volley patterns.',
            'S.A.M. path: between phases, complete the trial objective if possible. Ignoring it can add harmful modifiers to the fight.',
            'S.A.M. path: shoot the outer glowing weak points first, then pour damage into the central eye when it becomes vulnerable.',
            'Richtofen path: in the mech phase, break shoulder armor and then damage the exposed core or cockpit area.',
            'Richtofen path: clear Klaus adds before the arena becomes covered in electric hazards.',
            'Richtofen path: in the jetpack phase, use cover against the Wunderwaffe, avoid bomb markers, and save Smoke Grenades or Aether Shroud for damage windows.',
            'After the selected boss falls, the ending sequence plays and the run awards Reckoning main quest completion.',
          ],
          images: [
            reckoningShot('Reckoning6.png', 'The Reckoning finale route', { height: 300 }),
          ],
        },
      ],
    },
  ];

  const bo7EasterEggs = [
    {
      id: 'ashes-main-quest',
      map: 'ashes',
      mapName: 'Ashes of the Damned',
      title: 'Ashes of the Damned Main Quest',
      difficulty: 'Very Hard',
      duration: '100-130 min',
      party: 'Solo or squad',
      summary: 'Repair Ol\' Tessie, install Pack-a-Punch, build the Necrofluid Gauntlet, brew the serum, unlock the Ashwood prism, clear the four area puzzles, collect the final wisps, and defeat Veytharion.',
      requirements: ['Ol\' Tessie active', 'Pack-a-Punch installed', 'Abomination Beam installed', 'Necrofluid Gauntlet built'],
      rewardLabel: 'Ashes of the Damned calling card',
      rewardGif: 'AotD.gif',
      rewards: ['Ashes of the Damned calling card', 'Main quest completion', 'Cursed relic access after completion'],
      imagePlaceholders: true,
      steps: [
        {
          n: 1,
          title: 'Repair Ol\' Tessie and Install Pack-a-Punch',
          body: 'Start the run by bringing Ol\' Tessie online, restoring the first power pumps, and installing Pack-a-Punch on the truck so the full map opens up.',
          bullets: [
            'At Janus Towers Plaza, enter the Server Room and melee the round floor grate to reveal T.E.D.D.\'s head.',
            'Carry T.E.D.D.\'s head outside and install it on the old pickup truck to activate Ol\' Tessie.',
            'Drive through the wooden road barricades and watch the truck health. Red pods damage the truck, green pods repair it, and special zombies can latch onto the sides.',
            'At Blackwater Lake, clear the orange pods from the Power Pump outside the cabin, destroy the final pod on top, and restore power there.',
            'Inside the Blackwater cabin, pick up the Jar of Spores from the kitchen counter near the sink. Keep it for the Widow\'s Lantern step.',
            'Drive to Ashwood, take the zipline up, buy through the doors, and clear the orange pods from the Power Pump on the wooden bridge.',
            'Flip the nearby Ashwood power switch after the pump is clear.',
            'Drop back to ground level, park Ol\' Tessie in the Ashwood garage, pick up the Pack-a-Punch machine from the workbench, and install it on the truck.',
          ],
        },
        {
          n: 2,
          title: 'Collect the Farm Serum Parts',
          body: 'Use Vandorn Farm to set up the Widow\'s Lantern, Human Bones, and Ravager Eyes before the later serum ritual asks for them.',
          bullets: [
            'Restore power at Vandorn Farm if you have not already done it.',
            'On the road just before the farm property, find the horse carcass glowing red.',
            'Use the Jar of Spores on the horse. Return after three rounds and pick up the Widow\'s Lantern.',
            'In the barn, look at the hanging bodies and find the one in the middle that is dripping blood from its leg.',
            'Throw a Combat Axe at the bleeding leg to sever the foot, then throw a Molotov at the fallen foot and collect the Human Bones.',
            'Combat Axes can be found in Reba\'s Diner or the Blackwater cabin.',
            'On a Ravager round, activate a Farm saw trap and lure a Ravager into the blades. Pick up the Ravager Eyes after the trap kills it.',
            'Ravagers appear on special rounds, roughly every five rounds, so save this step for a round where one is already active.',
          ],
        },
        {
          n: 3,
          title: 'Take the Abomination Carcass',
          body: 'Use Reba\'s Diner at Exit 115 to obtain the Freezer Key and claim the Abomination Carcass for Tessie\'s beam upgrade.',
          bullets: [
            'Drive Ol\' Tessie to Exit 115 and enter Reba\'s Diner.',
            'Kill zombies inside the diner until a named Cook zombie appears and drops the Freezer Key.',
            'Stay inside the diner for these kills; leaving the diner can waste progress toward the Cook spawn.',
            'Use the Freezer Key on the freezer in the southwest kitchen corner near the back door.',
            'Pick up the Abomination Carcass from the freezer.',
            'Grab the Combat Axe from the nearby room if you still need one for the Human Bones step.',
          ],
        },
        {
          n: 4,
          title: 'Install the Abomination Beam',
          body: 'Upgrade Ol\' Tessie in the Ashwood garage, then use the beam on road-side purple pods to collect Hoard Husk Chunks.',
          bullets: [
            'Return to Tessie\'s garage in Ashwood with the Abomination Carcass.',
            'Install the carcass upgrade at the garage station to unlock Ol\' Tessie\'s Abomination Beam.',
            'Drive any road between the main points of interest and look for large glowing purple pods along the side of the road or in Fog lanes.',
            'Destroy a purple pod with the Abomination Beam.',
            'Pick up the Hoard Husk Chunks that drop from the destroyed pod. These are one of the six serum ingredients.',
          ],
        },
        {
          n: 5,
          title: 'Free Klaus',
          body: 'Defeat Uber Klaus for his chip, then wake Klaus in Ashwood so he can power the Cosmodrome controls.',
          bullets: [
            'After you have at least Pack-a-Punch level I, return to spawn near the Project Janus container by the Blackwater gate.',
            'Kill Uber Klaus and pick up the Stabilizer Chip he drops.',
            'Drive to Ashwood, use the zipline, and enter the jail in the northeast corner of Market Square.',
            'Install the Stabilizer Chip on the keypad by Klaus\' cell door.',
            'Throw Stun Grenades so Klaus is hit by the blast. Bring at least three Stuns to avoid a missed throw; two direct hits can be enough if both connect.',
            'When Klaus wakes up, he follows the player who stunned him.',
            'Use your Tactical equipment input to point Klaus at objectives during later steps.',
          ],
        },
        {
          n: 6,
          title: 'Scan and Fill the Aether Barrel',
          body: 'Use Klaus in the Zarya Cosmodrome support room, then charge the Aether Barrel at Blackwater Lake, Ashwood, and Vandorn Farm before the energy decays.',
          bullets: [
            'Take Klaus to Zarya Cosmodrome and go underground to the Support Systems room.',
            'Direct Klaus to the western wall control panel so he shocks it on.',
            'Interact with the control panel yourself after Klaus powers it.',
            'Stand inside the red scan circle and look up toward the security camera until the scan completes.',
            'Pick up the Aether Barrel from the room.',
            'Insert the Aether Barrel into the Blackwater Lake Power Pump and defend it until the charge completes.',
            'Move the barrel to the Ashwood Power Pump and defend it again.',
            'Move the barrel to the Vandorn Farm Power Pump and finish the third defense.',
            'Move quickly between pumps. If the barrel energy decays before all three charges are complete, restart the pump sequence.',
          ],
        },
        {
          n: 7,
          title: 'Solve the Barn Cube',
          body: 'Use the jump pad to read the rooftop symbols at Vandorn Farm, then match those symbols on the barn-cellar cube.',
          bullets: [
            'After the three Power Pump defenses, take the filled Aether Barrel to the cellar under the Vandorn Farm barn.',
            'Insert the barrel into the strange cube in the middle of the cellar.',
            'Use the jump pad that launches you from Vandorn Farm toward Janus Towers Plaza.',
            'While airborne, look down at the farm rooftops and write down the three glowing red symbols.',
            'Return to the barn-cellar cube.',
            'Cycle the symbols inside the green circles on the cube until they match the three rooftop symbols.',
            'Interact with the front of the cube after the symbols are set correctly.',
          ],
        },
        {
          n: 8,
          title: 'Claim the Necrofluid Gauntlet',
          body: 'Take the Necrofluid Gauntlet from the opened cube and use its fire-and-recall behavior to clear the six cysts.',
          bullets: [
            'Pick up the Necrofluid Gauntlet after the cube opens.',
            'Find the six cysts tied to the newly opened weapon route.',
            'Shoot each cyst with the gauntlet\'s primary fire.',
            'Recall each shot with alternate fire after it hits. Reload may also recall the shot.',
            'Repeat the primary-fire and recall sequence on all six cysts to finish the wonder weapon step.',
          ],
        },
        {
          n: 9,
          title: 'Collect the Final Serum Ingredients',
          body: 'Use Wisp Tea and the Necrofluid Gauntlet for the powder, then kill a Zursa with Tessie\'s beam for the limb.',
          bullets: [
            'Buy Wisp Tea at Zarya Cosmodrome if you do not already have it.',
            'Go to the Tailor Shop in Ashwood, east of the Power Pump.',
            'Stand near the mirror and let Wisp Tea activate around it.',
            'Shoot the mirror with the Necrofluid Gauntlet and pick up the Powder of the Forgotten.',
            'Reach round 16 so Zursa enemies can spawn.',
            'Kill a Zursa with Ol\' Tessie\'s Abomination Beam as the final damage source.',
            'Pick up the Mysterious Limb from the Zursa kill.',
            'Before moving on, confirm you have all six serum ingredients: Powder of the Forgotten, Widow\'s Lantern, Human Bones, Ravager Eyes, Hoard Husk Chunks, and Mysterious Limb.',
          ],
        },
        {
          n: 10,
          title: 'Brew the Serum in Yuri\'s Lab',
          body: 'Use the Cosmodrome lab cipher to choose the correct three ingredients, add blood to the flask, and survive the lockdown.',
          bullets: [
            'Drive to Zarya Cosmodrome and enter Yuri\'s Lab in the southwest part of the area.',
            'Go to the back-corner table where the six serum ingredients are laid out.',
            'Interact with the Powder of the Forgotten on the table to reveal the cipher on the chalkboard.',
            'Read the three ingredient symbols from top to bottom and interact with those three ingredients in that same top-to-bottom order.',
            'Use these ingredient names when matching the symbols: Powder of the Forgotten, Widow\'s Lantern, Human Bones, Ravager Eyes, Hoard Husk Chunks, and Mysterious Limb.',
            'When the ingredients are correct, interact with the flask to add blood.',
            'The player who adds blood is reduced to 75 maximum HP for the rest of the session.',
            'Survive the lab lockdown for about two minutes, then interact with the same flask area again after the ritual ends.',
          ],
        },
        {
          n: 11,
          title: 'Collect the Three Keys',
          body: 'After the serum ritual changes the map, use the Necrofluid Gauntlet to collect the Terrapin, Bruin, and Nightbird Keys and bring each one back to Rabbit Alley.',
          bullets: [
            'For each key, look for its colored glow, shoot the object with the Necrofluid Gauntlet, then recall or reload the shot so the barb breaks and the key drops.',
            'Terrapin Key, green glow: search the Grounded Ship between Ashwood and Vandorn Farm. Possible spots are a blue shipping container on the deck, the lower ship area by a lit staircase, or a zombie-spawning window on the southern side of the deck.',
            'Terrapin Key penalty: sprinting is disabled after pickup. Park Ol\' Tessie close before grabbing it.',
            'Bruin Key, yellow glow: search the Crashed Rocket road between Ashwood and Zarya Cosmodrome. Possible spots are the fallen radio tower above the road, the edge of the Cosmodrome building with the spinning radar dish, or the cliff by the Ashwood gate.',
            'Bruin Key penalty: you are forced to melee-only movement after pickup, so plan a direct route back.',
            'Nightbird Key, red glow: search the road between Ashwood and Exit 115. Possible spots are the T-Rex skull mouth on the western wall, the southern T-Rex skull on the ground, or the Project Janus trucks near Exit 115.',
            'Nightbird Key penalty: health regeneration is disabled after pickup. Get into Ol\' Tessie immediately.',
            'Deposit every key at the locked prism or pyramid structure in Rabbit Alley beside Ashwood\'s The Ruby Rabbit.',
          ],
        },
        {
          n: 12,
          title: 'Install the DG-2 Turret Barrel',
          body: 'Open the Ashwood prism with all three keys, install the DG-2 Turret Barrel on Ol\' Tessie, and use it to enable the four late-game area puzzles.',
          bullets: [
            'After the third key is deposited, the Ashwood prism opens and a mid-quest cinematic plays.',
            'Pick up the DG-2 Turret Barrel reward.',
            'Take the DG-2 Turret Barrel to the Ashwood garage and install it on Ol\' Tessie.',
            'A large clock tower now floats over Ashwood.',
            'Shoot the floating Ashwood clock tower with the DG-2 Turret so it glows purple.',
            'Shoot one of the clock faces with the Necrofluid Gauntlet and recall the shot to make the gauntlet purple.',
            'Refreshing the purple gauntlet this way is required for the Vandorn Farm, Exit 115, Zarya Cosmodrome, and Blackwater Lake puzzles.',
          ],
        },
        {
          n: 13,
          title: 'Solve the Vandorn Farm Clock',
          body: 'Use the purple gauntlet at the Farmhouse dinner table, then collect and defend the family artifacts.',
          bullets: [
            'Turn the Necrofluid Gauntlet purple at the Ashwood clock tower, then go to Vandorn Farm.',
            'Enter the Farmhouse and read the clock on the wall above the TV.',
            'Look at the Roman numerals etched into the floor around the dinner table.',
            'Stand on the Roman numeral that matches the hour shown by the wall clock.',
            'Wait for the father corpse at the head of the table to look at you.',
            'Shoot him with the purple Necrofluid Gauntlet when his eyes glow red.',
            'Collect the four Farm artifacts: the Teddy Bear from the second-floor bunk beds, the face mask from the upper barn corner, the chalice by the cellar bathtub, and the Pigsticker from the garage workbench.',
            'Place the four artifacts in the red circles that appear outside and defend them from zombies until the challenge completes.',
          ],
        },
        {
          n: 14,
          title: 'Solve the Exit 115 Lightning Puzzle',
          body: 'On an even-numbered round, use the purple gauntlet to freeze the Exit 115 clock event, summon the three special zombies, and lead each one to its matching lightning strike.',
          bullets: [
            'Refresh the purple gauntlet at the Ashwood clock tower, then go to Exit 115 on an even-numbered round.',
            'Shoot the clock above the Diner or Service Station area with the purple gauntlet to freeze the lightning window.',
            'Trucker zombie, red: use Ol\' Tessie\'s Abomination Beam on the back of the red shipping container near the Diner, then ram the zombie loose.',
            'Waitress zombie, purple: gun-butt melee the Diner cash register.',
            'Mechanic zombie, yellow: summon Klaus in the Workshop and direct him to the dead zombie on the ground beside the lifted car.',
            'Lead the red Trucker zombie to the red lightning strike on top of the gas station.',
            'Lead the purple Waitress zombie to the purple lightning strike on top of the Diner.',
            'Lead the yellow Mechanic zombie to the yellow lightning strike on top of the service station.',
            'You can split the zombies among co-op players. Solo players should move one zombie at a time and repeat the freeze window if needed.',
          ],
        },
        {
          n: 15,
          title: 'Solve the Zarya Cosmodrome Rocket Puzzle',
          body: 'Use the purple gauntlet on both rotating satellites, read the control-room word, enter its A=0 number code, and launch the rocket.',
          bullets: [
            'Refresh the purple gauntlet at the Ashwood clock tower, then drive to Zarya Cosmodrome.',
            'Find the two rotating satellites in the Cosmodrome area.',
            'Shoot both satellites with the purple Necrofluid Gauntlet. Refresh purple mode at Ashwood between satellites if it expires.',
            'Enter the Cosmodrome control room and look at the right-side computers for the six-letter code word.',
            'Use A=0, B=1, C=2, and so on to convert the word into numbers.',
            'Known code words: Rocket = 17-14-02-10-04-19, Engine = 04-13-06-08-13-04, Launch = 11-00-20-13-02-07, Weapon = 22-04-00-15-14-13.',
            'Use the top TV screens to identify which word is active.',
            'Shoot the red button on each monitor to lock in the correct number for that position.',
            'Interact with the middle control-room button to launch the rocket.',
          ],
        },
        {
          n: 16,
          title: 'Solve the Blackwater Projector',
          body: 'Use the dock wisp and cabin projector to reveal the random film-reel order, then shoot the four reels in that exact order.',
          bullets: [
            'Refresh the purple gauntlet at the Ashwood clock tower, then drive to Blackwater Lake.',
            'Interact with the blue soul or wisp on the dock.',
            'Go into the cabin screening room and shoot the projector with the purple Necrofluid Gauntlet.',
            'The projector shows four reel locations in a random order. Memorize the order before leaving the room.',
            'Front/cabin-front reel: on a second-floor shelf near the power switch.',
            'Back/cabin-rear reel: underneath the rear porch stairs.',
            'Tool shed/left reel: on a shelf in the small side room or hut.',
            'Boat house/right reel: in the rafters above you in the boat house area.',
            'Shoot the four film reels with the Necrofluid Gauntlet in the exact order shown by the projector.',
            'If you shoot the wrong reel order, the game gives a jump-scare failure and you must re-read the projector order.',
          ],
        },
        {
          n: 17,
          title: 'Send Klaus to the Dock',
          body: 'After the reels are correct, use the upstairs bedroom wisp and Klaus to move the final item to the dock.',
          bullets: [
            'Go to the second-floor bedroom in the Blackwater cabin.',
            'Interact with the wisp at the foot of the bed where Speed Cola is located.',
            'Call Klaus to the box beside the bed.',
            'Wait while Klaus takes the item from the box and walks down toward the dock.',
            'Talk to Klaus at the pier when you are ready to begin the final sequence.',
            'Accept the vote to continue the main Easter egg.',
          ],
        },
        {
          n: 18,
          title: 'Collect the Final Road Wisps',
          body: 'Drive Ol\' Tessie through the timed wisp route, collecting three wisps on each road segment until the boss teleport triggers.',
          bullets: [
            'Board Ol\' Tessie after accepting Klaus\' final vote.',
            'Wait a few seconds before driving into Monolith Forest so the wisp route starts cleanly.',
            'Collect three gray wisps in Monolith Forest.',
            'Collect three more wisps on the Janus Towers Plaza to Collapsed Tower road segment.',
            'Collect three more wisps on the Vandorn Farm to Grounded Ship road segment, including the path over the top of Grounded Ship.',
            'Collect the final three wisps through the Garage, Ashwood, and Lost Cabins route back toward Blackwater.',
            'The route is timed. If the timer expires, wait until the next round and restart from Klaus.',
            'Collecting the final wisp instantly teleports the team into the Veytharion arena.',
          ],
        },
        {
          n: 19,
          title: 'Fight Veytharion Phase 1',
          body: 'Use Ol\' Tessie for movement and damage, collect arena boost, ram Veytharion, and shoot exposed weak points.',
          bullets: [
            'Stay mobile in Ol\' Tessie. The arena is built around driving, ramming, and turret pressure.',
            'Collect boost pickups around the arena.',
            'Ram the center of the arena or Veytharion when the opening appears.',
            'Use Ol\' Tessie\'s laser fire and the DG-2 Turret to damage the boss.',
            'When rams expose weak points, shoot the weak points with the DG-2 Turret or your carried weapon.',
            'Watch the red ground circles from Veytharion\'s explosive attacks and keep the truck out of them.',
          ],
        },
        {
          n: 20,
          title: 'Break Veytharion\'s Immunity',
          body: 'When Veytharion starts spinning and becomes immune, power Ol\' Tessie through the blue beam and ram the boss to open the next weak spot.',
          bullets: [
            'Veytharion becomes immune during the spinning phase.',
            'Shoot Veytharion with the DG-2 Turret until a blue beam of light appears.',
            'Drive Ol\' Tessie into the blue beam to charge the truck.',
            'Use the charged truck to ram Veytharion and remove the immunity.',
            'Focus the weak spot that opens underneath the boss.',
            'A Max Ammo can spawn in an arena corner after this phase, so call it out before grabbing it in co-op.',
          ],
        },
        {
          n: 21,
          title: 'Survive the Final Boss Stage',
          body: 'Cancel the purple beam attack, repair Ol\' Tessie if she is thrown, and finish Veytharion before exiting.',
          bullets: [
            'In the final stage, Veytharion adds a purple beam attack that can quickly destroy Ol\' Tessie or down players.',
            'When the beam is charging, ram the boss with Ol\' Tessie to interrupt it.',
            'Players outside the truck should hide behind pillars if the beam starts tracking them.',
            'Veytharion can grab Ol\' Tessie and throw it across the arena, forcing players out.',
            'If Ol\' Tessie is disabled, spend Salvage to repair her before continuing the vehicle phases.',
            'Decoy Grenades and other distractions are useful when the truck is disabled or a teammate needs a revive.',
            'Finish the remaining boss health with rams, DG-2 Turret damage, and exposed weak-point shots.',
          ],
        },
        {
          n: 22,
          title: 'Claim Completion and Cursed Access',
          body: 'Finish the fight, let the quest cinematic trigger, and make sure the completion unlock is banked before moving on.',
          bullets: [
            'After Veytharion reaches zero health, the Ashes of the Damned completion cinematic triggers.',
            'The main quest calling card and completion confirmation are awarded after the cinematic.',
            'Completing Ashes of the Damned once unlocks Cursed mode relic access for future runs.',
            'After the cinematic, go to the docks and interact with the relic before leaving to make sure the Cursed unlock is recorded.',
          ],
        },
      ],
    },
    {
      id: 'astra-main-quest',
      map: 'astra',
      mapName: 'Astra Malorum',
      title: 'Astra Malorum Main Quest',
      difficulty: 'Hard',
      duration: '90-120 min',
      party: 'Solo or squad',
      summary: 'Repair the Harmonic Oculus, use Oscar to earn the LGM-1, extract and route the brain, solve the planetarium, library, Mars bird, and pillar symbol steps, then defeat Caltheris.',
      requirements: ['Power restored', 'Pack-a-Punch open', 'Hacksaw collected', 'LGM-1 Wonder Weapon acquired'],
      rewardLabel: 'Astra Malorum calling card',
      rewardGif: 'AstraMalorum.gif',
      rewards: ['Astra Malorum calling card', 'Main quest completion'],
      imagePlaceholders: true,
      steps: [
        {
          n: 1,
          title: 'Repair the Harmonic Oculus and Open Pack-a-Punch',
          body: 'Reach the Observatory Dome objective, repair the Harmonic Oculus with both missing components, survive the power defense, then collect the Hacksaw from its display case.',
          bullets: [
            'Follow the early objective route to the Observatory Dome and interact with the Harmonic Oculus to learn it is missing two components.',
            'Search Luminarium and Machina Astralis for the Harmonic Components. Their exact spawn points can rotate, but they are found near dead bodies in those areas.',
            'Return both components to the Harmonic Oculus and activate the power sequence.',
            'Hold the Observatory Dome during the defense event. When the event ends, Pack-a-Punch becomes available in the dome.',
            'Open the route into Museum Infinitum, break the glass display case beside the Exfil Machine, and pick up the Hacksaw.',
            'The Hacksaw is needed later for the cryo-chamber brain extraction, so take it before leaving the museum route.',
          ],
        },
        {
          n: 2,
          title: 'Gather Oscar Trap Materials',
          body: 'Collect the four trap-material sets used to turn Oscar\'s attacks against him and earn the LGM-1 Wonder Weapon.',
          bullets: [
            'Wires: shoot a blinking lamp post anywhere on the map.',
            'Crystals: buy or roll Cryofreeze, apply it to a weapon, then shoot three Aetherium crystals.',
            'Battery: shoot Tessie with a Pack-a-Punched weapon.',
            'Drone part: kill one of Oscar\'s flying drones and pick up the part it drops.',
            'These materials are not placed at a normal craft bench. They are used when activating Oscar\'s special trap interactions.',
            'Keep one player ready to kite Oscar while the other players clear enemies; the trap interactions are much easier when the room is under control.',
          ],
        },
        {
          n: 3,
          title: 'Kill Oscar with the Rocket Ship',
          body: 'Use the rocket trap near Speed Cola as Oscar\'s first forced damage event and collect the first Shiny Trinket reward.',
          bullets: [
            'Go to the rocket ship trap in the area in front of Speed Cola.',
            'Lead Oscar behind or directly under the rocket ship before activating the trap.',
            'Use the trap while Oscar is inside the danger area so the rocket hits him instead of missing.',
            'After the trap kills him, pick up the Shiny Trinket that drops.',
            'Oscar returns after a short delay, so use that time to restock ammo, buy armor, and move to the next trap setup.',
          ],
        },
        {
          n: 4,
          title: 'Kill Oscar with the Electro-Volt Projector',
          body: 'Use the trap room near Juggernog to overcharge the battery, electrocute Oscar, and collect the second Shiny Trinket.',
          bullets: [
            'Go to the Electro-Volt projector room behind Juggernog.',
            'Lead Oscar into the room before starting the trap interaction.',
            'Hold interact on the trap lever to deposit the correct material set and begin the overcharge sequence.',
            'Stay alive while the Battery Overcharge bar fills on the left side of the screen.',
            'When the trap fires, keep Oscar inside the projector room so the electricity kills him.',
            'Pick up the second Shiny Trinket after Oscar goes down.',
          ],
        },
        {
          n: 5,
          title: 'Kill Oscar with the Sun Beam and Take the LGM-1',
          body: 'Activate the Sun-aligned telescope beam in the Pack-a-Punch room, pull Oscar through it, and pick up the LGM-1 when he dies the third time.',
          bullets: [
            'In the Pack-a-Punch room, shoot the smoking valves around the dome until the hissing sequence ends and the telescope makes a loud activation sound.',
            'If a valve stops smoking, look for the next smoking valve and shoot it quickly enough to keep the sequence going.',
            'Lead Oscar close to Pack-a-Punch before opening the telescope controls.',
            'Interact with the left side of the Pack-a-Punch organ to open Search Mode through the Harmonic Oculus.',
            'Aim the Harmonic Oculus at the Sun to trigger the sun beam.',
            'Keep Oscar in the beam path until it kills him.',
            'After this third Oscar trap kill, pick up the LGM-1 Wonder Weapon from his drop.',
            'Before leaving Search Mode, hover over Mars and write down the coordinate values in the bottom-left of the screen for the later Teleporter Room locker.',
          ],
        },
        {
          n: 6,
          title: 'Decode the Cryo Chamber Key',
          body: 'Use Oscar\'s Thurston audio log to turn three planet names into a three-digit code, then unlock the Cryo Key beside Pack-a-Punch.',
          bullets: [
            'Sneak behind Oscar and listen until his Thurston audio log plays three planet names.',
            'Convert each planet into its position from the Sun to form the code.',
            'Use this order: Mercury is 1, Venus is 2, Earth is 3, Mars is 4, Jupiter is 5, Saturn is 6, Uranus is 7, and Neptune is 8.',
            'Example: if the log says Mars, Saturn, Neptune, the code is 468.',
            'Enter the three digits into the code machine in the Pack-a-Punch room.',
            'Pick up the Cryo Key beside the dead body on the platform that opens.',
          ],
        },
        {
          n: 7,
          title: 'Extract and Perfuse the Brain',
          body: 'Use the Cryo Key and Hacksaw on the frozen body, carry the brain through its defense event, then place it in the Teleporter Room.',
          bullets: [
            'Go to the cryo capsule body inside Machina Astralis and use the Cryo Key.',
            'Interact with the body again to cut out the brain with the Hacksaw.',
            'Carry the brain to the Perfusion Device or container in front of Juggernog.',
            'Place the brain in the device and survive the lockdown until the perfusion sequence completes.',
            'Pick the brain back up after the defense ends.',
            'Carry it to the Teleporter Room, place it on the table, and hold interact again to attempt portal creation.',
            'The portal attempt fails because more data is required, which pushes you into the coordinate, book, and planetarium puzzles.',
          ],
        },
        {
          n: 8,
          title: 'Open the Teleporter Room Locker',
          body: 'Use the Mars coordinate values from Search Mode to open the upper Teleporter Room case.',
          bullets: [
            'If you did not record Mars earlier, return to Pack-a-Punch and interact with the left side of the organ to reopen Search Mode.',
            'Hover over Mars in the Harmonic Oculus view.',
            'Write down the coordinate values shown in the bottom-left of the screen.',
            'Go to the upper floor of the Teleporter Room.',
            'Interact with the case or locker there and input the Mars coordinate code exactly as shown.',
            'Confirm the case opens before moving to the Library puzzle.',
          ],
        },
        {
          n: 9,
          title: 'Solve the Library Books and Claim Neptune',
          body: 'Read the brain-machine book titles, count those titles in each Library section, rotate the matching busts, and climb to the Neptune planet.',
          bullets: [
            'Return to the machine where you placed the brain in the Teleporter Room.',
            'Watch the machine cycle through book names and write every listed title down.',
            'Go to the Stamin-Up room, which is also the Library.',
            'The Library has three sections. Each section has one bust and three bookshelves.',
            'Interact with the shelves in a section and count how many times your listed book titles appear in that section.',
            'Rotate that section\'s bust the same number of times as the matching book-title count.',
            'The busts can only be moved during the opening window of a round, roughly the first 15-30 seconds. If they will not move, flip the round and listen for the ready sound.',
            'Example: if one section contains two of the titles shown by the brain machine, rotate that section\'s bust two times.',
            'When all three sections are solved, a ladder hatch opens in the Library. Climb the ladder and pick up the Neptune planet.',
          ],
        },
        {
          n: 10,
          title: 'Record the Planet Papers and Align the Planetarium',
          body: 'Find the Mars, Neptune, and Saturn direction papers, place Neptune, then shoot the planetarium bodies until each one matches its paper direction.',
          bullets: [
            'Paper 1 is on top of the desk on the second floor of Machina Astralis.',
            'Paper 2 is on the desk in the Electro-Volt trap room near Juggernog.',
            'Paper 3 is on the middle desk in the Stamin-Up Library room.',
            'Each paper shows one planet and one compass direction. The planets used for this step are Mars, Neptune, and Saturn, while the directions can change between runs.',
            'Go to the top of Machina Astralis and place Neptune on the planetarium.',
            'Find the loose or open wire hanging near the top stairs and interact with it to power the planetarium sequence.',
            'Use the compass markings around the Sun Chandelier as your direction reference.',
            'Shoot Mars, Neptune, and Saturn until each planet lines up with its paper direction. Example: if a paper shows Saturn SE, keep shooting Saturn until it reaches the SE marker.',
          ],
        },
        {
          n: 11,
          title: 'Defend the Portal and Enter Mars',
          body: 'Interact with the brain after the planetarium alignment and protect the portal from drones until the Mars portal stabilizes.',
          bullets: [
            'After Mars, Neptune, and Saturn are aligned, return to the brain setup and interact with the brain.',
            'A defense event begins around the portal.',
            'Flying drones rush the portal and make a loud siren-like sound when they commit to the dive.',
            'Kill the drones before they enter the portal. Letting too many through fails the objective and forces the portal defense to be repeated.',
            'Keep one player focused on the portal mouth while the rest clear zombies and replace armor.',
            'When the defense completes, use the portal to travel to Mars.',
          ],
        },
        {
          n: 12,
          title: 'Capture the Ascendant Eye on Mars',
          body: 'Place the brain by the Mars portal, trigger the bird, shoot the outer orbs, hold the bird in place, and grab the Ascendant Eye during anti-gravity.',
          bullets: [
            'On Mars, pick up the brain from the center area and place it on the top machine by the portal.',
            'Hold interact on the brain until the bird event starts. A sudden loud sound means the bird has spawned.',
            'Shoot the four metal orbs outside the map in this order: back right, back left, front right, front left.',
            'Correct outer orbs glow after being shot. If the orbs do not glow, wait for a new round and interact with the brain again to restart the bird cue.',
            'After the four outer orbs are active, repeatedly shoot the matching metal orb above the portal inside the map to keep the bird held in place.',
            'Continue until anti-gravity begins.',
            'When the bird swoops down, jump through it and interact to capture the Ascendant Eye.',
            'Place the Ascendant Eye artifact in the statue at the back right of the Mars area.',
          ],
        },
        {
          n: 13,
          title: 'Read the Organ Symbols and Power the Pillars',
          body: 'Use the Pack-a-Punch organ to read four symbols plus the static gap, then shoot the five Mars pillar tops with the LGM-1.',
          bullets: [
            'Return to Pack-a-Punch and interact with the organ.',
            'Watch the circular screen on the right side of the organ.',
            'Write down the four symbols that flash. The melody has a clear beginning and end.',
            'Also write down where the static appears in the sequence.',
            'Mars uses five pillar symbols even though the organ clearly shows only four symbols. The static position tells you where the missing fifth pillar symbol belongs in the final order.',
            'Return to Mars and locate the five symbol pillars.',
            'Shoot the top of each pillar with the LGM-1 to charge them.',
            'The top-shot order does not matter for charging, but visiting them in your planned code order helps you memorize the route before the timed input.',
          ],
        },
        {
          n: 14,
          title: 'Enter the Timed Pillar Code',
          body: 'Interact with the bottom symbols in the completed five-symbol order, using the static gap to place the missing symbol.',
          bullets: [
            'Build the final order from the four organ symbols and the static gap. Insert the fifth Mars pillar symbol at the position where the static appeared.',
            'Start only when the round is controlled, because the pillar input is timed.',
            'Interact with the symbol at the bottom of each pillar in the completed five-symbol order.',
            'A correct input turns blue.',
            'A wrong input turns red.',
            'Three wrong inputs fail the attempt, and you must advance to a new round before retrying.',
            'After the five-symbol code is accepted, interact with the brain to start the Caltheris boss fight.',
          ],
        },
        {
          n: 15,
          title: 'Defeat Caltheris Part 1',
          body: 'In the opening phase, Caltheris floats above the arena and cannot be damaged directly, so fill the arena soul boxes and trigger the brain blasts instead.',
          bullets: [
            'Enter the fight with Pack-a-Punch III weapons, full armor, self-revive coverage, and movement-focused perks if possible.',
            'Watch the edge of the arena for the active soul box or generator-style charge objective.',
            'Kill zombies near the active objective until it fills.',
            'Stay mobile while the floating Caltheris tracks players with lasers; do not waste ammo shooting the boss during this phase.',
            'When the screen flashes blue, the charge is ready.',
            'Interact with the charged objective or brain device to fire a blast that removes a large chunk of Caltheris\' health.',
            'Repeat the soul-box charge and brain-blast sequence three times to end Part 1.',
            'Use the LGM-1 and high-damage Pack-a-Punched weapons to clear specials before they crowd the activation point.',
          ],
        },
        {
          n: 16,
          title: 'Defeat Caltheris Part 2 and Ascendant',
          body: 'When Caltheris becomes a moving monster, strip armor, shoot glowing weak points, and keep distance from the targeted boulder and ground-slam attacks.',
          bullets: [
            'Part 2 starts when Caltheris spawns as a large monster in the arena instead of floating out of reach.',
            'Shoot the glowing weak points across Caltheris\' body until a larger glowing damage spot appears.',
            'Unload into the large glowing spot as soon as it opens, because that is the best damage window.',
            'Keep distance from the player-targeted boulder throw; if the boulder is aimed at you, move laterally and keep sliding instead of backing straight up.',
            'After Part 2 health is depleted, Caltheris returns as Caltheris Ascendant.',
            'Ascendant uses the same weak-point damage plan but adds a ground-slam attack, so keep enough spacing to dodge the slam before committing to damage.',
            'Clear drones, armored enemies, and specials before they trap you during a weak-point window.',
            'Refresh armor between damage windows; going down while a large weak spot is open costs more time than restocking does.',
          ],
        },
        {
          n: 17,
          title: 'Defeat Caltheris the Needle and Claim Completion',
          body: 'The final phase keeps the weak-point pattern but upgrades the boulder attack with purple pools, so save the brain-jar power-up and finish the exposed weak spots cleanly.',
          bullets: [
            'The last form is Caltheris the Needle.',
            'Use the same armor-break and glowing weak-point damage plan from Part 2 and Ascendant.',
            'The boulder attack now leaves purple pools on the ground. Avoid those pools and route your loop away from any lane that has been covered.',
            'The brain jar can drop a strong emergency power-up that functions like an Insta-Kill, Max Ammo, and full Field Upgrade refill at the same time.',
            'Save that power-up for a late damage window or a dangerous recovery moment instead of grabbing it immediately.',
            'Use the wall-jump routes and low-gravity movement to stay off the ground when rocks, pools, or arena pressure would trap you.',
            'Continue breaking armor and shooting exposed critical spots until Caltheris the Needle reaches zero health.',
            'There is no extra symbol code, planet alignment, or item placement after the pillar code starts the boss fight.',
            'After Caltheris dies, wait for the completion sequence and confirm the Astra Malorum calling card and main quest completion confirmation are awarded.',
          ],
        },
      ],
    },
    {
      id: 'paradox-main-quest',
      map: 'paradox',
      mapName: 'Paradox Junction',
      title: 'Paradox Junction Main Quest',
      difficulty: 'Hard',
      duration: '90-120 min',
      party: 'Solo or squad',
      summary: 'Open Pack-a-Punch across both timelines, build the Blundergat, upgrade it into the Sundergat, restore the Twins through the swing, fireplace, music box, piano, cymbals, and golden-note routes, then destroy the Dark Heart.',
      requirements: ['Pack-a-Punch open', 'Blundergat crafted', 'Sundergat upgraded', 'Wisp Tea and Death Perception available', 'Combat Axe, Molotov, and Brain Rot or Psych Grenade ready'],
      rewardLabel: 'Paradox Junction calling card',
      rewardGif: 'Paradox.gif',
      rewards: ['Paradox Junction calling card', 'Main quest completion'],
      imagePlaceholders: true,
      steps: [
        {
          n: 1,
          title: 'Open Pack-a-Punch and the Past Timeline',
          body: 'Start in destroyed Nuketown, collect the Truck Keys, use the first forced time jump to reach the normal past timeline, then clear the temporal storm so Pack-a-Punch appears on Trinity Avenue.',
          bullets: [
            'Use destroyed Nuketown for the ruined future timeline and normal Nuketown for the cleaner past timeline.',
            'Buy through the early route toward the eastern side of the map and pick up the Truck Keys from the zombie corpse.',
            'Continue rounds until the first dog-round timeline event, usually around round 6 or 7, pulls you into normal Nuketown.',
            'Use the Truck Keys on the oil truck that blocks the road so the next section of normal Nuketown opens.',
            'Go to the southern temporal storm area and shoot all four storm anchor points.',
            'Zombies spawn out of the storm while the anchors are active. Clear them whenever the storm stops taking damage, then resume shooting the anchors.',
            'When all four anchors are destroyed, Pack-a-Punch appears on Trinity Avenue.',
            'Keep both timelines open from this point forward because almost every quest item asks you to move between matching locations in the future and past.',
          ],
        },
        {
          n: 2,
          title: 'Collect the Blundergat Barrel from Cysts',
          body: 'In destroyed Nuketown, feed yellow wall cysts with nearby zombie kills until one of them drops the Barrel.',
          bullets: [
            'Stay in destroyed Nuketown for this step; the yellow cysts do not appear in normal Nuketown.',
            'Find a yellow cyst stuck to a wall and train zombies close to it.',
            'Kill about 10 zombies beside the cyst so it absorbs their souls.',
            'When the cyst pops, check the dropped items for the Barrel.',
            'If the Barrel does not drop, repeat the same soul-feed process at another cyst.',
            'Check the southern part of the map carefully, because that side can have multiple cysts.',
            'Do not leave the Barrel on the ground. Pick it up before flipping rounds or moving to another objective.',
          ],
        },
        {
          n: 3,
          title: 'Take the Sealant and Make the Acid Vial',
          body: 'Use the Yellow House Sealant, the SO3 vial, and the Green House sink to create acid for the mannequin route that awards the Hammer.',
          bullets: [
            'In normal Nuketown, go to the second floor of the Yellow House and pick up the Sealant from the bookshelf.',
            'In destroyed Nuketown, go to the second floor of the Yellow House and pick up the SO3 vial from the desk.',
            'Still in destroyed Nuketown, take the vial to the Green House sink and interact with the sink to fill it.',
            'The filled vial becomes the acid used on the mannequins.',
            'In co-op, each player has their own vial progress. Vial charges are not shared across the squad.',
            'A filled vial usually covers 2-3 mannequins before it needs to be refilled, so expect to return to the Green House sink more than once.',
          ],
        },
        {
          n: 4,
          title: 'Acid the Mannequins and Claim the Hammer',
          body: 'In normal Nuketown, mark every headed mannequin with the acid vial, then check the matching mannequin spots in destroyed Nuketown for the Hammer.',
          bullets: [
            'Return to normal Nuketown with a filled acid vial.',
            'Interact with mannequins that still have heads. Smoke above a mannequin confirms the acid was applied.',
            'There are 12 headed mannequin targets in normal Nuketown.',
            'If the vial runs out, return to destroyed Nuketown, refill at the Green House sink, then continue marking mannequins in normal Nuketown.',
            'After all headed mannequins have been treated, go back to destroyed Nuketown.',
            'Check the locations where those mannequins appeared. One of the matching future spots now contains the Hammer.',
            'Pick up the Hammer and confirm you still have the Sealant and Barrel before moving to the Stock route.',
          ],
        },
        {
          n: 5,
          title: 'Break the Noisy Growth and Take the Stock',
          body: 'Use the black-growth audio cue in destroyed Nuketown to identify the correct wall, then blow that matching wall open in normal Nuketown and collect the Stock in the future.',
          bullets: [
            'In destroyed Nuketown, check the three black growth wall spots and listen closely.',
            'Growth spot 1: Yellow House Garage.',
            'Growth spot 2: the Green House staircase area.',
            'Growth spot 3: Trinity Avenue near the perk-side wall.',
            'Only one growth makes the distinct audio cue. Remember that exact wall.',
            'Travel to normal Nuketown and throw a Semtex or another explosive at the matching wall location.',
            'After the wall is opened in normal Nuketown, return to the matching spot in destroyed Nuketown.',
            'Pick up the Stock from the broken wall opening.',
          ],
        },
        {
          n: 6,
          title: 'Craft the Blundergat in the Truck',
          body: 'Bring the Barrel, Hammer, Stock, and Sealant to the truck workbench in destroyed Nuketown and build the Blundergat.',
          bullets: [
            'Go to the red truck or middle truck in the Cul-de-Sac of destroyed Nuketown.',
            'Find the workbench inside the truck.',
            'Melee or interact with the workbench if it is closed.',
            'Add the Blundergat parts to the bench.',
            'Craft and pick up the Blundergat before starting the upgrade route.',
            'If you are carrying another main weapon, decide which weapon to replace before crafting so the Blundergat is not left sitting on the bench.',
          ],
        },
        {
          n: 7,
          title: 'Upgrade the Blundergat into the Sundergat',
          body: 'Start rounds in destroyed Nuketown, release three fire-tornado enemies, kill each one at the truck with the Blundergat, then move the weapon through the past and future workbenches.',
          bullets: [
            'Start a new round while you are in destroyed Nuketown. The fire-tornado enemy will not spawn if the round starts in normal Nuketown.',
            'Look for the fire tornado in the Yellow House Backyard, Green House Backyard, or the Trinity Avenue alley.',
            'Approach the fire tornado to release the Tortured Zombie with the blue aura.',
            'Keep normal zombies away from the Tortured Zombie. If it absorbs too many, it can disappear before reaching the truck.',
            'Lead the Tortured Zombie to the Blundergat workbench in the red truck.',
            'Kill it with the Blundergat while it is close to or inside the truck so the blue aura is absorbed by the workbench.',
            'Repeat the process on two more rounds. The third fire-tornado target becomes a Shock Mimic, and the final hit still needs to come from the Blundergat.',
            'After all three souls are absorbed, travel to normal Nuketown, melee the workbench, and place the Blundergat inside.',
            'Return to destroyed Nuketown, open the workbench again, and pick up the upgraded Sundergat. When Pack-a-Punched, it is named Holistic Dichotomizer.',
          ],
        },
        {
          n: 8,
          title: 'Use the RC-XD to Open the Garage and Get Chalk',
          body: 'Find the RC-XD Controller in destroyed Nuketown, drive the RC-XD through the ramp route, detonate it by the garage tank, then collect the Twins item and Chalk.',
          bullets: [
            'The RC-XD Controller can spawn on the shelf in the Yellow House Garage.',
            'It can also spawn by the crate to the right of Pack-a-Punch.',
            'It can also spawn behind the Green House, near the backyard or perk-side area.',
            'Interact with the controller to take control of the RC-XD.',
            'Drive through the marked ramp route toward the garage. Watch the battery timer on the lower-left of the screen.',
            'Use the final ramp to jump over the debris into the garage.',
            'Detonate the RC-XD beside the red gas tank or barrel inside the garage to blow open the blocked door.',
            'If the RC-XD runs out of time, search the controller spawn locations again and retry the route.',
            'Enter the opened garage near Pack-a-Punch, pick up the head sitting on the crate to your left, then wait for the Chalk to appear on the floor and pick it up.',
          ],
        },
        {
          n: 9,
          title: 'Repair the Swing Set for the Twins',
          body: 'Take the swing seat from normal Nuketown, attach it to the destroyed Yellow House swing set, then place the Chalk to trigger the Twins scene.',
          bullets: [
            'Open the needed doors in both timelines before starting this step so you can move between matching yards quickly.',
            'In normal Nuketown, go to the Yellow House Backyard and shoot the wooden seat off the swing set.',
            'Pick up the Swing Seat from the ground.',
            'Travel to destroyed Nuketown and return to the Yellow House Backyard swing set.',
            'Interact with the swing set to attach the Swing Seat.',
            'Interact again to place the Chalk.',
            'Watch for the short Twins scene at the swing set. This confirms the step is complete and makes the nearby red toolbox usable.',
          ],
        },
        {
          n: 10,
          title: 'Plant the Seed and Light the Fireplace',
          body: 'Use the Yellow House Garage toolbox seed to grow a tree, charge it with Blundergat-family kills, cut three Strange Firewood pieces, and light the Yellow House fireplace.',
          bullets: [
            'After the Twins swing scene, go to the Yellow House Garage in destroyed Nuketown.',
            'Open the red toolbox on the shelf and take the Irradiated Seeds or Plant Seeds.',
            'Travel to normal Nuketown and go to the dug-up dirt spot on Trinity Avenue near Pack-a-Punch and the hedge.',
            'Plant the seed in the dirt mound.',
            'Kill zombies near the sprouting tree with the Blundergat or Sundergat until the tree finishes absorbing souls.',
            'A white screen flash and Max Ammo confirm the tree is charged.',
            'Travel to destroyed Nuketown and return to the same tree location.',
            'Throw a Combat Axe at the fully grown tree three times and pick up all three Strange Firewood pieces.',
            'Travel to normal Nuketown, place the Strange Firewood in the Yellow House fireplace, then throw a Molotov at the wood to light it.',
          ],
        },
        {
          n: 11,
          title: 'Get the Goggles with Wisp Tea',
          body: 'Shoot the speaker pole near Pack-a-Punch, then use a Wisp Tea wisp to drag the Goggles back into the playable area.',
          bullets: [
            'In destroyed Nuketown, stand near Pack-a-Punch and look for the speaker pole to the left of the machine.',
            'Shoot the very top of the pole. Aim for the pole cap, not the speakers.',
            'The Goggles drop outside the fence if the shot is correct.',
            'Buy Wisp Tea if you do not already have it.',
            'Shoot a zombie to summon your wisp, then let the wisp move to the dropped Goggles.',
            'Pick up the Goggles after the wisp carries them inside the map.',
          ],
        },
        {
          n: 12,
          title: 'Find the Headset with Death Perception',
          body: 'Use Death Perception in destroyed Nuketown to reveal the Headset outline at one of three possible locations.',
          bullets: [
            'Buy Death Perception before searching so the Headset outline is visible.',
            'Headset spot 1: Yellow House Backyard, near the mannequin hand and perk-side area.',
            'Headset spot 2: Green House upstairs, on the wall connecting the two upstairs rooms.',
            'Headset spot 3: Cul-de-Sac, in the trash can left of the GobbleGum machine.',
            'Interact with the highlighted Headset once you find it.',
            'You need both the Goggles and the Headset before the Toy Box step will progress.',
          ],
        },
        {
          n: 13,
          title: 'Win Four Square and Escort the Cymbals',
          body: 'Place the Goggles and Headset in the Toy Box, roll the red ball onto the Green House Backyard X, complete Four Square in the past, and escort the Cymbals with Sundergat souls.',
          bullets: [
            'In normal Nuketown, go to the blue Toy Box on Trinity Avenue near the Exfil point and place the Goggles and Headset inside.',
            'Return to destroyed Nuketown and go to the Green House Backyard behind the garage. A white X should be visible on the ground.',
            'Find the red ball. Spawn spot 1: Trinity Avenue roofline directly above the M8A1 wall-buy side.',
            'Spawn spot 2: stacked ammo crates on a wooden box near the Trinity Avenue alley.',
            'Spawn spot 3: Yellow House Backyard, on the patio pillar.',
            'Shoot the ball down, then keep shooting it along the ground until it rests in the middle of the Green House Backyard X.',
            'When the X glows blue, travel to normal Nuketown and return to the same backyard spot.',
            'Interact with the floating ball to start the Four Square minigame.',
            'Melee the ball after it bounces so it moves to another square inside the white lines.',
            'Do not let it bounce twice in the same square and do not leave the white lines. If you fail, wait for the ball to respawn and retry.',
            'When the timer ends, the Cymbals appear.',
            'Shoot the Cymbals with the Sundergat, then kill zombies near them with the Sundergat so they absorb souls and move toward the Toy Box.',
            'The step is complete when the Cymbals reach the Toy Box and the screen flashes white.',
          ],
        },
        {
          n: 14,
          title: 'Turn the Piano Teacher',
          body: 'Use Brain Rot or a Psych Grenade on the Piano Teacher in destroyed Nuketown, then beat her to the normal-timeline piano before she dies.',
          bullets: [
            'Go to the Green House Backyard in destroyed Nuketown.',
            'Wait for the Piano Teacher to appear near the back fence. She is slower and less aggressive than normal zombies.',
            'She usually appears once per round, so hold a zombie if you need a calm attempt.',
            'Turn her with Brain Rot or a Psych Grenade.',
            'After she turns, she moves into the Green House and goes to the piano.',
            'Immediately travel to normal Nuketown and run to the Green House piano.',
            'If you arrive in time, she opens and plays the piano before exploding.',
            'If she dies before the piano interaction, advance to the next round and repeat the teacher step.',
          ],
        },
        {
          n: 15,
          title: 'Read the Eight Blue Notes',
          body: 'In destroyed Nuketown, interact with the eight blue notes in blink-count order, using the number of blinks as the sequence rather than the physical route.',
          bullets: [
            'Each blue note blinks between one and eight times. The note that blinks once is first, the note that blinks twice is second, and so on.',
            'Note location 1: Green House Backyard, on the left side of the bunker area.',
            'Note location 2: Yellow House Backyard, on the garden fence.',
            'Note location 3: Cul-de-Sac, on the yellow bus.',
            'Note location 4: Cul-de-Sac, on the fence to the right of the teleporter.',
            'Note location 5: Trinity Avenue, on the garage door left of the alleyway.',
            'Note location 6: Trinity Avenue, on the brick wall left of the M8A1 wall buy.',
            'Note location 7: Trinity Avenue, on the rock left of Pack-a-Punch near the strange tree.',
            'Note location 8: Trinity Avenue, on the broken fence right of the Exfil phone.',
            'Write down each location with its blink count before interacting so you do not lose the order mid-round.',
            'Interact with all eight notes from one blink through eight blinks, then travel to normal Nuketown.',
          ],
        },
        {
          n: 16,
          title: 'Play the Piano and Mark the Soul X',
          body: 'Use the Green House piano in normal Nuketown, play the fixed melody, then return to destroyed Nuketown and activate the new Trinity Avenue X.',
          bullets: [
            'In normal Nuketown, go to the Green House piano after the blue-note sequence is complete.',
            'Interact with the piano when it glows yellow.',
            'Play the melody A-F-G-E-F-E-C-E.',
            'If you make a mistake or time out, wait for the piano to become interactable again. You do not need to flip the round just to retry the piano.',
            'A successful input plays the full melody and confirms the piano route.',
            'Return to destroyed Nuketown and go to Trinity Avenue near the truck.',
            'A new white X appears on the ground after the piano is solved.',
          ],
        },
        {
          n: 17,
          title: 'Shoot the Floating Zombies and Win the Bouncing Ball Game',
          body: 'Free three out-of-map souls, then complete the circle minigame by killing launched zombies before they land.',
          bullets: [
            'In destroyed Nuketown, search outside the playable fences for three floating zombies.',
            'Good places to check are the Yellow House Backyard fence line, the Green House Backyard fence line, and the far map edges.',
            'Shoot all three floating zombies. Each correct zombie leaves or sends a soul orb toward the Trinity Avenue X.',
            'Confirm the X near the southern truck has three orbs above it.',
            'Travel to normal Nuketown and go to the matching circle on the ground.',
            'Interact with the floating ball in the middle of the circle to begin the minigame.',
            'When the ball bounces, zombies are launched into the air.',
            'Kill all three airborne zombies before they touch the ground.',
            'Complete four successful bounce cycles.',
            'The minigame fails if a zombie lands, if a player shoots too early, or if a player leaves the circle. Wait about two minutes before retrying after a fail.',
            'A charged Sundergat shot is strong here because the ricochet can catch airborne targets quickly.',
          ],
        },
        {
          n: 18,
          title: 'Escort the Golden Note to the Piano',
          body: 'After the bouncing ball game, charge the Golden Note with Sundergat kills and move it into the Green House piano.',
          bullets: [
            'When the bouncing ball game is complete, a Golden Note appears in the middle of the circle.',
            'Shoot or activate the Golden Note with the Sundergat if it is not moving yet.',
            'Kill zombies close to the Golden Note with the Sundergat so it absorbs souls.',
            'The note moves from the circle toward the Green House.',
            'Stay near it and keep using Sundergat kills whenever it pauses.',
            'Escort it through the back of the house until it reaches the piano.',
            'The piano glows with a golden aura when the Golden Note route is complete.',
          ],
        },
        {
          n: 19,
          title: 'Set the Doomsday Clock and Summon the Twins',
          body: 'Set both Green House clock hands to zero in destroyed Nuketown, shoot the red hand during the time jump, then follow the Twins to the boss portal.',
          bullets: [
            'In destroyed Nuketown, climb or stand on the buses in the middle of the map to get a clean view of the Green House clock tower.',
            'Shoot the clock hands until both the red hand and white hand line up with 0.',
            'The white hand can move while you adjust the red hand. A reliable setup is to move the red hand to 2, move the white hand to 1, then finish both hands at 0.',
            'When both hands are on 0, start the teleporter interaction to travel to normal Nuketown.',
            'Shoot the red clock hand once just before the teleport animation completes.',
            'In co-op, have one player hold the teleporter interaction while another player aims at the red hand.',
            'If the timing works, unique music plays in normal Nuketown and the Twins appear at the Green House piano.',
            'Follow the Twins from the piano to the Toy Box, then to the fireplace, then to the Yellow House Backyard swing set.',
            'A gold orb appears at the swing set. This is the point-of-no-return boss start, so finish armor, perks, Pack-a-Punch, ammo, and equipment before interacting.',
          ],
        },
        {
          n: 20,
          title: 'Dark Heart Phase 1',
          body: 'Destroy the first three black-goo Loot Cysts, defend the Concentration Fields, then damage the Dark Heart weak points during the first spin window.',
          bullets: [
            'Interact with the gold orb at the swing set when the squad is ready. Squad games may require a vote.',
            'Phase 1 uses three black-goo sites: Trinity Avenue, Yellow House Backyard, and Green House Backyard.',
            'Each site has a Loot Cyst attached to the black goo.',
            'Kill zombies near a Loot Cyst until the cyst is destroyed and the quest item at that site is revealed.',
            'After the three Loot Cysts are destroyed, a Concentration Field appears around one of the revealed items.',
            'Defend the Concentration Field from zombies until its defense completes. If the field health reaches zero, repeat that defense.',
            'Defend the Concentration Field at all three item sites.',
            'When all three defenses are complete, the Dark Heart begins spinning and becomes vulnerable.',
            'Avoid meteors and fire tornadoes during the damage window.',
            'Shoot the glowing weak points on the Dark Heart. You can damage the boss from anywhere with a clear line of sight; you do not have to stand in the center.',
            'After the weak points are destroyed, the boss becomes immune and Phase 2 begins.',
          ],
        },
        {
          n: 21,
          title: 'Dark Heart Phase 2',
          body: 'Repeat the three-site route, but clear the yellow-orb zombie spawns instead of soul-feeding Loot Cysts, then defend the fields and damage the faster-spinning Heart.',
          bullets: [
            'Return to the same three black-goo sites: Trinity Avenue, Yellow House Backyard, and Green House Backyard.',
            'This time, each site has a yellow orb above the goo.',
            'Kill the zombies spawned by the yellow orb, similar to the Pack-a-Punch storm-clearing step.',
            'After all three yellow-orb site clears are complete, defend the Concentration Fields again.',
            'Rad-Hounds become a larger threat in this phase, so clear them before focusing on boss damage.',
            'After the three field defenses, the Dark Heart becomes vulnerable again.',
            'The Heart spins faster in Phase 2, so lead your shots and focus one visible weak point at a time.',
            'Destroy the glowing weak points to push the fight into Phase 3.',
          ],
        },
        {
          n: 22,
          title: 'Dark Heart Phase 3 and Completion',
          body: 'Lead the fire-tornado Tortured Zombie to each black-goo site, kill it while tethered, defend the final fields, and finish the Dark Heart weak points.',
          bullets: [
            'Phase 3 keeps the same three black-goo sites, but the unlock mechanic changes to a Tortured Zombie.',
            'A fire tornado spawns near the center of the map.',
            'Lead or wait for the fire tornado to approach one of the black-goo sites.',
            'Release the Tortured Zombie and move it close enough to the black goo for the tether to appear.',
            'Kill the Tortured Zombie only after it is tethered to the goo.',
            'Repeat the tether-and-kill route at Trinity Avenue, Yellow House Backyard, and Green House Backyard.',
            'Keep normal zombies, Rad-Hounds, and Shock Mimics under control so the Tortured Zombie reaches each site alive.',
            'After the three tether kills, defend the Concentration Fields one final time.',
            'The Dark Heart constantly spins during the last damage window, so wait for weak points to rotate into view and commit burst damage when they do.',
            'Avoid the same meteor and fire-tornado attacks from earlier phases while clearing Rad-Hounds before they stack up.',
            'Destroy the remaining glowing weak points until the Dark Heart reaches zero health.',
            'Wait for the ending sequence and confirm the Paradox Junction calling card and main quest completion confirmation are awarded.',
          ],
        },
      ],
    },
    {
      id: 'totenreich-main-quest',
      map: 'totenreich',
      mapName: 'Totenreich',
      title: 'Totenreich Main Quest',
      difficulty: 'Hard',
      duration: '60-90 min',
      party: 'Solo or squad',
      summary: 'Assemble the Jotun Star, recover three uranium canisters, charge the Atomkraft Core, claim the Sunstone, solve the Symbol Dial, and enter the robot for the final fight.',
      requirements: ['Power restored', 'Pack-a-Punch open', 'Jotun Star built'],
      rewardLabel: 'Totenreich calling card',
      rewardGif: 'Totenreich.gif',
      rewards: ['Totenreich calling card', 'Main quest completion'],
      imagePlaceholders: true,
      steps: [
        {
          n: 1,
          title: 'Build the Jotun Star',
          body: 'Open the map, run the Dry Dock crane sequence, and complete Astrid\'s lantern route to claim the wonder weapon.',
          bullets: [
            'Restore power and unlock Pack-a-Punch.',
            'Activate the green crane control at Dry Dock, then use the lowered wall to reach the ship tip and recover the chain.',
            'Take the Chili Chunks from the crate behind the truck on the bridge, then place them on the Market Center table.',
            'After placing the Chili Chunks, wait until the second special round. Kill the Zursa that appears partway through it and take the lantern to Burial Grounds.',
            'Use the chain on the left side of the Burial Grounds door to open it, revealing the altar. Place the lantern on the altar, then match the constellations in left, right, back, front order.',
            'Escort Astrid through three frozen zombie stops, climb the Lighthouse route, and take the Jotun Star at the top.',
          ],
          images: [
            { file: 'JotunStar.png', label: 'Jotun Star', kind: 'STEP 1', objectFit: 'contain', showOverlay: false },
          ],
        },
        {
          n: 2,
          title: 'Open the Lab',
          body: 'Open the Core Foundry vent route, then send an RC-XD through to breach the lab near Pack-a-Punch.',
          bullets: [
            'Travel to the Core Foundry. Up some metal stairs along the wall, find the covered wall vent and shoot the cover to pop it off.',
            'Drive an RC-XD through the duct, down the stairs, and over the ramp. No boosting is required to get across. Travel under the garage door on the other side, then detonate the RC-XD next to the explosive barrels in the room to open it. The entry is to the left of Pack-a-Punch.\nTIP: A free RC-XD spawns in Eidskallen Square.',
          ],
        },
        {
          n: 3,
          title: 'Recover the Lab Sample',
          body: 'Read the marked door numbers, match them to lettered jars, create the solution, and open the cell.',
          bullets: [
            'From the lab near Pack-a-Punch, look at the numbered doors just outside the playable space. Two of them will have radioactive symbols beside them. Note those numbers.',
            'Convert the two numbers into letters using the alphabet: 1=A, 2=B, 3=C, 4=D, and so on.',
            'Identify your letters, then search the room for jars marked with those letters.',
            'Place the two jars in the device next to the closed jail cell to create the solution.',
            'Use the solution to melt the body on the bench across the room, revealing the cell key.',
            'Open the cell and retrieve the uranium sample.',
          ],
        },
        {
          n: 4,
          title: 'Secure the Fishing Canister',
          body: 'Hook the green fish, shoot the Ravager that steals it, then hunt the Radiated Ravager on the next round.',
          bullets: [
            'Find a fishing rod at Dry Dock, Storm Bridge, Fishery Island, or Beacon Island.',
            'Check the fishing spots for a glowing green fish jumping at the surface.',
            'Fish at that spot until the green fish drops. A Ravager will appear and take it, shoot the Ravager as it leaves.',
            'On the next round, find the Radiated Ravager in each location it moves to and damage it whenever you catch up to it.',
            'When the Radiated Ravager dies, collect the uranium canister it drops.',
          ],
        },
        {
          n: 5,
          title: 'Recover the Final Canister',
          body: 'The last canister is tied to a Glocke Drop and the zombies suspended inside its field.',
          bullets: [
            'Call a Glocke Drop onto a full zombie group.',
            'Kill the suspended zombies before the field resolves.',
            'Collect the third uranium canister.',
          ],
          images: [
            { file: 'glockedrop.png', label: 'Glocke Drop', kind: 'STEP 5', objectFit: 'contain', showOverlay: false },
          ],
        },
        {
          n: 6,
          title: 'Fire the Lighthouse Cannon',
          body: 'Use the War Factory manifest to identify the correct crate, fire the Lighthouse cannon, and recover the Signal Amplifier.',
          bullets: [
            'Take the crowbar from the second floor of the Lighthouse.',
            'In the War Factory Admin Room, find the shipping manifest on a shelf. Look for the ammo icon on the manifest and remember the number associated with it.',
            'Search the numbered crates around Core Foundry, Dry Dock, War Factory, and Fjord Road. Use the crowbar to open the crate matching the manifest number and collect the artillery shell.',
            'Load the recovered shell into the artillery cannon next to the Lighthouse, facing the Robot head at spawn.',
            'Hit the cannon with the Jotun Star to fire it.',
            'Travel to the Robot head and collect the Signal Amplifier.',
          ],
        },
        {
          n: 7,
          title: 'Call the Rocket Barrage',
          body: 'Install the Signal Amplifier in Tyr\'s head, read both light sequences, calibrate the rockets, and open the Dry Dock building marked 02.',
          bullets: [
            'Install the Signal Amplifier in Tyr\'s head.',
            'Two lights below Tyr\'s catwalk will start flashing. There will be two number sequences, so make note of each one.',
            'Example: if the left light blinks twice and the right light blinks three times, the first code is 2-3.',
            'Use the noted sequences to tune the Radio Tower dials. Put the left light number on the left dial and the right light number on the right dial.',
            'Rockets will fire. If they hit the Radio Tower, the calibration is correct. If they miss, enter the second sequence.',
            'Once the rockets are calibrated, collect a Rocket Barrage Controller.',
            'Use the Rocket Barrage Controller on the large building with blocked stairs marked 02 in Dry Dock to open it.',
          ],
        },
        {
          n: 8,
          title: 'Charge the Atomkraft Core',
          body: 'Use the claw machine in the opened Dry Dock room, charge the Atomkraft Core at spawn, then carry it to the bridge.',
          bullets: [
            'Enter the newly opened location at Dry Dock.',
            'Use the claw machine in the opened room to pick up the uranium cores and slot them into the grid on the right.',
            'Arrange the cores so the meter lands in the green zone, then collect the Atomkraft Core.',
            'Carry the Atomkraft Core to Quick Revive at spawn and place it on the box just to the right.',
            'Enter the building behind Quick Revive and interact with the generator to turn it on.',
            'Defend the core while it charges. When the generator stops, return to it and interact again to resume charging.',
            'Once finished, take the charged Atomkraft Core to the bridge. You cannot travel by zipline while carrying it.',
          ],
          images: [
            { file: 'UraniumClawMachine.png', label: 'Uranium Claw Machine', kind: 'STEP 8', objectFit: 'contain', showOverlay: false },
          ],
        },
        {
          n: 9,
          title: 'Cook the Dravakar Shard',
          body: 'Use the charged Atomkraft Core on the bridge, collect the Dravakar Shard, heat it at Vulture Aid, and take the Sunstone from the HVT.',
          bullets: [
            'Place the Atomkraft Core on top of the barrel with a yellow stripe facing Tyr.',
            'Tyr will retrieve the canister and fire his laser at Dravakar.',
            'Collect the Dravakar Shard that drops to the left of the bridge, near Tyr\'s foot.',
            'Take the shard to the church where Vulture Aid is and place it on the spit over the fire.',
            'Fire a charged shot from the Jotun Star to start the fire.',
            'Once the fire is lit, use a Disciple Injection to pick up zombies and throw them at the fire until a lockdown event starts.',
            'Fight the HVT Necropincer and take the Sunstone it drops.',
          ],
        },
        {
          n: 10,
          title: 'Activate the Symbol Dial',
          body: 'Take the Sunstone to the Eidskallen church, activate the Symbol Dial, and shoot the floating symbols in arrow order.',
          bullets: [
            'Take the Sunstone to the church near Eidskallen Square.',
            'Place it on the altar in the center and melee it with the Jotun Star to activate the Symbol Dial above the church.',
            'Review the direction of the three arrows in the sky. The arrow with one line near the center of the dial is arrow 1, two lines is arrow 2, and three lines is arrow 3.',
            'Around the map, find the symbols from the dial floating in the air.',
            'Hit the symbols with charged shots from the Jotun Star in the order the arrows direct you.',
            'If done incorrectly, the arrows will provide new symbols and you can try again.',
          ],
        },
        {
          n: 11,
          title: 'Start the Boss Fight',
          body: 'After the correct symbol sequence is entered, enter Tyr\'s head, prepare your loadout, and start the final encounter from his computer.',
          bullets: [
            'Enter Tyr\'s head after the correct symbol sequence is entered.',
            'Make sure you are adequately prepared with perks, Pack-a-Punch III, legendary rarity weapons, and any GobbleGums you want for the fight.',
            'Interact with Tyr\'s computer to start the boss fight.',
          ],
        },
      ],
    },
    {
      id: 'moon-big-bang-theory',
      map: 'moon',
      mapName: 'Moon',
      title: 'Cryogenic Slumber Party / Big Bang Theory',
      difficulty: 'Very Hard',
      duration: '75-120 min',
      party: 'Solo for Cryogenic Slumber Party; 2+ for original BO1 Big Bang Theory',
      summary: 'Open Griffin Station, complete Samantha Says, move the Vril Sphere, assemble and charge the Golden Rod, swap Richtofen and Samantha, then arm the rockets that strike Earth.',
      heroImage: moonShot('EarthBlownUp_EEEnd.png', 'Moon ending aftermath'),
      requirements: [
        'Power on',
        'Hacker',
        'Wave Gun',
        'QED',
        'Gersh Device',
        'Excavator Pi must breach Tunnel 6',
        'Richtofen needs the Golden Rod and Focusing Stone for the full Big Bang Theory path',
      ],
      rewards: [
        'Cryogenic Slumber Party achievement or trophy',
        'Big Bang Theory achievement or trophy',
        'Permanent perks after quest completion',
        'Moon ending sequence',
      ],
      steps: [
        {
          n: 1,
          title: 'Power and Samantha Says',
          body: 'Start by opening Griffin Station, turning on power, and clearing the first Simon Says terminal sequence near the Receiving Bay.',
          bullets: [
            'Reach the MPD room and turn on the power.',
            'Return to the four computer terminals near the entrance to Tunnel 6.',
            'Watch the colored terminal sequence, then repeat it back by interacting with the matching computers.',
            'Continue until the terminals flash green and shut down.',
          ],
          images: [
            moonShot('powerswitch.png', 'Moon power switch'),
            moonShot('samsaysterminalwithvrilspherenearit.png', 'Samantha Says terminal area'),
          ],
        },
        {
          n: 2,
          title: 'Hack the Lab Buttons',
          body: 'Use the Hacker in the labs to open the next control sequence, then hit the wall buttons together once the terminals are handled.',
          bullets: [
            'Find the Hacker in the lab area.',
            'Hack one of the four wall buttons in the server room.',
            'Hack the green-lit lab terminals before the timer expires.',
            'After the terminal hacks are complete, activate the four wall buttons at roughly the same time.',
            'Listen for the confirmation tone before moving on.',
          ],
        },
        {
          n: 3,
          title: 'Let Excavator Pi Breach Tunnel 6',
          body: 'Tunnel 6 has to be breached by Excavator Pi before the Vril Sphere path can continue.',
          bullets: [
            'Wait for Excavator Pi to target Tunnel 6.',
            'Let Pi finish breaching the tunnel before you stop it.',
            'Return to the Receiving Bay and hack the Excavator terminal to pull Pi back.',
            'Once the tunnel is accessible again, move into Tunnel 6 to begin the Vril Sphere route.',
          ],
          images: [
            moonShot('tunnel6beforeexcavatorpi.png', 'Tunnel 6 before Excavator Pi'),
            moonShot('excavatorpi.png', 'Excavator Pi warning'),
            moonShot('hacktodeactivateexcavator.png', 'Hack terminal to stop Excavator Pi'),
            moonShot('vrilsphereafterexcavatorpi.png', 'Vril Sphere after Excavator Pi'),
          ],
        },
        {
          n: 4,
          title: 'Move the Vril Sphere',
          body: 'Push the Vril Sphere through the station until it returns to the pyramid route.',
          bullets: [
            'Find the Vril Sphere after Tunnel 6 is breached and Pi is hacked away.',
            'Knife or shoot the sphere whenever it lodges in the tunnel path.',
            'When it rises onto the satellite dish above the Receiving Bay, blast it loose with the Wave Gun.',
            'Follow it through Tunnel 11 and dislodge it again when it gets stuck near the Semtex side.',
            'Keep moving it until it reaches the pyramid area.',
          ],
          images: [
            moonShot('hiddenvrilspherelocationnearstaminup.png', 'Hidden Vril Sphere location'),
            moonShot('knockvrilsphereoffsatellite.gif', 'Knock the Vril Sphere off the satellite'),
            moonShot('virlspherestuckonsatellitewhereyouusewaveguntomoveit.png', 'Vril Sphere satellite position'),
            moonShot('closedpyramidwithvrilsphere.png', 'Vril Sphere at the pyramid'),
          ],
        },
        {
          n: 5,
          title: 'Reveal Samantha',
          body: 'Once the Vril Sphere locks into the pyramid route, fill the exposed tube and open the MPD.',
          bullets: [
            'Wait for the tube to extend from the pyramid after the sphere reaches the MPD.',
            'Kill zombies near the tube until it finishes collecting souls.',
            'Use the nearby switch after the tube is full.',
            'The pyramid opens and Samantha is revealed, completing the Cryogenic Slumber Party portion.',
          ],
          images: [
            moonShot('conduittubelocation.png', 'MPD conduit tube'),
            moonShot('pyramidopennosoulboxes.png', 'Pyramid open after Samantha reveal'),
          ],
        },
        {
          n: 6,
          title: 'Retrieve the Plates from Earth',
          body: 'Move the plates from Area 51 back to Griffin Station and set up the Receiving Bay computer.',
          bullets: [
            'Teleport to Area 51 and look to the shelf outside the playable space near the teleporter.',
            'Use an explosive to knock the plates down.',
            'Throw a Gersh Device on or next to the plates so they are pulled onto the teleporter pad.',
            'Teleport back to the Moon.',
            'Use a QED to move the plates into the computer station in the Receiving Bay.',
          ],
          images: [
            moonShot('knockdownplatesonearth.gif', 'Knock down the Casimir plates on Earth'),
            moonShot('suckupplatesonearth.gif', 'Pull the Casimir plates with a Gersh Device'),
            moonShot('computerwithplatesteleportedtoit.png', 'Casimir plates at the Receiving Bay computer'),
          ],
        },
        {
          n: 7,
          title: 'Charge the Golden Rod',
          body: 'Complete the computer assembly, then let Richtofen charge the Golden Rod at the Receiving Bay station.',
          bullets: [
            'Find the wire needed for the computer setup, commonly around the labs, Tunnel 6, or nearby exterior areas.',
            'Install the wire at the Receiving Bay computer.',
            'Have the Richtofen player place the Golden Rod between the Casimir plates.',
            'Continue interacting with the computer until the dialogue ends and the screen turns green.',
            'Pick up the charged Golden Rod.',
          ],
          images: [
            moonShot('goldenrodreadytogetcharged.png', 'Golden Rod ready to charge'),
            moonShot('goldenrodcharged.png', 'Charged Golden Rod'),
          ],
        },
        {
          n: 8,
          title: 'Complete Richtofen\'s Grand Scheme',
          body: 'Charge the four MPD soul tubes, then place the charged Golden Rod into the pyramid device.',
          bullets: [
            'Return to the MPD.',
            'Kill zombies near each of the four raised tubes until all four are filled.',
            'Interact with the Mythos Disc to place the charged Golden Rod.',
            'Richtofen and Samantha swap souls, changing the announcer and pushing the quest into the Maxis finale.',
          ],
          images: [
            moonShot('openpyramid4soulboxes.png', 'Four MPD soul tubes'),
          ],
        },
        {
          n: 9,
          title: 'Arm the Missiles',
          body: 'Detach the Vril Sphere from the MPD, finish the harder Samantha Says rounds, then send the sphere away with a Gersh Device.',
          bullets: [
            'Throw a QED at the Vril Sphere to detach it from the MPD.',
            'Complete the Samantha Says computer sequence again.',
            'Each successful sequence raises one rocket; repeat until all three rockets are ready.',
            'Throw a Gersh Device at the Vril Sphere once the rockets are raised.',
          ],
          images: [
            moonShot('vrilspherereadyforqedatpyramid.png', 'Vril Sphere ready for QED at the MPD'),
            moonShot('samsaysterminalwithvrilspherenearit.png', 'Samantha Says with the Vril Sphere nearby'),
            moonShot('rocketsallrisenformaxis.png', 'All rockets raised for Maxis'),
          ],
        },
        {
          n: 10,
          title: 'The Big Bang Theory',
          body: 'The rockets launch, Earth is destroyed, and the full Moon quest completes.',
          bullets: [
            'Wait through the final dialogue and countdown.',
            'Watch the rockets fire toward Earth.',
            'All players receive permanent perks after completion.',
            'The Big Bang Theory achievement or trophy unlocks when the sequence finishes.',
          ],
          images: [
            moonShot('eeending.gif', 'Moon Easter egg ending', { height: 440, maxHeight: 440 }),
          ],
        },
      ],
    },
  ];

  const relics = [
    {
      id: 'lawyers-pen', map: 'ashes', tier: 'Grim', name: "Lawyer's Pen", difficulty: 'Easy',
      effect: 'Fake drops can appear across the map, and getting close to one can turn it into a Mimic encounter.',
      unlock: [
        'Reach round 20.',
        'Ignite three candles with Napalm Burst, a Molotov, or another reliable fire source.',
        'Check the farmhouse upstairs nightstand at Vandorn Farm, the ruined fog cabin table in Lost Cabins, and the shelf beside Juggernog in Ashwood.',
        'Do not save after lighting the candles; finish the candle route in the same session.',
      ],
      portal: 'Barnhouse south side, beside the left door.',
      trial: 'Four shock-Mimic waves: build progress on waves 1 and 3, then clear Mimic HVTs on waves 2 and 4. Doppelghasts may join the HVT waves.',
      save: 'Unsafe after candle progress begins.',
      prep: ['Avoid throwing equipment into Mimic shock bursts.', 'Brain Rot is the cleanest ammo mod for the trial.'],
    },
    {
      id: 'dragon-wings', map: 'ashes', tier: 'Grim', name: 'Dragon Wings', difficulty: 'Easy',
      effect: 'Standard power-up drops stop appearing, including special-round ammo drops.',
      unlock: [
        'Reach round 20.',
        'Ride the jump pad from Vandorn Farm toward Janus Towers.',
        'While airborne, shoot the three purple targets in one clean pass with a bullet weapon.',
        'Do not save after the target sequence lands.',
      ],
      portal: 'Northwest side of the Farmhouse.',
      trial: 'Power-ups become hazards; touching them deals damage. Build progress on waves 1 and 3, then clear Mimic HVTs on waves 2 and 4.',
      save: 'Unsafe after the airborne target sequence.',
      prep: ['Raise look sensitivity before the jump if the targets feel too tight.', 'Bring a light, fast-handling bullet weapon.', 'Once inside the trial, give every power-up a wide berth.'],
    },
    {
      id: 'teddy-bear', map: 'ashes', tier: 'Grim', name: 'Teddy Bear', difficulty: 'Easy',
      effect: 'The pause between rounds is heavily shortened.',
      unlock: [
        'Reach round 20.',
        'Use Aether Shroud, then collect ten Mr. Peeks dolls with the Necrofluid Gauntlet while the shroud is active.',
        'Use this route checklist: Janus Tower Plaza gate, Blackwater Lake Speed Cola bathroom, Lost Cabins/Ashwood route cabin, Ashwood Church, Rabbit Alley, Vandorn Farm, both Zarya Cosmodrome spots, the Grounded Ship route, and the Exit 115 gantry.',
        'Start and finish the bear hunt in one session.',
      ],
      portal: 'Vandorn Farm, on the south wall of the Mystery Box building.',
      trial: 'Every shot spends essence. Build progress on waves 1 and 3, then clear Mimic HVTs on waves 2 and 4.',
      save: 'Unsafe once the bear hunt starts.',
      prep: ['Power Keg and Field Upgrade recharge routes reduce how many cycles the doll hunt takes.', 'The Necrofluid Gauntlet keeps the trial cheap.', 'Spend or stage essence before entering, because gunfire drains points quickly.'],
    },
    {
      id: 'gong', map: 'astra', tier: 'Grim', name: 'Gong', difficulty: 'Easy',
      effect: 'Field Upgrades no longer recharge over time; Full Power becomes the main refill source.',
      unlock: [
        'Reach round 20.',
        'Find rod-marked zombies and kill one near each charged bulb.',
        'Use the bulbs above the Pack-a-Punch doorway toward the portal, the Luminarium doorway near Juggernog, and the Machina Astralis or library doorway by the Mars route.',
        'Place the rod zombie just in front of the bulb before killing it.',
      ],
      portal: 'Outside Pack-a-Punch, left of the Gobblegum machine.',
      trial: 'Only electric damage counts. Build progress on waves 1 and 3; expect Klaus pressure on wave 2 and an Uber Klaus threat on wave 4.',
      save: 'Safe, but rod-zombie progress must be repeated after loading back in.',
      prep: ['Dead Wire with Light Strike and Haste makes the bulb setup more reliable.', 'Tesla Storm with duration or radius augments can cover mistakes during the setup.', 'Ping the rod zombie if you need to track it through a crowd.'],
    },
    {
      id: 'seed', map: 'astra', tier: 'Grim', name: 'Seed', difficulty: 'Easy',
      effect: 'The Mystery Box is disabled.',
      unlock: [
        'Reach round 20 and pick up the grey pistol.',
        'Kill exactly the same number of enemies as the round number when the pistol was collected.',
        'Potential pistol spots include the Observatory Dome, Luminarium, Machina Astralis bar, and Archives of Orbis bookshelf area.',
        'Stop using the pistol as soon as the target count is reached, finish the round with another weapon, and wait for the portal.',
      ],
      portal: 'Observatory Dome, left side near the Ammo Cache.',
      trial: 'Fight through four waves with a Pack-a-Punch I pistol. Waves 1 and 3 are progress waves; HVT waves can include Klaus units, a Mimic, and an Uber Klaus.',
      save: 'Unsafe; the pistol can disappear after a reload.',
      prep: ['Avoid passive kill sources like Elemental Pop or Wisp Tea while counting.', 'Rarity upgrades and Insta-Kill help, but stop using the pistol the moment the kill count matches the round.', 'Use the weapon stats menu to confirm the pistol kill count.'],
    },
    {
      id: 'rocket', map: 'paradox', tier: 'Grim', name: 'Rocket Relic', difficulty: 'Medium',
      effect: 'Scorestreaks cannot be used.',
      unlock: [
        'Before round 20, pet a turned Rad Hound in past Nuketown.',
        'On round 20, move to future Nuketown and pet a D.A.W.G. scorestreak.',
        'Psych Grenades are the most reliable way to create a safe pet window.',
      ],
      portal: 'Past Nuketown, upstairs in Green House while facing south.',
      trial: 'Enemies only take meaningful damage from elemental weaknesses. Progress waves are 1 and 3; HVT waves usually mix Rad Hounds, Doppelghasts, and Mimics.',
      save: 'Unsafe; pet progress does not persist cleanly.',
      prep: ['Carry separate ammo mods: Shadow Rift for toxic zombies, Light Mend for Doppelghasts, and Brain Rot for Mimics.', 'Psych Grenades help create a safer Rad Hound pet window.', 'Golden Armor, a self-revive, and Aether Shroud give the trial breathing room.'],
    },
    {
      id: 'power-switch', map: 'totenreich', tier: 'Grim', name: 'Power Switch', difficulty: 'Very Easy',
      effect: 'Your lethal and tactical equipment loadout changes at the start of each round.',
      unlock: [
        'Bring a Combat Axe; a scoped weapon helps read the distant altar skull counts.',
        'Read the deer-head altars, then strike the matching bear pelts with a Combat Axe in the correct order.',
        'Use the altars at Eidskallen Landing, Dry Dock, Tyr\'s Foot, and Burial Grounds.',
        'The closest pelt to each altar represents that altar in the sequence.',
      ],
      portal: 'Blodheim Hall, south-wall bear pelt.',
      trial: 'Trap kills only. Use the map machinery through the short three-wave trial.',
      save: 'Safe.',
      prep: ['Bank at least 10,000 essence so repeated Flammenfalle trap activations do not strand the run.', 'If the altar read is unclear, the pelt order has only twenty-four possible combinations.'],
    },
    {
      id: 'wrestlers-belt', map: 'totenreich', tier: 'Grim', name: "Wrestler's Belt", difficulty: 'Unknown',
      status: 'pending',
      effect: 'Wall-buy weapons randomize each round; the unlock route is still unconfirmed.',
      unlock: ['No reliable unlock route is filed yet. Keep this slot marked pending until the trigger is pinned down.'],
      portal: 'Unknown.',
      trial: 'Unknown.',
      save: 'Unknown.',
      prep: ['Treat this relic as an unfinished entry until the wall-buy randomization trigger has a consistent route.'],
    },
    {
      id: 'vril-sphere', map: 'ashes', tier: 'Sinister', name: 'Vril Sphere', difficulty: 'Easy',
      effect: 'The perk limit drops to four unless another reward bypasses the cap.',
      unlock: [
        'Reach round 40.',
        'Damage a Doppelghast without killing it.',
        'Lead it onto any jump pad and launch with it so the landing finishes the enemy.',
      ],
      portal: 'Zarya Cosmodrome, high middle road while looking east.',
      trial: 'Purchases are disabled during the arena. Waves 1, 3, and 4 build progress; waves 2 and 5 bring Mimic and Doppelghast HVT pressure.',
      save: 'Safe before round 40.',
      prep: ['Open doors, buy essentials, and craft equipment before entering.', 'A Pack-a-Punch III Necrofluid Gauntlet can carry most of the trial.'],
    },
    {
      id: 'samanthas-drawing', map: 'ashes', tier: 'Sinister', name: "Samantha's Drawing", difficulty: 'Easy',
      effect: 'Your weapon is exchanged each round for a comparable rarity and Pack-a-Punch level.',
      unlock: [
        'Before round 40, feed Chompy one weapon from each rarity tier from common through legendary.',
        'On round 40 or later, place a Wonder Weapon into the Chompy bin.',
        'Start with a grey pistol early so the lowest rarity is out of the way.',
      ],
      portal: 'Zarya Cosmodrome, along the path toward Yuri\'s Lab.',
      trial: 'Ammo Caches and Max Ammo drops are unavailable. Waves 1, 3, and 4 build progress; waves 2 and 5 can lean heavily on Doppelghast HVTs.',
      save: 'Unsafe once Chompy progress has started.',
      prep: ['Feed a grey pistol early so the lowest rarity is finished before the round climb.', 'Listen for the Chompy audio cue before committing a weapon.', 'Mule Kick ammo reserves make the trial more forgiving.'],
    },
    {
      id: 'focusing-stone', map: 'ashes', tier: 'Sinister', name: 'Focusing Stone', difficulty: 'Easy',
      effect: 'Self-revive kits are disabled.',
      unlock: [
        'Reach round 40.',
        'Kill a Zursa with a knife as the final hit and collect the wine bottle.',
        'Complete a legendary TEDD task and collect the second bottle near the task reward.',
        'Set both bottles at the Blackwater Lake wine bar, watch the burst order, then shoot the bottles in that order.',
      ],
      portal: 'Zarya Cosmodrome, beneath the rocket while facing west.',
      trial: 'Your essence is removed when the trial begins. Waves 1, 3, and 4 build progress; waves 2 and 5 can bring Doppelghast and Mimic HVTs.',
      save: 'Safe before round 40.',
      prep: ['Watch the bottle sequence immediately after placing them.', 'The second bottle can spawn near the TEDD reward rather than directly on it.', 'A Pack-a-Punch III Necrofluid Gauntlet keeps the no-essence trial simple.'],
    },
    {
      id: 'spider-fang', map: 'astra', tier: 'Sinister', name: 'Spider Fang', difficulty: 'Hard',
      effect: 'Perk prices stop falling over time.',
      unlock: [
        'Keep the main quest untouched.',
        'Use Wisp Tea so a wisp is active on OSCAR.',
        'Land the final hit on OSCAR with melee while the wisp condition is active.',
      ],
      portal: 'Archives of Orbis, opposite Stamin-Up.',
      trial: 'All perks are stripped when the trial starts. Waves 1, 3, and 4 build progress; wave 2 can bring Uber Klaus, and wave 5 can bring OSCAR.',
      save: 'Unsafe once OSCAR health setup is underway.',
      prep: ['Use Wisp Tea augments that keep the wisp from killing normal zombies and extend its window.', 'Do not advance the main quest before attempting the OSCAR setup.', 'Use a legendary Pack-a-Punch III knife, with Idle Eyes, Insta-Kill, or Time Out ready for the final-hit window.', 'The Apogee Annihilator and War Machines help lower HVT health during the trial.'],
    },
    {
      id: 'matryoshka-doll', map: 'astra', tier: 'Sinister', name: 'Matryoshka Doll', difficulty: 'Easy',
      effect: 'Salvage drops are cut down.',
      unlock: [
        'Open the Mars portal before round 40 if possible.',
        'On Mars, place C4 on the three meat piles around the lower center stage.',
        'Train a large group onto the stage and detonate the C4 together.',
      ],
      portal: 'Machina Astralis, by the Cryopod.',
      trial: 'Kills only count while a Field Upgrade is active. Waves 1, 3, and 4 build progress; later HVT waves can include Uber Klaus and OSCAR.',
      save: 'Safe after Mars is open and before round 40.',
      prep: ['Aether Shroud and Frenzied Guard are the easiest Field Upgrade choices for the trial.'],
    },
    {
      id: 'summoning-key', map: 'paradox', tier: 'Sinister', name: 'Summoning Key', difficulty: 'Medium',
      effect: 'Enemies explode when killed, and the blast can hurt you.',
      unlock: [
        'Throw a grenade into the broken chimney beside the Destroyed Nuketown clock and pick up the key.',
        'On a dog round, use a grey or green Brain Rot pistol in the Yellow House backyard to turn a dog and collect the ball it digs up.',
        'On round 40 or later, down yourself in the Green House backyard grave area, then place the collar and ball at the grave.',
      ],
      portal: 'Yellow House, southwest outside wall.',
      trial: 'Each wave has a timer; every enemy must die before time expires. Waves 1, 3, and 4 build progress, while waves 2 and 5 can mix Rad Hounds with Doppelghast HVTs.',
      save: 'Unsafe after collecting the key.',
      prep: ['Equivalent Exchange or Aftertaste can protect the intentional down.', 'A low-rarity Brain Rot pistol is less likely to kill the dog before it digs up the ball.', 'Ray Gun, Kazimirs, Free Throw, and War Machine pressure are excellent for timed clears.'],
    },
    {
      id: 'stuffed-elephant', map: 'totenreich', tier: 'Sinister', name: 'Stuffed Elephant', difficulty: 'Medium',
      effect: 'Health regeneration takes longer to begin.',
      unlock: [
        'Reach round 40 without buying perks.',
        'Perkaholic before the round counter appears may work, but do not rely on it for a clean run.',
      ],
      portal: 'Fishery Island, southeast corner behind the eastern building.',
      trial: 'Find cursed eggs, destroy them, and kill the HVT before the timer ends. Expect the objective to rotate through Necropincer, Doppelghast, Amalgam, and Zursa targets.',
      save: 'Unsafe; complete the no-perk run in one session.',
      prep: ['Look for eggs at Beacon Island/Lighthouse, Skallen Market, Storm Bridge near Tyr\'s Foot, and the Dry Dock Mystery Box room.', 'Toxic Growth and a high-tier Jotunn Star make the no-perk climb safer.', 'Do not take perks from machines, GobbleGums, TEDD Tasks, or Mr. Peeks if you want the reliable portal spawn.'],
    },
    {
      id: 'dancing-arnie', map: 'totenreich', tier: 'Sinister', name: 'Dancing Arnie', difficulty: 'Easy',
      effect: 'Perk machines become cursed and dispense random perks.',
      unlock: [
        'Bring the recipe items to the Blodheim Hall firepit in order.',
        'Collect the pot under the southwest Skallen Market food stand, ale near the Eidskallen Square to Fishery Island zipline porch, Chili Chunks from the crate behind the truck on the bridge, a Necropincer claw from a fire-trap kill, and a round-40 fish from the fishing rod.',
        'After placing the ingredients, feed souls to the dancing Mr. Peeks with Jotunn Star kills until the portal spawns.',
      ],
      portal: 'Fishery Island, northeast corner opposite the Mystery Box spot.',
      trial: 'Melee kills only. Waves 1, 3, and 4 build progress; HVT waves can bring Necropincers first, then Necropincer and Zursa pressure later.',
      save: 'Unsafe once the recipe chain begins.',
      prep: ['Get the Chili Chunks from the bridge crate before the truck can create progression conflicts.', 'Melee Macchiato speed and backpedal augments help the trial flow.', 'Golden Armor and a Pack-a-Punch IV Jotunn Star make the melee-only trial much safer.'],
    },
    {
      id: 'bus', map: 'ashes', tier: 'Wicked', name: 'Bus', difficulty: 'Medium',
      effect: 'Enemy health regenerates.',
      unlock: [
        'Reach round 60.',
        'Complete a full round without taking damage or personally killing enemies with weapons or equipment.',
        'The trigger is picky, so keep the attempt clean: take no damage, avoid personal kills, and use a Ravager round if possible.',
      ],
      portal: 'Blackwater Lake, north side of the boathouse.',
      trial: 'Only Brain-Rotted allies can damage enemies. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Doppelghast and Zursa HVTs, with Mimics possible.',
      save: 'Safe before round 60.',
      prep: ['Use the safest no-damage route your patch allows; Tessie on a Ravager round is the least exposed option if trap-only runs fail.', 'Avoid weapon fire, melee, equipment, Field Upgrades, and PhD damage during the clean round.', 'Brain Rot augments that improve area damage and trigger rate speed up the trial.'],
    },
    {
      id: 'dragon', map: 'ashes', tier: 'Wicked', name: 'Dragon', difficulty: 'Hard',
      effect: 'Ammo crates are disabled.',
      unlock: ['Reach round 60 or later, then complete the Cursed boss fight.'],
      portal: 'Blackwater Lake, southeast wall of the south cabin.',
      trial: 'Explosive damage only. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Doppelghast and Zursa HVTs, with Mimics possible.',
      save: 'Safe before round 60.',
      prep: ['Build perks early and try to make Quick Revive permanent.', 'For the boss, bring Kazimirs or Monkeys so Tessie repairs do not spiral.', 'PhD Flopper protection, Ray Gun, Kazimirs, and War Machines are the trial core.'],
    },
    {
      id: 'blood-vials', map: 'ashes', tier: 'Wicked', name: 'Blood Vials', difficulty: 'Medium',
      effect: 'All augments are disabled.',
      unlock: [
        'On rounds 20, 30, 40, 50, and 60, locate a ringing phone and answer it before ending the round.',
        'Possible phones include Janus Towers server room, Zarya control room, Blackwater Lake tool shed, Vandorn Farm first floor, Ashwood market, Exit 115 service areas, and Lost Cabins.',
      ],
      portal: 'Blackwater Lake, inside the cabin while facing west.',
      trial: 'Weapon damage is reduced by half. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Doppelghast and Zursa HVTs, with Mimics possible.',
      save: 'Unsafe once the phone chain begins.',
      prep: ['Hold several zombies on rounds 20, 30, 40, 50, and 60 while searching for the ringing phone.', 'Use jump-pad routes to listen across the map, and kill a held zombie periodically if the round is at risk of flipping.', 'Wonder Weapons and War Machines still handle the reduced-damage HVTs well.'],
    },
    {
      id: 'golden-spork', map: 'astra', tier: 'Wicked', name: 'Golden Spork', difficulty: 'Medium',
      effect: 'Incoming enemy damage is doubled.',
      unlock: [
        'Open the Mars portal before round 60.',
        'After round 60, gather a large Mars horde on the ritual-circle area.',
        'Fire the Mangler Cannon at the portal and use decoys to keep the horde on the circle as the blast resolves.',
      ],
      portal: 'Crash Site, north of Quick Revive on the wall right of the Gobblegum machine.',
      trial: 'Only hip-fire damage counts. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Klaus, Mimic, Uber Klaus, and OSCAR HVT pressure.',
      save: 'Safe after Mars is open and before round 60.',
      prep: ['Carry several decoys for the Mangler Cannon setup.', 'Pack-a-Punch III LGM-1 and Ray Gun hip-fire well.', 'War Machines do not satisfy the hip-fire rule.'],
    },
    {
      id: 'civil-protector', map: 'astra', tier: 'Wicked', name: 'Civil Protector', difficulty: 'Medium',
      effect: 'After enough eliminations, one perk is removed.',
      unlock: [
        'Activate Tessie with Energy Mine and pull one zombie near the car.',
        'Read the headlight flash code.',
        'Use PhD Flopper under the matching chandeliers: front-left is above Crafting, front-right above Ammo Cache, back-left above the left Crash Site entrance, and back-right above the right Crash Site entrance by Speed Cola.',
      ],
      portal: 'Crash Site, upper level by Quick Revive on the left wall before the left door.',
      trial: 'Every zombie sprints. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Klaus, Mimic, Uber Klaus, and OSCAR HVT pressure.',
      save: 'Safe before round 60.',
      prep: ['Hold four or five zombies to read the Tessie headlight code calmly.', 'Idle Eyes or Time Out can make the chandelier setup safer if the lobby is messy.', 'Stamin-Up speed augments and the Apogee Annihilator help keep distance.'],
    },
    {
      id: 'mangler-helmet', map: 'paradox', tier: 'Wicked', name: 'Mangler Helmet', difficulty: 'Very Hard',
      effect: 'The Arsenal is disabled.',
      unlock: [
        'Do not run the Seed relic while setting this up.',
        'Charge Mr. Peeks, then spin the Mystery Box in both Past and Destroyed Nuketown until the bunny appears.',
        'Use the Field Upgrade, take each bunny, and place them on the matching Yellow House mailboxes.',
        'On round 60 or later, take the ultra knife from a mailbox and kill the HVT Mimic using only that knife.',
      ],
      portal: 'Destroyed Nuketown, Green House balcony.',
      trial: 'Survive six waves with reduced health and no armor. Waves 1, 2, 4, and 5 build progress; waves 3 and 6 can bring Doppelghast and Rad Hound HVTs.',
      save: 'Safe before round 60, but the Mystery Box bunny sequence must be repeated after a reload.',
      prep: ['Ray Gun or Sundergat should stay in hand whenever possible.', 'Make Quick Revive with Dying Wish permanent before attempting the trial.', 'Extra health, Free Throw, Mask of Distraction, PhD slide movement, Kazimirs, and War Machines are all high-value safety tools.'],
    },
    {
      id: 'agarthan-device', map: 'totenreich', tier: 'Wicked', name: 'Agarthan Device', difficulty: 'Medium-Hard',
      effect: 'The map rotates a different zombie variant into each round.',
      unlock: [
        'Play as Richtofen.',
        'Use the ARC-XD route into the Group 935 Genetic Lab, solve the labeled-jar puzzle, make the Necrospike, and pick up the handheld radio from the cell.',
        'Use Tyr\'s Head exits until you collect Mr. Peeks from Ava\'s room and the helmet from the Requiem corpse room.',
        'On round 15 or later, buy Melee Macchiato, open the Core Foundry barrel to start the Richtofen side sequence, then place the items on the chair once Von List leaves it.',
      ],
      portal: 'Dry Dock, upper west wall opposite the zipline.',
      trial: 'Enemies only count when killed indoors. Waves 1, 2, 4, and 5 build progress; later HVT waves can include Necropincers, Doppelghasts, and Zursa.',
      save: 'Unsafe after the Richtofen side-quest setup is completed.',
      prep: ['The portal can currently be opened early, but the trial still uses round-60 health.', 'Either hold upstairs Lighthouse with Toxic Growth or train patiently and pull HVTs indoors for the kill.', 'Free Throw, Mask of Distraction, PhD slide movement, and War Machines are strong safety tools.'],
    },
    {
      id: 'music-box', map: 'totenreich', tier: 'Wicked', name: 'Music Box', difficulty: 'Hard',
      effect: 'Enemies only die to critical kills.',
      unlock: [
        'Reach round 60.',
        'Enter Tyr\'s Head and land five headshot kills in one visit.',
        'A scoped Shadow SK plus Temporal Gift and Kill Joy creates the cleanest one-minute headshot window.',
      ],
      portal: 'Dry Dock, far west by the blocked staircase near Fjord Road.',
      trial: 'Activate six holdout circles marked by purple beams, then survive as each safe zone shrinks. The route runs Fishery Island, Tyr\'s Foot, Dry Dock, Beacon Island, Eidskallen Square, then Skallen Market.',
      save: 'Safe before round 60.',
      prep: ['For solo headshots, stack a horde near Skallen Market with decoys, then use Kill Joy and Idle Eyes before entering Tyr\'s Head.', 'Cache Back, Shields Up, Kill Joy, and Kazimirs smooth the later holdouts.', 'Expect the later circles to be small and Necropincer-heavy.'],
    },
  ];

  bo7EasterEggs.forEach((ee) => {
    const map = maps.find((m) => m.id === ee.map);
    if (map) map.eeCount = Math.max(map.eeCount || 0, 1);
  });
  classicEasterEggs.forEach((ee) => {
    const map = maps.find((m) => m.id === ee.map);
    if (map) map.eeCount = Math.max(map.eeCount || 0, 1);
  });
  relics.forEach((relic) => {
    const map = maps.find((m) => m.id === relic.map);
    if (map) map.relicCount = Math.max(map.relicCount || 0, relics.filter((item) => item.map === relic.map).length);
  });

  // Relics are a BO7-only mechanic. Zero out BO6 (was an earlier guess).
  maps.forEach((m) => { if (m.game === 'bo6') m.relicCount = 0; });

  // Additional map pages for folders that already have local imagery.
  // These sit here as augmentations so the original seed list stays readable.
  const extraMaps = [
    { id: 'five', game: 'bo1', name: 'Five', location: 'The Pentagon, Washington D.C., 1963', difficulty: 3, eeCount: 0, relicCount: 0, summary: '', tags: ['pentagon', 'classic', 'defcon'] },
    { id: 'callofthedead', game: 'bo1', name: 'Call of the Dead', location: 'Siberian coast, 2011', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['celebrity-crew', 'siberia', 'vril'] },
    { id: 'shangri', game: 'bo1', name: 'Shangri-La', location: 'Himalayan jungle temple', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['temple', 'vril', 'time-loop'] },
    { id: 'tranzit', game: 'bo2', name: 'TranZit', location: 'Hanford, Washington, post-Moon Earth', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['victis', 'bus-route', 'tower'] },
    { id: 'dierise', game: 'bo2', name: 'Die Rise', location: 'Shanghai, post-Moon Earth', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['victis', 'vertical', 'tower'] },
    { id: 'buried', game: 'bo2', name: 'Buried', location: 'Angolan mine, post-Moon Earth', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['victis', 'western', 'final-tower'] },
    { id: 'thegiant', game: 'bo3', name: 'The Giant', location: 'Group 935 facility, 1945', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['primis', 'factory', 'teleporter'] },
    { id: 'zetsubou', game: 'bo3', name: 'Zetsubou No Shima', location: 'Pohnpei Island, Pacific theater', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['primis', 'division-9', 'swamp'] },
    { id: 'gorod', game: 'bo3', name: 'Gorod Krovi', location: 'Stalingrad, 1945', difficulty: 5, eeCount: 1, relicCount: 0, summary: '', tags: ['primis', 'dragons', 'stalingrad'] },
    { id: 'ix', game: 'bo4', name: 'IX', location: 'Roman coliseum, Chaos timeline', difficulty: 3, eeCount: 1, relicCount: 0, summary: '', tags: ['chaos', 'arena', 'trials'], crewIds: ['bruno','diego','scarlet','shaw'] },
    { id: 'voyage', game: 'bo4', name: 'Voyage of Despair', location: 'RMS Titanic, 1912', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['chaos', 'titanic', 'sentinel'], crewIds: ['bruno','diego','scarlet','shaw'] },
    { id: 'blood', game: 'bo4', name: 'Blood of the Dead', location: 'Alcatraz pocket dimension', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['primis', 'alcatraz', 'cycle'], crewIds: ['dempsey','nikolai','takeo','richtofen'] },
    { id: 'dotn', game: 'bo4', name: 'Dead of the Night', location: 'Rhodes estate, England', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['chaos', 'manor', 'occult'], crewIds: ['bruno','diego','scarlet','shaw'] },
    { id: 'ancientevil', game: 'bo4', name: 'Ancient Evil', location: 'Delphi, Greece', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['chaos', 'delphi', 'gauntlets'], crewIds: ['bruno','diego','scarlet','shaw'] },
    { id: 'tag', game: 'bo4', name: 'Tag der Toten', location: 'Siberian facility', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['aether', 'siberia', 'finale'], crewIds: ['marlton','misty','russman','stuhlinger'] },
    { id: 'shatteredveil', game: 'bo6', name: 'Shattered Veil', location: 'Liberty Falls perimeter, 1991', difficulty: 4, eeCount: 1, relicCount: 0, summary: '', tags: ['bo6', 'mansion', 'breach'] },
    { id: 'reckoning', game: 'bo6', name: 'The Reckoning', location: 'Janus facility, 1991', difficulty: 5, eeCount: 1, relicCount: 0, summary: '', tags: ['bo6', 'facility', 'finale'] },
  ];
  extraMaps.forEach((entry) => {
    if (!maps.some((m) => m.id === entry.id)) maps.push(entry);
  });
  const mobMap = maps.find((m) => m.id === 'mob');
  if (mobMap) mobMap.game = 'bo2';
  const canonOrder = [
    'nacht','verruckt','shino','derriese',
    'kino','five','ascension','callofthedead','shangri','moon',
    'tranzit','dierise','mob','buried','origins',
    'shadows','thegiant','eisendrache','zetsubou','gorod','revelations',
    'ix','voyage','blood','dotn','ancientevil','tag',
    'diemaschine','firebase','mauer','forsaken',
    'terminus','liberty','citadelle','tomb','shatteredveil','reckoning',
    'ashes','astra','paradox','totenreich',
  ];
  maps.sort((a, b) => {
    const ai = canonOrder.indexOf(a.id);
    const bi = canonOrder.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  games.forEach((g) => {
    g.mapCount = Math.max(g.mapCount, maps.filter((m) => m.game === g.id).length);
  });

  // Songs: hidden tracks per map. { name, artist, activation }
  const mapSongs = {
    nacht:       [{ name: 'WTF', artist: 'Kevin Sherwood', activation: 'Activate the radio on the second floor.' }],
    verruckt:    [{ name: 'Lullaby of a Dead Man', artist: 'Kevin Sherwood', activation: 'Three meteor rocks hidden around the asylum.' }],
    shino:       [{ name: 'The One', artist: 'Elena Siegman', activation: 'Three meteor rocks in the swamp.' }],
    derriese:    [{ name: 'Beauty of Annihilation', artist: 'Elena Siegman', activation: 'Hold the action button on three teddy bears around the factory.' }],
    kino:        [{ name: '115', artist: 'Elena Siegman', activation: 'Three meteor rocks: spawn, dressing room, theater.' }],
    five:        [],
    ascension:   [{
      name: 'Abracadavre',
      artist: 'Elena Siegman',
      activation: 'Activate three teddy bears: one at Spawn, one near Stamin-Up, and one near Speed Cola.',
      activationShots: [
        ascensionShot('MusicEE_Spawn.png', 'Spawn teddy bear'),
        ascensionShot('MusicEE_NearStaminup.png', 'Teddy bear near Stamin-Up Lander'),
        ascensionShot('MusicEE_NearSpeedCola.png', 'Teddy bear near Speed Cola Lander'),
      ],
    }],
    callofthedead: [{
      name: 'Not Ready to Die',
      artist: 'Avenged Sevenfold',
      activation: 'Activate three meteor rocks: one at Spawn, one by PhD Flopper, and one in the ship diner below Power.',
      activationShots: [
        cotdShot('Music_Rock1.png', 'Music rock at Spawn', { objectFit: 'contain' }),
        cotdShot('Music_Rock2.png', 'Music rock by PhD Flopper', { objectFit: 'contain' }),
        cotdShot('MusicRock3.png', 'Music rock in the ship diner below Power', { objectFit: 'contain' }),
      ],
    }],
    shangri:     [{
      name: 'Pareidolia',
      artist: 'Elena Siegman & Kevin Sherwood',
      activation: 'Activate three meteor rocks: one at Spawn, one near the Juggernog or Speed Cola side of the mud room, and one in the Semtex cave.',
      activationShots: [
        shangriShot('ShangMusicRock1Spawn.png', 'Music rock at Spawn'),
        shangriShot('ShangMusicRockbyJugg2.png', 'Music rock by Juggernog'),
        shangriShot('ShangMusicRockPhD3.png', 'Music rock by PhD Flopper'),
      ],
    }],
    moon:        [{ name: 'Coming Home', artist: 'Elena Siegman', activation: 'Three teddy bears: tunnel, biodome, Area 51.' }],
    tranzit:     [{ name: 'Carrion', artist: 'Kevin Sherwood feat. Clark S. Nova', activation: 'Three teddy bears hidden along the bus route.' }],
    dierise:     [{ name: 'We All Fall Down', artist: 'Kevin Sherwood feat. Clark S. Nova', activation: 'Three teddy bears hidden across the towers.' }],
    mob:         [{ name: 'Where Are We Going?', artist: 'Kevin Sherwood feat. Malukah', activation: 'Three skulls hidden in the prison.' }],
    buried:      [{ name: 'Always Running', artist: 'Elena Siegman & Kevin Sherwood', activation: 'Three teddy bears around the underground town.' }],
    origins:     [{ name: 'Archangel', artist: 'Elena Siegman & Kevin Sherwood', activation: 'Three gramophones found across the dig site.' }],
    shadows:     [{ name: 'Snakeskin Boots', artist: 'Kevin Sherwood', activation: 'Three ritual altars around Morg City.' }],
    thegiant:    [{ name: 'Beauty of Annihilation (Brian Tuey Remix)', artist: 'Kevin Sherwood & Brian Tuey', activation: 'Three green jars hidden around the facility.' }],
    eisendrache: [{ name: 'Dead Again', artist: 'Elena Siegman & Kevin Sherwood', activation: 'Three teddy bears around the castle.' }],
    zetsubou:    [{ name: 'Dead Flowers', artist: 'Elena Siegman & Kevin Sherwood', activation: 'Three items around the island.' }],
    gorod:       [
      { name: 'Dead Ended', artist: 'Kevin Sherwood', activation: 'Three items around the map.' },
      { name: 'Ace of Spades', artist: 'Motörhead', activation: 'Bonus song activation.' },
    ],
    revelations: [{ name: 'The Gift', artist: 'Elena Siegman & Kevin Sherwood', activation: 'Three items across the patchwork map.' }],
    ix:          [{ name: 'Mad Hatter', artist: 'Avenged Sevenfold', activation: 'Three items around the arena.' }],
    voyage:      [{ name: 'Drowning', artist: 'Kevin Sherwood', activation: 'Three items around the Titanic.' }],
    blood:       [{ name: 'Where Are We Going? (2018)', artist: 'Kevin Sherwood feat. Malukah', activation: 'Three items in the prison.' }],
    dotn:        [{ name: 'Mystery', artist: 'Kevin Sherwood', activation: 'Three items around the manor.' }],
    ancientevil: [{ name: 'Stormbound', artist: 'Kevin Sherwood', activation: 'Three items around Delphi.' }],
    tag:         [{ name: 'A Light from the Shore', artist: 'Kevin Sherwood', activation: 'Three hidden items around the Siberian outpost.' }],
    diemaschine: [{ name: 'Alone', artist: 'Kevin Sherwood', activation: 'Three teddy bears around Projekt Endstation.' }],
    firebase:    [{
      name: 'Lost',
      artist: 'Kevin Sherwood',
      activation: 'Collect three cassette tapes: one in the Motor Pool, one in Equipment Storage, and one in the Scientists Quarters.',
      activationShots: [
        firebaseZShot('MotorPoolMusicTape.png', 'Music tape in the Motor Pool', { objectFit: 'contain' }),
        firebaseZShot('equipmentstoragemusictape2.png', 'Music tape in Equipment Storage', { objectFit: 'contain' }),
        firebaseZShot('ScientistsQuartersMusicTape.png', 'Music tape in Scientists Quarters', { objectFit: 'contain' }),
      ],
    }],
    mauer:       [],
    forsaken:    [],
    terminus:    [{ name: 'Can You Hear Me? (Come In)', artist: 'Kevin Sherwood', activation: 'Three items around the prison island.' }],
    liberty:     [{ name: 'Destroy Something Beautiful', artist: 'Kevin Sherwood', activation: 'Three items around town.' }],
    citadelle:   [{ name: 'Slave', artist: 'Kevin Sherwood', activation: 'Three items around the castle.' }],
    shatteredveil: [{ name: 'Falling to Pieces', artist: 'Kevin Sherwood', activation: 'Three items around the manor.' }],
    reckoning:   [{ name: 'Remember Us', artist: 'Kevin Sherwood', activation: 'Three items around the facility.' }],
    tomb:        [{ name: 'Dig', artist: 'Kevin Sherwood', activation: 'Three items around the excavation site.' }],
    ashes:       [{ name: 'Turn to Ashes', artist: 'Kevin Sherwood', activation: 'Three items around the ruins.' }],
    astra:       [
      { name: 'Pareidolia (Remastered 2025)', artist: 'Kevin Sherwood', activation: 'Three items around the observatory.' },
      { name: 'Magic', artist: 'Avenged Sevenfold', activation: 'Bonus song activation.' },
    ],
    paradox:     [{ name: 'Come Back Down', artist: 'Kevin Sherwood', activation: 'Three items around the station.' }],
    totenreich:  [{ name: 'No One There', artist: 'Kevin Sherwood', activation: 'Three items around the realm.' }],
  };
  Object.entries(mapSongs).forEach(([id, songs]) => {
    const m = maps.find((x) => x.id === id);
    if (m) m.songs = songs;
  });
  const songVideoLinks = {
    'nacht:WTF': 'https://www.youtube.com/watch?v=IT57qmKyRPk&list=PLUXGoRjA8fBwn0GGq2Y6fmNfUui6cmT0D',
    'verruckt:Lullaby of a Dead Man': 'https://www.youtube.com/watch?v=MNIoDGrWx3c&list=PLUXGoRjA8fBwn0GGq2Y6fmNfUui6cmT0D&index=4',
    'shino:The One': 'https://www.youtube.com/watch?v=MAGYDBcJke8&list=RDMAGYDBcJke8&start_radio=1',
    'derriese:Beauty of Annihilation': 'https://www.youtube.com/watch?v=LAUOpUsR7ME&list=RDLAUOpUsR7ME&start_radio=1',
    'kino:115': 'https://www.youtube.com/watch?v=bOcXB_Kj0BE&list=RDbOcXB_Kj0BE&start_radio=1',
    'ascension:Abracadavre': 'https://www.youtube.com/watch?v=Bevws2UDtpw&list=RDBevws2UDtpw&start_radio=1',
    'callofthedead:Not Ready to Die': 'https://www.youtube.com/watch?v=4Gj6V59abDA&list=RD4Gj6V59abDA&start_radio=1',
    'shangri:Pareidolia': 'https://www.youtube.com/watch?v=O7YAHQQQkcQ&list=RDO7YAHQQQkcQ&start_radio=1',
    'moon:Coming Home': 'https://www.youtube.com/watch?v=8CbpYqBJ9T8&list=RD8CbpYqBJ9T8&start_radio=1',
    'tranzit:Carrion': 'https://www.youtube.com/watch?v=dhPHMdYOSwQ&list=RDdhPHMdYOSwQ&start_radio=1',
    'dierise:We All Fall Down': 'https://www.youtube.com/watch?v=hEaGpgVy71s&list=RDhEaGpgVy71s&start_radio=1',
    'mob:Where Are We Going?': 'https://www.youtube.com/watch?v=SR6_J1IVvlg&list=RDSR6_J1IVvlg&start_radio=1',
    'buried:Always Running': 'https://www.youtube.com/watch?v=MyAGNdghwrw&list=RDMyAGNdghwrw&start_radio=1',
    'origins:Archangel': 'https://www.youtube.com/watch?v=EVyS9hoQJiQ&list=RDEVyS9hoQJiQ&start_radio=1',
    'thegiant:Beauty of Annihilation (Brian Tuey Remix)': 'https://www.youtube.com/watch?v=uIpTKRWEJzI&list=RDuIpTKRWEJzI&start_radio=1',
    'eisendrache:Dead Again': 'https://www.youtube.com/watch?v=jz31BVNSWFE&list=RDjz31BVNSWFE&start_radio=1',
    'zetsubou:Dead Flowers': 'https://www.youtube.com/watch?v=YOAPJ_MdvIE&list=RDYOAPJ_MdvIE&start_radio=1',
    'gorod:Dead Ended': 'https://www.youtube.com/watch?v=wmEU-VypsHo&list=RDwmEU-VypsHo&start_radio=1',
    'revelations:The Gift': 'https://www.youtube.com/watch?v=Rr3RAlsF2vY&list=RDRr3RAlsF2vY&start_radio=1',
    'blood:Where Are We Going? (2018)': 'https://www.youtube.com/watch?v=E7Sa6ZQRqFM&list=RDE7Sa6ZQRqFM&start_radio=1',
    'voyage:Drowning': 'https://www.youtube.com/watch?v=LohnjbvnpPk&list=RDLohnjbvnpPk&start_radio=1',
    'ix:Mad Hatter': 'https://www.youtube.com/watch?v=g8BN-Gu_IVk&list=RDg8BN-Gu_IVk&start_radio=1',
    'dotn:Mystery': 'https://www.youtube.com/watch?v=SzdJB5Li_DU&list=RDSzdJB5Li_DU&start_radio=1',
    'ancientevil:Stormbound': 'https://www.youtube.com/watch?v=m1zsbkEuCp0&list=RDm1zsbkEuCp0&start_radio=1',
    'tag:A Light from the Shore': 'https://www.youtube.com/watch?v=yn2LhulylnA&list=RDyn2LhulylnA&start_radio=1',
    'diemaschine:Alone': 'https://www.youtube.com/watch?v=FVdD_SZUv-w&list=RDFVdD_SZUv-w&start_radio=1',
    'firebase:Lost': 'https://www.youtube.com/watch?v=8jxXEQ_AkZM&list=RD8jxXEQ_AkZM&start_radio=1',
    'liberty:Destroy Something Beautiful': 'https://www.youtube.com/watch?v=FD7z2DVmeN8&list=RDFD7z2DVmeN8&start_radio=1',
    'terminus:Can You Hear Me? (Come In)': 'https://www.youtube.com/watch?v=zMX7uMCDH74&list=RDzMX7uMCDH74&start_radio=1',
    'citadelle:Slave': 'https://www.youtube.com/watch?v=KJt_uiQh0xE&list=RDKJt_uiQh0xE&start_radio=1',
    'tomb:Dig': 'https://www.youtube.com/watch?v=mIQmJW1uyEc&list=RDmIQmJW1uyEc&start_radio=1',
    'shatteredveil:Falling to Pieces': 'https://www.youtube.com/watch?v=BSiyX7D0Vk0&list=RDBSiyX7D0Vk0&start_radio=1',
    'reckoning:Remember Us': 'https://www.youtube.com/watch?v=vtD1qi8hJn8&list=RDvtD1qi8hJn8&start_radio=1',
    'ashes:Turn to Ashes': 'https://www.youtube.com/watch?v=nF1Rh3vdaeQ&list=RDnF1Rh3vdaeQ&start_radio=1',
    'astra:Pareidolia (Remastered 2025)': 'https://www.youtube.com/watch?v=s_jn6WhMFZs&list=RDs_jn6WhMFZs&start_radio=1',
    'astra:Magic': 'https://www.youtube.com/watch?v=SB4-aD4EdDc&list=RDSB4-aD4EdDc&start_radio=1',
    'paradox:Come Back Down': 'https://www.youtube.com/watch?v=SVJ4chMiBMw&list=RDSVJ4chMiBMw&start_radio=1',
    'totenreich:No One There': 'https://www.youtube.com/watch?v=g_AlO2pmAjE&list=RDg_AlO2pmAjE&start_radio=1',
  };
  maps.forEach((m) => {
    (m.songs || []).forEach((song) => {
      const videoUrl = songVideoLinks[m.id + ':' + song.name];
      if (videoUrl) song.videoUrl = videoUrl;
    });
  });

  // Local image folders mapped to their map pages. `hero` drives the detail
  // page, `thumb` drives cards, and `gallery` renders the extra frames.
  const mapMedia = {
    nacht:       { dir: 'World at War/Maps/Nacht Der Untoten', hero: 'Nacht_Thumbnail.png', thumb: 'Nacht_Thumbnail.png', gallery: ['Nacht1.png','Nacht2.png','Nacht3.png','Nacht4.png'] },
    verruckt:    { dir: 'World at War/Maps/Verruckt', hero: 'verruckt_LoadingSCreen.png', thumb: 'verruckt_Thumbnail.png', gallery: ['verruckt1.png','verruckt2.png','verruckt3.png','verruckt4.png','verruckt5.png','verruckt6.png'] },
    shino:       { dir: 'World at War/Maps/Shi No Numa', hero: 'ShiNo_LoadingSCreen.png', thumb: 'ShiNo_Thumbnail.png', gallery: ['ShiNo1.png','ShiNo2.png','ShiNo3.png','ShiNo4.png','ShiNo_Promo.png'] },
    derriese:    { dir: 'World at War/Maps/Der Riese', hero: 'DerRiese_Promo.png', thumb: 'DerRiese_Thumbnail.png', gallery: ['DerRiese1.png','DerRiese2.png','DerRiese3.png','DerRiese4.png','DerRiese5.png','DerRieseMap.png'] },
    kino:        { dir: 'Black Ops/Maps/Kino Der Toten', hero: 'Kino_Loading_Screen.png', thumb: 'Kino_1.png', gallery: ['Kino_1.png','Kino_2.png','Kino_3.png'] },
    five:        { dir: 'Black Ops/Maps/Five', hero: 'Five_1.png', thumb: 'Five_1.png', gallery: ['Five_1.png','Five_3.png'] },
    ascension:   { dir: 'Black Ops/Maps/Ascension', hero: 'Ascension_LoadingScreen.png', thumb: 'Ascension_Thumbnail.png', gallery: ['Ascension_1.png','Ascension_2.png','Ascension_3.png'] },
    callofthedead: { dir: 'Black Ops/Maps/Call of the Dead', hero: 'CotD_Poster.png', thumb: 'CotD_Thumbnail.png', gallery: ['CotD_LoadingScreen.png','CotD_1.png','CotD_2.png','CotD_3.png','CotD_4.png'] },
    shangri:     { dir: 'Black Ops/Maps/Shangri-La', hero: 'Shangri_La_LoadingScreen.png', thumb: 'Shangri_La_1.png', gallery: [
      { file: 'Shangri_La_1.png', label: 'Shangri-La temple approach' },
      { file: 'Shangri_La_3.png', label: 'Shangri-La ruins reference' },
      { file: 'ShangSunEclipseOff.png', label: 'Sun symbols before eclipse' },
      { file: 'ShangMoonEclipseOn.png', label: 'Moon symbols during eclipse' },
      { file: 'Shang_StairstoPap_EclipseOff.png', label: 'Pack-a-Punch stairs before eclipse' },
      { file: 'Shang_StairstoPap_EclipseOn.png', label: 'Pack-a-Punch stairs during eclipse' },
    ] },
    moon:        { dir: 'Black Ops/Maps/Moon', hero: 'Moon_LoadingScreen.png', thumb: 'Moon_Thumbnail.png', gallery: ['Moon_1.png','Moon_2.png','Moon_3.png','Moon_4.png'] },
    tranzit:     { dir: 'Black Ops 2/Maps/TranZit', hero: 'TranZit_1.png', thumb: 'TranZit_1.png', gallery: ['TranZit_1.png','TranZit_2.png','TranZit_3.png','TranZit_4.png','TranZit_5.png'] },
    dierise:     { dir: 'Black Ops 2/Maps/Die Rise', hero: 'Die_Rise1.png', thumb: 'Die_Rise1.png', gallery: ['Die_Rise1.png','Die_Rise2.png','Die_Rise3.png','Die_Rise4.png','Die_Rise5.png'] },
    mob:         { dir: 'Black Ops 2/Maps/Mob of the Dead', hero: 'MotD1.png', thumb: 'MotD1.png', gallery: ['MotD1.png','MotD2.png','MotD3.png','MotD4.png','MotD5.png'] },
    buried:      { dir: 'Black Ops 2/Maps/Buried', hero: 'Buried1.png', thumb: 'Buried1.png', gallery: ['Buried1.png','Buried2.png','Buried3.png','Buried4.png','Buried5.png'] },
    origins:     { dir: 'Black Ops 2/Maps/Origins', hero: 'Origins1.png', thumb: 'Origins1.png', gallery: ['Origins1.png','Origins2.png','Origins3.png','Origins4.png','Origins5.png'] },
    shadows:     { dir: 'Black Ops 3/Maps/Shadows of Evil', hero: 'SoE_Poster.png', thumb: 'SoE1.png', gallery: ['SoE1.png','SoE2.png','SoE3.png','SoE4.png','SoE5.png'] },
    thegiant:    { dir: 'Black Ops 3/Maps/The Giant', hero: 'The_Giant_Ultrawide.png', thumb: 'The_Giant_Thumbnail.png', gallery: ['The_Giant1.png','The_Giant2.png','The_Giant3.png','The_Giant4.png'] },
    eisendrache: { dir: 'Black Ops 3/Maps/Der Eisendrache', hero: 'Der_Eisendrache_Poster.png', thumb: 'DE1.png', gallery: ['DE1.png','DE2.png','DE3.png','DE4.png','DE5.png','DE6.png'] },
    zetsubou:    { dir: 'Black Ops 3/Maps/Zetsubou No Shima', hero: 'ZnS_Poster.png', thumb: 'ZnS1.png', gallery: ['ZnS1.png','ZnS2.png','ZnS3_Spider.png','ZnS4.png','ZnS5.png','ZnS6.png','ZnS7_Thrasher.png','NoJapanese.png'] },
    gorod:       { dir: 'Black Ops 3/Maps/Gorod Krovi', hero: 'GK_Poster.png', thumb: 'GK1.png', gallery: ['GK1.png','GK2.png','GK3.png','GK4.png','GK5.png','GK6.png'] },
    revelations: { dir: 'Black Ops 3/Maps/Revelations', hero: 'Rev_Poster.png', thumb: 'Rev1.png', gallery: ['Rev1.png','Rev2.png','Rev3.png','Rev4.png','Rev5.png','Rev6.png'] },
    ix:          { dir: 'Black Ops 4/Maps/IX', hero: 'IX_Poster.png', thumb: 'IX1.png', gallery: ['IX1.png','IX2.png','IX3.png','IX4.png','IX5.png','IX6.png'] },
    voyage:      { dir: 'Black Ops 4/Maps/Voyage of Despair', hero: 'VoD1.png', thumb: 'VoD1.png', gallery: ['VoD1.png','VoD2.png','VoD3.png','VoD4.png','VoD5.png'] },
    blood:       { dir: 'Black Ops 4/Maps/Blood of the Dead', hero: 'BloodPoster.png', thumb: 'BotD1.png', gallery: ['BotD1.png','BotD2.png','BotD3.png','BotD4.png','BotD5.png'] },
    dotn:        { dir: 'Black Ops 4/Maps/Dead of the Night', hero: 'DotN_Poster.png', thumb: 'DotN1.png', gallery: ['DotN1.png','DotN2.png','DotN3.png','DotN4.png','DotN5.png'] },
    ancientevil: { dir: 'Black Ops 4/Maps/Ancient Evil', hero: 'AE1.png', thumb: 'AE1.png', gallery: ['AE2.png','AE3.png','AE4.png','AE5.png','AE6.png'] },
    tag:         { dir: 'Black Ops 4/Maps/Tag Der Toten', hero: 'TagDerToten1_Poster.png', thumb: 'TagDerToten2.png', gallery: ['TagDerToten2.png','TagDerToten3.png','TagDerToten4.png','TagDerToten5.png','TagDerToten_TheEnd.png'] },
    diemaschine: { dir: 'Black Ops Cold War/Maps/Die Maschine', hero: 'DM1.png', thumb: 'DM1.png', gallery: ['DM2.png','DM3.png','DM4.png','DM5.png','DM6.png','DM7.png'] },
    firebase:    { dir: 'Black Ops Cold War/Maps/Firebase Z', hero: 'FBZ1.png', thumb: 'FBZ1.png', gallery: ['FBZ2.png','FBZ3.png','FBZ4.png','FBZ5.png','FBZ6.png','FBZ7.png'] },
    mauer:       { dir: 'Black Ops Cold War/Maps/Mauer Der Toten', hero: 'Mauer1.png', thumb: 'Mauer1.png', gallery: ['Mauer2.png','Mauer3.png','Mauer4.png','Mauer5.png','Mauer6.png'] },
    forsaken:    { dir: 'Black Ops Cold War/Maps/Forsaken', hero: 'Forsaken1.png', thumb: 'Forsaken1.png', gallery: ['Forsaken2.png','Forsaken3.png','Forsaken4.png','Forsaken5.png','Forsaken6.png','Forsaken_Margwa.png','Forsaken_The_Forsaken.png'] },
    terminus:    { dir: 'Black Ops 6/Maps/Terminus', hero: 'Terminus1.png', thumb: 'Terminus1.png', gallery: ['Terminus2.png','Terminus3.png','Terminus4.png','Terminus5.png','Terminus6.png','Terminus7.png','Terminus_Amalgum.png'] },
    liberty:     { dir: 'Black Ops 6/Maps/Liberty Falls', hero: 'LibertyFalls1.png', thumb: 'LibertyFalls1.png', gallery: ['LibertyFalls2.png','LibertyFalls3.png','LibertyFalls4.png','LibertyFalls5.png','LibertyFalls6.png'] },
    citadelle:   { dir: 'Black Ops 6/Maps/Citadelle Des Morts', hero: 'CDM1.png', thumb: 'CDM1.png', gallery: ['CDM2.png','CDM3.png','CDM4.png','CDM5.png','CDM6.png','CDM_BossFight.png'] },
    tomb:        { dir: 'Black Ops 6/Maps/The Tomb', hero: 'Tomb.png', thumb: 'Tomb.png', gallery: ['Tomb2.png','Tomb3.png','Tomb4.png','Tomb5.png','Tomb6.png','Tomb7.png'] },
    shatteredveil: { dir: 'Black Ops 6/Maps/Shattered Veil', hero: 'SV1.png', thumb: 'SV1.png', gallery: ['SV2.png','SV3.png','SV4.png','SV5.png','SV6.png','SV7.png'] },
    reckoning:   { dir: 'Black Ops 6/Maps/The Reckoning', hero: 'Reckoning1.png', thumb: 'Reckoning1.png', gallery: ['Reckoning2.png','Reckoning3.png','Reckoning4.png','Reckoning5.png','Reckoning6.png','Reckoning_Gorgofex.png','Reckoning_UberKlaus.png'] },
    ashes:       { dir: 'Black Ops 7/Ashes of the Damned', hero: 'AotD1.png', thumb: 'AotD1.png', gallery: ['AotD2.png','AotD3.png','AotD4.png','AotD5.png','AotD6.png','AotD7.png','AotD_Zursa.png'] },
    astra:       { dir: 'Black Ops 7/Astra Malorum', hero: 'Astra1.png', thumb: 'Astra1.png', gallery: ['Astra2.png','Astra3.png','Astra4.png','Astra5.png','Astra6.png','Astra7.png','Astra_Oscar.png'] },
    paradox:     { dir: 'Black Ops 7/Paradox Junction', hero: 'Paradox1.png', thumb: 'Paradox1.png', gallery: ['Paradox2.png','Paradox3.png','Paradox4.png','Paradox5.png','Paradox6.png'] },
    totenreich:  { dir: 'Black Ops 7/Totenreich', hero: 'Totenreich1.png', thumb: 'Totenreich1.png', gallery: ['Totenreich2.png','Totenreich3.png','Totenreich4.png','Totenreich5.png','Totenreich6.png','Totenreich7.png','Totenreich8.png','Totenreich9.png'] },
  };
  Object.entries(mapMedia).forEach(([id, media]) => {
    const m = maps.find((x) => x.id === id);
    if (m) m.media = media;
  });

  // Per-game richer metadata: long-form description + feature flags.
  // Add per-game custom sections by adding flags here and rendering them
  // in the <Game /> component in pack-a-punch.
  const gameMeta = {
    waw: {
      description: 'The WaW files are small because the outbreak still had the decency to look simple. Nacht, Verruckt, Shi No Numa, and Der Riese document the jump from survival incident to Group 935 infrastructure. By the factory, the machines are already named.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true },
    },
    bo1: {
      description: 'Black Ops is where the Aether story learns to leave fingerprints. The crew moves from theater to Pentagon, cosmodrome, temple, coast, and Moon while Samantha\'s reach turns every site into a test chamber.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true },
    },
    bo2: {
      description: 'Black Ops II splits the signal. Victis walks the ruined Earth under competing voices while Mob and Origins show the cycle from stranger angles: one prison that will not end, one battlefield where Primis begins.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true },
    },
    bo3: {
      description: 'Black Ops III is the soul hunt. Primis moves through cities, castles, islands, war zones, and the House, cutting pieces out of the old timeline until the cycle has nowhere left to hide.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true, hasGobblegums: true },
    },
    bo4: {
      description: 'Black Ops 4 is two files arguing in the same drawer. Aether folds toward Blood and Tag while Chaos follows artifacts, gods, and old orders through a mythology that does not need Group 935 to be dangerous.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true, hasElixirs: true },
    },
    cw: {
      description: 'Cold War opens the Dark Aether file with old Group 935 ground under new agencies. Requiem and Omega call it research, but every mission reads like containment after the fact.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true },
    },
    bo6: {
      description: 'Black Ops 6 treats the Dark Aether like a case that was never closed. Terminus, Liberty Falls, Citadelle, The Tomb, Shattered Veil, and Reckoning keep pulling old names through new doors.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: false, hasSongs: true, hasAugments: true },
    },
    bo7: {
      description: 'Black Ops 7 is the relic file. The maps read less like battlefields and more like structures built around missing pieces, with Totenreich sitting at the edge of whatever the Dark Aether is assembling.',
      features: { hasMainQuests: true, hasWonderWeapons: true, hasPerks: true, hasRelics: true, hasSongs: true, hasGobblegums: true },
    },
  };
  Object.entries(gameMeta).forEach(([id, meta]) => {
    const g = games.find((x) => x.id === id);
    if (g) Object.assign(g, meta);
  });

  // Which characters appear in which games (best-effort canon mapping).
  // Used by the Game detail page's "Crew of this game" section.
  const appearances = {
    waw: ['dempsey','nikolai','takeo','richtofen'],
    bo1: ['dempsey','nikolai','takeo','richtofen','samantha'],
    bo2: ['dempsey','nikolai','takeo','richtofen','samantha','maxis','marlton','misty','russman','stuhlinger'],
    bo3: ['dempsey','nikolai','takeo','richtofen','samantha','maxis'],
    bo4: ['dempsey','nikolai','takeo','richtofen','samantha','maxis','bruno','diego','scarlet','shaw'],
    cw:  ['maya','weaver','grey','carver','samantha','maxis','peck','strauss','raptor_one','ravenov','sam_ai'],
    bo6: ['maya','weaver','grey','carver','director_richtofen','sam_ai','ravenov'],
    bo7: ['maya','weaver','grey','carver','director_richtofen','sam_ai'],
  };
  games.forEach((g) => { g.crewIds = appearances[g.id] || []; });

  // ─── per-game content (gobblegums / elixirs / augments) ────────────────
  // Each game with the matching feature flag has its own array here.
  // Item shapes are deliberately flexible — the renderer only needs `name`
  // and uses `rarity`, `effect`, `perk`, `type` if present.
  //
  // FILL FROM YOUR SPREADSHEET when ready. The seeded items below are
  // canonical examples so the section has something to show in the meantime.
  const gameContent = {
    bo3: {
      gobblegums: [
        { name: 'Stock Option',         rarity: 'common',     effect: 'Instantly refills the reserve ammo for your current weapon.' },
        { name: 'Anywhere But Here!',   rarity: 'rare',       effect: 'Teleport to a random location on the map. Resets your training.' },
        { name: 'Perkaholic',           rarity: 'mega',       effect: 'Grants every perk on the map at once. Lost on down.' },
        { name: 'Alchemical Antithesis',rarity: 'mega',       effect: 'For 60 seconds, every 10 points becomes one round of weapon ammo.' },
        { name: 'Wall Power',           rarity: 'whimsical',  effect: 'Pack-a-Punches the next wall weapon you purchase, free.' },
      ],
    },
    bo4: {
      elixirs: [
        { name: 'Anywhere But Here',    rarity: 'common',     effect: 'Teleport to a random location on the map.' },
        { name: 'Crawl Space',          rarity: 'rare',       effect: 'Turns every zombie nearby into a crawler for 30 seconds.' },
        { name: 'Phoenix Up',           rarity: 'epic',       effect: 'Revives all downed allies with perks intact.' },
        { name: 'Quacknarok',           rarity: 'legendary',  effect: 'Spawns rubber duckies that explode on contact with the dead.' },
      ],
    },
    bo6: {
      augments: [
        { perk: 'Jugger-Nog',   type: 'Major', name: 'Reinforced Hide', effect: 'Take 10% less damage from all sources.' },
        { perk: 'Jugger-Nog',   type: 'Minor', name: 'Steady Pulse',    effect: 'Health regen delay reduced.' },
        { perk: 'Quick Revive', type: 'Major', name: 'Equalizer',        effect: 'Teammates revive at full health.' },
        { perk: 'Stamin-Up',    type: 'Major', name: 'Free Runner',      effect: 'Tactical sprint no longer has a duration cap.' },
        { perk: 'Speed Cola',   type: 'Minor', name: 'Steady Hand',      effect: 'Faster ADS time after sprinting.' },
      ],
    },
    bo7: {
      // BO7 returns the gobblegum mechanic with a new twist — fill from spreadsheet.
      gobblegums: [],
    },
  };
  Object.entries(gameContent).forEach(([id, content]) => {
    const g = games.find((x) => x.id === id);
    if (g) Object.assign(g, content);
  });

  // ─── characters: faction + portrait variants + side-cast roster ───────
  // Portraits are a dict keyed by variant; each value has { dir, file, label }.
  // `defaultPortrait` picks which key the dossier opens with.
  const charAugments = {
    dempsey: {
      faction: 'primis',
      portraits: {
        primis:  { dir: 'Primis',  file: 'Primis_Dempsey.png',  label: 'Primis' },
        ultimis: { dir: 'Ultimis', file: 'Ultimis_Dempsey.png', label: 'Ultimis' },
        tempus:  { dir: 'Tempus',  file: 'Tempus_Dempsey.png',  label: 'Tempus' },
      }, defaultPortrait: 'primis',
    },
    nikolai: {
      faction: 'primis',
      portraits: {
        primis:  { dir: 'Primis',  file: 'Primis_Nikolai.png',  label: 'Primis' },
        ultimis: { dir: 'Ultimis', file: 'Ultimis_Nikolai.png', label: 'Ultimis' },
        tempus:  { dir: 'Tempus',  file: 'Tempus_Nikolai.png',  label: 'Tempus' },
      }, defaultPortrait: 'primis',
    },
    takeo: {
      faction: 'primis',
      portraits: {
        primis:  { dir: 'Primis',  file: 'Primis_Takeo.png',  label: 'Primis' },
        ultimis: { dir: 'Ultimis', file: 'Ultimis_Takeo.png', label: 'Ultimis' },
        tempus:  { dir: 'Tempus',  file: 'Tempus_Takeo.png',  label: 'Tempus' },
      }, defaultPortrait: 'primis',
    },
    richtofen: {
      faction: 'primis',
      portraits: {
        primis:  { dir: 'Primis',  file: 'Primis_Richtofen.png',  label: 'Primis' },
        ultimis: { dir: 'Ultimis', file: 'Ultimis_Richtofen.png', label: 'Ultimis' },
        tempus:  { dir: 'Tempus',  file: 'Tempus_Richtofen.png',  label: 'Tempus' },
      }, defaultPortrait: 'primis',
    },
    samantha: {
      faction: 'aether',
      portraits: {
        moon:    { dir: 'Non-Playable Main Characters/Samantha Maxis', file: 'Samantha_Moon_MPD.png',    label: 'Moon · MPD (1968)', objectPosition: 'center top' },
        origins: { dir: 'Non-Playable Main Characters/Samantha Maxis', file: 'Samantha_Origins.png',     label: 'Origins (1918)', objectPosition: 'center 10%' },
        tag:     { dir: 'Non-Playable Main Characters/Samantha Maxis', file: 'Samantha_TagDerToten.png', label: 'Tag der Toten' },
        cw:      { dir: 'Non-Playable Main Characters/Samantha Maxis', file: 'Samantha_CW.png',          label: 'Cold War · Dark Aether' },
      },
      defaultPortrait: 'moon',
    },
    maxis: {
      faction: 'aether',
      portraits: {
        origins:     { dir: 'Non-Playable Main Characters/Dr. Ludvig Maxis', file: 'L_Maxis_Origins.png',      label: 'Origins (1918)' },
        revelations: { dir: 'Non-Playable Main Characters/Dr. Ludvig Maxis', file: 'L_Maxis_Revelations.png',  label: 'Revelations', objectPosition: 'center 30%' },
        revelations2:{ dir: 'Non-Playable Main Characters/Dr. Ludvig Maxis', file: 'L_Maxis_Revelations2.png', label: 'Revelations (alt.)', objectPosition: 'center 30%' },
      },
      defaultPortrait: 'origins',
    },
    marlton:    { faction: 'victis', portraits: { default: { dir: 'Victis', file: 'Victis_Marlton.png',    label: 'Survivor' } }, defaultPortrait: 'default' },
    misty:      { faction: 'victis', portraits: { default: { dir: 'Victis', file: 'Victis_Misty.png',      label: 'Survivor' } }, defaultPortrait: 'default' },
    russman:    { faction: 'victis', portraits: { default: { dir: 'Victis', file: 'Victis_Russman.png',    label: 'Survivor' } }, defaultPortrait: 'default' },
    stuhlinger: { faction: 'victis', portraits: { default: { dir: 'Victis', file: 'Victis_Stuhlinger.png', label: 'Survivor' } }, defaultPortrait: 'default' },
    maya: {
      faction: 'requiem',
      portraits: {
        default: { dir: 'Requiem',              file: 'Requiem_Maya.png',     label: 'Requiem (CW / BO6)' },
        bo7:     { dir: 'Requiem/Requiem BO7',  file: 'Req_BO7_Maya.png',     label: 'Requiem (BO7)' },
      }, defaultPortrait: 'default',
    },
    weaver: {
      faction: 'requiem',
      portraits: {
        default: { dir: 'Requiem',              file: 'Requiem_Weaver.png',   label: 'Requiem (CW / BO6)' },
        bo7:     { dir: 'Requiem/Requiem BO7',  file: 'Req_BO7_Weaver.png',   label: 'Requiem (BO7)' },
      }, defaultPortrait: 'default',
    },
  };
  Object.entries(charAugments).forEach(([id, aug]) => {
    const c = characters.find((x) => x.id === id);
    if (c) Object.assign(c, aug);
  });

  // New character entries — Requiem additions, Chaos crew, Order, Support.
  characters.push(
    // ── Requiem main (BO6/CW) ──
    { id: 'grey',   name: 'Elizabeth Grey',   role: 'Operative · Requiem', origin: 'United Kingdom', faction: 'requiem',
      summary: '',
      quote: null, hue: 40,
      portraits: { default: { dir: 'Requiem',             file: 'Requiem_Grey.png',  label: 'Requiem (CW / BO6)' },
                   bo7:     { dir: 'Requiem/Requiem BO7', file: 'Req_BO7_Grey.png',  label: 'Requiem (BO7)' } },
      defaultPortrait: 'default' },
    { id: 'carver', name: 'Mackenzie Carver', role: 'Operative · Requiem', origin: 'United States',  faction: 'requiem',
      summary: '',
      quote: null, hue: 140,
      portraits: { default: { dir: 'Requiem',             file: 'Requiem_Carver.png',  label: 'Requiem (CW / BO6)' },
                   bo7:     { dir: 'Requiem/Requiem BO7', file: 'Req_BO7_Carver.png',  label: 'Requiem (BO7)' } },
      defaultPortrait: 'default' },

    // ── Chaos crew (BO4) ──
    { id: 'bruno',   name: 'Bruno Delacroix',   role: 'Magician · Chaos Crew', origin: 'France', faction: 'chaos',
      summary: '',
      quote: null, hue: 320,
      portraits: { default: { dir: 'Chaos', file: 'Chaos_Bruno.png',   label: 'Chaos Crew' } }, defaultPortrait: 'default' },
    { id: 'diego',   name: 'Diego Necalli',     role: 'Luchador · Chaos Crew', origin: 'Mexico', faction: 'chaos',
      summary: '',
      quote: null, hue: 20,
      portraits: { default: { dir: 'Chaos', file: 'Chaos_Diego.png',   label: 'Chaos Crew' } }, defaultPortrait: 'default' },
    { id: 'scarlet', name: 'Scarlett Rhodes',   role: 'Adventurer · Chaos Crew', origin: 'United States', faction: 'chaos',
      summary: '',
      quote: null, hue: 0,
      portraits: { default: { dir: 'Chaos', file: 'Chaos_Scarlet.png', label: 'Chaos Crew' } }, defaultPortrait: 'default' },
    { id: 'shaw',    name: 'Stanton Shaw',      role: 'Detective · Chaos Crew', origin: 'United States', faction: 'chaos',
      summary: '',
      quote: null, hue: 220,
      portraits: { default: { dir: 'Chaos', file: 'Chaos_Shaw.png',    label: 'Chaos Crew' } }, defaultPortrait: 'default' },

    // ── Aether story figures (non-playable) ──
    { id: 'monty',     name: 'Dr. Monty',     role: 'Aether Keeper · BO3 finale', origin: 'The Aether', faction: 'aether',
      summary: '',
      quote: null, hue: 200,
      portraits: {
        one:   { dir: 'Non-Playable Main Characters/Dr. Monty', file: 'Dr.Monty_1.png', label: 'Monty I', objectPosition: 'center 30%' },
        two:   { dir: 'Non-Playable Main Characters/Dr. Monty', file: 'Dr.Monty_2.png', label: 'Monty II', objectPosition: 'center 30%' },
        three: { dir: 'Non-Playable Main Characters/Dr. Monty', file: 'Dr.Monty_3.png', label: 'Monty III', objectPosition: 'center 30%' },
      }, defaultPortrait: 'one' },
    { id: 'shadowman', name: 'The Shadowman', role: 'Apothicon Avatar · BO3 antagonist', origin: 'The Apothicon plane', faction: 'aether',
      summary: '',
      quote: null, hue: 280,
      portraits: {
        one:   { dir: 'Non-Playable Main Characters/The Shadowman', file: 'Shadowman_1.png', label: 'Shadowman I' },
        two:   { dir: 'Non-Playable Main Characters/The Shadowman', file: 'Shadowman_2.png', label: 'Shadowman II' },
        three: { dir: 'Non-Playable Main Characters/The Shadowman', file: 'Shadowman_3.png', label: 'Shadowman III' },
      }, defaultPortrait: 'one' },

    // ── The Order (BO6 antagonists) ──
    { id: 'director_richtofen', name: 'Edward Richtofen', role: 'Director · The Order', origin: 'Unknown · uses the name', faction: 'order',
      summary: '',
      quote: null, hue: 280,
      portraits: { default: { dir: 'Requiem/Side Characters', file: 'Director_Richtofen.png', label: 'Director', objectPosition: 'center 25%' } },
      defaultPortrait: 'default' },

    // ── Requiem support cast ──
    { id: 'peck',       name: 'Dr. Peck',         role: 'Researcher · Requiem (presumed MIA)', origin: 'Germany', faction: 'support',
      summary: '',
      quote: null, hue: 60,
      portraits: { default: { dir: 'Requiem/Side Characters', file: 'Requiem_Peck.png', label: 'Last on record' } }, defaultPortrait: 'default' },
    { id: 'strauss',    name: 'Dr. Strauss',      role: 'Analyst · Requiem', origin: 'Germany', faction: 'support',
      summary: '',
      quote: null, hue: 200,
      portraits: { default: { dir: 'Requiem/Side Characters', file: 'Requiem_Strauss.png', label: 'Requiem', objectPosition: 'center 25%' } }, defaultPortrait: 'default' },
    { id: 'raptor_one', name: 'Raptor One',       role: 'Callsign · Extraction', origin: 'Classified', faction: 'support',
      summary: '',
      quote: null, hue: 80,
      portraits: { default: { dir: 'Requiem/Side Characters', file: 'Requiem_Raptor_One.png', label: 'Extraction' } }, defaultPortrait: 'default' },
    { id: 'ravenov',    name: 'Sergei Ravenov',   role: 'Operative · ex-Omega', origin: 'Soviet Union', faction: 'support',
      summary: '',
      quote: null, hue: 0,
      portraits: {
        bocw: { dir: 'Requiem/Side Characters', file: 'Requiem_Ravenov_BOCW.png', label: 'Cold War (1984)', objectPosition: 'center 25%' },
        bo6:  { dir: 'Requiem/Side Characters', file: 'Requiem_Ravenov_BO6.png',  label: 'BO6 (1991)',      objectPosition: 'center 25%' },
        mwz:  { dir: 'Requiem/Side Characters', file: 'Requiem_Ravenov_MWZ.png',  label: 'MWZ',             objectPosition: 'center 25%' },
      }, defaultPortrait: 'bo6' },
    { id: 'sam_ai',     name: 'Samantha (AI)',    role: 'Aether Construct · Requiem briefing', origin: 'Reconstructed', faction: 'aether',
      summary: '',
      quote: null, hue: 200,
      portraits: { default: { dir: 'Requiem/Side Characters', file: 'Sam_AI.png', label: 'Construct', objectPosition: 'center 25%' } }, defaultPortrait: 'default' },
  );

  // Wonder weapons → primary map(s) they originate from. Used to filter
  // weapons onto their parent game's page.
  // Per-map summary overrides stay blank until owner-written copy is added.
  const mapCopy = {
    nacht: { summary: '' },
    verruckt: { summary: '' },
    shino: { summary: '' },
    derriese: { summary: '' },
    kino: { summary: '' },
    five: { summary: '' },
    ascension: { summary: '' },
    callofthedead: { summary: '' },
    shangri: { summary: '' },
    moon: { summary: '' },
    tranzit: { summary: '' },
    dierise: { summary: '' },
    mob: { summary: '' },
    buried: { summary: '' },
    origins: { summary: '' },
    shadows: { summary: '' },
    thegiant: { summary: '' },
    eisendrache: { summary: '' },
    zetsubou: { summary: '' },
    gorod: { summary: '' },
    revelations: { summary: '' },
    ix: { summary: '' },
    voyage: { summary: '' },
    blood: { summary: '' },
    dotn: { summary: '' },
    ancientevil: { summary: '' },
    tag: { summary: '' },
    diemaschine: { summary: '' },
    firebase: { summary: '' },
    mauer: { summary: '' },
    forsaken: { summary: '' },
    terminus: { summary: '' },
    liberty: { summary: '' },
    citadelle: { summary: '' },
    tomb: { summary: '' },
    shatteredveil: { summary: '' },
    reckoning: { summary: '' },
    ashes: { summary: '' },
    astra: { summary: '' },
    paradox: { summary: '' },
    totenreich: { summary: '' },
  };
  Object.entries(mapCopy).forEach(([id, copy]) => {
    const m = maps.find((x) => x.id === id);
    if (m) Object.assign(m, copy);
  });

  const gameCopy = {
    waw: 'Call of Duty: World at War. Nacht der Untoten, Verrückt, Shi No Numa, and Der Riese.',
    bo1: 'Black Ops expanded Zombies into a full mode with seven maps spanning the globe. The Aether storyline took shape as players traveled from Kino to the Pentagon, through the cosmodrome and Shangri-La, and ultimately to Moon where Richtofen enacted his grand scheme.',
    bo2: 'Black Ops II introduced the Victis crew navigating a post-apocalyptic Earth after the events of the Moon Easter Egg, and featured some of the most iconic maps of all time in Mob of the Dead, and Origins.',
    bo3: 'Black Ops III followed Primis across the multiverse to collect the souls of their Ultimis counterparts. Featured Gobblegums, Widow\'s Wine, four elemental bows in Der Eisendrache, and the conclusion of the cycle in Revelations.',
    bo4: 'Black Ops 4 ran two storylines in parallel: the Aether story concluded with Blood of the Dead and Tag der Toten, while the Chaos story introduced a new crew chasing artifacts through IX, Voyage of Despair, Dead of the Night, and Ancient Evil.',
    cw: 'Cold War began anew with a new Dark Aether storyline. Requiem and Omega Group investigated dimensional breaches across four round-based maps and Outbreak. Introduced weapon rarity, armor, field upgrades, and an open progression system shared with multiplayer.',
    bo6: 'Black Ops 6 continued the Dark Aether storyline with Maya Aguinaldo and the Requiem team investigating the Order across six maps from Terminus to The Reckoning. It introduced Augments for perks, new Ammo Mods, and the return of round-based Zombies mechanics after MWZ.',
    bo7: 'Black Ops 7 sucks the characters into the depths of the Dark Aether. As they arrive, Requiem encounters a new version of the original crew. Together they have freed the Shadowsmiths at Ashes of the Damned, Astra Malorum, and Totenreich.',
  };
  Object.entries(gameCopy).forEach(([id, description]) => {
    const g = games.find((x) => x.id === id);
    if (g) g.description = description;
  });

  const characterCopy = {
    dempsey: { quote: null, summary: '' },
    nikolai: { quote: null, summary: '' },
    takeo: { quote: null, summary: '' },
    richtofen: { quote: 'I do what I do only to secure a better tomorrow.', summary: '' },
    samantha: { quote: null, summary: '' },
    maxis: { quote: null, summary: '' },
    marlton: { quote: null, summary: '' },
    misty: { quote: null, summary: '' },
    russman: { quote: null, summary: '' },
    stuhlinger: { quote: null, summary: '' },
    maya: { quote: null, summary: '' },
    weaver: { quote: null, summary: '' },
    grey: { quote: null, summary: '' },
    carver: { quote: null, summary: '' },
    bruno: { quote: null, summary: '' },
    diego: { quote: null, summary: '' },
    scarlet: { quote: null, summary: '' },
    shaw: { quote: null, summary: '' },
    monty: { quote: null, summary: '' },
    shadowman: { quote: null, summary: '' },
    director_richtofen: { quote: null, summary: '' },
    peck: { quote: null, summary: '' },
    strauss: { quote: null, summary: '' },
    raptor_one: { quote: null, summary: '' },
    ravenov: { quote: null, summary: '' },
    sam_ai: { quote: null, summary: '' },
  };
  Object.entries(characterCopy).forEach(([id, copy]) => {
    const c = characters.find((x) => x.id === id);
    if (c) Object.assign(c, copy);
  });

  const weaponCopy = {
    raygun: '',
    thundergun: '',
    wunderwaffe: '',
    staves: '',
    bows: '',
    rai: '',
  };
  wonderWeapons.forEach((w) => { if (weaponCopy[w.id]) w.summary = weaponCopy[w.id]; });

  const perkCopy = {
    jugg: { summary: '' },
    qr: { summary: '' },
    sc: { summary: '' },
    ddc: { summary: '' },
    sf: { summary: '' },
    mule: { summary: '' },
    phd: { summary: '' },
    tomb: { summary: '' },
  };
  perks.forEach((p) => { if (perkCopy[p.id]) Object.assign(p, perkCopy[p.id]); });

  const perkDetails = [
    { order: 1, id: 'jugg', name: 'Juggernog', introduced: 'Verruckt', mapId: 'verruckt', gameIds: ['waw','bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Raises player health and gives mistakes a little more room to breathe.', summary: '', media: { dir: 'juggernog', hero: 'Juggernog.png', gallery: ['Juggernog_BO7.png','Juggernog_Machine.png'] } },
    { order: 2, id: 'qr', name: 'Quick Revive', introduced: 'Verruckt', mapId: 'verruckt', gameIds: ['waw','bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Speeds up revives, with solo self-revive behavior in several rule sets.', summary: '', media: { dir: 'quick-revive', hero: 'QuickRevive.png', gallery: ['QuickRevive_BO7.png','Quick_Revive_WaW_Machine.png','Quick_Revive_BO3_machine.png'] } },
    { order: 3, id: 'sc', name: 'Speed Cola', introduced: 'Verruckt', mapId: 'verruckt', gameIds: ['waw','bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Cuts reload time and keeps pressure weapons from going quiet too long.', summary: '', media: { dir: 'speed-cola', hero: 'SpeedCola.png', gallery: ['SpeedCola_BO7.png','SpeedCola_Machine.png'] } },
    { order: 4, id: 'ddc', name: 'Double Tap Root Beer', introduced: 'Verruckt', mapId: 'verruckt', gameIds: ['waw','bo1','bo2','bo3','bo7'], effect: 'Improves rate of fire in early forms and adds extra projectile output in Double Tap II.', summary: '', media: { dir: 'double-tap', hero: 'DoubleTapII.png', gallery: ['DoubleTap.png','DoubleTap_BO7.png','doubletap_Machine.png','DoubleTapII_Machine.png','DoubleTapBO7_Machine.png'] } },
    { order: 5, id: 'sf', name: 'Stamin-Up', introduced: 'Ascension', mapId: 'ascension', gameIds: ['bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Raises movement speed and extends sprint stamina.', summary: '', media: { dir: 'stamin-up', hero: 'StaminUp.png', gallery: ['StaminUp_BO7.png','Staminup_BO3_machine.png','Staminup_BO7_machine.png'] } },
    { order: 6, id: 'phd', name: 'PhD Flopper', introduced: 'Ascension', mapId: 'ascension', gameIds: ['bo1','bo2','bo4','cw','bo6','bo7'], effect: 'Protects against explosive and fall damage, with dive-triggered blast behavior in classic rules.', summary: '', media: { dir: 'phd-flopper', hero: 'PHDFlopper.png', gallery: ['PHDFlopper_BO7.png','PHDFlopper_BO2_Machine.png','PHDFlopper_BO7_Machine.png'] } },
    { order: 7, id: 'mule', name: 'Mule Kick', introduced: 'Moon', mapId: 'moon', gameIds: ['bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Adds a third weapon slot.', summary: '', media: { dir: 'mule-kick', hero: 'MuleKick.png', gallery: ['MuleKick_BO7.png','Mule_Kick_BO3_Machine.png','Mule_Kick_BO7_Machine.png'] } },
    { order: 8, id: 'deadshot-daiquiri', name: 'Deadshot Daiquiri', introduced: 'Call of the Dead', mapId: 'callofthedead', gameIds: ['bo1','bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Improves precision and headshot handling, with rule-set-specific aim bonuses.', summary: '', media: { dir: 'deadshot-daiquiri', hero: 'DeadshotDaiquiri.png', gallery: ['DeadshotDaiquiri1.png','DeadshotDaiquiri_BO7.png','DeadshotDaquiri_Machine.png','DeadshotDaquiriBO7_Machine.png'] } },
    { order: 9, id: 'tomb', name: 'Tombstone Soda', introduced: 'TranZit', mapId: 'tranzit', gameIds: ['bo2','cw','bo6','bo7'], effect: 'Creates a recovery path for gear or a second chance after a down, depending on the era.', summary: '', media: { dir: 'tombstone', hero: 'Tombstone.png', gallery: ['Tombstone_BOCW.png','Tombstone_soda_Machine_BO2.png','Tombstone_soda_Machine_MWZ.png'] } },
    { order: 10, id: 'whos-who', name: "Who's Who", introduced: 'Die Rise', mapId: 'dierise', gameIds: ['bo2'], effect: 'Spawns a temporary duplicate that can revive the downed player.', summary: '', media: { dir: 'whos-who', hero: 'WhosWho.png', gallery: ['whoswho_Machine_BO2.png'] } },
    { order: 11, id: 'vulture-aid', name: 'Vulture Aid', introduced: 'Buried', mapId: 'buried', gameIds: ['bo2','bo7'], effect: 'Highlights useful objects and causes zombies to drop points, ammo, or concealment clouds.', summary: '', media: { dir: 'vulture-aid', hero: 'VultureAid.png', gallery: ['VultureAid_BO7.png','VultureAid_Machine_BO2.png','VultureAid_Machine_BO7.png'] } },
    { order: 12, id: 'electric-cherry', name: 'Electric Cherry', introduced: 'Mob of the Dead', mapId: 'mob', gameIds: ['bo2','bo3','bo4'], effect: 'Emits an electric burst while reloading, stronger when the magazine is low.', summary: '', media: { dir: 'electric-cherry', hero: 'ElectricCherry.png', gallery: ['electriccherry_Machine.png'] } },
    { order: 13, id: 'widows-wine', name: "Widow's Wine", introduced: 'Shadows of Evil', mapId: 'shadows', gameIds: ['bo3'], effect: 'Converts grenades into web-like defensive bursts that slow attackers.', summary: '', media: { dir: 'widows-wine', hero: 'WidowsWine.png', gallery: ['WidowsWine_Machine_BO3.png'] } },
    { order: 14, id: 'der-wunderfizz', name: 'Der Wunderfizz', introduced: 'Origins', mapId: 'origins', gameIds: ['bo2','bo3','bo4','cw','bo6','bo7'], effect: 'Dispenses a random or menu-selected perk, depending on the game rules.', summary: '', media: { dir: 'der-wunderfizz', hero: 'DerWunderfizz.png', gallery: ['DerWunderfizz_MachineBO3.png','DerWunderfizz_MachineBO7.png'] } },
    { order: 15, id: 'deadshot-dealer', name: 'Deadshot Dealer', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'BO4-era precision perk built around critical hits and accuracy.', summary: '', media: { dir: 'deadshot-dealer', hero: 'DeadshotDealer.png', gallery: [] } },
    { order: 16, id: 'death-perception', name: 'Death Perception', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4','cw','bo6','bo7'], effect: 'Improves enemy awareness and highlights threats or resources by era.', summary: '', media: { dir: 'death-perception', hero: 'DeathPerception.png', gallery: ['DeathPerception_BO7.png','DeathPerception_Machine.png','DeathPerceptionMachine1_.png'] } },
    { order: 17, id: 'dying-wish', name: 'Dying Wish', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Prevents a lethal hit and grants a brief survival window before entering cooldown.', summary: '', media: { dir: 'dying-wish', hero: 'DyingWish.png', gallery: [] } },
    { order: 18, id: 'victorious-tortoise', name: 'Victorious Tortoise', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Improves shield protection and triggers a defensive blast when the shield breaks.', summary: '', media: { dir: 'victorious-tortoise', hero: 'VictoriousTortoise.png', gallery: [] } },
    { order: 19, id: 'stone-cold-stronghold', name: 'Stone Cold Stronghold', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Rewards staying in a marked area with defensive and damage bonuses.', summary: '', media: { dir: 'stone-cold-stronghold', hero: 'StoneColdStronghold.png', gallery: [] } },
    { order: 20, id: 'winters-wail', name: "Winter's Wail", introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Releases frost bursts that slow or freeze attackers.', summary: '', media: { dir: 'winters-wail', hero: 'WintersWail.png', gallery: [] } },
    { order: 21, id: 'timeslip', name: 'Timeslip', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Speeds up equipment cooldowns, mystery box use, and several map interactions.', summary: '', media: { dir: 'timeslip', hero: 'Timeslip.png', gallery: [] } },
    { order: 22, id: 'ethereal-razor', name: 'Ethereal Razor', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Improves melee damage and range, especially in modifier-style perk setups.', summary: '', media: { dir: 'ethereal-razor', hero: 'EtherealRazor.png', gallery: [] } },
    { order: 23, id: 'electric-burst', name: 'Electric Burst', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Creates electric effects tied to reload timing and weapon handling.', summary: '', media: { dir: 'electric-burst', hero: 'ElectricBurst.png', gallery: [] } },
    { order: 24, id: 'zombshell', name: 'Zombshell', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Creates debuff zones that slow or weaken nearby enemies.', summary: '', media: { dir: 'zombshell', hero: 'Zombshell.png', gallery: [] } },
    { order: 25, id: 'secret-sauce', name: 'Secret Sauce', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Rolls a random perk into the selected slot.', summary: '', media: { dir: 'secret-sauce', hero: 'SecretSauce.png', gallery: [] } },
    { order: 26, id: 'bandolier-bandit', name: 'Bandolier Bandit', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Increases carried ammunition reserves.', summary: '', media: { dir: 'bandolier-bandit', hero: 'BandolierBandit.png', gallery: [] } },
    { order: 27, id: 'blaze-phase', name: 'Blaze Phase', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Builds a charge while crouched, then releases a damaging dash.', summary: '', media: { dir: 'blaze-phase', hero: 'Blaze-Phase.png', gallery: [] } },
    { order: 28, id: 'blood-wolf-bite', name: 'Blood Wolf Bite', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Summons Luna to attack nearby enemies after enough kills.', summary: '', media: { dir: 'blood-wolf-bite', hero: 'Blood-Wolf-Bite.png', gallery: [] } },
    { order: 29, id: 'elemental-pop', name: 'Elemental Pop', introduced: 'Die Maschine', mapId: 'diemaschine', gameIds: ['cw','bo6','bo7'], effect: 'Adds random ammo mod effects to weapon fire.', summary: '', media: { dir: 'elemental-pop', hero: 'ElementalPop.png', gallery: ['Elemental_Pop_Machine.png'] } },
    { order: 30, id: 'phd-slider', name: 'PhD Slider', introduced: 'Black Ops 4', mapId: 'ix', gameIds: ['bo4'], effect: 'Turns a charged slide into an explosive impact and protects against self-damage.', summary: '', media: { dir: 'phd-slider', hero: 'PhDSlider.png', gallery: [] } },
    { order: 31, id: 'melee-macchiato', name: 'Melee Macchiato', introduced: 'Liberty Falls', mapId: 'liberty', gameIds: ['bo6','bo7'], effect: 'Improves melee power and utility in the Dark Aether ruleset.', summary: '', media: { dir: 'melee-macchiato', hero: 'MeleeMacchiato_BO7.png', gallery: ['MeleeMacchiato_BO7_Machine.png','MeleeMacchiato_BO7_Machine1.png'] } },
    { order: 32, id: 'wisp-tea', name: 'Wisp Tea', introduced: 'Black Ops 7', mapId: 'totenreich', gameIds: ['bo7'], effect: 'Dark Aether perk brewed around spectral utility and escape pressure.', summary: '', media: { dir: 'wisp-tea', hero: 'WispTea.png', gallery: [] } },
  ];
  perkDetails.forEach((entry) => {
    const existing = perks.find((p) => p.id === entry.id);
    if (existing) Object.assign(existing, entry);
    else perks.push(entry);
  });
  perks.sort((a, b) => (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name));

  const weaponOrigin = {
    raygun:     { mapId: 'derriese', gameIds: ['waw','bo1','bo2','bo3','bo4','cw','bo6','bo7'] }, // universal
    thundergun: { mapId: 'kino',     gameIds: ['bo1'] },
    wunderwaffe:{ mapId: 'shino',    gameIds: ['waw'] },
    staves:     { mapId: 'origins',  gameIds: ['bo2'] },
    bows:       { mapId: 'eisendrache', gameIds: ['bo3'] },
    rai:        { mapId: 'diemaschine', gameIds: ['cw'] },
  };
  wonderWeapons.forEach((w) => {
    const o = weaponOrigin[w.id];
    if (o) { w.mapId = o.mapId; w.gameIds = o.gameIds; }
  });

  // Primary weapon images prefer side/profile views when available.
  const weaponDetails = [
    { order: 1, id: 'raygun', name: 'Ray Gun', map: 'Mystery Box staple', mapId: 'nacht', gameIds: ['waw','bo1','bo2','bo3','bo4','cw','bo6','bo7'], type: 'Energy pistol', introduced: 'Nacht der Untoten', summary: '', media: { dir: 'ray-gun', hero: 'raygun.png', gallery: [] } },
    { order: 2, id: 'ray-gun-mk2', name: 'Ray Gun Mark II', map: 'Buried', mapId: 'buried', gameIds: ['bo2','bo3'], type: 'Burst energy rifle', introduced: 'Buried', summary: '', media: { dir: 'ray-gun-mk2', hero: 'RayGunMkII.png', gallery: [] } },
    { order: 3, id: 'wunderwaffe', name: 'Wunderwaffe DG-2', map: 'Shi No Numa', mapId: 'shino', gameIds: ['waw','bo1','bo3','bo4'], type: 'Arc lightning cannon', introduced: 'Shi No Numa', summary: '', media: { dir: 'wunderwaffe-dg2', hero: 'wunderwaffe2.png', gallery: ['wunderwaffe1.png'] } },
    { order: 4, id: 'wunderwaffe-dg-scharfschutze', name: 'Wunderwaffe DG-Scharfschutze', map: 'Tag der Toten', mapId: 'tag', gameIds: ['bo4'], type: 'Arc sniper variant', introduced: 'Tag der Toten', summary: '', media: { dir: 'wunderwaffe-dg-scharfschutze', hero: 'Wunderwaffe_DG-scharfschutze.png', gallery: [] } },
    { order: 5, id: 'thundergun', name: 'Thundergun', map: 'Kino der Toten', mapId: 'kino', gameIds: ['bo1','bo3'], type: 'Concussive wave cannon', introduced: 'Kino der Toten', summary: '', media: { dir: 'thundergun', hero: 'thundergun.png', gallery: ['Thundergun1.png'] } },
    { order: 6, id: 'winters-howl', name: "Winter's Howl", map: 'Five', mapId: 'five', gameIds: ['bo1','bo4'], type: 'Cryogenic sidearm', introduced: 'Five', summary: '', media: { dir: 'winters-howl', hero: 'WintersHowl.png', gallery: ['wintershowl1.png'] } },
    { order: 7, id: 'vr-11', name: 'V-R11', map: 'Call of the Dead', mapId: 'callofthedead', gameIds: ['bo1'], type: 'Vril transformation rifle', introduced: 'Call of the Dead', summary: '', media: { dir: 'vr-11', hero: 'VR-11WW_Side.png', gallery: ['VR-11_Player.png'] } },
    { order: 8, id: 'scavenger', name: 'Scavenger', map: 'Call of the Dead', mapId: 'callofthedead', gameIds: ['bo1'], type: 'Explosive sniper rifle', introduced: 'Call of the Dead', summary: '', media: { dir: 'scavenger', hero: 'Scavenger_COTD_WW.png', gallery: ['Scavenger_COTD_WW1.png'] } },
    { order: 9, id: '31-79-jgb215', name: '31-79 JGb215', map: 'Shangri-La', mapId: 'shangri', gameIds: ['bo1'], type: 'Shrink ray', introduced: 'Shangri-La', summary: '', media: { dir: '31-79-jgb215', hero: '31-79_JGb215_Player.png', gallery: [] } },
    { order: 10, id: 'wave-gun', name: 'Wave Gun / Zap Guns', map: 'Moon', mapId: 'moon', gameIds: ['bo1'], type: 'Dual-mode energy system', introduced: 'Moon', summary: '', media: { dir: 'wave-gun', hero: 'wavegun_side.png', gallery: ['wavegun_player_combined.png','zapgun_player.png'] } },
    { order: 11, id: 'thrustodyne-m23', name: 'Thrustodyne Aeronautics Model 23', map: 'TranZit / Liberty Falls', mapId: 'tranzit', gameIds: ['bo2','bo6'], type: 'Turbine pressure cannon', introduced: 'TranZit', summary: '', media: { dir: 'thrustodyne-m23', hero: 'Thrustodyne_Aeronautics_Model_23_Side.png', gallery: [] } },
    { order: 12, id: 'sliquifier', name: 'Sliquifier', map: 'Die Rise', mapId: 'dierise', gameIds: ['bo2'], type: 'Reactive liquid projector', introduced: 'Die Rise', summary: '', media: { dir: 'sliquifier', hero: 'sliquifier_side.png', gallery: [] } },
    { order: 13, id: 'paralyzer', name: 'Paralyzer', map: 'Buried', mapId: 'buried', gameIds: ['bo2'], type: 'Gravitic paralysis weapon', introduced: 'Buried', summary: '', media: { dir: 'paralyzer', hero: 'Paralyzer_Side.png', gallery: [] } },
    { order: 14, id: 'blundergat', name: 'Blundergat', map: 'Mob of the Dead / Blood of the Dead', mapId: 'mob', gameIds: ['bo3','bo4'], type: 'Alcatraz shotgun relic', introduced: 'Mob of the Dead', summary: '', media: { dir: 'blundergat', hero: 'blundergat_side.png', gallery: ['blundergat_player.png'] } },
    { order: 15, id: 'staves', name: 'Elemental Staves', map: 'Origins', mapId: 'origins', gameIds: ['bo2','bo3'], type: 'Elemental relic set', introduced: 'Origins', summary: '', media: { dir: 'staves', hero: 'StaffofIce_Side.png', gallery: ['StaffofFire_Side.png','StaffofLightning_Side.png','StaffofWind_Side.png'] } },
    { order: 16, id: 'apothicon-servant', name: 'Apothicon Servant', map: 'Shadows of Evil', mapId: 'shadows', gameIds: ['bo3'], type: 'Apothicon living weapon', introduced: 'Shadows of Evil', summary: '', media: { dir: 'apothicon-servant', hero: 'Apothicon_Servant_Side.png', gallery: ['Apothicon_Servant_Player.png','Apothicon_Servant_Player_Upgraded.png'] } },
    { order: 17, id: 'bows', name: 'Wrath of the Ancients Bows', map: 'Der Eisendrache', mapId: 'eisendrache', gameIds: ['bo3'], type: 'Elemental bow set', introduced: 'Der Eisendrache', summary: '', media: { dir: 'bows', hero: 'WrathoftheAncients.png', gallery: ["LightningBow_Side_Kreema'ahm la Ahmahm.png",'WolfBow_Side_Kreeholo lu Kreemasaleet.png',"FireBow_Side_Kreeaho'ahm nal Ahmhogaroc.png","VoidBow_Side_Kreegakaleet lu Gosata'ahm.png",'WrathoftheAncientsFire.png'] } },
    { order: 18, id: 'kt-4', name: 'KT-4', map: 'Zetsubou No Shima', mapId: 'zetsubou', gameIds: ['bo3'], type: 'Division 9 bio-weapon', introduced: 'Zetsubou No Shima', summary: '', media: { dir: 'kt-4', hero: 'KT4_side.png', gallery: ['KT4_player.png'] } },
    { order: 19, id: 'gkz-45-mk3', name: 'GKZ-45 Mk3', map: 'Gorod Krovi', mapId: 'gorod', gameIds: ['bo3'], type: 'Dual-wield rift system', introduced: 'Gorod Krovi', summary: '', media: { dir: 'gkz-45-mk3', hero: 'GKZ-45_Mk3_BOIII_Player.png', gallery: [] } },
    { order: 20, id: 'death-of-orion', name: 'Death of Orion', map: 'IX', mapId: 'ix', gameIds: ['bo4'], type: 'Scorpion lightning weapon', introduced: 'IX', summary: '', media: { dir: 'death-of-orion', hero: 'deathoforionIX.png', gallery: [] } },
    { order: 21, id: 'kraken', name: 'Kraken', map: 'Voyage of Despair', mapId: 'voyage', gameIds: ['bo4'], type: 'Elemental heavy cannon', introduced: 'Voyage of Despair', summary: '', media: { dir: 'kraken', hero: 'Fire_Kraken_Upgrade.png', gallery: [] } },
    { order: 22, id: 'alistairs-folly', name: "Alistair's Folly", map: 'Dead of the Night', mapId: 'dotn', gameIds: ['bo4'], type: 'Chaos revolver', introduced: 'Dead of the Night', summary: '', media: { dir: 'alistairs-folly', hero: 'Alistairs_Folly_Side.png', gallery: [] } },
    { order: 23, id: 'savage-impaler', name: 'Savage Impaler', map: 'Dead of the Night', mapId: 'dotn', gameIds: ['bo4'], type: 'Stake launcher', introduced: 'Dead of the Night', summary: '', media: { dir: 'savage-impaler', hero: 'SavageImpaler_Side.png', gallery: [] } },
    { order: 24, id: 'hands-of-god', name: 'Hands of God', map: 'Ancient Evil', mapId: 'ancientevil', gameIds: ['bo4'], type: 'Gauntlet relic set', introduced: 'Ancient Evil', summary: '', media: { dir: 'hands-of-god', hero: 'HandofCharon.png', gallery: ['HandofGaia.png','HandofHemera.png','HandofOuranos.png'] } },
    { order: 25, id: 'tundragun', name: 'Tundragun', map: 'Tag der Toten', mapId: 'tag', gameIds: ['bo4'], type: 'Cryogenic launcher', introduced: 'Tag der Toten', summary: '', media: { dir: 'tundragun', hero: 'tundragun.png', gallery: [] } },
    { order: 26, id: 'die-shockwave', name: 'D.I.E. Shockwave', map: 'Die Maschine', mapId: 'diemaschine', gameIds: ['cw'], type: 'Dark Aether vacuum weapon', introduced: 'Die Maschine', summary: '', media: { dir: 'die-shockwave', hero: 'D.I.E._side.png', gallery: [] } },
    { order: 27, id: 'rai', name: 'R.A.I. K-84', map: 'Firebase Z', mapId: 'firebase', gameIds: ['cw'], type: 'Dark Aether rifle', introduced: 'Firebase Z', summary: '', media: { dir: 'rai-k84', hero: 'RAI-k84.png', gallery: [] } },
    { order: 28, id: 'crbr-s', name: 'CRBR-S', map: 'Mauer der Toten', mapId: 'mauer', gameIds: ['cw'], type: 'Modular AI sidearm', introduced: 'Mauer der Toten', summary: '', media: { dir: 'crbr-s', hero: 'CRBR-S_BOCW.png', gallery: ['CRBR-S_Blazer_upgrade.png','CRBR-S_DiffuserUpgrade.png','CRBR-S_Swarm_Upgrade.png'] } },
    { order: 29, id: 'chrysalax', name: 'Chrysalax', map: 'Forsaken', mapId: 'forsaken', gameIds: ['cw'], type: 'Dark Aether axe and gun', introduced: 'Forsaken', summary: '', media: { dir: 'chrysalax', hero: 'Chrysalax_WW.png', gallery: [] } },
    { order: 30, id: 'dr-11-beamsmasher', name: 'DR-11 Beamsmasher', map: 'Terminus', mapId: 'terminus', gameIds: ['bo6'], type: 'Focused beam platform', introduced: 'Terminus', summary: '', media: { dir: 'dr-11-beamsmasher', hero: 'DR11Beamsmasher.png', gallery: [] } },
    { order: 31, id: 'jotun-star', name: 'Jotun Star', map: 'The Tomb', mapId: 'tomb', gameIds: ['bo6'], type: 'Order artifact weapon', introduced: 'The Tomb', summary: '', media: { dir: 'jotun-star', hero: 'JotunStar.png', gallery: [] } },
    { order: 32, id: 'gorgofex', name: 'Gorgofex', map: 'The Reckoning', mapId: 'reckoning', gameIds: ['bo6'], type: 'Dark Aether organic weapon', introduced: 'The Reckoning', summary: '', media: { dir: 'gorgofex', hero: 'Gorgofex_WW.png', gallery: [] } },
    { order: 33, id: 'necrofluid', name: 'Necrofluid', map: 'Ashes of the Damned', mapId: 'ashes', gameIds: ['bo7'], type: 'Dark Aether fluid weapon', introduced: 'Ashes of the Damned', summary: '', media: { dir: 'necrofluid', hero: 'NecrofluidAotD.png', gallery: [] } },
    { order: 34, id: 'lgm-1', name: 'LGM-1', map: 'Filed entry pending', mapId: null, gameIds: [], type: 'Experimental weapon', introduced: 'Unconfirmed file', summary: '', media: { dir: 'lgm-1', hero: 'LGM1_Side.png', gallery: [] } },
  ];
  weaponDetails.forEach((entry) => {
    const existing = wonderWeapons.find((w) => w.id === entry.id);
    if (existing) Object.assign(existing, entry);
    else wonderWeapons.push(entry);
  });
  wonderWeapons.sort((a, b) => (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name));

  return { games, maps, characters, wonderWeapons, perks, timeline, sampleEE, classicEasterEggs, bo7EasterEggs, relics };
})();
