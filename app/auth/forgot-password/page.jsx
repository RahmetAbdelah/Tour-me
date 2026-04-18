"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sanitizeEmail, validateEmail } from "@/lib/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const sanitizedEmail = sanitizeEmail(email)

    if (!validateEmail(sanitizedEmail)) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setEmail(sanitizedEmail)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a password reset link to {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              If you don&apos;t see the email in your inbox, check your spam folder.
            </p>
            <Link href="/auth/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password.
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
                onChange={(e) => setEmail(e.target.value.trim())}
                aria-invalid={Boolean(error)}
                aria-describedby="forgot-error"
                required
              />
              {error ? (
                <p id="forgot-error" className="text-sm text-red-600">
                  {error}
                </p>
              ) : null}
            </div>

            <Button type="submit">Send reset link</Button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Remember your password?{' '}
            <Link href="/auth/login" className="font-medium text-slate-950 hover:text-slate-700">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}