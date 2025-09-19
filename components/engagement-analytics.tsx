"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"

export function EngagementAnalytics() {
  const metrics = [
    { label: "Event Participation", value: "78%", change: "+5%", trend: "up" },
    { label: "Certificate Completion", value: "92%", change: "+8%", trend: "up" },
    { label: "Student Engagement", value: "85%", change: "-2%", trend: "down" },
    { label: "Department Activity", value: "67%", change: "+12%", trend: "up" },
  ]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Engagement Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className="font-medium text-sm">{metric.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{metric.value}</span>
              <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="text-xs">
                {metric.change}
              </Badge>
            </div>
          </div>
        ))}

        {/* Chart Placeholder */}
        <div className="mt-6 h-32 bg-muted/20 rounded-lg flex items-center justify-center border border-border/50">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Engagement Trends Chart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
