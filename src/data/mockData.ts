
import { LeaveBalance, LeaveRequest } from "@/types/leave";

export const userProfile = {
  id: "user-001",
  name: "John Doe",
  email: "john.doe@example.com",
  department: "Engineering",
  position: "Software Developer",
  joinDate: "2022-05-10",
  imageUrl: "/placeholder.svg"
};

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
    createdAt: "2023-07-20"
  },
  {
    id: "leave-002",
    type: "Sick",
    startDate: "2023-09-05",
    endDate: "2023-09-07",
    reason: "Flu",
    status: "Approved",
    createdAt: "2023-09-05"
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
