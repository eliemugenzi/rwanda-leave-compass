
import { ApiResponse, Department, JobTitle } from '@/types/api';
import { BASE_URL } from './config';

export async function getDepartments(): Promise<ApiResponse<Department[]>> {
  const response = await fetch(`${BASE_URL}/departments`);
  if (!response.ok) {
    throw new Error('Failed to fetch departments');
  }
  return response.json();
}

export async function getJobTitles(departmentId: string): Promise<ApiResponse<JobTitle[]>> {
  const response = await fetch(`${BASE_URL}/job-titles/department/${departmentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job titles');
  }
  return response.json();
}
