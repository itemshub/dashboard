import React, { useEffect, useState } from 'react';
import { Card, StatCard, Badge, Container } from '../components/ui';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  AlertTriangle,
  Activity,
  BarChart3,
  Clock
} from 'lucide-react';
import { calculateDashboardStats } from '../data/mockData';
import { dashboard_data } from '@/data/request';

const DashboardPage: React.FC = () => {
  // const stats = calculateDashboardStats();
  const [stats, setStats] = useState<any>({});
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async ()=>
  {
    const datas = await dashboard_data();
    setStats(datas)
  }
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
if (!stats?.lastUpdate) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div
        className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}


  return (
    <div className="space-y-8">
      {/* 欢迎信息 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">数据面板</h1>
        <p className="text-secondary">实时监控CS游戏饰品套利市场数据</p>
      </div>

      {/* 主要统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="平均利差"
          value={`${stats.avgSpread}%`}
          subtitle="所有套利机会的平均利润"
          icon={<TrendingUp size={24} className="text-accent" />}
          trend={{
            value: 2.3,
            isPositive: true
          }}
        />
        
        <StatCard
          title="最大利差"
          value={`${stats.maxSpread}%`}
          subtitle="当前最高套利利润"
          icon={<Target size={24} className="text-success" />}
          trend={{
            value: 5.8,
            isPositive: true
          }}
        />

        <StatCard
          title="高价值饰品"
          value={stats.profitableItems10}
          subtitle=">10%利差饰品数量"
          icon={<AlertTriangle size={24} className="text-warning" />}
        />

        <StatCard
          title="套利机会"
          value={stats.profitablePairs5}
          subtitle=">5%利差套利对数量"
          icon={<Activity size={24} className="text-success" />}
        />
      </div>

      {/* 详细统计信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 套利统计详情 */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 size={24} className="text-accent" />
            <h3 className="text-xl font-semibold text-primary">套利统计详情</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-secondary">5%以上利差饰品</span>
              </div>
              <Badge variant="success" size="md">{stats.profitablePairs5} 个</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-secondary">10%以上利差饰品</span>
              </div>
              <Badge variant="warning" size="md">{stats.profitablePairs10} 个</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-secondary">20%以上利差套利对</span>
              </div>
              <Badge variant="accent" size="md">{stats.profitablePairs20} 个</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-secondary">30%以上利差套利对</span>
              </div>
              <Badge variant="error" size="md">{stats.profitablePairs30} 个</Badge>
            </div>
          </div>
        </Card>

        {/* 系统状态 */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Activity size={24} className="text-success" />
            <h3 className="text-xl font-semibold text-primary">系统状态</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary">数据更新状态</span>
                <Badge variant="success" size="sm">正常</Badge>
              </div>
              <p className="text-muted text-sm">所有交易所数据源连接正常</p>
            </div>
            
            <div className="p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary">监控服务</span>
                <Badge variant="success" size="sm">运行中</Badge>
              </div>
              <p className="text-muted text-sm">实时监控套利机会</p>
            </div>
            
            <div className="p-4 bg-tertiary/20 rounded-neumorphic-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary">今日套利机会</span>
                <Badge variant="accent" size="sm">{stats.profitablePairs5 + stats.profitablePairs10}</Badge>
              </div>
              <p className="text-muted text-sm">发现 {stats.profitablePairs5} 个5%+机会，{stats.profitablePairs10} 个10%+机会</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 市场概况 */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <DollarSign size={24} className="text-accent" />
          <h3 className="text-xl font-semibold text-primary">市场概况</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-tertiary/20 rounded-neumorphic">
            <div className="text-3xl font-bold text-primary mb-2">{stats.raw.skins.length}</div>
            <div className="text-secondary mb-1">监控饰品总数</div>
            <div className="text-muted text-sm">覆盖主流CS游戏武器皮肤</div>
          </div>
          
          <div className="text-center p-6 bg-tertiary/20 rounded-neumorphic">
            <div className="text-3xl font-bold text-primary mb-2">{stats.raw.markets.length}</div>
            <div className="text-secondary mb-1">交易所数量</div>
            <div className="text-muted text-sm">Steam, CS.MONEY, BUFF163, C5Game</div>
          </div>
          
          <div className="text-center p-6 bg-tertiary/20 rounded-neumorphic">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-secondary mb-1">实时监控</div>
            <div className="text-muted text-sm">全天候自动检测套利机会</div>
          </div>
        </div>
      </Card>

      {/* 最近更新时间 */}
      <Card className="p-4">
        <div className="flex items-center justify-center space-x-2 text-secondary">
          <Clock size={16} />
          <span className="text-sm">最后更新时间: {formatTime(stats.lastUpdate)}</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;