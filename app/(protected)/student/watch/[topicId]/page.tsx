'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Volume2, Maximize, Settings, FileText, Download, MessageSquare } from 'lucide-react';
import { INITIAL_DATA, Subject, Topic } from '@/lib/contentStore';

export default function VideoPlayerPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data and find topic
  useEffect(() => {
    const saved = localStorage.getItem('courseContent');
    const subjects: Subject[] = saved ? JSON.parse(saved) : INITIAL_DATA;
    
    // Find the topic across all subjects and chapters
    let foundTopic: Topic | null = null;
    let foundSubject: Subject | null = null;

    for (const sub of subjects) {
      for (const chapter of sub.chapters) {
        const t = chapter.topics.find(t => t.id === topicId);
        if (t) {
          foundTopic = t;
          foundSubject = sub;
          break;
        }
      }
      if (foundTopic) break;
    }
    
    setTimeout(() => {
      setTopic(foundTopic);
      setSubject(foundSubject);
      setLoading(false);
    }, 0);
  }, [topicId]);

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  if (!topic) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium text-gray-900">Topic not found</p>
        <Link href="/student/courses" className="text-blue-600 hover:underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col lg:flex-row gap-6">
      {/* Main Player Area */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-4">
          <Link href="/student/courses/uksssc-2026" className="rounded-full p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{topic.title}</h2>
            <p className="text-sm text-gray-500">
              {subject?.exam} • {subject?.title} • {topic.type}
            </p>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
          {!topic.isActive ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                  <Settings className="h-6 w-6 text-gray-400" /> 
                </div>
                <p className="text-lg font-medium">This content is currently inactive.</p>
              </div>
            </div>
          ) : topic.videoUrl ? (
            <iframe 
              src={topic.videoUrl} 
              className="absolute inset-0 h-full w-full" 
              allowFullScreen 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <>
              {/* Placeholder for actual video player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="mx-auto h-16 w-16 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                  <p className="mt-4 text-sm font-medium">Click to Play</p>
                </div>
              </div>
              
              {/* Custom Controls Overlay (Mock) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="mb-2 h-1 w-full cursor-pointer rounded-full bg-gray-600">
                  <div className="h-1 w-1/3 rounded-full bg-red-600 relative">
                    <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-red-600 shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button><Play className="h-5 w-5" /></button>
                    <button><Volume2 className="h-5 w-5" /></button>
                    <span className="text-xs font-medium">12:30 / {topic.duration}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button><Settings className="h-5 w-5" /></button>
                    <button><Maximize className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>

              {/* Watermark (Anti-Piracy) */}
              <div className="absolute top-4 right-4 text-xs font-bold text-white/20 select-none pointer-events-none">
                student@rsvs.com
              </div>
            </>
          )}
        </div>

        {/* Action Bar */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
              <FileText className="h-4 w-4" /> Notes
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              <Download className="h-4 w-4" /> Resources
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100">
            <MessageSquare className="h-4 w-4" /> Ask Doubt
          </button>
        </div>

        {/* Description & Info */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About this Lecture</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {topic.description || "No description available for this topic."}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <div>
              <span className="font-medium text-gray-900">Lecture By:</span> {topic.lectureBy || "Unknown Instructor"}
            </div>
            <div>
              <span className="font-medium text-gray-900">Posted On:</span> {topic.postedDate || "Unknown Date"}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: Playlist / Notes */}
      <div className="w-full lg:w-96 shrink-0 flex flex-col gap-4">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="font-bold text-gray-900">Up Next</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[
              { title: 'Vedic Period', duration: '15m', type: 'PDF' },
              { title: 'Mauryan Empire', duration: '50m', type: 'Video' },
              { title: 'Gupta Dynasty', duration: '40m', type: 'Video' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'Video' ? <Play className="h-6 w-6 text-gray-500" /> : <FileText className="h-6 w-6 text-gray-500" />}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.duration} • {item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
