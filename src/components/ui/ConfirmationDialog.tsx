import * as React from 'react'
import { AlertTriangle, CheckCircle2, Info, Trash2 } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'
import { cn } from '@/utils/cn'

export type ConfirmationVariant = 'danger' | 'warning' | 'success' | 'info'

export interface ConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmationVariant
  isLoading?: boolean
}

const variantConfig: Record<
  ConfirmationVariant,
  {
    icon: React.ReactNode
    iconBg: string
    confirmClass: string
  }
> = {
  danger: {
    icon: <Trash2 className="h-6 w-6 text-destructive" />,
    iconBg: 'bg-destructive/10',
    confirmClass:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    confirmClass: 'bg-amber-600 text-white hover:bg-amber-700',
  },
  success: {
    icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    confirmClass: 'bg-emerald-600 text-white hover:bg-emerald-700',
  },
  info: {
    icon: <Info className="h-6 w-6 text-blue-600" />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    confirmClass: 'bg-blue-600 text-white hover:bg-blue-700',
  },
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const config = variantConfig[variant]

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <button
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium',
              'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              config.confirmClass
            )}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Processing...
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center pt-4">
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full mb-4',
            config.iconBg
          )}
        >
          {config.icon}
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </Modal>
  )
}

export { ConfirmationDialog }
