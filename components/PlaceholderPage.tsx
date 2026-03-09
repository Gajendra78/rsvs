'use client';

import Link from 'next/link';
import { Construction, ArrowLeft } from 'lucide-react';

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8">
      <div className="mb-6 rounded-full bg-blue-50 p-6">
        <Construction className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mb-8 max-w-md text-gray-500">
        {description || "This feature is currently under development. Check back soon!"}
      </p>
      <button 
        onClick={() => window.history.back()}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </button>
    </div>
  );
}
