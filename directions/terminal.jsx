// Direction 3 — TERMINAL (rev 3)
// Plain monochrome CLI feel, but with real nav and prominent photo slots.

(function () {
  const { useState, useMemo, useEffect, useRef, useCallback } = React;
  const ZD = window.ZD;

  // ─── hash routing helpers (shared with pack-a-punch) ───────────────────
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

  // Phosphor monochrome — one ink, one dim, one highlight, one background.
  const C = {
    bg:     '#0a0a08',
    bgSoft: '#13130f',          // for subtle card fills
    ink:    '#d8d2bc',          // primary phosphor
    dim:    '#7a755f',          // faded
    bright: '#fff4d2',          // highlight
    line:   '#3a382c',          // borders
    lineHi: '#6a6650',
    mono:   '"JetBrains Mono", "IBM Plex Mono", "Courier Prime", ui-monospace, monospace',
    pixel:  '"VT323", "JetBrains Mono", monospace',
  };

  // One-time stylesheet
  if (typeof document !== 'undefined' && !document.getElementById('term-styles')) {
    const s = document.createElement('style');
    s.id = 'term-styles';
    s.textContent = `
      @keyframes term-blink { 50% { opacity: 0; } }
      .term-link {
        color: ${C.ink}; text-decoration: underline; text-underline-offset: 3px;
        cursor: pointer; background: transparent; border: 0; padding: 0; font: inherit;
      }
      .term-link:hover { background: ${C.ink}; color: ${C.bg}; text-decoration: none; padding: 0 2px; }
      .term-card { background: ${C.bgSoft}; border: 1px solid ${C.line}; transition: border-color .1s; }
      .term-card:hover { border-color: ${C.bright}; }
      .term-row { transition: background .08s; }
      .term-row:hover { background: rgba(216, 210, 188, 0.06); }
      .term-btn {
        background: transparent; color: ${C.ink}; border: 1px solid ${C.line};
        font: inherit; cursor: pointer; padding: 4px 12px;
      }
      .term-btn:hover { background: ${C.ink}; color: ${C.bg}; border-color: ${C.ink}; }
      .term-btn.active { background: ${C.ink}; color: ${C.bg}; border-color: ${C.ink}; }
    `;
    document.head.appendChild(s);
  }

  // ─── primitives ────────────────────────────────────────────────────────
  const Cursor = () => (
    <span style={{
      display: 'inline-block', width: '0.55em', height: '1em', background: C.ink,
      verticalAlign: '-2px', marginLeft: 2,
      animation: 'term-blink 1.05s steps(2) infinite',
    }} />
  );

  const Prompt = ({ cmd, sub }) => (
    <div style={{ margin: '0 0 12px' }}>
      <div>
        <span style={{ color: C.dim }}>$ aether:~&gt; </span>
        <span style={{ color: C.bright }}>{cmd}</span>
      </div>
      {sub && <div style={{ color: C.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  const Slot = ({ w, h, label, kind = 'photo', style }) => (
    <div style={{
      width: w, height: h, position: 'relative', background: C.bg,
      border: `1px solid ${C.lineHi}`, color: C.dim, fontFamily: C.mono,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backgroundImage: `repeating-linear-gradient(45deg, transparent 0 7px, rgba(216,210,188,0.035) 7px 8px)`,
      ...style,
    }}>
      <div style={{ fontFamily: C.pixel, fontSize: 32, opacity: 0.6, letterSpacing: -1 }}>×××</div>
      <div style={{ fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
      <div style={{ fontSize: 9.5, letterSpacing: 1.5, marginTop: 4, opacity: 0.6 }}>{'[' + kind + ' \u2014 awaiting upload]'}</div>
      <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>NO-SIG</div>
      <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>REC \u25cf</div>
    </div>
  );

  const HRule = ({ ch = '\u2500', cols = 200, color = C.dim }) => (
    <div style={{ color, userSelect: 'none', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', opacity: 0.6 }}>{ch.repeat(cols)}</div>
  );

  const Link = ({ onClick, children, style }) => (
    <button className="term-link" onClick={onClick} style={style}>{children}</button>
  );

  // ─── shell ─────────────────────────────────────────────────────────────
  function Shell({ route, setRoute, query, setQuery, mode, setMode, children }) {
    const nav = [
      ['home',       'home'],
      ['games',      'games'],
      ['maps',       'sites'],
      ['characters', 'subjects'],
      ['lore',       'memos'],
      ['timeline',   'chronology'],
      ['relics',     'relics'],
    ];
    return (
      <div style={{
        background: C.bg, color: C.ink, fontFamily: C.mono,
        minHeight: '100%', fontSize: 14, lineHeight: 1.55,
      }}>
        {/* top stripe — kept thin, no fake glow or status bar */}
        <div style={{ borderBottom: `1px solid ${C.line}`, padding: '14px 28px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div onClick={() => setRoute({ name: 'home' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: C.pixel, fontSize: 32, color: C.bright, lineHeight: 1, letterSpacing: 1 }}>
              aether.kernel
            </span>
            <span style={{ color: C.dim, fontSize: 11 }}>rev 17.4 \u00b7 tty04 \u00b7 sess 0xAE3F</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: C.dim, fontSize: 11 }}>
            <span>agent 03741</span>
            <span>UMBRA</span>
            <span style={{ color: C.ink }}>14 SEP 91  14:22 UTC</span>
            {setMode && (
              <div style={{ display: 'flex', border: `1px solid ${C.line}`, marginLeft: 8 }}>
                <button onClick={() => setMode('field')}
                  style={{
                    background: mode === 'field' ? C.ink : 'transparent',
                    color: mode === 'field' ? C.bg : C.dim, border: 0,
                    padding: '5px 10px', font: 'inherit', fontSize: 11,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1.5,
                  }}>field</button>
                <button onClick={() => setMode('terminal')}
                  style={{
                    background: mode === 'terminal' ? C.ink : 'transparent',
                    color: mode === 'terminal' ? C.bg : C.dim, border: 0,
                    padding: '5px 10px', font: 'inherit', fontSize: 11,
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1.5,
                  }}>tty</button>
              </div>
            )}
          </div>
        </div>

        {/* primary nav: actual visible buttons */}
        <div style={{ borderBottom: `1px solid ${C.line}`, padding: '10px 28px',
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ color: C.dim, fontSize: 12, marginRight: 6 }}>menu</span>
          {nav.map(([id, label], i) => {
            const active = route.name === id || (id === 'maps' && route.name === 'map') || (id === 'games' && route.name === 'game') || (id === 'characters' && route.name === 'character');
            return (
              <button key={id} className={'term-btn' + (active ? ' active' : '')}
                onClick={() => setRoute({ name: id })}
                style={{ fontSize: 13 }}>
                <span style={{ color: active ? C.bg : C.dim, marginRight: 6 }}>{i + 1}</span>
                {label}
              </button>
            );
          })}
          <div style={{ flex: 1 }} />
          {/* search field — visible input, looks like a real form field */}
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.line}`, padding: '3px 8px', gap: 6 }}>
            <span style={{ color: C.dim, fontSize: 12 }}>find</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setRoute({ name: 'search' })}
              placeholder="type then enter"
              style={{ background: 'transparent', border: 0, outline: 0,
                color: C.bright, font: 'inherit', fontSize: 13, width: 200 }} />
            <Cursor />
          </div>
        </div>

        {/* breadcrumb / cwd line — light context */}
        <div style={{ padding: '8px 28px 4px', color: C.dim, fontSize: 12 }}>
          <span>cwd</span>{' '}
          <Link onClick={() => setRoute({ name: 'home' })} style={{ color: C.dim }}>/aether</Link>
          {route.name !== 'home' && <>
            <span> / </span>
            <Link onClick={() => setRoute({ name: route.name })} style={{ color: C.dim }}>{route.name}</Link>
          </>}
          {route.id && <>
            <span> / </span>
            <span style={{ color: C.ink }}>{route.id}</span>
          </>}
        </div>

        <main style={{ padding: '20px 28px 60px' }}>
          {children}
        </main>
      </div>
    );
  }

  // ─── HOME ──────────────────────────────────────────────────────────────
  function Home({ setRoute }) {
    const featured = ZD.maps.find((m) => m.id === 'citadelle');
    return (
      <div>
        {/* hero: command + huge photo slot of the featured map */}
        <Prompt cmd="cat /aether/featured/citadelle.brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 36 }}>
          <Slot w="100%" h={400} label={featured.name.toUpperCase()} kind="overhead surveillance" />
          <div className="term-card" style={{ padding: 22 }}>
            <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>FEATURED SITE</div>
            <div style={{ fontFamily: C.pixel, fontSize: 36, color: C.bright, lineHeight: 1, marginTop: 6, letterSpacing: 1 }}>
              {featured.name}
            </div>
            <div style={{ color: C.dim, fontStyle: 'italic', marginTop: 6 }}>{featured.tagline}</div>

            <div style={{ marginTop: 18, lineHeight: 1.8 }}>
              <div><span style={{ color: C.dim, display: 'inline-block', width: 110 }}>operation</span>{ZD.games.find((g) => g.id === featured.game).title}</div>
              <div><span style={{ color: C.dim, display: 'inline-block', width: 110 }}>location</span>{featured.location}</div>
              <div><span style={{ color: C.dim, display: 'inline-block', width: 110 }}>difficulty</span>{featured.difficulty} / 5</div>
              <div><span style={{ color: C.dim, display: 'inline-block', width: 110 }}>easter eggs</span>{featured.eeCount}</div>
              <div><span style={{ color: C.dim, display: 'inline-block', width: 110 }}>relics</span>{featured.relicCount}</div>
            </div>

            <p style={{ margin: '18px 0 0', maxWidth: 360, color: C.ink, lineHeight: 1.55 }}>{featured.summary}</p>

            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <button className="term-btn" onClick={() => setRoute({ name: 'map', id: featured.id })}
                style={{ background: C.ink, color: C.bg, borderColor: C.ink, fontWeight: 600 }}>
                open site \u2192
              </button>
              <button className="term-btn" onClick={() => setRoute({ name: 'ee', id: 'kindertot' })}>
                begin main quest
              </button>
            </div>
          </div>
        </div>

        {/* games — grid of cards each with its own photo slot */}
        <Prompt cmd="ls /aether/operations --thumbs" sub={'total ' + ZD.games.length + ' volumes, sorted canonical'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 36 }}>
          {ZD.games.map((g, i) => {
            const n = ZD.maps.filter((m) => m.game === g.id).length;
            return (
              <button key={g.id} className="term-card" onClick={() => setRoute({ name: 'game', id: g.id })}
                style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit' }}>
                <Slot w="100%" h={120} label={g.code} kind="cover" style={{ border: 'none', borderBottom: `1px solid ${C.line}` }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>vol.{String(i + 1).padStart(2, '0')} \u00b7 {g.year}</div>
                  <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, lineHeight: 1, marginTop: 4, letterSpacing: 0.5 }}>{g.title}</div>
                  <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>{g.era}</div>
                  <div style={{ color: C.dim, fontSize: 11, marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span>[{n} of {g.mapCount}]</span>
                    <span style={{ color: C.ink }}>open \u2192</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* subjects + memos in two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 22 }}>
          <div>
            <Prompt cmd="ls /aether/subjects --primary" sub="primary cast \u2014 4 of 8" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {ZD.characters.slice(0, 4).map((c, i) => (
                <button key={c.id} className="term-card" onClick={() => setRoute({ name: 'character', id: c.id })}
                  style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit',
                    display: 'grid', gridTemplateColumns: '80px 1fr', gap: 0, alignItems: 'stretch' }}>
                  <Slot w={80} h={110} label="" kind="portrait" style={{ border: 'none', borderRight: `1px solid ${C.line}` }} />
                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 11, color: C.dim }}>s.{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ color: C.bright, fontWeight: 600, marginTop: 2 }}>{c.name}</div>
                    <div style={{ color: C.dim, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>{c.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Prompt cmd="tail -n 4 /aether/memos" sub="recent transcriptions" />
            <div className="term-card" style={{ padding: '8px 14px' }}>
              {[
                ['1991-09-14', 'on-the-origin-cycle', 'D/SIX'],
                ['1991-09-02', 'the-sentinel-artifact', 'WEAVER,G'],
                ['1991-08-21', 'notes-on-templar-1294', 'AGUINALDO,M'],
                ['1991-08-08', 're-forsaken-seal', '\u2014\u2014'],
              ].map(([date, slug, author], i) => (
                <button key={slug} onClick={() => setRoute({ name: 'lore' })}
                  className="term-row"
                  style={{
                    display: 'grid', gridTemplateColumns: '100px 1fr 120px', alignItems: 'baseline', gap: 12,
                    padding: '7px 4px', background: 'transparent', border: 0,
                    borderTop: i ? `1px dotted ${C.line}` : '0', font: 'inherit', color: C.ink,
                    textAlign: 'left', cursor: 'pointer', width: '100%',
                  }}>
                  <span style={{ color: C.dim, fontSize: 12 }}>{date}</span>
                  <span><Link onClick={(e) => { e.stopPropagation(); setRoute({ name: 'lore' }); }}>{slug}</Link></span>
                  <span style={{ color: C.dim, fontSize: 12 }}>{author}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── shared page heading: command line + display title ────────────────
  function PageHead({ cmd, title, sub }) {
    return (
      <div style={{ marginBottom: 22 }}>
        <Prompt cmd={cmd} />
        <h1 style={{ fontFamily: C.pixel, fontSize: 46, color: C.bright, margin: '4px 0 4px', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1 }}>
          {title}
        </h1>
        {sub && <div style={{ color: C.dim, maxWidth: 760, fontSize: 13.5, lineHeight: 1.55 }}>{sub}</div>}
        <HRule ch="\u2500" cols={300} />
      </div>
    );
  }

  // ─── GAMES (table-style with thumbnails) ──────────────────────────────
  function Games({ setRoute }) {
    return (
      <div>
        <PageHead cmd="ls -l /aether/operations" title="operations" sub={'Eight catalogued volumes, in canonical order. ' + ZD.maps.length + ' total sites across them.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {ZD.games.map((g, i) => {
            const gameMaps = ZD.maps.filter((m) => m.game === g.id);
            return (
              <button key={g.id} className="term-card" onClick={() => setRoute({ name: 'game', id: g.id })}
                style={{ padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit',
                  display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'stretch' }}>
                <Slot w={160} h={150} label={g.code} kind="cover" style={{ border: 'none', borderRight: `1px solid ${C.line}` }} />
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>vol.{String(i + 1).padStart(2, '0')} \u00b7 {g.year} \u00b7 {gameMaps.length}/{g.mapCount} mounted</div>
                  <div style={{ fontFamily: C.pixel, fontSize: 26, color: C.bright, marginTop: 4, lineHeight: 1 }}>{g.title}</div>
                  <div style={{ color: C.ink, fontSize: 13, marginTop: 4 }}>{g.era}</div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {gameMaps.slice(0, 4).map((m) => (
                      <span key={m.id} style={{ color: C.dim, fontSize: 11, border: `1px solid ${C.line}`, padding: '1px 6px' }}>{m.name}</span>
                    ))}
                    {gameMaps.length > 4 && <span style={{ color: C.dim, fontSize: 11, padding: '1px 4px' }}>+{gameMaps.length - 4}</span>}
                  </div>
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
    const gameMaps = ZD.maps.filter((m) => m.game === id);
    return (
      <div>
        <PageHead cmd={'cd /aether/operations/' + g.id + ' && ls'} title={g.title} sub={g.era + '  \u00b7  ' + g.year + '  \u00b7  ' + gameMaps.length + ' of ' + g.mapCount + ' sites mounted.'} />
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
        <Slot w="100%" h={150} label={map.name} kind="surveillance" style={{ border: 'none', borderBottom: `1px solid ${C.line}` }} />
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11, color: C.dim, letterSpacing: 1.5 }}>site/{map.id}</div>
          <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, marginTop: 2, lineHeight: 1 }}>{map.name}</div>
          <div style={{ color: C.dim, fontSize: 12.5, fontStyle: 'italic', marginTop: 4 }}>{map.tagline}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: C.dim, letterSpacing: 1 }}>
            <span>diff {map.difficulty}/5</span>
            <span>ee {map.eeCount}</span>
            <span>rel {map.relicCount}</span>
            <span style={{ color: C.ink }}>open \u2192</span>
          </div>
        </div>
      </button>
    );
  }

  // ─── MAPS (filterable) ────────────────────────────────────────────────
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
            <button key={g.id} className={'term-btn' + (filter === g.id ? ' active' : '')} onClick={() => setFilter(g.id)} style={{ fontSize: 12, padding: '3px 10px' }}>
              {g.code.toLowerCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {list.map((m) => <MapCard key={m.id} map={m} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  // ─── MAP DETAIL ───────────────────────────────────────────────────────
  function MapDetail({ id, setRoute }) {
    const m = ZD.maps.find((x) => x.id === id);
    const g = ZD.games.find((x) => x.id === m.game);
    const ee = ZD.sampleEE;
    return (
      <div>
        <PageHead cmd={'open /aether/sites/' + m.id} title={m.name} sub={m.tagline} />

        {/* big hero photo */}
        <Slot w="100%" h={360} label={m.name.toUpperCase()} kind="recon photograph" style={{ marginBottom: 18 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 32 }}>
          <div>
            <Prompt cmd={'cat ./brief.txt'} />
            <p style={{ margin: 0, lineHeight: 1.65, maxWidth: 760, fontSize: 14.5 }}>{m.summary}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {m.tags.map((t) => <span key={t} style={{ color: C.dim, fontSize: 11, border: `1px solid ${C.line}`, padding: '1px 7px' }}>{t}</span>)}
            </div>
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

        <Prompt cmd={'ls ./quests'} sub={m.eeCount ? 'one main quest catalogued.' : 'no quests on file.'} />
        {m.eeCount ? (
          <button className="term-card" onClick={() => setRoute({ name: 'ee', id: ee.id })}
            style={{ padding: 0, width: '100%', cursor: 'pointer', textAlign: 'left', color: C.ink, font: 'inherit',
              display: 'grid', gridTemplateColumns: '180px 1fr auto', marginBottom: 32 }}>
            <Slot w={180} h={130} label="EE.01" kind="quest still" style={{ border: 'none', borderRight: `1px solid ${C.line}` }} />
            <div style={{ padding: 16 }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>
                main quest \u00b7 {ee.difficulty.toLowerCase()} \u00b7 {ee.duration} \u00b7 {ee.party.toLowerCase()}
              </div>
              <div style={{ fontFamily: C.pixel, fontSize: 24, color: C.bright, marginTop: 4, lineHeight: 1 }}>{ee.title}</div>
              <div style={{ color: C.ink, fontSize: 13.5, marginTop: 8, maxWidth: 560 }}>{ee.summary}</div>
            </div>
            <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', borderLeft: `1px solid ${C.line}` }}>
              <span style={{ color: C.bright, letterSpacing: 1 }}>run \u2192</span>
            </div>
          </button>
        ) : (
          <div style={{ color: C.dim, marginBottom: 32 }}>(empty directory)</div>
        )}

        <Prompt cmd={'ls ./relics'} sub={m.relicCount ? m.relicCount + ' artefacts on site.' : 'no relics on file.'} />
        {m.relicCount ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {Array.from({ length: m.relicCount }).map((_, i) => (
              <div key={i} className="term-card" style={{ padding: 10 }}>
                <div style={{ color: C.dim, fontSize: 10, letterSpacing: 1.5 }}>r.{String(i + 1).padStart(3, '0')}</div>
                <Slot w="100%" h={70} label="OBJ" kind="object" style={{ marginTop: 6 }} />
                <div style={{ fontSize: 12, color: C.ink, marginTop: 8 }}>relic_{String.fromCharCode(97 + i)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: C.dim }}>(empty)</div>
        )}
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

  // ─── EE WALKTHROUGH ───────────────────────────────────────────────────
  function EE({ setRoute }) {
    const ee = ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const [completed, setCompleted] = useState(new Set());
    const [active, setActive] = useState(0);
    const toggle = (n) => setCompleted((s) => { const ns = new Set(s); ns.has(n) ? ns.delete(n) : ns.add(n); return ns; });

    const filled = Math.floor((completed.size / ee.steps.length) * 30);
    const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(30 - filled);

    return (
      <div>
        <PageHead cmd={'run /aether/quests/' + ee.id} title={ee.title}
          sub={'main quest on '} />
        <div style={{ color: C.dim, marginTop: -16, marginBottom: 18, fontSize: 13.5 }}>
          on <Link onClick={() => setRoute({ name: 'map', id: m.id })}>{m.name}</Link>{'  \u00b7  ' + ee.difficulty + '  \u00b7  ' + ee.duration + '  \u00b7  ' + ee.party}
        </div>

        <p style={{ margin: '0 0 22px', maxWidth: 820, lineHeight: 1.65, fontSize: 14.5 }}>{ee.summary}</p>

        {/* progress + rewards strip */}
        <div className="term-card" style={{ padding: 14, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
            <div>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>PROGRESS</div>
              <div style={{ fontFamily: C.mono, marginTop: 4, color: C.ink }}>
                [{bar}] {completed.size}/{ee.steps.length} \u00b7 {Math.round((completed.size / ee.steps.length) * 100)}%
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>REWARDS</div>
              <div style={{ marginTop: 4 }}>{ee.rewards.join(' \u00b7 ')}</div>
            </div>
          </div>
        </div>

        {/* big step view: photo left, copy right */}
        <Prompt cmd={'open step.' + String(ee.steps[active].n).padStart(2, '0')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 22 }}>
          <Slot w="100%" h={280} label={'STEP ' + String(ee.steps[active].n).padStart(2, '0')} kind="reference still" />
          <div>
            <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>STEP {ee.steps[active].n} OF {ee.steps.length}</div>
            <div style={{ fontFamily: C.pixel, fontSize: 30, color: C.bright, marginTop: 4, lineHeight: 1.05 }}>{ee.steps[active].title}</div>
            <p style={{ margin: '14px 0 0', maxWidth: 560, lineHeight: 1.65, fontSize: 14.5 }}>{ee.steps[active].body}</p>

            <div style={{ marginTop: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="term-btn" disabled={active === 0}
                onClick={() => setActive((a) => a - 1)}
                style={{ opacity: active === 0 ? 0.4 : 1 }}>&lt; prev</button>
              <button className="term-btn"
                onClick={() => { toggle(ee.steps[active].n); if (active < ee.steps.length - 1) setActive((a) => a + 1); }}
                style={{ background: C.ink, color: C.bg, borderColor: C.ink, fontWeight: 600 }}>
                {completed.has(ee.steps[active].n) ? 'undo' : '[ ] mark complete'} &gt;
              </button>
              <button className="term-btn" disabled={active === ee.steps.length - 1}
                onClick={() => setActive((a) => a + 1)}
                style={{ opacity: active === ee.steps.length - 1 ? 0.4 : 1 }}>next &gt;</button>
            </div>
          </div>
        </div>

        {/* step list */}
        <Prompt cmd="steps --list" />
        <div className="term-card" style={{ padding: '4px 0' }}>
          {ee.steps.map((s, i) => {
            const done = completed.has(s.n);
            const isActive = i === active;
            return (
              <button key={s.n} onClick={() => setActive(i)}
                style={{
                  display: 'grid', gridTemplateColumns: '32px 28px 110px 1fr 80px',
                  alignItems: 'baseline', gap: 8, padding: '7px 14px',
                  background: isActive ? 'rgba(216,210,188,0.07)' : 'transparent',
                  border: 0, borderTop: i ? `1px dotted ${C.line}` : 0, font: 'inherit',
                  color: C.ink, cursor: 'pointer', width: '100%', textAlign: 'left',
                }}>
                <span style={{ color: C.dim }}>{isActive ? '\u25b8' : ' '}</span>
                <span onClick={(e) => { e.stopPropagation(); toggle(s.n); }} style={{
                  color: done ? C.bright : C.dim, textAlign: 'center',
                }}>[{done ? 'x' : ' '}]</span>
                <span style={{ color: C.dim, fontSize: 12 }}>step.{String(s.n).padStart(2, '0')}</span>
                <span style={{ textDecoration: done ? 'line-through' : 'none', color: done ? C.dim : C.ink }}>{s.title}</span>
                <span style={{ color: C.dim, fontSize: 11, textAlign: 'right' }}>{isActive ? 'ACTIVE' : (done ? 'done' : '')}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── CHARACTERS ────────────────────────────────────────────────────────
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
                <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>s.{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: C.pixel, fontSize: 22, color: C.bright, lineHeight: 1, marginTop: 2 }}>{c.name}</div>
                <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>{c.role}</div>
                <div style={{ color: C.ink, fontSize: 12.5, fontStyle: 'italic', marginTop: 8 }}>"{c.quote}"</div>
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
              <Row k="name"       v={<span style={{ color: C.bright }}>{c.name}</span>} />
              <Row k="role"       v={c.role} />
              <Row k="origin"     v={c.origin} />
              <Row k="status"     v="active" />
              <Row k="clearance"  v={<span style={{ background: C.ink, color: C.bg }}>{'\u2588'.repeat(6)}</span>} />
              <Row k="aliases"    v="\u2014" />
            </div>
          </div>
          <div>
            <div className="term-card" style={{ padding: 22 }}>
              <div style={{ color: C.dim, fontSize: 11, letterSpacing: 2 }}>RECORDED STATEMENT</div>
              <div style={{ fontFamily: C.pixel, fontSize: 28, color: C.bright, marginTop: 8, lineHeight: 1.3 }}>
                "{c.quote}"
              </div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 14 }}>attributed \u00b7 {c.name} \u00b7 ops log \u2014 ████</div>
            </div>

            <Prompt cmd="cat ./biography.txt" />
            <p style={{ margin: '0 0 22px', maxWidth: 760, lineHeight: 1.7, fontSize: 14.5 }}>{c.summary}</p>

            <Prompt cmd="grep -l ./aether/sites/* | filter subject" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ZD.maps.slice(0, 8).map((m) => (
                <button key={m.id} className="term-btn" onClick={() => setRoute({ name: 'map', id: m.id })}
                  style={{ fontSize: 12, padding: '3px 10px' }}>~/sites/{m.id}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── LORE / memo ───────────────────────────────────────────────────────
  function Lore() {
    return (
      <div>
        <PageHead cmd="less /aether/memos/origin-cycle.txt" title="on the origin cycle" sub="14 sept 1991  \u00b7  D/SIX  \u00b7  classified UMBRA" />
        <div className="term-card" style={{ padding: 0, maxWidth: 880 }}>
          <div style={{ background: C.ink, color: C.bg, padding: '8px 18px', fontSize: 12, letterSpacing: 2, display: 'flex', justifyContent: 'space-between' }}>
            <span>MEMORANDUM \u00b7 D/SIX</span>
            <span>14 SEP 91</span>
            <span>EYES ONLY</span>
          </div>
          <div style={{ padding: '24px 32px' }}>
            <Slot w="100%" h={200} label="ATTACHED EVIDENCE" kind="photograph" style={{ marginBottom: 22 }} />

            <div style={{ marginBottom: 18 }}>
              <Row k="from"  v="D/SIX" />
              <Row k="to"    v={<span style={{ background: C.ink, color: C.bg }}>{'\u2588'.repeat(14)}</span>} />
              <Row k="re"    v="why maxis keeps starting over" />
            </div>

            <article style={{ lineHeight: 1.75, fontSize: 14.5, maxWidth: 700 }}>
              <p style={{ color: C.bright, margin: 0 }}>
                "no matter how many times we run this, the ending is always the same.
                the difference is what gets dragged into it."
              </p>
              <p>
                The Aether Story is not a sequence; it is a wheel. <span style={{ color: C.bright }}>Dr. Maxis</span> is
                the closest thing the loop has to a narrator, and even he does not control the rotation.
                He is only the one who keeps the lights on between turns.
              </p>
              <div style={{ color: C.dim, fontSize: 12, letterSpacing: 1.5, marginTop: 22, marginBottom: 8 }}>## THE FIRST TURN</div>
              <p style={{ margin: 0 }}>
                The cycle begins at <span style={{ color: C.bright }}>Generation Station 64</span>, a German dig
                that breached an Element 115 deposit during the closing months of the Great War. Four
                soldiers \u2014 the men we will come to call <span style={{ color: C.bright }}>Primis</span> \u2014 are killed,
                brought back, and given a fragment of memory that does not belong to them.
              </p>
              <p>
                What they remember is the previous turn of the wheel: a moon shattered, a daughter trapped
                in a machine, a friend with a syringe. They do not have the words for any of it.
              </p>
              <div style={{ color: C.dim, fontSize: 12, letterSpacing: 1.5, marginTop: 22, marginBottom: 8 }}>## THE COST OF BREAKING IT</div>
              <p style={{ margin: 0 }}>
                By the time of Revelations, every variable that can be moved has been moved. The cycle
                does not end \u2014 it is <span style={{ color: C.bright }}>retired</span>. The new cycle, the Dark Aether era,
                begins on the same battlefield with none of the same actors and one new word for the same thing.
              </p>
              <p>
                That word is <span style={{ color: C.bright }}>Forsaken</span>, and it remembers everything.
              </p>

              <div style={{ marginTop: 22, color: C.dim }}>
                --<br />
                signed,<br />
                D/SIX<br />
                office of aetheric affairs \u00b7 14 sept 1991
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  // ─── TIMELINE ──────────────────────────────────────────────────────────
  function Timeline() {
    return (
      <div>
        <PageHead cmd="cat /aether/chrono/incidents.log" title="chronology" sub="Strict chronological order. Oldest first." />
        <div className="term-card" style={{ padding: 0 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '90px 110px 270px 1fr',
            padding: '10px 18px', borderBottom: `1px solid ${C.line}`,
            color: C.dim, fontSize: 11, letterSpacing: 2,
          }}>
            <span>YEAR</span><span>CODE</span><span>INCIDENT</span><span>REPORT</span>
          </div>
          {ZD.timeline.map((t, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 110px 270px 1fr',
              padding: '14px 18px',
              borderTop: i ? `1px dotted ${C.line}` : 0, alignItems: 'baseline',
            }}>
              <span style={{ color: C.bright, fontFamily: C.pixel, fontSize: 22, lineHeight: 1 }}>{t.year}</span>
              <span style={{ color: C.dim, fontSize: 12 }}>inc-{String(i + 1).padStart(3, '0')}</span>
              <span style={{ color: C.ink, fontWeight: 500 }}>{t.title}</span>
              <span style={{ color: C.dim, lineHeight: 1.55, fontSize: 13.5 }}>{t.body}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── RELICS ────────────────────────────────────────────────────────────
  function Relics({ setRoute }) {
    const items = [
      ['Templar Shard',     'citadelle'],
      ['Reliquary Coin',    'tomb'],
      ['Sentinel Fragment', 'forsaken'],
      ['Echoing Bell',      'terminus'],
      ['Spine of Ull',      'liberty'],
      ['Wreath of Krause',  'astro'],
      ['Vril Pendant',      'ashes'],
      ['Eye of Stachel',    'paradox'],
      ['Crown of Solais',   'totenreich'],
      ['Brand Mark',        'citadelle'],
      ['Carolingian Quill', 'tomb'],
      ['Bone of the First', 'astro'],
    ];
    return (
      <div>
        <PageHead cmd="grep -r class:RELIC /aether/sites/" title="relics" sub={items.length + ' artefacts catalogued.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {items.map(([name, where], i) => {
            const m = ZD.maps.find((x) => x.id === where);
            return (
              <div key={i} className="term-card" style={{ padding: 12 }}>
                <div style={{ color: C.dim, fontSize: 11, letterSpacing: 1.5 }}>r.{String(i + 1).padStart(3, '0')}</div>
                <Slot w="100%" h={120} label="OBJ" kind="artefact" style={{ marginTop: 8 }} />
                <div style={{ fontFamily: C.pixel, fontSize: 20, color: C.bright, marginTop: 10, lineHeight: 1 }}>{name}</div>
                <div style={{ color: C.dim, fontSize: 12, marginTop: 4 }}>
                  recovered \u00b7 {m ? <Link onClick={() => setRoute({ name: 'map', id: m.id })}>{m.name}</Link> : <span>\u2014</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── SEARCH ────────────────────────────────────────────────────────────
  function Search({ query, setRoute }) {
    const q = (query || '').toLowerCase();
    const hits = useMemo(() => {
      const out = [];
      ZD.maps.forEach((m) => {
        if (!q || m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q))
          out.push({ kind: 'site',    title: m.name, sub: m.tagline, route: { name: 'map', id: m.id } });
      });
      ZD.characters.forEach((c) => {
        if (!q || c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
          out.push({ kind: 'subject', title: c.name, sub: c.role,    route: { name: 'character', id: c.id } });
      });
      ZD.wonderWeapons.forEach((w) => {
        if (!q || w.name.toLowerCase().includes(q))
          out.push({ kind: 'object',  title: w.name, sub: w.summary, route: { name: 'home' } });
      });
      return out.slice(0, 14);
    }, [q]);

    return (
      <div>
        <PageHead cmd={'grep -ri "' + (query || '') + '" /aether'} title={'find: ' + (query || '\u2014')} sub={hits.length + ' result' + (hits.length === 1 ? '' : 's') + '.'} />
        <div className="term-card" style={{ padding: 0 }}>
          {hits.length === 0 && <div style={{ padding: 16, color: C.dim }}>(no matches)</div>}
          {hits.map((h, i) => (
            <button key={i} onClick={() => setRoute(h.route)}
              className="term-row"
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr auto',
                gap: 14, padding: '12px 18px', alignItems: 'baseline',
                background: 'transparent', border: 0, borderTop: i ? `1px dotted ${C.line}` : 0,
                font: 'inherit', color: C.ink, textAlign: 'left', cursor: 'pointer', width: '100%',
              }}>
              <span style={{ color: C.dim, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{h.kind}</span>
              <div>
                <div style={{ fontFamily: C.pixel, fontSize: 18, color: C.bright, lineHeight: 1 }}>{h.title}</div>
                <div style={{ color: C.dim, marginTop: 4, fontSize: 12.5 }}>{h.sub}</div>
              </div>
              <span style={{ color: C.dim, fontSize: 12 }}>open \u2192</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── ROUTER ────────────────────────────────────────────────────────────
  function Terminal({ mode, setMode }) {
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
      case 'games':       page = <Games setRoute={setRoute} />; break;
      case 'game':        page = <Game id={route.id} setRoute={setRoute} />; break;
      case 'maps':        page = <Maps setRoute={setRoute} />; break;
      case 'map':         page = <MapDetail id={route.id} setRoute={setRoute} />; break;
      case 'ee':          page = <EE setRoute={setRoute} />; break;
      case 'characters':  page = <Characters setRoute={setRoute} />; break;
      case 'character':   page = <CharacterDetail id={route.id} setRoute={setRoute} />; break;
      case 'lore':        page = <Lore />; break;
      case 'timeline':    page = <Timeline />; break;
      case 'relics':      page = <Relics setRoute={setRoute} />; break;
      case 'search':      page = <Search query={query} setRoute={setRoute} />; break;
      default:            page = <Home setRoute={setRoute} />;
    }
    return (
      <Shell route={route} setRoute={setRoute} query={query} setQuery={setQuery} mode={mode} setMode={setMode}>
        <div id="term-scroll">{page}</div>
      </Shell>
    );
  }

  window.Terminal = Terminal;
})();
