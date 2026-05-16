// Direction 1 — DARK AETHER
// Deep occult, purple/teal glow, ritual geometry, dark moody UI.

(function () {
  const { useState, useMemo, useEffect, useRef } = React;
  const ZD = window.ZD;

  // ─── tokens ────────────────────────────────────────────────────────────
  const T = {
    bg0: '#06040c',
    bg1: '#0c0818',
    bg2: '#16102a',
    line: 'rgba(160, 130, 255, 0.18)',
    line2: 'rgba(160, 130, 255, 0.08)',
    ink: '#e8e0ff',
    inkMute: '#a89cc9',
    inkFaint: '#62567f',
    aether: '#b48dff',       // primary purple
    aetherGlow: 'oklch(0.72 0.22 295)',
    rift: '#5fe6d4',          // teal
    riftGlow: 'oklch(0.82 0.18 195)',
    danger: '#ff6b8a',
    serif: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
    sans: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  };

  // ─── primitives ────────────────────────────────────────────────────────
  const Sigil = ({ size = 64, opacity = 1, hue = 295 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ opacity, color: `oklch(0.72 0.22 ${hue})` }}>
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="32,8 56,46 8,46" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <polygon points="32,56 8,18 56,18" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );

  const Slot = ({ w, h, label, hue = 295, dashed = true, style }) => (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: `radial-gradient(circle at 30% 20%, oklch(0.32 0.10 ${hue}) 0%, oklch(0.15 0.06 ${hue + 20}) 60%, ${T.bg1} 100%)`,
      border: dashed ? `1px dashed ${T.line}` : `1px solid ${T.line}`,
      borderRadius: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.25,
        backgroundImage: `repeating-linear-gradient(45deg, transparent 0 8px, ${T.line2} 8px 9px)` }} />
      <div style={{ position: 'relative', textAlign: 'center', color: T.inkMute, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        <div style={{ marginBottom: 6, opacity: 0.5 }}>
          <Sigil size={28} opacity={0.6} hue={hue} />
        </div>
        {label}
      </div>
    </div>
  );

  const Glow = ({ children, hue = 295, intensity = 0.4 }) => (
    <span style={{ color: `oklch(0.78 0.20 ${hue})`, textShadow: `0 0 14px oklch(0.65 0.25 ${hue} / ${intensity})` }}>{children}</span>
  );

  const Tag = ({ children, hue = 295 }) => (
    <span style={{
      fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase',
      padding: '3px 8px',
      border: `1px solid oklch(0.6 0.18 ${hue} / 0.4)`,
      color: `oklch(0.85 0.12 ${hue})`,
      background: `oklch(0.4 0.18 ${hue} / 0.1)`,
      borderRadius: 1,
    }}>{children}</span>
  );

  // ─── shell ─────────────────────────────────────────────────────────────
  function Shell({ route, setRoute, query, setQuery, children }) {
    const nav = [
      { id: 'home', label: 'Codex' },
      { id: 'games', label: 'Games' },
      { id: 'maps', label: 'Maps' },
      { id: 'characters', label: 'Crew' },
      { id: 'lore', label: 'Lore' },
      { id: 'timeline', label: 'Chronicle' },
      { id: 'relics', label: 'Relics' },
    ];
    return (
      <div style={{
        background: T.bg0, color: T.ink, fontFamily: T.sans,
        minHeight: '100%', position: 'relative', overflow: 'hidden',
      }}>
        {/* starfield */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(180,141,255,0.8), transparent 50%),
            radial-gradient(1px 1px at 70% 20%, rgba(95,230,212,0.6), transparent 50%),
            radial-gradient(1px 1px at 45% 80%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 85% 60%, rgba(180,141,255,0.4), transparent 50%),
            radial-gradient(2px 2px at 15% 65%, rgba(95,230,212,0.3), transparent 50%),
            radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.4), transparent 50%)
          `,
          backgroundSize: '600px 400px',
        }} />
        {/* aurora wash */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 80% -20%, oklch(0.4 0.22 295 / 0.35), transparent 60%),
                       radial-gradient(ellipse at 0% 100%, oklch(0.35 0.18 195 / 0.25), transparent 55%)` }} />

        <header style={{ position: 'relative', zIndex: 2, borderBottom: `1px solid ${T.line2}` }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '20px 40px', gap: 24 }}>
            <div onClick={() => setRoute({ name: 'home' })} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <Sigil size={32} hue={295} />
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 20, fontStyle: 'italic', letterSpacing: 0.5, lineHeight: 1 }}>
                  <Glow hue={295}>Aetherium</Glow>
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2.5, color: T.inkFaint, marginTop: 2 }}>
                  CODEX OF THE UNDEAD
                </div>
              </div>
            </div>
            <nav style={{ display: 'flex', gap: 2, marginLeft: 32 }}>
              {nav.map((n) => (
                <button key={n.id} onClick={() => setRoute({ name: n.id })}
                  style={{
                    background: route.name === n.id ? `oklch(0.4 0.18 295 / 0.18)` : 'transparent',
                    border: 'none',
                    color: route.name === n.id ? T.ink : T.inkMute,
                    padding: '8px 14px',
                    fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderBottom: route.name === n.id ? `1px solid ${T.aether}` : '1px solid transparent',
                  }}>{n.label}</button>
              ))}
            </nav>
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1px solid ${T.line}`, padding: '6px 10px', minWidth: 240,
              background: 'rgba(20, 12, 40, 0.5)', borderRadius: 1,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={T.inkMute} strokeWidth="1.4"><circle cx="5" cy="5" r="3.5"/><path d="M8 8l3 3"/></svg>
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setRoute({ name: 'search' })}
                placeholder="Search the Aether…"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: T.ink,
                  fontFamily: T.mono, fontSize: 11, letterSpacing: 0.5, width: '100%' }} />
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.inkFaint, border: `1px solid ${T.line}`, padding: '1px 4px' }}>⌘K</span>
            </div>
          </div>
        </header>

        <main style={{ position: 'relative', zIndex: 1, padding: '32px 40px 56px', minHeight: 'calc(100% - 70px)' }}>
          {children}
        </main>
      </div>
    );
  }

  // ─── pages ─────────────────────────────────────────────────────────────
  function Home({ setRoute }) {
    return (
      <div>
        <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 3, color: T.rift, marginBottom: 18 }}>
              ——— CODEX vol. VII · the dark aether bleeds through
            </div>
            <h1 style={{ fontFamily: T.serif, fontSize: 76, lineHeight: 0.95, fontWeight: 400, margin: 0, letterSpacing: -1.5 }}>
              The dead<br />
              <em style={{ color: T.aether }}>remember</em><br />
              <span style={{ fontStyle: 'italic', opacity: 0.7 }}>every cycle.</span>
            </h1>
            <p style={{ fontFamily: T.serif, fontSize: 19, lineHeight: 1.55, color: T.inkMute, maxWidth: 540, marginTop: 24 }}>
              A reader’s codex for every Easter egg, relic, and fragment of lore
              from twenty years of the game. Annotated, cross‑referenced, and
              kept on the safe side of the rift — mostly.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button onClick={() => setRoute({ name: 'maps' })} style={{
                background: T.aether, color: T.bg0, border: 'none',
                padding: '14px 22px', fontFamily: T.mono, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                fontWeight: 600, cursor: 'pointer', boxShadow: `0 0 30px oklch(0.6 0.25 295 / 0.5)`,
              }}>Enter the Codex</button>
              <button onClick={() => setRoute({ name: 'timeline' })} style={{
                background: 'transparent', color: T.ink, border: `1px solid ${T.line}`,
                padding: '14px 22px', fontFamily: T.mono, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                cursor: 'pointer',
              }}>View Chronicle</button>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RitualCircle />
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <SectionHead title="Featured Map" sub="Currently bleeding through" hue={295} />
          <FeaturedMap map={ZD.maps.find((m) => m.id === 'citadelle')} setRoute={setRoute} />
        </section>

        <section style={{ marginBottom: 48 }}>
          <SectionHead title="The Games" sub="Two decades, three timelines, one cycle" hue={195} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {ZD.games.map((g, i) => (
              <button key={g.id} onClick={() => setRoute({ name: 'game', id: g.id })}
                style={{
                  textAlign: 'left', cursor: 'pointer',
                  background: `linear-gradient(135deg, oklch(0.18 0.06 ${280 + i * 6}) 0%, ${T.bg1} 80%)`,
                  border: `1px solid ${T.line2}`,
                  padding: 18,
                  position: 'relative', overflow: 'hidden',
                  color: T.ink,
                }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.aether, opacity: 0.8 }}>{g.code} · {g.year}</div>
                <div style={{ fontFamily: T.serif, fontSize: 22, marginTop: 6, fontStyle: 'italic' }}>{g.title}</div>
                <div style={{ fontFamily: T.serif, fontSize: 13, color: T.inkMute, marginTop: 4 }}>{g.era}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.5, color: T.inkFaint, marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{g.mapCount} MAPS</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Panel title="The Crew" sub="Faces behind the cycle">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {ZD.characters.slice(0, 4).map((c) => (
                <button key={c.id} onClick={() => setRoute({ name: 'character', id: c.id })}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  <Slot w="100%" h={120} label={c.name.toUpperCase()} hue={c.hue} dashed={false} />
                  <div style={{ fontFamily: T.serif, fontSize: 16, marginTop: 8, color: T.ink, fontStyle: 'italic' }}>{c.name}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 9, color: T.inkFaint, letterSpacing: 1.5, marginTop: 2 }}>{c.role.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="Latest Lore" sub="Recently transcribed">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['The Sentinel Artifact', 'A piece of the Forsaken in a CIA briefcase.', 'lore'],
                ['On the Origin Cycle', 'Why Maxis keeps starting over.', 'lore'],
                ['The Order of the Templar', 'Element 115 in 1294.', 'lore'],
              ].map(([title, sub, page]) => (
                <button key={title} onClick={() => setRoute({ name: page })}
                  style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${T.line2}`, padding: '10px 0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontFamily: T.serif, fontSize: 17, color: T.ink, fontStyle: 'italic' }}>{title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.inkMute, marginTop: 3 }}>{sub}</div>
                </button>
              ))}
            </div>
          </Panel>
        </section>
      </div>
    );
  }

  function RitualCircle() {
    return (
      <svg width="380" height="380" viewBox="0 0 380 380" style={{ color: T.aether }}>
        <defs>
          <radialGradient id="rc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.25 295)" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="oklch(0.72 0.25 295)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="190" cy="190" r="180" fill="url(#rc-glow)" />
        <circle cx="190" cy="190" r="170" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        <circle cx="190" cy="190" r="140" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
        <circle cx="190" cy="190" r="100" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <circle cx="190" cy="190" r="60" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <polygon points="190,30 320,260 60,260" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <polygon points="190,350 60,120 320,120" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const r1 = 170, r2 = 178;
          return (
            <line key={i} x1={190 + Math.cos(a) * r1} y1={190 + Math.sin(a) * r1}
                  x2={190 + Math.cos(a) * r2} y2={190 + Math.sin(a) * r2}
                  stroke="currentColor" strokeWidth="1.2" />
          );
        })}
        <circle cx="190" cy="190" r="6" fill={T.rift} style={{ filter: 'drop-shadow(0 0 8px ' + T.rift + ')' }} />
        <text x="190" y="200" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily={T.mono} letterSpacing="3" opacity="0.6">AETHER</text>
      </svg>
    );
  }

  function SectionHead({ title, sub, hue = 295 }) {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, borderBottom: `1px solid ${T.line2}`, paddingBottom: 10 }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 30, fontStyle: 'italic', letterSpacing: -0.3 }}>{title}</div>
          {sub && <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2.5, color: `oklch(0.78 0.16 ${hue})`, marginTop: 4, textTransform: 'uppercase' }}>{sub}</div>}
        </div>
      </div>
    );
  }

  function Panel({ title, sub, children, style }) {
    return (
      <div style={{ background: 'rgba(12, 8, 24, 0.6)', border: `1px solid ${T.line2}`, padding: 24, ...style }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', letterSpacing: -0.2 }}>{title}</div>
          {sub && <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2, color: T.inkFaint, marginTop: 3, textTransform: 'uppercase' }}>{sub}</div>}
        </div>
        {children}
      </div>
    );
  }

  function FeaturedMap({ map, setRoute }) {
    const game = ZD.games.find((g) => g.id === map.game);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, border: `1px solid ${T.line}`, background: 'rgba(12, 8, 24, 0.7)' }}>
        <Slot w="100%" h={340} label={map.name.toUpperCase()} hue={295} style={{ borderRadius: 0, border: 'none' }} />
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <Tag hue={295}>{game.code} · {game.year}</Tag>
              <Tag hue={195}>Difficulty {map.difficulty}/5</Tag>
            </div>
            <h2 style={{ fontFamily: T.serif, fontSize: 44, fontStyle: 'italic', margin: 0, lineHeight: 1, letterSpacing: -0.6 }}>{map.name}</h2>
            <div style={{ fontFamily: T.serif, fontSize: 17, color: T.inkMute, fontStyle: 'italic', marginTop: 8 }}>“{map.location}”</div>
            <p style={{ fontFamily: T.serif, fontSize: 16, color: T.ink, lineHeight: 1.55, marginTop: 20 }}>{map.summary}</p>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', marginTop: 24 }}>
            <Stat label="EE" value={map.eeCount} hue={295} />
            <Stat label="Relics" value={map.relicCount} hue={195} />
            <div style={{ flex: 1 }} />
            <button onClick={() => setRoute({ name: 'map', id: map.id })} style={{
              background: T.aether, color: T.bg0, border: 'none', padding: '12px 22px',
              fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600,
              cursor: 'pointer',
            }}>Enter Map →</button>
          </div>
        </div>
      </div>
    );
  }

  function Stat({ label, value, hue }) {
    return (
      <div>
        <div style={{ fontFamily: T.serif, fontSize: 36, color: `oklch(0.85 0.16 ${hue})`, fontStyle: 'italic', lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2, color: T.inkFaint, marginTop: 4, textTransform: 'uppercase' }}>{label}</div>
      </div>
    );
  }

  // ─── games index ──────────────────────────────────────────────────────
  function Games({ setRoute }) {
    return (
      <div>
        <PageHead crumbs={['Codex', 'Games']} title="The Games"
          sub="From the bunker in 1945 to the relics of the BO7 cycle, all eight titles ordered by their place in the canon — not their release year." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 28 }}>
          {ZD.games.map((g, i) => {
            const gameMaps = ZD.maps.filter((m) => m.game === g.id);
            return (
              <button key={g.id} onClick={() => setRoute({ name: 'game', id: g.id })} style={{
                textAlign: 'left', cursor: 'pointer', padding: 0, background: 'transparent', border: 'none',
                display: 'grid', gridTemplateColumns: '160px 1fr', gap: 18,
              }}>
                <Slot w={160} h={140} label={g.code} hue={270 + i * 8} dashed={false} />
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2, color: T.aether }}>{g.year} · {gameMaps.length} OF {g.mapCount} MAPS</div>
                  <div style={{ fontFamily: T.serif, fontSize: 26, fontStyle: 'italic', color: T.ink, marginTop: 6 }}>{g.title}</div>
                  <div style={{ fontFamily: T.serif, fontSize: 15, color: T.inkMute, marginTop: 4 }}>{g.era}</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
                    {gameMaps.slice(0, 4).map((m) => (
                      <span key={m.id} style={{ fontFamily: T.mono, fontSize: 9, color: T.inkMute, padding: '2px 6px', border: `1px solid ${T.line2}` }}>{m.name}</span>
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

  function PageHead({ crumbs, title, sub }) {
    return (
      <div>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.inkFaint, marginBottom: 16, textTransform: 'uppercase' }}>
          {crumbs.join(' — ')}
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: 56, fontStyle: 'italic', margin: 0, fontWeight: 400, letterSpacing: -0.8 }}>{title}</h1>
        {sub && <p style={{ fontFamily: T.serif, fontSize: 18, color: T.inkMute, maxWidth: 720, marginTop: 12, lineHeight: 1.5 }}>{sub}</p>}
      </div>
    );
  }

  // ─── single game page (maps in that game) ──────────────────────────────
  function Game({ id, setRoute }) {
    const g = ZD.games.find((x) => x.id === id);
    const gameMaps = ZD.maps.filter((m) => m.game === id);
    return (
      <div>
        <PageHead crumbs={['Codex', 'Games', g.title]} title={g.title} sub={g.era + '. ' + g.mapCount + ' maps catalogued in this game.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 32 }}>
          {gameMaps.map((m) => <MapCard key={m.id} map={m} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function MapCard({ map, setRoute }) {
    return (
      <button onClick={() => setRoute({ name: 'map', id: map.id })} style={{
        background: 'rgba(12, 8, 24, 0.6)', border: `1px solid ${T.line2}`, padding: 0,
        textAlign: 'left', cursor: 'pointer', color: T.ink, position: 'relative', overflow: 'hidden',
      }}>
        <Slot w="100%" h={150} label={map.name.toUpperCase()} hue={280 + map.difficulty * 8} dashed={false} style={{ border: 'none', borderBottom: `1px solid ${T.line2}` }} />
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: T.serif, fontSize: 20, fontStyle: 'italic' }}>{map.name}</div>
          <div style={{ fontFamily: T.serif, fontSize: 13, color: T.inkMute, fontStyle: 'italic', marginTop: 2 }}>“{map.location}”</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.5, color: T.inkFaint, textTransform: 'uppercase' }}>
            <span><Glow hue={295}>{map.eeCount}</Glow> EE</span>
            <span><Glow hue={195}>{map.relicCount}</Glow> RELICS</span>
            <span style={{ marginLeft: 'auto' }}>{'▪'.repeat(map.difficulty)}{'▫'.repeat(5 - map.difficulty)}</span>
          </div>
        </div>
      </button>
    );
  }

  // ─── maps index (all) ──────────────────────────────────────────────────
  function Maps({ setRoute }) {
    const [filter, setFilter] = useState('all');
    const list = filter === 'all' ? ZD.maps : ZD.maps.filter((m) => m.game === filter);
    return (
      <div>
        <PageHead crumbs={['Codex', 'Maps']} title="All Catalogued Maps" sub="Sorted by canonical sequence. Filter by game to narrow the cycle." />
        <div style={{ display: 'flex', gap: 6, marginTop: 24, flexWrap: 'wrap' }}>
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All maps</FilterChip>
          {ZD.games.map((g) => <FilterChip key={g.id} active={filter === g.id} onClick={() => setFilter(g.id)}>{g.code}</FilterChip>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24 }}>
          {list.map((m) => <MapCard key={m.id} map={m} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function FilterChip({ active, onClick, children }) {
    return (
      <button onClick={onClick} style={{
        background: active ? `oklch(0.5 0.18 295 / 0.2)` : 'transparent',
        border: `1px solid ${active ? T.aether : T.line2}`,
        color: active ? T.ink : T.inkMute,
        padding: '6px 14px',
        fontFamily: T.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        cursor: 'pointer',
      }}>{children}</button>
    );
  }

  // ─── map detail page ───────────────────────────────────────────────────
  function MapDetail({ id, setRoute }) {
    const m = ZD.maps.find((x) => x.id === id);
    const g = ZD.games.find((x) => x.id === m.game);
    const ee = ZD.sampleEE;
    return (
      <div>
        <PageHead crumbs={['Codex', 'Maps', m.name]} title={m.name} sub={m.location} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, marginTop: 28 }}>
          <Slot w="100%" h={360} label={m.name.toUpperCase()} hue={280 + m.difficulty * 8} dashed={false} />
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Tag hue={295}>{g.code} · {g.year}</Tag>
              <Tag hue={195}>Difficulty {m.difficulty}/5</Tag>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.inkFaint, textTransform: 'uppercase' }}>Location</div>
            <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: 'italic', color: T.ink, marginTop: 4 }}>{m.location}</div>
            <p style={{ fontFamily: T.serif, fontSize: 16.5, color: T.ink, lineHeight: 1.6, marginTop: 18 }}>{m.summary}</p>
            <div style={{ display: 'flex', gap: 4, marginTop: 16, flexWrap: 'wrap' }}>
              {m.tags.map((t) => <span key={t} style={{ fontFamily: T.mono, fontSize: 9, color: T.aether, letterSpacing: 1.5, padding: '2px 8px', border: `1px solid ${T.line2}` }}>{t}</span>)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <SectionHead title="Easter Eggs" sub={m.eeCount + ' main quest' + (m.eeCount === 1 ? '' : 's') + ' catalogued'} hue={295} />
          {m.eeCount > 0 ? (
            <button onClick={() => setRoute({ name: 'ee', id: ee.id })} style={{
              width: '100%', display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, alignItems: 'center',
              background: 'rgba(12, 8, 24, 0.6)', border: `1px solid ${T.line}`, padding: 22, cursor: 'pointer', color: T.ink, textAlign: 'left',
            }}>
              <Slot w={100} h={100} label="EE" hue={295} />
              <div>
                <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.aether }}>MAIN QUEST · {ee.difficulty.toUpperCase()} · {ee.duration}</div>
                <div style={{ fontFamily: T.serif, fontSize: 28, fontStyle: 'italic', marginTop: 4 }}>{ee.title}</div>
                <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.inkMute, lineHeight: 1.5, marginTop: 6, maxWidth: 540 }}>{ee.summary}</div>
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.aether }}>BEGIN →</span>
            </button>
          ) : (
            <div style={{ fontFamily: T.serif, fontSize: 16, color: T.inkMute, fontStyle: 'italic' }}>No main quest catalogued on this map. Six relics await.</div>
          )}
        </div>

        <div style={{ marginTop: 48 }}>
          <SectionHead title="Relics" sub={m.relicCount + ' hidden across this map'} hue={195} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + Math.min(m.relicCount, 6) + ', 1fr)', gap: 12 }}>
            {Array.from({ length: Math.max(m.relicCount, 1) }).slice(0, 6).map((_, i) => (
              <div key={i} style={{ background: 'rgba(12, 8, 24, 0.6)', border: `1px solid ${T.line2}`, padding: 14, textAlign: 'center' }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.rift, letterSpacing: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ margin: '10px auto', width: 36, height: 36 }}><Sigil size={36} hue={195} opacity={0.7} /></div>
                <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic', color: T.inkMute }}>Relic № {i + 1}</div>
              </div>
            ))}
            {m.relicCount === 0 && (
              <div style={{ gridColumn: '1 / -1', fontFamily: T.serif, fontSize: 15, color: T.inkMute, fontStyle: 'italic' }}>No relics catalogued. This is a classic‑era map.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── EE walkthrough ────────────────────────────────────────────────────
  function EE({ id, setRoute }) {
    const ee = ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const [completed, setCompleted] = useState(new Set());
    const [active, setActive] = useState(0);

    const toggle = (n) => setCompleted((s) => {
      const ns = new Set(s);
      if (ns.has(n)) ns.delete(n); else ns.add(n);
      return ns;
    });

    return (
      <div>
        <PageHead crumbs={['Codex', 'Maps', m.name, ee.title]} title={ee.title}
          sub={'Main quest · ' + m.name + '. ' + ee.summary} />

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Tag hue={0}>Difficulty: {ee.difficulty}</Tag>
          <Tag hue={195}>Duration: {ee.duration}</Tag>
          <Tag hue={295}>{ee.party}</Tag>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32, marginTop: 36 }}>
          {/* step rail */}
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.inkFaint, marginBottom: 12, textTransform: 'uppercase' }}>Steps — {completed.size}/{ee.steps.length}</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 13, top: 14, bottom: 14, width: 1, background: T.line2 }} />
              {ee.steps.map((s, i) => {
                const done = completed.has(s.n);
                const isActive = i === active;
                return (
                  <button key={s.n} onClick={() => setActive(i)} style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    width: '100%', padding: '10px 0', background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left', color: T.ink, position: 'relative',
                  }}>
                    <span onClick={(e) => { e.stopPropagation(); toggle(s.n); }} style={{
                      width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                      border: `1.5px solid ${done ? T.rift : T.line}`,
                      background: done ? T.rift : T.bg0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.mono, fontSize: 11, fontWeight: 600,
                      color: done ? T.bg0 : T.inkMute,
                      boxShadow: isActive ? `0 0 0 3px oklch(0.6 0.2 295 / 0.25)` : 'none',
                    }}>
                      {done ? '✓' : s.n}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: T.serif, fontSize: 15.5, fontStyle: 'italic', color: isActive ? T.ink : T.inkMute, textDecoration: done ? 'line-through' : 'none' }}>{s.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* active step */}
          <div>
            <Slot w="100%" h={260} label={('Step ' + ee.steps[active].n + ' — Reference Image').toUpperCase()} hue={295} />
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.aether, marginTop: 24 }}>STEP {ee.steps[active].n} OF {ee.steps.length}</div>
            <h2 style={{ fontFamily: T.serif, fontSize: 38, fontStyle: 'italic', margin: '8px 0 16px', letterSpacing: -0.4 }}>{ee.steps[active].title}</h2>
            <p style={{ fontFamily: T.serif, fontSize: 17, color: T.ink, lineHeight: 1.65, maxWidth: 620 }}>{ee.steps[active].body}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              <button disabled={active === 0} onClick={() => setActive((a) => a - 1)} style={{
                background: 'transparent', color: active === 0 ? T.inkFaint : T.ink, border: `1px solid ${T.line}`,
                padding: '11px 18px', fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase',
                cursor: active === 0 ? 'not-allowed' : 'pointer',
              }}>← Previous</button>
              <button onClick={() => { toggle(ee.steps[active].n); if (active < ee.steps.length - 1) setActive((a) => a + 1); }} style={{
                background: T.aether, color: T.bg0, border: 'none',
                padding: '11px 22px', fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
                cursor: 'pointer',
              }}>{completed.has(ee.steps[active].n) ? 'Step complete' : 'Mark complete'} →</button>
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2, color: T.rift, marginBottom: 10, textTransform: 'uppercase' }}>Quest Rewards</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ee.rewards.map((r) => <Tag key={r} hue={195}>{r}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── character profile ─────────────────────────────────────────────────
  function Characters({ setRoute }) {
    return (
      <div>
        <PageHead crumbs={['Codex', 'Crew']} title="The Crew" sub="Every named operative, on every side, across all three timelines." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 28 }}>
          {ZD.characters.map((c) => (
            <button key={c.id} onClick={() => setRoute({ name: 'character', id: c.id })} style={{
              background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: T.ink,
            }}>
              <Slot w="100%" h={220} label={c.name.toUpperCase()} hue={c.hue} dashed={false} />
              <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', marginTop: 10 }}>{c.name}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.8, color: T.inkFaint, marginTop: 4, textTransform: 'uppercase' }}>{c.role}</div>
              <div style={{ fontFamily: T.serif, fontSize: 14, color: T.inkMute, marginTop: 8, fontStyle: 'italic' }}>“{c.quote}”</div>
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
        <PageHead crumbs={['Codex', 'Crew', c.name]} title={c.name} sub={c.role} />
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, marginTop: 32 }}>
          <div>
            <Slot w={320} h={400} label={c.name.toUpperCase()} hue={c.hue} dashed={false} />
            <div style={{ marginTop: 18, fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.inkFaint, textTransform: 'uppercase' }}>Origin</div>
            <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: 'italic', color: T.ink, marginTop: 4 }}>{c.origin}</div>
          </div>
          <div>
            <div style={{
              fontFamily: T.serif, fontSize: 32, fontStyle: 'italic', lineHeight: 1.3,
              borderLeft: `2px solid oklch(0.7 0.2 ${c.hue})`, paddingLeft: 24, color: T.ink,
            }}>“{c.quote}”</div>
            <p style={{ fontFamily: T.serif, fontSize: 18, color: T.ink, lineHeight: 1.65, marginTop: 28 }}>{c.summary}</p>

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <DataCell label="Status" value="Active" />
              <DataCell label="Allegiance" value={c.role.split(' · ')[1] || c.role} />
              <DataCell label="Era" value="1918‑1991" />
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.aether, marginBottom: 10, textTransform: 'uppercase' }}>Appears In</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ZD.maps.slice(0, 6).map((m) => (
                  <button key={m.id} onClick={() => setRoute({ name: 'map', id: m.id })} style={{
                    background: 'transparent', border: `1px solid ${T.line2}`,
                    color: T.inkMute, padding: '5px 11px', fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
                    cursor: 'pointer',
                  }}>{m.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function DataCell({ label, value }) {
    return (
      <div style={{ borderTop: `1px solid ${T.line2}`, paddingTop: 10 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2, color: T.inkFaint, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: 'italic', color: T.ink, marginTop: 4 }}>{value}</div>
      </div>
    );
  }

  // ─── lore article ──────────────────────────────────────────────────────
  function Lore() {
    return (
      <div>
        <PageHead crumbs={['Codex', 'Lore', 'On the Origin Cycle']} title="On the Origin Cycle"
          sub="Why Maxis keeps starting over — a reading of the loop, its breakers, and the cost of breaking it." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, marginTop: 36 }}>
          <article style={{ fontFamily: T.serif, fontSize: 19, lineHeight: 1.75, color: T.ink, maxWidth: 700 }}>
            <p style={{ fontSize: 22, color: T.inkMute, fontStyle: 'italic', borderLeft: `2px solid ${T.aether}`, paddingLeft: 20, margin: '0 0 32px' }}>
              “No matter how many times we run this, the ending is always the same.
              The difference is what gets dragged into it.”
            </p>
            <p style={{ marginTop: 0 }}>
              The Aether Story is not a sequence; it is a wheel. <Glow hue={295}>Dr. Maxis</Glow> is
              the closest thing the loop has to a narrator, and even he does not
              control the rotation. He is only the one who keeps the lights on
              between turns.
            </p>
            <h3 style={{ fontFamily: T.serif, fontSize: 28, fontStyle: 'italic', marginTop: 40, marginBottom: 14 }}>The First Turn</h3>
            <p>
              The cycle begins at <Glow hue={195}>Generation Station 64</Glow>, a German
              dig that breached an Element 115 deposit during the closing
              months of the Great War. Four soldiers — the men we will come
              to call Primis — are killed, brought back, and given a fragment
              of memory that does not belong to them.
            </p>
            <p>
              What they remember is the previous turn of the wheel: a moon
              shattered, a daughter trapped in a machine, a friend with a
              syringe. They do not have the words for any of it.
            </p>
            <h3 style={{ fontFamily: T.serif, fontSize: 28, fontStyle: 'italic', marginTop: 40, marginBottom: 14 }}>The Cost of Breaking It</h3>
            <p>
              By the time of Revelations, every variable that can be moved has
              been moved. The cycle does not end — it is <em>retired</em>. The new
              cycle, the Dark Aether era, begins on the same battlefield with
              none of the same actors and one new word for the same thing.
            </p>
            <p>
              That word is <Glow hue={195}>Forsaken</Glow>, and it remembers everything.
            </p>
          </article>

          <aside>
            <div style={{ position: 'sticky', top: 24 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.inkFaint, marginBottom: 12, textTransform: 'uppercase' }}>On this page</div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${T.line2}` }}>
                {['Opening', 'The First Turn', 'The Cost of Breaking It', 'Footnotes'].map((s, i) => (
                  <div key={i} style={{
                    fontFamily: T.serif, fontSize: 14, color: i === 0 ? T.ink : T.inkMute, padding: '8px 14px',
                    fontStyle: 'italic', borderLeft: i === 0 ? `2px solid ${T.aether}` : '2px solid transparent', marginLeft: -1,
                  }}>{s}</div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5, color: T.inkFaint, marginBottom: 12, textTransform: 'uppercase' }}>Related</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['The Templar Discovery', 'On the Sentinel Artifact', 'A Reading of Tag der Toten'].map((t) => (
                    <div key={t} style={{ fontFamily: T.serif, fontSize: 15, fontStyle: 'italic', color: T.aether, cursor: 'pointer' }}>— {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ─── timeline ──────────────────────────────────────────────────────────
  function Timeline() {
    return (
      <div>
        <PageHead crumbs={['Codex', 'Chronicle']} title="Chronicle" sub="The canonical sequence of events. Hover any node for full transcription." />
        <div style={{ position: 'relative', marginTop: 48, paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, ${T.aether}, ${T.rift}, transparent)` }} />
          {ZD.timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 36 }}>
              <div style={{ position: 'absolute', left: -32, top: 8, width: 13, height: 13, borderRadius: 7,
                background: T.bg0, border: `1.5px solid ${i === 4 ? T.rift : T.aether}`,
                boxShadow: i === 4 ? `0 0 14px ${T.rift}` : `0 0 10px oklch(0.6 0.2 295 / 0.5)` }} />
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'baseline' }}>
                <div style={{ fontFamily: T.serif, fontSize: 30, fontStyle: 'italic', color: T.aether }}>{t.year}</div>
                <div>
                  <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', color: T.ink }}>{t.title}</div>
                  <p style={{ fontFamily: T.serif, fontSize: 16.5, color: T.inkMute, lineHeight: 1.55, marginTop: 6, maxWidth: 640 }}>{t.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── relics ────────────────────────────────────────────────────────────
  function Relics() {
    return (
      <div>
        <PageHead crumbs={['Codex', 'Relics']} title="Relics of the Cycle"
          sub="Hidden Aetheric fragments scattered across every BO6 and BO7 map. Each catalogued with its discovery site and the game it belongs to." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 32 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const map = ZD.maps.filter((m) => m.relicCount > 0)[i % 7];
            return (
              <div key={i} style={{ background: 'rgba(12, 8, 24, 0.6)', border: `1px solid ${T.line2}`, padding: 20, textAlign: 'center' }}>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 2, color: T.rift }}>RELIC № {String(i + 1).padStart(3, '0')}</div>
                <div style={{ margin: '20px auto' }}><Sigil size={56} hue={195 + (i * 24) % 90} opacity={0.85} /></div>
                <div style={{ fontFamily: T.serif, fontSize: 17, fontStyle: 'italic', color: T.ink }}>{['Sigil','Shard','Glyph','Quill','Crown','Eye','Spine','Wreath','Tooth','Pendant','Coin','Echo'][i]}</div>
                <div style={{ fontFamily: T.serif, fontSize: 13, color: T.inkMute, fontStyle: 'italic', marginTop: 4 }}>{map.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── search ────────────────────────────────────────────────────────────
  function Search({ query, setRoute }) {
    const q = (query || '').toLowerCase();
    const hits = useMemo(() => {
      const out = [];
      ZD.maps.forEach((m) => {
        if (!q || m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q))
          out.push({ kind: 'map', id: m.id, title: m.name, sub: m.location });
      });
      ZD.characters.forEach((c) => {
        if (!q || c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
          out.push({ kind: 'character', id: c.id, title: c.name, sub: c.role });
      });
      ZD.wonderWeapons.forEach((w) => {
        if (!q || w.name.toLowerCase().includes(q))
          out.push({ kind: 'weapon', id: w.id, title: w.name, sub: w.summary });
      });
      return out.slice(0, 12);
    }, [q]);

    return (
      <div>
        <PageHead crumbs={['Codex', 'Search']} title={'“' + (query || '') + '”'} sub={hits.length + ' fragment' + (hits.length === 1 ? '' : 's') + ' found in the codex.'} />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' }}>
          {hits.map((h, i) => (
            <button key={i} onClick={() => setRoute(h.kind === 'map' ? { name: 'map', id: h.id } : h.kind === 'character' ? { name: 'character', id: h.id } : { name: 'home' })}
              style={{
                display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, alignItems: 'center',
                background: 'transparent', border: 'none', borderBottom: `1px solid ${T.line2}`,
                padding: '16px 0', cursor: 'pointer', textAlign: 'left', color: T.ink,
              }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.aether, textTransform: 'uppercase' }}>{h.kind}</div>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic' }}>{h.title}</div>
                <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.inkMute, marginTop: 3 }}>{h.sub}</div>
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.aether }}>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── router ────────────────────────────────────────────────────────────
  function DarkAether() {
    const [route, setRoute] = useState({ name: 'home' });
    const [query, setQuery] = useState('Citadelle');
    useEffect(() => {
      const wrap = document.getElementById('da-scroll');
      if (wrap) wrap.scrollTop = 0;
    }, [route]);

    let page;
    switch (route.name) {
      case 'games': page = <Games setRoute={setRoute} />; break;
      case 'game': page = <Game id={route.id} setRoute={setRoute} />; break;
      case 'maps': page = <Maps setRoute={setRoute} />; break;
      case 'map': page = <MapDetail id={route.id} setRoute={setRoute} />; break;
      case 'ee': page = <EE id={route.id} setRoute={setRoute} />; break;
      case 'characters': page = <Characters setRoute={setRoute} />; break;
      case 'character': page = <CharacterDetail id={route.id} setRoute={setRoute} />; break;
      case 'lore': page = <Lore setRoute={setRoute} />; break;
      case 'timeline': page = <Timeline setRoute={setRoute} />; break;
      case 'relics': page = <Relics setRoute={setRoute} />; break;
      case 'search': page = <Search query={query} setRoute={setRoute} />; break;
      default: page = <Home setRoute={setRoute} />; break;
    }
    return (
      <Shell route={route} setRoute={setRoute} query={query} setQuery={setQuery}>
        <div id="da-scroll">{page}</div>
      </Shell>
    );
  }

  window.DarkAether = DarkAether;
})();
