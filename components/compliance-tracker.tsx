"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { toast } from "sonner"

export function ComplianceTracker() {
  const handleExportReport = () => {
    toast.info("🚧 Prototype Feature", {
      description: "This is only a prototype of the actual website. In the full version, this would generate and download a comprehensive compliance report in PDF format with detailed analytics, charts, and recommendations for improving accreditation scores."
    })
  }

  const complianceItems = [
    {
      category: "NAAC Accreditation",
      items: [
        { name: "Student Achievement Data", progress: 95, status: "complete" },
        { name: "Faculty Qualifications", progress: 88, status: "good" },
        { name: "Infrastructure Assessment", progress: 72, status: "needs-attention" },
        { name: "Research Publications", progress: 90, status: "good" },
      ],
    },
    {
      category: "NIRF Rankings",
      items: [
        { name: "Teaching & Learning", progress: 92, status: "complete" },
        { name: "Research & Innovation", progress: 85, status: "good" },
        { name: "Graduation Outcomes", progress: 78, status: "needs-attention" },
        { name: "Outreach & Inclusivity", progress: 88, status: "good" },
      ],
    },
    {
      category: "Data Quality",
      items: [
        { name: "Student Records Accuracy", progress: 96, status: "complete" },
        { name: "Certificate Verification", progress: 82, status: "good" },
        { name: "Event Documentation", progress: 75, status: "needs-attention" },
        { name: "Achievement Validation", progress: 89, status: "good" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return CheckCircle
      case "good":
        return Clock
      case "needs-attention":
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "needs-attention":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">Compliance & Accreditation</h2>
        <Button 
          className="neon-glow"
          onClick={handleExportReport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: "NAAC Readiness", score: 86, target: 90 },
          { name: "NIRF Compliance", score: 86, target: 85 },
          { name: "Data Quality", score: 86, target: 90 },
        ].map((metric, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - metric.score / 100)}`}
                    className="text-primary transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{metric.score}%</span>
                </div>
              </div>
              <h3 className="font-semibold mb-1">{metric.name}</h3>
              <p className="text-sm text-muted-foreground">Target: {metric.target}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Compliance Items */}
      <div className="space-y-6">
        {complianceItems.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map((item, itemIndex) => {
                const StatusIcon = getStatusIcon(item.status)
                return (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <StatusIcon className={`h-5 w-5 ${getStatusColor(item.status)}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={item.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        item.status === "complete" ? "default" : item.status === "good" ? "secondary" : "destructive"
                      }
                      className="ml-4"
                    >
                      {item.status === "complete" ? "Complete" : item.status === "good" ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
