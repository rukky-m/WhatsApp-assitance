import { useState } from 'react'
import { Save, Globe, Shield, Bell, Key, Users, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/utils/cn'

type Tab = 'general' | 'security' | 'billing' | 'notifications' | 'team' | 'api'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'general', label: 'General', icon: Globe },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'notifications', label: 'Alerts', icon: Bell },
  { key: 'team', label: 'Team', icon: Users },
  { key: 'api', label: 'API / Keys', icon: Key },
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

export const AdminSettings = () => {
  const [tab, setTab] = useState<Tab>('general')
  const [general, setGeneral] = useState({
    platformName: 'ChatFlow AI',
    supportEmail: 'support@chatflow.ai',
    timezone: 'UTC+0',
    defaultLanguage: 'en',
    maintenanceMode: false,
  })
  const [security, setSecurity] = useState({
    requireMfa: false,
    sessionTimeout: '24',
    ipWhitelist: '',
    auditLogging: true,
    maxLoginAttempts: '5',
  })
  const [billing, setBilling] = useState({
    trialDays: '14',
    gracePeriod: '3',
    taxRate: '0',
    currency: 'USD',
    invoicePrefix: 'INV',
  })
  const [alerts, setAlerts] = useState({
    churnAlert: true,
    revenueAlert: true,
    aiErrorAlert: true,
    newSignupAlert: false,
    securityAlert: true,
  })

  const save = () => toast.success('Settings saved.')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Platform Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure platform-wide settings, security, and integrations.
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
          {tab === 'general' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-foreground">
                Platform Settings
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Platform Name', key: 'platformName' as const },
                  { label: 'Support Email', key: 'supportEmail' as const },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      {label}
                    </label>
                    <input
                      value={general[key]}
                      onChange={(e) =>
                        setGeneral({ ...general, [key]: e.target.value })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Default Timezone
                  </label>
                  <select
                    value={general.timezone}
                    onChange={(e) =>
                      setGeneral({ ...general, timezone: e.target.value })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {['UTC-8', 'UTC-5', 'UTC+0', 'UTC+1', 'UTC+3', 'UTC+4'].map(
                      (tz) => (
                        <option key={tz}>{tz}</option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Default Language
                  </label>
                  <select
                    value={general.defaultLanguage}
                    onChange={(e) =>
                      setGeneral({
                        ...general,
                        defaultLanguage: e.target.value,
                      })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 py-3 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Show a maintenance page to all users while you perform
                    updates.
                  </p>
                </div>
                <Toggle
                  checked={general.maintenanceMode}
                  onChange={(v) =>
                    setGeneral({ ...general, maintenanceMode: v })
                  }
                />
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-foreground">
                Security Settings
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Session Timeout (hours)',
                    key: 'sessionTimeout' as const,
                  },
                  {
                    label: 'Max Login Attempts',
                    key: 'maxLoginAttempts' as const,
                  },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      {label}
                    </label>
                    <input
                      type="number"
                      value={security[key]}
                      onChange={(e) =>
                        setSecurity({ ...security, [key]: e.target.value })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  IP Whitelist (comma-separated, leave blank for all)
                </label>
                <input
                  placeholder="192.168.1.0/24, 10.0.0.1"
                  value={security.ipWhitelist}
                  onChange={(e) =>
                    setSecurity({ ...security, ipWhitelist: e.target.value })
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {[
                {
                  key: 'requireMfa' as const,
                  label: 'Require MFA for all admins',
                  desc: 'Force multi-factor authentication for all admin and moderator accounts.',
                },
                {
                  key: 'auditLogging' as const,
                  label: 'Enable audit logging',
                  desc: 'Log all admin actions to the audit trail.',
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 py-3 border-t border-border"
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
                    checked={security[key]}
                    onChange={(v) => setSecurity({ ...security, [key]: v })}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === 'billing' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-foreground">
                Billing Configuration
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Free Trial Duration (days)',
                    key: 'trialDays' as const,
                  },
                  {
                    label: 'Grace Period After Failure (days)',
                    key: 'gracePeriod' as const,
                  },
                  { label: 'Default Tax Rate (%)', key: 'taxRate' as const },
                  { label: 'Invoice Prefix', key: 'invoicePrefix' as const },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      {label}
                    </label>
                    <input
                      value={billing[key]}
                      onChange={(e) =>
                        setBilling({ ...billing, [key]: e.target.value })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Default Currency
                  </label>
                  <select
                    value={billing.currency}
                    onChange={(e) =>
                      setBilling({ ...billing, currency: e.target.value })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">
                Admin Alert Preferences
              </h2>
              {[
                {
                  key: 'churnAlert' as const,
                  label: 'Churn alerts',
                  desc: 'Notify when a user cancels their subscription.',
                },
                {
                  key: 'revenueAlert' as const,
                  label: 'Revenue milestones',
                  desc: 'Notify when MRR crosses significant thresholds.',
                },
                {
                  key: 'aiErrorAlert' as const,
                  label: 'AI error spikes',
                  desc: 'Alert when AI error rate exceeds 5%.',
                },
                {
                  key: 'newSignupAlert' as const,
                  label: 'New signup notifications',
                  desc: 'Email when a new user registers.',
                },
                {
                  key: 'securityAlert' as const,
                  label: 'Security events',
                  desc: 'Alert on failed logins, IP changes, and suspicious activity.',
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
                    checked={alerts[key]}
                    onChange={(v) => setAlerts({ ...alerts, [key]: v })}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === 'team' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">Admin Team</h2>
              <p className="text-sm text-muted-foreground">
                Manage admin accounts and their permissions.
              </p>
              {[
                {
                  name: 'Jordan Lee',
                  email: 'admin@demo.com',
                  role: 'Admin',
                  status: 'Active',
                },
                {
                  name: 'Sam Rivera',
                  email: 'moderator@demo.com',
                  role: 'Moderator',
                  status: 'Active',
                },
              ].map((m) => (
                <div
                  key={m.email}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {m.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.email} · {m.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-600">{m.status}</span>
                    <button
                      onClick={() => toast.success('Invite revoked.')}
                      className="text-xs text-destructive hover:underline"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => toast.success('Invitation sent.')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Invite admin
              </button>
            </div>
          )}

          {tab === 'api' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">API Keys</h2>
              <p className="text-sm text-muted-foreground">
                Manage platform-level API keys for external integrations.
              </p>
              {[
                {
                  name: 'Production Key',
                  key: 'sk_live_••••••••••••••••••••4a2f',
                  created: 'Jan 1, 2026',
                  lastUsed: '5m ago',
                },
                {
                  name: 'Staging Key',
                  key: 'sk_test_••••••••••••••••••••9c11',
                  created: 'Jan 1, 2026',
                  lastUsed: '2 days ago',
                },
              ].map((k) => (
                <div
                  key={k.name}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {k.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {k.key}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Created {k.created} · Last used {k.lastUsed}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toast.success('Copied.')}
                        className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => toast.success('Key revoked.')}
                        className="text-xs px-3 py-1.5 rounded-md text-destructive border border-border hover:bg-destructive/10 transition-colors"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => toast.success('New API key generated.')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Generate new key
              </button>
            </div>
          )}

          {tab !== 'api' && tab !== 'team' && (
            <div className="pt-4 border-t border-border">
              <button
                onClick={save}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Save size={14} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
