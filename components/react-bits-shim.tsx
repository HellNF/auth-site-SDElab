"use client"

import * as React from "react"
import { motion } from "framer-motion"

type WithChildren<T = {}> = T & { children?: React.ReactNode }

// GradientText: renders children with a tailwind gradient text effect
export function GradientText({
  from = "blue-600",
  via,
  to = "pink-500",
  className = "",
  children,
}: WithChildren<{ from?: string; via?: string; to?: string; className?: string }>) {
  const gradient = via
    ? `bg-gradient-to-r from-${from} via-${via} to-${to}`
    : `bg-gradient-to-r from-${from} to-${to}`
  return (
    <span className={`${gradient} bg-clip-text text-transparent ${className}`}>{children}</span>
  )
}

// FadeInOnScroll: fades content in when scrolled into view
export function FadeInOnScroll({ children, className = "", duration = 0.5 }: WithChildren<{ className?: string; duration?: number }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  )
}

// AnimatedCard: subtle hover lift + smooth entry
export function AnimatedCard({ children, className = "", duration = 0.3 }: WithChildren<{ className?: string; duration?: number }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  )
}

// HoverEffect: small scale + glow on hover
export function HoverEffect({ children, className = "" }: WithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
