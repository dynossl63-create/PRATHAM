"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (!success) {
      setError("Invalid credentials. Please try again.")
    }
  }

  const demoAccounts = [
    { email: "student@university.edu", role: "Student", color: "bg-blue-500" },
    { email: "admin@university.edu", role: "University Admin", color: "bg-green-500" },
    { email: "gov@education.gov", role: "Government", color: "bg-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-40 h-40 mx-auto flex items-center justify-center">
            <img 
              src="/pratham.svg" 
              alt="PRATHAM Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-muted-foreground -mt-4">Platform for Recognition and Tracking of Holistic Academic Metrics</p>
        </div>

        {/* Login Form */}
        <Card className="glass neon-glow">
          <CardHeader>
            <CardTitle className="text-center">Sign In to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="bg-background/50 border-border/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full neon-glow" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-sm">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground mb-3">
              Use these demo accounts to explore different user roles:
            </p>
            {demoAccounts.map((account) => (
              <div
                key={account.email}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => {
                  setEmail(account.email)
                  setPassword("demo123")
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded ${account.color} neon-glow`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{account.role}</p>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Click to use
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-3">
              Password for all demo accounts: <code className="bg-muted px-1 rounded">demo123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
