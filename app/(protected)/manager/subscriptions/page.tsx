'use client';

import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, Plus, X } from 'lucide-react';

interface Subscription {
  id: string;
  studentName: string;
  planName: string;
  amount: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
  paymentMethod: string;
}

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    studentName: 'Rahul Kumar',
    planName: 'UKSSSC Premium',
    amount: '₹4,999',
    startDate: '2023-10-01',
    expiryDate: '2024-10-01',
    status: 'Active',
    paymentMethod: 'UPI'
  },
  {
    id: '2',
    studentName: 'Priya Singh',
    planName: 'SSC CGL Basic',
    amount: '₹2,499',
    startDate: '2023-09-15',
    expiryDate: '2024-09-15',
    status: 'Active',
    paymentMethod: 'Card'
  }
];

export default function ManagerSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSub, setNewSub] = useState({
    studentName: '',
    planName: '',
    amount: '',
    expiryDate: '',
  });

  const handleAddSubscription = () => {
    if (!newSub.studentName || !newSub.planName) return;

    const sub: Subscription = {
      id: Date.now().toString(),
      studentName: newSub.studentName,
      planName: newSub.planName,
      amount: `₹${newSub.amount}`,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: newSub.expiryDate,
      status: 'Active',
      paymentMethod: 'Manual'
    };

    setSubscriptions([sub, ...subscriptions]);
    setIsModalOpen(false);
    setNewSub({ studentName: '', planName: '', amount: '', expiryDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscriptions</h2>
          <p className="text-sm text-gray-500">Manage student plans and payments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" /> Add Subscription
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹7.4L</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Plans</p>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Validity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{sub.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{sub.planName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{sub.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sub.startDate} - {sub.expiryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add Subscription</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                  value={newSub.studentName}
                  onChange={(e) => setNewSub({...newSub, studentName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                  value={newSub.planName}
                  onChange={(e) => setNewSub({...newSub, planName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                  value={newSub.amount}
                  onChange={(e) => setNewSub({...newSub, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:outline-none"
                  value={newSub.expiryDate}
                  onChange={(e) => setNewSub({...newSub, expiryDate: e.target.value})}
                />
              </div>
              <button 
                onClick={handleAddSubscription}
                className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Add Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
