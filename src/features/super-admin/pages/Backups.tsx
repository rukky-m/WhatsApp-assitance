import { useState } from 'react'
import { Database, Upload, Trash2, CheckCircle2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'

type BackupStatus = 'completed' | 'running' | 'failed'
type BackupType = 'full' | 'incremental'

interface Backup {
  id: string
  name: string
  type: BackupType
  status: BackupStatus
  size: string
  created: string
  duration: string
  location: string
  retainUntil: string
}

const seed: Backup[] = [
  {
    id: 'bk-001',
    name: 'db_2026_07_07_0300',
    type: 'full',
    status: 'completed',
    size: '4.2 GB',
    created: '2026-07-07 03:00 UTC',
    duration: '14m 32s',
    location: 's3://chatflow-backups/2026/07/07/',
    retainUntil: '2026-10-07',
  },
  {
    id: 'bk-002',
    name: 'db_2026_07_06_0300',
    type: 'full',
    status: 'completed',
    size: '4.1 GB',
    created: '2026-07-06 03:00 UTC',
    duration: '13m 58s',
    location: 's3://chatflow-backups/2026/07/06/',
    retainUntil: '2026-10-06',
  },
  {
    id: 'bk-003',
    name: 'db_2026_07_07_1200',
    type: 'incremental',
    status: 'completed',
    size: '842 MB',
    created: '2026-07-07 12:00 UTC',
    duration: '3m 11s',
    location: 's3://chatflow-backups/2026/07/07/inc/',
    retainUntil: '2026-08-07',
  },
  {
    id: 'bk-004',
    name: 'db_2026_07_05_0300',
    type: 'full',
    status: 'completed',
    size: '4.0 GB',
    created: '2026-07-05 03:00 UTC',
    duration: '13m 22s',
    location: 's3://chatflow-backups/2026/07/05/',
    retainUntil: '2026-10-05',
  },
  {
    id: 'bk-005',
    name: 'db_2026_07_04_0300',
    type: 'full',
    status: 'failed',
    size: '—',
    created: '2026-07-04 03:00 UTC',
    duration: '—',
    location: '—',
    retainUntil: '—',
  },
]

const statusBadge: Record<BackupStatus, React.ReactNode> = {
  completed: (
    <Badge variant="success" dot size="sm">
      Completed
    </Badge>
  ),
  running: (
    <Badge variant="info" dot size="sm">
      Running
    </Badge>
  ),
  failed: (
    <Badge variant="destructive" dot size="sm">
      Failed
    </Badge>
  ),
}

export const Backups = () => {
  const [backups, setBackups] = useState(seed)
  const [running, setRunning] = useState(false)

  const triggerBackup = (type: BackupType) => {
    setRunning(true)
    const newBackup: Backup = {
      id: `bk-${Date.now()}`,
      name: `db_manual_${new Date().toISOString().slice(0, 10).replace(/-/g, '_')}`,
      type,
      status: 'running',
      size: '—',
      created: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      duration: '—',
      location: '—',
      retainUntil: '—',
    }
    setBackups((prev) => [newBackup, ...prev])
    toast.success(`${type === 'full' ? 'Full' : 'Incremental'} backup started.`)

    setTimeout(() => {
      setBackups((prev) =>
        prev.map((b) =>
          b.id === newBackup.id
            ? {
                ...b,
                status: 'completed',
                size: type === 'full' ? '4.2 GB' : '910 MB',
                duration: type === 'full' ? '14m 08s' : '3m 22s',
                location: `s3://chatflow-backups/manual/${newBackup.name}/`,
                retainUntil: type === 'full' ? '90 days' : '30 days',
              }
            : b
        )
      )
      setRunning(false)
      toast.success('Backup completed successfully.')
    }, 4000)
  }

  const deleteBackup = (id: string) => {
    setBackups((prev) => prev.filter((b) => b.id !== id))
    toast.success('Backup deleted.')
  }

  const successCount = backups.filter((b) => b.status === 'completed').length
  const failedCount = backups.filter((b) => b.status === 'failed').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Backups
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage database backups, restoration, and retention policies.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={running}
            onClick={() => triggerBackup('incremental')}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-60"
          >
            <RefreshCw size={14} className={running ? 'animate-spin' : ''} />{' '}
            Incremental
          </button>
          <button
            disabled={running}
            onClick={() => triggerBackup('full')}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-sm"
          >
            <Database size={14} /> Full Backup
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: 'Total Backups',
            value: backups.length,
            icon: Database,
            color: 'text-primary',
          },
          {
            label: 'Successful',
            value: successCount,
            icon: CheckCircle2,
            color: 'text-emerald-500',
          },
          {
            label: 'Failed',
            value: failedCount,
            icon: Trash2,
            color: 'text-destructive',
          },
          {
            label: 'Storage Used',
            value: '~28 GB',
            icon: Upload,
            color: 'text-blue-500',
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

      {/* Retention policy */}
      <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-semibold text-foreground mb-3">Retention Policy</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { label: 'Full backups', value: '90 days', color: 'text-primary' },
            {
              label: 'Incremental backups',
              value: '30 days',
              color: 'text-blue-500',
            },
            {
              label: 'Manual backups',
              value: 'Until deleted',
              color: 'text-muted-foreground',
            },
          ].map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-2.5"
            >
              <span className="text-muted-foreground">{r.label}</span>
              <span className={`font-semibold ${r.color}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Backup list */}
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                Type
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Size
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                Duration
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Created
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-24 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {backups.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Database
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="font-mono text-xs text-foreground truncate max-w-[180px]">
                      {b.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge
                    variant={b.type === 'full' ? 'secondary' : 'info'}
                    size="sm"
                    className="capitalize"
                  >
                    {b.type}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                  {b.size}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">
                  {b.duration}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs whitespace-nowrap">
                  {b.created}
                </td>
                <td className="px-4 py-3">{statusBadge[b.status]}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {b.status === 'completed' && (
                      <button
                        onClick={() =>
                          toast.success(`Restoring from ${b.name}...`)
                        }
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs border border-border hover:bg-muted transition-colors"
                      >
                        <Upload size={11} /> Restore
                      </button>
                    )}
                    <button
                      onClick={() => deleteBackup(b.id)}
                      className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
