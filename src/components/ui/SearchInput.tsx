import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  isLoading?: boolean
  containerClassName?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      isLoading,
      placeholder = 'Search...',
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative flex items-center', containerClassName)}>
        <span className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
          {isLoading ? (
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </span>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-8 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-search-cancel-button]:hidden',
            className
          )}
          {...props}
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('')
              onClear?.()
            }}
            className="absolute right-2.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
