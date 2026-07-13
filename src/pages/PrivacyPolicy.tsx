import { motion } from 'framer-motion'
import { PublicLayout } from '@/layouts/PublicLayout'

const LAST_UPDATED = 'January 1, 2026'

export function PrivacyPolicy() {
  return (
    <PublicLayout>
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              Last updated: {LAST_UPDATED}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-10">
              ChatFlow AI ("we", "our", "us") is committed to protecting your
              personal data. This Privacy Policy describes how we collect, use,
              and share information when you use our platform.
            </p>
          </motion.div>

          <motion.div
            className="prose prose-sm prose-foreground max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {[
              {
                title: '1. Information We Collect',
                content: `We collect information you provide directly, such as your name, email address, phone number, and payment information when you register for an account. We also automatically collect usage data including IP addresses, browser type, pages visited, and time spent on the platform. WhatsApp conversation data is processed on your behalf and stored securely in accordance with this policy.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `We use your information to provide and improve our services, process payments, communicate with you about your account, send service-related notifications, and comply with legal obligations. We do not sell your personal data to third parties. We may use aggregated, anonymised data to improve AI model performance.`,
              },
              {
                title: '3. Data Sharing',
                content: `We share your data with trusted service providers who assist us in operating our platform (such as cloud hosting, payment processors, and analytics providers). All third parties are bound by data processing agreements. We may disclose your data if required by law or to protect our legal rights.`,
              },
              {
                title: '4. Data Security',
                content: `We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, multi-factor authentication, and regular security audits. We are SOC 2 Type II certified. Despite these measures, no system is completely secure and we cannot guarantee absolute security.`,
              },
              {
                title: '5. Data Retention',
                content: `We retain your personal data for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data at any time. Conversation data is retained for 12 months by default and may be adjusted in your account settings.`,
              },
              {
                title: '6. Your Rights',
                content: `Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws including the right to access, correct, delete, or port your personal data; withdraw consent; object to processing; and lodge a complaint with a supervisory authority. To exercise these rights, contact us at privacy@chatflow.ai.`,
              },
              {
                title: '7. Cookies',
                content: `We use cookies and similar tracking technologies to operate and analyse our platform. You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.`,
              },
              {
                title: "8. Children's Privacy",
                content: `Our platform is not directed to individuals under 16 years of age. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it promptly.`,
              },
              {
                title: '9. Changes to This Policy',
                content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice in the platform. Continued use of the platform after changes constitutes acceptance of the updated policy.`,
              },
              {
                title: '10. Contact',
                content: `If you have questions about this Privacy Policy, contact our Data Protection Officer at privacy@chatflow.ai or write to: ChatFlow AI, 100 Market Street, San Francisco, CA 94105.`,
              },
            ].map((section) => (
              <div
                key={section.title}
                className="border-b border-border pb-6 last:border-0"
              >
                <h2 className="text-base font-semibold text-foreground mb-2">
                  {section.title}
                </h2>
                <p>{section.content}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
