import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProfile } from '@/services/authService';
import { getToken, setToken, removeToken } from '@/utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const loginUser = useCallback((token, userData) => {
    setToken(token);
    setUser(userData);
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        removeToken();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
