"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Plus, Users, MapPin, Clock, Edit, Trash2, ChevronLeft, ChevronRight, X, Award, Upload, File } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export function EventCalendar() {
  const [selectedView, setSelectedView] = useState("month")
  const [currentDate, setCurrentDate] = useState(new Date()) // Current date
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [hoveredDate, setHoveredDate] = useState<number | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    type: "",
    description: "",
    status: "active",
    organizedBy: "",
    organizer: "",
    certificateTemplate: "",
    provideCertificate: false,
    templateSource: "predefined",
    uploadedTemplate: null
  })
  
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<any>(null)

  // Initial events data - now using state to allow adding new events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI/ML Workshop",
      date: "2025-09-20",
      time: "10:00 AM",
      location: "Tech Lab",
      attendees: 45,
      capacity: 50,
      status: "active",
      type: "workshop",
    },
    {
      id: 2,
      title: "Career Fair 2025",
      date: "2025-09-25",
      time: "9:00 AM",
      location: "Main Auditorium",
      attendees: 120,
      capacity: 200,
      status: "active",
      type: "fair",
    },
    {
      id: 3,
      title: "Research Symposium",
      date: "2025-09-28",
      time: "2:00 PM",
      location: "Conference Hall",
      attendees: 30,
      capacity: 80,
      status: "active",
      type: "symposium",
    },
    {
      id: 4,
      title: "Student Orientation",
      date: "2025-09-22",
      time: "11:00 AM",
      location: "Main Hall",
      attendees: 85,
      capacity: 100,
      status: "active",
      type: "orientation",
    },
    {
      id: 5,
      title: "Tech Talk: Future of AI",
      date: "2025-09-30",
      time: "3:00 PM",
      location: "Lecture Hall 1",
      attendees: 60,
      capacity: 75,
      status: "active",
      type: "talk",
    },
    {
      id: 6,
      title: "Programming Contest",
      date: "2025-10-05",
      time: "1:00 PM",
      location: "Computer Lab",
      attendees: 25,
      capacity: 30,
      status: "active",
      type: "contest",
    },
  ])

  // Helper functions
  const getEventsForDate = (date: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === date && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const getEventsForWeek = (weekStart: Date) => {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= weekStart && eventDate <= weekEnd
    })
  }

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getWeekDates = (startDate: Date) => {
    const week = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      week.push(date)
    }
    return week
  }

  const facultyList = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", title: "Professor" },
    { id: 2, name: "Prof. Michael Chen", department: "Engineering", title: "Associate Professor" },
    { id: 3, name: "Dr. Emily Davis", department: "Business Administration", title: "Assistant Professor" },
    { id: 4, name: "Prof. Robert Wilson", department: "Fine Arts", title: "Professor" },
    { id: 5, name: "Dr. Lisa Martinez", department: "Life Sciences", title: "Associate Professor" }
  ]

  const courseList = [
    { id: 1, code: "CS101", name: "Introduction to Computer Science", department: "Computer Science" },
    { id: 2, code: "ENG201", name: "Advanced Engineering Mechanics", department: "Engineering" },
    { id: 3, code: "BUS301", name: "Strategic Management", department: "Business Administration" },
    { id: 4, code: "ART150", name: "Digital Art & Design", department: "Fine Arts" },
    { id: 5, code: "BIO250", name: "Molecular Biology", department: "Life Sciences" }
  ]

  const certificateTemplates = [
    { 
      id: "participation", 
      name: "Certificate of Participation", 
      description: "Standard participation certificate",
      preview: "This is to certify that [Student Name] has successfully participated in [Event Name]"
    },
    { 
      id: "completion", 
      name: "Certificate of Completion", 
      description: "For completed courses/workshops",
      preview: "This is to certify that [Student Name] has successfully completed [Event Name]"
    },
    { 
      id: "achievement", 
      name: "Certificate of Achievement", 
      description: "For exceptional performance",
      preview: "This is to certify that [Student Name] has achieved excellence in [Event Name]"
    },
    { 
      id: "excellence", 
      name: "Certificate of Excellence", 
      description: "For outstanding achievement",
      preview: "This is to certify that [Student Name] has demonstrated excellence in [Event Name]"
    },
    { 
      id: "leadership", 
      name: "Leadership Certificate", 
      description: "For leadership development events",
      preview: "This is to certify that [Student Name] has demonstrated leadership skills in [Event Name]"
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        toast.error("❌ Invalid File Type", {
          description: "Please upload a JPG, PNG, or PDF file for the certificate template."
        })
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        toast.error("❌ File Too Large", {
          description: "Please upload a file smaller than 5MB."
        })
        return
      }

      setFormData(prev => ({...prev, uploadedTemplate: file}))
      toast.success("✅ Template Uploaded", {
        description: `${file.name} has been uploaded successfully.`
      })
    }
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.capacity || !formData.type || !formData.organizedBy || !formData.organizer) {
      toast.error("❌ Missing Required Fields", {
        description: "Please fill in all required fields including organizer details to create the event."
      })
      return
    }

    // Validate certificate selection if providing certificate
    if (formData.provideCertificate === true || formData.provideCertificate === 'true') {
      if (formData.templateSource === "predefined" && !formData.certificateTemplate) {
        toast.error("❌ Certificate Template Required", {
          description: "Please select a certificate template if you want to provide certificates."
        })
        return
      }
      if (formData.templateSource === "upload" && !formData.uploadedTemplate) {
        toast.error("❌ Upload Template Required", {
          description: "Please upload a certificate template file."
        })
        return
      }
    }

    // Create new event object
    const newEvent = {
      id: Date.now(), // Use timestamp as unique ID
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      attendees: 0,
      capacity: parseInt(formData.capacity),
      status: formData.status as "active" | "draft" | "cancelled",
      type: formData.type.toLowerCase(),
      description: formData.description,
      organizedBy: formData.organizedBy,
      organizer: formData.organizer,
      certificateTemplate: (formData.provideCertificate === true || formData.provideCertificate === 'true') ? formData.certificateTemplate : null,
      provideCertificate: formData.provideCertificate === true || formData.provideCertificate === 'true',
      templateSource: formData.templateSource,
      uploadedTemplate: formData.uploadedTemplate
    }

    // Add new event to the events array
    setEvents(prevEvents => [...prevEvents, newEvent])
    
    // Show success message with certificate info
    const certificateInfo = (formData.provideCertificate === true || formData.provideCertificate === 'true')
      ? formData.templateSource === "upload" 
        ? ` Certificates will be generated using your custom uploaded template (${formData.uploadedTemplate?.name}).`
        : ` Certificates will be automatically generated using ${certificateTemplates.find(t => t.id === formData.certificateTemplate)?.name}.`
      : ""
    
    toast.success("🎉 Event Created Successfully!", {
      description: `${formData.title} organized by ${formData.organizer} has been scheduled for ${new Date(formData.date).toLocaleDateString()} at ${formData.time}.${certificateInfo}`
    })

    // Reset form and close dialog
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      type: "",
      description: "",
      status: "active",
      organizedBy: "",
      organizer: "",
      certificateTemplate: "",
      provideCertificate: false,
      templateSource: "predefined",
      uploadedTemplate: null
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditEvent = (event: any) => {
    setEditingEvent(event)
    setFormData({
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      capacity: event.capacity?.toString() || "",
      type: event.type || "",
      description: event.description || "",
      status: event.status || "active",
      organizedBy: event.organizedBy || "",
      organizer: event.organizer || "",
      certificateTemplate: event.certificateTemplate || "",
      provideCertificate: event.provideCertificate || false,
      templateSource: event.templateSource || "predefined",
      uploadedTemplate: event.uploadedTemplate || null
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Same validation as create event
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.capacity || !formData.type || !formData.organizedBy || !formData.organizer) {
      toast.error("❌ Missing Required Fields", {
        description: "Please fill in all required fields including organizer details to update the event."
      })
      return
    }

    if (formData.provideCertificate === true || formData.provideCertificate === 'true') {
      if (formData.templateSource === "predefined" && !formData.certificateTemplate) {
        toast.error("❌ Certificate Template Required", {
          description: "Please select a certificate template if you want to provide certificates."
        })
        return
      }
      if (formData.templateSource === "upload" && !formData.uploadedTemplate) {
        toast.error("❌ Upload Template Required", {
          description: "Please upload a certificate template file."
        })
        return
      }
    }

    // Update the event in the events array
    const updatedEvent = {
      ...editingEvent,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      type: formData.type.toLowerCase(),
      description: formData.description,
      status: formData.status as "active" | "draft" | "cancelled",
      organizedBy: formData.organizedBy,
      organizer: formData.organizer,
      certificateTemplate: (formData.provideCertificate === true || formData.provideCertificate === 'true') ? formData.certificateTemplate : null,
      provideCertificate: formData.provideCertificate === true || formData.provideCertificate === 'true',
      templateSource: formData.templateSource,
      uploadedTemplate: formData.uploadedTemplate
    }

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === editingEvent.id ? updatedEvent : event
      )
    )

    // Show success message
    const certificateInfo = (formData.provideCertificate === true || formData.provideCertificate === 'true')
      ? formData.templateSource === "upload" 
        ? ` Certificate template: ${formData.uploadedTemplate?.name}.`
        : ` Certificate template: ${certificateTemplates.find(t => t.id === formData.certificateTemplate)?.name}.`
      : ""
    
    toast.success("📝 Event Updated Successfully!", {
      description: `${formData.title} has been updated.${certificateInfo}`
    })

    // Reset form and close dialog
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      type: "",
      description: "",
      status: "active",
      organizedBy: "",
      organizer: "",
      certificateTemplate: "",
      provideCertificate: false,
      templateSource: "predefined",
      uploadedTemplate: null
    })
    setEditingEvent(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteEvent = (event: any) => {
    setEventToDelete(event)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventToDelete.id))
      toast.success("🗑️ Event Deleted Successfully!", {
        description: `${eventToDelete.title} has been removed from the calendar.`
      })
      setEventToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}))
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-playfair font-bold text-2xl">Event Management</h2>
          <div className="flex gap-2">
            {["day", "week", "month"].map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="neon-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5 text-primary" />
                Create New Event
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreateEvent} className="space-y-6 mt-4">
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Event Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className="w-full"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              </div>

              {/* Location and Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter event location"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-sm font-medium">
                    Capacity *
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Max attendees"
                    className="w-full"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Event Type and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Event Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="symposium">Symposium</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="contest">Contest</SelectItem>
                      <SelectItem value="orientation">Orientation</SelectItem>
                      <SelectItem value="talk">Tech Talk</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Organized By Section */}
              <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">Event Organization *</Label>
                </div>
                
                {/* Organized By Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Organized By *</Label>
                  <Select value={formData.organizedBy} onValueChange={(value) => {
                    handleInputChange('organizedBy', value)
                    handleInputChange('organizer', '') // Reset organizer when type changes
                  }} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">Faculty Member</SelectItem>
                      <SelectItem value="course">Course/Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Faculty Selection */}
                {formData.organizedBy === "faculty" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Faculty *</Label>
                    <Select value={formData.organizer} onValueChange={(value) => handleInputChange('organizer', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select faculty member" />
                      </SelectTrigger>
                      <SelectContent>
                        {facultyList.map((faculty) => (
                          <SelectItem key={faculty.id} value={`${faculty.name} (${faculty.title})`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{faculty.name}</span>
                              <span className="text-xs text-muted-foreground">{faculty.title}, {faculty.department}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Course Selection */}
                {formData.organizedBy === "course" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Course *</Label>
                    <Select value={formData.organizer} onValueChange={(value) => handleInputChange('organizer', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseList.map((course) => (
                          <SelectItem key={course.id} value={`${course.code} - ${course.name}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{course.code} - {course.name}</span>
                              <span className="text-xs text-muted-foreground">{course.department}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Certificate Section */}
              <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-medium">Certificate Options</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="provideCertificate" 
                      checked={formData.provideCertificate === true || formData.provideCertificate === 'true'}
                      onCheckedChange={(checked) => handleInputChange('provideCertificate', checked ? 'true' : 'false')}
                    />
                    <Label htmlFor="provideCertificate" className="text-sm">Provide certificates to attendees</Label>
                  </div>
                </div>

                {(formData.provideCertificate === true || formData.provideCertificate === 'true') && (
                  <div className="space-y-4">
                    {/* Template Source Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Template Source *</Label>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="predefined" 
                            checked={formData.templateSource === "predefined"}
                            onCheckedChange={() => {
                              handleInputChange('templateSource', 'predefined')
                              handleInputChange('uploadedTemplate', null)
                              handleInputChange('certificateTemplate', '')
                            }}
                          />
                          <Label htmlFor="predefined" className="text-sm">Use Predefined Templates</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="upload" 
                            checked={formData.templateSource === "upload"}
                            onCheckedChange={() => {
                              handleInputChange('templateSource', 'upload')
                              handleInputChange('certificateTemplate', '')
                            }}
                          />
                          <Label htmlFor="upload" className="text-sm">Upload Custom Template</Label>
                        </div>
                      </div>
                    </div>

                    {/* Predefined Templates */}
                    {formData.templateSource === "predefined" && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Select Certificate Template *</Label>
                        <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                          {certificateTemplates.map((template) => (
                            <div
                              key={template.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                formData.certificateTemplate === template.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => handleInputChange('certificateTemplate', template.id)}
                            >
                              <div className="flex items-start gap-3">
                                <Award className={`h-4 w-4 mt-0.5 ${
                                  formData.certificateTemplate === template.id ? "text-primary" : "text-muted-foreground"
                                }`} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{template.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                                  <p className="text-xs text-primary mt-2 italic">Preview: {template.preview}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Custom Template */}
                    {formData.templateSource === "upload" && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Upload Certificate Template *</Label>
                        
                        {/* File Upload Area */}
                        <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            id="templateUpload"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="templateUpload"
                            className="cursor-pointer flex flex-col items-center gap-3"
                          >
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Click to upload certificate template</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Supports JPG, PNG, PDF files (Max 5MB)
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Upload Progress/Status */}
                        {formData.uploadedTemplate && (
                          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <File className="h-4 w-4 text-green-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800">
                                {formData.uploadedTemplate.name}
                              </p>
                              <p className="text-xs text-green-600">
                                {(formData.uploadedTemplate.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleInputChange('uploadedTemplate', null)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div className="text-xs text-blue-800">
                              <p className="font-medium mb-1">Template Guidelines:</p>
                              <ul className="space-y-1 text-blue-700">
                                <li>• Use placeholders: [Student Name], [Event Name], [Date], [Organizer]</li>
                                <li>• Recommended size: A4 (210×297mm) or Letter (8.5×11")</li>
                                <li>• High resolution: 300 DPI for print quality</li>
                                <li>• PDF format preferred for best results</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      💡 Certificates will be automatically generated and sent to attendees after the event.
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter event description (optional)"
                  className="w-full min-h-[100px] resize-none"
                  rows={4}
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/20">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    setFormData({
                      title: "",
                      date: "",
                      time: "",
                      location: "",
                      capacity: "",
                      type: "",
                      description: "",
                      status: "active",
                      organizedBy: "",
                      organizer: "",
                      certificateTemplate: "",
                      provideCertificate: false,
                      templateSource: "predefined",
                      uploadedTemplate: null
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
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Grid */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const newDate = new Date(currentDate)
                  if (selectedView === 'day') newDate.setDate(currentDate.getDate() - 1)
                  else if (selectedView === 'week') newDate.setDate(currentDate.getDate() - 7)
                  else newDate.setMonth(currentDate.getMonth() - 1)
                  setCurrentDate(newDate)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const newDate = new Date(currentDate)
                  if (selectedView === 'day') newDate.setDate(currentDate.getDate() + 1)
                  else if (selectedView === 'week') newDate.setDate(currentDate.getDate() + 7)
                  else newDate.setMonth(currentDate.getMonth() + 1)
                  setCurrentDate(newDate)
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {/* Day View */}
            {selectedView === 'day' && (
              <motion.div
                key="day"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {formatDateForDisplay(currentDate)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {getEventsForDate(currentDate.getDate()).length > 0 ? (
                    getEventsForDate(currentDate.getDate()).map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.attendees}/{event.capacity}
                              </div>
                            </div>
                          </div>
                          <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No events scheduled for this day</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Week View */}
            {selectedView === 'week' && (
              <motion.div
                key="week"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {(() => {
                  const weekStart = new Date(currentDate)
                  weekStart.setDate(currentDate.getDate() - currentDate.getDay())
                  const weekDates = getWeekDates(weekStart)
                  
                  return (
                    <>
                      <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <div key={day} className="text-center">
                            <div className="p-2 text-sm font-medium text-muted-foreground border-b border-border/20">
                              {day}
                            </div>
                            <div 
                              className="relative p-3 min-h-[100px] border border-border/20 rounded-b bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer"
                              onMouseEnter={() => {
                                const dayEvents = getEventsForDate(weekDates[index].getDate())
                                if (dayEvents.length > 0) {
                                  setHoveredEvent(dayEvents.map(e => e.title).join(', '))
                                  setHoveredDate(weekDates[index].getDate())
                                }
                              }}
                              onMouseLeave={() => {
                                setHoveredEvent(null)
                                setHoveredDate(null)
                              }}
                            >
                              <div className="font-semibold text-sm mb-2">
                                {weekDates[index].getDate()}
                              </div>
                              {getEventsForDate(weekDates[index].getDate()).slice(0, 3).map((event, eventIndex) => (
                                <div 
                                  key={event.id} 
                                  className="text-xs p-1 mb-1 bg-primary/20 text-primary rounded truncate"
                                  title={`${event.title} - ${event.time}`}
                                >
                                  {event.title.length > 12 ? event.title.substring(0, 12) + '...' : event.title}
                                </div>
                              ))}
                              {getEventsForDate(weekDates[index].getDate()).length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{getEventsForDate(weekDates[index].getDate()).length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {hoveredEvent && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="fixed z-50 pointer-events-none bg-popover border border-border rounded-lg shadow-lg p-3 text-sm max-w-xs"
                          style={{
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <strong>Events on {hoveredDate}:</strong> {hoveredEvent}
                        </motion.div>
                      )}
                    </>
                  )
                })()}
              </motion.div>
            )}

            {/* Month View */}
            {selectedView === 'month' && (
              <motion.div
                key="month"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 42 }, (_, i) => {
                    // Calculate the first day of the month and adjust calendar start
                    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                    const startDay = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.
                    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
                    
                    const day = i - startDay + 1
                    const isCurrentMonth = day > 0 && day <= daysInMonth
                    const dayEvents = isCurrentMonth ? getEventsForDate(day) : []
                    const hasEvent = dayEvents.length > 0
                    
                    return (
                      <div
                        key={i}
                        className={`relative p-2 text-center text-sm border border-border/20 rounded cursor-pointer hover:bg-muted/20 transition-colors ${
                          isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                        } ${hasEvent ? "bg-primary/10 border-primary/30" : ""}`}
                        onMouseEnter={() => {
                          if (hasEvent) {
                            setHoveredEvent(dayEvents.map(e => e.title).join(', '))
                            setHoveredDate(day)
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredEvent(null)
                          setHoveredDate(null)
                        }}
                        onClick={() => {
                          if (isCurrentMonth) {
                            const newDate = new Date(currentDate)
                            newDate.setDate(day)
                            setCurrentDate(newDate)
                            setSelectedView('day')
                          }
                        }}
                      >
                        {isCurrentMonth ? day : ""}
                        {hasEvent && (
                          <>
                            <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1" />
                            {dayEvents.length > 1 && (
                              <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                                {dayEvents.length}
                              </div>
                            )}
                          </>
                        )}
                        {hoveredEvent && hasEvent && hoveredDate === day && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg shadow-lg p-3 text-sm max-w-xs pointer-events-none whitespace-nowrap"
                          >
                            <strong>Events on {day}:</strong><br />
                            {dayEvents.map(event => event.title).join(', ')}
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Event List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees}/{event.capacity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={event.status === "active" ? "default" : "secondary"} className="capitalize">
                  {event.status}
                </Badge>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title={`Edit ${event.title}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteEvent(event)}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    title={`Delete ${event.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Edit className="h-5 w-5 text-primary" />
              Edit Event: {editingEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpdateEvent} className="space-y-6 mt-4">
            {/* Event Title */}
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-sm font-medium">
                Event Title *
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                className="w-full"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date" className="text-sm font-medium">
                  Date *
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time" className="text-sm font-medium">
                  Time *
                </Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Location and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="text-sm font-medium">
                  Location *
                </Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter event location"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity" className="text-sm font-medium">
                  Capacity *
                </Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Max attendees"
                  className="w-full"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Event Type and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Event Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="symposium">Symposium</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="contest">Contest</SelectItem>
                    <SelectItem value="orientation">Orientation</SelectItem>
                    <SelectItem value="talk">Tech Talk</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Organized By Section - Simplified for edit */}
            <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-muted/20">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Event Organization *</Label>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Organized By *</Label>
                <Select value={formData.organizedBy} onValueChange={(value) => {
                  handleInputChange('organizedBy', value)
                  handleInputChange('organizer', '')
                }} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faculty">Faculty Member</SelectItem>
                    <SelectItem value="course">Course/Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.organizedBy === "faculty" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Faculty *</Label>
                  <Select value={formData.organizer} onValueChange={(value) => handleInputChange('organizer', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select faculty member" />
                    </SelectTrigger>
                    <SelectContent>
                      {facultyList.map((faculty) => (
                        <SelectItem key={faculty.id} value={`${faculty.name} (${faculty.title})`}>
                          <div className="flex flex-col">
                            <span className="font-medium">{faculty.name}</span>
                            <span className="text-xs text-muted-foreground">{faculty.title}, {faculty.department}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.organizedBy === "course" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Course *</Label>
                  <Select value={formData.organizer} onValueChange={(value) => handleInputChange('organizer', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseList.map((course) => (
                        <SelectItem key={course.id} value={`${course.code} - ${course.name}`}>
                          <div className="flex flex-col">
                            <span className="font-medium">{course.code} - {course.name}</span>
                            <span className="text-xs text-muted-foreground">{course.department}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter event description (optional)"
                className="w-full min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingEvent(null)
                  setFormData({
                    title: "",
                    date: "",
                    time: "",
                    location: "",
                    capacity: "",
                    type: "",
                    description: "",
                    status: "active",
                    organizedBy: "",
                    organizer: "",
                    certificateTemplate: "",
                    provideCertificate: false,
                    templateSource: "predefined",
                    uploadedTemplate: null
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
                <Edit className="h-4 w-4 mr-2" />
                Update Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Event
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            
            {eventToDelete && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800">{eventToDelete.title}</h4>
                <div className="text-sm text-red-600 mt-1">
                  <p>{eventToDelete.date} at {eventToDelete.time}</p>
                  <p>{eventToDelete.location}</p>
                  <p>{eventToDelete.attendees || 0}/{eventToDelete.capacity} attendees</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setEventToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteEvent}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
