'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, User, BookOpen, FileText, Video } from 'lucide-react';

type UserRole = 'student' | 'faculty' | 'admin' | 'manager';

// Mock Search Data with Access Control
const MOCK_DATA = [
  { 
    id: '1', 
    type: 'student', 
    title: 'Rahul Kumar', 
    subtitle: 'Student • UKSSSC', 
    url: '/manager/students', 
    allowedRoles: ['admin', 'manager', 'faculty'] 
  },
  { 
    id: '2', 
    type: 'course', 
    title: 'UKSSSC Complete Batch 2026', 
    subtitle: 'Course • Active', 
    url: '/student/courses/uksssc-2026', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  { 
    id: '3', 
    type: 'exam', 
    title: 'UKSSSC Full Length Mock Test 1', 
    subtitle: 'Exam • 100 Qs', 
    url: '/student/exams', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  { 
    id: '4', 
    type: 'content', 
    title: 'Indus Valley Civilization', 
    subtitle: 'Video • History', 
    url: '/student/watch/t1', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  { 
    id: '5', 
    type: 'student', 
    title: 'Priya Singh', 
    subtitle: 'Student • SSC CGL', 
    url: '/manager/students', 
    allowedRoles: ['admin', 'manager', 'faculty'] 
  },
  { 
    id: '6', 
    type: 'course', 
    title: 'SSC CGL Tier 1 + Tier 2', 
    subtitle: 'Course • Active', 
    url: '/student/courses/ssc-cgl-2026', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  { 
    id: '7', 
    type: 'exam', 
    title: 'General Hindi Subject Test', 
    subtitle: 'Exam • 50 Qs', 
    url: '/student/exams', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  { 
    id: '8', 
    type: 'content', 
    title: 'Indian Polity - Fundamental Rights', 
    subtitle: 'Live Class', 
    url: '/student/live-classes', 
    allowedRoles: ['student', 'admin', 'manager', 'faculty'] 
  },
  {
    id: '9',
    type: 'admin',
    title: 'System Settings',
    subtitle: 'Admin • Configuration',
    url: '/admin/settings',
    allowedRoles: ['admin']
  },
  {
    id: '10',
    type: 'admin',
    title: 'User Management',
    subtitle: 'Admin • Users',
    url: '/admin/users',
    allowedRoles: ['admin']
  }
];

interface GlobalSearchProps {
  role?: UserRole;
}

export default function GlobalSearch({ role = 'student' }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  // const [results, setResults] = useState<typeof MOCK_DATA>([]); // Removed in favor of useMemo
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (query.trim() === '') return [];

    return MOCK_DATA.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || 
                           item.subtitle.toLowerCase().includes(query.toLowerCase());
      
      // Role-based filtering
      const isAllowed = item.allowedRoles.includes(role);
      
      return matchesQuery && isAllowed;
    });
  }, [query, role]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'student': return <User className="h-4 w-4 text-blue-500" />;
      case 'course': return <BookOpen className="h-4 w-4 text-indigo-500" />;
      case 'exam': return <FileText className="h-4 w-4 text-green-500" />;
      case 'content': return <Video className="h-4 w-4 text-red-500" />;
      default: return <Search className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery('');

    // Extra safety check for redirection
    if (role === 'student' && (url.startsWith('/admin') || url.startsWith('/manager'))) {
      // Redirect to a safe page or show error
      console.warn('Unauthorized access attempt redirected');
      router.push('/student/dashboard'); 
      return;
    }

    router.push(url);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          placeholder="Search students, courses, exams..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              // setResults([]); // Removed
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query && (
        <div className="absolute mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result.url)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      {getIcon(result.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{result.title}</p>
                      <p className="text-xs text-gray-500">{result.subtitle}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
