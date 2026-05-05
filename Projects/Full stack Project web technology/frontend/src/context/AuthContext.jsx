import { createContext, useEffect, useState } from 'react';
import { loginUser, registerUser, setAuthToken } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('lab-auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAuthToken(parsed.token);
      return parsed;
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lab-auth', JSON.stringify(user));
      setAuthToken(user.token);
    } else {
      localStorage.removeItem('lab-auth');
      setAuthToken(null);
    }
  }, [user]);

  const login = async (payload) => {
    const data = await loginUser(payload);
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    setUser(data);
    return data;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
