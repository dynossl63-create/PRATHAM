"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Eye, TrendingUp, Users, Award } from "lucide-react"
import { toast } from "sonner"

interface RegionalMapProps {
  selectedRegion: string
  onRegionSelect: (region: string) => void
}

export function RegionalMap({ selectedRegion, onRegionSelect }: RegionalMapProps) {
  const handleViewDetailedReport = () => {
    const selectedRegionData = regions.find((r) => r.id === selectedRegion) || regions[0]
    toast.info("📈 View Detailed Report - Prototype Feature", {
      description: `This is only a prototype of the actual website. In the full version, this would generate a comprehensive detailed report for ${selectedRegionData.name} including: student performance analytics, university rankings, demographic breakdowns, infrastructure assessments, faculty qualifications, research output metrics, funding analysis, and strategic recommendations for regional educational improvements.`
    })
  }

  const regions = [
    {
      id: "north",
      name: "Northern Region",
      states: ["Delhi", "Punjab", "Haryana", "Himachal Pradesh"],
      performance: "excellent",
      students: "485K",
      universities: 156,
      avgScore: 8250,
      growth: "+12%",
    },
    {
      id: "west",
      name: "Western Region",
      states: ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
      performance: "good",
      students: "672K",
      universities: 234,
      avgScore: 7890,
      growth: "+8%",
    },
    {
      id: "south",
      name: "Southern Region",
      states: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh"],
      performance: "excellent",
      students: "598K",
      universities: 198,
      avgScore: 8450,
      growth: "+15%",
    },
    {
      id: "east",
      name: "Eastern Region",
      states: ["West Bengal", "Odisha", "Jharkhand", "Bihar"],
      performance: "needs-attention",
      students: "423K",
      universities: 145,
      avgScore: 6890,
      growth: "+3%",
    },
    {
      id: "central",
      name: "Central Region",
      states: ["Madhya Pradesh", "Chhattisgarh", "Uttar Pradesh"],
      performance: "good",
      students: "756K",
      universities: 267,
      avgScore: 7340,
      growth: "+6%",
    },
    {
      id: "northeast",
      name: "Northeast Region",
      states: ["Assam", "Meghalaya", "Manipur", "Tripura"],
      performance: "good",
      students: "89K",
      universities: 45,
      avgScore: 7650,
      growth: "+9%",
    },
  ]

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-600"
      case "good":
        return "bg-blue-600"
      case "needs-attention":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  const selectedRegionData = regions.find((r) => r.id === selectedRegion) || regions[0]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Regional Performance Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interactive Map Placeholder */}
        <div className="relative h-80 bg-muted/20 rounded-lg border border-border/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
              <p className="text-lg font-semibold mb-2">Interactive Regional Map</p>
              <p className="text-sm text-muted-foreground">Click regions below to explore performance data</p>
            </div>
          </div>

          {/* Floating Region Indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            {regions.slice(0, 3).map((region) => (
              <div
                key={region.id}
                className={`p-2 rounded-lg ${getPerformanceColor(region.performance)} neon-glow cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => onRegionSelect(region.id)}
              >
                <div className="text-white text-xs font-semibold">{region.name.split(" ")[0]}</div>
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 space-y-2">
            {regions.slice(3).map((region) => (
              <div
                key={region.id}
                className={`p-2 rounded-lg ${getPerformanceColor(region.performance)} neon-glow cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => onRegionSelect(region.id)}
              >
                <div className="text-white text-xs font-semibold">{region.name.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Region Selection Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? "default" : "outline"}
              size="sm"
              onClick={() => onRegionSelect(region.id)}
              className="justify-start h-auto p-3"
            >
              <div className="text-left">
                <div className="font-semibold text-sm">{region.name}</div>
                <div className="text-xs opacity-70">{region.states.length} states</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Selected Region Details */}
        <Card className="glass border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{selectedRegionData.name}</h3>
              <Badge
                variant={
                  selectedRegionData.performance === "excellent"
                    ? "default"
                    : selectedRegionData.performance === "good"
                      ? "secondary"
                      : "destructive"
                }
                className="capitalize"
              >
                {selectedRegionData.performance.replace("-", " ")}
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                </div>
                <p className="font-bold text-lg">{selectedRegionData.students}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Award className="h-4 w-4 text-green-500 mr-1" />
                </div>
                <p className="font-bold text-lg">{selectedRegionData.universities}</p>
                <p className="text-xs text-muted-foreground">Universities</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                </div>
                <p className="font-bold text-lg">{selectedRegionData.avgScore.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                </div>
                <p className="font-bold text-lg">{selectedRegionData.growth}</p>
                <p className="text-xs text-muted-foreground">Growth</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedRegionData.states.map((state) => (
                <Badge key={state} variant="outline" className="text-xs">
                  {state}
                </Badge>
              ))}
            </div>

            <Button 
              size="sm" 
              className="w-full mt-4"
              onClick={handleViewDetailedReport}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
