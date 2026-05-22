// PROTOTYPE — throwaway; delete or absorb once direction is chosen
// Question: What does Y-CON 2026 look like as an immersive website, not just a poster?
// Aesthetic: brutalist concert poster editorial — Bebas Neue × Libre Baskerville

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Variant = "A" | "B" | "C";
const VARIANTS: { id: Variant; label: string }[] = [
  { id: "A", label: "Immersive" },
  { id: "B", label: "Ink" },
  { id: "C", label: "Neon" },
];

const EVENT_DATE = new Date("2026-07-03T00:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const d = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT A — Brutalist Concert Poster Editorial  (mobile-first, responsive)
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  :root {
    --cream: #F5EDD6;
    --red:   #C8001A;
    --rdk:   #7A0010;
    --gold:  #F5B800;
    --ink:   #0D0905;
    --disp:  'Bebas Neue', Impact, 'Arial Black', sans-serif;
    --body:  'Libre Baskerville', Georgia, serif;
  }

  .yg-grain {
    position: fixed; inset: 0; z-index: 9997; pointer-events: none;
    background-image: radial-gradient(circle, rgba(0,0,0,.055) 1px, transparent 1px);
    background-size: 3px 3px;
  }

  /* ── NAV ── */
  .yg-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(13,9,5,.94);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 2px solid var(--red);
    padding: 10px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .yg-nav-links { display: none; gap: 20px; align-items: center; }
  .yg-nav-link {
    color: rgba(255,255,255,.55); text-decoration: none;
    font-family: var(--disp); font-size: 14px; letter-spacing: .15em;
    transition: color .2s;
  }
  .yg-nav-link:hover { color: var(--gold); }

  /* ── HERO (mobile-first: flex column) ── */
  .yg-hero {
    background: var(--cream);
    padding-top: 52px;
    min-height: 100svh;
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  /* art area — stack on mobile */
  .yg-art {
    flex: 1;
    display: flex; flex-direction: column; align-items: center;
    position: relative;
    padding: 14px 0 8px;
  }

  /* background decorations — desktop only */
  .yg-blob, .yg-halftone { display: none; }

  /* Y-CON logo */
  .yg-ycon {
    width: 86%; max-width: 360px;
    position: relative; z-index: 10;
    mix-blend-mode: multiply;
    animation: yg-fadeIn .6s ease .1s both;
  }

  /* Sunglasses — overlaps ycon on mobile too */
  .yg-shades {
    width: 110%; max-width: 440px;
    margin-top: -12px;
    position: relative; z-index: 12;
    mix-blend-mode: multiply;
    animation: yg-fadeIn .7s ease .25s both;
  }

  /* Mission team — clearly below sunglasses, no overlap with CENTRAL DIVISION */
  .yg-mission {
    width: 58%; max-width: 240px;
    margin-top: 14px;
    position: relative; z-index: 22;
    transform: rotate(-1.5deg);
    mix-blend-mode: multiply;
    animation: yg-stamp .55s cubic-bezier(.34,1.56,.64,1) .65s both;
  }

  /* doodles + BELIEVE text — desktop only */
  .yg-crown, .yg-xmarks, .yg-zigzag, .yg-small { display: none; }
  .yg-bbb { display: none; }
  .yg-scroll-hint { display: none; }

  /* ── CONCERT STRIP ── */
  .yg-strip {
    background: var(--ink);
    border-top: 3px solid var(--red);
    display: flex; flex-direction: column;
  }
  .yg-cd {
    background: var(--red); color: #fff;
    padding: 10px 20px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .yg-cd-label {
    font-family: var(--disp); font-size: 9px; letter-spacing: .2em; opacity: .6;
    text-transform: uppercase;
  }
  .yg-cd-nums { display: flex; align-items: baseline; gap: 3px; }
  .yg-cd-unit { text-align: center; }
  .yg-cd-val {
    font-family: var(--disp); font-size: clamp(20px, 4.5vw, 34px);
    line-height: 1; font-variant-numeric: tabular-nums; display: block;
  }
  .yg-cd-sub {
    font-size: 7px; opacity: .55; letter-spacing: .12em;
    text-transform: uppercase; display: block;
  }
  .yg-cd-sep {
    font-family: var(--disp); font-size: clamp(16px, 3vw, 26px); opacity: .35;
  }
  .yg-strip-cols {
    display: flex; justify-content: space-evenly; align-items: center;
    padding: 8px 16px;
  }
  .yg-strip-col { text-align: center; }
  .yg-strip-lbl {
    font-size: 7px; letter-spacing: 3px; color: var(--red);
    font-weight: 700; text-transform: uppercase; margin-bottom: 2px;
    font-family: 'Courier New', monospace;
  }
  .yg-strip-val {
    font-family: var(--disp); font-size: clamp(12px, 2vw, 19px);
    color: #fff; line-height: 1.1;
  }
  .yg-strip-sub {
    font-size: 8px; color: rgba(255,255,255,.32); margin-top: 1px;
    font-family: 'Courier New', monospace;
  }

  /* ── SEE / SCRIPTURE ── */
  .yg-see {
    background: var(--cream);
    padding: clamp(44px,7vw,80px) clamp(20px,5vw,72px);
    position: relative; overflow: hidden;
  }
  .yg-see-bg-x {
    position: absolute; top: 6%; right: 2%;
    width: clamp(60px, 12vw, 140px); opacity: .12; pointer-events: none;
    mix-blend-mode: multiply;
  }
  .yg-see-inner {
    max-width: 820px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 20px;
  }
  .yg-see-word {
    font-family: var(--disp);
    font-size: clamp(72px, 22vw, 172px); color: var(--red);
    line-height: .82; letter-spacing: -.03em; margin: 0; display: block;
    animation: yg-glitch 6s ease-in-out infinite;
  }
  .yg-see-rule {
    display: block; width: 46px; height: 4px;
    background: var(--gold); margin-top: 10px; border-radius: 2px;
  }
  .yg-see-ref {
    font-family: 'Courier New', monospace; font-size: 9px;
    letter-spacing: 3px; color: #8a6a3a; margin-top: 8px; text-transform: uppercase;
  }
  .yg-see-quote-mark {
    font-family: var(--body); font-size: clamp(34px, 7vw, 68px);
    color: var(--red); line-height: .7; margin-bottom: 8px; display: block;
  }
  .yg-see-quote {
    font-family: var(--body); font-style: italic;
    font-size: clamp(13px, 1.7vw, 16px); line-height: 1.95; color: #3a2510; margin: 0;
  }
  .yg-see-quote em { color: var(--red); font-style: normal; font-weight: 700; }
  .yg-see-citation {
    font-family: 'Courier New', monospace; font-size: 9px;
    letter-spacing: 3px; color: var(--red); font-weight: 700;
    margin-top: 14px; text-transform: uppercase; display: block;
  }

  /* ── SUNSET CTA ── */
  .yg-cta {
    position: relative; min-height: 52vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .yg-cta-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center 20%;
  }
  .yg-cta-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(6,1,0,.48) 0%, rgba(70,0,8,.88) 100%);
  }
  .yg-cta-body {
    position: relative; z-index: 10; text-align: center;
    padding: clamp(40px,6vw,80px) clamp(20px,5vw,56px);
  }
  .yg-cta-eyebrow {
    font-family: 'Courier New', monospace; font-size: 9px;
    letter-spacing: .28em; color: var(--gold); text-transform: uppercase;
    margin: 0 0 12px;
  }
  .yg-cta-h {
    font-family: var(--disp); color: #fff;
    font-size: clamp(28px, 5.5vw, 64px); letter-spacing: .06em;
    margin: 0 0 8px; line-height: 1;
  }
  .yg-cta-p {
    font-family: var(--body); color: rgba(255,255,255,.68);
    font-size: clamp(13px,1.5vw,15px); margin: 0 auto 26px;
    max-width: 360px; line-height: 1.75;
  }
  .yg-cta-p strong { color: var(--gold); font-style: normal; }
  .yg-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .yg-cta-mantra {
    margin-top: 30px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;
  }
  .yg-cta-mantra span {
    font-family: var(--disp); font-size: clamp(11px, 1.5vw, 16px);
    color: rgba(255,255,255,.2); letter-spacing: .18em;
  }

  /* ── FOOTER ── */
  .yg-footer {
    background: #050100; padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px;
    border-top: 1px solid rgba(200,0,26,.2);
  }
  .yg-footer p {
    font-family: 'Courier New', monospace; color: rgba(255,255,255,.18);
    font-size: 9px; letter-spacing: .1em; margin: 0; text-transform: uppercase;
  }

  /* ── BUTTONS ── */
  .yg-btn {
    position: relative; overflow: hidden; cursor: pointer; border: none;
    font-family: var(--disp); letter-spacing: .12em; text-transform: uppercase;
    display: inline-block; text-decoration: none; text-align: center;
  }
  .yg-btn::before {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(0,0,0,.18);
    transform: translate(-50%,-50%) scale(0);
    transition: transform .65s cubic-bezier(.16,1,.3,1);
  }
  .yg-btn:hover::before { transform: translate(-50%,-50%) scale(32); }
  .yg-btn-red {
    background: var(--red); color: #fff;
    padding: 12px 28px; font-size: clamp(13px,1.5vw,15px);
    box-shadow: 4px 4px 0 var(--rdk);
  }
  .yg-btn-red:hover { box-shadow: 2px 2px 0 var(--rdk); }
  .yg-btn-white {
    background: transparent; color: rgba(255,255,255,.6);
    border: 1px solid rgba(255,255,255,.22);
    padding: 12px 24px; font-size: clamp(12px,1.3vw,14px);
  }

  /* ── KEYFRAMES ── */
  @keyframes yg-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes yg-slideL  {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes yg-slideR  {
    from { opacity: 0; transform: translateX(48px) scale(.96); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes yg-stamp {
    0%   { opacity: 0; transform: rotate(-1.5deg) scale(1.08); }
    70%  {             transform: rotate(-1.5deg) scale(.98); }
    100% { opacity: 1; transform: rotate(-1.5deg) scale(1); }
  }
  @keyframes yg-fl  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
  @keyframes yg-flr { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
  @keyframes yg-bounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50%     { transform: translateX(-50%) translateY(8px); }
  }
  @keyframes yg-glitch {
    0%, 78%, 100% { clip-path: none; transform: none; }
    80% { clip-path: polygon(0 18%,100% 18%,100% 44%,0 44%); transform: translateX(-5px); }
    82% { clip-path: polygon(0 57%,100% 57%,100% 82%,0 82%); transform: translateX(5px); }
    84% { clip-path: polygon(0 0,100% 0,100% 17%,0 17%); transform: translateX(-3px); }
    86% { clip-path: none; transform: none; }
  }

  html { scroll-behavior: smooth; }

  /* ════ TABLET 640px ════ */
  @media (min-width: 640px) {
    .yg-nav-links { display: flex; }
    .yg-ycon   { width: 78%; max-width: 500px; }
    .yg-shades { max-width: 560px; margin-top: -20px; }
    .yg-mission { max-width: 300px; width: 54%; margin-top: 16px; }
    .yg-strip { flex-direction: row; }
    .yg-cd { justify-content: flex-start; }
    .yg-see-inner { flex-direction: row; gap: clamp(28px,5vw,60px); align-items: start; }
  }

  /* ════ DESKTOP 1024px ════ */
  @media (min-width: 1024px) {
    .yg-hero {
      height: 100svh; min-height: 700px;
      display: block;
    }
    /* hero-art becomes absolute canvas */
    .yg-art {
      position: absolute;
      top: 52px; left: 0; right: 0; bottom: 0;
      display: block; padding: 0; overflow: visible;
    }

    /* background */
    .yg-blob {
      display: block;
      position: absolute; top: -28%; right: -16%;
      width: 58vw; height: 140%;
      background: var(--red); border-radius: 50%; opacity: .075;
      pointer-events: none;
    }
    .yg-halftone {
      display: block;
      position: absolute; top: 0; right: 0;
      width: clamp(170px, 30%, 410px);
      pointer-events: none; z-index: 1;
      mix-blend-mode: multiply;
    }

    /* poster composition — no overlap between mission-team and CENTRAL DIVISION */
    .yg-ycon {
      position: absolute; top: 6%; left: -1%;
      width: clamp(280px, 48vw, 650px);
      max-width: none; margin: 0;
      animation: yg-slideL .75s cubic-bezier(.16,1,.3,1) .1s both;
    }
    .yg-shades {
      position: absolute; top: 13%; left: 27%;
      width: clamp(320px, 56vw, 760px);
      max-width: none; margin: 0;
      animation: yg-slideR .85s cubic-bezier(.16,1,.3,1) .3s both;
    }
    /* mission team sits in lower-left, well clear of CENTRAL DIVISION text */
    .yg-mission {
      position: absolute; bottom: 20%; left: 3%;
      width: clamp(170px, 20vw, 290px);
      max-width: none; margin: 0;
    }

    /* BELIEVE. BEHOLD. BECOME. */
    .yg-bbb {
      display: block;
      position: absolute; right: 2.5%; bottom: 24%;
      font-family: var(--disp); font-size: clamp(13px,1.6vw,20px);
      line-height: 1.4; letter-spacing: .12em; color: var(--ink);
      text-align: right; z-index: 16;
      animation: yg-fadeIn .7s ease .9s both;
    }

    /* doodles */
    .yg-crown {
      display: block;
      position: absolute; top: 7%; right: 22%;
      width: clamp(36px,4.6vw,72px); z-index: 16; pointer-events: none;
      mix-blend-mode: multiply;
      animation: yg-fl 4.5s ease-in-out infinite;
    }
    .yg-xmarks {
      display: block;
      position: absolute; top: 22%; right: 2%;
      width: clamp(30px,3.8vw,60px); z-index: 16; pointer-events: none;
      mix-blend-mode: multiply;
      animation: yg-flr 5.5s ease-in-out 1s infinite;
    }
    .yg-zigzag {
      display: block;
      position: absolute; bottom: 28%; left: 20%;
      width: clamp(46px,5.8vw,88px); z-index: 4; pointer-events: none; opacity: .68;
      mix-blend-mode: multiply;
      animation: yg-fl 7s ease-in-out 2s infinite;
    }
    .yg-small {
      display: block;
      position: absolute; top: 58%; right: 15%;
      width: clamp(24px,3.2vw,48px); z-index: 16; pointer-events: none; opacity: .6;
      mix-blend-mode: multiply;
      animation: yg-flr 6s ease-in-out .5s infinite;
    }

    /* scroll arrow */
    .yg-scroll-hint {
      display: block;
      position: absolute; bottom: 10px; left: 50%;
      color: var(--red); opacity: .4; font-size: 18px; z-index: 30;
      text-decoration: none;
      animation: yg-bounce 1.6s ease-in-out infinite;
    }

    /* strip anchored to bottom of hero */
    .yg-strip {
      position: absolute; bottom: 0; left: 0; right: 0;
      flex-direction: row;
    }
    .yg-cd { justify-content: flex-start; }
    .yg-cd-label { writing-mode: vertical-rl; transform: rotate(180deg); }
  }
`;

const VariantA = ({ onRegister, onAdmin }: { onRegister: () => void; onAdmin: () => void }) => {
  const cd = useCountdown(EVENT_DATE);

  return (
    <div>
      <style>{CSS}</style>
      <div className="yg-grain" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className="yg-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 28 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 17, filter: "brightness(10)" }} />
        </div>
        <div className="yg-nav-links">
          <a href="#vA-see"      className="yg-nav-link">Theme</a>
          <a href="#vA-register" className="yg-nav-link">Event Info</a>
        </div>
        <button className="yg-btn yg-btn-red" onClick={onRegister}
          style={{ padding: "8px 18px", fontSize: 13 }}>
          Register
        </button>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="yg-hero">
        <div className="yg-art">
          <div className="yg-blob" aria-hidden="true" />
          <img className="yg-halftone" src="/assets/halftone-decor.png" alt="" aria-hidden="true" />

          <img className="yg-ycon"    src="/assets/ycon-logo.png"          alt="Y-CON 2026 Central Division" />
          <img className="yg-shades"  src="/assets/sunglasses.png"          alt="SEE — 2 Kings 6:16–17" />
          <img className="yg-mission" src="/assets/mission-team-banner.png" alt="Guest: Mission Team" />

          <div className="yg-bbb">BELIEVE.<br />BEHOLD.<br />BECOME.</div>

          <img className="yg-crown"  src="/assets/crown-doodle.png"  alt="" aria-hidden="true" />
          <img className="yg-xmarks" src="/assets/x-marks.png"        alt="" aria-hidden="true" />
          <img className="yg-zigzag" src="/assets/zigzag-doodle.png"  alt="" aria-hidden="true" />
          <img className="yg-small"  src="/assets/small-doodles.png"  alt="" aria-hidden="true" />

          <a href="#vA-see" className="yg-scroll-hint" aria-label="Scroll down">↓</a>
        </div>

        {/* concert-ticket strip */}
        <div className="yg-strip">
          <div className="yg-cd">
            <span className="yg-cd-label">Until Y‑CON</span>
            <div className="yg-cd-nums">
              {([
                [cd.days, "D"], [cd.hours, "H"], [cd.minutes, "M"], [cd.seconds, "S"],
              ] as [number, string][]).map(([v, l], i, arr) => (
                <span key={l} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span className="yg-cd-unit">
                    <span className="yg-cd-val">{String(v).padStart(2, "0")}</span>
                    <span className="yg-cd-sub">{l}</span>
                  </span>
                  {i < arr.length - 1 && <span className="yg-cd-sep">:</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="yg-strip-cols">
            {([
              { lbl: "DATE",  val: "3–5 JULY",    sub: "2026"                  },
              { lbl: "VENUE", val: "MIGHTY APIES", sub: "Pretoria · Gauteng"    },
              { lbl: "FEE",   val: "R550",         sub: "Meals & Accommodation" },
            ] as const).map(({ lbl, val, sub }) => (
              <div key={lbl} className="yg-strip-col">
                <div className="yg-strip-lbl">{lbl}</div>
                <div className="yg-strip-val">{val}</div>
                <div className="yg-strip-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SCRIPTURE "SEE" ══════════════════ */}
      <section id="vA-see" className="yg-see">
        <img className="yg-see-bg-x" src="/assets/crown-x-doodle.png" alt="" aria-hidden="true" />
        <div className="yg-see-inner">
          <div>
            <span className="yg-see-word">SEE</span>
            <span className="yg-see-rule" />
            <p className="yg-see-ref">2 Kings 6:16–17</p>
          </div>
          <div>
            <span className="yg-see-quote-mark">"</span>
            <p className="yg-see-quote">
              Don't be afraid," Elisha answered. "Those who are with us are{" "}
              <em>more</em> than those who are with them."
              Then Elisha prayed, "Lord, open his eyes so he may <em>see</em>."
              And the Lord opened the young man's eyes, and he <em>saw</em> the hills
              filled with horses and chariots of fire all around Elisha.
            </p>
            <span className="yg-see-citation">— 2 Kings 6:16–17</span>
          </div>
        </div>
      </section>

      {/* ══════════════════ SUNSET CTA ══════════════════ */}
      <section id="vA-register" className="yg-cta">
        <img className="yg-cta-img" src="/assets/sunset-silhouette.png" alt="" />
        <div className="yg-cta-overlay" />
        <div className="yg-cta-body">
          <p className="yg-cta-eyebrow">Y-CON 2026 · Central Division</p>
          <h2 className="yg-cta-h">JOIN THE ENCOUNTER</h2>
          <p className="yg-cta-p">
            3–5 July 2026 · Mighty Apies, Pretoria<br />
            <strong>R550 per person</strong> · Meals &amp; Accommodation Included
          </p>
          <div className="yg-cta-btns">
            <button className="yg-btn yg-btn-red" onClick={onRegister}
              style={{ fontSize: "clamp(14px,1.7vw,17px)", padding: "15px 42px" }}>
              Register Now
            </button>
            <button className="yg-btn yg-btn-white" onClick={onAdmin}>
              Admin Login
            </button>
          </div>
          <div className="yg-cta-mantra">
            <span>BELIEVE.</span><span>BEHOLD.</span><span>BECOME.</span>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="yg-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="" style={{ height: 26, opacity: .5 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 15, filter: "brightness(10)", opacity: .38 }} />
        </div>
        <p>© 2026 The Salvation Army · Central Division · Y‑CON 2026</p>
      </footer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT B — Ink / Zine
// ─────────────────────────────────────────────────────────────────────────────
const VariantB = ({ onRegister, onAdmin }: { onRegister: () => void; onAdmin: () => void }) => (
  <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Arial Black', sans-serif", overflow: "hidden" }}>
    <div style={{ position: "fixed", top: "5%", right: "-5%", fontSize: "28vw", fontWeight: 900, color: "rgba(204,0,0,.04)", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>SEE</div>
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 20px 100px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <img src="/assets/salvation-army-logo.png" alt="" style={{ height: 36 }} />
        <img src="/assets/red-logo.png" alt="red." style={{ height: 24 }} />
      </div>
      <div style={{ borderLeft: "5px solid #cc0000", paddingLeft: 14, marginBottom: 16 }}>
        <div style={{ fontSize: "clamp(4rem,18vw,6rem)", fontWeight: 900, color: "#cc0000", lineHeight: .85 }}>Y-CON</div>
        <div style={{ fontSize: "clamp(4.5rem,20vw,6.5rem)", fontWeight: 900, color: "#111", lineHeight: .85 }}>2026</div>
        <div style={{ marginTop: 8, display: "inline-block", background: "#cc0000", padding: "3px 10px" }}>
          <span style={{ color: "white", fontWeight: 900, fontSize: ".7rem", letterSpacing: ".2em" }}>CENTRAL DIVISION</span>
        </div>
      </div>
      <p style={{ fontSize: "1rem", fontWeight: 900, color: "#cc0000", fontStyle: "italic", margin: "0 0 6px", borderBottom: "3px solid #cc0000", paddingBottom: 10 }}>IT'S A DIVINE ENCOUNTER!</p>
      <div style={{ position: "relative", margin: "16px 0" }}>
        <img src="/assets/sunglasses.png" alt="" style={{ width: "100%", boxShadow: "6px 6px 0 #cc0000", border: "2px solid #111" }} />
        <div style={{ position: "absolute", bottom: -14, left: 14, background: "#111", padding: "6px 14px", transform: "rotate(-1deg)" }}>
          <span style={{ color: "#FFC107", fontWeight: 900, fontSize: ".85rem" }}>GUEST: MISSION TEAM</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, margin: "28px 0 16px", border: "2px solid #111" }}>
        {[["DATE", "3–5 JULY\n2026"], ["VENUE", "MIGHTY\nAPIES"], ["R550", "MEALS &\nACCOMM."]].map(([l, v], i) => (
          <div key={l} style={{ padding: "12px 8px", textAlign: "center", borderRight: i < 2 ? "2px solid #111" : "none" }}>
            <div style={{ color: "#cc0000", fontSize: ".6rem", fontWeight: 900, letterSpacing: ".15em", marginBottom: 4 }}>{l}</div>
            <div style={{ fontWeight: 900, fontSize: ".75rem", whiteSpace: "pre-line", lineHeight: 1.3 }}>{v}</div>
          </div>
        ))}
      </div>
      <img src="/assets/sunset-silhouette.png" alt="" style={{ width: "100%", border: "2px solid #111", marginBottom: 16 }} />
      <div style={{ borderLeft: "3px solid #cc0000", paddingLeft: 12, marginBottom: 24 }}>
        <p style={{ fontSize: ".72rem", color: "#555", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>"Those who are with us are <strong style={{ color: "#cc0000" }}>MORE</strong> than those who are with them."</p>
        <p style={{ fontSize: ".65rem", color: "#cc0000", fontWeight: 900, margin: "4px 0 0" }}>2 KINGS 6:16–17</p>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onRegister} style={{ flex: 1, background: "#cc0000", color: "white", border: "2px solid #111", padding: "14px 0", fontWeight: 900, fontSize: ".95rem", cursor: "pointer", boxShadow: "4px 4px 0 #111" }}>REGISTER NOW</button>
        <button onClick={onAdmin}   style={{ flex: 1, background: "white", color: "#111", border: "2px solid #111", padding: "14px 0", fontWeight: 900, fontSize: ".95rem", cursor: "pointer", boxShadow: "4px 4px 0 #111" }}>ADMIN LOGIN</button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT C — Neon / Dark
// ─────────────────────────────────────────────────────────────────────────────
const VariantC = ({ onRegister, onAdmin }: { onRegister: () => void; onAdmin: () => void }) => (
  <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'Arial Black', sans-serif", overflow: "hidden" }}>
    <div style={{ maxWidth: 520, margin: "0 auto", paddingBottom: 100 }}>
      <div style={{ background: "#cc0000", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/assets/salvation-army-logo.png" alt="" style={{ height: 28, filter: "brightness(10)" }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 18, filter: "brightness(10)" }} />
        </div>
        <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".15em" }}>CENTRAL DIVISION</span>
      </div>
      <div style={{ position: "relative" }}>
        <img src="/assets/sunglasses.png" alt="" style={{ width: "100%" }} />
        <div style={{ position: "absolute", bottom: 8, left: 20, right: 20 }}>
          <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(3rem,14vw,5rem)", margin: 0, lineHeight: .85, textShadow: "0 0 40px rgba(204,0,0,.8)" }}>
            Y-CON <span style={{ color: "#cc0000" }}>2026</span>
          </h1>
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#cc0000,transparent)", marginBottom: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "white", textShadow: "0 0 30px rgba(204,0,0,.6)" }}>SEE</div>
            <p style={{ color: "#cc0000", fontSize: ".65rem", margin: "4px 0 0", letterSpacing: ".1em" }}>2 KINGS 6:16–17</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,.7)", fontWeight: 900, fontSize: ".85rem", lineHeight: 1.8, margin: 0 }}>BELIEVE.<br />BEHOLD.<br />BECOME.</p>
          </div>
        </div>
        <img src="/assets/mission-team-banner.png" alt="" style={{ width: "80%", marginBottom: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[["DATE", "3–5 JULY\n2026"], ["VENUE", "MIGHTY\nAPIES"], ["FEE", "R550\nPER PERSON"]].map(([l, v]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(204,0,0,.2)", borderRadius: 6, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ color: "#cc0000", fontSize: ".55rem", fontWeight: 900, letterSpacing: ".2em", marginBottom: 4 }}>{l}</div>
              <div style={{ color: "white", fontWeight: 900, fontSize: ".75rem", whiteSpace: "pre-line", lineHeight: 1.3 }}>{v}</div>
            </div>
          ))}
        </div>
        <img src="/assets/sunset-silhouette.png" alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
        <div style={{ borderLeft: "2px solid rgba(204,0,0,.5)", paddingLeft: 12, marginBottom: 24 }}>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: ".7rem", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>"Those who are with us are <span style={{ color: "#cc0000" }}>MORE</span> than those who are with them."</p>
          <p style={{ color: "rgba(204,0,0,.7)", fontSize: ".6rem", fontWeight: 700, margin: "4px 0 0" }}>2 KINGS 6:16–17</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onRegister} style={{ flex: 1, background: "#cc0000", color: "white", border: "none", padding: "14px 0", fontWeight: 900, fontSize: ".95rem", borderRadius: 8, cursor: "pointer", boxShadow: "0 0 20px rgba(204,0,0,.4)" }}>Register Now</button>
          <button onClick={onAdmin}   style={{ flex: 1, background: "transparent", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.15)", padding: "14px 0", fontWeight: 700, fontSize: ".95rem", borderRadius: 8, cursor: "pointer" }}>Admin Login</button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Shell
// ─────────────────────────────────────────────────────────────────────────────
const LandingPrototype = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const variant = (params.get("v") as Variant) ?? "A";

  const setVariant = (v: Variant) => {
    const next = new URLSearchParams(params);
    next.set("v", v);
    setParams(next, { replace: true });
    window.scrollTo(0, 0);
  };

  const props = { onRegister: () => navigate("/register"), onAdmin: () => navigate("/admin/login") };

  return (
    <div style={{ paddingBottom: 80 }}>
      {variant === "A" && <VariantA {...props} />}
      {variant === "B" && <VariantB {...props} />}
      {variant === "C" && <VariantC {...props} />}

      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        background: "rgba(8,4,2,.95)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(200,0,26,.3)", borderRadius: 999,
        padding: "7px 10px", display: "flex", gap: 5, alignItems: "center",
        zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,.7)",
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,.25)", fontSize: ".58rem", marginRight: 3, letterSpacing: ".1em", textTransform: "uppercase" }}>proto</span>
        {VARIANTS.map(({ id, label }) => (
          <button key={id} onClick={() => setVariant(id)} style={{
            padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer",
            fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: ".8rem", letterSpacing: ".1em",
            background: variant === id ? "#C8001A" : "rgba(255,255,255,.07)",
            color: variant === id ? "white" : "rgba(255,255,255,.45)",
          }}>
            {id} · {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPrototype;
