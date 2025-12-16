import { cfg } from "./config";

const base_url = "https://itemshub-api.sidcloud.cn/"
const router = {
    arbi : base_url+"arbi",
    index : base_url + "index",
    cases :base_url+"cases",
    amm:{
        markets:base_url+"amm/markets"
    },
    admin:{
        login:base_url+"admin/login",
        info:base_url+"admin/info"
    }
}
export const dashboard_data =async () =>
{
    try{
        const res = await fetch(router.arbi);
        const json = await res.json();

        const mk_res = await fetch(router.amm.markets);
        const mk_json = await mk_res.json();
        if(json && json?.data && json.data?.length>0
            &&mk_json && mk_json?.data && mk_json.data?.length>0
        )
        {
            let allPairs = [];
            let profitAble = [];
            let profitAbleMaker = [];
            let profitablePairs_5 = [];
            let profitablePairs_10 = [];
            let profitablePairs_20 = [];
            let profitablePairs_30 = [];
            let lastUpdate = "";
            let avgSpread = 0;
            let maxSpread = 0;
            let maxSpreadPair = {};

            let skins =  []
            let markets = mk_json?.data;
            for(let i of json.data)
            {
                lastUpdate = (new Date(Number(i.raw?.timestamp))).toLocaleString();
                let skinMaxSpread = 0;

                for(let u of i?.arb)
                {
                    u['id'] = i.id;
                    allPairs.push(u);
                    if(u?.rate>cfg.profiteRate)
                    {
                        profitAble.push({
                            id: `${i.skin.id}__${u.from}__${u.to}`,
                            skinId: i.skin.id,
                            skinName: i.skin.name,
                            skinImage: i.skin.img_url,
                            buyExchange: String(u.from).toUpperCase(),
                            buyPrice:i.raw.data[u.from].maker,
                            sellExchange: String(u.to).toUpperCase(),
                            sellPrice:i.raw.data[u.to].maker,
                            profit:u.sub,
                            profitPercentage:u.rate*100,
                            type: '现货->挂单',
                            riskLevel: u.rate*100 > 10 ? 'low' : u.rate*100 > 5 ? 'medium' : 'high',
                            timestamp: (new Date(i.raw.timestamp)).toLocaleString()
                        })
                    }

                    if(u?.market_rate>cfg.profiteRate)
                    {
                        profitAbleMaker.push({
                            id: `${i.skin.id}__${u.from}__${u.to}`,
                            skinId: i.skin.id,
                            skinName: i.skin.name,
                            skinImage: i.skin.img_url,
                            buyExchange: String(u.from).toUpperCase(),
                            buyPrice:i.raw.data[u.from].maker,
                            sellExchange: String(u.to).toUpperCase(),
                            sellPrice:i.raw.data[u.to].maker,
                            profit:u.sub,
                            profitPercentage:u.market_rate*100,
                            type: '现货->挂单',
                            riskLevel: u.market_rate*100 > 10 ? 'low' : u.market_rate*100 > 5 ? 'medium' : 'high',
                            timestamp: (new Date(i.raw.timestamp)).toLocaleString()
                        })
                    }
                    if(u?.rate>0.05)
                    {
                        profitablePairs_5.push(u)
                    }
                    if(u?.rate>0.10)
                    {
                        profitablePairs_10.push(u)
                    }
                    if(u?.rate>0.20)
                    {
                        profitablePairs_20.push(u)
                    }
                    if(u?.rate>0.30)
                    {
                        profitablePairs_30.push(u)
                    }

                    if(u?.rate> maxSpread)
                    {
                        maxSpreadPair = u;
                        maxSpread = u.rate;
                    }
                    avgSpread+=u?.rate;
                    if(u?.rate> skinMaxSpread)
                    {
                        skinMaxSpread = u.rate;
                    }
                    

                }
                skins.push(
                      {
                        id: i.id,
                        name: i.skin.name,
                        displayName: i.skin.name,
                        rarity: 'Cases',
                        collection: 'NA',
                        float: 0,
                        imageUrl: i.skin.img_url,
                        prices: i.raw?.data ? i.raw.data : [],
                        maxSpread:skinMaxSpread*100
                    },
                )
            }
            avgSpread = avgSpread*100/allPairs.length;
            maxSpread = maxSpread*100

            return {
                avgSpread: avgSpread.toFixed(2),
                maxSpread: maxSpread.toFixed(2),
                profitablePairs5:profitablePairs_5.length,
                profitablePairs10:profitablePairs_10.length,
                profitablePairs20:profitablePairs_20.length,
                profitablePairs30:profitablePairs_30.length,
                lastUpdate,
                raw:{
                    profitablePairs_5,
                    profitablePairs_10,
                    profitablePairs_20,
                    profitablePairs_30,
                    profitAble,
                    profitAbleMaker,
                    allPairs,
                    skins,
                    markets
                }
            };
        }else{
            throw("req failed")
        }

    }catch(e)
    {
        console.error(e)
        return {
            avgSpread: "0",
            maxSpread: "0",
            profitableItems5:"0",
            profitableItems10:"0",
            profitablePairs5:"0",
            profitablePairs10:"0",
            lastUpdate: '2025-12-09T15:30:00Z'
        };
    }
}

export const api_login = async(username:String,password:String) =>
{
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "email": username,
            "password": password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const res = await fetch(router.admin.login, (requestOptions as any))
        const json = await res.json();
        if(json &&json?.code == 200 && json?.data)
        {
            return json.data;
        }
    }catch(e)
    {
        console.error(e);
        return false;
    }
}

const colors = [
  '#1b2838',
  '#f4a261',
  '#2a9d8f',
  '#e76f51'
]
export const random_color = () => {
  const idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
};

export const api_account_info = async() =>
{
    try{
        const myHeaders = new Headers();
        myHeaders.append("token", localStorage.getItem('cs-arbitrage-auth'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const res = await fetch(router.admin.info, (requestOptions as any))
        const json = await res.json();
        if(json &&json?.code == 200 && json?.data)
        {
            let ret = [];
            for(let i of json.data)
            {
                ret.push(
                    {
                        name: i.name,
                        market_id: i.market_id,
                        displayName: i.name,
                        balance: { usd: Number(i.balance?.raw), cny: Number(i.balance?.raw)*7 },
                        withdrawable: { usd: Number(i.balance?.raw), cny: Number(i.balance?.raw)*7 },
                        img_url:i.img_url,
                        url: 'https://steamcommunity.com/market',
                        color: random_color()
                    }
                )
            }
            return ret;
        }
    }catch(e)
    {
        console.error(e);
        return false;
    }
}