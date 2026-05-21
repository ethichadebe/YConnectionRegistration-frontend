import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://yconnectionregistration-backend.onrender.com/api/ping")
      .then((res) => {
        if (!res.ok) console.error("Ping failed:", res.statusText);
        else console.log("✅ Backend is awake!");
      })
      .catch((err) => console.error("Error pinging backend:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top stripe */}
      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />

      <div className="max-w-md mx-auto px-6 pt-10 pb-8">
        {/* red. branding */}
        <div className="flex items-center gap-3 mb-12">
          <div
            style={{
              width: 44,
              height: 44,
              background: "hsl(var(--camp-red))",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontWeight: 900, fontSize: "0.6rem", textAlign: "center", lineHeight: 1.1 }}>
              TSA
            </span>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "1.4rem", color: "hsl(var(--camp-red))", lineHeight: 1 }}>
              red.
            </div>
            <div style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "0.08em" }}>
              REACH · EVANGELISE · DISCIPLE
            </div>
          </div>
        </div>

        {/* Signal icon */}
        <div className="flex justify-center mb-8" style={{ position: "relative", height: "100px" }}>
          {[84, 58, 32].map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                border: `${i === 0 ? 3 : 2}px solid hsl(var(--camp-red))`,
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 1 - i * 0.25,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              background: "hsl(var(--camp-red))",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Event name */}
        <div className="text-center mb-2">
          <h1 style={{ fontWeight: 900, fontSize: "2.8rem", color: "#111", lineHeight: 1, letterSpacing: "-0.03em" }}>
            Y-CON <span style={{ color: "hsl(var(--camp-red))" }}>2026</span>
          </h1>
          <div
            style={{
              color: "hsl(var(--camp-red))",
              fontWeight: 700,
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              marginTop: "6px",
            }}
          >
            CENTRAL DIVISION
          </div>
        </div>

        {/* Theme */}
        <div className="text-center my-6">
          <div style={{ fontSize: "0.7rem", color: "#bbb", marginBottom: "4px", letterSpacing: "0.12em" }}>
            THEME
          </div>
          <div style={{ fontWeight: 900, fontSize: "2.5rem", color: "hsl(var(--camp-red))" }}>SEE</div>
          <div style={{ fontSize: "0.75rem", color: "#888" }}>2 Kings 6:16–17</div>
          <p style={{ color: "#555", marginTop: "10px", fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.55 }}>
            "It's more than a conference. It's a divine encounter!"
          </p>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "0.8rem" }}>Believe. Behold. Become.</p>
        </div>

        {/* Details card */}
        <div
          style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", textAlign: "center" }}>
            {[
              { label: "Date", value: "3–5 July\n2026" },
              { label: "Venue", value: "Mighty Apies\nPretoria" },
              { label: "Cost", value: "R550\nper person" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "hsl(var(--camp-red))",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {label.toUpperCase()}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", whiteSpace: "pre-line", lineHeight: 1.3 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "hsl(var(--camp-red))",
              color: "white",
              border: "none",
              padding: "14px 0",
              fontSize: "1rem",
              fontWeight: 700,
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Register Now
          </button>
          <p style={{ color: "#bbb", fontSize: "0.7rem", marginTop: "8px" }}>Meals &amp; accommodation included</p>
        </div>

        {/* Admin link */}
        <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid #f0f0f0" }}>
          <button
            onClick={() => navigate("/admin/login")}
            style={{
              background: "none",
              border: "none",
              color: "#bbb",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        </div>
      </div>

      {/* Bottom stripe */}
      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />
    </div>
  );
};

export default Landing;
