'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, PlayCircle } from 'lucide-react';

const SUBSCRIBED_COURSES = [
  {
    id: 'uksssc-2026',
    title: 'UKSSSC Complete Batch 2026',
    progress: 35,
    totalSubjects: 5,
    nextClass: 'Today, 2:00 PM',
    thumbnail: 'https://picsum.photos/seed/uksssc/400/225',
  },
  {
    id: 'ssc-cgl-2026',
    title: 'SSC CGL Tier 1 + Tier 2',
    progress: 12,
    totalSubjects: 4,
    nextClass: 'Tomorrow, 10:00 AM',
    thumbnail: 'https://picsum.photos/seed/ssc/400/225',
  },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SUBSCRIBED_COURSES.map((course) => (
          <div key={course.id} className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-video bg-gray-100">
              <Image 
                src={course.thumbnail} 
                alt={course.title} 
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-1.5 w-full rounded-full bg-white/30">
                  <div 
                    className="h-1.5 rounded-full bg-green-500" 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-white">{course.progress}% Completed</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                  {course.totalSubjects} Subjects
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4 text-orange-600" />
                  Next: {course.nextClass}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link 
                  href={`/student/courses/${course.id}`}
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Continue Learning <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
