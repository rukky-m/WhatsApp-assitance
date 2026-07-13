import { useState } from 'react'
import {
  Bell,
  Plus,
  Trash2,
  Send,
  Globe,
  Users,
  ShieldCheck,
  User,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'

type NotifType = 'system' | 'billing' | 'security' | 'feature' | 'maintenance'
type AudienceType = 'all' | 'users' | 'admins' | 'moderators'
type DeliveryChannel = 'in_app' | 'email' | 'both'

interface SystemNotification {
  id: string
  title: string
  body: string
  type: NotifType
  audience: AudienceType
  channel: DeliveryChannel
  status: 'sent' | 'scheduled' | 'draft'
  sentAt: string
  recipients: number
}

const seed: SystemNotification[] = [
  {
    id: 'n1',
    title: 'Maintenance window: July 10, 02:00–04:00 UTC',
    body: 'We will perform infrastructure maintenance. The platform may be briefly unavailable.',
    type: 'maintenance',
    audience: 'all',
    channel: 'both',
    status: 'scheduled',
    sentAt: '2026-07-10 00:00',
    recipients: 500,
  },
  {
    id: 'n2',
    title: 'New feature: Multi-language AI replies',
    body: 'AI replies now support Arabic, Spanish, French, and Portuguese.',
    type: 'feature',
    audience: 'users',
    channel: 'in_app',
    status: 'sent',
    sentAt: '2026-07-05 10:00',
    recipients: 496,
  },
  {
    id: 'n3',
    title: 'Your subscription renews in 3 days',
    body: 'This is a reminder that your Growth plan subscription renews on August 1, 2026.',
    type: 'billing',
    audience: 'users',
    channel: 'email',
    status: 'sent',
    sentAt: '2026-07-04 09:00',
    recipients: 471,
  },
  {
    id: 'n4',
    title: 'Security update: New login from unknown device',
    body: "We detected a new login to your account from a device we don't recognize.",
    type: 'security',
    audience: 'users',
    channel: 'both',
    status: 'sent',
    sentAt: '2026-07-03 14:22',
    recipients: 3,
  },
  {
    id: 'n5',
    title: 'Platform usage report — June 2026',
    body: 'Your monthly summary is ready. View it in your Analytics dashboard.',
    type: 'system',
    audience: 'users',
    channel: 'email',
    status: 'sent',
    sentAt: '2026-07-01 08:00',
    recipients: 471,
  },
]

const typeConfig: Record<
  NotifType,
  { badge: React.ReactNode; icon: React.ReactNode }
> = {
  maintenance: {
    badge: (
      <Badge variant="warning" size="sm">
        Maintenance
      </Badge>
    ),
    icon: <Globe size={12} />,
  },
  billing: {
    badge: (
      <Badge variant="info" size="sm">
        Billing
      </Badge>
    ),
    icon: <User size={12} />,
  },
  security: {
    badge: (
      <Badge variant="destructive" size="sm">
        Security
      </Badge>
    ),
    icon: <ShieldCheck size={12} />,
  },
  feature: {
    badge: (
      <Badge variant="success" size="sm">
        Feature
      </Badge>
    ),
    icon: <Bell size={12} />,
  },
  system: {
    badge: (
      <Badge variant="secondary" size="sm">
        System
      </Badge>
    ),
    icon: <Globe size={12} />,
  },
}

const audienceIcon: Record<AudienceType, React.ReactNode> = {
  all: <Globe size={12} />,
  users: <Users size={12} />,
  admins: <ShieldCheck size={12} />,
  moderators: <User size={12} />,
}

export const PlatformNotifications = () => {
  const [notifs, setNotifs] = useState(seed)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    body: '',
    type: 'system' as NotifType,
    audience: 'all' as AudienceType,
    channel: 'in_app' as DeliveryChannel,
    sendNow: true,
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setNotifs((prev) => [
      {
        id: `n${Date.now()}`,
        title: form.title,
        body: form.body,
        type: form.type,
        audience: form.audience,
        channel: form.channel,
        status: form.sendNow ? 'sent' : 'draft',
        sentAt: form.sendNow
          ? new Date().toISOString().replace('T', ' ').slice(0, 16)
          : '—',
        recipients: form.sendNow ? 500 : 0,
      },
      ...prev,
    ])
    setShowForm(false)
    setForm({
      title: '',
      body: '',
      type: 'system',
      audience: 'all',
      channel: 'in_app',
      sendNow: true,
    })
    toast.success(form.sendNow ? 'Notification sent.' : 'Saved as draft.')
  }

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id))
    toast.success('Notification deleted.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Send platform notifications to users, admins, and moderators via
            in-app or email.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Notification
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Sent',
            value: notifs.filter((n) => n.status === 'sent').length,
          },
          {
            label: 'Scheduled',
            value: notifs.filter((n) => n.status === 'scheduled').length,
          },
          {
            label: 'Drafts',
            value: notifs.filter((n) => n.status === 'draft').length,
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
          <h2 className="font-semibold text-foreground">New Notification</h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Notification title"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              required
              rows={3}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Notification body..."
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Type',
                key: 'type' as const,
                options: [
                  ['system', 'System'],
                  ['feature', 'Feature'],
                  ['billing', 'Billing'],
                  ['maintenance', 'Maintenance'],
                  ['security', 'Security'],
                ],
              },
              {
                label: 'Audience',
                key: 'audience' as const,
                options: [
                  ['all', 'All'],
                  ['users', 'Users'],
                  ['admins', 'Admins'],
                  ['moderators', 'Moderators'],
                ],
              },
              {
                label: 'Channel',
                key: 'channel' as const,
                options: [
                  ['in_app', 'In-App Only'],
                  ['email', 'Email Only'],
                  ['both', 'Both'],
                ],
              },
            ].map(({ label, key, options }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  {label}
                </label>
                <select
                  value={form[key] as string}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {options.map(([val, lbl]) => (
                    <option key={val} value={val}>
                      {lbl}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sendNow"
              checked={form.sendNow}
              onChange={(e) => setForm({ ...form, sendNow: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <label
              htmlFor="sendNow"
              className="text-sm font-medium text-foreground"
            >
              Send immediately
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Send size={14} /> {form.sendNow ? 'Send Now' : 'Save Draft'}
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
        {notifs.map((n) => (
          <div
            key={n.id}
            className="bg-background rounded-xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-foreground text-sm">
                      {n.title}
                    </p>
                    {typeConfig[n.type].badge}
                    <Badge
                      variant={
                        n.status === 'sent'
                          ? 'success'
                          : n.status === 'scheduled'
                            ? 'info'
                            : 'secondary'
                      }
                      dot
                      size="sm"
                      className="capitalize"
                    >
                      {n.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {n.body}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {audienceIcon[n.audience]}{' '}
                      <span className="capitalize">
                        {n.audience === 'all' ? 'Everyone' : n.audience}
                      </span>
                    </span>
                    <span>·</span>
                    <span>{n.channel.replace('_', '-')}</span>
                    {n.recipients > 0 && (
                      <>
                        <span>·</span>
                        <span>{n.recipients.toLocaleString()} recipients</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{n.sentAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {n.status === 'draft' && (
                  <button
                    onClick={() => {
                      setNotifs((prev) =>
                        prev.map((x) =>
                          x.id === n.id
                            ? {
                                ...x,
                                status: 'sent' as const,
                                sentAt: 'Just now',
                              }
                            : x
                        )
                      )
                      toast.success('Notification sent.')
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Send size={11} /> Send
                  </button>
                )}
                <button
                  onClick={() => deleteNotif(n.id)}
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
