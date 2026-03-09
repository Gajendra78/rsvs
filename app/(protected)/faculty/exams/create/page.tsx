'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreateExamPage() {
  const [examTitle, setExamTitle] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId: number, optIdx: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIdx] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/faculty/exams" className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Create New Exam</h2>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Save Draft
          </button>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Publish Exam
          </button>
        </div>
      </div>

      {/* Exam Details */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-gray-900">Exam Details</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Exam Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., UKSSSC Mock Test 5"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>UKSSSC</option>
              <option>UKPSC</option>
              <option>SSC CGL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Marks</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="100"
            />
          </div>
        </div>
      </div>

      {/* Questions Builder */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Questions ({questions.length})</h3>
          <button 
            onClick={addQuestion}
            className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4" /> Add Question
          </button>
        </div>

        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                  {idx + 1}
                </span>
                <span className="text-sm text-gray-500">Single Choice MCQ</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
                <GripVertical className="h-5 w-5 text-gray-300 cursor-move" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                  placeholder="Enter question text here..."
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                />
                <div className="mt-2 flex justify-end">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600">
                    <ImageIcon className="h-3 w-3" /> Add Image
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correct === optIdx}
                      onChange={() => updateQuestion(q.id, 'correct', optIdx)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={`Option ${optIdx + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
