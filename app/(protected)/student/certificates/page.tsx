'use client';

import { useState } from 'react';
import { Award, Download, Eye, Search, Calendar, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([
    {
      id: 'CERT-2026-001',
      title: 'UKSSSC VDO Complete Course',
      type: 'Course Completion',
      date: 'March 01, 2026',
      grade: 'A+',
      image: 'https://picsum.photos/seed/cert1/600/400'
    },
    {
      id: 'CERT-2026-002',
      title: 'SSC CGL Mock Test Series',
      type: 'Exam Achievement',
      date: 'February 15, 2026',
      grade: 'Rank 3',
      image: 'https://picsum.photos/seed/cert2/600/400'
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
          <p className="text-sm text-gray-500">View and download your earned certificates and achievements.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search certificates..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Certificates Grid */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="relative aspect-[1.414] bg-gray-100 border-b border-gray-200">
                <Image 
                  src={cert.image} 
                  alt={cert.title}
                  fill
                  className="object-cover p-4"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                  <button className="flex flex-col items-center text-white hover:text-blue-400 transition-colors">
                    <div className="bg-white/20 p-3 rounded-full mb-2 backdrop-blur-sm">
                      <Eye className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Preview</span>
                  </button>
                  <button className="flex flex-col items-center text-white hover:text-blue-400 transition-colors">
                    <div className="bg-white/20 p-3 rounded-full mb-2 backdrop-blur-sm">
                      <Download className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Download</span>
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-2">
                      {cert.type}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-lg text-sm">
                    {cert.grade}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" /> {cert.date}
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <ShieldCheck className="h-4 w-4 mr-1" /> Verified
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Complete courses or perform well in exams to earn certificates. They will appear here once issued.
          </p>
        </div>
      )}
    </div>
  );
}
