import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  corpsName: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianEmail?: string;
  guardianPhone?: string;
  guardianRelationship?: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  photoVideoConsent: string;
  agreedToTerms: boolean;
}

const CSS = `
  :root {
    --cream: #F5EDD6; --red: #C8001A; --rdk: #7A0010;
    --gold: #F5B800; --ink: #0D0905;
    --disp: 'Bebas Neue', Impact, 'Arial Black', sans-serif;
    --body: 'Libre Baskerville', Georgia, serif;
    --mono: 'Courier New', monospace;
  }
  .yr-grain {
    position: fixed; inset: 0; z-index: 9997; pointer-events: none;
    background-image: radial-gradient(circle, rgba(0,0,0,.05) 1px, transparent 1px);
    background-size: 3px 3px;
  }
  .yr-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(245,237,214,.97);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 2px solid var(--red);
    padding: 10px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .yr-form-wrap { max-width: 580px; margin: 0 auto; padding: 0 20px 60px; }
  .yr-progress { margin-bottom: 24px; }
  .yr-steps-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .yr-step-dot { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .yr-step-circle {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--disp); font-size: 13px; letter-spacing: 0; flex-shrink: 0;
  }
  .yr-step-circle.active  { background: var(--red);  color: white; }
  .yr-step-circle.done    { background: var(--gold); color: var(--ink); }
  .yr-step-circle.inactive { background: rgba(13,9,5,.1); color: rgba(13,9,5,.35); }
  .yr-step-lbl {
    font-family: var(--mono); font-size: 7px; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(13,9,5,.38); text-align: center;
  }
  .yr-pbar { height: 3px; background: rgba(13,9,5,.1); border-radius: 2px; }
  .yr-pfill { height: 3px; background: var(--red); border-radius: 2px; transition: width .5s ease; }

  .yr-card {
    background: rgba(255,255,255,.55);
    border: 1px solid rgba(13,9,5,.1);
    border-left: 4px solid var(--red);
    padding: clamp(20px,4vw,32px) clamp(16px,4vw,28px);
  }
  .yr-card-head {
    font-family: var(--disp); font-size: clamp(24px,4vw,38px);
    color: var(--ink); letter-spacing: .03em; margin: 0 0 2px; line-height: 1;
  }
  .yr-card-sub {
    font-family: var(--mono); font-size: 9px; letter-spacing: 3px;
    color: var(--red); text-transform: uppercase; margin: 0 0 22px;
  }
  .yr-label {
    display: block; font-family: var(--mono); font-size: 9px;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(13,9,5,.5); margin-bottom: 5px;
  }
  .yr-input {
    display: block; width: 100%;
    background: rgba(255,255,255,.8);
    border: 1.5px solid rgba(13,9,5,.18);
    padding: 10px 12px;
    font-family: var(--body); font-size: 14px; color: var(--ink);
    outline: none; transition: border-color .2s, background .2s;
    border-radius: 0; -webkit-appearance: none; appearance: none;
    box-sizing: border-box;
  }
  .yr-input:focus { border-color: var(--red); background: white; }
  .yr-input.error { border-color: var(--red); background: rgba(200,0,26,.04); }
  select.yr-input {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C8001A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
    padding-right: 36px; cursor: pointer;
  }
  .yr-error {
    font-family: var(--mono); font-size: 9px; color: var(--red);
    margin-top: 4px; letter-spacing: 1px;
  }
  .yr-field { margin-top: 14px; }
  .yr-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; }
  @media (max-width: 480px) { .yr-row { grid-template-columns: 1fr; } }
  .yr-nav-btns {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 24px; padding-top: 20px;
    border-top: 1px solid rgba(13,9,5,.1);
  }
  .yr-btn {
    position: relative; overflow: hidden; cursor: pointer; border: none;
    font-family: var(--disp); letter-spacing: .12em; text-transform: uppercase;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .yr-btn::before {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(0,0,0,.18);
    transform: translate(-50%,-50%) scale(0);
    transition: transform .65s cubic-bezier(.16,1,.3,1);
  }
  .yr-btn:hover::before { transform: translate(-50%,-50%) scale(32); }
  .yr-btn-red {
    background: var(--red); color: white;
    padding: 12px 28px; font-size: 15px;
    box-shadow: 4px 4px 0 var(--rdk);
  }
  .yr-btn-red:hover { box-shadow: 2px 2px 0 var(--rdk); }
  .yr-btn-red:disabled { opacity: .5; cursor: not-allowed; }
  .yr-btn-ghost {
    background: transparent; color: rgba(13,9,5,.45);
    border: 1.5px solid rgba(13,9,5,.18);
    padding: 10px 20px; font-size: 14px;
  }
  .yr-btn-ghost:disabled { opacity: .25; cursor: not-allowed; }
  .yr-radio-wrap { display: flex; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer; }
  .yr-radio-lbl { font-family: var(--body); font-size: 14px; color: var(--ink); }
  .yr-check-wrap { display: flex; align-items: flex-start; gap: 10px; }
  .yr-review-box {
    background: rgba(13,9,5,.05);
    border-left: 3px solid var(--gold);
    padding: 16px 18px; margin-bottom: 12px;
  }
  .yr-gold-box {
    background: rgba(245,184,0,.1);
    border-left: 3px solid var(--gold);
    padding: 14px 18px;
  }
`;

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<FormData>();

  const totalSteps = 6;
  const stepLabels = ["Personal", "Guardian", "Emergency", "Medical", "Consent", "Review"];
  const dateOfBirth = watch("dateOfBirth");

  const checkAge = (dob: string) => {
    if (!dob) return false;
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) return age - 1 < 18;
    return age < 18;
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep !== totalSteps) return;
    data.medicalConditions = data.medicalConditions?.trim() || "None";
    data.medications = data.medications?.trim() || "None";
    data.allergies = data.allergies?.trim() || "None";
    setIsSubmitting(true);
    try {
      const response = await fetch("https://yconnectionregistration-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to register");
      toast({ title: "Registration Successful!" });
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
      toast({ title: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const formData = watch();
    let isValid = true;
    const newFieldErrors: Record<string, boolean> = {};
    let fieldsToValidate: Array<keyof FormData> = [];

    if (currentStep === 1) fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'corpsName'];
    else if (currentStep === 2 && isUnder18) fieldsToValidate = ['guardianFirstName', 'guardianLastName', 'guardianEmail', 'guardianPhone', 'guardianRelationship'];
    else if (currentStep === 3) fieldsToValidate = ['emergencyName', 'emergencyPhone', 'emergencyRelationship'];
    else if (currentStep === 5) fieldsToValidate = ['photoVideoConsent', 'agreedToTerms'];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (!isStepValid) {
      toast({ title: "Please fix the errors", description: "Ensure all required fields are correctly filled.", variant: "destructive" });
      return;
    }

    if (currentStep === 1) {
      ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'corpsName'].forEach(f => {
        if (!formData[f as keyof FormData]) { newFieldErrors[f] = true; isValid = false; }
      });
      if (isValid && dateOfBirth) {
        const under18 = checkAge(dateOfBirth);
        setIsUnder18(under18);
        if (!under18) {
          setValue("guardianFirstName", "n/a"); setValue("guardianLastName", "n/a");
          setValue("guardianEmail", "n/a"); setValue("guardianPhone", "n/a");
          setValue("guardianRelationship", "n/a");
        }
      }
    }
    if (currentStep === 2 && isUnder18) {
      ['guardianFirstName', 'guardianLastName', 'guardianEmail', 'guardianPhone', 'guardianRelationship'].forEach(f => {
        if (!formData[f as keyof FormData]) { newFieldErrors[f] = true; isValid = false; }
      });
    }
    if (currentStep === 3) {
      ['emergencyName', 'emergencyPhone', 'emergencyRelationship'].forEach(f => {
        if (!formData[f as keyof FormData]) { newFieldErrors[f] = true; isValid = false; }
      });
    }
    if (currentStep === 5) {
      if (!formData.photoVideoConsent) { newFieldErrors.photoVideoConsent = true; isValid = false; }
      if (!formData.agreedToTerms) { newFieldErrors.agreedToTerms = true; isValid = false; }
    }
    if (currentStep === 6 && !formData.agreedToTerms) { newFieldErrors.agreedToTerms = true; isValid = false; }

    setFieldErrors(newFieldErrors);
    if (!isValid) {
      toast({ title: "Please fill all required fields", description: "Complete all mandatory fields before proceeding.", variant: "destructive" });
      return;
    }

    setFieldErrors({});
    if (currentStep === 1 && !checkAge(dateOfBirth)) setCurrentStep(3);
    else if (currentStep === 2 && !isUnder18) setCurrentStep(3);
    else setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const prevStep = () => {
    if (currentStep === 3 && !isUnder18) setCurrentStep(1);
    else setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const progressPct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ background: "var(--cream,#F5EDD6)", minHeight: "100vh" }}>
      <style>{CSS}</style>
      <div className="yr-grain" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className="yr-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 26 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 15 }} />
        </div>
        <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: "rgba(255,255,255,.55)", fontSize: 14, letterSpacing: ".2em" }}>
          REGISTRATION
        </span>
        <button onClick={() => navigate("/")}
          style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,.32)", fontSize: 10, letterSpacing: ".12em", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>
          ← Home
        </button>
      </nav>

      <div className="yr-form-wrap">
        {/* Y-CON logo header */}
        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <img src="/assets/ycon-logo.png" alt="Y-CON 2026"
            style={{ width: "clamp(140px,36vw,240px)", mixBlendMode: "multiply" }} />
        </div>

        {/* ── PROGRESS ── */}
        <div className="yr-progress">
          <div className="yr-steps-row">
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const cls = n === currentStep ? "active" : n < currentStep ? "done" : "inactive";
              return (
                <div key={n} className="yr-step-dot">
                  <div className={`yr-step-circle ${cls}`}>
                    {n < currentStep ? "✓" : n}
                  </div>
                  <span className="yr-step-lbl">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="yr-pbar">
            <div className="yr-pfill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* ── FORM CARD ── */}
        <form>
          <div className="yr-card">

            {/* STEP 1 — Personal */}
            {currentStep === 1 && (
              <div>
                <h2 className="yr-card-head">Personal Information</h2>
                <p className="yr-card-sub">// Step 1 of {totalSteps}</p>

                <div className="yr-row" style={{ marginTop: 0 }}>
                  <div>
                    <label className="yr-label">First Name *</label>
                    <input className={`yr-input${fieldErrors.firstName ? " error" : ""}`}
                      {...register("firstName", { required: "First name is required" })} />
                    {errors.firstName && <p className="yr-error">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="yr-label">Last Name *</label>
                    <input className={`yr-input${fieldErrors.lastName ? " error" : ""}`}
                      {...register("lastName", { required: "Last name is required" })} />
                    {errors.lastName && <p className="yr-error">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="yr-field">
                  <label className="yr-label">Email Address *</label>
                  <input type="email" className={`yr-input${fieldErrors.email ? " error" : ""}`}
                    {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })} />
                  {errors.email && <p className="yr-error">{errors.email.message}</p>}
                </div>

                <div className="yr-field">
                  <label className="yr-label">Phone Number *</label>
                  <input type="tel" className={`yr-input${fieldErrors.phone ? " error" : ""}`}
                    {...register("phone", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Must be exactly 10 digits" } })} />
                  {errors.phone && <p className="yr-error">{errors.phone.message}</p>}
                </div>

                <div className="yr-row">
                  <div>
                    <label className="yr-label">Date of Birth *</label>
                    <input type="date" className={`yr-input${fieldErrors.dateOfBirth ? " error" : ""}`}
                      {...register("dateOfBirth", { required: "Date of birth is required" })} />
                    {errors.dateOfBirth && <p className="yr-error">{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="yr-label">Gender *</label>
                    <select className={`yr-input${fieldErrors.gender ? " error" : ""}`}
                      {...register("gender", { required: "Gender is required" })}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="yr-error">{errors.gender.message}</p>}
                  </div>
                </div>

                <div className="yr-field">
                  <label className="yr-label">Corps / Church Name *</label>
                  <input className={`yr-input${fieldErrors.corpsName ? " error" : ""}`}
                    {...register("corpsName", { required: "Corps name is required" })} />
                  {errors.corpsName && <p className="yr-error">{errors.corpsName.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 2 — Guardian */}
            {currentStep === 2 && isUnder18 && (
              <div>
                <h2 className="yr-card-head">Guardian Information</h2>
                <p className="yr-card-sub">// Under 18 — guardian details required</p>

                <div className="yr-row" style={{ marginTop: 0 }}>
                  <div>
                    <label className="yr-label">Guardian First Name *</label>
                    <input className={`yr-input${fieldErrors.guardianFirstName ? " error" : ""}`}
                      {...register("guardianFirstName", { required: isUnder18 ? "Required" : false })} />
                  </div>
                  <div>
                    <label className="yr-label">Guardian Last Name *</label>
                    <input className={`yr-input${fieldErrors.guardianLastName ? " error" : ""}`}
                      {...register("guardianLastName", { required: isUnder18 ? "Required" : false })} />
                  </div>
                </div>

                <div className="yr-field">
                  <label className="yr-label">Guardian Email *</label>
                  <input type="email" className={`yr-input${fieldErrors.guardianEmail ? " error" : ""}`}
                    {...register("guardianEmail", { required: isUnder18 ? "Required" : false, pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })} />
                  {errors.guardianEmail && <p className="yr-error">{errors.guardianEmail.message}</p>}
                </div>

                <div className="yr-row">
                  <div>
                    <label className="yr-label">Guardian Phone *</label>
                    <input type="tel" className={`yr-input${fieldErrors.guardianPhone ? " error" : ""}`}
                      {...register("guardianPhone", { required: isUnder18 ? "Required" : false, pattern: { value: /^\d{10}$/, message: "10 digits" } })} />
                    {errors.guardianPhone && <p className="yr-error">{errors.guardianPhone.message}</p>}
                  </div>
                  <div>
                    <label className="yr-label">Relationship *</label>
                    <select className={`yr-input${fieldErrors.guardianRelationship ? " error" : ""}`}
                      {...register("guardianRelationship", { required: isUnder18 ? "Required" : false })}>
                      <option value="">Select relationship</option>
                      <option value="parent">Parent</option>
                      <option value="guardian">Legal Guardian</option>
                      <option value="grandparent">Grandparent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Emergency Contact */}
            {currentStep === 3 && (
              <div>
                <h2 className="yr-card-head">Emergency Contact</h2>
                <p className="yr-card-sub">// Step 3 of {totalSteps}</p>

                <div>
                  <label className="yr-label">Contact Name *</label>
                  <input className={`yr-input${fieldErrors.emergencyName ? " error" : ""}`}
                    {...register("emergencyName", { required: "Emergency contact name is required" })} />
                </div>

                <div className="yr-row">
                  <div>
                    <label className="yr-label">Phone *</label>
                    <input type="tel" className={`yr-input${fieldErrors.emergencyPhone ? " error" : ""}`}
                      {...register("emergencyPhone", { required: "Phone is required", pattern: { value: /^\d{10}$/, message: "Must be 10 digits" } })} />
                    {errors.emergencyPhone && <p className="yr-error">{errors.emergencyPhone.message}</p>}
                  </div>
                  <div>
                    <label className="yr-label">Relationship *</label>
                    <input className={`yr-input${fieldErrors.emergencyRelationship ? " error" : ""}`}
                      {...register("emergencyRelationship", { required: "Relationship is required" })} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Medical */}
            {currentStep === 4 && (
              <div>
                <h2 className="yr-card-head">Medical Information</h2>
                <p className="yr-card-sub">// Step 4 of {totalSteps} — optional</p>

                <div>
                  <label className="yr-label">Medical Conditions</label>
                  <input className="yr-input" placeholder="None" {...register("medicalConditions")} />
                </div>
                <div className="yr-field">
                  <label className="yr-label">Current Medications</label>
                  <input className="yr-input" placeholder="None" {...register("medications")} />
                </div>
                <div className="yr-field">
                  <label className="yr-label">Allergies</label>
                  <input className="yr-input" placeholder="None" {...register("allergies")} />
                </div>
              </div>
            )}

            {/* STEP 5 — Consent */}
            {currentStep === 5 && (
              <div>
                <h2 className="yr-card-head">Consent & Permissions</h2>
                <p className="yr-card-sub">// Step 5 of {totalSteps}</p>

                <div>
                  <label className="yr-label">Photo / Video Consent *</label>
                  <p style={{ fontFamily: "var(--body,'Libre Baskerville',Georgia,serif)", fontSize: 13, color: "rgba(13,9,5,.65)", margin: "8px 0 10px", lineHeight: 1.6 }}>
                    Do you give permission for photos/videos of you to be used for promotional purposes?
                  </p>
                  <div className="yr-radio-wrap">
                    <input type="radio" value="yes" style={{ accentColor: "#C8001A", width: 16, height: 16 }}
                      {...register("photoVideoConsent", { required: "Please select an option" })} />
                    <span className="yr-radio-lbl">Yes</span>
                  </div>
                  <div className="yr-radio-wrap">
                    <input type="radio" value="no" style={{ accentColor: "#C8001A", width: 16, height: 16 }}
                      {...register("photoVideoConsent", { required: "Please select an option" })} />
                    <span className="yr-radio-lbl">No</span>
                  </div>
                  {fieldErrors.photoVideoConsent && <p className="yr-error">Please select an option</p>}
                </div>

                <div className="yr-check-wrap" style={{ marginTop: 20 }}>
                  <input type="checkbox" style={{ width: 16, height: 16, accentColor: "#C8001A", marginTop: 2, flexShrink: 0, cursor: "pointer" }}
                    {...register("agreedToTerms", { required: "You must confirm this to proceed" })} />
                  <label style={{ fontFamily: "var(--body,'Libre Baskerville',Georgia,serif)", fontSize: 13, color: "rgba(13,9,5,.8)", lineHeight: 1.55, cursor: "pointer" }}>
                    I confirm that the above information is true and I agree to abide by the camp rules and guidelines *
                  </label>
                </div>
                {fieldErrors.agreedToTerms && <p className="yr-error">You must confirm this to proceed</p>}
              </div>
            )}

            {/* STEP 6 — Review */}
            {currentStep === 6 && (
              <div>
                <h2 className="yr-card-head">Review & Submit</h2>
                <p className="yr-card-sub">// Final step</p>

                <div className="yr-review-box">
                  <p style={{ fontFamily: "var(--disp,'Bebas Neue',Impact,sans-serif)", fontSize: 18, color: "#0D0905", letterSpacing: ".03em", margin: "0 0 6px" }}>Registration Summary</p>
                  <p style={{ fontFamily: "var(--body,'Libre Baskerville',Georgia,serif)", fontSize: 13, color: "rgba(13,9,5,.55)", margin: 0, lineHeight: 1.6 }}>
                    Please review your information before submitting. You'll receive a confirmation email after registration.
                  </p>
                </div>

                <div className="yr-gold-box" style={{ marginTop: 12 }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.55)", margin: 0, letterSpacing: "1.5px", lineHeight: 1.7, textTransform: "uppercase" }}>
                    By submitting, you confirm that all information provided is accurate and complete.
                  </p>
                </div>

                {/* Quick summary */}
                <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { lbl: "DATE",  val: "3–5 July 2026"     },
                    { lbl: "VENUE", val: "Mighty Apies"       },
                    { lbl: "FEE",   val: "R550 per person"    },
                  ].map(({ lbl, val }) => (
                    <div key={lbl} style={{ flex: 1, minWidth: 100, background: "#C8001A", padding: "10px 14px" }}>
                      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 7, letterSpacing: "3px", color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 3 }}>{lbl}</div>
                      <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 16, color: "white", letterSpacing: ".04em" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── NAV BUTTONS ── */}
            <div className="yr-nav-btns">
              <button type="button" className="yr-btn yr-btn-ghost" onClick={prevStep} disabled={currentStep === 1}>
                ← Back
              </button>
              {currentStep < totalSteps ? (
                <button type="button" className="yr-btn yr-btn-red" onClick={nextStep}>
                  Next →
                </button>
              ) : (
                <button type="button" className="yr-btn yr-btn-red" onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting} style={{ minWidth: 180 }}>
                  {isSubmitting ? "Submitting…" : "Submit Registration"}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, borderTop: "1px solid rgba(13,9,5,.08)", paddingTop: 16 }}>
          <p style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "rgba(13,9,5,.28)", letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>
            © 2026 The Salvation Army · Central Division · Y‑CON 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
