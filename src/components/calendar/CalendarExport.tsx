
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { File, Files } from "lucide-react";
import { exportToFile } from "@/utils/exportUtils";
import { format } from "date-fns";

interface CalendarExportProps {
  departments?: Array<{ id: string; name: string }>;
  selectedDepartment: string;
  data: any[];
}

export function CalendarExport({
  departments,
  selectedDepartment,
  data
}: CalendarExportProps) {
  const handleExport = (exportFormat: 'csv' | 'excel') => {
    if (data) {
      const fileName = selectedDepartment === "all" 
        ? `all-departments-leave-requests-${format(new Date(), 'yyyy-MM-dd')}`
        : `${departments?.find(d => d.id === selectedDepartment)?.name}-leave-requests-${format(new Date(), 'yyyy-MM-dd')}`;
      
      const exportData = data.map(request => ({
        ...request,
        departmentName: departments?.find(d => d.id === request.departmentId)?.name
      }));
      
      exportToFile(exportData, fileName, exportFormat);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          disabled={!data.length}
        >
          Export as...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <Files className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          <File className="mr-2 h-4 w-4" />
          Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
