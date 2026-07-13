import { useState } from 'react'
import { Save, CheckCircle2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

type Role = 'user' | 'moderator' | 'admin' | 'super-admin'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

const PERMISSIONS: Permission[] = [
  {
    id: 'conv.view',
    name: 'View Conversations',
    description: 'Read all conversations',
    category: 'Conversations',
  },
  {
    id: 'conv.reply',
    name: 'Send Replies',
    description: 'Send messages to customers',
    category: 'Conversations',
  },
  {
    id: 'approval.view',
    name: 'View Approval Queue',
    description: 'See AI-drafted messages pending review',
    category: 'Approval',
  },
  {
    id: 'approval.approve',
    name: 'Approve Messages',
    description: 'Approve and send AI messages',
    category: 'Approval',
  },
  {
    id: 'approval.reject',
    name: 'Reject Messages',
    description: 'Reject AI messages',
    category: 'Approval',
  },
  {
    id: 'users.view',
    name: 'View Users',
    description: 'See all platform users',
    category: 'Users',
  },
  {
    id: 'users.manage',
    name: 'Manage Users',
    description: 'Suspend, reactivate, and edit users',
    category: 'Users',
  },
  {
    id: 'users.promote',
    name: 'Promote Users',
    description: 'Change user roles',
    category: 'Users',
  },
  {
    id: 'analytics.view',
    name: 'View Analytics',
    description: 'Access analytics dashboards',
    category: 'Analytics',
  },
  {
    id: 'analytics.export',
    name: 'Export Analytics',
    description: 'Download analytics as CSV',
    category: 'Analytics',
  },
  {
    id: 'billing.view',
    name: 'View Billing',
    description: 'See billing and subscription info',
    category: 'Billing',
  },
  {
    id: 'billing.manage',
    name: 'Manage Billing',
    description: 'Cancel and modify subscriptions',
    category: 'Billing',
  },
  {
    id: 'settings.view',
    name: 'View Settings',
    description: 'See platform settings',
    category: 'Settings',
  },
  {
    id: 'settings.manage',
    name: 'Manage Settings',
    description: 'Change all platform settings',
    category: 'Settings',
  },
  {
    id: 'logs.view',
    name: 'View Logs',
    description: 'Access audit and system logs',
    category: 'Logs',
  },
  {
    id: 'system.manage',
    name: 'System Management',
    description: 'Backups, API keys, feature flags',
    category: 'System',
  },
]

type RolePermissions = Record<Role, Set<string>>

const DEFAULT_PERMISSIONS: RolePermissions = {
  user: new Set([
    'conv.view',
    'conv.reply',
    'approval.view',
    'approval.approve',
    'approval.reject',
    'analytics.view',
    'billing.view',
  ]),
  moderator: new Set([
    'conv.view',
    'conv.reply',
    'approval.view',
    'approval.approve',
    'approval.reject',
    'users.view',
    'users.manage',
    'analytics.view',
    'analytics.export',
    'logs.view',
  ]),
  admin: new Set([
    'conv.view',
    'conv.reply',
    'approval.view',
    'approval.approve',
    'approval.reject',
    'users.view',
    'users.manage',
    'users.promote',
    'analytics.view',
    'analytics.export',
    'billing.view',
    'billing.manage',
    'settings.view',
    'settings.manage',
    'logs.view',
  ]),
  'super-admin': new Set(PERMISSIONS.map((p) => p.id)),
}

const CATEGORIES = [...new Set(PERMISSIONS.map((p) => p.category))]

const ROLES: Role[] = ['user', 'moderator', 'admin', 'super-admin']

const roleBadgeVariant: Record<Role, string> = {
  user: 'secondary',
  moderator: 'warning',
  admin: 'info',
  'super-admin': 'destructive',
}

export const RolesAndPermissions = () => {
  const [permissions, setPermissions] = useState<RolePermissions>(() => ({
    user: new Set(DEFAULT_PERMISSIONS.user),
    moderator: new Set(DEFAULT_PERMISSIONS.moderator),
    admin: new Set(DEFAULT_PERMISSIONS.admin),
    'super-admin': new Set(DEFAULT_PERMISSIONS['super-admin']),
  }))
  const [activeRole, setActiveRole] = useState<Role>('moderator')

  const toggle = (permId: string) => {
    if (activeRole === 'super-admin') return // cannot modify super-admin
    setPermissions((prev) => {
      const next = new Set(prev[activeRole])
      if (next.has(permId)) {
        next.delete(permId)
      } else {
        next.add(permId)
      }
      return { ...prev, [activeRole]: next }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Roles & Permissions
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure what each role can access across the platform.
        </p>
      </div>

      {/* Role selector */}
      <div className="flex gap-3 flex-wrap">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
              activeRole === role
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Badge
              variant={
                roleBadgeVariant[role] as
                  'secondary' | 'warning' | 'info' | 'destructive'
              }
              size="sm"
              className="capitalize"
            >
              {role}
            </Badge>
            <span className="text-xs opacity-70">
              {permissions[role].size}/{PERMISSIONS.length}
            </span>
          </button>
        ))}
      </div>

      {activeRole === 'super-admin' && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary font-medium">
          Super Admins have all permissions and cannot be restricted.
        </div>
      )}

      {/* Permission matrix */}
      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const catPerms = PERMISSIONS.filter((p) => p.category === cat)
          return (
            <div
              key={cat}
              className="bg-background rounded-xl border border-border overflow-hidden shadow-sm"
            >
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat}
                </span>
              </div>
              {catPerms.map((perm) => {
                const granted = permissions[activeRole].has(perm.id)
                const locked = activeRole === 'super-admin'
                return (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {perm.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {perm.description}
                      </p>
                    </div>
                    <button
                      disabled={locked}
                      onClick={() => toggle(perm.id)}
                      className={cn(
                        'flex items-center justify-center h-6 w-6 rounded-full transition-colors',
                        locked ? 'cursor-not-allowed' : 'cursor-pointer',
                        granted
                          ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                          : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
                      )}
                    >
                      {granted ? <CheckCircle2 size={14} /> : <X size={14} />}
                    </button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {activeRole !== 'super-admin' && (
        <button
          onClick={() => toast.success(`Permissions saved for ${activeRole}.`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={14} /> Save Permissions
        </button>
      )}
    </div>
  )
}
