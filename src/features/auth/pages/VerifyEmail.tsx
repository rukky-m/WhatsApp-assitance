import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BotMessageSquare, Mail, CheckCircle2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function VerifyEmail() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const handleCodeChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`)
      el?.focus()
    }
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      const el = document.getElementById(`otp-${i - 1}`)
      el?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length < 6) {
      toast.error('Please enter the full 6-digit code.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Email verified! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1500)
    }, 1200)
  }

  const handleResend = () => {
    setResending(true)
    setTimeout(() => {
      setResending(false)
      toast.success('Verification code resent.')
    }, 1000)
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
              <BotMessageSquare size={32} />
            </Link>
          </div>

          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
              <Mail className="h-7 w-7 text-blue-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-foreground mb-2">
            Verify your email
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            We've sent a 6-digit code to your email address. Enter it below to
            verify your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-12 w-10 rounded-lg border-2 border-border bg-background text-center text-lg font-bold focus:border-primary focus:outline-none transition-colors"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Verify email
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Didn't receive a code?{' '}
            <button
              disabled={resending}
              onClick={handleResend}
              className="text-primary hover:underline font-medium disabled:opacity-50 inline-flex items-center gap-1"
            >
              {resending ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />{' '}
                  Resending...
                </>
              ) : (
                'Resend code'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
