import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import campHeader from "@/assets/camp-header.png"; // TODO: replace with Y-CON 2026 poster banner

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
    <div style={{ background: "#f7f7f7", minHeight: "100vh" }}>
      {/* Full-width poster banner — replace src with Y-CON 2026 poster image */}
      <img
        src={campHeader}
        alt="Y-CON 2026 — Central Division"
        style={{ width: "100%", display: "block", maxHeight: 280, objectFit: "cover" }}
      />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px 40px" }}>
        {/* Title block */}
        <div style={{
          textAlign: "center",
          padding: "24px 20px",
          background: "white",
          margin: "0 -20px",
          borderBottom: "1px solid #eee",
        }}>
          <h1 style={{ fontWeight: 900, fontSize: "2rem", color: "#1a1f3c", margin: 0, lineHeight: 1.1 }}>
            Y-Connexion 2026
          </h1>
          <p style={{ color: "hsl(var(--camp-red))", fontWeight: 800, fontSize: "1rem", margin: "6px 0 4px", letterSpacing: "0.05em" }}>
            #YC2026
          </p>
          <p style={{ color: "#aaa", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>
            Central Division Youth Camp
          </p>
        </div>

        {/* SEE theme image + hashtag — replace placeholder with SEE sunglasses image */}
        <div style={{
          background: "white",
          margin: "12px 0",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          {/* Image placeholder — swap this div for an <img> once you have the SEE image */}
          <div style={{
            width: "100%",
            height: 180,
            background: "repeating-linear-gradient(45deg,#f0f0f0 0px,#f0f0f0 10px,#f8f8f8 10px,#f8f8f8 20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#bbb", fontWeight: 600, background: "white", padding: "4px 12px", borderRadius: 4 }}>
              [ SEE Theme Image ]
            </span>
          </div>
          <div style={{ padding: "14px 16px", textAlign: "center" }}>
            <p style={{ color: "hsl(var(--camp-red))", fontWeight: 900, fontSize: "1.3rem", margin: "0 0 2px", letterSpacing: "0.05em" }}>
              #SEE2026
            </p>
            <p style={{ color: "#888", fontSize: "0.8rem", margin: 0, fontStyle: "italic" }}>
              "Believe. Behold. Become." — 2 Kings 6:16–17
            </p>
          </div>
        </div>

        {/* Event details */}
        <div style={{
          background: "white",
          borderRadius: 12,
          padding: "18px 20px",
          margin: "12px 0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <p style={{ textAlign: "center", color: "#333", lineHeight: 2, margin: 0, fontSize: "0.9rem" }}>
            3–5 July 2026<br />
            The Mighty Apies River<br />
            Registration Fee: R550
          </p>
          <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 14, paddingTop: 14, textAlign: "center" }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: "0.9rem", color: "#1a1f3c" }}>
              Registration Closes: 20 June 2026
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              flex: 1,
              background: "hsl(var(--camp-red))",
              color: "white",
              border: "none",
              padding: "14px 0",
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Register Now
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            style={{
              flex: 1,
              background: "#1a1f3c",
              color: "white",
              border: "none",
              padding: "14px 0",
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
