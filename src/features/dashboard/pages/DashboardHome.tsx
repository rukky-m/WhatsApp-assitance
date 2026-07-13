import {
  BarChart as BarChartIcon,
  Users,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  ListChecks,
  Bot,
  TrendingUp,
} from 'lucide-react'
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
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Badge } from '@/components/ui'

const messageData = [
  { day: 'Mon', total: 420, ai: 360 },
  { day: 'Tue', total: 610, ai: 510 },
  { day: 'Wed', total: 530, ai: 470 },
  { day: 'Thu', total: 780, ai: 670 },
  { day: 'Fri', total: 940, ai: 820 },
  { day: 'Sat', total: 470, ai: 410 },
  { day: 'Sun', total: 290, ai: 255 },
]

const approvalData = [
  { day: 'Mon', approved: 52, rejected: 8 },
  { day: 'Tue', approved: 78, rejected: 11 },
  { day: 'Wed', approved: 65, rejected: 7 },
  { day: 'Thu', approved: 91, rejected: 14 },
  { day: 'Fri', approved: 110, rejected: 9 },
  { day: 'Sat', approved: 44, rejected: 5 },
  { day: 'Sun', approved: 30, rejected: 3 },
]

const STATS = [
  {
    label: 'Total Messages',
    value: '12,482',
    change: '+12%',
    up: true,
    icon: MessageSquare,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    label: 'Active Contacts',
    value: '3,291',
    change: '+8%',
    up: true,
    icon: Users,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    label: 'AI Automation Rate',
    value: '87.4%',
    change: '+2.1%',
    up: true,
    icon: Bot,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    label: 'Avg Response Time',
    value: '2.3s',
    change: '-0.4s',
    up: true,
    icon: Clock,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
]

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'approval',
    text: 'Message to Lina Boutique approved',
    time: '2m ago',
  },
  {
    id: 2,
    type: 'ai',
    text: 'AI replied to Maya Ibrahim (94% confidence)',
    time: '5m ago',
  },
  {
    id: 3,
    type: 'contact',
    text: 'New contact: Omar Electronics added',
    time: '18m ago',
  },
  {
    id: 4,
    type: 'approval',
    text: '3 messages pending approval in queue',
    time: '22m ago',
  },
  {
    id: 5,
    type: 'ai',
    text: 'AI replied to Nour Pharmacy (99% confidence)',
    time: '1h ago',
  },
]

export const DashboardHome = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Good morning, {user?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Here's what's happening with your WhatsApp assistant today.
          </p>
        </div>
        <Link
          to="/dashboard/analytics"
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <TrendingUp size={16} /> View full analytics
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-background rounded-xl p-5 border border-border shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <stat.icon size={16} className={stat.iconColor} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <div className="mt-2 flex items-center text-xs">
              {stat.up ? (
                <ArrowUpRight size={14} className="text-emerald-500 mr-1" />
              ) : (
                <ArrowDownRight size={14} className="text-destructive mr-1" />
              )}
              <span
                className={
                  stat.up
                    ? 'text-emerald-500 font-medium'
                    : 'text-destructive font-medium'
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Message Volume */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Message Volume</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total vs AI-handled this week
              </p>
            </div>
            <Badge variant="success" dot>
              Live
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={messageData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
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
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="day"
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
                labelStyle={{ fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#totalGrad)"
              />
              <Area
                type="monotone"
                dataKey="ai"
                name="AI handled"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#aiGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Approval activity */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">
                Approval Activity
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Approved vs rejected this week
              </p>
            </div>
            <Link
              to="/dashboard/approvals"
              className="text-xs text-primary hover:underline"
            >
              View queue →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={approvalData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="day"
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
                dataKey="approved"
                name="Approved"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rejected"
                name="Rejected"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'approval'
                      ? 'bg-emerald-500/10'
                      : item.type === 'ai'
                        ? 'bg-violet-500/10'
                        : 'bg-blue-500/10'
                  }`}
                >
                  {item.type === 'approval' && (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  )}
                  {item.type === 'ai' && (
                    <Bot size={14} className="text-violet-500" />
                  )}
                  {item.type === 'contact' && (
                    <Users size={14} className="text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: 'View Queue',
                icon: ListChecks,
                href: '/dashboard/approvals',
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
              },
              {
                label: 'Conversations',
                icon: MessageSquare,
                href: '/dashboard/conversations',
                color: 'text-primary',
                bg: 'bg-primary/10',
              },
              {
                label: 'Analytics',
                icon: BarChartIcon,
                href: '/dashboard/analytics',
                color: 'text-violet-500',
                bg: 'bg-violet-500/10',
              },
              {
                label: 'Contacts',
                icon: Users,
                href: '/dashboard/contacts',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
              },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted transition-colors"
              >
                <div
                  className={`h-8 w-8 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}
                >
                  <action.icon size={16} className={action.color} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
