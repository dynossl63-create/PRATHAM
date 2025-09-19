"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, Calendar, Target, Users, Award } from "lucide-react"
import { toast } from "sonner"

export function TrendAnalytics() {
  const handleTimeRange = () => {
    toast.info("📅 Time Range Selection - Prototype Feature", {
      description: "This is only a prototype of the actual website. In the full version, this would open a time range selector allowing you to filter national trends and benchmarks data by: last 30 days, 3 months, 6 months, 1 year, 2 years, or custom date ranges. All charts, metrics, and regional benchmarks would update dynamically based on your selection with historical data comparisons and trend analysis."
    })
  }

  const trendMetrics = [
    {
      category: "Student Participation",
      value: "78%",
      change: "+12%",
      trend: "up",
      period: "YoY",
      color: "bg-blue-500",
    },
    {
      category: "Certificate Completion",
      value: "92%",
      change: "+8%",
      trend: "up",
      period: "QoQ",
      color: "bg-green-500",
    },
    {
      category: "University Adoption",
      value: "85%",
      change: "+15%",
      trend: "up",
      period: "YoY",
      color: "bg-purple-500",
    },
    {
      category: "Regional Equity",
      value: "67%",
      change: "+5%",
      trend: "up",
      period: "YoY",
      color: "bg-orange-500",
    },
  ]

  const benchmarkData = [
    {
      region: "Southern Region",
      participation: 89,
      achievement: 92,
      growth: 15,
      rank: 1,
    },
    {
      region: "Northern Region",
      participation: 85,
      achievement: 88,
      growth: 12,
      rank: 2,
    },
    {
      region: "Western Region",
      participation: 82,
      achievement: 85,
      growth: 8,
      rank: 3,
    },
    {
      region: "Central Region",
      participation: 78,
      achievement: 82,
      growth: 6,
      rank: 4,
    },
    {
      region: "Northeast Region",
      participation: 75,
      achievement: 80,
      growth: 9,
      rank: 5,
    },
    {
      region: "Eastern Region",
      participation: 68,
      achievement: 75,
      growth: 3,
      rank: 6,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">National Trends & Benchmarks</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleTimeRange}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Time Range
          </Button>
        </div>
      </div>

      {/* Trend Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendMetrics.map((metric, index) => (
          <Card key={index} className="glass hover:neon-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.color} neon-glow`}>
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <Badge variant="default" className="text-xs">
                  {metric.change} {metric.period}
                </Badge>
              </div>
              <div>
                <p className="font-bold text-2xl mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-foreground">{metric.category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Trends Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Participation Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border/50">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Trend Chart</p>
                <p className="text-xs text-muted-foreground">Student participation over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Distribution */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Achievement Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border/50">
              <div className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Distribution Chart</p>
                <p className="text-xs text-muted-foreground">Achievement levels across regions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Benchmarks */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Regional Performance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benchmarkData.map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={index < 2 ? "default" : index < 4 ? "secondary" : "outline"}>#{region.rank}</Badge>
                    <span className="font-semibold">{region.region}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-bold text-sm">{region.participation}%</p>
                    <p className="text-xs text-muted-foreground">Participation</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">{region.achievement}%</p>
                    <p className="text-xs text-muted-foreground">Achievement</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">+{region.growth}%</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
