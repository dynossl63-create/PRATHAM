"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Award, Calendar, TrendingUp, User, GraduationCap, Target, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ResumeBuilder() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const skills = [
    { name: "JavaScript", level: 90, category: "Technical" },
    { name: "React", level: 85, category: "Technical" },
    { name: "Python", level: 80, category: "Technical" },
    { name: "Leadership", level: 75, category: "Soft Skills" },
    { name: "Communication", level: 88, category: "Soft Skills" },
    { name: "Project Management", level: 70, category: "Professional" },
  ]

  const achievements = [
    {
      id: 1,
      title: "AI/ML Fundamentals Certification",
      issuer: "Tech University",
      date: "2024-01-15",
      type: "certification",
      verified: true,
      points: 200
    },
    {
      id: 2,
      title: "Leadership Excellence Program",
      issuer: "Leadership Institute",
      date: "2024-02-20",
      type: "program",
      verified: true,
      points: 150
    },
    {
      id: 3,
      title: "Hackathon Winner - Tech Innovation 2024",
      issuer: "Tech Conference",
      date: "2024-03-10",
      type: "competition",
      verified: true,
      points: 300
    },
    {
      id: 4,
      title: "Research Publication - AI Conference",
      issuer: "Academic Journal",
      date: "2024-01-25",
      type: "research",
      verified: true,
      points: 250
    }
  ]

  const progressData = {
    totalAchievements: achievements.length,
    totalPoints: achievements.reduce((sum, achievement) => sum + achievement.points, 0),
    verifiedAchievements: achievements.filter(a => a.verified).length,
    departmentRank: 3,
    skillsAcquired: skills.length,
    averageSkillLevel: Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)
  }

  return (
    <div className="space-y-4">
      {/* Resume Preview */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h3 className="font-playfair font-bold text-lg">Naman Shah</h3>
            <p className="text-sm text-muted-foreground">Computer Science Student</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <h4 className="font-semibold mb-1">Recent Achievements</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Hackathon Winner - Tech Innovation 2024</li>
                <li>• Research Publication - AI Conference</li>
                <li>• Leadership Workshop Completion</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills Progress</h4>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{skill.name}</span>
                      <span className="text-xs">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => setIsPreviewOpen(true)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Achievements & Progress
        </Button>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-lg bg-primary/10 border border-primary/20"
              >
                <User className="h-5 w-5 text-primary" />
              </motion.div>
              Naman Shah - Academic Profile
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-100px)]">
            <div className="p-6 space-y-6">
              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Academic Progress Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-2xl font-bold text-blue-600">{progressData.totalAchievements}</div>
                        <div className="text-sm text-muted-foreground">Total Achievements</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-2xl font-bold text-green-600">{progressData.totalPoints}</div>
                        <div className="text-sm text-muted-foreground">Achievement Points</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-2xl font-bold text-purple-600">#{progressData.departmentRank}</div>
                        <div className="text-sm text-muted-foreground">Department Rank</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-2xl font-bold text-orange-600">{progressData.verifiedAchievements}</div>
                        <div className="text-sm text-muted-foreground">Verified Certificates</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                        <div className="text-2xl font-bold text-teal-600">{progressData.skillsAcquired}</div>
                        <div className="text-sm text-muted-foreground">Skills Acquired</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="text-2xl font-bold text-pink-600">{progressData.averageSkillLevel}%</div>
                        <div className="text-sm text-muted-foreground">Avg. Skill Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Recent Achievements
                    </h3>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            {achievement.type === 'certification' && <GraduationCap className="h-4 w-4 text-primary" />}
                            {achievement.type === 'competition' && <Target className="h-4 w-4 text-primary" />}
                            {achievement.type === 'research' && <Award className="h-4 w-4 text-primary" />}
                            {achievement.type === 'program' && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              {achievement.verified && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(achievement.date).toLocaleDateString()}
                              </span>
                              <span>{achievement.issuer}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">+{achievement.points}</div>
                            <div className="text-xs text-muted-foreground">points</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Progress Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Skills Development Progress
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {["Technical", "Soft Skills", "Professional"].map((category) => {
                        const categorySkills = skills.filter(skill => skill.category === category)
                        return (
                          <div key={category} className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                              {category}
                            </h4>
                            {categorySkills.map((skill, index) => (
                              <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="space-y-2"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">{skill.name}</span>
                                  <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                              </motion.div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
