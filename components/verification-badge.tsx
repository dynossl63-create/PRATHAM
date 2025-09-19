"use client"

import { CheckCircle, Clock } from "lucide-react"

interface VerificationBadgeProps {
  verified: boolean
  className?: string
}

export function VerificationBadge({ verified, className = "" }: VerificationBadgeProps) {
  if (verified) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md shadow-sm ${className}`}
        style={{
          backgroundColor: "#166534 !important",
          color: "#ffffff !important",
          border: "1px solid #166534 !important",
          opacity: "1 !important",
          backdropFilter: "none !important",
          background: "#166534 !important",
        }}
      >
        <CheckCircle className="h-3 w-3" style={{ color: "#ffffff !important" }} />
        <span style={{ color: "#ffffff !important" }}>Verified</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md shadow-sm ${className}`}
      style={{
        backgroundColor: "#fef3c7 !important",
        color: "#92400e !important",
        border: "1px solid #f59e0b !important",
        opacity: "1 !important",
        backdropFilter: "none !important",
        background: "#fef3c7 !important",
      }}
    >
      <Clock className="h-3 w-3" style={{ color: "#92400e !important" }} />
      <span style={{ color: "#92400e !important" }}>Pending</span>
    </span>
  )
}
