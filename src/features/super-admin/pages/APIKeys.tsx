import { useState } from 'react'
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

type KeyScope = 'full' | 'read_only' | 'webhooks' | 'ai_only'
type KeyStatus = 'active' | 'revoked'

interface APIKey {
  id: string
  name: string
  key: string
  scope: KeyScope
  status: KeyStatus
  createdBy: string
  created: string
  lastUsed: string
  requests: number
}

const seed: APIKey[] = [
  {
    id: 'k1',
    name: 'Production — Full Access',
    key: 'cfk_live_a8f2c9d1e4b7f3a6c2e8d5b9f1a4c7e2',
    scope: 'full',
    status: 'active',
    createdBy: 'Morgan Chen',
    created: 'Jan 1, 2026',
    lastUsed: '2m ago',
    requests: 148420,
  },
  {
    id: 'k2',
    name: 'Staging — Full Access',
    key: 'cfk_test_b3d7e1f4a9c6e2b8d5f1a3c9e7b2d4f6',
    scope: 'full',
    status: 'active',
    createdBy: 'Jordan Lee',
    created: 'Jan 1, 2026',
    lastUsed: '1h ago',
    requests: 28194,
  },
  {
    id: 'k3',
    name: 'Analytics Dashboard — Read Only',
    key: 'cfk_live_c5e9a2f7b4d1e8c3f6a9d2b7e5c1a8f4',
    scope: 'read_only',
    status: 'active',
    createdBy: 'Jordan Lee',
    created: 'Mar 15, 2026',
    lastUsed: '10m ago',
    requests: 9841,
  },
  {
    id: 'k4',
    name: 'Webhook Receiver — Webhooks Only',
    key: 'cfk_live_d2b6f1e9a4c7b3f5d8a1e6c9b2f4a7d3',
    scope: 'webhooks',
    status: 'active',
    createdBy: 'Morgan Chen',
    created: 'Feb 20, 2026',
    lastUsed: '5m ago',
    requests: 44210,
  },
  {
    id: 'k5',
    name: 'Old Integration — Deprecated',
    key: 'cfk_live_e8d4f2a7c9b1e5f3a6d2b8c4f7e1a9b5',
    scope: 'full',
    status: 'revoked',
    createdBy: 'Jordan Lee',
    created: 'Nov 1, 2025',
    lastUsed: '45d ago',
    requests: 12008,
  },
]

const scopeBadge: Record<KeyScope, React.ReactNode> = {
  full: (
    <Badge variant="destructive" size="sm">
      Full Access
    </Badge>
  ),
  read_only: (
    <Badge variant="info" size="sm">
      Read Only
    </Badge>
  ),
  webhooks: (
    <Badge variant="warning" size="sm">
      Webhooks
    </Badge>
  ),
  ai_only: (
    <Badge variant="secondary" size="sm">
      AI Only
    </Badge>
  ),
}

export const APIKeys = () => {
  const [keys, setKeys] = useState(seed)
  const [visible, setVisible] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', scope: 'read_only' as KeyScope })

  const copy = (key: string) => {
    navigator.clipboard
      .writeText(key)
      .then(() => toast.success('API key copied.'))
  }

  const revoke = (id: string) => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: 'revoked' as KeyStatus } : k
      )
    )
    toast.success('API key revoked.')
  }

  const generate = (e: React.FormEvent) => {
    e.preventDefault()
    const newKey =
      'cfk_live_' +
      Array.from(
        { length: 32 },
        () => 'abcdef0123456789'[Math.floor(Math.random() * 16)]
      ).join('')
    setKeys((prev) => [
      {
        id: `k${Date.now()}`,
        name: form.name,
        key: newKey,
        scope: form.scope,
        status: 'active',
        createdBy: 'Morgan Chen',
        created: 'Today',
        lastUsed: 'Never',
        requests: 0,
      },
      ...prev,
    ])
    setShowForm(false)
    setForm({ name: '', scope: 'read_only' })
    toast.success(
      "New API key generated. Copy it now — it won't be shown again."
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            API Keys
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage platform API keys for integrations and internal services.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} /> Generate Key
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Active Keys',
            value: keys.filter((k) => k.status === 'active').length,
          },
          {
            label: 'Revoked',
            value: keys.filter((k) => k.status === 'revoked').length,
          },
          {
            label: 'Total Requests',
            value: keys
              .reduce((sum, k) => sum + k.requests, 0)
              .toLocaleString(),
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
          onSubmit={generate}
          className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4"
        >
          <h2 className="font-semibold text-foreground">
            Generate New API Key
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Key Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. CRM Integration"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Scope
              </label>
              <select
                value={form.scope}
                onChange={(e) =>
                  setForm({ ...form, scope: e.target.value as KeyScope })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="read_only">Read Only</option>
                <option value="webhooks">Webhooks Only</option>
                <option value="ai_only">AI Only</option>
                <option value="full">Full Access</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Generate
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

      <div className="space-y-3">
        {keys.map((k) => (
          <div
            key={k.id}
            className={cn(
              'rounded-xl border bg-background p-5 shadow-sm',
              k.status === 'revoked' && 'opacity-60'
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold text-foreground text-sm">
                    {k.name}
                  </p>
                  {scopeBadge[k.scope]}
                  <Badge
                    variant={k.status === 'active' ? 'success' : 'secondary'}
                    dot
                    size="sm"
                    className="capitalize"
                  >
                    {k.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Created by {k.createdBy} · {k.created} · Last used{' '}
                  {k.lastUsed} · {k.requests.toLocaleString()} requests
                </p>
              </div>
              {k.status === 'active' && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => copy(k.key)}
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Copy"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => revoke(k.id)}
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    aria-label="Revoke"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <code className="text-xs font-mono text-muted-foreground flex-1 truncate">
                {visible === k.id ? k.key : k.key.slice(0, 12) + '•'.repeat(24)}
              </code>
              <button
                onClick={() => setVisible(visible === k.id ? null : k.id)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                {visible === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
