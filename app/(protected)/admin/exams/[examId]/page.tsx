'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, GripVertical, Book, Clock, Video, FileText, ChevronRight, X, Trash2, Edit } from 'lucide-react';

// Mock Data
const INITIAL_SUBJECTS = [
  { id: '101', name: 'General Studies', chapters: 12, topics: 45, videos: 40, duration: '60h', status: 'Active' },
  { id: '102', name: 'Uttarakhand GK', chapters: 8, topics: 32, videos: 28, duration: '45h', status: 'Active' },
  { id: '103', name: 'Hindi', chapters: 10, topics: 38, videos: 35, duration: '50h', status: 'Active' },
  { id: '104', name: 'Reasoning', chapters: 15, topics: 50, videos: 48, duration: '70h', status: 'Active' },
];

export default function SubjectManagementPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`subjects_${examId}`);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSubjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse subjects", e);
      }
    }
  }, [examId]);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    if (subjects !== INITIAL_SUBJECTS) {
      localStorage.setItem(`subjects_${examId}`, JSON.stringify(subjects));
    }
  }, [subjects, examId]);

  const handleSaveSubject = () => {
    if (!formData.name) return;

    const newSubject = {
      id: Date.now().toString(),
      name: formData.name,
      chapters: 0,
      topics: 0,
      videos: 0,
      duration: '0h',
      status: formData.status
    };

    setSubjects([...subjects, newSubject]);
    setIsModalOpen(false);
    setFormData({ name: '', status: 'Active' });
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/exams" className="rounded-full p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Subjects</h2>
          <p className="text-sm text-gray-500">Exam Category ID: {examId}</p>
        </div>
        <div className="ml-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-10 px-6 py-3"></th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subject Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Content Stats</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Duration</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-400">
                  <GripVertical className="h-5 w-5 cursor-move" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Book className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-xs text-gray-500">ID: {subject.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1" title="Chapters">
                      <Book className="h-4 w-4" /> {subject.chapters}
                    </div>
                    <div className="flex items-center gap-1" title="Topics">
                      <FileText className="h-4 w-4" /> {subject.topics}
                    </div>
                    <div className="flex items-center gap-1" title="Videos">
                      <Video className="h-4 w-4" /> {subject.videos}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {subject.duration}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${subject.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {subject.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                      Manage <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add New Subject</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Ancient History"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveSubject}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
