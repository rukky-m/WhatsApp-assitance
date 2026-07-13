import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, Toast } from '@/components/ui';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useApprovalQueueStore } from '@/store/useApprovalQueueStore';

// Mock API functions (replace with real API later)
const fetchPendingApprovals = async () => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  return [
    {
      id: 'msg1',
      contact: 'Lina Boutique',
      preview: 'Sure, I can help you with the order...',
      confidence: 92,
    },
    {
      id: 'msg2',
      contact: 'Maya Ibrahim',
      preview: 'Your package is on the way...',
      confidence: 88,
    },
  ];
};

const approveMessage = async ({ id }: { id: string }) => {
  await new Promise((res) => setTimeout(res, 300));
  return { success: true };
};

const rejectMessage = async ({ id }: { id: string }) => {
  await new Promise((res) => setTimeout(res, 300));
  return { success: true };
};

export function ApprovalQueue() {
  const queryClient = useQueryClient();
  const { data: approvals = [], isLoading } = useQuery(['pendingApprovals'], fetchPendingApprovals);

  const approveMutation = useMutation(approveMessage, {
    onSuccess: () => {
      Toast.success('Message approved');
      queryClient.invalidateQueries(['pendingApprovals']);
    },
  });

  const rejectMutation = useMutation(rejectMessage, {
    onSuccess: () => {
      Toast.success('Message rejected');
      queryClient.invalidateQueries(['pendingApprovals']);
    },
  });

  const columns = [
    { header: 'Contact', accessor: 'contact' },
    { header: 'Preview', accessor: 'preview' },
    { header: 'Confidence', accessor: 'confidence', render: (val: number) => `${val}%` },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="success" onClick={() => approveMutation.mutate({ id: row.id })}>
            <CheckCircle2 size={14} className="mr-1" /> Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate({ id: row.id })}>
            <XCircle size={14} className="mr-1" /> Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Approval Queue</h1>
      <Table data={approvals} columns={columns} loading={isLoading} />
      <div className="mt-4">
        <Link to="/dashboard" className="text-primary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
