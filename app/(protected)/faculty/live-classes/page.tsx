'use client';

import { useState, useEffect } from 'react';
import { Plus, Video, Calendar, Clock, Users, MoreVertical, X, Trash2 } from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  status: 'Upcoming' | 'Live' | 'Completed';
  meetingLink?: string;
}

const INITIAL_CLASSES: LiveClass[] = [
  {
    id: '1',
    title: 'Indian Polity - Fundamental Rights',
    subject: 'General Studies',
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    duration: '60',
    students: 45,
    status: 'Upcoming',
  },
  {
    id: '2',
    title: 'Doubt Clearing Session',
    subject: 'History',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    duration: '45',
    students: 52,
    status: 'Upcoming',
  }
];

export default function FacultyLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '60',
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('liveClasses');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setClasses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse live classes", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (classes !== INITIAL_CLASSES) {
      localStorage.setItem('liveClasses', JSON.stringify(classes));
    }
  }, [classes]);

  const handleScheduleClass = () => {
    if (!newClass.title || !newClass.subject || !newClass.date || !newClass.time) return;

    const cls: LiveClass = {
      id: Date.now().toString(),
      title: newClass.title,
      subject: newClass.subject,
      date: newClass.date,
      time: newClass.time,
      duration: newClass.duration,
      students: 0,
      status: 'Upcoming',
    };

    setClasses([...classes, cls]);
    setShowScheduleModal(false);
    setNewClass({ title: '', subject: '', date: '', time: '', duration: '60' });
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Cancel this class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Classes</h2>
          <p className="text-sm text-gray-500">Manage your schedule and conduct classes</p>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Schedule Class
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-semibold text-gray-900">Upcoming Schedule</h3>
          {classes.filter(c => c.status !== 'Completed').length > 0 ? (
            classes.filter(c => c.status !== 'Completed').map((cls) => (
              <div key={cls.id} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cls.title}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium text-indigo-600">{cls.subject}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDateTime(cls.date, cls.time)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{cls.students} Enrolled</p>
                    <p className="text-xs text-gray-500">{cls.duration} mins</p>
                  </div>
                  <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    Start
                  </button>
                  <button 
                    onClick={() => handleDeleteClass(cls.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-200">
              No upcoming classes scheduled.
            </div>
          )}
        </div>

        {/* Past Classes / History */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-fit">
          <h3 className="mb-4 font-semibold text-gray-900">Recent Classes</h3>
          <div className="space-y-4">
            {[
              { title: 'Geography - River Systems', date: 'Yesterday', attendance: '85%' },
              { title: 'History - Mughal Empire', date: '2 days ago', attendance: '78%' },
              { title: 'Polity - Preamble', date: '3 days ago', attendance: '92%' },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{cls.title}</p>
                  <p className="text-xs text-gray-500">{cls.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{cls.attendance}</p>
                  <p className="text-[10px] text-gray-400">Attendance</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
            View All History
          </button>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Schedule Live Class</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g., Modern History - Gandhian Era"
                  value={newClass.title}
                  onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                >
                  <option value="">Select Subject</option>
                  <option value="General Studies">General Studies</option>
                  <option value="Uttarakhand GK">Uttarakhand GK</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Reasoning">Reasoning</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
                    value={newClass.date}
                    onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  value={newClass.duration}
                  onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScheduleClass}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
