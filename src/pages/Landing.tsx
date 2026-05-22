import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  /* ── NAV (light) ── */
  .yg-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(245,237,214,.97);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 2px solid var(--red);
    padding: 10px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .yg-nav-links { display: none; gap: 20px; align-items: center; }
  .yg-nav-link {
    color: rgba(13,9,5,.5); text-decoration: none;
    font-family: var(--disp); font-size: 14px; letter-spacing: .15em;
    transition: color .2s;
  }
  .yg-nav-link:hover { color: var(--red); }

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

  /* Sunglasses */
  .yg-shades {
    width: 110%; max-width: 440px;
    margin-top: -12px;
    position: relative; z-index: 12;
    mix-blend-mode: multiply;
    animation: yg-fadeIn .7s ease .25s both;
  }

  /* Mission team */
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

  /* ── FOOTER (light) ── */
  .yg-footer {
    background: var(--cream); padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px;
    border-top: 1px solid rgba(13,9,5,.1);
  }
  .yg-footer p {
    font-family: 'Courier New', monospace; color: rgba(13,9,5,.28);
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
    .yg-art {
      position: absolute;
      top: 52px; left: 0; right: 0; bottom: 0;
      display: block; padding: 0; overflow: visible;
    }

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
    .yg-mission {
      position: absolute; bottom: 20%; left: 3%;
      width: clamp(170px, 20vw, 290px);
      max-width: none; margin: 0;
    }

    .yg-bbb {
      display: block;
      position: absolute; right: 2.5%; bottom: 24%;
      font-family: var(--disp); font-size: clamp(13px,1.6vw,20px);
      line-height: 1.4; letter-spacing: .12em; color: var(--ink);
      text-align: right; z-index: 16;
      animation: yg-fadeIn .7s ease .9s both;
    }

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

    .yg-scroll-hint {
      display: block;
      position: absolute; bottom: 10px; left: 50%;
      color: var(--red); opacity: .4; font-size: 18px; z-index: 30;
      text-decoration: none;
      animation: yg-bounce 1.6s ease-in-out infinite;
    }

    .yg-strip {
      position: absolute; bottom: 0; left: 0; right: 0;
      flex-direction: row;
    }
    .yg-cd { justify-content: flex-start; }
    .yg-cd-label { writing-mode: vertical-rl; transform: rotate(180deg); }
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  const cd = useCountdown(EVENT_DATE);

  useEffect(() => {
    fetch("https://yconnectionregistration-backend.onrender.com/api/ping").catch(() => {});
  }, []);

  return (
    <div>
      <style>{CSS}</style>
      <div className="yg-grain" aria-hidden="true" />

      {/* NAV */}
      <nav className="yg-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 28 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 17 }} />
        </div>
        <div className="yg-nav-links">
          <a href="#see" className="yg-nav-link">Theme</a>
          <a href="#register" className="yg-nav-link">Event Info</a>
        </div>
        <button className="yg-btn yg-btn-red" onClick={() => navigate("/register")}
          style={{ padding: "8px 18px", fontSize: 13 }}>
          Register
        </button>
      </nav>

      {/* HERO */}
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

          <a href="#see" className="yg-scroll-hint" aria-label="Scroll down">↓</a>
        </div>

        {/* Concert-ticket strip */}
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

      {/* SCRIPTURE "SEE" */}
      <section id="see" className="yg-see">
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

      {/* SUNSET CTA */}
      <section id="register" className="yg-cta">
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
            <button className="yg-btn yg-btn-red" onClick={() => navigate("/register")}
              style={{ fontSize: "clamp(14px,1.7vw,17px)", padding: "15px 42px" }}>
              Register Now
            </button>
            <button className="yg-btn yg-btn-white" onClick={() => navigate("/admin/login")}>
              Admin Login
            </button>
          </div>
          <div className="yg-cta-mantra">
            <span>BELIEVE.</span><span>BEHOLD.</span><span>BECOME.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="yg-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="" style={{ height: 26, opacity: .6 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 15, opacity: .5 }} />
        </div>
        <p>© 2026 The Salvation Army · Central Division · Y‑CON 2026</p>
      </footer>
    </div>
  );
};

export default Landing;
