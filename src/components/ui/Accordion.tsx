import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface AccordionItem {
  key: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpenKeys?: string[]
  className?: string
  itemClassName?: string
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultOpenKeys = [],
  className,
  itemClassName,
}) => {
  const [openKeys, setOpenKeys] = React.useState<Set<string>>(
    new Set(defaultOpenKeys)
  )

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        if (type === 'single') next.clear()
        next.add(key)
      }
      return next
    })
  }

  return (
    <div
      className={cn(
        'w-full divide-y divide-border rounded-lg border border-border',
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openKeys.has(item.key)

        return (
          <div key={item.key} className={cn('', itemClassName)}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.key)}
              className={cn(
                'flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium transition-colors',
                'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                isOpen ? 'text-foreground' : 'text-muted-foreground',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.key}`}
              id={`accordion-trigger-${item.key}`}
            >
              <span className="flex items-center gap-2">
                {item.icon && (
                  <span className="shrink-0 text-muted-foreground">
                    {item.icon}
                  </span>
                )}
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 ml-4 text-muted-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.key}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.key}`}
                  key={`panel-${item.key}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export { Accordion }
