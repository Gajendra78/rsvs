export type Role = 'admin' | 'manager' | 'faculty' | 'student';

export interface User {
  id: string;
  instituteId: string; // e.g., RSVS-S-00001 or RSVS-M-00001
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  validity?: string; // ISO Date string for subscription/contract expiry
  password?: string; // In a real app, this would be hashed. Here just for demo.
  createdAt: string;
}

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    instituteId: 'RSVS-M-00001',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    validity: '2030-12-31',
    createdAt: '2023-01-01',
  },
  {
    id: 'u2',
    instituteId: 'RSVS-M-00002',
    name: 'Manager User',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    validity: '2025-12-31',
    createdAt: '2023-02-01',
  },
  {
    id: 'u3',
    instituteId: 'RSVS-M-00003',
    name: 'Faculty User',
    email: 'faculty@example.com',
    role: 'faculty',
    status: 'active',
    validity: '2025-12-31',
    createdAt: '2023-03-01',
  },
  {
    id: 'u4',
    instituteId: 'RSVS-S-00001',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student',
    status: 'active',
    validity: '2024-12-31',
    createdAt: '2023-04-01',
  },
];
