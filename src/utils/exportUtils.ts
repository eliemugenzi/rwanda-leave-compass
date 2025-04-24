
import { File, Files } from "lucide-react";

export type ExportFormat = 'csv' | 'excel';

export const ExportFormatIcon = {
  csv: Files,
  excel: File,
};

export const exportToFile = (data: any[], filename: string, format: ExportFormat = 'csv') => {
  // Convert leave requests to table format
  const headers = [
    'Employee Name',
    'Department',
    'Leave Type',
    'Start Date',
    'End Date',
    'Status',
    'Duration (Days)',
    'Reason'
  ];

  const rows = data.map((item) => [
    item.employeeName,
    item.departmentName || 'N/A',
    item.type,
    item.startDate,
    item.endDate,
    item.status,
    calculateDuration(item.startDate, item.endDate),
    item.reason
  ]);

  if (format === 'csv') {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    downloadFile(csvContent, filename + '.csv', 'text/csv;charset=utf-8;');
  } else {
    // For Excel, we'll create a tab-separated values file that Excel can open
    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    downloadFile(tsvContent, filename + '.xls', 'application/vnd.ms-excel');
  }
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
