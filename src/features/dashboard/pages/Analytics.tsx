import React, { useEffect } from 'react'
import { useAnalyticsStore, type AnalyticsData } from '@/store/useAnalyticsStore'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/Card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// Mock data generator
const mockData: AnalyticsData[] = [
  { period: '2023-01', messagesSent: 120, aiReplies: 115, responseTimeAvg: 2.4 },
  { period: '2023-02', messagesSent: 150, aiReplies: 148, responseTimeAvg: 2.1 },
  { period: '2023-03', messagesSent: 180, aiReplies: 175, responseTimeAvg: 1.9 },
  { period: '2023-04', messagesSent: 200, aiReplies: 198, responseTimeAvg: 1.8 },
]

export function Analytics() {
  const { data, setData, loading, setLoading } = useAnalyticsStore()

  useEffect(() => {
    setLoading(true)
    // Simulate async fetch
    const timer = setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Messages Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading analytics…</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="messagesSent" stroke="#4f46e5" name="Messages Sent" />
                <Line type="monotone" dataKey="aiReplies" stroke="#10b981" name="AI Replies" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Response Time (seconds)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responseTimeAvg" stroke="#f59e0b" name="Avg Response Time" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
