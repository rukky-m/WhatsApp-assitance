import * as React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

export interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | string
  onRetry?: () => void
  onGoHome?: () => void
  className?: string
  variant?: 'inline' | 'page'
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  error,
  onRetry,
  onGoHome,
  className,
  variant = 'inline',
}) => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : null

  if (variant === 'page') {
    return (
      <div
        className={cn(
          'min-h-screen flex flex-col items-center justify-center gap-6 p-4 text-center bg-background',
          className
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-sm">{description}</p>
          {errorMessage && (
            <p className="mt-2 text-xs text-muted-foreground font-mono bg-muted rounded px-2 py-1 inline-block">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {onRetry && (
            <Button onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {onGoHome && (
            <Button variant="outline" onClick={onGoHome}>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      {errorMessage && (
        <p className="mt-2 text-xs text-muted-foreground font-mono bg-muted rounded px-2 py-1">
          {errorMessage}
        </p>
      )}
      {onRetry && (
        <Button size="sm" className="mt-4" onClick={onRetry}>
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export { ErrorState }
