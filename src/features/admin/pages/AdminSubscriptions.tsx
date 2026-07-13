import { useState } from 'react'
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MoreVertical,
  Ban,
  RefreshCw,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge, Dropdown, Pagination, SearchInput } from '@/components/ui'
import { cn } from '@/utils/cn'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

type SubStatus = 'active' | 'cancelled' | 'past_due' | 'trialing'

interface Subscription {
  id: string
  user: string
  email: string
  plan: string
  status: SubStatus
  amount: number
  startDate: string
  nextBilling: string
  paymentMethod: string
}

const seed: Subscription[] = [
  {
    id: 'sub_001',
    user: 'Alex Johnson',
    email: 'alex@example.com',
    plan: 'Growth',
    status: 'active',
    amount: 79,
    startDate: 'Jan 1, 2026',
    nextBilling: 'Aug 1, 2026',
    paymentMethod: 'Visa ••4242',
  },
  {
    id: 'sub_002',
    user: 'Omar Electronics',
    email: 'omar@elec.ae',
    plan: 'Scale',
    status: 'active',
    amount: 199,
    startDate: 'Nov 1, 2025',
    nextBilling: 'Aug 1, 2026',
    paymentMethod: 'Mastercard ••9871',
  },
  {
    id: 'sub_003',
    user: 'Maya Ibrahim',
    email: 'maya@example.com',
    plan: 'Starter',
    status: 'active',
    amount: 29,
    startDate: 'Feb 1, 2026',
    nextBilling: 'Aug 1, 2026',
    paymentMethod: 'Visa ••7711',
  },
  {
    id: 'sub_004',
    user: 'Metro Logistics',
    email: 'ops@metro.com',
    plan: 'Growth',
    status: 'cancelled',
    amount: 79,
    startDate: 'Mar 1, 2026',
    nextBilling: '—',
    paymentMethod: 'Visa ••3344',
  },
  {
    id: 'sub_005',
    user: 'GreenLeaf Market',
    email: 'hello@greenleaf.com',
    plan: 'Starter',
    status: 'trialing',
    amount: 0,
    startDate: 'Jul 1, 2026',
    nextBilling: 'Jul 14, 2026',
    paymentMethod: 'Visa ••6622',
  },
  {
    id: 'sub_006',
    user: 'RetailHub UAE',
    email: 'ops@retailhub.ae',
    plan: 'Scale',
    status: 'active',
    amount: 199,
    startDate: 'Dec 1, 2025',
    nextBilling: 'Aug 1, 2026',
    paymentMethod: 'Amex ••1001',
  },
  {
    id: 'sub_007',
    user: 'Aisha Kareem',
    email: 'aisha@example.com',
    plan: 'Starter',
    status: 'past_due',
    amount: 29,
    startDate: 'Jun 1, 2026',
    nextBilling: 'Jul 1, 2026',
    paymentMethod: 'Visa ••2288',
  },
  {
    id: 'sub_008',
    user: 'TechFlow Solutions',
    email: 'info@techflow.com',
    plan: 'Scale',
    status: 'active',
    amount: 199,
    startDate: 'Nov 1, 2025',
    nextBilling: 'Aug 1, 2026',
    paymentMethod: 'Mastercard ••4455',
  },
]

const planData = [
  { name: 'Starter', value: 42, color: '#94a3b8' },
  { name: 'Growth', value: 38, color: '#6366f1' },
  { name: 'Scale', value: 20, color: '#10b981' },
]

const mrrData = [
  { month: 'Feb', mrr: 13900 },
  { month: 'Mar', mrr: 14200 },
  { month: 'Apr', mrr: 17100 },
  { month: 'May', mrr: 20800 },
  { month: 'Jun', mrr: 22600 },
  { month: 'Jul', mrr: 25300 },
]

const statusBadge: Record<SubStatus, React.ReactNode> = {
  active: (
    <Badge variant="success" dot size="sm">
      Active
    </Badge>
  ),
  cancelled: (
    <Badge variant="secondary" dot size="sm">
      Cancelled
    </Badge>
  ),
  past_due: (
    <Badge variant="destructive" dot size="sm">
      Past Due
    </Badge>
  ),
  trialing: (
    <Badge variant="info" dot size="sm">
      Trial
    </Badge>
  ),
}

const PAGE_SIZE = 6

export const AdminSubscriptions = () => {
  const [subs, setSubs] = useState(seed)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<SubStatus | 'all'>('all')
  const [page, setPage] = useState(1)

  const filtered = subs.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !search ||
      s.user.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || s.status === filter
    return matchSearch && matchFilter
  })
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const cancelSub = (id: string) => {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: 'cancelled' as SubStatus } : s
      )
    )
    toast.success('Subscription cancelled.')
  }

  const mrr = subs
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Subscriptions
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Monitor all active subscriptions, trials, and revenue.
        </p>
      </div>

      {/* MRR + stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'MRR',
            value: `$${mrr.toLocaleString()}`,
            icon: DollarSign,
            up: true,
            change: '+11.8%',
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Active',
            value: subs.filter((s) => s.status === 'active').length.toString(),
            icon: CreditCard,
            up: true,
            change: '+3 this week',
            color: 'text-primary',
            bg: 'bg-primary/10',
          },
          {
            label: 'Trials',
            value: subs
              .filter((s) => s.status === 'trialing')
              .length.toString(),
            icon: RefreshCw,
            up: true,
            change: '+1 today',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Past Due',
            value: subs
              .filter((s) => s.status === 'past_due')
              .length.toString(),
            icon: Ban,
            up: false,
            change: 'Action needed',
            color: 'text-destructive',
            bg: 'bg-destructive/10',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-background rounded-xl border border-border p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-muted-foreground">
                {s.label}
              </p>
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon size={15} className={s.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <div className="flex items-center gap-1 mt-1.5">
              {s.up ? (
                <TrendingUp size={12} className="text-emerald-500" />
              ) : (
                <TrendingDown size={12} className="text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${s.up ? 'text-emerald-500' : 'text-destructive'}`}
              >
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* MRR chart */}
        <div className="lg:col-span-2 bg-background rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">MRR Growth</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={mrrData}
              margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'MRR']}
              />
              <Bar
                dataKey="mrr"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan split */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Plan Mix (%)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={planData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {planData.map((e) => (
                  <Cell key={e.name} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {planData.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: p.color }}
                  />
                  {p.name}
                </span>
                <span className="font-semibold text-foreground">
                  {p.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search subscribers..."
          containerClassName="w-56"
        />
        <div className="flex gap-1 bg-muted p-0.5 rounded-lg">
          {(
            ['all', 'active', 'trialing', 'past_due', 'cancelled'] as const
          ).map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilter(s)
                setPage(1)
              }}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-medium capitalize whitespace-nowrap transition-all',
                filter === s
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Subscriber
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                Plan
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Amount
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                Next Billing
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                Payment
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((sub) => (
              <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground text-sm">
                    {sub.user}
                  </p>
                  <p className="text-xs text-muted-foreground">{sub.email}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-sm text-foreground">
                  {sub.plan}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell font-semibold text-foreground">
                  {sub.amount > 0 ? `$${sub.amount}/mo` : 'Free Trial'}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">
                  {sub.nextBilling}
                </td>
                <td className="px-4 py-3 hidden xl:table-cell text-muted-foreground text-xs">
                  {sub.paymentMethod}
                </td>
                <td className="px-4 py-3">{statusBadge[sub.status]}</td>
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
                        onClick: () => toast.success(`Sub ID: ${sub.id}`),
                      },
                      ...(sub.status === 'active'
                        ? [
                            {
                              label: 'Cancel Subscription',
                              variant: 'destructive' as const,
                              icon: <Ban size={13} />,
                              onClick: () => cancelSub(sub.id),
                            },
                          ]
                        : []),
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
