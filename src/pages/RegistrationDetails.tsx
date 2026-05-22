import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  corpsName: string;
  isUnder18: boolean;
  registeredAt: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  guardianRelationship?: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  medicalConditions?: string;
  medications?: string;
  allergies?: string;
  photoVideoConsent?: string;
  agreedToTerms: boolean;
}

const CSS = `
  :root {
    --cream:#F5EDD6; --red:#C8001A; --rdk:#7A0010;
    --gold:#F5B800; --ink:#0D0905;
    --disp:'Bebas Neue',Impact,'Arial Black',sans-serif;
    --body:'Libre Baskerville',Georgia,serif;
    --mono:'Courier New',monospace;
  }
  .rd-grain {
    position:fixed;inset:0;z-index:9997;pointer-events:none;
    background-image:radial-gradient(circle,rgba(0,0,0,.04) 1px,transparent 1px);
    background-size:3px 3px;
  }
  .rd-card {
    background:white;border:1px solid rgba(13,9,5,.09);
    border-left:3px solid rgba(13,9,5,.12);
    padding:22px 24px;margin-bottom:16px;
  }
  .rd-card-red  { border-left-color:#C8001A; }
  .rd-card-gold { border-left-color:#F5B800; }
  .rd-label {
    font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;
    text-transform:uppercase;color:#C8001A;display:block;margin-bottom:3px;
  }
  .rd-value {
    font-family:'Libre Baskerville',Georgia,serif;font-size:13px;
    color:rgba(13,9,5,.7);line-height:1.5;
  }
  .rd-section-title {
    font-family:'Courier New',monospace;font-size:8px;letter-spacing:3px;
    text-transform:uppercase;color:rgba(13,9,5,.38);margin:0 0 18px;
  }
  .rd-btn {
    position:relative;overflow:hidden;cursor:pointer;border:none;
    font-family:'Bebas Neue',Impact,sans-serif;letter-spacing:.1em;text-transform:uppercase;
    display:inline-flex;align-items:center;justify-content:center;gap:6px;
    transition:box-shadow .15s;
  }
  .rd-btn::before {
    content:'';position:absolute;top:50%;left:50%;
    width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.12);
    transform:translate(-50%,-50%) scale(0);
    transition:transform .6s cubic-bezier(.16,1,.3,1);
  }
  .rd-btn:hover::before { transform:translate(-50%,-50%) scale(32); }
  .rd-btn-ghost {
    background:rgba(13,9,5,.06);color:rgba(13,9,5,.55);
    padding:9px 16px;font-size:13px;border:1px solid rgba(13,9,5,.12);
  }
  .rd-btn-ghost:hover { background:rgba(13,9,5,.1); }
  .rd-btn-action {
    background:rgba(200,0,26,.07);color:#C8001A;
    padding:10px 18px;font-size:13px;border:1px solid rgba(200,0,26,.2);
    width:100%;
  }
  .rd-btn-action:hover { background:rgba(200,0,26,.14); }
  @keyframes rd-fadeIn {
    from { opacity:0;transform:translateY(14px); }
    to   { opacity:1;transform:none; }
  }
  .rd-appear { animation:rd-fadeIn .4s ease both; }
`;

const RegistrationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await fetch(`https://yconnectionregistration-backend.onrender.com/api/registration/${id}`);
        const data = await response.json();
        setRegistration(data);
      } catch (error) {
        console.error("Error fetching registration:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, [id]);

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  if (loading) {
    return (
      <div style={{ background: "#F5EDD6", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <style>{CSS}</style>
        <div className="rd-grain" aria-hidden="true" />
        <div style={{ width: 40, height: 40, border: "3px solid rgba(13,9,5,.1)", borderTop: "3px solid #C8001A", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: "3px", color: "rgba(13,9,5,.3)", textTransform: "uppercase" }}>Loading…</p>
      </div>
    );
  }

  if (!registration) {
    return (
      <div style={{ background: "#F5EDD6", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <style>{CSS}</style>
        <div className="rd-grain" aria-hidden="true" />
        <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 32, color: "rgba(13,9,5,.2)", letterSpacing: ".1em" }}>NOT FOUND</p>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 10, color: "rgba(13,9,5,.3)", letterSpacing: "2px", textTransform: "uppercase" }}>Registration could not be found.</p>
        <button className="rd-btn rd-btn-ghost" onClick={() => navigate("/admin/dashboard")}>← Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh", color: "#0D0905" }}>
      <style>{CSS}</style>
      <div className="rd-grain" aria-hidden="true" />

      {/* Nav */}
      <nav style={{ background: "rgba(245,237,214,.97)", borderBottom: "2px solid #C8001A", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
          <button className="rd-btn rd-btn-ghost" onClick={() => navigate("/admin/dashboard")}>← Back</button>
          <div style={{ width: 1, height: 20, background: "rgba(13,9,5,.12)" }} />
          <div>
            <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 20, color: "#0D0905", letterSpacing: ".06em", margin: 0, lineHeight: 1 }}>
              {registration.firstName} {registration.lastName}
            </p>
            <p style={{ fontFamily: "'Courier New',monospace", fontSize: 8, color: "rgba(13,9,5,.35)", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
              Registration Details
            </p>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: 20, alignItems: "start" }}
          className="rd-appear">

          {/* LEFT: detail sections */}
          <div>
            {/* Personal */}
            <div className="rd-card rd-card-red">
              <p className="rd-section-title">// Personal Information</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 18 }}>
                {[
                  { l: "Full Name", v: `${registration.firstName} ${registration.lastName}` },
                  { l: "Age", v: `${calculateAge(registration.dateOfBirth)} years old` },
                  { l: "Email", v: registration.email },
                  { l: "Phone", v: registration.phone },
                  { l: "Date of Birth", v: new Date(registration.dateOfBirth).toLocaleDateString() },
                  { l: "Gender", v: registration.gender },
                  { l: "Corps", v: registration.corpsName },
                  { l: "Age Category", v: registration.isUnder18 ? "Under 18" : "Adult (18+)" },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <span className="rd-label">{l}</span>
                    <span className="rd-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guardian */}
            {registration.isUnder18 && registration.guardianFirstName && (
              <div className="rd-card rd-card-gold">
                <p className="rd-section-title">// Guardian Information</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 18 }}>
                  {[
                    { l: "Guardian Name", v: `${registration.guardianFirstName} ${registration.guardianLastName}` },
                    { l: "Relationship", v: registration.guardianRelationship || "—" },
                    { l: "Guardian Email", v: registration.guardianEmail || "—" },
                    { l: "Guardian Phone", v: registration.guardianPhone || "—" },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <span className="rd-label">{l}</span>
                      <span className="rd-value">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency */}
            <div className="rd-card">
              <p className="rd-section-title">// Emergency Contact</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 18 }}>
                {[
                  { l: "Name", v: registration.emergencyName },
                  { l: "Phone", v: registration.emergencyPhone },
                  { l: "Relationship", v: registration.emergencyRelationship },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <span className="rd-label">{l}</span>
                    <span className="rd-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical */}
            <div className="rd-card">
              <p className="rd-section-title">// Medical Information</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { l: "Medical Conditions", v: registration.medicalConditions || "None specified" },
                  { l: "Current Medications", v: registration.medications || "None specified" },
                  { l: "Allergies", v: registration.allergies || "None specified" },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <span className="rd-label">{l}</span>
                    <span className="rd-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consent */}
            <div className="rd-card">
              <p className="rd-section-title">// Consent & Permissions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <span className="rd-label">Photo / Video Consent</span>
                  <span className="rd-value">
                    {registration.photoVideoConsent === "yes" ? "Yes — consents to photos/videos" : "No — does not consent"}
                  </span>
                </div>
                <div>
                  <span className="rd-label">Terms & Camp Rules</span>
                  <span className="rd-value">
                    {registration.agreedToTerms ? "Agreed" : "Not agreed"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: summary + actions */}
          <div>
            {/* Summary */}
            <div className="rd-card rd-card-red" style={{ marginBottom: 16 }}>
              <p className="rd-section-title">// Registration Summary</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <span className="rd-label">Reference ID</span>
                  <span style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: "#C8001A", letterSpacing: "1px" }}>
                    YC2026-{registration.id}
                  </span>
                </div>
                <div>
                  <span className="rd-label">Registered</span>
                  <span className="rd-value">{new Date(registration.registeredAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="rd-label">Age Category</span>
                  <span style={{
                    fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
                    padding: "3px 10px", display: "inline-block",
                    background: registration.isUnder18 ? "rgba(200,0,26,.08)" : "rgba(13,9,5,.05)",
                    color: registration.isUnder18 ? "#C8001A" : "rgba(13,9,5,.4)",
                    border: registration.isUnder18 ? "1px solid rgba(200,0,26,.2)" : "1px solid rgba(13,9,5,.1)",
                  }}>
                    {registration.isUnder18 ? "Under 18" : "Adult"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rd-card">
              <p className="rd-section-title">// Quick Actions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={`mailto:${registration.email}`} style={{ textDecoration: "none" }}>
                  <button className="rd-btn rd-btn-action">✉ Send Email</button>
                </a>
                <a href={`tel:${registration.phone}`} style={{ textDecoration: "none" }}>
                  <button className="rd-btn rd-btn-action">✆ Call Youth</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(13,9,5,.08)", padding: "16px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.22)", letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>
          Y-CON 2026 · Central Division · Admin Portal
        </p>
      </div>
    </div>
  );
};

export default RegistrationDetails;
