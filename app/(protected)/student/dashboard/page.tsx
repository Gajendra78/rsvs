import Link from 'next/link';
import { Play, Calendar, Clock, ChevronRight, BookOpen, FileText } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Student!</h2>
            <p className="mt-1 text-blue-100">UKSSSC Complete Batch 2026 • Expires in 180 days</p>
          </div>
          <Link href="/student/profile" className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 backdrop-blur-sm">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Today&apos;s Schedule</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', subject: 'General Studies', topic: 'Indian History', status: 'Live Now' },
              { time: '02:00 PM', subject: 'Reasoning', topic: 'Logical Deduction', status: 'Upcoming' },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-xs text-gray-500">{cls.topic}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">{cls.time}</span>
                    {cls.status === 'Live Now' && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
                <Link 
                  href="/student/live-classes"
                  className={`rounded-md px-3 py-1.5 text-xs font-medium ${cls.status === 'Live Now' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Join
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* My Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Course Progress</h3>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
              65%
            </div>
          </div>
          <div className="space-y-4">
            {[
              { subject: 'Uttarakhand GK', progress: 80 },
              { subject: 'General Hindi', progress: 45 },
              { subject: 'Mental Aptitude', progress: 60 },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.subject}</span>
                  <span className="text-gray-500">{item.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div 
                    className="h-2 rounded-full bg-blue-600" 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <Link href="/student/progress" className="mt-6 block w-full rounded-lg border border-gray-200 py-2 text-center text-sm font-medium text-gray-600 hover:bg-gray-50">
            View Detailed Report
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            <Play className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="space-y-4">
            {[
              { title: 'River Systems of India', type: 'Video', time: '2 hours ago', link: '/student/watch/t1' },
              { title: 'Mock Test #4 - UKPSC', type: 'Exam', time: 'Yesterday', score: '85/100', link: '/student/exams' },
              { title: 'Hindi Grammar Notes', type: 'PDF', time: '2 days ago', link: '/student/downloads' },
            ].map((activity, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <div className="flex-1">
                  <Link href={activity.link} className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 hover:underline">
                    {activity.title}
                  </Link>
                  <p className="text-xs text-gray-500">{activity.type} • {activity.time}</p>
                </div>
                {activity.score && (
                  <span className="text-xs font-bold text-green-600">{activity.score}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { name: 'My Courses', icon: BookOpen, color: 'bg-indigo-100 text-indigo-600', href: '/student/courses' },
          { name: 'Take Exam', icon: FileText, color: 'bg-pink-100 text-pink-600', href: '/student/exams' },
          { name: 'Doubts', icon: ChevronRight, color: 'bg-amber-100 text-amber-600', href: '/student/doubts' },
          { name: 'Downloads', icon: ChevronRight, color: 'bg-emerald-100 text-emerald-600', href: '/student/downloads' },
        ].map((link, idx) => (
          <Link 
            key={idx} 
            href={link.href}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${link.color}`}>
              <link.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
