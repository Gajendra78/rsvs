'use client';

import { useState } from 'react';
import { Share2, Copy, Gift, Users, CheckCircle2, TrendingUp, Clock } from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'RSVS-RAHUL-2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = {
    totalInvites: 12,
    successfulReferrals: 3,
    totalEarned: 1500,
    pendingRewards: 500
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Refer & Earn</h2>
          <p className="text-sm text-gray-500">Invite your friends and earn rewards on their first subscription.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">Give ₹500, Get ₹500</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Share your unique referral code with friends. They get ₹500 off their first subscription, and you get ₹500 added to your wallet!
          </p>
          
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 inline-block">
            <div className="text-sm text-blue-200 mb-1">Your Referral Code</div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-bold tracking-wider">{referralCode}</span>
              <button 
                onClick={handleCopy}
                className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
              >
                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-white/10 rounded-full h-48 w-48 border-4 border-white/20">
          <Gift className="h-16 w-16 mb-2" />
          <span className="font-bold text-xl">Rewards</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">Total Invites</div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Share2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalInvites}</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">Successful</div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.successfulReferrals}</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">Total Earned</div>
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.totalEarned}</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">Pending</div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.pendingRewards}</div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Referral History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="p-4 font-medium">Friend&apos;s Name</th>
                <th className="p-4 font-medium">Date Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">Amit Kumar</td>
                <td className="p-4 text-sm text-gray-500">Mar 05, 2026</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-green-600">+₹500</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">Sneha Gupta</td>
                <td className="p-4 text-sm text-gray-500">Mar 02, 2026</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-green-600">+₹500</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">Vikram Singh</td>
                <td className="p-4 text-sm text-gray-500">Feb 28, 2026</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending Purchase
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-gray-400">₹0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
