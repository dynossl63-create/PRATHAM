"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { GovernmentDashboard } from "@/components/dashboards/government-dashboard"
import { OnboardingTour } from "@/components/onboarding-tour"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="p-3 rounded-xl bg-primary neon-glow w-fit mx-auto mb-4 animate-pulse">
            <div className="h-8 w-8 bg-white/20 rounded" />
          </div>
          <p className="text-muted-foreground">Loading PRATHAM...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "student":
        return <StudentDashboard />
      case "admin":
        return <AdminDashboard />
      case "government":
        return <GovernmentDashboard />
      default:
        return <StudentDashboard />
    }
  }

  return (
    <>
      <DashboardLayout>{renderDashboard()}</DashboardLayout>
      <OnboardingTour />
    </>
  )
}
