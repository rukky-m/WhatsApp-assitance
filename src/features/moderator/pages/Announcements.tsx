import { useState } from 'react'
import {
  Plus,
  Megaphone,
  Trash2,
  Send,
  Globe,
  Users,
  UserCheck,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'

type AudienceType = 'all' | 'users' | 'moderators'
type AnnouncementStatus = 'draft' | 'published' | 'scheduled'

interface Announcement {
  id: string
  title: string
  body: string
  audience: AudienceType
  status: AnnouncementStatus
  publishedAt: string
  author: string
  views: number
}

const seed: Announcement[] = [
  {
    id: 'AN-5',
    title: 'Scheduled maintenance — July 10 from 2–4 AM UTC',
    body: 'We will be performing infrastructure maintenance. The platform may be unavailable for up to 30 minutes during this window.',
    audience: 'all',
    status: 'published',
    publishedAt: '2026-07-07 09:00',
    author: 'Sam Rivera',
    views: 241,
  },
  {
    id: 'AN-4',
    title: 'New feature: Multi-language AI replies',
    body: 'AI replies now support Arabic, Spanish, French, and Portuguese. Configure your preferred language in Settings → AI Configuration.',
    audience: 'users',
    status: 'published',
    publishedAt: '2026-07-05 10:00',
    author: 'Sam Rivera',
    views: 189,
  },
  {
    id: 'AN-3',
    title: 'Updated moderation guidelines',
    body: 'We have updated the content moderation policy. All moderators are required to review the new guidelines by July 15.',
    audience: 'moderators',
    status: 'published',
    publishedAt: '2026-07-03 08:00',
    author: 'Sam Rivera',
    views: 12,
  },
  {
    id: 'AN-2',
    title: 'Upcoming pricing changes — August 2026',
    body: 'We will be adjusting our Starter plan pricing from $29 to $34/month starting August 1, 2026. Existing customers will be grandfathered for 6 months.',
    audience: 'users',
    status: 'scheduled',
    publishedAt: '2026-07-25 09:00',
    author: 'Sam Rivera',
    views: 0,
  },
  {
    id: 'AN-1',
    title: 'Draft: Q3 product roadmap preview',
    body: 'Coming Q3: native mobile app, Zapier integration, and advanced AI fine-tuning for your knowledge base.',
    audience: 'all',
    status: 'draft',
    publishedAt: '—',
    author: 'Sam Rivera',
    views: 0,
  },
]

const audienceIcon: Record<AudienceType, React.ReactNode> = {
  all: <Globe size={12} />,
  users: <Users size={12} />,
  moderators: <UserCheck size={12} />,
}

const statusBadge: Record<AnnouncementStatus, React.ReactNode> = {
  published: (
    <Badge variant="success" dot size="sm">
      Published
    </Badge>
  ),
  scheduled: (
    <Badge variant="info" dot size="sm">
      Scheduled
    </Badge>
  ),
  draft: (
    <Badge variant="secondary" dot size="sm">
      Draft
    </Badge>
  ),
}

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState(seed)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    body: '',
    audience: 'all' as AudienceType,
    publish: 'now',
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newAnn: Announcement = {
      id: `AN-${Date.now()}`,
      title: form.title,
      body: form.body,
      audience: form.audience,
      status: form.publish === 'now' ? 'published' : 'draft',
      publishedAt:
        form.publish === 'now'
          ? new Date().toISOString().slice(0, 16).replace('T', ' ')
          : '—',
      author: 'Sam Rivera',
      views: 0,
    }
    setAnnouncements((prev) => [newAnn, ...prev])
    setShowForm(false)
    setForm({ title: '', body: '', audience: 'all', publish: 'now' })
    toast.success(
      form.publish === 'now' ? 'Announcement published.' : 'Saved as draft.'
    )
  }

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    toast.success('Announcement deleted.')
  }

  const handlePublish = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'published',
              publishedAt: new Date()
                .toISOString()
                .slice(0, 16)
                .replace('T', ' '),
            }
          : a
      )
    )
    toast.success('Announcement published.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Announcements
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Send platform-wide or targeted announcements to users and
            moderators.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Published',
            value: announcements.filter((a) => a.status === 'published').length,
            color: 'text-emerald-500',
          },
          {
            label: 'Scheduled',
            value: announcements.filter((a) => a.status === 'scheduled').length,
            color: 'text-blue-500',
          },
          {
            label: 'Drafts',
            value: announcements.filter((a) => a.status === 'draft').length,
            color: 'text-muted-foreground',
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

      {/* Create form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-border bg-background shadow-sm p-6"
          >
            <h2 className="font-semibold text-foreground mb-4">
              New Announcement
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Announcement title"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Write the announcement body..."
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Audience
                  </label>
                  <select
                    value={form.audience}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        audience: e.target.value as AudienceType,
                      })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="all">All users</option>
                    <option value="users">Users only</option>
                    <option value="moderators">Moderators only</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Action
                  </label>
                  <select
                    value={form.publish}
                    onChange={(e) =>
                      setForm({ ...form, publish: e.target.value })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="now">Publish now</option>
                    <option value="draft">Save as draft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Send size={14} />{' '}
                  {form.publish === 'now' ? 'Publish' : 'Save Draft'}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="space-y-3">
        {announcements.map((ann) => (
          <motion.div
            key={ann.id}
            layout
            className="rounded-xl border border-border bg-background shadow-sm p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Megaphone size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-foreground text-sm">
                      {ann.title}
                    </p>
                    {statusBadge[ann.status]}
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">
                      {audienceIcon[ann.audience]}
                      <span className="capitalize">
                        {ann.audience === 'all' ? 'Everyone' : ann.audience}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ann.body}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    By {ann.author} ·{' '}
                    {ann.publishedAt !== '—'
                      ? ann.publishedAt
                      : 'Not published'}
                    {ann.views > 0 && ` · ${ann.views} views`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {ann.status === 'draft' && (
                  <button
                    onClick={() => handlePublish(ann.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Send size={11} /> Publish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(ann.id)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
