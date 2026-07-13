import { useState, useMemo } from 'react'
import { MoreVertical, UserX, Mail, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { Avatar, Badge, Dropdown, SearchInput } from '@/components/ui'
import { cn } from '@/utils/cn'

type UserStatus = 'active' | 'suspended' | 'pending'
type UserRole = 'user' | 'moderator'

interface ManagedUser {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  plan: string
  joined: string
  messages: number
}

const seed: ManagedUser[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 555 001 0001',
    role: 'user',
    status: 'active',
    plan: 'Growth',
    joined: 'Jan 2026',
    messages: 1241,
  },
  {
    id: 'u2',
    name: 'Maya Ibrahim',
    email: 'maya@example.com',
    phone: '+20 101 887 6202',
    role: 'user',
    status: 'active',
    plan: 'Starter',
    joined: 'Feb 2026',
    messages: 482,
  },
  {
    id: 'u3',
    name: 'Noah Trends',
    email: 'noah@trends.ae',
    phone: '+971 55 904 1133',
    role: 'user',
    status: 'active',
    plan: 'Growth',
    joined: 'Jan 2026',
    messages: 891,
  },
  {
    id: 'u4',
    name: 'Aisha Kareem',
    email: 'aisha@example.com',
    phone: '+966 53 220 9111',
    role: 'user',
    status: 'pending',
    plan: 'Starter',
    joined: 'Jun 2026',
    messages: 42,
  },
  {
    id: 'u5',
    name: 'Omar Electronics',
    email: 'omar@elec.ae',
    phone: '+971 50 722 4422',
    role: 'user',
    status: 'active',
    plan: 'Scale',
    joined: 'Nov 2025',
    messages: 4291,
  },
  {
    id: 'u6',
    name: 'Metro Logistics',
    email: 'ops@metro.com',
    phone: '+971 55 111 2233',
    role: 'user',
    status: 'suspended',
    plan: 'Growth',
    joined: 'Mar 2026',
    messages: 301,
  },
  {
    id: 'u7',
    name: 'Priya Nair',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    role: 'moderator',
    status: 'active',
    plan: 'Staff',
    joined: 'Jan 2026',
    messages: 0,
  },
  {
    id: 'u8',
    name: 'Lina Boutique',
    email: 'lina@boutique.eg',
    phone: '+20 122 345 6789',
    role: 'user',
    status: 'active',
    plan: 'Starter',
    joined: 'Apr 2026',
    messages: 189,
  },
]

const statusBadge: Record<UserStatus, React.ReactNode> = {
  active: (
    <Badge variant="success" dot size="sm">
      Active
    </Badge>
  ),
  suspended: (
    <Badge variant="destructive" dot size="sm">
      Suspended
    </Badge>
  ),
  pending: (
    <Badge variant="warning" dot size="sm">
      Pending
    </Badge>
  ),
}

export const ModeratorUsers = () => {
  const [users, setUsers] = useState(seed)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all')

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const matchSearch =
          !search ||
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || u.status === statusFilter
        return matchSearch && matchStatus
      }),
    [users, search, statusFilter]
  )

  const toggleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === 'suspended'
                  ? 'active'
                  : ('suspended' as UserStatus),
            }
          : u
      )
    )
    toast.success('User status updated.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Users
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Monitor and manage all registered users.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email..."
          containerClassName="w-60"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'active', 'suspended', 'pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all',
                statusFilter === s
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} users
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                User
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                Role
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Plan
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Messages
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No users found.
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={u.name}
                      size="sm"
                      status={u.status === 'active' ? 'online' : 'offline'}
                    />
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge
                    variant={u.role === 'moderator' ? 'warning' : 'secondary'}
                    size="sm"
                    className="capitalize"
                  >
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                  {u.plan}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell font-medium text-foreground">
                  {u.messages.toLocaleString()}
                </td>
                <td className="px-4 py-3">{statusBadge[u.status]}</td>
                <td className="px-4 py-3">
                  <Dropdown
                    align="right"
                    trigger={
                      <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    }
                    items={[
                      {
                        label: 'View Profile',
                        icon: <Eye size={13} />,
                        onClick: () => toast.success(`Viewing ${u.name}`),
                      },
                      {
                        label: 'Send Email',
                        icon: <Mail size={13} />,
                        onClick: () =>
                          toast.success(`Email sent to ${u.email}`),
                      },
                      { separator: true },
                      {
                        label:
                          u.status === 'suspended'
                            ? 'Reactivate User'
                            : 'Suspend User',
                        icon: <UserX size={13} />,
                        onClick: () => toggleSuspend(u.id),
                        variant:
                          u.status === 'suspended' ? 'default' : 'destructive',
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
