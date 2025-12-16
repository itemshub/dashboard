// 模拟数据文件
export interface Skin {
  id: string;
  name: string;
  displayName: string;
  rarity: 'Consumer Grade' | 'Industrial Grade' | 'Mil-Spec' | 'Restricted' | 'Classified' | 'Covert' | 'Contraband';
  collection: string;
  float: number;
  imageUrl: string;
  prices: {
    steam: {
      buy: number;
      sell: number;
      lastUpdate: string;
    };
    csmoney: {
      buy: number;
      sell: number;
      lastUpdate: string;
    };
    buff163: {
      buy: number;
      sell: number;
      lastUpdate: string;
    };
    c5game: {
      buy: number;
      sell: number;
      lastUpdate: string;
    };
  };
}

export interface ArbitrageOpportunity {
  id: string;
  skinId: string;
  skinName: string;
  skinImage: string;
  buyExchange: string;
  buyPrice: number;
  sellExchange: string;
  sellPrice: number;
  profit: number;
  profitPercentage: number;
  type: 'listing' | 'instant'; // 挂单套利 vs 吃单套利
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface Exchange {
  name: string;
  displayName: string;
  balance: {
    usd: number;
    cny: number;
  };
  withdrawable: {
    usd: number;
    cny: number;
  };
  url: string;
  color: string;
}

export interface MyInventory {
  id: string;
  skinId: string;
  skinName: string;
  skinImage: string;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  exchange: string;
  totalProfit: number;
}

export interface TradeHistory {
  id: string;
  type: 'buy' | 'sell';
  skinName: string;
  skinImage: string;
  exchange: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
  orderId: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface MyArbitrage {
  id: string;
  skinName: string;
  skinImage: string;
  type: 'listing' | 'instant';
  buyExchange: string;
  sellExchange: string;
  quantity: number;
  targetProfit: number;
  currentProfit: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

// 模拟饰品数据
export const mockSkins: Skin[] = [
  {
    id: 'skin-001',
    name: 'AK-47 | Fire Serpent',
    displayName: 'AK-47 | 火蛇',
    rarity: 'Covert',
    collection: 'The Fire Serpent Collection',
    float: 0.12,
    imageUrl: '/images/ak47-fire-serpent.jpg',
    prices: {
      steam: { buy: 1250.00, sell: 1180.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 1150.00, sell: 1080.00, lastUpdate: '2025-12-09T15:25:00Z' },
      buff163: { buy: 1100.00, sell: 1050.00, lastUpdate: '2025-12-09T15:28:00Z' },
      c5game: { buy: 1120.00, sell: 1060.00, lastUpdate: '2025-12-09T15:26:00Z' }
    }
  },
  {
    id: 'skin-002',
    name: 'AWP | Dragon Lore',
    displayName: 'AWP | 龙之传说',
    rarity: 'Covert',
    collection: 'The Cobblestone Collection',
    float: 0.08,
    imageUrl: '/images/awp-dragon-lore.jpg',
    prices: {
      steam: { buy: 4500.00, sell: 4200.00, lastUpdate: '2025-12-09T15:29:00Z' },
      csmoney: { buy: 4100.00, sell: 3900.00, lastUpdate: '2025-12-09T15:27:00Z' },
      buff163: { buy: 4000.00, sell: 3800.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 4050.00, sell: 3850.00, lastUpdate: '2025-12-09T15:30:00Z' }
    }
  },
  {
    id: 'skin-003',
    name: 'M4A4 | Howl',
    displayName: 'M4A4 | 咆哮',
    rarity: 'Covert',
    collection: 'The Huntsman Collection',
    float: 0.15,
    imageUrl: '/images/m4a4-howl.jpg',
    prices: {
      steam: { buy: 1800.00, sell: 1700.00, lastUpdate: '2025-12-09T15:28:00Z' },
      csmoney: { buy: 1650.00, sell: 1550.00, lastUpdate: '2025-12-09T15:26:00Z' },
      buff163: { buy: 1600.00, sell: 1500.00, lastUpdate: '2025-12-09T15:29:00Z' },
      c5game: { buy: 1620.00, sell: 1520.00, lastUpdate: '2025-12-09T15:27:00Z' }
    }
  },
  {
    id: 'skin-004',
    name: 'AK-47 | Asiimov',
    displayName: 'AK-47 | 阿西莫夫',
    rarity: 'Classified',
    collection: 'The Phoenix Collection',
    float: 0.32,
    imageUrl: '/images/ak47-asiimov.jpg',
    prices: {
      steam: { buy: 380.00, sell: 360.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 350.00, sell: 330.00, lastUpdate: '2025-12-09T15:28:00Z' },
      buff163: { buy: 340.00, sell: 320.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 345.00, sell: 325.00, lastUpdate: '2025-12-09T15:29:00Z' }
    }
  },
  {
    id: 'skin-005',
    name: 'AWP | Asiimov',
    displayName: 'AWP | 阿西莫夫',
    rarity: 'Classified',
    collection: 'The Phoenix Collection',
    float: 0.28,
    imageUrl: '/images/awp-asiimov.jpg',
    prices: {
      steam: { buy: 1250.00, sell: 1180.00, lastUpdate: '2025-12-09T15:27:00Z' },
      csmoney: { buy: 1150.00, sell: 1080.00, lastUpdate: '2025-12-09T15:25:00Z' },
      buff163: { buy: 1100.00, sell: 1050.00, lastUpdate: '2025-12-09T15:28:00Z' },
      c5game: { buy: 1120.00, sell: 1060.00, lastUpdate: '2025-12-09T15:26:00Z' }
    }
  },
  {
    id: 'skin-006',
    name: 'M4A1-S | Golden Coil',
    displayName: 'M4A1-S | 金色线圈',
    rarity: 'Classified',
    collection: 'The Gunsmith Collection',
    float: 0.18,
    imageUrl: '/images/m4a1s-golden-coil.jpg',
    prices: {
      steam: { buy: 450.00, sell: 420.00, lastUpdate: '2025-12-09T15:29:00Z' },
      csmoney: { buy: 410.00, sell: 380.00, lastUpdate: '2025-12-09T15:27:00Z' },
      buff163: { buy: 390.00, sell: 370.00, lastUpdate: '2025-12-09T15:30:00Z' },
      c5game: { buy: 400.00, sell: 375.00, lastUpdate: '2025-12-09T15:28:00Z' }
    }
  },
  {
    id: 'skin-007',
    name: 'AK-47 | Vulcan',
    displayName: 'AK-47 | 火神',
    rarity: 'Restricted',
    collection: 'The Clutch Collection',
    float: 0.22,
    imageUrl: '/images/ak47-vulcan.jpg',
    prices: {
      steam: { buy: 180.00, sell: 170.00, lastUpdate: '2025-12-09T15:26:00Z' },
      csmoney: { buy: 165.00, sell: 155.00, lastUpdate: '2025-12-09T15:24:00Z' },
      buff163: { buy: 160.00, sell: 150.00, lastUpdate: '2025-12-09T15:27:00Z' },
      c5game: { buy: 162.00, sell: 152.00, lastUpdate: '2025-12-09T15:25:00Z' }
    }
  },
  {
    id: 'skin-008',
    name: 'AWP | Medusa',
    displayName: 'AWP | 美杜莎',
    rarity: 'Restricted',
    collection: 'The Gods and Monsters Collection',
    float: 0.14,
    imageUrl: '/images/awp-medusa.jpg',
    prices: {
      steam: { buy: 320.00, sell: 300.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 290.00, sell: 270.00, lastUpdate: '2025-12-09T15:28:00Z' },
      buff163: { buy: 280.00, sell: 260.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 285.00, sell: 265.00, lastUpdate: '2025-12-09T15:29:00Z' }
    }
  },
  {
    id: 'skin-009',
    name: 'P90 | Asiimov',
    displayName: 'P90 | 阿西莫夫',
    rarity: 'Restricted',
    collection: 'The Phoenix Collection',
    float: 0.35,
    imageUrl: '/images/p90-asiimov.jpg',
    prices: {
      steam: { buy: 280.00, sell: 260.00, lastUpdate: '2025-12-09T15:27:00Z' },
      csmoney: { buy: 250.00, sell: 230.00, lastUpdate: '2025-12-09T15:25:00Z' },
      buff163: { buy: 240.00, sell: 220.00, lastUpdate: '2025-12-09T15:28:00Z' },
      c5game: { buy: 245.00, sell: 225.00, lastUpdate: '2025-12-09T15:26:00Z' }
    }
  },
  {
    id: 'skin-010',
    name: 'MP7 | Labyrinth',
    displayName: 'MP7 | 迷宫',
    rarity: 'Mil-Spec',
    collection: 'The Control Collection',
    float: 0.19,
    imageUrl: '/images/mp7-labyrinth.jpg',
    prices: {
      steam: { buy: 85.00, sell: 80.00, lastUpdate: '2025-12-09T15:29:00Z' },
      csmoney: { buy: 75.00, sell: 70.00, lastUpdate: '2025-12-09T15:27:00Z' },
      buff163: { buy: 72.00, sell: 68.00, lastUpdate: '2025-12-09T15:30:00Z' },
      c5game: { buy: 73.00, sell: 69.00, lastUpdate: '2025-12-09T15:28:00Z' }
    }
  },
  {
    id: 'skin-011',
    name: 'AK-47 | The Empress',
    displayName: 'AK-47 | 皇后',
    rarity: 'Classified',
    collection: 'The Dreams & Nightmares Collection',
    float: 0.11,
    imageUrl: '/images/ak47-empress.jpg',
    prices: {
      steam: { buy: 520.00, sell: 490.00, lastUpdate: '2025-12-09T15:26:00Z' },
      csmoney: { buy: 480.00, sell: 450.00, lastUpdate: '2025-12-09T15:24:00Z' },
      buff163: { buy: 460.00, sell: 430.00, lastUpdate: '2025-12-09T15:27:00Z' },
      c5game: { buy: 470.00, sell: 440.00, lastUpdate: '2025-12-09T15:25:00Z' }
    }
  },
  {
    id: 'skin-012',
    name: 'AWP | Hyper Beast',
    displayName: 'AWP | 超级野兽',
    rarity: 'Restricted',
    collection: 'The Dragon King Collection',
    float: 0.25,
    imageUrl: '/images/awp-hyper-beast.jpg',
    prices: {
      steam: { buy: 450.00, sell: 420.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 410.00, sell: 380.00, lastUpdate: '2025-12-09T15:28:00Z' },
      buff163: { buy: 390.00, sell: 370.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 400.00, sell: 375.00, lastUpdate: '2025-12-09T15:29:00Z' }
    }
  },
  {
    id: 'skin-013',
    name: 'USP-S | Kill Confirmed',
    displayName: 'USP-S | 击杀确认',
    rarity: 'Restricted',
    collection: 'The Operation Riptide Collection',
    float: 0.16,
    imageUrl: '/images/usp-s-kill-confirmed.jpg',
    prices: {
      steam: { buy: 180.00, sell: 170.00, lastUpdate: '2025-12-09T15:27:00Z' },
      csmoney: { buy: 165.00, sell: 155.00, lastUpdate: '2025-12-09T15:25:00Z' },
      buff163: { buy: 160.00, sell: 150.00, lastUpdate: '2025-12-09T15:28:00Z' },
      c5game: { buy: 162.00, sell: 152.00, lastUpdate: '2025-12-09T15:26:00Z' }
    }
  },
  {
    id: 'skin-014',
    name: 'AWP | Wildfire',
    displayName: 'AWP | 野火',
    rarity: 'Restricted',
    collection: 'The Operation Phoenix Collection',
    float: 0.13,
    imageUrl: '/images/awp-wildfire.jpg',
    prices: {
      steam: { buy: 320.00, sell: 300.00, lastUpdate: '2025-12-09T15:29:00Z' },
      csmoney: { buy: 290.00, sell: 270.00, lastUpdate: '2025-12-09T15:27:00Z' },
      buff163: { buy: 280.00, sell: 260.00, lastUpdate: '2025-12-09T15:30:00Z' },
      c5game: { buy: 285.00, sell: 265.00, lastUpdate: '2025-12-09T15:28:00Z' }
    }
  },
  {
    id: 'skin-015',
    name: 'M4A4 | Temukau',
    displayName: 'M4A4 | 帝目鹿',
    rarity: 'Classified',
    collection: 'The Ancient Collection',
    float: 0.07,
    imageUrl: '/images/m4a4-temukau.jpg',
    prices: {
      steam: { buy: 850.00, sell: 800.00, lastUpdate: '2025-12-09T15:26:00Z' },
      csmoney: { buy: 780.00, sell: 730.00, lastUpdate: '2025-12-09T15:24:00Z' },
      buff163: { buy: 750.00, sell: 700.00, lastUpdate: '2025-12-09T15:27:00Z' },
      c5game: { buy: 765.00, sell: 715.00, lastUpdate: '2025-12-09T15:25:00Z' }
    }
  },
  {
    id: 'skin-016',
    name: 'AK-47 | Phantom Disruptor',
    displayName: 'AK-47 | 幻影干扰者',
    rarity: 'Restricted',
    collection: 'The Dreams & Nightmares Collection',
    float: 0.21,
    imageUrl: '/images/ak47-phantom-disruptor.jpg',
    prices: {
      steam: { buy: 280.00, sell: 260.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 250.00, sell: 230.00, lastUpdate: '2025-12-09T15:28:00Z' },
      buff163: { buy: 240.00, sell: 220.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 245.00, sell: 225.00, lastUpdate: '2025-12-09T15:29:00Z' }
    }
  },
  {
    id: 'skin-017',
    name: 'AWP | Containment Breach',
    displayName: 'AWP | 失控',
    rarity: 'Restricted',
    collection: 'The Danger Zone Collection',
    float: 0.17,
    imageUrl: '/images/awp-containment-breach.jpg',
    prices: {
      steam: { buy: 420.00, sell: 390.00, lastUpdate: '2025-12-09T15:27:00Z' },
      csmoney: { buy: 380.00, sell: 350.00, lastUpdate: '2025-12-09T15:25:00Z' },
      buff163: { buy: 360.00, sell: 340.00, lastUpdate: '2025-12-09T15:28:00Z' },
      c5game: { buy: 370.00, sell: 345.00, lastUpdate: '2025-12-09T15:26:00Z' }
    }
  },
  {
    id: 'skin-018',
    name: 'Desert Eagle | Printstream',
    displayName: '沙漠之鹰 | 印刷流',
    rarity: 'Restricted',
    collection: 'The Riptide Collection',
    float: 0.09,
    imageUrl: '/images/deagle-printstream.jpg',
    prices: {
      steam: { buy: 320.00, sell: 300.00, lastUpdate: '2025-12-09T15:29:00Z' },
      csmoney: { buy: 290.00, sell: 270.00, lastUpdate: '2025-12-09T15:27:00Z' },
      buff163: { buy: 280.00, sell: 260.00, lastUpdate: '2025-12-09T15:30:00Z' },
      c5game: { buy: 285.00, sell: 265.00, lastUpdate: '2025-12-09T15:28:00Z' }
    }
  },
  {
    id: 'skin-019',
    name: 'AK-47 | Phantom Disruptor (Pattern)',
    displayName: 'AK-47 | 幻影干扰者 (图案)',
    rarity: 'Classified',
    collection: 'The Dreams & Nightmares Collection',
    float: 0.03,
    imageUrl: '/images/ak47-phantom-pattern.jpg',
    prices: {
      steam: { buy: 650.00, sell: 610.00, lastUpdate: '2025-12-09T15:26:00Z' },
      csmoney: { buy: 600.00, sell: 560.00, lastUpdate: '2025-12-09T15:24:00Z' },
      buff163: { buy: 580.00, sell: 540.00, lastUpdate: '2025-12-09T15:27:00Z' },
      c5game: { buy: 590.00, sell: 550.00, lastUpdate: '2025-12-09T15:25:00Z' }
    }
  },
  {
    id: 'skin-020',
    name: 'AWP | Oni Taiji',
    displayName: 'AWP | 阴阳',
    rarity: 'Covert',
    collection: 'The Alpha Collection',
    float: 0.05,
    imageUrl: '/images/awp-oni-taiji.jpg',
    prices: {
      steam: { buy: 2200.00, sell: 2100.00, lastUpdate: '2025-12-09T15:30:00Z' },
      csmoney: { buy: 2000.00, sell: 1900.00, lastUpdate: '2025-12-09T15:28:00Z' },
      buff163: { buy: 1950.00, sell: 1850.00, lastUpdate: '2025-12-09T15:31:00Z' },
      c5game: { buy: 1975.00, sell: 1875.00, lastUpdate: '2025-12-09T15:29:00Z' }
    }
  }
];

// 计算最大利差和套利机会
const calculateArbitrageOpportunities = (): ArbitrageOpportunity[] => {
  const opportunities: ArbitrageOpportunity[] = [];
  const exchanges = ['steam', 'csmoney', 'buff163', 'c5game'] as const;
  
  mockSkins.forEach(skin => {
    // 检查挂单套利机会 (buy price vs sell price)
    for (let i = 0; i < exchanges.length; i++) {
      for (let j = i + 1; j < exchanges.length; j++) {
        const buyExchange = exchanges[i];
        const sellExchange = exchanges[j];
        const buyPrice = skin.prices[buyExchange].buy;
        const sellPrice = skin.prices[sellExchange].sell;
        
        const profit = sellPrice - buyPrice;
        const profitPercentage = (profit / buyPrice) * 100;
        
        if (profitPercentage > 3) { // 只显示利差超过3%的机会
          opportunities.push({
            id: `listing-${skin.id}-${buyExchange}-${sellExchange}`,
            skinId: skin.id,
            skinName: skin.displayName,
            skinImage: skin.imageUrl,
            buyExchange: getExchangeDisplayName(buyExchange),
            buyPrice,
            sellExchange: getExchangeDisplayName(sellExchange),
            sellPrice,
            profit,
            profitPercentage,
            type: 'listing',
            riskLevel: profitPercentage > 10 ? 'low' : profitPercentage > 5 ? 'medium' : 'high',
            timestamp: '2025-12-09T15:30:00Z'
          });
        }
      }
    }
    
    // 检查吃单套利机会 (instant buy vs instant sell)
    for (let i = 0; i < exchanges.length; i++) {
      for (let j = i + 1; j < exchanges.length; j++) {
        const buyExchange = exchanges[i];
        const sellExchange = exchanges[j];
        const buyPrice = skin.prices[buyExchange].buy;
        const sellPrice = skin.prices[sellExchange].sell;
        
        const profit = sellPrice - buyPrice;
        const profitPercentage = (profit / buyPrice) * 100;
        
        if (profitPercentage > 5) { // 吃单套利要求更高的利润
          opportunities.push({
            id: `instant-${skin.id}-${buyExchange}-${sellExchange}`,
            skinId: skin.id,
            skinName: skin.displayName,
            skinImage: skin.imageUrl,
            buyExchange: getExchangeDisplayName(buyExchange),
            buyPrice,
            sellExchange: getExchangeDisplayName(sellExchange),
            sellPrice,
            profit,
            profitPercentage,
            type: 'instant',
            riskLevel: 'low', // 吃单套利风险较低
            timestamp: '2025-12-09T15:30:00Z'
          });
        }
      }
    }
  });
  
  return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};

const getExchangeDisplayName = (exchange: string): string => {
  const names: Record<string, string> = {
    steam: 'Steam',
    csmoney: 'CS.MONEY',
    buff163: 'BUFF163',
    c5game: 'C5Game'
  };
  return names[exchange] || exchange;
};

export const mockArbitrageOpportunities = calculateArbitrageOpportunities();
// 交易所数据
export const mockExchanges: Exchange[] = [
  {
    name: 'steam',
    displayName: 'Steam',
    balance: { usd: 1250.50, cny: 8753.50 },
    withdrawable: { usd: 1200.50, cny: 8403.50 },
    url: 'https://steamcommunity.com/market',
    color: '#1b2838'
  },
  {
    name: 'csmoney',
    displayName: 'CS.MONEY',
    balance: { usd: 890.25, cny: 6231.75 },
    withdrawable: { usd: 850.25, cny: 5951.75 },
    url: 'https://cs.money',
    color: '#f4a261'
  },
  {
    name: 'buff163',
    displayName: 'BUFF163',
    balance: { usd: 567.80, cny: 3974.60 },
    withdrawable: { usd: 530.80, cny: 3715.60 },
    url: 'https://buff.163.com',
    color: '#2a9d8f'
  },
  {
    name: 'c5game',
    displayName: 'C5Game',
    balance: { usd: 445.75, cny: 3120.25 },
    withdrawable: { usd: 420.75, cny: 2945.25 },
    url: 'https://c5game.com',
    color: '#e76f51'
  }
];

// 我的库存
export const mockInventory: MyInventory[] = [
  {
    id: 'inv-001',
    skinId: 'skin-001',
    skinName: 'AK-47 | 火蛇',
    skinImage: '/images/ak47-fire-serpent.jpg',
    quantity: 2,
    avgBuyPrice: 1100.00,
    currentValue: 1150.00,
    exchange: 'CS.MONEY',
    totalProfit: 100.00
  },
  {
    id: 'inv-002',
    skinId: 'skin-004',
    skinName: 'AK-47 | 阿西莫夫',
    skinImage: '/images/ak47-asiimov.jpg',
    quantity: 5,
    avgBuyPrice: 320.00,
    currentValue: 350.00,
    exchange: 'BUFF163',
    totalProfit: 150.00
  },
  {
    id: 'inv-003',
    skinId: 'skin-007',
    skinName: 'AK-47 | 火神',
    skinImage: '/images/ak47-vulcan.jpg',
    quantity: 3,
    avgBuyPrice: 150.00,
    currentValue: 165.00,
    exchange: 'C5Game',
    totalProfit: 45.00
  }
];

// 交易历史
export const mockTradeHistory: TradeHistory[] = [
  {
    id: 'trade-001',
    type: 'buy',
    skinName: 'AK-47 | 火蛇',
    skinImage: '/images/ak47-fire-serpent.jpg',
    exchange: 'CS.MONEY',
    quantity: 1,
    price: 1100.00,
    total: 1100.00,
    timestamp: '2025-12-08T14:30:00Z',
    orderId: 'CSM-2025-001',
    status: 'completed'
  },
  {
    id: 'trade-002',
    type: 'sell',
    skinName: 'AK-47 | 火蛇',
    skinImage: '/images/ak47-fire-serpent.jpg',
    exchange: 'Steam',
    quantity: 1,
    price: 1180.00,
    total: 1180.00,
    timestamp: '2025-12-08T16:45:00Z',
    orderId: 'STM-2025-002',
    status: 'completed'
  },
  {
    id: 'trade-003',
    type: 'buy',
    skinName: 'AK-47 | 阿西莫夫',
    skinImage: '/images/ak47-asiimov.jpg',
    exchange: 'BUFF163',
    quantity: 2,
    price: 320.00,
    total: 640.00,
    timestamp: '2025-12-07T10:15:00Z',
    orderId: 'BUF-2025-003',
    status: 'completed'
  },
  {
    id: 'trade-004',
    type: 'sell',
    skinName: 'M4A4 | 咆哮',
    skinImage: '/images/m4a4-howl.jpg',
    exchange: 'Steam',
    quantity: 1,
    price: 1700.00,
    total: 1700.00,
    timestamp: '2025-12-06T12:20:00Z',
    orderId: 'STM-2025-004',
    status: 'completed'
  },
  {
    id: 'trade-005',
    type: 'buy',
    skinName: 'AWP | 龙之传说',
    skinImage: '/images/awp-dragon-lore.jpg',
    exchange: 'CS.MONEY',
    quantity: 1,
    price: 4100.00,
    total: 4100.00,
    timestamp: '2025-12-05T09:30:00Z',
    orderId: 'CSM-2025-005',
    status: 'pending'
  }
];

// 我的套利
export const mockMyArbitrages: MyArbitrage[] = [
  {
    id: 'arb-001',
    skinName: 'AK-47 | 火蛇',
    skinImage: '/images/ak47-fire-serpent.jpg',
    type: 'listing',
    buyExchange: 'CS.MONEY',
    sellExchange: 'Steam',
    quantity: 2,
    targetProfit: 60.00,
    currentProfit: 45.00,
    status: 'active',
    createdAt: '2025-12-09T10:00:00Z'
  },
  {
    id: 'arb-002',
    skinName: 'AK-47 | 阿西莫夫',
    skinImage: '/images/ak47-asiimov.jpg',
    type: 'instant',
    buyExchange: 'BUFF163',
    sellExchange: 'Steam',
    quantity: 3,
    targetProfit: 40.00,
    currentProfit: 25.00,
    status: 'active',
    createdAt: '2025-12-09T11:30:00Z'
  },
  {
    id: 'arb-003',
    skinName: 'M4A4 | 咆哮',
    skinImage: '/images/m4a4-howl.jpg',
    type: 'listing',
    buyExchange: 'BUFF163',
    sellExchange: 'Steam',
    quantity: 1,
    targetProfit: 100.00,
    currentProfit: 100.00,
    status: 'completed',
    createdAt: '2025-12-08T15:00:00Z'
  }
];

// 统计数据
export const calculateDashboardStats = () => {
  const listingOpportunities = mockArbitrageOpportunities.filter(opp => opp.type === 'listing');
  const instantOpportunities = mockArbitrageOpportunities.filter(opp => opp.type === 'instant');
  
  const allProfits = mockArbitrageOpportunities.map(opp => opp.profitPercentage);
  const avgSpread = allProfits.length > 0 ? allProfits.reduce((a, b) => a + b, 0) / allProfits.length : 0;
  const maxSpread = Math.max(...allProfits, 0);
  
  const profitableItems5 = mockSkins.filter(skin => {
    const profits = Object.entries(skin.prices).map(([_, prices]) => {
      const otherPrices = Object.entries(skin.prices).filter(([key]) => key !== _);
      return Math.max(...otherPrices.map(([_, other]) => other.sell - prices.buy));
    });
    return Math.max(...profits) > 5;
  }).length;
  
  const profitableItems10 = mockSkins.filter(skin => {
    const profits = Object.entries(skin.prices).map(([_, prices]) => {
      const otherPrices = Object.entries(skin.prices).filter(([key]) => key !== _);
      return Math.max(...otherPrices.map(([_, other]) => other.sell - prices.buy));
    });
    return Math.max(...profits) > 10;
  }).length;
  
  const profitablePairs5 = listingOpportunities.filter(opp => opp.profitPercentage > 5).length;
  const profitablePairs10 = listingOpportunities.filter(opp => opp.profitPercentage > 10).length;
  
  return {
    avgSpread: avgSpread.toFixed(2),
    maxSpread: maxSpread.toFixed(2),
    profitableItems5,
    profitableItems10,
    profitablePairs5,
    profitablePairs10,
    lastUpdate: '2025-12-09T15:30:00Z'
  };
};