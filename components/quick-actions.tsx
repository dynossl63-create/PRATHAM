"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Bell, Award, Flag, Send, Users, Calendar, AlertCircle, CheckCircle } from "lucide-react"
import { SpotlightAchievers } from "@/components/spotlight-achievers"
import { toast } from "sonner"
import { motion } from "framer-motion"

export function QuickActions() {
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)
  const [reminderData, setReminderData] = useState({
    type: "",
    recipients: "all",
    subject: "",
    message: "",
    priority: "normal",
    scheduleType: "immediate",
    scheduleDate: "",
    scheduleTime: ""
  })

  const students = [
    { id: 1, name: "Naman Shah", email: "naman.shah@university.edu", department: "Computer Science" },
    { id: 2, name: "Soumya Bajaj", email: "soumya.bajaj@university.edu", department: "Engineering" },
    { id: 3, name: "Yuvraj Singh", email: "yuvraj.singh@university.edu", department: "Business Administration" },
    { id: 4, name: "Subhro Pal", email: "subhro.pal@university.edu", department: "Fine Arts" },
    { id: 5, name: "Lakshda Sharma", email: "lakshda.sharma@university.edu", department: "Life Sciences" }
  ]

  const reminderTypes = [
    { value: "event", label: "Event Reminder", icon: Calendar, description: "Remind about upcoming events" },
    { value: "certificate", label: "Certificate Submission", icon: Award, description: "Request certificate uploads" },
    { value: "deadline", label: "Deadline Alert", icon: AlertCircle, description: "Important deadlines" },
    { value: "achievement", label: "Achievement Update", icon: CheckCircle, description: "Achievement progress" },
    { value: "general", label: "General Notice", icon: Bell, description: "General announcements" }
  ]

  const handleSendReminder = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reminderData.type || !reminderData.subject || !reminderData.message) {
      toast.error("❌ Missing Required Fields", {
        description: "Please fill in reminder type, subject, and message."
      })
      return
    }

    // Calculate recipient count
    const recipientCount = reminderData.recipients === "all" ? students.length : 1
    const scheduledText = reminderData.scheduleType === "scheduled" 
      ? ` scheduled for ${reminderData.scheduleDate} at ${reminderData.scheduleTime}`
      : ""

    // Simulate sending reminder
    toast.success("📧 Reminder Sent Successfully!", {
      description: `${recipientCount} student(s) will receive "${reminderData.subject}"${scheduledText}.`
    })

    // Reset form
    setReminderData({
      type: "",
      recipients: "all",
      subject: "",
      message: "",
      priority: "normal",
      scheduleType: "immediate",
      scheduleDate: "",
      scheduleTime: ""
    })
    setIsReminderDialogOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setReminderData(prev => ({...prev, [field]: value}))
  }

  const getTemplateMessage = (type: string) => {
    const templates = {
      event: "Don't forget about the upcoming [Event Name] on [Date] at [Time]. Please confirm your attendance.",
      certificate: "Please upload your certificates for recent achievements. Visit your dashboard to submit documents.",
      deadline: "Reminder: The deadline for [Task/Requirement] is approaching on [Date]. Please ensure completion.",
      achievement: "Congratulations on your recent achievements! Don't forget to update your profile with new accomplishments.",
      general: "This is an important announcement regarding [Topic]. Please read carefully and take necessary action."
    }
    return templates[type as keyof typeof templates] || ""
  }

  return (
    <div className="flex gap-2">
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="neon-glow">
            <Bell className="h-4 w-4 mr-2" />
            Send Reminder
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Bell className="h-5 w-5 text-primary" />
              Send Reminder to Students
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSendReminder} className="space-y-6 mt-4">
            {/* Reminder Type */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Reminder Type *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reminderTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        reminderData.type === type.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => {
                        handleInputChange('type', type.value)
                        if (!reminderData.subject) {
                          handleInputChange('subject', type.label)
                        }
                        if (!reminderData.message) {
                          handleInputChange('message', getTemplateMessage(type.value))
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          reminderData.type === type.value ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div>
                          <h4 className="font-medium text-sm">{type.label}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Recipients and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Recipients *</Label>
                <Select value={reminderData.recipients} onValueChange={(value) => handleInputChange('recipients', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        All Students ({students.length})
                      </div>
                    </SelectItem>
                    <SelectItem value="computer-science">Computer Science Students</SelectItem>
                    <SelectItem value="engineering">Engineering Students</SelectItem>
                    <SelectItem value="business">Business Students</SelectItem>
                    <SelectItem value="arts">Arts Students</SelectItem>
                    <SelectItem value="sciences">Science Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <Select value={reminderData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Low Priority</SelectItem>
                    <SelectItem value="normal">🟡 Normal Priority</SelectItem>
                    <SelectItem value="high">🔴 High Priority</SelectItem>
                    <SelectItem value="urgent">⚡ Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Subject *</Label>
              <Input
                id="subject"
                value={reminderData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Enter reminder subject"
                className="w-full"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
              <Textarea
                id="message"
                value={reminderData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Enter your message"
                className="w-full min-h-[120px] resize-none"
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: Use [Event Name], [Date], [Time] as placeholders that will be automatically replaced.
              </p>
            </div>

            {/* Schedule Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Delivery Schedule</Label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="immediate" 
                    checked={reminderData.scheduleType === "immediate"}
                    onCheckedChange={() => handleInputChange('scheduleType', 'immediate')}
                  />
                  <Label htmlFor="immediate" className="text-sm">Send Immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="scheduled" 
                    checked={reminderData.scheduleType === "scheduled"}
                    onCheckedChange={() => handleInputChange('scheduleType', 'scheduled')}
                  />
                  <Label htmlFor="scheduled" className="text-sm">Schedule for Later</Label>
                </div>
              </div>
              
              {reminderData.scheduleType === "scheduled" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="scheduleDate" className="text-sm font-medium">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      value={reminderData.scheduleDate}
                      onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduleTime" className="text-sm font-medium">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      value={reminderData.scheduleTime}
                      onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            {reminderData.type && (
              <div className="space-y-2 p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Preview</span>
                  <Badge variant="outline" className="capitalize">{reminderData.priority}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p><strong>To:</strong> {reminderData.recipients === "all" ? "All Students" : "Selected Group"}</p>
                  <p><strong>Subject:</strong> {reminderData.subject || "[Subject]"}</p>
                  <p><strong>Message:</strong> {reminderData.message.substring(0, 100) || "[Message]"}...</p>
                  <p><strong>Delivery:</strong> {
                    reminderData.scheduleType === "immediate" 
                      ? "Immediate" 
                      : `${reminderData.scheduleDate || "[Date]"} at ${reminderData.scheduleTime || "[Time]"}`
                  }</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsReminderDialogOpen(false)
                  setReminderData({
                    type: "",
                    recipients: "all",
                    subject: "",
                    message: "",
                    priority: "normal",
                    scheduleType: "immediate",
                    scheduleDate: "",
                    scheduleTime: ""
                  })
                }}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4 mr-2" />
                {reminderData.scheduleType === "immediate" ? "Send Now" : "Schedule Reminder"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <SpotlightAchievers
        trigger={
          <Button size="sm" variant="outline" className="bg-transparent">
            <Flag className="h-4 w-4 mr-2" />
            Spotlight Achievers
          </Button>
        }
      />
    </div>
  )
}
