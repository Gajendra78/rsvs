'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Lock,
  User as UserIcon,
  Filter,
  X
} from 'lucide-react';
import { INITIAL_USERS, User, Role } from '@/lib/userStore';

export default function ManagerUserManagementPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    instituteId: '',
    name: '',
    email: '',
    role: 'student' as Role,
    status: 'active' as 'active' | 'inactive',
    validity: '',
    password: '',
  });

  // Helper to generate next Institute ID
  const generateInstituteId = (role: Role) => {
    const prefix = role === 'student' ? 'RSVS-S-' : 'RSVS-M-';
    
    // Filter users with the same prefix
    const relevantUsers = users.filter(u => u.instituteId?.startsWith(prefix));
    
    if (relevantUsers.length === 0) {
      return `${prefix}00001`;
    }

    // Find the max ID number
    const maxId = relevantUsers.reduce((max, user) => {
      const idPart = user.instituteId?.split('-').pop();
      const num = parseInt(idPart || '0', 10);
      return num > max ? num : max;
    }, 0);

    // Increment and pad
    return `${prefix}${String(maxId + 1).padStart(5, '0')}`;
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setUsers(parsed), 0);
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }
  }, []);

  // Save to localStorage whenever users change
  useEffect(() => {
    if (users !== INITIAL_USERS) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        instituteId: user.instituteId || '',
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        validity: user.validity || '',
        password: '', 
      });
    } else {
      setEditingUser(null);
      const defaultRole = 'student';
      setFormData({
        instituteId: generateInstituteId(defaultRole),
        name: '',
        email: '',
        role: defaultRole,
        status: 'active',
        validity: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        password: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) return;

    // Manager restriction: Cannot create/edit Admins
    if (formData.role === 'admin') {
      alert("Managers cannot create or edit Admin accounts.");
      return;
    }

    if (editingUser) {
      if (editingUser.role === 'admin') {
        alert("Managers cannot edit Admin accounts.");
        return;
      }

      // Update existing user
      setUsers(prev => prev.map(u => {
        if (u.id !== editingUser.id) return u;
        return {
          ...u,
          // instituteId is immutable
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          validity: formData.validity,
          ...(formData.password ? { password: formData.password } : {})
        };
      }));
    } else {
      // Create new user
      const newUser: User = {
        id: `u${Date.now()}`,
        instituteId: formData.instituteId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        validity: formData.validity,
        password: formData.password || 'password123',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers(prev => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    if (user.role === 'admin') {
      alert("Managers cannot delete Admin accounts.");
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage staff, faculty, and student accounts.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | 'all')}
          >
            <option value="all">All Roles</option>
            <option value="manager">Manager</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">User / ID</th>
                <th className="px-6 py-4 font-medium text-gray-500">Role</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Validity</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs font-mono text-emerald-600 mt-0.5">{user.instituteId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'faculty' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-700">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-700">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {user.validity || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                        title="Edit User"
                        disabled={user.role === 'admin'}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
                        title="Delete User"
                        disabled={user.role === 'admin'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute ID</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                  value={formData.instituteId}
                  readOnly
                />
                <p className="text-xs text-gray-400 mt-1">Auto-generated based on role</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                    value={formData.role}
                    onChange={(e) => {
                      const newRole = e.target.value as Role;
                      setFormData({
                        ...formData, 
                        role: newRole,
                        // Regenerate ID if creating new user
                        instituteId: !editingUser ? generateInstituteId(newRole) : formData.instituteId
                      });
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="manager">Manager</option>
                    {/* Admin option hidden/disabled for managers */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validity (Expiry Date)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                    value={formData.validity}
                    onChange={(e) => setFormData({...formData, validity: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? 'New Password (Optional)' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="password" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                    placeholder={editingUser ? "Leave blank to keep current" : "Set password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveUser}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium"
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
