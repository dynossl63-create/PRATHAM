"use client"

import type React from "react"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { type ReactNode, useRef } from "react"

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  tiltEffect?: boolean
  pulseOnHover?: boolean
}

export function EnhancedCard({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.3)",
  tiltEffect = true,
  pulseOnHover = false,
}: EnhancedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} cursor-pointer`}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: `0 20px 40px ${glowColor}`,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      animate={
        pulseOnHover
          ? {
              boxShadow: [`0 0 0px ${glowColor}`, `0 0 20px ${glowColor}`, `0 0 0px ${glowColor}`],
            }
          : {}
      }
      transition={{
        boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      <Card className="glass border-border/50 backdrop-blur-xl h-full">{children}</Card>
    </motion.div>
  )
}
