'use client';

import { useState } from 'react';
import { Target, CheckCircle2, Circle, Clock, BookOpen, Video, FileText } from 'lucide-react';

export default function StudyPlanPage() {
  const [activeDay, setActiveDay] = useState(1);

  const plan = [
    {
      day: 1,
      title: 'Introduction to Quantitative Aptitude',
      tasks: [
        { id: 1, type: 'video', title: 'Number System Basics', duration: '45m', completed: true },
        { id: 2, type: 'pdf', title: 'Number System Formulas', duration: '10m', completed: true },
        { id: 3, type: 'quiz', title: 'Practice Quiz 1', duration: '15m', completed: false },
      ]
    },
    {
      day: 2,
      title: 'Advanced Number System',
      tasks: [
        { id: 4, type: 'video', title: 'HCF and LCM', duration: '50m', completed: false },
        { id: 5, type: 'video', title: 'Divisibility Rules', duration: '35m', completed: false },
        { id: 6, type: 'pdf', title: 'Practice Questions', duration: '20m', completed: false },
      ]
    },
    {
      day: 3,
      title: 'Percentages',
      tasks: [
        { id: 7, type: 'video', title: 'Percentage Basics', duration: '40m', completed: false },
        { id: 8, type: 'video', title: 'Successive Percentage', duration: '30m', completed: false },
        { id: 9, type: 'quiz', title: 'Percentage Quiz', duration: '20m', completed: false },
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Study Plan</h2>
          <p className="text-sm text-gray-500">SSC CGL Tier 1 - 60 Days Crash Course</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">12%</div>
          <div className="text-sm text-gray-500">Overall Progress</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Days Sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Schedule</h3>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {plan.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeDay === day.day 
                    ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Day {day.day}</span>
                  {day.tasks.every(t => t.completed) && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="text-xs font-normal mt-1 truncate opacity-80">{day.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {plan.map((day) => day.day === activeDay && (
            <div key={day.day}>
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Day {day.day}: {day.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Complete all tasks below to maintain your streak.</p>
              </div>

              <div className="space-y-4">
                {day.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center p-4 rounded-xl border ${
                      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                    } transition-colors cursor-pointer group`}
                  >
                    <div className="mr-4">
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300 group-hover:text-blue-400" />
                      )}
                    </div>
                    
                    <div className={`p-2 rounded-lg mr-4 ${
                      task.type === 'video' ? 'bg-blue-100 text-blue-600' :
                      task.type === 'pdf' ? 'bg-red-100 text-red-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {task.type === 'video' && <Video className="h-5 w-5" />}
                      {task.type === 'pdf' && <FileText className="h-5 w-5" />}
                      {task.type === 'quiz' && <Target className="h-5 w-5" />}
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {task.duration}
                      </div>
                    </div>

                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      task.completed 
                        ? 'bg-white text-gray-600 border border-gray-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {task.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
