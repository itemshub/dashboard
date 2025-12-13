import React, { useState, useMemo, useEffect } from 'react';
import { Card, Table, TableHeader, TableBody, TableCell, Badge, Button, Container } from '../components/ui';
import { Skin } from '../data/mockData';

// 扩展Skin类型以包含maxSpread
interface SkinWithSpread extends Skin {
  maxSpread: number;
}
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  Star,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { dashboard_data } from '@/data/request';

const SkinsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'maxSpread'>('maxSpread');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [skins, setSkins] = useState<any>({});
  const [markets, setMarkets] = useState<any>([]);
  const [stats, setStats] = useState<any>({});
  const [filteredAndSortedSkins , setFilteredAndSortedSkins]= useState<any>([]);
  useEffect(() => {
      loadPageData();
  }, []);
  
  // 计算每个饰品的最大利差
  const calculateMaxSpread = (skin: Skin): number => {
    const prices = Object.values(skin.prices);
    let maxSpread = 0;
    
    for (let i = 0; i < prices.length; i++) {
      for (let j = i + 1; j < prices.length; j++) {
        const spread = ((prices[j].sell - prices[i].buy) / prices[i].buy) * 100;
        maxSpread = Math.max(maxSpread, spread);
      }
    }
    
    return maxSpread;
  };
  const loadPageData = async ()=>
  {
      const datas = await dashboard_data();
      console.log(datas)
      setSkins(datas.raw.skins)
      setMarkets(datas.raw.markets)
      setStats(datas)
      setFilteredAndSortedSkins(setData(datas.raw.skins))
  }

  const setData = (skins:any) =>
  {
    let filtered = skins.filter(skin => {
      const matchesSearch = skin.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skin.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === 'all' || skin.rarity === filterRarity;
      return matchesSearch && matchesRarity;
    });

    // 计算最大利差并添加到对象中
    filtered = filtered.map(skin => ({
      ...skin,
      maxSpread: skin.maxSpread
    })) as SkinWithSpread[];

    // 排序
    filtered.sort((a: SkinWithSpread, b: SkinWithSpread) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.displayName;
          bValue = b.displayName;
          break;
        case 'rarity':
          aValue = a.rarity;
          bValue = b.rarity;
          break;
        case 'maxSpread':
          aValue = a.maxSpread;
          bValue = b.maxSpread;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
    return filtered as SkinWithSpread[];
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


  // 过滤和排序饰品
  // const filteredAndSortedSkins = useMemo((): SkinWithSpread[] => {
  //   let filtered = skins.filter(skin => {
  //     const matchesSearch = skin.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                          skin.name.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesRarity = filterRarity === 'all' || skin.rarity === filterRarity;
  //     return matchesSearch && matchesRarity;
  //   });

  //   // 计算最大利差并添加到对象中
  //   filtered = filtered.map(skin => ({
  //     ...skin,
  //     maxSpread: calculateMaxSpread(skin)
  //   })) as SkinWithSpread[];

  //   // 排序
  //   filtered.sort((a: SkinWithSpread, b: SkinWithSpread) => {
  //     let aValue, bValue;
      
  //     switch (sortBy) {
  //       case 'name':
  //         aValue = a.displayName;
  //         bValue = b.displayName;
  //         break;
  //       case 'rarity':
  //         aValue = a.rarity;
  //         bValue = b.rarity;
  //         break;
  //       case 'maxSpread':
  //         aValue = a.maxSpread;
  //         bValue = b.maxSpread;
  //         break;
  //       default:
  //         return 0;
  //     }

  //     if (typeof aValue === 'string') {
  //       return sortOrder === 'asc' 
  //         ? aValue.localeCompare(bValue as string)
  //         : (bValue as string).localeCompare(aValue);
  //     } else {
  //       return sortOrder === 'asc' 
  //         ? (aValue as number) - (bValue as number)
  //         : (bValue as number) - (aValue as number);
  //     }
  //   });

  //   return filtered as SkinWithSpread[];
  // }, [searchTerm, filterRarity, sortBy, sortOrder]);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Consumer Grade': return 'default';
      case 'Industrial Grade': return 'accent';
      case 'Mil-Spec': return 'success';
      case 'Restricted': return 'warning';
      case 'Classified': return 'error';
      case 'Covert': return 'error';
      case 'Contraband': return 'error';
      default: return 'default';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Covert': return <Star size={14} />;
      case 'Classified': return <Award size={14} />;
      case 'Restricted': return <Shield size={14} />;
      default: return <Zap size={14} />;
    }
  };

  const uniqueRarities = [...new Set(skins.map(skin => skin.rarity))];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary mb-2">饰品列表</h1>
        <p className="text-secondary">查看所有监控的CS游戏饰品及其在各交易所的价格</p>
      </div>

      {/* 搜索和过滤 */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="搜索饰品名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neumorphic-input w-full pl-10 pr-4 py-3"
            />
          </div>

          {/* 稀有度过滤 */}
          {/* <select
            value={filterRarity}
            onChange={(e) => setFilterRarity(e.target.value)}
            className="neumorphic-input px-4 py-3"
          >
            <option value="all">所有稀有度</option>
            {uniqueRarities.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select> */}

          {/* 排序方式 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'rarity' | 'maxSpread')}
            className="neumorphic-input px-4 py-3"
          >
            <option value="maxSpread">按利差排序</option>
            <option value="name">按名称排序</option>
            {/* <option value="rarity">按稀有度排序</option> */}
          </select>

          {/* 排序顺序 */}
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
          <div className="text-2xl font-bold text-primary">{filteredAndSortedSkins.length}</div>
          <div className="text-secondary text-sm">当前显示饰品</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {filteredAndSortedSkins.filter(s => s.maxSpread > 5).length}
          </div>
          <div className="text-secondary text-sm">&gt;5%利差饰品</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {filteredAndSortedSkins.filter(s => s.maxSpread > 10).length}
          </div>
          <div className="text-secondary text-sm">&gt;10%利差饰品</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {filteredAndSortedSkins.length > 0 ? filteredAndSortedSkins[0].maxSpread.toFixed(1) : 0}%
          </div>
          <div className="text-secondary text-sm">最高利差</div>
        </Card>
      </div>

      {/* 饰品表格 */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-tertiary/30">
          <h3 className="text-xl font-semibold text-primary">饰品详细信息</h3>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableCell className="font-semibold text-secondary">饰品信息</TableCell>
              {/* <TableCell className="font-semibold text-secondary">稀有度</TableCell> */}
              {markets.map((mk:any) => (
                <TableCell className="font-semibold text-secondary">{mk.name}</TableCell>
              ))}
              {/* <TableCell className="font-semibold text-secondary">Steam</TableCell>
              <TableCell className="font-semibold text-secondary">CS.MONEY</TableCell>
              <TableCell className="font-semibold text-secondary">BUFF163</TableCell>
              <TableCell className="font-semibold text-secondary">C5Game</TableCell> */}
              <TableCell className="font-semibold text-secondary">最大利差</TableCell>
              {/* <TableCell className="font-semibold text-secondary">操作</TableCell> */}
            </TableHeader>
            <TableBody>
              {filteredAndSortedSkins.map((skin) => (
                <tr key={skin.id} className="hover:bg-tertiary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tertiary rounded-neumorphic-sm flex items-center justify-center">
                        {/* <Eye size={20} className="text-muted" /> */}
                        <img src={skin.imageUrl} style={{maxWidth:"50px",maxHeight:"50px"}} />
                      </div>
                      <div>
                        <div className="font-medium text-primary">{skin.displayName}</div>
                        <div className="text-sm text-secondary">{skin.name}</div>
                        <div className="text-xs text-muted">{skin.collection}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  {/* <TableCell>
                    <Badge 
                      variant={getRarityColor(skin.rarity) as any}
                      size="sm"
                      className="flex items-center space-x-1 w-fit"
                    >
                      {getRarityIcon(skin.rarity)}
                      <span>{skin.rarity}</span>
                    </Badge>
                  </TableCell> */}
{/*                   
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-success font-medium">
                        {formatPrice(skin.prices.steam.buy)}
                      </div>
                      <div className="text-error text-sm">
                        {formatPrice(skin.prices.steam.sell)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-success font-medium">
                        {formatPrice(skin.prices.csmoney.buy)}
                      </div>
                      <div className="text-error text-sm">
                        {formatPrice(skin.prices.csmoney.sell)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-success font-medium">
                        {formatPrice(skin.prices.buff163.buy)}
                      </div>
                      <div className="text-error text-sm">
                        {formatPrice(skin.prices.buff163.sell)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-success font-medium">
                        {formatPrice(skin.prices.c5game.buy)}
                      </div>
                      <div className="text-error text-sm">
                        {formatPrice(skin.prices.c5game.sell)}
                      </div>
                    </div>
                  </TableCell>
                   */}

                  {markets.map((mk:any) => (
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-success font-medium">
                          {formatPrice(skin.prices[mk.market_id]?.maker?skin.prices[mk.market_id]?.maker:0)}
                        </div>
                        <div className="text-error text-sm">
                          {formatPrice(skin.prices[mk.market_id]?.taker?skin.prices[mk.market_id]?.taker:0)}
                        </div>
                      </div>
                    </TableCell>
                  ))}

                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${skin.maxSpread > 10 ? 'text-success' : skin.maxSpread > 5 ? 'text-warning' : 'text-secondary'}`}>
                        {skin.maxSpread.toFixed(1)}%
                      </span>
                      {skin.maxSpread > 10 && <Star size={14} className="text-success" />}
                    </div>
                  </TableCell>
                  
                  {/* <TableCell>
                    <Button variant="ghost" size="sm">
                      查看详情
                    </Button>
                  </TableCell> */}
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* 无结果提示 */}
      {filteredAndSortedSkins.length === 0 && (
        <Card className="p-12 text-center">
          <Search size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary mb-2">未找到匹配的饰品</h3>
          <p className="text-muted">请尝试调整搜索条件或过滤器</p>
        </Card>
      )}
    </div>
  );
};

export default SkinsListPage;