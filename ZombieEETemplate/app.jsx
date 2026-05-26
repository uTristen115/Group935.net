const { useState, useEffect, useMemo, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7cd992",
  "density": "regular",
  "railStyle": "numbers"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  "#7cd992": { soft: "rgba(124,217,146,0.14)", line: "rgba(124,217,146,0.45)" },
  "#ff7a59": { soft: "rgba(255,122,89,0.14)",  line: "rgba(255,122,89,0.45)" },
  "#5aa6ff": { soft: "rgba(90,166,255,0.14)",  line: "rgba(90,166,255,0.45)" },
  "#d6b86b": { soft: "rgba(214,184,107,0.14)", line: "rgba(214,184,107,0.45)" },
  "#c673ff": { soft: "rgba(198,115,255,0.14)", line: "rgba(198,115,255,0.45)" }
};

function Icon({ name, ...p }) {
  const paths = {
    check: <polyline points="20 6 9 17 4 12" />,
    chevR: <polyline points="9 18 15 12 9 6" />,
    chevL: <polyline points="15 18 9 12 15 6" />,
    reset: (<><path d="M3 12a9 9 0 1 0 3-6.7" /><polyline points="3 4 3 9 8 9" /></>),
    bolt:  <polygon points="13 2 4 14 11 14 11 22 20 10 13 10 13 2" />,
    info:  (<><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></>),
    list:  (<><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>),
    target:(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>),
    image: (<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>)
  };
  return <svg className="ic" viewBox="0 0 24 24" {...p}>{paths[name]}</svg>;
}

const STORAGE = "ee_template_progress_v1";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE) || "{}"); }
  catch { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(STORAGE, JSON.stringify(p)); } catch {}
}

function isStepDone(step, progress) {
  const p = progress[step.id] || {};
  if (step.substeps && step.substeps.length) {
    return step.substeps.every((_, i) => p["s" + i]);
  }
  return !!p.main;
}

function isSubDone(stepId, i, progress) {
  return !!(progress[stepId] && progress[stepId]["s" + i]);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = useMemo(() => {
    try { return JSON.parse(document.getElementById("ee-data").textContent); }
    catch { return { steps: [] }; }
  }, []);
  const steps = data.steps;
  const [activeId, setActiveId] = useState(() => {
    try { return localStorage.getItem(STORAGE + "_active") || steps[0].id; }
    catch { return steps[0].id; }
  });
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => { saveProgress(progress); }, [progress]);
  useEffect(() => { try { localStorage.setItem(STORAGE + "_active", activeId); } catch {} }, [activeId]);

  // accent application
  useEffect(() => {
    const root = document.documentElement;
    const preset = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS["#7cd992"];
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-soft", preset.soft);
    root.style.setProperty("--accent-line", preset.line);
  }, [t.accent]);

  useEffect(() => {
    document.body.classList.remove("density-compact","density-regular","density-spacious");
    document.body.classList.add("density-" + t.density);
  }, [t.density]);

  useEffect(() => {
    document.body.classList.remove("rail-line","rail-numbers","rail-dots");
    document.body.classList.add("rail-" + t.railStyle);
  }, [t.railStyle]);

  const activeIdx = Math.max(0, steps.findIndex(s => s.id === activeId));
  const active = steps[activeIdx];

  const doneCount = steps.filter(s => isStepDone(s, progress)).length;
  const pct = Math.round((doneCount / steps.length) * 100);

  const toggleMain = () => {
    setProgress(prev => {
      const stepP = { ...(prev[active.id] || {}) };
      if (active.substeps && active.substeps.length) {
        // toggle all
        const allDone = active.substeps.every((_, i) => stepP["s" + i]);
        active.substeps.forEach((_, i) => { stepP["s" + i] = !allDone; });
      } else {
        stepP.main = !stepP.main;
      }
      return { ...prev, [active.id]: stepP };
    });
  };

  const toggleSub = (i) => {
    setProgress(prev => {
      const stepP = { ...(prev[active.id] || {}) };
      stepP["s" + i] = !stepP["s" + i];
      return { ...prev, [active.id]: stepP };
    });
  };

  const resetAll = () => {
    if (!confirm("Reset all progress for this tutorial?")) return;
    setProgress({});
  };

  const prev = activeIdx > 0 ? steps[activeIdx - 1] : null;
  const next = activeIdx < steps.length - 1 ? steps[activeIdx + 1] : null;

  // keyboard nav
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" && next) setActiveId(next.id);
      if (e.key === "ArrowLeft"  && prev) setActiveId(prev.id);
      if (e.key === " ") { e.preventDefault(); toggleMain(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev, active, progress]);

  const activeDone = active ? isStepDone(active, progress) : false;

  return (
    <div className="app">
      <Rail
        title={data.title}
        subtitle={data.subtitle}
        steps={steps}
        activeId={activeId}
        progress={progress}
        pct={pct}
        doneCount={doneCount}
        onSelect={setActiveId}
        onReset={resetAll}
      />
      <main className="main">
        {active && (
          <StepView
            step={active}
            stepNum={activeIdx + 1}
            total={steps.length}
            done={activeDone}
            progress={progress}
            onToggleMain={toggleMain}
            onToggleSub={toggleSub}
            prev={prev}
            next={next}
            onNav={setActiveId}
          />
        )}
      </main>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
          options={["#7cd992","#ff7a59","#5aa6ff","#d6b86b","#c673ff"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
          options={["compact","regular","spacious"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakSelect label="Timeline style" value={t.railStyle}
          options={[
            {value:"line", label:"Connected line"},
            {value:"numbers", label:"Number tiles"},
            {value:"dots", label:"Minimal dots"}
          ]}
          onChange={(v) => setTweak("railStyle", v)} />
      </TweaksPanel>
    </div>
  );
}

function Rail({ title, subtitle, steps, activeId, progress, pct, doneCount, onSelect, onReset }) {
  return (
    <aside className="rail" data-screen-label="Sidebar">
      <div className="rail-head">
        <div className="crumb">{subtitle}</div>
        <div className="ee-title">{title}</div>
        <div className="progress-wrap">
          <div className="progress" role="progressbar" aria-valuenow={pct}><i style={{width: pct + "%"}} /></div>
          <span className="progress-num mono">{doneCount}/{steps.length}</span>
        </div>
      </div>
      <div className="rail-body">
        {steps.map((s, i) => {
          const done = isStepDone(s, progress);
          const active = s.id === activeId;
          const subDone = s.substeps ? s.substeps.filter((_, j) => isSubDone(s.id, j, progress)).length : 0;
          return (
            <button
              key={s.id}
              className={"step" + (active ? " active" : "") + (done ? " done" : "")}
              onClick={() => onSelect(s.id)}
            >
              <span className="step-num mono">
                {done ? <svg viewBox="0 0 24 24" style={{width:11,height:11,stroke:"currentColor",strokeWidth:3,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"}}><polyline points="20 6 9 17 4 12"/></svg> : (i+1).toString().padStart(2,"0")}
              </span>
              <div className="step-title">{s.title}</div>
              <div className="step-meta">
                <span>{s.summary.length > 48 ? s.summary.slice(0, 48) + "…" : s.summary}</span>
              </div>
              {s.substeps && s.substeps.length > 0 && (
                <div style={{position:"absolute",right:10,top:10}}>
                  <span className="subcount mono">{subDone}/{s.substeps.length}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="rail-foot">
        <div style={{fontSize:11,color:"var(--fg-3)",fontFamily:"JetBrains Mono, monospace"}}>
          <Icon name="bolt" /> {pct}% complete
        </div>
        <button className="btn ghost danger" onClick={onReset} title="Reset progress">
          <Icon name="reset" /> Reset
        </button>
      </div>
    </aside>
  );
}

function StepView({ step, stepNum, total, done, progress, onToggleMain, onToggleSub, prev, next, onNav }) {
  const hasAside = (step.requirements && step.requirements.length) || step.tip;
  const subDoneCount = step.substeps ? step.substeps.filter((_, i) => isSubDone(step.id, i, progress)).length : 0;

  return (
    <div data-screen-label={`${String(stepNum).padStart(2,"0")} ${step.title}`}>
      <div className="stephead">
        <div className="crumb-row">
          <span className="pill mono">STEP {String(stepNum).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
          {step.tags && step.tags.map((tg, i) => (
            <span key={i} className={"tag " + (tg.kind || "")}>{tg.label}</span>
          ))}
        </div>
        <h1>{step.title}</h1>
        <p className="lead">{step.summary}</p>
      </div>

      <div className="actionbar">
        <div className="left">
          <button className={"check-big" + (done ? " done" : "")} onClick={onToggleMain}>
            <span className="check-box">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <span className="check-lbl">
              {done ? "Step complete" : (step.substeps && step.substeps.length ? `Mark all ${step.substeps.length} sub-steps complete` : "Mark step complete")}
            </span>
          </button>
        </div>
        <div className="navbtns">
          {prev && <button className="btn" onClick={() => onNav(prev.id)}><Icon name="chevL"/> Previous</button>}
          {next && <button className="btn primary" onClick={() => onNav(next.id)}>Next <Icon name="chevR"/></button>}
        </div>
      </div>

      <div className={"grid" + (hasAside ? " has-aside" : "")}>
        <div>
          <div className="desc">
            <RichText html={step.description} />
          </div>

          {step.images && step.images.length > 0 && (
            <div className="imgs">
              {step.images.map((img, i) => (
                <div key={i} className={"ph " + (img.size || "")}>
                  <div className="stripes"></div>
                  <div className="ph-label">
                    <div className="glyph"><Icon name="image" /></div>
                    <div>{img.label}</div>
                    <div style={{opacity:.6, fontSize:10}}>{img.size === "full" ? "full-width" : img.size === "wide" ? "wide" : img.size === "tall" ? "tall" : "auto"}</div>
                  </div>
                  <div className="cap">{img.label}</div>
                </div>
              ))}
            </div>
          )}

          {step.substeps && step.substeps.length > 0 && (
            <div className="substeps">
              <div className="substeps-head">
                <h3><Icon name="list" style={{marginRight:6}}/> Sub-steps</h3>
                <span className="count">{subDoneCount} / {step.substeps.length} done</span>
              </div>
              {step.substeps.map((sub, i) => {
                const sdone = isSubDone(step.id, i, progress);
                return (
                  <div key={i} className={"substep" + (sdone ? " done" : "")} onClick={() => onToggleSub(i)}>
                    <span className="substep-check">
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className="substep-num">{String(i+1).padStart(2,"0")}</span>
                    <div className="substep-body">
                      <div className="substep-title">{sub.title}</div>
                      {sub.detail && <div className="substep-detail">{sub.detail}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {hasAside && (
          <aside className="aside">
            {step.requirements && step.requirements.length > 0 && (
              <div className="card">
                <h4><Icon name="target"/> Requirements</h4>
                <ul>
                  {step.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
            {step.tip && (
              <div className="card tip">
                <h4><Icon name="info"/> Tip</h4>
                <ul><li>{step.tip}</li></ul>
              </div>
            )}
          </aside>
        )}
      </div>

      <nav className="pager">
        <div className={"pager-side" + (prev ? "" : " disabled")} onClick={() => prev && onNav(prev.id)}>
          <span className="pcrumb">← Previous</span>
          <span className="pname">{prev ? prev.title : "Start of tutorial"}</span>
        </div>
        <div className={"pager-side r" + (next ? "" : " disabled")} onClick={() => next && onNav(next.id)}>
          <span className="pcrumb">Next →</span>
          <span className="pname">{next ? next.title : "Tutorial complete"}</span>
        </div>
      </nav>
    </div>
  );
}

// minimal markdown-lite for **bold** and `inline-code` (using em styling on backticks)
function RichText({ html }) {
  const parts = useMemo(() => {
    // split on **bold** first, then on `code` markers
    const out = [];
    const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let last = 0, m;
    let key = 0;
    while ((m = re.exec(html)) !== null) {
      if (m.index > last) out.push(<span key={key++}>{html.slice(last, m.index)}</span>);
      const tok = m[0];
      if (tok.startsWith("**")) out.push(<strong key={key++}>{tok.slice(2,-2)}</strong>);
      else out.push(<em key={key++}>{tok.slice(1,-1)}</em>);
      last = m.index + tok.length;
    }
    if (last < html.length) out.push(<span key={key++}>{html.slice(last)}</span>);
    return out;
  }, [html]);
  // Split by double newlines into paragraphs if any
  const paras = html.split(/\n\n+/);
  if (paras.length === 1) return <p>{parts}</p>;
  return <>{paras.map((p, i) => <p key={i}>{renderInline(p)}</p>)}</>;
}

function renderInline(text) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0, m, key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(<span key={key++}>{text.slice(last, m.index)}</span>);
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<strong key={key++}>{tok.slice(2,-2)}</strong>);
    else out.push(<em key={key++}>{tok.slice(1,-1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(<span key={key++}>{text.slice(last)}</span>);
  return out;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
