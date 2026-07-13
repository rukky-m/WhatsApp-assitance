import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BotMessageSquare,
  LayoutDashboard,
  MessageSquare,
  ListChecks,
  Calendar,
  CheckSquare,
  Users,
  BarChart,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  Bell,
  Search,
  User as UserIcon,
  Flag,
  HeadphonesIcon,
  ScrollText,
  Megaphone,
  ShieldCheck,
  Key,
  Database,
  ToggleLeft,
  AlertTriangle,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuthStore, type Role } from '@/store/useAuthStore'
import { Avatar, Badge, Dropdown } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/utils/cn'

type NavItem = { name: string; href: string; icon: React.ElementType }

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  user: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      name: 'Conversations',
      href: '/dashboard/conversations',
      icon: MessageSquare,
    },
    { name: 'Approval Queue', href: '/dashboard/approvals', icon: ListChecks },
    { name: 'Scheduler', href: '/dashboard/scheduler', icon: Calendar },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  ],
  moderator: [
    { name: 'Dashboard', href: '/moderator', icon: LayoutDashboard },
    { name: 'Users', href: '/moderator/users', icon: Users },
    { name: 'Flagged Messages', href: '/moderator/flagged', icon: Flag },
    {
      name: 'Support Tickets',
      href: '/moderator/tickets',
      icon: HeadphonesIcon,
    },
    { name: 'Logs', href: '/moderator/logs', icon: ScrollText },
    {
      name: 'Announcements',
      href: '/moderator/announcements',
      icon: Megaphone,
    },
    { name: 'Profile', href: '/moderator/profile', icon: UserIcon },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
    { name: 'AI Models', href: '/admin/ai-models', icon: ShieldCheck },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Support', href: '/admin/support', icon: HeadphonesIcon },
    { name: 'Logs', href: '/admin/logs', icon: ScrollText },
    { name: 'Profile', href: '/admin/profile', icon: UserIcon },
  ],
  'super-admin': [
    { name: 'Dashboard', href: '/super-admin', icon: LayoutDashboard },
    { name: 'Users', href: '/super-admin/users', icon: Users },
    { name: 'Admins', href: '/super-admin/admins', icon: ShieldCheck },
    { name: 'Roles & Perms', href: '/super-admin/roles', icon: Key },
    { name: 'Security', href: '/super-admin/security', icon: AlertTriangle },
    { name: 'System Settings', href: '/super-admin/settings', icon: Settings },
    { name: 'API Keys', href: '/super-admin/api-keys', icon: Key },
    { name: 'Audit Logs', href: '/super-admin/audit', icon: ScrollText },
    { name: 'Backups', href: '/super-admin/backups', icon: Database },
    { name: 'Feature Flags', href: '/super-admin/flags', icon: ToggleLeft },
    { name: 'Notifications', href: '/super-admin/notifications', icon: Bell },
    { name: 'Profile', href: '/super-admin/profile', icon: UserIcon },
  ],
}

const ROLE_BADGE: Record<Role, React.ReactNode> = {
  user: (
    <Badge variant="info" size="sm">
      User
    </Badge>
  ),
  moderator: (
    <Badge variant="warning" size="sm">
      Moderator
    </Badge>
  ),
  admin: (
    <Badge variant="secondary" size="sm">
      Admin
    </Badge>
  ),
  'super-admin': (
    <Badge variant="destructive" size="sm">
      Super Admin
    </Badge>
  ),
}

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const { theme, setTheme } = useTheme()

  const role = user?.role ?? 'user'
  const navItems = NAV_BY_ROLE[role]
  const baseHref = navItems[0]?.href ?? '/dashboard'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-40">
        <Link
          to={baseHref}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
            <BotMessageSquare size={20} />
          </div>
          <span>ChatFlow AI</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:sticky top-0 z-40 h-screen w-64 bg-background border-r border-border',
          'transition-transform duration-300 ease-in-out shrink-0 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-5 hidden md:flex items-center gap-2 font-bold text-xl tracking-tight border-b border-border">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <BotMessageSquare size={22} />
          </div>
          <span>ChatFlow AI</span>
        </div>

        {/* Role badge */}
        <div className="px-4 py-3 border-b border-border hidden md:flex items-center gap-2">
          <Avatar name={user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {user?.name}
            </p>
            {ROLE_BADGE[role]}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== baseHref &&
                location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  size={16}
                  className={
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="hidden md:flex sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border h-14 items-center justify-between px-6 gap-4">
          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                size={14}
              />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-1.5 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all border border-transparent focus:border-border"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-destructive rounded-full" />
            </button>

            {/* User menu */}
            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted transition-colors">
                  <Avatar name={user?.name} size="sm" />
                  <span className="text-sm font-medium text-foreground hidden lg:block max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </button>
              }
              items={[
                {
                  label: 'Profile',
                  href: `${baseHref.split('/')[1] === 'dashboard' ? '/dashboard' : `/${baseHref.split('/')[1]}`}/profile`,
                  icon: <UserIcon size={14} />,
                },
                {
                  label: 'Settings',
                  href: `${baseHref.split('/')[1] === 'dashboard' ? '/dashboard' : `/${baseHref.split('/')[1]}`}/settings`,
                  icon: <Settings size={14} />,
                },
                { separator: true },
                {
                  label: 'Sign Out',
                  onClick: handleLogout,
                  variant: 'destructive',
                  icon: <LogOut size={14} />,
                },
              ]}
            />
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
