import { useState } from 'react'
import { Bot, Zap, CheckCircle2, Settings, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/utils/cn'

const perfData = [
  { day: 'Mon', accuracy: 94.1, latency: 2.6 },
  { day: 'Tue', accuracy: 95.3, latency: 2.4 },
  { day: 'Wed', accuracy: 94.8, latency: 2.5 },
  { day: 'Thu', accuracy: 96.1, latency: 2.2 },
  { day: 'Fri', accuracy: 95.7, latency: 2.3 },
  { day: 'Sat', accuracy: 95.9, latency: 2.4 },
  { day: 'Sun', accuracy: 96.2, latency: 2.1 },
]

interface AIModel {
  id: string
  name: string
  provider: string
  version: string
  status: 'active' | 'standby' | 'deprecated'
  accuracy: number
  latency: string
  tokensUsed: number
  costPer1k: number
  isDefault: boolean
}

const models: AIModel[] = [
  {
    id: 'm1',
    name: 'GPT-4o',
    provider: 'OpenAI',
    version: '2024-11',
    status: 'active',
    accuracy: 96.2,
    latency: '2.1s',
    tokensUsed: 14200000,
    costPer1k: 0.005,
    isDefault: true,
  },
  {
    id: 'm2',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    version: '2024-04',
    status: 'standby',
    accuracy: 94.8,
    latency: '2.8s',
    tokensUsed: 2800000,
    costPer1k: 0.01,
    isDefault: false,
  },
  {
    id: 'm3',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    version: '0125',
    status: 'standby',
    accuracy: 89.4,
    latency: '1.1s',
    tokensUsed: 1200000,
    costPer1k: 0.0005,
    isDefault: false,
  },
  {
    id: 'm4',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    version: '20241022',
    status: 'standby',
    accuracy: 95.1,
    latency: '2.4s',
    tokensUsed: 400000,
    costPer1k: 0.003,
    isDefault: false,
  },
]

const statusBadge = {
  active: (
    <Badge variant="success" dot size="sm">
      Active
    </Badge>
  ),
  standby: (
    <Badge variant="secondary" dot size="sm">
      Standby
    </Badge>
  ),
  deprecated: (
    <Badge variant="destructive" dot size="sm">
      Deprecated
    </Badge>
  ),
}

export const AdminAIModels = () => {
  const [activeModel, setActiveModel] = useState('m1')
  const [threshold, setThreshold] = useState(90)
  const [fallback, setFallback] = useState(true)
  const [logging, setLogging] = useState(true)

  const handleSetDefault = (id: string) => {
    setActiveModel(id)
    toast.success(
      `${models.find((m) => m.id === id)?.name} set as default model.`
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          AI Models
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage AI model configuration, performance, and fallback rules.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Default Model',
            value: 'GPT-4o',
            icon: Bot,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
          },
          {
            label: 'Avg Accuracy',
            value: '96.2%',
            icon: CheckCircle2,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Avg Latency',
            value: '2.1s',
            icon: Zap,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
          },
          {
            label: 'Tokens This Month',
            value: '14.2M',
            icon: TrendingUp,
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
            <p className="text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Performance chart */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="font-semibold text-foreground">
            Performance This Week
          </h3>
          <p className="text-xs text-muted-foreground">
            Accuracy (%) and latency (s) of the active model
          </p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={perfData}
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
              yAxisId="acc"
              domain={[88, 100]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <YAxis
              yAxisId="lat"
              orientation="right"
              domain={[1, 4]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              unit="s"
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Line
              yAxisId="acc"
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="lat"
              type="monotone"
              dataKey="latency"
              name="Latency"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Model cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={cn(
              'rounded-xl border bg-background p-5 shadow-sm',
              activeModel === model.id
                ? 'border-primary ring-1 ring-primary/20'
                : 'border-border'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Bot size={16} className="text-violet-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {model.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {model.provider} · v{model.version}
                  </p>
                </div>
              </div>
              {statusBadge[model.status]}
            </div>
            <div className="grid grid-cols-3 gap-2 my-3 text-center">
              {[
                { label: 'Accuracy', value: `${model.accuracy}%` },
                { label: 'Latency', value: model.latency },
                { label: 'Cost/1k', value: `$${model.costPer1k}` },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-muted/50 py-2">
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {(model.tokensUsed / 1_000_000).toFixed(1)}M tokens used this
              month
            </p>
            {activeModel === model.id ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <CheckCircle2 size={12} /> Default model
              </span>
            ) : (
              <button
                onClick={() => handleSetDefault(model.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Global AI settings */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Settings size={16} className="text-primary" />
          <h3 className="font-semibold text-foreground">Global AI Settings</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Platform-wide auto-approve threshold:{' '}
            <span className="text-primary font-bold">{threshold}%</span>
          </label>
          <input
            type="range"
            min={70}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full max-w-sm accent-primary"
          />
        </div>
        <div className="space-y-3">
          {[
            {
              key: 'fallback',
              label: 'Enable human fallback globally',
              desc: 'When AI confidence is below threshold, route to human review across all accounts.',
              value: fallback,
              set: setFallback,
            },
            {
              key: 'logging',
              label: 'Log all AI interactions',
              desc: 'Keep a complete log of every AI-generated message for audit purposes.',
              value: logging,
              set: setLogging,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={item.value}
                onClick={() => item.set(!item.value)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0',
                  item.value ? 'bg-primary' : 'bg-muted'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                    item.value ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => toast.success('AI settings saved.')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
