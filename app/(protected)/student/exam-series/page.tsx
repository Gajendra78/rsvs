'use client';

import { useState } from 'react';
import { Layers, Calendar, Award, CheckCircle2, Lock, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function ExamSeriesPage() {
  const series = [
    {
      id: 1,
      title: 'UKSSSC VDO Final Sprint Series',
      description: '10 full-length mock tests designed exactly as per the latest UKSSSC pattern.',
      totalTests: 10,
      completedTests: 3,
      overallRank: 42,
      totalParticipants: 1250,
      tests: [
        { id: 101, name: 'Mock Test 1', date: 'Mar 01, 2026', status: 'completed', score: '78/100' },
        { id: 102, name: 'Mock Test 2', date: 'Mar 05, 2026', status: 'completed', score: '82/100' },
        { id: 103, name: 'Mock Test 3', date: 'Mar 08, 2026', status: 'completed', score: '85/100' },
        { id: 104, name: 'Mock Test 4', date: 'Mar 12, 2026', status: 'available', score: null },
        { id: 105, name: 'Mock Test 5', date: 'Mar 15, 2026', status: 'locked', score: null },
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Series</h2>
          <p className="text-sm text-gray-500">Structured test series to track your improvement over time.</p>
        </div>
      </div>

      {series.map((s) => (
        <div key={s.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Series Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-2xl">{s.description}</p>
                </div>
              </div>
              
              <div className="flex gap-4 shrink-0">
                <div className="text-center px-4 border-r border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{s.completedTests}/{s.totalTests}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Completed</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-blue-600">#{s.overallRank}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Overall Rank</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(s.completedTests / s.totalTests) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Test List */}
          <div className="divide-y divide-gray-100">
            {s.tests.map((test) => (
              <div key={test.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="w-12 flex justify-center">
                  {test.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                  {test.status === 'available' && <Play className="h-6 w-6 text-blue-500" />}
                  {test.status === 'locked' && <Lock className="h-5 w-5 text-gray-400" />}
                </div>
                
                <div className="flex-1 ml-2">
                  <h4 className={`font-medium ${test.status === 'locked' ? 'text-gray-500' : 'text-gray-900'}`}>
                    {test.name}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {test.status === 'locked' ? `Unlocks on ${test.date}` : `Scheduled for ${test.date}`}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {test.status === 'completed' && (
                    <div className="text-right mr-4">
                      <div className="font-bold text-gray-900">{test.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  )}
                  
                  {test.status === 'completed' && (
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      View Analysis
                    </button>
                  )}
                  
                  {test.status === 'available' && (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center">
                      Start Test <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                  
                  {test.status === 'locked' && (
                    <button disabled className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">
                      Locked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
