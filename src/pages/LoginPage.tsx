import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card, Container } from '../components/ui';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模拟登录延迟
    const success = await login(username, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('用户名或密码错误，请重试');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-20 h-20 bg-accent rounded-neumorphic-lg flex items-center justify-center mx-auto mb-4">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">饰集套利</h1>
          <p className="text-secondary">CS游戏武器箱多交易所套利管理面板</p>
        </div>

        {/* 登录表单 */}
        <Card className="p-8 animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-primary">管理员登录</h2>
              <p className="text-secondary text-sm mt-1">
                请输入您的用户名和密码
              </p>
            </div>

            {/* 用户名输入 */}
            <div className="space-y-2">
              <label className="text-secondary text-sm font-medium">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label className="text-secondary text-sm font-medium">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* 错误信息 */}
            {error && (
              <div className="flex items-center space-x-2 text-error text-sm p-3 bg-error/10 rounded-neumorphic-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* 登录按钮 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                '登录'
              )}
            </Button>

            {/* 提示信息 */}
            <div className="text-center">
              <div className="neumorphic-badge text-muted text-xs">
                本平台已关闭测试账户 
              </div>
            </div>
          </form>
        </Card>

        {/* 底部信息 */}
        <div className="text-center mt-8 text-muted text-sm animate-fade-in-up">
          <p>© 2025 饰集套利管理系统</p>
          <p className="mt-1">专业的CS游戏饰品套利分析工具</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;