import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'

export function NotFound() {
  return (
    <PublicLayout>
      <section className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md"
        >
          {/* Big 404 */}
          <div className="relative mb-8">
            <span className="text-[120px] sm:text-[160px] font-black text-muted/30 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Sorry, we couldn't find the page you were looking for. It may have
            been moved, deleted, or you may have mistyped the URL.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Home className="h-4 w-4" /> Back to home
            </Link>
            <button
              onClick={() => window.history.back()}
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
