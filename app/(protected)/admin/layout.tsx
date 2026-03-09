import Link from 'next/link';
import { 
  LayoutDashboard, Users, BookOpen, Settings, LogOut, BarChart3,
  Shield, CreditCard, Receipt, DollarSign, MessageSquare, Bell,
  Award, Share2, Building, Calendar, Palette, Mail, Database,
  Activity, Server, ToggleLeft, AlertTriangle, FileText, UploadCloud,
  CheckSquare, Tag, Ticket, Trophy
} from 'lucide-react';
import GlobalSearch from '@/components/GlobalSearch';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-slate-900 text-white md:flex overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-slate-800 bg-slate-900 px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span>RSVS</span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-6 px-3 py-4">
          {/* Overview */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Overview</h3>
            <div className="space-y-1">
              {[
                { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
                { name: 'Deep Analytics', href: '/admin/analytics', icon: BarChart3 },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Users & Access */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Users & Access</h3>
            <div className="space-y-1">
              {[
                { name: 'User Management', href: '/admin/users', icon: Users },
                { name: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Content & Exams */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Content & Exams</h3>
            <div className="space-y-1">
              {[
                { name: 'Exam Categories', href: '/admin/exams', icon: BookOpen },
                { name: 'Content Moderation', href: '/admin/content-review', icon: CheckSquare },
                { name: 'Certificate Templates', href: '/admin/certificates', icon: Award },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Finance & Subscriptions */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Finance</h3>
            <div className="space-y-1">
              {[
                { name: 'Financial Dashboard', href: '/admin/finance', icon: DollarSign },
                { name: 'Subscription Plans', href: '/admin/plans', icon: CreditCard },
                { name: 'Coupons', href: '/admin/coupons', icon: Tag },
                { name: 'Transactions', href: '/admin/payments', icon: Receipt },
                { name: 'Invoices', href: '/admin/invoices', icon: FileText },
                { name: 'Refunds', href: '/admin/refunds', icon: AlertTriangle },
                { name: 'Expense Tracker', href: '/admin/expenses', icon: DollarSign },
                { name: 'Salary Manager', href: '/admin/salaries', icon: Users },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Engagement</h3>
            <div className="space-y-1">
              {[
                { name: 'Notification Center', href: '/admin/notifications', icon: Bell },
                { name: 'Campaign Manager', href: '/admin/campaigns', icon: Mail },
                { name: 'Gamification Config', href: '/admin/gamification', icon: Trophy },
                { name: 'Referral Program', href: '/admin/referrals', icon: Share2 },
                { name: 'Support Tickets', href: '/admin/tickets', icon: MessageSquare },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Configuration</h3>
            <div className="space-y-1">
              {[
                { name: 'General Settings', href: '/admin/settings', icon: Settings },
                { name: 'Branches', href: '/admin/branches', icon: Building },
                { name: 'Academic Sessions', href: '/admin/sessions', icon: Calendar },
                { name: 'White-Label / Branding', href: '/admin/branding', icon: Palette },
                { name: 'Email/SMS Templates', href: '/admin/templates', icon: Mail },
                { name: 'Custom Fields', href: '/admin/custom-fields', icon: Database },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* IT & Maintenance */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">IT & Maintenance</h3>
            <div className="space-y-1">
              {[
                { name: 'Audit Logs', href: '/admin/audit-logs', icon: FileText },
                { name: 'Storage Manager', href: '/admin/storage', icon: Database },
                { name: 'API Monitor', href: '/admin/api-monitor', icon: Activity },
                { name: 'Backup Manager', href: '/admin/backups', icon: Server },
                { name: 'Feature Flags', href: '/admin/features', icon: ToggleLeft },
                { name: 'Data Import Center', href: '/admin/import', icon: UploadCloud },
                { name: 'Compliance & Legal', href: '/admin/compliance', icon: Shield },
                { name: 'Maintenance Mode', href: '/admin/maintenance', icon: AlertTriangle },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-white" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="sticky bottom-0 border-t border-slate-800 bg-slate-900 p-4">
          <Link
            href="/login"
            className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-slate-800"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 hidden md:block">Admin Panel</h1>
            <div className="flex-1 max-w-md ml-4">
              <GlobalSearch role="admin" />
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold ml-4">
            A
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
