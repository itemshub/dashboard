import React, { useEffect, useState } from 'react';
import { Card, Table, TableHeader, TableBody, TableCell, Badge, Button, Container } from '../components/ui';
import { 
  mockMyArbitrages, 
  mockInventory, 
  mockTradeHistory,
  MyArbitrage,
  MyInventory,
  TradeHistory 
} from '../data/mockData';
import { 
  User, 
  Package, 
  History, 
  TrendingUp, 
  TrendingDown,
  Play,
  Pause,
  Square,
  ExternalLink,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { api_account_info, api_account_inventory } from '@/data/request';

type TabType = 'arbitrage' | 'inventory' | 'history';

const MyArbitragePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  const [stats, setStats] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
    useEffect(() => {
      loadPageData();
    }, []);
  
    const loadPageData = async ()=>
    {
      const datas = await api_account_inventory();
      console.log("api_account_inventory",datas)
      if(datas)
      {
        setInventory(datas)
      }
    }
  
    if (inventory?.length ==0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent">
        <div
          className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }


  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play size={14} className="text-success" />;
      case 'paused': return <Pause size={14} className="text-warning" />;
      case 'completed': return <CheckCircle size={14} className="text-success" />;
      case 'pending': return <Clock size={14} className="text-warning" />;
      case 'failed': return <XCircle size={14} className="text-error" />;
      default: return <AlertCircle size={14} className="text-muted" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '执行中';
      case 'paused': return '已暂停';
      case 'completed': return '已完成';
      case 'pending': return '处理中';
      case 'failed': return '失败';
      default: return '未知';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'listing' ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  };

  const getTypeLabel = (type: string) => {
    return type === 'listing' ? '挂单套利' : '吃单套利';
  };

  // 计算统计数据
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.currentValue * item.quantity), 0);
  const totalProfit = inventory.reduce((sum, item) => sum + item.totalProfit, 0);
  const activeArbitrages = mockMyArbitrages.filter(arb => arb.status === 'active').length;
  const completedArbitrages = mockMyArbitrages.filter(arb => arb.status === 'completed').length;
  const recentTrades = mockTradeHistory.filter(trade => trade.status === 'completed').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">库存管理</h1>
        <p className="text-secondary">管理您的库存、套利行为和交易历史</p>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Package size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-primary">{inventory.length}</div>
          <div className="text-secondary text-sm">持有饰品</div>
          <div className="text-sm text-success mt-1">{formatPrice(totalInventoryValue)}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">{activeArbitrages}</div>
          <div className="text-secondary text-sm">执行中套利</div>
          <div className="text-sm text-success mt-1">+{formatPrice(totalProfit)}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">{completedArbitrages}</div>
          <div className="text-secondary text-sm">已完成套利</div>
          <div className="text-sm text-success mt-1">成功率 100%</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <History size={24} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-primary">{mockTradeHistory.length}</div>
          <div className="text-secondary text-sm">持有武器箱</div>
          <div className="text-sm text-success mt-1">本月活跃</div>
        </Card>
      </div>

      {/* 标签页导航 */}
      <Card className="p-2">
        <div className="flex space-x-2">

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-neumorphic transition-all ${
              activeTab === 'inventory' 
                ? 'bg-accent text-white' 
                : 'text-secondary hover:text-primary hover:bg-tertiary/30'
            }`}
          >
            <Package size={18} />
            <span>我的库存</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-neumorphic transition-all ${
              activeTab === 'history' 
                ? 'bg-accent text-white' 
                : 'text-secondary hover:text-primary hover:bg-tertiary/30'
            }`}
          >
            <History size={18} />
            <span>交易历史</span>
          </button>
          <button
            onClick={() => setActiveTab('arbitrage')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-neumorphic transition-all ${
              activeTab === 'arbitrage' 
                ? 'bg-accent text-white' 
                : 'text-secondary hover:text-primary hover:bg-tertiary/30'
            }`}
          >
            <User size={18} />
            <span>我的套利</span>
          </button>
        </div>
      </Card>

      {/* 我的套利 */}
      {activeTab === 'arbitrage' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-tertiary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">当前套利策略</h3>
              <Badge variant="accent" size="md">
                {mockMyArbitrages.length} 个策略
              </Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
                <TableCell className="font-semibold text-secondary">策略类型</TableCell>
                <TableCell className="font-semibold text-secondary">买入市场</TableCell>
                <TableCell className="font-semibold text-secondary">卖出市场</TableCell>
                <TableCell className="font-semibold text-secondary">数量</TableCell>
                <TableCell className="font-semibold text-secondary">目标利润</TableCell>
                <TableCell className="font-semibold text-secondary">当前利润</TableCell>
                <TableCell className="font-semibold text-secondary">状态</TableCell>
                <TableCell className="font-semibold text-secondary">操作</TableCell>
              </TableHeader>
              <TableBody>
                {mockMyArbitrages.map((arbitrage) => (
                  <tr key={arbitrage.id} className="hover:bg-tertiary/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-tertiary rounded-neumorphic-sm flex items-center justify-center">
                          <img 
                            src={arbitrage.skinImage} 
                            alt={arbitrage.skinName}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                            }}
                          />
                          <User size={20} className="text-muted hidden" />
                        </div>
                        <div>
                          <div className="font-medium text-primary">{arbitrage.skinName}</div>
                          <div className="text-sm text-secondary">创建于 {formatDate(arbitrage.createdAt)}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="accent" size="sm" className="flex items-center space-x-1 w-fit">
                        {getTypeIcon(arbitrage.type)}
                        <span>{getTypeLabel(arbitrage.type)}</span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-primary">{arbitrage.buyExchange}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-primary">{arbitrage.sellExchange}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-bold text-primary">{arbitrage.quantity}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-success font-bold">
                        {formatPrice(arbitrage.targetProfit)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className={`font-bold ${
                        arbitrage.currentProfit >= arbitrage.targetProfit ? 'text-success' : 'text-warning'
                      }`}>
                        {formatPrice(arbitrage.currentProfit)}
                      </div>
                      <div className="text-xs text-secondary">
                        {((arbitrage.currentProfit / arbitrage.targetProfit) * 100).toFixed(0)}%
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={getStatusColor(arbitrage.status) as any}
                        size="sm"
                        className="flex items-center space-x-1 w-fit"
                      >
                        {getStatusIcon(arbitrage.status)}
                        <span>{getStatusLabel(arbitrage.status)}</span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex space-x-1">
                        {arbitrage.status === 'active' && (
                          <>
                            <Button variant="warning" size="sm">
                              <Pause size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Square size={14} />
                            </Button>
                          </>
                        )}
                        {arbitrage.status === 'paused' && (
                          <Button variant="success" size="sm">
                            <Play size={14} />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* 我的库存 */}
      {activeTab === 'inventory' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-tertiary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">我的库存</h3>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-secondary">
                  武器箱总价值: <span className="text-success font-bold">{formatPrice(totalInventoryValue)}</span>
                </div>
                <Badge variant="accent" size="md">
                  {inventory.length} 件饰品
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
                <TableCell className="font-semibold text-secondary">数量</TableCell>
                {/* <TableCell className="font-semibold text-secondary">平均成本</TableCell> */}
                <TableCell className="font-semibold text-secondary">当前价值</TableCell>
                <TableCell className="font-semibold text-secondary">总价值</TableCell>
                {/* <TableCell className="font-semibold text-secondary">总利润</TableCell> */}
                {/* <TableCell className="font-semibold text-secondary">交易所</TableCell> */}
                <TableCell className="font-semibold text-secondary">操作</TableCell>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-tertiary/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-tertiary rounded-neumorphic-sm flex items-center justify-center">
                          <img 
                            src={item.skinImage} 
                            alt={item.skinName}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                            }}
                          />
                          <Package size={20} className="text-muted hidden" />
                        </div>
                        <div>
                          <div className="font-medium text-primary">{item.skinName}</div>
                          <div className="text-sm text-secondary">ID: {item.skinId}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-bold text-primary">{item.quantity}</div>
                    </TableCell>
                    
                    {/* <TableCell>
                      <div className="text-secondary">
                        {formatPrice(item.avgBuyPrice)}
                      </div>
                    </TableCell> */}
                    
                    <TableCell>
                      <div className="text-primary font-medium">
                        {formatPrice(item.currentValue)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-bold text-primary">
                        {formatPrice(item.currentValue * item.quantity)}
                      </div>
                    </TableCell>
                    
                    {/* <TableCell>
                      <div className={`font-bold ${
                        item.totalProfit >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {item.totalProfit >= 0 ? '+' : ''}{formatPrice(item.totalProfit)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-secondary">{item.exchange}</div>
                    </TableCell> */}
                    
                    <TableCell>
                      <div className="flex space-x-2">
                        {/* <Button variant="primary" size="sm">
                          出售
                        </Button> */}
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* 交易历史 */}
      {activeTab === 'history' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-tertiary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">交易历史</h3>
              <Badge variant="accent" size="md">
                {mockTradeHistory.length} 笔交易
              </Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
                <TableCell className="font-semibold text-secondary">交易类型</TableCell>
                <TableCell className="font-semibold text-secondary">交易所</TableCell>
                <TableCell className="font-semibold text-secondary">数量</TableCell>
                <TableCell className="font-semibold text-secondary">单价</TableCell>
                <TableCell className="font-semibold text-secondary">总价</TableCell>
                <TableCell className="font-semibold text-secondary">订单号</TableCell>
                <TableCell className="font-semibold text-secondary">时间</TableCell>
                <TableCell className="font-semibold text-secondary">状态</TableCell>
              </TableHeader>
              <TableBody>
                {mockTradeHistory.map((trade) => (
                  <tr key={trade.id} className="hover:bg-tertiary/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-tertiary rounded-neumorphic-sm flex items-center justify-center">
                          <img 
                            src={trade.skinImage} 
                            alt={trade.skinName}
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                            }}
                          />
                          <History size={16} className="text-muted hidden" />
                        </div>
                        <div>
                          <div className="font-medium text-primary text-sm">{trade.skinName}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={trade.type === 'buy' ? 'success' : 'error'}
                        size="sm"
                        className="flex items-center space-x-1 w-fit"
                      >
                        {trade.type === 'buy' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span>{trade.type === 'buy' ? '买入' : '卖出'}</span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-secondary text-sm">{trade.exchange}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-primary font-medium">{trade.quantity}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-primary">
                        {formatPrice(trade.price)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-bold text-primary">
                        {formatPrice(trade.total)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-muted text-xs font-mono">{trade.orderId}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-secondary text-sm">
                        {formatDate(trade.timestamp)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={getStatusColor(trade.status) as any}
                        size="sm"
                        className="flex items-center space-x-1 w-fit"
                      >
                        {getStatusIcon(trade.status)}
                        <span>{getStatusLabel(trade.status)}</span>
                      </Badge>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyArbitragePage;