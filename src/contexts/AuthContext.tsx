import React, { createContext, useContext, useState, ReactNode } from 'react';

// 认证上下文
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 检查本地存储中的登录状态
    return localStorage.getItem('cs-arbitrage-auth') === 'true';
  });

  const login = (username: string, password: string): boolean => {
    // 硬编码的用户名密码验证
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('cs-arbitrage-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cs-arbitrage-auth');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};