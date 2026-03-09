'use client';

import { useState } from 'react';
import { Download, FileText, Video, Trash2, Search, HardDrive, Smartphone } from 'lucide-react';

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: 'Number System Formulas',
      type: 'pdf',
      subject: 'Quantitative Aptitude',
      size: '2.4 MB',
      downloadedAt: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Indian Constitution Notes',
      type: 'pdf',
      subject: 'General Knowledge',
      size: '5.1 MB',
      downloadedAt: '5 days ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Current Affairs - March 2026',
      type: 'pdf',
      subject: 'General Awareness',
      size: '8.7 MB',
      downloadedAt: '1 week ago',
      status: 'completed'
    }
  ]);

  const storageUsed = 16.2; // MB
  const storageLimit = 500; // MB

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offline Downloads</h2>
          <p className="text-sm text-gray-500">Access your downloaded study materials without internet.</p>
        </div>
      </div>

      {/* Storage Status */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Smartphone className="h-8 w-8 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">Device Storage</h3>
              <p className="text-sm text-gray-500">Used for offline PDFs and notes</p>
            </div>
            <div className="text-sm font-medium text-gray-700">
              {storageUsed} MB / {storageLimit} MB
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search downloads..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Downloads List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {downloads.map((item) => (
            <div key={item.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
              <div className={`p-3 rounded-lg mr-4 ${
                item.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {item.type === 'pdf' ? <FileText className="h-6 w-6" /> : <Video className="h-6 w-6" />}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">{item.subject}</span>
                  <span>{item.size}</span>
                  <span>Downloaded {item.downloadedAt}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors">
                  Open
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove from device">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
