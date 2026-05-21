import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Mail, Calendar, Shield, Heart, FileText, Camera, Loader2 } from "lucide-react";

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

const SECTION_CARD: React.CSSProperties = {
  border: "1px solid #e8e8e8",
  borderRadius: "12px",
  padding: "20px",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "hsl(var(--camp-red))",
  letterSpacing: "0.08em",
  display: "block",
  marginBottom: "2px",
};

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

  const RED = "hsl(var(--camp-red))";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 style={{ width: 32, height: 32, color: RED }} className="animate-spin" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Registration Not Found</h2>
          <p className="text-muted-foreground text-sm mb-4">The requested registration could not be found.</p>
          <Button onClick={() => navigate("/admin/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ background: RED, height: "6px" }} />
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              {registration.firstName} {registration.lastName}
            </h1>
            <p className="text-xs text-muted-foreground">Registration Details</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: detail sections */}
          <div className="lg:col-span-2 space-y-4">

            {/* Personal */}
            <div style={SECTION_CARD}>
              <div className="flex items-center gap-2 mb-4">
                <User style={{ width: 16, height: 16, color: RED }} />
                <h2 className="font-semibold text-foreground">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><span style={LABEL_STYLE}>Name</span><p className="text-muted-foreground">{registration.firstName} {registration.lastName}</p></div>
                <div>
                  <span style={LABEL_STYLE}>Age</span>
                  <p className="text-muted-foreground flex items-center gap-2">
                    {calculateAge(registration.dateOfBirth)} years old
                    <Badge style={registration.isUnder18
                      ? { background: "#fff0f0", color: RED, border: `1px solid ${RED}`, fontSize: "0.6rem" }
                      : { background: "#f5f5f5", color: "#555", fontSize: "0.6rem" }
                    }>
                      {registration.isUnder18 ? "Under 18" : "Adult"}
                    </Badge>
                  </p>
                </div>
                <div><span style={LABEL_STYLE}>Email</span><p className="text-muted-foreground">{registration.email}</p></div>
                <div><span style={LABEL_STYLE}>Phone</span><p className="text-muted-foreground">{registration.phone}</p></div>
                <div><span style={LABEL_STYLE}>Date of Birth</span><p className="text-muted-foreground">{new Date(registration.dateOfBirth).toLocaleDateString()}</p></div>
                <div><span style={LABEL_STYLE}>Gender</span><p className="text-muted-foreground capitalize">{registration.gender}</p></div>
                <div className="md:col-span-2"><span style={LABEL_STYLE}>Corps</span><p className="text-muted-foreground">{registration.corpsName}</p></div>
              </div>
            </div>

            {/* Guardian */}
            {registration.isUnder18 && registration.guardianFirstName && (
              <div style={SECTION_CARD}>
                <div className="flex items-center gap-2 mb-4">
                  <Shield style={{ width: 16, height: 16, color: RED }} />
                  <h2 className="font-semibold text-foreground">Guardian Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span style={LABEL_STYLE}>Guardian Name</span><p className="text-muted-foreground">{registration.guardianFirstName} {registration.guardianLastName}</p></div>
                  <div><span style={LABEL_STYLE}>Relationship</span><p className="text-muted-foreground capitalize">{registration.guardianRelationship}</p></div>
                  <div><span style={LABEL_STYLE}>Guardian Email</span><p className="text-muted-foreground">{registration.guardianEmail}</p></div>
                  <div><span style={LABEL_STYLE}>Guardian Phone</span><p className="text-muted-foreground">{registration.guardianPhone}</p></div>
                </div>
              </div>
            )}

            {/* Emergency */}
            <div style={SECTION_CARD}>
              <div className="flex items-center gap-2 mb-4">
                <Phone style={{ width: 16, height: 16, color: RED }} />
                <h2 className="font-semibold text-foreground">Emergency Contact</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><span style={LABEL_STYLE}>Name</span><p className="text-muted-foreground">{registration.emergencyName}</p></div>
                <div><span style={LABEL_STYLE}>Phone</span><p className="text-muted-foreground">{registration.emergencyPhone}</p></div>
                <div><span style={LABEL_STYLE}>Relationship</span><p className="text-muted-foreground">{registration.emergencyRelationship}</p></div>
              </div>
            </div>

            {/* Medical */}
            <div style={SECTION_CARD}>
              <div className="flex items-center gap-2 mb-4">
                <Heart style={{ width: 16, height: 16, color: RED }} />
                <h2 className="font-semibold text-foreground">Medical Information</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div><span style={LABEL_STYLE}>Medical Conditions</span><p className="text-muted-foreground">{registration.medicalConditions || "None specified"}</p></div>
                <div><span style={LABEL_STYLE}>Current Medications</span><p className="text-muted-foreground">{registration.medications || "None specified"}</p></div>
                <div><span style={LABEL_STYLE}>Allergies</span><p className="text-muted-foreground">{registration.allergies || "None specified"}</p></div>
              </div>
            </div>

            {/* Consent */}
            <div style={SECTION_CARD}>
              <div className="flex items-center gap-2 mb-4">
                <Camera style={{ width: 16, height: 16, color: RED }} />
                <h2 className="font-semibold text-foreground">Consent & Permissions</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span style={LABEL_STYLE}>Photo/Video Consent</span>
                  <p className="text-muted-foreground">
                    {registration.photoVideoConsent === "yes" ? "Yes — consents to photos/videos" : "No — does not consent to photos/videos"}
                  </p>
                </div>
                <div>
                  <span style={LABEL_STYLE}>Terms Agreement</span>
                  <p className="text-muted-foreground">
                    {registration.agreedToTerms ? "Agreed to terms and camp rules" : "Not agreed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: summary + actions */}
          <div className="space-y-4">
            <div style={SECTION_CARD}>
              <div className="flex items-center gap-2 mb-4">
                <FileText style={{ width: 16, height: 16, color: RED }} />
                <h2 className="font-semibold text-foreground">Registration Summary</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs font-bold" style={{ color: RED }}>YC2026-{registration.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="text-xs">{new Date(registration.registeredAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Age Category</span>
                  <Badge style={registration.isUnder18
                    ? { background: "#fff0f0", color: RED, border: `1px solid ${RED}`, fontSize: "0.6rem" }
                    : { background: "#f5f5f5", color: "#555", fontSize: "0.6rem" }
                  }>
                    {registration.isUnder18 ? "Under 18" : "Adult"}
                  </Badge>
                </div>
              </div>
            </div>

            <div style={SECTION_CARD}>
              <h3 className="font-semibold text-foreground text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <a href={`mailto:${registration.email}`} className="w-full">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Mail className="w-4 h-4 mr-2" /> Send Email
                  </Button>
                </a>
                <a href={`tel:${registration.phone}`} className="w-full">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <Phone className="w-4 h-4 mr-2" /> Call Youth
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: RED, height: "6px" }} />
    </div>
  );
};

export default RegistrationDetails;
