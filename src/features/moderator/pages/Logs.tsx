import { useState, useMemo } from 'react'
import {} from 'lucide-react'
import { Badge, SearchInput } from '@/components/ui'
import { cn } from '@/utils/cn'

type LogLevel = 'info' | 'warning' | 'error' | 'success'

interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  actor: string
  action: string
  target: string
  ip: string
}

const seed: LogEntry[] = [
  {
    id: 'L-1001',
    timestamp: '2026-07-07 14:32:11',
    level: 'info',
    actor: 'Sam Rivera (Moderator)',
    action: 'Reviewed flagged message',
    target: 'MSG-F-91 (Lina Boutique)',
    ip: '192.168.1.10',
  },
  {
    id: 'L-1000',
    timestamp: '2026-07-07 14:28:04',
    level: 'warning',
    actor: 'System',
    action: 'Auto-flagged high-risk message',
    target: 'MSG-F-91 (bank details request)',
    ip: '—',
  },
  {
    id: 'L-999',
    timestamp: '2026-07-07 14:15:30',
    level: 'success',
    actor: 'Sam Rivera (Moderator)',
    action: 'Resolved support ticket',
    target: 'TKT-219 (Aisha Kareem)',
    ip: '192.168.1.10',
  },
  {
    id: 'L-998',
    timestamp: '2026-07-07 13:50:22',
    level: 'error',
    actor: 'System',
    action: 'Webhook delivery failed',
    target: 'Endpoint: ops@metro.com/webhook',
    ip: '—',
  },
  {
    id: 'L-997',
    timestamp: '2026-07-07 13:44:17',
    level: 'info',
    actor: 'Alex Johnson (User)',
    action: 'Logged in',
    target: 'Session from Chrome/Windows',
    ip: '41.12.55.100',
  },
  {
    id: 'L-996',
    timestamp: '2026-07-07 13:30:01',
    level: 'warning',
    actor: 'System',
    action: 'Auto-flagged medium-risk message',
    target: 'MSG-F-89 (Nour Pharmacy)',
    ip: '—',
  },
  {
    id: 'L-995',
    timestamp: '2026-07-07 12:10:44',
    level: 'info',
    actor: 'Maya Ibrahim (User)',
    action: 'Scheduled message created',
    target: 'SCH-112 (to +20 101 887 6202)',
    ip: '197.45.11.87',
  },
  {
    id: 'L-994',
    timestamp: '2026-07-07 11:55:03',
    level: 'success',
    actor: 'AI Engine',
    action: 'Message auto-approved (98% confidence)',
    target: 'MSG-4891 (Omar Electronics)',
    ip: '—',
  },
  {
    id: 'L-993',
    timestamp: '2026-07-07 11:30:15',
    level: 'error',
    actor: 'System',
    action: 'AI model response timeout',
    target: 'Request ID: req_9a8f2c',
    ip: '—',
  },
  {
    id: 'L-992',
    timestamp: '2026-07-07 10:48:30',
    level: 'info',
    actor: 'Noah Trends (User)',
    action: 'Exported contacts CSV',
    target: '48 contacts exported',
    ip: '89.203.44.12',
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
}

export const Logs = () => {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all')

  const filtered = useMemo(
    () =>
      seed.filter((l) => {
        const matchSearch =
          !search ||
          l.action.toLowerCase().includes(search.toLowerCase()) ||
          l.actor.toLowerCase().includes(search.toLowerCase()) ||
          l.target.toLowerCase().includes(search.toLowerCase())
        const matchLevel = levelFilter === 'all' || l.level === levelFilter
        return matchSearch && matchLevel
      }),
    [search, levelFilter]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          System Logs
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Audit trail of all system events, user actions, and AI activity.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search logs..."
          containerClassName="w-64"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'info', 'warning', 'error', 'success'] as const).map(
            (l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all',
                  levelFilter === l
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {l}
              </button>
            )
          )}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} entries
        </span>
      </div>

      {/* Log table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8">
                &nbsp;
              </th>
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
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                Target
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">
                IP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-mono">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground font-sans"
                >
                  No log entries found.
                </td>
              </tr>
            )}
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <span
                    className={`h-2 w-2 rounded-full inline-block ${levelConfig[log.level].dot}`}
                  />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="px-4 py-3">{levelConfig[log.level].badge}</td>
                <td className="px-4 py-3 text-foreground max-w-[160px] truncate">
                  {log.actor}
                </td>
                <td className="px-4 py-3 text-foreground max-w-[200px] truncate font-sans">
                  {log.action}
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-[180px] truncate hidden md:table-cell font-sans">
                  {log.target}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden xl:table-cell">
                  {log.ip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
