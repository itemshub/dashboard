import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NavItem, Container } from '../ui';
import { 
  BarChart3, 
  Shield, 
  TrendingUp, 
  Zap, 
  Wallet, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

// 导航项目
const navItems = [
  { path: '/dashboard', label: '数据面板', icon: <BarChart3 size={20} /> },
  { path: '/skins', label: '饰品列表', icon: <Shield size={20} /> },
  { path: '/listing-arbitrage', label: '挂单套利', icon: <TrendingUp size={20} /> },
  { path: '/instant-arbitrage', label: '吃单套利', icon: <Zap size={20} /> },
  { path: '/my-arbitrage', label: '我的库存', icon: <User size={20} /> },
  { path: '/balance', label: '余额管理', icon: <Wallet size={20} /> },
];

const MainLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const authDenyList = [
    'my-arbitrage',
    'balance',
  ];
  // 判断当前路径是否命中 deny list
  const isDenied = authDenyList.some((path) =>
    location.pathname.includes(path)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false); // 移动端关闭侧边栏
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {/* 侧边栏 */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="neumorphic h-full flex flex-col">
          {/* Logo 区域 */}
          <div className="p-6 border-b border-tertiary/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-neumorphic-sm flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">饰集套利</h1>
                <p className="text-sm text-secondary">CS 武器箱管理</p>
              </div>
            </div>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                href={item.path}
                icon={item.icon}
                isActive={location.pathname === item.path}
                onClick={() => handleNavClick(item.path)}
              />
            ))}
          </nav>

          {/* 退出按钮 */}
          <div className="p-4 border-t border-tertiary/30" style={
            {
              display:isDenied?"":"none"
            }
          }>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-neumorphic text-secondary hover:text-error hover:bg-error/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* 顶部导航栏 */}
        <header className="neumorphic-nav p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* 移动端菜单按钮 */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden neumorphic-button p-2"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {navItems.find(item => item.path === location.pathname)?.label || '数据面板'}
                </h2>
                <p className="text-secondary text-sm">
                  实时监控CS游戏饰品套利机会
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-secondary">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span>系统运行中</span>
              </div>
              
              <div className="neumorphic-badge text-success">
                实时更新
              </div>
            </div>
          </div>
        </header>

        {/* 主内容 */}
        <main className="flex-1">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>

      {/* 移动端遮罩 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;