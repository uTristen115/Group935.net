// Direction 2 — DOSSIER
// Field-journal / classified intel aesthetic.
// Aged paper, typewriter, redaction bars, stamps, paperclips, annotations.

(function () {
  const { useState, useMemo, useEffect, useRef } = React;
  const ZD = window.ZD;

  const D = {
    paper: '#e7dfc7',
    paperShade: '#dccfb0',
    paperEdge: '#b9a878',
    ink: '#1c1a14',
    inkMute: '#5a523f',
    inkFaint: '#8a7e5d',
    red: '#b03227',
    redInk: '#8d2a22',
    blue: '#1e3b6e',
    pencil: '#4a4030',
    mono: '"IBM Plex Mono", "Courier Prime", ui-monospace, monospace',
    type: '"Special Elite", "Courier Prime", monospace',
    sans: '"Inter", system-ui, sans-serif',
    serif: '"Crimson Text", "EB Garamond", Georgia, serif',
  };

  // ─── primitives ────────────────────────────────────────────────────────
  // Subtle paper texture — fibers, foxing, faint horizontal rule lines.
  const PaperBg = ({ children, style }) => (
    <div style={{
      background: D.paper,
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(170, 150, 100, 0.04) 0 1px, transparent 1px 28px),
        radial-gradient(ellipse at 30% 20%, rgba(160, 130, 70, 0.12), transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(120, 90, 50, 0.10), transparent 60%),
        radial-gradient(circle at 65% 40%, rgba(80, 60, 30, 0.05) 0%, transparent 8%)
      `,
      ...style,
    }}>{children}</div>
  );

  // Stamp — red ink, slightly rotated, distressed
  const Stamp = ({ text, color = D.red, rotate = -8, size = 14, style }) => (
    <span style={{
      display: 'inline-block',
      fontFamily: D.type,
      fontSize: size,
      letterSpacing: 4,
      color,
      border: `2.5px solid ${color}`,
      padding: '4px 12px',
      transform: `rotate(${rotate}deg)`,
      textTransform: 'uppercase',
      fontWeight: 700,
      opacity: 0.88,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0)',
      ...style,
    }}>{text}</span>
  );

  // Redaction bar
  const Redact = ({ ch = 12 }) => (
    <span style={{ background: D.ink, color: 'transparent', padding: '0 4px', borderRadius: 1, fontFamily: D.mono, userSelect: 'none' }}>
      {'█'.repeat(ch)}
    </span>
  );

  const Slot = ({ w, h, label, style, kind = 'photo' }) => (
    <div style={{
      width: w, height: h, position: 'relative',
      background: D.paperShade,
      backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 8px, transparent 8px 16px)`,
      border: `1px solid ${D.paperEdge}`,
      boxShadow: `inset 0 0 0 6px ${D.paper}, inset 0 0 0 7px ${D.paperEdge}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 2, color: D.inkFaint, textTransform: 'uppercase' }}>{kind}</div>
        <div style={{ fontFamily: D.type, fontSize: 11, color: D.pencil, marginTop: 4, letterSpacing: 1 }}>[ {label} ]</div>
      </div>
    </div>
  );

  // Paperclip
  const Paperclip = ({ style }) => (
    <svg width="36" height="60" viewBox="0 0 36 60" style={{ filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.25))', ...style }}>
      <path d="M 11 6 Q 6 6 6 14 L 6 46 Q 6 56 18 56 Q 30 56 30 46 L 30 16 Q 30 10 24 10 Q 18 10 18 16 L 18 42 Q 18 46 14 46 Q 12 46 12 42 L 12 18"
        fill="none" stroke="#a8a8a8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  // Hand-drawn circle (annotation)
  const Circle = ({ w = 80, h = 30, color = D.redInk }) => (
    <svg viewBox="0 0 80 30" width={w} height={h} style={{ position: 'absolute', pointerEvents: 'none' }}>
      <path d="M 8 15 Q 8 4 40 4 Q 76 4 76 15 Q 76 26 40 26 Q 6 26 8 15 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );

  // ─── shell ─────────────────────────────────────────────────────────────
  function Shell({ route, setRoute, query, setQuery, children }) {
    const tabs = [
      ['home', 'Index'],
      ['games', 'Operations'],
      ['maps', 'Sites'],
      ['characters', 'Subjects'],
      ['lore', 'Memoranda'],
      ['timeline', 'Chronology'],
      ['relics', 'Catalogue'],
    ];
    return (
      <PaperBg style={{ minHeight: '100%', color: D.ink, fontFamily: D.serif }}>
        {/* top binder strip */}
        <div style={{ background: D.ink, color: D.paper, padding: '8px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: D.mono, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
          <span>FILE · ZB‑1991‑——0471 · EYES ONLY</span>
          <span>VOL. {Math.max(1, ZD.games.findIndex((g) => g.id === 'bo7') + 1)} OF VIII</span>
          <span>CLASSIFICATION: UMBRA</span>
        </div>

        {/* masthead */}
        <header style={{ padding: '28px 40px 16px', borderBottom: `2px solid ${D.ink}`, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div onClick={() => setRoute({ name: 'home' })} style={{ cursor: 'pointer' }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 3, color: D.redInk, textTransform: 'uppercase' }}>
                Office of Aetheric Affairs · Section IX
              </div>
              <h1 style={{ fontFamily: D.type, fontSize: 52, margin: '4px 0 0', letterSpacing: -1.5, fontWeight: 400, lineHeight: 0.95 }}>
                THE UMBRA DOSSIER
              </h1>
              <div style={{ fontFamily: D.serif, fontSize: 16, color: D.inkMute, marginTop: 4, fontStyle: 'italic' }}>
                A field reference for the undead.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <Stamp text="Authentic Copy" color={D.blue} rotate={3} size={10} />
              <Stamp text="Top Secret — Umbra" color={D.red} rotate={-4} size={11} />
            </div>
          </div>

          {/* tab strip */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, marginTop: 24, marginBottom: -2 }}>
            {tabs.map(([id, label]) => {
              const active = route.name === id;
              return (
                <button key={id} onClick={() => setRoute({ name: id })} style={{
                  background: active ? D.paper : D.paperShade,
                  border: `2px solid ${D.ink}`,
                  borderBottom: active ? `2px solid ${D.paper}` : `2px solid ${D.ink}`,
                  marginRight: 4, marginBottom: active ? -2 : 0,
                  padding: '10px 18px',
                  fontFamily: D.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                  color: active ? D.ink : D.inkMute,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  position: 'relative', zIndex: active ? 2 : 1,
                }}>{label}</button>
              );
            })}
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1.5px solid ${D.ink}`, padding: '6px 10px',
              background: D.paper, marginBottom: 2,
            }}>
              <span style={{ fontFamily: D.mono, fontSize: 10, color: D.inkMute }}>QUERY:</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setRoute({ name: 'search' })}
                placeholder=""
                style={{ background: 'transparent', border: 'none', outline: 'none', color: D.ink,
                  fontFamily: D.type, fontSize: 12, width: 200 }} />
            </div>
          </div>
        </header>

        <main style={{ padding: '36px 40px 60px', position: 'relative' }}>
          {children}
        </main>
      </PaperBg>
    );
  }

  // ─── home ──────────────────────────────────────────────────────────────
  function Home({ setRoute }) {
    return (
      <div>
        <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'start', marginBottom: 56 }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 10.5, letterSpacing: 3, color: D.redInk, marginBottom: 14 }}>
              FOREWORD — D/SIX, 14 SEPT 1991
            </div>
            <h2 style={{ fontFamily: D.type, fontSize: 64, lineHeight: 1, margin: 0, fontWeight: 400, letterSpacing: -1.5 }}>
              What follows is<br />
              not a guide.<br />
              <span style={{ color: D.redInk, fontStyle: 'italic' }}>It is evidence.</span>
            </h2>
            <p style={{ fontFamily: D.serif, fontSize: 18.5, lineHeight: 1.65, color: D.ink, marginTop: 24, maxWidth: 560 }}>
              Compiled across two decades of recovered after‑action reports, leaked Group 935
              memoranda, and field journals from operatives who lived long enough to write them
              down — this dossier collects every catalogued site, subject, and recoverable artefact
              of the Aetheric incursions to date.
            </p>
            <p style={{ fontFamily: D.serif, fontSize: 16.5, lineHeight: 1.6, color: D.inkMute, marginTop: 18, maxWidth: 540, fontStyle: 'italic' }}>
              Read what you need. Burn what you don’t. <Redact ch={18} /> approves.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
              <button onClick={() => setRoute({ name: 'maps' })} style={{
                background: D.ink, color: D.paper, border: `2px solid ${D.ink}`,
                padding: '13px 22px', fontFamily: D.mono, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                fontWeight: 700, cursor: 'pointer',
              }}>Open Site Index →</button>
              <button onClick={() => setRoute({ name: 'timeline' })} style={{
                background: 'transparent', color: D.ink, border: `2px solid ${D.ink}`,
                padding: '13px 22px', fontFamily: D.mono, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                fontWeight: 700, cursor: 'pointer',
              }}>Chronology</button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Paperclip style={{ position: 'absolute', top: -22, left: 18, zIndex: 3 }} />
            <FolderCard map={ZD.maps.find((m) => m.id === 'citadelle')} setRoute={setRoute} />
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <DossierHead n="01" title="Operational Volumes" sub="Eight catalogued operations. Sorted by canonical sequence." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {ZD.games.map((g, i) => (
              <button key={g.id} onClick={() => setRoute({ name: 'game', id: g.id })} style={{
                background: D.paper, border: `1.5px solid ${D.ink}`, padding: 14,
                textAlign: 'left', cursor: 'pointer', position: 'relative',
                boxShadow: i % 2 === 0 ? '3px 3px 0 ' + D.paperEdge : '-3px 3px 0 ' + D.paperEdge,
              }}>
                <div style={{ fontFamily: D.mono, fontSize: 9.5, letterSpacing: 2, color: D.redInk }}>
                  VOL. {String(i + 1).padStart(2, '0')} · {g.year}
                </div>
                <div style={{ fontFamily: D.type, fontSize: 22, marginTop: 8, lineHeight: 1.05, color: D.ink }}>{g.title}</div>
                <div style={{ fontFamily: D.serif, fontSize: 13, color: D.inkMute, marginTop: 4, fontStyle: 'italic' }}>{g.era}</div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1.5, color: D.pencil, marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{g.mapCount} SITES</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 24, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -16, right: 24 }}>
              <Stamp text="Subjects" rotate={4} color={D.redInk} size={11} />
            </div>
            <DossierHead n="02" title="Subjects of Interest" sub="Persons of record across operations." inset />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 16 }}>
              {ZD.characters.slice(0, 4).map((c, i) => (
                <button key={c.id} onClick={() => setRoute({ name: 'character', id: c.id })} style={{
                  background: 'transparent', border: `1px dashed ${D.inkFaint}`,
                  padding: 12, display: 'flex', gap: 12, cursor: 'pointer', textAlign: 'left', alignItems: 'center',
                }}>
                  <Slot w={64} h={84} label={c.name.split(' ')[0]} kind="photo" />
                  <div>
                    <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1.5, color: D.redInk }}>
                      SUBJECT {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: D.type, fontSize: 16, marginTop: 4, color: D.ink }}>{c.name}</div>
                    <div style={{ fontFamily: D.serif, fontSize: 12.5, color: D.inkMute, fontStyle: 'italic', marginTop: 2 }}>{c.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 24, position: 'relative' }}>
            <DossierHead n="03" title="Recent Memoranda" sub="Filed in the past quarter." inset />
            <div style={{ marginTop: 14 }}>
              {[
                { date: '14 SEP 91', title: 'On the Origin Cycle', author: 'D/SIX' },
                { date: '02 SEP 91', title: 'The Sentinel Artifact', author: 'WEAVER, G.' },
                { date: '21 AUG 91', title: 'Notes on Templar 1294', author: 'AGUINALDO, M.' },
              ].map((m, i) => (
                <button key={i} onClick={() => setRoute({ name: 'lore' })} style={{
                  display: 'grid', gridTemplateColumns: '88px 1fr auto', gap: 14, alignItems: 'baseline',
                  padding: '12px 0', cursor: 'pointer', background: 'transparent',
                  border: 'none', borderTop: i === 0 ? 'none' : `1px dashed ${D.inkFaint}`,
                  width: '100%', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: D.mono, fontSize: 10, color: D.redInk, letterSpacing: 1.4 }}>{m.date}</span>
                  <div>
                    <div style={{ fontFamily: D.type, fontSize: 17, color: D.ink }}>{m.title}</div>
                    <div style={{ fontFamily: D.mono, fontSize: 9.5, color: D.inkMute, marginTop: 2, letterSpacing: 1.2 }}>FILED BY {m.author}</div>
                  </div>
                  <span style={{ fontFamily: D.mono, fontSize: 10, color: D.ink }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  function FolderCard({ map, setRoute }) {
    return (
      <div style={{
        background: D.paper, border: `2px solid ${D.ink}`,
        padding: 18, position: 'relative',
        boxShadow: `4px 4px 0 ${D.paperEdge}, 8px 8px 0 ${D.ink}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk }}>SITE BRIEF · FEATURED</div>
            <div style={{ fontFamily: D.type, fontSize: 26, color: D.ink, marginTop: 4, lineHeight: 1 }}>{map.name}</div>
          </div>
          <Stamp text="Active" color={D.redInk} rotate={-6} size={9} />
        </div>
        <Slot w="100%" h={180} label={map.name.toUpperCase()} kind="surveillance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid ${D.ink}`, marginTop: 16 }}>
          {[
            ['DIFF', map.difficulty + '/5'],
            ['EE', map.eeCount],
            ['RELICS', map.relicCount],
          ].map(([k, v], i) => (
            <div key={k} style={{ padding: '10px 12px', borderRight: i < 2 ? `1px dashed ${D.inkFaint}` : 'none' }}>
              <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 2, color: D.inkMute }}>{k}</div>
              <div style={{ fontFamily: D.type, fontSize: 20, color: D.ink, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setRoute({ name: 'map', id: map.id })} style={{
          background: D.ink, color: D.paper, border: 'none', width: '100%',
          padding: '12px', fontFamily: D.mono, fontSize: 10.5, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700,
          cursor: 'pointer', marginTop: 16,
        }}>Open Folder →</button>
      </div>
    );
  }

  function DossierHead({ n, title, sub, inset }) {
    return (
      <div style={{ marginBottom: inset ? 0 : 24, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: `1.5px solid ${D.ink}`, paddingBottom: 8 }}>
          <span style={{ fontFamily: D.type, fontSize: 36, color: D.redInk, letterSpacing: -1 }}>{n}</span>
          <div>
            <div style={{ fontFamily: D.type, fontSize: 22, color: D.ink, letterSpacing: -0.3 }}>{title}</div>
            {sub && <div style={{ fontFamily: D.mono, fontSize: 10, color: D.inkMute, letterSpacing: 1.5, marginTop: 2 }}>{sub.toUpperCase()}</div>}
          </div>
        </div>
      </div>
    );
  }

  // ─── page heading ──────────────────────────────────────────────────────
  function PageHead({ crumbs, n, title, sub }) {
    return (
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2.5, color: D.inkMute, marginBottom: 12, textTransform: 'uppercase' }}>
          {crumbs.join(' / ')}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          {n && <span style={{ fontFamily: D.type, fontSize: 60, color: D.redInk, letterSpacing: -2, lineHeight: 1 }}>{n}</span>}
          <h1 style={{ fontFamily: D.type, fontSize: 52, margin: 0, fontWeight: 400, letterSpacing: -1, lineHeight: 1 }}>{title}</h1>
        </div>
        {sub && <p style={{ fontFamily: D.serif, fontSize: 18, color: D.inkMute, fontStyle: 'italic', marginTop: 14, maxWidth: 720, lineHeight: 1.55 }}>{sub}</p>}
      </div>
    );
  }

  // ─── games (operations) ────────────────────────────────────────────────
  function Games({ setRoute }) {
    return (
      <div>
        <PageHead crumbs={['Index', 'Operations']} n="OP" title="Operational Volumes" sub="Each volume catalogues one phase of the Aetheric incursions. Read in order for narrative coherence; in any order for tactical reference." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ZD.games.map((g, i) => {
            const gameMaps = ZD.maps.filter((m) => m.game === g.id);
            return (
              <button key={g.id} onClick={() => setRoute({ name: 'game', id: g.id })} style={{
                background: D.paper, border: `1.5px solid ${D.ink}`, padding: 0,
                display: 'grid', gridTemplateColumns: '110px 100px 1fr auto', gap: 0, alignItems: 'stretch',
                cursor: 'pointer', textAlign: 'left',
                boxShadow: '3px 3px 0 ' + D.paperEdge,
              }}>
                <div style={{ background: D.ink, color: D.paper, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 2 }}>VOL.</div>
                  <div style={{ fontFamily: D.type, fontSize: 38, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1.5 }}>{g.year}</div>
                </div>
                <Slot w={100} h={110} label={g.code} kind="cover" />
                <div style={{ padding: '14px 20px' }}>
                  <div style={{ fontFamily: D.type, fontSize: 24, color: D.ink, lineHeight: 1.1 }}>{g.title}</div>
                  <div style={{ fontFamily: D.serif, fontSize: 14.5, fontStyle: 'italic', color: D.inkMute, marginTop: 4 }}>{g.era}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {gameMaps.slice(0, 6).map((m) => (
                      <span key={m.id} style={{ fontFamily: D.mono, fontSize: 9.5, color: D.pencil, padding: '2px 6px', border: `1px solid ${D.inkFaint}`, letterSpacing: 1 }}>{m.name}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <Stamp text={gameMaps.length + ' filed'} color={gameMaps.length ? D.redInk : D.inkMute} rotate={6} size={10} />
                  <span style={{ fontFamily: D.mono, fontSize: 11, color: D.ink, letterSpacing: 1.5 }}>OPEN →</span>
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
        <PageHead crumbs={['Index', 'Operations', g.title]} title={g.title} sub={g.era} />
        <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
          <Stamp text={g.year} color={D.redInk} rotate={-3} size={11} />
          <Stamp text={gameMaps.length + ' SITES'} color={D.blue} rotate={2} size={11} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {gameMaps.map((m, i) => <MapCard key={m.id} map={m} index={i} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function MapCard({ map, index, setRoute }) {
    return (
      <button onClick={() => setRoute({ name: 'map', id: map.id })} style={{
        background: D.paper, border: `1.5px solid ${D.ink}`, padding: 0,
        cursor: 'pointer', textAlign: 'left', position: 'relative',
        boxShadow: '3px 3px 0 ' + D.paperEdge,
      }}>
        {index === 0 && (
          <Paperclip style={{ position: 'absolute', top: -22, right: 18, zIndex: 2, transform: 'rotate(15deg)' }} />
        )}
        <Slot w="100%" h={140} label={map.name.toUpperCase()} kind="surveillance" style={{ border: 'none', borderBottom: `1.5px solid ${D.ink}`, boxShadow: 'none' }} />
        <div style={{ padding: 14 }}>
          <div style={{ fontFamily: D.mono, fontSize: 9.5, letterSpacing: 1.8, color: D.redInk }}>SITE · {map.location.split(',')[0].toUpperCase()}</div>
          <div style={{ fontFamily: D.type, fontSize: 19, color: D.ink, marginTop: 4, lineHeight: 1.1 }}>{map.name}</div>
          <div style={{ fontFamily: D.serif, fontSize: 13.5, fontStyle: 'italic', color: D.inkMute, marginTop: 4 }}>“{map.location}”</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, fontFamily: D.mono, fontSize: 9.5, color: D.pencil, letterSpacing: 1.4 }}>
            <span>EE {map.eeCount}</span>
            <span style={{ color: D.inkFaint }}>·</span>
            <span>REL {map.relicCount}</span>
            <span style={{ marginLeft: 'auto', color: D.redInk }}>{'▪'.repeat(map.difficulty)}{'▫'.repeat(5 - map.difficulty)}</span>
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
        <PageHead crumbs={['Index', 'Sites']} n="SI" title="Catalogued Sites" sub="All field locations on file. Filter by operational volume to narrow." />
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>ALL</Chip>
          {ZD.games.map((g) => <Chip key={g.id} active={filter === g.id} onClick={() => setFilter(g.id)}>{g.code}</Chip>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {list.map((m, i) => <MapCard key={m.id} map={m} index={i} setRoute={setRoute} />)}
        </div>
      </div>
    );
  }

  function Chip({ active, onClick, children }) {
    return (
      <button onClick={onClick} style={{
        background: active ? D.ink : 'transparent',
        color: active ? D.paper : D.ink,
        border: `1.5px solid ${D.ink}`,
        padding: '6px 12px',
        fontFamily: D.mono, fontSize: 10, letterSpacing: 2,
        cursor: 'pointer', fontWeight: 600,
      }}>{children}</button>
    );
  }

  // ─── map detail ─────────────────────────────────────────────────────────
  function MapDetail({ id, setRoute }) {
    const m = ZD.maps.find((x) => x.id === id);
    const g = ZD.games.find((x) => x.id === m.game);
    const ee = ZD.sampleEE;
    return (
      <div>
        <PageHead crumbs={['Index', 'Sites', m.name]} title={m.name} sub={m.location} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <Paperclip style={{ position: 'absolute', top: -24, left: 32, zIndex: 2 }} />
            <Slot w="100%" h={340} label={m.name.toUpperCase()} kind="surveillance" />
            <div style={{ position: 'absolute', top: 18, right: 18 }}>
              <Stamp text="On Record" color={D.redInk} rotate={-6} size={10} />
            </div>
          </div>
          <div style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 22 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: D.mono, fontSize: 12 }}>
              <tbody>
                {[
                  ['Operation', g.title + ' (' + g.year + ')'],
                  ['Site name', m.name],
                  ['Location', m.location],
                  ['Difficulty', m.difficulty + ' / 5'],
                  ['Main quests', m.eeCount],
                  ['Relics on site', m.relicCount],
                  ['Classification', 'UMBRA'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: `1px dashed ${D.inkFaint}` }}>
                    <td style={{ padding: '8px 4px 8px 0', color: D.inkMute, letterSpacing: 1.2, textTransform: 'uppercase', width: '40%' }}>{k}</td>
                    <td style={{ padding: '8px 0', color: D.ink, fontFamily: D.type, fontSize: 14 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {m.tags.map((t) => <span key={t} style={{ fontFamily: D.mono, fontSize: 9.5, padding: '2px 8px', border: `1px solid ${D.inkFaint}`, color: D.pencil, letterSpacing: 1.2 }}>{t}</span>)}
            </div>
          </div>
        </div>

        <div style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 24, marginBottom: 32 }}>
          <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2.5, color: D.redInk, marginBottom: 10 }}>SITE BRIEFING</div>
          <p style={{ fontFamily: D.serif, fontSize: 17.5, lineHeight: 1.7, color: D.ink, margin: 0 }}>
            {m.summary}
          </p>
        </div>

        <DossierHead n="§" title="Main Quest" sub={m.eeCount ? 'One catalogued. Click to expand.' : 'None catalogued.'} />
        {m.eeCount ? (
          <button onClick={() => setRoute({ name: 'ee', id: ee.id })} style={{
            width: '100%', background: D.paper, border: `2px solid ${D.ink}`,
            padding: 0, display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 0,
            cursor: 'pointer', textAlign: 'left', marginBottom: 32,
            boxShadow: '4px 4px 0 ' + D.paperEdge,
          }}>
            <div style={{ background: D.ink, color: D.paper, padding: 16, fontFamily: D.type, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>EE</div>
            <div style={{ padding: '18px 22px' }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk }}>
                MAIN QUEST · {ee.difficulty.toUpperCase()} · {ee.duration} · {ee.party.toUpperCase()}
              </div>
              <div style={{ fontFamily: D.type, fontSize: 26, color: D.ink, marginTop: 6 }}>{ee.title}</div>
              <div style={{ fontFamily: D.serif, fontSize: 14.5, color: D.inkMute, marginTop: 6, maxWidth: 580, fontStyle: 'italic' }}>{ee.summary}</div>
            </div>
            <div style={{ padding: 22, display: 'flex', alignItems: 'center', borderLeft: `1.5px dashed ${D.inkFaint}` }}>
              <span style={{ fontFamily: D.mono, fontSize: 11, color: D.redInk, letterSpacing: 2 }}>BEGIN →</span>
            </div>
          </button>
        ) : null}

        <DossierHead n="❖" title="Site Relics" sub={m.relicCount ? m.relicCount + ' catalogued on this site.' : 'None recovered.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {Array.from({ length: m.relicCount }).map((_, i) => (
            <div key={i} style={{ background: D.paper, border: `1px dashed ${D.ink}`, padding: 14, textAlign: 'center' }}>
              <div style={{ fontFamily: D.mono, fontSize: 9, color: D.redInk, letterSpacing: 1.5 }}>{String(i + 1).padStart(3, '0')}</div>
              <Slot w="100%" h={70} label="OBJ" kind="object" style={{ marginTop: 10 }} />
              <div style={{ fontFamily: D.type, fontSize: 13, color: D.ink, marginTop: 10 }}>Relic — {String.fromCharCode(65 + i)}</div>
            </div>
          ))}
          {m.relicCount === 0 && (
            <div style={{ gridColumn: '1 / -1', fontFamily: D.serif, fontStyle: 'italic', color: D.inkMute, fontSize: 15 }}>
              No relics on file. Site predates the Relic catalogue programme.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── EE walkthrough ─────────────────────────────────────────────────────
  function EE({ setRoute }) {
    const ee = ZD.sampleEE;
    const m = ZD.maps.find((x) => x.id === ee.map);
    const [completed, setCompleted] = useState(new Set());
    const [active, setActive] = useState(0);

    const toggle = (n) => setCompleted((s) => {
      const ns = new Set(s); if (ns.has(n)) ns.delete(n); else ns.add(n); return ns;
    });

    return (
      <div>
        <PageHead crumbs={['Index', 'Sites', m.name, 'Main Quest']} title={ee.title} sub={ee.summary} />
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <Stamp text={'Difficulty · ' + ee.difficulty} color={D.redInk} rotate={-3} size={10} />
          <Stamp text={ee.duration} color={D.blue} rotate={2} size={10} />
          <Stamp text={ee.party} color={D.pencil} rotate={-1} size={10} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
          {/* index card list */}
          <div style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 18 }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk, marginBottom: 12 }}>
              STEP LOG · {completed.size}/{ee.steps.length}
            </div>
            {ee.steps.map((s, i) => {
              const done = completed.has(s.n);
              const isActive = i === active;
              return (
                <button key={s.n} onClick={() => setActive(i)} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '10px 4px',
                  background: isActive ? D.paperShade : 'transparent',
                  border: 'none', borderBottom: i < ee.steps.length - 1 ? `1px dashed ${D.inkFaint}` : 'none',
                  width: '100%', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span onClick={(e) => { e.stopPropagation(); toggle(s.n); }} style={{
                    width: 22, height: 22, border: `1.5px solid ${D.ink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? D.ink : D.paper,
                    color: done ? D.paper : D.ink,
                    fontFamily: D.type, fontSize: 14, marginTop: 1,
                  }}>{done ? '✓' : ''}</span>
                  <div>
                    <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1.5, color: D.redInk }}>
                      STEP {String(s.n).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: D.type, fontSize: 14.5, color: D.ink, marginTop: 2, textDecoration: done ? 'line-through' : 'none' }}>{s.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* active step pane — like a typed report page */}
          <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 28, position: 'relative', boxShadow: '4px 4px 0 ' + D.paperEdge }}>
            <div style={{ position: 'absolute', top: 18, right: 18 }}>
              <Stamp text={'Step ' + ee.steps[active].n + ' of ' + ee.steps.length} color={D.redInk} rotate={2} size={10} />
            </div>
            <Slot w="100%" h={220} label={('Step ' + ee.steps[active].n + ' — Field Photograph').toUpperCase()} kind="evidence" />
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <span style={{ fontFamily: D.type, fontSize: 56, color: D.redInk, letterSpacing: -2, lineHeight: 1 }}>{String(ee.steps[active].n).padStart(2, '0')}</span>
              <div style={{ position: 'relative' }}>
                <Circle w={200} h={36} />
                <h2 style={{ fontFamily: D.type, fontSize: 32, margin: 0, letterSpacing: -0.6, lineHeight: 1, padding: '4px 8px' }}>{ee.steps[active].title}</h2>
              </div>
            </div>
            <p style={{
              fontFamily: D.serif, fontSize: 17, lineHeight: 1.75, color: D.ink, marginTop: 24,
              maxWidth: 620,
            }}>
              {ee.steps[active].body}
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
              <button disabled={active === 0} onClick={() => setActive((a) => a - 1)} style={{
                background: 'transparent', color: active === 0 ? D.inkFaint : D.ink,
                border: `1.5px solid ${active === 0 ? D.inkFaint : D.ink}`,
                padding: '11px 18px', fontFamily: D.mono, fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase',
                fontWeight: 600, cursor: active === 0 ? 'not-allowed' : 'pointer',
              }}>← Prev</button>
              <button onClick={() => { toggle(ee.steps[active].n); if (active < ee.steps.length - 1) setActive((a) => a + 1); }} style={{
                background: D.ink, color: D.paper, border: 'none',
                padding: '11px 22px', fontFamily: D.mono, fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
                cursor: 'pointer',
              }}>{completed.has(ee.steps[active].n) ? 'Step Logged' : 'Log Step'} →</button>
            </div>

            <div style={{ marginTop: 28, borderTop: `1px dashed ${D.inkFaint}`, paddingTop: 18 }}>
              <div style={{ fontFamily: D.mono, fontSize: 9.5, letterSpacing: 2, color: D.redInk, marginBottom: 8 }}>FILED REWARDS</div>
              <div style={{ fontFamily: D.serif, fontSize: 15.5, color: D.ink }}>
                {ee.rewards.map((r, i) => (
                  <span key={r} style={{ fontStyle: 'italic' }}>
                    {r}{i < ee.rewards.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── characters ─────────────────────────────────────────────────────────
  function Characters({ setRoute }) {
    return (
      <div>
        <PageHead crumbs={['Index', 'Subjects']} n="SU" title="Subjects of Interest" sub="Operatives, defectors, civilians, and figures of indeterminate status. Catalogued under cryptonym where applicable." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {ZD.characters.map((c, i) => (
            <button key={c.id} onClick={() => setRoute({ name: 'character', id: c.id })} style={{
              background: D.paper, border: `1.5px solid ${D.ink}`, padding: 14,
              cursor: 'pointer', textAlign: 'left', position: 'relative',
              boxShadow: '3px 3px 0 ' + D.paperEdge,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1.5, color: D.redInk }}>SUBJ. {String(i + 1).padStart(2, '0')}</div>
                <Stamp text="Cleared" color={D.blue} rotate={-4} size={8} />
              </div>
              <Slot w="100%" h={160} label={c.name.split(' ').pop().toUpperCase()} kind="dossier-photo" />
              <div style={{ fontFamily: D.type, fontSize: 17, color: D.ink, marginTop: 12, lineHeight: 1.1 }}>{c.name}</div>
              <div style={{ fontFamily: D.serif, fontSize: 13, fontStyle: 'italic', color: D.inkMute, marginTop: 3 }}>{c.role}</div>
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
        <PageHead crumbs={['Index', 'Subjects', c.name]} title={c.name} sub={c.role} />
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32 }}>
          <div>
            <div style={{ position: 'relative' }}>
              <Paperclip style={{ position: 'absolute', top: -22, left: 22, zIndex: 2 }} />
              <Slot w={320} h={400} label={c.name.split(' ').pop().toUpperCase()} kind="dossier-photo" />
            </div>
            <div style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 18, marginTop: 18 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: D.mono, fontSize: 11 }}>
                <tbody>
                  {[
                    ['NAME', c.name],
                    ['ROLE', c.role],
                    ['ORIGIN', c.origin],
                    ['STATUS', 'Active'],
                    ['CLEARANCE', <Redact ch={6} key="r" />],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ padding: '5px 4px 5px 0', color: D.inkMute, letterSpacing: 1.2, width: '38%' }}>{k}</td>
                      <td style={{ padding: '5px 0', color: D.ink, fontFamily: D.type, fontSize: 13 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 28, position: 'relative', boxShadow: '4px 4px 0 ' + D.paperEdge }}>
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <Stamp text="On File" color={D.redInk} rotate={-5} size={10} />
              </div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2.5, color: D.redInk }}>RECORDED STATEMENT</div>
              <blockquote style={{ fontFamily: D.type, fontSize: 26, lineHeight: 1.35, color: D.ink, margin: '12px 0 0', fontStyle: 'italic' }}>
                “{c.quote}”
              </blockquote>
              <div style={{ fontFamily: D.mono, fontSize: 10, color: D.inkMute, marginTop: 16, letterSpacing: 1.5 }}>
                ATTRIBUTED · {c.name.toUpperCase()} · OPS LOG — <Redact ch={4} />
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <DossierHead n="§" title="Biographical Note" sub="Compiled from open‑source and recovered field reports." />
              <p style={{ fontFamily: D.serif, fontSize: 18, lineHeight: 1.75, color: D.ink, marginTop: 16 }}>
                {c.summary}
              </p>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk, marginBottom: 10 }}>OBSERVED AT</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ZD.maps.slice(0, 6).map((m) => (
                  <button key={m.id} onClick={() => setRoute({ name: 'map', id: m.id })} style={{
                    background: 'transparent', border: `1px solid ${D.ink}`, color: D.ink,
                    padding: '5px 11px', fontFamily: D.mono, fontSize: 10.5, letterSpacing: 1.4,
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

  // ─── lore (memorandum) ─────────────────────────────────────────────────
  function Lore() {
    return (
      <div>
        <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 0, position: 'relative', boxShadow: '6px 6px 0 ' + D.paperEdge, maxWidth: 900 }}>
          <div style={{ background: D.ink, color: D.paper, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', fontFamily: D.mono, fontSize: 10, letterSpacing: 2.5 }}>
            <span>MEMORANDUM · D/SIX</span>
            <span>14 SEPT 1991</span>
            <span>EYES ONLY</span>
          </div>
          <div style={{ padding: '36px 56px 48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk }}>FROM · D/SIX</div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk, marginTop: 4 }}>TO · <Redact ch={14} /></div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk, marginTop: 4 }}>RE · ORIGIN CYCLE</div>
              </div>
              <Stamp text="Top Secret" color={D.red} rotate={-6} size={12} />
            </div>

            <h1 style={{ fontFamily: D.type, fontSize: 44, margin: '12px 0 6px', letterSpacing: -1, lineHeight: 1 }}>On the Origin Cycle</h1>
            <div style={{ fontFamily: D.serif, fontSize: 16, fontStyle: 'italic', color: D.inkMute, marginBottom: 28, borderBottom: `1.5px solid ${D.ink}`, paddingBottom: 14 }}>
              Why Maxis keeps starting over. A reading of the loop, its breakers, and the cost of breaking it.
            </div>

            <article style={{ fontFamily: D.serif, fontSize: 17.5, lineHeight: 1.8, color: D.ink, position: 'relative' }}>
              <p style={{ marginTop: 0, position: 'relative' }}>
                The Aether Story is not a sequence; it is a wheel. Dr. <Circle w={68} h={26} /><span style={{ padding: '0 4px' }}>Maxis</span> is the closest thing the loop has to a narrator, and even he does not control the rotation — he is only the one who keeps the lights on between turns.
              </p>
              <p>
                The cycle begins at Generation Station 64, a German dig that breached an Element 115 deposit during the closing months of the Great War. Four soldiers — the men we will come to call <em>Primis</em> — are killed, brought back, and given a fragment of memory that does not belong to them.
              </p>
              <p style={{ position: 'relative' }}>
                What they remember is the previous turn of the wheel: a moon shattered, a daughter trapped in a machine, a friend with a syringe. They do not have the words for any of it. <span style={{ fontFamily: D.type, fontSize: 14, color: D.redInk, marginLeft: 6 }}>— see footnote 4.</span>
              </p>
              <h3 style={{ fontFamily: D.type, fontSize: 26, marginTop: 36, marginBottom: 12, color: D.ink }}>The Cost of Breaking It</h3>
              <p>
                By the time of Revelations, every variable that can be moved has been moved. The cycle does not end — it is <em>retired</em>. The new cycle, the Dark Aether era, begins on the same battlefield with none of the same actors and one new word for the same thing.
              </p>
              <p style={{ borderLeft: `2px solid ${D.redInk}`, paddingLeft: 18, fontStyle: 'italic', color: D.inkMute, marginTop: 24 }}>
                That word is <Redact ch={10} />, and it remembers everything.
              </p>

              <div style={{ marginTop: 36, borderTop: `1.5px solid ${D.ink}`, paddingTop: 14 }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 2, color: D.redInk, marginBottom: 6 }}>SIGNED</div>
                <div style={{ fontFamily: '"Caveat", "Marker Felt", cursive', fontSize: 28, color: D.blue, lineHeight: 1 }}>D/Six</div>
                <div style={{ fontFamily: D.mono, fontSize: 10, color: D.inkMute, marginTop: 4, letterSpacing: 1.2 }}>OFFICE OF AETHERIC AFFAIRS · 14 SEP 91</div>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  // ─── timeline ───────────────────────────────────────────────────────────
  function Timeline() {
    return (
      <div>
        <PageHead crumbs={['Index', 'Chronology']} n="CH" title="Chronology of Incidents" sub="In strict chronological order. Use cross‑reference codes to locate corresponding sites and subjects." />
        <div style={{ background: D.paper, border: `2px solid ${D.ink}`, padding: 0, position: 'relative', boxShadow: '4px 4px 0 ' + D.paperEdge }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: D.serif }}>
            <thead>
              <tr style={{ background: D.ink, color: D.paper }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: D.mono, fontSize: 10, letterSpacing: 2 }}>YEAR</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: D.mono, fontSize: 10, letterSpacing: 2 }}>CODE</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: D.mono, fontSize: 10, letterSpacing: 2 }}>INCIDENT</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontFamily: D.mono, fontSize: 10, letterSpacing: 2 }}>REPORT</th>
              </tr>
            </thead>
            <tbody>
              {ZD.timeline.map((t, i) => (
                <tr key={i} style={{ borderBottom: `1px dashed ${D.inkFaint}`, background: i % 2 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                  <td style={{ padding: '16px 14px', fontFamily: D.type, fontSize: 22, color: D.redInk, verticalAlign: 'top', width: 100 }}>{t.year}</td>
                  <td style={{ padding: '16px 14px', fontFamily: D.mono, fontSize: 11, color: D.pencil, letterSpacing: 1.3, verticalAlign: 'top', width: 110 }}>INC‑{String(i + 1).padStart(3, '0')}</td>
                  <td style={{ padding: '16px 14px', fontFamily: D.type, fontSize: 17, color: D.ink, verticalAlign: 'top', width: 240 }}>{t.title}</td>
                  <td style={{ padding: '16px 14px', fontFamily: D.serif, fontSize: 15.5, lineHeight: 1.55, color: D.inkMute }}>{t.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ─── relics ────────────────────────────────────────────────────────────
  function Relics() {
    const items = [
      ['Templar Shard', 'Citadelle des Morts'],
      ['Reliquary Coin', 'The Tomb'],
      ['Sentinel Fragment', 'Forsaken'],
      ['Echoing Bell', 'Terminus'],
      ['Spine of Ull', 'Liberty Falls'],
      ['Wreath of Krause', 'Astro Malorum'],
      ['Vril Pendant', 'Ashes of the Damned'],
      ['Eye of Stachel', 'Paradox Junction'],
      ['Crown of Solais', 'Totenreich'],
      ['Brand Mark', 'Citadelle des Morts'],
      ['Carolingian Quill', 'The Tomb'],
      ['Bone of the First', 'Astro Malorum'],
    ];
    return (
      <div>
        <PageHead crumbs={['Index', 'Catalogue']} n="CA" title="Relic Catalogue" sub="Recovered Aetheric artefacts on file. Each item cross‑referenced with discovery site." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {items.map(([name, where], i) => (
            <div key={i} style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 16, display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, alignItems: 'center', boxShadow: '3px 3px 0 ' + D.paperEdge }}>
              <Slot w={88} h={88} label="OBJ" kind="object" />
              <div>
                <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1.5, color: D.redInk }}>CAT. {String(i + 1).padStart(3, '0')}</div>
                <div style={{ fontFamily: D.type, fontSize: 17, color: D.ink, marginTop: 4, lineHeight: 1.1 }}>{name}</div>
                <div style={{ fontFamily: D.serif, fontSize: 13, fontStyle: 'italic', color: D.inkMute, marginTop: 4 }}>recovered — {where}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── search ─────────────────────────────────────────────────────────────
  function Search({ query, setRoute }) {
    const q = (query || '').toLowerCase();
    const hits = useMemo(() => {
      const out = [];
      ZD.maps.forEach((m) => {
        if (!q || m.name.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q))
          out.push({ kind: 'SITE', id: m.id, title: m.name, sub: m.location, route: { name: 'map', id: m.id } });
      });
      ZD.characters.forEach((c) => {
        if (!q || c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
          out.push({ kind: 'SUBJECT', id: c.id, title: c.name, sub: c.role, route: { name: 'character', id: c.id } });
      });
      ZD.wonderWeapons.forEach((w) => {
        if (!q || w.name.toLowerCase().includes(q))
          out.push({ kind: 'OBJECT', id: w.id, title: w.name, sub: w.summary, route: { name: 'home' } });
      });
      return out.slice(0, 12);
    }, [q]);
    return (
      <div>
        <PageHead crumbs={['Index', 'Search']} n="SE" title={'Query — ' + (query || '')} sub={hits.length + ' record' + (hits.length === 1 ? '' : 's') + ' found in archive.'} />
        <div style={{ background: D.paper, border: `1.5px solid ${D.ink}`, padding: 0 }}>
          {hits.map((h, i) => (
            <button key={i} onClick={() => setRoute(h.route)} style={{
              display: 'grid', gridTemplateColumns: '110px 1fr auto', alignItems: 'center', gap: 18,
              padding: '14px 18px', background: i % 2 ? 'rgba(0,0,0,0.02)' : 'transparent',
              border: 'none', borderBottom: i < hits.length - 1 ? `1px dashed ${D.inkFaint}` : 'none',
              width: '100%', textAlign: 'left', cursor: 'pointer',
            }}>
              <span style={{ fontFamily: D.mono, fontSize: 10, color: D.redInk, letterSpacing: 2 }}>{h.kind}</span>
              <div>
                <div style={{ fontFamily: D.type, fontSize: 19, color: D.ink }}>{h.title}</div>
                <div style={{ fontFamily: D.serif, fontSize: 14.5, color: D.inkMute, marginTop: 2 }}>{h.sub}</div>
              </div>
              <span style={{ fontFamily: D.mono, fontSize: 11, color: D.ink, letterSpacing: 1.5 }}>OPEN →</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── router ─────────────────────────────────────────────────────────────
  function Dossier() {
    const [route, setRoute] = useState({ name: 'home' });
    const [query, setQuery] = useState('Citadelle');
    useEffect(() => {
      const wrap = document.getElementById('dossier-scroll');
      if (wrap) wrap.scrollTop = 0;
    }, [route]);
    let page;
    switch (route.name) {
      case 'games': page = <Games setRoute={setRoute} />; break;
      case 'game': page = <Game id={route.id} setRoute={setRoute} />; break;
      case 'maps': page = <Maps setRoute={setRoute} />; break;
      case 'map': page = <MapDetail id={route.id} setRoute={setRoute} />; break;
      case 'ee': page = <EE setRoute={setRoute} />; break;
      case 'characters': page = <Characters setRoute={setRoute} />; break;
      case 'character': page = <CharacterDetail id={route.id} setRoute={setRoute} />; break;
      case 'lore': page = <Lore />; break;
      case 'timeline': page = <Timeline />; break;
      case 'relics': page = <Relics />; break;
      case 'search': page = <Search query={query} setRoute={setRoute} />; break;
      default: page = <Home setRoute={setRoute} />;
    }
    return (
      <Shell route={route} setRoute={setRoute} query={query} setQuery={setQuery}>
        <div id="dossier-scroll">{page}</div>
      </Shell>
    );
  }

  window.Dossier = Dossier;
})();
