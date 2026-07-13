import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Globe, Users, Rocket } from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'

const VALUES = [
  {
    icon: Heart,
    title: 'Customer-first',
    desc: 'Everything we build starts with one question: does this make our customers more successful?',
  },
  {
    icon: Globe,
    title: 'Built for everyone',
    desc: 'From solo entrepreneurs to global enterprises — our platform scales with you, wherever you are.',
  },
  {
    icon: Users,
    title: 'Human + AI',
    desc: "We believe AI should augment human judgment, not replace it. That's why human oversight is at our core.",
  },
  {
    icon: Rocket,
    title: 'Move fast, stay reliable',
    desc: 'We ship new features every week, but never at the expense of security, stability, or trust.',
  },
]

const TEAM = [
  {
    name: 'James Carter',
    role: 'CEO & Co-founder',
    avatar: 'JC',
    color: 'bg-violet-500',
  },
  {
    name: 'Priya Nair',
    role: 'CTO & Co-founder',
    avatar: 'PN',
    color: 'bg-blue-500',
  },
  {
    name: 'Omar Abdullah',
    role: 'Head of Product',
    avatar: 'OA',
    color: 'bg-emerald-500',
  },
  {
    name: 'Lena Schmidt',
    role: 'Head of Design',
    avatar: 'LS',
    color: 'bg-pink-500',
  },
  {
    name: 'Marcus Osei',
    role: 'Head of Engineering',
    avatar: 'MO',
    color: 'bg-amber-500',
  },
  {
    name: 'Sofia Reyes',
    role: 'Head of Customer Success',
    avatar: 'SR',
    color: 'bg-cyan-500',
  },
]

export function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-20 pb-16 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            About us
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We're building the future of WhatsApp customer communication
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ChatFlow AI was founded in 2023 by a team obsessed with one problem:
            most businesses are still manually replying to WhatsApp messages one
            by one. We built the platform we wished existed.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-muted/30 border-y border-border px-4">
        <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our story
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                In 2022, our co-founders were running a small e-commerce
                business. They were spending 6+ hours a day copy-pasting
                responses to the same 20 questions on WhatsApp. There had to be
                a better way.
              </p>
              <p>
                They tried every tool on the market — none of them were built
                specifically for WhatsApp, and none gave them the confidence
                that the AI wouldn't say something wrong to a customer.
              </p>
              <p>
                So they built ChatFlow AI: a platform where AI does the heavy
                lifting, but your team always has the final say before anything
                is sent. Today, over 500 businesses trust ChatFlow AI with their
                most important customer relationships.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border p-10 text-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-5xl font-black text-primary mb-2">500+</p>
            <p className="text-sm text-muted-foreground mb-6">
              businesses worldwide
            </p>
            <p className="text-5xl font-black text-primary mb-2">10M+</p>
            <p className="text-sm text-muted-foreground mb-6">
              messages processed
            </p>
            <p className="text-5xl font-black text-primary mb-2">98%</p>
            <p className="text-sm text-muted-foreground">AI accuracy rate</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">
              What we believe
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30 border-t border-border px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Meet the team
            </h2>
            <p className="text-muted-foreground text-sm">
              A small team with a big mission.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className={`h-16 w-16 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-lg mb-3`}
                >
                  {member.avatar}
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Join us on the journey
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Start your free trial and see why hundreds of businesses trust
          ChatFlow AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-all"
          >
            Contact us
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
