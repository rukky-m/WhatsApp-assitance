import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge, SearchInput } from '@/components/ui'
import { cn } from '@/utils/cn'

type AuditLevel = 'info' | 'warning' | 'critical'

interface AuditEntry {
  id: string
  timestamp: string
  level: AuditLevel
  actor: string
  role: string
  action: string
  resource: string
  ip: string
  status: 'success' | 'failed'
}

const seed: AuditEntry[] = [
  {
    id: 'AU-5001',
    timestamp: '2026-07-07 15:44:01',
    level: 'critical',
    actor: 'Morgan Chen',
    role: 'super-admin',
    action: 'Revoked admin account',
    resource: 'User: legacy@chatflow.ai',
    ip: '41.12.88.200',
    status: 'success',
  },
  {
    id: 'AU-5000',
    timestamp: '2026-07-07 15:30:22',
    level: 'warning',
    actor: 'Morgan Chen',
    role: 'super-admin',
    action: 'Modified role permissions',
    resource: 'Role: moderator',
    ip: '41.12.88.200',
    status: 'success',
  },
  {
    id: 'AU-4999',
    timestamp: '2026-07-07 14:50:11',
    level: 'info',
    actor: 'Jordan Lee',
    role: 'admin',
    action: 'Exported user data CSV',
    resource: '500 records',
    ip: '203.0.113.5',
    status: 'success',
  },
  {
    id: 'AU-4998',
    timestamp: '2026-07-07 14:22:35',
    level: 'info',
    actor: 'Jordan Lee',
    role: 'admin',
    action: 'Changed user plan',
    resource: 'User: Omar Electronics → Scale',
    ip: '203.0.113.5',
    status: 'success',
  },
  {
    id: 'AU-4997',
    timestamp: '2026-07-07 14:00:08',
    level: 'warning',
    actor: 'Jordan Lee',
    role: 'admin',
    action: 'Attempted to delete subscription',
    resource: 'Sub: sub_007 (Aisha Kareem)',
    ip: '203.0.113.5',
    status: 'failed',
  },
  {
    id: 'AU-4996',
    timestamp: '2026-07-07 13:41:19',
    level: 'info',
    actor: 'Morgan Chen',
    role: 'super-admin',
    action: 'Created moderator account',
    resource: 'User: priya@chatflow.ai',
    ip: '41.12.88.200',
    status: 'success',
  },
  {
    id: 'AU-4995',
    timestamp: '2026-07-07 13:00:00',
    level: 'critical',
    actor: 'Morgan Chen',
    role: 'super-admin',
    action: 'Updated system AI API key',
    resource: 'Setting: openai_api_key',
    ip: '41.12.88.200',
    status: 'success',
  },
  {
    id: 'AU-4994',
    timestamp: '2026-07-07 12:30:44',
    level: 'info',
    actor: 'Sam Rivera',
    role: 'moderator',
    action: 'Suspended user account',
    resource: 'User: ops@metro.com',
    ip: '192.168.1.10',
    status: 'success',
  },
  {
    id: 'AU-4993',
    timestamp: '2026-07-07 11:15:22',
    level: 'warning',
    actor: 'Jordan Lee',
    role: 'admin',
    action: 'Enabled maintenance mode',
    resource: 'Platform settings',
    ip: '203.0.113.5',
    status: 'success',
  },
  {
    id: 'AU-4992',
    timestamp: '2026-07-07 10:00:00',
    level: 'info',
    actor: 'Morgan Chen',
    role: 'super-admin',
    action: 'Flushed Redis cache',
    resource: 'Infrastructure',
    ip: '41.12.88.200',
    status: 'success',
  },
]

const levelConfig: Record<AuditLevel, { badge: React.ReactNode; dot: string }> =
  {
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
    critical: {
      badge: (
        <Badge variant="destructive" size="sm">
          Critical
        </Badge>
      ),
      dot: 'bg-rose-600',
    },
  }

export const AuditLogs = () => {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<AuditLevel | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      seed.filter((e) => {
        const q = search.toLowerCase()
        const matchSearch =
          !search ||
          e.actor.toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q) ||
          e.resource.toLowerCase().includes(q)
        const matchLevel = levelFilter === 'all' || e.level === levelFilter
        return matchSearch && matchLevel
      }),
    [search, levelFilter]
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Audit Logs
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Immutable record of all privileged actions taken by staff members.
          </p>
        </div>
        <button
          onClick={() => toast.success('Exporting audit log as CSV...')}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(['info', 'warning', 'critical'] as AuditLevel[]).map((l) => (
          <button
            key={l}
            onClick={() => setLevelFilter(levelFilter === l ? 'all' : l)}
            className={cn(
              'rounded-xl border p-4 text-center transition-all',
              levelFilter === l
                ? 'border-primary bg-primary/5'
                : 'border-border bg-background'
            )}
          >
            <p className="text-2xl font-bold text-foreground">
              {seed.filter((e) => e.level === l).length}
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
          placeholder="Search audit logs..."
          containerClassName="w-64"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'critical', 'warning', 'info'] as const).map((l) => (
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
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                Status
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
                  No entries found.
                </td>
              </tr>
            )}
            {filtered.map((entry) => (
              <>
                <tr
                  key={entry.id}
                  onClick={() =>
                    setExpanded(expanded === entry.id ? null : entry.id)
                  }
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`h-2 w-2 rounded-full inline-block ${levelConfig[entry.level].dot}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                    {entry.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    {levelConfig[entry.level].badge}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    <p className="font-medium">{entry.actor}</p>
                    <p className="text-muted-foreground capitalize">
                      {entry.role}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-sans text-foreground max-w-[220px] truncate">
                    {entry.action}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge
                      variant={
                        entry.status === 'success' ? 'success' : 'destructive'
                      }
                      size="sm"
                      className="capitalize"
                    >
                      {entry.status}
                    </Badge>
                  </td>
                </tr>
                {expanded === entry.id && (
                  <tr key={`${entry.id}-exp`} className="bg-muted/20">
                    <td
                      colSpan={6}
                      className="px-6 py-3 font-sans text-xs space-y-1"
                    >
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Resource:
                        </span>{' '}
                        {entry.resource}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          IP Address:
                        </span>{' '}
                        {entry.ip}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Entry ID:
                        </span>{' '}
                        {entry.id}
                      </p>
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
