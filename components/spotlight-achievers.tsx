"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Trophy, Award, Medal, Crown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SpotlightAchiever {
  id: number
  name: string
  avatar?: string
  achievements: string[]
  totalPoints: number
  rank: number
  category: string
  recentAchievement: string
  joinDate: string
}

const spotlightAchievers: SpotlightAchiever[] = [
  {
    id: 1,
    name: "Naman Shah",
    avatar: "/placeholder.svg",
    achievements: [
      "AI/ML Workshop Excellence Award",
      "Leadership Training Completion",
      "Data Science Project Winner",
      "Community Engagement Champion"
    ],
    totalPoints: 2850,
    rank: 1,
    category: "Academic Excellence",
    recentAchievement: "AI/ML Workshop Excellence Award",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Soumya Bajaj",
    avatar: "/placeholder.svg",
    achievements: [
      "Web Development Mastery",
      "Team Leadership Award",
      "Innovation Challenge Winner",
      "Peer Mentorship Recognition"
    ],
    totalPoints: 2720,
    rank: 2,
    category: "Technical Innovation",
    recentAchievement: "Innovation Challenge Winner",
    joinDate: "2024-02-03"
  },
  {
    id: 3,
    name: "Yuvraj Singh",
    avatar: "/placeholder.svg",
    achievements: [
      "Cloud Computing Certification",
      "DevOps Excellence",
      "Open Source Contributor",
      "Tech Talk Speaker"
    ],
    totalPoints: 2650,
    rank: 3,
    category: "Technical Expertise",
    recentAchievement: "Cloud Computing Certification",
    joinDate: "2024-01-28"
  },
  {
    id: 4,
    name: "Lakshda Sharma",
    avatar: "/placeholder.svg",
    achievements: [
      "Mobile App Development Champion",
      "UI/UX Design Excellence",
      "Student Mentorship Award",
      "Creative Problem Solving"
    ],
    totalPoints: 2580,
    rank: 4,
    category: "Design & Development",
    recentAchievement: "Mobile App Development Champion",
    joinDate: "2024-02-15"
  },
  {
    id: 5,
    name: "Subhro Pal",
    avatar: "/placeholder.svg",
    achievements: [
      "Cybersecurity Specialist",
      "Ethical Hacking Certification",
      "Security Research Publication",
      "Bug Bounty Hunter"
    ],
    totalPoints: 2480,
    rank: 5,
    category: "Cybersecurity",
    recentAchievement: "Ethical Hacking Certification",
    joinDate: "2024-03-01"
  }
]

interface SpotlightAchieversProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SpotlightAchievers({ trigger, open, onOpenChange }: SpotlightAchieversProps) {
  const [selectedAchiever, setSelectedAchiever] = useState<SpotlightAchiever | null>(null)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-blue-500" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600"
      case 2:
        return "from-gray-300 to-gray-500"
      case 3:
        return "from-amber-400 to-amber-600"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  const dialogContent = (
    <DialogContent className="w-[95vw] sm:w-[90vw] max-w-4xl h-[90vh] p-3 sm:p-6">
      <DialogHeader className="pb-3 sm:pb-4">
        <DialogTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl font-playfair">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </motion.div>
          Spotlight Achievers
        </DialogTitle>
        <p className="text-muted-foreground text-xs sm:text-sm text-center">
          Celebrating our top performers and their outstanding achievements
        </p>
      </DialogHeader>

      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Achievers List */}
        <div className="flex-1 space-y-2 sm:space-y-3 max-h-[35vh] overflow-y-auto">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2 sticky top-0 bg-background/95 backdrop-blur-sm pb-1 sm:pb-2 border-b border-border/20 z-10">
            <Star className="h-4 w-4 text-primary" />
            Top Achievers
          </h3>
          <div className="space-y-2">
            {spotlightAchievers.map((achiever, index) => (
              <motion.div
                key={achiever.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={`p-2 sm:p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedAchiever?.id === achiever.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => setSelectedAchiever(achiever)}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`relative p-1 rounded-full bg-gradient-to-r ${getRankColor(achiever.rank)} neon-glow flex-shrink-0`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {getRankIcon(achiever.rank)}
                    <div className="absolute -top-0.5 -right-0.5 bg-background border border-border rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {achiever.rank}
                    </div>
                  </motion.div>
                  
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={achiever.avatar} />
                    <AvatarFallback className="font-semibold text-xs">
                      {achiever.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{achiever.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{achiever.category}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        {achiever.totalPoints}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {achiever.achievements.length} items
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Details */}
        <div className="flex-1 space-y-2 sm:space-y-3 max-h-[45vh] overflow-y-auto">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2 sticky top-0 bg-background/95 backdrop-blur-sm pb-1 sm:pb-2 border-b border-border/20 z-10">
            <Award className="h-4 w-4 text-primary" />
            Achievement Details
          </h3>
          
          <AnimatePresence mode="wait">
            {selectedAchiever ? (
              <motion.div
                key={selectedAchiever.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <Card className="glass">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        className={`p-2 rounded-full bg-gradient-to-r ${getRankColor(selectedAchiever.rank)} neon-glow flex-shrink-0`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {getRankIcon(selectedAchiever.rank)}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg truncate">{selectedAchiever.name}</CardTitle>
                        <p className="text-muted-foreground text-xs sm:text-sm truncate">{selectedAchiever.category}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge className={`bg-gradient-to-r ${getRankColor(selectedAchiever.rank)} text-white text-xs px-2 py-0.5`}>
                            #{selectedAchiever.rank}
                          </Badge>
                          <span className="text-xs font-medium">{selectedAchiever.totalPoints} Points</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center gap-2 text-xs sm:text-sm">
                        <Trophy className="h-3 w-3" />
                        Recent Achievement
                      </h4>
                      <div className="p-2 bg-primary/10 rounded border border-primary/20">
                        <p className="font-medium text-primary text-xs leading-tight">{selectedAchiever.recentAchievement}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 flex items-center gap-2 text-xs sm:text-sm">
                        <Star className="h-3 w-3" />
                        All Achievements ({selectedAchiever.achievements.length})
                      </h4>
                      <div className="space-y-1 max-h-32 sm:max-h-40 overflow-y-auto">
                        {selectedAchiever.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-1.5 rounded border border-border/30 bg-muted/20"
                          >
                            <Award className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-xs leading-tight">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Since: {new Date(selectedAchiever.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span>{selectedAchiever.achievements.length} items</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-24 sm:h-32 border border-dashed border-border/50 rounded-lg"
              >
                <div className="text-center px-4">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs sm:text-sm">Select an achiever to view details</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DialogContent>
  )

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        {dialogContent}
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogContent}
    </Dialog>
  )
}