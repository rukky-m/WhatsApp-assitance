import {
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Bot,
  DollarSign,
  AlertTriangle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 12400, mrr: 11200 },
  { month: 'Feb', revenue: 15800, mrr: 13900 },
  { month: 'Mar', revenue: 14200, mrr: 14200 },
  { month: 'Apr', revenue: 18900, mrr: 17100 },
  { month: 'May', revenue: 22400, mrr: 20800 },
  { month: 'Jun', revenue: 24100, mrr: 22600 },
  { month: 'Jul', revenue: 27800, mrr: 25300 },
]

const planDist = [
  { plan: 'Starter', count: 142 },
  { plan: 'Growth', count: 287 },
  { plan: 'Scale', count: 71 },
]

const RECENT_SIGNUPS = [
  {
    name: 'TechFlow Solutions',
    plan: 'Growth',
    date: '2h ago',
    status: 'active',
  },
  { name: 'RetailHub UAE', plan: 'Scale', date: '5h ago', status: 'active' },
  {
    name: 'GreenLeaf Market',
    plan: 'Starter',
    date: '8h ago',
    status: 'pending',
  },
  {
    name: 'FastShip Logistics',
    plan: 'Growth',
    date: '12h ago',
    status: 'active',
  },
]

const ALERTS = [
  {
    type: 'warning',
    msg: 'Metro Logistics account flagged for spam-like activity',
    time: '30m ago',
  },
  {
    type: 'error',
    msg: 'Webhook delivery failure rate above 5% — 3 endpoints affected',
    time: '1h ago',
  },
  {
    type: 'info',
    msg: 'GPT-4o API latency increased to 2.8s avg (threshold: 3s)',
    time: '3h ago',
  },
]

export const AdminHome = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Platform overview — revenue, users, and system health.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Users',
            value: '500',
            change: '+12 this week',
            up: true,
            icon: Users,
            bg: 'bg-blue-500/10',
            color: 'text-blue-500',
          },
          {
            label: 'MRR',
            value: '$25,300',
            change: '+11.8%',
            up: true,
            icon: DollarSign,
            bg: 'bg-emerald-500/10',
            color: 'text-emerald-500',
          },
          {
            label: 'Active Subscriptions',
            value: '471',
            change: '+8 this week',
            up: true,
            icon: CreditCard,
            bg: 'bg-violet-500/10',
            color: 'text-violet-500',
          },
          {
            label: 'AI Messages/Day',
            value: '41,200',
            change: '-2.1%',
            up: false,
            icon: Bot,
            bg: 'bg-amber-500/10',
            color: 'text-amber-500',
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

      {/* Revenue chart */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-foreground">Revenue & MRR</h3>
            <p className="text-xs text-muted-foreground">
              Monthly revenue and recurring revenue over time
            </p>
          </div>
          <Link
            to="/admin/analytics"
            className="text-xs text-primary hover:underline"
          >
            Full analytics →
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={revenueData}
            margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
              formatter={(v) => [`$${Number(v).toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Total Revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#revGrad)"
            />
            <Area
              type="monotone"
              dataKey="mrr"
              name="MRR"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#mrrGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Plan distribution */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">
            Plan Distribution
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={planDist}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="plan"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="count"
                name="Users"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent signups */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Signups</h3>
            <Link
              to="/admin/users"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_SIGNUPS.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.plan} · {s.date}
                  </p>
                </div>
                <Badge
                  variant={s.status === 'active' ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {s.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">System Alerts</h3>
          <div className="space-y-3">
            {ALERTS.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <AlertTriangle
                  size={13}
                  className={
                    a.type === 'error'
                      ? 'text-destructive shrink-0 mt-0.5'
                      : a.type === 'warning'
                        ? 'text-amber-500 shrink-0 mt-0.5'
                        : 'text-blue-500 shrink-0 mt-0.5'
                  }
                />
                <div>
                  <p className="text-xs text-foreground">{a.msg}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
