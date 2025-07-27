import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  corpsName: string;
  
  // Guardian Info (if under 18)
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  guardianRelationship?: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  
  // Medical Info
  medicalConditions: string;
  medications: string;
  allergies: string;
  
  // Agreement
  agreedToTerms: boolean;
}

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>();
  
  const totalSteps = 5;
  const stepLabels = ["Personal", "Guardian", "Emergency", "Medical", "Review"];
  
  const dateOfBirth = watch("dateOfBirth");
  
  // Check if user is under 18
  const checkAge = (dob: string) => {
    if (!dob) return false;
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 < 18;
    }
    return age < 18;
  };

  const onSubmit = (data: FormData) => {
    // Save to localStorage (in real app, this would be an API call)
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    const newRegistration = {
      id: Date.now().toString(),
      ...data,
      registeredAt: new Date().toISOString(),
      isUnder18
    };
    
    registrations.push(newRegistration);
    localStorage.setItem("registrations", JSON.stringify(registrations));
    
    toast({
      title: "Registration Successful!",
      description: "Welcome to YC2025! Check your email for confirmation.",
    });
    
    navigate("/confirmation");
  };

  const nextStep = () => {
    const formData = watch();
    let isValid = true;
    const newFieldErrors: Record<string, boolean> = {};
    
    // Validate current step before proceeding
    if (currentStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'corpsName'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof FormData]) {
          newFieldErrors[field] = true;
          isValid = false;
        }
      });
      if (isValid && dateOfBirth) {
        setIsUnder18(checkAge(dateOfBirth));
      }
    }
    
    if (currentStep === 2 && isUnder18) {
      const requiredFields = ['guardianFirstName', 'guardianLastName', 'guardianEmail', 'guardianPhone', 'guardianRelationship'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof FormData]) {
          newFieldErrors[field] = true;
          isValid = false;
        }
      });
    }
    
    if (currentStep === 3) {
      const requiredFields = ['emergencyName', 'emergencyPhone', 'emergencyRelationship'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof FormData]) {
          newFieldErrors[field] = true;
          isValid = false;
        }
      });
    }
    
    if (currentStep === 5) {
      if (!formData.agreedToTerms) {
        newFieldErrors.agreedToTerms = true;
        isValid = false;
      }
    }
    
    setFieldErrors(newFieldErrors);
    
    if (!isValid) {
      toast({
        title: "Please fill all required fields",
        description: "Complete all mandatory fields before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    // Clear errors if validation passes
    setFieldErrors({});
    
    // Skip guardian step if over 18
    if (currentStep === 1 && !checkAge(dateOfBirth)) {
      setCurrentStep(3);
    } else if (currentStep === 2 && !isUnder18) {
      setCurrentStep(3);
    } else {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    // Skip guardian step if over 18
    if (currentStep === 3 && !isUnder18) {
      setCurrentStep(1);
    } else {
      setCurrentStep(Math.max(currentStep - 1, 1));
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-camp-navy mb-2">YC2025 Registration</h1>
          <p className="text-muted-foreground">Join us for an unforgettable summer experience!</p>
        </div>

        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          stepLabels={stepLabels}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl p-8 shadow-lg">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-camp-navy mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName"
                    className={`form-input ${fieldErrors.firstName ? 'error' : ''}`}
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName"
                    className={`form-input ${fieldErrors.lastName ? 'error' : ''}`}
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  className={`form-input ${fieldErrors.email ? 'error' : ''}`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  type="tel"
                  className={`form-input ${fieldErrors.phone ? 'error' : ''}`}
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input 
                    id="dateOfBirth"
                    type="date"
                    className={`form-input ${fieldErrors.dateOfBirth ? 'error' : ''}`}
                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                  />
                  {errors.dateOfBirth && <p className="text-destructive text-sm mt-1">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select onValueChange={(value) => setValue("gender", value)}>
                    <SelectTrigger className={`form-input ${fieldErrors.gender ? 'error' : ''}`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-destructive text-sm mt-1">Gender is required</p>}
                  <input 
                    type="hidden" 
                    {...register("gender", { required: "Gender is required" })} 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="corpsName">Corps/Church Name *</Label>
                <Input 
                  id="corpsName"
                  className={`form-input ${fieldErrors.corpsName ? 'error' : ''}`}
                  {...register("corpsName", { required: "Corps name is required" })}
                />
                {errors.corpsName && <p className="text-destructive text-sm mt-1">{errors.corpsName.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Guardian Information (only if under 18) */}
          {currentStep === 2 && isUnder18 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-camp-navy mb-6">Guardian Information</h2>
              <p className="text-muted-foreground mb-6">Since you're under 18, we need your guardian's information.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianFirstName">Guardian First Name *</Label>
                  <Input 
                    id="guardianFirstName"
                    className={`form-input ${fieldErrors.guardianFirstName ? 'error' : ''}`}
                    {...register("guardianFirstName", { required: isUnder18 ? "Guardian first name is required" : false })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="guardianLastName">Guardian Last Name *</Label>
                  <Input 
                    id="guardianLastName"
                    className={`form-input ${fieldErrors.guardianLastName ? 'error' : ''}`}
                    {...register("guardianLastName", { required: isUnder18 ? "Guardian last name is required" : false })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="guardianEmail">Guardian Email *</Label>
                <Input 
                  id="guardianEmail"
                  type="email"
                  className={`form-input ${fieldErrors.guardianEmail ? 'error' : ''}`}
                  {...register("guardianEmail", { 
                    required: isUnder18 ? "Guardian email is required" : false,
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                  <Input 
                    id="guardianPhone"
                    type="tel"
                    className={`form-input ${fieldErrors.guardianPhone ? 'error' : ''}`}
                    {...register("guardianPhone", { required: isUnder18 ? "Guardian phone is required" : false })}
                  />
                </div>

                <div>
                  <Label htmlFor="guardianRelationship">Relationship *</Label>
                  <Select onValueChange={(value) => setValue("guardianRelationship", value)}>
                    <SelectTrigger className={`form-input ${fieldErrors.guardianRelationship ? 'error' : ''}`}>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="guardian">Legal Guardian</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.guardianRelationship && <p className="text-destructive text-sm mt-1">Relationship is required</p>}
                  <input 
                    type="hidden" 
                    {...register("guardianRelationship", { required: isUnder18 ? "Relationship is required" : false })} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Continue with other steps... */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-camp-navy mb-6">Emergency Contact</h2>
              
              <div>
                <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                <Input 
                  id="emergencyName"
                  className={`form-input ${fieldErrors.emergencyName ? 'error' : ''}`}
                  {...register("emergencyName", { required: "Emergency contact name is required" })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                  <Input 
                    id="emergencyPhone"
                    type="tel"
                    className={`form-input ${fieldErrors.emergencyPhone ? 'error' : ''}`}
                    {...register("emergencyPhone", { required: "Emergency phone is required" })}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyRelationship">Relationship *</Label>
                  <Input 
                    id="emergencyRelationship"
                    className={`form-input ${fieldErrors.emergencyRelationship ? 'error' : ''}`}
                    {...register("emergencyRelationship", { required: "Emergency relationship is required" })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-camp-navy mb-6">Medical Information</h2>
              
              <div>
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Input 
                  id="medicalConditions"
                  className="form-input"
                  placeholder="List any medical conditions (or 'None')"
                  {...register("medicalConditions")}
                />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Input 
                  id="medications"
                  className="form-input"
                  placeholder="List current medications (or 'None')"
                  {...register("medications")}
                />
              </div>

              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input 
                  id="allergies"
                  className="form-input"
                  placeholder="List any allergies (or 'None')"
                  {...register("allergies")}
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-camp-navy mb-6">Review & Submit</h2>
              
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Registration Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Please review your information before submitting. You'll receive a confirmation email after registration.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms"
                  {...register("agreedToTerms", { required: "You must agree to the terms" })}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and give permission for my child (if under 18) to participate in YC2025 *
                </Label>
              </div>
              {errors.agreedToTerms && <p className="text-destructive text-sm">{errors.agreedToTerms.message}</p>}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button 
              type="button"
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button 
                type="button"
                variant="camp" 
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                variant="hero"
                className="flex items-center gap-2"
              >
                Submit Registration
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;