'use client';

import { useState } from 'react';
import { MessageSquare, ThumbsUp, Search, Filter, Plus, User, Clock } from 'lucide-react';

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState('recent');

  const discussions = [
    {
      id: 1,
      title: 'Doubt regarding Time and Work formula',
      author: 'Rahul Sharma',
      subject: 'Quantitative Aptitude',
      replies: 4,
      upvotes: 12,
      timeAgo: '2 hours ago',
      tags: ['Maths', 'Time & Work'],
      isResolved: true
    },
    {
      id: 2,
      title: 'How to approach Reading Comprehension in SSC CGL?',
      author: 'Priya Patel',
      subject: 'English Language',
      replies: 8,
      upvotes: 24,
      timeAgo: '5 hours ago',
      tags: ['English', 'Strategy'],
      isResolved: false
    },
    {
      id: 3,
      title: 'Important Current Affairs for March 2026',
      author: 'Amit Kumar',
      subject: 'General Awareness',
      replies: 15,
      upvotes: 45,
      timeAgo: '1 day ago',
      tags: ['Current Affairs', 'GK'],
      isResolved: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Discussion Forum</h2>
          <p className="text-sm text-gray-500">Ask questions, share knowledge, and learn together.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          New Discussion
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Subjects</option>
            <option>Quantitative Aptitude</option>
            <option>Reasoning</option>
            <option>English</option>
            <option>General Awareness</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['recent', 'popular', 'unanswered', 'my-posts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex gap-4">
              {/* Upvote Column */}
              <div className="flex flex-col items-center gap-1 min-w-[48px]">
                <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <ThumbsUp className="h-5 w-5" />
                </button>
                <span className="font-medium text-gray-700">{post.upvotes}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                    {post.title}
                  </h3>
                  {post.isResolved && (
                    <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium shrink-0 ml-2">
                      Resolved
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                    {post.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {post.timeAgo}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> {post.replies} replies
                  </span>
                </div>

                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <button className="text-blue-600 font-medium hover:underline">Load More Discussions</button>
      </div>
    </div>
  );
}
