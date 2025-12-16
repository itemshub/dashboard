import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, Container } from '../components/ui';
import { 
  mockExchanges, 
  Exchange 
} from '../data/mockData';
import { 
  Wallet, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CreditCard,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { api_account_info } from '@/data/request';

const BalancePage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'usd' | 'cny'>('usd');

  const [stats, setStats] = useState<any[]>([]);
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async ()=>
  {
    const datas = await api_account_info();
    console.log("api_account_info",datas)
    if(datas)
    {
      setStats(datas)
    }
  }

  if (stats?.length ==0) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div
        className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}
  const formatCurrency = (amount: number, currency: 'usd' | 'cny') => {
    if (currency === 'cny') {
      return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getExchangeIcon = (exchangeName: string) => {
    switch (exchangeName) {
      case 'Steam':
        return (
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
        );
      case 'CS.MONEY':
        return (
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
        );
      case 'BUFF163':
        return (
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
        );
      case 'C5Game':
        return (
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">C5</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-tertiary rounded flex items-center justify-center">
            <Wallet size={16} className="text-muted" />
          </div>
        );
    }
  };

  const totalBalance = stats.reduce((sum, exchange) => sum + exchange.balance[selectedCurrency], 0);
  const totalWithdrawable = stats.reduce((sum, exchange) => sum + exchange.withdrawable[selectedCurrency], 0);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">余额管理</h1>
        <p className="text-secondary">查看和管理您在各交易所的账户余额</p>
      </div>

      {/* 货币选择和总览 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 货币切换 */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">货币单位</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCurrency('usd')}
              className={`flex-1 px-4 py-3 rounded-neumorphic transition-all ${
                selectedCurrency === 'usd' 
                  ? 'bg-accent text-white' 
                  : 'text-secondary hover:text-primary hover:bg-tertiary/30'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <DollarSign size={18} />
                <span>USD</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedCurrency('cny')}
              className={`flex-1 px-4 py-3 rounded-neumorphic transition-all ${
                selectedCurrency === 'cny' 
                  ? 'bg-accent text-white' 
                  : 'text-secondary hover:text-primary hover:bg-tertiary/30'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <CreditCard size={18} />
                <span>CNY</span>
              </div>
            </button>
          </div>
        </Card>

        {/* 总余额 */}
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Wallet size={32} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">总余额</h3>
          <div className="text-3xl font-bold text-primary mb-1">
            {formatCurrency(totalBalance, selectedCurrency)}
          </div>
          <div className="text-secondary text-sm">
            跨所有交易所
          </div>
        </Card>

        {/* 可提现余额 */}
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <TrendingUp size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">可提现余额</h3>
          <div className="text-3xl font-bold text-success mb-1">
            {formatCurrency(totalWithdrawable, selectedCurrency)}
          </div>
          <div className="text-secondary text-sm">
            可用于提取
          </div>
        </Card>
      </div>

      {/* 交易所列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.map((exchange) => (
          <Card key={exchange.name} className="p-6">
            {/* 交易所头部 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {getExchangeIcon(exchange.displayName)}
                <div>
                  <h3 className="text-xl font-semibold text-primary">{exchange.displayName}</h3>
                  <p className="text-secondary text-sm">账户余额</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <ExternalLink size={16} />
                <span>访问</span>
              </Button>
            </div>

            {/* 余额信息 */}
            <div className="space-y-4">
              <div className="p-4 bg-tertiary/20 rounded-neumorphic-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-secondary">当前余额</span>
                  <Badge variant="accent" size="sm">
                    {selectedCurrency.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(exchange.balance[selectedCurrency], selectedCurrency)}
                </div>
              </div>

              <div className="p-4 bg-tertiary/20 rounded-neumorphic-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-secondary">可提现余额</span>
                  <Badge variant="success" size="sm">
                    可提现
                  </Badge>
                </div>
                <div className="text-xl font-bold text-success">
                  {formatCurrency(exchange.withdrawable[selectedCurrency], selectedCurrency)}
                </div>
              </div>
            </div>

            {/* 双币种显示 */}
            <div className="mt-4 p-3 bg-tertiary/10 rounded-neumorphic-sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">USD: </span>
                  <span className="text-primary font-medium">
                    ${exchange.balance.usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-muted">CNY: </span>
                  <span className="text-primary font-medium">
                    ¥{exchange.balance.cny.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-6 flex space-x-3">
              <Button variant="primary" size="sm" className="flex-1">
                <TrendingUp size={16} className="mr-2" />
                充值
              </Button>
              <Button variant="success" size="sm" className="flex-1">
                <TrendingDown size={16} className="mr-2" />
                提现
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* 余额分布图 */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-primary">余额分布</h3>
          <Badge variant="accent" size="md">
            {selectedCurrency.toUpperCase()} 计价
          </Badge>
        </div>
        
        <div className="space-y-4">
          {stats.map((exchange) => {
            const percentage = (exchange.balance[selectedCurrency] / totalBalance) * 100;
            return (
              <div key={exchange.name} className="flex items-center space-x-4">
                <div className="w-32 text-sm text-secondary">{exchange.displayName}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-primary font-medium">
                      {formatCurrency(exchange.balance[selectedCurrency], selectedCurrency)}
                    </span>
                    <span className="text-sm text-secondary">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-tertiary/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 风险提示 */}
      {/* <Card className="p-6 bg-warning/5 border border-warning/20">
        <div className="flex items-start space-x-3">
          <AlertTriangle size={24} className="text-warning mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-warning font-semibold mb-2">余额管理提示</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
              <div>
                <h5 className="font-medium text-primary mb-2">安全建议：</h5>
                <ul className="space-y-1 list-disc list-inside">
                  <li>定期检查各交易所账户余额</li>
                  <li>开启双因素认证保护账户</li>
                  <li>避免在交易所长期存储大量资金</li>
                  <li>注意交易所的提现限制和手续费</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-primary mb-2">套利建议：</h5>
                <ul className="space-y-1 list-disc list-inside">
                  <li>保持各交易所有足够的交易资金</li>
                  <li>监控汇率变化对余额的影响</li>
                  <li>合理分配资金到不同交易所</li>
                  <li>关注交易所的政策变化</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card> */}

      {/* 最近活动 */}
      {/* <Card className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-6">最近余额变动</h3>
        <div className="space-y-4">
          {[
            { type: 'deposit', exchange: 'Steam', amount: 500, currency: 'USD', time: '2小时前', status: 'completed' },
            { type: 'withdraw', exchange: 'CS.MONEY', amount: 200, currency: 'USD', time: '5小时前', status: 'completed' },
            { type: 'transfer', exchange: 'BUFF163', amount: 1500, currency: 'CNY', time: '1天前', status: 'pending' },
            { type: 'deposit', exchange: 'C5Game', amount: 300, currency: 'USD', time: '2天前', status: 'completed' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-neumorphic-sm ${
                  activity.type === 'deposit' ? 'bg-success/20' :
                  activity.type === 'withdraw' ? 'bg-error/20' : 'bg-warning/20'
                }`}>
                  {activity.type === 'deposit' ? <TrendingUp size={16} className="text-success" /> :
                   activity.type === 'withdraw' ? <TrendingDown size={16} className="text-error" /> :
                   <Shield size={16} className="text-warning" />}
                </div>
                <div>
                  <div className="font-medium text-primary">
                    {activity.type === 'deposit' ? '充值' : 
                     activity.type === 'withdraw' ? '提现' : '转账'} {activity.exchange}
                  </div>
                  <div className="text-sm text-secondary">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${
                  activity.type === 'deposit' ? 'text-success' : 'text-error'
                }`}>
                  {activity.type === 'deposit' ? '+' : '-'}${activity.amount}
                </div>
                <Badge 
                  variant={activity.status === 'completed' ? 'success' : 'warning'}
                  size="sm"
                  className="flex items-center space-x-1 w-fit ml-auto"
                >
                  {activity.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  <span>{activity.status === 'completed' ? '已完成' : '处理中'}</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card> */}
    </div>
  );
};

export default BalancePage;