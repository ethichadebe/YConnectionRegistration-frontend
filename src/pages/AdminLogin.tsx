import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-sm">
          {/* red. branding */}
          <div className="text-center mb-8">
            <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "hsl(var(--camp-red))", lineHeight: 1 }}>
              red.
            </div>
            <div style={{ fontSize: "0.6rem", color: "#aaa", letterSpacing: "0.1em", marginBottom: "16px" }}>
              REACH · EVANGELISE · DISCIPLE
            </div>
            <h1 className="text-xl font-bold text-foreground mb-1">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Y-CON 2026 registration dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                background: "hsl(var(--camp-red))",
                color: "white",
                border: "none",
                padding: "12px 0",
                fontSize: "0.95rem",
                fontWeight: 700,
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", color: "#aaa", fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />
    </div>
  );
};

export default AdminLogin;
