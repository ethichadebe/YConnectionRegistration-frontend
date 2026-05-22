import { useNavigate } from "react-router-dom";

const CSS = `
  :root {
    --cream: #F5EDD6; --red: #C8001A; --rdk: #7A0010;
    --gold: #F5B800; --ink: #0D0905;
    --disp: 'Bebas Neue', Impact, 'Arial Black', sans-serif;
    --body: 'Libre Baskerville', Georgia, serif;
  }
  .yc-grain {
    position: fixed; inset: 0; z-index: 9997; pointer-events: none;
    background-image: radial-gradient(circle, rgba(0,0,0,.05) 1px, transparent 1px);
    background-size: 3px 3px;
  }
  .yc-btn {
    position: relative; overflow: hidden; cursor: pointer; border: none;
    font-family: var(--disp); letter-spacing: .12em; text-transform: uppercase;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .yc-btn::before {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(0,0,0,.18);
    transform: translate(-50%,-50%) scale(0);
    transition: transform .65s cubic-bezier(.16,1,.3,1);
  }
  .yc-btn:hover::before { transform: translate(-50%,-50%) scale(32); }
  .yc-btn-red {
    background: var(--red); color: white;
    padding: 14px 0; font-size: 15px; width: 100%;
    box-shadow: 4px 4px 0 var(--rdk);
  }
  .yc-btn-red:hover { box-shadow: 2px 2px 0 var(--rdk); }
  @keyframes yc-stamp {
    0%   { opacity: 0; transform: scale(1.15); }
    60%  {             transform: scale(.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes yc-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }
  .yc-check { animation: yc-stamp .5s cubic-bezier(.34,1.56,.64,1) .2s both; }
  .yc-h1    { animation: yc-fadeUp .5s ease .4s both; }
  .yc-sub   { animation: yc-fadeUp .5s ease .55s both; }
  .yc-box   { animation: yc-fadeUp .5s ease .7s both; }
  .yc-strip { animation: yc-fadeUp .5s ease .85s both; }
  .yc-cta   { animation: yc-fadeUp .5s ease 1s both; }
`;

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh", position: "relative" }}>
      <style>{CSS}</style>
      <div className="yc-grain" aria-hidden="true" />

      {/* Hero image strip */}
      <div style={{ position: "relative", height: "38vh", minHeight: 220, overflow: "hidden" }}>
        <img src="/assets/sunset-silhouette.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,1,0,.35) 0%, #F5EDD6 100%)" }} />

        {/* Y-CON logo floating at bottom of image */}
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center" }}>
          <img src="/assets/ycon-logo.png" alt="Y-CON 2026"
            style={{ width: "clamp(120px,28vw,200px)", mixBlendMode: "multiply" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px 60px", textAlign: "center" }}>

        {/* Check mark */}
        <div className="yc-check" style={{
          width: 58, height: 58, background: "#C8001A", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px", boxShadow: "4px 4px 0 #7A0010",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="yc-h1" style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(42px,10vw,72px)", color: "#0D0905",
          letterSpacing: ".04em", margin: "0 0 4px", lineHeight: 1,
        }}>
          YOU'RE IN.
        </h1>
        <p className="yc-sub" style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontStyle: "italic", color: "#C8001A", fontSize: 14, margin: "0 0 28px",
        }}>
          Registration complete for Y-CON 2026
        </p>

        {/* What's next — dark ink card */}
        <div className="yc-box" style={{
          background: "#0D0905", padding: "22px 24px", textAlign: "left", marginBottom: 12,
        }}>
          <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: "3px", color: "#F5B800", textTransform: "uppercase", margin: "0 0 14px" }}>
            // What's Next
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { n: "01", text: "Check your email for a confirmation with your Registration Reference." },
              { n: "02", text: <>Payment of <strong style={{ color: "#F5B800" }}>R550</strong> is to be made to your Corps youth leader.</> },
            ].map(({ n, text }) => (
              <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 22, color: "#C8001A", lineHeight: 1, flexShrink: 0 }}>{n}</span>
                <span style={{ fontFamily: "'Libre Baskerville',Georgia,serif", fontSize: 13, color: "rgba(245,237,214,.72)", lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event info strip */}
        <div className="yc-strip" style={{
          background: "#C8001A", padding: "12px 20px",
          display: "flex", justifyContent: "space-around", marginBottom: 20,
        }}>
          {[["DATE", "3–5 JULY 2026"], ["VENUE", "MIGHTY APIES"], ["FEE", "R550"]].map(([l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Courier New',monospace", fontSize: 7, letterSpacing: "3px", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 2 }}>{l}</div>
              <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(13px,2vw,18px)", color: "white", letterSpacing: ".04em" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="yc-cta">
          <button className="yc-btn yc-btn-red" onClick={() => navigate("/")}>
            Back to Home
          </button>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 14 }}>
            {["BELIEVE.", "BEHOLD.", "BECOME."].map(w => (
              <span key={w} style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, color: "rgba(13,9,5,.2)", letterSpacing: ".15em" }}>{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "16px", borderTop: "1px solid rgba(13,9,5,.08)" }}>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.28)", letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>
          © 2026 The Salvation Army · Central Division · Y‑CON 2026
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
