"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Eye, Mail, Flag, Search, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface StudentDatabaseProps {
  searchQuery: string
}

export function StudentDatabase({ searchQuery: externalSearchQuery }: StudentDatabaseProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [localSearchQuery, setLocalSearchQuery] = useState("")
  const router = useRouter()
  const { switchRole } = useAuth()

  const students = [
    {
      id: 1,
      name: "Naman Shah",
      email: "naman.shah@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      score: 8750,
      events: 18,
      certificates: 12,
      status: "active",
      flagged: false,
    },
    {
      id: 2,
      name: "Soumya Bajaj",
      email: "soumya.bajaj@university.edu",
      department: "Engineering",
      year: "2nd Year",
      score: 9250,
      events: 22,
      certificates: 15,
      status: "active",
      flagged: false,
    },
    {
      id: 3,
      name: "Yuvraj Singh",
      email: "yuvraj.singh@university.edu",
      department: "Business Administration",
      year: "4th Year",
      score: 8950,
      events: 20,
      certificates: 14,
      status: "active",
      flagged: false,
    },
    {
      id: 4,
      name: "Subhro Pal",
      email: "subhro.pal@university.edu",
      department: "Fine Arts",
      year: "1st Year",
      score: 8650,
      events: 16,
      certificates: 11,
      status: "active",
      flagged: false,
    },
    {
      id: 5,
      name: "Lakshda Sharma",
      email: "lakshda.sharma@university.edu",
      department: "Life Sciences",
      year: "2nd Year",
      score: 8500,
      events: 15,
      certificates: 10,
      status: "active",
      flagged: false,
    },
    {
      id: 6,
      name: "Divyansh Choubey",
      email: "divyansh.choubey@university.edu",
      department: "Mechanical Engineering",
      year: "3rd Year",
      score: 8350,
      events: 14,
      certificates: 9,
      status: "active",
      flagged: false,
    },
    {
      id: 7,
      name: "Priya Patel",
      email: "priya.patel@university.edu",
      department: "Computer Science",
      year: "1st Year",
      score: 7850,
      events: 12,
      certificates: 8,
      status: "active",
      flagged: false,
    },
    {
      id: 8,
      name: "Rahul Kumar",
      email: "rahul.kumar@university.edu",
      department: "Electrical Engineering",
      year: "4th Year",
      score: 9100,
      events: 25,
      certificates: 18,
      status: "active",
      flagged: false,
    },
    {
      id: 9,
      name: "Anjali Gupta",
      email: "anjali.gupta@university.edu",
      department: "Business Administration",
      year: "2nd Year",
      score: 8200,
      events: 13,
      certificates: 7,
      status: "active",
      flagged: true,
    },
    {
      id: 10,
      name: "Arjun Mehta",
      email: "arjun.mehta@university.edu",
      department: "Life Sciences",
      year: "3rd Year",
      score: 6750,
      events: 8,
      certificates: 4,
      status: "inactive",
      flagged: true,
    }
  ]

  // Handle student profile view
  const handleViewStudent = (student: any) => {
    if (student.name === "Naman Shah") {
      // Switch to student role and redirect to student dashboard
      switchRole("student")
      router.push("/")
      toast.success("🎯 Viewing Student Profile", {
        description: `Opening ${student.name}'s dashboard with full access to their achievements, certificates, and academic journey.`
      })
    } else {
      // Show prototype message for other students
      toast.info("🚧 Prototype Feature", {
        description: `This is only a prototype of the actual website. In the full version, clicking the eye icon for ${student.name} would open their detailed student profile with achievements, academic history, and performance analytics.`
      })
    }
  }

  // Use local search query if available, otherwise use external search query
  const activeSearchQuery = localSearchQuery || externalSearchQuery

  const filteredStudents = students.filter((student) => {
    const searchTerm = activeSearchQuery.toLowerCase()
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.department.toLowerCase().includes(searchTerm) ||
      student.year.toLowerCase().includes(searchTerm)
    
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "flagged" && student.flagged) ||
      (selectedFilter === "inactive" && student.status === "inactive")
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <h2 className="font-playfair font-bold text-2xl">Student Database</h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, department, or year..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-background/50 border-border/50 transition-all duration-200 focus:scale-105"
            />
            {localSearchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                onClick={() => setLocalSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Search Results Info */}
        {activeSearchQuery && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>
              Showing {filteredStudents.length} results for "{activeSearchQuery}"
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocalSearchQuery("")}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All Students" },
          { id: "flagged", label: "Flagged for Support" },
          { id: "inactive", label: "Low Engagement" },
        ].map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Student List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Student Records ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                student.flagged
                  ? "border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20"
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="font-semibold">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{student.name}</h4>
                    {student.flagged && <Flag className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{student.department}</span>
                    <span className="text-xs text-muted-foreground">{student.year}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-bold text-lg">{student.score.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{student.events}</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{student.certificates}</p>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewStudent(student)}
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                      title={`View ${student.name}'s profile`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        toast.info("🚧 Prototype Feature", {
                          description: `This is only a prototype. In the full version, this would open an email composer to send a message to ${student.name}.`
                        })
                      }}
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                      title={`Send email to ${student.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
