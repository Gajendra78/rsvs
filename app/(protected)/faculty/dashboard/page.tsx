import { Video, Calendar, Upload, FilePlus, MessageCircle } from 'lucide-react';

export default function FacultyDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Assigned Subjects', value: '4', icon: FilePlus, color: 'text-blue-600 bg-blue-100' },
          { label: 'Upcoming Classes', value: '2', icon: Video, color: 'text-purple-600 bg-purple-100' },
          { label: 'Doubts Pending', value: '12', icon: MessageCircle, color: 'text-amber-600 bg-amber-100' },
          { label: 'Avg Rating', value: '4.8', icon: Calendar, color: 'text-green-600 bg-green-100' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Classes */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900">Upcoming Live Classes</h3>
          <div className="space-y-4">
            {[
              { time: 'Today, 10:00 AM', subject: 'History', topic: 'Mughal Empire', students: 45 },
              { time: 'Tomorrow, 11:00 AM', subject: 'Polity', topic: 'Constitution', students: 52 },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div>
                  <p className="font-medium text-gray-900">{cls.subject}: {cls.topic}</p>
                  <p className="text-sm text-gray-500">{cls.time} • {cls.students} enrolled</p>
                </div>
                <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <Upload className="mb-2 h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Upload Video</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <Calendar className="mb-2 h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Schedule Class</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <FilePlus className="mb-2 h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Create Exam</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <MessageCircle className="mb-2 h-6 w-6 text-amber-600" />
              <span className="text-sm font-medium">View Doubts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
