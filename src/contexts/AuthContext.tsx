
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { auth, currentUser } from '../lib/mock-data';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrIndex: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  setNewPassword: (indexNumber: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, we'd check for a saved auth token or session
  useEffect(() => {
    // Simulate loading user from storage
    const loadUser = () => {
      // For demo purposes, auto-login with mock user after a short delay
      setTimeout(() => {
        setUser(null); // Start logged out in our demo
        setIsLoading(false);
      }, 1000);
    };

    loadUser();
  }, []);

  const login = async (emailOrIndex: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if input is an index number (for students)
      const isIndexNumber = /^\d+$/.test(emailOrIndex);
      
      let loggedInUser;
      if (isIndexNumber) {
        // Login with index number (for students)
        loggedInUser = auth.loginWithIndexNumber(emailOrIndex, password);
      } else {
        // Regular login with email
        loggedInUser = auth.login(emailOrIndex, password);
      }
      
      if (loggedInUser) {
        setUser(loggedInUser);
        toast.success(`Welcome back, ${loggedInUser.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const setNewPassword = async (indexNumber: string, newPassword: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = auth.setNewPassword(indexNumber, newPassword);
      
      if (success) {
        toast.success('Password set successfully. You can now login.');
        return true;
      } else {
        toast.error('Failed to set password. Invalid index number.');
        return false;
      }
    } catch (error) {
      toast.error('An error occurred while setting new password');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = auth.register(name, email, password, role);
      setUser(newUser);
      toast.success(`Welcome to Campus Connect, ${newUser.name}!`);
      return true;
    } catch (error) {
      toast.error('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      register,
      logout,
      setNewPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
