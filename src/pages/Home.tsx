import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  MessageSquare,
  Users,
  Clock,
  Star,
  Play,
} from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45 },
  }),
}

const FEATURES = [
  {
    icon: Bot,
    title: 'AI-Powered Replies',
    description:
      'Our AI learns from your business data and crafts context-aware responses that sound human.',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    icon: Zap,
    title: 'Instant Automation',
    description:
      'Automate responses to FAQs, orders, and support in milliseconds — day or night.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  {
    icon: Shield,
    title: 'Human Approval Queue',
    description:
      'Every AI message can pass through your team for review before being sent.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description:
      'Track response rates, approval scores, AI performance, and user activity in real time.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: Clock,
    title: 'Scheduled Messages',
    description:
      'Plan and schedule broadcasts or individual messages with recurring schedule support.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
  },
  {
    icon: Users,
    title: 'Multi-Team Support',
    description:
      'Assign conversations to teams, set permissions per role, and track every interaction.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
  },
]

const STATS = [
  { value: '10M+', label: 'Messages processed' },
  { value: '98%', label: 'AI accuracy rate' },
  { value: '3s', label: 'Average response time' },
  { value: '500+', label: 'Businesses worldwide' },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Head of Customer Success, RetailCo',
    avatar: 'SJ',
    text: 'ChatFlow AI reduced our response time by 80%. Our customers love getting instant answers at 2 AM.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    role: 'Founder, ShopEasy',
    avatar: 'AH',
    text: 'The approval queue gives us full control. We trust the AI but our team still owns every customer relationship.',
    rating: 5,
  },
  {
    name: 'Maria Gonzalez',
    role: 'Operations Manager, LogiTrack',
    avatar: 'MG',
    text: 'Setup took less than an hour. The analytics dashboard alone is worth the subscription.',
    rating: 5,
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    desc: 'Perfect for small businesses just getting started.',
    features: [
      '500 AI messages/month',
      '1 WhatsApp number',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/month',
    desc: 'For growing teams that need more power and control.',
    features: [
      '5,000 AI messages/month',
      '3 WhatsApp numbers',
      'Advanced analytics',
      'Approval queue',
      'Scheduler',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/month',
    desc: 'Enterprise-grade for large customer operations.',
    features: [
      'Unlimited AI messages',
      'Unlimited numbers',
      'Custom AI training',
      'Dedicated account manager',
      'SLA guarantee',
      'SSO & advanced security',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
]

const avatarColors = ['bg-violet-500', 'bg-emerald-500', 'bg-blue-500']

export function Home() {
  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-sm mb-8">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Now with GPT-4o — smarter replies, faster results
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
          >
            Automate your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              WhatsApp
            </span>
            <br />
            with intelligent AI
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
          >
            Scale your customer support and sales with an AI assistant that
            learns from your business, replies instantly, and lets your team
            stay in control.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-all"
            >
              <Play className="h-4 w-4 text-primary" /> Watch demo
            </Link>
          </motion.div>
          <motion.p
            className="mt-4 text-xs text-muted-foreground"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
          >
            No credit card required · 14-day free trial · Cancel anytime
          </motion.p>
        </div>

        {/* Mock UI */}
        <motion.div
          className="relative mx-auto mt-16 max-w-5xl px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-4 text-xs text-muted-foreground">
                app.chatflow.ai/dashboard
              </span>
            </div>
            <div className="grid grid-cols-12 min-h-[280px] sm:min-h-[360px]">
              <div className="col-span-2 bg-muted/30 border-r border-border p-3 hidden sm:block">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`mb-2 h-7 rounded-md ${i === 0 ? 'bg-primary/20' : 'bg-muted'}`}
                  />
                ))}
              </div>
              <div className="col-span-4 sm:col-span-3 border-r border-border p-3">
                {[
                  { name: 'Alice Cooper', time: '10:32', unread: 3 },
                  { name: 'Bob Smith', time: '09:15', unread: 0 },
                  { name: 'Carol Davis', time: 'Yesterday', unread: 1 },
                ].map((chat) => (
                  <div
                    key={chat.name}
                    className="flex items-center gap-2 p-2 mb-1 rounded-lg hover:bg-muted cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium truncate">
                          {chat.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-1">
                          {chat.time}
                        </span>
                      </div>
                      <div className="h-2.5 bg-muted rounded mt-1 w-3/4" />
                    </div>
                    {chat.unread > 0 && (
                      <span className="h-4 w-4 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="col-span-8 sm:col-span-7 flex flex-col">
                <div className="flex-1 p-4 space-y-3">
                  {[
                    { side: 'left', w: '60%' },
                    { side: 'right', w: '45%' },
                    { side: 'left', w: '75%' },
                    { side: 'right', w: '55%', ai: true },
                  ].map((bubble, i) => (
                    <div
                      key={i}
                      className={`flex ${bubble.side === 'right' ? 'justify-end' : ''}`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-2 ${bubble.side === 'right' ? (bubble.ai ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-primary/15') : 'bg-muted'}`}
                        style={{ width: bubble.w }}
                      >
                        {bubble.ai && (
                          <span className="text-[9px] font-semibold text-emerald-600 block mb-1">
                            AI Suggestion
                          </span>
                        )}
                        <div className="h-2.5 bg-current opacity-20 rounded" />
                        <div className="h-2 bg-current opacity-10 rounded mt-1 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <div className="h-9 rounded-lg bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-primary mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Everything you need
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              All the tools to scale your WhatsApp
            </motion.h2>
            <motion.p
              className="mt-4 text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              One platform that handles everything from AI replies to analytics
              to human oversight.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg} mb-4`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              See all features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Up and running in minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect WhatsApp',
                desc: 'Link your WhatsApp Business account in one click via our secure OAuth flow.',
              },
              {
                step: '02',
                title: 'Train your AI',
                desc: 'Upload your FAQ, product catalog, or past conversations to teach the AI your business.',
              },
              {
                step: '03',
                title: 'Go live',
                desc: 'Activate your AI assistant and start responding to customers automatically.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-2xl font-black text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Simple pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Plans for every stage
            </h2>
            <p className="mt-4 text-muted-foreground max-w-sm mx-auto">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${plan.highlight ? 'border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105' : 'border-border bg-card'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlight && (
                  <span className="inline-block mb-3 text-xs font-bold uppercase tracking-wider bg-white/20 rounded-full px-3 py-1 w-fit">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span
                    className={`text-sm mb-1 ${plan.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm mb-6 ${plan.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
                >
                  {plan.desc}
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-emerald-500'}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.highlight ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-muted-foreground">
            All plans include a 14-day free trial.{' '}
            <Link
              to="/pricing"
              className="text-primary hover:underline font-medium"
            >
              Compare all features →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Trusted by businesses worldwide
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-primary-foreground shadow-2xl"
          >
            <MessageSquare className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to automate your WhatsApp?
            </h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-8 text-lg">
              Join 500+ businesses using ChatFlow AI to deliver instant,
              intelligent customer experiences.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-8 py-3.5 text-base font-bold hover:bg-white/90 transition-all shadow-lg"
            >
              Start your free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/60">
              No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
