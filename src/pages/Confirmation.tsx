import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />

      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div
              style={{
                width: 72,
                height: 72,
                background: "hsl(var(--camp-red))",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle style={{ width: 40, height: 40, color: "white" }} />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--camp-red))" }}>
            Registration Complete!
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            You're registered for Y-CON 2026. We'll see you in Pretoria!
          </p>

          <div
            style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px", marginBottom: "24px", textAlign: "left" }}
          >
            <h3 className="font-semibold mb-3 text-sm tracking-wide" style={{ color: "hsl(var(--camp-red))" }}>
              WHAT'S NEXT
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span style={{ color: "hsl(var(--camp-red))" }}>•</span>
                <span>Check your email for a confirmation with your Registration Reference.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "hsl(var(--camp-red))" }}>•</span>
                <span>Payment of R550 is to be made to your Corps youth leader.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/")}
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
            Back to Home
          </button>
        </div>
      </div>

      <div style={{ background: "hsl(var(--camp-red))", height: "6px" }} />
    </div>
  );
};

export default Confirmation;
