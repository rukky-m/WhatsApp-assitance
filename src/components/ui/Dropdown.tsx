import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useClickOutside } from '@/hooks/useClickOutside'

export interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  separator?: never
}

export interface DropdownSeparator {
  separator: true
  label?: never
  icon?: never
  onClick?: never
  href?: never
  variant?: never
  disabled?: never
}

export type DropdownMenuItem = DropdownItem | DropdownSeparator

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  align?: 'left' | 'right'
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'left',
  className,
}) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              'absolute z-50 mt-2 min-w-[10rem] rounded-lg border border-border bg-popover text-popover-foreground shadow-lg',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            <div className="py-1">
              {items.map((item, idx) => {
                if ('separator' in item && item.separator) {
                  return (
                    <div
                      key={`sep-${idx}`}
                      className="my-1 h-px bg-border"
                      role="separator"
                    />
                  )
                }

                const menuItem = item as DropdownItem
                const content = (
                  <>
                    {menuItem.icon && (
                      <span className="mr-2 flex shrink-0 items-center">
                        {menuItem.icon}
                      </span>
                    )}
                    {menuItem.label}
                  </>
                )

                const commonClass = cn(
                  'flex w-full items-center px-3 py-2 text-sm transition-colors',
                  menuItem.variant === 'destructive'
                    ? 'text-destructive hover:bg-destructive/10'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                  menuItem.disabled &&
                    'cursor-not-allowed opacity-50 pointer-events-none'
                )

                return menuItem.href && !menuItem.disabled ? (
                  <a
                    key={idx}
                    href={menuItem.href}
                    className={commonClass}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={idx}
                    className={commonClass}
                    role="menuitem"
                    disabled={menuItem.disabled}
                    onClick={() => {
                      if (!menuItem.disabled) {
                        menuItem.onClick?.()
                        setOpen(false)
                      }
                    }}
                  >
                    {content}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Dropdown }
