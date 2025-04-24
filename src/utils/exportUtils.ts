
export const exportToCSV = (data: any[], filename: string) => {
  // Convert leave requests to CSV format
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

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
