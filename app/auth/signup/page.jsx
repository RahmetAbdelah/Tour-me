"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import {
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
  validateEmail,
  validateLocation,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/auth"

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [birthdate, setBirthdate]=useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (event) => {
  event.preventDefault();

  const sanitizedFirstName = sanitizeText(firstName);
  const sanitizedLastName = sanitizeText(lastName);
  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPhone = sanitizePhone(phone);
  const sanitizedLocation = sanitizeText(location);
  const sanitizedBirthdate = birthdate; 
  const sanitizedPassword = password.trim();
  const sanitizedConfirmPassword = confirmPassword.trim();

  const validationErrors = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  };

  if (!validateName(sanitizedFirstName)) {
    validationErrors.firstName = "Please enter a valid first name.";
  }

  if (!validateName(sanitizedLastName)) {
    validationErrors.lastName = "Please enter a valid last name.";
  }

  if (!validateEmail(sanitizedEmail)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  if (!validatePhone(sanitizedPhone)) {
    validationErrors.phone = "Please enter a valid phone number.";
  }

  if (!validateLocation(sanitizedLocation)) {
    validationErrors.location = "Please enter a valid location.";
  }
  if (!sanitizedBirthdate) {
    validationErrors.birthdate = "Please enter your birthdate.";
  } else {
    const age=new Date().getFullYear() - new Date(sanitizedBirthdate).getFullYear();
    if (age < 15) {
      validationErrors.birthdate = "You must be at least 15 years old.";
    }
  }


  if (!validatePassword(sanitizedPassword)) {
    validationErrors.password =
      "Password must be at least 8 characters and include a number.";
  }

  if (sanitizedPassword !== sanitizedConfirmPassword) {
    validationErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.values(validationErrors).some(Boolean)) {
    setErrors(validationErrors);
    return;
  }

  setErrors({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        location: sanitizedLocation,
        birthdate: sanitizedBirthdate,
        password: sanitizedPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
    toast.success("Account created successfully!");
    setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    router.push("/auth/login");
    }
   else {
      
      const errorMessage = data.errors 
        ? data.errors[0].message 
        : (data.error || "Validation Failed");
        
      toast.error(errorMessage);
      console.log("Validation Details:", data.errors); // Look at your console!
    }
  } 
  catch (error) {
    
    toast.error("Something went wrong");
  }
};

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your TourMe account</CardTitle>
          <CardDescription>
            Enter your details below to register a new account.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(event) => setFirstName(sanitizeText(event.target.value))}
                placeholder="John"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby="firstName-error"
                required
              />
              {errors.firstName ? (
                <p id="firstName-error" className="text-sm text-red-600">
                  {errors.firstName}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(sanitizeText(event.target.value))}
                placeholder="Doe"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby="lastName-error"
                required
              />
              {errors.lastName ? (
                <p id="lastName-error" className="text-sm text-red-600">
                  {errors.lastName}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(sanitizeEmail(event.target.value))}
                placeholder="you@example.com"
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
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(sanitizePhone(event.target.value))}
                placeholder="+1234567890"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby="phone-error"
                required
              />
              {errors.phone ? (
                <p id="phone-error" className="text-sm text-red-600">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={location}
                onChange={(event) => setLocation(sanitizeText(event.target.value))}
                placeholder="Your city or country"
                aria-invalid={Boolean(errors.location)}
                aria-describedby="location-error"
                required
              />
              {errors.location ? (
                <p id="location-error" className="text-sm text-red-600">
                  {errors.location}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
  <Label htmlFor="birthdate">Birthdate</Label>
  <Input
    id="birthdate"
    name="birthdate"
    type="date"
    value={birthdate}
    onChange={(e) => setBirthdate(e.target.value)}
    aria-invalid={Boolean(errors.birthdate)}
    aria-describedby="birthdate-error"
    required
  />
  {errors.birthdate ? (
    <p id="birthdate-error" className="text-sm text-red-600">
      {errors.birthdate}
    </p>
  ) : null}
</div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
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

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby="confirmPassword-error"
                required
              />
              {errors.confirmPassword ? (
                <p id="confirmPassword-error" className="text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <Button type="submit">Create account</Button>
          </form>
          <Toaster />

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-slate-950 hover:text-slate-700">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
