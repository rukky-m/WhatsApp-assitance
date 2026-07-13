import { useState } from 'react'
import { Save, Server, Database, Mail, Globe, Bot, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/utils/cn'

type Tab = 'platform' | 'database' | 'email' | 'storage' | 'ai' | 'advanced'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'platform', label: 'Platform', icon: Globe },
  { key: 'database', label: 'Database', icon: Database },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'storage', label: 'Storage', icon: Server },
  { key: 'ai', label: 'AI Provider', icon: Bot },
  { key: 'advanced', label: 'Advanced', icon: Shield },
]

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0',
        checked ? 'bg-primary' : 'bg-muted'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
      />
    </div>
  )
}

export const SystemSettings = () => {
  const [tab, setTab] = useState<Tab>('platform')
  const [platform, setPlatform] = useState({
    appUrl: 'https://app.chatflow.ai',
    version: '2.4.1',
    debug: false,
    maintenanceMode: false,
  })
  const [db, setDb] = useState({
    host: 'db.chatflow.internal',
    port: '5432',
    name: 'chatflow_prod',
    poolSize: '20',
    sslEnabled: true,
  })
  const [email, setEmail] = useState({
    provider: 'sendgrid',
    fromName: 'ChatFlow AI',
    fromEmail: 'noreply@chatflow.ai',
    apiKey: 'SG.••••••••••••••••••••••••',
  })
  const [storage, setStorage] = useState({
    provider: 's3',
    bucket: 'chatflow-prod-assets',
    region: 'us-east-1',
    cdnUrl: 'https://cdn.chatflow.ai',
  })
  const [ai, setAi] = useState({
    provider: 'openai',
    model: 'gpt-4o',
    apiKey: 'sk-proj-••••••••••••••••••••••••',
    orgId: 'org-••••••••',
    timeout: '30',
  })

  const save = () => toast.success('System settings saved.')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Low-level platform configuration for infrastructure and services.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <nav className="lg:w-44 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible shrink-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left whitespace-nowrap',
                tab === t.key
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 bg-background rounded-xl border border-border p-6 shadow-sm space-y-5">
          {tab === 'platform' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">
                Platform Configuration
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="App URL"
                  value={platform.appUrl}
                  onChange={(v) => setPlatform({ ...platform, appUrl: v })}
                />
                <Field
                  label="Current Version"
                  value={platform.version}
                  onChange={(v) => setPlatform({ ...platform, version: v })}
                />
              </div>
              {[
                {
                  key: 'debug' as const,
                  label: 'Debug Mode',
                  desc: 'Enable verbose logging. Do not use in production.',
                },
                {
                  key: 'maintenanceMode' as const,
                  label: 'Maintenance Mode',
                  desc: 'Show maintenance page to all users.',
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <Toggle
                    checked={platform[key]}
                    onChange={(v) => setPlatform({ ...platform, [key]: v })}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === 'database' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">
                Database Configuration
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Host"
                  value={db.host}
                  onChange={(v) => setDb({ ...db, host: v })}
                />
                <Field
                  label="Port"
                  value={db.port}
                  onChange={(v) => setDb({ ...db, port: v })}
                />
                <Field
                  label="Database Name"
                  value={db.name}
                  onChange={(v) => setDb({ ...db, name: v })}
                />
                <Field
                  label="Connection Pool Size"
                  value={db.poolSize}
                  onChange={(v) => setDb({ ...db, poolSize: v })}
                  type="number"
                />
              </div>
              <div className="flex items-start justify-between gap-4 py-3 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    SSL/TLS Enabled
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Encrypt database connections in transit.
                  </p>
                </div>
                <Toggle
                  checked={db.sslEnabled}
                  onChange={(v) => setDb({ ...db, sslEnabled: v })}
                />
              </div>
            </div>
          )}

          {tab === 'email' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">Email Service</h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  Provider
                </label>
                <select
                  value={email.provider}
                  onChange={(e) =>
                    setEmail({ ...email, provider: e.target.value })
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="sendgrid">SendGrid</option>
                  <option value="ses">AWS SES</option>
                  <option value="mailgun">Mailgun</option>
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="From Name"
                  value={email.fromName}
                  onChange={(v) => setEmail({ ...email, fromName: v })}
                />
                <Field
                  label="From Email"
                  value={email.fromEmail}
                  onChange={(v) => setEmail({ ...email, fromEmail: v })}
                  type="email"
                />
                <Field
                  label="API Key"
                  value={email.apiKey}
                  onChange={(v) => setEmail({ ...email, apiKey: v })}
                />
              </div>
            </div>
          )}

          {tab === 'storage' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">File Storage</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Provider
                  </label>
                  <select
                    value={storage.provider}
                    onChange={(e) =>
                      setStorage({ ...storage, provider: e.target.value })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="s3">AWS S3</option>
                    <option value="gcs">Google Cloud Storage</option>
                    <option value="azure">Azure Blob</option>
                  </select>
                </div>
                <Field
                  label="Bucket Name"
                  value={storage.bucket}
                  onChange={(v) => setStorage({ ...storage, bucket: v })}
                />
                <Field
                  label="Region"
                  value={storage.region}
                  onChange={(v) => setStorage({ ...storage, region: v })}
                />
                <Field
                  label="CDN URL"
                  value={storage.cdnUrl}
                  onChange={(v) => setStorage({ ...storage, cdnUrl: v })}
                />
              </div>
            </div>
          )}

          {tab === 'ai' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">AI Provider</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Provider
                  </label>
                  <select
                    value={ai.provider}
                    onChange={(e) => setAi({ ...ai, provider: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google Gemini</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Default Model
                  </label>
                  <select
                    value={ai.model}
                    onChange={(e) => setAi({ ...ai, model: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
                <Field
                  label="API Key"
                  value={ai.apiKey}
                  onChange={(v) => setAi({ ...ai, apiKey: v })}
                />
                <Field
                  label="Organization ID"
                  value={ai.orgId}
                  onChange={(v) => setAi({ ...ai, orgId: v })}
                />
                <Field
                  label="Request Timeout (seconds)"
                  value={ai.timeout}
                  onChange={(v) => setAi({ ...ai, timeout: v })}
                  type="number"
                />
              </div>
            </div>
          )}

          {tab === 'advanced' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">
                Advanced Options
              </h2>
              <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  ⚠️ These settings affect core infrastructure. Make changes
                  with caution.
                </p>
              </div>
              {[
                {
                  label: 'Flush Redis Cache',
                  action: () => toast.success('Cache flushed.'),
                  danger: false,
                },
                {
                  label: 'Restart Queue Workers',
                  action: () => toast.success('Queue workers restarting...'),
                  danger: false,
                },
                {
                  label: 'Force Re-index Search',
                  action: () => toast.success('Re-indexing started...'),
                  danger: false,
                },
                {
                  label: 'Drop All Sessions',
                  action: () => toast.success('All sessions cleared.'),
                  danger: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <button
                    onClick={item.action}
                    className={cn(
                      'px-4 py-1.5 rounded-lg border text-xs font-medium transition-colors',
                      item.danger
                        ? 'border-destructive text-destructive hover:bg-destructive/10'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    Execute
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab !== 'advanced' && (
            <div className="pt-4 border-t border-border">
              <button
                onClick={save}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Save size={14} /> Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
