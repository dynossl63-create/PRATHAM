"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, GraduationCap, Award, Building2, MapPin, Target } from "lucide-react"

export function NationalOverview() {
  const nationalMetrics = [
    {
      title: "Total Students",
      value: "2.8M",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
      textColor: "text-white",
      description: "Across all institutions",
    },
    {
      title: "Universities",
      value: "1,247",
      change: "+2.1%",
      trend: "up",
      icon: Building2,
      color: "bg-green-500",
      textColor: "text-white",
      description: "Active institutions",
    },
    {
      title: "Certificates Issued",
      value: "456K",
      change: "+18.3%",
      trend: "up",
      icon: Award,
      color: "bg-purple-500",
      textColor: "text-white",
      description: "This academic year",
    },
    {
      title: "Faculty Members",
      value: "89K",
      change: "+3.7%",
      trend: "up",
      icon: GraduationCap,
      color: "bg-orange-600",
      textColor: "text-white",
      description: "Qualified educators",
    },
    {
      title: "Regions Covered",
      value: "28",
      change: "0%",
      trend: "stable",
      icon: MapPin,
      color: "bg-gray-600",
      textColor: "text-white",
      description: "States & territories",
    },
    {
      title: "Avg. Achievement Score",
      value: "7,245",
      change: "+8.9%",
      trend: "up",
      icon: Target,
      color: "bg-pink-600",
      textColor: "text-white",
      description: "National average",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">National Education Overview</h2>
        <Badge variant="secondary" className="text-sm text-secondary-foreground">
          Last Updated: 2 hours ago
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {nationalMetrics.map((metric, index) => (
          <Card key={index} className="glass hover:neon-glow transition-all duration-300 animate-float">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.color} neon-glow`}>
                  <metric.icon className={`h-5 w-5 ${metric.textColor}`} />
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : null}
                  <Badge
                    variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="font-bold text-2xl mb-1">{metric.value}</p>
                <p className="text-xs font-medium text-foreground mb-1">{metric.title}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
