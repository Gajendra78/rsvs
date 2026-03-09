'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, UserPlus, ShieldCheck, Activity } from 'lucide-react';
import { User } from '@/lib/userStore';
import { Subject } from '@/lib/contentStore';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    activeUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load Users
    const savedUsers = localStorage.getItem('users');
    let users: User[] = [];
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
        setTimeout(() => setRecentUsers(users.slice(-5).reverse()), 0); // Last 5 users
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }

    // Load Content
    const savedContent = localStorage.getItem('courseContent');
    let subjects: Subject[] = [];
    if (savedContent) {
      try {
        subjects = JSON.parse(savedContent);
      } catch (e) {
        console.error("Failed to parse content", e);
      }
    }

    setTimeout(() => {
      setStats({
        totalUsers: users.length,
        totalStudents: users.filter(u => u.role === 'student').length,
        totalFaculty: users.filter(u => u.role === 'faculty').length,
        totalCourses: subjects.length,
        activeUsers: users.filter(u => u.status === 'active').length
      });
    }, 0);

  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">System Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'Students', value: stats.totalStudents, icon: UserPlus, color: 'text-green-600 bg-green-100' },
          { label: 'Faculty', value: stats.totalFaculty, icon: ShieldCheck, color: 'text-purple-600 bg-purple-100' },
          { label: 'Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-orange-600 bg-orange-100' },
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
        {/* Recent Users */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recently Added Users</h3>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No users found.</p>
            )}
          </div>
        </div>

        {/* System Health / Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/users" className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-blue-300 transition-all group">
              <UserPlus className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Add User</span>
            </Link>
            <Link href="/admin/exams" className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-orange-300 transition-all group">
              <BookOpen className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Manage Exams</span>
            </Link>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-green-300 transition-all group cursor-pointer">
              <Activity className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">System Health</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-purple-300 transition-all group cursor-pointer">
              <ShieldCheck className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Audit Logs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
