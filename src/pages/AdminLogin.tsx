import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials
    if (username === "admin" && password === "@yc2025Puppy") {
      localStorage.setItem("isAdminLoggedIn", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-camp-navy mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Access the registration dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="camp" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;