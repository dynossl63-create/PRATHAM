"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, GraduationCap, Building2, Search, Bell, Moon, Sun, Menu, X, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { HelpCenter } from "@/components/help-center"
import { NotificationCenter } from "@/components/notification-center"
import { motion, AnimatePresence } from "framer-motion"
import { FloatingParticles } from "@/components/floating-particles"
import { MorphingBackground } from "@/components/morphing-background"

type UserRole = "student" | "admin" | "government"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const { user, logout, switchRole } = useAuth()

  if (!user) return null

  const roleConfig = {
    student: {
      title: "Student Dashboard",
      icon: User,
      color: "bg-primary",
      subtitle: "Computer Science Student",
      profileName: "Naman Shah",
    },
    admin: {
      title: "University Admin",
      icon: Building2,
      color: "bg-secondary",
      subtitle: "Academic Administrator",
      profileName: "University Admin",
    },
    government: {
      title: "StakeHolder",
      icon: GraduationCap,
      color: "bg-accent",
      subtitle: "Education Analytics",
      profileName: "StakeHolder",
    },
  }

  const config = roleConfig[user.role]

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <MorphingBackground />
      <FloatingParticles count={15} />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-40 h-screen w-64"
          >
            <div className="h-full glass border-r border-border/50 backdrop-blur-xl">
              <div className="flex h-full flex-col">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between p-6 border-b border-border/50"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`p-2 rounded-xl ${config.color} neon-glow`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <config.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <motion.h2
                        className="font-playfair font-bold text-lg text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        PRATHAM
                      </motion.h2>
                      <motion.p
                        className="text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {config.title}
                      </motion.p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>

                {/* User Profile */}
                <motion.div
                  className="p-6 border-b border-border/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className={`${config.color} text-white font-semibold`}>
                          {config.profileName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{config.profileName}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.organization}</p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                      >
                        <Badge variant="outline" className="text-xs mt-1 capitalize text-foreground">
                          {user.role}
                        </Badge>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Role Switcher */}
                <motion.div
                  className="p-6 border-b border-border/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm font-medium text-muted-foreground mb-3">Switch Role</p>
                  <div className="space-y-2">
                    {Object.entries(roleConfig).map(([role, roleData], index) => (
                      <motion.div
                        key={role}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Button
                          variant={user.role === role ? "default" : "ghost"}
                          size="sm"
                          onClick={() => handleRoleSwitch(role as UserRole)}
                          className="w-full justify-start transition-all duration-200 hover:scale-105"
                        >
                          <roleData.icon className="h-4 w-4 mr-2" />
                          {roleData.title}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">{/* Navigation content will be rendered here */}</div>
                </div>

                {/* Footer */}
                <motion.div
                  className="p-6 border-t border-border/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="ghost" size="sm" onClick={logout}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.div
        className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}
        animate={{
          marginLeft: sidebarOpen ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? 256 : 0) : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Top Bar */}
        <motion.header
          className="sticky top-0 z-40 glass border-b border-border/50 backdrop-blur-xl"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.h1
                className="font-playfair font-bold text-2xl text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {config.title}
              </motion.h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.div
                className="relative hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search achievements, events..."
                  className="pl-10 pr-4 py-2 w-64 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm transition-all duration-200 focus:scale-105"
                />
              </motion.div>

              <HelpCenter />

              {/* Notifications */}
              <NotificationCenter />

              {/* User Menu */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs font-semibold">
                      {config.profileName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{config.profileName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.main
          className="p-6 min-h-[calc(100vh-80px)] overflow-x-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="max-w-full">{children}</div>
        </motion.main>
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
