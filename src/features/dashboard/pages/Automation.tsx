import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';

// Mock automation tasks
const mockAutomation = [
  { id: 1, name: 'Welcome Message', status: 'Active', nextRun: '2024-09-01 09:00 AM' },
  { id: 2, name: 'Follow‑up Reminder', status: 'Paused', nextRun: '2024-09-02 10:30 AM' },
  { id: 3, name: 'Feedback Survey', status: 'Active', nextRun: '2024-09-03 02:45 PM' },
];

export function Automation() {
  // In a real app, data would be fetched here
  useEffect(() => {
    // Placeholder for future async fetch
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Automation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Automation Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Next Run</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAutomation.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-2">{task.name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}> {task.status} </span>
                  </td>
                  <td className="p-2 text-sm text-muted-foreground">{task.nextRun}</td>
                  <td className="p-2">
                    <Button size="sm" variant="outline">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
