// PRIMARY DIRECTION — PACK-A-PUNCH
// In-character "Group 935 Archive": industrial, high-contrast, Element 115
// green + blood red + hazard yellow on warm black. Heavy condensed display
// type. Zero italics. Hash routing.

(function () {
  const { useState, useMemo, useEffect, useCallback } = React;
  const ZD = window.ZD;

  // ─── tokens ────────────────────────────────────────────────────────────
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
    e115:    '#9aff6e',          // Element 115 green
    e115dim: '#4a7a2c',
    e115bg:  'rgba(154, 255, 110, 0.08)',
    blood:   '#d62828',
    bloodH:  '#ef3a3a',
    hazard:  '#f5c518',
    hazardDim:'#9a7d10',
    display: '"Oswald", "Barlow Condensed", "Inter", sans-serif',
    sans:    '"IBM Plex Sans", "Inter", system-ui, sans-serif',
    mono:    '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
  };

  // ─── one-time global stylesheet ───────────────────────────────────────
  if (typeof document !== 'undefined' && !document.getElementById('pap-styles')) {
    const s = document.createElement('style');
    s.id = 'pap-styles';
    s.textContent = `
      .pap-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
      .pap-scroll::-webkit-scrollbar-track { background: ${T.bg0}; }
      .pap-scroll::-webkit-scrollbar-thumb { background: ${T.lineHi}; border: 2px solid ${T.bg0}; }
      .pap-scroll::-webkit-scrollbar-thumb:hover { background: ${T.e115dim}; }

      .pap-link { color: ${T.bone}; text-decoration: none; cursor: pointer; background: transparent; border: 0; font: inherit; padding: 0; }
      .pap-link:hover { color: ${T.e115}; }

      .pap-card { background: ${T.bg2}; border: 1px solid ${T.line}; transition: border-color .12s, transform .12s, background .12s; }
      .pap-card:hover { border-color: ${T.e115dim}; background: ${T.bg3}; }
      .pap-card-clickable { cursor: pointer; }
      .pap-card-clickable:hover { transform: translateY(-1px); }

      .pap-btn { font-family: ${T.display}; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; padding: 14px 22px; font-size: 13px; transition: background .12s, color .12s; border: 0; }
      .pap-btn-primary { background: ${T.e115}; color: ${T.bg0}; }
      .pap-btn-primary:hover { background: ${T.bone}; }
      .pap-btn-ghost { background: transparent; color: ${T.bone}; border: 1px solid ${T.lineHi}; }
      .pap-btn-ghost:hover { border-color: ${T.e115}; color: ${T.e115}; }
      .pap-btn-danger { background: ${T.blood}; color: ${T.bone}; }
      .pap-btn-danger:hover { background: ${T.bloodH}; }

      .pap-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; font-family: ${T.mono}; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; border: 1px solid ${T.line}; color: ${T.mute}; background: transparent; cursor: pointer; }
      .pap-chip:hover { color: ${T.bone}; border-color: ${T.lineHi}; }
      .pap-chip.is-active { color: ${T.e115}; border-color: ${T.e115dim}; background: ${T.e115bg}; }

      .pap-row { transition: background .08s; }
      .pap-row:hover { background: ${T.bg2}; }

      .pap-input { background: ${T.bg1}; border: 1px solid ${T.line}; color: ${T.bone}; padding: 9px 12px; font-family: ${T.mono}; font-size: 12.5px; outline: none; }
      .pap-input:focus { border-color: ${T.e115dim}; background: ${T.bg2}; }

      @keyframes pap-grain { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-3px,2px)} 50%{transform:translate(2px,-2px)} 75%{transform:translate(-1px,3px)} }
      @keyframes pap-blink { 50% { opacity: 0; } }
      @keyframes pap-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

      .pap-stencil { font-family: ${T.display}; font-weight: 700; letter-spacing: -0.5px; line-height: 0.92; text-transform: uppercase; }
      .pap-num { font-family: ${T.mono}; font-variant-numeric: tabular-nums; }

      .pap-stamp { display: inline-block; padding: 4px 10px 3px; border: 2px solid currentColor; font-family: ${T.display}; font-weight: 700; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; transform: rotate(-2deg); }
    `;
    document.head.appendChild(s);
  }

  // ─── primitives ────────────────────────────────────────────────────────

  // Image placeholder — uses gradient + sigil watermark, NOT diagonal lines.
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

  // Hazard stripe band — black + yellow diagonal
  const HazardStripe = ({ height = 14, style }) => (
    <div style={{
      height, width: '100%',
      backgroundImage: `repeating-linear-gradient(45deg, ${T.hazard} 0 14px, ${T.bg0} 14px 28px)`,
      ...style,
    }} aria-hidden />
  );

  // Tiny classification chip
  const Stamp = ({ children, tone = 'green', style }) => {
    const c = tone === 'red' ? T.blood : tone === 'yellow' ? T.hazard : tone === 'mute' ? T.mute : T.e115;
    return <span className="pap-stamp" style={{ color: c, ...style }}>{children}</span>;
  };

  const Mono = ({ children, color, size = 10.5, letter = 1.8, style }) => (
    <span style={{ fontFamily: T.mono, fontSize: size, letterSpacing: letter, textTransform: 'uppercase', color: color || T.mute, ...style }}>{children}</span>
  );

  // Difficulty bar — 5 segments, e115 green for filled, faint for empty
  const Difficulty = ({ value = 1, style }) => (
    <div style={{ display: 'inline-flex', gap: 3, alignItems: 'center', ...style }} aria-label={`Difficulty ${value} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ width: 12, height: 5, background: i < value ? T.e115 : T.line }} />
      ))}
    </div>
  );

  // Big numeric stat — display face, mono label
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
        {kicker && <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.e115, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>}
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

  // ─── shell ─────────────────────────────────────────────────────────────
  function Shell({ route, nav, query, setQuery, mode, setMode, children }) {
    const navItems = [
      { id: 'home',       label: 'Archive' },
      { id: 'games',      label: 'Sagas' },
      { id: 'maps',       label: 'Maps' },
      { id: 'characters', label: 'Crew' },
      { id: 'weapons',    label: 'Wonders' },
      { id: 'perks',      label: 'Perks' },
      { id: 'relics',     label: 'Relics' },
      { id: 'timeline',   label: 'Chronicle' },
      { id: 'lore',       label: 'Lore' },
    ];

    const now = useNow();

    return (
      <div style={{ background: T.bg0, color: T.bone, fontFamily: T.sans, minHeight: '100%', position: 'relative' }}>
        {/* film grain overlay */}
        <div aria-hidden style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50,
          opacity: 0.06, mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
          animation: 'pap-grain 1.4s steps(4) infinite',
        }} />

        {/* classification strip */}
        <div style={{ background: T.bg1, borderBottom: `1px solid ${T.line}`, position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '7px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.8, color: T.faint, textTransform: 'uppercase' }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
              <span style={{ color: T.blood, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, background: T.blood, animation: 'pap-blink 1.4s steps(2) infinite' }} />
                Declassified
              </span>
              <span>Doc 7-G935 · Annot. Requiem · 1991</span>
              <span style={{ color: T.mute, whiteSpace: 'nowrap' }}>Clearance: Agent</span>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span>{now}</span>
              <span>group935.net</span>
            </div>
          </div>
        </div>

        <HazardStripe height={4} />

        {/* main header */}
        <header style={{ borderBottom: `1px solid ${T.line}`, background: `linear-gradient(180deg, ${T.bg1} 0%, ${T.bg0} 100%)` }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* logo */}
            <button onClick={() => nav({ name: 'home' })} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }}>
              <Monogram />
              <div style={{ textAlign: 'left' }}>
                <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, letterSpacing: 1.2 }}>
                  Group 935 <span style={{ color: T.e115 }}>//</span> Archive
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2.5, color: T.faint, marginTop: 2 }}>
                  ELEMENT 115 · OPERATIONS DATABASE · NO. {dossierNo()}
                </div>
              </div>
            </button>

            {/* nav */}
            <nav style={{ display: 'flex', gap: 2, marginLeft: 14, flexWrap: 'wrap' }}>
              {navItems.map((n) => {
                const active = route.name === n.id || (n.id === 'maps' && (route.name === 'map' || route.name === 'ee')) || (n.id === 'characters' && route.name === 'character') || (n.id === 'games' && route.name === 'game');
                return (
                  <button key={n.id} onClick={() => nav({ name: n.id })}
                    style={{
                      background: active ? T.e115bg : 'transparent',
                      border: 0,
                      borderBottom: active ? `2px solid ${T.e115}` : '2px solid transparent',
                      color: active ? T.e115 : T.mute,
                      padding: '8px 12px',
                      fontFamily: T.display, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = T.bone; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = T.mute; }}
                  >{n.label}</button>
                );
              })}
            </nav>

            <div style={{ flex: 1 }} />

            {/* search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, padding: '4px 10px 4px 12px', background: T.bg1, minWidth: 230 }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke={T.mute} strokeWidth="1.4"><circle cx="5" cy="5" r="3.5"/><path d="M8 8l3 3"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') nav({ name: 'search' }); }}
                placeholder="search the archive…"
                style={{ background: 'transparent', border: 0, outline: 'none', color: T.bone, fontFamily: T.mono, fontSize: 11.5, width: '100%' }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.faint, border: `1px solid ${T.line}`, padding: '1px 5px' }}>/</span>
            </div>

            {/* mode toggle */}
            <ModeToggle mode={mode} setMode={setMode} />
          </div>
        </header>

        <main style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 56px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>

        {/* footer */}
        <footer style={{ borderTop: `1px solid ${T.line}`, marginTop: 32, background: T.bg1 }}>
          <HazardStripe height={6} style={{ opacity: 0.85 }} />
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
            <div>
              <div className="pap-stencil" style={{ fontSize: 22, color: T.bone }}>Group 935 <span style={{ color: T.e115 }}>//</span> Archive</div>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.55, marginTop: 10, maxWidth: 380 }}>
                A reader's database for every map, Easter egg, relic, and operative
                across the entire Treyarch Zombies canon — World at War through
                Black Ops 7 <em style={{ fontStyle: 'normal', color: T.bone }}>Totenreich</em>.
              </p>
              <div style={{ marginTop: 14, fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.faint, textTransform: 'uppercase' }}>
                group935.net · doc {dossierNo()}
              </div>
            </div>
            <FooterCol title="Archive" links={[['Sagas','games'],['Maps','maps'],['Crew','characters']]} nav={nav} />
            <FooterCol title="Reference" links={[['Wonder Weapons','weapons'],['Perks','perks'],['Relics','relics']]} nav={nav} />
            <FooterCol title="Reading" links={[['Chronicle','timeline'],['Lore','lore'],['About','about']]} nav={nav} />
          </div>
          <div style={{ borderTop: `1px solid ${T.line}`, padding: '14px 32px', maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', fontFamily: T.mono, fontSize: 10, letterSpacing: 1.8, color: T.faint, textTransform: 'uppercase' }}>
            <div>Fan project. Not affiliated with Activision or Treyarch. All trademarks belong to their owners.</div>
            <div>Compiled 2025 — Annot. Requiem</div>
          </div>
        </footer>
      </div>
    );
  }

  function FooterCol({ title, links, nav }) {
    return (
      <div>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.e115, textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map(([label, page]) => (
            <button key={page} onClick={() => nav({ name: page })}
              className="pap-link"
              style={{ fontFamily: T.display, fontSize: 15, fontWeight: 500, letterSpacing: 1, color: T.bone, textAlign: 'left', textTransform: 'uppercase' }}>
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function Monogram() {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
        <rect x="2" y="2" width="44" height="44" fill={T.bg0} stroke={T.e115} strokeWidth="2"/>
        <text x="24" y="20" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="11" fontWeight="700" fill={T.e115} letterSpacing="1">G·935</text>
        <line x1="6" y1="26" x2="42" y2="26" stroke={T.line} strokeWidth="1"/>
        <text x="24" y="38" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill={T.mute} letterSpacing="1.5">ELEMENT 115</text>
      </svg>
    );
  }

  function ModeToggle({ mode, setMode }) {
    return (
      <div style={{ display: 'flex', border: `1px solid ${T.line}`, background: T.bg1 }}>
        {['field','terminal'].map((m) => (
          <button key={m} onClick={() => setMode(m)} title={m === 'field' ? 'Field view' : 'Terminal view'}
            style={{
              background: mode === m ? T.e115 : 'transparent',
              color: mode === m ? T.bg0 : T.mute,
              border: 0, padding: '8px 12px',
              fontFamily: T.display, fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer',
            }}>{m === 'field' ? 'Field' : 'TTY'}</button>
        ))}
      </div>
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
    return `${pad(d.getDate())} ${mon} · ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  function dossierNo() {
    // deterministic-feeling code
    return '2025·VII·' + (new Date().toISOString().slice(2,10).replace(/-/g,'')).slice(0,4);
  }

  // ────────────────────────────────────────────────────────────────────────
  // PAGES
  // ────────────────────────────────────────────────────────────────────────

  // ─── HOME ──────────────────────────────────────────────────────────────
  function Home({ nav }) {
    const featured = ZD.maps.find((m) => m.id === 'citadelle');
    const featuredGame = ZD.games.find((g) => g.id === featured.game);
    const totalRelics = ZD.maps.reduce((a, m) => a + (m.relicCount || 0), 0);
    const totalEE = ZD.maps.reduce((a, m) => a + (m.eeCount || 0), 0);
    return (
      <div>
        {/* hero */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 36, marginBottom: 56, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
              <Stamp tone="red">Classified — Eyes Only</Stamp>
              <Mono color={T.mute}>Vol. VII · 2008–2025</Mono>
            </div>
            <h1 className="pap-stencil" style={{ fontSize: 112, color: T.bone, margin: 0 }}>
              Element <span style={{ color: T.e115 }}>115</span><br />
              <span style={{ color: T.bone }}>field manual.</span>
            </h1>
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.mute, lineHeight: 1.55, maxWidth: 560, marginTop: 22 }}>
              Every Treyarch Zombies map — World at War through Black Ops 7 <strong style={{ color: T.bone, fontWeight: 600 }}>Totenreich</strong> —
              catalogued with full Easter egg walkthroughs, wonder weapon notes, relic locations,
              perk references, and a chronological reading of the lore.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <button className="pap-btn pap-btn-primary" onClick={() => nav({ name: 'maps' })}>Enter the Maps →</button>
              <button className="pap-btn pap-btn-ghost" onClick={() => nav({ name: 'timeline' })}>Read the Chronicle</button>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 36, paddingTop: 22, borderTop: `1px solid ${T.line}` }}>
              <BigStat value={ZD.games.length} label="Sagas" tone="green" />
              <BigStat value={ZD.maps.length} label="Maps" tone="green" />
              <BigStat value={totalEE} label="Main EEs" tone="yellow" />
              <BigStat value={totalRelics} label="Relics" tone="red" />
            </div>
          </div>

          {/* hero side panel */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -8, right: -8, width: 'calc(100% + 16px)', height: 'calc(100% + 16px)', border: `1px solid ${T.e115dim}`, pointerEvents: 'none' }} />
            <Slot w="100%" h="100%" label={featured.name} tone="green" kind="INTEL ▌ FEATURE" style={{ minHeight: 480 }} />
            <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, background: T.bg0, padding: 18, border: `1px solid ${T.lineHi}` }}>
              <Mono color={T.e115}>★ Featured Intel · {featuredGame.code} {featuredGame.year}</Mono>
              <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>{featured.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 4 }}>{featured.tagline}</div>
              <button className="pap-btn pap-btn-ghost" style={{ marginTop: 14, padding: '10px 16px', fontSize: 11.5 }} onClick={() => nav({ name: 'map', id: featured.id })}>
                Open dossier →
              </button>
            </div>
          </div>
        </section>

        {/* Sagas grid */}
        <section style={{ marginBottom: 56 }}>
          <SectionHead kicker="The Eight Sagas" title="Pick a chapter" action={
            <button className="pap-btn pap-btn-ghost" style={{ padding: '10px 16px', fontSize: 11 }} onClick={() => nav({ name: 'games' })}>All sagas →</button>
          } />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {ZD.games.map((g) => <SagaTile key={g.id} game={g} nav={nav} />)}
          </div>
        </section>

        {/* split — featured EE + crew preview */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, marginBottom: 56 }}>
          <FeaturedEE nav={nav} />
          <CrewPreview nav={nav} />
        </section>

        {/* recent intel */}
        <section style={{ marginBottom: 24 }}>
          <SectionHead kicker="Most recent intel" title="Latest from the Aether" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {ZD.maps.filter((m) => m.game === 'bo7').map((m) => <MapCard key={m.id} map={m} nav={nav} />)}
          </div>
        </section>
      </div>
    );
  }

  function SagaTile({ game, nav }) {
    const mapsIn = ZD.maps.filter((m) => m.game === game.id);
    return (
      <button onClick={() => nav({ name: 'game', id: game.id })} className="pap-card pap-card-clickable"
        style={{ padding: 18, textAlign: 'left', color: T.bone, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Mono color={T.e115} letter={2}>{game.code} · {game.year}</Mono>
          <Mono color={T.faint}>{mapsIn.length}/{game.mapCount}</Mono>
        </div>
        <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, marginTop: 12, lineHeight: 1.05 }}>{game.title}</div>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.mute, marginTop: 6 }}>{game.era}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 14 }}>
          {mapsIn.slice(0, 3).map((m) => (
            <span key={m.id} style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.2, color: T.mute, padding: '2px 6px', background: T.bg1, border: `1px solid ${T.line}`, textTransform: 'uppercase' }}>{m.name.replace(/ /g,' ').split(' ').slice(0,2).join(' ')}</span>
          ))}
          {mapsIn.length > 3 && <Mono color={T.faint}>+{mapsIn.length - 3}</Mono>}
        </div>
      </button>
    );
  }

  function FeaturedEE({ nav }) {
    const ee = ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    return (
      <div className="pap-card" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
        <Slot w="100%" h={220} label={ee.title} kind="EASTER EGG" tone="red" />
        <div style={{ padding: 22 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
            <Stamp tone="red">Main Quest</Stamp>
            <Mono color={T.mute}>{m.name} · {ee.difficulty} · {ee.duration}</Mono>
          </div>
          <div className="pap-stencil" style={{ fontSize: 32, color: T.bone }}>{ee.title}</div>
          <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute, lineHeight: 1.55, marginTop: 10 }}>{ee.summary}</p>
          <button className="pap-btn pap-btn-primary" style={{ marginTop: 16, padding: '11px 18px', fontSize: 12 }}
            onClick={() => nav({ name: 'ee', id: ee.id })}>
            Open walkthrough →
          </button>
        </div>
      </div>
    );
  }

  function CrewPreview({ nav }) {
    return (
      <div className="pap-card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <Mono color={T.e115} letter={2.5}>Personnel</Mono>
            <div className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 6 }}>The Crew</div>
          </div>
          <button className="pap-link" onClick={() => nav({ name: 'characters' })}
            style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2, color: T.e115, textTransform: 'uppercase' }}>All →</button>
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column' }}>
          {ZD.characters.slice(0, 5).map((c) => (
            <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })}
              className="pap-row"
              style={{
                display: 'grid', gridTemplateColumns: '54px 1fr auto', gap: 14, alignItems: 'center',
                padding: '10px 6px', background: 'transparent', border: 0, borderBottom: `1px solid ${T.line}`,
                cursor: 'pointer', color: T.bone, textAlign: 'left',
              }}>
              <Slot w={54} h={54} label="" kind={c.id.slice(0,3).toUpperCase()} tone="green" />
              <div>
                <div className="pap-stencil" style={{ fontSize: 17, color: T.bone, letterSpacing: 0.5 }}>{c.name}</div>
                <Mono color={T.faint}>{c.role}</Mono>
              </div>
              <span style={{ color: T.e115, fontFamily: T.mono, fontSize: 14 }}>›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── GAMES INDEX ──────────────────────────────────────────────────────
  function Games({ nav }) {
    return (
      <div>
        <PageHead crumbs={[{label:'Archive',to:{name:'home'}},{label:'Sagas'}]}
          kicker="The Eight Sagas"
          title="Twenty years, three timelines, one wheel."
          sub="From Nacht der Untoten to Totenreich — all eight Treyarch entries arranged in canon order. Each opens to its maps." nav={nav} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 32 }}>
          {ZD.games.map((g) => {
            const mapsIn = ZD.maps.filter((m) => m.game === g.id);
            return (
              <button key={g.id} onClick={() => nav({ name: 'game', id: g.id })} className="pap-card pap-card-clickable"
                style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: 0, color: T.bone, textAlign: 'left' }}>
                <Slot w={180} h={200} label={g.code} kind={'SAGA · ' + g.year} tone="green" style={{ borderRight: `1px solid ${T.line}` }} />
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
                  <Mono color={T.e115} letter={2}>{g.code} · {g.year}</Mono>
                  <div className="pap-stencil" style={{ fontSize: 30, color: T.bone, marginTop: 6 }}>{g.title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, marginTop: 4 }}>{g.era}</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    {mapsIn.map((m) => (
                      <span key={m.id} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, color: T.mute, padding: '3px 8px', background: T.bg1, border: `1px solid ${T.line}`, textTransform: 'uppercase' }}>{m.name}</span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── GAME DETAIL ──────────────────────────────────────────────────────
  function Game({ id, nav }) {
    const g = ZD.games.find((x) => x.id === id);
    if (!g) return <NotFound nav={nav} what="Saga" />;
    const mapsIn = ZD.maps.filter((m) => m.game === id);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Sagas',to:{name:'games'}},{label:g.title}]}
          kicker={g.code + ' · ' + g.year + ' · ' + g.era}
          title={g.title}
          sub={`${mapsIn.length} of ${g.mapCount} maps catalogued in this saga.`}
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 32 }}>
          {mapsIn.map((m) => <MapCard key={m.id} map={m} nav={nav} />)}
        </div>
      </div>
    );
  }

  // ─── MAPS INDEX ───────────────────────────────────────────────────────
  function Maps({ nav, initialFilter }) {
    const [filter, setFilter] = useState(initialFilter || 'all');
    const [sort, setSort] = useState('canon');
    const list = useMemo(() => {
      let l = filter === 'all' ? ZD.maps : ZD.maps.filter((m) => m.game === filter);
      if (sort === 'difficulty') l = [...l].sort((a, b) => b.difficulty - a.difficulty);
      if (sort === 'name')       l = [...l].sort((a, b) => a.name.localeCompare(b.name));
      return l;
    }, [filter, sort]);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Maps'}]}
          kicker={`${ZD.maps.length} catalogued sites`}
          title="All Maps"
          sub="Every Treyarch Zombies map in canon order. Filter by saga, sort by canon, name, or difficulty."
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
            {[['canon','Canon'],['name','Name'],['difficulty','Diff']].map(([k,l]) => (
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
        <Slot w="100%" h={180} label={map.name} kind={g.code + ' · ' + g.year} tone="green" />
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Mono color={T.e115}>{g.code} · {g.year}</Mono>
            <Difficulty value={map.difficulty} />
          </div>
          <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 10 }}>{map.name}</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 4 }}>{map.tagline}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 14, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: T.blood }} />
              <Mono color={T.mute}>{map.eeCount} EE</Mono>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: T.hazard }} />
              <Mono color={T.mute}>{map.relicCount} Relics</Mono>
            </span>
            <span style={{ flex: 1 }} />
            <Mono color={T.e115}>Open ›</Mono>
          </div>
        </div>
      </button>
    );
  }

  // ─── MAP DETAIL ───────────────────────────────────────────────────────
  function MapDetail({ id, nav }) {
    const m = ZD.maps.find((x) => x.id === id);
    if (!m) return <NotFound nav={nav} what="Map" />;
    const g = ZD.games.find((x) => x.id === m.game);
    const hasEE = m.eeCount > 0;
    const ee = hasEE ? (ZD.sampleEE.map === m.id ? ZD.sampleEE : null) : null;

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Maps',to:{name:'maps'}},{label:m.name}]}
          kicker={g.code + ' · ' + g.year + ' · ' + g.era}
          title={m.name}
          sub={m.tagline}
          nav={nav}
        />

        {/* hero strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginTop: 28 }}>
          <Slot w="100%" h={400} label={m.name} kind="SITE · IMAGERY" tone="green" />
          <div className="pap-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <Mono color={T.e115}>Intel Sheet</Mono>
            <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 6 }}>Site Brief</div>

            <IntelRow label="Designation" value={m.name} />
            <IntelRow label="Saga" value={g.title + ' · ' + g.code} />
            <IntelRow label="Location" value={m.location} />
            <IntelRow label="Threat Level" value={<Difficulty value={m.difficulty} />} />
            <IntelRow label="Main Quest" value={hasEE ? '1 catalogued' : 'None catalogued'} tone={hasEE ? 'green' : 'mute'} />
            <IntelRow label="Relics" value={m.relicCount > 0 ? m.relicCount + ' hidden' : '—'} tone={m.relicCount > 0 ? 'yellow' : 'mute'} />

            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {(m.tags || []).map((t) => (
                <span key={t} style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2, color: T.e115, padding: '3px 8px', background: T.e115bg, border: `1px solid ${T.e115dim}`, textTransform: 'uppercase' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* summary */}
        <section style={{ marginTop: 40 }}>
          <SectionHead kicker="Site Brief" title="Operational summary" />
          <p style={{ fontFamily: T.sans, fontSize: 17, color: T.bone, lineHeight: 1.7, maxWidth: 780 }}>{m.summary}</p>
        </section>

        {/* main EE */}
        <section style={{ marginTop: 40 }}>
          <SectionHead kicker={hasEE ? 'Primary Easter Egg' : 'No primary quest catalogued'} title="Main Quest" />
          {hasEE && ee ? (
            <button onClick={() => nav({ name: 'ee', id: ee.id })} className="pap-card pap-card-clickable"
              style={{ display: 'grid', gridTemplateColumns: '220px 1fr auto', alignItems: 'stretch', padding: 0, width: '100%', color: T.bone, textAlign: 'left' }}>
              <Slot w={220} h={180} label="EE" kind="MAIN QUEST" tone="red" />
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Stamp tone="red">{ee.difficulty}</Stamp>
                  <Mono color={T.mute}>{ee.duration} · {ee.party}</Mono>
                </div>
                <div className="pap-stencil" style={{ fontSize: 28, color: T.bone, marginTop: 10 }}>{ee.title}</div>
                <div style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, marginTop: 6, maxWidth: 540 }}>{ee.summary}</div>
              </div>
              <div style={{ alignSelf: 'center', padding: '0 28px' }}>
                <Mono color={T.e115} size={13} letter={2.5}>Begin →</Mono>
              </div>
            </button>
          ) : hasEE ? (
            <ComingSoon what="Full walkthrough" />
          ) : (
            <div className="pap-card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
              <Stamp tone="mute">Classic Era</Stamp>
              <div style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute }}>No main quest catalogued for this site. This is a pure-survival map.</div>
            </div>
          )}
        </section>

        {/* relics */}
        {m.relicCount > 0 && (
          <section style={{ marginTop: 40 }}>
            <SectionHead kicker={m.relicCount + ' relics on site'} title="Relics" />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(m.relicCount, 6)}, 1fr)`, gap: 12 }}>
              {Array.from({ length: m.relicCount }).map((_, i) => (
                <div key={i} className="pap-card" style={{ padding: 16, textAlign: 'center', position: 'relative' }}>
                  <Mono color={T.hazard}>№ {String(i + 1).padStart(2, '0')}</Mono>
                  <div style={{ margin: '14px auto', width: 44, height: 44, border: `1px solid ${T.lineHi}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.hazard, fontFamily: T.display, fontSize: 18, fontWeight: 700 }}>R</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: T.mute }}>Location TBC</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.faint, marginTop: 12, letterSpacing: 1 }}>
              Individual relic write-ups arriving with the next archive sync.
            </div>
          </section>
        )}

        {/* characters */}
        <section style={{ marginTop: 40 }}>
          <SectionHead kicker="Personnel present" title="On site" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {pickCharactersForMap(m).map((c) => (
              <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })} className="pap-card pap-card-clickable"
                style={{ padding: 14, color: T.bone, textAlign: 'left' }}>
                <Slot w="100%" h={140} label={c.name.split(' ').slice(-1)[0]} kind="OPERATIVE" tone="green" />
                <div className="pap-stencil" style={{ fontSize: 17, color: T.bone, marginTop: 10 }}>{c.name}</div>
                <Mono color={T.faint}>{c.role}</Mono>
              </button>
            ))}
          </div>
        </section>

        {/* other maps in this saga */}
        <section style={{ marginTop: 40 }}>
          <SectionHead kicker="Other sites in this saga" title="Continue" action={
            <button className="pap-btn pap-btn-ghost" style={{ padding: '8px 14px', fontSize: 11 }}
              onClick={() => nav({ name: 'game', id: g.id })}>All in {g.code} →</button>
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
    // simple heuristic: map era → crew. Real linking lives in the data file.
    if (['waw','bo1','bo2','bo3'].includes(m.game)) return ZD.characters.filter((c) => ['dempsey','nikolai','takeo','richtofen','samantha','maxis'].includes(c.id));
    return ZD.characters.filter((c) => ['maya','weaver','richtofen','samantha'].includes(c.id));
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
        <Stamp tone="yellow">Awaiting Sync</Stamp>
        <div style={{ fontFamily: T.sans, fontSize: 14.5, color: T.mute }}>{what} arriving with the next archive update.</div>
      </div>
    );
  }

  // ─── EE WALKTHROUGH ───────────────────────────────────────────────────
  function EEPage({ id, nav }) {
    const ee = id && ZD.sampleEE.id === id ? ZD.sampleEE : ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const g = ZD.games.find((x) => x.id === m.game);
    const [completed, setCompleted] = useState(() => new Set());
    const [active, setActive] = useState(0);

    const toggle = (n) => setCompleted((s) => {
      const ns = new Set(s);
      if (ns.has(n)) ns.delete(n); else ns.add(n);
      return ns;
    });

    const advance = () => {
      toggle(ee.steps[active].n);
      if (active < ee.steps.length - 1) setActive(active + 1);
    };

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Maps',to:{name:'maps'}},{label:m.name,to:{name:'map',id:m.id}},{label:ee.title}]}
          kicker={'Main Quest · ' + m.name + ' · ' + g.code}
          title={ee.title}
          sub={ee.summary}
          nav={nav}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <Stamp tone="red">{ee.difficulty}</Stamp>
          <Stamp tone="yellow">{ee.duration}</Stamp>
          <Stamp tone="green">{ee.party}</Stamp>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, marginTop: 36 }}>
          {/* rail */}
          <div>
            <Mono color={T.e115} letter={2.5}>Progress · {completed.size}/{ee.steps.length}</Mono>
            <div style={{ height: 4, background: T.line, marginTop: 10, marginBottom: 18, position: 'relative' }}>
              <div style={{ height: '100%', background: T.e115, width: `${(completed.size/ee.steps.length)*100}%`, transition: 'width .2s' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 16, top: 14, bottom: 14, width: 1, background: T.line }} />
              {ee.steps.map((s, i) => {
                const done = completed.has(s.n);
                const isActive = i === active;
                return (
                  <button key={s.n} onClick={() => setActive(i)}
                    style={{
                      display: 'grid', gridTemplateColumns: '34px 1fr', gap: 12, alignItems: 'flex-start',
                      width: '100%', padding: '10px 0', background: 'transparent', border: 0,
                      cursor: 'pointer', textAlign: 'left', color: T.bone, position: 'relative',
                    }}>
                    <span onClick={(e) => { e.stopPropagation(); toggle(s.n); }} style={{
                      width: 34, height: 34, flexShrink: 0,
                      border: `1.5px solid ${done ? T.e115 : isActive ? T.bone : T.lineHi}`,
                      background: done ? T.e115 : T.bg0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.display, fontSize: 14, fontWeight: 700,
                      color: done ? T.bg0 : isActive ? T.bone : T.mute,
                    }}>
                      {done ? '✓' : String(s.n).padStart(2,'0')}
                    </span>
                    <div style={{ paddingTop: 6 }}>
                      <Mono color={isActive ? T.e115 : T.faint}>{`Step ${s.n}`}</Mono>
                      <div className="pap-stencil" style={{ fontSize: 16, color: isActive ? T.bone : T.mute, marginTop: 2, textDecoration: done ? 'line-through' : 'none' }}>{s.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* active panel */}
          <div>
            <Slot w="100%" h={300} label={`Step ${ee.steps[active].n} — ${ee.steps[active].title}`} kind={'STEP ' + ee.steps[active].n} tone="red" />
            <div style={{ marginTop: 22 }}>
              <Mono color={T.e115} letter={2.5}>Step {ee.steps[active].n} of {ee.steps.length}</Mono>
              <h2 className="pap-stencil" style={{ fontSize: 38, color: T.bone, margin: '8px 0 14px' }}>{ee.steps[active].title}</h2>
              <p style={{ fontFamily: T.sans, fontSize: 16.5, color: T.bone, lineHeight: 1.7, maxWidth: 660 }}>{ee.steps[active].body}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
              <button className="pap-btn pap-btn-ghost" disabled={active === 0} onClick={() => setActive(active - 1)} style={{ opacity: active === 0 ? 0.4 : 1 }}>← Previous</button>
              <button className="pap-btn pap-btn-primary" onClick={advance}>{completed.has(ee.steps[active].n) ? 'Next step →' : 'Mark complete →'}</button>
            </div>

            <div style={{ marginTop: 36, padding: 18, background: T.bg1, border: `1px solid ${T.line}` }}>
              <Mono color={T.hazard} letter={2.5}>Rewards on completion</Mono>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {ee.rewards.map((r) => <Stamp key={r} tone="yellow">{r}</Stamp>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── CHARACTERS ───────────────────────────────────────────────────────
  function Characters({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Crew'}]}
          kicker="Personnel — All sides"
          title="The Crew"
          sub="Every named operative across all three timelines: Ultimis, Primis, and the Dark Aether era."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 28 }}>
          {ZD.characters.map((c) => (
            <button key={c.id} onClick={() => nav({ name: 'character', id: c.id })} className="pap-card pap-card-clickable"
              style={{ padding: 0, color: T.bone, textAlign: 'left' }}>
              <Slot w="100%" h={260} label={c.name} kind="OPERATIVE" tone="green" />
              <div style={{ padding: 16 }}>
                <Mono color={T.e115}>{c.role}</Mono>
                <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 6 }}>{c.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 6, lineHeight: 1.5, fontStyle: 'normal' }}>"{c.quote}"</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function CharacterDetail({ id, nav }) {
    const c = ZD.characters.find((x) => x.id === id);
    if (!c) return <NotFound nav={nav} what="Operative" />;
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
            <Slot w={380} h={480} label={c.name} kind="DOSSIER" tone="green" />
            <div style={{ marginTop: 18, padding: 16, background: T.bg1, border: `1px solid ${T.line}` }}>
              <IntelRow label="Origin" value={c.origin} />
              <IntelRow label="Role" value={c.role} />
              <IntelRow label="Status" value="Active" tone="green" />
            </div>
          </div>
          <div>
            <div style={{ borderLeft: `3px solid ${T.e115}`, paddingLeft: 22, marginBottom: 28 }}>
              <Mono color={T.e115}>On record</Mono>
              <div className="pap-stencil" style={{ fontSize: 36, color: T.bone, marginTop: 8, lineHeight: 1.1 }}>"{c.quote}"</div>
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.bone, lineHeight: 1.7 }}>{c.summary}</p>

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

  // ─── WONDER WEAPONS ───────────────────────────────────────────────────
  function WonderWeapons({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Wonder Weapons'}]}
          kicker="Catalogued Aetheric Ordinance"
          title="Wonder Weapons"
          sub="Group 935 prototypes, Soviet derivatives, and Aether-era successors. Each entry pinned to its origin site."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 32 }}>
          {ZD.wonderWeapons.map((w, i) => (
            <div key={w.id} className="pap-card" style={{ padding: 22, display: 'grid', gridTemplateColumns: '90px 1fr', gap: 18 }}>
              <Slot w={90} h={110} label={String(i+1).padStart(2,'0')} kind="WW" tone="green" />
              <div>
                <Mono color={T.e115}>{w.map}</Mono>
                <div className="pap-stencil" style={{ fontSize: 24, color: T.bone, marginTop: 4 }}>{w.name}</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, lineHeight: 1.55, marginTop: 8 }}>{w.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── PERKS ────────────────────────────────────────────────────────────
  function Perks({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Perks'}]}
          kicker="Vending Anomalies"
          title="Perk-a-Cola"
          sub="The cans that keep you upright. Buy Juggernog first. Buy Mule Kick last. Never skip Quick Revive in solo."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 32 }}>
          {ZD.perks.map((p, i) => (
            <div key={p.id} className="pap-card" style={{ padding: 20 }}>
              <div style={{ width: 56, height: 80, margin: '0 auto', background: `linear-gradient(180deg, ${T.bg3} 0%, ${T.bg0} 100%)`, border: `1px solid ${T.lineHi}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.display, fontWeight: 800, fontSize: 18, color: T.e115, letterSpacing: 1 }}>
                {p.id.toUpperCase().slice(0, 3)}
              </div>
              <div className="pap-stencil" style={{ fontSize: 18, color: T.bone, marginTop: 16, textAlign: 'center' }}>{p.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.e115, marginTop: 6, textAlign: 'center' }}>{p.tagline}</div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, lineHeight: 1.55, marginTop: 12 }}>{p.summary}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── TIMELINE ─────────────────────────────────────────────────────────
  function Timeline({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Chronicle'}]}
          kicker="Canonical Sequence"
          title="The Chronicle"
          sub="From the Templar dig of 1294 to the new Richtofen briefing of 1991 — the order of events as compiled from cross-referenced field intel."
          nav={nav}
        />
        <div style={{ position: 'relative', marginTop: 48, paddingLeft: 40 }}>
          <div style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 2, background: `linear-gradient(to bottom, ${T.e115}, ${T.hazard}, ${T.blood})` }} />
          {ZD.timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 36 }}>
              <div style={{ position: 'absolute', left: -40, top: 6, width: 24, height: 24, background: T.bg0, border: `2px solid ${i < 7 ? T.e115 : T.blood}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.mono, fontSize: 9, color: T.bone }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, alignItems: 'baseline' }}>
                <div className="pap-stencil pap-num" style={{ fontSize: 36, color: i < 7 ? T.e115 : T.blood }}>{t.year}</div>
                <div>
                  <div className="pap-stencil" style={{ fontSize: 22, color: T.bone }}>{t.title}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.mute, lineHeight: 1.65, marginTop: 6, maxWidth: 700 }}>{t.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── RELICS ───────────────────────────────────────────────────────────
  function Relics({ nav }) {
    const relicMaps = ZD.maps.filter((m) => m.relicCount > 0);
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Relics'}]}
          kicker="Aetheric Fragments"
          title="Relics of the Cycle"
          sub="Hidden across every Dark Aether-era map. Counted, not yet individually catalogued — the next archive sync will name them."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
          {relicMaps.map((m) => {
            const g = ZD.games.find((x) => x.id === m.game);
            return (
              <button key={m.id} onClick={() => nav({ name: 'map', id: m.id })} className="pap-card pap-card-clickable"
                style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, color: T.bone, textAlign: 'left' }}>
                <div>
                  <Mono color={T.e115}>{g.code} · {g.year}</Mono>
                  <div className="pap-stencil" style={{ fontSize: 22, color: T.bone, marginTop: 6 }}>{m.name}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mute, marginTop: 4 }}>{m.location}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="pap-stencil pap-num" style={{ fontSize: 44, color: T.hazard, lineHeight: 1 }}>{String(m.relicCount).padStart(2,'0')}</div>
                  <Mono color={T.faint}>Relics</Mono>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── LORE INDEX + ARTICLE ─────────────────────────────────────────────
  function Lore({ nav }) {
    const articles = [
      ['origin-cycle','On the Origin Cycle','Why Maxis keeps starting over.','Reading the loop, its breakers, and the cost of breaking it.'],
      ['sentinel','The Sentinel Artifact','A piece of the Forsaken in a CIA briefcase.','How one object connects three eras.'],
      ['order','The Order of the Templar','Element 115 in 1294.','The dig at Alsace and the relics they buried.'],
      ['mpd','Samantha and the MPD','How a girl became the keeper of the Aether.','And why she let her father out.'],
      ['115','On Element 115','The cosmic metal at the centre of everything.','Properties, sources, and the people it has made dangerous.'],
      ['groups','Group 935 vs. Division 9','Two halves of the same compromise.','Maxis in Germany, Kawasaki in the Pacific.'],
    ];
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Lore'}]}
          kicker="Long-form readings"
          title="Lore"
          sub="Annotated essays that follow a single thread across multiple maps and decades."
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
                <Mono color={T.e115}>Read →</Mono>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function LoreArticle({ id, nav }) {
    // single article we have rich content for; others show "coming soon" shell
    const articles = {
      'origin-cycle': {
        title: 'On the Origin Cycle',
        kicker: 'Reading the loop',
        pull: 'No matter how many times we run this, the ending is always the same. The difference is what gets dragged into it.',
        sections: [
          ['The First Turn', 'The cycle begins at Generation Station 64, a German dig that breached an Element 115 deposit during the closing months of the Great War. Four soldiers — the men we will come to call Primis — are killed, brought back, and given a fragment of memory that does not belong to them. What they remember is the previous turn of the wheel: a moon shattered, a daughter trapped in a machine, a friend with a syringe. They do not have the words for any of it.'],
          ['The Conductor', 'Dr. Maxis is the closest thing the loop has to a narrator, and even he does not control the rotation. He is only the one who keeps the lights on between turns. By Revelations he is exhausted, a voice in the static of a transmitter that should not still be on the air.'],
          ['The Cost of Breaking It', 'By the time of Revelations, every variable that can be moved has been moved. The cycle does not end — it is retired. The new cycle, the Dark Aether era, begins on the same battlefield with none of the same actors and one new word for the same thing. That word is Forsaken, and it remembers everything.'],
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
                "{a.pull}"
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

  // ─── SEARCH ───────────────────────────────────────────────────────────
  function Search({ query, nav }) {
    const q = (query || '').toLowerCase().trim();
    const hits = useMemo(() => {
      if (!q) return [];
      const out = [];
      ZD.maps.forEach((m) => {
        if (m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q) || (m.tags || []).some((t) => t.includes(q)))
          out.push({ kind: 'map', id: m.id, title: m.name, sub: m.tagline });
      });
      ZD.games.forEach((g) => {
        if (g.title.toLowerCase().includes(q) || g.era.toLowerCase().includes(q))
          out.push({ kind: 'game', id: g.id, title: g.title, sub: g.era });
      });
      ZD.characters.forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
          out.push({ kind: 'character', id: c.id, title: c.name, sub: c.role });
      });
      ZD.wonderWeapons.forEach((w) => {
        if (w.name.toLowerCase().includes(q) || w.summary.toLowerCase().includes(q))
          out.push({ kind: 'weapon', id: w.id, title: w.name, sub: w.summary });
      });
      ZD.perks.forEach((p) => {
        if (p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q))
          out.push({ kind: 'perk', id: p.id, title: p.name, sub: p.tagline });
      });
      return out;
    }, [q]);

    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'Search'}]}
          kicker={`${hits.length} result${hits.length === 1 ? '' : 's'}`}
          title={q ? `"${query}"` : 'Search the archive'}
          sub={q ? 'Matches across maps, sagas, crew, wonder weapons, and perks.' : 'Type in the bar at top, then hit Enter.'}
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
                       : h.kind === 'weapon' ? { name: 'weapons' }
                       : h.kind === 'perk' ? { name: 'perks' }
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
                <span style={{ color: T.e115, fontFamily: T.mono, fontSize: 14 }}>›</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── ABOUT ────────────────────────────────────────────────────────────
  function About({ nav }) {
    return (
      <div>
        <PageHead
          crumbs={[{label:'Archive',to:{name:'home'}},{label:'About'}]}
          kicker="Field Manual"
          title="About the Archive"
          sub="What this site is, what it is not, and how to read it."
          nav={nav}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, marginTop: 32 }}>
          <article style={{ fontFamily: T.sans, fontSize: 16.5, lineHeight: 1.7, color: T.bone }}>
            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 0, marginBottom: 12 }}>What this is</h3>
            <p>group935.net is a fan-built database for the Treyarch Zombies canon — every map from <strong style={{ color: T.bone, fontWeight: 600 }}>Nacht der Untoten</strong> (2008) to <strong style={{ color: T.bone, fontWeight: 600 }}>Totenreich</strong> (2025), with full Easter egg walkthroughs, wonder weapon notes, perk references, relic counts, character bios, and a chronological reading of the lore.</p>

            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>The two modes</h3>
            <p><strong style={{ color: T.e115, fontWeight: 600 }}>FIELD</strong> is the default — the Group 935 Archive interface you're reading now. <strong style={{ color: T.e115, fontWeight: 600 }}>TTY</strong> is a brutalist CRT terminal view of the same content, for the players who want to grep the lore instead of browsing it. Switch any time via the toggle top right.</p>

            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>What this is not</h3>
            <p>Not affiliated with Activision, Treyarch, or any other party that owns trademarks in the Call of Duty franchise. No copy is lifted from official sources. Every writeup here is original — paraphrased, cross-referenced, and clearly marked when speculative.</p>

            <h3 className="pap-stencil" style={{ fontSize: 26, color: T.bone, marginTop: 36, marginBottom: 12 }}>The next sync</h3>
            <p>This archive is built to grow. The current sync covers all 24 maps at site-brief depth with one fully scripted Easter egg (Kinder der Toten on Citadelle des Morts). Subsequent syncs will add: per-map relic write-ups, side egg catalogues, strategy notes, more wonder weapon details, more lore essays, and full walkthroughs for every catalogued main quest.</p>
          </article>
          <aside>
            <div style={{ padding: 22, background: T.bg1, border: `1px solid ${T.line}`, position: 'sticky', top: 70 }}>
              <Mono color={T.e115}>Quick links</Mono>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, gap: 2 }}>
                {[['Browse all maps','maps'],['Read the chronicle','timeline'],['Meet the crew','characters'],['Perk reference','perks'],['Wonder weapons','weapons']].map(([l, p]) => (
                  <button key={p} onClick={() => nav({ name: p })} className="pap-link"
                    style={{ fontFamily: T.display, fontSize: 15, fontWeight: 500, color: T.bone, textAlign: 'left', padding: '6px 0', borderBottom: `1px solid ${T.line}`, textTransform: 'uppercase' }}>{l} →</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ─── 404 ──────────────────────────────────────────────────────────────
  function NotFound({ nav, what }) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <Stamp tone="red">Record Not Found</Stamp>
        <div className="pap-stencil" style={{ fontSize: 80, color: T.bone, marginTop: 22 }}>404</div>
        <p style={{ fontFamily: T.sans, fontSize: 16, color: T.mute, marginTop: 12, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
          That {what || 'page'} is not in the archive — or it's been redacted since you last checked.
        </p>
        <button className="pap-btn pap-btn-primary" style={{ marginTop: 22 }} onClick={() => nav({ name: 'home' })}>Return to archive →</button>
      </div>
    );
  }

  // ─── page head shared ─────────────────────────────────────────────────
  function PageHead({ crumbs, kicker, title, sub, nav }) {
    return (
      <div>
        <Crumbs parts={crumbs} nav={nav} />
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ maxWidth: 900 }}>
            {kicker && <Mono color={T.e115} size={11} letter={2.5}>{kicker}</Mono>}
            <h1 className="pap-stencil" style={{ fontSize: 72, color: T.bone, margin: '12px 0 0' }}>{title}</h1>
            {sub && <p style={{ fontFamily: T.sans, fontSize: 17, color: T.mute, marginTop: 14, lineHeight: 1.55, maxWidth: 760 }}>{sub}</p>}
          </div>
        </div>
        <HazardStripe height={3} style={{ marginTop: 28, opacity: 0.7 }} />
      </div>
    );
  }

  // ─── hash routing ─────────────────────────────────────────────────────
  function parseHash(hash) {
    if (!hash || hash === '#' || hash === '#/') return { name: 'home' };
    const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const [name, id] = parts;
    return { name: name || 'home', id };
  }
  function buildHash(r) {
    if (!r || r.name === 'home') return '#/';
    let h = '#/' + r.name;
    if (r.id) h += '/' + r.id;
    return h;
  }

  // ─── ROOT ─────────────────────────────────────────────────────────────
  function PackAPunch({ mode, setMode }) {
    const [route, setRouteState] = useState(() => parseHash(window.location.hash));
    const [query, setQuery] = useState('');

    useEffect(() => {
      const onHash = () => setRouteState(parseHash(window.location.hash));
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const nav = useCallback((r) => {
      const h = buildHash(r);
      if (window.location.hash !== h) window.location.hash = h;
      else setRouteState(parseHash(h));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    let page;
    switch (route.name) {
      case 'games':      page = <Games nav={nav} />; break;
      case 'game':       page = <Game id={route.id} nav={nav} />; break;
      case 'maps':       page = <Maps nav={nav} />; break;
      case 'map':        page = <MapDetail id={route.id} nav={nav} />; break;
      case 'ee':         page = <EEPage id={route.id} nav={nav} />; break;
      case 'characters': page = <Characters nav={nav} />; break;
      case 'character':  page = <CharacterDetail id={route.id} nav={nav} />; break;
      case 'weapons':    page = <WonderWeapons nav={nav} />; break;
      case 'perks':      page = <Perks nav={nav} />; break;
      case 'timeline':   page = <Timeline nav={nav} />; break;
      case 'relics':     page = <Relics nav={nav} />; break;
      case 'lore':       page = route.id ? <LoreArticle id={route.id} nav={nav} /> : <Lore nav={nav} />; break;
      case 'search':     page = <Search query={query} nav={nav} />; break;
      case 'about':      page = <About nav={nav} />; break;
      case 'home':       page = <Home nav={nav} />; break;
      default:           page = <NotFound nav={nav} />;
    }

    return (
      <Shell route={route} nav={nav} query={query} setQuery={setQuery} mode={mode} setMode={setMode}>
        {page}
      </Shell>
    );
  }

  window.PackAPunch = PackAPunch;
})();
