import React, { useEffect } from 'react';
import { useBillingStore, type BillingInfo } from '@/store/useBillingStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Table } from '@/components/ui/Table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Mock billing data (current plan)
const mockInfo: BillingInfo = {
  plan: 'Free',
  usage: 45,
  limit: 100,
};

// Mock payment method data
const mockPayment = {
  type: 'Visa',
  last4: '4242',
  expires: '12/26',
};

// Mock billing history
const mockHistory = [
  { id: 1, date: '2024-08-01', description: 'Monthly Subscription', amount: '$0.00', status: 'Paid' },
  { id: 2, date: '2024-07-01', description: 'Monthly Subscription', amount: '$0.00', status: 'Paid' },
  { id: 3, date: '2024-06-01', description: 'Monthly Subscription', amount: '$0.00', status: 'Paid' },
];

// Mock usage over time data for chart
const usageData = [
  { period: 'Jun', usage: 30 },
  { period: 'Jul', usage: 40 },
  { period: 'Aug', usage: 45 },
  { period: 'Sep', usage: 50 },
];

export function Billing() {
  const { info, setInfo, loading, setLoading } = useBillingStore();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setInfo(mockInfo);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [setLoading, setInfo]);

  if (loading || !info) {
    return <div className="p-6 text-muted-foreground">Loading billing information…</div>;
  }

  const usagePercent = Math.round((info.usage / info.limit) * 100);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      {/* Current Plan */}
      <Card>
        <CardHeader className="bg-primary/10">
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

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">{mockPayment.type} •••• {mockPayment.last4}</p>
            <p className="text-sm text-muted-foreground">Expires {mockPayment.expires}</p>
          </div>
          <Button variant="outline">Edit</Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((h) => (
                <tr key={h.id} className="border-b">
                  <td className="p-2">{h.date}</td>
                  <td className="p-2">{h.description}</td>
                  <td className="p-2">{h.amount}</td>
                  <td className="p-2 text-green-600">{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Usage Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#4f46e5" name="Messages Used" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Button variant="primary" className="mt-4">
        Upgrade Plan
      </Button>
    </div>
  );
}
