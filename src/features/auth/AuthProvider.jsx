import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../../utils/storage';

// Session timeout in seconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60;

const AuthContext = createContext(null);

// Role-based access control configuration
const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  CLIENT: 'client',
};

const ROLE_HIERARCHY = {
  [ROLES.USER]: [ROLES.USER],
  [ROLES.ADMIN]: [ROLES.USER, ROLES.ADMIN],
  [ROLES.CLIENT]: [ROLES.USER, ROLES.CLIENT],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = storage.get('auth_user');
    const session = storage.get('auth_session');
    
    // Validate session
    if (!storedUser || !session || session.expiresAt < Date.now()) {
      storage.remove('auth_user');
      storage.remove('auth_session');
      return null;
    }
    
    return storedUser;
  });
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = storage.get('auth_session');
        if (session && session.expiresAt > Date.now()) {
          setSessionExpiry(new Date(session.expiresAt));
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsInitializing(false);
      }
    };
    
    checkAuth();
    
    // Set up session timeout check
    const interval = setInterval(() => {
      const session = storage.get('auth_session');
      if (session && session.expiresAt < Date.now()) {
        logout();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Update session expiry in state when it changes
  useEffect(() => {
    if (isAuthenticated) {
      const session = storage.get('auth_session');
      setSessionExpiry(session ? new Date(session.expiresAt) : null);
    } else {
      setSessionExpiry(null);
    }
  }, [isAuthenticated]);
  
  // Check if user has required role
  const hasRole = useCallback((requiredRole) => {
    if (!user || !user.role) return false;
    return ROLE_HIERARCHY[user.role]?.includes(requiredRole) || false;
  }, [user]);
  
  // Check if user has any of the required roles
  const hasAnyRole = useCallback((requiredRoles = []) => {
    if (!user || !user.role) return false;
    return requiredRoles.some(role => hasRole(role));
  }, [user, hasRole]);
  
  // Check if user has all of the required roles
  const hasAllRoles = useCallback((requiredRoles = []) => {
    if (!user || !user.role) return false;
    return requiredRoles.every(role => hasRole(role));
  }, [user, hasRole]);
  
  // Login function
  const login = useCallback(async (credentials) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/auth/login', credentials);
      
      // Simulated API response
      const response = {
        data: {
          user: {
            id: `user-${Date.now()}`,
            email: credentials.email,
            role: credentials.role,
            name: credentials.name || 'User',
            institution: credentials.institution || null,
            preferences: {
              theme: 'light',
              notifications: true,
              language: 'en',
            },
          },
          token: `mock-jwt-token-${Date.now()}`,
          expiresIn: SESSION_TIMEOUT,
        },
      };
      
      const { user: userData, token, expiresIn } = response.data;
      const expiresAt = Date.now() + expiresIn * 1000;
      
      // Store user and session data
      storage.set('auth_user', userData);
      storage.set('auth_session', { token, expiresAt }, expiresIn);
      
      setUser(userData);
      setIsAuthenticated(true);
      setSessionExpiry(new Date(expiresAt));
      
      // Redirect based on role
      const from = location.state?.from?.pathname || `/${userData.role === 'user' ? 'user' : userData.role}`;
      navigate(from, { replace: true });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  }, [navigate, location]);
  
  // Logout function
  const logout = useCallback((options = {}) => {
    const { redirectTo = '/login' } = options;
    
    // Clear auth data
    storage.remove('auth_user');
    storage.remove('auth_session');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setSessionExpiry(null);
    
    // Redirect to login page
    if (redirectTo) {
      navigate(redirectTo, { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [navigate, location]);
  
  // Refresh session
  const refreshSession = useCallback(async () => {
    try {
      // In a real app, this would refresh the token
      // const response = await api.post('/auth/refresh');
      
      const session = storage.get('auth_session');
      if (!session) throw new Error('No active session');
      
      // Extend the session
      const expiresAt = Date.now() + SESSION_TIMEOUT * 1000;
      storage.set('auth_session', { ...session, expiresAt }, SESSION_TIMEOUT);
      setSessionExpiry(new Date(expiresAt));
      
      return { success: true };
    } catch (error) {
      console.error('Session refresh failed:', error);
      logout({ redirectTo: '/login?session=expired' });
      return { success: false, error: 'Session expired. Please log in again.' };
    }
  }, [logout]);
  
  // Update user data
  const updateUser = useCallback((updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    storage.set('auth_user', updatedUser);
  }, [user]);
  
  // Context value
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isInitializing,
    sessionExpiry,
    login,
    logout,
    refreshSession,
    updateUser,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  }), [user, isAuthenticated, isInitializing, sessionExpiry, login, logout, refreshSession, updateUser, hasRole, hasAnyRole, hasAllRoles]);
  
  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for role-based access control
export function withRole(Component, requiredRole) {
  return function WithRoleWrapper(props) {
    const { hasRole, isInitializing, logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isInitializing && !hasRole(requiredRole)) {
        // Redirect to unauthorized or login page
        navigate('/unauthorized', { replace: true });
      }
    }, [hasRole, isInitializing, navigate]);
    
    if (isInitializing || !hasRole(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}

// Custom hook for route protection
export function useProtectedRoute(requiredRole) {
  const { hasRole, isInitializing, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isInitializing) {
      if (!isAuthenticated) {
        navigate('/login', { 
          state: { from: window.location.pathname },
          replace: true 
        });
      } else if (requiredRole && !hasRole(requiredRole)) {
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [hasRole, isInitializing, isAuthenticated, navigate, requiredRole]);
  
  return { isAuthorized: hasRole(requiredRole), isInitializing };
}
