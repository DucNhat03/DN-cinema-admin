import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get stored users
      const storedUsers = localStorage.getItem('auth_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Find user
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        setIsLoading(false);
        return false;
      }

      // Check password (in real app, this would be hashed)
      const storedPassword = localStorage.getItem(`auth_password_${foundUser.id}`);
      if (storedPassword !== password) {
        setIsLoading(false);
        return false;
      }

      // Login successful
      setUser(foundUser);
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const storedUsers = localStorage.getItem('auth_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if email already exists
      if (users.some(u => u.email === email)) {
        setIsLoading(false);
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: users.length === 0 ? 'admin' : 'user', // First user is admin
        createdAt: new Date().toISOString(),
      };

      // Store user and password
      users.push(newUser);
      localStorage.setItem('auth_users', JSON.stringify(users));
      localStorage.setItem(`auth_password_${newUser.id}`, password);

      // Auto login after registration
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedUser = { ...user, ...data };
      
      // Update in users array
      const storedUsers = localStorage.getItem('auth_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('auth_users', JSON.stringify(users));
      }

      // Update current user
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
