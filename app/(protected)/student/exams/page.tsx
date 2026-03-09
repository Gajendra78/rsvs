'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, AlertCircle, ChevronRight, Filter, Trophy, Calendar } from 'lucide-react';

const EXAMS = [
  {
    id: 'mock-1',
    title: 'UKSSSC Full Length Mock Test 1',
    category: 'UKSSSC',
    questions: 100,
    duration: '120 mins',
    marks: 100,
    status: 'Available',
    date: 'Available Now',
    type: 'Full Length',
  },
  {
    id: 'mock-2',
    title: 'General Hindi Subject Test',
    category: 'UKSSSC',
    questions: 50,
    duration: '60 mins',
    marks: 50,
    status: 'Completed',
    score: '42/50',
    bestScore: '42/50',
    date: 'Attempted Yesterday',
    type: 'Subject Test',
  },
  {
    id: 'mock-3',
    title: 'Uttarakhand GK Weekly Quiz',
    category: 'UKPSC',
    questions: 20,
    duration: '20 mins',
    marks: 20,
    status: 'Scheduled',
    date: 'Tomorrow, 10:00 AM',
    type: 'Quiz',
  },
  {
    id: 'mock-4',
    title: 'SSC CGL Tier 1 Mock',
    category: 'SSC',
    questions: 100,
    duration: '60 mins',
    marks: 200,
    status: 'Missed',
    date: 'Expired Yesterday',
    type: 'Full Length',
  },
];

export default function StudentExamsPage() {
  const [filter, setFilter] = useState('All');

  const filteredExams = EXAMS.filter((exam) => {
    if (filter === 'All') return true;
    if (filter === 'Available Now') return exam.status === 'Available';
    return exam.status === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Online Exams</h2>
          <p className="text-gray-500">Practice with our structured mock tests and quizzes.</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-gray-200">
        {['All', 'Upcoming', 'Completed', 'Available Now', 'Missed'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f === 'Upcoming' ? 'Scheduled' : f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              (filter === f || (filter === 'Scheduled' && f === 'Upcoming'))
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Exam Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`absolute top-0 left-0 h-1.5 w-full ${
              exam.status === 'Available' ? 'bg-green-500' : 
              exam.status === 'Completed' ? 'bg-blue-500' : 
              exam.status === 'Scheduled' ? 'bg-amber-500' : 'bg-red-500'
            }`} />
            
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-xl p-3 ${
                  exam.status === 'Available' ? 'bg-green-50 text-green-600' : 
                  exam.status === 'Completed' ? 'bg-blue-50 text-blue-600' : 
                  exam.status === 'Scheduled' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>
                  <FileText className="h-6 w-6" />
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  exam.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  exam.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                  exam.status === 'Scheduled' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {exam.status}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 mb-1 block">{exam.category} • {exam.type}</span>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{exam.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  {exam.duration}
                </div>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-gray-400" />
                  {exam.questions} Qs
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-gray-400" />
                  {exam.marks} Marks
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  {exam.status === 'Scheduled' ? exam.date : exam.status === 'Missed' ? 'Missed' : 'Flexible'}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                {exam.status === 'Completed' ? (
                  <div className="space-y-3">
                     <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                      <span className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Best Score</span>
                      <span className="font-bold">{exam.bestScore}</span>
                    </div>
                    <Link 
                      href={`/student/exams/${exam.id}/result`}
                      className="flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Analysis
                    </Link>
                  </div>
                ) : exam.status === 'Available' ? (
                  <Link 
                    href={`/student/exams/${exam.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Start Exam <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : exam.status === 'Scheduled' ? (
                  <button disabled className="flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-400 cursor-not-allowed">
                    Starts {exam.date}
                  </button>
                ) : (
                   <button disabled className="flex w-full items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-400 cursor-not-allowed">
                    Missed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredExams.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
          <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Filter className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No exams found</h3>
          <p className="text-gray-500">Try changing the filters.</p>
        </div>
      )}
    </div>
  );
}
