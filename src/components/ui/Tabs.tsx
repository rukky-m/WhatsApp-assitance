import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface TabItem {
  key: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeKey: string
  onChange: (key: string) => void
  variant?: 'default' | 'pills' | 'underline'
  className?: string
  panelClassName?: string
  children?: React.ReactNode
}

export interface TabPanelProps {
  tabKey: string
  activeKey: string
  children: React.ReactNode
  className?: string
}

const TabPanel: React.FC<TabPanelProps> = ({
  tabKey,
  activeKey,
  children,
  className,
}) => {
  if (tabKey !== activeKey) return null
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={className}
      role="tabpanel"
    >
      {children}
    </motion.div>
  )
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  onChange,
  variant = 'default',
  className,
  children,
}) => {
  const variantClasses = {
    default: 'flex gap-1 bg-muted p-1 rounded-lg',
    pills: 'flex gap-2',
    underline: 'flex gap-0 border-b border-border',
  }

  const buttonVariant = (item: TabItem) => {
    const isActive = activeKey === item.key

    if (variant === 'default') {
      return cn(
        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
        item.disabled && 'cursor-not-allowed opacity-50 pointer-events-none'
      )
    }

    if (variant === 'pills') {
      return cn(
        'flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        item.disabled && 'cursor-not-allowed opacity-50 pointer-events-none'
      )
    }

    // underline
    return cn(
      'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all',
      isActive
        ? 'border-primary text-primary'
        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground',
      item.disabled && 'cursor-not-allowed opacity-50 pointer-events-none'
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className={variantClasses[variant]} role="tablist" aria-label="Tabs">
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            aria-selected={activeKey === item.key}
            aria-controls={`tabpanel-${item.key}`}
            id={`tab-${item.key}`}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.key)}
            className={buttonVariant(item)}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && (
              <span
                className={cn(
                  'ml-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-semibold',
                  activeKey === item.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted-foreground/20 text-muted-foreground'
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

export { Tabs, TabPanel }
