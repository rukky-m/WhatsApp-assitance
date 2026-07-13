import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Users, DollarSign, Bot, MessageSquare } from 'lucide-react'
import { cn } from '@/utils/cn'

const revenueData = [
  { month: 'Jan', revenue: 12400, expenses: 4800 },
  { month: 'Feb', revenue: 15800, expenses: 5200 },
  { month: 'Mar', revenue: 14200, expenses: 5100 },
  { month: 'Apr', revenue: 18900, expenses: 5900 },
  { month: 'May', revenue: 22400, expenses: 6400 },
  { month: 'Jun', revenue: 24100, expenses: 6800 },
  { month: 'Jul', revenue: 27800, expenses: 7200 },
]

const userGrowth = [
  { month: 'Jan', users: 320, churn: 12 },
  { month: 'Feb', users: 358, churn: 9 },
  { month: 'Mar', users: 381, churn: 11 },
  { month: 'Apr', users: 412, churn: 8 },
  { month: 'May', users: 449, churn: 7 },
  { month: 'Jun', users: 476, churn: 6 },
  { month: 'Jul', users: 500, churn: 4 },
]

const aiPerf = [
  { month: 'Feb', accuracy: 91.2, latency: 3.1 },
  { month: 'Mar', accuracy: 92.8, latency: 2.9 },
  { month: 'Apr', accuracy: 93.1, latency: 2.7 },
  { month: 'May', accuracy: 94.4, latency: 2.5 },
  { month: 'Jun', accuracy: 95.0, latency: 2.4 },
  { month: 'Jul', accuracy: 95.8, latency: 2.3 },
]

type Range = '7d' | '30d' | '90d' | '12m'

const tooltip = {
  contentStyle: {
    background: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 8,
    fontSize: 12,
  },
}

export const AdminAnalytics = () => {
  const [range, setRange] = useState<Range>('30d')

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Platform-wide revenue, user growth, and AI performance metrics.
          </p>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(['7d', '30d', '90d', '12m'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                range === r
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: '$135,600',
            change: '+18.2%',
            icon: DollarSign,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Total Users',
            value: '500',
            change: '+56 this month',
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'AI Messages',
            value: '268,500',
            change: '+22.1%',
            icon: Bot,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
          },
          {
            label: 'Avg AI Accuracy',
            value: '95.8%',
            change: '+4.6pp',
            icon: MessageSquare,
            color: 'text-primary',
            bg: 'bg-primary/10',
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

      {/* Revenue chart */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="font-semibold text-foreground">Revenue vs Expenses</h3>
          <p className="text-xs text-muted-foreground">Monthly P&L overview</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={revenueData}
            margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
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
              {...tooltip}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, '']}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#revG)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#expG)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* User growth */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">
              User Growth vs Churn
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={userGrowth}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
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
              />
              <Tooltip {...tooltip} />
              <Bar
                dataKey="users"
                name="Total Users"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="churn"
                name="Churned"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI perf */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">
              AI Performance Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={aiPerf}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
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
                yAxisId="acc"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                domain={[88, 100]}
                unit="%"
              />
              <YAxis
                yAxisId="lat"
                orientation="right"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                unit="s"
              />
              <Tooltip {...tooltip} />
              <Line
                yAxisId="acc"
                type="monotone"
                dataKey="accuracy"
                name="Accuracy"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                yAxisId="lat"
                type="monotone"
                dataKey="latency"
                name="Latency"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
