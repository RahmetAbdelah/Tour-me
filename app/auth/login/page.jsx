"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { sanitizeEmail, sanitizeText, validateEmail, validatePassword } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })

  const handleSubmit = async (event) => {
  event.preventDefault();

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = password.trim();

  const validationErrors = {
    email: "",
    password: "",
  };

  if (!validateEmail(sanitizedEmail)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  if (!validatePassword(sanitizedPassword)) {
    validationErrors.password =
      "Password must be at least 8 characters and include a number.";
  }

  if (validationErrors.email || validationErrors.password) {
    setErrors(validationErrors);
    return;
  }

  setErrors({ email: "", password: "" });

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // IMPORTANT for cookies later
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // ✅ SUCCESS
    const destination =
      role === "admin" ? "/admin/dashboard" : "/dashboard";

    router.push(destination);

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};
  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth integration securely
    alert("Google sign-in will be implemented soon!")
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="text-2xl font-bold tracking-tight text-gray-900 flex justify-center items-center gap-1 mb-4">
            <span className="text-orange-500 underline decoration-2 underline-offset-4">Voyage</span>.
          </div>
          <CardTitle>{role === "admin" ? "Admin Login" : "Welcome back"}</CardTitle>
          <CardDescription>
            {role === "admin"
              ? "Sign in with your admin credentials to continue."
              : "Sign in with your email and password to continue."}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(sanitizeEmail(event.target.value))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
                required
              />
              {errors.email ? (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(sanitizeText(event.target.value))}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-error"
                required
              />
              {errors.password ? (
                <p id="password-error" className="text-sm text-red-600">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-slate-600 hover:text-slate-950"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">Sign in</Button>
             <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>
            <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
            Continue with Google
          </Button>

         

          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-slate-600">
              New to TourMe?{' '}
              <Link href="/auth/signup" className="font-medium text-slate-950 hover:text-slate-700">
                Create an account
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setRole(role === "admin" ? "user" : "admin")}
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              {role === "admin" ? "Switch to User Login" : "Switch to Admin Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
