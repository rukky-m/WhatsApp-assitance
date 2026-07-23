import { Link, useNavigate } from 'react-router-dom'
import { AppLogo } from '@/components/common/AppLogo'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      login(
        { id: '1', name: 'New User', email: 'user@example.com', role: 'user' },
        'fake-jwt-token'
      )
      setIsLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg">
              <AppLogo size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-foreground mb-2">Create an account</h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Start automating your WhatsApp conversations today
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-md hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : (
                <>Sign Up <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
