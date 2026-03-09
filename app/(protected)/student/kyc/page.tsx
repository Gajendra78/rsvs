'use client';

import { useState } from 'react';
import { ShieldCheck, UploadCloud, FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function KYCPage() {
  const [status, setStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">KYC Verification</h2>
          <p className="text-sm text-gray-500">Verify your identity to unlock premium features and certificates.</p>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-4 ${
        status === 'verified' ? 'bg-green-50 border-green-200' :
        status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
        'bg-red-50 border-red-200'
      }`}>
        {status === 'verified' && <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />}
        {status === 'pending' && <Clock className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />}
        {status === 'rejected' && <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />}
        
        <div>
          <h3 className={`font-bold ${
            status === 'verified' ? 'text-green-800' :
            status === 'pending' ? 'text-yellow-800' :
            'text-red-800'
          }`}>
            {status === 'verified' ? 'KYC Verified Successfully' :
             status === 'pending' ? 'Verification Pending' :
             'Verification Rejected'}
          </h3>
          <p className={`text-sm mt-1 ${
            status === 'verified' ? 'text-green-700' :
            status === 'pending' ? 'text-yellow-700' :
            'text-red-700'
          }`}>
            {status === 'verified' ? 'Your identity has been verified. You now have full access to all platform features.' :
             status === 'pending' ? 'Your documents are currently under review by our admin team. This usually takes 24-48 hours.' :
             'The uploaded documents were unclear or did not match your profile details. Please re-upload clear copies.'}
          </p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Document Upload</h3>
          <p className="text-sm text-gray-500 mt-1">Please upload clear, readable copies of your original documents.</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Aadhar Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card (Front & Back)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload-1" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2">
                    <span>Upload a file</span>
                    <input id="file-upload-1" name="file-upload-1" type="file" className="sr-only" disabled={status === 'verified' || status === 'pending'} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
              </div>
            </div>
            {status === 'pending' && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" /> aadhar_card_front_back.pdf (Uploaded on Mar 08, 2026)
              </div>
            )}
          </div>

          {/* Passport Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recent Passport Size Photo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload-2" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2">
                    <span>Upload a file</span>
                    <input id="file-upload-2" name="file-upload-2" type="file" className="sr-only" disabled={status === 'verified' || status === 'pending'} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </div>
            </div>
            {status === 'pending' && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" /> profile_photo.jpg (Uploaded on Mar 08, 2026)
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            disabled={status === 'verified' || status === 'pending'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Documents
          </button>
        </div>
      </div>
    </div>
  );
}
