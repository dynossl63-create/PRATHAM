"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Info, Sparkles } from "lucide-react"
import { useState } from "react"

interface AchievementScoreProps {
  score: number
  rank: string
  trend: string
}

export function AchievementScore({ score, rank, trend }: AchievementScoreProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Card className="glass neon-glow animate-pulse-glow">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary neon-glow">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="font-playfair font-bold text-3xl text-foreground">{score.toLocaleString()}</h2>
              <p className="text-muted-foreground">Achievement Score</p>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant="secondary"
              className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              {rank}
            </Badge>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30">
                <TrendingUp className="h-4 w-4 text-green-700 dark:text-green-400" />
                <span className="font-semibold text-green-700 dark:text-green-400">{trend}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress to Next Level</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out animate-pulse-glow"
              style={{ width: "75%" }}
            />
          </div>

          {showTooltip && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-popover border border-border rounded-lg shadow-lg z-10 w-64">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                How Scores Are Earned
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Workshop Completion: +50 points</li>
                <li>• Competition Win: +200 points</li>
                <li>• Certificate Earned: +100 points</li>
                <li>• Research Publication: +300 points</li>
                <li>• Leadership Role: +150 points</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Next Level: 10,000 pts</span>
          <span>1,250 pts to go</span>
        </div>
      </CardContent>
    </Card>
  )
}
