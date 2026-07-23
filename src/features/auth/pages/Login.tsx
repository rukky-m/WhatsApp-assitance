import { Link, useNavigate } from 'react-router-dom'
import { AppLogo } from '@/components/common/AppLogo'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore, type Role } from '@/store/useAuthStore'

// ── Demo accounts (no real backend needed) ────────────────────────────────────
const DEMO_ACCOUNTS: {
  email: string
  password: string
  role: Role
  name: string
  id: string
  label: string
  color: string
}[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'user@demo.com',
    password: 'demo1234',
    role: 'user',
    label: 'User',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800',
  },
  {
    id: 'u2',
    name: 'Sam Rivera',
    email: 'moderator@demo.com',
    password: 'demo1234',
    role: 'moderator',
    label: 'Moderator',
    color:
      'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800',
  },
  {
    id: 'u3',
    name: 'Jordan Lee',
    email: 'admin@demo.com',
    password: 'demo1234',
    role: 'admin',
    label: 'Admin',
    color:
      'bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-800',
  },
  {
    id: 'u4',
    name: 'Morgan Chen',
    email: 'superadmin@demo.com',
    password: 'demo1234',
    role: 'super-admin',
    label: 'Super Admin',
    color: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800',
  },
]

const ROLE_REDIRECT: Record<Role, string> = {
  user: '/dashboard',
  moderator: '/moderator',
  admin: '/admin',
  'super-admin': '/super-admin',
}

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore((state) => state.login)

  const doLogin = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setIsLoading(true)
    setError('')
    setTimeout(() => {
      login(
        {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
        },
        'demo-jwt-token'
      )
      setIsLoading(false)
      navigate(ROLE_REDIRECT[account.role])
    }, 700)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password
    )
    if (!account) {
      setError('Invalid credentials. Use one of the demo accounts below.')
      return
    }
    doLogin(account)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Link
              to="/"
              className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg"
            >
              <AppLogo size={32} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-foreground mb-2">
            Welcome back
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Sign in to your ChatFlow AI account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-md hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">
                Demo accounts
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  disabled={isLoading}
                  onClick={() => doLogin(account)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-50 ${account.color}`}
                >
                  {account.label}
                  <span className="block text-[10px] font-normal opacity-70 mt-0.5 truncate">
                    {account.email}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              All demo accounts use password:{' '}
              <span className="font-mono font-semibold">demo1234</span>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
