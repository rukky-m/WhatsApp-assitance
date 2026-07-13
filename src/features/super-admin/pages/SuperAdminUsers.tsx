import { useState, useMemo } from 'react'
import { MoreVertical, Mail, UserX, UserCheck, Shield, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Avatar,
  Badge,
  Dropdown,
  SearchInput,
  Pagination,
} from '@/components/ui'
import { cn } from '@/utils/cn'

type AnyRole = 'user' | 'moderator' | 'admin' | 'super-admin'
type UserStatus = 'active' | 'suspended' | 'pending'

interface PlatformUser {
  id: string
  name: string
  email: string
  role: AnyRole
  status: UserStatus
  plan: string
  joined: string
  lastLogin: string
}

const ROLE_COLORS: Record<AnyRole, string> = {
  user: 'secondary',
  moderator: 'warning',
  admin: 'info',
  'super-admin': 'destructive',
}

const seed: PlatformUser[] = [
  {
    id: 'u1',
    name: 'Morgan Chen',
    email: 'superadmin@demo.com',
    role: 'super-admin',
    status: 'active',
    plan: 'Staff',
    joined: 'Jan 2026',
    lastLogin: '5m ago',
  },
  {
    id: 'u2',
    name: 'Jordan Lee',
    email: 'admin@demo.com',
    role: 'admin',
    status: 'active',
    plan: 'Staff',
    joined: 'Jan 2026',
    lastLogin: '1h ago',
  },
  {
    id: 'u3',
    name: 'Sam Rivera',
    email: 'moderator@demo.com',
    role: 'moderator',
    status: 'active',
    plan: 'Staff',
    joined: 'Jan 2026',
    lastLogin: '2h ago',
  },
  {
    id: 'u4',
    name: 'Priya Nair',
    email: 'priya@chatflow.ai',
    role: 'moderator',
    status: 'active',
    plan: 'Staff',
    joined: 'Jan 2026',
    lastLogin: '1d ago',
  },
  {
    id: 'u5',
    name: 'Alex Johnson',
    email: 'user@demo.com',
    role: 'user',
    status: 'active',
    plan: 'Growth',
    joined: 'Jan 2026',
    lastLogin: '3h ago',
  },
  {
    id: 'u6',
    name: 'Maya Ibrahim',
    email: 'maya@example.com',
    role: 'user',
    status: 'active',
    plan: 'Starter',
    joined: 'Feb 2026',
    lastLogin: '1h ago',
  },
  {
    id: 'u7',
    name: 'Omar Electronics',
    email: 'omar@elec.ae',
    role: 'user',
    status: 'active',
    plan: 'Scale',
    joined: 'Nov 2025',
    lastLogin: '4h ago',
  },
  {
    id: 'u8',
    name: 'Metro Logistics',
    email: 'ops@metro.com',
    role: 'user',
    status: 'suspended',
    plan: 'Growth',
    joined: 'Mar 2026',
    lastLogin: '5d ago',
  },
  {
    id: 'u9',
    name: 'TechFlow Solutions',
    email: 'info@techflow.com',
    role: 'user',
    status: 'active',
    plan: 'Scale',
    joined: 'Nov 2025',
    lastLogin: '2h ago',
  },
  {
    id: 'u10',
    name: 'GreenLeaf Market',
    email: 'hello@greenleaf.com',
    role: 'user',
    status: 'pending',
    plan: 'Starter',
    joined: 'Jul 2026',
    lastLogin: 'Never',
  },
]

const PAGE_SIZE = 8

export const SuperAdminUsers = () => {
  const [users, setUsers] = useState(seed)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<AnyRole | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const q = search.toLowerCase()
        const matchSearch =
          !search ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        const matchRole = roleFilter === 'all' || u.role === roleFilter
        const matchStatus = statusFilter === 'all' || u.status === statusFilter
        return matchSearch && matchRole && matchStatus
      }),
    [users, search, roleFilter, statusFilter]
  )

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const toggleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: (u.status === 'suspended'
                ? 'active'
                : 'suspended') as UserStatus,
            }
          : u
      )
    )
    toast.success('User updated.')
  }

  const changeRole = (id: string, role: AnyRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)))
    toast.success(`Role changed to ${role}.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          All Users
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Full user management across all roles and plans.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {(['user', 'moderator', 'admin', 'super-admin'] as AnyRole[]).map(
          (r) => (
            <div
              key={r}
              className="bg-background rounded-xl border border-border p-4 text-center"
            >
              <p className="text-2xl font-bold text-foreground">
                {users.filter((u) => u.role === r).length}
              </p>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {r}s
              </p>
            </div>
          )
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
          containerClassName="w-56"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'user', 'moderator', 'admin', 'super-admin'] as const).map(
            (r) => (
              <button
                key={r}
                onClick={() => {
                  setRoleFilter(r)
                  setPage(1)
                }}
                className={cn(
                  'px-2.5 py-1.5 rounded-md text-xs font-medium capitalize whitespace-nowrap transition-all',
                  roleFilter === r
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {r === 'super-admin' ? 'SA' : r}
              </button>
            )
          )}
        </div>
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'active', 'suspended', 'pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s)
                setPage(1)
              }}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-medium capitalize transition-all',
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

      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                User
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Role
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Plan
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                Last Login
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((u) => (
              <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={u.name}
                      size="sm"
                      status={u.status === 'active' ? 'online' : 'offline'}
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {u.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      ROLE_COLORS[u.role] as
                        'secondary' | 'warning' | 'info' | 'destructive'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                  {u.plan}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">
                  {u.lastLogin}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      u.status === 'active'
                        ? 'success'
                        : u.status === 'suspended'
                          ? 'destructive'
                          : 'warning'
                    }
                    dot
                    size="sm"
                    className="capitalize"
                  >
                    {u.status}
                  </Badge>
                </td>
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
                        onClick: () => toast.success(`Profile: ${u.name}`),
                      },
                      {
                        label: 'Send Email',
                        icon: <Mail size={13} />,
                        onClick: () => toast.success(`Email: ${u.email}`),
                      },
                      { separator: true },
                      {
                        label: 'Set as Moderator',
                        icon: <Shield size={13} />,
                        onClick: () => changeRole(u.id, 'moderator'),
                      },
                      {
                        label: 'Set as Admin',
                        icon: <Shield size={13} />,
                        onClick: () => changeRole(u.id, 'admin'),
                      },
                      { separator: true },
                      {
                        label:
                          u.status === 'suspended' ? 'Reactivate' : 'Suspend',
                        icon:
                          u.status === 'suspended' ? (
                            <UserCheck size={13} />
                          ) : (
                            <UserX size={13} />
                          ),
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
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
