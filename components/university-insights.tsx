"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Calendar, TrendingUp, Award, Building2 } from "lucide-react"

export function UniversityInsights() {
  const insights = [
    {
      title: "Active Students",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Faculty Members",
      value: "156",
      change: "+3%",
      trend: "up",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      title: "Events This Month",
      value: "24",
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Certificates Issued",
      value: "1,234",
      change: "+15%",
      trend: "up",
      icon: Award,
      color: "bg-orange-500",
    },
    {
      title: "Departments",
      value: "12",
      change: "0%",
      trend: "stable",
      icon: Building2,
      color: "bg-gray-500",
    },
    {
      title: "Avg. Participation",
      value: "78%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {insights.map((insight, index) => (
        <Card key={index} className="glass hover:neon-glow transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${insight.color} neon-glow`}>
                <insight.icon className="h-5 w-5 text-white" />
              </div>
              <Badge
                variant={insight.trend === "up" ? "default" : insight.trend === "down" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {insight.change}
              </Badge>
            </div>
            <div>
              <p className="font-bold text-2xl mb-1">{insight.value}</p>
              <p className="text-xs text-muted-foreground">{insight.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
