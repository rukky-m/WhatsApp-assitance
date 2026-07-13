import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Book,
  Zap,
  Bot,
  Shield,
  BarChart3,
  Clock,
  Settings,
  ChevronRight,
  Search,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'
import { cn } from '@/utils/cn'

const SECTIONS = [
  {
    icon: Zap,
    title: 'Getting Started',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    articles: [
      'Quick start guide',
      'Connect your WhatsApp Business account',
      'Invite your first team member',
      'Send your first AI reply',
    ],
  },
  {
    icon: Bot,
    title: 'AI Configuration',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    articles: [
      'Training your AI with a knowledge base',
      'Configuring tone & brand voice',
      'Setting confidence thresholds',
      'Enabling multi-language support',
    ],
  },
  {
    icon: Shield,
    title: 'Approval Queue',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    articles: [
      'How the approval queue works',
      'Setting auto-approval rules',
      'Bulk approving messages',
      'Reviewing the audit trail',
    ],
  },
  {
    icon: Clock,
    title: 'Scheduler',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    articles: [
      'Scheduling one-time messages',
      'Creating recurring schedules',
      'Broadcasting to segments',
      'Cancelling a scheduled message',
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    articles: [
      'Understanding your dashboard',
      'AI performance metrics',
      'Exporting reports as CSV',
      'Team productivity metrics',
    ],
  },
  {
    icon: Settings,
    title: 'Account & Billing',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    articles: [
      'Upgrading or downgrading your plan',
      'Managing team members & roles',
      'Billing & invoices',
      'Security & two-factor authentication',
    ],
  },
]

const GUIDES = [
  { title: 'Building your first automation workflow', time: '8 min read' },
  { title: 'How to reduce response time by 90% with AI', time: '5 min read' },
  {
    title: 'Setting up role-based permissions for your team',
    time: '6 min read',
  },
  {
    title: 'Integrating ChatFlow AI with your CRM via API',
    time: '12 min read',
  },
]

export function Documentation() {
  const [search, setSearch] = useState('')

  const filteredSections = SECTIONS.map((section) => ({
    ...section,
    articles: section.articles.filter((a) =>
      a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => !search || s.articles.length > 0)

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-muted/30 border-b border-border py-16 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Book className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Documentation
            </span>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            How can we help you?
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Search our documentation, guides, and API reference.
          </motion.p>
          {/* Search */}
          <motion.div
            className="relative max-w-lg mx-auto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-xl border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Doc Sections */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          {filteredSections.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No results found for "{search}".
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSections.map((section, i) => (
                <motion.div
                  key={section.title}
                  className="rounded-xl border border-border bg-card p-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg mb-4',
                      section.bg
                    )}
                  >
                    <section.icon
                      className={cn('h-4.5 w-4.5', section.color)}
                    />
                  </div>
                  <h2 className="font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {section.articles.map((article) => (
                      <li key={article}>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 border-t border-border bg-muted/30 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-foreground mb-8">
            Popular guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDES.map((guide, i) => (
              <motion.a
                key={guide.title}
                href="#"
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div>
                  <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {guide.time}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference CTA */}
      <section className="py-16 px-4 text-center">
        <div className="mx-auto max-w-lg">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Need the API reference?
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Integrate ChatFlow AI into your stack with our RESTful API and
            webhook events.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            View API reference <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </PublicLayout>
  )
}
