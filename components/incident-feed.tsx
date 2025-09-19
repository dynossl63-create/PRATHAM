"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react"

export function IncidentFeed() {
  const incidents = [
    {
      type: "resolved",
      title: "Certificate verification issue resolved",
      time: "2 hours ago",
      severity: "medium",
    },
    {
      type: "alert",
      title: "Compliance deadline approaching",
      time: "4 hours ago",
      severity: "high",
    },
    {
      type: "info",
      title: "New policy guidelines published",
      time: "6 hours ago",
      severity: "low",
    },
    {
      type: "resolved",
      title: "Regional data sync completed",
      time: "8 hours ago",
      severity: "low",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "resolved":
        return CheckCircle
      case "alert":
        return AlertTriangle
      case "info":
        return Info
      default:
        return Bell
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "resolved":
        return "text-green-600"
      case "alert":
        return "text-red-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Incident Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {incidents.map((incident, index) => {
          const Icon = getIcon(incident.type)
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
              <Icon className={`h-4 w-4 mt-0.5 ${getIconColor(incident.type)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{incident.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{incident.time}</span>
                  <Badge
                    variant={
                      incident.severity === "high"
                        ? "destructive"
                        : incident.severity === "medium"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {incident.severity}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
