"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, Lightbulb, Target, Award, BarChart3 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  target?: string
}

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const { user } = useAuth()

  const studentSteps: TourStep[] = [
    {
      id: "welcome",
      title: "Welcome to PRATHAM!", // Updated from AchieveHub to PRATHAM
      description:
        "Your comprehensive platform for tracking academic achievements, building your professional profile, and discovering new opportunities.",
      icon: Lightbulb,
    },
    {
      id: "achievement-score",
      title: "Achievement Score",
      description:
        "Your dynamic score that grows with every workshop, competition, certificate, and milestone you complete. Hover over elements to see how points are earned.",
      icon: Target,
    },
    {
      id: "certificates",
      title: "Digital Certificates",
      description:
        "All your earned certificates are stored here with blockchain verification. Drag and drop to organize them, and share directly with employers.",
      icon: Award,
    },
    {
      id: "analytics",
      title: "Growth Analytics",
      description:
        "Track your progress over time, see skill development trends, and compare your growth with department averages.",
      icon: BarChart3,
    },
  ]

  const adminSteps: TourStep[] = [
    {
      id: "welcome",
      title: "University Admin Dashboard",
      description:
        "Comprehensive tools for managing student achievements, events, certificates, and compliance requirements.",
      icon: Lightbulb,
    },
    {
      id: "insights",
      title: "University Insights",
      description:
        "Real-time analytics showing student engagement, achievement trends, and institutional performance metrics.",
      icon: BarChart3,
    },
    {
      id: "compliance",
      title: "Compliance Tracking",
      description:
        "Monitor NAAC, NIRF, and other accreditation requirements with automated compliance scoring and alerts.",
      icon: Target,
    },
    {
      id: "certificates",
      title: "Certificate Management",
      description:
        "Generate, verify, and manage digital certificates with blockchain security and automated distribution.",
      icon: Award,
    },
  ]

  const governmentSteps: TourStep[] = [
    {
      id: "welcome",
      title: "Government Analytics Portal",
      description:
        "National-level insights into educational achievements, policy impact assessment, and institutional performance monitoring.",
      icon: Lightbulb,
    },
    {
      id: "national-overview",
      title: "National Overview",
      description:
        "High-level metrics showing total students, achievements, and educational outcomes across all institutions.",
      icon: BarChart3,
    },
    {
      id: "fraud-detection",
      title: "Fraud Detection",
      description:
        "AI-powered system to identify suspicious certificate patterns, duplicate achievements, and maintain data integrity.",
      icon: Target,
    },
    {
      id: "equity-metrics",
      title: "Equity & Inclusion",
      description:
        "Track educational equity across demographics, regions, and institutions to inform policy decisions.",
      icon: Award,
    },
  ]

  const getStepsForRole = () => {
    switch (user?.role) {
      case "admin":
        return adminSteps
      case "government":
        return governmentSteps
      default:
        return studentSteps
    }
  }

  const steps = getStepsForRole()

  useEffect(() => {
    // Show tour for first-time visitors
    const hasSeenTour = localStorage.getItem(`pratham-tour-${user?.role}`) // Updated localStorage key to pratham
    if (!hasSeenTour && user) {
      setIsOpen(true)
    }
  }, [user])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(`pratham-tour-${user?.role}`, "true") // Updated localStorage key to pratham
  }

  const handleSkip = () => {
    handleClose()
  }

  if (!isOpen || !user) return null

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="glass neon-glow max-w-md w-full">
        <CardHeader className="relative">
          <Button variant="ghost" size="sm" onClick={handleClose} className="absolute right-2 top-2 h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">{currentStepData.description}</p>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentStep === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button size="sm" onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
