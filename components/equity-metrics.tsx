"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Heart, Accessibility, TrendingUp } from "lucide-react"

export function EquityMetrics() {
  const equityData = [
    {
      category: "Gender Distribution",
      metrics: [
        { label: "Female Participation", value: 48, target: 50, color: "bg-pink-500" },
        { label: "Male Participation", value: 52, target: 50, color: "bg-blue-500" },
      ],
    },
    {
      category: "Social Categories",
      metrics: [
        { label: "General Category", value: 45, target: 40, color: "bg-gray-500" },
        { label: "OBC Participation", value: 32, target: 35, color: "bg-green-500" },
        { label: "SC/ST Participation", value: 18, target: 20, color: "bg-purple-500" },
        { label: "EWS Participation", value: 5, target: 5, color: "bg-orange-500" },
      ],
    },
    {
      category: "Accessibility",
      metrics: [
        { label: "Differently Abled", value: 3.2, target: 4, color: "bg-teal-500" },
        { label: "Rural Students", value: 38, target: 40, color: "bg-amber-500" },
        { label: "First Generation", value: 25, target: 30, color: "bg-indigo-500" },
      ],
    },
  ]

  const regionalEquity = [
    { region: "Northern Region", score: 85, trend: "+5%" },
    { region: "Southern Region", score: 92, trend: "+8%" },
    { region: "Western Region", score: 78, trend: "+3%" },
    { region: "Eastern Region", score: 65, trend: "+12%" },
    { region: "Central Region", score: 72, trend: "+7%" },
    { region: "Northeast Region", score: 88, trend: "+15%" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">Equity & Inclusion Dashboard</h2>
        <Button className="neon-glow">
          <Heart className="h-4 w-4 mr-2" />
          Inclusion Report
        </Button>
      </div>

      {/* Equity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-lg bg-pink-500 neon-glow w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <p className="font-bold text-3xl mb-2">72%</p>
            <p className="text-sm font-medium mb-1">Overall Equity Score</p>
            <Badge variant="secondary" className="text-xs">
              +8% improvement
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-lg bg-green-500 neon-glow w-fit mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <p className="font-bold text-3xl mb-2">89%</p>
            <p className="text-sm font-medium mb-1">Inclusion Rate</p>
            <Badge variant="default" className="text-xs">
              Target: 90%
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-lg bg-teal-500 neon-glow w-fit mx-auto mb-4">
              <Accessibility className="h-8 w-8 text-white" />
            </div>
            <p className="font-bold text-3xl mb-2">95%</p>
            <p className="text-sm font-medium mb-1">Accessibility Score</p>
            <Badge variant="default" className="text-xs">
              Excellent
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-6">
        {equityData.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{metric.label}</h4>
                      <Badge variant="outline" className="text-xs">
                        {metric.value}%
                      </Badge>
                    </div>
                    <Progress value={metric.value} className="h-3 mb-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Current: {metric.value}%</span>
                      <span>Target: {metric.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regional Equity Comparison */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Regional Equity Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalEquity.map((region, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
                  <span className="text-white font-bold text-sm">{region.score}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{region.region}</h4>
                  <p className="text-sm text-muted-foreground">Equity Score</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={region.score} className="w-24 h-2" />
                <Badge variant="default" className="text-xs">
                  {region.trend}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
