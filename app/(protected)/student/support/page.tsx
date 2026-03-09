'use client';

import { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SupportTicketPage() {
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-2026-001',
      subject: 'Video playback buffering issue',
      category: 'Technical Issue',
      status: 'open',
      priority: 'high',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'TKT-2026-002',
      subject: 'Payment deducted but subscription not active',
      category: 'Billing & Payment',
      status: 'resolved',
      priority: 'critical',
      lastUpdated: '3 days ago'
    },
    {
      id: 'TKT-2026-003',
      subject: 'How to change my registered phone number?',
      category: 'Account Management',
      status: 'resolved',
      priority: 'low',
      lastUpdated: '1 week ago'
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500">Need help? Raise a ticket and our support team will assist you.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          Create New Ticket
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tickets by ID or subject..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Statuses</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="p-4 font-medium">Ticket ID</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Updated</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-600">{ticket.id}</td>
                  <td className="p-4 font-medium text-gray-900">{ticket.subject}</td>
                  <td className="p-4 text-sm text-gray-500">{ticket.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status === 'open' && <Clock className="w-3 h-3 mr-1" />}
                      {ticket.status === 'resolved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{ticket.lastUpdated}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
