import * as React from 'react'
import { cn } from '@/utils/cn'

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
  className?: string
  label?: string
}

const sizeClasses = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  default: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'default',
  className,
  label = 'Loading...',
}) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <div
        className={cn(
          'rounded-full border-current border-t-transparent animate-spin text-primary',
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Full page loading screen
const LoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
    <Spinner size="xl" />
    <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
  </div>
)

// Inline loading overlay
const LoadingOverlay: React.FC<{ message?: string }> = ({ message }) => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm rounded-lg">
    <Spinner size="lg" />
    {message && (
      <p className="text-sm font-medium text-foreground">{message}</p>
    )}
  </div>
)

export { Spinner, LoadingScreen, LoadingOverlay }
