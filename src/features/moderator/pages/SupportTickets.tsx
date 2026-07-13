import { useState, useMemo } from 'react'
import { MessageSquare, CheckCircle2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge, SearchInput, Avatar } from '@/components/ui'
import { cn } from '@/utils/cn'

type Priority = 'low' | 'medium' | 'high' | 'urgent'
type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

interface Ticket {
  id: string
  subject: string
  user: string
  email: string
  priority: Priority
  status: TicketStatus
  category: string
  created: string
  lastReply: string
  messages: number
}

const seed: Ticket[] = [
  {
    id: 'TKT-221',
    subject: 'AI reply was incorrect about pricing',
    user: 'Maya Ibrahim',
    email: 'maya@example.com',
    priority: 'high',
    status: 'open',
    category: 'AI Accuracy',
    created: '2026-07-07',
    lastReply: '10m ago',
    messages: 3,
  },
  {
    id: 'TKT-220',
    subject: 'Cannot receive messages on new number',
    user: 'Noah Trends',
    email: 'noah@trends.ae',
    priority: 'urgent',
    status: 'in_progress',
    category: 'Technical',
    created: '2026-07-06',
    lastReply: '1h ago',
    messages: 7,
  },
  {
    id: 'TKT-219',
    subject: 'Scheduled message was sent twice',
    user: 'Aisha Kareem',
    email: 'aisha@example.com',
    priority: 'medium',
    status: 'resolved',
    category: 'Scheduler',
    created: '2026-07-05',
    lastReply: '3h ago',
    messages: 5,
  },
  {
    id: 'TKT-218',
    subject: 'Bulk import contacts not working',
    user: 'Omar Electronics',
    email: 'omar@elec.ae',
    priority: 'high',
    status: 'open',
    category: 'Contacts',
    created: '2026-07-05',
    lastReply: '2h ago',
    messages: 2,
  },
  {
    id: 'TKT-217',
    subject: 'API webhook not triggering on message receive',
    user: 'Metro Logistics',
    email: 'ops@metro.com',
    priority: 'urgent',
    status: 'in_progress',
    category: 'API',
    created: '2026-07-04',
    lastReply: '30m ago',
    messages: 9,
  },
  {
    id: 'TKT-216',
    subject: 'Billing invoice missing for June',
    user: 'Lina Boutique',
    email: 'lina@boutique.eg',
    priority: 'low',
    status: 'resolved',
    category: 'Billing',
    created: '2026-07-03',
    lastReply: '1d ago',
    messages: 4,
  },
  {
    id: 'TKT-215',
    subject: 'User cannot log in after password reset',
    user: 'Nour Pharmacy',
    email: 'nour@pharmacy.com',
    priority: 'high',
    status: 'closed',
    category: 'Authentication',
    created: '2026-07-02',
    lastReply: '2d ago',
    messages: 6,
  },
]

const priorityBadge: Record<Priority, React.ReactNode> = {
  low: (
    <Badge variant="secondary" size="sm">
      Low
    </Badge>
  ),
  medium: (
    <Badge variant="info" size="sm">
      Medium
    </Badge>
  ),
  high: (
    <Badge variant="warning" size="sm">
      High
    </Badge>
  ),
  urgent: (
    <Badge variant="destructive" size="sm">
      Urgent
    </Badge>
  ),
}

const statusBadge: Record<TicketStatus, React.ReactNode> = {
  open: (
    <Badge variant="warning" dot size="sm">
      Open
    </Badge>
  ),
  in_progress: (
    <Badge variant="info" dot size="sm">
      In Progress
    </Badge>
  ),
  resolved: (
    <Badge variant="success" dot size="sm">
      Resolved
    </Badge>
  ),
  closed: (
    <Badge variant="secondary" dot size="sm">
      Closed
    </Badge>
  ),
}

export const SupportTickets = () => {
  const [tickets, setTickets] = useState(seed)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [selected, setSelected] = useState<Ticket | null>(null)
  const [reply, setReply] = useState('')

  const filtered = useMemo(
    () =>
      tickets.filter((t) => {
        const matchSearch =
          !search ||
          t.subject.toLowerCase().includes(search.toLowerCase()) ||
          t.user.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || t.status === statusFilter
        return matchSearch && matchStatus
      }),
    [tickets, search, statusFilter]
  )

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim() || !selected) return
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              status: 'in_progress',
              messages: t.messages + 1,
              lastReply: 'Just now',
            }
          : t
      )
    )
    setReply('')
    toast.success('Reply sent.')
  }

  const updateStatus = (id: string, status: TicketStatus) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    if (selected?.id === id) setSelected((s) => (s ? { ...s, status } : s))
    toast.success(`Ticket ${status}.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Support Tickets
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage and respond to user support requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: 'Open',
            value: tickets.filter((t) => t.status === 'open').length,
            color: 'text-amber-500',
          },
          {
            label: 'In Progress',
            value: tickets.filter((t) => t.status === 'in_progress').length,
            color: 'text-blue-500',
          },
          {
            label: 'Resolved Today',
            value: tickets.filter((t) => t.status === 'resolved').length,
            color: 'text-emerald-500',
          },
          {
            label: 'Urgent',
            value: tickets.filter((t) => t.priority === 'urgent').length,
            color: 'text-destructive',
          },
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

      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        {/* Ticket list */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search tickets..."
              containerClassName="w-60"
            />
            <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
              {(
                ['all', 'open', 'in_progress', 'resolved', 'closed'] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-md text-xs font-medium capitalize transition-all whitespace-nowrap',
                    statusFilter === s
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelected(ticket)}
                className={cn(
                  'w-full text-left rounded-xl border p-4 transition-all',
                  selected?.id === ticket.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background hover:bg-muted/30'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {ticket.id}
                      </span>
                      {priorityBadge[ticket.priority]}
                      {statusBadge[ticket.status]}
                    </div>
                    <p className="font-medium text-sm text-foreground truncate">
                      {ticket.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {ticket.user} · {ticket.category} · {ticket.messages}{' '}
                      messages
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {ticket.lastReply}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket detail */}
        {selected ? (
          <div className="rounded-xl border border-border bg-background shadow-sm flex flex-col h-fit">
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {selected.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selected.id} · {selected.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {priorityBadge[selected.priority]}
                {statusBadge[selected.status]}
              </div>
            </div>
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar name={selected.user} size="sm" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {selected.user}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selected.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Conversation ({selected.messages} messages)
              </p>
              <div className="rounded-lg bg-muted/40 p-3 text-sm text-foreground">
                <p className="font-medium text-xs text-muted-foreground mb-1">
                  {selected.user}
                </p>
                This is the initial support message regarding:{' '}
                {selected.subject.toLowerCase()}.
              </div>
            </div>
            <form
              onSubmit={handleReply}
              className="p-4 border-t border-border space-y-2"
            >
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={3}
                placeholder="Write a reply..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  <MessageSquare size={12} /> Reply
                </button>
                {selected.status !== 'resolved' && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selected.id, 'resolved')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <CheckCircle2 size={12} /> Resolve
                  </button>
                )}
                {selected.status !== 'closed' && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selected.id, 'closed')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={12} /> Close
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 flex items-center justify-center text-sm text-muted-foreground">
            Select a ticket to view details
          </div>
        )}
      </div>
    </div>
  )
}
