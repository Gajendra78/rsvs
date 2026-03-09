'use client';

import { useState } from 'react';
import { 
  User, Lock, Bell, Download, Smartphone, Camera, Save, 
  LogOut, FileText, CheckCircle, AlertCircle, X, Shield 
} from 'lucide-react';
import Image from 'next/image';

// Mock User Data
const MOCK_USER = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  dob: '1998-05-15',
  city: 'Dehradun',
  state: 'Uttarakhand',
  avatar: 'https://picsum.photos/seed/rahul/200/200',
};

// Mock Downloads
const DOWNLOADS = [
  { id: 1, title: 'UKSSSC VDO Syllabus 2025', type: 'PDF', date: '2025-02-10', size: '2.5 MB' },
  { id: 2, title: 'General Hindi Notes - Chapter 1', type: 'PDF', date: '2025-02-12', size: '1.8 MB' },
  { id: 3, title: 'Uttarakhand GK - Monthly Current Affairs', type: 'PDF', date: '2025-02-15', size: '4.2 MB' },
  { id: 4, title: 'Course Receipt - #INV-2025-001', type: 'Receipt', date: '2025-01-20', size: '150 KB' },
];

// Mock Devices
const DEVICES = [
  { id: 1, name: 'Chrome on Windows', location: 'Dehradun, India', ip: '192.168.1.1', lastActive: 'Current Session', current: true },
  { id: 2, name: 'RSVS App on Android', location: 'Dehradun, India', ip: '10.0.0.5', lastActive: '2 hours ago', current: false },
  { id: 3, name: 'Safari on iPhone', location: 'Delhi, India', ip: '172.16.0.2', lastActive: 'Yesterday', current: false },
];

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(MOCK_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    email: { reminders: true, exams: true, content: true, announcements: true },
    sms: { reminders: true, exams: true, content: false, announcements: true },
  });

  const handleNotificationChange = (type: 'email' | 'sms', key: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: { ...prev[type], [key as keyof typeof prev.email]: !prev[type][key as keyof typeof prev.email] }
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24">
                <Image 
                  src={user.avatar} 
                  alt="Profile" 
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md" 
                  referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
                <button className="mt-2 text-sm text-blue-600 font-medium hover:underline">Change Profile Photo</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  value={user.email} 
                  disabled={true}
                  className="w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  value={user.phone} 
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                  type="date" 
                  value={user.dob} 
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <input 
                  type="text" 
                  value={user.city} 
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State</label>
                <input 
                  type="text" 
                  value={user.state} 
                  disabled={!isEditing}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              {isEditing ? (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="max-w-md space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input type="password" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-sm text-blue-800">
              <Shield className="h-5 w-5 shrink-0" />
              <p>For security reasons, you will be asked to verify your identity via OTP sent to your registered mobile number.</p>
            </div>

            <button 
              onClick={() => setShowOtpModal(true)}
              className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notification Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SMS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { key: 'reminders', label: 'Class Reminders' },
                    { key: 'exams', label: 'Exam Alerts' },
                    { key: 'content', label: 'New Content Updates' },
                    { key: 'announcements', label: 'Platform Announcements' },
                  ].map((item) => (
                    <tr key={item.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.label}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.email[item.key as keyof typeof notifications.email]}
                          onChange={() => handleNotificationChange('email', item.key)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.sms[item.key as keyof typeof notifications.sms]}
                          onChange={() => handleNotificationChange('sms', item.key)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="space-y-4">
            {DOWNLOADS.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.type} • {item.size} • {item.date}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-4">
            {DEVICES.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${device.current ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      {device.name}
                      {device.current && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase">Current</span>}
                    </h4>
                    <p className="text-xs text-gray-500">{device.location} • {device.ip}</p>
                    <p className="text-xs text-gray-400 mt-1">Last active: {device.lastActive}</p>
                  </div>
                </div>
                {!device.current && (
                  <button className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center gap-1">
                    <LogOut className="h-3 w-3" /> Logout
                  </button>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <button className="text-sm font-bold text-red-600 hover:text-red-700">
                Sign out of all other devices
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'password', label: 'Change Password', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'downloads', label: 'Download Center', icon: Download },
              { id: 'devices', label: 'Devices', icon: Smartphone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Verify Identity</h3>
              <button onClick={() => setShowOtpModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center mb-8">
              <div className="mx-auto h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <p className="text-sm text-gray-600">
                Please enter the 4-digit code sent to your registered mobile number ending in <strong>3210</strong>
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
              ))}
            </div>

            <button 
              onClick={() => {
                setShowOtpModal(false);
                alert('Password updated successfully!');
              }}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Verify & Update
            </button>
            
            <p className="text-center mt-4 text-sm text-gray-500">
              Didn&apos;t receive code? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
