'use client';

import { useState, useEffect } from 'react';
import { Users, CreditCard, UserPlus, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { User } from '@/lib/userStore';
import Link from 'next/link';

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    newSignups: 0
  });
  const [recentStudents, setRecentStudents] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        const users: User[] = JSON.parse(savedUsers);
        const students = users.filter(u => u.role === 'student');
        
        setTimeout(() => {
          setStats({
            totalStudents: students.length,
            activeStudents: students.filter(s => s.status === 'active').length,
            inactiveStudents: students.filter(s => s.status === 'inactive').length,
            newSignups: students.filter(s => {
              const created = new Date(s.createdAt);
              const now = new Date();
              const diffTime = Math.abs(now.getTime() - created.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              return diffDays <= 7; // New in last 7 days
            }).length
          });

          setRecentStudents(students.slice(-5).reverse());
        }, 0);
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manager Dashboard</h2>
        <p className="text-sm text-gray-500">Student Overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'Active Students', value: stats.activeStudents, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
          { label: 'Inactive Students', value: stats.inactiveStudents, icon: XCircle, color: 'text-red-600 bg-red-100' },
          { label: 'New Signups (7d)', value: stats.newSignups, icon: UserPlus, color: 'text-purple-600 bg-purple-100' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Students */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recently Added Students</h3>
            <Link href="/manager/students" className="text-sm text-emerald-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentStudents.length > 0 ? (
              recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {student.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No students found.</p>
            )}
          </div>
        </div>

        {/* Expiring Subscriptions (Mock for now, as subscription logic isn't fully built) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900">Expiring Soon (Mock Data)</h3>
          <div className="space-y-4">
            {[
              { name: 'Sneha Gupta', plan: 'UKSSSC Basic', expiry: '2 days' },
              { name: 'Vikram Singh', plan: 'SSC CGL Premium', expiry: '4 days' },
            ].map((sub, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div>
                  <p className="font-medium text-gray-900">{sub.name}</p>
                  <p className="text-sm text-gray-500">{sub.plan} • Expires in {sub.expiry}</p>
                </div>
                <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
                  Remind
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
