"use client"

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  highlightColor?: string
  showPulse?: boolean
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  highlightColor = "text-primary",
  showPulse = false,
}: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (latest > value * 0.8) {
            // Trigger highlight effect when near completion
          }
        },
      })
      return controls.stop
    }
  }, [count, value, duration, isInView])

  return (
    <motion.span
      ref={ref}
      className={`${className} ${highlightColor}`}
      animate={
        isInView
          ? {
              scale: [1, 1.1, 1],
              textShadow: showPulse
                ? ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
                : undefined,
            }
          : {}
      }
      transition={{
        scale: { duration: duration, ease: "easeInOut" },
        textShadow: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      {prefix}
      <motion.span
        animate={
          isInView
            ? {
                y: [10, 0],
                opacity: [0, 1],
              }
            : {}
        }
        transition={{ duration: 0.5, delay: duration * 0.8 }}
      >
        {rounded}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

export function CounterWithGlow({
  value,
  label,
  className = "",
  size = "default",
}: {
  value: number
  label: string
  className?: string
  size?: "small" | "default" | "large"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const sizeClasses = {
    small: "text-2xl",
    default: "text-4xl",
    large: "text-6xl",
  }

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <motion.div
        className={`font-bold ${sizeClasses[size]} text-primary mb-2`}
        animate={
          isInView
            ? {
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <AnimatedCounter value={value} duration={2} showPulse />
      </motion.div>
      <motion.p
        className="text-muted-foreground text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}
