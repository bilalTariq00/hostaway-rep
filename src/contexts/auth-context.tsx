import type { ReactNode } from 'react';

import { useNavigate } from 'react-router';
import React, { useState, useEffect, useContext, createContext } from 'react';

import { API_URL } from 'src/config/environment';

// ----------------------------------------------------------------------

export type UserRole = 'user' | 'team' | 'associate' | 'supervisor' | 'manager' | 'super-admin';

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

  // Check for existing session on mount - verify with backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        try {
          const response = await fetch(`${API_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.user) {
              // Format user data to match User interface
              const userData: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                avatar: data.user.avatar,
                status: data.user.status,
                assignedClients: data.user.assignedClients || [],
                assignedProperties: data.user.assignedProperties || [],
                assignedUsers: data.user.assignedUsers || [],
                assignedManager: data.user.assignedManager,
                assignedSupervisor: data.user.assignedSupervisor,
              };
              localStorage.setItem('user', JSON.stringify(userData));
              setUser(userData);
            } else {
              // Invalid token, clear it
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
            }
          } else {
            // Token invalid or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('authToken');
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
      // Login via API - ONLY users in database can login
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token && data.user) {
        // Save token and user data from backend
        // Backend returns user with 'id' field (MongoDB _id converted to string)
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          avatar: data.user.avatar,
          status: data.user.status,
          assignedClients: data.user.assignedClients || [],
          assignedProperties: data.user.assignedProperties || [],
          assignedUsers: data.user.assignedUsers || [],
          assignedManager: data.user.assignedManager,
          assignedSupervisor: data.user.assignedSupervisor,
        };
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      } else {
        // Login failed - show error message
        console.error('Login failed:', data.message || 'Invalid credentials');
        return false;
      }
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
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // User created successfully in database
        return true;
      } else {
        console.error('Create user failed:', data.message);
        return false;
      }
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
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        // Format and update local user data with backend response
        const updatedUserData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          avatar: data.user.avatar,
          status: data.user.status,
          assignedClients: data.user.assignedClients || [],
          assignedProperties: data.user.assignedProperties || [],
          assignedUsers: data.user.assignedUsers || [],
          assignedManager: data.user.assignedManager,
          assignedSupervisor: data.user.assignedSupervisor,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setUser(updatedUserData);
        return true;
      } else {
        console.error('Update user failed:', data.message);
        return false;
      }
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
