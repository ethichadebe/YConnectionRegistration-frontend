import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import campHeader from "@/assets/camp-header.jpg";
import campBadge from "@/assets/camp-badge.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-camp-cream to-muted">
      {/* Header with torn paper effect */}
      <div className="torn-paper relative overflow-hidden">
        <img 
          src={campHeader} 
          alt="Central Division Youth Camp 2025" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 text-center">
        {/* Camp badge */}
        <div className="flex justify-center mb-8">
          <div className="camp-badge w-32 h-32 flex items-center justify-center">
            <img 
              src={campBadge} 
              alt="YC2025 Badge" 
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black text-camp-navy mb-4 leading-tight">
          YC2025
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-camp-red mb-2">
          CENTRAL DIVISION
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-camp-navy mb-8">
          YOUTH CAMP
        </h3>

        {/* Camp details */}
        <div className="bg-card rounded-2xl p-8 shadow-xl max-w-lg mx-auto mb-8">
          <div className="space-y-4 text-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Dates:</span>
              <span className="text-foreground">July 14-19, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Location:</span>
              <span className="text-foreground">Camp Wonderland</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Ages:</span>
              <span className="text-foreground">14-35 years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-camp-navy">Cost:</span>
              <span className="text-camp-red font-bold">$299</span>
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
            Secure your spot at the most exciting youth camp of 2025! 
            Early bird pricing ends March 1st.
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