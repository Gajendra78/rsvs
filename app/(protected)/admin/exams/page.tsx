'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, BookOpen, Users, MoreVertical, X } from 'lucide-react';

// Mock Data
const INITIAL_EXAMS = [
  { id: '1', name: 'UKSSSC', description: 'Uttarakhand Subordinate Service Selection Commission', status: 'Active', students: 1200, revenue: '₹5.2L', fee: '4999' },
  { id: '2', name: 'UKPSC', description: 'Uttarakhand Public Service Commission', status: 'Active', students: 850, revenue: '₹4.1L', fee: '5999' },
  { id: '3', name: 'SSC CGL', description: 'Staff Selection Commission - Combined Graduate Level', status: 'Active', students: 2100, revenue: '₹8.5L', fee: '3999' },
  { id: '4', name: 'JE Civil', description: 'Junior Engineer (Civil) Competitive Exam', status: 'Inactive', students: 0, revenue: '₹0', fee: '2999' },
];

export default function ExamManagementPage() {
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    fee: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('examCategories');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExams(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse exams", e);
      }
    }
  }, []);

  // Save to localStorage whenever exams change
  useEffect(() => {
    if (exams !== INITIAL_EXAMS) {
      localStorage.setItem('examCategories', JSON.stringify(exams));
    }
  }, [exams]);

  const handleSaveExam = () => {
    if (!formData.name) return;

    const newExam = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: formData.status,
      students: 0,
      revenue: '₹0',
      fee: formData.fee || '0'
    };

    setExams([...exams, newExam]);
    setIsModalOpen(false);
    setFormData({ name: '', description: '', status: 'Active', fee: '' });
  };

  const handleDeleteExam = (id: string) => {
    if (confirm('Are you sure you want to delete this exam category?')) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Categories</h2>
          <p className="text-sm text-gray-500">Manage exam categories and their hierarchy</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Exam
        </button>
      </div>

      <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm">
        <Search className="mr-2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search exams..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${exam.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {exam.status}
                  </span>
                  <button 
                    onClick={() => handleDeleteExam(exam.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{exam.name}</h3>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{exam.description}</p>
              
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-1.5 h-4 w-4" />
                  {exam.students} Students
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-medium text-gray-900">{exam.revenue}</div>
                  <div className="text-xs text-gray-500">Fee: ₹{exam.fee}</div>
                </div>
              </div>
            </div>
            <div className="flex divide-x divide-gray-200 border-t border-gray-200 bg-gray-50">
              <Link 
                href={`/admin/exams/${exam.id}`}
                className="flex flex-1 items-center justify-center py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Manage Subjects
              </Link>
              <button className="flex flex-1 items-center justify-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add New Exam Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., UPSC CSE"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of the exam..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Fee (₹)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 4999"
                  value={formData.fee}
                  onChange={(e) => setFormData({...formData, fee: e.target.value})}
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
                  onClick={handleSaveExam}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  Create Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
