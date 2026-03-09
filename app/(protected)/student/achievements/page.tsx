'use client';

import { Trophy, Star, Target, Zap, Clock, BookOpen, CheckCircle2, Lock } from 'lucide-react';

export default function AchievementsPage() {
  const points = 850;
  
  const badges = [
    { id: 1, name: 'First Video', description: 'Watched your first video lesson', icon: VideoIcon, color: 'bg-blue-100 text-blue-600', earned: true, date: 'Jan 15, 2026' },
    { id: 2, name: 'Quick Learner', description: 'Completed a chapter in one day', icon: Zap, color: 'bg-yellow-100 text-yellow-600', earned: true, date: 'Jan 20, 2026' },
    { id: 3, name: '7-Day Streak', description: 'Logged in for 7 consecutive days', icon: Target, color: 'bg-orange-100 text-orange-600', earned: true, date: 'Feb 02, 2026' },
    { id: 4, name: 'Exam Warrior', description: 'Attempted 10 mock tests', icon: FileTextIcon, color: 'bg-purple-100 text-purple-600', earned: false, progress: 6, total: 10 },
    { id: 5, name: 'Perfect Score', description: 'Scored 100% in any exam', icon: Star, color: 'bg-green-100 text-green-600', earned: false, progress: 0, total: 1 },
    { id: 6, name: 'Consistent Attender', description: '90%+ live class attendance for a month', icon: Clock, color: 'bg-teal-100 text-teal-600', earned: false, progress: 75, total: 90 },
    { id: 7, name: 'Doubt Solver', description: 'Submitted 20 doubts', icon: HelpCircleIcon, color: 'bg-pink-100 text-pink-600', earned: false, progress: 12, total: 20 },
    { id: 8, name: 'Topper', description: 'Rank #1 in any exam', icon: Trophy, color: 'bg-amber-100 text-amber-600', earned: false, progress: 0, total: 1 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Achievements</h2>
          <p className="text-sm text-gray-500">Track your progress, earn badges, and collect points.</p>
        </div>
      </div>

      {/* Points Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-blue-100 text-sm font-medium mb-1">Total Points Balance</div>
            <div className="text-4xl font-bold font-mono">{points}</div>
            <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors">
              Redeem Points
            </button>
          </div>
          <Star className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500 text-sm font-medium">Current Streak</div>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">12 Days</div>
          <p className="text-xs text-gray-500 mt-2">Keep it up! 18 days left for 30-Day Streak badge.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500 text-sm font-medium">Badges Earned</div>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">3 <span className="text-lg text-gray-400 font-normal">/ 8</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Badges Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className={`relative bg-white rounded-xl border p-5 flex flex-col items-center text-center transition-all ${
                badge.earned ? 'border-gray-200 shadow-sm hover:shadow-md' : 'border-dashed border-gray-300 opacity-70 grayscale'
              }`}
            >
              {!badge.earned && (
                <div className="absolute top-3 right-3 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
              )}
              
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${badge.earned ? badge.color : 'bg-gray-100 text-gray-400'}`}>
                <badge.icon className="h-8 w-8" />
              </div>
              
              <h4 className="font-bold text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-xs text-gray-500 mb-4 flex-1">{badge.description}</p>
              
              {badge.earned ? (
                <div className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Earned {badge.date}
                </div>
              ) : (
                <div className="w-full mt-auto">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress} / {badge.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${(badge.progress! / badge.total!) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper icons
function VideoIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
}

function FileTextIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
}

function HelpCircleIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
}
