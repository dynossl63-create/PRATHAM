"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, TrendingUp, Shield, Users, Search, Filter, Download, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { NationalOverview } from "@/components/national-overview"
import { RegionalMap } from "@/components/regional-map"
import { TrendAnalytics } from "@/components/trend-analytics"
import { FraudDetection } from "@/components/fraud-detection"
import { PolicyImpact } from "@/components/policy-impact"
import { IncidentFeed } from "@/components/incident-feed"
import { HelpTooltip } from "@/components/help-tooltip"
import { FeatureExplanation } from "@/components/feature-explanation"
import { AnimationWrapper, StaggerContainer } from "@/components/animation-wrapper"
import { motion, AnimatePresence } from "framer-motion"

export function GovernmentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRegion, setSelectedRegion] = useState("national")

  const handlePolicyAlerts = () => {
    toast.warning("🚨 Policy Alerts - Prototype Feature", {
      description: "This is only a prototype of the actual website. In the full version, this would show critical policy alerts including: fraud detection warnings, compliance violations, significant demographic trend changes, budget anomalies, and urgent recommendations requiring immediate government attention with detailed analytics and action items."
    })
  }

  const handleExportReport = () => {
    toast.info("🚧 Export Report - Prototype Feature", {
      description: "This is only a prototype of the actual website. In the full version, this would generate and download comprehensive government analytics reports in PDF format including: national education statistics, regional performance comparisons, fraud detection summaries, policy impact assessments, budget analysis, and strategic recommendations for educational policy improvements."
    })
  }

  const tabs = [
    { id: "overview", label: "National Overview", icon: MapPin },
    { id: "trends", label: "Trends & Analytics", icon: TrendingUp },
    { id: "security", label: "Fraud Detection", icon: Shield },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
      case "trends":
        return <TrendAnalytics />
      case "security":
        return <FraudDetection />
      default:
        return <OverviewTab selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
    }
  }

  return (
    <div className="space-y-6">
      <AnimationWrapper animation="fadeIn" delay={0.1}>
        <FeatureExplanation
          title="Government Analytics Portal"
          description="National-level insights and policy tools for monitoring educational achievements, institutional performance, and systemic improvements."
          benefits={[
            "Monitor national education achievement trends",
            "Detect fraudulent certificates and maintain data integrity",
            "Track equity and inclusion across demographics",
            "Assess policy impact on educational outcomes",
            "Generate comprehensive reports for decision-making",
          ]}
          howItWorks={[
            "Aggregates data from all participating institutions",
            "AI algorithms detect anomalies and fraud patterns",
            "Real-time dashboards show national and regional metrics",
            "Policy impact assessment through before/after analysis",
            "Automated alerts for significant trend changes",
          ]}
          category="government"
        />
      </AnimationWrapper>

      {/* Header with Search and Export */}
      <AnimationWrapper animation="slideUp" delay={0.2}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regions, universities, policies..."
                className="pl-10 w-80 bg-background/50 border-border/50 transition-all duration-200 focus:scale-105"
              />
              <HelpTooltip
                content="Search across all regions, institutions, policies, and national metrics. Advanced filters available for detailed analysis."
                title="National Search"
              />
            </motion.div>
          </div>

          <StaggerContainer className="flex gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportReport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <HelpTooltip
                content="Generate comprehensive PDF reports with current analytics, trends, and policy recommendations."
                title="Export Reports"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                onClick={handlePolicyAlerts}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                </motion.div>
                Policy Alerts
              </Button>
              <HelpTooltip
                content="Critical alerts requiring immediate attention: fraud detection, compliance issues, and significant trend changes."
                title="Policy Alerts"
              />
            </motion.div>
          </StaggerContainer>
        </div>
      </AnimationWrapper>

      {/* Navigation Tabs */}
      <AnimationWrapper animation="slideUp" delay={0.3}>
        <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 transition-all duration-200"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </AnimationWrapper>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface OverviewTabProps {
  selectedRegion: string
  setSelectedRegion: (region: string) => void
}

function OverviewTab({ selectedRegion, setSelectedRegion }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* National Overview */}
      <AnimationWrapper animation="slideUp" delay={0.1} hover>
        <NationalOverview />
      </AnimationWrapper>

      {/* Two Column Layout */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Map */}
        <AnimationWrapper animation="slideLeft" delay={0.2} className="lg:col-span-2" hover>
          <RegionalMap selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
        </AnimationWrapper>

        {/* Policy Impact & Incident Feed */}
        <div className="space-y-6">
          <AnimationWrapper animation="slideRight" delay={0.3} hover>
            <PolicyImpact />
          </AnimationWrapper>
          <AnimationWrapper animation="slideRight" delay={0.4} hover>
            <IncidentFeed />
          </AnimationWrapper>
        </div>
      </StaggerContainer>
    </div>
  )
}
