import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import campHeader from "@/assets/camp-header.png";
import campBadge from "@/assets/camp-badge.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-camp-cream to-muted">
      {/* Header with torn paper effect */}
      <div className="torn-paper relative overflow-hidden flex justify-center">
        <img 
          src={campHeader} 
          alt="Central Division Youth Camp 2025" 
          className="w-full max-w-4xl object-cover"
        />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 text-center">
        {/* Camp badge */}
        <div className="flex justify-center mb-8 mt-8">
            <img 
              src={campBadge} 
              alt="YC2025 Badge" 
              className="w-24 h-24 object-cover"
            />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black text-camp-navy mb-4 leading-tight">
          Youth Connection
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-camp-red mb-2">
          CENTRAL DIVISION
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-camp-navy mb-8">
          #YC2025
        </h3>

        {/* Camp details */}
        <div className="bg-card rounded-2xl p-8 shadow-xl max-w-lg mx-auto mb-8">
          <div className="space-y-4 text-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Dates:</span>
              <span className="text-foreground">12–14 September 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Location:</span>
              <span className="text-foreground">Warrenton Cultural Center (Far South)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Cost:</span>
              <span className="text-camp-red font-bold">R300</span>
            </div>
          </div>
        </div>

        {/* Registration CTA */}
        <div className="space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => navigate('/register')}
            className="px-12 py-4 text-xl"
          >
            Register Now!
          </Button>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Payment of R300 must be made by [ 8 August 2025 ] <br/>
          Banking Details: DHQ via Corps Account .
          </p>
        </div>

        {/* Admin login link */}
        <div className="mt-16 pt-8 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/login')}
            className="text-muted-foreground hover:text-foreground"
          >
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;