import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Search, Users, Calendar, Download } from "lucide-react";
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

  const RED = "hsl(var(--camp-red))";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ background: RED, height: "6px" }} />
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <span style={{ fontWeight: 900, fontSize: "1.1rem", color: RED }}>Y-CON 2026</span>
            <span className="text-muted-foreground text-sm ml-2">Admin Dashboard</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-muted-foreground">Loading registrations...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Total */}
              <div style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 44, height: 44, background: RED, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{registrations.length}</p>
                    <p className="text-xs text-muted-foreground">Total Registrations</p>
                  </div>
                </div>
              </div>

              {/* Under 18 */}
              <div style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 44, height: 44, background: "#fff0f0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${RED}` }}>
                    <Calendar style={{ width: 20, height: 20, color: RED }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {registrations.filter(r => r.isUnder18).length}
                    </p>
                    <p className="text-xs text-muted-foreground">Under 18</p>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: 44, height: 44, background: "#f5f5f5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Download className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Export</p>
                    <p className="text-xs text-muted-foreground">Download all as Excel</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={exportAllToExcel} disabled={!registrations.length}>
                    <Download className="w-3 h-3 mr-1" /> Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
              <p className="text-sm font-semibold text-foreground mb-3">Filter Registrations</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or corps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="under18">Under 18</SelectItem>
                    <SelectItem value="over18">18 and Over</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </p>

            {/* Registration cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  style={{ border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {reg.firstName} {reg.lastName}
                      </h3>
                      <p className="text-xs text-muted-foreground">Age: {calculateAge(reg.dateOfBirth)}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge
                        style={reg.isUnder18
                          ? { background: "#fff0f0", color: RED, border: `1px solid ${RED}`, fontSize: "0.65rem" }
                          : { background: "#f5f5f5", color: "#555", fontSize: "0.65rem" }
                        }
                      >
                        {reg.isUnder18 ? "Under 18" : "Adult"}
                      </Badge>
                      <Badge variant="outline" style={{ fontSize: "0.65rem" }}>
                        {reg.gender}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-xs font-medium" style={{ color: RED }}>Email</span>
                      <p className="text-muted-foreground text-xs">{reg.email}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium" style={{ color: RED }}>Phone</span>
                      <p className="text-muted-foreground text-xs">{reg.phone}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium" style={{ color: RED }}>Corps</span>
                      <p className="text-muted-foreground text-xs">{reg.corpsName}</p>
                    </div>
                    {reg.isUnder18 && reg.guardianFirstName && (
                      <div>
                        <span className="text-xs font-medium" style={{ color: RED }}>Guardian</span>
                        <p className="text-muted-foreground text-xs">{reg.guardianFirstName} {reg.guardianLastName}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-medium" style={{ color: RED }}>Emergency</span>
                      <p className="text-muted-foreground text-xs">{reg.emergencyName} — {reg.emergencyPhone}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: "1px solid #f0f0f0" }}>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => navigate(`/admin/registration/${reg.id}`)}
                      style={{
                        background: "none",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        padding: "4px 12px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "#333",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRegistrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No registrations found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {registrations.length === 0 ? "No one has registered yet." : "Try adjusting your filters."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ background: RED, height: "6px" }} />
    </div>
  );
};

export default AdminDashboard;
