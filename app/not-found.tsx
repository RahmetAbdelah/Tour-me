import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-slate-400">404</CardTitle>
          <CardDescription className="text-xl">
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <p className="text-slate-600">
            It seems like you
            &apos
            ve wandered off the beaten path. Don't worry, let's get you back to exploring amazing destinations!
          </p>

          <div className="flex gap-4 justify-center">
            <Button >
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}