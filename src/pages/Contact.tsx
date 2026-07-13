import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'
import toast from 'react-hot-toast'

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success("Message sent! We'll reply within 24 hours.")
    }, 1200)
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-16 pb-12 text-center px-4">
        <div className="mx-auto max-w-2xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Contact
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Get in touch
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Have a question, a partnership inquiry, or need help? We'd love to
            hear from you.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                icon: Mail,
                title: 'Email us',
                desc: 'For general inquiries and support.',
                value: 'hello@chatflow.ai',
                href: 'mailto:hello@chatflow.ai',
              },
              {
                icon: MessageSquare,
                title: 'Live chat',
                desc: 'Chat with us directly in the app.',
                value: 'Available in-app',
                href: null,
              },
              {
                icon: MapPin,
                title: 'Office',
                desc: 'Our headquarters.',
                value: 'San Francisco, CA',
                href: null,
              },
              {
                icon: Clock,
                title: 'Response time',
                desc: 'We reply within 24 hours on business days.',
                value: 'Mon–Fri, 9am–6pm PST',
                href: null,
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-primary hover:underline mt-0.5 inline-block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground mt-0.5">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-border bg-card">
                <CheckCircle2 className="h-14 w-14 text-emerald-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  We've received your message and will get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
