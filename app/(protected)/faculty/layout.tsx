import Link from 'next/link';
import { 
  LayoutDashboard, Video, FileText, MessageSquare, Upload, LogOut, BarChart3,
  Users, Calendar, PenTool, HelpCircle, Target, Layers, PieChart, CheckSquare
} from 'lucide-react';
import GlobalSearch from '@/components/GlobalSearch';

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-900">
            <span>RSVS</span>
            <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">Faculty</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-6 px-3 py-4">
          {/* Core */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Core</h3>
            <div className="space-y-1">
              {[
                { name: 'Dashboard', href: '/faculty/dashboard', icon: LayoutDashboard },
                { name: 'My Content', href: '/faculty/content', icon: Upload },
                { name: 'Live Classes', href: '/faculty/live-classes', icon: Video },
                { name: 'Exams', href: '/faculty/exams', icon: FileText },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Engagement</h3>
            <div className="space-y-1">
              {[
                { name: 'Doubts Inbox', href: '/faculty/doubts', icon: MessageSquare },
                { name: 'Doubt Review', href: '/faculty/doubt-review', icon: CheckSquare },
                { name: 'Forum Moderation', href: '/faculty/forum', icon: Users },
                { name: '1-on-1 Sessions', href: '/faculty/sessions', icon: Calendar },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Tools</h3>
            <div className="space-y-1">
              {[
                { name: 'Whiteboard Manager', href: '/faculty/whiteboards', icon: PenTool },
                { name: 'Polls & Quizzes', href: '/faculty/polls', icon: HelpCircle },
                { name: 'Study Plan Builder', href: '/faculty/study-plans', icon: Target },
                { name: 'Test Series', href: '/faculty/test-series', icon: Layers },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Analytics</h3>
            <div className="space-y-1">
              {[
                { name: 'Content Analytics', href: '/faculty/content-analytics', icon: PieChart },
                { name: 'Student Reports', href: '/faculty/reports', icon: BarChart3 },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
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
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 hidden md:block">Faculty Portal</h1>
            <div className="flex-1 max-w-md ml-4">
              <GlobalSearch role="faculty" />
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold ml-4">
            F
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
