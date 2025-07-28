import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Phone, Mail, Calendar, MapPin, Shield, Heart, FileText, Camera } from "lucide-react";

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

const RegistrationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    // Load registration from localStorage
    const saved = localStorage.getItem("registrations");
    if (saved) {
      const registrations = JSON.parse(saved);
      const found = registrations.find((reg: Registration) => reg.id === id);
      setRegistration(found || null);
    }
  }, [id, navigate]);

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!registration) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-camp-navy mb-2">Registration Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested registration could not be found.</p>
          <Button onClick={() => navigate("/admin/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-camp-navy">
                {registration.firstName} {registration.lastName}
              </h1>
              <p className="text-muted-foreground">Registration Details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-camp-navy" />
                <h2 className="text-xl font-semibold text-camp-navy">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-camp-navy">Name</label>
                  <p className="text-muted-foreground">{registration.firstName} {registration.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Age</label>
                  <p className="text-muted-foreground">
                    {calculateAge(registration.dateOfBirth)} years old
                    <Badge variant={registration.isUnder18 ? "secondary" : "default"} className="ml-2">
                      {registration.isUnder18 ? "Under 18" : "Adult"}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Email</label>
                  <p className="text-muted-foreground">{registration.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Phone</label>
                  <p className="text-muted-foreground">{registration.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Date of Birth</label>
                  <p className="text-muted-foreground">{new Date(registration.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Gender</label>
                  <p className="text-muted-foreground capitalize">{registration.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-camp-navy">Corps/Church</label>
                  <p className="text-muted-foreground">{registration.corpsName}</p>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            {registration.isUnder18 && registration.guardianFirstName && (
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-camp-navy" />
                  <h2 className="text-xl font-semibold text-camp-navy">Guardian Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-camp-navy">Guardian Name</label>
                    <p className="text-muted-foreground">{registration.guardianFirstName} {registration.guardianLastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-camp-navy">Relationship</label>
                    <p className="text-muted-foreground capitalize">{registration.guardianRelationship}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-camp-navy">Guardian Email</label>
                    <p className="text-muted-foreground">{registration.guardianEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-camp-navy">Guardian Phone</label>
                    <p className="text-muted-foreground">{registration.guardianPhone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-camp-navy" />
                <h2 className="text-xl font-semibold text-camp-navy">Emergency Contact</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-camp-navy">Name</label>
                  <p className="text-muted-foreground">{registration.emergencyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Phone</label>
                  <p className="text-muted-foreground">{registration.emergencyPhone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Relationship</label>
                  <p className="text-muted-foreground">{registration.emergencyRelationship}</p>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-camp-navy" />
                <h2 className="text-xl font-semibold text-camp-navy">Medical Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-camp-navy">Medical Conditions</label>
                  <p className="text-muted-foreground">{registration.medicalConditions || "None specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Current Medications</label>
                  <p className="text-muted-foreground">{registration.medications || "None specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Allergies</label>
                  <p className="text-muted-foreground">{registration.allergies || "None specified"}</p>
                </div>
              </div>
            </div>

            {/* Consent & Permissions */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-camp-navy" />
                <h2 className="text-xl font-semibold text-camp-navy">Consent & Permissions</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-camp-navy">Photo/Video Consent</label>
                  <p className="text-muted-foreground">
                    {registration.photoVideoConsent === 'yes' ? 'Yes - Consents to photos/videos' : 'No - Does not consent to photos/videos'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-camp-navy">Terms Agreement</label>
                  <p className="text-muted-foreground">
                    {registration.agreedToTerms ? 'Agreed to terms and camp rules' : 'Not agreed'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-camp-navy" />
                <h2 className="text-xl font-semibold text-camp-navy">Registration Summary</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-camp-navy">Registration ID</span>
                  <span className="text-xs text-muted-foreground font-mono">{registration.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-camp-navy">Registered Date</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(registration.registeredAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-camp-navy">Age Category</span>
                  <Badge variant={registration.isUnder18 ? "secondary" : "default"}>
                    {registration.isUnder18 ? "Youth" : "Adult"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-camp-navy mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Participant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;