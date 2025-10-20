import type { ReactNode } from 'react';

import { useNavigate } from 'react-router';
import React, { useState, useEffect, useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export type UserRole = 'user' | 'team' | 'associate' | 'supervisor' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  status?: 'active' | 'inactive' | 'suspended';
  assignedClients?: string[];
  assignedProperties?: string[];
  assignedUsers?: string[]; // For supervisors and managers to manage associates
  assignedManager?: string; // For associates to specify their manager
  assignedSupervisor?: string; // For associates to specify their supervisor
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  createUser: (userData: Omit<User, 'id'>) => Promise<boolean>;
  updateUser: (userId: string, userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      let userData: User | null = null;

      // Demo user (regular dashboard)
      if (email === 'demo@hostaway.com' && password === 'password123') {
        userData = {
          id: '1',
          email: 'demo@hostaway.com',
          name: 'Demo User',
          role: 'user',
          avatar: undefined,
        };
      }
      // Team member (team dashboard)
      else if (email === 'team@hostaway.com' && password === 'team123') {
        userData = {
          id: '2',
          email: 'team@hostaway.com',
          name: 'Team Member',
          role: 'team',
          avatar: undefined,
        };
      }
      // Check created users
      else {
        const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
        const foundUser = createdUsers.find((createdUser: User) => createdUser.email === email);
        
        if (foundUser) {
          // For demo purposes, we'll accept any password for created users
          // In a real app, you'd verify the password hash
          userData = foundUser;
        }
      }

      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
  };

  const createUser = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a unique ID
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
      };

      // Store the new user in localStorage (in a real app, this would be sent to the server)
      const existingUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('createdUsers', JSON.stringify(existingUsers));

      return true;
    } catch (error) {
      console.error('Create user error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user in localStorage (in a real app, this would be sent to the server)
      const existingUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
      const userIndex = existingUsers.findIndex((existingUser: User) => existingUser.id === userId);
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...userData };
        localStorage.setItem('createdUsers', JSON.stringify(existingUsers));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    createUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ----------------------------------------------------------------------

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
