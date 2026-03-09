'use client';

import { useState } from 'react';
import { Edit3, Search, Filter, BookOpen, Clock, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NotesPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      topicId: 't1',
      topicTitle: 'Number System Basics',
      subject: 'Quantitative Aptitude',
      chapter: 'Number System',
      content: 'Natural numbers: 1, 2, 3...\nWhole numbers: 0, 1, 2, 3...\nIntegers: ...-2, -1, 0, 1, 2...\n\nDivisibility by 3: Sum of digits must be divisible by 3.\nDivisibility by 4: Last two digits must be divisible by 4.',
      lastEdited: '2 days ago',
      wordCount: 45
    },
    {
      id: 2,
      topicId: 't2',
      topicTitle: 'Fundamental Rights',
      subject: 'General Knowledge',
      chapter: 'Indian Constitution',
      content: 'Part III of Constitution (Articles 12-35)\n\n1. Right to Equality (14-18)\n2. Right to Freedom (19-22)\n3. Right against Exploitation (23-24)\n4. Right to Freedom of Religion (25-28)\n5. Cultural and Educational Rights (29-30)\n6. Right to Constitutional Remedies (32)\n\nNote: Article 31 was repealed.',
      lastEdited: '5 days ago',
      wordCount: 68
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
          <p className="text-sm text-gray-500">Your personal study notes organized by subject.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search in notes..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Subjects</option>
            <option>Quantitative Aptitude</option>
            <option>Reasoning</option>
            <option>General Knowledge</option>
          </select>
        </div>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-2">
                    {note.subject}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {note.topicTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" /> {note.chapter}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors p-1" title="Edit Note">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete Note">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-5 flex-1 bg-yellow-50/30">
              <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-6">
                {note.content}
              </p>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center rounded-b-xl">
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" /> Edited {note.lastEdited}
              </div>
              <div className="flex gap-3">
                <span className="text-xs text-gray-400">{note.wordCount} words</span>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center">
                  <Download className="h-3 w-3 mr-1" /> PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
