
import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  departmentId: z.string({
    required_error: 'Please select a department.',
  }),
  jobTitleId: z.string({
    required_error: 'Please select a job title.',
  }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
