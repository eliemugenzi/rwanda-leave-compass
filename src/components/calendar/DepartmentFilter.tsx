
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DepartmentFilterProps {
  selectedDepartment: string;
  departments: Array<{ id: string; name: string }>;
  onDepartmentChange: (value: string) => void;
}

export function DepartmentFilter({
  selectedDepartment,
  departments,
  onDepartmentChange,
}: DepartmentFilterProps) {
  return (
    <Select
      value={selectedDepartment}
      onValueChange={onDepartmentChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Filter by department" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Departments</SelectItem>
        {departments.map((dept) => (
          <SelectItem key={dept.id} value={dept.id}>
            {dept.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
