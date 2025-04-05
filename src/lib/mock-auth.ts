
import { User, UserRole } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock user database
const users: User[] = [
  {
    id: '1',
    name: 'Emma Smith',
    email: 'emma.smith@campus.edu',
    role: 'student',
    createdAt: new Date('2023-01-15'),
    indexNumber: '12345',
  },
  {
    id: '2',
    name: 'Alex Johnson',
    email: 'alex.johnson@campus.edu',
    role: 'educator',
    createdAt: new Date('2022-08-10'),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    createdAt: new Date('2022-01-01'),
  },
];

// Mock passwords (in a real app, these would be hashed)
const passwords = {
  'emma.smith@campus.edu': 'password',
  'alex.johnson@campus.edu': 'password',
  'admin@campus.edu': 'password',
  '12345': 'password', // Student index number password
};

// Mock index numbers for students who haven't set passwords yet
const pendingIndexNumbers = ['54321', '67890', '98765'];

// Auth service
export const mockAuth = {
  login: (email: string, password: string): User | null => {
    // Check if email and password match
    if (passwords[email] === password) {
      return users.find(u => u.email === email) || null;
    }
    return null;
  },

  loginWithIndexNumber: (indexNumber: string, password: string): User | null => {
    // Check if index number and password match
    if (passwords[indexNumber] === password) {
      return users.find(u => u.indexNumber === indexNumber) || null;
    }
    return null;
  },

  setNewPassword: (indexNumber: string, newPassword: string): boolean => {
    // Check if index number is valid (either in users or pending)
    const existingUser = users.find(u => u.indexNumber === indexNumber);
    
    if (existingUser) {
      // Update password for existing user
      passwords[indexNumber] = newPassword;
      return true;
    } else if (pendingIndexNumbers.includes(indexNumber)) {
      // Create a new user for this index number
      const newUser = {
        id: uuidv4(),
        name: `Student ${indexNumber}`, // Default name until profile is updated
        email: `student${indexNumber}@campus.edu`, // Default email
        role: 'student' as UserRole,
        createdAt: new Date(),
        indexNumber: indexNumber,
      };
      
      users.push(newUser);
      passwords[indexNumber] = newPassword;
      // Remove from pending list
      const idx = pendingIndexNumbers.indexOf(indexNumber);
      if (idx > -1) {
        pendingIndexNumbers.splice(idx, 1);
      }
      return true;
    }
    
    return false;
  },

  register: (name: string, email: string, password: string, role: UserRole): User => {
    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      role,
      createdAt: new Date(),
    };
    
    users.push(newUser);
    passwords[email] = password;
    
    return newUser;
  },

  logout: () => {
    // In a real app, this would clear the auth token
    return true;
  },
  
  // For use in other parts of the app
  getAllUsers: (): User[] => {
    return [...users];
  },
  
  getUserById: (id: string): User | null => {
    return users.find(u => u.id === id) || null;
  },
  
  getPendingIndexNumbers: (): string[] => {
    return [...pendingIndexNumbers];
  }
};
