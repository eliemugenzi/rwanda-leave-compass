
import { LeaveBalance, LeaveType } from "@/types/leave";

// Mock leave balances until we have a real API endpoint
export const mockLeaveBalances: LeaveBalance[] = [
  {
    type: LeaveType.ANNUAL,
    available: 15,
    used: 5,
    total: 20
  },
  {
    type: LeaveType.SICK,
    available: 10,
    used: 2,
    total: 12
  },
  {
    type: LeaveType.MATERNITY,
    available: 84,
    used: 0,
    total: 84
  },
  {
    type: LeaveType.PATERNITY,
    available: 14,
    used: 0,
    total: 14
  }
];

// Mock user profile data until we have a real API endpoint
export const userProfile = {
  id: "emp-001",
  name: "John Doe",
  email: "john.doe@company.com",
  role: "employee",
  department: "Engineering",
  position: "Software Developer",
  supervisorId: "sup-001",
  supervisorName: "Sarah Manager"
};
