"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, TrendingUp, Eye } from "lucide-react"
import { toast } from "sonner"

export function PolicyImpact() {
  const handleViewPolicyDetails = (policy: any) => {
    toast.info(`📄 ${policy.title} - Detailed Analysis`, {
      description: `This is only a prototype of the actual website. In the full version, this would show comprehensive details for "${policy.title}" including: implementation timeline, affected demographics, budget allocation, performance metrics across ${policy.regions.join(", ")} regions, stakeholder feedback, compliance status, success stories, challenges faced, and actionable recommendations for policy optimization.`
    })
  }

  const policyUpdates = [
    {
      title: "Digital India Education Initiative",
      impact: "High",
      regions: ["All Regions"],
      improvement: "+15%",
      status: "active",
    },
    {
      title: "Rural Education Enhancement",
      impact: "Medium",
      regions: ["Eastern", "Central"],
      improvement: "+8%",
      status: "monitoring",
    },
    {
      title: "Skill Development Program",
      impact: "High",
      regions: ["Northern", "Western"],
      improvement: "+12%",
      status: "active",
    },
  ]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Policy Impact Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {policyUpdates.map((policy, index) => (
          <div key={index} className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">{policy.title}</h4>
              <Badge variant={policy.impact === "High" ? "default" : "secondary"} className="text-xs">
                {policy.impact} Impact
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-sm font-medium text-green-600">{policy.improvement}</span>
              <span className="text-xs text-muted-foreground">improvement</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {policy.regions.map((region) => (
                  <Badge key={region} variant="outline" className="text-xs">
                    {region}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleViewPolicyDetails(policy)}
              >
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
