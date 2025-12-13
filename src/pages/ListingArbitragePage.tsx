import React, { useState, useMemo, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableCell, Badge, Button, Container } from '../components/ui';
import { mockArbitrageOpportunities, ArbitrageOpportunity } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  ExternalLink,
  AlertTriangle,
  Shield,
  Clock,
  Target,
  DollarSign
} from 'lucide-react';
import { dashboard_data } from '@/data/request';

const ListingArbitragePage: React.FC = () => {
  const [minProfit, setMinProfit] = useState(0);
  const [maxProfit, setMaxProfit] = useState(100);
  const [sortBy, setSortBy] = useState<'profit' | 'profitPercentage'>('profitPercentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [skins, setSkins] = useState<any>({});
    const [markets, setMarkets] = useState<any>([]);
    const [stats, setStats] = useState<any>({});
    const [filteredOpportunities , setFilteredOpportunities]= useState<any>([]);
    useEffect(() => {
        if (!stats?.lastUpdate) {
          loadPageData();
        }else{
          setFilteredOpportunities(setData(stats.raw.profitAble))
        }
    }, [minProfit, maxProfit, sortBy, sortOrder]);
    const loadPageData = async ()=>
    {
        const datas = await dashboard_data();
        console.log(datas)
        setSkins(datas.raw.skins)
        setMarkets(datas.raw.markets)
        setStats(datas)
        setFilteredOpportunities(setData(datas.raw.profitAble))
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
  

  // 过滤挂单套利机会
  // const filteredOpportunities = useMemo(() => {
  //   return mockArbitrageOpportunities
  //     .filter(opp => opp.type === 'listing')
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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <Shield size={14} />;
      case 'medium': return <AlertTriangle size={14} />;
      case 'high': return <TrendingDown size={14} />;
      default: return <Target size={14} />;
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '低风险';
      case 'medium': return '中风险';
      case 'high': return '高风险';
      default: return '未知';
    }
  };

  const totalProfit = filteredOpportunities.reduce((sum, opp) => sum + opp.profit, 0);
  const avgProfitPercentage = filteredOpportunities.length > 0 
    ? filteredOpportunities.reduce((sum, opp) => sum + opp.profitPercentage, 0) / filteredOpportunities.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">挂单套利列表</h1>
        <p className="text-secondary">基于两边挂单价的套利机会，发现低风险高收益的投资机会</p>
      </div>

      {/* 过滤器 */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
            <Target size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-primary">{filteredOpportunities.length}</div>
          <div className="text-secondary text-sm">套利机会</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">{formatPrice(totalProfit)}</div>
          <div className="text-secondary text-sm">潜在总利润</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp size={24} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-primary">{avgProfitPercentage.toFixed(1)}%</div>
          <div className="text-secondary text-sm">平均利差</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-primary">
            {filteredOpportunities.filter(opp => opp.riskLevel === 'low').length}
          </div>
          <div className="text-secondary text-sm">低风险机会</div>
        </Card>
      </div>

      {/* 套利机会列表 */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-tertiary/30">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-primary">挂单套利机会</h3>
            <Badge variant="accent" size="md">
              {filteredOpportunities.length} 个机会
            </Badge>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
              <TableCell className="font-semibold text-secondary">买入市场</TableCell>
              <TableCell className="font-semibold text-secondary">买入价格</TableCell>
              <TableCell className="font-semibold text-secondary">卖出市场</TableCell>
              <TableCell className="font-semibold text-secondary">卖出价格</TableCell>
              <TableCell className="font-semibold text-secondary">利润</TableCell>
              <TableCell className="font-semibold text-secondary">利差</TableCell>
              <TableCell className="font-semibold text-secondary">风险等级</TableCell>
              <TableCell className="font-semibold text-secondary">操作</TableCell>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity,index) => (
                <tr key={opportunity.id+String(index)} className="hover:bg-tertiary/20 transition-colors">
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
                        <Target size={20} className="text-muted hidden" />
                      </div>
                      <div>
                        <div className="font-medium text-primary">{opportunity.skinName}</div>
                        <div className="text-sm text-secondary">ID: {opportunity.skinId}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-primary font-medium">{opportunity.buyExchange}</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-success font-bold">
                      {formatPrice(opportunity.buyPrice)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-primary font-medium">{opportunity.sellExchange}</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-error font-bold">
                      {formatPrice(opportunity.sellPrice)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-success font-bold">
                      {formatPrice(opportunity.profit)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-lg ${
                        opportunity.profitPercentage > 10 ? 'text-success' : 
                        opportunity.profitPercentage > 5 ? 'text-warning' : 'text-accent'
                      }`}>
                        {opportunity.profitPercentage.toFixed(1)}%
                      </span>
                      {opportunity.profitPercentage > 10 && (
                        <Badge variant="success" size="sm">优质</Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={getRiskColor(opportunity.riskLevel) as any}
                      size="sm"
                      className="flex items-center space-x-1 w-fit"
                    >
                      {getRiskIcon(opportunity.riskLevel)}
                      <span>{getRiskLabel(opportunity.riskLevel)}</span>
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="primary" size="sm">
                        执行套利
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
          <TrendingUp size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary mb-2">暂无符合条件的套利机会</h3>
          <p className="text-muted">请尝试调整利差范围或筛选条件</p>
        </Card>
      )}

      {/* 风险提示 */}
      <Card className="p-6 bg-warning/5 border border-warning/20">
        <div className="flex items-start space-x-3">
          <AlertTriangle size={24} className="text-warning mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-warning font-semibold mb-2">风险提示</h4>
            <ul className="text-secondary text-sm space-y-1">
              <li>• 挂单套利需要时间等待订单成交，可能面临价格波动风险</li>
              <li>• 建议在价格差异较大且风险等级较低的机会中进行操作</li>
              <li>• 请确保在执行前检查相关交易所的费率政策</li>
              <li>• 套利机会具有时效性，建议及时关注市场变化</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingArbitragePage;