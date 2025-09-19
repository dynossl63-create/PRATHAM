"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, CheckCircle2, AlertCircle, Info, Calendar, Award, Users, Trash2, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

interface Notification {
  id: string
  type: "achievement" | "event" | "system" | "alert" | "reminder"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  actionText?: string
}

const notificationIcons = {
  achievement: Award,
  event: Calendar,
  system: Settings,
  alert: AlertCircle,
  reminder: Info,
}

const notificationColors = {
  achievement: "bg-green-500/10 text-green-600 border-green-500/20",
  event: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  system: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  alert: "bg-red-500/10 text-red-600 border-red-500/20",
  reminder: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { user } = useAuth()

  // Sample notifications based on user role
  useEffect(() => {
    if (!user) return

    const generateNotifications = (): Notification[] => {
      const baseNotifications: Notification[] = [
        {
          id: "1",
          type: "achievement",
          title: "New Certificate Verified!",
          message: "Your Machine Learning Certification has been successfully verified and added to your portfolio.",
          timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
          read: false,
          priority: "high",
          actionUrl: "/certificates",
          actionText: "View Certificate"
        },
        {
          id: "2",
          type: "event",
          title: "Upcoming Workshop",
          message: "AI & Ethics Workshop starts in 2 hours. Don't forget to join!",
          timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
          read: false,
          priority: "medium",
          actionUrl: "/events",
          actionText: "Join Workshop"
        },
        {
          id: "3",
          type: "system",
          title: "Portfolio Updated",
          message: "Your digital portfolio has been automatically updated with recent achievements.",
          timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
          read: true,
          priority: "low",
          actionUrl: "/portfolio",
          actionText: "View Portfolio"
        }
      ]

      // Role-specific notifications
      if (user.role === "student") {
        return [
          ...baseNotifications,
          {
            id: "4",
            type: "reminder",
            title: "Achievement Score Updated",
            message: "Your score increased by 150 points! You're now ranked #3 in your department.",
            timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
            read: false,
            priority: "medium",
            actionUrl: "/dashboard",
            actionText: "View Ranking"
          },
          {
            id: "5",
            type: "event",
            title: "New Opportunity Available",
            message: "Google Summer of Code application deadline is approaching. Apply now!",
            timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
            read: true,
            priority: "high",
            actionUrl: "/opportunities",
            actionText: "Apply Now"
          }
        ]
      } else if (user.role === "admin") {
        return [
          ...baseNotifications,
          {
            id: "4",
            type: "alert",
            title: "Compliance Alert",
            message: "NAAC accreditation score dropped below threshold. Immediate attention required.",
            timestamp: new Date(Date.now() - 1 * 60 * 60000), // 1 hour ago
            read: false,
            priority: "high",
            actionUrl: "/compliance",
            actionText: "Review Compliance"
          },
          {
            id: "5",
            type: "system",
            title: "Monthly Report Ready",
            message: "Student engagement analytics report for March is now available.",
            timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
            read: false,
            priority: "medium",
            actionUrl: "/reports",
            actionText: "View Report"
          },
          {
            id: "6",
            type: "reminder",
            title: "Faculty Meeting",
            message: "Department head meeting scheduled for tomorrow at 10 AM.",
            timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
            read: true,
            priority: "medium"
          }
        ]
      } else if (user.role === "government") {
        return [
          ...baseNotifications,
          {
            id: "4",
            type: "alert",
            title: "Regional Analysis Complete",
            message: "Education quality assessment for Northern Region has been completed.",
            timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
            read: false,
            priority: "high",
            actionUrl: "/regional-analysis",
            actionText: "View Analysis"
          },
          {
            id: "5",
            type: "system",
            title: "Policy Impact Update",
            message: "New education policy showing positive impact on student engagement metrics.",
            timestamp: new Date(Date.now() - 5 * 60 * 60000), // 5 hours ago
            read: false,
            priority: "medium",
            actionUrl: "/policy-impact",
            actionText: "View Impact"
          }
        ]
      }

      return baseNotifications
    }

    setNotifications(generateNotifications())
  }, [user])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length
  const highPriorityCount = notifications.filter(n => !n.read && n.priority === "high").length
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button 
          ref={buttonRef}
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={() => {
            if (!isOpen && buttonRef.current) {
              const rect = buttonRef.current.getBoundingClientRect()
              const viewportWidth = window.innerWidth
              const viewportHeight = window.innerHeight
              const isMobile = viewportWidth < 640 // sm breakpoint
              const dropdownWidth = isMobile ? viewportWidth - 32 : 384 // w-96 = 24rem = 384px
              
              // Calculate horizontal position
              let rightPos = isMobile ? 16 : viewportWidth - rect.right
              if (!isMobile && rightPos + dropdownWidth > viewportWidth) {
                rightPos = Math.max(16, viewportWidth - dropdownWidth - 16) // 16px margin
              }
              
              // Calculate vertical position
              let topPos = rect.bottom + 8
              const maxDropdownHeight = 400 // approximate max height
              if (topPos + maxDropdownHeight > viewportHeight) {
                topPos = Math.max(16, rect.top - maxDropdownHeight - 8)
              }
              
              setDropdownPosition({
                top: topPos,
                right: rightPos
              })
            }
            setIsOpen(!isOpen)
          }}
        >
          <motion.div
            animate={unreadCount > 0 ? {
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: unreadCount > 0 ? Infinity : 0,
              repeatDelay: 3
            }}
          >
            <Bell className={`h-5 w-5 ${unreadCount > 0 ? 'text-primary' : ''}`} />
          </motion.div>
          
          {/* Notification Badge */}
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="absolute -top-1 -right-1"
              >
                <Badge 
                  variant={highPriorityCount > 0 ? "destructive" : "default"} 
                  className="h-5 w-5 p-0 text-xs border-0 font-semibold"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed w-96 max-w-[calc(100vw-2rem)] z-[9999] sm:w-96 w-[calc(100vw-2rem)]"
            style={{
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`
            }}
          >
            <Card className="bg-white/96 border-gray-200 shadow-2xl backdrop-blur-xl drop-shadow-2xl border-2">
              <div className="p-4 border-b border-gray-200 bg-white/95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto bg-white/90">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground bg-white/90">
                    <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {notifications
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((notification, index) => {
                        const IconComponent = notificationIcons[notification.type]
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              !notification.read 
                                ? 'bg-white/90 border border-primary/20 hover:bg-white/95 shadow-sm' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${notificationColors[notification.type]} shrink-0`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className={`text-sm font-medium truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2 ml-2">
                                    {notification.priority === "high" && !notification.read && (
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                    <span className="text-xs text-muted-foreground shrink-0">
                                      {getTimeAgo(notification.timestamp)}
                                    </span>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                                  {notification.message}
                                </p>

                                <div className="flex items-center justify-between">
                                  {notification.actionUrl && notification.actionText && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-xs h-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Handle navigation to actionUrl
                                        console.log("Navigate to:", notification.actionUrl)
                                      }}
                                    >
                                      {notification.actionText}
                                    </Button>
                                  )}
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6 ml-auto"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 text-center bg-white/95">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs w-full"
                    onClick={() => {
                      setIsOpen(false)
                      // Navigate to full notifications page
                      console.log("Navigate to notifications page")
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}