"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type AuthStep = "login" | "signup" | "forgot-password" | "success";
type AuthMode = "login" | "signup";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
  { label: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "One number", test: (pwd) => /\d/.test(pwd) },
  {
    label: "One special character",
    test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
];

export default function AuthenticationCard() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("login");
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError(null);
    if (info) setInfo(null);
  };

  const getPasswordStrength = (password: string) => {
    const passedRequirements = passwordRequirements.filter((req) =>
      req.test(password)
    ).length;
    if (passedRequirements === 0) return { strength: 0, label: "", color: "" };
    if (passedRequirements <= 2)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (passedRequirements <= 3)
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (passedRequirements <= 4)
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setIsLoading(true);

    const supabaseClient = supabase;

    try {
      if (step === "login") {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        // On success, redirect to dashboard
        router.push("/dashboard");
      } else if (step === "signup") {
        const { data, error } = await supabaseClient.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
              `${window.location.origin}/dashboard`,
            data: {
              name: formData.name,
            },
          },
        });
        if (error) throw error;

        const user = data.user;

        await supabase.from("profiles").insert([
          {
            id: user?.id,
            name: formData.name,
          },
        ]);

        // Show success message
        setStep("success");
        setInfo("Check your email to confirm your account");
      } else if (step === "forgot-password") {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(
          formData.email,
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );
        if (error) throw error;

        setStep("success");
        setInfo("Password reset link sent to your email");
      }
    } catch (err: any) {
      setError(err.message ?? "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setStep(newMode);
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    setError(null);
    setInfo(null);
  };

  const resetToLogin = () => {
    setStep("login");
    setMode("login");
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    setError(null);
    setInfo(null);
  };

  const goToForgotPassword = () => {
    setStep("forgot-password");
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
      name: "",
    }));
    setError(null);
    setInfo(null);
  };

  const getCardHeight = () => {
    switch (step) {
      case "login":
        return "h-[520px]";
      case "signup":
        return "h-[680px]";
      case "forgot-password":
        return "h-[420px]";
      case "success":
        return "h-[360px]";
      default:
        return "h-[520px]";
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isSignupValid =
    step === "signup" &&
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    passwordRequirements.every((req) => req.test(formData.password));

  return (
    <div
      className={`w-[450px] max-w-[450px] transition-all duration-700 ease-out ${getCardHeight()}`}
    >
      <div className="relative h-full">
        {/* Glass morphism card */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/10 to-transparent rounded-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col">
          {step === "login" && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-white">
                  Welcome Back
                </h1>
                <p className="text-white/70">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={goToForgotPassword}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}
                {info && (
                  <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <p className="text-sm text-blue-200">{info}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 h-11 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => switchMode("signup")}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {"Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          )}

          {step === "signup" && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-white">
                  Create Account
                </h1>
                <p className="text-white/70">Join us today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">
                    Profile Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Enter your profile name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">
                          Password strength
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength.strength === 100
                              ? "text-white/90"
                              : passwordStrength.strength >= 75
                              ? "text-white/80"
                              : passwordStrength.strength >= 50
                              ? "text-white/70"
                              : "text-white/50"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <div className="space-y-1">
                        {passwordRequirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                req.test(formData.password)
                                  ? "bg-white/80"
                                  : "bg-white/20"
                              }`}
                            />
                            <span
                              className={`text-xs ${
                                req.test(formData.password)
                                  ? "text-white/80"
                                  : "text-white/40"
                              }`}
                            >
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-400">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}
                {info && (
                  <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <p className="text-sm text-blue-200">{info}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !isSignupValid}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 h-11 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => switchMode("login")}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          )}

          {step === "forgot-password" && (
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <button
                onClick={resetToLogin}
                className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-white">
                  Reset Password
                </h1>
                <p className="text-white/70">
                  Enter your email to receive reset instructions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="reset-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}
                {info && (
                  <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <p className="text-sm text-blue-200">{info}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 h-11 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="flex-1 flex flex-col justify-center items-center space-y-6">
              <button
                onClick={resetToLogin}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-white">
                  {mode === "signup" ? "Welcome!" : "Success!"}
                </h1>
                <p className="text-white/70">
                  {info ||
                    (mode === "signup"
                      ? "Check your email to verify your account"
                      : "Password reset link sent to your email")}
                </p>
              </div>

              <Button
                onClick={resetToLogin}
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 h-11 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm"
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
