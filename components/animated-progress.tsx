"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showValue?: boolean
  color?: "blue" | "green" | "orange" | "red" | "purple"
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  purple: "from-purple-500 to-purple-600",
}

export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  showValue = true,
  color = "blue",
}: AnimatedProgressProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const percentage = (value / max) * 100

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
      {showValue && (
        <motion.div
          className="absolute right-0 -top-6 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.div>
      )}
    </div>
  )
}
