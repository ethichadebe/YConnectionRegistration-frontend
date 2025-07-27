import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-accent-foreground" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-camp-navy mb-4">Registration Complete!</h1>
          
          <p className="text-lg text-foreground mb-6">
            Welcome to YC2025! Your registration has been successfully submitted.
          </p>

          <div className="bg-muted rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-camp-navy mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-camp-red">•</span>
                <span>You'll receive a confirmation email within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-red">•</span>
                <span>Payment instructions will be included in the email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-red">•</span>
                <span>Camp information packet will be sent 4 weeks before camp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-red">•</span>
                <span>Questions? Contact us at info@yc2025.org</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
            
            <p className="text-sm text-muted-foreground">
              We can't wait to see you at camp! 🏕️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;