import React, { useState, useMemo, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableCell, Badge, Button, Container } from '../components/ui';
import { mockArbitrageOpportunities, ArbitrageOpportunity } from '../data/mockData';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  ExternalLink,
  Shield,
  Clock,
  Target,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { dashboard_data } from '@/data/request';

const InstantArbitragePage: React.FC = () => {
  const [minProfit, setMinProfit] = useState(5);
  const [maxProfit, setMaxProfit] = useState(100);
  const [sortBy, setSortBy] = useState<'profit' | 'profitPercentage'>('profitPercentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [limitFrom, setLimitFrom] = useState("");
  const [limitTo, setLimitTo] = useState("");

  const [skins, setSkins] = useState<any>({});
  const [markets, setMarkets] = useState<any>([]);
  const [stats, setStats] = useState<any>({});
  const [filteredOpportunities , setFilteredOpportunities]= useState<any>([]);
  useEffect(() => {
      if (!stats?.lastUpdate) {
        loadPageData();
      }else{
        setFilteredOpportunities(setData(stats.raw.profitAbleMaker))
      }
  }, [minProfit, maxProfit, sortBy, sortOrder,limitFrom,limitTo]);
  const loadPageData = async ()=>
  {
      const datas = await dashboard_data();
      console.log(datas)
      setSkins(datas.raw.skins)
      setMarkets(datas.raw.markets)
      setStats(datas)
      setFilteredOpportunities(setData(datas.raw.profitAbleMaker))
  }

  const setData = (skins:any) =>
  {
    return skins
      // .filter(opp => opp.type === 'listing')
      .filter(opp => {
        const meetsMin = opp.profitPercentage >= minProfit;
        const meetsMax = opp.profitPercentage <= maxProfit;
        return meetsMin && meetsMax;
      })
      .filter(opp => {
        if(String(opp.buyExchange).toLowerCase().includes((limitFrom).toLowerCase()))
        {
          return opp;
        }
      })
      .filter(opp => {
        if(String(opp.sellExchange).toLowerCase().includes((limitTo).toLowerCase()))
          {
            return opp;
          }
        })
      .sort((a, b) => {
        const aValue = sortBy === 'profit' ? a.profit : a.profitPercentage;
        const bValue = sortBy === 'profit' ? b.profit : b.profitPercentage;
        
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
  }
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
    
  

  // 过滤吃单套利机会
  // const filteredOpportunities = useMemo(() => {
  //   return mockArbitrageOpportunities
  //     .filter(opp => opp.type === 'instant')
  //     .filter(opp => {
  //       const meetsMin = opp.profitPercentage >= minProfit;
  //       const meetsMax = opp.profitPercentage <= maxProfit;
  //       return meetsMin && meetsMax;
  //     })
  //     .sort((a, b) => {
  //       const aValue = sortBy === 'profit' ? a.profit : a.profitPercentage;
  //       const bValue = sortBy === 'profit' ? b.profit : b.profitPercentage;
        
  //       return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  //     });
  // }, [minProfit, maxProfit, sortBy, sortOrder]);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalProfit = filteredOpportunities.reduce((sum, opp) => sum + opp.profit, 0);
  const avgProfitPercentage = filteredOpportunities.length > 0 
    ? filteredOpportunities.reduce((sum, opp) => sum + opp.profitPercentage, 0) / filteredOpportunities.length 
    : 0;
  const highProfitCount = filteredOpportunities.filter(opp => opp.profitPercentage > 15).length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">吃单套利列表</h1>
        <p className="text-secondary">基于买入市场挂单价和卖出市场吃单价的无风险套利机会</p>
      </div>

      {/* 特性介绍 */}
      <Card className="p-6 bg-success/5 border border-success/20">
        <div className="flex items-start space-x-3">
          <CheckCircle size={24} className="text-success mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-success font-semibold mb-2">吃单套利优势</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary">
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-success" />
                <span>即时成交，无等待时间</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-success" />
                <span>无价格波动风险</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target size={16} className="text-success" />
                <span>确定性利润回报</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 过滤器 */}
      <Card className="p-6">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 items-end">
          <div>
            <label className="text-secondary text-sm font-medium mb-2 block">
              最低利差 (%)
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={minProfit}
              onChange={(e) => setMinProfit(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-primary font-medium mt-1">{minProfit}%</div>
          </div>

          <div>
            <label className="text-secondary text-sm font-medium mb-2 block">
              最高利差 (%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={maxProfit}
              onChange={(e) => setMaxProfit(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-primary font-medium mt-1">{maxProfit}%</div>
          </div>

          <div>
            <label className="text-secondary text-sm font-medium mb-2 block">
              排序方式
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'profit' | 'profitPercentage')}
              className="neumorphic-input w-full px-4 py-3"
            >
              <option value="profitPercentage">按利差排序</option>
              <option value="profit">按利润排序</option>
            </select>
          </div>
          <div>
            <label className="text-secondary text-sm font-medium mb-2 block">
              购买市场
            </label>
            <select
              value={limitFrom}
              onChange={(e) => setLimitFrom(e.target.value)}
              className="neumorphic-input w-full px-4 py-3"
            >
              <option value="">无限制</option>
              {markets.map((mk,index) => (
              <option value={mk.market_id}>{mk.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-secondary text-sm font-medium mb-2 block">
              卖出市场
            </label>
            <select
              value={limitTo}
              onChange={(e) => setLimitTo(e.target.value)}
              className="neumorphic-input w-full px-4 py-3"
            >
              <option value="">无限制</option>
              {markets.map((mk,index) => (
              <option value={mk.market_id}>{mk.name}</option>
              ))}
            </select>
          </div>

          <Button
            variant="secondary"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2"
          >
            {sortOrder === 'asc' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{sortOrder === 'asc' ? '升序' : '降序'}</span>
          </Button>
        </div>
      </Card>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-primary">{filteredOpportunities.length}</div>
          <div className="text-secondary text-sm">即时套利机会</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">{formatPrice(totalProfit)}</div>
          <div className="text-secondary text-sm">即时总利润</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp size={24} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-primary">{avgProfitPercentage.toFixed(1)}%</div>
          <div className="text-secondary text-sm">平均即时利差</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">{highProfitCount}</div>
          <div className="text-secondary text-sm">高收益机会 (&gt;15%)</div>
        </Card>
      </div>

      {/* 套利机会列表 */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-tertiary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap size={24} className="text-accent" />
              <h3 className="text-xl font-semibold text-primary">即时套利机会</h3>
            </div>
            <Badge variant="accent" size="md">
              {filteredOpportunities.length} 个机会
            </Badge>
          </div>
          <p className="text-secondary text-sm mt-2">
            这些机会基于即时买入和卖出价格，可以立即执行获得确定利润
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
              <TableCell className="font-semibold text-secondary">买入市场</TableCell>
              <TableCell className="font-semibold text-secondary">挂单价格</TableCell>
              <TableCell className="font-semibold text-secondary">卖出市场</TableCell>
              <TableCell className="font-semibold text-secondary">吃单价格</TableCell>
              <TableCell className="font-semibold text-secondary">即时利润</TableCell>
              <TableCell className="font-semibold text-secondary">即时利差</TableCell>
              <TableCell className="font-semibold text-secondary">状态</TableCell>
              <TableCell className="font-semibold text-secondary">操作</TableCell>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-tertiary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tertiary rounded-neumorphic-sm flex items-center justify-center">
                        <img 
                          src={opportunity.skinImage} 
                          alt={opportunity.skinName}
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                          }}
                        />
                        <Zap size={20} className="text-muted hidden" />
                      </div>
                      <div>
                        <div className="font-medium text-primary">{opportunity.skinName}</div>
                        <div className="text-sm text-secondary">ID: {opportunity.skinId}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-primary font-medium">{opportunity.buyExchange}</div>
                    <div className="text-xs text-muted">挂单买入</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-warning font-bold">
                      {formatPrice(opportunity.buyPrice)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-primary font-medium">{opportunity.sellExchange}</div>
                    <div className="text-xs text-muted">即时卖出</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-success font-bold">
                      {formatPrice(opportunity.sellPrice)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-success font-bold text-lg">
                      {formatPrice(opportunity.profit)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-lg ${
                        opportunity.profitPercentage > 15 ? 'text-success' : 
                        opportunity.profitPercentage > 10 ? 'text-warning' : 'text-accent'
                      }`}>
                        {opportunity.profitPercentage.toFixed(1)}%
                      </span>
                      {opportunity.profitPercentage > 15 && (
                        <Badge variant="success" size="sm">优质</Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success" size="sm" className="flex items-center space-x-1">
                        <CheckCircle size={12} />
                        <span>可执行</span>
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="primary" size="sm" className="bg-success hover:bg-success/80">
                        <Zap size={14} className="mr-1" />
                        立即执行
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* 无结果提示 */}
      {filteredOpportunities.length === 0 && (
        <Card className="p-12 text-center">
          <Zap size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary mb-2">暂无符合条件的即时套利机会</h3>
          <p className="text-muted">请尝试调整利差范围或筛选条件</p>
        </Card>
      )}

      {/* 操作指南 */}
      <Card className="p-6 bg-accent/5 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Target size={24} className="text-accent mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-accent font-semibold mb-2">操作指南</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
              <div>
                <h5 className="font-medium text-primary mb-2">执行步骤：</h5>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>选择合适的即时套利机会</li>
                  <li>确认买入市场的挂单价格</li>
                  <li>确认卖出市场的即时价格</li>
                  <li>检查账户余额是否充足</li>
                  <li>同时执行买入和卖出操作</li>
                </ol>
              </div>
              <div>
                <h5 className="font-medium text-primary mb-2">注意事项：</h5>
                <ul className="space-y-1 list-disc list-inside">
                  <li>需要同时监控两个交易所</li>
                  <li>注意交易所的手续费成本</li>
                  <li>确保操作速度足够快</li>
                  <li>准备好充足的交易资金</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InstantArbitragePage;