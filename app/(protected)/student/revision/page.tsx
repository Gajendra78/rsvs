'use client';

import { useState } from 'react';
import { RefreshCw, Play, Settings, Target, CheckCircle2, Clock } from 'lucide-react';

export default function RevisionModePage() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revision Mode</h2>
          <p className="text-sm text-gray-500">Auto-generated quizzes based on topics you&apos;ve already watched.</p>
        </div>
      </div>

      {!isStarted ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white text-center">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <RefreshCw className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Smart Revision Session</h3>
            <p className="text-purple-100 max-w-lg mx-auto">
              Our AI selects questions from chapters you completed more than 7 days ago to strengthen your long-term memory.
            </p>
          </div>

          <div className="p-8">
            <h4 className="font-semibold text-gray-900 mb-4">Session Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects</label>
                <div className="space-y-2">
                  {['Quantitative Aptitude', 'Reasoning', 'General Knowledge', 'English'].map((subject) => (
                    <label key={subject} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-3 text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none">
                    <option>10 Questions (Quick)</option>
                    <option>25 Questions (Standard)</option>
                    <option>50 Questions (Deep Dive)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none">
                    <option>Weakest Topics (Recommended)</option>
                    <option>Oldest Completed Topics</option>
                    <option>Random Mix</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsStarted(true)}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Play className="mr-2 h-6 w-6" /> Start Revision Session
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Your Custom Quiz...</h3>
          <p className="text-gray-500">Analyzing your past performance and selecting the best questions.</p>
        </div>
      )}

      {/* Past Sessions */}
      {!isStarted && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Revision Sessions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {i} days ago
                  </span>
                  <span className="text-xs font-bold text-green-600 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> 85% Score
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Mixed Subjects</h4>
                <div className="text-sm text-gray-500 flex items-center">
                  <Target className="h-4 w-4 mr-1" /> 25 Questions
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
