import { useState } from 'react'
import { Shield, Lock, Activity, Ban } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

const FAILED_LOGINS = [
  {
    email: 'admin@demo.com',
    ip: '41.12.88.200',
    time: '10m ago',
    attempts: 2,
    blocked: false,
  },
  {
    email: 'unknown@hack.io',
    ip: '185.220.101.42',
    time: '22m ago',
    attempts: 5,
    blocked: true,
  },
  {
    email: 'superadmin@demo.com',
    ip: '103.21.244.0',
    time: '1h ago',
    attempts: 3,
    blocked: false,
  },
  {
    email: 'ops@metro.com',
    ip: '45.33.32.156',
    time: '3h ago',
    attempts: 1,
    blocked: false,
  },
]

const ACTIVE_SESSIONS = [
  {
    user: 'Morgan Chen',
    role: 'super-admin',
    device: 'Chrome / Windows 11',
    ip: '41.12.88.200',
    location: 'Dubai, UAE',
    duration: '2h 14m',
  },
  {
    user: 'Jordan Lee',
    role: 'admin',
    device: 'Firefox / macOS',
    ip: '203.0.113.5',
    location: 'San Francisco, USA',
    duration: '45m',
  },
  {
    user: 'Alex Johnson',
    role: 'user',
    device: 'Safari / iPhone',
    ip: '198.51.100.8',
    location: 'London, UK',
    duration: '18m',
  },
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

export const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    globalMfa: false,
    ipWhitelisting: false,
    brute_force: true,
    rateLimit: true,
    auditLogging: true,
    sessionTimeout: '24',
    maxSessions: '5',
    ipBlockThreshold: '5',
  })

  const set = (key: keyof typeof settings) => (v: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: v }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Security
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Platform-wide security policies, active sessions, and threat
          monitoring.
        </p>
      </div>

      {/* Security summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Active Sessions',
            value: '3',
            icon: Activity,
            color: 'text-primary',
            bg: 'bg-primary/10',
          },
          {
            label: 'Failed Logins (24h)',
            value: '11',
            icon: Lock,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
          },
          {
            label: 'Blocked IPs',
            value: '1',
            icon: Ban,
            color: 'text-destructive',
            bg: 'bg-destructive/10',
          },
          {
            label: 'Security Score',
            value: '82/100',
            icon: Shield,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-background rounded-xl border border-border p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-muted-foreground">
                {s.label}
              </p>
              <div className={`p-1.5 rounded-lg ${s.bg}`}>
                <s.icon size={13} className={s.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Security toggles */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-1">
        <h3 className="font-semibold text-foreground mb-4">
          Security Policies
        </h3>
        {[
          {
            key: 'globalMfa' as const,
            label: 'Require MFA for all staff',
            desc: 'Force multi-factor authentication for admins, moderators, and super-admins.',
          },
          {
            key: 'ipWhitelisting' as const,
            label: 'Enable IP whitelisting for staff',
            desc: 'Only allow logins from pre-approved IP ranges for privileged accounts.',
          },
          {
            key: 'brute_force' as const,
            label: 'Brute-force protection',
            desc: `Block accounts after ${settings.ipBlockThreshold} consecutive failed login attempts.`,
          },
          {
            key: 'rateLimit' as const,
            label: 'API rate limiting',
            desc: 'Enforce request rate limits globally across the REST API.',
          },
          {
            key: 'auditLogging' as const,
            label: 'Full audit logging',
            desc: 'Log every admin action with timestamps, IP addresses, and resource IDs.',
          },
        ].map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <Toggle
              checked={settings[key] as boolean}
              onChange={(v) => set(key)(v)}
            />
          </div>
        ))}
        <div className="grid sm:grid-cols-2 gap-4 pt-3">
          {[
            {
              label: 'Session timeout (hours)',
              key: 'sessionTimeout' as const,
            },
            {
              label: 'Max concurrent sessions per user',
              key: 'maxSessions' as const,
            },
          ].map(({ label, key }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                {label}
              </label>
              <input
                type="number"
                value={settings[key] as string}
                onChange={(e) => set(key)(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
              />
            </div>
          ))}
        </div>
        <div className="pt-4">
          <button
            onClick={() => toast.success('Security settings saved.')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Save Policies
          </button>
        </div>
      </div>

      {/* Failed logins */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            Recent Failed Logins
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Email
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                IP Address
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Attempts
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Time
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-20 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FAILED_LOGINS.map((fl) => (
              <tr
                key={fl.email + fl.time}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground text-sm">
                  {fl.email}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">
                  {fl.ip}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'text-sm font-bold',
                      fl.attempts >= 5
                        ? 'text-destructive'
                        : fl.attempts >= 3
                          ? 'text-amber-500'
                          : 'text-foreground'
                    )}
                  >
                    {fl.attempts}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                  {fl.time}
                </td>
                <td className="px-4 py-3">
                  {fl.blocked ? (
                    <Badge variant="destructive" dot size="sm">
                      Blocked
                    </Badge>
                  ) : (
                    <Badge variant="secondary" dot size="sm">
                      Allowed
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      toast.success(
                        `IP ${fl.ip} ${fl.blocked ? 'unblocked' : 'blocked'}.`
                      )
                    }
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md border border-border transition-colors',
                      fl.blocked
                        ? 'hover:bg-emerald-500/10 text-emerald-600'
                        : 'hover:bg-destructive/10 text-destructive'
                    )}
                  >
                    {fl.blocked ? 'Unblock' : 'Block IP'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active sessions */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Active Sessions</h3>
          <button
            onClick={() => toast.success('All other sessions revoked.')}
            className="text-xs text-destructive hover:underline font-medium"
          >
            Revoke all sessions
          </button>
        </div>
        <div className="divide-y divide-border">
          {ACTIVE_SESSIONS.map((session) => (
            <div
              key={session.user + session.ip}
              className="flex items-center justify-between px-5 py-3 gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {session.user}
                  </p>
                  <Badge variant="secondary" size="sm" className="capitalize">
                    {session.role}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {session.device} · {session.ip} · {session.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {session.duration}
                </span>
                <button
                  onClick={() =>
                    toast.success(`Session revoked for ${session.user}.`)
                  }
                  className="text-xs text-destructive hover:underline"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
