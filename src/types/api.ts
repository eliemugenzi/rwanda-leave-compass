
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobTitle {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  departmentName: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
