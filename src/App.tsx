import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LoadingScreen } from '@/components/ui/Spinner'
import { ProtectedRoute } from './components/common/ProtectedRoute'

// ── Public pages (lazy loaded) ────────────────────────────────────────────────
const Home = lazy(() =>
  import('./pages/Home').then((m) => ({ default: m.Home }))
)
const Features = lazy(() =>
  import('./pages/Features').then((m) => ({ default: m.Features }))
)
const Pricing = lazy(() =>
  import('./pages/Pricing').then((m) => ({ default: m.Pricing }))
)
const Documentation = lazy(() =>
  import('./pages/Documentation').then((m) => ({ default: m.Documentation }))
)
const About = lazy(() =>
  import('./pages/About').then((m) => ({ default: m.About }))
)
const Contact = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.Contact }))
)
const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
)
const Terms = lazy(() =>
  import('./pages/Terms').then((m) => ({ default: m.Terms }))
)
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
)
const Unauthorized = lazy(() =>
  import('./pages/Unauthorized').then((m) => ({ default: m.Unauthorized }))
)

// ── Auth pages ────────────────────────────────────────────────────────────────
const Login = lazy(() =>
  import('./features/auth/pages/Login').then((m) => ({ default: m.Login }))
)
const Register = lazy(() =>
  import('./features/auth/pages/Register').then((m) => ({
    default: m.Register,
  }))
)
const ForgotPassword = lazy(() =>
  import('./features/auth/pages/ForgotPassword').then((m) => ({
    default: m.ForgotPassword,
  }))
)
const ResetPassword = lazy(() =>
  import('./features/auth/pages/ResetPassword').then((m) => ({
    default: m.ResetPassword,
  }))
)
const VerifyEmail = lazy(() =>
  import('./features/auth/pages/VerifyEmail').then((m) => ({
    default: m.VerifyEmail,
  }))
)

// ── User Dashboard pages (lazy) ───────────────────────────────────────────────
const DashboardLayout = lazy(() =>
  import('./layouts/DashboardLayout').then((m) => ({
    default: m.DashboardLayout,
  }))
)
const DashboardHome = lazy(() =>
  import('./features/dashboard/pages/DashboardHome').then((m) => ({
    default: m.DashboardHome,
  }))
)
const Conversations = lazy(() =>
  import('./features/dashboard/pages/Conversations').then((m) => ({
    default: m.Conversations,
  }))
)
const ApprovalQueue = lazy(() =>
  import('./features/dashboard/pages/ApprovalQueue').then((m) => ({
    default: m.ApprovalQueue,
  }))
)
const Automation = lazy(() =>
  import('./features/dashboard/pages/Automation').then((m) => ({ default: m.Automation }))
)
const Contacts = lazy(() =>
  import('./features/dashboard/pages/Contacts').then((m) => ({
    default: m.Contacts,
  }))
)
const Analytics = lazy(() =>
  import('./features/dashboard/pages/Analytics').then((m) => ({
    default: m.Analytics,
  }))
)
const Settings = lazy(() =>
  import('./features/dashboard/pages/Settings').then((m) => ({
    default: m.Settings,
  }))
)
const Billing = lazy(() =>
  import('./features/dashboard/pages/Billing').then((m) => ({
    default: m.Billing,
  }))
)
const Profile = lazy(() =>
  import('./features/dashboard/pages/Profile').then((m) => ({
    default: m.Profile,
  }))
)

// ── Moderator pages (lazy) ────────────────────────────────────────────────────
const ModeratorHome = lazy(() =>
  import('./features/moderator/pages/ModeratorHome').then((m) => ({
    default: m.ModeratorHome,
  }))
)
const ModeratorUsers = lazy(() =>
  import('./features/moderator/pages/ModeratorUsers').then((m) => ({
    default: m.ModeratorUsers,
  }))
)
const FlaggedMessages = lazy(() =>
  import('./features/moderator/pages/FlaggedMessages').then((m) => ({
    default: m.FlaggedMessages,
  }))
)
const SupportTickets = lazy(() =>
  import('./features/moderator/pages/SupportTickets').then((m) => ({
    default: m.SupportTickets,
  }))
)
const ModeratorLogs = lazy(() =>
  import('./features/moderator/pages/Logs').then((m) => ({ default: m.Logs }))
)
const Announcements = lazy(() =>
  import('./features/moderator/pages/Announcements').then((m) => ({
    default: m.Announcements,
  }))
)

// ── Admin pages (lazy) ────────────────────────────────────────────────────────
const AdminHome = lazy(() =>
  import('./features/admin/pages/AdminHome').then((m) => ({
    default: m.AdminHome,
  }))
)
const AdminUsers = lazy(() =>
  import('./features/admin/pages/AdminUsers').then((m) => ({
    default: m.AdminUsers,
  }))
)
const AdminSubscriptions = lazy(() =>
  import('./features/admin/pages/AdminSubscriptions').then((m) => ({
    default: m.AdminSubscriptions,
  }))
)
const AdminAnalytics = lazy(() =>
  import('./features/admin/pages/AdminAnalytics').then((m) => ({
    default: m.AdminAnalytics,
  }))
)
const AdminAIModels = lazy(() =>
  import('./features/admin/pages/AdminAIModels').then((m) => ({
    default: m.AdminAIModels,
  }))
)
const AdminSettings = lazy(() =>
  import('./features/admin/pages/AdminSettings').then((m) => ({
    default: m.AdminSettings,
  }))
)
const AdminSupport = lazy(() =>
  import('./features/admin/pages/AdminSupport').then((m) => ({
    default: m.AdminSupport,
  }))
)
const AdminLogs = lazy(() =>
  import('./features/admin/pages/AdminLogs').then((m) => ({
    default: m.AdminLogs,
  }))
)

// ── Super Admin pages (lazy) ──────────────────────────────────────────────────
const SuperAdminHome = lazy(() =>
  import('./features/super-admin/pages/SuperAdminHome').then((m) => ({
    default: m.SuperAdminHome,
  }))
)
const SuperAdminUsers = lazy(() =>
  import('./features/super-admin/pages/SuperAdminUsers').then((m) => ({
    default: m.SuperAdminUsers,
  }))
)
const SuperAdminAdmins = lazy(() =>
  import('./features/super-admin/pages/SuperAdminAdmins').then((m) => ({
    default: m.SuperAdminAdmins,
  }))
)
const RolesAndPermissions = lazy(() =>
  import('./features/super-admin/pages/RolesAndPermissions').then((m) => ({
    default: m.RolesAndPermissions,
  }))
)
const SecuritySettings = lazy(() =>
  import('./features/super-admin/pages/SecuritySettings').then((m) => ({
    default: m.SecuritySettings,
  }))
)
const SystemSettings = lazy(() =>
  import('./features/super-admin/pages/SystemSettings').then((m) => ({
    default: m.SystemSettings,
  }))
)
const APIKeys = lazy(() =>
  import('./features/super-admin/pages/APIKeys').then((m) => ({
    default: m.APIKeys,
  }))
)
const AuditLogs = lazy(() =>
  import('./features/super-admin/pages/AuditLogs').then((m) => ({
    default: m.AuditLogs,
  }))
)
const Backups = lazy(() =>
  import('./features/super-admin/pages/Backups').then((m) => ({
    default: m.Backups,
  }))
)
const FeatureFlags = lazy(() =>
  import('./features/super-admin/pages/FeatureFlags').then((m) => ({
    default: m.FeatureFlags,
  }))
)
const PlatformNotifications = lazy(() =>
  import('./features/super-admin/pages/PlatformNotifications').then((m) => ({
    default: m.PlatformNotifications,
  }))
)

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* ── Public Website ── */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* ── Auth ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* ── User Dashboard ── */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={['user', 'moderator', 'admin', 'super-admin']}
              />
            }
          >
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="conversations" element={<Conversations />} />
              <Route path="approvals" element={<ApprovalQueue />} />
              <Route path="automation" element={<Automation />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="billing" element={<Billing />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ── Moderator Dashboard ── */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={['moderator', 'admin', 'super-admin']}
              />
            }
          >
            <Route path="/moderator" element={<DashboardLayout />}>
              <Route index element={<ModeratorHome />} />
              <Route path="users" element={<ModeratorUsers />} />
              <Route path="flagged" element={<FlaggedMessages />} />
              <Route path="tickets" element={<SupportTickets />} />
              <Route path="logs" element={<ModeratorLogs />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ── Admin Dashboard ── */}
          <Route
            element={<ProtectedRoute allowedRoles={['admin', 'super-admin']} />}
          >
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="ai-models" element={<AdminAIModels />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ── Super Admin Dashboard ── */}
          <Route element={<ProtectedRoute allowedRoles={['super-admin']} />}>
            <Route path="/super-admin" element={<DashboardLayout />}>
              <Route index element={<SuperAdminHome />} />
              <Route path="users" element={<SuperAdminUsers />} />
              <Route path="admins" element={<SuperAdminAdmins />} />
              <Route path="roles" element={<RolesAndPermissions />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="api-keys" element={<APIKeys />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="backups" element={<Backups />} />
              <Route path="flags" element={<FeatureFlags />} />
              <Route path="notifications" element={<PlatformNotifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ── Error pages ── */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '!text-sm !font-medium',
          duration: 4000,
        }}
      />
    </>
  )
}

export default App
