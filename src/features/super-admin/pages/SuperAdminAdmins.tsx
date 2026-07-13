import { useState } from 'react'
import { Plus, Trash2, Shield, UserX, UserCheck, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge, Avatar, Dropdown } from '@/components/ui'

type StaffRole = 'admin' | 'moderator' | 'super-admin'
type StaffStatus = 'active' | 'suspended'

interface StaffMember {
  id: string
  name: string
  email: string
  role: StaffRole
  status: StaffStatus
  joined: string
  lastLogin: string
  permissions: string[]
}

const seed: StaffMember[] = [
  {
    id: 's1',
    name: 'Morgan Chen',
    email: 'superadmin@demo.com',
    role: 'super-admin',
    status: 'active',
    joined: 'Jan 2026',
    lastLogin: '5m ago',
    permissions: ['All permissions'],
  },
  {
    id: 's2',
    name: 'Jordan Lee',
    email: 'admin@demo.com',
    role: 'admin',
    status: 'active',
    joined: 'Jan 2026',
    lastLogin: '1h ago',
    permissions: [
      'Users',
      'Subscriptions',
      'Analytics',
      'AI Models',
      'Settings',
      'Support',
      'Logs',
    ],
  },
  {
    id: 's3',
    name: 'Sam Rivera',
    email: 'moderator@demo.com',
    role: 'moderator',
    status: 'active',
    joined: 'Jan 2026',
    lastLogin: '2h ago',
    permissions: [
      'Users (view)',
      'Flagged Messages',
      'Support Tickets',
      'Logs',
      'Announcements',
    ],
  },
  {
    id: 's4',
    name: 'Priya Nair',
    email: 'priya@chatflow.ai',
    role: 'moderator',
    status: 'active',
    joined: 'Jan 2026',
    lastLogin: '1d ago',
    permissions: ['Users (view)', 'Flagged Messages', 'Support Tickets'],
  },
]

const roleBadge: Record<StaffRole, React.ReactNode> = {
  'super-admin': (
    <Badge variant="destructive" size="sm">
      Super Admin
    </Badge>
  ),
  admin: (
    <Badge variant="info" size="sm">
      Admin
    </Badge>
  ),
  moderator: (
    <Badge variant="warning" size="sm">
      Moderator
    </Badge>
  ),
}

export const SuperAdminAdmins = () => {
  const [staff, setStaff] = useState(seed)
  const [showInvite, setShowInvite] = useState(false)
  const [invite, setInvite] = useState({
    name: '',
    email: '',
    role: 'moderator' as StaffRole,
  })

  const toggleSuspend = (id: string) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status:
                s.status === 'suspended'
                  ? 'active'
                  : ('suspended' as StaffStatus),
            }
          : s
      )
    )
    toast.success('Staff status updated.')
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember: StaffMember = {
      id: `s${Date.now()}`,
      name: invite.name,
      email: invite.email,
      role: invite.role,
      status: 'active',
      joined: 'Today',
      lastLogin: 'Never',
      permissions: ['Basic access'],
    }
    setStaff((prev) => [...prev, newMember])
    setShowInvite(false)
    setInvite({ name: '', email: '', role: 'moderator' })
    toast.success(`Invitation sent to ${invite.email}.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admins & Moderators
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage all staff accounts and their access levels.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} /> Invite Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {(['super-admin', 'admin', 'moderator'] as StaffRole[]).map((r) => (
          <div
            key={r}
            className="bg-background rounded-xl border border-border p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">
              {staff.filter((s) => s.role === r).length}
            </p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {r}s
            </p>
          </div>
        ))}
      </div>

      {/* Invite form */}
      {showInvite && (
        <form
          onSubmit={handleInvite}
          className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4"
        >
          <h2 className="font-semibold text-foreground">Invite Staff Member</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                required
                value={invite.name}
                onChange={(e) => setInvite({ ...invite, name: e.target.value })}
                placeholder="Jane Smith"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                required
                type="email"
                value={invite.email}
                onChange={(e) =>
                  setInvite({ ...invite, email: e.target.value })
                }
                placeholder="jane@chatflow.ai"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Role
              </label>
              <select
                value={invite.role}
                onChange={(e) =>
                  setInvite({ ...invite, role: e.target.value as StaffRole })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Send Invite
            </button>
            <button
              type="button"
              onClick={() => setShowInvite(false)}
              className="px-5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Staff list */}
      <div className="space-y-3">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-background rounded-xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar
                  name={member.name}
                  size="lg"
                  status={member.status === 'active' ? 'online' : 'offline'}
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-foreground">
                      {member.name}
                    </p>
                    {roleBadge[member.role]}
                    <Badge
                      variant={
                        member.status === 'active' ? 'success' : 'destructive'
                      }
                      dot
                      size="sm"
                      className="capitalize"
                    >
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Joined {member.joined} · Last login {member.lastLogin}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.permissions.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {member.role !== 'super-admin' && (
                <Dropdown
                  align="right"
                  trigger={
                    <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Shield size={14} />
                    </button>
                  }
                  items={[
                    {
                      label: 'Send Email',
                      icon: <Mail size={13} />,
                      onClick: () =>
                        toast.success(`Email sent to ${member.email}`),
                    },
                    { separator: true },
                    {
                      label:
                        member.status === 'suspended'
                          ? 'Reactivate Account'
                          : 'Suspend Account',
                      icon:
                        member.status === 'suspended' ? (
                          <UserCheck size={13} />
                        ) : (
                          <UserX size={13} />
                        ),
                      onClick: () => toggleSuspend(member.id),
                      variant:
                        member.status === 'suspended'
                          ? 'default'
                          : 'destructive',
                    },
                    {
                      label: 'Remove from team',
                      icon: <Trash2 size={13} />,
                      onClick: () => {
                        setStaff((p) => p.filter((s) => s.id !== member.id))
                        toast.success('Staff removed.')
                      },
                      variant: 'destructive',
                    },
                  ]}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
