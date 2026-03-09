'use client';

import ReportsList, { Report } from '@/components/ReportsList';

const FACULTY_REPORTS: Report[] = [
  {
    id: 'attendance',
    name: 'Attendance Report',
    description: 'Live class attendance per student per class.',
    exportTypes: ['Excel', 'PDF'],
  },
  {
    id: 'performance',
    name: 'Exam Performance Report',
    description: 'Score analysis per student, per exam, and per subject.',
    exportTypes: ['Excel', 'PDF'],
  },
  {
    id: 'inactive',
    name: 'Inactive Students Report',
    description: 'Students who haven\'t logged in for 7+ days.',
    exportTypes: ['Excel'],
  },
];

export default function FacultyReportsPage() {
  return (
    <div className="p-6">
      <ReportsList 
        reports={FACULTY_REPORTS} 
        title="Faculty Reports" 
        description="Reports on student performance and engagement." 
      />
    </div>
  );
}
