import React, { useEffect } from 'react'
import { useBillingStore, type BillingInfo } from '@/store/useBillingStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'

// Mock billing data
const mockInfo: BillingInfo = {
  plan: 'Free',
  usage: 45,
  limit: 100,
}

export function Billing() {
  const { info, setInfo, loading, setLoading } = useBillingStore()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setInfo(mockInfo)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  if (loading || !info) {
    return <div className="p-6 text-muted-foreground">Loading billing information…</div>
  }

  const usagePercent = Math.round((info.usage / info.limit) * 100)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{info.plan}</p>
          <div className="space-y-2">
            <p>Usage: {info.usage}/{info.limit} messages ({usagePercent}%)</p>
            <Progress value={usagePercent} />
          </div>
        </CardContent>
      </Card>

      <Button variant="outline">Upgrade Plan</Button>
    </div>
  )
}
