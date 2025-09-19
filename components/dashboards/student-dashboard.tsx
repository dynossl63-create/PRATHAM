"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  BookOpen,
  Users,
  ChevronRight,
  Sparkles,
  Medal,
  Crown,
  Zap,
} from "lucide-react"
import { AchievementScore } from "@/components/achievement-score"
import { JourneyTimeline } from "@/components/journey-timeline"
import { CertificateGallery } from "@/components/certificate-gallery"
import { OpportunityCarousel } from "@/components/opportunity-carousel"
import { ResumeBuilder } from "@/components/resume-builder"
import { StudentAnalytics } from "@/components/student-analytics"
import { HelpTooltip } from "@/components/help-tooltip"
import { FeatureExplanation } from "@/components/feature-explanation"
import { AnimationWrapper, StaggerContainer } from "@/components/animation-wrapper"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedProgress } from "@/components/animated-progress"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function StudentDashboard() {
  const [selectedMetric, setSelectedMetric] = useState("overall")

  const handleStudentClick = (studentName: string, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      toast.info("👋 This is you!", {
        description: "You're viewing your own profile. Keep up the great work!"
      })
    } else {
      toast.info("🚧 Prototype Feature", {
        description: `This is only a prototype of the actual website. In the full version, clicking on ${studentName}'s profile would show their public achievements, badges, and academic journey.`
      })
    }
  }

  const achievements = [
    { id: 1, title: "Hackathon Winner", date: "2024-01-15", type: "competition", verified: true },
    { id: 2, title: "Research Publication", date: "2024-02-20", type: "academic", verified: true },
    { id: 3, title: "Leadership Workshop", date: "2024-03-10", type: "skill", verified: false },
  ]

  const upcomingEvents = [
    { id: 1, title: "AI/ML Workshop", date: "2024-04-15", type: "workshop", recommended: true },
    { id: 2, title: "Startup Pitch Competition", date: "2024-04-22", type: "competition", recommended: true },
    { id: 3, title: "Industry Networking Event", date: "2024-05-05", type: "networking", recommended: false },
  ]

  return (
    <div className="space-y-8">
      <AnimationWrapper animation="fadeIn" delay={0.1}>
        <FeatureExplanation
          title="PRATHAM Student Dashboard"
          description="Your personal hub for tracking academic achievements, building your professional profile, and discovering growth opportunities."
          benefits={[
            "Track all achievements in one centralized location",
            "Build a comprehensive digital portfolio",
            "Discover personalized opportunities based on your interests",
            "Generate professional resumes automatically",
            "Compare progress with peers and set goals",
          ]}
          howItWorks={[
            "Complete workshops, competitions, and earn certificates",
            "System automatically updates your achievement score",
            "AI recommends relevant opportunities based on your profile",
            "Export achievements to build professional documents",
            "Track progress and compete on department leaderboards",
          ]}
          category="student"
        />
      </AnimationWrapper>

      {/* Hero Section */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievement Score */}
        <AnimationWrapper animation="scale" delay={0.2} className="lg:col-span-2">
          <motion.div
            className="animate-card-entrance hover-achievement"
            whileHover={{
              scale: 1.02,
              rotateY: 2,
              transition: { duration: 0.3 },
            }}
          >
            <AchievementScore score={8750} rank="Top 10%" trend="+12%" />
          </motion.div>
        </AnimationWrapper>

        {/* Quick Stats */}
        <AnimationWrapper animation="slideLeft" delay={0.3} hover>
          <motion.div
            className="glass neon-glow animate-float hover-glow"
            whileHover={{
              boxShadow: "0 0 50px oklch(0.5 0.15 264 / 0.4)",
              transition: { duration: 0.3 },
            }}
          >
            <Card className="glass border-border/50 backdrop-blur-xl h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-primary animate-badge-glow" />
                  </motion.div>
                  Quick Stats
                  <HelpTooltip
                    content="Overview of your key achievements and current standing in your department."
                    title="Quick Stats"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="flex items-center justify-between hover-achievement"
                  whileHover={{
                    x: 8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="text-sm text-muted-foreground">Certificates</span>
                  <motion.div className="animate-achievement-pop" whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Badge variant="secondary" className="font-semibold animate-badge-glow">
                      <AnimatedCounter value={24} duration={2} showPulse />
                    </Badge>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between hover-achievement"
                  whileHover={{
                    x: 8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span className="text-sm text-muted-foreground">Events Attended</span>
                  <motion.div className="animate-achievement-pop" whileHover={{ scale: 1.1, rotate: -5 }}>
                    <Badge variant="secondary" className="font-semibold animate-badge-glow">
                      <AnimatedCounter value={18} duration={2} showPulse />
                    </Badge>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between hover-achievement"
                  whileHover={{
                    x: 8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <span className="text-sm text-muted-foreground">Skills Earned</span>
                  <motion.div className="animate-achievement-pop" whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Badge variant="secondary" className="font-semibold animate-badge-glow">
                      <AnimatedCounter value={12} duration={2} showPulse />
                    </Badge>
                  </motion.div>
                </motion.div>

                <div className="pt-2 border-t border-border/50">
                  <motion.div
                    className="flex items-center justify-between hover-achievement"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <span className="text-sm font-medium">Department Rank</span>
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="animate-trophy-spin"
                      >
                        <Crown className="h-4 w-4 text-yellow-500" />
                      </motion.div>
                      <motion.span className="font-bold text-primary animate-score-reveal" whileHover={{ scale: 1.1 }}>
                        #4
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimationWrapper>
      </StaggerContainer>

      {/* Journey Timeline */}
      <AnimationWrapper animation="slideUp" delay={0.4} hover>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              My Achievement Journey
              <HelpTooltip
                content="Chronological view of your academic milestones, achievements, and verified accomplishments."
                title="Achievement Journey"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JourneyTimeline achievements={achievements} />
          </CardContent>
        </Card>
      </AnimationWrapper>

      {/* Certificates & Badges */}
      <AnimationWrapper animation="scale" delay={0.5} hover>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
              >
                <Award className="h-5 w-5 text-primary" />
              </motion.div>
              Certificates & Records
              <HelpTooltip
                content="Your digital certificate collection with blockchain verification. Upload external certificates and view all your achievements."
                title="Digital Certificates & Records"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CertificateGallery />
          </CardContent>
        </Card>
      </AnimationWrapper>

      {/* Two Column Layout */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Opportunities */}
        <AnimationWrapper animation="slideLeft" delay={0.6} hover>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recommended for You
                <HelpTooltip
                  content="AI-powered recommendations based on your interests, skills, and career goals. Green badges indicate high-match opportunities."
                  title="Personalized Recommendations"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OpportunityCarousel events={upcomingEvents} />
            </CardContent>
          </Card>
        </AnimationWrapper>

        {/* Resume Builder Preview */}
        <AnimationWrapper animation="slideRight" delay={0.7} hover>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Live Resume Builder
                <HelpTooltip
                  content="Automatically generates professional resumes using your verified achievements. Updates in real-time as you earn new credentials."
                  title="Resume Builder"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeBuilder />
            </CardContent>
          </Card>
        </AnimationWrapper>
      </StaggerContainer>

      {/* Analytics & Leaderboard */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Analytics */}
        <AnimationWrapper animation="slideUp" delay={0.8} className="lg:col-span-2" hover>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Growth Analytics
                <HelpTooltip
                  content="Track your skill development over time, compare with department averages, and identify areas for improvement."
                  title="Growth Analytics"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StudentAnalytics />
            </CardContent>
          </Card>
        </AnimationWrapper>

        {/* Leaderboard */}
        <AnimationWrapper animation="slideLeft" delay={0.9} hover>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Department Leaderboard
                <HelpTooltip
                  content="See how you rank among peers in your department. Rankings are based on verified achievements and active participation."
                  title="Department Rankings"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Soumya Bajaj", score: 9250, rank: 1, avatar: "SB" },
                { name: "Rahul Kumar", score: 9100, rank: 2, avatar: "RK" },
                { name: "Yuvraj Singh", score: 8950, rank: 3, avatar: "YS" },
                { name: "Naman Shah", score: 8750, rank: 4, avatar: "NS", isCurrentUser: true },
                { name: "Subhro Pal", score: 8650, rank: 5, avatar: "SP" },
                { name: "Lakshda Sharma", score: 8500, rank: 6, avatar: "LS" },
                { name: "Divyansh Choubey", score: 8350, rank: 7, avatar: "DC" },
                { name: "Anjali Gupta", score: 8200, rank: 8, avatar: "AG" },
                { name: "Priya Patel", score: 7850, rank: 9, avatar: "PP" },
                { name: "Arjun Mehta", score: 6750, rank: 10, avatar: "AM" },
              ].map((student, index) => (
                <motion.div
                  key={student.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStudentClick(student.name, student.isCurrentUser || false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    student.isCurrentUser ? "bg-primary/10 border border-primary/20 neon-glow" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {student.rank === 1 && (
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Crown className="h-4 w-4 text-yellow-500" />
                      </motion.div>
                    )}
                    {student.rank === 2 && <Medal className="h-4 w-4 text-gray-400" />}
                    {student.rank === 3 && <Medal className="h-4 w-4 text-amber-600" />}
                    <span className="font-bold text-sm w-6">#{student.rank}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs font-semibold">{student.avatar}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <AnimatedCounter value={student.score} duration={2} suffix=" pts" />
                    </p>
                  </div>
                  {student.isCurrentUser && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        You
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full mt-4 bg-transparent" 
                  size="sm"
                  onClick={() => toast.info("🚧 Prototype Feature", {
                    description: "This is only a prototype of the actual website. In the full version, this would show the complete department leaderboard with rankings from all students, detailed statistics, and filtering options."
                  })}
                >
                  View Full Leaderboard
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </AnimationWrapper>
      </StaggerContainer>

      {/* Milestones & Goals */}
      <AnimationWrapper animation="slideUp" delay={1.0} hover>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              >
                <Zap className="h-5 w-5 text-primary" />
              </motion.div>
              Current Goals & Milestones
              <HelpTooltip
                content="Set and track personal achievement goals. System provides recommendations to help you reach your targets."
                title="Goal Tracking"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Complete 5 Workshops", progress: 80, current: 4, target: 5, color: "blue" },
                { title: "Earn Leadership Badge", progress: 60, current: 3, target: 5, color: "green" },
                { title: "Publish Research Paper", progress: 90, current: 1, target: 1, color: "purple" },
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{goal.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      <AnimatedCounter value={goal.current} duration={1} />
                      /<AnimatedCounter value={goal.target} duration={1} />
                    </Badge>
                  </div>
                  <AnimatedProgress
                    value={goal.progress}
                    className="h-2 mb-2"
                    color={goal.color as any}
                    showValue={false}
                  />
                  <p className="text-xs text-muted-foreground">
                    <AnimatedCounter value={goal.progress} duration={1.5} suffix="% Complete" />
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimationWrapper>
    </div>
  )
}
