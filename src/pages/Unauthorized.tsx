import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { PublicLayout } from '@/layouts/PublicLayout'

export function Unauthorized() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  return (
    <PublicLayout>
      <section className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md"
        >
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
                <ShieldX className="h-12 w-12 text-destructive" />
              </div>
              <span className="absolute -top-1 -right-1 text-3xl font-black text-destructive/20 select-none">
                403
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            Access denied
          </h1>
          <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
            You don't have permission to view this page.
          </p>
          {user && (
            <p className="text-xs text-muted-foreground mb-8">
              Signed in as{' '}
              <span className="font-medium text-foreground">{user.email}</span>{' '}
              with role{' '}
              <span className="font-medium text-foreground capitalize">
                {user.role}
              </span>
              . Contact your administrator if you believe this is an error.
            </p>
          )}
          {!user && <div className="mb-8" />}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Home className="h-4 w-4" /> Go to dashboard
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Go back
            </button>
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  )
}
