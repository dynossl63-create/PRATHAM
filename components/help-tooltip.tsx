"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HelpTooltipProps {
  content: string
  title?: string
  side?: "top" | "right" | "bottom" | "left"
}

export function HelpTooltip({ content, title, side = "top" }: HelpTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 w-5 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 rounded-full"
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <HelpCircle className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent 
        side={side} 
        sideOffset={8}
        className="max-w-xs p-3 bg-popover border border-border/50 shadow-lg backdrop-blur-sm z-[60]"
      >
        {title && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold mb-1 text-popover-foreground"
          >
            {title}
          </motion.div>
        )}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: title ? 0.1 : 0 }}
          className="text-sm text-popover-foreground/80 leading-relaxed"
        >
          {content}
        </motion.div>
      </TooltipContent>
    </Tooltip>
  )
}
