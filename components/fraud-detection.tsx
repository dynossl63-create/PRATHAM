"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Eye, Flag, TrendingDown } from "lucide-react"
import { toast } from "sonner"

export function FraudDetection() {
  const handleViewSecurityDashboard = () => {
    toast.info("🔒 View Security Dashboard - Prototype Feature", {
      description: "This is only a prototype of the actual website. In the full version, this would open a comprehensive security dashboard featuring: real-time threat monitoring, detailed fraud analytics, security incident reports, compliance status tracking, vulnerability assessments, security audit logs, threat intelligence feeds, automated response protocols, and advanced security metrics with customizable alerts and reporting capabilities."
    })
  }

  const securityMetrics = [
    {
      title: "Fraud Detection Rate",
      value: "99.2%",
      status: "excellent",
      icon: Shield,
      color: "bg-green-500",
    },
    {
      title: "Flagged Certificates",
      value: "23",
      status: "attention",
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
    {
      title: "Verified Authenticity",
      value: "98.7%",
      status: "good",
      icon: CheckCircle,
      color: "bg-blue-500",
    },
    {
      title: "False Positives",
      value: "0.8%",
      status: "excellent",
      icon: TrendingDown,
      color: "bg-purple-500",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "certificate",
      severity: "high",
      title: "Suspicious Certificate Pattern Detected",
      description: "Multiple certificates issued with identical timestamps from University XYZ",
      timestamp: "2 hours ago",
      status: "investigating",
    },
    {
      id: 2,
      type: "compliance",
      severity: "medium",
      title: "Compliance Risk Identified",
      description: "Regional university missing required documentation for NAAC review",
      timestamp: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "trend",
      severity: "low",
      title: "Unusual Activity Pattern",
      description: "Spike in certificate requests from Eastern Region universities",
      timestamp: "6 hours ago",
      status: "monitoring",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "destructive"
      case "pending":
        return "secondary"
      case "monitoring":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">Fraud Detection & Security Intelligence</h2>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="glass hover:neon-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.color} neon-glow`}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
                <Badge
                  variant={
                    metric.status === "excellent" ? "default" : metric.status === "good" ? "secondary" : "destructive"
                  }
                  className="text-xs capitalize"
                >
                  {metric.status}
                </Badge>
              </div>
              <div>
                <p className="font-bold text-2xl mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts */}
        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Active Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} neon-glow flex-shrink-0`}>
                    {alert.type === "certificate" && <Shield className="h-4 w-4 text-white" />}
                    {alert.type === "compliance" && <Flag className="h-4 w-4 text-white" />}
                    {alert.type === "trend" && <TrendingDown className="h-4 w-4 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <Badge variant={getStatusColor(alert.status)} className="text-xs capitalize ml-2">
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Security Status */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              System Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Certificate Validation", status: "operational", uptime: "99.9%" },
              { name: "Fraud Detection AI", status: "operational", uptime: "99.8%" },
              { name: "Data Integrity Check", status: "operational", uptime: "99.7%" },
              { name: "Compliance Monitor", status: "maintenance", uptime: "98.5%" },
            ].map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      system.status === "operational" ? "bg-green-500" : "bg-yellow-500"
                    } animate-pulse`}
                  />
                  <span className="font-medium text-sm">{system.name}</span>
                </div>
                <div className="text-right">
                  <Badge variant={system.status === "operational" ? "default" : "secondary"} className="text-xs mb-1">
                    {system.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{system.uptime}</p>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full mt-4 bg-transparent"
              onClick={handleViewSecurityDashboard}
            >
              <Shield className="h-4 w-4 mr-2" />
              View Security Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
