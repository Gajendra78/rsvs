'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit, UserX, UserCheck, Mail } from 'lucide-react';
import { User } from '@/lib/userStore';

export default function StudentManagementPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        const allUsers: User[] = JSON.parse(savedUsers);
        // Filter only students
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStudents(allUsers.filter(u => u.role === 'student'));
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }
  }, []);

  const filteredStudents = students.filter(student => 
    (filterStatus === 'All' || student.status === filterStatus.toLowerCase()) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    // Update local state
    const updatedStudents = students.map(s => s.id === id ? { ...s, status: newStatus as 'active' | 'inactive' } : s);
    setStudents(updatedStudents);

    // Update localStorage (need to update the full user list)
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const allUsers: User[] = JSON.parse(savedUsers);
      const updatedAllUsers = allUsers.map(u => u.id === id ? { ...u, status: newStatus as 'active' | 'inactive' } : u);
      localStorage.setItem('users', JSON.stringify(updatedAllUsers));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-sm text-gray-500">Manage student accounts and subscriptions</p>
        </div>
        {/* Add Student button removed as it should be done in User Management */}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-300 pl-10 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Institute ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Validity</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-600">{student.instituteId || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      student.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.validity || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-gray-400 hover:text-emerald-600" title="Message">
                        <Mail className="h-4 w-4" />
                      </button>
                      {student.status === 'active' ? (
                        <button 
                          onClick={() => toggleStatus(student.id, student.status)}
                          className="text-gray-400 hover:text-red-600" 
                          title="Suspend"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleStatus(student.id, student.status)}
                          className="text-gray-400 hover:text-green-600" 
                          title="Activate"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
