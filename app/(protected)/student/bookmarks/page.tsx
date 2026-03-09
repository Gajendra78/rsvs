'use client';

import { useState } from 'react';
import { Bookmark, Play, Trash2, Clock, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      topicId: 't1',
      topicTitle: 'Number System Basics',
      subject: 'Quantitative Aptitude',
      timestamp: '12:45',
      note: 'Important formula for finding unit digit',
      dateAdded: '2 days ago',
      thumbnail: 'https://picsum.photos/seed/math/300/200'
    },
    {
      id: 2,
      topicId: 't2',
      topicTitle: 'Indian Constitution',
      subject: 'General Knowledge',
      timestamp: '24:10',
      note: 'Fundamental Rights vs Directive Principles',
      dateAdded: '5 days ago',
      thumbnail: 'https://picsum.photos/seed/law/300/200'
    },
    {
      id: 3,
      topicId: 't3',
      topicTitle: 'Blood Relations',
      subject: 'Reasoning',
      timestamp: '08:30',
      note: 'Shortcut trick for family tree questions',
      dateAdded: '1 week ago',
      thumbnail: 'https://picsum.photos/seed/logic/300/200'
    }
  ]);

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Bookmarks</h2>
          <p className="text-sm text-gray-500">Saved video timestamps and notes for quick revision.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search bookmarks..." 
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

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="relative aspect-video bg-gray-100">
                <Image 
                  src={bookmark.thumbnail} 
                  alt={bookmark.topicTitle}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/student/watch/${bookmark.topicId}?t=${bookmark.timestamp.replace(':', '')}`}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 transition-colors"
                  >
                    <Play className="h-8 w-8 text-white fill-current" />
                  </Link>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {bookmark.timestamp}
                </div>
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded shadow-sm">
                  {bookmark.subject}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1" title={bookmark.topicTitle}>
                    {bookmark.topicTitle}
                  </h3>
                  <button 
                    onClick={() => removeBookmark(bookmark.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 relative">
                  <Bookmark className="absolute -top-2 -left-2 h-5 w-5 text-yellow-500 fill-current" />
                  <p className="text-sm text-gray-700 italic">&quot;{bookmark.note}&quot;</p>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-right">
                  Added {bookmark.dateAdded}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Bookmark className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            While watching a video, click the bookmark icon to save important timestamps and add your own notes for quick revision.
          </p>
        </div>
      )}
    </div>
  );
}
