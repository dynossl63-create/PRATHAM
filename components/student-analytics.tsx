"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react"

export function StudentAnalytics() {
  const metrics = [
    { label: "Monthly Growth", value: "+12%", trend: "up", color: "text-green-600" },
    { label: "Event Participation", value: "18 events", trend: "up", color: "text-blue-600" },
    { label: "Skill Development", value: "8 new skills", trend: "up", color: "text-purple-600" },
    { label: "Goal Completion", value: "75%", trend: "up", color: "text-orange-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {metric.trend === "up" ? (
                  <TrendingUp className={`h-5 w-5 ${metric.color}`} />
                ) : (
                  <TrendingDown className={`h-5 w-5 ${metric.color}`} />
                )}
              </div>
              <p className="font-bold text-lg">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Placeholder */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Achievement Progress</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
            </div>
          </div>

          {/* Simulated Chart */}
          <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Interactive Chart Coming Soon</p>
              <p className="text-xs text-muted-foreground">Achievement trends and growth analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Learning Streak", days: 15, target: 30, color: "bg-blue-500" },
          { title: "Event Streak", days: 8, target: 10, color: "bg-green-500" },
          { title: "Skill Streak", days: 22, target: 25, color: "bg-purple-500" },
        ].map((streak, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${streak.color} neon-glow`}>
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{streak.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {streak.days} days
                    </Badge>
                    <span className="text-xs text-muted-foreground">Goal: {streak.target} days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
