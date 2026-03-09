'use client';

import { use } from 'react';
import Link from 'next/link';
import { Trophy, Clock, Target, BarChart2, CheckCircle, XCircle, AlertCircle, Download, RotateCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Result Data
const RESULT_DATA = {
  examTitle: 'UKSSSC Full Length Mock Test 1',
  score: 72.5,
  totalMarks: 100,
  percentage: 72.5,
  rank: 15,
  totalStudents: 1240,
  accuracy: 85,
  timeTaken: '95 mins',
  correct: 75,
  wrong: 10,
  unattempted: 15,
  subjectWise: [
    { name: 'Gen Knowledge', score: 25, total: 40 },
    { name: 'Gen Hindi', score: 18, total: 30 },
    { name: 'Uttarakhand GK', score: 29.5, total: 30 },
  ],
  questions: Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    text: `Sample Question ${i + 1} text goes here...`,
    userAnswer: i % 3 === 0 ? 'Option A' : i % 3 === 1 ? 'Option B' : null,
    correctAnswer: 'Option A',
    status: i % 3 === 0 ? 'Correct' : i % 3 === 1 ? 'Wrong' : 'Unattempted',
    explanation: 'Detailed explanation for the answer goes here.',
  })),
};

export default function ExamResultPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Result</h1>
          <p className="text-gray-500">{RESULT_DATA.examTitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <Link 
            href={`/student/exams/${examId}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <RotateCcw className="h-4 w-4" /> Retake Exam
          </Link>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Score</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{RESULT_DATA.score}<span className="text-lg text-gray-400">/{RESULT_DATA.totalMarks}</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <Target className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Rank</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">#{RESULT_DATA.rank}<span className="text-sm text-gray-400 font-normal"> / {RESULT_DATA.totalStudents}</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Accuracy</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{RESULT_DATA.accuracy}%</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Time Taken</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{RESULT_DATA.timeTaken}</h3>
        </div>
      </div>

      {/* Detailed Stats & Charts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Question Stats */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Question Analysis</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-gray-600">Correct</span>
              </div>
              <span className="font-bold text-gray-900">{RESULT_DATA.correct}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(RESULT_DATA.correct / 100) * 100}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-gray-600">Wrong</span>
              </div>
              <span className="font-bold text-gray-900">{RESULT_DATA.wrong}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(RESULT_DATA.wrong / 100) * 100}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-gray-400" />
                <span className="text-gray-600">Unattempted</span>
              </div>
              <span className="font-bold text-gray-900">{RESULT_DATA.unattempted}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${(RESULT_DATA.unattempted / 100) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Subject Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Subject-wise Performance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESULT_DATA.subjectWise} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 'dataMax']} hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                   {RESULT_DATA.subjectWise.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score > 20 ? '#22c55e' : '#3b82f6'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Question Review</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {RESULT_DATA.questions.map((q) => (
            <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  q.status === 'Correct' ? 'bg-green-100 text-green-700' : 
                  q.status === 'Wrong' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {q.id}
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-gray-900 font-medium">{q.text}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className={`p-3 rounded-lg border ${
                      q.status === 'Correct' ? 'bg-green-50 border-green-200' : 
                      q.status === 'Wrong' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <span className="text-gray-500 block text-xs mb-1">Your Answer</span>
                      <span className={`font-medium ${
                         q.status === 'Correct' ? 'text-green-700' : 
                         q.status === 'Wrong' ? 'text-red-700' : 'text-gray-500'
                      }`}>
                        {q.userAnswer || 'Not Attempted'}
                      </span>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                      <span className="text-gray-500 block text-xs mb-1">Correct Answer</span>
                      <span className="font-medium text-green-700">{q.correctAnswer}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    <p className="font-bold mb-1 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> Explanation:
                    </p>
                    {q.explanation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
