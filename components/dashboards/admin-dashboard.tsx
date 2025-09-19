"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UniversityInsights } from "@/components/university-insights"
import { EventCalendar } from "@/components/event-calendar"
import { CertificateManagement } from "@/components/certificate-management"
import { ComplianceTracker } from "@/components/compliance-tracker"
import { StudentDatabase } from "@/components/student-database"
import { EngagementAnalytics } from "@/components/engagement-analytics"
import { QuickActions } from "@/components/quick-actions"
import { HelpTooltip } from "@/components/help-tooltip"
import { FeatureExplanation } from "@/components/feature-explanation"
import { Users, Calendar, Award, AlertTriangle, Search, Filter, Bell, BarChart3, FileText } from "lucide-react"
import { AnimationWrapper, StaggerContainer } from "@/components/animation-wrapper"
import { AnimatedProgress } from "@/components/animated-progress"
import { motion, AnimatePresence } from "framer-motion"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "students", label: "Students", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "compliance", label: "Compliance", icon: FileText },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "students":
        return <StudentDatabase searchQuery={searchQuery} />
      case "events":
        return <EventCalendar />
      case "compliance":
        return <ComplianceTracker />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="space-y-6">
      <AnimationWrapper animation="fadeIn" delay={0.1}>
        <FeatureExplanation
          title="University Administration Dashboard"
          description="Comprehensive management tools for overseeing student achievements, institutional compliance, and academic excellence initiatives."
          benefits={[
            "Monitor student engagement and achievement trends",
            "Automate certificate generation and verification",
            "Track compliance with accreditation standards",
            "Generate detailed institutional reports",
            "Manage events and academic programs efficiently",
          ]}
          howItWorks={[
            "Dashboard aggregates data from all student activities",
            "AI analyzes patterns to identify at-risk students",
            "Automated compliance scoring against NAAC/NIRF standards",
            "Real-time alerts for important institutional metrics",
            "One-click report generation for stakeholders",
          ]}
          category="admin"
        />
      </AnimationWrapper>

      {/* Header with Search and Quick Actions */}
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
                placeholder="Search students, events, certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-background/50 border-border/50 transition-all duration-200 focus:scale-105"
              />
              <HelpTooltip
                content="Search across all students, events, certificates, and compliance records. Use filters for advanced queries."
                title="Global Search"
              />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <QuickActions />
          </motion.div>
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

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* University Insights */}
      <AnimationWrapper animation="slideUp" delay={0.1} hover>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <BarChart3 className="h-5 w-5 text-primary" />
              </motion.div>
              University Insights
              <HelpTooltip
                content="Real-time analytics showing student engagement, achievement distribution, and institutional performance metrics."
                title="University Insights"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UniversityInsights />
          </CardContent>
        </Card>
      </AnimationWrapper>

      {/* Two Column Layout */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <AnimationWrapper animation="slideLeft" delay={0.2} hover>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <Bell className="h-5 w-5 text-primary" />
                </motion.div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "certificate",
                  message: "25 new certificates generated",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  type: "event",
                  message: "AI Workshop registration opened",
                  time: "4 hours ago",
                  status: "info",
                },
                {
                  type: "alert",
                  message: "3 certificates pending manual review",
                  time: "6 hours ago",
                  status: "warning",
                },
                {
                  type: "student",
                  message: "New student achievement milestone reached",
                  time: "1 day ago",
                  status: "success",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <motion.div
                    className={`p-1 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-600"
                        : activity.status === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {activity.type === "certificate" && <Award className="h-4 w-4" />}
                    {activity.type === "event" && <Calendar className="h-4 w-4" />}
                    {activity.type === "alert" && <AlertTriangle className="h-4 w-4" />}
                    {activity.type === "student" && <Users className="h-4 w-4" />}
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </AnimationWrapper>

        {/* Engagement Analytics Preview */}
        <AnimationWrapper animation="slideRight" delay={0.3} hover>
          <EngagementAnalytics />
        </AnimationWrapper>
      </StaggerContainer>

      {/* Compliance Status */}
      <AnimationWrapper animation="slideUp" delay={0.4} hover>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Compliance & Accreditation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "NAAC Readiness", progress: 85, status: "good", color: "blue" },
                { name: "NIRF Compliance", progress: 92, status: "excellent", color: "green" },
                { name: "Data Quality", progress: 78, status: "needs-attention", color: "orange" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    >
                      <Badge
                        variant={
                          item.status === "excellent" ? "default" : item.status === "good" ? "secondary" : "destructive"
                        }
                      >
                        {item.progress}%
                      </Badge>
                    </motion.div>
                  </div>
                  <AnimatedProgress value={item.progress} color={item.color as any} showValue={false} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimationWrapper>
    </div>
  )
}
