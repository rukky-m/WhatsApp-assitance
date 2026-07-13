import { useState } from 'react'
import { AlertTriangle, CheckCircle2, X, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

type RiskLevel = 'low' | 'medium' | 'high'
type FlagStatus = 'pending' | 'reviewed' | 'dismissed'

interface FlaggedMessage {
  id: string
  user: string
  phone: string
  message: string
  aiReply: string
  risk: RiskLevel
  status: FlagStatus
  reason: string
  time: string
}

const seed: FlaggedMessage[] = [
  {
    id: 'F-91',
    user: 'Lina Boutique',
    phone: '+20 122 345 6789',
    message:
      'Please share your bank account details so we can process the refund immediately.',
    aiReply:
      'For security, refunds are processed only through our official portal. I can send you the secure link.',
    risk: 'high',
    status: 'pending',
    reason: 'Financial data request',
    time: '12m ago',
  },
  {
    id: 'F-90',
    user: 'Metro Logistics',
    phone: '+971 55 904 1133',
    message:
      "Give me 80% discount right now or I'll post negative reviews everywhere.",
    aiReply:
      'We value your feedback. Our best available discount is 15% for orders over $500.',
    risk: 'high',
    status: 'pending',
    reason: 'Threatening behaviour',
    time: '1h ago',
  },
  {
    id: 'F-89',
    user: 'Nour Pharmacy',
    phone: '+966 11 456 7890',
    message: "What's your home address? I'd like to meet in person.",
    aiReply:
      'Our business address is available on our website. For personal meetings, please book through our official scheduling system.',
    risk: 'medium',
    status: 'pending',
    reason: 'Privacy concern',
    time: '3h ago',
  },
  {
    id: 'F-88',
    user: 'Omar Electronics',
    phone: '+971 50 722 4422',
    message:
      'I want to cancel all 400 orders and get a full refund immediately.',
    aiReply:
      'I can initiate a cancellation request. Our team will review and process eligible refunds within 3-5 business days.',
    risk: 'medium',
    status: 'reviewed',
    reason: 'Bulk refund request',
    time: '5h ago',
  },
  {
    id: 'F-87',
    user: 'Aisha Kareem',
    phone: '+966 53 220 9111',
    message: 'Are you available 24/7 or just a bot?',
    aiReply:
      "I'm an AI assistant available 24/7! For complex issues, our human team responds during business hours.",
    risk: 'low',
    status: 'dismissed',
    reason: 'Bot detection inquiry',
    time: '1d ago',
  },
]

const riskConfig: Record<
  RiskLevel,
  { badge: React.ReactNode; border: string }
> = {
  high: {
    badge: <Badge variant="destructive">High Risk</Badge>,
    border: 'border-l-rose-400',
  },
  medium: {
    badge: <Badge variant="warning">Medium Risk</Badge>,
    border: 'border-l-amber-400',
  },
  low: {
    badge: <Badge variant="secondary">Low Risk</Badge>,
    border: 'border-l-slate-300',
  },
}

export const FlaggedMessages = () => {
  const [messages, setMessages] = useState(seed)
  const [filter, setFilter] = useState<FlagStatus | RiskLevel | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = messages.filter((m) => {
    if (filter === 'all') return true
    return m.status === filter || m.risk === filter
  })

  const updateStatus = (id: string, status: FlagStatus) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    toast.success(`Message ${status}.`)
  }

  const stats = {
    pending: messages.filter((m) => m.status === 'pending').length,
    reviewed: messages.filter((m) => m.status === 'reviewed').length,
    dismissed: messages.filter((m) => m.status === 'dismissed').length,
    high: messages.filter((m) => m.risk === 'high').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Flagged Messages
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review AI-flagged conversations that need human oversight.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: stats.pending, color: 'text-amber-500' },
          { label: 'Reviewed', value: stats.reviewed, color: 'text-blue-500' },
          {
            label: 'Dismissed',
            value: stats.dismissed,
            color: 'text-muted-foreground',
          },
          { label: 'High Risk', value: stats.high, color: 'text-destructive' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-background rounded-xl border border-border p-4 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-muted p-0.5 rounded-lg w-fit flex-wrap">
        {(
          [
            'all',
            'pending',
            'reviewed',
            'dismissed',
            'high',
            'medium',
            'low',
          ] as const
        ).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all',
              filter === f
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            No messages in this category.
          </div>
        )}
        {filtered.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            className={cn(
              'rounded-xl border-l-4 border border-border bg-background shadow-sm overflow-hidden',
              riskConfig[msg.risk].border
            )}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    size={14}
                    className={
                      msg.risk === 'high'
                        ? 'text-rose-500'
                        : msg.risk === 'medium'
                          ? 'text-amber-500'
                          : 'text-muted-foreground'
                    }
                  />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {msg.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {msg.phone} · {msg.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {riskConfig[msg.risk].badge}
                  <Badge
                    variant={
                      msg.status === 'reviewed'
                        ? 'info'
                        : msg.status === 'dismissed'
                          ? 'secondary'
                          : 'warning'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {msg.status}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {msg.reason}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 px-3 py-2">
                  <p className="text-xs font-medium text-rose-600 mb-1">
                    Customer message
                  </p>
                  <p className="text-sm text-foreground">"{msg.message}"</p>
                </div>
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 px-3 py-2">
                  <p className="text-xs font-medium text-emerald-600 mb-1">
                    AI suggested reply
                  </p>
                  <p className="text-sm text-foreground">"{msg.aiReply}"</p>
                </div>
              </div>

              {msg.status === 'pending' && (
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(msg.id, 'reviewed')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors"
                  >
                    <CheckCircle2 size={12} /> Approve Reply
                  </button>
                  <button
                    onClick={() => updateStatus(msg.id, 'dismissed')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:text-foreground transition-colors"
                  >
                    <X size={12} /> Dismiss
                  </button>
                  <button
                    onClick={() =>
                      setExpanded(expanded === msg.id ? null : msg.id)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors ml-auto"
                  >
                    <RefreshCw size={12} /> Edit Reply
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {expanded === msg.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="p-4">
                    <label className="text-xs font-medium text-foreground mb-1.5 block">
                      Edit reply before sending
                    </label>
                    <textarea
                      defaultValue={msg.aiReply}
                      rows={3}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          updateStatus(msg.id, 'reviewed')
                          setExpanded(null)
                        }}
                        className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                      >
                        Send Edited Reply
                      </button>
                      <button
                        onClick={() => setExpanded(null)}
                        className="px-4 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
