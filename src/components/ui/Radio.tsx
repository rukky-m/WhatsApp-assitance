import * as React from 'react'
import { cn } from '@/utils/cn'

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  label?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  error?: string
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      label,
      options,
      value,
      defaultValue,
      onChange,
      error,
      className,
      orientation = 'vertical',
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        {label && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
        <div
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
          role="radiogroup"
          aria-label={label}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                'flex items-start gap-3 cursor-pointer',
                option.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={
                    value !== undefined ? value === option.value : undefined
                  }
                  defaultChecked={
                    defaultValue !== undefined
                      ? defaultValue === option.value
                      : undefined
                  }
                  disabled={option.disabled}
                  onChange={() => onChange?.(option.value)}
                  className={cn(
                    'peer h-4 w-4 shrink-0 rounded-full border border-primary appearance-none cursor-pointer',
                    'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'disabled:cursor-not-allowed',
                    'checked:border-4 checked:border-primary',
                    error && 'border-destructive'
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground leading-none">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
