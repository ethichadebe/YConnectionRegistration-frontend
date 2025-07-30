
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Search, Users, Calendar, MapPin } from "lucide-react";

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
    if (saved) {
      setRegistrations(JSON.parse(saved));
    }
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
      filtered = filtered.filter(reg => {
        if (ageFilter === "under18") return reg.isUnder18;
        if (ageFilter === "over18") return !reg.isUnder18;
        return true;
      });
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter(reg => reg.gender === genderFilter);
    }

    setFilteredRegistrations(filtered);
  }, [registrations, searchTerm, ageFilter, genderFilter]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

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

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-camp-navy">YC2025 Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-muted-foreground text-lg">Loading registrations...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-camp-red rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-camp-navy">{registrations.length}</p>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-camp-gold rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-camp-navy" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-camp-navy">
                      {registrations.filter(r => r.isUnder18).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Under 18</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-camp-navy rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-camp-navy">
                      {new Set(registrations.map(r => r.corpsName)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Different Corps</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-camp-navy mb-4">Filter Registrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredRegistrations.length} of {registrations.length} registrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRegistrations.map((registration) => (
                <div key={registration.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-camp-navy">
                        {registration.firstName} {registration.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {calculateAge(registration.dateOfBirth)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={registration.isUnder18 ? "secondary" : "default"}>
                        {registration.isUnder18 ? "Under 18" : "Adult"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {registration.gender}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-camp-navy">Email:</span>
                      <p className="text-muted-foreground">{registration.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-camp-navy">Phone:</span>
                      <p className="text-muted-foreground">{registration.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-camp-navy">Corps:</span>
                      <p className="text-muted-foreground">{registration.corpsName}</p>
                    </div>
                    {registration.isUnder18 && registration.guardianFirstName && (
                      <div>
                        <span className="font-medium text-camp-navy">Guardian:</span>
                        <p className="text-muted-foreground">
                          {registration.guardianFirstName} {registration.guardianLastName}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-camp-navy">Emergency Contact:</span>
                      <p className="text-muted-foreground">
                        {registration.emergencyName} - {registration.emergencyPhone}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Registered: {new Date(registration.registeredAt).toLocaleDateString()}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/admin/registration/${registration.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRegistrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No registrations found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {registrations.length === 0 
                    ? "No one has registered yet." 
                    : "Try adjusting your filters."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
