import Link from 'next/link';
import { 
  LayoutDashboard, BookOpen, Video, Calendar, FileText, User, LogOut, Bell,
  TrendingUp, Award, CheckSquare, Download, MessageCircle, HelpCircle,
  CreditCard, Share2, ShieldCheck, Bookmark, Edit3, Users, Trophy, Target,
  RefreshCw, Layers, FolderOpen
} from 'lucide-react';
import GlobalSearch from '@/components/GlobalSearch';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <span>RSVS</span>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Student</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-6 px-3 py-4">
          {/* Learning */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Learning</h3>
            <div className="space-y-1">
              {[
                { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
                { name: 'My Courses', href: '/student/courses', icon: BookOpen },
                { name: 'Live Classes', href: '/student/live-classes', icon: Video },
                { name: 'Timetable', href: '/student/schedule', icon: Calendar },
                { name: 'Study Plan', href: '/student/study-plan', icon: Target },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Assessments */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Assessments</h3>
            <div className="space-y-1">
              {[
                { name: 'Exams', href: '/student/exams', icon: FileText },
                { name: 'Exam Series', href: '/student/exam-series', icon: Layers },
                { name: 'Daily Challenge', href: '/student/daily-challenge', icon: Trophy },
                { name: 'Revision Mode', href: '/student/revision', icon: RefreshCw },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Performance</h3>
            <div className="space-y-1">
              {[
                { name: 'My Progress', href: '/student/progress', icon: TrendingUp },
                { name: 'Leaderboard', href: '/student/leaderboard', icon: Award },
                { name: 'Achievements', href: '/student/achievements', icon: Trophy },
                { name: 'Attendance', href: '/student/attendance', icon: CheckSquare },
                { name: 'Certificates', href: '/student/certificates', icon: Award },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Resources</h3>
            <div className="space-y-1">
              {[
                { name: 'Resource Library', href: '/student/resources', icon: FolderOpen },
                { name: 'My Notes', href: '/student/notes', icon: Edit3 },
                { name: 'Bookmarks', href: '/student/bookmarks', icon: Bookmark },
                { name: 'Downloads', href: '/student/downloads', icon: Download },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Support & Community */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Support</h3>
            <div className="space-y-1">
              {[
                { name: 'Doubts', href: '/student/doubts', icon: HelpCircle },
                { name: 'Forum', href: '/student/forum', icon: Users },
                { name: 'Support Ticket', href: '/student/support', icon: MessageCircle },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Account</h3>
            <div className="space-y-1">
              {[
                { name: 'Profile & Settings', href: '/student/profile', icon: User },
                { name: 'Subscription', href: '/student/subscription', icon: CreditCard },
                { name: 'Referrals', href: '/student/referrals', icon: Share2 },
                { name: 'KYC Status', href: '/student/kyc', icon: ShieldCheck },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 hidden md:block">Student Portal</h1>
            <div className="flex-1 max-w-md ml-4">
              <GlobalSearch role="student" />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              S
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
