import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Users,
  MessageSquare,
  FileText,
  Tag,
  Repeat,
  Search,
  Bell,
  Lock,
  Globe,
  Webhook,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'

const FEATURE_SECTIONS = [
  {
    badge: 'Conversations',
    title: 'A WhatsApp inbox built for teams',
    description:
      'Manage every WhatsApp conversation from a single, unified inbox designed for speed and collaboration.',
    icon: MessageSquare,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    features: [
      'Real-time message sync',
      'Conversation assignment & routing',
      'Internal notes & team mentions',
      'Contact profiles with full history',
      'Message search & filtering',
      'Pinned conversations',
    ],
    reverse: false,
  },
  {
    badge: 'AI Engine',
    title: 'GPT-4o powered responses',
    description:
      'Our AI reads your business context, learns your tone, and generates replies that feel human — every time.',
    icon: Bot,
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    features: [
      'Custom knowledge base training',
      'Tone & brand voice configuration',
      'Multi-language support',
      'Confidence scoring on every reply',
      'Auto-fallback to human agents',
      'Continuous learning from feedback',
    ],
    reverse: true,
  },
  {
    badge: 'Approval Queue',
    title: 'Human oversight, always',
    description:
      "Every AI reply passes through your team before it's sent — or you can set rules to auto-approve high-confidence messages.",
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    features: [
      'Approve, reject, or edit AI drafts',
      'Confidence threshold rules',
      'Bulk approval actions',
      'Audit trail for every decision',
      'SLA alerts for pending messages',
      'Role-based reviewer permissions',
    ],
    reverse: false,
  },
  {
    badge: 'Scheduler',
    title: 'Send the right message at the right time',
    description:
      'Schedule one-time or recurring messages to individuals or entire segments — weeks in advance.',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    features: [
      'Visual calendar view',
      'Recurring message rules',
      'Segment-based broadcasting',
      'Time-zone aware delivery',
      'Draft & preview before scheduling',
      'Cancellation & edit before send',
    ],
    reverse: true,
  },
  {
    badge: 'Analytics',
    title: 'Measure what matters',
    description:
      'Deep analytics dashboards give you full visibility into AI performance, team productivity, and customer engagement.',
    icon: BarChart3,
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    features: [
      'Message volume & trends',
      'AI response accuracy over time',
      'Approval rate by agent',
      'Average first response time',
      'Customer satisfaction (CSAT)',
      'Exportable CSV reports',
    ],
    reverse: false,
  },
]

const ADDITIONAL = [
  {
    icon: Tag,
    title: 'Contact Tags',
    desc: 'Label contacts with custom tags for easy segmentation and targeted broadcasts.',
  },
  {
    icon: FileText,
    title: 'Templates',
    desc: 'Create reusable message templates approved by WhatsApp Business Platform.',
  },
  {
    icon: Repeat,
    title: 'Workflows',
    desc: 'Build no-code automation flows triggered by keywords, time, or customer actions.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    desc: 'Instantly find any message, contact, or conversation across your entire history.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'Real-time alerts for new messages, approvals due, and SLA breaches.',
  },
  {
    icon: Lock,
    title: 'Role-based Access',
    desc: 'Granular permissions for users, moderators, admins, and super admins.',
  },
  {
    icon: Globe,
    title: 'Multi-number',
    desc: 'Connect multiple WhatsApp numbers under one account for different teams or regions.',
  },
  {
    icon: Webhook,
    title: 'Webhooks & API',
    desc: 'Integrate with your CRM, e-commerce store, or any external system via REST API.',
  },
  {
    icon: Zap,
    title: 'Zapier Integration',
    desc: 'Connect ChatFlow AI to 5,000+ apps without writing a single line of code.',
  },
  {
    icon: Users,
    title: 'Team Management',
    desc: 'Invite unlimited team members, assign roles, and track activity per user.',
  },
]

export function Features() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-16 pb-20 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Features
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to automate WhatsApp at scale
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            From AI replies to human approval to deep analytics — ChatFlow AI
            gives your team the full toolkit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections */}
      {FEATURE_SECTIONS.map((section, i) => (
        <section
          key={section.badge}
          className={`py-20 ${i % 2 === 1 ? 'bg-muted/30 border-y border-border' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
            >
              <motion.div
                className={section.reverse ? 'lg:order-2' : ''}
                initial={{ opacity: 0, x: section.reverse ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 ${section.bg} ${section.color}`}
                >
                  <section.icon className="h-3.5 w-3.5" /> {section.badge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {section.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {section.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />{' '}
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual placeholder */}
              <motion.div
                className={`${section.reverse ? 'lg:order-1' : ''} rounded-2xl border border-border bg-card p-8 min-h-[280px] flex items-center justify-center`}
                initial={{ opacity: 0, x: section.reverse ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`h-24 w-24 rounded-2xl ${section.bg} flex items-center justify-center`}
                >
                  <section.icon className={`h-12 w-12 ${section.color}`} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Features Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              And much more
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every detail you need to run a world-class customer experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ADDITIONAL.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center bg-muted/30 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Ready to see it in action?
        </h2>
        <p className="text-muted-foreground mb-6">
          Start your 14-day free trial — no credit card required.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
        >
          Start free trial <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </PublicLayout>
  )
}
