import { LeaveBalance, LeaveRequest, User } from "@/types/leave";

export const userProfile: User = {
  id: "user-001",
  name: "John Doe",
  email: "john.doe@example.com",
  department: "Engineering",
  position: "Software Developer",
  role: "employee",
  supervisorId: "user-002",
  supervisorName: "Sarah Johnson"
};

export const supervisors: User[] = [
  {
    id: "user-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Engineering",
    position: "Engineering Manager",
    role: "supervisor"
  },
  {
    id: "user-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Product",
    position: "Product Manager",
    role: "supervisor"
  }
];

export const employees: User[] = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    position: "Software Developer",
    role: "employee",
    supervisorId: "user-002",
    supervisorName: "Sarah Johnson"
  },
  {
    id: "user-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Engineering",
    position: "QA Engineer",
    role: "employee",
    supervisorId: "user-002",
    supervisorName: "Sarah Johnson"
  },
  {
    id: "user-005",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    department: "Product",
    position: "Product Analyst",
    role: "employee",
    supervisorId: "user-003",
    supervisorName: "Michael Brown"
  }
];

export const mockLeaveBalances: LeaveBalance[] = [
  {
    type: "PTO",
    available: 15,
    used: 5,
    total: 20
  },
  {
    type: "Sick",
    available: 10,
    used: 2,
    total: 12
  },
  {
    type: "Compassionate",
    available: 7,
    used: 0,
    total: 7
  },
  {
    type: "Maternity",
    available: 84,
    used: 0,
    total: 84
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "leave-001",
    type: "PTO",
    startDate: "2023-08-10",
    endDate: "2023-08-15",
    reason: "Annual vacation",
    status: "Approved",
    createdAt: "2023-07-20",
    supervisorId: "user-002",
    supervisorName: "Sarah Johnson",
    supervisorComment: "Approved. Enjoy your vacation!",
    reviewedAt: "2023-07-22"
  },
  {
    id: "leave-002",
    type: "Sick",
    startDate: "2023-09-05",
    endDate: "2023-09-07",
    reason: "Flu",
    status: "Approved",
    createdAt: "2023-09-05",
    supervisorId: "user-002",
    supervisorName: "Sarah Johnson",
    supervisorComment: "Approved. Get well soon!",
    reviewedAt: "2023-09-05"
  },
  {
    id: "leave-003",
    type: "PTO",
    startDate: "2023-12-22",
    endDate: "2023-12-31",
    reason: "Holiday break",
    status: "Pending",
    createdAt: "2023-11-15"
  },
];
