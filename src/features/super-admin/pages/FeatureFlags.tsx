import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

type FlagStatus = 'enabled' | 'disabled'
type RolloutType = 'all' | 'percentage' | 'roles' | 'specific'

interface FeatureFlag {
  id: string
  name: string
  description: string
  status: FlagStatus
  rollout: RolloutType
  rolloutValue: string
  environment: 'all' | 'production' | 'staging'
  createdBy: string
  lastChanged: string
}

const seed: FeatureFlag[] = [
  {
    id: 'ff1',
    name: 'ai_multi_language',
    description: 'Enable multi-language AI replies (Arabic, Spanish, French)',
    status: 'enabled',
    rollout: 'all',
    rolloutValue: '100%',
    environment: 'production',
    createdBy: 'Morgan Chen',
    lastChanged: '2026-07-05',
  },
  {
    id: 'ff2',
    name: 'conversation_ai_summary',
    description: 'AI-generated conversation summaries in the right panel',
    status: 'enabled',
    rollout: 'percentage',
    rolloutValue: '50%',
    environment: 'production',
    createdBy: 'Jordan Lee',
    lastChanged: '2026-07-01',
  },
  {
    id: 'ff3',
    name: 'scheduler_recurring_v2',
    description: 'Improved recurring message scheduler with cron-like syntax',
    status: 'disabled',
    rollout: 'roles',
    rolloutValue: 'admin, super-admin',
    environment: 'staging',
    createdBy: 'Jordan Lee',
    lastChanged: '2026-06-28',
  },
  {
    id: 'ff4',
    name: 'bulk_contact_import',
    description: 'CSV-based bulk contact import with deduplication',
    status: 'enabled',
    rollout: 'roles',
    rolloutValue: 'admin, super-admin',
    environment: 'all',
    createdBy: 'Morgan Chen',
    lastChanged: '2026-06-15',
  },
  {
    id: 'ff5',
    name: 'advanced_analytics_v2',
    description: 'New analytics dashboard with cohort and funnel analysis',
    status: 'disabled',
    rollout: 'specific',
    rolloutValue: 'beta@example.com',
    environment: 'staging',
    createdBy: 'Jordan Lee',
    lastChanged: '2026-07-03',
  },
  {
    id: 'ff6',
    name: 'whatsapp_reactions',
    description: 'Support for WhatsApp message reactions in conversation view',
    status: 'disabled',
    rollout: 'percentage',
    rolloutValue: '0%',
    environment: 'staging',
    createdBy: 'Jordan Lee',
    lastChanged: '2026-07-06',
  },
]

export const FeatureFlags = () => {
  const [flags, setFlags] = useState(seed)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    rollout: 'all' as RolloutType,
    rolloutValue: '100%',
    environment: 'staging' as 'all' | 'production' | 'staging',
  })
  const [filter, setFilter] = useState<FlagStatus | 'all'>('all')

  const toggle = (id: string) => {
    setFlags((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status:
                f.status === 'enabled' ? 'disabled' : ('enabled' as FlagStatus),
            }
          : f
      )
    )
    const flag = flags.find((f) => f.id === id)
    toast.success(
      `${flag?.name} ${flag?.status === 'enabled' ? 'disabled' : 'enabled'}.`
    )
  }

  const deleteFlag = (id: string) => {
    setFlags((prev) => prev.filter((f) => f.id !== id))
    toast.success('Feature flag deleted.')
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setFlags((prev) => [
      {
        id: `ff${Date.now()}`,
        name: form.name.toLowerCase().replace(/\s+/g, '_'),
        description: form.description,
        status: 'disabled',
        rollout: form.rollout,
        rolloutValue: form.rolloutValue,
        environment: form.environment,
        createdBy: 'Morgan Chen',
        lastChanged: 'Today',
      },
      ...prev,
    ])
    setShowForm(false)
    setForm({
      name: '',
      description: '',
      rollout: 'all',
      rolloutValue: '100%',
      environment: 'staging',
    })
    toast.success('Feature flag created (disabled by default).')
  }

  const filtered = flags.filter((f) => filter === 'all' || f.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Feature Flags
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Control feature rollouts across environments and user segments.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Flag
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Flags', value: flags.length },
          {
            label: 'Enabled',
            value: flags.filter((f) => f.status === 'enabled').length,
          },
          {
            label: 'Disabled',
            value: flags.filter((f) => f.status === 'disabled').length,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-background rounded-xl border border-border p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4"
        >
          <h2 className="font-semibold text-foreground">New Feature Flag</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Name (snake_case)
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="feature_name"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Environment
              </label>
              <select
                value={form.environment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    environment: e.target.value as
                      'all' | 'production' | 'staging',
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="staging">Staging</option>
                <option value="production">Production</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <input
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="What does this flag control?"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Rollout Type
              </label>
              <select
                value={form.rollout}
                onChange={(e) =>
                  setForm({ ...form, rollout: e.target.value as RolloutType })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All users</option>
                <option value="percentage">Percentage</option>
                <option value="roles">Specific roles</option>
                <option value="specific">Specific users</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Rollout Value
              </label>
              <input
                value={form.rolloutValue}
                onChange={(e) =>
                  setForm({ ...form, rolloutValue: e.target.value })
                }
                placeholder="e.g. 50%, admin, user@example.com"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex gap-1 bg-muted p-0.5 rounded-lg w-fit">
        {(['all', 'enabled', 'disabled'] as const).map((f) => (
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

      <div className="space-y-3">
        {filtered.map((flag) => (
          <div
            key={flag.id}
            className="bg-background rounded-xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <code className="text-sm font-mono font-semibold text-foreground">
                    {flag.name}
                  </code>
                  <Badge
                    variant={
                      flag.status === 'enabled' ? 'success' : 'secondary'
                    }
                    dot
                    size="sm"
                    className="capitalize"
                  >
                    {flag.status}
                  </Badge>
                  <Badge
                    variant={
                      flag.environment === 'production'
                        ? 'destructive'
                        : flag.environment === 'staging'
                          ? 'warning'
                          : 'info'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {flag.environment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {flag.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Rollout:{' '}
                  <span className="font-medium text-foreground">
                    {flag.rollout === 'all' ? 'All users' : flag.rolloutValue}
                  </span>
                  {' · '}By {flag.createdBy} · Changed {flag.lastChanged}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  role="switch"
                  aria-checked={flag.status === 'enabled'}
                  onClick={() => toggle(flag.id)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    flag.status === 'enabled' ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                      flag.status === 'enabled'
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    )}
                  />
                </button>
                <button
                  onClick={() => deleteFlag(flag.id)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
