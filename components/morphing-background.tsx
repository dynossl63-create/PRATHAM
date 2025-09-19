"use client"

import { motion } from "framer-motion"

export function MorphingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 60% 60%, rgba(255, 200, 87, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(87, 255, 200, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(200, 87, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(255, 200, 87, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
