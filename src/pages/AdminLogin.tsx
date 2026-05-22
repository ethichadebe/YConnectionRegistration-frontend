import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CSS = `
  :root {
    --cream:#F5EDD6; --red:#C8001A; --rdk:#7A0010;
    --gold:#F5B800; --ink:#0D0905;
    --disp:'Bebas Neue',Impact,'Arial Black',sans-serif;
    --body:'Libre Baskerville',Georgia,serif;
    --mono:'Courier New',monospace;
  }
  .ya-grain {
    position:fixed;inset:0;z-index:9997;pointer-events:none;
    background-image:radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px);
    background-size:3px 3px;
  }
  .ya-label {
    display:block;font-family:var(--mono);font-size:9px;letter-spacing:2.5px;
    text-transform:uppercase;color:rgba(245,237,214,.4);margin-bottom:5px;
  }
  .ya-input {
    display:block;width:100%;background:rgba(255,255,255,.06);
    border:1.5px solid rgba(245,237,214,.12);padding:11px 14px;
    font-family:var(--body);font-size:14px;color:var(--cream);
    outline:none;transition:border-color .2s,background .2s;
    border-radius:0;-webkit-appearance:none;appearance:none;box-sizing:border-box;
  }
  .ya-input:focus { border-color:var(--red);background:rgba(255,255,255,.09); }
  .ya-input::placeholder { color:rgba(245,237,214,.2); }
  .ya-btn {
    position:relative;overflow:hidden;cursor:pointer;border:none;
    font-family:var(--disp);letter-spacing:.12em;text-transform:uppercase;
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
  }
  .ya-btn::before {
    content:'';position:absolute;top:50%;left:50%;
    width:10px;height:10px;border-radius:50%;
    background:rgba(0,0,0,.2);
    transform:translate(-50%,-50%) scale(0);
    transition:transform .65s cubic-bezier(.16,1,.3,1);
  }
  .ya-btn:hover::before { transform:translate(-50%,-50%) scale(32); }
  .ya-btn-red {
    background:var(--red);color:white;
    padding:13px 28px;font-size:16px;
    box-shadow:4px 4px 0 var(--rdk);
  }
  .ya-btn-red:hover { box-shadow:2px 2px 0 var(--rdk); }
`;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "@yc2025Puppy") {
      localStorage.setItem("isAdminLoggedIn", "true");
      toast({ title: "Login Successful", description: "Welcome to the admin dashboard!" });
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid username or password", variant: "destructive" });
    }
  };

  return (
    <div style={{ background: "#0D0905", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <style>{CSS}</style>
      <div className="ya-grain" aria-hidden="true" />

      {/* Logos */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
        <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 34, filter: "brightness(10)" }} />
        <img src="/assets/red-logo.png" alt="red." style={{ height: 20, filter: "brightness(10)" }} />
      </div>

      {/* Login card */}
      <div style={{ width: "100%", maxWidth: 360, background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,237,214,.08)", borderLeft: "4px solid #C8001A", padding: "32px 28px" }}>
        <img src="/assets/ycon-logo.png" alt="Y-CON 2026"
          style={{ width: 160, display: "block", margin: "0 auto 8px", mixBlendMode: "screen" }} />

        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: "3px", color: "rgba(200,0,26,.7)", textTransform: "uppercase", textAlign: "center", margin: "0 0 28px" }}>
          // Admin Access
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 14 }}>
            <label className="ya-label">Username</label>
            <input type="text" className="ya-input" value={username}
              onChange={e => setUsername(e.target.value)} required autoComplete="username" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label className="ya-label">Password</label>
            <input type="password" className="ya-input" value={password}
              onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <button type="submit" className="ya-btn ya-btn-red" style={{ width: "100%", fontSize: 15 }}>
            Login →
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button onClick={() => navigate("/")}
            style={{ fontFamily: "'Courier New',monospace", color: "rgba(245,237,214,.25)", fontSize: 9, letterSpacing: ".12em", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>
            ← Back to Home
          </button>
        </div>
      </div>

      <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(245,237,214,.15)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 28 }}>
        Y-CON 2026 · Central Division · Admin
      </p>
    </div>
  );
};

export default AdminLogin;
