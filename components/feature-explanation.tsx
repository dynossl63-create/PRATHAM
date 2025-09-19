"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, ExternalLink, BookOpen } from "lucide-react"
import { useState } from "react"

interface FeatureExplanationProps {
  title: string
  description: string
  benefits: string[]
  howItWorks: string[]
  category: "student" | "admin" | "government"
}

export function FeatureExplanation({ title, description, benefits, howItWorks, category }: FeatureExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const categoryColors = {
    student: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    admin: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    government: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  return (
    <Card className="glass border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={categoryColors[category]} variant="secondary">
            {category}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Key Benefits
          </h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-foreground mt-1">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {isExpanded && (
          <div>
            <h4 className="font-semibold text-sm mb-2">How It Works</h4>
            <ol className="space-y-1">
              {howItWorks.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-foreground font-semibold mt-1">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          {isExpanded ? "Show Less" : "Learn More"}
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
