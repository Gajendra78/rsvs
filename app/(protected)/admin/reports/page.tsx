'use client';

import ReportsList, { Report } from '@/components/ReportsList';

const ADMIN_REPORTS: Report[] = [
  {
    id: 'fee',
    name: 'Fee Report',
    description: 'Detailed fee collection and pending dues report.',
    exportTypes: ['Excel', 'PDF'],
  },
  {
    id: 'enrollment',
    name: 'Enrollment Report',
    description: 'Students enrolled by exam, plan, and date range.',
    exportTypes: ['Excel', 'PDF'],
  },
  {
    id: 'revenue',
    name: 'Revenue Report',
    description: 'Collections by plan, payment method, and date range.',
    exportTypes: ['Excel', 'PDF'],
  },
  {
    id: 'expiry',
    name: 'Subscription Expiry Report',
    description: 'Students whose plans expire in 7/15/30 days.',
    exportTypes: ['Excel'],
  },
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

export default function AdminReportsPage() {
  return (
    <div className="p-6">
      <ReportsList 
        reports={ADMIN_REPORTS} 
        title="Admin Reports" 
        description="Comprehensive reports for administrative analysis." 
      />
    </div>
  );
}
