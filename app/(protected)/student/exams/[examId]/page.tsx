'use client';

import { use } from 'react';
import Link from 'next/link';
import { Clock, HelpCircle, CheckCircle, AlertTriangle, Monitor, Shield, ChevronRight } from 'lucide-react';

// Mock Data for Instructions
const EXAM_DETAILS = {
  id: 'mock-1',
  title: 'UKSSSC Full Length Mock Test 1',
  duration: '120 Minutes',
  questions: 100,
  totalMarks: 100,
  markingScheme: '+1 for correct, -0.25 for wrong',
  sections: ['General Knowledge', 'General Hindi', 'Uttarakhand GK'],
  languages: ['Hindi', 'English'],
};

export default function ExamInstructionsPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{EXAM_DETAILS.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg text-blue-700">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{EXAM_DETAILS.duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg text-purple-700">
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium">{EXAM_DETAILS.questions} Questions</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">{EXAM_DETAILS.totalMarks} Marks</span>
          </div>
        </div>
      </div>

      {/* Instructions & Rules */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Important Instructions
          </h2>
          <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
            <li>The exam contains multiple-choice questions (MCQs).</li>
            <li>There is negative marking of <strong>0.25 marks</strong> for each wrong answer.</li>
            <li>You can switch between sections at any time.</li>
            <li>Questions marked for review will not be considered for evaluation if not answered.</li>
            <li>The timer will start immediately after you click &quot;Start Exam&quot;.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Exam Rules
          </h2>
          <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
            <li><strong>Full Screen Mode:</strong> The exam will be conducted in full-screen mode. Exiting full screen may submit the exam.</li>
            <li><strong>No Tab Switching:</strong> Switching tabs or windows is strictly prohibited and will be recorded.</li>
            <li><strong>No Copy-Paste:</strong> Copy-paste functionality is disabled.</li>
            <li>Ensure you have a stable internet connection.</li>
          </ul>
        </div>
      </div>

      {/* System Check & Language */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-blue-500" />
          System Compatibility & Settings
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Browser Compatibility</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Supported</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Internet Speed</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Good</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Default Language</label>
            <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              {EXAM_DETAILS.languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500">You can change the language for specific questions during the exam.</p>
          </div>
        </div>
      </div>

      {/* Declaration & Start */}
      <div className="flex flex-col items-center gap-6 pt-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-700">
            I have read and understood all the instructions and rules.
          </span>
        </label>

        <Link 
          href={`/student/exams/${examId}/attempt`}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-12 py-4 text-lg font-bold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1"
        >
          Start Exam <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
