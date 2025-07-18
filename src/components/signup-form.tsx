import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type SignUpProps = React.ComponentProps<"div">;

export const SignUp: React.FC<SignUpProps> = ({ className, ...props }) => {
  /* ---------------- local state ---------------- */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ---------------- handlers ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_AUTH_BASE_URL}/auth/register`,
        {
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );
      setSuccess(true);
      const redirectParam = searchParams.get('redirect');

      let loginPath = "/login?message=signup_success";

      if (redirectParam) {
        loginPath += `&redirect=${encodeURIComponent(redirectParam)}`;
      }
      
      navigate(loginPath);

    } catch (err) {
      if (isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || "Registration failed. Try again.");
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  

  return (
    <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to sign up.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* name + username row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* error */}
            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
            {success && (
              <p className="text-sm text-green-600">
                Registration successful! You can now log in.
              </p>
            )}

            {/* actions */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            <div className="mt-2 text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-medium underline">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
