"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "student" | "admin" | "government"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  organization?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: UserRole) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users for demonstration
  const mockUsers: Record<string, User> = {
    "student@university.edu": {
      id: "1",
      name: "Naman Shah",
      email: "student@university.edu",
      role: "student",
      organization: "Tech University",
    },
    "admin@university.edu": {
      id: "2",
      name: "Dr. Soumya Bajaj",
      email: "admin@university.edu",
      role: "admin",
      organization: "Tech University",
    },
    "gov@education.gov": {
      id: "3",
      name: "Ministry Dashboard",
      email: "gov@education.gov",
      role: "government",
      organization: "Department of Education",
    },
  }

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("pratham_user") // Updated localStorage key to pratham
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers[email]
    if (foundUser && password === "demo123") {
      setUser(foundUser)
      localStorage.setItem("pratham_user", JSON.stringify(foundUser)) // Updated localStorage key to pratham
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pratham_user") // Updated localStorage key to pratham
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("pratham_user", JSON.stringify(updatedUser)) // Updated localStorage key to pratham
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>{children}</AuthContext.Provider>
}
