"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, BookOpen, Users, ChevronRight, Calendar, Award, X } from "lucide-react"
import { VerificationBadge } from "@/components/verification-badge"
import { motion, AnimatePresence } from "framer-motion"

interface Achievement {
  id: number
  title: string
  date: string
  type: "competition" | "academic" | "skill"
  verified: boolean
}

interface JourneyTimelineProps {
  achievements: Achievement[]
}

// Utility function to format date as dd/mm/yyyy
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function JourneyTimeline({ achievements }: JourneyTimelineProps) {
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)
  
  const getIcon = (type: string) => {
    switch (type) {
      case "competition":
        return Trophy
      case "academic":
        return BookOpen
      case "skill":
        return Users
      default:
        return Trophy
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "competition":
        return "bg-yellow-500"
      case "academic":
        return "bg-blue-500"
      case "skill":
        return "bg-green-500"
      default:
        return "bg-primary"
    }
  }

  const getColorVariant = (type: string) => {
    switch (type) {
      case "competition":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "academic":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "skill":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  // Sort achievements by date (most recent first) for the full view
  const sortedAchievements = [...achievements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-4 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = getIcon(achievement.type)
          const colorClass = getColor(achievement.type)

          return (
            <div
              key={achievement.id}
              className="flex-shrink-0 relative group cursor-pointer"
              style={{ minWidth: "280px" }}
            >
              <div className="glass p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:neon-glow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClass} neon-glow`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1 truncate">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatDate(achievement.date)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {achievement.type}
                      </Badge>
                      <VerificationBadge verified={achievement.verified} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < achievements.length - 1 && (
                <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-border/50 transform -translate-y-1/2" />
              )}
            </div>
          )
        })}

        {/* View All Button */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: "120px" }}>
          <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="sm" className="h-full bg-transparent hover:bg-primary/10 transition-all duration-200 neon-glow">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] p-0 gap-0 overflow-hidden">
              <DialogHeader className="p-6 pb-4 border-b border-border/50">
                <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="p-2 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <Award className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    My Achievement Journey
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {achievements.length} Total
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <ScrollArea className="h-[60vh] p-6">
                <div className="space-y-4">
                  <AnimatePresence>
                    {sortedAchievements.map((achievement, index) => {
                      const Icon = getIcon(achievement.type)
                      const colorClass = getColor(achievement.type)
                      const colorVariant = getColorVariant(achievement.type)
                      
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className="group"
                        >
                          <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-300 hover:neon-glow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <motion.div
                                  className={`p-3 rounded-xl ${colorClass} neon-glow flex-shrink-0`}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Icon className="h-6 w-6 text-white" />
                                </motion.div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                                      {achievement.title}
                                    </h3>
                                    <VerificationBadge verified={achievement.verified} />
                                  </div>
                                  
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      <span className="font-medium">
                                        {formatDate(achievement.date)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs capitalize font-medium px-3 py-1 ${colorVariant} border-2`}
                                    >
                                      {achievement.type}
                                    </Badge>
                                    {achievement.verified && (
                                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                  
                  {achievements.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="mb-4">
                        <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold text-lg mb-2 text-foreground">No Achievements Yet</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                          Start your journey by participating in workshops, competitions, and earning certificates!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
