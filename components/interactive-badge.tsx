"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

interface InteractiveBadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
  animate?: boolean
  glowEffect?: boolean
}

export function InteractiveBadge({
  children,
  variant = "default",
  className = "",
  animate = true,
  glowEffect = false,
}: InteractiveBadgeProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className={glowEffect ? "animate-pulse" : ""}
    >
      <Badge variant={variant} className={`${className} transition-all duration-200 cursor-pointer`}>
        {children}
      </Badge>
    </motion.div>
  )
}
