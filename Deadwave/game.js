(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const hud = {
    healthLabel: document.getElementById("healthLabel"),
    healthFill: document.getElementById("healthFill"),
    perkTray: document.getElementById("perkTray"),
    roundValue: document.getElementById("roundValue"),
    roundState: document.getElementById("roundState"),
    pointsValue: document.getElementById("pointsValue"),
    weaponName: document.getElementById("weaponName"),
    ammoValue: document.getElementById("ammoValue"),
    prompt: document.getElementById("prompt"),
    notice: document.getElementById("notice"),
    overlay: document.getElementById("overlay"),
    overlayEyebrow: document.getElementById("overlayEyebrow"),
    overlayTitle: document.getElementById("overlayTitle"),
    overlayText: document.getElementById("overlayText"),
    primaryButton: document.getElementById("primaryButton"),
    overlayStats: document.getElementById("overlayStats"),
  };

  const VIEW_W = 960;
  const VIEW_H = 640;
  const TAU = Math.PI * 2;
  const STORAGE_KEY = "deadwave.local.highscore";

  const colors = {
    floor: "#0b1112",
    wall: "#26383a",
    wallHot: "#d6a24a",
    red: "#d62828",
    green: "#d6a24a",
    cyan: "#8baeb8",
    amber: "#d6a24a",
    violet: "#8e6b95",
    dark: "#050708",
  };

  const roomDefs = [
    { id: "spawn", name: "Spawn Room", x: -360, y: -240, w: 720, h: 480, tint: "#102421" },
    { id: "storage", name: "Storage Hall", x: 360, y: -200, w: 520, h: 400, tint: "#17211f" },
    { id: "generator", name: "Generator Room", x: -240, y: -680, w: 520, h: 440, tint: "#111e2a" },
    { id: "lab", name: "Lab Room", x: 280, y: -680, w: 520, h: 440, tint: "#1f1930" },
    { id: "armory", name: "Armory", x: -880, y: -200, w: 520, h: 400, tint: "#282216" },
    { id: "reactor", name: "Reactor Room", x: -880, y: -680, w: 520, h: 440, tint: "#231724" },
  ];

  const doorDefs = [
    { id: "door-storage", room: "storage", label: "Storage Hall", cost: 1000, x: 360, y: -64, w: 42, h: 128 },
    { id: "door-generator", room: "generator", label: "Generator Room", cost: 1500, x: -88, y: -260, w: 176, h: 42 },
    { id: "door-lab", room: "lab", label: "Lab Room", cost: 2000, x: 260, y: -560, w: 42, h: 128, requires: "generator" },
    { id: "door-armory", room: "armory", label: "Armory", cost: 3000, x: -402, y: -64, w: 42, h: 128 },
    { id: "door-reactor", room: "reactor", label: "Reactor Room", cost: 5000, x: -728, y: -260, w: 176, h: 42, requires: "armory" },
  ];

  const connectorDefs = [
    { id: "connector-storage", room: "storage", x: 340, y: -82, w: 86, h: 164 },
    { id: "connector-generator", room: "generator", x: -112, y: -282, w: 224, h: 86 },
    { id: "connector-lab", room: "lab", x: 246, y: -572, w: 92, h: 156 },
    { id: "connector-armory", room: "armory", x: -426, y: -82, w: 86, h: 164 },
    { id: "connector-reactor", room: "reactor", x: -752, y: -272, w: 224, h: 112, requires: "armory" },
  ];

  const windowDefs = [
    { id: "win-a", room: "spawn", side: "north", x: -230, y: -240 },
    { id: "win-b", room: "spawn", side: "east", x: 360, y: 104 },
    { id: "win-c", room: "spawn", side: "south", x: 155, y: 240 },
    { id: "win-d", room: "storage", side: "east", x: 880, y: -80 },
    { id: "win-e", room: "generator", side: "north", x: -36, y: -680 },
    { id: "win-f", room: "lab", side: "north", x: 565, y: -680 },
    { id: "win-g", room: "armory", side: "west", x: -880, y: 40 },
    { id: "win-h", room: "reactor", side: "west", x: -880, y: -520 },
  ];

  const wallBuys = [
    { id: "pumpShotgun", room: "spawn", x: -280, y: 150, label: "Pump Shotgun", cost: 750 },
    { id: "burstRifle", room: "storage", x: 786, y: 126, label: "Burst Rifle", cost: 1200 },
    { id: "heavySprayer", room: "armory", x: -760, y: 128, label: "Heavy Sprayer", cost: 3000 },
  ];

  const perkDefs = {
    ironGut: { name: "Iron Gut", icon: "IG", cost: 2500, color: "#ff6f82", room: "lab", x: 420, y: -565 },
    quickHands: { name: "Quick Hands", icon: "QH", cost: 2000, color: "#8baeb8", room: "lab", x: 670, y: -565 },
    boltBrew: { name: "Bolt Brew", icon: "BB", cost: 3000, color: "#d6a24a", room: "generator", x: 156, y: -365 },
    doubleTrigger: { name: "Double Trigger", icon: "DT", cost: 2500, color: "#8e6b95", room: "storage", x: 660, y: -142 },
    deepPockets: { name: "Deep Pockets", icon: "DP", cost: 2000, color: "#9b9282", room: "armory", x: -514, y: 126 },
    lastNerve: { name: "Last Nerve", icon: "LN", cost: 3500, color: "#ffffff", room: "reactor", x: -500, y: -505 },
  };

  const stations = {
    power: { room: "generator", x: -96, y: -505 },
    crate: { room: "armory", x: -620, y: -42 },
    upgrade: { room: "reactor", x: -628, y: -504 },
  };

  const weaponCatalog = {
    rustyPistol: {
      name: "Rusty Pistol",
      upgradedName: "Neon Repeater",
      damage: 34,
      mag: 12,
      reserve: 60,
      fireMs: 260,
      reloadMs: 1350,
      spread: 0.025,
      pellets: 1,
      pierce: 1,
      range: 720,
      color: "#d6a24a",
      sound: "pistol",
    },
    pumpShotgun: {
      name: "Pump Shotgun",
      upgradedName: "Street Sweeper X",
      damage: 28,
      mag: 6,
      reserve: 36,
      fireMs: 760,
      reloadMs: 1800,
      spread: 0.26,
      pellets: 7,
      pierce: 1,
      range: 420,
      color: "#ff8a66",
      sound: "shotgun",
    },
    burstRifle: {
      name: "Burst Rifle",
      upgradedName: "Pulse Splitter",
      damage: 27,
      mag: 30,
      reserve: 120,
      fireMs: 118,
      reloadMs: 1550,
      spread: 0.04,
      pellets: 1,
      pierce: 1,
      range: 780,
      color: "#8baeb8",
      sound: "rifle",
    },
    heavySprayer: {
      name: "Heavy Sprayer",
      upgradedName: "Lead Storm",
      damage: 22,
      mag: 80,
      reserve: 240,
      fireMs: 78,
      reloadMs: 2600,
      spread: 0.09,
      pellets: 1,
      pierce: 1,
      range: 700,
      color: "#9b9282",
      sound: "rifle",
    },
    dualPistols: {
      name: "Dual Pistols",
      upgradedName: "Twin Static",
      damage: 28,
      mag: 24,
      reserve: 96,
      fireMs: 135,
      reloadMs: 1450,
      spread: 0.08,
      pellets: 1,
      pierce: 1,
      range: 620,
      color: "#e8fff7",
      sound: "pistol",
    },
    autoRifle: {
      name: "Auto Rifle",
      upgradedName: "Signal Shredder",
      damage: 31,
      mag: 36,
      reserve: 144,
      fireMs: 98,
      reloadMs: 1650,
      spread: 0.05,
      pellets: 1,
      pierce: 1,
      range: 780,
      color: "#d6a24a",
      sound: "rifle",
    },
    combatShotgun: {
      name: "Combat Shotgun",
      upgradedName: "Breach Bloom",
      damage: 24,
      mag: 10,
      reserve: 50,
      fireMs: 420,
      reloadMs: 1900,
      spread: 0.23,
      pellets: 8,
      pierce: 1,
      range: 440,
      color: "#ff6f82",
      sound: "shotgun",
    },
    arcCannon: {
      name: "Arc Cannon",
      upgradedName: "Thunder Spine",
      damage: 92,
      mag: 5,
      reserve: 25,
      fireMs: 640,
      reloadMs: 1900,
      spread: 0.015,
      pellets: 1,
      pierce: 2,
      range: 760,
      color: "#8baeb8",
      sound: "arc",
    },
    plasmaCutter: {
      name: "Plasma Cutter",
      upgradedName: "Lumen Saw",
      damage: 72,
      mag: 14,
      reserve: 56,
      fireMs: 250,
      reloadMs: 1700,
      spread: 0.01,
      pellets: 1,
      pierce: 4,
      range: 840,
      color: "#8e6b95",
      sound: "arc",
    },
    voidLauncher: {
      name: "Void Launcher",
      upgradedName: "Event Horizon",
      damage: 160,
      mag: 4,
      reserve: 16,
      fireMs: 900,
      reloadMs: 2300,
      spread: 0.025,
      pellets: 1,
      pierce: 1,
      blast: 110,
      range: 620,
      color: "#d62828",
      sound: "void",
    },
  };

  const cratePool = [
    "dualPistols",
    "dualPistols",
    "autoRifle",
    "autoRifle",
    "combatShotgun",
    "arcCannon",
    "plasmaCutter",
    "voidLauncher",
  ];

  const keys = new Set();
  const mouse = { x: VIEW_W / 2, y: VIEW_H / 2, worldX: 0, worldY: 0, down: false };
  const camera = { x: -VIEW_W / 2, y: -VIEW_H / 2 };

  let audio = null;
  let lastFrame = performance.now();
  let currentInteraction = null;
  let noticeTimer = 0;

  const game = {
    mode: "menu",
    round: 0,
    roundBreak: false,
    breakTimer: 0,
    spawnQueue: 0,
    spawnTimer: 0,
    spawnInterval: 1.2,
    unlockedRooms: new Set(["spawn"]),
    powerOn: false,
    repairPointsThisRound: 0,
    windows: [],
    zombies: [],
    traces: [],
    particles: [],
    floatTexts: [],
    crate: { rolling: false, rollTime: 0, preview: "dualPistols", offer: null, tick: 0 },
    stats: {},
    previousMode: "playing",
  };

  let player = null;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function dist(a, b, c, d) {
    return Math.hypot(a - c, b - d);
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function roomById(id) {
    return roomDefs.find((room) => room.id === id);
  }

  function isRoomUnlocked(id) {
    return game.unlockedRooms.has(id);
  }

  function pointInRoom(x, y, room) {
    return x >= room.x && x <= room.x + room.w && y >= room.y && y <= room.y + room.h;
  }

  function pointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  }

  function isConnectorUnlocked(connector) {
    return isRoomUnlocked(connector.room) && (!connector.requires || isRoomUnlocked(connector.requires));
  }

  function isInsideUnlockedRooms(x, y) {
    return (
      roomDefs.some((room) => isRoomUnlocked(room.id) && pointInRoom(x, y, room)) ||
      connectorDefs.some((connector) => isConnectorUnlocked(connector) && pointInRect(x, y, connector))
    );
  }

  function stableNoise(id, x, y) {
    const text = `${id}:${x}:${y}`;
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return ((hash >>> 0) % 1000) / 1000;
  }

  function canStandAt(x, y) {
    const r = player.radius * 0.75;
    return (
      isInsideUnlockedRooms(x, y) &&
      isInsideUnlockedRooms(x + r, y) &&
      isInsideUnlockedRooms(x - r, y) &&
      isInsideUnlockedRooms(x, y + r) &&
      isInsideUnlockedRooms(x, y - r)
    );
  }

  function reserveMultiplier() {
    return player && player.perks.has("deepPockets") ? 1.45 : 1;
  }

  function createWeapon(id, upgraded = false) {
    const base = weaponCatalog[id];
    const damageMult = upgraded ? 1.65 : 1;
    const magMult = upgraded ? 1.35 : 1;
    const reserveMult = reserveMultiplier() * (upgraded ? 1.35 : 1);
    const mag = Math.round(base.mag * magMult);
    const reserveMax = Math.round(base.reserve * reserveMult);
    return {
      id,
      name: upgraded ? base.upgradedName : base.name,
      baseName: base.name,
      upgraded,
      damage: Math.round(base.damage * damageMult),
      mag,
      ammo: mag,
      reserveMax,
      reserve: reserveMax,
      fireMs: upgraded ? Math.max(55, base.fireMs * 0.86) : base.fireMs,
      reloadMs: base.reloadMs,
      spread: upgraded ? base.spread * 0.72 : base.spread,
      pellets: base.pellets,
      pierce: upgraded ? base.pierce + 1 : base.pierce,
      blast: upgraded && base.blast ? base.blast * 1.25 : base.blast || 0,
      range: upgraded ? base.range * 1.12 : base.range,
      color: base.color,
      sound: base.sound,
    };
  }

  function resetPlayer() {
    player = {
      x: 0,
      y: 0,
      radius: 17,
      health: 100,
      maxHealth: 100,
      points: 500,
      baseSpeed: 178,
      stamina: 100,
      dashCooldown: 0,
      sprintDisabled: 0,
      lastDamageAt: -999,
      lastShotAt: -999,
      reloadTimer: 0,
      reloadDuration: 0,
      meleeCooldown: 0,
      currentSlot: 0,
      weapons: [createWeapon("rustyPistol"), null],
      perks: new Set(),
      lastNerveUsed: false,
    };
  }

  function resetGame() {
    resetPlayer();
    game.mode = "playing";
    game.round = 0;
    game.roundBreak = false;
    game.breakTimer = 0;
    game.spawnQueue = 0;
    game.spawnTimer = 0;
    game.unlockedRooms = new Set(["spawn"]);
    game.powerOn = false;
    game.repairPointsThisRound = 0;
    game.zombies = [];
    game.traces = [];
    game.particles = [];
    game.floatTexts = [];
    game.windows = windowDefs.map((win) => ({ ...win, planks: 5, maxPlanks: 5, breakTimer: rand(0.4, 1.1) }));
    game.crate = { rolling: false, rollTime: 0, preview: "dualPistols", offer: null, tick: 0 };
    game.stats = {
      kills: 0,
      headshots: 0,
      pointsEarned: 0,
      shots: 0,
      roomsOpened: 0,
      startedAt: performance.now(),
      favoriteWeapon: "Rusty Pistol",
      weaponShots: {},
    };
    hideOverlay();
    showNotice("Round 1");
    startNextRound();
  }

  function currentWeapon() {
    return player.weapons[player.currentSlot];
  }

  function startNextRound() {
    game.round += 1;
    game.roundBreak = false;
    game.breakTimer = 0;
    game.repairPointsThisRound = 0;
    game.spawnQueue = 6 + game.round * 3;
    game.spawnInterval = Math.max(0.38, 1.25 - game.round * 0.035);
    game.spawnTimer = 0.6;
    for (const win of game.windows) {
      win.maxPlanks = 5;
    }
    playSound("round");
    showNotice(`Round ${game.round}`);
  }

  function endRound() {
    game.roundBreak = true;
    game.breakTimer = 10;
    awardPoints(100 * game.round, player.x, player.y - 34, colors.amber);
    playSound("roundEnd");
    showNotice(`Breach contained +${100 * game.round}`);
  }

  function awardPoints(amount, x = player.x, y = player.y, color = colors.green) {
    player.points += amount;
    game.stats.pointsEarned += amount;
    addFloatText(x, y, `+${amount}`, color);
  }

  function spendPoints(cost) {
    if (player.points < cost) {
      showNotice("Insufficient points");
      playSound("empty");
      return false;
    }
    player.points -= cost;
    return true;
  }

  function addFloatText(x, y, text, color) {
    game.floatTexts.push({ x, y, text, color, ttl: 1.1, vy: -24 });
  }

  function showNotice(text) {
    hud.notice.textContent = text;
    hud.notice.classList.add("is-visible");
    noticeTimer = 2.3;
  }

  function hideOverlay() {
    hud.overlay.classList.remove("is-visible");
  }

  function showOverlay({ eyebrow, title, text, button, stats = [] }) {
    hud.overlayEyebrow.textContent = eyebrow;
    hud.overlayTitle.textContent = title;
    hud.overlayText.textContent = text;
    hud.primaryButton.textContent = button;
    hud.overlayStats.innerHTML = stats
      .map((item) => `<div class="overlay-stat"><span>${item.label}</span><strong>${item.value}</strong></div>`)
      .join("");
    hud.overlay.classList.add("is-visible");
  }

  function getHighScore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveHighScore() {
    const high = getHighScore();
    const survivedMs = performance.now() - game.stats.startedAt;
    const next = {
      highestRound: Math.max(high.highestRound || 0, game.round),
      kills: Math.max(high.kills || 0, game.stats.kills),
      headshots: Math.max(high.headshots || 0, game.stats.headshots),
      pointsEarned: Math.max(high.pointsEarned || 0, game.stats.pointsEarned),
      timeSurvived: Math.max(high.timeSurvived || 0, survivedMs),
      favoriteWeapon: game.stats.favoriteWeapon || high.favoriteWeapon || "Rusty Pistol",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function updateFavoriteWeapon(weapon) {
    game.stats.weaponShots[weapon.name] = (game.stats.weaponShots[weapon.name] || 0) + 1;
    game.stats.favoriteWeapon = Object.entries(game.stats.weaponShots).sort((a, b) => b[1] - a[1])[0][0];
  }

  function gameOver() {
    game.mode = "gameOver";
    const high = saveHighScore();
    playSound("gameOver");
    showOverlay({
      eyebrow: "Deadwave - casualty report",
      title: "Game Over",
      text: "The file terminated with hostile activity still climbing. Archive the report, then rerun the simulation.",
      button: "Rerun File",
      stats: [
        { label: "Round", value: game.round },
        { label: "Kills", value: game.stats.kills },
        { label: "Headshots", value: game.stats.headshots },
        { label: "Best Round", value: high.highestRound || game.round },
        { label: "Time", value: formatTime(performance.now() - game.stats.startedAt) },
        { label: "Favorite", value: game.stats.favoriteWeapon || "Rusty Pistol" },
      ],
    });
  }

  function initAudio() {
    if (!audio) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audio = AudioContext ? new AudioContext() : null;
    }
    if (audio && audio.state === "suspended") {
      audio.resume();
    }
  }

  function tone(freq, length, type, gain, detune = 0) {
    if (!audio) return;
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    amp.gain.setValueAtTime(gain, audio.currentTime);
    amp.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + length);
    osc.connect(amp);
    amp.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + length);
  }

  function noise(length, gain) {
    if (!audio) return;
    const buffer = audio.createBuffer(1, audio.sampleRate * length, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const source = audio.createBufferSource();
    const amp = audio.createGain();
    amp.gain.value = gain;
    source.buffer = buffer;
    source.connect(amp);
    amp.connect(audio.destination);
    source.start();
  }

  function playSound(name) {
    if (!audio) return;
    if (name === "pistol") {
      tone(190, 0.06, "square", 0.07);
      noise(0.05, 0.03);
    } else if (name === "shotgun") {
      tone(95, 0.1, "sawtooth", 0.11);
      noise(0.16, 0.08);
    } else if (name === "rifle") {
      tone(240, 0.04, "square", 0.055);
      noise(0.035, 0.025);
    } else if (name === "arc") {
      tone(480, 0.08, "triangle", 0.06, rand(-160, 160));
      tone(840, 0.05, "sawtooth", 0.035);
    } else if (name === "void") {
      tone(60, 0.22, "sawtooth", 0.1);
      tone(140, 0.18, "triangle", 0.06);
    } else if (name === "empty") {
      tone(80, 0.05, "square", 0.035);
    } else if (name === "reload") {
      tone(150, 0.08, "triangle", 0.03);
      setTimeout(() => tone(240, 0.07, "triangle", 0.03), 150);
    } else if (name === "hit") {
      tone(70, 0.06, "sawtooth", 0.04);
    } else if (name === "kill") {
      tone(110, 0.1, "triangle", 0.05);
      tone(330, 0.08, "square", 0.025);
    } else if (name === "buy") {
      tone(420, 0.06, "triangle", 0.04);
      setTimeout(() => tone(640, 0.08, "triangle", 0.04), 80);
    } else if (name === "door") {
      tone(90, 0.18, "sawtooth", 0.08);
      noise(0.12, 0.04);
    } else if (name === "round") {
      tone(220, 0.12, "square", 0.045);
      setTimeout(() => tone(110, 0.18, "square", 0.04), 160);
    } else if (name === "roundEnd") {
      tone(330, 0.1, "triangle", 0.04);
      setTimeout(() => tone(520, 0.14, "triangle", 0.04), 130);
    } else if (name === "gameOver") {
      tone(120, 0.55, "sawtooth", 0.08);
      setTimeout(() => tone(58, 0.7, "sine", 0.06), 220);
    }
  }

  function updateMouseWorld() {
    mouse.worldX = camera.x + mouse.x;
    mouse.worldY = camera.y + mouse.y;
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
      y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
    };
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d", "r", "e", "f", " ", "shift", "escape", "1", "2"].includes(key)) {
      event.preventDefault();
    }
    if (key === "escape") {
      togglePause();
      return;
    }
    keys.add(key);
    if (game.mode !== "playing") return;
    if (key === "r") startReload();
    if (key === "e") interact();
    if (key === "f") melee();
    if (key === "1") switchWeapon(0);
    if (key === "2") switchWeapon(1);
    if (key === " ") dash();
  }

  function handleKeyUp(event) {
    keys.delete(event.key.toLowerCase());
  }

  function togglePause() {
    if (game.mode === "playing") {
      game.previousMode = "playing";
      game.mode = "paused";
      showOverlay({
        eyebrow: "Deadwave - signal hold",
        title: "Paused",
        text: "Deadwave is suspended in local memory. Resume when the operator is ready.",
        button: "Resume",
        stats: [
          { label: "Round", value: game.round },
          { label: "Points", value: player.points },
          { label: "Kills", value: game.stats.kills },
        ],
      });
    } else if (game.mode === "paused") {
      game.mode = game.previousMode;
      hideOverlay();
      canvas.focus();
    }
  }

  function switchWeapon(slot) {
    if (player.weapons[slot]) {
      player.currentSlot = slot;
      player.reloadTimer = 0;
      playSound("buy");
    }
  }

  function dash() {
    if (player.dashCooldown > 0 || player.stamina < 28) return;
    const dx = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
    const dy = (keys.has("s") ? 1 : 0) - (keys.has("w") ? 1 : 0);
    const len = Math.hypot(dx, dy) || 1;
    const nx = player.x + (dx / len) * 90;
    const ny = player.y + (dy / len) * 90;
    if (canStandAt(nx, ny)) {
      player.x = nx;
      player.y = ny;
      player.stamina -= 28;
      player.dashCooldown = 1.3;
      burstParticles(player.x, player.y, colors.cyan, 14, 80);
    }
  }

  function startReload() {
    const weapon = currentWeapon();
    if (!weapon || player.reloadTimer > 0 || weapon.ammo >= weapon.mag || weapon.reserve <= 0) return;
    const quick = player.perks.has("quickHands") ? 0.62 : 1;
    player.reloadDuration = weapon.reloadMs * quick;
    player.reloadTimer = player.reloadDuration / 1000;
    playSound("reload");
  }

  function finishReload() {
    const weapon = currentWeapon();
    if (!weapon) return;
    const needed = weapon.mag - weapon.ammo;
    const moved = Math.min(needed, weapon.reserve);
    weapon.ammo += moved;
    weapon.reserve -= moved;
  }

  function tryShoot(now) {
    if (game.mode !== "playing" || player.reloadTimer > 0 || !mouse.down) return;
    const weapon = currentWeapon();
    if (!weapon) return;
    const fireBonus = player.perks.has("doubleTrigger") ? 0.76 : 1;
    if (now - player.lastShotAt < weapon.fireMs * fireBonus) return;
    if (weapon.ammo <= 0) {
      player.lastShotAt = now;
      playSound("empty");
      startReload();
      return;
    }
    weapon.ammo -= 1;
    player.lastShotAt = now;
    game.stats.shots += 1;
    updateFavoriteWeapon(weapon);
    playSound(weapon.sound);

    const baseAngle = Math.atan2(mouse.worldY - player.y, mouse.worldX - player.x);
    for (let i = 0; i < weapon.pellets; i += 1) {
      const spread = (Math.random() - 0.5) * weapon.spread * (weapon.pellets > 1 ? 2 : 1);
      fireRay(baseAngle + spread, weapon);
    }

    const kick = weapon.sound === "shotgun" ? 14 : 6;
    burstParticles(player.x + Math.cos(baseAngle) * 22, player.y + Math.sin(baseAngle) * 22, weapon.color, weapon.pellets > 1 ? 12 : 5, kick * 9);
  }

  function fireRay(angle, weapon) {
    const startX = player.x + Math.cos(angle) * 20;
    const startY = player.y + Math.sin(angle) * 20;
    const endX = startX + Math.cos(angle) * weapon.range;
    const endY = startY + Math.sin(angle) * weapon.range;
    let hitsRemaining = weapon.pierce;
    let traceEnd = { x: endX, y: endY };
    const candidates = [];

    for (const zombie of game.zombies) {
      if (zombie.health <= 0) continue;
      const hit = rayCircle(startX, startY, endX, endY, zombie.x, zombie.y, zombie.radius + 3);
      if (hit) {
        candidates.push({ zombie, t: hit.t, px: hit.x, py: hit.y, headshot: hit.perp < zombie.radius * 0.38 });
      }
    }

    candidates.sort((a, b) => a.t - b.t);
    for (const hit of candidates) {
      if (hitsRemaining <= 0) break;
      traceEnd = { x: hit.px, y: hit.py };
      damageZombie(hit.zombie, weapon.damage, hit.headshot, false, weapon);
      hitsRemaining -= 1;
      if (weapon.blast) {
        explode(hit.px, hit.py, weapon.blast, weapon.damage * 0.9, weapon);
      }
    }

    game.traces.push({ x1: startX, y1: startY, x2: traceEnd.x, y2: traceEnd.y, color: weapon.color, ttl: 0.08 });
  }

  function rayCircle(x1, y1, x2, y2, cx, cy, r) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    const t = clamp(((cx - x1) * dx + (cy - y1) * dy) / lenSq, 0, 1);
    const px = x1 + dx * t;
    const py = y1 + dy * t;
    const perp = dist(px, py, cx, cy);
    return perp <= r ? { t, x: px, y: py, perp } : null;
  }

  function explode(x, y, radius, damage, weapon) {
    burstParticles(x, y, weapon.color, 32, 180);
    for (const zombie of game.zombies) {
      if (zombie.health <= 0) continue;
      const d = dist(x, y, zombie.x, zombie.y);
      if (d <= radius) {
        damageZombie(zombie, damage * (1 - d / radius), false, false, weapon);
      }
    }
  }

  function damageZombie(zombie, amount, headshot, meleeKill, weapon) {
    if (zombie.health <= 0) return;
    zombie.health -= amount;
    zombie.flash = 0.08;
    const knockback = zombie.inside ? 0.005 : 0.0015;
    zombie.vx += (zombie.x - player.x) * knockback;
    zombie.vy += (zombie.y - player.y) * knockback;
    awardPoints(10, zombie.x, zombie.y - 20, colors.green);
    if (zombie.health <= 0) {
      killZombie(zombie, headshot, meleeKill, weapon);
    } else if (Math.random() < 0.22) {
      playSound("hit");
    }
  }

  function killZombie(zombie, headshot, meleeKill, weapon) {
    zombie.health = 0;
    zombie.dead = true;
    game.stats.kills += 1;
    const bonus = meleeKill ? 130 : headshot ? 100 : 60;
    if (headshot) game.stats.headshots += 1;
    awardPoints(bonus, zombie.x, zombie.y - 30, headshot ? colors.amber : colors.green);
    burstParticles(zombie.x, zombie.y, headshot ? colors.amber : colors.red, 18, 120);
    playSound("kill");
    if (weapon && weapon.id === "arcCannon") {
      chainArc(zombie.x, zombie.y, weapon);
    }
  }

  function chainArc(x, y, weapon) {
    const target = game.zombies
      .filter((z) => z.health > 0 && dist(x, y, z.x, z.y) < 160)
      .sort((a, b) => dist(x, y, a.x, a.y) - dist(x, y, b.x, b.y))[0];
    if (!target) return;
    game.traces.push({ x1: x, y1: y, x2: target.x, y2: target.y, color: colors.cyan, ttl: 0.15, width: 4 });
    damageZombie(target, weapon.damage * 0.55, false, false, weapon);
  }

  function melee() {
    if (player.meleeCooldown > 0) return;
    player.meleeCooldown = 0.55;
    const angle = Math.atan2(mouse.worldY - player.y, mouse.worldX - player.x);
    let hit = false;
    for (const zombie of game.zombies) {
      if (zombie.health <= 0 || dist(player.x, player.y, zombie.x, zombie.y) > 64) continue;
      const toZombie = Math.atan2(zombie.y - player.y, zombie.x - player.x);
      const delta = Math.abs(Math.atan2(Math.sin(toZombie - angle), Math.cos(toZombie - angle)));
      if (delta < 0.95) {
        damageZombie(zombie, 115, false, true, currentWeapon());
        hit = true;
      }
    }
    playSound(hit ? "hit" : "empty");
    burstParticles(player.x + Math.cos(angle) * 28, player.y + Math.sin(angle) * 28, colors.amber, 8, 90);
  }

  function damagePlayer(amount, zombie) {
    if (game.mode !== "playing") return;
    player.health -= amount;
    player.lastDamageAt = performance.now() / 1000;
    playSound("hit");
    showNotice(`-${amount} health`);
    if (zombie.type === "shock") {
      player.sprintDisabled = 2.6;
      showNotice("Sprint disrupted");
    }
    const pushAngle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
    const nx = player.x + Math.cos(pushAngle) * 22;
    const ny = player.y + Math.sin(pushAngle) * 22;
    if (canStandAt(nx, ny)) {
      player.x = nx;
      player.y = ny;
    }
    if (player.health <= 0) {
      if (player.perks.has("lastNerve") && !player.lastNerveUsed) {
        player.lastNerveUsed = true;
        player.health = Math.round(player.maxHealth * 0.55);
        showNotice("Last Nerve burned");
        burstParticles(player.x, player.y, "#ffffff", 36, 200);
        for (const z of game.zombies) {
          if (dist(player.x, player.y, z.x, z.y) < 180) z.health -= 130;
        }
      } else {
        gameOver();
      }
    }
  }

  function spawnPosition(win) {
    if (win.side === "north") return { x: win.x, y: win.y - 78, ix: win.x, iy: win.y + 34 };
    if (win.side === "south") return { x: win.x, y: win.y + 78, ix: win.x, iy: win.y - 34 };
    if (win.side === "east") return { x: win.x + 78, y: win.y, ix: win.x - 34, iy: win.y };
    return { x: win.x - 78, y: win.y, ix: win.x + 34, iy: win.y };
  }

  function chooseZombieType() {
    const roll = Math.random();
    if (game.powerOn && game.round >= 5 && roll < 0.08) return "shock";
    if (game.round >= 10 && roll < 0.16) return "brute";
    if (game.round >= 6 && roll < 0.28) return "sprinter";
    return "basic";
  }

  function zombieStats(type) {
    const round = game.round;
    const health = 100 + round * 20;
    const speed = 54 + Math.floor(round / 3) * 7;
    const damage = round < 7 ? 25 : round < 13 ? 35 : 50;
    if (type === "sprinter") return { health: health * 0.75, speed: speed * 1.75, damage, radius: 14, color: "#d6ff73" };
    if (type === "brute") return { health: health * 2.35, speed: speed * 0.72, damage: damage + 15, radius: 25, color: "#ff6f82" };
    if (type === "shock") return { health: health * 0.95, speed: speed * 1.15, damage, radius: 17, color: "#8baeb8" };
    return { health, speed, damage, radius: 18, color: "#86d66f" };
  }

  function spawnZombie() {
    const candidates = game.windows.filter((win) => isRoomUnlocked(win.room));
    if (!candidates.length) return;
    const win = pick(candidates);
    const pos = spawnPosition(win);
    const type = chooseZombieType();
    const stats = zombieStats(type);
    game.zombies.push({
      type,
      x: pos.x,
      y: pos.y,
      entryX: pos.ix,
      entryY: pos.iy,
      windowId: win.id,
      health: stats.health,
      maxHealth: stats.health,
      speed: stats.speed,
      damage: stats.damage,
      radius: stats.radius,
      color: stats.color,
      inside: false,
      attackCooldown: rand(0.2, 0.7),
      flash: 0,
      vx: 0,
      vy: 0,
    });
  }

  function updateSpawning(dt) {
    if (game.roundBreak) return;
    game.spawnTimer -= dt;
    if (game.spawnQueue > 0 && game.spawnTimer <= 0 && game.zombies.length < 28) {
      spawnZombie();
      game.spawnQueue -= 1;
      game.spawnTimer = game.spawnInterval;
    }
    if (game.spawnQueue <= 0 && game.zombies.length === 0) {
      endRound();
    }
  }

  function updatePlayer(dt) {
    let dx = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
    let dy = (keys.has("s") ? 1 : 0) - (keys.has("w") ? 1 : 0);
    const len = Math.hypot(dx, dy);
    if (len > 0) {
      dx /= len;
      dy /= len;
    }
    const bolt = player.perks.has("boltBrew") ? 1.16 : 1;
    const canSprint = keys.has("shift") && player.stamina > 0 && player.sprintDisabled <= 0 && len > 0;
    const speed = player.baseSpeed * bolt * (canSprint ? 1.48 : 1);
    if (canSprint) {
      player.stamina = Math.max(0, player.stamina - dt * (player.perks.has("boltBrew") ? 22 : 32));
    } else {
      player.stamina = Math.min(100, player.stamina + dt * (player.perks.has("boltBrew") ? 34 : 24));
    }
    const nx = player.x + dx * speed * dt;
    const ny = player.y + dy * speed * dt;
    if (canStandAt(nx, player.y)) player.x = nx;
    if (canStandAt(player.x, ny)) player.y = ny;

    player.dashCooldown = Math.max(0, player.dashCooldown - dt);
    player.meleeCooldown = Math.max(0, player.meleeCooldown - dt);
    player.sprintDisabled = Math.max(0, player.sprintDisabled - dt);
    if (player.reloadTimer > 0) {
      player.reloadTimer -= dt;
      if (player.reloadTimer <= 0) {
        player.reloadTimer = 0;
        finishReload();
      }
    }
    if (performance.now() / 1000 - player.lastDamageAt > 5 && player.health < player.maxHealth) {
      player.health = Math.min(player.maxHealth, player.health + dt * 18);
    }
  }

  function updateZombies(dt) {
    for (const zombie of game.zombies) {
      zombie.flash = Math.max(0, zombie.flash - dt);
      zombie.x += zombie.vx;
      zombie.y += zombie.vy;
      zombie.vx *= 0.82;
      zombie.vy *= 0.82;

      if (!zombie.inside) {
        const win = game.windows.find((item) => item.id === zombie.windowId);
        if (win && win.planks > 0) {
          win.breakTimer -= dt;
          if (win.breakTimer <= 0) {
            win.planks -= 1;
            win.breakTimer = rand(0.55, 0.9);
            playSound("hit");
            burstParticles(win.x, win.y, colors.amber, 6, 70);
          }
          continue;
        }
        moveZombieToward(zombie, zombie.entryX, zombie.entryY, dt);
        if (dist(zombie.x, zombie.y, zombie.entryX, zombie.entryY) < 10) zombie.inside = true;
        continue;
      }

      const d = dist(zombie.x, zombie.y, player.x, player.y);
      if (d > zombie.radius + player.radius + 5) {
        moveZombieToward(zombie, player.x, player.y, dt);
      } else {
        zombie.attackCooldown -= dt;
        if (zombie.attackCooldown <= 0) {
          damagePlayer(zombie.damage, zombie);
          zombie.attackCooldown = zombie.type === "sprinter" ? 0.82 : 1.12;
        }
      }
    }
    game.zombies = game.zombies.filter((zombie) => zombie.health > 0);
  }

  function moveZombieToward(zombie, x, y, dt) {
    const dx = x - zombie.x;
    const dy = y - zombie.y;
    const len = Math.hypot(dx, dy) || 1;
    zombie.x += (dx / len) * zombie.speed * dt;
    zombie.y += (dy / len) * zombie.speed * dt;
  }

  function updateEffects(dt) {
    for (const trace of game.traces) trace.ttl -= dt;
    for (const p of game.particles) {
      p.ttl -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;
    }
    for (const text of game.floatTexts) {
      text.ttl -= dt;
      text.y += text.vy * dt;
    }
    game.traces = game.traces.filter((trace) => trace.ttl > 0);
    game.particles = game.particles.filter((p) => p.ttl > 0);
    game.floatTexts = game.floatTexts.filter((text) => text.ttl > 0);
    if (noticeTimer > 0) {
      noticeTimer -= dt;
      if (noticeTimer <= 0) hud.notice.classList.remove("is-visible");
    }
  }

  function burstParticles(x, y, color, count, speed) {
    for (let i = 0; i < count; i += 1) {
      const angle = rand(0, TAU);
      const mag = rand(speed * 0.25, speed);
      game.particles.push({
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag,
        color,
        ttl: rand(0.22, 0.65),
        size: rand(2, 7),
      });
    }
  }

  function updateCrate(dt) {
    if (!game.crate.rolling) return;
    game.crate.rollTime -= dt;
    game.crate.tick -= dt;
    if (game.crate.tick <= 0) {
      game.crate.preview = pick(cratePool);
      game.crate.tick = Math.max(0.07, game.crate.rollTime * 0.07);
      playSound("empty");
    }
    if (game.crate.rollTime <= 0) {
      game.crate.rolling = false;
      game.crate.offer = pick(cratePool);
      game.crate.preview = game.crate.offer;
      showNotice(weaponCatalog[game.crate.offer].name);
      playSound("roundEnd");
    }
  }

  function updateRoundBreak(dt) {
    if (!game.roundBreak) return;
    game.breakTimer -= dt;
    if (game.breakTimer <= 0) {
      startNextRound();
    }
  }

  function findInteraction() {
    if (!player) return null;
    const options = [];

    for (const door of doorDefs) {
      if (isRoomUnlocked(door.room)) continue;
      const d = dist(player.x, player.y, door.x + door.w / 2, door.y + door.h / 2);
      if (d < 82) {
        if (door.requires && !isRoomUnlocked(door.requires)) {
          const requiredRoom = roomById(door.requires);
          options.push({ type: "inactive", d, prompt: `${requiredRoom.name} access required` });
        } else {
          options.push({ type: "door", door, d, prompt: `Press E to unlock ${door.label} for ${door.cost}` });
        }
      }
    }

    for (const wall of wallBuys) {
      if (!isRoomUnlocked(wall.room)) continue;
      const d = dist(player.x, player.y, wall.x, wall.y);
      if (d < 74) {
        const owned = player.weapons.some((weapon) => weapon && weapon.id === wall.id);
        const cost = owned ? Math.ceil(wall.cost * 0.45) : wall.cost;
        options.push({
          type: "wallBuy",
          wall,
          d,
          prompt: `Press E to ${owned ? "refill" : "buy"} ${wall.label} for ${cost}`,
        });
      }
    }

    const power = stations.power;
    if (isRoomUnlocked(power.room) && !game.powerOn) {
      const d = dist(player.x, player.y, power.x, power.y);
      if (d < 72) options.push({ type: "power", d, prompt: "Press E to restore power" });
    }

    for (const perk of Object.entries(perkDefs)) {
      const [id, def] = perk;
      if (!isRoomUnlocked(def.room) || !game.powerOn || player.perks.has(id)) continue;
      const d = dist(player.x, player.y, def.x, def.y);
      if (d < 72) options.push({ type: "perk", id, def, d, prompt: `Press E to buy ${def.name} for ${def.cost}` });
    }

    const crate = stations.crate;
    if (isRoomUnlocked(crate.room)) {
      const d = dist(player.x, player.y, crate.x, crate.y);
      if (d < 82) {
        if (!game.powerOn) {
          options.push({ type: "inactive", d, prompt: "Power required" });
        } else if (game.crate.rolling) {
          options.push({ type: "inactive", d, prompt: "Weapon crate cycling" });
        } else if (game.crate.offer) {
          options.push({ type: "crateOffer", d, prompt: `Press E to take ${weaponCatalog[game.crate.offer].name}` });
        } else {
          options.push({ type: "crate", d, prompt: "Press E to open weapon crate for 950" });
        }
      }
    }

    const upgrade = stations.upgrade;
    if (isRoomUnlocked(upgrade.room)) {
      const d = dist(player.x, player.y, upgrade.x, upgrade.y);
      if (d < 82) {
        if (!game.powerOn) {
          options.push({ type: "inactive", d, prompt: "Power required" });
        } else {
          const weapon = currentWeapon();
          const text = weapon && !weapon.upgraded ? `Press E to upgrade ${weapon.name} for 5000` : "Weapon already upgraded";
          options.push({ type: weapon && !weapon.upgraded ? "upgrade" : "inactive", d, prompt: text });
        }
      }
    }

    for (const win of game.windows) {
      if (!isRoomUnlocked(win.room) || win.planks >= win.maxPlanks) continue;
      const d = dist(player.x, player.y, win.x, win.y);
      if (d < 70) options.push({ type: "repair", win, d, prompt: "Hold E to repair barrier" });
    }

    return options.sort((a, b) => a.d - b.d)[0] || null;
  }

  function interact() {
    if (!currentInteraction || currentInteraction.type === "inactive") return;
    const item = currentInteraction;
    if (item.type === "door") {
      if (!spendPoints(item.door.cost)) return;
      game.unlockedRooms.add(item.door.room);
      game.stats.roomsOpened += 1;
      playSound("door");
      showNotice(`${item.door.label} opened`);
      return;
    }
    if (item.type === "wallBuy") {
      const owned = player.weapons.some((weapon) => weapon && weapon.id === item.wall.id);
      const cost = owned ? Math.ceil(item.wall.cost * 0.45) : item.wall.cost;
      if (!spendPoints(cost)) return;
      if (owned) {
        for (const weapon of player.weapons) {
          if (weapon && weapon.id === item.wall.id) {
            weapon.reserve = weapon.reserveMax;
            weapon.ammo = weapon.mag;
          }
        }
      } else {
        addOrReplaceWeapon(createWeapon(item.wall.id));
      }
      playSound("buy");
      showNotice(owned ? `${item.wall.label} refilled` : `${item.wall.label} acquired`);
      return;
    }
    if (item.type === "power") {
      game.powerOn = true;
      playSound("door");
      burstParticles(stations.power.x, stations.power.y, colors.green, 40, 210);
      showNotice("Power restored");
      return;
    }
    if (item.type === "perk") {
      if (player.perks.size >= 4) {
        showNotice("Perk limit reached");
        return;
      }
      if (!spendPoints(item.def.cost)) return;
      applyPerk(item.id);
      playSound("buy");
      showNotice(item.def.name);
      return;
    }
    if (item.type === "crate") {
      if (!spendPoints(950)) return;
      game.crate.rolling = true;
      game.crate.rollTime = 2.5;
      game.crate.tick = 0;
      game.crate.offer = null;
      playSound("buy");
      return;
    }
    if (item.type === "crateOffer") {
      addOrReplaceWeapon(createWeapon(game.crate.offer));
      showNotice(`${weaponCatalog[game.crate.offer].name} acquired`);
      game.crate.offer = null;
      playSound("buy");
      return;
    }
    if (item.type === "upgrade") {
      if (!spendPoints(5000)) return;
      const weapon = currentWeapon();
      player.weapons[player.currentSlot] = createWeapon(weapon.id, true);
      playSound("buy");
      burstParticles(stations.upgrade.x, stations.upgrade.y, colors.violet, 36, 220);
      showNotice(player.weapons[player.currentSlot].name);
      return;
    }
    if (item.type === "repair") {
      repairWindow(item.win);
    }
  }

  let repairPulse = 0;
  function repairWindow(win) {
    if (!win || win.planks >= win.maxPlanks || game.repairPointsThisRound >= 160) return;
    win.planks += 1;
    game.repairPointsThisRound += 10;
    awardPoints(10, win.x, win.y - 18, colors.cyan);
    playSound("buy");
    burstParticles(win.x, win.y, colors.amber, 5, 58);
  }

  function applyPerk(id) {
    player.perks.add(id);
    if (id === "ironGut") {
      player.maxHealth = 170;
      player.health = player.maxHealth;
    }
    if (id === "deepPockets") {
      for (const weapon of player.weapons) {
        if (!weapon) continue;
        const extra = Math.round(weapon.reserveMax * 0.45);
        weapon.reserveMax += extra;
        weapon.reserve += extra;
      }
    }
  }

  function addOrReplaceWeapon(weapon) {
    const existing = player.weapons.findIndex((item) => item && item.id === weapon.id);
    if (existing >= 0) {
      player.weapons[existing] = weapon;
      player.currentSlot = existing;
      return;
    }
    const empty = player.weapons.findIndex((item) => !item);
    if (empty >= 0) {
      player.weapons[empty] = weapon;
      player.currentSlot = empty;
      return;
    }
    player.weapons[player.currentSlot] = weapon;
  }

  function updateInteractions(dt) {
    currentInteraction = findInteraction();
    if (currentInteraction) {
      hud.prompt.textContent = currentInteraction.prompt;
      hud.prompt.classList.add("is-visible");
    } else {
      hud.prompt.textContent = "";
      hud.prompt.classList.remove("is-visible");
    }
    if (currentInteraction && currentInteraction.type === "repair" && keys.has("e")) {
      repairPulse -= dt;
      if (repairPulse <= 0) {
        repairWindow(currentInteraction.win);
        repairPulse = 0.38;
      }
    } else {
      repairPulse = 0;
    }
  }

  function updateHud() {
    if (!player) return;
    const weapon = currentWeapon();
    hud.healthLabel.textContent = `${Math.max(0, Math.ceil(player.health))}`;
    hud.healthFill.style.width = `${clamp((player.health / player.maxHealth) * 100, 0, 100)}%`;
    hud.roundValue.textContent = `${game.round}`;
    hud.roundState.textContent = game.roundBreak
      ? `Next breach in ${Math.ceil(game.breakTimer)}`
      : `${game.spawnQueue + game.zombies.length} hostiles`;
    hud.pointsValue.textContent = `${player.points}`;
    hud.weaponName.textContent = weapon ? `${weapon.name}${player.reloadTimer > 0 ? " - Reloading" : ""}` : "Empty";
    hud.ammoValue.textContent = weapon ? `${weapon.ammo} / ${weapon.reserve}` : "0 / 0";
    hud.perkTray.innerHTML = [...player.perks]
      .map((id) => {
        const perk = perkDefs[id];
        return `<span class="perk-icon" title="${perk.name}" style="color:${perk.color}">${perk.icon}</span>`;
      })
      .join("");
  }

  function update(dt, now) {
    updateEffects(dt);
    if (game.mode !== "playing") return;
    updateMouseWorld();
    updatePlayer(dt);
    tryShoot(now);
    updateSpawning(dt);
    updateRoundBreak(dt);
    updateZombies(dt);
    updateCrate(dt);
    updateInteractions(dt);
  }

  function draw() {
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = "#020303";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    if (player) {
      camera.x += (player.x - VIEW_W / 2 - camera.x) * 0.12;
      camera.y += (player.y - VIEW_H / 2 - camera.y) * 0.12;
    }
    updateMouseWorld();

    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    drawFacility();
    drawTraces();
    drawParticles();
    drawZombies();
    if (player) drawPlayer();
    drawFloatTexts();
    ctx.restore();

    drawScreenEffects();
  }

  function drawFacility() {
    drawGrid();
    for (const connector of connectorDefs) {
      if (isConnectorUnlocked(connector)) drawConnector(connector);
    }
    for (const room of roomDefs) {
      if (isRoomUnlocked(room.id)) drawRoom(room);
      else drawLockedRoom(room);
    }
    for (const door of doorDefs) drawDoor(door);
    for (const win of game.windows.length ? game.windows : windowDefs.map((win) => ({ ...win, planks: 5, maxPlanks: 5 }))) {
      if (isRoomUnlocked(win.room)) drawWindow(win);
    }
    for (const wall of wallBuys) {
      if (isRoomUnlocked(wall.room)) drawWallBuy(wall);
    }
    drawStations();
    drawHazards();
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = "rgba(68, 255, 153, 0.035)";
    ctx.lineWidth = 1;
    for (let x = -1200; x <= 1100; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, -880);
      ctx.lineTo(x, 420);
      ctx.stroke();
    }
    for (let y = -880; y <= 420; y += 40) {
      ctx.beginPath();
      ctx.moveTo(-1200, y);
      ctx.lineTo(1100, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawRoom(room) {
    ctx.fillStyle = room.tint;
    ctx.fillRect(room.x, room.y, room.w, room.h);
    for (let x = room.x; x < room.x + room.w; x += 48) {
      for (let y = room.y; y < room.y + room.h; y += 48) {
        ctx.fillStyle = stableNoise(room.id, x, y) < 0.006 ? "rgba(232, 255, 247, 0.06)" : "rgba(255,255,255,0.015)";
        ctx.fillRect(x + 2, y + 2, 44, 44);
      }
    }
    ctx.strokeStyle = game.powerOn ? "rgba(68, 255, 153, 0.72)" : "rgba(255, 53, 93, 0.46)";
    ctx.lineWidth = 8;
    ctx.strokeRect(room.x, room.y, room.w, room.h);
    ctx.strokeStyle = "rgba(232, 255, 247, 0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(room.x + 10, room.y + 10, room.w - 20, room.h - 20);
    drawLabel(room.name, room.x + 20, room.y + 28, game.powerOn ? colors.green : colors.red);
  }

  function drawConnector(connector) {
    ctx.save();
    ctx.fillStyle = "rgba(15, 32, 31, 0.92)";
    ctx.fillRect(connector.x, connector.y, connector.w, connector.h);
    ctx.strokeStyle = game.powerOn ? "rgba(68, 255, 153, 0.45)" : "rgba(255, 207, 102, 0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(connector.x, connector.y, connector.w, connector.h);
    ctx.strokeStyle = "rgba(68, 215, 255, 0.16)";
    ctx.lineWidth = 1;
    for (let x = connector.x + 18; x < connector.x + connector.w; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, connector.y + 8);
      ctx.lineTo(x, connector.y + connector.h - 8);
      ctx.stroke();
    }
    for (let y = connector.y + 18; y < connector.y + connector.h; y += 28) {
      ctx.beginPath();
      ctx.moveTo(connector.x + 8, y);
      ctx.lineTo(connector.x + connector.w - 8, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawLockedRoom(room) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#050708";
    ctx.fillRect(room.x, room.y, room.w, room.h);
    ctx.strokeStyle = "rgba(255, 53, 93, 0.35)";
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 12]);
    ctx.strokeRect(room.x, room.y, room.w, room.h);
    ctx.restore();
  }

  function drawDoor(door) {
    const unlocked = isRoomUnlocked(door.room);
    const available = !door.requires || isRoomUnlocked(door.requires);
    ctx.save();
    ctx.fillStyle = unlocked ? "rgba(68, 255, 153, 0.34)" : available ? "rgba(255, 53, 93, 0.68)" : "rgba(95, 88, 94, 0.64)";
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.strokeStyle = unlocked ? colors.green : available ? colors.red : "rgba(180, 180, 180, 0.6)";
    ctx.lineWidth = 2;
    ctx.strokeRect(door.x, door.y, door.w, door.h);
    if (!unlocked) {
      const label = available ? `${door.cost}` : "LOCK";
      drawLabel(label, door.x + door.w / 2 - 18, door.y + door.h / 2 + 4, available ? colors.amber : "#bbbbbb");
    }
    ctx.restore();
  }

  function drawWindow(win) {
    ctx.save();
    ctx.translate(win.x, win.y);
    if (win.side === "east" || win.side === "west") ctx.rotate(Math.PI / 2);
    ctx.fillStyle = "rgba(68, 215, 255, 0.16)";
    ctx.fillRect(-42, -10, 84, 20);
    ctx.strokeStyle = colors.cyan;
    ctx.lineWidth = 2;
    ctx.strokeRect(-42, -10, 84, 20);
    ctx.fillStyle = colors.amber;
    const planks = win.planks ?? 5;
    for (let i = 0; i < planks; i += 1) {
      ctx.fillRect(-38 + i * 16, -16, 11, 32);
    }
    ctx.restore();
  }

  function drawWallBuy(wall) {
    ctx.save();
    ctx.translate(wall.x, wall.y);
    ctx.fillStyle = "rgba(255, 207, 102, 0.12)";
    ctx.fillRect(-38, -18, 76, 36);
    ctx.strokeStyle = colors.amber;
    ctx.lineWidth = 2;
    ctx.strokeRect(-38, -18, 76, 36);
    ctx.fillStyle = colors.amber;
    ctx.fillRect(-24, -3, 48, 6);
    ctx.fillRect(5, -9, 24, 6);
    drawLabel(wall.label, -48, 36, colors.amber);
    ctx.restore();
  }

  function drawStations() {
    const power = stations.power;
    if (isRoomUnlocked(power.room)) {
      ctx.save();
      ctx.translate(power.x, power.y);
      ctx.fillStyle = game.powerOn ? "rgba(68, 255, 153, 0.22)" : "rgba(255, 53, 93, 0.18)";
      ctx.fillRect(-26, -32, 52, 64);
      ctx.strokeStyle = game.powerOn ? colors.green : colors.red;
      ctx.lineWidth = 2;
      ctx.strokeRect(-26, -32, 52, 64);
      ctx.fillStyle = game.powerOn ? colors.green : colors.red;
      ctx.fillRect(-8, -20, 16, 40);
      drawLabel("POWER", -28, 50, game.powerOn ? colors.green : colors.red);
      ctx.restore();
    }

    for (const [id, perk] of Object.entries(perkDefs)) {
      if (!isRoomUnlocked(perk.room)) continue;
      ctx.save();
      ctx.translate(perk.x, perk.y);
      ctx.fillStyle = game.powerOn ? `${perk.color}2a` : "rgba(80,80,80,0.22)";
      ctx.fillRect(-24, -34, 48, 68);
      ctx.strokeStyle = game.powerOn ? perk.color : "rgba(160,160,160,0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(-24, -34, 48, 68);
      ctx.fillStyle = game.powerOn ? perk.color : "rgba(160,160,160,0.5)";
      ctx.fillRect(-12, -12, 24, 24);
      drawLabel(player && player.perks.has(id) ? "OWNED" : perk.name, -42, 50, game.powerOn ? perk.color : "#777");
      ctx.restore();
    }

    const crate = stations.crate;
    if (isRoomUnlocked(crate.room)) {
      ctx.save();
      ctx.translate(crate.x, crate.y);
      const active = game.powerOn;
      const preview = game.crate.offer || game.crate.preview;
      ctx.fillStyle = active ? "rgba(191, 102, 255, 0.22)" : "rgba(80,80,80,0.2)";
      ctx.fillRect(-40, -28, 80, 56);
      ctx.strokeStyle = active ? colors.violet : "#666";
      ctx.lineWidth = 3;
      ctx.strokeRect(-40, -28, 80, 56);
      ctx.fillStyle = active ? weaponCatalog[preview].color : "#777";
      ctx.fillRect(-18, -8, 36, 16);
      if (game.crate.rolling || game.crate.offer) {
        drawLabel(weaponCatalog[preview].name, -58, -44, weaponCatalog[preview].color);
      }
      drawLabel("CRATE", -28, 48, active ? colors.violet : "#777");
      ctx.restore();
    }

    const upgrade = stations.upgrade;
    if (isRoomUnlocked(upgrade.room)) {
      ctx.save();
      ctx.translate(upgrade.x, upgrade.y);
      ctx.fillStyle = game.powerOn ? "rgba(68, 215, 255, 0.18)" : "rgba(80,80,80,0.2)";
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = game.powerOn ? colors.cyan : "#666";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = game.powerOn ? colors.cyan : "#777";
      ctx.fillRect(-24, -4, 48, 8);
      ctx.fillRect(-4, -24, 8, 48);
      drawLabel("UPGRADE", -42, 58, game.powerOn ? colors.cyan : "#777");
      ctx.restore();
    }
  }

  function drawHazards() {
    const marks = [
      [-190, -30, colors.red],
      [120, 104, colors.red],
      [470, -74, colors.amber],
      [-70, -462, colors.cyan],
      [-700, -32, colors.amber],
      [-670, -540, colors.violet],
    ];
    for (const [x, y, color] of marks) {
      if (!isInsideUnlockedRooms(x, y)) continue;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((x + y) * 0.01);
      ctx.fillStyle = `${color}22`;
      ctx.fillRect(-26, -7, 52, 14);
      ctx.fillRect(-8, -24, 16, 48);
      ctx.restore();
    }
  }

  function drawLabel(text, x, y, color) {
    ctx.save();
    ctx.font = "12px Saniretro, Consolas, monospace";
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawZombies() {
    for (const zombie of game.zombies) {
      ctx.save();
      ctx.translate(zombie.x, zombie.y);
      const color = zombie.flash > 0 ? "#ffffff" : zombie.color;
      ctx.fillStyle = "rgba(0,0,0,0.38)";
      ctx.fillRect(-zombie.radius, zombie.radius - 3, zombie.radius * 2, 8);
      ctx.fillStyle = color;
      ctx.fillRect(-zombie.radius, -zombie.radius, zombie.radius * 2, zombie.radius * 2);
      ctx.fillStyle = "rgba(5,7,8,0.82)";
      ctx.fillRect(-zombie.radius * 0.45, -zombie.radius * 0.58, 5, 5);
      ctx.fillRect(zombie.radius * 0.2, -zombie.radius * 0.58, 5, 5);
      if (!zombie.inside) {
        ctx.fillStyle = colors.amber;
        ctx.fillRect(-zombie.radius * 0.72, zombie.radius * 0.25, zombie.radius * 0.58, 4);
        ctx.fillRect(zombie.radius * 0.16, zombie.radius * 0.25, zombie.radius * 0.58, 4);
      }
      if (zombie.type === "brute") {
        ctx.strokeStyle = colors.red;
        ctx.lineWidth = 3;
        ctx.strokeRect(-zombie.radius - 3, -zombie.radius - 3, zombie.radius * 2 + 6, zombie.radius * 2 + 6);
      }
      if (zombie.type === "shock") {
        ctx.strokeStyle = colors.cyan;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-zombie.radius, 0);
        ctx.lineTo(-4, -8);
        ctx.lineTo(4, 8);
        ctx.lineTo(zombie.radius, 0);
        ctx.stroke();
      }
      const hp = clamp(zombie.health / zombie.maxHealth, 0, 1);
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(-zombie.radius, -zombie.radius - 11, zombie.radius * 2, 4);
      ctx.fillStyle = colors.red;
      ctx.fillRect(-zombie.radius, -zombie.radius - 11, zombie.radius * 2 * hp, 4);
      ctx.restore();
    }
  }

  function drawPlayer() {
    const angle = Math.atan2(mouse.worldY - player.y, mouse.worldX - player.x);
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.fillRect(-15, 13, 34, 8);
    ctx.fillStyle = colors.green;
    ctx.fillRect(-14, -14, 28, 28);
    ctx.fillStyle = colors.dark;
    ctx.fillRect(0, -5, 30, 10);
    ctx.fillStyle = currentWeapon().color;
    ctx.fillRect(14, -3, 20, 6);
    ctx.fillStyle = colors.cyan;
    ctx.fillRect(-6, -8, 5, 5);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = player.sprintDisabled > 0 ? colors.red : "rgba(68, 215, 255, 0.42)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 5, -Math.PI / 2, -Math.PI / 2 + TAU * (player.stamina / 100));
    ctx.stroke();
    ctx.restore();
  }

  function drawTraces() {
    for (const trace of game.traces) {
      ctx.save();
      ctx.globalAlpha = clamp(trace.ttl / 0.15, 0, 1);
      ctx.strokeStyle = trace.color;
      ctx.lineWidth = trace.width || 2;
      ctx.shadowColor = trace.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(trace.x1, trace.y1);
      ctx.lineTo(trace.x2, trace.y2);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawParticles() {
    for (const p of game.particles) {
      ctx.save();
      ctx.globalAlpha = clamp(p.ttl / 0.65, 0, 1);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      ctx.restore();
    }
  }

  function drawFloatTexts() {
    ctx.save();
    ctx.font = "14px Saniretro, Consolas, monospace";
    ctx.textAlign = "center";
    for (const text of game.floatTexts) {
      ctx.globalAlpha = clamp(text.ttl, 0, 1);
      ctx.fillStyle = text.color;
      ctx.shadowColor = text.color;
      ctx.shadowBlur = 8;
      ctx.fillText(text.text, text.x, text.y);
    }
    ctx.restore();
  }

  function drawScreenEffects() {
    if (!player) return;
    const hurt = clamp(1 - player.health / player.maxHealth, 0, 1);
    if (hurt > 0.15) {
      ctx.save();
      ctx.globalAlpha = hurt * 0.28;
      ctx.fillStyle = colors.red;
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      ctx.restore();
    }
    if (game.roundBreak) {
      ctx.save();
      ctx.font = "22px LARAZ, Consolas, monospace";
      ctx.fillStyle = colors.amber;
      ctx.textAlign = "center";
      ctx.shadowColor = colors.amber;
      ctx.shadowBlur = 12;
      ctx.fillText(`Next round in ${Math.ceil(game.breakTimer)}`, VIEW_W / 2, 118);
      ctx.restore();
    }
    ctx.save();
    ctx.strokeStyle = colors.cyan;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mouse.x - 12, mouse.y);
    ctx.lineTo(mouse.x - 4, mouse.y);
    ctx.moveTo(mouse.x + 4, mouse.y);
    ctx.lineTo(mouse.x + 12, mouse.y);
    ctx.moveTo(mouse.x, mouse.y - 12);
    ctx.lineTo(mouse.x, mouse.y - 4);
    ctx.moveTo(mouse.x, mouse.y + 4);
    ctx.lineTo(mouse.x, mouse.y + 12);
    ctx.stroke();
    ctx.restore();
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    update(dt, now);
    draw();
    updateHud();
    requestAnimationFrame(loop);
  }

  canvas.addEventListener("mousemove", (event) => {
    const point = canvasPoint(event);
    mouse.x = point.x;
    mouse.y = point.y;
  });

  canvas.addEventListener("mousedown", (event) => {
    initAudio();
    canvas.focus();
    if (event.button === 0) mouse.down = true;
  });

  window.addEventListener("mouseup", () => {
    mouse.down = false;
  });

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  hud.primaryButton.addEventListener("click", () => {
    initAudio();
    if (game.mode === "paused") {
      togglePause();
    } else {
      resetGame();
    }
    canvas.focus();
  });

  resetPlayer();
  game.windows = windowDefs.map((win) => ({ ...win, planks: 5, maxPlanks: 5, breakTimer: 1 }));
  const high = getHighScore();
  showOverlay({
    eyebrow: "Deadwave - restricted signal",
    title: "Deadwave",
    text: "A concealed archive-side experiment. Hold the room, recover salvage, and document the breach.",
    button: "Open File",
    stats: [
      { label: "Best Round", value: high.highestRound || 0 },
      { label: "Best Kills", value: high.kills || 0 },
      { label: "Best Time", value: high.timeSurvived ? formatTime(high.timeSurvived) : "0:00" },
    ],
  });
  requestAnimationFrame(loop);
})();
