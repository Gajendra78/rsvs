'use client';

import { useState } from 'react';
import { FolderOpen, FileText, Download, Search, Filter, Clock, Eye } from 'lucide-react';

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'UKSSSC Previous Year Paper 2023',
      type: 'Previous Year Papers',
      subject: 'All Subjects',
      size: '4.2 MB',
      date: 'Mar 05, 2026',
      downloads: 1240,
      isNew: true
    },
    {
      id: 2,
      title: 'Current Affairs - February 2026',
      type: 'Current Affairs',
      subject: 'General Awareness',
      size: '8.5 MB',
      date: 'Mar 01, 2026',
      downloads: 3450,
      isNew: true
    },
    {
      id: 3,
      title: 'Important Math Formulas Cheat Sheet',
      type: 'Formula Sheets',
      subject: 'Quantitative Aptitude',
      size: '1.8 MB',
      date: 'Feb 20, 2026',
      downloads: 5620,
      isNew: false
    },
    {
      id: 4,
      title: 'SSC CGL Tier 1 Mock Test PDF',
      type: 'Mock Test Papers',
      subject: 'All Subjects',
      size: '3.5 MB',
      date: 'Feb 15, 2026',
      downloads: 2100,
      isNew: false
    },
    {
      id: 5,
      title: 'UKPSC Notification & Syllabus 2026',
      type: 'Government Notifications',
      subject: 'General',
      size: '2.1 MB',
      date: 'Feb 10, 2026',
      downloads: 4500,
      isNew: false
    }
  ];

  const categories = [
    'All',
    'Previous Year Papers',
    'Current Affairs',
    'Formula Sheets',
    'Mock Test Papers',
    'Government Notifications'
  ];

  const filteredResources = activeTab === 'all' 
    ? resources 
    : resources.filter(r => r.type === activeTab);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Library</h2>
          <p className="text-sm text-gray-500">Download study materials, previous papers, and current affairs.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources by keyword, exam, or subject..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Exams</option>
            <option>UKSSSC</option>
            <option>UKPSC</option>
            <option>SSC CGL</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat === 'All' ? 'all' : cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              (activeTab === 'all' && cat === 'All') || activeTab === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="flex flex-col sm:flex-row sm:items-center p-5 hover:bg-gray-50 transition-colors gap-4">
              <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 text-lg">{resource.title}</h4>
                  {resource.isNew && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">
                    {resource.type}
                  </span>
                  <span>{resource.subject}</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {resource.date}
                  </span>
                  <span>{resource.size}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2 shrink-0">
                <div className="text-xs text-gray-500 flex items-center">
                  <Download className="h-3 w-3 mr-1" /> {resource.downloads} downloads
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors">
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
