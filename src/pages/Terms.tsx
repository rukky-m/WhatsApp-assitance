import { motion } from 'framer-motion'
import { PublicLayout } from '@/layouts/PublicLayout'

const LAST_UPDATED = 'January 1, 2026'

export function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-10">
              Please read these Terms of Service carefully before using ChatFlow
              AI. By accessing or using our platform, you agree to be bound by
              these terms.
            </p>
          </motion.div>

          <motion.div
            className="space-y-8 text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {[
              {
                title: '1. Acceptance of Terms',
                content: `By registering for or using ChatFlow AI, you agree to these Terms of Service and our Privacy Policy. If you are using the platform on behalf of a business, you represent that you have authority to bind that business to these terms.`,
              },
              {
                title: '2. Account Registration',
                content: `You must provide accurate, complete, and current information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. You must notify us immediately at security@chatflow.ai if you suspect any unauthorised access.`,
              },
              {
                title: '3. Acceptable Use',
                content: `You agree not to use ChatFlow AI to send spam, engage in deceptive practices, violate WhatsApp's Business Policy, transmit malware, harass or harm individuals, or violate any applicable laws or regulations. We reserve the right to suspend or terminate accounts that violate these terms.`,
              },
              {
                title: '4. WhatsApp Compliance',
                content: `You are solely responsible for ensuring your use of ChatFlow AI complies with WhatsApp's Business Policy and applicable messaging regulations. ChatFlow AI does not guarantee compliance with all WhatsApp policies and is not responsible for account suspension by WhatsApp.`,
              },
              {
                title: '5. Subscription and Payment',
                content: `Subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except where required by law. We reserve the right to change pricing with 30 days' notice. Failure to pay may result in suspension of your account.`,
              },
              {
                title: '6. Intellectual Property',
                content: `ChatFlow AI and its original content, features, and functionality are owned by ChatFlow AI Inc. and are protected by intellectual property laws. You retain ownership of the content you input into the platform (conversation data, knowledge base, etc.) and grant us a limited licence to process it to provide our services.`,
              },
              {
                title: '7. AI-Generated Content',
                content: `You acknowledge that AI-generated responses may be inaccurate, incomplete, or inappropriate. You are solely responsible for reviewing and approving AI replies before they are sent to your customers. We are not liable for any harm caused by AI-generated content.`,
              },
              {
                title: '8. Limitation of Liability',
                content: `To the maximum extent permitted by law, ChatFlow AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits or data, arising out of your use of the platform. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.`,
              },
              {
                title: '9. Indemnification',
                content: `You agree to indemnify and hold harmless ChatFlow AI, its officers, directors, employees, and agents from any claims, damages, or expenses (including legal fees) arising from your use of the platform, violation of these terms, or infringement of any third-party rights.`,
              },
              {
                title: '10. Termination',
                content: `Either party may terminate this agreement at any time. Upon termination, your access to the platform will be suspended and your data will be retained for 30 days before deletion. Provisions that by their nature should survive termination shall survive.`,
              },
              {
                title: '11. Governing Law',
                content: `These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco, CA.`,
              },
              {
                title: '12. Changes to Terms',
                content: `We may update these Terms from time to time. We will notify you of material changes by email or in-app notice. Continued use of the platform after the effective date of changes constitutes acceptance.`,
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
