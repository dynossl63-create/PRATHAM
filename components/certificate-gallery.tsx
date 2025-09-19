"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, Share2, Eye, CheckCircle, Award, X, Calendar, Building, Shield, Star, Sparkles, ZoomIn, ExternalLink, Copy, Upload, Plus, FileText, Camera, GraduationCap, Users, Trophy, FolderOpen } from "lucide-react"
import { VerificationBadge } from "@/components/verification-badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  verified: boolean
  image: string
  description?: string
  skills?: string[]
  credentialId?: string
  validUntil?: string
}

export function CertificateGallery() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadData, setUploadData] = useState({
    recordType: 'certifications',
    title: '',
    issuer: '',
    credentialId: '',
    issueDate: '',
    validUntil: '',
    description: '',
    skills: '',
    file: null as File | null,
    sessionDetails: {
      sessionType: '',
      duration: '',
      instructor: '',
      completionStatus: ''
    },
    eventDetails: {
      eventType: '',
      role: '',
      achievement: '',
      location: ''
    }
  })
  const [isDragging, setIsDragging] = useState(false)

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "AI/ML Fundamentals",
      issuer: "Tech University",
      date: "2024-01-15",
      verified: true,
      image: "/ai-ml-certificate.jpg",
      description: "Comprehensive certification covering machine learning algorithms, neural networks, and practical AI applications.",
      skills: ["Machine Learning", "Neural Networks", "Python", "TensorFlow", "Data Analysis"],
      credentialId: "TU-AIML-2024-001",
      validUntil: "2027-01-15"
    },
    {
      id: 2,
      title: "Leadership Excellence",
      issuer: "Leadership Institute",
      date: "2024-02-20",
      verified: true,
      image: "/leadership-certificate.jpg",
      description: "Advanced leadership program focusing on team management, strategic thinking, and organizational development.",
      skills: ["Team Leadership", "Strategic Planning", "Communication", "Project Management"],
      credentialId: "LI-LEAD-2024-002",
      validUntil: "2027-02-20"
    },
    {
      id: 3,
      title: "Data Science Bootcamp",
      issuer: "Data Academy",
      date: "2024-03-10",
      verified: false,
      image: "/data-science-certificate.jpg",
      description: "Intensive bootcamp covering data analysis, visualization, and predictive modeling techniques.",
      skills: ["Data Analysis", "Python", "R", "SQL", "Data Visualization"],
      credentialId: "DA-DS-2024-003"
    },
    {
      id: 4,
      title: "Web Development",
      issuer: "Code Institute",
      date: "2024-03-25",
      verified: true,
      image: "/web-development-certificate.jpg",
      description: "Full-stack web development certification covering modern frameworks and best practices.",
      skills: ["React", "Node.js", "JavaScript", "HTML/CSS", "Database Design"],
      credentialId: "CI-WEB-2024-004",
      validUntil: "2027-03-25"
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleCertificateClick = (cert: Certificate) => {
    if (cert.verified) {
      setSelectedCertificate(cert)
      setIsPreviewOpen(true)
      setImageLoaded(false)
    } else {
      toast.error("Certificate Preview", {
        description: "This certificate is not verified yet and cannot be previewed."
      })
    }
  }

  const copyCredentialId = (credentialId: string) => {
    navigator.clipboard.writeText(credentialId)
    toast.success("Copied!", {
      description: "Credential ID copied to clipboard"
    })
  }

  const handlePrototypeAction = (action: string) => {
    const messages = {
      "Download All Certificates": "📚 In the full version, this would download all your verified certificates as a ZIP file with individual PDFs and a comprehensive portfolio document.",
      "Share Portfolio": "🔗 Coming soon! This feature will generate a secure, shareable link to your digital portfolio that you can send to employers or educational institutions.",
      "Download Certificate": "📄 This would download a high-resolution PDF of your certificate with embedded verification codes and QR codes for authenticity.",
      "Share Certificate": "📤 This feature will allow you to share individual certificates via email, social media, or generate a verification link for employers.",
      "Verify Online": "🔍 In the full application, this would redirect to our blockchain verification portal where anyone can verify the authenticity of this certificate."
    }

    const message = messages[action as keyof typeof messages] || `${action} is currently not available in this prototype version.`
    
    toast.info("🚧 Prototype Feature", {
      description: message,
      duration: 5000
    })
  }

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
      setUploadData(prev => ({ ...prev, file }))
      toast.success("File uploaded!", {
        description: `${file.name} is ready to be processed`
      })
    } else {
      toast.error("Invalid file type", {
        description: "Please upload a PDF or image file (JPG, PNG)"
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleUploadSubmit = () => {
    // Basic validation - title and issuer always required
    if (!uploadData.title || !uploadData.issuer) {
      toast.error("Required fields missing", {
        description: "Please fill in the title and issuing organization"
      })
      return
    }

    // Additional validation for certifications
    if (uploadData.recordType === 'certifications' && !uploadData.credentialId) {
      toast.error("Credential ID required", {
        description: "Credential ID is required for certification records"
      })
      return
    }

    const recordTypeLabels = {
      'sessions': 'session record',
      'certifications': 'certification',
      'events': 'event record',
      'others': 'record'
    }

    const recordLabel = recordTypeLabels[uploadData.recordType as keyof typeof recordTypeLabels]

    // In a real application, this would upload to a server
    toast.success("🚧 Upload Submitted!", {
      description: `Your ${recordLabel} has been submitted for verification and will be added to your portfolio within 24-48 hours.`,
      duration: 6000
    })

    // Reset form
    resetUploadForm()
    setIsUploadOpen(false)
  }

  const resetUploadForm = () => {
    setUploadData({
      recordType: 'certifications',
      title: '',
      issuer: '',
      credentialId: '',
      issueDate: '',
      validUntil: '',
      description: '',
      skills: '',
      file: null,
      sessionDetails: {
        sessionType: '',
        duration: '',
        instructor: '',
        completionStatus: ''
      },
      eventDetails: {
        eventType: '',
        role: '',
        achievement: '',
        location: ''
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-medium text-lg">Your Certificates</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white neon-glow"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Certificate
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`glass cursor-pointer hover:neon-glow transition-all duration-300 group relative overflow-hidden ${
                cert.verified ? 'hover:border-primary/50' : 'opacity-75 hover:border-muted-foreground/30'
              }`}
              onClick={() => handleCertificateClick(cert)}
            >
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {cert.verified && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="absolute top-2 right-2 p-1 rounded-full shadow-lg border-2 border-white bg-green-600 neon-glow"
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </motion.div>
                )}
                <motion.div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                >
                  {cert.verified ? (
                    <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full">
                      <Shield className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs text-white font-medium">Pending Verification</span>
                    </div>
                  )}
                </motion.div>
              </div>

              <h4 className="font-semibold text-sm mb-1 truncate group-hover:text-primary transition-colors">{cert.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Building className="h-3 w-3" />
                {cert.issuer}
              </p>
              <div className="flex items-center justify-between">
                <VerificationBadge verified={cert.verified} />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(cert.date)}
                </span>
              </div>
            </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[95vw] w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[95vh] p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-2 border-primary/20 m-2 sm:m-4">
          <AnimatePresence>
            {selectedCertificate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Header */}
                <DialogHeader className="p-3 sm:p-4 md:p-6 pb-3 sm:pb-4 border-b border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="p-3 rounded-xl bg-primary/10 border border-primary/20 neon-glow"
                      >
                        <Award className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent line-clamp-2">
                          {selectedCertificate.title}
                        </DialogTitle>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Building className="h-4 w-4 shrink-0" />
                            <span className="font-medium truncate">{selectedCertificate.issuer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{formatDate(selectedCertificate.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <VerificationBadge verified={selectedCertificate.verified} />
                      </motion.div>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 flex items-center gap-1 text-xs">
                        <Sparkles className="h-3 w-3" />
                        <span className="hidden sm:inline">Verified Certificate</span>
                        <span className="sm:hidden">Verified</span>
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="flex flex-col lg:flex-row h-[calc(95vh-120px)] sm:h-[calc(95vh-140px)] md:h-[calc(95vh-160px)]">
                  {/* Certificate Image Preview */}
                  <div className="flex-1 lg:flex-[2] p-3 sm:p-4 md:p-6 bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
                    <motion.div
                      className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-[4/3] max-h-[400px] sm:max-h-[450px] md:max-h-[500px] bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border-2 sm:border-4 border-primary/20 neon-glow"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-muted/50 animate-pulse flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="p-4 rounded-full bg-primary/10"
                          >
                            <Sparkles className="h-8 w-8 text-primary" />
                          </motion.div>
                        </div>
                      )}
                      <img
                        src={selectedCertificate.image}
                        alt={selectedCertificate.title}
                        className="w-full h-full object-contain p-4"
                        onLoad={() => setImageLoaded(true)}
                      />
                      
                      {/* Floating Action Buttons */}
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                          onClick={() => window.open(selectedCertificate.image, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Certificate Details Sidebar */}
                  <div className="w-full lg:w-96 lg:flex-shrink-0 border-t lg:border-t-0 lg:border-l border-border/50">
                    <ScrollArea className="h-full max-h-[400px] lg:max-h-none">
                      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
                        {/* Description */}
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold flex items-center gap-2 text-foreground text-sm sm:text-base">
                            <Star className="h-4 w-4 text-primary shrink-0" />
                            Description
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {selectedCertificate.description}
                          </p>
                        </div>

                        {/* Skills */}
                        {selectedCertificate.skills && (
                          <div className="space-y-2 sm:space-y-3">
                            <h3 className="font-semibold flex items-center gap-2 text-foreground text-sm sm:text-base">
                              <Sparkles className="h-4 w-4 text-primary shrink-0" />
                              Skills Covered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedCertificate.skills.map((skill, index) => (
                                <motion.div
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Credential Details */}
                        <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 glass rounded-lg sm:rounded-xl border border-border/50">
                          <h3 className="font-semibold flex items-center gap-2 text-foreground text-sm sm:text-base">
                            <Shield className="h-4 w-4 text-primary shrink-0" />
                            Credential Information
                          </h3>
                          
                          {selectedCertificate.credentialId && (
                            <div className="space-y-2">
                              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Credential ID
                              </label>
                              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border">
                                <code className="text-[10px] sm:text-xs font-mono flex-1 break-all">
                                  {selectedCertificate.credentialId}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 shrink-0"
                                  onClick={() => copyCredentialId(selectedCertificate.credentialId!)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Issued Date
                              </label>
                              <p className="font-medium text-xs sm:text-sm">{formatDate(selectedCertificate.date)}</p>
                            </div>
                            {selectedCertificate.validUntil && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Valid Until
                                </label>
                                <p className="font-medium text-green-600 text-xs sm:text-sm">{formatDate(selectedCertificate.validUntil)}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold flex items-center gap-2 text-foreground text-sm sm:text-base">
                            <Download className="h-4 w-4 text-primary shrink-0" />
                            Actions
                          </h3>
                          <div className="space-y-2">
                            <Button 
                              className="w-full justify-start text-xs sm:text-sm" 
                              size="sm"
                              onClick={() => handlePrototypeAction("Download Certificate")}
                            >
                              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Download Certificate
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-xs sm:text-sm" 
                              size="sm"
                              onClick={() => handlePrototypeAction("Share Certificate")}
                            >
                              <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Share Certificate
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-xs sm:text-sm" 
                              size="sm"
                              onClick={() => handlePrototypeAction("Verify Online")}
                            >
                              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Verify Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-medium">Certificate Actions</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePrototypeAction("Download All Certificates")}
          >
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePrototypeAction("Share Portfolio")}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Portfolio
          </Button>
        </div>
      </div>
      
      {/* Upload Certificate Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={(open) => {
        setIsUploadOpen(open)
        if (!open) resetUploadForm()
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-lg bg-primary/10 border border-primary/20"
              >
                <Upload className="h-5 w-5 text-primary" />
              </motion.div>
              Upload Your Records
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Add your achievements, certifications, session attendance, events, and other academic records
            </p>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6 py-4">
              {/* Record Type Tabs */}
              <div className="space-y-4">
                <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg">
                  {[
                    { 
                      id: "sessions", 
                      label: "Sessions", 
                      icon: GraduationCap
                    },
                    { 
                      id: "certifications", 
                      label: "Certifications", 
                      icon: Award
                    },
                    { 
                      id: "events", 
                      label: "Events", 
                      icon: Trophy
                    },
                    { 
                      id: "others", 
                      label: "Records (Other)", 
                      icon: FolderOpen
                    }
                  ].map((tab, index) => (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        type="button"
                        variant={uploadData.recordType === tab.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setUploadData(prev => ({ ...prev, recordType: tab.id }))}
                        className="w-full flex items-center gap-2 justify-center transition-all duration-200"
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Tab Description */}
                <div className="text-center px-4">
                  <p className="text-sm text-muted-foreground">
                    {uploadData.recordType === 'sessions' && "Add details about learning sessions, workshops, and courses you've attended"}
                    {uploadData.recordType === 'certifications' && "Upload professional certificates and credentials you've earned"}
                    {uploadData.recordType === 'events' && "Share your participation in hackathons, competitions, and conferences"}
                    {uploadData.recordType === 'others' && "Document other achievements and academic records"}
                  </p>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {uploadData.recordType === 'certifications' ? 'Certificate File *' : 'Supporting File (Optional)'}
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : uploadData.file 
                        ? 'border-green-500 bg-green-500/5'
                        : 'border-border hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                  />
                  
                  <motion.div
                    animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                    className="space-y-2"
                  >
                    {uploadData.file ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                        <div>
                          <p className="font-medium text-green-600">{uploadData.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <div className="p-3 rounded-full bg-primary/10">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Drop your certificate here or click to browse</p>
                          <p className="text-sm text-muted-foreground">Supports PDF, JPG, PNG (Max 10MB)</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Form Fields Based on Record Type */}
              {uploadData.recordType === 'sessions' && (
                <>
                  {/* Session Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-title" className="text-sm font-medium">Session Name *</Label>
                      <Input
                        id="session-title"
                        placeholder="e.g., Agentic AI Workshop"
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session-issuer" className="text-sm font-medium">Organized By *</Label>
                      <Input
                        id="session-issuer"
                        placeholder="e.g., Tech University, Google, Microsoft"
                        value={uploadData.issuer}
                        onChange={(e) => setUploadData(prev => ({ ...prev, issuer: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-type" className="text-sm font-medium">Session Type</Label>
                      <Input
                        id="session-type"
                        placeholder="e.g., Workshop, Webinar, Masterclass"
                        value={uploadData.sessionDetails.sessionType}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          sessionDetails: { ...prev.sessionDetails, sessionType: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session-duration" className="text-sm font-medium">Duration</Label>
                      <Input
                        id="session-duration"
                        placeholder="e.g., 3 hours, 2 days, 1 week"
                        value={uploadData.sessionDetails.duration}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          sessionDetails: { ...prev.sessionDetails, duration: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructor" className="text-sm font-medium">Instructor/Speaker</Label>
                      <Input
                        id="instructor"
                        placeholder="e.g., Dr. John Smith, AI Research Team"
                        value={uploadData.sessionDetails.instructor}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          sessionDetails: { ...prev.sessionDetails, instructor: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="completion-status" className="text-sm font-medium">Completion Status</Label>
                      <Input
                        id="completion-status"
                        placeholder="e.g., Completed, Attended, Participated"
                        value={uploadData.sessionDetails.completionStatus}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          sessionDetails: { ...prev.sessionDetails, completionStatus: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-date" className="text-sm font-medium">Session Date</Label>
                    <Input
                      id="session-date"
                      type="date"
                      value={uploadData.issueDate}
                      onChange={(e) => setUploadData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="h-9"
                    />
                  </div>
                </>
              )}

              {uploadData.recordType === 'certifications' && (
                <>
                  {/* Certification Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-title" className="text-sm font-medium">Certificate Name *</Label>
                      <Input
                        id="cert-title"
                        placeholder="e.g., AWS Cloud Practitioner"
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cert-issuer" className="text-sm font-medium">Issuing Organization *</Label>
                      <Input
                        id="cert-issuer"
                        placeholder="e.g., Amazon Web Services"
                        value={uploadData.issuer}
                        onChange={(e) => setUploadData(prev => ({ ...prev, issuer: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credential-id" className="text-sm font-medium">Credential ID</Label>
                      <Input
                        id="credential-id"
                        placeholder="e.g., AWS-CP-2024-001234"
                        value={uploadData.credentialId}
                        onChange={(e) => setUploadData(prev => ({ ...prev, credentialId: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="issue-date" className="text-sm font-medium">Issue Date</Label>
                      <Input
                        id="issue-date"
                        type="date"
                        value={uploadData.issueDate}
                        onChange={(e) => setUploadData(prev => ({ ...prev, issueDate: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                  </div>
                </>
              )}

              {uploadData.recordType === 'events' && (
                <>
                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title" className="text-sm font-medium">Event Name *</Label>
                      <Input
                        id="event-title"
                        placeholder="e.g., Smart India Hackathon 2024"
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-organizer" className="text-sm font-medium">Organized By *</Label>
                      <Input
                        id="event-organizer"
                        placeholder="e.g., Government of India, Tech Corp"
                        value={uploadData.issuer}
                        onChange={(e) => setUploadData(prev => ({ ...prev, issuer: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-type" className="text-sm font-medium">Event Type</Label>
                      <Input
                        id="event-type"
                        placeholder="e.g., Hackathon, Competition, Conference"
                        value={uploadData.eventDetails.eventType}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          eventDetails: { ...prev.eventDetails, eventType: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-role" className="text-sm font-medium">Your Role</Label>
                      <Input
                        id="event-role"
                        placeholder="e.g., Participant, Winner, Speaker, Volunteer"
                        value={uploadData.eventDetails.role}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          eventDetails: { ...prev.eventDetails, role: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="achievement" className="text-sm font-medium">Achievement/Result</Label>
                      <Input
                        id="achievement"
                        placeholder="e.g., 1st Place, Best Innovation, Certificate of Participation"
                        value={uploadData.eventDetails.achievement}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          eventDetails: { ...prev.eventDetails, achievement: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-location" className="text-sm font-medium">Location</Label>
                      <Input
                        id="event-location"
                        placeholder="e.g., New Delhi, Online, IIT Mumbai"
                        value={uploadData.eventDetails.location}
                        onChange={(e) => setUploadData(prev => ({ 
                          ...prev, 
                          eventDetails: { ...prev.eventDetails, location: e.target.value }
                        }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-date" className="text-sm font-medium">Event Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={uploadData.issueDate}
                      onChange={(e) => setUploadData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="h-9"
                    />
                  </div>
                </>
              )}

              {uploadData.recordType === 'others' && (
                <>
                  {/* Other Record Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="record-title" className="text-sm font-medium">Record Title *</Label>
                      <Input
                        id="record-title"
                        placeholder="e.g., Research Publication, Volunteer Work"
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="record-source" className="text-sm font-medium">Source/Organization *</Label>
                      <Input
                        id="record-source"
                        placeholder="e.g., IEEE, NGO Name, Research Lab"
                        value={uploadData.issuer}
                        onChange={(e) => setUploadData(prev => ({ ...prev, issuer: e.target.value }))}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="record-date" className="text-sm font-medium">Date</Label>
                    <Input
                      id="record-date"
                      type="date"
                      value={uploadData.issueDate}
                      onChange={(e) => setUploadData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="h-9"
                    />
                  </div>
                </>
              )}

              {/* Common Optional Fields */}
              {uploadData.recordType === 'certifications' && (
                <div className="space-y-2">
                  <Label htmlFor="valid-until" className="text-sm font-medium">Valid Until (Optional)</Label>
                  <Input
                    id="valid-until"
                    type="date"
                    value={uploadData.validUntil}
                    onChange={(e) => setUploadData(prev => ({ ...prev, validUntil: e.target.value }))}
                    className="h-9"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium">
                  {uploadData.recordType === 'sessions' ? 'Topics/Skills Learned (Optional)' :
                   uploadData.recordType === 'events' ? 'Skills/Technologies Used (Optional)' :
                   'Skills/Topics (Optional)'}
                </Label>
                <Input
                  id="skills"
                  placeholder={
                    uploadData.recordType === 'sessions' ? 'e.g., Machine Learning, Python, AI Ethics' :
                    uploadData.recordType === 'events' ? 'e.g., React, Node.js, Team Leadership' :
                    uploadData.recordType === 'certifications' ? 'e.g., Cloud Computing, Security, Networking' :
                    'e.g., Research, Writing, Analysis'
                  }
                  value={uploadData.skills}
                  onChange={(e) => setUploadData(prev => ({ ...prev, skills: e.target.value }))}
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder={
                    uploadData.recordType === 'sessions' ? 'Brief description of what you learned in this session...' :
                    uploadData.recordType === 'events' ? 'Describe your experience, project details, or achievements...' :
                    uploadData.recordType === 'certifications' ? 'Brief description of what this certificate covers...' :
                    'Brief description of this record...'
                  }
                  value={uploadData.description}
                  onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">Verification Process</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {uploadData.recordType === 'certifications' ? 
                        'Certification records will undergo verification with the issuing organization.' :
                        'All records are reviewed for authenticity and completeness.'
                      } This process typically takes 24-48 hours. You'll receive an email notification once verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Dialog Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsUploadOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadSubmit}
              disabled={!uploadData.title || !uploadData.issuer || (uploadData.recordType === 'certifications' && !uploadData.credentialId)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit for Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
