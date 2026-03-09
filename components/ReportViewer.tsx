'use client';

import { useState } from 'react';
import { X, Download } from 'lucide-react';

interface ReportViewerProps {
  reportId: string;
  reportName: string;
  onClose: () => void;
}

export default function ReportViewer({ reportId, reportName, onClose }: ReportViewerProps) {
  // Mock data generation based on report type
  const getReportData = () => {
    switch (reportId) {
      case 'enrollment':
        return {
          columns: ['Student Name', 'Exam Category', 'Plan', 'Enrollment Date', 'Amount'],
          data: [
            ['Rahul Kumar', 'SSC CGL', 'Premium', '2023-10-01', '₹4,999'],
            ['Priya Singh', 'UKSSSC', 'Basic', '2023-10-02', '₹2,499'],
            ['Amit Verma', 'Banking', 'Pro', '2023-10-03', '₹3,999'],
            ['Sneha Gupta', 'SSC CGL', 'Premium', '2023-10-05', '₹4,999'],
            ['Vikram Singh', 'Railways', 'Basic', '2023-10-06', '₹1,999'],
          ]
        };
      case 'revenue':
        return {
          columns: ['Date', 'Transaction ID', 'Student', 'Plan', 'Payment Method', 'Amount'],
          data: [
            ['2023-10-01', 'TXN1001', 'Rahul Kumar', 'Premium', 'UPI', '₹4,999'],
            ['2023-10-02', 'TXN1002', 'Priya Singh', 'Basic', 'Card', '₹2,499'],
            ['2023-10-03', 'TXN1003', 'Amit Verma', 'Pro', 'Net Banking', '₹3,999'],
            ['2023-10-05', 'TXN1004', 'Sneha Gupta', 'Premium', 'UPI', '₹4,999'],
            ['2023-10-06', 'TXN1005', 'Vikram Singh', 'Basic', 'Card', '₹1,999'],
          ]
        };
      case 'expiry':
        return {
          columns: ['Student Name', 'Plan', 'Expiry Date', 'Days Left', 'Status'],
          data: [
            ['Ankit Sharma', 'Basic', '2023-10-15', '2', 'Expiring Soon'],
            ['Meera Reddy', 'Pro', '2023-10-20', '7', 'Active'],
            ['Rohan Das', 'Premium', '2023-10-25', '12', 'Active'],
            ['Kavita Singh', 'Basic', '2023-11-01', '19', 'Active'],
          ]
        };
      case 'attendance':
        return {
          columns: ['Student Name', 'Class Name', 'Date', 'Status', 'Duration'],
          data: [
            ['Rahul Kumar', 'Maths - Algebra', '2023-10-10', 'Present', '55m'],
            ['Priya Singh', 'Maths - Algebra', '2023-10-10', 'Absent', '-'],
            ['Amit Verma', 'Maths - Algebra', '2023-10-10', 'Present', '45m'],
            ['Sneha Gupta', 'Maths - Algebra', '2023-10-10', 'Late', '30m'],
          ]
        };
      case 'performance':
        return {
          columns: ['Student Name', 'Exam Name', 'Subject', 'Score', 'Rank'],
          data: [
            ['Rahul Kumar', 'SSC Mock 1', 'Maths', '45/50', '12'],
            ['Priya Singh', 'SSC Mock 1', 'Maths', '38/50', '45'],
            ['Amit Verma', 'SSC Mock 1', 'Maths', '48/50', '3'],
            ['Sneha Gupta', 'SSC Mock 1', 'Maths', '42/50', '21'],
          ]
        };
      case 'inactive':
        return {
          columns: ['Student Name', 'Email', 'Last Login', 'Days Inactive'],
          data: [
            ['Rajesh Koothrappali', 'rajesh@example.com', '2023-09-25', '18'],
            ['Penny Hofstadter', 'penny@example.com', '2023-09-28', '15'],
            ['Howard Wolowitz', 'howard@example.com', '2023-10-01', '12'],
          ]
        };
      default:
        return { columns: [], data: [] };
    }
  };

  const { columns, data } = getReportData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{reportName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                    No data available for this report.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={() => alert("Exporting to Excel...")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium text-sm"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
