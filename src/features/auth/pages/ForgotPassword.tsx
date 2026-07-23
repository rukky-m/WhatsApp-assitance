import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppLogo } from '@/components/common/AppLogo'
import { Mail, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success('Reset link sent to your email.')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-background rounded-2xl shadow-xl border border-border overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Link
              to="/"
              className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg"
            >
              <AppLogo size={32} />
            </Link>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Mail className="h-7 w-7 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Check your email
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a password reset link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                The link expires in 1 hour.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive it?{' '}
                <button
                  className="text-primary hover:underline font-medium"
                  onClick={() => {
                    setSent(false)
                    setEmail('')
                  }}
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">
                Forgot password?
              </h2>
              <p className="text-center text-muted-foreground text-sm mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
