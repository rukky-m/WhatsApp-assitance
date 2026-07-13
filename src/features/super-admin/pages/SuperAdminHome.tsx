import {
  Users,
  Shield,
  Bot,
  Server,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const systemHealth = [
  { time: '00:00', cpu: 22, memory: 48, api: 99.9 },
  { time: '04:00', cpu: 18, memory: 45, api: 100 },
  { time: '08:00', cpu: 41, memory: 56, api: 99.8 },
  { time: '12:00', cpu: 67, memory: 64, api: 99.7 },
  { time: '16:00', cpu: 74, memory: 72, api: 99.9 },
  { time: '20:00', cpu: 58, memory: 65, api: 100 },
  { time: 'Now', cpu: 52, memory: 61, api: 99.9 },
]

const revenueGrowth = [
  { month: 'Feb', mrr: 13900 },
  { month: 'Mar', mrr: 14200 },
  { month: 'Apr', mrr: 17100 },
  { month: 'May', mrr: 20800 },
  { month: 'Jun', mrr: 22600 },
  { month: 'Jul', mrr: 25300 },
]

const ROLE_COUNTS = [
  {
    role: 'Users',
    count: 496,
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    href: '/super-admin/users',
  },
  {
    role: 'Moderators',
    count: 2,
    icon: Shield,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    href: '/super-admin/admins',
  },
  {
    role: 'Admins',
    count: 1,
    icon: Shield,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    href: '/super-admin/admins',
  },
  {
    role: 'Super Admins',
    count: 1,
    icon: Shield,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    href: '/super-admin/admins',
  },
]

const SYSTEM_ALERTS = [
  {
    level: 'critical',
    msg: 'Redis cache eviction rate above 15%',
    time: '8m ago',
  },
  {
    level: 'warning',
    msg: 'Storage at 71% capacity — 29GB remaining',
    time: '2h ago',
  },
  {
    level: 'info',
    msg: 'Scheduled maintenance window: Jul 10, 02:00–04:00 UTC',
    time: '6h ago',
  },
  {
    level: 'success',
    msg: 'Nightly database backup completed successfully',
    time: '7h ago',
  },
]

const SERVICES = [
  { name: 'API Server', status: 'operational', uptime: '99.97%' },
  { name: 'WhatsApp Gateway', status: 'operational', uptime: '99.91%' },
  { name: 'AI Engine (GPT-4o)', status: 'operational', uptime: '99.88%' },
  { name: 'Message Queue', status: 'degraded', uptime: '98.10%' },
  { name: 'Database (Primary)', status: 'operational', uptime: '100%' },
  { name: 'Redis Cache', status: 'operational', uptime: '99.94%' },
  { name: 'File Storage (S3)', status: 'operational', uptime: '100%' },
]

const tooltip = {
  contentStyle: {
    background: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 8,
    fontSize: 12,
  },
}

export const SuperAdminHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Super Admin
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Full platform control — users, infrastructure, security, and system
          configuration.
        </p>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Users',
            value: '500',
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            change: '+4 today',
          },
          {
            label: 'Platform MRR',
            value: '$25,300',
            icon: DollarSign,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            change: '+$700 this week',
          },
          {
            label: 'AI Messages Today',
            value: '41,200',
            icon: Bot,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
            change: '-2.1%',
          },
          {
            label: 'System Uptime',
            value: '99.94%',
            icon: Server,
            color: 'text-primary',
            bg: 'bg-primary/10',
            change: 'Last 30 days',
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
              <TrendingUp size={12} className="text-emerald-500" />
              <span className="text-xs font-medium text-emerald-500">
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Role distribution */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ROLE_COUNTS.map((r) => (
          <Link
            key={r.role}
            to={r.href}
            className="bg-background rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-lg ${r.bg} flex items-center justify-center`}
              >
                <r.icon size={16} className={r.color} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{r.count}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* System health */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-foreground">
                System Health (24h)
              </h3>
              <p className="text-xs text-muted-foreground">
                CPU %, Memory %, API uptime %
              </p>
            </div>
            <Badge variant="success" dot>
              All Systems Operational
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={systemHealth}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip {...tooltip} />
              <Line
                type="monotone"
                dataKey="cpu"
                name="CPU %"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="memory"
                name="Mem %"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MRR trend */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="font-semibold text-foreground">MRR Growth</h3>
            <p className="text-xs text-muted-foreground">
              Monthly recurring revenue
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={revenueGrowth}
              margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
            >
              <defs>
                <linearGradient id="mrrSA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                {...tooltip}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'MRR']}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#mrrSA)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Services */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Service Status</h3>
            <Link
              to="/super-admin/security"
              className="text-xs text-primary hover:underline"
            >
              View details →
            </Link>
          </div>
          <div className="space-y-2">
            {SERVICES.map((svc) => (
              <div
                key={svc.name}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${svc.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                  <span className="text-sm text-foreground">{svc.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {svc.uptime}
                  </span>
                  <Badge
                    variant={
                      svc.status === 'operational' ? 'success' : 'warning'
                    }
                    size="sm"
                    className="capitalize"
                  >
                    {svc.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System alerts */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">System Alerts</h3>
          <div className="space-y-3">
            {SYSTEM_ALERTS.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-lg border border-border p-3"
              >
                {a.level === 'critical' && (
                  <AlertTriangle
                    size={13}
                    className="text-rose-500 shrink-0 mt-0.5"
                  />
                )}
                {a.level === 'warning' && (
                  <AlertTriangle
                    size={13}
                    className="text-amber-500 shrink-0 mt-0.5"
                  />
                )}
                {a.level === 'success' && (
                  <CheckCircle2
                    size={13}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                )}
                {a.level === 'info' && (
                  <Activity
                    size={13}
                    className="text-blue-500 shrink-0 mt-0.5"
                  />
                )}
                <div>
                  <p className="text-xs text-foreground">{a.msg}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {a.time}
                  </p>
                </div>
                <Badge
                  variant={
                    a.level === 'critical'
                      ? 'destructive'
                      : a.level === 'warning'
                        ? 'warning'
                        : a.level === 'success'
                          ? 'success'
                          : 'info'
                  }
                  size="sm"
                  className="ml-auto shrink-0 capitalize"
                >
                  {a.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
