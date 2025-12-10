import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// 页面组件
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SkinsListPage from './pages/SkinsListPage';
import ListingArbitragePage from './pages/ListingArbitragePage';
import InstantArbitragePage from './pages/InstantArbitragePage';
import MyArbitragePage from './pages/MyArbitragePage';
import BalancePage from './pages/BalancePage';

// 布局组件
import MainLayout from './components/layout/MainLayout';

// 受保护的路由组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// 公共路由组件
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// 路由配置
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 公共路由 */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      
      {/* 受保护的路由 */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="skins" element={<SkinsListPage />} />
        <Route path="listing-arbitrage" element={<ListingArbitragePage />} />
        <Route path="instant-arbitrage" element={<InstantArbitragePage />} />
        <Route path="my-arbitrage" element={<MyArbitragePage />} />
        <Route path="balance" element={<BalancePage />} />
      </Route>
      
      {/* 默认重定向 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

// 主应用组件
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary text-primary">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;