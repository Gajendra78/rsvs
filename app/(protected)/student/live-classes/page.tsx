'use client';

import { useState } from 'react';
import { Video, Calendar, Clock, Users, PlayCircle, FileText, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced Number System Tricks',
      subject: 'Quantitative Aptitude',
      instructor: 'Rahul Sir',
      date: 'Today',
      time: '06:00 PM - 07:30 PM',
      isLiveNow: true,
      attendees: 145
    },
    {
      id: 2,
      title: 'Indian Constitution: Fundamental Rights',
      subject: 'General Knowledge',
      instructor: 'Priya Ma\'am',
      date: 'Tomorrow',
      time: '10:00 AM - 11:30 AM',
      isLiveNow: false,
      attendees: 89
    },
    {
      id: 3,
      title: 'Syllogism Masterclass',
      subject: 'Reasoning',
      instructor: 'Amit Sir',
      date: 'Mar 12, 2026',
      time: '04:00 PM - 05:30 PM',
      isLiveNow: false,
      attendees: 120
    }
  ];

  const pastClasses = [
    {
      id: 101,
      title: 'Percentage Basics & Shortcuts',
      subject: 'Quantitative Aptitude',
      instructor: 'Rahul Sir',
      date: 'Yesterday',
      duration: '1h 30m',
      hasRecording: true,
      hasNotes: true
    },
    {
      id: 102,
      title: 'Current Affairs - Feb 4th Week',
      subject: 'General Awareness',
      instructor: 'Priya Ma\'am',
      date: 'Mar 05, 2026',
      duration: '1h 15m',
      hasRecording: true,
      hasNotes: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Classes</h2>
          <p className="text-sm text-gray-500">Attend live interactive sessions and access past recordings.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['upcoming', 'past-recordings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'upcoming' ? (
        <div className="space-y-4">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
              cls.isLiveNow ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex flex-col md:flex-row">
                <div className={`md:w-48 p-6 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r ${
                  cls.isLiveNow ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'
                }`}>
                  {cls.isLiveNow ? (
                    <>
                      <div className="flex items-center gap-2 text-red-600 font-bold mb-2 animate-pulse">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-600"></div>
                        LIVE NOW
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{cls.time}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-bold text-gray-900 mb-1">{cls.date}</div>
                      <div className="text-sm text-gray-600 font-medium">{cls.time}</div>
                    </>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-2">
                      {cls.subject}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1.5" /> By {cls.instructor}
                      </span>
                      <span className="flex items-center">
                        <Video className="h-4 w-4 mr-1.5" /> {cls.attendees} enrolled
                      </span>
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    {cls.isLiveNow ? (
                      <button className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center">
                        <PlayCircle className="h-5 w-5 mr-2" /> Join Class
                      </button>
                    ) : (
                      <button className="w-full md:w-auto px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center">
                        <Calendar className="h-5 w-5 mr-2" /> Add to Calendar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastClasses.map((cls) => (
            <div key={cls.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="relative aspect-video bg-gray-100">
                <Image 
                  src={`https://picsum.photos/seed/class${cls.id}/600/400`} 
                  alt={cls.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/40 transition-colors">
                    <PlayCircle className="h-10 w-10 text-white fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {cls.duration}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {cls.subject}
                  </span>
                  <span className="text-xs text-gray-500">{cls.date}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1" title={cls.title}>
                  {cls.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">By {cls.instructor}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    {cls.hasNotes && (
                      <button className="flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded">
                        <FileText className="h-3 w-3 mr-1" /> Class Notes
                      </button>
                    )}
                  </div>
                  <button className="text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center">
                    Watch <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
