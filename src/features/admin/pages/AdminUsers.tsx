import { useState, useMemo } from 'react'
import { MoreVertical, Mail, UserX, UserCheck, Eye, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Avatar,
  Badge,
  Dropdown,
  SearchInput,
  Pagination,
} from '@/components/ui'
import { cn } from '@/utils/cn'
import { useTableSort } from '@/hooks/useTableSort'

type UserStatus = 'active' | 'suspended' | 'pending'
type UserPlan = 'Starter' | 'Growth' | 'Scale'
type UserRole = 'user' | 'moderator' | 'admin'

interface PlatformUser {
  id: string
  name: string
  email: string
  role: UserRole
  plan: UserPlan
  status: UserStatus
  messages: number
  revenue: number
  joined: string
  country: string
}

const seed: PlatformUser[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'user',
    plan: 'Growth',
    status: 'active',
    messages: 1241,
    revenue: 79,
    joined: 'Jan 2026',
    country: 'USA',
  },
  {
    id: 'u2',
    name: 'Maya Ibrahim',
    email: 'maya@example.com',
    role: 'user',
    plan: 'Starter',
    status: 'active',
    messages: 482,
    revenue: 29,
    joined: 'Feb 2026',
    country: 'Egypt',
  },
  {
    id: 'u3',
    name: 'Noah Trends',
    email: 'noah@trends.ae',
    role: 'user',
    plan: 'Growth',
    status: 'active',
    messages: 891,
    revenue: 79,
    joined: 'Jan 2026',
    country: 'UAE',
  },
  {
    id: 'u4',
    name: 'Aisha Kareem',
    email: 'aisha@example.com',
    role: 'user',
    plan: 'Starter',
    status: 'pending',
    messages: 42,
    revenue: 0,
    joined: 'Jun 2026',
    country: 'Saudi Arabia',
  },
  {
    id: 'u5',
    name: 'Omar Electronics',
    email: 'omar@elec.ae',
    role: 'user',
    plan: 'Scale',
    status: 'active',
    messages: 4291,
    revenue: 199,
    joined: 'Nov 2025',
    country: 'UAE',
  },
  {
    id: 'u6',
    name: 'Metro Logistics',
    email: 'ops@metro.com',
    role: 'user',
    plan: 'Growth',
    status: 'suspended',
    messages: 301,
    revenue: 0,
    joined: 'Mar 2026',
    country: 'UAE',
  },
  {
    id: 'u7',
    name: 'Sam Rivera',
    email: 'sam@chatflow.ai',
    role: 'moderator',
    plan: 'Growth',
    status: 'active',
    messages: 0,
    revenue: 0,
    joined: 'Jan 2026',
    country: 'USA',
  },
  {
    id: 'u8',
    name: 'Lina Boutique',
    email: 'lina@boutique.eg',
    role: 'user',
    plan: 'Starter',
    status: 'active',
    messages: 189,
    revenue: 29,
    joined: 'Apr 2026',
    country: 'Egypt',
  },
  {
    id: 'u9',
    name: 'TechFlow Solutions',
    email: 'info@techflow.com',
    role: 'user',
    plan: 'Scale',
    status: 'active',
    messages: 6820,
    revenue: 199,
    joined: 'Nov 2025',
    country: 'USA',
  },
  {
    id: 'u10',
    name: 'RetailHub UAE',
    email: 'ops@retailhub.ae',
    role: 'user',
    plan: 'Scale',
    status: 'active',
    messages: 3441,
    revenue: 199,
    joined: 'Dec 2025',
    country: 'UAE',
  },
  {
    id: 'u11',
    name: 'GreenLeaf Market',
    email: 'hello@greenleaf.com',
    role: 'user',
    plan: 'Starter',
    status: 'pending',
    messages: 0,
    revenue: 0,
    joined: 'Jul 2026',
    country: 'UK',
  },
  {
    id: 'u12',
    name: 'FastShip Logistics',
    email: 'admin@fastship.com',
    role: 'user',
    plan: 'Growth',
    status: 'active',
    messages: 729,
    revenue: 79,
    joined: 'Jun 2026',
    country: 'Germany',
  },
]

const PAGE_SIZE = 8

const planBadge: Record<UserPlan, React.ReactNode> = {
  Starter: (
    <Badge variant="secondary" size="sm">
      Starter
    </Badge>
  ),
  Growth: (
    <Badge variant="info" size="sm">
      Growth
    </Badge>
  ),
  Scale: (
    <Badge variant="success" size="sm">
      Scale
    </Badge>
  ),
}

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

export const AdminUsers = () => {
  const [users, setUsers] = useState(seed)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all')
  const [planFilter, setPlanFilter] = useState<UserPlan | 'all'>('all')
  const [page, setPage] = useState(1)
  const { handleSort } = useTableSort('joined')

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase()
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || u.status === statusFilter
      const matchPlan = planFilter === 'all' || u.plan === planFilter
      return matchSearch && matchStatus && matchPlan
    })
  }, [users, search, statusFilter, planFilter])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

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

  const promoteToMod = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: 'moderator' as UserRole } : u
      )
    )
    toast.success('User promoted to moderator.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Users
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage all platform users, roles, and access.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: users.length },
          {
            label: 'Active',
            value: users.filter((u) => u.status === 'active').length,
          },
          {
            label: 'Suspended',
            value: users.filter((u) => u.status === 'suspended').length,
          },
          {
            label: 'Pending',
            value: users.filter((u) => u.status === 'pending').length,
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
          containerClassName="w-56"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'active', 'suspended', 'pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s)
                setPage(1)
              }}
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
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(['all', 'Starter', 'Growth', 'Scale'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPlanFilter(p)
                setPage(1)
              }}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                planFilter === p
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p}
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
              <th
                className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell cursor-pointer hover:text-foreground"
                onClick={() => handleSort('plan')}
              >
                Plan
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell cursor-pointer hover:text-foreground"
                onClick={() => handleSort('revenue')}
              >
                Revenue
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                Country
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No users found.
                </td>
              </tr>
            )}
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
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge
                    variant={
                      u.role === 'admin'
                        ? 'destructive'
                        : u.role === 'moderator'
                          ? 'warning'
                          : 'secondary'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {planBadge[u.plan]}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell font-medium text-foreground">
                  {u.revenue > 0 ? `$${u.revenue}/mo` : '—'}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">
                  {u.country}
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
                        label: 'View Details',
                        icon: <Eye size={13} />,
                        onClick: () => toast.success(`Viewing ${u.name}`),
                      },
                      {
                        label: 'Send Email',
                        icon: <Mail size={13} />,
                        onClick: () =>
                          toast.success(`Email sent to ${u.email}`),
                      },
                      ...(u.role === 'user'
                        ? [
                            {
                              label: 'Promote to Moderator',
                              icon: <Shield size={13} />,
                              onClick: () => promoteToMod(u.id),
                            },
                          ]
                        : []),
                      { separator: true as const },
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
                          u.status === 'suspended'
                            ? ('default' as const)
                            : ('destructive' as const),
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
