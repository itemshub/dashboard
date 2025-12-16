import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api_login } from '@/data/request';
// 认证上下文
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import SparkMD5 from 'spark-md5';

export const md5 = (str: string): string => {
  return SparkMD5.hash(String(str));
};


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

  const login = async (username: string, password: string): Promise<boolean> => {
    const doLogin = await api_login(username,md5(password));
    console.log("doLogin",doLogin)

    if(doLogin)
    {
      setIsAuthenticated(true);
      localStorage.setItem('cs-arbitrage-auth', doLogin);
      return true;
    }
    // 硬编码的用户名密码验证
    // if (username === 'admin' && password === 'admin123') {
    //   setIsAuthenticated(true);
    //   localStorage.setItem('cs-arbitrage-auth', 'true');
    //   return true;
    // }
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