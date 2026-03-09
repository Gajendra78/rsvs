'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/userStore';
import { CheckCircle2, CreditCard, Search, User as UserIcon, Calendar, BookOpen, IndianRupee } from 'lucide-react';

export default function PaymentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    courseName: '',
    feeAmount: '',
    installment: '1',
    endDate: '',
  });

  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }

    const savedPayments = localStorage.getItem('offlinePayments');
    if (savedPayments) {
      try {
        setRecentPayments(JSON.parse(savedPayments).reverse());
      } catch (e) {
        console.error("Failed to parse payments", e);
      }
    }
  }, []);

  const handleSearch = () => {
    const found = users.find(u => 
      u.role === 'student' && 
      (u.instituteId.toLowerCase() === searchQuery.toLowerCase() || 
       u.email.toLowerCase() === searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedUser(found);
      setSuccessMessage('');
    } else {
      alert('Student not found. Please check the ID or Email.');
      setSelectedUser(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Update user status and validity
    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          status: 'active' as const,
          validity: formData.endDate || u.validity
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Save payment record
    const newPayment = {
      id: Date.now().toString(),
      studentId: selectedUser.instituteId,
      studentName: selectedUser.name,
      courseName: formData.courseName,
      feeAmount: formData.feeAmount,
      installment: formData.installment,
      endDate: formData.endDate,
      date: new Date().toISOString(),
    };

    const savedPayments = localStorage.getItem('offlinePayments');
    const payments = savedPayments ? JSON.parse(savedPayments) : [];
    payments.push(newPayment);
    localStorage.setItem('offlinePayments', JSON.stringify(payments));
    setRecentPayments(payments.reverse());

    setSuccessMessage(`Payment of ₹${formData.feeAmount} submitted successfully. Account is now active.`);
    
    // Reset form
    setFormData({
      courseName: '',
      feeAmount: '',
      installment: '1',
      endDate: '',
    });
    setSelectedUser(null);
    setSearchQuery('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offline Payments</h2>
          <p className="text-sm text-gray-500">Submit offline fee payments and activate student accounts.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Search Student */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Find Student</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID or Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="e.g. RSVS-S-00001"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Search
              </button>
            </div>
          </div>

          {selectedUser && (
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
              <h3 className="text-sm font-medium text-emerald-800 mb-4 uppercase tracking-wider">Student Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600">Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600">Institute ID</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.instituteId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600">Current Status</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedUser.status}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Submit Fee Details</h3>
            
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <p className="text-sm text-green-800">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      disabled={!selectedUser}
                      value={formData.courseName}
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="e.g. SSC CGL Complete Batch"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Amount (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      disabled={!selectedUser}
                      value={formData.feeAmount}
                      onChange={(e) => setFormData({...formData, feeAmount: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Installment Number</label>
                  <select
                    required
                    disabled={!selectedUser}
                    value={formData.installment}
                    onChange={(e) => setFormData({...formData, installment: e.target.value})}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="1">1st Installment</option>
                    <option value="2">2nd Installment</option>
                    <option value="3">3rd Installment</option>
                    <option value="4">4th Installment</option>
                    <option value="5">5th Installment</option>
                    <option value="6">6th Installment</option>
                    <option value="Full">Full Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account End Date (Validity)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      required
                      disabled={!selectedUser}
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={!selectedUser}
                  className="flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                >
                  Submit Payment & Activate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Offline Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                      <div className="text-sm text-gray-500">{payment.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.feeAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.installment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.endDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    No offline payments recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
