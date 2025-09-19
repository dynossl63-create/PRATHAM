"use client"

import type React from "react"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimationWrapperProps {
  children: React.ReactNode
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "rotate"
    | "bounce"
    | "float"
    | "pulse"
    | "glow"
  delay?: number
  duration?: number
  className?: string
  stagger?: boolean
  hover?: boolean
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 60 }, // increased movement for more visibility
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 }, // increased movement for more visibility
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
  slideRight: {
    initial: { opacity: 0, x: -60 }, // increased movement for more visibility
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.7 }, // more dramatic scale for visibility
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -15 }, // increased rotation for more visibility
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 15 },
  },
  bounce: {
    initial: { opacity: 0, y: -30 }, // increased bounce for more visibility
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  float: {
    initial: { opacity: 0, y: 30 }, // increased float for more visibility
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  pulse: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  glow: {
    initial: { opacity: 0, filter: "brightness(0.5)" },
    animate: { opacity: 1, filter: "brightness(1)" },
    exit: { opacity: 0, filter: "brightness(0.5)" },
  },
}

export function AnimationWrapper({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.8, // increased default duration for more noticeable animations
  className = "",
  stagger = false,
  hover = false,
}: AnimationWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" }) // reduced margin for earlier trigger
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  const hoverEffects = hover
    ? {
        whileHover: {
          scale: 1.05, // increased scale for more noticeable hover
          y: -5, // increased lift for more visibility
          rotateX: 2, // added subtle 3D tilt
          transition: { duration: 0.3, ease: "easeOut" },
        },
        whileTap: { scale: 0.95 }, // more dramatic tap effect
      }
    : {}

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={controls}
      exit="exit"
      variants={animations[animation]}
      transition={{
        duration,
        delay: stagger ? delay : delay,
        ease: [0.25, 0.46, 0.45, 0.94], // smoother easing for better feel
        type: "spring", // added spring physics for more natural movement
        stiffness: 100,
        damping: 15,
      }}
      {...hoverEffects}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.15, // increased stagger delay for more noticeable effect
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-5, 5, -5],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseHighlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0)",
          "0 0 0 10px rgba(59, 130, 246, 0.1)",
          "0 0 0 0 rgba(59, 130, 246, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
