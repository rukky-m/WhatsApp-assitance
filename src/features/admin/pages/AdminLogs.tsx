import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge, SearchInput } from '@/components/ui'
import { cn } from '@/utils/cn'

type LogLevel = 'info' | 'warning' | 'error' | 'success' | 'critical'

interface AdminLog {
  id: string
  timestamp: string
  level: LogLevel
  actor: string
  action: string
  resource: string
  ip: string
  details: string
}

const seed: AdminLog[] = [
  {
    id: 'AL-2001',
    timestamp: '2026-07-07 15:44:01',
    level: 'critical',
    actor: 'System',
    action: 'Failed payment — subscription suspended',
    resource: 'User: Aisha Kareem (sub_007)',
    ip: '—',
    details: 'Payment declined 3 times, subscription moved to past_due.',
  },
  {
    id: 'AL-2000',
    timestamp: '2026-07-07 15:30:22',
    level: 'info',
    actor: 'Jordan Lee (Admin)',
    action: 'Updated platform AI threshold',
    resource: 'Setting: auto_approve_threshold → 92%',
    ip: '41.12.88.200',
    details: 'Changed from 90% to 92%.',
  },
  {
    id: 'AL-1999',
    timestamp: '2026-07-07 14:50:11',
    level: 'warning',
    actor: 'System',
    action: 'AI latency spike detected',
    resource: 'Model: GPT-4o',
    ip: '—',
    details: 'Average latency 3.4s — exceeded 3s threshold for 15 minutes.',
  },
  {
    id: 'AL-1998',
    timestamp: '2026-07-07 14:22:35',
    level: 'success',
    actor: 'Jordan Lee (Admin)',
    action: 'User plan upgraded',
    resource: 'User: Omar Electronics → Scale',
    ip: '41.12.88.200',
    details: 'Manual upgrade from Growth to Scale plan.',
  },
  {
    id: 'AL-1997',
    timestamp: '2026-07-07 14:00:08',
    level: 'error',
    actor: 'System',
    action: 'Webhook batch delivery failure',
    resource: '3 endpoints — Metro Logistics, TechFlow, RetailHub',
    ip: '—',
    details: 'Retry count exceeded. Manual investigation required.',
  },
  {
    id: 'AL-1996',
    timestamp: '2026-07-07 13:41:19',
    level: 'info',
    actor: 'Jordan Lee (Admin)',
    action: 'Moderator account created',
    resource: 'New mod: priya@example.com',
    ip: '41.12.88.200',
    details: '',
  },
  {
    id: 'AL-1995',
    timestamp: '2026-07-07 12:55:03',
    level: 'warning',
    actor: 'System',
    action: 'High message volume — approaching rate limit',
    resource: 'User: TechFlow Solutions',
    ip: '—',
    details: '94% of monthly AI message quota used. Upgrade recommended.',
  },
  {
    id: 'AL-1994',
    timestamp: '2026-07-07 11:30:44',
    level: 'success',
    actor: 'System',
    action: 'Nightly backup completed',
    resource: 'Snapshot: db_2026_07_07_0300',
    ip: '—',
    details: 'Backup size: 4.2 GB. Stored in S3.',
  },
  {
    id: 'AL-1993',
    timestamp: '2026-07-07 10:15:22',
    level: 'error',
    actor: 'System',
    action: 'AI model API key rate limit hit',
    resource: 'OpenAI key: prod_key_1',
    ip: '—',
    details: 'TPM limit exceeded. Queued 142 requests.',
  },
  {
    id: 'AL-1992',
    timestamp: '2026-07-07 09:00:00',
    level: 'info',
    actor: 'System',
    action: 'Platform daily report generated',
    resource: 'Report: 2026-07-07 daily stats',
    ip: '—',
    details: 'MRR: $25,300. New users: 2. Churn: 0.',
  },
]

const levelConfig: Record<LogLevel, { badge: React.ReactNode; dot: string }> = {
  info: {
    badge: (
      <Badge variant="info" size="sm">
        Info
      </Badge>
    ),
    dot: 'bg-blue-400',
  },
  warning: {
    badge: (
      <Badge variant="warning" size="sm">
        Warning
      </Badge>
    ),
    dot: 'bg-amber-400',
  },
  error: {
    badge: (
      <Badge variant="destructive" size="sm">
        Error
      </Badge>
    ),
    dot: 'bg-rose-400',
  },
  success: {
    badge: (
      <Badge variant="success" size="sm">
        Success
      </Badge>
    ),
    dot: 'bg-emerald-400',
  },
  critical: {
    badge: (
      <Badge variant="destructive" size="sm" className="bg-rose-700">
        Critical
      </Badge>
    ),
    dot: 'bg-rose-700',
  },
}

export const AdminLogs = () => {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      seed.filter((l) => {
        const q = search.toLowerCase()
        const matchSearch =
          !search ||
          l.action.toLowerCase().includes(q) ||
          l.actor.toLowerCase().includes(q) ||
          l.resource.toLowerCase().includes(q)
        const matchLevel = levelFilter === 'all' || l.level === levelFilter
        return matchSearch && matchLevel
      }),
    [search, levelFilter]
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            System Logs
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Full audit trail of all admin actions and platform events.
          </p>
        </div>
        <button
          onClick={() => toast.success('Exporting logs as CSV...')}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {(
          ['info', 'warning', 'error', 'critical', 'success'] as LogLevel[]
        ).map((l) => (
          <button
            key={l}
            onClick={() => setLevelFilter(levelFilter === l ? 'all' : l)}
            className={cn(
              'rounded-xl border p-3 text-center transition-all',
              levelFilter === l
                ? 'border-primary bg-primary/5'
                : 'border-border bg-background'
            )}
          >
            <p className="text-lg font-bold text-foreground">
              {seed.filter((s) => s.level === l).length}
            </p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {l}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search logs..."
          containerClassName="w-64"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(
            ['all', 'critical', 'error', 'warning', 'info', 'success'] as const
          ).map((l) => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-medium capitalize transition-all',
                levelFilter === l
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} entries
        </span>
      </div>

      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-8 px-4 py-3" />
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                Timestamp
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Level
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Actor
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                Action
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">
                IP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground font-sans"
                >
                  No log entries found.
                </td>
              </tr>
            )}
            {filtered.map((log) => (
              <>
                <tr
                  key={log.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === log.id ? null : log.id)
                  }
                >
                  <td className="px-4 py-3">
                    <span
                      className={`h-2 w-2 rounded-full inline-block ${levelConfig[log.level].dot}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3">{levelConfig[log.level].badge}</td>
                  <td className="px-4 py-3 text-foreground max-w-[140px] truncate">
                    {log.actor}
                  </td>
                  <td className="px-4 py-3 text-foreground font-sans max-w-[240px] truncate">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground hidden xl:table-cell">
                    {log.ip}
                  </td>
                </tr>
                {expandedId === log.id && (
                  <tr key={`${log.id}-detail`} className="bg-muted/20">
                    <td colSpan={6} className="px-6 py-3 font-sans">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Resource:
                        </span>{' '}
                        {log.resource}
                      </p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          <span className="font-medium text-foreground">
                            Details:
                          </span>{' '}
                          {log.details}
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
