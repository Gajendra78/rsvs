'use client';

import { BookOpen, Loader2 } from 'lucide-react';

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Logo/Icon Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75"></div>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-xl">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* Text Animation */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            RSVS <span className="text-blue-600">Academy</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span>Loading experience...</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-full origin-left animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        </div>
      </div>
    </div>
  );
}
