'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  FileText, 
  Video, 
  MoreVertical, 
  Upload, 
  Trash2, 
  Edit,
  GripVertical,
  X,
  Save
} from 'lucide-react';
import { INITIAL_DATA, Subject, Chapter, Topic } from '@/lib/contentStore';

// Mock Data for Sidebar (Subjects)
const ASSIGNED_SUBJECTS = [
  { id: 's1', name: 'General Studies', exam: 'UKSSSC' },
  { id: 's2', name: 'Uttarakhand GK', exam: 'UKPSC' },
];

export default function ContentManagerPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(ASSIGNED_SUBJECTS[0].id);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_DATA);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['c1']);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState({ 
    title: '', 
    duration: '', 
    videoUrl: '', 
    type: 'Video' as 'Video' | 'PDF',
    description: '',
    lectureBy: '',
    isActive: true
  });

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

  // Save to localStorage whenever subjects change
  useEffect(() => {
    if (subjects !== INITIAL_DATA) {
      localStorage.setItem('courseContent', JSON.stringify(subjects));
    }
  }, [subjects]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleAddTopic = () => {
    if (!activeChapterId || !newTopic.title) return;

    const topic: Topic = {
      id: `t${Date.now()}`,
      title: newTopic.title,
      type: newTopic.type,
      duration: newTopic.duration || '0m',
      videoUrl: newTopic.videoUrl,
      description: newTopic.description,
      lectureBy: newTopic.lectureBy,
      postedDate: new Date().toISOString().split('T')[0],
      isActive: newTopic.isActive,
      completed: false
    };

    setSubjects(prev => prev.map(subject => {
      if (subject.id !== selectedSubjectId) return subject;
      return {
        ...subject,
        chapters: subject.chapters.map(chapter => {
          if (chapter.id !== activeChapterId) return chapter;
          return {
            ...chapter,
            topics: [...chapter.topics, topic]
          };
        })
      };
    }));

    setIsModalOpen(false);
    setNewTopic({ 
      title: '', 
      duration: '', 
      videoUrl: '', 
      type: 'Video',
      description: '',
      lectureBy: '',
      isActive: true
    });
  };

  const openAddModal = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setIsModalOpen(true);
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubjectId);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative">
      {/* Left Sidebar: Subject Selection */}
      <div className="w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900">My Subjects</h3>
        <div className="space-y-2">
          {ASSIGNED_SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubjectId(subject.id)}
              className={`flex w-full flex-col items-start rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedSubjectId === subject.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{subject.name}</span>
              <span className="text-xs text-gray-500">{subject.exam}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Hierarchy Manager */}
      <div className="flex-1 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {selectedSubjectData?.title}
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                {selectedSubjectData?.exam}
              </span>
            </h2>
            <p className="text-sm text-gray-500">Manage chapters and topics</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Chapter
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {selectedSubjectData?.chapters.map((chapter) => (
              <div key={chapter.id} className="rounded-lg border border-gray-200 bg-gray-50">
                {/* Chapter Header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <button onClick={() => toggleChapter(chapter.id)} className="text-gray-500 hover:text-gray-700">
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="font-medium text-gray-900 flex-1">{chapter.title}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openAddModal(chapter.id)}
                      className="p-1 text-gray-400 hover:text-indigo-600" 
                      title="Add Topic"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Topics List */}
                {expandedChapters.includes(chapter.id) && (
                  <div className="border-t border-gray-200 bg-white px-4 py-2">
                    {chapter.topics.length > 0 ? (
                      <ul className="space-y-2">
                        {chapter.topics.map((topic) => (
                          <li key={topic.id} className="flex items-center gap-3 rounded-md border border-gray-100 p-2 hover:bg-gray-50">
                            <GripVertical className="h-4 w-4 text-gray-300 cursor-move" />
                            <div className={`flex h-8 w-8 items-center justify-center rounded bg-gray-100 ${topic.type === 'Video' ? 'text-red-500' : 'text-blue-500'}`}>
                              {topic.type === 'Video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-900">{topic.title}</p>
                                <span className={`h-2 w-2 rounded-full ${topic.isActive ? 'bg-green-500' : 'bg-gray-300'}`} title={topic.isActive ? 'Active' : 'Inactive'} />
                              </div>
                              <p className="text-xs text-gray-500">
                                {topic.duration} • {topic.type} • By {topic.lectureBy || 'Unknown'} • {topic.postedDate}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit className="h-3 w-3" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="py-4 text-center text-sm text-gray-500">
                        No topics yet. Click + to add content.
                      </div>
                    )}
                    <button 
                      onClick={() => openAddModal(chapter.id)}
                      className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Add New Topic
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!selectedSubjectData?.chapters.length && (
               <div className="text-center py-10 text-gray-500">
                 No chapters found for this subject.
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Topic Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
          <div className="w-96 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add New Topic</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Introduction to History"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                <select 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  value={newTopic.type}
                  onChange={(e) => setNewTopic({...newTopic, type: e.target.value as 'Video' | 'PDF'})}
                >
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>

              {newTopic.type === 'Video' && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Video URL (Embed)</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="https://www.youtube.com/embed/..."
                    value={newTopic.videoUrl}
                    onChange={(e) => setNewTopic({...newTopic, videoUrl: e.target.value})}
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Duration</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. 45m"
                  value={newTopic.duration}
                  onChange={(e) => setNewTopic({...newTopic, duration: e.target.value})}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="Topic description..."
                  rows={3}
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Lecture By</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="Instructor Name"
                  value={newTopic.lectureBy}
                  onChange={(e) => setNewTopic({...newTopic, lectureBy: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={newTopic.isActive}
                  onChange={(e) => setNewTopic({...newTopic, isActive: e.target.checked})}
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (Visible to Students)</label>
              </div>

              <button 
                onClick={handleAddTopic}
                className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
