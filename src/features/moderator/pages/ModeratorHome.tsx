import {
  Users,
  Flag,
  HeadphonesIcon,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Badge } from '@/components/ui'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const weekData = [
  { day: 'Mon', flagged: 8, resolved: 6 },
  { day: 'Tue', flagged: 14, resolved: 12 },
  { day: 'Wed', flagged: 9, resolved: 9 },
  { day: 'Thu', flagged: 19, resolved: 15 },
  { day: 'Fri', flagged: 11, resolved: 10 },
  { day: 'Sat', flagged: 5, resolved: 5 },
  { day: 'Sun', flagged: 3, resolved: 3 },
]

const RECENT_TICKETS = [
  {
    id: 'TKT-221',
    user: 'Maya Ibrahim',
    subject: 'AI reply was incorrect about pricing',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'TKT-220',
    user: 'Noah Trends',
    subject: 'Cannot receive messages on new number',
    priority: 'medium',
    status: 'in_progress',
  },
  {
    id: 'TKT-219',
    user: 'Aisha Kareem',
    subject: 'Scheduled message was sent twice',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'TKT-218',
    user: 'Omar Electronics',
    subject: 'Bulk import contacts not working',
    priority: 'high',
    status: 'open',
  },
]

const RECENT_FLAGS = [
  {
    id: 'F-91',
    message: 'Please share your bank details for the refund.',
    user: 'Lina Boutique',
    risk: 'high',
    time: '12m ago',
  },
  {
    id: 'F-90',
    message: 'Give 80% discount or I will post bad reviews.',
    user: 'Metro Logistics',
    risk: 'high',
    time: '1h ago',
  },
  {
    id: 'F-89',
    message: 'What is your home address?',
    user: 'Nour Pharmacy',
    risk: 'medium',
    time: '3h ago',
  },
]

export const ModeratorHome = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Here's the moderation overview for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Users',
            value: '312',
            icon: Users,
            bg: 'bg-blue-500/10',
            color: 'text-blue-500',
            change: '+4 today',
          },
          {
            label: 'Flagged Messages',
            value: '69',
            icon: Flag,
            bg: 'bg-rose-500/10',
            color: 'text-rose-500',
            change: '12 pending',
          },
          {
            label: 'Open Tickets',
            value: '28',
            icon: HeadphonesIcon,
            bg: 'bg-amber-500/10',
            color: 'text-amber-500',
            change: '5 urgent',
          },
          {
            label: 'Resolved Today',
            value: '41',
            icon: CheckCircle2,
            bg: 'bg-emerald-500/10',
            color: 'text-emerald-500',
            change: '+18%',
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
            <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-foreground">
              Flagged vs Resolved
            </h3>
            <p className="text-xs text-muted-foreground">
              This week's moderation activity
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-400" />
              Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
              Resolved
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={weekData}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
              dataKey="flagged"
              name="Flagged"
              fill="#fb7185"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="resolved"
              name="Resolved"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom two panels */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent flags */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Flags</h3>
            <Link
              to="/moderator/flagged"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_FLAGS.map((f) => (
              <div
                key={f.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <AlertTriangle
                  size={14}
                  className={
                    f.risk === 'high'
                      ? 'text-rose-500 shrink-0 mt-0.5'
                      : 'text-amber-500 shrink-0 mt-0.5'
                  }
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground line-clamp-1">
                    "{f.message}"
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {f.user} · {f.time}
                  </p>
                </div>
                <Badge
                  variant={f.risk === 'high' ? 'destructive' : 'warning'}
                  size="sm"
                >
                  {f.risk}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent tickets */}
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Tickets</h3>
            <Link
              to="/moderator/tickets"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {RECENT_TICKETS.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {t.subject}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {t.user} · {t.id}
                  </p>
                </div>
                <Badge
                  variant={
                    t.status === 'resolved'
                      ? 'success'
                      : t.status === 'in_progress'
                        ? 'warning'
                        : 'destructive'
                  }
                  size="sm"
                >
                  {t.status === 'in_progress' ? 'Active' : t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
