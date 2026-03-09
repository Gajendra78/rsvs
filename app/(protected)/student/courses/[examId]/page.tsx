'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  CheckCircle, 
  Lock,
  Clock
} from 'lucide-react';
import { INITIAL_DATA, Subject } from '@/lib/contentStore';

export default function CourseDetailPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_DATA);
  const [expandedSubject, setExpandedSubject] = useState<string | null>('s1');
  const [expandedChapter, setExpandedChapter] = useState<string | null>('c1');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('courseContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setSubjects(parsed), 0);
      } catch (e) {
        console.error("Failed to parse course content", e);
      }
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-6 lg:flex-row">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <div className="flex items-center gap-4">
          <Link href="/student/courses" className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">UKSSSC Complete Batch 2026</h2>
            <p className="text-sm text-gray-500">Course ID: {examId}</p>
          </div>
        </div>

        {/* Subjects Accordion */}
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${expandedSubject === subject.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                    <span className="font-bold">{subject.title.charAt(0)}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {subject.title}
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-800 border border-blue-200">
                        {subject.exam}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500">{subject.progress || 0}% Completed</p>
                  </div>
                </div>
                {expandedSubject === subject.id ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
              </button>

              {expandedSubject === subject.id && (
                <div className="border-t border-gray-200 bg-white p-4">
                  {subject.chapters.length > 0 ? (
                    <div className="space-y-3">
                      {subject.chapters.map((chapter) => (
                        <div key={chapter.id} className="rounded-lg border border-gray-100">
                          <button
                            onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                            className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50"
                          >
                            <span className="font-medium text-gray-800">{chapter.title}</span>
                            {expandedChapter === chapter.id ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                          </button>
                          
                          {expandedChapter === chapter.id && (
                            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                              <ul className="space-y-2">
                                {chapter.topics.map((topic) => (
                                  <li key={topic.id}>
                                    <Link 
                                      href={`/student/watch/${topic.id}`}
                                      className="flex items-center justify-between rounded-md p-2 hover:bg-white hover:shadow-sm transition-all group"
                                    >
                                      <div className="flex items-center gap-3">
                                        {topic.completed ? (
                                          <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                          <div className={`h-5 w-5 rounded-full border-2 ${topic.type === 'Video' ? 'border-blue-400' : 'border-orange-400'}`} />
                                        )}
                                        <div>
                                          <p className={`text-sm font-medium ${topic.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                            {topic.title}
                                          </p>
                                          <p className="text-xs text-gray-500 flex items-center gap-1">
                                            {topic.type === 'Video' ? <PlayCircle className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                            {topic.duration}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="h-6 w-6 text-blue-600" />
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-4">No chapters available yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Course Stats */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Course Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Progress</span>
              <span className="font-bold text-blue-600">35%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-[35%] rounded-full bg-blue-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500">Topics Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">45h</p>
                <p className="text-xs text-gray-500">Time Spent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2">Upcoming Live Class</h3>
          <p className="text-sm text-blue-700 mb-4">Doubt Clearing Session - History</p>
          <div className="flex items-center gap-2 text-xs text-blue-600 mb-4">
            <Clock className="h-4 w-4" /> Today, 4:00 PM
          </div>
          <Link href="/student/live-classes" className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Join Class
          </Link>
        </div>
      </div>
    </div>
  );
}
