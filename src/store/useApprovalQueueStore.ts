import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Approval {
  id: string;
  contact: string;
  preview: string;
  confidence: number;
}

interface ApprovalQueueState {
  approvals: Record<string, Approval>;
  setApprovals: (approvals: Record<string, Approval>) => void;
  addApproval: (approval: Approval) => void;
  removeApproval: (id: string) => void;
}

export const useApprovalQueueStore = create<ApprovalQueueState>()(
  devtools((set) => ({
    approvals: {},
    setApprovals: (approvals) => set(() => ({ approvals })),
    addApproval: (approval) =>
      set((state) => ({
        approvals: { ...state.approvals, [approval.id]: approval },
      })),
    removeApproval: (id) =>
      set((state) => {
        const { [id]: _, ...rest } = state.approvals;
        return { approvals: rest };
      }),
  }))
);
