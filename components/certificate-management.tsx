"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, CheckCircle, Clock, AlertTriangle, Eye, Download, RefreshCw } from "lucide-react"

export function CertificateManagement() {
  const [filter, setFilter] = useState("all")

  const certificates = [
    {
      id: 1,
      student: "Naman Shah",
      event: "AI/ML Workshop",
      status: "generated",
      date: "2024-04-10",
      progress: 100,
    },
    {
      id: 2,
      student: "Soumya Bajaj",
      event: "Leadership Training",
      status: "pending",
      date: "2024-04-12",
      progress: 75,
    },
    {
      id: 3,
      student: "Yuvraj Singh",
      event: "Data Science Bootcamp",
      status: "review",
      date: "2024-04-14",
      progress: 90,
    },
    {
      id: 4,
      student: "Subhro Pal",
      event: "Web Development",
      status: "generated",
      date: "2024-04-15",
      progress: 100,
    },
    {
      id: 5,
      student: "Lakshda Sharma",
      event: "Mobile App Development",
      status: "generated",
      date: "2024-04-16",
      progress: 100,
    },
    {
      id: 6,
      student: "Divyansh Choubey",
      event: "Cloud Computing Workshop",
      status: "pending",
      date: "2024-04-17",
      progress: 85,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "generated":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "review":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "generated":
        return CheckCircle
      case "pending":
        return Clock
      case "review":
        return AlertTriangle
      default:
        return Clock
    }
  }

  const filteredCertificates = filter === "all" ? certificates : certificates.filter((cert) => cert.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-playfair font-bold text-2xl">Certificate Management</h2>
        <Button className="neon-glow">
          <RefreshCw className="h-4 w-4 mr-2" />
          Bulk Generate
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Certificates", value: "1,234", color: "bg-blue-500" },
          { label: "Generated", value: "1,156", color: "bg-green-500" },
          { label: "Pending", value: "45", color: "bg-yellow-500" },
          { label: "Under Review", value: "33", color: "bg-orange-500" },
        ].map((stat, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color} neon-glow`}>
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-xl">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All Certificates" },
          { id: "generated", label: "Generated" },
          { id: "pending", label: "Pending" },
          { id: "review", label: "Under Review" },
        ].map((filterOption) => (
          <Button
            key={filterOption.id}
            variant={filter === filterOption.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption.id)}
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Certificate List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Certificate Status Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredCertificates.map((cert) => {
            const StatusIcon = getStatusIcon(cert.status)
            return (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(cert.status)} neon-glow`}>
                    <StatusIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{cert.student}</h4>
                    <p className="text-sm text-muted-foreground">{cert.event}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 max-w-32">
                        <Progress value={cert.progress} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground">{cert.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {cert.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{cert.date}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {cert.status === "generated" && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
