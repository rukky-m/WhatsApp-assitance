import React from 'react'

interface ProgressProps {
  value: number // 0-100
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={`w-full bg-muted rounded-full h-2 overflow-hidden ${className || ''}`}>
      <div
        className="bg-primary h-full transition-width duration-300 ease-in-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
