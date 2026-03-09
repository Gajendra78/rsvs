import Link from 'next/link';
import { 
  LayoutDashboard, Users, CreditCard, FileText, LogOut, BarChart3,
  UserPlus, Calendar, Receipt, Bell, Clock, Briefcase
} from 'lucide-react';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-emerald-900">
            <span>RSVS</span>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">Manager</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-6 px-3 py-4">
          {/* Overview */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Overview</h3>
            <div className="space-y-1">
              {[
                { name: 'Dashboard', href: '/manager/dashboard', icon: LayoutDashboard },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* People */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">People</h3>
            <div className="space-y-1">
              {[
                { name: 'Students', href: '/manager/students', icon: Users },
                { name: 'Leads & Enquiries', href: '/manager/leads', icon: UserPlus },
                { name: 'Staff Management', href: '/manager/staff', icon: Briefcase },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Academics */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Academics</h3>
            <div className="space-y-1">
              {[
                { name: 'Batch Management', href: '/manager/batches', icon: Users },
                { name: 'Timetable', href: '/manager/timetable', icon: Calendar },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Finance */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Finance</h3>
            <div className="space-y-1">
              {[
                { name: 'Subscriptions', href: '/manager/subscriptions', icon: CreditCard },
                { name: 'Payments', href: '/manager/payments', icon: Receipt },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Communication & Analytics */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Other</h3>
            <div className="space-y-1">
              {[
                { name: 'Announcements', href: '/manager/announcements', icon: Bell },
                { name: 'Reports', href: '/manager/reports', icon: BarChart3 },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
          <Link
            href="/login"
            className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-gray-900">Manager Portal</h1>
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
            M
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
