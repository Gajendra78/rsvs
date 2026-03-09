'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle, Clock, ChevronRight, Send, User } from 'lucide-react';

interface Doubt {
  id: string;
  studentName: string;
  subject: string;
  topic: string;
  question: string;
  timestamp: string;
  status: 'Pending' | 'Resolved';
  reply?: string;
}

const INITIAL_DOUBTS: Doubt[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    subject: 'General Studies',
    topic: 'Indian Polity',
    question: 'Sir, can you explain the difference between Article 32 and Article 226 regarding writ jurisdiction?',
    timestamp: '2 hours ago',
    status: 'Pending',
  },
  {
    id: '2',
    studentName: 'Priya Singh',
    subject: 'History',
    topic: 'Mughal Empire',
    question: 'What was the main reason for the decline of the Mughal Empire after Aurangzeb?',
    timestamp: '5 hours ago',
    status: 'Resolved',
    reply: 'The decline was due to weak successors, economic instability, and the rise of regional powers like the Marathas.',
  },
  {
    id: '3',
    studentName: 'Amit Verma',
    subject: 'Uttarakhand GK',
    topic: 'Geography',
    question: 'Which is the longest river in Uttarakhand entirely within the state?',
    timestamp: '1 day ago',
    status: 'Pending',
  },
];

export default function FacultyDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(INITIAL_DOUBTS);
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (!selectedDoubt || !replyText) return;

    setDoubts(doubts.map(d => 
      d.id === selectedDoubt.id 
        ? { ...d, status: 'Resolved', reply: replyText } 
        : d
    ));

    setSelectedDoubt(null);
    setReplyText('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Doubts List */}
      <div className="w-1/3 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900">Student Doubts</h2>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-600">All</span>
            <span className="px-2 py-1 text-xs font-medium bg-amber-50 border border-amber-100 rounded-full text-amber-700">Pending</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-50 border border-green-100 rounded-full text-green-700">Resolved</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {doubts.map((doubt) => (
            <div 
              key={doubt.id}
              onClick={() => setSelectedDoubt(doubt)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedDoubt?.id === doubt.id ? 'bg-indigo-50 hover:bg-indigo-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900 text-sm">{doubt.studentName}</h4>
                <span className="text-xs text-gray-400">{doubt.timestamp}</span>
              </div>
              <p className="text-xs font-medium text-indigo-600 mb-2">{doubt.subject} • {doubt.topic}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{doubt.question}</p>
              <div className="mt-2 flex items-center gap-2">
                {doubt.status === 'Resolved' ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle className="h-3 w-3" /> Resolved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Clock className="h-3 w-3" /> Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doubt Detail & Reply */}
      <div className="flex-1 flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {selectedDoubt ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedDoubt.studentName}</h3>
                  <p className="text-sm text-gray-500">{selectedDoubt.subject} • {selectedDoubt.topic}</p>
                </div>
                <div className="ml-auto text-sm text-gray-400">
                  {selectedDoubt.timestamp}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-800">{selectedDoubt.question}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {selectedDoubt.reply && (
                <div className="flex gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">You</span>
                      <span className="text-xs text-gray-400">Just now</span>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg rounded-tl-none text-gray-800">
                      {selectedDoubt.reply}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              {selectedDoubt.status === 'Pending' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                  />
                  <button 
                    onClick={handleReply}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500">
                  This doubt has been resolved.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="h-12 w-12 mb-4 opacity-20" />
            <p>Select a doubt to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
