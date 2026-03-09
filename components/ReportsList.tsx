'use client';

import { useState } from 'react';
import { FileSpreadsheet, FileText, Download, BarChart3, Eye } from 'lucide-react';
import ReportViewer from './ReportViewer';

export interface Report {
  id: string;
  name: string;
  description: string;
  exportTypes: ('Excel' | 'PDF')[];
}

interface ReportsListProps {
  reports: Report[];
  title?: string;
  description?: string;
}

export default function ReportsList({ 
  reports, 
  title = "Reports & Analytics", 
  description = "View and export detailed reports." 
}: ReportsListProps) {
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  
  const handleExport = (reportName: string, type: 'Excel' | 'PDF') => {
    // In a real app, this would trigger a backend API call to generate the report
    alert(`Exporting ${reportName} as ${type}... (This is a demo)`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{report.name}</h3>
            <p className="mb-6 flex-1 text-sm text-gray-500">{report.description}</p>
            
            <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
              <button 
                onClick={() => setViewingReport(report)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                View Report
              </button>
              
              <div className="flex gap-3">
                {report.exportTypes.includes('Excel') && (
                  <button 
                    onClick={() => handleExport(report.name, 'Excel')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </button>
                )}
                {report.exportTypes.includes('PDF') && (
                  <button 
                    onClick={() => handleExport(report.name, 'PDF')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewingReport && (
        <ReportViewer 
          reportId={viewingReport.id} 
          reportName={viewingReport.name} 
          onClose={() => setViewingReport(null)} 
        />
      )}
    </div>
  );
}
