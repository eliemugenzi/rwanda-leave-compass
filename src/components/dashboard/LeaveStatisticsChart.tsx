
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthlyStatistic, fetchMonthlyLeaveStatistics } from '@/services/api/leave-requests';
import { Loader } from 'lucide-react';

export const LeaveStatisticsChart = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['leaveStatistics', selectedYear],
    queryFn: () => fetchMonthlyLeaveStatistics(selectedYear),
  });

  const transformedData = statistics?.data.map((stat: MonthlyStatistic) => ({
    name: stat.monthName.slice(0, 3),
    Annual: stat.leaveTypeStatistics.ANNUAL?.totalDays || 0,
    Sick: stat.leaveTypeStatistics.SICK?.totalDays || 0,
    Maternity: stat.leaveTypeStatistics.MATERNITY?.totalDays || 0,
    Compassionate: stat.leaveTypeStatistics.COMPASSIONATE?.totalDays || 0,
    Total: stat.totalLeaveDays,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Leave Statistics</CardTitle>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                height={50}
              >
                <Label
                  value="Months"
                  position="bottom"
                  offset={0}
                />
              </XAxis>
              <YAxis 
                width={80}
              >
                <Label
                  value="Number of Days"
                  angle={-90}
                  position="left"
                  offset={-20}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="Annual" fill="#2563eb" stackId="a" />
              <Bar dataKey="Sick" fill="#eab308" stackId="a" />
              <Bar dataKey="Maternity" fill="#ec4899" stackId="a" />
              <Bar dataKey="Compassionate" fill="#8b5cf6" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

