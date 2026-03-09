'use client';

import { useState } from 'react';
import { Trophy, Medal, Star, TrendingUp, Search } from 'lucide-react';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('weekly');

  const leaderboard = [
    { rank: 1, name: 'Rahul Sharma', points: 2450, avatar: 'R', trend: 'up' },
    { rank: 2, name: 'Priya Patel', points: 2320, avatar: 'P', trend: 'same' },
    { rank: 3, name: 'Amit Kumar', points: 2180, avatar: 'A', trend: 'up' },
    { rank: 4, name: 'Sneha Gupta', points: 2050, avatar: 'S', trend: 'down' },
    { rank: 5, name: 'Vikram Singh', points: 1980, avatar: 'V', trend: 'up' },
    { rank: 6, name: 'Neha Reddy', points: 1850, avatar: 'N', trend: 'same' },
    { rank: 7, name: 'Rohan Verma', points: 1720, avatar: 'R', trend: 'down' },
    { rank: 8, name: 'Anjali Desai', points: 1690, avatar: 'A', trend: 'up' },
    { rank: 9, name: 'Karan Mehta', points: 1540, avatar: 'K', trend: 'down' },
    { rank: 10, name: 'Pooja Joshi', points: 1480, avatar: 'P', trend: 'same' },
  ];

  const currentUserRank = 42;
  const currentUserPoints = 850;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
          <p className="text-sm text-gray-500">See how you stack up against your peers.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['weekly', 'monthly', 'all-time'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                timeframe === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 py-8">
        {/* Rank 2 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="h-16 w-16 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 z-10 relative">
              {leaderboard[1].avatar}
            </div>
            <div className="absolute -bottom-3 -right-2 bg-gray-300 text-gray-800 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white z-20">
              2
            </div>
          </div>
          <div className="text-sm font-bold text-gray-900">{leaderboard[1].name}</div>
          <div className="text-xs text-gray-500 font-mono">{leaderboard[1].points} pts</div>
          <div className="w-20 h-24 bg-gray-200 rounded-t-lg mt-4 flex items-start justify-center pt-2">
            <Medal className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Rank 1 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 z-20">
              <Trophy className="h-8 w-8 fill-current" />
            </div>
            <div className="h-20 w-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold text-yellow-700 z-10 relative">
              {leaderboard[0].avatar}
            </div>
            <div className="absolute -bottom-3 -right-2 bg-yellow-400 text-yellow-900 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white z-20">
              1
            </div>
          </div>
          <div className="text-base font-bold text-gray-900">{leaderboard[0].name}</div>
          <div className="text-sm text-yellow-600 font-bold font-mono">{leaderboard[0].points} pts</div>
          <div className="w-24 h-32 bg-yellow-100 rounded-t-lg mt-4 flex items-start justify-center pt-2 border-t-4 border-yellow-300">
            <Star className="h-8 w-8 text-yellow-500 fill-current" />
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="h-16 w-16 rounded-full bg-orange-100 border-4 border-orange-300 flex items-center justify-center text-xl font-bold text-orange-700 z-10 relative">
              {leaderboard[2].avatar}
            </div>
            <div className="absolute -bottom-3 -right-2 bg-orange-300 text-orange-900 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white z-20">
              3
            </div>
          </div>
          <div className="text-sm font-bold text-gray-900">{leaderboard[2].name}</div>
          <div className="text-xs text-gray-500 font-mono">{leaderboard[2].points} pts</div>
          <div className="w-20 h-20 bg-orange-100 rounded-t-lg mt-4 flex items-start justify-center pt-2">
            <Medal className="h-6 w-6 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="bg-blue-600 rounded-xl p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            S
          </div>
          <div>
            <div className="text-blue-100 text-sm">Your Rank</div>
            <div className="text-2xl font-bold">#{currentUserRank}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-blue-100 text-sm">Total Points</div>
          <div className="text-2xl font-bold font-mono">{currentUserPoints}</div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-900">Top Performers</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {leaderboard.slice(3).map((student) => (
            <div key={student.rank} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
              <div className="w-12 text-center font-bold text-gray-500">#{student.rank}</div>
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-4">
                {student.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{student.name}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono font-bold text-gray-700">{student.points}</div>
                {student.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {student.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                {student.trend === 'same' && <div className="h-1 w-4 bg-gray-300 rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
