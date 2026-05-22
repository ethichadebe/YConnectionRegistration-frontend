import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

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
  emergencyName: string;
  emergencyPhone: string;
}

const CSS = `
  :root {
    --cream:#F5EDD6; --red:#C8001A; --rdk:#7A0010;
    --gold:#F5B800; --ink:#0D0905;
    --disp:'Bebas Neue',Impact,'Arial Black',sans-serif;
    --body:'Libre Baskerville',Georgia,serif;
    --mono:'Courier New',monospace;
  }
  .ad-grain {
    position:fixed;inset:0;z-index:9997;pointer-events:none;
    background-image:radial-gradient(circle,rgba(0,0,0,.04) 1px,transparent 1px);
    background-size:3px 3px;
  }
  .ad-btn {
    position:relative;overflow:hidden;cursor:pointer;border:none;
    font-family:var(--disp);letter-spacing:.1em;text-transform:uppercase;
    display:inline-flex;align-items:center;justify-content:center;gap:6px;
    transition:box-shadow .15s;
  }
  .ad-btn::before {
    content:'';position:absolute;top:50%;left:50%;
    width:10px;height:10px;border-radius:50%;
    background:rgba(0,0,0,.12);
    transform:translate(-50%,-50%) scale(0);
    transition:transform .6s cubic-bezier(.16,1,.3,1);
  }
  .ad-btn:hover::before { transform:translate(-50%,-50%) scale(32); }
  .ad-btn-red {
    background:var(--red);color:white;
    padding:9px 18px;font-size:13px;
    box-shadow:3px 3px 0 var(--rdk);
  }
  .ad-btn-red:hover { box-shadow:1px 1px 0 var(--rdk); }
  .ad-btn-ghost {
    background:rgba(13,9,5,.06);color:rgba(13,9,5,.55);
    padding:9px 16px;font-size:12px;
    border:1px solid rgba(13,9,5,.12);
  }
  .ad-btn-ghost:hover { background:rgba(13,9,5,.1); }
  .ad-input {
    background:white;border:1.5px solid rgba(13,9,5,.14);
    padding:9px 14px;font-family:var(--body);font-size:13px;
    color:var(--ink);outline:none;width:100%;box-sizing:border-box;
    transition:border-color .2s;
  }
  .ad-input:focus { border-color:var(--red); }
  .ad-input::placeholder { color:rgba(13,9,5,.3); }
  .ad-select {
    background:white;border:1.5px solid rgba(13,9,5,.14);
    padding:9px 36px 9px 14px;font-family:var(--body);font-size:13px;
    color:var(--ink);outline:none;width:100%;box-sizing:border-box;
    appearance:none;-webkit-appearance:none;cursor:pointer;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(13,9,5,.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 12px center;
    transition:border-color .2s;
  }
  .ad-select:focus { border-color:var(--red); }
  .ad-card {
    background:white;border:1px solid rgba(13,9,5,.09);
    border-left:3px solid transparent;
    padding:18px;transition:border-left-color .2s,box-shadow .2s;cursor:pointer;
  }
  .ad-card:hover { border-left-color:var(--red);box-shadow:0 2px 12px rgba(13,9,5,.06); }
  @keyframes ad-fadeIn {
    from { opacity:0;transform:translateY(12px); }
    to   { opacity:1;transform:none; }
  }
  .ad-appear { animation:ad-fadeIn .4s ease both; }
`;

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://yconnectionregistration-backend.onrender.com/api/registrations");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setRegistrations(data);
        setFilteredRegistrations(data);
        window.scrollTo({ top: 0, behavior: "instant" });
      } catch (err) {
        console.error(err);
        toast({ title: "Error loading data", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    const saved = localStorage.getItem("registrations");
    if (saved) setRegistrations(JSON.parse(saved));
  }, [navigate]);

  useEffect(() => {
    let filtered = registrations;
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.corpsName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (ageFilter !== "all") {
      filtered = filtered.filter(reg =>
        ageFilter === "under18" ? reg.isUnder18 : !reg.isUnder18
      );
    }
    if (genderFilter !== "all") {
      filtered = filtered.filter(reg => reg.gender === genderFilter);
    }
    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, ageFilter, genderFilter]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate("/");
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const exportAllToExcel = () => {
    try {
      if (!registrations.length) {
        toast({ title: "No data to export", description: "There are no registrations yet." });
        return;
      }
      const rows = registrations.map((r) => ({
        ID: r.id,
        "First Name": r.firstName,
        "Last Name": r.lastName,
        Email: r.email,
        Phone: r.phone,
        "Date of Birth": r.dateOfBirth,
        Age: calculateAge(r.dateOfBirth),
        Gender: r.gender,
        "Corps Name": r.corpsName,
        "Under 18": r.isUnder18 ? "Yes" : "No",
        "Guardian First Name": r.guardianFirstName || "",
        "Guardian Last Name": r.guardianLastName || "",
        "Emergency Name": r.emergencyName,
        "Emergency Phone": r.emergencyPhone,
        "Registered At": new Date(r.registeredAt).toLocaleString(),
      }));
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      const timestamp = new Date().toISOString().replace(/[:T]/g, "-").split(".")[0];
      const filename = `YC2026-Registrations-${timestamp}.xlsx`;
      XLSX.writeFile(workbook, filename);
      toast({ title: "Export complete", description: `Saved ${rows.length} rows to ${filename}` });
    } catch (e) {
      console.error(e);
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh", color: "#0D0905" }}>
      <style>{CSS}</style>
      <div className="ad-grain" aria-hidden="true" />

      {/* Nav */}
      <nav style={{ background: "rgba(245,237,214,.97)", borderBottom: "2px solid #C8001A", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 22 }} />
            <img src="/assets/red-logo.png" alt="red." style={{ height: 14 }} />
            <span style={{ width: 1, height: 20, background: "rgba(13,9,5,.15)", display: "inline-block", margin: "0 4px" }} />
            <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 18, letterSpacing: ".12em", color: "#0D0905" }}>Y-CON 2026</span>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: "3px", color: "rgba(200,0,26,.7)", textTransform: "uppercase" }}>// Admin</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="ad-btn ad-btn-ghost" onClick={exportAllToExcel} disabled={!registrations.length || isLoading}
              style={{ opacity: (!registrations.length || isLoading) ? 0.4 : 1 }}>
              ↓ Export XLSX
            </button>
            <button className="ad-btn ad-btn-red" onClick={handleLogout}>
              Logout →
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 60px" }}>

        {isLoading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
            <div style={{ width: 40, height: 40, border: "3px solid rgba(13,9,5,.1)", borderTop: "3px solid #C8001A", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p style={{ fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: "3px", color: "rgba(13,9,5,.3)", textTransform: "uppercase" }}>Loading registrations...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 32 }} className="ad-appear">
              <div style={{ background: "white", border: "1px solid rgba(13,9,5,.09)", borderLeft: "4px solid #C8001A", padding: "20px 22px" }}>
                <p style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "3px", color: "rgba(13,9,5,.38)", textTransform: "uppercase", margin: "0 0 6px" }}>// Total Registered</p>
                <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 52, color: "#0D0905", lineHeight: 1, margin: 0 }}>{registrations.length}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(13,9,5,.09)", borderLeft: "4px solid #C8001A", padding: "20px 22px" }}>
                <p style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "3px", color: "rgba(13,9,5,.38)", textTransform: "uppercase", margin: "0 0 6px" }}>// Under 18</p>
                <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 52, color: "#C8001A", lineHeight: 1, margin: 0 }}>{registrations.filter(r => r.isUnder18).length}</p>
              </div>
              <div style={{ background: "white", border: "1px solid rgba(13,9,5,.09)", borderLeft: "4px solid rgba(13,9,5,.2)", padding: "20px 22px" }}>
                <p style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "3px", color: "rgba(13,9,5,.38)", textTransform: "uppercase", margin: "0 0 6px" }}>// Adults (18+)</p>
                <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 52, color: "rgba(13,9,5,.45)", lineHeight: 1, margin: 0 }}>{registrations.filter(r => !r.isUnder18).length}</p>
              </div>
            </div>

            {/* Filters */}
            <div style={{ background: "white", border: "1px solid rgba(13,9,5,.09)", padding: "18px 20px", marginBottom: 24 }} className="ad-appear">
              <p style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "3px", color: "#C8001A", textTransform: "uppercase", margin: "0 0 14px" }}>// Filter Registrations</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
                <input
                  className="ad-input"
                  type="text"
                  placeholder="Search name, email, corps…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <select className="ad-select" value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
                  <option value="all">All Ages</option>
                  <option value="under18">Under 18</option>
                  <option value="over18">18 and Over</option>
                </select>
                <select className="ad-select" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: "2px", color: "rgba(13,9,5,.3)", textTransform: "uppercase", margin: "0 0 16px" }}>
              Showing {filteredRegistrations.length} of {registrations.length}
            </p>

            {/* Cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
              {filteredRegistrations.map((reg, i) => (
                <div
                  key={reg.id}
                  className="ad-card ad-appear"
                  style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
                  onClick={() => navigate(`/admin/registration/${reg.id}`)}
                >
                  {/* Card header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 22, color: "#0D0905", letterSpacing: ".05em", margin: "0 0 2px", lineHeight: 1 }}>
                        {reg.firstName} {reg.lastName}
                      </p>
                      <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.38)", letterSpacing: "1px" }}>
                        Age {calculateAge(reg.dateOfBirth)} · {reg.gender}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "2px", textTransform: "uppercase",
                      padding: "3px 8px",
                      background: reg.isUnder18 ? "rgba(200,0,26,.08)" : "rgba(13,9,5,.05)",
                      color: reg.isUnder18 ? "#C8001A" : "rgba(13,9,5,.4)",
                      border: reg.isUnder18 ? "1px solid rgba(200,0,26,.2)" : "1px solid rgba(13,9,5,.1)",
                    }}>
                      {reg.isUnder18 ? "U18" : "Adult"}
                    </span>
                  </div>

                  {/* Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {[
                      { l: "Email", v: reg.email },
                      { l: "Corps", v: reg.corpsName },
                      ...(reg.isUnder18 && reg.guardianFirstName ? [{ l: "Guardian", v: `${reg.guardianFirstName} ${reg.guardianLastName}` }] : []),
                    ].map(({ l, v }) => (
                      <div key={l} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                        <span style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: "2px", textTransform: "uppercase", color: "#C8001A", flexShrink: 0, minWidth: 46 }}>{l}</span>
                        <span style={{ fontFamily: "'Libre Baskerville',Georgia,serif", fontSize: 12, color: "rgba(13,9,5,.6)", lineHeight: 1.4, wordBreak: "break-all" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(13,9,5,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: 8, color: "rgba(13,9,5,.25)", letterSpacing: "1px" }}>
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </span>
                    <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".12em", color: "#C8001A" }}>
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredRegistrations.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 32, color: "rgba(13,9,5,.15)", letterSpacing: ".1em" }}>NO RESULTS</p>
                <p style={{ fontFamily: "'Courier New',monospace", fontSize: 10, color: "rgba(13,9,5,.25)", letterSpacing: "2px", textTransform: "uppercase", marginTop: 8 }}>
                  {registrations.length === 0 ? "No registrations yet." : "Try adjusting your filters."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer stripe */}
      <div style={{ borderTop: "1px solid rgba(13,9,5,.08)", padding: "16px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.22)", letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>
          Y-CON 2026 · Central Division · Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
