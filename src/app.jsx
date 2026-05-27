// Source extracted from the old inline app blocks. Run npm run build:app after editing this file.
(function () {
  const { useState, useMemo, useEffect, useCallback } = React;
  const ZD = window.ZD;

  // ─── image base ────────────────────────────────────────────────────────
  // Path from index.html to the Images folder. Lives inside the project
  // directory, so ready to upload to group935.net as-is.
  const IMG_BASE = window.G935_ASSET_BASE || './Images';
  const FONT_BASE = window.G935_FONT_BASE || './Fonts';
  const PAPER_BADGE_SMALLS = [
    IMG_BASE + '/Icons/PaperBadgesmall1.png',
    IMG_BASE + '/Icons/PaperBadgesmall2.png',
    IMG_BASE + '/Icons/PaperBadgesmall3.png',
    IMG_BASE + '/Icons/PaperBadgesmall4.png',
  ];
  const SHELF_115_LINES = [
    IMG_BASE + '/Icons/115Shelf.png',
    IMG_BASE + '/Icons/115Shelf2.png',
    IMG_BASE + '/Icons/115Shelf3.png',
  ];
  function gameImg(game, file) { return IMG_BASE + '/Games/' + game.imgDir + '/' + file; }
  function charImg(portrait) { return portrait ? (IMG_BASE + '/Characters/' + portrait.dir + '/' + portrait.file) : null; }
  function mapImg(map, file) { return map && map.media && file ? (IMG_BASE + '/Games/' + map.media.dir + '/' + file) : null; }
  function gameAssetImg(asset, map) {
    if (!asset) return null;
    if (typeof asset === 'string') return mapImg(map, asset);
    if (asset.src) return asset.src;
    const dir = asset.dir || (map && map.media && map.media.dir);
    return dir && asset.file ? (IMG_BASE + '/Games/' + dir + '/' + asset.file) : null;
  }
  function weaponImg(weapon, file) { return weapon && weapon.media && file ? (IMG_BASE + '/Weapons/Wonder Weapons/' + weapon.media.dir + '/' + file) : null; }
  function perkImg(perk, file) { return perk && perk.media && file ? (IMG_BASE + '/Perks/' + perk.media.dir + '/' + file) : null; }
  function callingCardImg(ee) { return ee && ee.rewardGif ? (IMG_BASE + '/CallingCards/EE Rewards/BO7/' + ee.rewardGif) : null; }
  const RELIC_ASSET_BASE = IMG_BASE + '/Games/Black Ops 7/Relics';
  const RELIC_ICON_FILES = {
    'lawyers-pen': 'LawyersPenRelic.png',
    'dragon-wings': 'dragonwingsrelic.png',
    'teddy-bear': 'TeddyBearRelic.png',
    gong: 'GongRelic.png',
    seed: 'seedrelic.png',
    rocket: 'rocketrelic.png',
    'power-switch': 'powerswitchrelic.png',
    'vril-sphere': 'vrilsphererelic.png',
    'samanthas-drawing': 'Samsdrawingrelic.png',
    'focusing-stone': 'focusingstonerelic.png',
    'spider-fang': 'spiderfangrelic.png',
    'matryoshka-doll': 'Matryoshkadollrelic.png',
    'summoning-key': 'summoningkeyrelic.png',
    'stuffed-elephant': 'elephantrelic.png',
    'dancing-arnie': 'littlearnierelic.png',
    bus: 'busrelic.png',
    dragon: 'dragonrelic.png',
    'blood-vials': 'bloodvialsrelic.png',
    'golden-spork': 'golensporkrelic.png',
    'civil-protector': 'civilprotectorheadrelic.png',
    'mangler-helmet': 'manglerhelmetrelic.png',
    'agarthan-device': 'agarthandevicerelic.png',
    'music-box': 'musicboxrelic.png',
  };
  function relicIconImg(relic) {
    const file = relic && RELIC_ICON_FILES[relic.id];
    return file ? (RELIC_ASSET_BASE + '/RelicIcons/' + file) : null;
  }
  function relicPageImg(file) {
    return RELIC_ASSET_BASE + '/Page Elements/' + file;
  }

  const HOME_BO7_EE_POOL = (ZD.bo7EasterEggs || []).filter((ee) => {
    const map = ZD.maps.find((m) => m.id === ee.map);
    return map && map.game === 'bo7' && ee.rewardGif;
  });
  const HOME_FEATURED_EE_STORAGE_KEY = 'g935.homeFeaturedEE.lastMap.v1';
  const HOME_DAILY_SONG_STORAGE_KEY = 'g935.homeDailySong.v1';
  function pickHomeFeaturedEE(pool) {
    if (!pool.length) return ZD.sampleEE;
    let lastMap = null;
    try {
      lastMap = window.localStorage && window.localStorage.getItem(HOME_FEATURED_EE_STORAGE_KEY);
    } catch (err) {}
    const options = pool.length > 1 && lastMap ? pool.filter((ee) => ee.map !== lastMap) : pool;
    const selectedPool = options.length ? options : pool;
    const selected = selectedPool[Math.floor(Math.random() * selectedPool.length)];
    try {
      if (selected && selected.map && window.localStorage) {
        window.localStorage.setItem(HOME_FEATURED_EE_STORAGE_KEY, selected.map);
      }
    } catch (err) {}
    return selected;
  }
  const HOME_FEATURED_EE = pickHomeFeaturedEE(HOME_BO7_EE_POOL);

  function homeDailySongDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function homeDailySongDayStamp(dateKey) {
    const parts = String(dateKey || '').split('-').map((part) => Number(part));
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
  }

  function homeDailySongRecentHistory(record, todayKey, validIds) {
    const todayStamp = homeDailySongDayStamp(todayKey);
    const raw = [];
    if (record && Array.isArray(record.history)) raw.push(...record.history);
    if (record && record.date && record.songId) raw.push({ date: record.date, songId: record.songId });
    const seen = new Set();
    return raw
      .map((item) => ({ date: String((item && item.date) || ''), songId: String((item && item.songId) || '') }))
      .filter((item) => item.date && validIds.has(item.songId))
      .filter((item) => {
        const stamp = homeDailySongDayStamp(item.date);
        if (stamp === null || todayStamp === null) return false;
        const age = Math.floor((todayStamp - stamp) / 86400000);
        return age >= 0 && age < 7;
      })
      .filter((item) => {
        const key = item.date + '\u0001' + item.songId;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function pickHomeDailySong(pool) {
    if (!pool.length) return null;
    const todayKey = homeDailySongDateKey();
    const validIds = new Set(pool.map((song) => song.id));
    let record = null;
    try {
      const raw = window.localStorage && window.localStorage.getItem(HOME_DAILY_SONG_STORAGE_KEY);
      record = raw ? JSON.parse(raw) : null;
    } catch (err) {}
    if (record && record.date === todayKey && validIds.has(record.songId)) {
      return pool.find((song) => song.id === record.songId) || pool[0];
    }
    const recentHistory = homeDailySongRecentHistory(record, todayKey, validIds);
    const recentSongIds = new Set(recentHistory.map((item) => item.songId));
    const options = pool.filter((song) => !recentSongIds.has(song.id));
    const selectedPool = options.length ? options : pool;
    const selected = selectedPool[Math.floor(Math.random() * selectedPool.length)];
    const nextHistory = recentHistory
      .filter((item) => item.date !== todayKey)
      .concat({ date: todayKey, songId: selected.id })
      .slice(-7);
    try {
      if (window.localStorage) {
        window.localStorage.setItem(HOME_DAILY_SONG_STORAGE_KEY, JSON.stringify({
          date: todayKey,
          songId: selected.id,
          history: nextHistory,
        }));
      }
    } catch (err) {}
    return selected;
  }

  const T = {
    bg0:     '#0a0908',
    bg1:     '#100f0d',
    bg2:     '#16140f',
    bg3:     '#1f1c16',
    bgHover: '#26221a',
    line:    '#2a2620',
    lineHi:  '#3a3530',
    bone:    '#e8e2d4',
    mute:    '#9b9282',
    faint:   '#605949',
    e115:    '#9aff6e',
    e115dim: '#4a7a2c',
    e115bg:  'rgba(154, 255, 110, 0.08)',
    blood:   '#d62828',
    bloodH:  '#ef3a3a',
    hazard:  '#f5c518',
    hazardDim:'#9a7d10',
    display: '"Oswald", "Barlow Condensed", "Inter", sans-serif',
    sans:    '"IBM Plex Sans", "Inter", system-ui, sans-serif',
    mono:    '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
    e115Font:'"LARAZ", "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
  };

  if (typeof document !== 'undefined' && !document.getElementById('pap-styles')) {
    const s = document.createElement('style');
    s.id = 'pap-styles';
    s.textContent = `
      @font-face {
        font-family: "HelpMe";
        src: url("${FONT_BASE}/Help%20Scratch%20Writing/help-me/HelpMe.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "ShadowedRDF";
        src: url("${FONT_BASE}/BadgeFont/shadowed-rdf/Shadowed%20RDF%20Regular.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "LARAZ";
        src: url("${FONT_BASE}/laraz/LARAZ%20Regular.ttf") format("truetype");
        font-display: swap;
        font-weight: 400;
      }
      @font-face {
        font-family: "LARAZ";
        src: url("${FONT_BASE}/laraz/LARAZ%20Light.ttf") format("truetype");
        font-display: swap;
        font-weight: 300;
      }
      .pap-link { color: ${T.bone}; text-decoration: none; cursor: pointer; background: transparent; border: 0; font: inherit; padding: 0; }
      .pap-link:hover { color: ${T.e115}; }
      .pap-card { background: ${T.bg2}; border: 1px solid ${T.line}; transition: border-color .12s, transform .12s, background .12s; }
      .pap-card:hover { border-color: ${T.e115dim}; background: ${T.bg3}; }
      .pap-card-clickable { cursor: pointer; }
      .pap-card-clickable:hover { transform: translateY(-1px); }
      .pap-paper-badge {
        position: relative;
        isolation: isolate;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 38px;
        min-width: 116px;
        max-width: 100%;
        padding: 9px 17px 10px;
        color: ${T.bg0};
        font-family: "ShadowedRDF", ${T.display};
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 1.45px;
        line-height: 1.05;
        text-transform: uppercase;
      }
      .pap-paper-badge img {
        position: absolute;
        inset: -3px -5px;
        z-index: 0;
        width: calc(100% + 10px);
        height: calc(100% + 6px);
        object-fit: fill;
        pointer-events: none;
        filter: drop-shadow(0 5px 8px rgba(0,0,0,0.26));
      }
      .pap-paper-badge-label {
        position: relative;
        display: inline-block;
        z-index: 1;
        overflow-wrap: anywhere;
        text-align: center;
        transform: translateY(2px);
        -webkit-text-stroke: 0.2px currentColor;
        paint-order: stroke fill;
        text-shadow:
          0 1px 0 rgba(232,226,212,0.28),
          0.35px 0 0 currentColor,
          -0.35px 0 0 currentColor,
          0 0.35px 0 currentColor,
          0 -0.35px 0 currentColor;
      }
      .pap-image-link { display: block; color: inherit; text-decoration: none; cursor: zoom-in; }
      .pap-image-link:hover { border-color: ${T.e115dim} !important; }
      .pap-image-link:focus-visible { outline: 2px solid ${T.e115}; outline-offset: 3px; }
      .pap-image-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        gap: 12px;
        padding: clamp(14px, 3vw, 28px);
        background: rgba(10, 9, 8, 0.96);
      }
      .pap-image-modal-close {
        justify-self: end;
        width: 42px;
        height: 42px;
        border: 1px solid ${T.lineHi};
        background: ${T.bg1};
        color: ${T.bone};
        cursor: pointer;
        font-family: ${T.display};
        font-size: 18px;
        font-weight: 700;
      }
      .pap-image-modal-close:hover,
      .pap-image-modal-close:focus-visible {
        color: ${T.e115};
        border-color: ${T.e115};
        outline: none;
      }
      .pap-image-modal-img {
        align-self: center;
        justify-self: center;
        display: block;
        max-width: 100%;
        max-height: calc(100vh - 132px);
        object-fit: contain;
        background: ${T.bg0};
        border: 1px solid ${T.lineHi};
        box-shadow: 0 22px 70px rgba(0,0,0,0.65);
      }
      .pap-image-modal-title {
        justify-self: center;
        max-width: min(100%, 900px);
        color: ${T.mute};
        font-family: ${T.mono};
        font-size: 11px;
        letter-spacing: 1.8px;
        line-height: 1.4;
        text-align: center;
        text-transform: uppercase;
      }
      .pap-gallery-modal-panel {
        min-height: 0;
        overflow: auto;
        padding: 2px 4px 18px;
      }
      .pap-gallery-modal-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        max-width: 1120px;
        margin: 0 auto;
      }
      .pap-gallery-more {
        width: 100%;
        height: 220px;
        position: relative;
        overflow: hidden;
        background: ${T.bg1};
        border: 1px solid ${T.line};
        color: ${T.bone};
        cursor: pointer;
        text-align: left;
      }
      .pap-gallery-more:hover,
      .pap-gallery-more:focus-visible {
        border-color: ${T.e115};
        outline: none;
      }
      .pap-gallery-more img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.38;
        filter: saturate(0.86) contrast(1.08);
      }
      .pap-gallery-more-body {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 8px;
        padding: 18px;
        background: linear-gradient(180deg, rgba(10,9,8,0.18), rgba(10,9,8,0.86));
      }
      .pap-relic-stage {
        position: relative;
        overflow: visible;
        min-height: 0;
        padding: 28px clamp(18px, 3vw, 44px) 34px;
        background: transparent;
        border: 0;
      }
      .pap-relic-stage::before,
      .pap-relic-stage::after {
        display: none;
      }
      .pap-relic-stage-inner {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0;
        align-items: start;
      }
      .pap-relic-skulls {
        justify-self: center;
        width: min(76vw, 980px);
        max-width: 100%;
        margin-top: -14px;
        margin-bottom: 5px;
        opacity: 0.98;
        filter: drop-shadow(0 28px 46px rgba(0,0,0,0.58));
        pointer-events: none;
      }
      .pap-relic-effect-panel {
        position: absolute;
        top: 28px;
        right: clamp(18px, 3vw, 44px);
        width: min(31vw, 360px);
        z-index: 3;
        background: transparent;
        border: 0;
        box-shadow: none;
        text-shadow: 0 3px 12px rgba(0,0,0,0.78);
      }
      .pap-relic-effect-panel { padding: 0; overflow: visible; }
      .pap-relic-effect-head {
        padding: 0 0 14px;
        text-align: right;
        background: transparent;
        border-bottom: 0;
      }
      .pap-relic-effect-body {
        display: grid;
        grid-template-columns: 86px 1fr;
        gap: 18px;
        align-items: center;
        padding: 0;
      }
      .pap-relic-effect-copy {
        text-align: right;
        justify-self: end;
      }
      .pap-relic-effect-icon {
        width: 86px;
        height: 86px;
        object-fit: contain;
        filter: drop-shadow(0 12px 18px rgba(0,0,0,0.42));
      }
      .pap-relic-board-wrap {
        width: min(100%, 1180px);
        margin: -82px auto 0;
        transform: translateX(-22px);
        align-self: start;
      }
      .pap-relic-board {
        position: relative;
        width: 100%;
        aspect-ratio: 1677 / 720;
        background: url("${IMG_BASE}/Games/Black Ops 7/Relics/Page Elements/relicgrid.png") center top / 100% auto no-repeat;
      }
      .pap-relic-board-grid {
        position: absolute;
        left: 11.7%;
        right: 0.9%;
        top: 16.95%;
        bottom: 1.4%;
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
        column-gap: 1.16%;
        row-gap: 4.2%;
      }
      .pap-relic-slot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        background: transparent;
        color: ${T.bone};
        cursor: pointer;
        overflow: hidden;
      }
      .pap-relic-slot:hover,
      .pap-relic-slot:focus-visible,
      .pap-relic-slot.is-active {
        border-color: rgba(109, 176, 255, 0.9);
        box-shadow: inset 0 0 0 1px rgba(109, 176, 255, 0.45), 0 0 22px rgba(64, 135, 210, 0.26);
        outline: none;
      }
      .pap-relic-slot img {
        width: 58%;
        height: 58%;
        object-fit: contain;
        filter: drop-shadow(0 10px 13px rgba(0,0,0,0.55));
      }
      .pap-relic-slot-placeholder {
        font-family: ${T.display};
        font-size: clamp(32px, 4vw, 64px);
        font-weight: 800;
        color: ${T.bone};
        text-shadow: 0 8px 22px rgba(0,0,0,0.58);
      }
      .pap-relic-selected-file {
        display: grid;
        grid-template-columns: minmax(0, 0.45fr) minmax(0, 1fr);
        gap: 20px;
        align-items: start;
      }
      .pap-relic-selected-portrait {
        min-height: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: linear-gradient(180deg, ${T.bg2}, ${T.bg1});
        border: 1px solid ${T.line};
      }
      .pap-relic-selected-portrait img {
        width: min(80%, 220px);
        height: auto;
        object-fit: contain;
        filter: drop-shadow(0 20px 30px rgba(0,0,0,0.42));
      }
      .pap-btn { font-family: ${T.display}; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; padding: 14px 22px; font-size: 13px; transition: background .12s, color .12s; border: 0; }
      .pap-btn-primary { background: ${T.e115}; color: ${T.bg0}; }
      .pap-btn-primary:hover { background: ${T.bone}; }
      .pap-btn-ghost { background: transparent; color: ${T.bone}; border: 1px solid ${T.lineHi}; }
      .pap-btn-ghost:hover { border-color: ${T.e115}; color: ${T.e115}; }
      .pap-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; font-family: ${T.mono}; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; border: 1px solid ${T.line}; color: ${T.mute}; background: transparent; cursor: pointer; }
      .pap-chip:hover { color: ${T.bone}; border-color: ${T.lineHi}; }
      .pap-chip.is-active { color: ${T.e115}; border-color: ${T.e115dim}; background: ${T.e115bg}; }
      .pap-row { transition: background .08s; }
      .pap-row:hover { background: ${T.bg2}; }
      .pap-song-row { display: grid; grid-template-columns: 52px minmax(180px, 1.35fr) minmax(130px, .85fr) minmax(220px, 1.6fr) 24px; gap: 18px; align-items: center; background: transparent; border: 0; padding: 14px 20px; cursor: pointer; color: ${T.bone}; text-align: left; width: 100%; }
      .pap-song-main, .pap-song-map, .pap-song-activation { min-width: 0; }
      .pap-song-index { grid-column: 1; }
      .pap-song-main { grid-column: 2; }
      .pap-song-map { grid-column: 3; }
      .pap-song-activation { grid-column: 4; font-family: ${T.sans}; font-size: 13px; color: ${T.mute}; line-height: 1.5; }
      .pap-song-arrow { grid-column: 5; justify-self: end; }
      .pap-song-title { font-size: 18px; color: ${T.bone}; overflow-wrap: anywhere; }
      .pap-vote-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; margin-top: 24px; }
      .pap-vote-card { padding: 0; color: ${T.bone}; text-align: left; display: flex; flex-direction: column; overflow: hidden; position: relative; }
      .pap-vote-card.is-selected { border-color: ${T.e115}; box-shadow: inset 0 0 0 1px ${T.e115dim}; }
      .pap-vote-card.is-muted { opacity: 0.76; }
      .pap-vote-actions { display: flex; align-items: center; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid ${T.line}; }
      .pap-vote-status { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
      .pap-vote-leaderboard { display: grid; grid-template-columns: minmax(0, 1fr); gap: 7px; margin-top: 14px; }
      .pap-vote-leader-row { display: grid; grid-template-columns: 34px 86px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 8px 10px; background: ${T.bg1}; border: 1px solid ${T.line}; }
      .pap-vote-leader-row.is-first { background: ${T.e115bg}; border-color: ${T.e115dim}; }
      .pap-vote-rank { font-size: 21px; text-align: center; }
      .pap-home-manual-title { display: flex; align-items: flex-start; flex-wrap: nowrap; line-height: 0; }
      .pap-home-manual-logo-line { display: flex; align-items: flex-start; flex: 0 1 auto; min-width: 0; line-height: 0; }
      .pap-home-zombies-icon { display: block; width: min(7.6em, 100%); height: auto; object-fit: contain; filter: drop-shadow(0 10px 18px rgba(0,0,0,0.45)); }
      .pap-kronorium { --kronorium-line-x: 14px; position: relative; margin-top: clamp(28px, 4vw, 48px); max-width: 1040px; }
      .pap-kronorium::before { content: ""; position: absolute; left: var(--kronorium-line-x); top: 8px; bottom: 10px; width: 1px; background: linear-gradient(to bottom, ${T.e115}, ${T.hazard}, ${T.blood}); opacity: 0.68; }
      .pap-kronorium-entry { position: relative; padding: 0 0 clamp(26px, 3.2vw, 38px) 58px; }
      .pap-kronorium-entry:not(:last-child)::after { content: ""; position: absolute; left: 58px; right: 0; bottom: 17px; height: 1px; background: linear-gradient(90deg, ${T.line}, transparent); }
      .pap-kronorium-marker { position: absolute; left: 0; top: 2px; width: 29px; height: 29px; border-radius: 50%; background: ${T.bg0}; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; font-family: ${T.mono}; font-size: 9px; line-height: 1; color: ${T.e115}; box-shadow: 0 0 0 5px ${T.bg0}; }
      .pap-kronorium-entry.is-late .pap-kronorium-marker { color: ${T.blood}; }
      .pap-kronorium-copy { max-width: min(100%, 900px); min-width: 0; }
      .pap-kronorium-heading-title { font-size: clamp(23px, 3vw, 38px); line-height: 1; color: ${T.e115}; margin: 0 0 8px; overflow-wrap: normal; word-break: normal; hyphens: none; }
      .pap-kronorium-entry.is-late .pap-kronorium-heading-title { color: ${T.blood}; }
      .pap-kronorium-year { color: currentColor; }
      .pap-kronorium-heading-sep { color: ${T.faint}; font-size: 0.72em; margin: 0 0.2em; }
      .pap-kronorium-title { color: ${T.bone}; font-size: 0.72em; }
      .pap-kronorium-body { font-family: ${T.sans}; font-size: clamp(14.5px, 1.1vw, 16px); color: ${T.mute}; line-height: 1.72; margin: 0; max-width: 72ch; }
      .pap-ee-step-list { position: relative; max-height: min(68vh, 760px); overflow-y: auto; padding-right: 8px; scrollbar-width: thin; scrollbar-color: ${T.lineHi} transparent; }
      .pap-ee-step-list::-webkit-scrollbar { width: 8px; }
      .pap-ee-step-list::-webkit-scrollbar-track { background: transparent; }
      .pap-ee-step-list::-webkit-scrollbar-thumb { background: ${T.lineHi}; border-radius: 999px; border: 2px solid transparent; background-clip: content-box; }
      .pap-ee-step-pill { transition: background .08s, border-color .08s; }
      .pap-ee-step-pill:hover { background: ${T.bg1}; }
      .pap-ee-step-summary { font-family: ${T.sans}; font-size: 12.5px; line-height: 1.35; color: ${T.faint}; margin-top: 5px; }
      .pap-ee-step-pill.is-active { background: ${T.bg1}; border-color: ${T.lineHi}; box-shadow: inset 0 0 0 1px rgba(232,226,212,0.035); }
      .pap-ee-step-pill.is-done .pap-ee-step-title { color: ${T.faint}; text-decoration: line-through; text-decoration-color: ${T.faint}; }
      .pap-ee-action-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .pap-ee-checkbox { width: 24px; height: 24px; flex: 0 0 24px; display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid ${T.lineHi}; background: ${T.bg2}; color: ${T.bg0}; font-family: ${T.display}; font-size: 13px; font-weight: 800; line-height: 1; }
      .pap-ee-checkbox.is-done { background: ${T.e115}; border-color: ${T.e115}; }
      .pap-ee-detail-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 26px; align-items: start; }
      .pap-ee-aside { position: sticky; top: 24px; display: grid; gap: 14px; }
      .pap-ee-side-card { background: ${T.bg1}; border: 1px solid ${T.line}; padding: 16px; }
      .pap-ee-side-card h3 { margin: 0 0 11px; font-family: ${T.mono}; font-size: 11px; letter-spacing: 2.2px; text-transform: uppercase; color: ${T.faint}; }
      .pap-ee-side-card ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; }
      .pap-ee-side-card li { position: relative; padding-left: 14px; font-family: ${T.sans}; font-size: 13px; line-height: 1.45; color: ${T.mute}; }
      .pap-ee-side-card li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; background: ${T.e115}; }
      .pap-ee-substeps { background: ${T.bg1}; border: 1px solid ${T.line}; overflow: hidden; }
      .pap-ee-substeps-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 13px 16px; border-bottom: 1px solid ${T.line}; background: ${T.bg2}; }
      .pap-ee-substep { display: grid; grid-template-columns: 24px 34px minmax(0, 1fr); gap: 12px; align-items: start; width: 100%; padding: 14px 16px; background: transparent; border: 0; border-top: 1px solid ${T.line}; color: ${T.bone}; text-align: left; cursor: pointer; }
      .pap-ee-substep:first-of-type { border-top: 0; }
      .pap-ee-substep:hover { background: ${T.bg2}; }
      .pap-ee-substep.is-done .pap-ee-substep-title { color: ${T.faint}; text-decoration: line-through; text-decoration-color: ${T.faint}; }
      .pap-ee-substep-title { display: block; font-family: ${T.sans}; font-size: 15px; line-height: 1.45; color: ${T.bone}; }
      .pap-ee-substep-detail { display: block; margin-top: 4px; font-family: ${T.sans}; font-size: 13.5px; line-height: 1.52; color: ${T.mute}; white-space: pre-line; }
      .pap-ee-pager { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 28px; padding-top: 22px; border-top: 1px solid ${T.line}; }
      .pap-ee-pager button { min-width: 0; padding: 14px 16px; border: 1px solid ${T.line}; background: ${T.bg1}; color: ${T.bone}; text-align: left; cursor: pointer; }
      .pap-ee-pager button:hover { border-color: ${T.e115dim}; background: ${T.e115bg}; }
      .pap-ee-pager button:disabled { opacity: 0.38; cursor: default; }
      .pap-ee-pager button:disabled:hover { border-color: ${T.line}; background: ${T.bg1}; }
      .pap-page-head-title-wrap { min-width: 0; flex: 1 1 auto; max-width: none !important; }
      h1.pap-page-title-nowrap { display: block; max-width: 100%; white-space: nowrap; overflow: visible; text-overflow: clip; font-size: clamp(32px, 4.15vw, 50px) !important; }
      .pap-ee-bullet:hover span:last-child { color: ${T.e115}; }
      .pap-btn:disabled { opacity: 0.48; cursor: default; }
      .pap-btn-primary:disabled:hover { background: ${T.e115}; color: ${T.bg0}; }
      .pap-btn-ghost:disabled:hover { background: transparent; color: ${T.bone}; border-color: ${T.lineHi}; }
      @keyframes pap-blink { 50% { opacity: 0; } }
      .pap-stencil { font-family: ${T.display}; font-weight: 700; letter-spacing: -0.5px; line-height: 0.92; text-transform: uppercase; }
      .pap-num { font-family: ${T.mono}; font-variant-numeric: tabular-nums; }
      .pap-stamp { display: inline-block; padding: 4px 10px 3px; border: 2px solid currentColor; font-family: ${T.display}; font-weight: 700; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; transform: rotate(-2deg); }
      .pap-shell, .term-shell { overflow-x: hidden; }
      .pap-wall-help {
        position: fixed;
        top: auto;
        right: clamp(-28px, 1vw, 24px);
        bottom: clamp(60px, 12vh, 140px);
        z-index: 0;
        pointer-events: none;
        user-select: none;
        font-family: "HelpMe", ${T.display};
        font-size: clamp(120px, 18vw, 320px);
        line-height: 0.75;
        letter-spacing: 0;
        color: rgba(214, 40, 40, 0.16);
        text-shadow: 0 0 18px rgba(214, 40, 40, 0.11), 2px 2px 0 rgba(232, 226, 212, 0.035);
        transform: rotate(-7deg);
        white-space: nowrap;
      }
      .pap-wall-lie {
        position: fixed;
        left: clamp(10px, 4vw, 76px);
        top: clamp(96px, 15vh, 170px);
        bottom: auto;
        z-index: 0;
        pointer-events: none;
        user-select: none;
        font-family: "HelpMe", ${T.display};
        font-size: clamp(46px, 7vw, 118px);
        line-height: 0.8;
        letter-spacing: 0;
        color: rgba(214, 40, 40, 0.14);
        text-shadow: 0 0 14px rgba(214, 40, 40, 0.1), 1px 1px 0 rgba(232, 226, 212, 0.035);
        transform: rotate(5deg);
        white-space: normal;
      }
      .pap-wall-image {
        position: fixed;
        z-index: 0;
        pointer-events: none;
        user-select: none;
        height: auto;
        opacity: 0.13;
        mix-blend-mode: screen;
        filter: saturate(0.95) contrast(1.08) drop-shadow(0 0 16px rgba(214, 40, 40, 0.08));
      }
      .pap-wall-trinity {
        left: clamp(8px, 4vw, 86px);
        bottom: 25vh;
        width: clamp(220px, 28vw, 480px);
        transform: rotate(-5deg);
      }
      .pap-wall-aether {
        right: clamp(22px, 9vw, 150px);
        top: clamp(168px, 25vh, 310px);
        width: clamp(120px, 14vw, 250px);
        transform: rotate(9deg);
        opacity: 0.11;
      }
      .pap-card, .term-card, .pap-row, .term-row { min-width: 0; }
      .pap-main-nav { scrollbar-width: thin; scrollbar-color: ${T.lineHi} transparent; }
      .pap-main-nav::-webkit-scrollbar { height: 4px; }
      .pap-main-nav::-webkit-scrollbar-thumb { background: ${T.lineHi}; }
      .pap-mobile-menu-toggle { display: none; }
      .pap-mobile-menu { display: none; }
      @media (max-width: 1100px) {
        .pap-header-inner { flex-wrap: wrap !important; gap: 16px !important; }
        .pap-main-nav { order: 4; width: 100%; margin-left: 0 !important; overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 4px; }
        .pap-main-nav > button { flex: 0 0 auto; }
        .pap-search { margin-left: auto; }
        .pap-gallery-modal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .pap-relic-stage { min-height: auto; }
        .pap-relic-stage-inner { grid-template-columns: minmax(0, 1fr); }
        .pap-relic-skulls { margin-bottom: 5px; width: min(100%, 860px); }
        .pap-relic-effect-panel { position: relative; top: auto; right: auto; order: 2; width: 100%; max-width: none; margin: 0 0 22px; }
        .pap-relic-board-wrap { order: 3; margin-top: -58px; overflow-x: auto; padding-bottom: 8px; }
        .pap-relic-board { min-width: 860px; }
        .pap-relic-selected-file { grid-template-columns: minmax(0, 1fr); }
        .pap-vote-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .pap-song-row { grid-template-columns: 42px minmax(0, 1fr) 24px; gap: 8px 14px; align-items: start; padding: 16px 18px; }
        .pap-song-index { grid-column: 1; grid-row: 1; padding-top: 2px; }
        .pap-song-main { grid-column: 2; grid-row: 1; }
        .pap-song-arrow { grid-column: 3; grid-row: 1; padding-top: 2px; }
        .pap-song-map { grid-column: 2 / 4; grid-row: 2; }
        .pap-song-activation { grid-column: 2 / 4; grid-row: 3; max-width: 64ch; }
        .pap-ee-layout { grid-template-columns: minmax(0, 1fr) !important; gap: 28px !important; }
        .pap-ee-step-list { display: block !important; max-height: 360px !important; overflow-y: auto !important; padding-right: 8px !important; }
        .pap-ee-step-line { display: none !important; }
        .pap-ee-step-pill { grid-template-columns: 34px minmax(0, 1fr) !important; padding: 9px !important; border: 1px solid ${T.line} !important; background: ${T.bg1} !important; }
        .pap-ee-step-pill .pap-stencil { font-size: 14px !important; line-height: 1.05 !important; }
        .pap-ee-detail-grid { grid-template-columns: minmax(0, 1fr) !important; }
        .pap-ee-aside { position: static; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .pap-kronorium-entry { padding-left: 52px; }
        #root [style*="grid-template-columns: repeat(4, 1fr)"],
        #root [style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        #root [style*="grid-template-columns: 1.3fr 1fr"],
        #root [style*="grid-template-columns: 1.4fr 1fr"],
        #root [style*="grid-template-columns: 1.5fr 1fr"],
        #root [style*="grid-template-columns: 320px 1fr"],
        #root [style*="grid-template-columns: 380px 1fr"],
        #root [style*="grid-template-columns: 340px 1fr"] { grid-template-columns: minmax(0, 1fr) !important; }
      }
      @media (max-width: 760px) {
        html, body, #root { width: 100%; max-width: 100%; overflow-x: hidden; }
        #root * { min-width: 0; }
        .pap-topbar { display: none !important; }
        .pap-wall-help {
          top: auto;
          right: -28px;
          bottom: 56px;
          font-size: clamp(92px, 34vw, 158px);
          color: rgba(214, 40, 40, 0.13);
        }
        .pap-wall-lie {
          left: 8px;
          top: 108px;
          bottom: auto;
          font-size: clamp(42px, 16vw, 76px);
          color: rgba(214, 40, 40, 0.12);
        }
        .pap-wall-trinity {
          left: -42px;
          bottom: 25vh;
          width: clamp(180px, 58vw, 300px);
          opacity: 0.1;
        }
        .pap-wall-aether {
          right: -18px;
          top: 230px;
          width: clamp(100px, 34vw, 170px);
          opacity: 0.09;
        }
        .term-header, .term-menu { padding: 14px !important; align-items: stretch !important; flex-direction: column !important; gap: 12px !important; }
        .pap-construction-notice { display: none !important; }
        .pap-header-inner { padding: 12px 14px !important; align-items: center !important; flex-direction: row !important; gap: 10px !important; }
        .pap-brand { width: auto; flex: 1 1 auto; align-items: center !important; min-width: 0; }
        #root .pap-brand .pap-stencil { font-size: clamp(19px, 5.7vw, 24px) !important; line-height: 1 !important; white-space: nowrap; }
        #root .pap-brand [style*="font-size: 9.5px"] { display: none !important; }
        .pap-header-spacer { display: none !important; }
        .pap-main-nav { display: none !important; }
        .pap-mobile-menu-toggle { display: inline-flex !important; align-items: center; justify-content: center; flex: 0 0 44px; width: 44px; height: 44px; border: 1px solid ${T.lineHi}; background: ${T.bg1}; color: ${T.bone}; cursor: pointer; }
        .pap-mobile-menu-toggle.is-open { color: ${T.e115}; border-color: ${T.e115dim}; background: ${T.e115bg}; }
        .pap-mobile-menu { display: block !important; border-top: 1px solid ${T.line}; border-bottom: 1px solid ${T.line}; background: rgba(16, 15, 13, 0.98); box-shadow: 0 18px 36px rgba(0,0,0,0.55); max-height: calc(100vh - 116px); overflow-y: auto; }
        .pap-main-nav > button, .term-btn { min-height: 40px; white-space: nowrap; }
        .pap-search, .term-search { width: 100% !important; min-width: 0 !important; margin: 0 !important; }
        #root .pap-search { order: 3; flex: 0 0 100%; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; min-height: 44px !important; padding: 0 12px !important; gap: 9px !important; }
        #root .pap-search svg { flex: 0 0 13px !important; }
        #root .pap-search input { flex: 1 1 auto !important; width: auto !important; min-width: 0 !important; height: 42px !important; line-height: 42px !important; }
        #root .pap-search span { display: none !important; }
        .pap-main, .term-main { padding: 22px 14px 44px !important; }
        .pap-footer-grid, .pap-footer-bottom { padding-left: 14px !important; padding-right: 14px !important; }
        .pap-footer-bottom { flex-direction: column !important; gap: 8px !important; }
        .pap-stencil { letter-spacing: 0 !important; overflow-wrap: anywhere; font-size: clamp(18px, 8vw, 36px) !important; line-height: 1 !important; }
        #root .pap-song-title { font-size: 19px !important; line-height: 1.05 !important; }
        .pap-home-manual-title { align-items: flex-start; }
        .pap-home-zombies-icon { width: min(87vw, 100%); height: auto; }
        .pap-song-row { padding: 15px 16px; }
        h1.pap-stencil { font-size: clamp(34px, 15vw, 56px) !important; }
        .pap-num { font-size: 32px !important; }
        .pap-kronorium { --kronorium-line-x: 10px; margin-top: 26px; }
        .pap-kronorium::before { top: 6px; bottom: 8px; }
        .pap-kronorium-entry { padding-left: 34px; padding-bottom: 26px; }
        .pap-kronorium-entry:not(:last-child)::after { left: 34px; bottom: 13px; }
        .pap-kronorium-marker { width: 21px; height: 21px; font-size: 0; box-shadow: 0 0 0 4px ${T.bg0}; }
        .pap-kronorium-marker::after { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .pap-kronorium-heading-title { font-size: clamp(20px, 6.2vw, 28px) !important; line-height: 1.02 !important; margin-bottom: 6px; overflow-wrap: normal !important; word-break: normal !important; hyphens: none !important; }
        .pap-kronorium-title { font-size: 0.68em; }
        .pap-kronorium-body { font-size: 14.5px; line-height: 1.58; max-width: none; }
        .pap-btn { width: 100%; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; text-align: center; }
        .pap-gallery-modal-grid { grid-template-columns: minmax(0, 1fr); }
        .pap-gallery-more { height: 170px; }
        .pap-relic-stage { padding: 18px 12px 22px; }
        .pap-relic-skulls { margin-bottom: 5px; }
        .pap-relic-effect-head { padding-bottom: 10px; }
        .pap-relic-effect-head .pap-stencil { font-size: clamp(24px, 7vw, 30px) !important; line-height: 0.95 !important; }
        .pap-relic-effect-body { grid-template-columns: clamp(54px, 15vw, 66px) minmax(0, 1fr); gap: 12px; padding: 0; align-items: center; }
        .pap-relic-effect-icon { width: clamp(54px, 15vw, 66px); height: clamp(54px, 15vw, 66px); }
        .pap-relic-effect-copy .pap-stencil { font-size: clamp(22px, 7vw, 30px) !important; line-height: 0.95 !important; overflow-wrap: anywhere; }
        .pap-relic-effect-copy [style*="font-size: 13.5px"] { font-size: 13px !important; line-height: 1.35 !important; }
        .pap-relic-file-section > div:first-child .pap-stencil { font-size: clamp(28px, 10vw, 42px) !important; line-height: 0.96 !important; }
        .pap-relic-board-wrap { margin-top: -46px; }
        .pap-relic-board { min-width: 720px; }
        .pap-relic-selected-portrait { min-height: 210px; }
        .pap-vote-grid { grid-template-columns: minmax(0, 1fr); }
        .pap-vote-actions { align-items: stretch; }
        .pap-vote-leader-row { grid-template-columns: 30px 74px minmax(0, 1fr) auto !important; gap: 8px !important; padding: 8px !important; }
        .pap-vote-rank { font-size: 19px !important; }
        .pap-vote-leader-row .pap-stencil { font-size: 18px !important; }
        .pap-ee-badges { gap: 7px !important; margin-top: 14px !important; }
        .pap-ee-badges .pap-paper-badge { min-height: 34px !important; min-width: 98px !important; padding: 8px 13px 9px !important; font-size: 15px !important; letter-spacing: 1.1px !important; }
        .pap-ee-layout { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 22px !important; margin-top: 24px !important; }
        .pap-ee-sidebar { order: 1; }
        .pap-ee-content { order: 2; }
        .pap-ee-progress { margin-bottom: 14px !important; }
        .pap-ee-step-list { display: block !important; max-height: 300px !important; overflow-y: auto !important; padding-right: 8px !important; }
        .pap-ee-step-line { display: none !important; }
        .pap-ee-step-pill { grid-template-columns: 30px minmax(0, 1fr) !important; gap: 8px !important; align-items: center !important; padding: 8px !important; border: 1px solid ${T.line} !important; background: ${T.bg1} !important; min-height: 60px; }
        .pap-ee-step-num { width: 30px !important; height: 30px !important; font-size: 12px !important; }
        .pap-ee-step-meta { padding-top: 0 !important; }
        .pap-ee-step-title { font-size: 13px !important; line-height: 1 !important; margin-top: 1px !important; }
        .pap-ee-action-left { width: 100%; }
        .pap-ee-detail-grid { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 16px !important; }
        .pap-ee-aside { position: static !important; display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 10px !important; }
        .pap-ee-substeps-head { align-items: flex-start; flex-direction: column; }
        .pap-ee-substep { grid-template-columns: 24px minmax(0, 1fr) !important; gap: 10px !important; padding: 12px !important; }
        .pap-ee-substep .pap-ee-substep-num { display: none; }
        .pap-ee-pager { grid-template-columns: minmax(0, 1fr); gap: 8px; }
        h1.pap-page-title-nowrap { white-space: nowrap !important; overflow: visible !important; text-overflow: clip !important; font-size: clamp(13px, 4.4vw, 30px) !important; }
        .pap-ee-images { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; }
        .pap-ee-images.is-single { grid-template-columns: minmax(0, 1fr) !important; }
        .pap-ee-images.is-packed { display: flex !important; flex-wrap: wrap !important; align-items: flex-start !important; gap: 8px !important; }
        .pap-evidence-image { max-width: 100% !important; }
        .pap-evidence-image[style*="height: 170px"] { height: 138px !important; }
        .pap-evidence-image[style*="height: 300px"] { height: 210px !important; }
        .pap-evidence-image .pap-stencil { font-size: clamp(16px, 6vw, 22px) !important; }
        .pap-ee-step-heading { font-size: clamp(26px, 10vw, 34px) !important; line-height: .95 !important; }
        .pap-ee-step-body { font-size: 15px !important; line-height: 1.55 !important; }
        .pap-ee-bullet { grid-template-columns: 18px minmax(0, 1fr) !important; font-size: 14.5px !important; line-height: 1.45 !important; }
        .pap-ee-actions { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 8px !important; }
        .pap-ee-rewards { margin-top: 24px !important; padding: 14px !important; }
        .pap-ee-rewards .pap-paper-badge { min-height: 32px !important; min-width: 96px !important; padding: 8px 12px 9px !important; font-size: 15px !important; letter-spacing: 1px !important; }
        .pap-chip { min-height: 34px; }
        .pap-card, .term-card { overflow-wrap: anywhere; }
        #root [style*="display: flex"] { flex-wrap: wrap !important; }
        #root .pap-header-inner { flex-wrap: wrap !important; }
        #root .pap-brand, #root .pap-search, #root .pap-mobile-menu-toggle { flex-wrap: nowrap !important; }
        #root [style*="grid-template-columns"] { grid-template-columns: minmax(0, 1fr) !important; }
        #root .pap-mobile-menu [style*="grid-template-columns"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        #root .pap-stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 8px !important; }
        #root .pap-stats-grid > div { min-width: 0 !important; }
        #root .pap-stats-grid .pap-num { font-size: clamp(24px, 7vw, 32px) !important; }
        #root [style*="position: sticky"] { position: static !important; top: auto !important; }
        #root [style*="width: 160px"],
        #root [style*="width: 180px"],
        #root [style*="width: 200px"],
        #root [style*="width: 220px"],
        #root [style*="width: 240px"],
        #root [style*="width: 320px"],
        #root [style*="width: 340px"],
        #root [style*="width: 380px"] { width: 100% !important; }
        #root [style*="height: 480px"] { height: 360px !important; }
        #root [style*="height: 420px"],
        #root [style*="height: 400px"] { height: 300px !important; min-height: 300px !important; }
        #root [style*="height: 300px"],
        #root [style*="height: 280px"] { height: 240px !important; }
        #root [style*="height: 220px"],
        #root [style*="height: 180px"],
        #root [style*="height: 170px"],
        #root [style*="height: 150px"],
        #root [style*="height: 120px"] { height: 170px !important; }
        #root [style*="min-height: 480px"],
        #root [style*="min-height: 420px"] { min-height: 300px !important; }
        #root [style*="padding: 36px"],
        #root [style*="padding: 32px"] { padding: 20px !important; }
        #root [style*="padding: 28px"],
        #root [style*="padding: 24px"] { padding: 18px !important; }
        #root [style*="padding: 22px"],
        #root [style*="padding: 20px"] { padding: 16px !important; }
        #root [style*="gap: 48px"],
        #root [style*="gap: 36px"],
        #root [style*="gap: 32px"],
        #root [style*="gap: 28px"],
        #root [style*="gap: 26px"],
        #root [style*="gap: 24px"],
        #root [style*="gap: 22px"] { gap: 18px !important; }
        #root .pap-ee-layout { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 22px !important; margin-top: 24px !important; }
        #root .pap-ee-step-list { display: block !important; max-height: 300px !important; overflow-y: auto !important; padding-right: 8px !important; }
        #root .pap-ee-images { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; }
        #root .pap-ee-images.is-single { grid-template-columns: minmax(0, 1fr) !important; }
        #root .pap-ee-images.is-packed { display: flex !important; flex-wrap: wrap !important; align-items: flex-start !important; gap: 8px !important; }
        #root .pap-evidence-image { max-width: 100% !important; }
        #root .pap-evidence-image[style*="height: 170px"] { height: 138px !important; }
        #root .pap-evidence-image[style*="height: 300px"] { height: 210px !important; }
        #root .pap-ee-actions { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 8px !important; }
        .term-shell { font-size: 13.5px !important; }
        .term-shell h1 { font-size: clamp(34px, 14vw, 44px) !important; }
        .term-shell [style*="font-size: 36px"],
        .term-shell [style*="font-size: 32px"],
        .term-shell [style*="font-size: 30px"] { font-size: 28px !important; }
      }
      @media (max-width: 430px) {
        .pap-main, .term-main { padding-left: 12px !important; padding-right: 12px !important; }
        .pap-stencil { font-size: clamp(17px, 8.5vw, 32px) !important; }
        .pap-kronorium-entry { padding-left: 30px; }
        .pap-kronorium-entry:not(:last-child)::after { left: 30px; }
        .pap-kronorium-heading-title { font-size: clamp(19px, 5.7vw, 25px) !important; overflow-wrap: normal !important; word-break: normal !important; hyphens: none !important; }
        .pap-kronorium-title { font-size: 0.64em; }
        .pap-song-row { grid-template-columns: minmax(0, 1fr) 22px; gap: 8px 12px; }
        .pap-song-index { display: none; }
        .pap-song-main { grid-column: 1; grid-row: 1; }
        .pap-song-arrow { grid-column: 2; grid-row: 1; }
        .pap-song-map { grid-column: 1 / 3; grid-row: 2; }
        .pap-song-activation { grid-column: 1 / 3; grid-row: 3; }
        h1.pap-stencil { font-size: clamp(32px, 17vw, 48px) !important; }
        h1.pap-page-title-nowrap { font-size: clamp(13px, 4.2vw, 22px) !important; }
        #root [style*="height: 480px"] { height: 320px !important; }
        #root [style*="height: 420px"],
        #root [style*="height: 400px"] { height: 260px !important; min-height: 260px !important; }
      }
    `;
    document.head.appendChild(s);
  }

  const Slot = ({ w, h, label, tone = 'green', style, kind = 'PHOTO' }) => {
    const accent = tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : T.e115;
    return (
      <div style={{
        width: w, height: h, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse at 25% 30%, ${T.bg3} 0%, ${T.bg1} 65%, ${T.bg0} 100%)`,
        border: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}>
        <svg width="56%" height="56%" viewBox="0 0 100 100" style={{ position: 'absolute', opacity: 0.06, color: accent }} aria-hidden>
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 8 L50 92 M8 50 L92 50" stroke="currentColor" strokeWidth="0.5" />
          <path d="M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="0.3" />
        </svg>
        <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8, color: accent, opacity: 0.6 }}>{kind}</div>
        <div style={{ position: 'absolute', top: 8, right: 10, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8, color: T.faint }}>NO IMG</div>
        <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div className="pap-stencil" style={{ fontSize: Math.min(typeof h === 'number' ? h * 0.18 : 28, 26), color: T.bone, opacity: 0.85, maxWidth: '85%' }}>{label}</div>
          <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.5, color: T.faint }}>G935 // ARCHIV</div>
        </div>
      </div>
    );
  };

  function FullSizeImageModal({ src, title, onClose }) {
    useEffect(() => {
      const oldOverflow = document.body.style.overflow;
      const handleKey = (event) => {
        if (event.key === 'Escape') onClose();
      };
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = oldOverflow;
        window.removeEventListener('keydown', handleKey);
      };
    }, [onClose]);

    const modal = (
      <div className="pap-image-modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
        <button type="button" className="pap-image-modal-close" aria-label="Close image" onClick={(event) => { event.stopPropagation(); onClose(); }}>X</button>
        <img className="pap-image-modal-img" src={src} alt={title} onClick={(event) => event.stopPropagation()} />
        <div className="pap-image-modal-title">{title}</div>
      </div>
    );

    return ReactDOM.createPortal(modal, document.body);
  }

  function mapPrimaryFile(map, slot = 'hero') {
    const media = map && map.media;
    if (!media) return null;
    if (slot === 'thumb') return media.thumb || media.hero || (media.gallery && media.gallery[0]) || null;
    return media.hero || media.thumb || (media.gallery && media.gallery[0]) || null;
  }

  function mapGalleryItems(map) {
    const media = map && map.media;
    if (!media || !media.gallery || !media.gallery.length) return [];
    return media.gallery.map((item, i) => {
      const entry = typeof item === 'string' ? { file: item } : item;
      return {
        ...entry,
        label: entry.label || (((map && map.name) || 'Gallery image') + ' image ' + String(i + 1)),
      };
    }).filter((item) => item.file && item.gallery !== false);
  }

  function MapGalleryModal({ map, items, onClose }) {
    useEffect(() => {
      const onKey = (event) => { if (event.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const title = ((map && map.name) || 'Map') + ' gallery';
    const modal = (
      <div className="pap-image-modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
        <button type="button" className="pap-image-modal-close" aria-label="Close gallery" onClick={(event) => { event.stopPropagation(); onClose(); }}>X</button>
        <div className="pap-gallery-modal-panel" onClick={(event) => event.stopPropagation()}>
          <div className="pap-gallery-modal-grid">
            {items.map((item, i) => (
              <MapImage
                key={item.file + '-' + i}
                map={map}
                file={item.file}
                height={220}
                label={item.label}
                kind="GALLERY"
                tone="green"
                showOverlay={false}
                objectFit={item.objectFit || 'cover'}
                objectPosition={item.objectPosition}
                openFullSize
              />
            ))}
          </div>
        </div>
        <div className="pap-image-modal-title">{title + ' - ' + items.length + ' additional frame' + (items.length === 1 ? '' : 's')}</div>
      </div>
    );

    return ReactDOM.createPortal(modal, document.body);
  }

  function MapGalleryMoreButton({ map, items, onOpen }) {
    const preview = items[0];
    const previewSrc = preview ? mapImg(map, preview.file) : null;
    return (
      <button type="button" className="pap-gallery-more" onClick={onOpen} aria-label={'Open ' + (((map && map.name) || 'map') + ' gallery')}>
        {previewSrc && <img src={previewSrc} alt="" loading="lazy" />}
        <span className="pap-gallery-more-body">
          <Mono color={T.e115} letter={2.5}>Open Gallery</Mono>
          <span className="pap-stencil" style={{ fontSize: 28, color: T.bone }}>
            {'+' + items.length + ' more'}
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.45, color: T.mute }}>
            Continue browsing recovered map frames.
          </span>
        </span>
      </button>
    );
  }

  function MapGalleryPreview({ map, items }) {
    const [open, setOpen] = useState(false);
    const hasOverflow = items.length > 6;
    const visibleItems = hasOverflow ? items.slice(0, 5) : items.slice(0, 6);
    const overflowItems = hasOverflow ? items.slice(5) : [];
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {visibleItems.map((item) => (
            <MapImage key={item.file} map={map} file={item.file} height={220} label={item.label} kind="GALLERY" tone="green" showOverlay={false} objectFit={item.objectFit || 'cover'} objectPosition={item.objectPosition} openFullSize />
          ))}
          {hasOverflow && <MapGalleryMoreButton map={map} items={overflowItems} onOpen={() => setOpen(true)} />}
        </div>
        {open && <MapGalleryModal map={map} items={overflowItems} onClose={() => setOpen(false)} />}
      </>
    );
  }

  const VOTE_STORAGE_PREFIX = 'g935.vote.';
  const LEGACY_FAVORITE_MAP_VOTE_KEY = 'g935.favoriteMapVote.v1';
  const FAVORITE_MAP_VOTER_KEY = 'g935.favoriteMapVoter.v1';
  const FAVORITE_MAP_VOTE_ENDPOINT = (typeof window !== 'undefined' && window.G935_FAVORITE_MAP_VOTE_ENDPOINT) || '';

  function voteStorageKey(pollId) {
    return VOTE_STORAGE_PREFIX + pollId + '.v1';
  }

  function normalizeStoredVoteRecord(record, pollId) {
    if (!record) return null;
    const itemId = record.itemId || record.mapId;
    if (!itemId) return null;
    return {
      ...record,
      pollId,
      itemId,
      endpoint: record.endpoint || 'local',
    };
  }

  function readStoredVote(pollId) {
    try {
      const key = voteStorageKey(pollId);
      let raw = window.localStorage && window.localStorage.getItem(key);
      if (!raw && pollId === 'maps') raw = window.localStorage && window.localStorage.getItem(LEGACY_FAVORITE_MAP_VOTE_KEY);
      const record = normalizeStoredVoteRecord(raw ? JSON.parse(raw) : null, pollId);
      if (record && FAVORITE_MAP_VOTE_ENDPOINT && record.endpoint !== FAVORITE_MAP_VOTE_ENDPOINT) {
        window.localStorage.removeItem(key);
        if (pollId === 'maps') window.localStorage.removeItem(LEGACY_FAVORITE_MAP_VOTE_KEY);
        return null;
      }
      if (record) window.localStorage.setItem(key, JSON.stringify(record));
      return record;
    } catch (e) {
      return null;
    }
  }

  function getVoteVoterId() {
    try {
      const existing = window.localStorage && window.localStorage.getItem(FAVORITE_MAP_VOTER_KEY);
      if (existing) return existing;
      const id = window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : 'anon-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
      window.localStorage && window.localStorage.setItem(FAVORITE_MAP_VOTER_KEY, id);
      return id;
    } catch (e) {
      return 'anon-memory-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    }
  }

  function storeVote(pollId, record) {
    try {
      window.localStorage && window.localStorage.setItem(voteStorageKey(pollId), JSON.stringify(record));
      if (pollId === 'maps') window.localStorage.removeItem(LEGACY_FAVORITE_MAP_VOTE_KEY);
    } catch (e) {}
  }

  async function voteRequest(pollId, method, body) {
    if (!FAVORITE_MAP_VOTE_ENDPOINT) return null;
    const headers = { Accept: 'application/json' };
    const options = { method, headers, credentials: 'omit', cache: 'no-store' };
    if (body) {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    const suffix = method === 'GET' ? (FAVORITE_MAP_VOTE_ENDPOINT.includes('?') ? '&' : '?') + 'poll=' + encodeURIComponent(pollId) : '';
    const response = await fetch(FAVORITE_MAP_VOTE_ENDPOINT + suffix, options);
    if (!response.ok) throw new Error('Vote service returned ' + response.status);
    return response.json();
  }

  function MapImage({ map, file, label, kind = 'SITE IMAGERY', tone = 'green', height = 180, style, loading = 'lazy', showOverlay = true, objectFit = 'cover', objectPosition, openFullSize = false }) {
    const [failed, setFailed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const src = !failed ? mapImg(map, file || mapPrimaryFile(map)) : null;
    const accent = tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : T.e115;
    const title = label || (map && map.name) || 'Map image';
    if (!src) return <Slot w="100%" h={height} label={title} kind={kind} tone={tone} style={style} />;
    const openImage = () => { if (openFullSize) setExpanded(true); };
    const handleImageKey = (event) => {
      if (!openFullSize) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setExpanded(true);
      }
    };
    return (
      <>
        <div className={'pap-map-image' + (openFullSize ? ' pap-image-link' : '')}
          role={openFullSize ? 'button' : undefined}
          tabIndex={openFullSize ? 0 : undefined}
          aria-label={openFullSize ? 'Open full-size image: ' + title : undefined}
          title={openFullSize ? 'Open full-size image' : undefined}
          onClick={openImage}
          onKeyDown={handleImageKey}
          style={{
            width: '100%', height, position: 'relative', overflow: 'hidden',
            background: T.bg2, border: `1px solid ${T.line}`,
            ...style,
          }}>
          <img src={src} alt={title} loading={loading} onError={() => setFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit, objectPosition: objectPosition || (map.media && map.media.objectPosition) || 'center center' }} />
          {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.02) 0%, rgba(10,9,8,0.06) 45%, rgba(10,9,8,0.68) 100%)', pointerEvents: 'none' }} />}
          {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8, color: accent, opacity: 0.95, textTransform: 'uppercase', background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{kind}</div>}
          {showOverlay && (
            <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
              <div className="pap-stencil" style={{ fontSize: Math.min(typeof height === 'number' ? height * 0.15 : 24, 24), color: T.bone, textShadow: '0 2px 12px rgba(0,0,0,0.75)', lineHeight: 0.95 }}>{title}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, color: T.mute, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>G935 // IMG</div>
            </div>
          )}
        </div>
        {expanded && <FullSizeImageModal src={src} title={title} onClose={() => setExpanded(false)} />}
      </>
    );
  }

  function EvidenceImage({ map, image, label, kind = 'REFERENCE', tone = 'green', height = 180, style, loading = 'lazy', showOverlay = true, objectFit = 'cover', objectPosition, openFullSize = false, compactOverlay = false }) {
    const [failed, setFailed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const src = !failed ? gameAssetImg(image, map) : null;
    const accent = tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : T.e115;
    const title = label || (image && image.label) || (map && map.name) || 'Reference image';
    const fit = (image && image.objectFit) || objectFit;
    const pos = objectPosition || (image && image.objectPosition) || 'center center';
    if (!src) return <Slot w="100%" h={height} label={title} kind={kind} tone={tone} style={style} />;
    const frameClass = 'pap-evidence-image' + (openFullSize ? ' pap-image-link' : '');
    const captionClass = compactOverlay ? 'pap-ee-image-caption' : 'pap-stencil';
    const compactCaptionStyle = {
      fontFamily: T.sans,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.25,
      textTransform: 'none',
      color: T.bone,
      textShadow: '0 1px 5px rgba(0,0,0,0.72)',
      background: 'rgba(10,9,8,0.68)',
      border: `1px solid ${T.line}`,
      padding: '4px 7px',
      maxWidth: 'min(82%, 420px)',
    };
    const openImage = () => { if (openFullSize) setExpanded(true); };
    const handleImageKey = (event) => {
      if (!openFullSize) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setExpanded(true);
      }
    };
    const interactiveProps = openFullSize ? {
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Open full-size image: ' + title,
      title: 'Open full-size image',
      onClick: openImage,
      onKeyDown: handleImageKey,
    } : {};
    if (image && image.layout === 'natural') {
      return (
        <>
          <div className={frameClass} {...interactiveProps} style={{ width: 'fit-content', maxWidth: image.maxWidth || '100%', overflow: 'hidden', background: T.bg2, border: `1px solid ${T.line}`, position: 'relative', ...style }}>
            <img src={src} alt={title} loading={loading} onError={() => setFailed(true)}
              style={{ display: 'block', width: image.width || 'auto', maxWidth: '100%', height: 'auto', maxHeight: image.maxHeight || height }} />
            {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.02) 0%, rgba(10,9,8,0.04) 48%, rgba(10,9,8,0.6) 100%)', pointerEvents: 'none' }} />}
            {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8, color: accent, opacity: 0.95, textTransform: 'uppercase', background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{image.kind || kind}</div>}
            {showOverlay && (
              <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
                <div className={captionClass} style={compactOverlay ? compactCaptionStyle : { fontSize: 22, color: T.bone, textShadow: '0 2px 12px rgba(0,0,0,0.75)', lineHeight: 0.95 }}>{title}</div>
              </div>
            )}
          </div>
          {expanded && <FullSizeImageModal src={src} title={title} onClose={() => setExpanded(false)} />}
        </>
      );
    }
    return (
      <>
        <div className={frameClass} {...interactiveProps} style={{
          width: '100%', height, position: 'relative', overflow: 'hidden',
          background: T.bg2, border: `1px solid ${T.line}`,
          ...style,
        }}>
          <img src={src} alt={title} loading={loading} onError={() => setFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, objectPosition: pos }} />
          {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.02) 0%, rgba(10,9,8,0.05) 45%, rgba(10,9,8,0.64) 100%)', pointerEvents: 'none' }} />}
          {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8, color: accent, opacity: 0.95, textTransform: 'uppercase', background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{kind}</div>}
          {showOverlay && (
            <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
              <div className={captionClass} style={compactOverlay ? compactCaptionStyle : { fontSize: Math.min(typeof height === 'number' ? height * 0.14 : 22, 22), color: T.bone, textShadow: '0 2px 12px rgba(0,0,0,0.75)', lineHeight: 0.95 }}>{title}</div>
              {!compactOverlay && <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, color: T.mute, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>G935 // REF</div>}
            </div>
          )}
        </div>
        {expanded && <FullSizeImageModal src={src} title={title} onClose={() => setExpanded(false)} />}
      </>
    );
  }

  function CallingCardReward({ ee, height = 220 }) {
    const [failed, setFailed] = useState(false);
    const src = !failed ? callingCardImg(ee) : null;
    const title = (ee && (ee.rewardLabel || ee.title)) || 'Calling card reward';
    if (!src) return <Slot w="100%" h={height} label={title} kind="CALLING CARD" tone="red" />;
    return (
      <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden', background: T.bg0, borderBottom: `1px solid ${T.line}` }}>
        <img src={src} alt={title} loading="eager" onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.02) 0%, rgba(10,9,8,0.08) 56%, rgba(10,9,8,0.78) 100%)', pointerEvents: 'none' }} />
      </div>
    );
  }

  function weaponPrimaryFile(weapon, slot = 'hero') {
    const media = weapon && weapon.media;
    if (!media) return null;
    if (slot === 'thumb') return media.thumb || media.hero || (media.gallery && media.gallery[0]) || null;
    return media.hero || media.thumb || (media.gallery && media.gallery[0]) || null;
  }

  function weaponGalleryItems(weapon, includeHero = false) {
    const media = weapon && weapon.media;
    if (!media) return [];
    const files = [];
    if (includeHero && media.hero) files.push(media.hero);
    (media.gallery || []).forEach((file) => {
      if (!files.includes(file)) files.push(file);
    });
    return files.map((file, i) => ({ file, label: ((weapon && weapon.name) || 'Weapon') + ' image ' + String(i + 1) }));
  }

  function WeaponImage({ weapon, file, label, kind = 'WEAPON IMAGE', height = 180, style, loading = 'lazy', showOverlay = false, objectFit = 'contain' }) {
    const [failed, setFailed] = useState(false);
    const src = !failed ? weaponImg(weapon, file || weaponPrimaryFile(weapon)) : null;
    const title = label || (weapon && weapon.name) || 'Wonder weapon';
    if (!src) return <Slot w="100%" h={height} label={title} kind="WW" tone="green" style={style} />;
    return (
      <div style={{
        width: '100%', height, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse at 50% 35%, ${T.bg3} 0%, ${T.bg2} 52%, ${T.bg0} 100%)`,
        border: `1px solid ${T.line}`,
        ...style,
      }}>
        <img src={src} alt={title} loading={loading} onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit, objectPosition: 'center center', padding: 12 }} />
        {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.04) 0%, rgba(10,9,8,0.12) 55%, rgba(10,9,8,0.62) 100%)', pointerEvents: 'none' }} />}
        {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.e115Font, fontSize: 9, letterSpacing: 1.8, color: T.e115, opacity: 0.95, textTransform: 'uppercase', background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{kind}</div>}
        {showOverlay && (
          <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
            <div className="pap-stencil" style={{ fontSize: Math.min(typeof height === 'number' ? height * 0.15 : 24, 24), color: T.bone, textShadow: '0 2px 12px rgba(0,0,0,0.75)', lineHeight: 0.95 }}>{title}</div>
            <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, color: T.mute, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>G935 // WW</div>
          </div>
        )}
      </div>
    );
  }

  function perkPrimaryFile(perk, slot = 'hero') {
    const media = perk && perk.media;
    if (!media) return null;
    if (slot === 'thumb') return media.thumb || media.hero || (media.gallery && media.gallery[0]) || null;
    return media.hero || media.thumb || (media.gallery && media.gallery[0]) || null;
  }

  function perkGalleryItems(perk, includeHero = false) {
    const media = perk && perk.media;
    if (!media) return [];
    const files = [];
    if (includeHero && media.hero) files.push(media.hero);
    (media.gallery || []).forEach((file) => {
      if (!files.includes(file)) files.push(file);
    });
    return files.map((file, i) => ({ file, label: ((perk && perk.name) || 'Perk') + ' image ' + String(i + 1) }));
  }

  function PerkImage({ perk, file, label, kind = 'PERK IMAGE', height = 180, style, loading = 'lazy', showOverlay = false, objectFit = 'contain' }) {
    const [failed, setFailed] = useState(false);
    const src = !failed ? perkImg(perk, file || perkPrimaryFile(perk)) : null;
    const title = label || (perk && perk.name) || 'Perk-a-Cola';
    if (!src) return <Slot w="100%" h={height} label={title} kind="PERK" tone="green" style={style} />;
    return (
      <div style={{
        width: '100%', height, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse at 50% 34%, ${T.bg3} 0%, ${T.bg2} 54%, ${T.bg0} 100%)`,
        border: `1px solid ${T.line}`,
        ...style,
      }}>
        <img src={src} alt={title} loading={loading} onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit, objectPosition: 'center center', padding: 12 }} />
        {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.02) 0%, rgba(10,9,8,0.08) 50%, rgba(10,9,8,0.58) 100%)', pointerEvents: 'none' }} />}
        {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontFamily: T.e115Font, fontSize: 9, letterSpacing: 1.8, color: T.e115, opacity: 0.95, textTransform: 'uppercase', background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{kind}</div>}
        {showOverlay && (
          <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
            <div className="pap-stencil" style={{ fontSize: Math.min(typeof height === 'number' ? height * 0.15 : 24, 24), color: T.bone, textShadow: '0 2px 12px rgba(0,0,0,0.75)', lineHeight: 0.95 }}>{title}</div>
            <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, color: T.mute, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>G935 // PERK</div>
          </div>
        )}
      </div>
    );
  }

  const HazardStripe = ({ height = 14, style }) => (
    <div style={{
      height, width: '100%',
      backgroundImage: `repeating-linear-gradient(45deg, ${T.hazard} 0 14px, ${T.bg0} 14px 28px)`,
      ...style,
    }} aria-hidden />
  );

  function ImageComingSoonTape({ label, height = 300 }) {
    return (
      <div style={{
        width: '100%', minHeight: height, position: 'relative', overflow: 'hidden',
        border: `1px solid ${T.hazard}`,
        background: `linear-gradient(135deg, ${T.bg2} 0%, ${T.bg0} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: `repeating-linear-gradient(45deg, ${T.hazard} 0 18px, transparent 18px 36px)` }} />
        <HazardStripe height={18} style={{ position: 'absolute', top: 0, left: 0, opacity: 0.92 }} />
        <HazardStripe height={18} style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.92 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 28 }}>
          <Mono color={T.hazard} letter={3}>Images Coming Soon</Mono>
          <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 8 }}>{label || 'Evidence Slot'}</div>
        </div>
      </div>
    );
  }

  const Stamp = ({ children, tone = 'green', style }) => {
    const c = tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : tone === 'mute' ? T.mute : T.e115;
    return <span className="pap-stamp" style={{ color: c, fontFamily: tone === 'green' ? T.e115Font : undefined, ...style }}>{children}</span>;
  };

  function shufflePaperBadges(count) {
    const out = [];
    const shuffledBag = () => {
      const bag = [...PAPER_BADGE_SMALLS];
      for (let i = bag.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (out.length && bag[0] === out[out.length - 1] && bag.length > 1) {
        [bag[0], bag[1]] = [bag[1], bag[0]];
      }
      return bag;
    };
    while (out.length < count) {
      shuffledBag().forEach((src) => {
        if (out.length < count) out.push(src);
      });
    }
    return out;
  }

  const PaperBadge = ({ children, image, style }) => (
    <span className="pap-paper-badge" style={style}>
      <img src={image} alt="" aria-hidden="true" />
      <span className="pap-paper-badge-label">{children}</span>
    </span>
  );

  function PaperBadgeGroup({ items, className = 'pap-paper-badge-group', style, badgeStyle }) {
    const labels = (items || []).filter(Boolean);
    const images = useMemo(() => shufflePaperBadges(labels.length), [labels.join('\u0001')]);
    if (!labels.length) return null;
    return (
      <div className={className} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', ...style }}>
        {labels.map((item, i) => (
          <PaperBadge key={item + '-' + i} image={images[i]} style={badgeStyle}>{item}</PaperBadge>
        ))}
      </div>
    );
  }

  function Shelf115Line({ height = 3, style }) {
    return (
      <div style={{ height, width: '100%', position: 'relative', overflow: 'hidden', ...style }} aria-hidden>
        {SHELF_115_LINES.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${src}")`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: (i * -11) + 'px center',
              backgroundSize: 'auto 100%',
              opacity: i === 0 ? 0.94 : i === 1 ? 0.62 : 0.46,
            }}
          />
        ))}
      </div>
    );
  }

  function isHiddenEasterEggBadge(value) {
    const text = String(value || '').trim().toLowerCase();
    if (!text) return true;
    if (/\b\d+\s*[-–]\s*\d+\s*(min|mins|minutes|hr|hrs|hours)\b/.test(text)) return true;
    if (/\b\d+\s*(min|mins|minutes|hr|hrs|hours)\b/.test(text)) return true;
    if (/\b(power|electricity)\b/.test(text) && /\b(on|turn|turned|restore|restored|required|must)\b/.test(text)) return true;
    if (/\bpath\b/.test(text) && /\b(open|opened|required|route|access)\b/.test(text)) return true;
    return false;
  }

  function easterEggBadgeItems(ee, { includeRequirements = true } = {}) {
    const items = [ee && ee.difficulty, ee && ee.party];
    if (includeRequirements && ee && ee.requirements) items.push(...ee.requirements);
    return items.filter((item) => !isHiddenEasterEggBadge(item));
  }

  const Mono = ({ children, color, size = 10.5, letter = 1.8, style }) => (
    <span style={{ fontFamily: color === T.e115 ? T.e115Font : T.mono, fontSize: size, letterSpacing: letter, textTransform: 'uppercase', color: color || T.mute, ...style }}>{children}</span>
  );

  const Difficulty = ({ value = 1, style }) => (
    <div style={{ display: 'inline-flex', gap: 3, alignItems: 'center', ...style }} aria-label={'Difficulty ' + value + ' of 5'}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ width: 12, height: 5, background: i < value ? T.e115 : T.line }} />
      ))}
    </div>
  );

  const BigStat = ({ value, label, tone = 'bone' }) => {
    const c = tone === 'green' ? T.e115 : tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : T.bone;
    return (
      <div>
        <div className="pap-stencil pap-num" style={{ fontSize: 44, color: c }}>{String(value).padStart(2, '0')}</div>
        <Mono color={T.faint} size={9.5} letter={2}>{label}</Mono>
      </div>
    );
  };

  const SectionHead = ({ kicker, title, action }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 16, borderBottom: `1px solid ${T.line}`, paddingBottom: 10 }}>
      <div>
        {kicker && <div style={{ fontFamily: T.e115Font, fontSize: 10, letterSpacing: 2.5, color: T.e115, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>}
        <div className="pap-stencil" style={{ fontSize: 32, color: T.bone }}>{title}</div>
      </div>
      {action}
    </div>
  );

  const Crumbs = ({ parts, nav }) => (
    <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.faint, textTransform: 'uppercase', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: T.faint }}>/</span>}
          {p.to ? (
            <button className="pap-link" onClick={() => nav(p.to)} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.mute, textTransform: 'uppercase' }}>{p.label}</button>
          ) : (
            <span style={{ color: T.bone }}>{p.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  function NavDropdown({ label, items, route, nav }) {
    const [open, setOpen] = useState(false);
    const closeTimer = React.useRef(null);
    const isActive = items.some((n) =>
      route.name === n.id
      || (n.id === 'maps' && (route.name === 'map' || route.name === 'ee'))
      || (n.id === 'characters' && route.name === 'character')
      || (n.id === 'games' && route.name === 'game')
      || (n.id === 'weapons' && route.name === 'weapon')
      || (n.id === 'perks' && route.name === 'perk')
    );
    const onEnter = () => { clearTimeout(closeTimer.current); setOpen(true); };
    const onLeave = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };
    return (
      <div style={{ position: 'relative' }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <button
          style={{
            background: isActive ? T.e115bg : 'transparent',
            border: 0,
            borderBottom: isActive ? `2px solid ${T.e115}` : '2px solid transparent',
            color: isActive ? T.e115 : T.mute,
            padding: '8px 12px',
            fontFamily: T.display, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
          }}
          onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = T.bone; }}
          onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = isActive ? T.e115 : T.mute; }}
          onClick={() => setOpen(!open)}
        >
          {label}
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ opacity: 0.6 }}>
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, marginTop: 4,
            background: T.bg1, border: `1px solid ${T.lineHi}`, minWidth: 180,
            padding: '6px 0', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}>
            {items.map((n) => {
              const active = route.name === n.id
                || (n.id === 'maps' && (route.name === 'map' || route.name === 'ee'))
                || (n.id === 'characters' && route.name === 'character')
                || (n.id === 'games' && route.name === 'game')
                || (n.id === 'weapons' && route.name === 'weapon')
                || (n.id === 'perks' && route.name === 'perk');
              return (
                <button key={n.id} onClick={() => { nav({ name: n.id }); setOpen(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: active ? T.e115bg : 'transparent',
                    border: 0, padding: '10px 18px',
                    fontFamily: T.display, fontWeight: 600, fontSize: 12.5, letterSpacing: 1.8, textTransform: 'uppercase',
                    color: active ? T.e115 : T.bone, cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = T.bg3; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  {n.label}
                  {n.sub && <span style={{ display: 'block', fontFamily: T.mono, fontSize: 9, letterSpacing: 1.5, color: T.faint, marginTop: 2, fontWeight: 400 }}>{n.sub}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function Shell({ route, nav, query, setQuery, children }) {
    const now = useNow();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const databaseItems = [
      { id: 'games', label: 'Games', sub: 'WaW through BO7' },
      { id: 'maps', label: 'Maps', sub: 'All 40+ locations' },
      { id: 'songs', label: 'Songs', sub: 'Easter egg tracks' },
    ];
    const votingItems = [
      { id: 'vote', label: 'Maps', sub: 'Favorite map of all time' },
      { id: 'vote-weapons', label: 'Wonder Weapons', sub: 'Favorite arsenal' },
      { id: 'vote-perks', label: 'Perks', sub: 'Favorite machine' },
      { id: 'vote-characters', label: 'Characters', sub: 'Favorite operator' },
    ];
    const relicItems = [
      { id: 'relics', label: 'Relics', sub: 'Cursed Standard' },
    ];
    const armoryItems = [
      { id: 'weapons', label: 'Wonder Weapons', sub: 'Weapon records' },
      { id: 'perks', label: 'Perks', sub: 'Vending machines' },
    ];
    const storyItems = [
      { id: 'timeline', label: 'Kronorium', sub: 'Book of events' },
      { id: 'lore', label: 'Lore', sub: 'Deep readings' },
      { id: 'characters', label: 'Crew', sub: 'Operatives & figures' },
    ];
    const mobileGroups = [
      { label: 'Database', items: databaseItems },
      { label: 'Voting', items: votingItems },
      { label: 'Relics', items: relicItems },
      { label: 'Armory', items: armoryItems },
      { label: 'Story', items: storyItems },
    ];
    const isItemActive = (n) =>
      route.name === n.id
      || (n.id === 'maps' && (route.name === 'map' || route.name === 'ee'))
      || (n.id === 'characters' && route.name === 'character')
      || (n.id === 'games' && route.name === 'game')
      || (n.id === 'weapons' && route.name === 'weapon')
      || (n.id === 'perks' && route.name === 'perk');
    const mobileNav = (r) => {
      setMobileMenuOpen(false);
      nav(r);
    };
    return (
      <div className="pap-shell" style={{ background: T.bg0, color: T.bone, fontFamily: T.sans, minHeight: '100%', position: 'relative' }}>
        <div className="pap-wall-help" aria-hidden="true">HELP</div>
        <div className="pap-wall-lie" aria-hidden="true">Eddie is<br />A LIAR!!</div>
        <img className="pap-wall-image pap-wall-trinity" src={IMG_BASE + '/Background Images/embracethetrinity.png'} alt="" aria-hidden="true" />
        <img className="pap-wall-image pap-wall-aether" src={IMG_BASE + '/Background Images/returnthroughaether.png'} alt="" aria-hidden="true" />
        <div style={{ background: T.bg1, borderBottom: `1px solid ${T.line}`, position: 'sticky', top: 0, zIndex: 30 }}>
          <div className="pap-topbar" style={{ maxWidth: 1440, margin: '0 auto', padding: '7px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.8, color: T.faint, textTransform: 'uppercase' }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
              <span style={{ color: T.blood, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, background: T.blood, animation: 'pap-blink 1.4s steps(2) infinite' }} />
                Declassified
              </span>
              <span>{'Doc 7-G935 · Annot. Requiem · 1991'}</span>
              <span style={{ color: T.mute, whiteSpace: 'nowrap' }}>Clearance: Agent</span>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span>{now}</span>
              <span>group935.net</span>
            </div>
          </div>
        </div>
        <HazardStripe height={4} />
        <header style={{ borderBottom: `1px solid ${T.line}`, background: `linear-gradient(180deg, ${T.bg1} 0%, ${T.bg0} 100%)` }}>
          <div className="pap-header-inner" style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 28, position: 'relative' }}>
            <span className="pap-construction-notice" style={{ position: 'absolute', left: 32, top: '50%', transform: 'translate(calc(-100% - 14px), -50%)', display: 'inline-flex', alignItems: 'center', minHeight: 22, padding: '3px 7px 2px', border: `1px solid ${T.hazard}`, color: T.hazard, fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.55, textTransform: 'uppercase', lineHeight: 1.15, whiteSpace: 'nowrap', background: 'rgba(239, 181, 69, 0.08)', pointerEvents: 'none' }}>
              Site is under construction
            </span>
            <button className="pap-brand" onClick={() => nav({ name: 'home' })} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }}>
              <Monogram />
              <div style={{ textAlign: 'left' }}>
                <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, letterSpacing: 1.2 }}>
                  {'Group 935'}
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2.5, color: T.faint, marginTop: 2 }}>
                  {'ELEMENT 115 · OPERATIONS DATABASE · NO. ' + dossierNo()}
                </div>
              </div>
            </button>
            <nav className="pap-main-nav" style={{ display: 'flex', gap: 4, marginLeft: 14, alignItems: 'center' }}>
              <NavDropdown label="Database" route={route} nav={nav} items={databaseItems} />
              <NavDropdown label="Armory" route={route} nav={nav} items={armoryItems} />
              <NavDropdown label="Story" route={route} nav={nav} items={storyItems} />
              <NavDropdown label="Voting" route={route} nav={nav} items={votingItems} />
              <button
                type="button"
                onClick={() => nav({ name: 'relics' })}
                style={{
                  background: 'transparent',
                  border: 0,
                  borderBottom: route.name === 'relics' ? `2px solid ${T.bloodH}` : '2px solid transparent',
                  color: route.name === 'relics' ? T.bloodH : T.blood,
                  padding: '8px 12px',
                  fontFamily: T.display,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.bloodH; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = route.name === 'relics' ? T.bloodH : T.blood; }}
              >
                Relics
              </button>
            </nav>
            <div className="pap-header-spacer" style={{ flex: 1 }} />
            <button
              type="button"
              className={'pap-mobile-menu-toggle ' + (mobileMenuOpen ? 'is-open' : '')}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span aria-hidden style={{ display: 'grid', gap: 4 }}>
                <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor' }} />
                <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor' }} />
                <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor' }} />
              </span>
            </button>
            <div className="pap-search" style={{ display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, padding: '4px 10px 4px 12px', background: T.bg1, minWidth: 230 }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke={T.mute} strokeWidth="1.4"><circle cx="5" cy="5" r="3.5"/><path d="M8 8l3 3"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') nav({ name: 'search' }); }}
                placeholder="search the archive…"
                style={{ background: 'transparent', border: 0, outline: 'none', color: T.bone, fontFamily: T.mono, fontSize: 11.5, width: '100%' }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.faint, border: `1px solid ${T.line}`, padding: '1px 5px' }}>/</span>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="pap-mobile-menu">
              <div style={{ maxWidth: 1440, margin: '0 auto', padding: '14px' }}>
                {mobileGroups.map((group, groupIndex) => (
                  <div key={group.label} style={{ marginTop: groupIndex ? 14 : 0 }}>
                    <div style={{ fontFamily: T.e115Font, fontSize: 10, letterSpacing: 2.2, textTransform: 'uppercase', color: T.e115, marginBottom: 7 }}>
                      {group.label}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
                      {group.items.map((n) => {
                        const active = isItemActive(n);
                        return (
                          <button
                            key={n.id}
                            onClick={() => mobileNav({ name: n.id })}
                            style={{
                              minHeight: 58,
                              textAlign: 'left',
                              background: active ? T.e115bg : T.bg2,
                              border: `1px solid ${active ? T.e115dim : T.line}`,
                              color: active ? T.e115 : T.bone,
                              padding: '10px 11px',
                              fontFamily: T.display, fontWeight: 700, fontSize: 14, letterSpacing: 1.8, textTransform: 'uppercase',
                              cursor: 'pointer',
                            }}
                          >
                            {n.label}
                            {n.sub && <span style={{ display: 'block', fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.2, color: T.faint, marginTop: 3, fontWeight: 400 }}>{n.sub}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
        <main className="pap-main" style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 56px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <footer style={{ borderTop: `1px solid ${T.line}`, marginTop: 32, background: T.bg1 }}>
          <HazardStripe height={6} style={{ opacity: 0.85 }} />
          <div className="pap-footer-grid" style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
            <div>
              <div className="pap-stencil" style={{ fontSize: 22, color: T.bone }}>{'Group 935 '}<span style={{ color: T.e115 }}>//</span>{' Archive'}</div>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, marginTop: 10, maxWidth: 380 }}>
                {'A reader’s database for every map, Easter egg, relic, and operative across the entire Treyarch Zombies canon — World at War through Black Ops 7 Totenreich.'}
              </p>
              <div style={{ marginTop: 14, fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.faint, textTransform: 'uppercase' }}>
                {'group935.net · doc ' + dossierNo()}
              </div>
            </div>
            <FooterCol title="Archive" links={[['Games','games'],['Maps','maps'],['Favorite Map','vote'],['Crew','characters']]} nav={nav} />
            <FooterCol title="Reference" links={[['Wonder Weapons','weapons'],['Perks','perks'],['Songs','songs']]} nav={nav} />
            <FooterCol title="Reading" links={[['Kronorium','timeline'],['Lore','lore'],['About','about']]} nav={nav} />
          </div>
          <div className="pap-footer-bottom" style={{ borderTop: `1px solid ${T.line}`, padding: '14px 32px', maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', fontFamily: T.mono, fontSize: 10, letterSpacing: 1.8, color: T.faint, textTransform: 'uppercase' }}>
            <div>Fan project. Not affiliated with Activision or Treyarch. All trademarks belong to their owners.</div>
            <div>{'Compiled 2025 — Annot. Requiem'}</div>
          </div>
        </footer>
      </div>
    );
  }

  function FooterCol({ title, links, nav }) {
    return (
      <div>
        <div style={{ fontFamily: T.e115Font, fontSize: 10, letterSpacing: 2.5, color: T.e115, textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map(([label, page]) => (
            <button key={page} onClick={() => nav({ name: page })} className="pap-link"
              style={{ fontFamily: T.display, fontSize: 15, fontWeight: 500, letterSpacing: 1, color: T.bone, textAlign: 'left', textTransform: 'uppercase' }}>{label}</button>
          ))}
        </div>
      </div>
    );
  }

  function Monogram() {
    return (
      <span className="pap-monogram" aria-hidden style={{ width: 54, height: 54, flex: '0 0 54px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={IMG_BASE + '/Icons/Group935icon.png'} alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
      </span>
    );
  }

  function useNow() {
    const [t, setT] = useState(() => fmt(new Date()));
    useEffect(() => {
      const id = setInterval(() => setT(fmt(new Date())), 1000);
      return () => clearInterval(id);
    }, []);
    return t;
  }
  function fmt(d) {
    const pad = (n) => String(n).padStart(2, '0');
    const mon = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()];
    return pad(d.getDate()) + ' ' + mon + ' · ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function dossierNo() {
    return '2025·VII·' + (new Date().toISOString().slice(2,10).replace(/-/g,'')).slice(0,4);
  }

  // ─── HOME ──────────────────────────────────────────────────────────────
  const HOME_HERO_MAP_IDS = new Set([
    'verruckt', 'shino', 'kino', 'five', 'ascension', 'shangri', 'moon',
    'tranzit', 'dierise', 'buried', 'origins', 'thegiant', 'ix', 'voyage',
    'blood', 'ancientevil', 'tag', 'diemaschine', 'firebase', 'mauer',
    'forsaken', 'terminus', 'liberty', 'citadelle', 'tomb', 'shatteredveil',
    'reckoning', 'ashes', 'astra', 'paradox', 'totenreich',
  ]);

  function Home({ nav }) {
    const featuredPool = useMemo(() => ZD.maps.filter((m) => m.media && HOME_HERO_MAP_IDS.has(m.id)), []);
    const [featuredIndex, setFeaturedIndex] = useState(() => {
      const count = ZD.maps.filter((m) => m.media && HOME_HERO_MAP_IDS.has(m.id)).length || ZD.maps.length || 1;
      return Math.floor(Math.random() * count);
    });
    useEffect(() => {
      if (featuredPool.length <= 1) return;
      const id = setInterval(() => {
        setFeaturedIndex((current) => {
          let next = Math.floor(Math.random() * featuredPool.length);
          if (next === current % featuredPool.length) next = (next + 1) % featuredPool.length;
          return next;
        });
      }, 9000);
      return () => clearInterval(id);
    }, [featuredPool.length]);
    const featured = featuredPool[featuredIndex % featuredPool.length] || ZD.maps.find((m) => m.id === 'citadelle') || ZD.maps[0];
    const featuredGame = ZD.games.find((g) => g.id === featured.game);
    return (
      <div>
        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 36, marginBottom: 56, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
              <Stamp tone="red">{'Classified — Eyes Only'}</Stamp>
              <Mono color={T.mute}>{'Vol. VII · 2008–2025'}</Mono>
            </div>
            <h1 className="pap-stencil pap-home-manual-title" style={{ fontSize: 112, color: T.bone, margin: 0 }}>
              <span className="pap-home-manual-logo-line">
                <img className="pap-home-zombies-icon" src={IMG_BASE + '/Icons/zombiesicon.png'} alt="Zombies" />
              </span>
            </h1>
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.mute, lineHeight: 1.55, maxWidth: 560, marginTop: 22 }}>
              {'A field archive for everything Treyarch Zombies'}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <button className="pap-btn pap-btn-primary" onClick={() => nav({ name: 'maps' })}>{'Explore the Maps →'}</button>
              <button className="pap-btn pap-btn-ghost" onClick={() => nav({ name: 'timeline' })}>Read the Kronorium</button>
            </div>
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -8, right: -8, width: 'calc(100% + 16px)', height: 'calc(100% + 16px)', border: `1px solid ${T.e115dim}`, pointerEvents: 'none' }} />
            <MapImage key={featured.id} map={featured} height="100%" label={featured.name} kind="INTEL / FEATURE" tone="green" loading="eager" showOverlay={false} objectFit="cover" style={{ minHeight: 380, borderColor: T.e115dim }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(10,9,8,0.9) 100%)', padding: '32px 16px 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <Mono color={T.e115}>{'★ ' + featuredGame.code + ' · ' + featuredGame.year}</Mono>
                <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 4, lineHeight: 1 }}>{featured.name}</div>
              </div>
              <button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11, whiteSpace: 'nowrap', flexShrink: 0 }} onClick={() => nav({ name: 'map', id: featured.id })}>
                {'Open →'}
              </button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <SectionHead kicker="The Games" title="Pick a chapter" action={
            <button className="pap-btn pap-btn-ghost" style={{ padding: '10px 16px', fontSize: 11 }} onClick={() => nav({ name: 'games' })}>{'All games →'}</button>
          } />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {ZD.games.map((g) => <GameTile key={g.id} game={g} nav={nav} />)}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, marginBottom: 56 }}>
          <FeaturedEE nav={nav} />
          <FeaturedDailySong nav={nav} />
        </section>

        <section style={{ marginBottom: 24 }}>
          <SectionHead kicker="Most recent intel" title="Latest from the Aether" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {ZD.maps.filter((m) => m.game === 'bo7').map((m) => <MapCard key={m.id} map={m} nav={nav} />)}
          </div>
        </section>
      </div>
    );
  }

  function GameTile({ game, nav }) {
    const mapsIn = ZD.maps.filter((m) => m.game === game.id);
    const [hover, setHover] = useState(false);
    const [hoverIdx, setHoverIdx] = useState(0);
    const onEnter = () => {
      if (game.imgHover && game.imgHover.length > 1) {
        setHoverIdx(Math.floor(Math.random() * game.imgHover.length));
      }
      setHover(true);
    };
    const baseSrc  = game.imgBase  ? gameImg(game, game.imgBase) : null;
    const hoverSrc = game.imgHover ? gameImg(game, game.imgHover[hoverIdx] || game.imgHover[0]) : null;
    return (
      <button onClick={() => nav({ name: 'game', id: game.id })}
        onMouseEnter={onEnter} onMouseLeave={() => setHover(false)}
        className="pap-card pap-card-clickable"
        style={{ padding: 0, textAlign: 'left', color: T.bone, position: 'relative', overflow: 'hidden',
          minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {baseSrc && (
          <img src={baseSrc} alt={game.title} loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: hover && hoverSrc ? 0 : 1,
            transition: 'opacity .25s ease, transform .5s ease',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
          }} />
        )}
        {hoverSrc && (
          <img src={hoverSrc} alt="" aria-hidden loading="lazy" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: hover ? 1 : 0,
            transition: 'opacity .25s ease, transform .5s ease',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0) 35%, rgba(10,9,8,0.85) 78%, rgba(10,9,8,0.98) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Mono color={T.e115} letter={2}>{game.code + ' · ' + game.year}</Mono>
            <Mono color={T.faint}>{mapsIn.length + '/' + game.mapCount}</Mono>
          </div>
          <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, marginTop: 8, lineHeight: 1.05, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{game.title}</div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.mute, marginTop: 6 }}>{mapsIn.length + ' maps'}</div>
        </div>
      </button>
    );
  }

  function FeaturedEE({ nav }) {
    const ee = HOME_FEATURED_EE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const game = m && ZD.games.find((g) => g.id === m.game);
    const mapName = ee.mapName || (m && m.name) || 'Black Ops 7';
    const route = { name: 'ee', id: ee.id };
    const gameName = (game && game.title) || 'Archive';
    const subtitle = ee.title || ee.summary;
    const action = 'Open tutorial ->';
    return (
      <div className="pap-card" style={{ padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CallingCardReward ee={ee} height={220} />
        <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 330, overflow: 'hidden', borderTop: `1px solid ${T.line}` }}>
          <MapImage map={m} height="100%" label={mapName} kind="MAP FILE" tone="green" showOverlay={false} objectFit="cover" style={{ position: 'absolute', inset: 0, border: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.66) 0%, rgba(10,9,8,0.16) 38%, rgba(10,9,8,0.96) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
            <Stamp tone="red">Main Quest</Stamp>
            <Mono color={T.bone} style={{ textAlign: 'right' }}>{mapName + ' / Current File / ' + gameName}</Mono>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textShadow: '0 2px 14px rgba(0,0,0,0.78)' }}>
            <div className="pap-stencil" style={{ fontSize: 32, color: T.bone }}>{mapName + ' Main Quest'}</div>
            {subtitle && <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.bone, lineHeight: 1.55, margin: '10px 0 0' }}>{subtitle}</p>}
            <div>
              <button className="pap-btn pap-btn-primary" style={{ marginTop: 16, padding: '11px 18px', fontSize: 12 }}
                onClick={() => nav(route)}>
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function FeaturedDailySong({ nav }) {
    const song = useMemo(() => pickHomeDailySong(songList().filter((item) => item.videoUrl)), []);
    if (!song) {
      return (
        <div className="pap-card" style={{ padding: 22 }}>
          <Mono color={T.e115} letter={2.5}>Daily Song</Mono>
          <div className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 6 }}>Song file pending</div>
        </div>
      );
    }
    const map = ZD.maps.find((m) => m.id === song.mapId);
    const game = ZD.games.find((g) => g.id === song.gameId);
    const embedUrl = youtubeEmbedUrl(song.videoUrl);
    const activationShots = songActivationShots(song, map);
    return (
      <div className="pap-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '22px 22px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
            <div style={{ minWidth: 0 }}>
              <Mono color={T.e115} letter={2.5}>Daily Song</Mono>
              <div className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 6, lineHeight: 1 }}>{song.name}</div>
            </div>
            <button className="pap-link" onClick={() => nav({ name: 'song', id: song.id })}
              style={{ fontFamily: T.e115Font, fontSize: 10.5, letterSpacing: 2, color: T.e115, textTransform: 'uppercase', flexShrink: 0 }}>
              Open file
            </button>
          </div>
          <Mono color={T.mute}>{song.artist + ' - ' + song.mapName + (game ? ' - ' + game.code : '')}</Mono>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: T.bg0, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
          {embedUrl ? (
            <iframe
              title={song.name + ' featured daily song'}
              src={embedUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div style={{ padding: 18 }}>
              <Mono color={T.e115}>YouTube embed unavailable in this context</Mono>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, margin: '10px 0 0' }}>
                {'Open the song file for the direct video link.'}
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: 16 }}>
          <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, margin: '0 0 14px' }}>{song.activation}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {activationShots.map((shot, i) => (
              <div key={i} style={{ minWidth: 0 }}>
                {shot ? (
                  <EvidenceImage map={map} image={shot} height={112} label={shot.label || (song.name + ' trigger ' + String(i + 1))} kind={'TRIGGER ' + String(i + 1)} tone="green" showOverlay={false} objectFit="contain" openFullSize />
                ) : (
                  <Slot w="100%" h={112} label={'Trigger ' + String(i + 1)} kind="SCREENSHOT NEEDED" tone="yellow" />
                )}
                <Mono color={T.faint} style={{ display: 'block', marginTop: 6, lineHeight: 1.35 }}>{shot && shot.label ? shot.label : ('Trigger ' + String(i + 1))}</Mono>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function Games({ nav }) {
    return (
      <div>
        <PageHead crumbs={[{label:'Archive',to:{name:'home'}},{label:'Games'}]}
          kicker="The Games"
          title="All Games"
          sub={'Every Treyarch Zombies title from World at War (2008) through Black Ops 7 (2025). Select a game to see its maps.'} nav={nav} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 32 }}>
          {ZD.games.map((g) => <GameRow key={g.id} game={g} nav={nav} />)}
        </div>
      </div>
    );
  }

  function GameRow({ game, nav }) {
    const mapsIn = ZD.maps.filter((m) => m.game === game.id);
    const [hover, setHover] = useState(false);
    const [hoverIdx, setHoverIdx] = useState(0);
    const onEnter = () => {
      if (game.imgHover && game.imgHover.length > 1) {
        setHoverIdx(Math.floor(Math.random() * game.imgHover.length));
      }
      setHover(true);
    };
    const baseSrc  = game.imgBase  ? gameImg(game, game.imgBase) : null;
    const hoverSrc = game.imgHover ? gameImg(game, game.imgHover[hoverIdx] || game.imgHover[0]) : null;
    return (
      <button onClick={() => nav({ name: 'game', id: game.id })}
        onMouseEnter={onEnter} onMouseLeave={() => setHover(false)}
        className="pap-card pap-card-clickable"
        style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: 0, color: T.bone, textAlign: 'left' }}>
        <div style={{ position: 'relative', width: 200, height: 220, overflow: 'hidden', borderRight: `1px solid ${T.line}` }}>
          {baseSrc && (
            <img src={baseSrc} alt={game.title} loading="lazy" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              opacity: hover && hoverSrc ? 0 : 1,
              transition: 'opacity .25s ease, transform .5s ease',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
            }} />
          )}
          {hoverSrc && (
            <img src={hoverSrc} alt="" aria-hidden loading="lazy" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              opacity: hover ? 1 : 0,
              transition: 'opacity .25s ease, transform .5s ease',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
            }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,9,8,0) 60%, rgba(10,9,8,0.5) 100%)', pointerEvents: 'none' }} />
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
          <Mono color={T.e115} letter={2}>{game.code + ' · ' + game.year}</Mono>
          <div className="pap-stencil" style={{ fontSize: 30, color: T.bone, marginTop: 6 }}>{game.title}</div>
          <div style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, marginTop: 4 }}>{mapsIn.length + ' maps catalogued'}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            {mapsIn.map((m) => (
              <span key={m.id} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, color: T.mute, padding: '3px 8px', background: T.bg1, border: `1px solid ${T.line}`, textTransform: 'uppercase' }}>{m.name}</span>
            ))}
          </div>
        </div>
      </button>
    );
  }

  function Game({ id, nav }) {
    const g = ZD.games.find((x) => x.id === id);
    if (!g) return <NotFound nav={nav} what="Game" />;
    const mapsIn   = ZD.maps.filter((m) => m.game === id);
    const songsIn  = songList().filter((s) => s.gameId === id);
    const wwIn     = ZD.wonderWeapons.filter((w) => (w.gameIds || []).includes(id));
    const crewIn   = (g.crewIds || []).map((cid) => ZD.characters.find((c) => c.id === cid)).filter(Boolean);
    const relicMapsIn = mapsIn.filter((m) => relicCountForMap(m) > 0);
    const totalRelics = relicMapsIn.reduce((a, m) => a + relicCountForMap(m), 0);

    return (
      <div>
        {/* HERO with key art background */}
        <GameHero game={g} nav={nav} />

        {/* ABOUT */}
        {g.description && (
          <section style={{ marginTop: 48 }}>
            <SectionHead kicker={'About ' + g.code} title={g.title} />
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.bone, lineHeight: 1.75, maxWidth: 820 }}>{g.description}</p>
          </section>
        )}

        {/* MAPS */}
        <section style={{ marginTop: 48 }}>
          <SectionHead kicker={mapsIn.length + ' of ' + g.mapCount + ' sites'} title="Maps in this game" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {mapsIn.map((m) => <MapCard key={m.id} map={m} nav={nav} />)}
          </div>
        </section>

        {/* SONGS */}
        {songsIn.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionHead kicker={songsIn.length + ' catalogued track' + (songsIn.length === 1 ? '' : 's')} title="Songs"
              action={<button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }} onClick={() => nav({ name: 'songs' })}>All songs →</button>}
            />
            <SongTable songs={songsIn} nav={nav} />
          </section>
        )}

        {/* WONDER WEAPONS */}
        {wwIn.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionHead kicker="Weapons" title="Wonder Weapons" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              {wwIn.map((w, i) => (
                <button key={w.id} onClick={() => nav({ name: 'weapon', id: w.id })} className="pap-card pap-card-clickable"
                  style={{ padding: 18, display: 'grid', gridTemplateColumns: '112px 1fr', gap: 18, color: T.bone, textAlign: 'left', borderColor: T.line }}>
                  <WeaponImage weapon={w} height={118} label={w.name} />
                  <div>
                    <Mono color={T.e115}>{w.map || String(i+1).padStart(2,'0')}</Mono>
                    <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 4 }}>{w.name}</div>
                    {w.summary && <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, marginTop: 8 }}>{w.summary}</p>}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* GOBBLEGUMS — feature-flagged per game */}
        {g.features && g.features.hasGobblegums && (
          <ContentSection
            kicker={g.id === 'bo3' ? 'Vending mechanic · Classic era' : g.id === 'bo7' ? 'Returning mechanic · BO7 rules' : 'Gobblegums'}
            title={'Gobblegums' + (g.id === 'bo3' ? '' : g.id === 'bo7' ? ' — Reforged' : '')}
            items={g.gobblegums}
            kind="gobblegum"
            emptyHint={'Drop your ' + g.code + ' gobblegum spreadsheet rows into the gameContent block in the data IIFE — name, rarity, effect.'}
          />
        )}

        {/* ELIXIRS — BO4 */}
        {g.features && g.features.hasElixirs && (
          <ContentSection
            kicker="Vending mechanic · BO4 rules"
            title="Elixirs"
            items={g.elixirs}
            kind="elixir"
            emptyHint="Drop your BO4 elixir spreadsheet rows into the gameContent block — name, rarity, effect."
          />
        )}

        {/* AUGMENTS — BO6 */}
        {g.features && g.features.hasAugments && (
          <ContentSection
            kicker="Perk modifications · BO6 rules"
            title="Augments"
            items={g.augments}
            kind="augment"
            emptyHint="Drop your BO6 augment spreadsheet rows into the gameContent block — perk, type (Major/Minor), name, effect."
          />
        )}

        {/* CREW */}
        {crewIn.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionHead kicker="Personnel" title="Crew of this game"
              action={<button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }} onClick={() => nav({ name: 'characters' })}>All crew →</button>}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {crewIn.map((c) => (
                <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })} className="pap-card pap-card-clickable"
                  style={{ padding: 0, color: T.bone, textAlign: 'left' }}>
                  <CharacterImage character={c} kind="OPERATIVE" style={{ height: 180 }} />
                  <div style={{ padding: 14 }}>
                    <div className="pap-stencil" style={{ fontSize: 17, color: T.bone }}>{c.name}</div>
                    <Mono color={T.faint}>{c.role}</Mono>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* RELICS — gated by feature flag (BO7 only) */}
        {g.features && g.features.hasRelics && relicMapsIn.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <SectionHead
              kicker={'BO7 mechanic · ' + totalRelics + ' relics across ' + relicMapsIn.length + ' sites'}
              title="Relics"
              action={<button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }} onClick={() => nav({ name: 'relics' })}>Full catalogue →</button>}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {relicMapsIn.map((m) => (
                <button key={m.id} onClick={() => nav({ name: 'map', id: m.id })} className="pap-card pap-card-clickable"
                  style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, color: T.bone, textAlign: 'left' }}>
                  <div>
                    <Mono color={T.e115}>{g.code + ' · ' + g.year}</Mono>
                    <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 6 }}>{m.name}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 4 }}>{m.location}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="pap-stencil pap-num" style={{ fontSize: 44, color: T.hazard, lineHeight: 1 }}>{String(relicCountForMap(m)).padStart(2,'0')}</div>
                    <Mono color={T.faint}>Relics</Mono>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CONTINUE */}
        <section style={{ marginTop: 48 }}>
          <SectionHead kicker="Other games" title="Continue exploring" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {ZD.games.filter((x) => x.id !== g.id).slice(0, 4).map((other) => <GameTile key={other.id} game={other} nav={nav} />)}
          </div>
        </section>
      </div>
    );
  }

  function GameHero({ game, nav }) {
    const [hover, setHover] = useState(false);
    const [hoverIdx, setHoverIdx] = useState(0);
    const onEnter = () => {
      if (game.imgHover && game.imgHover.length > 1) {
        setHoverIdx(Math.floor(Math.random() * game.imgHover.length));
      }
      setHover(true);
    };
    const baseSrc  = game.imgBase  ? gameImg(game, game.imgBase) : null;
    const hoverSrc = game.imgHover ? gameImg(game, game.imgHover[hoverIdx] || game.imgHover[0]) : null;
    return (
      <div>
        <Crumbs parts={[{label:'Archive',to:{name:'home'}},{label:'Games',to:{name:'games'}},{label:game.title}]} nav={nav} />
        <div onMouseEnter={onEnter} onMouseLeave={() => setHover(false)}
          style={{ marginTop: 16, position: 'relative', overflow: 'hidden', border: `1px solid ${T.line}`, minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {baseSrc && <img src={baseSrc} alt={game.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hover && hoverSrc ? 0 : 1, transition: 'opacity .25s, transform .6s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />}
          {hoverSrc && <img src={hoverSrc} alt="" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hover ? 1 : 0, transition: 'opacity .25s, transform .6s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.1) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,0.95) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', padding: 36 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <Stamp tone="green">{game.code}</Stamp>
              <Mono color={T.bone}>{game.year + ' · ' + game.era}</Mono>
            </div>
            <h1 className="pap-stencil" style={{ fontSize: 72, color: T.bone, margin: 0, textShadow: '0 4px 18px rgba(0,0,0,0.7)' }}>{game.title}</h1>
          </div>
        </div>
        <Shelf115Line height={23} style={{ marginTop: 18 }} />
      </div>
    );
  }

  function songSlug(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function songRouteId(mapId, songName) {
    return songSlug(mapId) + '-' + songSlug(songName);
  }

  function songList() {
    return ZD.maps.flatMap((m) => (m.songs || []).map((s) => ({
      ...s,
      id: songRouteId(m.id, s.name),
      mapId: m.id,
      mapName: m.name,
      gameId: m.game,
    })));
  }

  function youtubeEmbedUrl(url) {
    const id = String(url || '').match(/[?&]v=([^&]+)/);
    if (!id) return null;
    const params = new URLSearchParams({ rel: '0' });
    if (window.location.origin && /^https?:/.test(window.location.origin)) {
      params.set('origin', window.location.origin);
    }
    return 'https://www.youtube.com/embed/' + id[1] + '?' + params.toString();
  }

  function songActivationShots(song, map) {
    if (song && song.activationShots && song.activationShots.length) {
      return Array.from({ length: 3 }, (_, i) => song.activationShots[i] || null);
    }
    const files = mapGalleryItems(map).slice(0, 3);
    return Array.from({ length: 3 }, (_, i) => files[i] || null);
  }

  function relicList(mapId) {
    return (ZD.relics || []).filter((relic) => relic.map === mapId);
  }

  function relicCountForMap(map) {
    if (!map) return 0;
    return Math.max(map.relicCount || 0, relicList(map.id).length);
  }

  function relicTierTone(tier) {
    if (tier === 'Wicked') return T.blood;
    if (tier === 'Sinister') return T.hazard;
    return T.e115;
  }

  const RELIC_TIER_ORDER = ['Grim', 'Sinister', 'Wicked'];

  function orderedRelicBoardItems(relics) {
    return RELIC_TIER_ORDER.flatMap((tier) => relics.filter((relic) => relic.tier === tier));
  }

  function RelicBoardSlot({ relic, active, onSelect }) {
    const iconSrc = relicIconImg(relic);
    const pending = relic.status === 'pending';
    return (
      <button
        type="button"
        role="listitem"
        className={'pap-relic-slot' + (active ? ' is-active' : '')}
        aria-pressed={active ? 'true' : 'false'}
        aria-label={relic.name + ', ' + relic.tier + ' relic'}
        title={relic.name}
        onClick={() => onSelect(relic.id)}
      >
        {iconSrc ? (
          <img src={iconSrc} alt="" loading="lazy" />
        ) : (
          <span className="pap-relic-slot-placeholder" aria-hidden>{pending ? '?' : 'R'}</span>
        )}
      </button>
    );
  }

  function RelicStage({ relics, selected, setSelectedId }) {
    const boardItems = orderedRelicBoardItems(relics);
    const selectedIcon = relicIconImg(selected);
    const selectedAccent = selected ? relicTierTone(selected.tier) : T.e115;
    return (
      <section className="pap-relic-stage" aria-label="Black Ops 7 relic archive">
        <div className="pap-relic-stage-inner">
          <img className="pap-relic-skulls" src={relicPageImg('RelicSkulls.png')} alt="" loading="lazy" />

          <div className="pap-relic-board-wrap">
            <div className="pap-relic-board" role="list" aria-label="Relic slots by tier">
              <div className="pap-relic-board-grid">
                {boardItems.map((relic) => (
                  <RelicBoardSlot
                    key={relic.id}
                    relic={relic}
                    active={selected && selected.id === relic.id}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pap-relic-effect-panel">
            <div className="pap-relic-effect-head">
              <div className="pap-stencil" style={{ fontSize: 24, color: T.bone }}>Relic & Effect</div>
            </div>
            {selected && (
              <div className="pap-relic-effect-body">
                {selectedIcon ? (
                  <img className="pap-relic-effect-icon" src={selectedIcon} alt="" loading="lazy" />
                ) : (
                  <div className="pap-relic-effect-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedAccent, fontFamily: T.display, fontSize: 54, fontWeight: 800 }}>?</div>
                )}
                <div className="pap-relic-effect-copy">
                  <Mono color={T.bone} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{selected.tier + ' / ' + selected.difficulty}</Mono>
                  <div className="pap-stencil" style={{ fontSize: 25, color: T.bone, marginTop: 8 }}>{selected.name}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.5, color: T.mute, marginTop: 9 }}>{selected.effect}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  function RelicInfoRow({ label, value }) {
    if (!value) return null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', gap: 12, padding: '8px 0', borderTop: `1px solid ${T.line}` }}>
        <Mono color={T.faint}>{label}</Mono>
        <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.bone, lineHeight: 1.55 }}>{value}</div>
      </div>
    );
  }

  function RelicNoteList({ title, items }) {
    if (!items || !items.length) return null;
    return (
      <div style={{ marginTop: 16 }}>
        <Mono color={T.e115} letter={2}>{title}</Mono>
        <ul style={{ listStyle: 'none', padding: 0, margin: '9px 0 0', display: 'grid', gap: 7 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 9, fontFamily: T.sans, fontSize: 14, lineHeight: 1.5, color: T.mute }}>
              <span style={{ color: T.hazard, fontFamily: T.mono }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function RelicCard({ relic, defaultOpen = false }) {
    const accent = relicTierTone(relic.tier);
    const pending = relic.status === 'pending';
    const iconSrc = relicIconImg(relic);
    return (
      <details className="pap-card" open={pending || defaultOpen ? true : undefined} style={{ padding: 0, overflow: 'hidden', borderColor: pending ? T.hazardDim : T.line }}>
        <summary style={{ listStyle: 'none', cursor: 'pointer', padding: 18, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: accent, border: `1px solid ${accent}`, padding: '3px 8px', background: 'rgba(0,0,0,0.18)' }}>{relic.tier}</span>
              <Mono color={pending ? T.hazard : T.faint}>{pending ? 'Pending recovery' : relic.difficulty}</Mono>
            </div>
            <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, marginTop: 9 }}>{relic.name}</div>
            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.5, marginTop: 7 }}>{relic.effect}</div>
          </div>
          <div style={{ width: 52, height: 52, border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, fontFamily: T.display, fontSize: 24, fontWeight: 700, background: 'rgba(0,0,0,0.18)' }}>
            {iconSrc ? <img src={iconSrc} alt="" loading="lazy" style={{ width: '74%', height: '74%', objectFit: 'contain', filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.5))' }} /> : '?'}
          </div>
        </summary>
        <div style={{ padding: '0 18px 18px' }}>
          <RelicInfoRow label="Portal" value={relic.portal} />
          <RelicInfoRow label="Trial" value={relic.trial} />
          <RelicInfoRow label="Save" value={relic.save} />
          <RelicNoteList title="Recovery" items={relic.unlock} />
          <RelicNoteList title="Field Notes" items={relic.prep} />
        </div>
      </details>
    );
  }

  function RelicGrid({ relics }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
        {relics.map((relic) => <RelicCard key={relic.id} relic={relic} />)}
      </div>
    );
  }

  function SongTable({ songs, nav }) {
    return (
      <div className="pap-card" style={{ padding: 0, overflow: 'hidden' }}>
        {songs.map((s, i) => (
          <button key={s.id || i} onClick={() => nav({ name: 'song', id: s.id || songRouteId(s.mapId, s.name) })}
            className="pap-row pap-song-row"
            style={{ borderTop: i ? `1px solid ${T.line}` : 0 }}>
            <div className="pap-song-index"><Mono color={T.e115} letter={2}>{String(i + 1).padStart(2, '0')}</Mono></div>
            <div className="pap-song-main">
              <div className="pap-stencil pap-song-title">{s.name}</div>
              <Mono color={T.faint}>{s.artist}</Mono>
            </div>
            <div className="pap-song-map"><Mono color={T.mute}>{s.mapName}</Mono></div>
            <div className="pap-song-activation">{s.activation}</div>
            <div className="pap-song-arrow"><Mono color={T.e115}>{'›'}</Mono></div>
          </button>
        ))}
      </div>
    );
  }

  // ─── content cards: gobblegums / elixirs / augments ────────────────────
  // Shared rarity palette used by gobblegums + elixirs.
  const RARITY_COLOR = {
    'common':     '#9b9282',
    'rare':       '#3a8fff',
    'ultra-rare': '#9aff6e',
    'epic':       '#b066ff',
    'legendary':  '#f5c518',
    'mega':       '#d062ff',
    'whimsical':  '#ff6eb5',
  };

  function GumBubble({ color }) {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r="20" fill={color} opacity="0.12" />
        <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="17" cy="17" r="3.5" fill="#fff" opacity="0.35" />
      </svg>
    );
  }
  function ElixirVial({ color }) {
    return (
      <svg width="36" height="48" viewBox="0 0 36 48" aria-hidden>
        <path d="M14 4 L22 4 L22 16 L29 26 L29 40 Q29 44 25 44 L11 44 Q7 44 7 40 L7 26 L14 16 Z"
              fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <line x1="12" y1="4" x2="24" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 32 L29 32" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  function AugmentIcon({ perk, type }) {
    const isMajor = type && type.toLowerCase() === 'major';
    const color = isMajor ? T.e115 : T.bone;
    return (
      <div style={{
        width: 48, height: 48, position: 'relative',
        border: `2px solid ${color}`,
        borderRadius: isMajor ? 24 : 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.display, fontWeight: 700, fontSize: 13, color,
        background: 'rgba(154,255,110,0.04)',
      }}>
        {(perk || 'A').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase()}
        {isMajor && <div style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: 7, background: T.e115, border: `2px solid ${T.bg0}` }} />}
      </div>
    );
  }

  function ContentCard({ kind, item }) {
    const color = item.rarity ? (RARITY_COLOR[item.rarity.toLowerCase()] || T.mute) : T.e115;
    const icon = kind === 'gobblegum' ? <GumBubble color={color} />
              : kind === 'elixir'    ? <ElixirVial color={color} />
              : kind === 'augment'   ? <AugmentIcon perk={item.perk} type={item.type} />
              : null;
    return (
      <div className="pap-card" style={{ padding: 18, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52 }}>{icon}</div>
        <div className="pap-stencil" style={{ fontSize: 17, color: T.bone, lineHeight: 1.15 }}>{item.name}</div>
        {/* contextual subline */}
        {item.rarity && (
          <div style={{ marginTop: 6 }}>
            <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.8, color, textTransform: 'uppercase', padding: '2px 8px', border: `1px solid ${color}`, background: 'rgba(154,255,110,0.04)' }}>{item.rarity}</span>
          </div>
        )}
        {item.perk && (
          <div style={{ marginTop: 6, display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Mono color={T.e115} letter={1.5}>{item.perk}</Mono>
            {item.type && <Mono color={T.faint} letter={1.5}>{'· ' + item.type}</Mono>}
          </div>
        )}
        {item.effect && (
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, lineHeight: 1.5, marginTop: 10, marginBottom: 0 }}>{item.effect}</p>
        )}
      </div>
    );
  }

  function ContentSection({ kicker, title, items, kind, emptyHint, columns = 4, action }) {
    const isEmpty = !items || items.length === 0;
    return (
      <section style={{ marginTop: 48 }}>
        <SectionHead kicker={kicker} title={title} action={action} />
        {isEmpty ? (
          <div className="pap-card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Stamp tone="yellow">Awaiting Sync</Stamp>
            <div style={{ fontFamily: T.sans, fontSize: 14, color: T.mute }}>{emptyHint}</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + columns + ', 1fr)', gap: 14 }}>
            {items.map((item, i) => <ContentCard key={(item.name || '') + i} kind={kind} item={item} />)}
          </div>
        )}
      </section>
    );
  }

  // ─── character portraits ───────────────────────────────────────────────
  function CharacterImage({ character, variant, style, kind = 'OPERATIVE', showKind = true }) {
    if (!character) return null;
    const variants = character.portraits || null;
    const v = variants ? (variant || character.defaultPortrait) : null;
    const p = variants ? (variants[v] || variants[character.defaultPortrait] || variants[Object.keys(variants)[0]]) : null;
    const src = p ? charImg(p) : null;
    if (!src) {
      // Fallback for characters without portraits (samantha, maxis — voice/disembodied).
      const last = character.name.split(' ').slice(-1)[0];
      return <Slot label={last} kind={kind} tone="green" style={style} />;
    }
    const objectPosition = p.objectPosition || 'center 20%';
    const imgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition };
    return (
      <div style={{ position: 'relative', overflow: 'hidden', background: T.bg2, border: `1px solid ${T.line}`, ...style }}>
        <img src={src} alt={character.name} loading="lazy" style={imgStyle} />
        {showKind && (
          <div style={{ position: 'absolute', top: 6, left: 8, fontFamily: T.mono, fontSize: 9, letterSpacing: 1.5, color: T.bone, opacity: 0.85, background: 'rgba(10,9,8,0.55)', padding: '2px 7px' }}>{kind}</div>
        )}
      </div>
    );
  }

  function VariantToggle({ character, variant, setVariant }) {
    if (!character.portraits) return null;
    const keys = Object.keys(character.portraits);
    if (keys.length <= 1) return null;
    return (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
        {keys.map((k) => {
          const active = (variant || character.defaultPortrait) === k;
          const label = character.portraits[k].label || k;
          return (
            <button key={k} onClick={() => setVariant(k)} className={'pap-chip ' + (active ? 'is-active' : '')}>{label}</button>
          );
        })}
      </div>
    );
  }

  function characterTileRole(role) {
    return String(role || '').split(/\s+[·•]\s+/)[0];
  }

  const CREW_VARIANT_VOTE_IDS = ['dempsey', 'nikolai', 'takeo', 'richtofen'];
  const WEAPON_SET_VOTE_IDS = new Set(['staves', 'bows', 'hands-of-god']);

  function characterVoteItems() {
    return ZD.characters.flatMap((character) => {
      if (!CREW_VARIANT_VOTE_IDS.includes(character.id)) return [character];
      const variants = ['primis', 'ultimis', 'tempus'];
      return variants.map((variant) => {
        const portrait = character.portraits && character.portraits[variant];
        const label = (portrait && portrait.label) || variant;
        return {
          ...character,
          id: variant === 'primis' ? character.id : character.id + '-' + variant,
          voteBaseId: character.id,
          voteVariant: variant,
          voteLabel: label,
          name: character.name + ' (' + label + ')',
          role: label + ' crew',
          faction: variant,
          defaultPortrait: variant,
        };
      });
    });
  }

  function weaponVoteItems() {
    const variantWeapons = {
      staves: [
        { id: 'staff-fire', name: 'Staff of Fire', hero: 'StaffofFire_Side.png', type: 'Elemental staff' },
        { id: 'staff-ice', name: 'Staff of Ice', hero: 'StaffofIce_Side.png', type: 'Elemental staff' },
        { id: 'staff-lightning', name: 'Staff of Lightning', hero: 'StaffofLightning_Side.png', type: 'Elemental staff' },
        { id: 'staff-wind', name: 'Staff of Wind', hero: 'StaffofWind_Side.png', type: 'Elemental staff' },
      ],
      bows: [
        { id: 'bow-lightning', name: 'Lightning Bow', hero: "LightningBow_Side_Kreema'ahm la Ahmahm.png", type: 'Elemental bow' },
        { id: 'bow-wolf', name: 'Wolf Bow', hero: 'WolfBow_Side_Kreeholo lu Kreemasaleet.png', type: 'Elemental bow' },
        { id: 'bow-fire', name: 'Fire Bow', hero: "FireBow_Side_Kreeaho'ahm nal Ahmhogaroc.png", type: 'Elemental bow' },
        { id: 'bow-void', name: 'Void Bow', hero: "VoidBow_Side_Kreegakaleet lu Gosata'ahm.png", type: 'Elemental bow' },
      ],
      'hands-of-god': [
        { id: 'hand-charon', name: 'Hand of Charon', hero: 'HandofCharon.png', type: 'God hand' },
        { id: 'hand-gaia', name: 'Hand of Gaia', hero: 'HandofGaia.png', type: 'God hand' },
        { id: 'hand-hemera', name: 'Hand of Hemera', hero: 'HandofHemera.png', type: 'God hand' },
        { id: 'hand-ouranos', name: 'Hand of Ouranos', hero: 'HandofOuranos.png', type: 'God hand' },
      ],
    };

    return ZD.wonderWeapons.flatMap((weapon) => {
      if (!WEAPON_SET_VOTE_IDS.has(weapon.id)) return [weapon];
      return (variantWeapons[weapon.id] || []).map((variant) => ({
        ...weapon,
        ...variant,
        voteBaseId: weapon.id,
        map: weapon.map,
        mapId: weapon.mapId,
        gameIds: weapon.gameIds,
        introduced: weapon.introduced,
        media: { dir: weapon.media.dir, hero: variant.hero, gallery: [] },
      }));
    });
  }

  function votePollConfig(pollId) {
    const gameFilters = [{ id: 'all', label: 'All' }].concat(ZD.games.map((g) => ({ id: g.id, label: g.code })));
    const weaponItems = weaponVoteItems();
    const characterItems = characterVoteItems();
    const factionLabel = (id) => ({
      primis: 'Primis',
      ultimis: 'Ultimis',
      tempus: 'Tempus',
      victis: 'Victis',
      chaos: 'Chaos',
      requiem: 'Requiem',
      aether: 'Aether',
      order: 'The Order',
      support: 'Support',
      darkaether: 'Dark Aether',
      celebrity: 'Celebrity',
    }[id] || String(id || 'Other').replace(/-/g, ' '));
    const factionFilters = [{ id: 'all', label: 'All' }].concat(
      Array.from(new Set(characterItems.map((c) => c.faction).filter(Boolean)))
        .map((id) => ({ id, label: factionLabel(id) }))
    );
    const gameMeta = (gameId) => {
      const g = ZD.games.find((x) => x.id === gameId);
      return g ? (g.code + ' / ' + g.year) : 'Archive';
    };
    const itemGamesMatch = (item, filter) =>
      filter === 'all'
      || item.game === filter
      || ((item.gameIds || []).includes(filter));

    const configs = {
      maps: {
        pollId: 'maps',
        routeName: 'vote',
        title: 'Favorite Map of All Time',
        sub: 'Pick one map. You can change your vote later; only your current pick counts in this category.',
        rulesTitle: 'One Map Vote',
        leaderboardTitle: 'Top 5 Maps',
        itemPlural: 'maps',
        currentLabel: 'Current map vote',
        sourceLabel: 'Browse Maps',
        sourceRoute: { name: 'maps' },
        items: ZD.maps,
        filters: gameFilters,
        matchesFilter: (item, filter) => filter === 'all' || item.game === filter,
        getMeta: (item) => gameMeta(item.game),
        getSub: (item) => item.location,
        getDetailRoute: (item) => ({ name: 'map', id: item.id }),
        renderImage: (item, height, compact) => {
          const g = ZD.games.find((x) => x.id === item.game);
          return <MapImage map={item} file={mapPrimaryFile(item, 'thumb')} height={height} label={item.name} kind={(g && g.code) || 'MAP'} tone="green" showOverlay={!compact} />;
        },
      },
      weapons: {
        pollId: 'weapons',
        routeName: 'vote-weapons',
        title: 'Wonder Weapon Vote',
        sub: 'Pick one wonder weapon. You can change your vote later; only your current pick counts in this category.',
        rulesTitle: 'One Wonder Weapon Vote',
        leaderboardTitle: 'Top 5 Wonder Weapons',
        itemPlural: 'wonder weapons',
        currentLabel: 'Current weapon vote',
        sourceLabel: 'Browse Wonder Weapons',
        sourceRoute: { name: 'weapons' },
        items: weaponItems,
        filters: gameFilters,
        matchesFilter: itemGamesMatch,
        getMeta: (item) => item.type || item.map || 'Wonder weapon',
        getSub: (item) => item.type || item.map || '',
        getDetailRoute: (item) => ({ name: 'weapon', id: item.voteBaseId || item.id }),
        renderImage: (item, height) => <WeaponImage weapon={item} file={weaponPrimaryFile(item, 'thumb')} height={height} label={item.name} showOverlay={false} />,
      },
      perks: {
        pollId: 'perks',
        routeName: 'vote-perks',
        title: 'Perk Vote',
        sub: 'Pick one perk. You can change your vote later; only your current pick counts in this category.',
        rulesTitle: 'One Perk Vote',
        leaderboardTitle: 'Top 5 Perks',
        itemPlural: 'perks',
        currentLabel: 'Current perk vote',
        sourceLabel: 'Browse Perks',
        sourceRoute: { name: 'perks' },
        items: ZD.perks,
        filters: gameFilters,
        matchesFilter: itemGamesMatch,
        getMeta: (item) => item.introduced || 'Perk-a-Cola',
        getSub: (item) => item.effect || item.introduced || '',
        getDetailRoute: (item) => ({ name: 'perk', id: item.id }),
        renderImage: (item, height) => <PerkImage perk={item} file={perkPrimaryFile(item, 'thumb')} height={height} label={item.name} showOverlay={false} />,
      },
      characters: {
        pollId: 'characters',
        routeName: 'vote-characters',
        title: 'Character Vote',
        sub: 'Pick one character. You can change your vote later; only your current pick counts in this category.',
        rulesTitle: 'One Character Vote',
        leaderboardTitle: 'Top 5 Characters',
        itemPlural: 'characters',
        currentLabel: 'Current character vote',
        sourceLabel: 'Browse Crew',
        sourceRoute: { name: 'characters' },
        items: characterItems,
        filters: factionFilters,
        matchesFilter: (item, filter) => filter === 'all' || item.faction === filter,
        getMeta: (item) => item.voteLabel || item.role || factionLabel(item.faction),
        getSub: (item) => item.voteLabel || item.role || factionLabel(item.faction),
        getDetailRoute: (item) => ({ name: 'character', id: item.voteBaseId || item.id }),
        renderImage: (item, height, compact) => <CharacterImage character={item} variant={item.voteVariant} kind="OPERATIVE" showKind={!compact} style={{ height }} />,
      },
    };
    return configs[pollId] || configs.maps;
  }

  function VotePage({ nav, pollId }) {
    const config = votePollConfig(pollId);
    const [filter, setFilter] = useState('all');
    const [storedVote, setStoredVote] = useState(() => readStoredVote(config.pollId));
    const [counts, setCounts] = useState({});
    const [totalVotes, setTotalVotes] = useState(0);
    const [status, setStatus] = useState(FAVORITE_MAP_VOTE_ENDPOINT ? 'loading' : 'local');
    const [message, setMessage] = useState('');
    const [savingItemId, setSavingItemId] = useState(null);

    const hasLiveTotals = !!FAVORITE_MAP_VOTE_ENDPOINT && Object.keys(counts).length > 0;

    const hydrateVoteTotals = useCallback((data) => {
      if (!data) return;
      const pollData = data.polls && data.polls[config.pollId];
      const nextCounts = (pollData && pollData.counts) || data.counts || data.results || data.mapVotes;
      if (!nextCounts) return;
      setCounts(nextCounts);
      const nextTotal = Number((pollData && (pollData.totalVotes || pollData.total)) || data.totalVotes || data.total || Object.values(nextCounts).reduce((sum, n) => sum + Number(n || 0), 0));
      setTotalVotes(Number.isFinite(nextTotal) ? nextTotal : 0);
    }, [config.pollId]);

    useEffect(() => {
      let cancelled = false;
      if (!FAVORITE_MAP_VOTE_ENDPOINT) return undefined;
      voteRequest(config.pollId, 'GET')
        .then((data) => {
          if (cancelled) return;
          hydrateVoteTotals(data);
          setStatus('ready');
        })
        .catch(() => {
          if (cancelled) return;
          setStatus('offline');
          setMessage('Live totals are unavailable right now. The browser vote lock will still work.');
        });
      return () => { cancelled = true; };
    }, [config.pollId, hydrateVoteTotals]);

    const list = useMemo(() => {
      return config.items.filter((item) => config.matchesFilter(item, filter));
    }, [config, filter]);
    const topItems = useMemo(() => {
      return Object.entries(counts)
        .map(([itemId, count]) => ({ item: config.items.find((entry) => entry.id === itemId), count: Number(count || 0) }))
        .filter((entry) => entry.item && entry.count > 0)
        .sort((a, b) => b.count - a.count || a.item.name.localeCompare(b.item.name))
        .slice(0, 5);
    }, [config, counts]);

    const castVote = async (item) => {
      if (savingItemId || (storedVote && storedVote.itemId === item.id)) return;
      const voterId = getVoteVoterId();
      const record = { pollId: config.pollId, itemId: item.id, voterId, votedAt: new Date().toISOString() };
      setSavingItemId(item.id);
      setMessage('');

      try {
        const data = await voteRequest(config.pollId, 'POST', {
          pollId: config.pollId,
          itemId: item.id,
          mapId: config.pollId === 'maps' ? item.id : undefined,
          voterId,
        });
        const serverItemId = data && (data.itemId || data.existingItemId || data.mapId || data.existingMapId);
        const finalRecord = {
          ...record,
          itemId: serverItemId || item.id,
          endpoint: FAVORITE_MAP_VOTE_ENDPOINT || 'local',
          serverSynced: !!FAVORITE_MAP_VOTE_ENDPOINT,
        };
        storeVote(config.pollId, finalRecord);
        setStoredVote(finalRecord);
        hydrateVoteTotals(data);
        setStatus(FAVORITE_MAP_VOTE_ENDPOINT ? 'ready' : 'local');
      } catch (e) {
        setStatus('offline');
        setMessage((e && e.message) || 'Vote service unavailable. Please try again later.');
      } finally {
        setSavingItemId(null);
      }
    };

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Voting'},{label:config.title}]}
          kicker="Community vote"
          title={config.title}
          sub={config.sub}
          nav={nav}
        />

        <div className="pap-card" style={{ padding: 18, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <Mono color={T.e115}>All-time leaderboard</Mono>
              <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>{config.leaderboardTitle}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Mono color={T.faint}>{totalVotes + ' total votes'}</Mono>
              <button
                type="button"
                onClick={() => nav({ name: 'vote-ranking', id: config.pollId })}
                className="pap-btn pap-btn-ghost"
                style={{ padding: '8px 12px', fontSize: 11 }}
              >
                Full Ranking
              </button>
            </div>
          </div>
          {message && (
            <p style={{ fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.5, color: status === 'offline' ? T.bloodH : T.mute, margin: '12px 0 0' }}>
              {message}
            </p>
          )}
          {topItems.length > 0 ? (
            <div className="pap-vote-leaderboard">
              {topItems.map((entry, i) => {
                const item = entry.item;
                const percent = totalVotes > 0 ? Math.round((entry.count / totalVotes) * 100) : 0;
                return (
                  <div key={item.id} className={'pap-vote-leader-row ' + (i === 0 ? 'is-first' : '')}>
                    <div className="pap-stencil pap-num pap-vote-rank" style={{ color: i === 0 ? T.e115 : T.mute }}>{String(i + 1).padStart(2, '0')}</div>
                    {config.renderImage(item, 58, true)}
                    <button type="button" onClick={() => nav(config.getDetailRoute(item))} className="pap-link" style={{ textAlign: 'left', minWidth: 0 }}>
                      <div className="pap-stencil" style={{ fontSize: 19, color: T.bone }}>{item.name}</div>
                      <Mono color={T.faint}>{config.getMeta(item)}</Mono>
                    </button>
                    <div style={{ textAlign: 'right' }}>
                      <Mono color={T.e115}>{entry.count + ' votes'}</Mono>
                      <div style={{ marginTop: 3 }}><Mono color={T.faint}>{percent + '%'}</Mono></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.55, color: T.mute, margin: '14px 0 0' }}>
              {status === 'loading' ? 'Loading the all-time vote totals.' : 'The top 5 will appear here as soon as votes are recorded in this category.'}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button className={'pap-chip ' + (filter==='all'?'is-active':'')} onClick={() => setFilter('all')}>All</button>
            {config.filters.filter((f) => f.id !== 'all').map((f) => (
              <button key={f.id} className={'pap-chip ' + (filter===f.id?'is-active':'')} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <Mono color={T.faint}>{list.length + ' ' + config.itemPlural + ' listed'}</Mono>
        </div>

        <div className="pap-vote-grid">
          {list.map((item) => {
            const isSelected = storedVote && storedVote.itemId === item.id;
            const locked = !!storedVote;
            const liveCount = Number(counts[item.id] || 0);
            const percent = totalVotes > 0 ? Math.round((liveCount / totalVotes) * 100) : 0;
            return (
              <div key={item.id} className={'pap-card pap-vote-card ' + (isSelected ? 'is-selected ' : '') + (locked && !isSelected ? 'is-muted' : '')}>
                {config.renderImage(item, 156, false)}
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <Mono color={T.e115}>{config.getMeta(item)}</Mono>
                    {isSelected && <Stamp tone="green" style={{ fontSize: 9 }}>Picked</Stamp>}
                  </div>
                  <div className="pap-stencil" style={{ fontSize: 21, color: T.bone, marginTop: 9 }}>{item.name}</div>
                  <div style={{ flex: 1 }} />
                  {hasLiveTotals && (
                    <div style={{ marginTop: 13 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 5 }}>
                        <Mono color={T.faint}>{liveCount + ' votes'}</Mono>
                        <Mono color={T.faint}>{percent + '%'}</Mono>
                      </div>
                      <div style={{ height: 7, background: T.bg0, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
                        <div style={{ width: percent + '%', height: '100%', background: isSelected ? T.e115 : T.lineHi }} />
                      </div>
                    </div>
                  )}
                  <div className="pap-vote-actions">
                    <button
                      type="button"
                      className={isSelected ? 'pap-btn pap-btn-primary' : 'pap-btn pap-btn-ghost'}
                      disabled={isSelected || !!savingItemId}
                      onClick={() => castVote(item)}
                      style={{ flex: '1 1 auto', padding: '11px 14px', fontSize: 12 }}
                    >
                      {savingItemId === item.id ? 'Recording' : isSelected ? 'Current Vote' : locked ? 'Change Vote' : 'Vote'}
                    </button>
                    <button type="button" onClick={() => nav(config.getDetailRoute(item))} className="pap-link" style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: T.mute }}>
                      Dossier
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function FavoriteMapVote({ nav }) {
    return <VotePage nav={nav} pollId="maps" />;
  }

  function VoteRankingPage({ nav, pollId }) {
    const config = votePollConfig(pollId);
    const [counts, setCounts] = useState({});
    const [totalVotes, setTotalVotes] = useState(0);
    const [status, setStatus] = useState(FAVORITE_MAP_VOTE_ENDPOINT ? 'loading' : 'local');
    const [message, setMessage] = useState('');

    const hydrateVoteTotals = useCallback((data) => {
      if (!data) return;
      const pollData = data.polls && data.polls[config.pollId];
      const nextCounts = (pollData && pollData.counts) || data.counts || data.results || data.mapVotes;
      if (!nextCounts) return;
      setCounts(nextCounts);
      const nextTotal = Number((pollData && (pollData.totalVotes || pollData.total)) || data.totalVotes || data.total || Object.values(nextCounts).reduce((sum, n) => sum + Number(n || 0), 0));
      setTotalVotes(Number.isFinite(nextTotal) ? nextTotal : 0);
    }, [config.pollId]);

    useEffect(() => {
      let cancelled = false;
      if (!FAVORITE_MAP_VOTE_ENDPOINT) return undefined;
      voteRequest(config.pollId, 'GET')
        .then((data) => {
          if (cancelled) return;
          hydrateVoteTotals(data);
          setStatus('ready');
        })
        .catch(() => {
          if (cancelled) return;
          setStatus('offline');
          setMessage('Ranking totals are unavailable right now.');
        });
      return () => { cancelled = true; };
    }, [config.pollId, hydrateVoteTotals]);

    const rankedItems = useMemo(() => {
      return config.items
        .map((item) => ({ item, count: Number(counts[item.id] || 0) }))
        .sort((a, b) => b.count - a.count || a.item.name.localeCompare(b.item.name));
    }, [config, counts]);

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Voting',to:{name:config.routeName}},{label:'Full Ranking'}]}
          kicker={totalVotes + ' total votes'}
          title={config.leaderboardTitle + ' Ranking'}
          sub={'Every ' + config.itemPlural + ' option ranked from first to last by current vote total.'}
          nav={nav}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
          <button type="button" onClick={() => nav({ name: config.routeName })} className="pap-btn pap-btn-ghost" style={{ padding: '9px 14px', fontSize: 11 }}>
            Back to Vote
          </button>
          <Mono color={T.faint}>{rankedItems.length + ' ranked entries'}</Mono>
        </div>

        {message && (
          <p style={{ fontFamily: T.sans, fontSize: 13, lineHeight: 1.55, color: status === 'offline' ? T.bloodH : T.mute, margin: '16px 0 0' }}>
            {message}
          </p>
        )}

        <div className="pap-card" style={{ padding: 0, marginTop: 18, overflow: 'hidden' }}>
          {rankedItems.map((entry, i) => {
            const item = entry.item;
            const percent = totalVotes > 0 ? Math.round((entry.count / totalVotes) * 100) : 0;
            return (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '54px 96px minmax(0, 1fr) auto',
                gap: 14,
                alignItems: 'center',
                padding: '11px 16px',
                borderTop: i ? `1px solid ${T.line}` : 0,
                background: i === 0 ? T.e115bg : 'transparent',
              }}>
                <div className="pap-stencil pap-num" style={{ fontSize: 24, color: i === 0 ? T.e115 : T.mute, textAlign: 'center' }}>{String(i + 1).padStart(2, '0')}</div>
                {config.renderImage(item, 64, true)}
                <button type="button" onClick={() => nav(config.getDetailRoute(item))} className="pap-link" style={{ textAlign: 'left', minWidth: 0 }}>
                  <div className="pap-stencil" style={{ fontSize: 21, color: T.bone }}>{item.name}</div>
                  <Mono color={T.faint}>{config.getMeta(item)}</Mono>
                </button>
                <div style={{ textAlign: 'right' }}>
                  <Mono color={entry.count ? T.e115 : T.faint}>{entry.count + ' votes'}</Mono>
                  <div style={{ marginTop: 3 }}><Mono color={T.faint}>{percent + '%'}</Mono></div>
                </div>
              </div>
            );
          })}
          {!rankedItems.length && (
            <div style={{ padding: 22 }}>
              <Mono color={T.faint}>{status === 'loading' ? 'Loading ranking.' : 'No ranking data available.'}</Mono>
            </div>
          )}
        </div>
      </div>
    );
  }

  function Maps({ nav }) {
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('newest');
    const list = useMemo(() => {
      let l = filter === 'all' ? ZD.maps : ZD.maps.filter((m) => m.game === filter);
      if (sort === 'newest')    l = [...l].reverse();
      if (sort === 'difficulty') l = [...l].sort((a, b) => b.difficulty - a.difficulty);
      if (sort === 'name')       l = [...l].sort((a, b) => a.name.localeCompare(b.name));
      return l;
    }, [filter, sort]);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Maps'}]}
          kicker={ZD.maps.length + ' catalogued sites'}
          title="Maps"
          nav={nav}
        />
        <div style={{ display: 'flex', gap: 18, marginTop: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button className={'pap-chip ' + (filter==='all'?'is-active':'')} onClick={() => setFilter('all')}>All</button>
            {ZD.games.map((g) => (
              <button key={g.id} className={'pap-chip ' + (filter===g.id?'is-active':'')} onClick={() => setFilter(g.id)}>{g.code}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mono color={T.faint}>sort</Mono>
            {[['newest','Newest'],['oldest','Oldest'],['name','Name'],['difficulty','Diff']].map(([k,l]) => (
              <button key={k} className={'pap-chip ' + (sort===k?'is-active':'')} onClick={() => setSort(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24 }}>
          {list.map((m) => <MapCard key={m.id} map={m} nav={nav} />)}
        </div>
      </div>
    );
  }

  function MapCard({ map, nav }) {
    const g = ZD.games.find((x) => x.id === map.game);
    return (
      <button onClick={() => nav({ name: 'map', id: map.id })} className="pap-card pap-card-clickable"
        style={{ padding: 0, color: T.bone, textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
        <MapImage map={map} file={mapPrimaryFile(map, 'thumb')} height={180} label={map.name} kind={g.code + ' / ' + g.year} tone="green" showOverlay={false} />
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Mono color={T.e115}>{g.code + ' · ' + g.year}</Mono>
          </div>
          <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 10 }}>{map.name}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
            <Mono color={T.e115}>{'Open ›'}</Mono>
          </div>
        </div>
      </button>
    );
  }

  function MapDetail({ id, nav }) {
    const m = ZD.maps.find((x) => x.id === id);
    if (!m) return <NotFound nav={nav} what="Map" />;
    const g = ZD.games.find((x) => x.id === m.game);
    const ee = [ZD.sampleEE, ...(ZD.classicEasterEggs || []), ...(ZD.bo7EasterEggs || [])]
      .filter(Boolean)
      .find((item) => item.map === m.id);
    const hasEE = m.eeCount > 0 || !!ee;
    const gallery = mapGalleryItems(m);
    const relics = relicList(m.id);
    const relicCount = relicCountForMap(m);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Maps',to:{name:'maps'}},{label:m.name}]}
          kicker={g.code + ' · ' + g.year}
          title={m.name}
          sub={m.location}
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginTop: 28 }}>
          <MapImage map={m} height={400} label={m.name} kind="SITE / IMAGERY" tone="green" loading="eager" openFullSize />
          <div className="pap-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <Mono color={T.e115}>Intel Sheet</Mono>
            <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>Site Brief</div>
            <IntelRow label="Designation" value={m.name} />
            <IntelRow label="Game" value={g.title + ' · ' + g.code} />
            <IntelRow label="Location" value={m.location} />
            <IntelRow label="Threat Level" value={<Difficulty value={m.difficulty} />} />
            <IntelRow label="Main Quest" value={hasEE ? '1 catalogued' : 'None catalogued'} tone={hasEE ? 'green' : 'mute'} />
            <IntelRow label="Songs" value={(m.songs && m.songs.length) ? (m.songs.length + ' catalogued') : '—'} tone={(m.songs && m.songs.length) ? 'green' : 'mute'} />
            {relicCount > 0 && <IntelRow label="Relics" value={relicCount + ' hidden'} tone="yellow" />}
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {(m.tags || []).map((t) => (
                <span key={t} style={{ fontFamily: T.e115Font, fontSize: 10, letterSpacing: 1.2, color: T.e115, padding: '3px 8px', background: T.e115bg, border: `1px solid ${T.e115dim}`, textTransform: 'uppercase' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {m.summary && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker="Site Brief" title="Operational summary" />
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.bone, lineHeight: 1.7, maxWidth: 780 }}>{m.summary}</p>
          </section>
        )}

        {gallery.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker={gallery.length + ' recovered frames'} title="Gallery" />
            <MapGalleryPreview map={m} items={gallery} />
          </section>
        )}

        <section style={{ marginTop: 40 }}>
          <SectionHead kicker={hasEE ? 'Primary Easter Egg' : 'No primary quest catalogued'} title="Main Quest" />
          {hasEE && ee ? (
            <button onClick={() => nav({ name: 'ee', id: ee.id })} className="pap-card pap-card-clickable"
              style={{ display: 'grid', gridTemplateColumns: '220px 1fr auto', alignItems: 'stretch', padding: 0, width: '100%', color: T.bone, textAlign: 'left' }}>
              {ee.rewardGif ? (
                <CallingCardReward ee={ee} height={180} />
              ) : ee.heroImage ? (
                <EvidenceImage map={m} image={ee.heroImage} height={180} label={ee.title} kind="MAIN QUEST" tone="red" />
              ) : (
                <Slot w={220} h={180} label="EE" kind="MAIN QUEST" tone="red" />
              )}
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <PaperBadgeGroup
                  items={easterEggBadgeItems(ee, { includeRequirements: false })}
                  className="pap-map-quest-badges"
                  style={{ gap: 8 }}
                  badgeStyle={{ minWidth: 104, minHeight: 34, padding: '8px 14px 9px', fontSize: 15, letterSpacing: 1.15 }}
                />
                <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 10 }}>{ee.title}</div>
                {ee.summary && <div style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, marginTop: 6, maxWidth: 540 }}>{ee.summary}</div>}
              </div>
              <div style={{ alignSelf: 'center', padding: '0 28px' }}>
                <Mono color={T.e115} size={13} letter={2.5}>{'Begin →'}</Mono>
              </div>
            </button>
          ) : hasEE ? (
            <ComingSoon what="Full walkthrough" />
          ) : (
            <div className="pap-card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
              <PaperBadgeGroup items={['Classic Era']} className="pap-map-quest-badges" style={{ gap: 8 }} />
              <div style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute }}>No main quest catalogued for this site. This is a pure-survival map.</div>
            </div>
          )}
        </section>

        {/* SONGS section */}
        {(m.songs && m.songs.length > 0) && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker={m.songs.length + ' track' + (m.songs.length === 1 ? '' : 's')} title="Hidden Songs" />
            <div className="pap-card" style={{ padding: 0, overflow: 'hidden' }}>
              {m.songs.map((s, i) => (
                <button key={i} onClick={() => nav({ name: 'song', id: songRouteId(m.id, s.name) })}
                  className="pap-row"
                  style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr 1.4fr', gap: 18, alignItems: 'center',
                  padding: '16px 22px', border: 0, borderTop: i ? `1px solid ${T.line}` : 0, color: T.bone,
                  background: 'transparent', cursor: 'pointer', textAlign: 'left', width: '100%',
                }}>
                  <Mono color={T.e115} letter={2}>{String(i + 1).padStart(2, '0')}</Mono>
                  <div>
                    <div className="pap-stencil" style={{ fontSize: 20, color: T.bone }}>{s.name}</div>
                    <Mono color={T.faint}>{s.artist}</Mono>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55 }}>{s.activation}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* RELICS (BO7 only after restructure) */}
        {relicCount > 0 && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker={relicCount + ' relics on site'} title="Relics" />
            {relics.length > 0 ? <RelicGrid relics={relics} /> : <ComingSoon what="Individual relic write-ups" />}
          </section>
        )}

        <section style={{ marginTop: 40 }}>
          <SectionHead kicker="Personnel present" title="On site" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {pickCharactersForMap(m).map((c) => (
              <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })} className="pap-card pap-card-clickable"
                style={{ padding: 0, color: T.bone, textAlign: 'left' }}>
                <CharacterImage character={c} kind="OPERATIVE" style={{ height: 170 }} />
                <div style={{ padding: 14 }}>
                  <div className="pap-stencil" style={{ fontSize: 17, color: T.bone }}>{c.name}</div>
                  <Mono color={T.faint}>{c.role}</Mono>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <SectionHead kicker="Other sites in this game" title="Continue" action={
            <button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }}
              onClick={() => nav({ name: 'game', id: g.id })}>{'All in ' + g.code + ' →'}</button>
          } />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {ZD.maps.filter((x) => x.game === g.id && x.id !== m.id).slice(0, 3).map((x) => (
              <MapCard key={x.id} map={x} nav={nav} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  function pickCharactersForMap(m) {
    // Pull from the per-game roster (`game.crewIds`, set in the data IIFE).
    // For finer-grained per-map casting, add a `crewIds` field directly on
    // each map object in the data — this falls back to the game roster.
    if (m.crewIds && m.crewIds.length) {
      return m.crewIds.map((id) => ZD.characters.find((c) => c.id === id)).filter(Boolean);
    }
    const g = ZD.games.find((x) => x.id === m.game);
    const ids = (g && g.crewIds) || [];
    return ids.map((id) => ZD.characters.find((c) => c.id === id)).filter(Boolean).slice(0, 8);
  }

  function IntelRow({ label, value, tone }) {
    const c = tone === 'green' ? T.e115 : tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : tone === 'mute' ? T.mute : T.bone;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.line}` }}>
        <Mono color={T.faint}>{label}</Mono>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: c, fontWeight: 500 }}>{value}</div>
      </div>
    );
  }

  function ComingSoon({ what }) {
    return (
      <div className="pap-card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
        <PaperBadgeGroup items={['Awaiting Sync']} className="pap-map-quest-badges" style={{ gap: 8 }} />
        <div style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute }}>{what + ' arriving with the next archive update.'}</div>
      </div>
    );
  }

  function EasterEggUnderConstruction({ ee, map, game, nav }) {
    const mapName = ee.mapName || (map && map.name) || 'Black Ops 7';
    return (
      <div>
        <PageHead
          crumbs={[
            {label:'Archive',to:{name:'home'}},
            {label:'Maps',to:{name:'maps'}},
            ...(map ? [{label:mapName,to:{name:'map',id:map.id}}] : []),
            {label:ee.title},
          ]}
          kicker={'Main Quest - ' + mapName + ' - ' + ((game && game.code) || 'BO7')}
          title={ee.title}
          sub={ee.summary || 'Tutorial build in progress.'}
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
          <div className="pap-card" style={{ padding: 0, overflow: 'hidden' }}>
            <CallingCardReward ee={ee} height={320} />
          </div>
          <div className="pap-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <PaperBadgeGroup items={['Under Construction', 'Main Quest']} className="pap-map-quest-badges" style={{ gap: 8 }} />
            <div className="pap-stencil" style={{ fontSize: 36, color: T.bone, marginTop: 16 }}>Tutorial Sync Pending</div>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.mute, lineHeight: 1.65, marginTop: 12 }}>
              The reward file is live. The full step-by-step Easter egg tutorial is still being assembled.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
              {map && <button className="pap-btn pap-btn-primary" onClick={() => nav({ name: 'map', id: map.id })}>Open map file -></button>}
              <button className="pap-btn pap-btn-ghost" onClick={() => nav({ name: 'game', id: 'bo7' })}>Black Ops 7 -></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function EEPage({ id, nav }) {
    const ee = [ZD.sampleEE, ...(ZD.classicEasterEggs || []), ...(ZD.bo7EasterEggs || [])].find((item) => item.id === id) || ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const g = ZD.games.find((x) => x.id === (m && m.game));
    const steps = ee.steps || [];
    const progressKey = 'g935.ee.progress.' + ee.id + '.steps.v2';
    const bulletProgressKey = 'g935.ee.progress.' + ee.id + '.substeps.v2';
    const activeKey = 'g935.ee.active.' + ee.id + '.v2';
    const readStoredSet = (key) => {
      try {
        const raw = window.localStorage && window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        return new Set();
      }
    };
    const [completed, setCompleted] = useState(() => readStoredSet(progressKey));
    const [completedBullets, setCompletedBullets] = useState(() => readStoredSet(bulletProgressKey));
    const [active, setActiveIndex] = useState(() => {
      try {
        const stored = window.localStorage && window.localStorage.getItem(activeKey);
        const parsed = Number(stored);
        if (Number.isFinite(parsed)) return Math.max(0, Math.min(steps.length - 1, parsed));
      } catch (err) {}
      return 0;
    });

    useEffect(() => {
      try {
        if (window.localStorage) window.localStorage.setItem(progressKey, JSON.stringify(Array.from(completed)));
      } catch (err) {}
    }, [progressKey, completed]);
    useEffect(() => {
      try {
        if (window.localStorage) window.localStorage.setItem(bulletProgressKey, JSON.stringify(Array.from(completedBullets)));
      } catch (err) {}
    }, [bulletProgressKey, completedBullets]);
    useEffect(() => {
      try {
        if (window.localStorage) window.localStorage.setItem(activeKey, String(active));
      } catch (err) {}
    }, [activeKey, active]);

    if (!steps.length) return <EasterEggUnderConstruction ee={ee} map={m} game={g} nav={nav} />;

    const safeMapName = (m && m.name) || ee.mapName || 'Map file';
    const safeGameCode = (g && g.code) || 'Zombies';
    const bulletKey = (step, index) => step.n + ':' + index;
    const bulletKeys = (step) => (step.bullets || []).map((_, i) => bulletKey(step, i));
    const setActive = (index) => setActiveIndex(Math.max(0, Math.min(steps.length - 1, index)));
    const stepExcerpt = (step) => {
      const raw = (step.body || (step.bullets && step.bullets[0]) || '').replace(/\s+/g, ' ').trim();
      return raw.length > 78 ? raw.slice(0, 78) + '...' : raw;
    };
    const substepParts = (item) => {
      const text = String(item || '');
      const match = text.match(/^([^:]{3,74}):\s+(.+)$/);
      if (!match) return { title: text, detail: '' };
      return { title: match[1], detail: match[2] };
    };
    const isStepComplete = (step) => {
      const keys = bulletKeys(step);
      return completed.has(step.n) || (keys.length > 0 && keys.every((key) => completedBullets.has(key)));
    };
    const bulletDoneCount = (step) => {
      const keys = bulletKeys(step);
      if (!keys.length) return isStepComplete(step) ? 1 : 0;
      if (completed.has(step.n)) return keys.length;
      return keys.filter((key) => completedBullets.has(key)).length;
    };
    const setStepComplete = (step, done) => {
      setCompleted((s) => {
        const ns = new Set(s);
        if (done) ns.add(step.n); else ns.delete(step.n);
        return ns;
      });
      const keys = bulletKeys(step);
      if (keys.length) {
        setCompletedBullets((s) => {
          const ns = new Set(s);
          keys.forEach((key) => {
            if (done) ns.add(key);
            else ns.delete(key);
          });
          return ns;
        });
      }
    };
    const toggleStep = (step) => setStepComplete(step, !isStepComplete(step));
    const toggleBullet = (step, index) => {
      const key = bulletKey(step, index);
      setCompletedBullets((s) => {
        const ns = new Set(s);
        if (ns.has(key)) ns.delete(key); else ns.add(key);
        const keys = bulletKeys(step);
        const allDone = keys.length > 0 && keys.every((item) => ns.has(item));
        setCompleted((current) => {
          const next = new Set(current);
          if (allDone) next.add(step.n); else next.delete(step.n);
          return next;
        });
        return ns;
      });
    };
    const resetProgress = () => {
      if (!window.confirm('Reset progress for this easter egg?')) return;
      setCompleted(new Set());
      setCompletedBullets(new Set());
      setActive(0);
    };
    const CheckGlyph = () => (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: 'currentColor', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }} aria-hidden>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );

    const activeStep = steps[active] || steps[0];
    const activeImages = activeStep.images || (activeStep.image ? [activeStep.image] : []);
    const stepImageDisplay = (image) => {
      if (!image || typeof image === 'string' || image.layout || image.objectFit !== 'contain') return image;
      return { ...image, layout: 'natural' };
    };
    const displayImages = activeImages.map(stepImageDisplay);
    const usePackedImages = displayImages.some((image) => image && typeof image !== 'string' && image.layout === 'natural');
    const activeStepDone = isStepComplete(activeStep);
    const activeSubTotal = (activeStep.bullets || []).length;
    const activeSubDone = bulletDoneCount(activeStep);

    return (
      <div>
        <PageHead
          crumbs={[
            {label:'Archive',to:{name:'home'}},
            {label:'Maps',to:{name:'maps'}},
            ...(m ? [{label:safeMapName,to:{name:'map',id:m.id}}] : []),
            {label:ee.title},
          ]}
          kicker={'Main Quest - ' + safeMapName + ' - ' + safeGameCode}
          title={ee.title}
          sub={ee.id === 'ascension-casimir-mechanism' ? '' : ee.summary}
          titleNoWrap
          nav={nav}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 18, marginTop: 18 }}>
          <PaperBadgeGroup className="pap-ee-badges" items={easterEggBadgeItems(ee)} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button type="button" className="pap-btn pap-btn-primary" onClick={() => setStepComplete(activeStep, true)} disabled={activeStepDone} style={{ padding: '10px 14px', fontSize: 11 }}>
              {activeStepDone ? 'Step complete' : (activeSubTotal ? 'Mark substeps complete' : 'Mark step complete')}
            </button>
            <button type="button" className="pap-btn pap-btn-ghost" onClick={resetProgress} style={{ padding: '10px 14px', fontSize: 11 }}>Reset progress</button>
          </div>
        </div>

        <div className="pap-ee-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, marginTop: 36 }}>
          <div className="pap-ee-sidebar">
            <div className="pap-ee-step-list" style={{ position: 'relative' }}>
              <div className="pap-ee-step-line" style={{ position: 'absolute', left: 16, top: 14, bottom: 14, width: 1, background: T.line }} />
              {steps.map((s, i) => {
                const done = isStepComplete(s);
                const isActive = i === active;
                const compactDone = done && !isActive;
                return (
                  <button key={s.n} type="button" onClick={() => setActive(i)} className={'pap-ee-step-pill' + (isActive ? ' is-active' : '') + (done ? ' is-done' : '')}
                    style={{
                      display: 'grid', gridTemplateColumns: compactDone ? '28px 1fr' : '34px 1fr', gap: compactDone ? 8 : 12, alignItems: compactDone ? 'center' : 'flex-start',
                      width: '100%', padding: compactDone ? '5px 8px 5px 0' : '10px 10px 10px 0', background: isActive ? T.bg1 : 'transparent',
                      border: isActive ? `1px solid ${T.lineHi}` : '1px solid transparent',
                      cursor: 'pointer', textAlign: 'left', color: T.bone, position: 'relative',
                    }}>
                    <span className="pap-ee-step-num" onClick={(e) => { e.stopPropagation(); toggleStep(s); }} title={done ? 'Mark incomplete' : 'Mark complete'} style={{
                      width: compactDone ? 28 : 34, height: compactDone ? 28 : 34, flexShrink: 0,
                      border: `1.5px solid ${done ? T.e115 : isActive ? T.bone : T.lineHi}`,
                      background: done ? T.e115 : T.bg0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.display, fontSize: compactDone ? 12 : 14, fontWeight: 700,
                      color: done ? T.bg0 : isActive ? T.bone : T.mute,
                    }}>
                      {done ? <CheckGlyph /> : String(s.n).padStart(2,'0')}
                    </span>
                    <div className="pap-ee-step-meta" style={{ paddingTop: compactDone ? 0 : 6, minWidth: 0 }}>
                      {!compactDone && <Mono color={isActive ? T.e115 : T.faint}>{'Step ' + s.n}</Mono>}
                      <div className="pap-stencil pap-ee-step-title" style={{ fontSize: compactDone ? 13 : 16, color: isActive ? T.bone : T.mute, marginTop: compactDone ? 0 : 2, textDecoration: done ? 'line-through' : 'none', whiteSpace: compactDone ? 'nowrap' : 'normal', overflow: compactDone ? 'hidden' : 'visible', textOverflow: compactDone ? 'ellipsis' : 'clip' }}>{s.title}</div>
                      {!compactDone && stepExcerpt(s) && <div className="pap-ee-step-summary">{stepExcerpt(s)}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pap-ee-content">
            {activeImages.length > 0 && (
              <div
                className={'pap-ee-images ' + (activeImages.length === 1 ? 'is-single' : 'is-multiple') + (usePackedImages ? ' is-packed' : '')}
                style={usePackedImages
                  ? { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 12 }
                  : { display: 'grid', gridTemplateColumns: activeImages.length === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}
              >
                {displayImages.map((image, i) => (
                  <EvidenceImage
                    key={((image && image.file) || (typeof image === 'string' ? image : 'image')) + '-' + i}
                    map={m}
                    image={image}
                    height={(image && image.height) || (activeImages.length === 1 ? 300 : 170)}
                    label={(image && image.label) || (activeStep.title + ' reference ' + String(i + 1))}
                    kind={(image && image.kind) || ('STEP ' + activeStep.n)}
                    tone="red"
                    showOverlay={!image || image.showOverlay !== false}
                    compactOverlay
                    openFullSize
                  />
                ))}
              </div>
            )}

            <div style={{ marginTop: activeImages.length > 0 ? 22 : 0 }}>
              <div className="pap-ee-detail-grid">
                <div>
                  <Mono color={T.e115} letter={2.5}>{'Step ' + activeStep.n + ' of ' + steps.length}</Mono>
                  <h2 className="pap-stencil pap-ee-step-heading" style={{ fontSize: 38, color: T.bone, margin: '8px 0 14px' }}>{activeStep.title}</h2>
                  {activeStep.body && <p className="pap-ee-step-body" style={{ fontFamily: T.sans, fontSize: 16.5, color: activeStepDone ? T.mute : T.bone, lineHeight: 1.7, maxWidth: 760, margin: '0 0 18px', textDecoration: activeStepDone ? 'line-through' : 'none' }}>{activeStep.body}</p>}

                  {activeStep.bullets && activeStep.bullets.length > 0 && (
                    <div className="pap-ee-substeps">
                      <div className="pap-ee-substeps-head">
                        <div>
                          <Mono color={T.faint} letter={2.2}>Substeps</Mono>
                          <div className="pap-stencil" style={{ color: T.bone, fontSize: 24, marginTop: 5 }}>{'Step ' + String(activeStep.n).padStart(2, '0') + ' checklist'}</div>
                        </div>
                        <Mono color={T.e115}>{activeSubDone + ' / ' + activeSubTotal + ' done'}</Mono>
                      </div>
                      {activeStep.bullets.map((item, i) => {
                        const bulletDone = activeStepDone || completedBullets.has(bulletKey(activeStep, i));
                        const parts = substepParts(item);
                        return (
                          <button type="button" key={item} className={'pap-ee-substep' + (bulletDone ? ' is-done' : '')} onClick={() => toggleBullet(activeStep, i)}>
                            <span className={'pap-ee-checkbox' + (bulletDone ? ' is-done' : '')} aria-hidden>{bulletDone ? <CheckGlyph /> : ''}</span>
                            <span className="pap-ee-substep-num"><Mono color={bulletDone ? T.e115 : T.faint}>{String(i + 1).padStart(2, '0')}</Mono></span>
                            <span>
                              <span className="pap-ee-substep-title">{parts.title}</span>
                              {parts.detail && <span className="pap-ee-substep-detail">{parts.detail}</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <aside className="pap-ee-aside">
                  <div className="pap-ee-side-card">
                    <h3>Quest file</h3>
                    <ul>
                      <li>{'Difficulty: ' + ee.difficulty}</li>
                      <li>{'Duration: ' + ee.duration}</li>
                      <li>{'Party: ' + ee.party}</li>
                    </ul>
                  </div>
                  {ee.requirements && ee.requirements.length > 0 && (
                    <div className="pap-ee-side-card">
                      <h3>Requirements</h3>
                      <ul>{ee.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  )}
                  {ee.rewards && ee.rewards.length > 0 && (
                    <div className="pap-ee-side-card">
                      <h3>Rewards</h3>
                      <ul>{ee.rewards.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  )}
                </aside>
              </div>

              <nav className="pap-ee-pager">
                <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)}>
                  <Mono color={T.faint} letter={2}>Previous</Mono>
                  <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 5 }}>{active > 0 ? steps[active - 1].title : 'Start of quest'}</div>
                </button>
                <button type="button" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>
                  <Mono color={T.faint} letter={2}>Next</Mono>
                  <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 5 }}>{active < steps.length - 1 ? steps[active + 1].title : 'Quest complete'}</div>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Characters({ nav }) {
    const originalCrewOptions = [
      { id: 'primis', label: 'Primis' },
      { id: 'ultimis', label: 'Ultimis' },
      { id: 'tempus', label: 'Tempus' },
    ];
    const [originalCrewVariant, setOriginalCrewVariant] = useState(originalCrewOptions[0].id);
    const selectedOriginalCrew = originalCrewOptions.find((o) => o.id === originalCrewVariant);
    const originalCrewLabel = selectedOriginalCrew ? selectedOriginalCrew.label : originalCrewOptions[0].label;
    const factions = [
      { id: 'original-crew', sourceId: 'primis', title: 'Original Crew' },
      { id: 'aether',  title: 'Aether Figures' },
      { id: 'victis',  title: 'Victis' },
      { id: 'chaos',   title: 'Chaos Crew' },
      { id: 'requiem', title: 'Requiem' },
      { id: 'order',   title: 'The Order' },
      { id: 'support', title: 'Support Cast' },
    ];
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Crew'}]}
          kicker={ZD.characters.length + ' personnel on file'}
          title="The Crew"
          sub={ZD.characters.length + ' named personnel grouped by faction.'}
          nav={nav}
        />
        {factions.map((f) => {
          const inFaction = ZD.characters.filter((c) => c.faction === (f.sourceId || f.id));
          const isOriginalCrew = f.id === 'original-crew';
          if (inFaction.length === 0) return null;
          return (
            <section key={f.id} style={{ marginTop: 44 }}>
              <SectionHead
                kicker={f.kicker}
                title={f.title}
                action={isOriginalCrew ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {originalCrewOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={'pap-chip ' + (originalCrewVariant === opt.id ? 'is-active' : '')}
                        aria-pressed={originalCrewVariant === opt.id}
                        onClick={() => setOriginalCrewVariant(opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
                {inFaction.map((c) => (
                  <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })} className="pap-card pap-card-clickable"
                    style={{ padding: 0, color: T.bone, textAlign: 'left' }}>
                    <CharacterImage
                      character={c}
                      variant={isOriginalCrew ? originalCrewVariant : undefined}
                      kind={isOriginalCrew ? originalCrewLabel.toUpperCase() : 'OPERATIVE'}
                      showKind={false}
                      style={{ height: 280 }}
                    />
                    <div style={{ padding: 16 }}>
                      <Mono color={T.e115}>{characterTileRole(c.role)}</Mono>
                      <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 6 }}>{c.name}</div>
                      {c.quote && !(f.id === 'original-crew' && c.id === 'richtofen') && <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 6, lineHeight: 1.5 }}>{'"' + c.quote + '"'}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  function CharacterDetail({ id, nav }) {
    const c = ZD.characters.find((x) => x.id === id);
    if (!c) return <NotFound nav={nav} what="Operative" />;
    const [variant, setVariant] = useState(c.defaultPortrait || (c.portraits && Object.keys(c.portraits)[0]) || null);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Crew',to:{name:'characters'}},{label:c.name}]}
          kicker={c.role}
          title={c.name}
          sub={c.origin}
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 36, marginTop: 32 }}>
          <div>
            <CharacterImage character={c} variant={variant} kind="DOSSIER" style={{ width: 380, height: 480 }} />
            <VariantToggle character={c} variant={variant} setVariant={setVariant} />
            <div style={{ marginTop: 18, padding: 16, background: T.bg1, border: `1px solid ${T.line}` }}>
              <IntelRow label="Origin" value={c.origin} />
              <IntelRow label="Role" value={c.role} />
              <IntelRow label="Status" value="Active" tone="green" />
            </div>
          </div>
          <div>
            {c.quote && (
              <div style={{ borderLeft: `3px solid ${T.e115}`, paddingLeft: 22, marginBottom: 28 }}>
                <Mono color={T.e115}>On record</Mono>
                <div className="pap-stencil" style={{ fontSize: 36, color: T.bone, marginTop: 8, lineHeight: 1.1 }}>{'"' + c.quote + '"'}</div>
              </div>
            )}
            {c.summary && <p style={{ fontFamily: T.sans, fontSize: 17, color: T.bone, lineHeight: 1.7 }}>{c.summary}</p>}
            <div style={{ marginTop: 36 }}>
              <SectionHead kicker="Cross-Reference" title="Sites visited" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ZD.maps.slice(0, 8).map((m) => (
                  <button key={m.id} onClick={() => nav({ name: 'map', id: m.id })} className="pap-chip">{m.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function WonderWeapons({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Wonder Weapons'}]}
          kicker="Catalogued Weapons"
          title="Wonder Weapons"
          sub="Weapon records with origin, type, appearances, and image files."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 32 }}>
          {ZD.wonderWeapons.map((w, i) => (
            <button key={w.id} onClick={() => nav({ name: 'weapon', id: w.id })} className="pap-card pap-card-clickable"
              style={{ padding: 0, color: T.bone, textAlign: 'left', overflow: 'hidden' }}>
              <WeaponImage weapon={w} height={190} label={w.name} />
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 9 }}>
                  <Mono color={T.e115}>{w.map || 'Unfiled'}</Mono>
                  <Mono color={T.faint}>{String(i + 1).padStart(2, '0')}</Mono>
                </div>
                <div className="pap-stencil" style={{ fontSize: 23, color: T.bone, marginTop: 4 }}>{w.name}</div>
                {w.summary && <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, marginTop: 9 }}>{w.summary}</p>}
                <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {w.type && <span className="pap-chip" style={{ cursor: 'default' }}>{w.type}</span>}
                  <span className="pap-chip" style={{ cursor: 'default' }}>{weaponGalleryItems(w, true).length + ' img'}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function WeaponDetail({ id, nav }) {
    const w = ZD.wonderWeapons.find((x) => x.id === id);
    if (!w) return <NotFound nav={nav} what="Wonder weapon" />;
    const originMap = w.mapId ? ZD.maps.find((m) => m.id === w.mapId) : null;
    const originGame = originMap ? ZD.games.find((g) => g.id === originMap.game) : null;
    const gamesIn = (w.gameIds || []).map((gid) => ZD.games.find((g) => g.id === gid)).filter(Boolean);
    const gallery = weaponGalleryItems(w, true);

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Wonder Weapons',to:{name:'weapons'}},{label:w.name}]}
          kicker={(w.type || 'Wonder Weapon') + (originGame ? ' - ' + originGame.code : '')}
          title={w.name}
          sub={w.type || w.map || ''}
          nav={nav}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.75fr', gap: 28, marginTop: 32, alignItems: 'start' }}>
          <WeaponImage weapon={w} height={440} label={w.name} loading="eager" showOverlay={false} />
          <aside className="pap-card" style={{ padding: 22 }}>
            <Mono color={T.e115} letter={2.5}>Weapon File</Mono>
            <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 8 }}>{w.name}</div>
            <div style={{ marginTop: 16 }}>
              <IntelRow label="Origin" value={w.map || 'Unconfirmed'} />
              <IntelRow label="Type" value={w.type || 'Wonder weapon'} />
              <IntelRow label="Introduced" value={w.introduced || 'Unknown'} />
              <IntelRow label="Images" value={String(gallery.length).padStart(2, '0')} tone="green" />
            </div>
            {originMap && (
              <button className="pap-btn pap-btn-primary" style={{ marginTop: 18, width: '100%' }} onClick={() => nav({ name: 'map', id: originMap.id })}>
                {'Open map file ->'}
              </button>
            )}
          </aside>
        </div>

        {gamesIn.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker="Appearances" title="Filed under" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {gamesIn.map((g) => (
                <button key={g.id} onClick={() => nav({ name: 'game', id: g.id })} className="pap-chip">
                  {g.code + ' - ' + g.title}
                </button>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section style={{ marginTop: 44 }}>
            <SectionHead kicker={gallery.length + ' image' + (gallery.length === 1 ? '' : 's')} title="Gallery" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {gallery.map((item) => (
                <WeaponImage key={item.file} weapon={w} file={item.file} label={item.label} height={220} showOverlay={false} objectFit="contain" />
              ))}
            </div>
          </section>
        )}

        {originMap && (
          <section style={{ marginTop: 44 }}>
            <SectionHead kicker="Origin site" title={originMap.name} />
            <div style={{ maxWidth: 420 }}>
              <MapCard map={originMap} nav={nav} />
            </div>
          </section>
        )}
      </div>
    );
  }

  function Perks({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Perks'}]}
          kicker="Perk Records"
          title="Perk-a-Cola"
          sub="Perk records with introduction map, gameplay effect, appearances, and machine images."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 32 }}>
          {ZD.perks.map((p) => (
            <button key={p.id} onClick={() => nav({ name: 'perk', id: p.id })} className="pap-card pap-card-clickable"
              style={{ padding: 0, color: T.bone, textAlign: 'left', overflow: 'hidden' }}>
              <PerkImage perk={p} height={170} label={p.name} />
              <div style={{ padding: 18 }}>
                <Mono color={T.e115}>{p.introduced || 'Perk-a-Cola'}</Mono>
                <div className="pap-stencil" style={{ fontSize: 20, color: T.bone, marginTop: 8 }}>{p.name}</div>
                {p.effect && <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, lineHeight: 1.5, marginTop: 7 }}>{p.effect}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function PerkDetail({ id, nav }) {
    const p = ZD.perks.find((x) => x.id === id);
    if (!p) return <NotFound nav={nav} what="Perk" />;
    const originMap = p.mapId ? ZD.maps.find((m) => m.id === p.mapId) : null;
    const originGame = originMap ? ZD.games.find((g) => g.id === originMap.game) : null;
    const gamesIn = (p.gameIds || []).map((gid) => ZD.games.find((g) => g.id === gid)).filter(Boolean);
    const gallery = perkGalleryItems(p, true);

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Perks',to:{name:'perks'}},{label:p.name}]}
          kicker={'Perk-a-Cola' + (originGame ? ' - ' + originGame.code : '')}
          title={p.name}
          sub={p.effect || p.introduced || ''}
          nav={nav}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 28, marginTop: 32, alignItems: 'start' }}>
          <PerkImage perk={p} height={420} label={p.name} loading="eager" showOverlay={false} />
          <aside className="pap-card" style={{ padding: 22 }}>
            <Mono color={T.e115} letter={2.5}>Machine File</Mono>
            <div className="pap-stencil" style={{ fontSize: 30, color: T.bone, marginTop: 8 }}>{p.name}</div>
            <div style={{ marginTop: 18 }}>
              <IntelRow label="Introduced" value={p.introduced || 'Unknown'} />
              <IntelRow label="Effect" value={p.effect || 'TBD'} />
              <IntelRow label="Images" value={String(gallery.length).padStart(2, '0')} tone="green" />
            </div>
            {originMap && (
              <button className="pap-btn pap-btn-primary" style={{ marginTop: 18, width: '100%' }} onClick={() => nav({ name: 'map', id: originMap.id })}>
                {'Open origin site ->'}
              </button>
            )}
          </aside>
        </div>

        {gamesIn.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker="Appearances" title="Filed under" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {gamesIn.map((g) => (
                <button key={g.id} onClick={() => nav({ name: 'game', id: g.id })} className="pap-chip">
                  {g.code + ' - ' + g.title}
                </button>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section style={{ marginTop: 44 }}>
            <SectionHead kicker={gallery.length + ' image' + (gallery.length === 1 ? '' : 's')} title="Gallery" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {gallery.map((item) => (
                <PerkImage key={item.file} perk={p} file={item.file} label={item.label} height={220} showOverlay={false} objectFit="contain" />
              ))}
            </div>
          </section>
        )}

        {originMap && (
          <section style={{ marginTop: 44 }}>
            <SectionHead kicker="First filed site" title={originMap.name} />
            <div style={{ maxWidth: 420 }}>
              <MapCard map={originMap} nav={nav} />
            </div>
          </section>
        )}
      </div>
    );
  }

  function Timeline({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Kronorium'}]}
          kicker="Lore-Bound Record"
          title="The Kronorium"
          sub={'The book of Aether events: entries copied from the Kronorium text file and arranged as an archive record.'}
          nav={nav}
        />
        <div className="pap-kronorium">
          {ZD.timeline.map((t, i) => (
            <article key={i} className={'pap-kronorium-entry ' + (i < 7 ? 'is-early' : 'is-late')}>
              <div className="pap-kronorium-marker" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="pap-kronorium-copy">
                <h2 className="pap-stencil pap-kronorium-heading-title">
                  <span className="pap-kronorium-year">{t.year}</span>
                  {t.title && (
                    <>
                      <span className="pap-kronorium-heading-sep">-</span>
                      <span className="pap-kronorium-title">{t.title}</span>
                    </>
                  )}
                </h2>
                <p className="pap-kronorium-body">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function Songs({ nav }) {
    // Build a flat list of every song across every map, grouped by game.
    const allSongs = songList();
    const byGame = ZD.games
      .map((g) => ({ game: g, songs: allSongs.filter((s) => s.gameId === g.id) }))
      .filter((row) => row.songs.length > 0);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Songs'}]}
          kicker={allSongs.length + ' catalogued track' + (allSongs.length === 1 ? '' : 's')}
          title="Hidden Songs"
          sub="Every hidden Easter egg song across all Zombies maps, with activation methods."
          nav={nav}
        />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 36 }}>
          {byGame.map(({ game, songs }) => (
            <section key={game.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${T.line}`, paddingBottom: 8, marginBottom: 14 }}>
                <div>
                  <Mono color={T.e115}>{game.code + ' · ' + game.year}</Mono>
                  <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, marginTop: 4 }}>{game.title}</div>
                </div>
                <button className="pap-link" onClick={() => nav({ name: 'game', id: game.id })}
                  style={{ fontFamily: T.e115Font, fontSize: 10.5, letterSpacing: 2, color: T.e115, textTransform: 'uppercase' }}>{'Open game →'}</button>
              </div>
              <SongTable songs={songs} nav={nav} />
            </section>
          ))}
        </div>
      </div>
    );
  }

  function SongDetail({ id, nav }) {
    const song = songList().find((s) => s.id === id);
    if (!song) return <NotFound nav={nav} what="Song" />;
    const map = ZD.maps.find((m) => m.id === song.mapId);
    const game = ZD.games.find((g) => g.id === song.gameId);
    const embedUrl = youtubeEmbedUrl(song.videoUrl);
    const activationShots = songActivationShots(song, map);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Songs',to:{name:'songs'}},{label:song.name}]}
          kicker={(game ? game.code + ' · ' + game.year : 'Song file') + ' · ' + song.mapName}
          title={song.name}
          sub={song.artist}
          nav={nav}
        />

        <section style={{ marginTop: 32 }}>
          <div className="pap-card" style={{ padding: 0, overflow: 'hidden' }}>
            {embedUrl ? (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: T.bg0 }}>
                <iframe
                  title={song.name + ' lyric video'}
                  src={embedUrl}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{ padding: 28 }}>
                <Mono color={T.e115}>{song.videoUrl ? 'YouTube embed unavailable in this context' : 'Official video link pending'}</Mono>
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.mute, lineHeight: 1.6, margin: '12px 0 0' }}>
                  {song.videoUrl
                    ? 'Embedded playback needs the site to be served from an HTTP or HTTPS address. Open this page from a local server or the deployed site, or use the YouTube link below.'
                    : 'No official YouTube link has been attached for this song yet.'}
                </p>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginTop: 34 }}>
          <div className="pap-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
              <div>
                <Mono color={T.e115}>Song Activation</Mono>
                <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>Find the triggers</div>
              </div>
              {map && (
                <button className="pap-link" onClick={() => nav({ name: 'map', id: map.id })}
                  style={{ fontFamily: T.e115Font, fontSize: 10.5, letterSpacing: 2, color: T.e115, textTransform: 'uppercase' }}>
                  Open map file
                </button>
              )}
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.bone, lineHeight: 1.65, margin: '0 0 22px' }}>{song.activation}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {activationShots.map((shot, i) => (
                <div key={i}>
                  {shot ? (
                    <EvidenceImage map={map} image={shot} height={170} label={shot.label || (song.name + ' activation ' + String(i + 1))} kind={'TRIGGER ' + String(i + 1)} tone="green" showOverlay={false} objectFit="contain" openFullSize />
                  ) : (
                    <Slot w="100%" h={170} label={'Trigger ' + String(i + 1)} kind="SCREENSHOT NEEDED" tone="yellow" />
                  )}
                  <Mono color={T.faint} style={{ display: 'block', marginTop: 8 }}>{shot && shot.label ? shot.label : ('Trigger ' + String(i + 1))}</Mono>
                </div>
              ))}
            </div>
          </div>
        </section>

        {map && (
          <section style={{ marginTop: 34 }}>
            <button className="pap-card pap-card-clickable" onClick={() => nav({ name: 'map', id: map.id })}
              style={{ width: '100%', padding: 22, textAlign: 'left', background: T.bg1, border: `1px solid ${T.line}`, cursor: 'pointer' }}>
              <Mono color={T.faint}>Map file</Mono>
              <div className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 8 }}>{map.name}</div>
            </button>
          </section>
        )}
      </div>
    );
  }

  function RelicsBO7({ nav, relicId }) {
    const relics = ZD.relics || [];
    const initialRelicId = relics.some((relic) => relic.id === relicId)
      ? relicId
      : ((relics[1] && relics[1].id) || (relics[0] && relics[0].id));
    const [selectedId, setSelectedId] = useState(initialRelicId);
    const selected = relics.find((relic) => relic.id === selectedId) || relics[0];
    const selectedIcon = relicIconImg(selected);
    const relicFileRef = React.useRef(null);
    useEffect(() => {
      if (relicId && relics.some((relic) => relic.id === relicId)) {
        setSelectedId(relicId);
      }
    }, [relicId, relics]);
    const selectRelic = useCallback((id) => {
      setSelectedId(id);
      if (nav) nav({ name: 'relics', id }, { keepScroll: true });
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (relicFileRef.current) {
            const y = relicFileRef.current.getBoundingClientRect().top + window.scrollY;
            const previewOffset = Math.min(Math.max(window.innerHeight * 0.48, 280), 560);
            window.scrollTo({ top: Math.max(0, y - previewOffset), behavior: 'smooth' });
          }
        });
      });
    }, [nav]);
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Crumbs parts={[{label:'Archive',to:{name:'home'}},{label:'Relics'}]} nav={nav} />
          <h1 className="pap-stencil" style={{ fontSize: 48, color: T.bone, margin: '12px 0 0' }}>Relics</h1>
        </div>

        <div>
          <RelicStage relics={relics} selected={selected} setSelectedId={selectRelic} />
        </div>

        {selected && (
          <section className="pap-relic-file-section" ref={relicFileRef} style={{ marginTop: 34, scrollMarginTop: 118 }}>
            <SectionHead
              kicker={selected.tier + ' relic file'}
              title={selected.name}
              sub={selected.effect}
            />
            <div className="pap-relic-selected-file">
              <div className="pap-relic-selected-portrait">
                {selectedIcon ? (
                  <img src={selectedIcon} alt={selected.name + ' relic icon'} loading="lazy" />
                ) : (
                  <span className="pap-relic-slot-placeholder" style={{ color: relicTierTone(selected.tier) }}>?</span>
                )}
              </div>
              <RelicCard relic={selected} defaultOpen />
            </div>
          </section>
        )}

        {false && (
          <React.Fragment>
        {bo7 && (
          <section style={{ marginTop: 34 }}>
            <button className="pap-card pap-card-clickable" onClick={() => nav({ name: 'game', id: bo7.id })}
              style={{ width: '100%', padding: 22, display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center', color: T.bone, textAlign: 'left' }}>
              <div>
                <Mono color={T.e115}>{bo7.code + ' · ' + bo7.year}</Mono>
                <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>{bo7.title}</div>
              </div>
              <Mono color={T.e115}>Open game file →</Mono>
            </button>
          </section>
        )}

        <section style={{ marginTop: 44 }}>
          <SectionHead
            kicker="Map files"
            title="Relic Walkthroughs"
            sub="Routes are grouped by recovery site. Trial wave and HVT notes are player-observed patterns and can vary between runs."
          />
        </section>

        {relicMaps.map((map) => {
          const mapRelics = relicList(map.id);
          return (
            <section key={map.id} style={{ marginTop: 30 }}>
              <SectionHead
                kicker={mapRelics.length + ' relic' + (mapRelics.length === 1 ? '' : 's') + ' recovered'}
                title={map.name}
                action={<button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }} onClick={() => nav({ name: 'map', id: map.id })}>Map file →</button>}
              />
              <RelicGrid relics={mapRelics} />
            </section>
          );
        })}
          </React.Fragment>
        )}
      </div>
    );
  }

  function Lore({ nav }) {
    const articles = [
      ['origin-cycle','The Origin Cycle','The Primis time loop and how it ended.','From Origins through Revelations and Tag der Toten.'],
      ['sentinel','The Sentinel Artifact','The artifact that connects Cold War to BO6.','Its journey from Forsaken through Terminus.'],
      ['order','The Order','The ancient faction behind the BO6 storyline.','Their connection to Element 115 and the Templar relics.'],
      ['mpd','Samantha and the MPD','Samantha Maxis and the Moon Pyramid Device.','How she became the controller of the zombie hordes.'],
      ['115','Element 115','The element that powers everything in Zombies.','Meteor origins, Wonder Weapons, and dimensional breaches.'],
      ['groups','Group 935 & Division 9','The research organizations behind the outbreak.','Their experiments, facilities, and key personnel.'],
    ];
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Lore'}]}
          kicker="Long-form readings"
          title="Lore"
          sub="Deep dives into the major storylines, factions, and artifacts of the Zombies universe."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 32 }}>
          {articles.map(([id, title, kicker, sub]) => (
            <button key={id} onClick={() => nav({ name: 'lore', id })} className="pap-card pap-card-clickable"
              style={{ padding: 24, color: T.bone, textAlign: 'left' }}>
              <Mono color={T.e115}>{kicker}</Mono>
              <div className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 8 }}>{title}</div>
              <div style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute, marginTop: 8 }}>{sub}</div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${T.line}`, display: 'flex', justifyContent: 'space-between' }}>
                <Mono color={T.faint}>Annot. Requiem</Mono>
                <Mono color={T.e115}>{'Read →'}</Mono>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function LoreArticle({ id, nav }) {
    const articles = {
      'origin-cycle': {
        title: 'On the Origin Cycle',
        kicker: 'Cycle analysis',
        pull: 'The Primis crew relived the same events across multiple timelines until the cycle was finally broken in Tag der Toten.',
        sections: [
          ['Origins — Where It Started', 'In 1918, four soldiers at Excavation Site 64 encounter Element 115 and Dr. Maxis. They forge the Elemental Staffs and are pulled into a time loop. These are the original versions of Dempsey, Nikolai, Takeo, and Richtofen that become known as Primis.'],
          ['The Multiverse and the Souls', 'Across Black Ops III, Primis travels to Der Eisendrache, Zetsubou No Shima, Gorod Krovi, and Revelations to collect the souls of their Ultimis counterparts and deliver them to the House. Dr. Monty oversees the process from the Aether.'],
          ['Breaking the Cycle', 'In Tag der Toten, Nikolai realizes the only way to end the cycle is to use the Agarthan Device to erase the Aether entirely. Primis and Ultimis fade from existence, and the Dark Aether storyline begins in the timeline left behind.'],
        ],
      },
    };
    const a = articles[id];
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Lore',to:{name:'lore'}},{label: a ? a.title : 'Article'}]}
          kicker={a ? a.kicker : 'Awaiting Sync'}
          title={a ? a.title : 'Article pending'}
          nav={nav}
        />
        {!a ? (
          <div style={{ marginTop: 32 }}><ComingSoon what="Full article" /></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 48, marginTop: 36 }}>
            <article style={{ fontFamily: T.sans, fontSize: 17.5, lineHeight: 1.75, color: T.bone, maxWidth: 720 }}>
              <div style={{ fontFamily: T.display, fontWeight: 600, fontSize: 26, color: T.bone, borderLeft: `3px solid ${T.e115}`, paddingLeft: 22, margin: '0 0 32px' }}>
                {'"' + a.pull + '"'}
              </div>
              {a.sections.map(([h, body]) => (
                <div key={h}>
                  <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>{h}</h3>
                  <p style={{ margin: 0 }}>{body}</p>
                </div>
              ))}
            </article>
            <aside>
              <div style={{ position: 'sticky', top: 70 }}>
                <Mono color={T.e115}>On this page</Mono>
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${T.line}`, marginTop: 12 }}>
                  {a.sections.map(([h], i) => (
                    <div key={i} style={{ padding: '8px 14px', fontFamily: T.sans, fontSize: 13.5, color: i === 0 ? T.bone : T.mute, borderLeft: i === 0 ? `2px solid ${T.e115}` : '2px solid transparent', marginLeft: -1 }}>{h}</div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    );
  }

  function Search({ query, nav }) {
    const q = (query || '').toLowerCase().trim();
    const hits = useMemo(() => {
      if (!q) return [];
      const out = [];
      ZD.maps.forEach((m) => {
        if (m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q) || (m.tags || []).some((t) => t.includes(q)))
          out.push({ kind: 'map', id: m.id, title: m.name, sub: m.location });
      });
      ZD.games.forEach((g) => {
        if (g.title.toLowerCase().includes(q) || g.code.toLowerCase().includes(q))
          out.push({ kind: 'game', id: g.id, title: g.title, sub: g.code + ' · ' + g.year });
      });
      ZD.characters.forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
          out.push({ kind: 'character', id: c.id, title: c.name, sub: c.role });
      });
      ZD.wonderWeapons.forEach((w) => {
        if (w.name.toLowerCase().includes(q) || w.summary.toLowerCase().includes(q) || (w.map || '').toLowerCase().includes(q) || (w.type || '').toLowerCase().includes(q))
          out.push({ kind: 'weapon', id: w.id, title: w.name, sub: w.type || w.map || '' });
      });
      ZD.perks.forEach((p) => {
        if (p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || (p.effect || '').toLowerCase().includes(q))
          out.push({ kind: 'perk', id: p.id, title: p.name, sub: p.effect || p.introduced || '' });
      });
      return out;
    }, [q]);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Search'}]}
          kicker={hits.length + ' result' + (hits.length === 1 ? '' : 's')}
          title={q ? ('"' + query + '"') : 'Search the archive'}
          sub={q ? 'Matches across maps, games, crew, wonder weapons, and perks.' : 'Type in the bar at top, then hit Enter.'}
          nav={nav}
        />
        {!q && (
          <div style={{ marginTop: 32, padding: 22, background: T.bg1, border: `1px solid ${T.line}` }}>
            <Mono color={T.mute}>Try: kino, primis, ray gun, jugg, citadelle, dark aether</Mono>
          </div>
        )}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' }}>
          {hits.map((h, i) => {
            const route = h.kind === 'map' ? { name: 'map', id: h.id }
                       : h.kind === 'game' ? { name: 'game', id: h.id }
                       : h.kind === 'character' ? { name: 'character', id: h.id }
                       : h.kind === 'weapon' ? { name: 'weapon', id: h.id }
                       : h.kind === 'perk' ? { name: 'perk', id: h.id }
                       : { name: 'home' };
            return (
              <button key={i} onClick={() => nav(route)} className="pap-row"
                style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 22, alignItems: 'center',
                  background: 'transparent', border: 0, borderBottom: `1px solid ${T.line}`, padding: '16px 6px',
                  cursor: 'pointer', color: T.bone, textAlign: 'left' }}>
                <Mono color={T.e115} letter={2}>{h.kind}</Mono>
                <div>
                  <div className="pap-stencil" style={{ fontSize: 20, color: T.bone }}>{h.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, marginTop: 3 }}>{h.sub}</div>
                </div>
                <span style={{ color: T.e115, fontFamily: T.mono, fontSize: 14 }}>{'›'}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function About({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'About'}]}
          kicker="Field Manual"
          title="About the Archive"
          sub="What is filed here, what is still redacted, and how to read the archive."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, marginTop: 32 }}>
          <article style={{ fontFamily: T.sans, fontSize: 16.5, lineHeight: 1.7, color: T.bone }}>
            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 0, marginBottom: 12 }}>What this is</h3>
            <p>{'group935.net is a fan-built field archive for Treyarch Zombies: map dossiers, image galleries, crew files, weapons, perks, songs, relic notes, and the larger story tying it all together.'}</p>
            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>Archive format</h3>
            <p>{'The site now uses the Field dossier view everywhere: readable map files, crew records, galleries, lore notes, and reference pages without a second display mode to manage.'}</p>
            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>What this is not</h3>
            <p>Not affiliated with Activision, Treyarch, or any other rights holder. The analysis and dossier copy are original fan writing. Character quote callouts are only shown when the line is verified.</p>
          </article>
          <aside>
            <div style={{ padding: 22, background: T.bg1, border: `1px solid ${T.line}`, position: 'sticky', top: 70 }}>
              <Mono color={T.e115}>Quick links</Mono>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, gap: 2 }}>
                {[['Browse all maps','maps'],['Read the Kronorium','timeline'],['Meet the crew','characters'],['Perk reference','perks'],['Wonder weapons','weapons']].map(([l, p]) => (
                  <button key={p} onClick={() => nav({ name: p })} className="pap-link"
                    style={{ fontFamily: T.display, fontSize: 15, fontWeight: 500, color: T.bone, textAlign: 'left', padding: '6px 0', borderBottom: `1px solid ${T.line}`, textTransform: 'uppercase' }}>{l + ' →'}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  function NotFound({ nav, what }) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <Stamp tone="red">Record Not Found</Stamp>
        <div className="pap-stencil" style={{ fontSize: 80, color: T.bone, marginTop: 22 }}>404</div>
        <p style={{ fontFamily: T.sans, fontSize: 16, color: T.mute, marginTop: 12, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
          {'That ' + (what || 'page') + ' is not in the archive — or it’s been redacted since you last checked.'}
        </p>
        <button className="pap-btn pap-btn-primary" style={{ marginTop: 22 }} onClick={() => nav({ name: 'home' })}>{'Return to archive →'}</button>
      </div>
    );
  }

  function PageHead({ crumbs, kicker, title, sub, nav, divider = 'shelf115', titleNoWrap = false }) {
    return (
      <div>
        <Crumbs parts={crumbs} nav={nav} />
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div className={titleNoWrap ? 'pap-page-head-title-wrap' : ''} style={{ maxWidth: titleNoWrap ? 'none' : 900 }}>
            {kicker && <Mono color={T.e115} size={11} letter={2.5}>{kicker}</Mono>}
            <h1 className={'pap-stencil' + (titleNoWrap ? ' pap-page-title-nowrap' : '')} style={{ fontSize: 72, color: T.bone, margin: '12px 0 0' }}>{title}</h1>
            {sub && <p style={{ fontFamily: T.sans, fontSize: 17, color: T.mute, marginTop: 14, lineHeight: 1.55, maxWidth: 760 }}>{sub}</p>}
          </div>
        </div>
        {divider === 'shelf115' ? (
          <Shelf115Line height={23} style={{ marginTop: 28 }} />
        ) : (
          <HazardStripe height={3} style={{ marginTop: 28, opacity: 0.7 }} />
        )}
      </div>
    );
  }

  function parseHash(hash) {
    if (!hash || hash === '#' || hash === '#/') return { name: 'home' };
    const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    return { name: parts[0] || 'home', id: parts[1] };
  }
  function buildHash(r) {
    if (!r || r.name === 'home') return '#/';
    let h = '#/' + r.name;
    if (r.id) h += '/' + r.id;
    return h;
  }
  function parseRoutePath(pathname) {
    const path = String(pathname || '/').replace(/\/index\.html$/i, '/');
    const parts = path.split('/').filter(Boolean).map((part) => decodeURIComponent(part));
    if (!parts.length) return { name: 'home' };
    const top = parts[0];
    const id = parts[1];
    const topicRoutes = ['zombies-easter-eggs', 'zombies-easter-egg-tutorials', 'cod-zombies', 'black-ops-zombies', 'treyarch-zombies'];
    if (top === 'call-of-duty-zombies') return { name: 'cod-zombies' };
    if (topicRoutes.includes(top)) return { name: top };
    if (top === 'games') return id ? { name: 'game', id } : { name: 'games' };
    if (top === 'maps') return id ? { name: 'map', id } : { name: 'maps' };
    if (top === 'relics' || top === 'black-ops-7-relics' || top === 'bo7-relics') return id ? { name: 'relics', id } : { name: 'relics' };
    if (top === 'characters') return id ? { name: 'character', id } : { name: 'characters' };
    if (top === 'weapons' || top === 'wonder-weapons') return id ? { name: 'weapon', id } : { name: 'weapons' };
    if (top === 'perks') return id ? { name: 'perk', id } : { name: 'perks' };
    if (top === 'songs') return id ? { name: 'song', id } : { name: 'songs' };
    if (top === 'easter-eggs') return id ? { name: 'ee', id } : { name: 'maps' };
    if (top === 'lore') return id ? { name: 'lore', id } : { name: 'lore' };
    if (top === 'timeline' || top === 'kronorium') return { name: 'timeline' };
    if (top === 'about') return { name: 'about' };
    if (top === 'search') return { name: 'search' };
    if (top === 'vote') return { name: 'vote' };
    if (top === 'vote-weapons') return { name: 'vote-weapons' };
    if (top === 'vote-perks') return { name: 'vote-perks' };
    if (top === 'vote-characters') return { name: 'vote-characters' };
    if (top === 'vote-ranking') return { name: 'vote-ranking', id };
    return { name: top || 'home', id };
  }
  function parseCurrentRoute() {
    if (window.location.hash && /^#\/?/.test(window.location.hash)) return parseHash(window.location.hash);
    if (window.G935_ROUTE_PATH) return parseRoutePath(window.G935_ROUTE_PATH);
    if (window.location.protocol === 'file:') return { name: 'home' };
    return parseRoutePath(window.location.pathname);
  }
  function buildRoutePath(r) {
    if (!r || r.name === 'home') return '/';
    const id = r.id ? '/' + encodeURIComponent(r.id) : '';
    switch (r.name) {
      case 'games': return '/games';
      case 'game': return '/games' + id;
      case 'maps': return '/maps';
      case 'map': return '/maps' + id;
      case 'relics': return '/black-ops-7-relics' + id;
      case 'characters': return '/characters';
      case 'character': return '/characters' + id;
      case 'weapons': return '/wonder-weapons';
      case 'weapon': return '/wonder-weapons' + id;
      case 'perks': return '/perks' + id;
      case 'perk': return '/perks' + id;
      case 'timeline': return '/timeline';
      case 'songs': return '/songs';
      case 'song': return '/songs' + id;
      case 'ee': return '/easter-eggs' + id;
      case 'lore': return '/lore' + id;
      case 'about': return '/about';
      case 'search': return '/search';
      case 'vote': return '/vote';
      case 'vote-weapons': return '/vote-weapons';
      case 'vote-perks': return '/vote-perks';
      case 'vote-characters': return '/vote-characters';
      case 'vote-ranking': return '/vote-ranking' + id;
      default: return '/' + encodeURIComponent(r.name) + id;
    }
  }
  window.__papParseHash = parseHash;
  window.__papBuildHash = buildHash;
  window.__papParseCurrentRoute = parseCurrentRoute;
  window.__papBuildRoutePath = buildRoutePath;

  const SEO_SITE_URL = 'https://group935.net';
  const SEO_DEFAULT_TITLE = 'Group935.net | Zombies Easter Eggs, Black Ops 7 Relic Tutorials';
  const SEO_DEFAULT_DESCRIPTION = 'Group935.net is a Treyarch Zombies archive with Black Ops 7 relic tutorials, map Easter egg walkthroughs, wonder weapons, perks, songs, characters, and lore.';
  function seoPublicRoutePath(route) {
    const path = buildRoutePath(route || { name: 'home' });
    return path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
  }
  function seoRouteUrl(route) {
    return SEO_SITE_URL + seoPublicRoutePath(route);
  }
  function seoGameTitle(gameId) {
    const game = ZD.games.find((g) => g.id === gameId);
    return game ? game.title : 'Treyarch Zombies';
  }
  function seoMapName(mapId) {
    const map = ZD.maps.find((m) => m.id === mapId);
    return map ? map.name : 'Black Ops 7';
  }
  function seoFindEasterEgg(id) {
    return (ZD.bo7EasterEggs || []).concat(ZD.classicEasterEggs || []).find((ee) => ee.id === id);
  }
  function seoRelicLabel(relic) {
    if (!relic || !relic.name) return 'Black Ops 7 Relic';
    return /\brelic$/i.test(relic.name) ? relic.name : relic.name + ' Relic';
  }
  function seoTopicForRoute(name) {
    const allEasterEggs = (ZD.bo7EasterEggs || []).concat(ZD.classicEasterEggs || []);
    const topic = {
      'zombies-easter-eggs': {
        title: 'Zombies Easter Eggs | Main Quest Guides and Story Archives | Group 935',
        description: 'Browse Zombies Easter eggs, main quest guides, map tutorials, rewards, requirements, and story archives for Treyarch and Black Ops Zombies.',
        listName: 'Zombies Easter Eggs',
        items: allEasterEggs.map((ee, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: ee.title,
          url: seoRouteUrl({ name: 'ee', id: ee.id }),
        })),
      },
      'zombies-easter-egg-tutorials': {
        title: 'Zombies Easter Egg Tutorials | Main Quest Walkthroughs | Group 935',
        description: 'Step-by-step Zombies Easter egg tutorials with setup requirements, main quest walkthroughs, reward notes, boss prep, and map links.',
        listName: 'Zombies Easter Egg Tutorials',
        items: allEasterEggs.map((ee, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: ee.title,
          url: seoRouteUrl({ name: 'ee', id: ee.id }),
        })),
      },
      'cod-zombies': {
        title: 'Call of Duty Zombies Guides | Easter Eggs, Maps, Relics | Group 935',
        description: 'COD Zombies guides for Easter eggs, Black Ops Zombies maps, BO7 relics, wonder weapons, perks, songs, characters, and lore.',
        listName: 'Call of Duty Zombies Maps',
        items: (ZD.maps || []).map((map, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: map.name,
          url: seoRouteUrl({ name: 'map', id: map.id }),
        })),
      },
      'black-ops-zombies': {
        title: 'Black Ops Zombies Guides | Treyarch Maps, Easter Eggs, Relics | Group 935',
        description: 'Black Ops Zombies guides for Treyarch maps, Easter eggs, BO7 relic tutorials, perks, wonder weapons, songs, crews, and story files.',
        listName: 'Black Ops Zombies Guides',
        items: (ZD.maps || []).filter((map) => /^bo|^cw$/.test(map.game)).map((map, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: map.name,
          url: seoRouteUrl({ name: 'map', id: map.id }),
        })),
      },
      'treyarch-zombies': {
        title: 'Treyarch Zombies Archive | Maps, Easter Eggs, Relics | Group 935',
        description: 'Treyarch Zombies archive with map guides, Easter egg tutorials, Black Ops Zombies lore, BO7 relics, wonder weapons, perks, and songs.',
        listName: 'Treyarch Zombies Archive',
        items: (ZD.maps || []).map((map, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: map.name,
          url: seoRouteUrl({ name: 'map', id: map.id }),
        })),
      },
    }[name];
    if (!topic) return null;
    const route = { name };
    const url = seoRouteUrl(route);
    return {
      title: topic.title,
      description: topic.description,
      url,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: topic.listName,
        url,
        itemListElement: topic.items.slice(0, 30),
      },
    };
  }
  function seoDescription(text, fallback) {
    const clean = String(text || fallback || SEO_DEFAULT_DESCRIPTION).replace(/\s+/g, ' ').trim();
    return clean.length > 158 ? clean.slice(0, 155).replace(/\s+\S*$/, '') + '...' : clean;
  }
  function seoForRoute(route) {
    const r = route || { name: 'home' };
    const topicSeo = seoTopicForRoute(r.name);
    if (topicSeo) return topicSeo;
    if (r.name === 'relics') {
      const relic = r.id ? (ZD.relics || []).find((item) => item.id === r.id) : null;
      if (relic) {
        const mapName = seoMapName(relic.map);
        const relicLabel = seoRelicLabel(relic);
        return {
          title: relicLabel + ' Tutorial | Black Ops 7 Zombies | Group 935',
          description: seoDescription(relicLabel + ' Black Ops 7 Zombies guide for ' + mapName + ' with effect, unlock requirements, portal location, trial rules, save note, and prep tips.', relicLabel + ' tutorial for Black Ops 7 Zombies on ' + mapName + ', including the effect, unlock requirements, portal, trial, save note, and prep tips.'),
          url: seoRouteUrl(r),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: relicLabel + ' Tutorial',
            description: relic.effect,
            mainEntityOfPage: seoRouteUrl(r),
            about: ['Black Ops 7 Zombies', mapName, relicLabel],
            inLanguage: 'en-US',
          },
        };
      }
      return {
        title: 'Black Ops 7 Relics Guide | Effects, Unlocks, Trials | Group 935',
        description: 'All Black Ops 7 Zombies relics with effects, unlock steps, portal locations, trial rules, save safety, map, tier, and prep notes.',
        url: seoRouteUrl(r),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Black Ops 7 relic tutorials',
          url: seoRouteUrl(r),
          itemListElement: (ZD.relics || []).map((relic, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: seoRelicLabel(relic),
            url: seoRouteUrl({ name: 'relics', id: relic.id }),
          })),
        },
      };
    }
    if (r.name === 'game') {
      const game = ZD.games.find((g) => g.id === r.id);
      if (game) {
        return {
          title: game.title + ' Zombies Maps, Easter Eggs | Group 935',
          description: seoDescription(game.description, game.title + ' Zombies maps, Easter eggs, relics, wonder weapons, perks, songs, characters, and story files in the Group 935 archive.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'map') {
      const map = ZD.maps.find((m) => m.id === r.id);
      if (map) {
        const gameTitle = seoGameTitle(map.game);
        return {
          title: map.name + ' Zombies Easter Egg Guide | Group 935',
          description: seoDescription(map.summary, map.name + ' guide for ' + gameTitle + ' Zombies, including Easter egg notes, relics, map location, image gallery, songs, and archive details.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'ee') {
      const ee = seoFindEasterEgg(r.id);
      if (ee) {
        return {
          title: ee.title + ' Easter Egg Walkthrough | Group 935',
          description: seoDescription(ee.summary, ee.title + ' Zombies Easter egg walkthrough with map steps, setup notes, reward details, and Group 935 archive context.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'characters') {
      return {
        title: 'Zombies Characters and Crews | Group 935',
        description: 'Browse Treyarch Zombies characters, crews, operatives, Group 935 personnel, Requiem files, and story connections.',
        url: seoRouteUrl(r),
      };
    }
    if (r.name === 'character') {
      const character = ZD.characters.find((c) => c.id === r.id);
      if (character) {
        return {
          title: character.name + ' Zombies Character File | Group 935',
          description: seoDescription(character.summary, character.name + ' character file with role, origin, crew details, and Treyarch Zombies lore context.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'weapons') {
      return {
        title: 'Zombies Wonder Weapons | Group 935',
        description: 'Browse Treyarch Zombies wonder weapons, map appearances, upgrades, images, and archive notes.',
        url: seoRouteUrl(r),
      };
    }
    if (r.name === 'weapon') {
      const weapon = ZD.wonderWeapons.find((w) => w.id === r.id);
      if (weapon) {
        return {
          title: weapon.name + ' Wonder Weapon | Group 935',
          description: seoDescription(weapon.summary, weapon.name + ' wonder weapon guide with map appearances, archive notes, and Treyarch Zombies context.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'perks') {
      return {
        title: 'Zombies Perks Reference | Group 935',
        description: 'Browse Treyarch Zombies perks, machines, effects, Black Ops 7 variants, images, and archive notes.',
        url: seoRouteUrl(r),
      };
    }
    if (r.name === 'perk') {
      const perk = ZD.perks.find((p) => p.id === r.id);
      if (perk) {
        return {
          title: perk.name + ' Zombies Perk | Group 935',
          description: seoDescription(perk.summary, perk.name + ' Zombies perk reference with effects, machines, images, and archive notes.'),
          url: seoRouteUrl(r),
        };
      }
    }
    if (r.name === 'maps') {
      return {
        title: 'Zombies Map Easter Egg Guides | Group 935',
        description: 'Browse Treyarch Zombies maps with Easter egg counts, relic counts, map locations, image galleries, songs, and archive notes.',
        url: seoRouteUrl(r),
      };
    }
    if (r.name === 'timeline') {
      return {
        title: 'Kronorium Zombies Timeline | Group 935',
        description: 'Read the Group 935 Zombies timeline and Kronorium archive covering Aether, Dark Aether, crews, maps, and story events.',
        url: seoRouteUrl(r),
      };
    }
    return {
      title: SEO_DEFAULT_TITLE,
      description: SEO_DEFAULT_DESCRIPTION,
      url: SEO_SITE_URL + '/',
    };
  }
  function seoSetMeta(selector, attrs) {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      document.head.appendChild(tag);
    }
    Object.keys(attrs).forEach((key) => tag.setAttribute(key, attrs[key]));
  }
  function seoSetCanonical(url) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
  function seoSetRouteJsonLd(data) {
    const id = 'pap-route-jsonld';
    let tag = document.getElementById(id);
    if (!data) {
      if (tag) tag.remove();
      return;
    }
    if (!tag) {
      tag = document.createElement('script');
      tag.id = id;
      tag.type = 'application/ld+json';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(data);
  }
  function seoApplyRoute(route) {
    const seo = seoForRoute(route);
    document.title = seo.title;
    seoSetMeta('meta[name="description"]', { name: 'description', content: seo.description });
    seoSetMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    seoSetMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    seoSetMeta('meta[property="og:url"]', { property: 'og:url', content: seo.url });
    seoSetMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    seoSetMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    seoSetCanonical(seo.url);
    seoSetRouteJsonLd(seo.jsonLd);
  }
  function analyticsTrackPageView(route) {
    if (!window.G935_ANALYTICS_ENABLED || typeof window.gtag !== 'function') return;
    const seo = seoForRoute(route);
    let path = '/';
    try {
      path = new URL(seo.url).pathname;
    } catch (err) {
      path = buildRoutePath(route);
    }
    window.gtag('event', 'page_view', {
      page_title: seo.title,
      page_location: seo.url,
      page_path: path,
    });
  }
  window.G935_TRACK_EVENT = function (name, params) {
    if (!window.G935_ANALYTICS_ENABLED || typeof window.gtag !== 'function' || !name) return;
    window.gtag('event', name, params || {});
  };

  function PackAPunch() {
    const [route, setRouteState] = useState(() => parseCurrentRoute());
    const [query, setQuery] = useState('');
    useEffect(() => {
      seoApplyRoute(route);
      analyticsTrackPageView(route);
    }, [route.name, route.id]);
    useEffect(() => {
      const onRoute = () => setRouteState(parseCurrentRoute());
      window.addEventListener('popstate', onRoute);
      window.addEventListener('hashchange', onRoute);
      return () => {
        window.removeEventListener('popstate', onRoute);
        window.removeEventListener('hashchange', onRoute);
      };
    }, []);
    const nav = useCallback((r, options = {}) => {
      if (window.location.protocol === 'file:') {
        const h = buildHash(r);
        if (window.location.hash !== h) window.location.hash = h;
        setRouteState(parseHash(h));
        if (!options.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const path = buildRoutePath(r);
      if (window.location.pathname + window.location.search + window.location.hash !== path) {
        window.history.pushState({}, '', path);
      }
      setRouteState(parseRoutePath(path));
      if (!options.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);
    let page;
    switch (route.name) {
      case 'games':      page = <Games nav={nav} />; break;
      case 'game':       page = <Game id={route.id} nav={nav} />; break;
      case 'maps':       page = <Maps nav={nav} />; break;
      case 'zombies-easter-eggs':
      case 'zombies-easter-egg-tutorials':
        page = <Maps nav={nav} />; break;
      case 'cod-zombies':
      case 'black-ops-zombies':
      case 'treyarch-zombies':
        page = <Games nav={nav} />; break;
      case 'vote':       page = <FavoriteMapVote nav={nav} />; break;
      case 'vote-weapons': page = <VotePage key="weapons" nav={nav} pollId="weapons" />; break;
      case 'vote-perks': page = <VotePage key="perks" nav={nav} pollId="perks" />; break;
      case 'vote-characters': page = <VotePage key="characters" nav={nav} pollId="characters" />; break;
      case 'vote-ranking': page = <VoteRankingPage key={'ranking-' + (route.id || 'maps')} nav={nav} pollId={route.id || 'maps'} />; break;
      case 'map':        page = <MapDetail id={route.id} nav={nav} />; break;
      case 'ee':         page = <EEPage id={route.id} nav={nav} />; break;
      case 'characters': page = <Characters nav={nav} />; break;
      case 'character':  page = <CharacterDetail id={route.id} nav={nav} />; break;
      case 'weapons':    page = <WonderWeapons nav={nav} />; break;
      case 'weapon':     page = <WeaponDetail id={route.id} nav={nav} />; break;
      case 'perks':      page = <Perks nav={nav} />; break;
      case 'perk':       page = <PerkDetail id={route.id} nav={nav} />; break;
      case 'timeline':   page = <Timeline nav={nav} />; break;
      case 'songs':      page = <Songs nav={nav} />; break;
      case 'song':       page = <SongDetail id={route.id} nav={nav} />; break;
      case 'relics':     page = <RelicsBO7 nav={nav} relicId={route.id} />; break;
      case 'lore':       page = route.id ? <LoreArticle id={route.id} nav={nav} /> : <Lore nav={nav} />; break;
      case 'search':     page = <Search query={query} nav={nav} />; break;
      case 'about':      page = <About nav={nav} />; break;
      case 'home':       page = <Home nav={nav} />; break;
      default:           page = <NotFound nav={nav} />;
    }
    return (
      <Shell route={route} nav={nav} query={query} setQuery={setQuery}>
        {page}
      </Shell>
    );
  }

  window.PackAPunch = PackAPunch;
})();

(function () {
  const { useState, useMemo, useEffect, useCallback } = React;
  const ZD = window.ZD;
  const parseHash = window.__papParseHash;
  const buildHash = window.__papBuildHash;
  const IMG_BASE = window.G935_ASSET_BASE || './Images';
  function termMapImg(map, file) { return map && map.media && file ? (IMG_BASE + '/Games/' + map.media.dir + '/' + file) : null; }
  function termMapPrimaryFile(map, slot = 'hero') {
    const media = map && map.media;
    if (!media) return null;
    if (slot === 'thumb') return media.thumb || media.hero || (media.gallery && media.gallery[0]) || null;
    return media.hero || media.thumb || (media.gallery && media.gallery[0]) || null;
  }
  function termMapGalleryItems(map) {
    const media = map && map.media;
    if (!media || !media.gallery || !media.gallery.length) return [];
    return media.gallery.map((file, i) => ({ file, label: ((map && map.name) || 'Gallery image') + ' image ' + String(i + 1) }));
  }

  const C = {
    bg:     '#0a0a08',
    bgSoft: '#13130f',
    ink:    '#d8d2bc',
    dim:    '#7a755f',
    bright: '#fff4d2',
    line:   '#3a382c',
    lineHi: '#6a6650',
    mono:   '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    pixel:  '"VT323", "JetBrains Mono", monospace',
  };

  if (typeof document !== 'undefined' && !document.getElementById('term-styles')) {
    const s = document.createElement('style');
    s.id = 'term-styles';
    s.textContent = `
      @keyframes term-blink { 50% { opacity: 0; } }
      .term-link { color: ${C.ink}; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: transparent; border: 0; padding: 0; font: inherit; }
      .term-link:hover { background: ${C.ink}; color: ${C.bg}; text-decoration: none; padding: 0 2px; }
      .term-card { background: ${C.bgSoft}; border: 1px solid ${C.line}; transition: border-color .1s; }
      .term-card:hover { border-color: ${C.bright}; }
      .term-row { transition: background .08s; }
      .term-row:hover { background: rgba(216, 210, 188, 0.06); }
      .term-btn { background: transparent; color: ${C.ink}; border: 1px solid ${C.line}; font: inherit; cursor: pointer; padding: 4px 12px; }
      .term-btn:hover { background: ${C.ink}; color: ${C.bg}; border-color: ${C.ink}; }
      .term-btn.active { background: ${C.ink}; color: ${C.bg}; border-color: ${C.ink}; }
    `;
    document.head.appendChild(s);
  }

  const Cursor = () => (
    <span style={{ display: 'inline-block', width: '0.55em', height: '1em', background: C.ink, verticalAlign: '-2px', marginLeft: 2, animation: 'term-blink 1.05s steps(2) infinite' }} />
  );
  const Prompt = ({ cmd, sub }) => (
    <div style={{ margin: '0 0 12px' }}>
      <div><span style={{ color: C.dim }}>{'$ aether:~> '}</span><span style={{ color: C.bright }}>{cmd}</span></div>
      {sub && <div style={{ color: C.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
  const Slot = ({ w, h, label, kind = 'photo', style }) => (
    <div style={{
      width: w, height: h, position: 'relative', background: C.bg,
      border: `1px solid ${C.lineHi}`, color: C.dim, fontFamily: C.mono,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 7px, rgba(216,210,188,0.035) 7px 8px)',
      ...style,
    }}>
      <div style={{ fontFamily: C.pixel, fontSize: 32, opacity: 0.6, letterSpacing: -1 }}>{'×××'}</div>
      <div style={{ fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
      <div style={{ fontSize: 9.5, letterSpacing: 1.5, marginTop: 4, opacity: 0.6 }}>{'[' + kind + ' — awaiting upload]'}</div>
      <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>NO-SIG</div>
      <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>{'REC ●'}</div>
    </div>
  );
  const HRule = ({ ch = '─', cols = 200, color = C.dim }) => (
    <div style={{ color, userSelect: 'none', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', opacity: 0.6 }}>{ch.repeat(cols)}</div>
  );
  function MapImage({ map, file, label, kind = 'surveillance', h = 150, style, showOverlay = true }) {
    const [failed, setFailed] = useState(false);
    const src = !failed ? termMapImg(map, file || termMapPrimaryFile(map)) : null;
    const title = label || (map && map.name) || 'image';
    if (!src) return <Slot w="100%" h={h} label={title} kind={kind} style={style} />;
    return (
      <div style={{ width: '100%', height: h, position: 'relative', overflow: 'hidden', background: C.bg, border: `1px solid ${C.lineHi}`, ...style }}>
        <img src={src} alt={title} loading="lazy" onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: (map.media && map.media.objectPosition) || 'center center', filter: 'grayscale(0.35) contrast(1.08)' }} />
        {showOverlay && <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(10,10,8,0.18) 0 1px, transparent 1px 4px), linear-gradient(180deg, rgba(10,10,8,0.05), rgba(10,10,8,0.7))', pointerEvents: 'none' }} />}
        {showOverlay && <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, letterSpacing: 1.5, color: C.bright, background: 'rgba(10,10,8,0.55)', padding: '1px 6px', textTransform: 'uppercase' }}>{kind}</div>}
        {showOverlay && (
          <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ fontFamily: C.pixel, fontSize: Math.min(typeof h === 'number' ? h * 0.16 : 24, 28), color: C.bright, lineHeight: 1, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{title}</div>
            <div style={{ fontSize: 9, letterSpacing: 1.5, color: C.dim, whiteSpace: 'nowrap' }}>IMG-SIG</div>
          </div>
        )}
      </div>
    );
  }
  const Link = ({ onClick, children, style }) => (
    <button className="term-link" onClick={onClick} style={style}>{children}</button>
  );

  function Shell({ route, setRoute, query, setQuery, children }) {
    const nav = [
      ['home','home'], ['games','games'], ['maps','sites'],
      ['characters','subjects'], ['lore','memos'], ['timeline','kronorium'], ['relics','relics'],
    ];
    return (
      <div className="term-shell" style={{ background: C.bg, color: C.ink, fontFamily: C.mono, minHeight: '100%', fontSize: 14, lineHeight: 1.55 }}>
        <div className="term-header" style={{ borderBottom: `1px solid ${C.line}`, padding: '14px 28px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div onClick={() => setRoute({ name: 'home' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: C.pixel, fontSize: 32, color: C.bright, lineHeight: 1, letterSpacing: 1 }}>group935.tty</span>
            <span style={{ color: C.dim, fontSize: 11 }}>{'rev 17.4 · tty04 · sess 0xAE3F'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: C.dim, fontSize: 11 }}>
            <span>agent 03741</span><span>UMBRA</span><span style={{ color: C.ink }}>14 SEP 91  14:22 UTC</span>
          </div>
        </div>
        <div className="term-menu" style={{ borderBottom: `1px solid ${C.line}`, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ color: C.dim, fontSize: 12, marginRight: 6 }}>menu</span>
          {nav.map(([id, label], i) => {
            const active = route.name === id || (id === 'maps' && route.name === 'map') || (id === 'games' && route.name === 'game') || (id === 'characters' && route.name === 'character');
            return (
              <button key={id} className={'term-btn' + (active ? ' active' : '')} onClick={() => setRoute({ name: id })} style={{ fontSize: 13 }}>
                <span style={{ color: active ? C.bg : C.dim, marginRight: 6 }}>{i + 1}</span>{label}
              </button>
            );
          })}
          <div style={{ flex: 1 }} />
          <div className="term-search" style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.line}`, padding: '3px 8px', gap: 6 }}>
            <span style={{ color: C.dim, fontSize: 12 }}>find</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setRoute({ name: 'search' })}
              placeholder="type then enter"
              style={{ background: 'transparent', border: 0, outline: 0, color: C.bright, font: 'inherit', fontSize: 13, width: 200 }} />
            <Cursor />
          </div>
        </div>
        <div style={{ padding: '8px 28px 4px', color: C.dim, fontSize: 12 }}>
          <span>cwd</span>{' '}
          <Link onClick={() => setRoute({ name: 'home' })} style={{ color: C.dim }}>/aether</Link>
          {route.name !== 'home' && <span>{' / '}<Link onClick={() => setRoute({ name: route.name })} style={{ color: C.dim }}>{route.name}</Link></span>}
          {route.id && <span>{' / '}<span style={{ color: C.ink }}>{route.id}</span></span>}
        </div>
        <main className="term-main" style={{ padding: '20px 28px 60px' }}>{children}</main>
      </div>
    );
  }

  function Row({ k, v }) {
    return (
      <div>
        <span style={{ color: C.dim, display: 'inline-block', width: 130, fontSize: 12.5 }}>{k}</span>
        <span style={{ fontSize: 13.5 }}>{v}</span>
      </div>
    );
  }

  function PageHead({ cmd, title, sub }) {
    return (
      <div style={{ marginBottom: 22 }}>
        <Prompt cmd={cmd} />
        <h1 style={{ fontFamily: C.pixel, fontSize: 46, color: C.bright, margin: '4px 0 4px', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1 }}>{title}</h1>
        {sub && <div style={{ color: C.dim, maxWidth: 760, fontSize: 13.5, lineHeight: 1.55 }}>{sub}</div>}
        <HRule cols={300} />
      </div>
    );
  }

  function Home({ setRoute }) {
    const featured = ZD.maps.find((m) => m.id === 'citadelle');
    const game = ZD.games.find((g) => g.id === featured.game);
    return (
      <div>
        <Prompt cmd="cat /aether/featured/citadelle.brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 36 }}>
          <Slot w="100%" h={400} label={featured.name.toUpperCase()} kind="overhead surveillance" />
          <div className="term-card" style={{ padding: 22 }}>
            <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>FEATURED SITE</div>
            <div style={{ fontFamily: C.pixel, fontSize: 36, color: C.bright, lineHeight: 1, marginTop: 6, letterSpacing: 1 }}>{featured.name}</div>
            <div style={{ color: C.dim, marginTop: 6 }}>{featured.location}</div>
            <div style={{ marginTop: 18, lineHeight: 1.8 }}>
              <Row k="operation"   v={game.title} />
              <Row k="location"    v={featured.location} />
              <Row k="difficulty"  v={featured.difficulty + ' / 5'} />
              <Row k="easter eggs" v={featured.eeCount} />
              <Row k="relics"      v={featured.relicCount} />
            </div>
            {featured.summary && <p style={{ margin: '18px 0 0', maxWidth: 360, color: C.ink, lineHeight: 1.55 }}>{featured.summary}</p>}
            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <button className="term-btn" onClick={() => setRoute({ name: 'map', id: featured.id })}
                style={{ background: C.ink, color: C.bg, borderColor: C.ink, fontWeight: 600 }}>{'open site →'}</button>
              <button className="term-btn" onClick={() => setRoute({ name: 'ee', id: 'kindertot' })}>begin main quest</button>
            </div>
          </div>
        </div>

        <Prompt cmd="ls /aether/operations --thumbs" sub={'total ' + ZD.games.length + ' volumes, sorted canonical'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 36 }}>
          {ZD.games.map((g, i) => {
            const n = ZD.maps.filter((m) => m.game === g.id).length;
            return (
              <button key={g.id} className="term-card" onClick={() => setRoute({ name: 'game', id: g.id })}
                style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit' }}>
                <Slot w="100%" h={120} label={g.code} kind="cover" style={{ border: 'none', borderBottom: `1px solid ${C.line}` }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>{'vol.' + String(i + 1).padStart(2, '0') + ' · ' + g.year}</div>
                  <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, lineHeight: 1, marginTop: 4 }}>{g.title}</div>
                  <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>{g.era}</div>
                  <div style={{ color: C.dim, fontSize: 11, marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{'[' + n + ' of ' + g.mapCount + ']'}</span>
                    <span style={{ color: C.ink }}>{'open →'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function Games({ setRoute }) {
    return (
      <div>
        <PageHead cmd="ls -l /aether/operations" title="operations" sub={'Eight catalogued volumes. ' + ZD.maps.length + ' total sites.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {ZD.games.map((g, i) => {
            const gameMaps = ZD.maps.filter((m) => m.game === g.id);
            return (
              <button key={g.id} className="term-card" onClick={() => setRoute({ name: 'game', id: g.id })}
                style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit', display: 'grid', gridTemplateColumns: '160px 1fr' }}>
                <Slot w={160} h={150} label={g.code} kind="cover" style={{ border: 'none', borderRight: `1px solid ${C.line}` }} />
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>{'vol.' + String(i + 1).padStart(2, '0') + ' · ' + g.year + ' · ' + gameMaps.length + '/' + g.mapCount}</div>
                  <div style={{ fontFamily: C.pixel, fontSize: 26, color: C.bright, marginTop: 4, lineHeight: 1 }}>{g.title}</div>
                  <div style={{ color: C.ink, fontSize: 13, marginTop: 4 }}>{g.era}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function Game({ id, setRoute }) {
    const g = ZD.games.find((x) => x.id === id);
    if (!g) return null;
    const gameMaps = ZD.maps.filter((m) => m.game === id);
    return (
      <div>
        <PageHead cmd={'cd /aether/operations/' + g.id + ' && ls'} title={g.title} sub={g.code + '  ·  ' + g.year + '  ·  ' + gameMaps.length + ' of ' + g.mapCount + ' maps.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {gameMaps.map((m) => <MapCard key={m.id} map={m} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function MapCard({ map, setRoute }) {
    return (
      <button className="term-card" onClick={() => setRoute({ name: 'map', id: map.id })}
        style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit' }}>
        <MapImage map={map} file={termMapPrimaryFile(map, 'thumb')} h={150} label={map.name} kind="surveillance" style={{ border: 'none', borderBottom: `1px solid ${C.line}` }} />
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>{'site/' + map.id}</div>
          <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, marginTop: 2, lineHeight: 1 }}>{map.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: C.dim, letterSpacing: 1 }}>
            <span>{'diff ' + map.difficulty + '/5'}</span>
            <span>{'ee ' + map.eeCount}</span>
            <span>{'rel ' + map.relicCount}</span>
            <span style={{ color: C.ink }}>{'open →'}</span>
          </div>
        </div>
      </button>
    );
  }

  function Maps({ setRoute }) {
    const [filter, setFilter] = useState('all');
    const list = filter === 'all' ? ZD.maps : ZD.maps.filter((m) => m.game === filter);
    return (
      <div>
        <PageHead cmd={'find /aether/sites' + (filter !== 'all' ? ' --vol=' + filter : '')} title="sites" sub={list.length + ' sites match.'} />
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: C.dim, fontSize: 12, marginRight: 4 }}>--vol=</span>
          <button className={'term-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')} style={{ fontSize: 12, padding: '3px 10px' }}>all</button>
          {ZD.games.map((g) => (
            <button key={g.id} className={'term-btn' + (filter === g.id ? ' active' : '')} onClick={() => setFilter(g.id)} style={{ fontSize: 12, padding: '3px 10px' }}>{g.code.toLowerCase()}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {list.map((m) => <MapCard key={m.id} map={m} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function MapDetail({ id, setRoute }) {
    const m = ZD.maps.find((x) => x.id === id);
    if (!m) return null;
    const g = ZD.games.find((x) => x.id === m.game);
    const ee = ZD.sampleEE;
    const gallery = termMapGalleryItems(m);
    return (
      <div>
        <PageHead cmd={'open /aether/sites/' + m.id} title={m.name} sub={m.location} />
        <MapImage map={m} h={360} label={m.name.toUpperCase()} kind="recon photograph" style={{ marginBottom: 18 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 32 }}>
          <div>
            <Prompt cmd={'cat ./brief.txt'} />
            {m.summary && <p style={{ margin: 0, lineHeight: 1.65, maxWidth: 760, fontSize: 14.5 }}>{m.summary}</p>}
          </div>
          <div className="term-card" style={{ padding: 16 }}>
            <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>MANIFEST</div>
            <div style={{ marginTop: 8, lineHeight: 1.9 }}>
              <Row k="site id"        v={m.id} />
              <Row k="operation"      v={<Link onClick={() => setRoute({ name: 'game', id: g.id })}>{g.title}</Link>} />
              <Row k="year"           v={g.year} />
              <Row k="location"       v={m.location} />
              <Row k="difficulty"     v={m.difficulty + ' / 5'} />
              <Row k="easter eggs"    v={m.eeCount} />
              <Row k="relics"         v={m.relicCount} />
              <Row k="classification" v="UMBRA" />
            </div>
          </div>
        </div>
        {gallery.length > 0 && (
          <>
            <Prompt cmd={'ls ./imagery'} sub={gallery.length + ' recovered frames.'} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
              {gallery.map((item) => (
                <MapImage key={item.file} map={m} file={item.file} h={170} label={item.label} kind="gallery" showOverlay={false} />
              ))}
            </div>
          </>
        )}
        <Prompt cmd={'ls ./quests'} sub={m.eeCount ? 'one main quest catalogued.' : 'no quests on file.'} />
        {m.eeCount && ee.map === m.id ? (
          <button className="term-card" onClick={() => setRoute({ name: 'ee', id: ee.id })}
            style={{ padding: 0, width: '100%', cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit', display: 'grid', gridTemplateColumns: '180px 1fr auto', marginBottom: 32 }}>
            <Slot w={180} h={130} label="EE.01" kind="quest still" style={{ border: 'none', borderRight: `1px solid ${C.line}` }} />
            <div style={{ padding: 16 }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>{'main quest · ' + ee.difficulty.toLowerCase() + ' · ' + ee.duration}</div>
              <div style={{ fontFamily: C.pixel, fontSize: 24, color: C.bright, marginTop: 4, lineHeight: 1 }}>{ee.title}</div>
              <div style={{ color: C.ink, fontSize: 13.5, marginTop: 8, maxWidth: 560 }}>{ee.summary}</div>
            </div>
            <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', borderLeft: `1px solid ${C.line}` }}>
              <span style={{ color: C.bright, letterSpacing: 1 }}>{'run →'}</span>
            </div>
          </button>
        ) : (
          <div style={{ color: C.dim, marginBottom: 32 }}>(empty directory)</div>
        )}
      </div>
    );
  }

  function EE({ setRoute }) {
    const ee = ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const [completed, setCompleted] = useState(new Set());
    const [active, setActive] = useState(0);
    const toggle = (n) => setCompleted((s) => { const ns = new Set(s); if (ns.has(n)) ns.delete(n); else ns.add(n); return ns; });
    const filled = Math.floor((completed.size / ee.steps.length) * 30);
    const bar = '█'.repeat(filled) + '░'.repeat(30 - filled);
    return (
      <div>
        <PageHead cmd={'run /aether/quests/' + ee.id} title={ee.title} sub="" />
        <div style={{ color: C.dim, marginTop: -16, marginBottom: 18, fontSize: 13.5 }}>
          {'on '}<Link onClick={() => setRoute({ name: 'map', id: m.id })}>{m.name}</Link>{'  ·  ' + ee.difficulty + '  ·  ' + ee.duration + '  ·  ' + ee.party}
        </div>
        <p style={{ margin: '0 0 22px', maxWidth: 820, lineHeight: 1.65, fontSize: 14.5 }}>{ee.summary}</p>
        <div className="term-card" style={{ padding: 14, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
            <div>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>PROGRESS</div>
              <div style={{ fontFamily: C.mono, marginTop: 4, color: C.ink }}>
                {'[' + bar + '] ' + completed.size + '/' + ee.steps.length + ' · ' + Math.round((completed.size / ee.steps.length) * 100) + '%'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>REWARDS</div>
              <div style={{ marginTop: 4 }}>{ee.rewards.join(' · ')}</div>
            </div>
          </div>
        </div>
        <Prompt cmd={'open step.' + String(ee.steps[active].n).padStart(2, '0')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 22 }}>
          <Slot w="100%" h={280} label={'STEP ' + String(ee.steps[active].n).padStart(2, '0')} kind="reference still" />
          <div>
            <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>{'STEP ' + ee.steps[active].n + ' OF ' + ee.steps.length}</div>
            <div style={{ fontFamily: C.pixel, fontSize: 30, color: C.bright, marginTop: 4, lineHeight: 1.05 }}>{ee.steps[active].title}</div>
            <p style={{ margin: '14px 0 0', maxWidth: 560, lineHeight: 1.65, fontSize: 14.5 }}>{ee.steps[active].body}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="term-btn" disabled={active === 0} onClick={() => setActive((a) => a - 1)} style={{ opacity: active === 0 ? 0.4 : 1 }}>{'< prev'}</button>
              <button className="term-btn" onClick={() => { toggle(ee.steps[active].n); if (active < ee.steps.length - 1) setActive((a) => a + 1); }}
                style={{ background: C.ink, color: C.bg, borderColor: C.ink, fontWeight: 600 }}>
                {completed.has(ee.steps[active].n) ? 'undo' : '[ ] mark complete'}{' >'}
              </button>
              <button className="term-btn" disabled={active === ee.steps.length - 1} onClick={() => setActive((a) => a + 1)}
                style={{ opacity: active === ee.steps.length - 1 ? 0.4 : 1 }}>{'next >'}</button>
            </div>
          </div>
        </div>
        <Prompt cmd="steps --list" />
        <div className="term-card" style={{ padding: '4px 0' }}>
          {ee.steps.map((s, i) => {
            const done = completed.has(s.n);
            const isActive = i === active;
            return (
              <button key={s.n} onClick={() => setActive(i)}
                style={{ display: 'grid', gridTemplateColumns: '32px 28px 110px 1fr 80px', alignItems: 'baseline', gap: 8, padding: '7px 14px',
                  background: isActive ? 'rgba(216,210,188,0.07)' : 'transparent',
                  border: 0, borderTop: i ? `1px dotted ${C.line}` : 0, font: 'inherit', color: C.ink, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                <span style={{ color: C.dim }}>{isActive ? '▸' : ' '}</span>
                <span onClick={(e) => { e.stopPropagation(); toggle(s.n); }} style={{ color: done ? C.bright : C.dim, textAlign: 'center' }}>{'[' + (done ? 'x' : ' ') + ']'}</span>
                <span style={{ color: C.dim, fontSize: 12 }}>{'step.' + String(s.n).padStart(2, '0')}</span>
                <span style={{ textDecoration: done ? 'line-through' : 'none', color: done ? C.dim : C.ink }}>{s.title}</span>
                <span style={{ color: C.dim, fontSize: 11, textAlign: 'right' }}>{isActive ? 'ACTIVE' : (done ? 'done' : '')}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function Characters({ setRoute }) {
    return (
      <div>
        <PageHead cmd="ls /aether/subjects --thumbs" title="subjects" sub={ZD.characters.length + ' subjects of interest on file.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {ZD.characters.map((c, i) => (
            <button key={c.id} className="term-card" onClick={() => setRoute({ name: 'character', id: c.id })}
              style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit' }}>
              <Slot w="100%" h={220} label={c.name.split(' ').pop().toUpperCase()} kind="portrait" style={{ border: 'none', borderBottom: `1px solid ${C.line}` }} />
              <div style={{ padding: 12 }}>
                <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>{'s.' + String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, lineHeight: 1, marginTop: 2 }}>{c.name}</div>
                <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>{c.role}</div>
                {c.quote && <div style={{ color: C.ink, fontSize: 12.5, marginTop: 8 }}>{'"' + c.quote + '"'}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function CharacterDetail({ id, setRoute }) {
    const c = ZD.characters.find((x) => x.id === id);
    if (!c) return null;
    return (
      <div>
        <PageHead cmd={'cat /aether/subjects/' + c.id + '.dossier'} title={c.name} sub={c.role} />
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 26 }}>
          <div>
            <Slot w="100%" h={400} label={c.name.split(' ').pop().toUpperCase()} kind="portrait" />
            <div className="term-card" style={{ padding: 16, marginTop: 14 }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>FILE</div>
              <Row k="name"   v={<span style={{ color: C.bright }}>{c.name}</span>} />
              <Row k="role"   v={c.role} />
              <Row k="origin" v={c.origin} />
              <Row k="status" v="active" />
            </div>
          </div>
          <div>
            {c.quote && (
              <div className="term-card" style={{ padding: 22 }}>
                <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>RECORDED STATEMENT</div>
                <div style={{ fontFamily: C.pixel, fontSize: 28, color: C.bright, marginTop: 8, lineHeight: 1.3 }}>{'"' + c.quote + '"'}</div>
              </div>
            )}
            <Prompt cmd="cat ./biography.txt" />
            {c.summary && <p style={{ margin: '0 0 22px', maxWidth: 760, lineHeight: 1.7, fontSize: 14.5 }}>{c.summary}</p>}
          </div>
        </div>
      </div>
    );
  }

  function Lore() {
    return (
      <div>
        <PageHead cmd="less /aether/memos/origin-cycle.txt" title="on the origin cycle" sub={'14 sept 1991  ·  D/SIX  ·  classified UMBRA'} />
        <div className="term-card" style={{ padding: 0, maxWidth: 880 }}>
          <div style={{ background: C.ink, color: C.bg, padding: '8px 18px', fontSize: 12, letterSpacing: 2, display: 'flex', justifyContent: 'space-between' }}>
            <span>{'MEMORANDUM · D/SIX'}</span><span>14 SEP 91</span><span>EYES ONLY</span>
          </div>
          <div style={{ padding: '24px 32px' }}>
            <article style={{ lineHeight: 1.75, fontSize: 14.5, maxWidth: 700 }}>
              <p style={{ color: C.bright, margin: 0 }}>{'"no matter how many times we run this, the ending is always the same. the difference is what gets dragged into it."'}</p>
              <p>{'The Aether Story is not a sequence; it is a wheel. '}<span style={{ color: C.bright }}>Dr. Maxis</span>{' is the closest thing the loop has to a narrator, and even he does not control the rotation. He is only the one who keeps the lights on between turns.'}</p>
              <div style={{ color: C.dim, fontSize: 12, letterSpacing: 1.5, marginTop: 22, marginBottom: 8 }}>## THE FIRST TURN</div>
              <p style={{ margin: 0 }}>{'The cycle begins at '}<span style={{ color: C.bright }}>Generation Station 64</span>{', a German dig that breached an Element 115 deposit during the closing months of the Great War. Four soldiers — the men we will come to call '}<span style={{ color: C.bright }}>Primis</span>{' — are killed, brought back, and given a fragment of memory that does not belong to them.'}</p>
              <div style={{ color: C.dim, fontSize: 12, letterSpacing: 1.5, marginTop: 22, marginBottom: 8 }}>## THE COST OF BREAKING IT</div>
              <p style={{ margin: 0 }}>{'By the time of Revelations, every variable that can be moved has been moved. The cycle does not end — it is '}<span style={{ color: C.bright }}>retired</span>{'. The new cycle, the Dark Aether era, begins on the same battlefield with none of the same actors and one new word for the same thing. That word is '}<span style={{ color: C.bright }}>Forsaken</span>{', and it remembers everything.'}</p>
            </article>
          </div>
        </div>
      </div>
    );
  }

  function Timeline() {
    return (
      <div>
        <PageHead cmd="cat /aether/kronorium/book.log" title="kronorium" sub="Lore-bound order. Oldest first." />
        <div className="term-card" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 110px 270px 1fr', padding: '10px 18px', borderBottom: `1px solid ${C.line}`, color: C.dim, fontSize: 11, letterSpacing: 2 }}>
            <span>YEAR</span><span>CODE</span><span>INCIDENT</span><span>REPORT</span>
          </div>
          {ZD.timeline.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 110px 270px 1fr', padding: '14px 18px', borderTop: i ? `1px dotted ${C.line}` : 0, alignItems: 'baseline' }}>
              <span style={{ color: C.bright, fontFamily: C.pixel, fontSize: 22, lineHeight: 1 }}>{t.year}</span>
              <span style={{ color: C.dim, fontSize: 12 }}>{'inc-' + String(i + 1).padStart(3, '0')}</span>
              <span style={{ color: C.ink, fontWeight: 500 }}>{t.title || 'entry'}</span>
              <span style={{ color: C.dim, lineHeight: 1.55, fontSize: 13.5 }}>{t.body}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Relics({ setRoute }) {
    const relicMaps = ZD.maps.filter((m) => m.relicCount > 0);
    return (
      <div>
        <PageHead cmd="grep -r class:RELIC /aether/sites/" title="relics" sub={relicMaps.length + ' sites carry relics.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {relicMaps.map((m) => (
            <button key={m.id} className="term-card" onClick={() => setRoute({ name: 'map', id: m.id })}
              style={{ padding: 14, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit' }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>{'site/' + m.id}</div>
              <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, marginTop: 4, lineHeight: 1 }}>{m.name}</div>
              <div style={{ color: C.ink, fontSize: 13, marginTop: 8 }}>{m.relicCount + ' relics on site'}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function Search({ query, setRoute }) {
    const q = (query || '').toLowerCase();
    const hits = useMemo(() => {
      const out = [];
      if (!q) return out;
      ZD.maps.forEach((m) => {
        if (m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q))
          out.push({ kind: 'site', title: m.name, sub: m.location, route: { name: 'map', id: m.id } });
      });
      ZD.characters.forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
          out.push({ kind: 'subject', title: c.name, sub: c.role, route: { name: 'character', id: c.id } });
      });
      return out.slice(0, 14);
    }, [q]);
    return (
      <div>
        <PageHead cmd={'grep -ri "' + (query || '') + '" /aether'} title={'find: ' + (query || '—')} sub={hits.length + ' result' + (hits.length === 1 ? '' : 's') + '.'} />
        <div className="term-card" style={{ padding: 0 }}>
          {hits.length === 0 && <div style={{ padding: 16, color: C.dim }}>(no matches)</div>}
          {hits.map((h, i) => (
            <button key={i} onClick={() => setRoute(h.route)} className="term-row"
              style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 14, padding: '12px 18px', alignItems: 'baseline',
                background: 'transparent', border: 0, borderTop: i ? `1px dotted ${C.line}` : 0, font: 'inherit', color: C.ink, textAlign: 'left', cursor: 'pointer', width: '100%' }}>
              <span style={{ color: C.dim, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{h.kind}</span>
              <div>
                <div style={{ fontFamily: C.pixel, fontSize: 18, color: C.bright, lineHeight: 1 }}>{h.title}</div>
                <div style={{ color: C.dim, marginTop: 4, fontSize: 12.5 }}>{h.sub}</div>
              </div>
              <span style={{ color: C.dim, fontSize: 12 }}>{'open →'}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function Terminal() {
    const [route, setRouteRaw] = useState(() => parseHash(window.location.hash));
    const [query, setQuery] = useState('');
    useEffect(() => {
      const onHash = () => setRouteRaw(parseHash(window.location.hash));
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);
    const setRoute = useCallback((r) => {
      const h = buildHash(r);
      if (window.location.hash !== h) window.location.hash = h;
      else setRouteRaw(parseHash(h));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);
    let page;
    switch (route.name) {
      case 'games':      page = <Games setRoute={setRoute} />; break;
      case 'game':       page = <Game id={route.id} setRoute={setRoute} />; break;
      case 'maps':       page = <Maps setRoute={setRoute} />; break;
      case 'map':        page = <MapDetail id={route.id} setRoute={setRoute} />; break;
      case 'ee':         page = <EE setRoute={setRoute} />; break;
      case 'characters': page = <Characters setRoute={setRoute} />; break;
      case 'character':  page = <CharacterDetail id={route.id} setRoute={setRoute} />; break;
      case 'lore':       page = <Lore />; break;
      case 'timeline':   page = <Timeline />; break;
      case 'relics':     page = <Relics setRoute={setRoute} />; break;
      case 'search':     page = <Search query={query} setRoute={setRoute} />; break;
      default:           page = <Home setRoute={setRoute} />;
    }
    return (
      <Shell route={route} setRoute={setRoute} query={query} setQuery={setQuery}>
        {page}
      </Shell>
    );
  }

  window.Terminal = Terminal;
})();

(function () {
  class ErrorBoundary extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(err) { return { err }; }
    componentDidCatch(err) { __bootShow('render error', err); }
    render() {
      if (this.state.err) {
        return React.createElement('div',
          { style: { padding: 40, fontFamily: 'IBM Plex Mono, monospace', color: '#ef3a3a' } },
          'render error: ' + (this.state.err.message || String(this.state.err)));
      }
      return this.props.children;
    }
  }

  function App() {
    if (window.PackAPunch) return <window.PackAPunch />;
    return React.createElement('div', null, 'Loading…');
  }

  function mount() {
    const missing = [];
    if (!window.ZD)         missing.push('ZD');
    if (!window.PackAPunch) missing.push('PackAPunch');
    if (missing.length) {
      __bootShow('still waiting on', missing.join(', '));
      setTimeout(mount, 200);
      return;
    }
    try {
      ReactDOM.createRoot(document.getElementById('root')).render(
        <ErrorBoundary><App /></ErrorBoundary>
      );
      document.body.classList.add('booted');
    } catch (err) {
      __bootShow('mount error', err);
    }
  }
  mount();
})();
