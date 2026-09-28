import React, { useState, useEffect, useRef } from 'react';

const tradingViewSymbols = {
  BTC: 'BINANCE:BTCUSDT',
  ETH: 'BINANCE:ETHUSDT',
  USDT: 'CRYPTOCAP:USDT',
  BNB: 'BINANCE:BNBUSDT',
  SOL: 'BINANCE:SOLUSDT',
  XRP: 'BINANCE:XRPUSDT',
  ADA: 'BINANCE:ADAUSDT',
  DOGE: 'BINANCE:DOGEUSDT',
  AVAX: 'BINANCE:AVAXUSDT',
  LINK: 'BINANCE:LINKUSDT',
  DOT: 'BINANCE:DOTUSDT',
  POL: 'BINANCE:POLUSDT',
  XAUUSD: 'OANDA:XAUUSD',
  XAGUSD: 'OANDA:XAGUSD',
  XPTUSD: 'OANDA:XPTUSD',
  XPDUSD: 'OANDA:XPDUSD',
  SPX: 'SP:SPX',
  NDX: 'NASDAQ:NDX',
  DJI: 'DJ:DJI',
  EURUSD: 'FX:EURUSD',
  GBPUSD: 'FX:GBPUSD',
  USDJPY: 'FX:USDJPY',
  WTI: 'TVC:USOIL',
  BRENT: 'TVC:UKOIL',
  NATGAS: 'NYMEX:NG1!',
};

const cryptoLogoSlugs = {
  POL: 'matic', RENDER: 'rndr', APT: 'aptos', FIL: 'filecoin', HBAR: 'hedera', IMX: 'immutable-x',
  MKR: 'maker', RUNE: 'thorchain', AAVE: 'aave', XTZ: 'tezos', THETA: 'theta', FTM: 'fantom',
  ALGO: 'algorand', EGLD: 'multiversx', CHZ: 'chiliz', KAVA: 'kava', GALA: 'gala', CRV: 'curve',
  CAKE: 'pancakeswap', ZEC: 'zcash', DASH: 'dash', KSM: 'kusama', SNX: 'synthetix', CSPR: 'casper',
  JTO: 'jito', PYTH: 'pyth', BONK: 'bonk', FLOKI: 'floki', UNI: 'uniswap', ATOM: 'cosmos',
};

const referenceLogoDomains = {
  AAPL: 'apple.com',
  MSFT: 'microsoft.com',
  NVDA: 'nvidia.com',
  TSLA: 'tesla.com',
};

const nonCryptoMarketSymbols = new Set(['AAPL', 'MSFT', 'NVDA', 'TSLA', 'XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD', 'SPX', 'NDX', 'DJI', 'EURUSD', 'GBPUSD', 'USDJPY', 'WTI', 'BRENT', 'NATGAS']);

const languageLabels = {
  en: { home: 'HOME', trade: 'TRADE', vip: 'VIP', videoAds: 'VIDEO ADS', share: 'SHARE', team: 'TEAM', history: 'HISTORY', groupChat: 'GROUP CHAT', support: 'SUPPORT', me: 'ME', light: 'Light', dark: 'Dark', withdraw: 'Withdraw' },
  my: { home: 'ပင်မ', trade: 'အရောင်းအဝယ်', vip: 'VIP', videoAds: 'ဗီဒီယိုကြော်ငြာ', share: 'မျှဝေ', team: 'အဖွဲ့', history: 'မှတ်တမ်း', groupChat: 'ဂရုချတ်', support: 'အကူအညီ', me: 'အကောင့်', light: 'အလင်း', dark: 'အမှောင်', withdraw: 'ငွေထုတ်' },
  th: { home: 'หน้าหลัก', trade: 'เทรด', vip: 'VIP', videoAds: 'โฆษณาวิดีโอ', share: 'แชร์', team: 'ทีม', history: 'ประวัติ', groupChat: 'แชทกลุ่ม', support: 'ช่วยเหลือ', me: 'บัญชี', light: 'สว่าง', dark: 'มืด', withdraw: 'ถอนเงิน' },
};

const uiTranslations = {
  my: {
    'Web3 Finance': 'Web3 ဘဏ္ဍာရေး',
    'Light': 'အလင်း', 'Dark': 'အမှောင်', 'Withdraw': 'ငွေထုတ်',
    'Secure Web3 Platform': 'လုံခြုံသော Web3 ပလက်ဖောင်း',
    'Explore VIP Plans': 'VIP အစီအစဉ်များကြည့်ရန်', 'Invite & Earn': 'ဖိတ်ခေါ်ပြီး ရယူရန်',
    'Total Assets': 'ပိုင်ဆိုင်မှုစုစုပေါင်း', 'Deposit': 'ငွေသွင်း',
    'Market Trends (Live 50+ Assets)': 'စျေးကွက်လမ်းကြောင်း (Live ပိုင်ဆိုင်မှု ၅၀+)',
    'Search coin name or symbol...': 'Coin အမည် သို့မဟုတ် သင်္ကေတရှာရန်...',
    'Asset': 'ပိုင်ဆိုင်မှု', 'Live Price (USDT)': 'လက်ရှိစျေးနှုန်း (USDT)', '24h Trend Chart': '၂၄ နာရီလမ်းကြောင်း', '24h Change': '၂၄ နာရီပြောင်းလဲမှု', 'Action': 'လုပ်ဆောင်ချက်', 'Trade': 'အရောင်းအဝယ်',
    'CRYPTO TRADE': 'Crypto အရောင်းအဝယ်', 'Demo trading mode': 'စမ်းသပ်အရောင်းအဝယ်', 'Place Order': 'အော်ဒါတင်ရန်',
    'Buy': 'ဝယ်ရန်', 'Sell': 'ရောင်းရန်', 'Amount (USDT)': 'ပမာဏ (USDT)', 'Enter amount': 'ပမာဏထည့်ပါ',
    'VIP INVESTMENT TIERS (VIP 1 - VIP 10)': 'VIP ရင်းနှီးမြှုပ်နှံမှုအဆင့်များ (VIP ၁ - VIP ၁၀)',
    'USDT WITHDRAWAL': 'USDT ငွေထုတ်ခြင်း', 'Submit Withdrawal': 'ငွေထုတ်ရန်တင်ပါ',
    'TRANSACTION HISTORY': 'ငွေလွှဲမှတ်တမ်း', 'COMMUNITY GROUP CHAT': 'အသိုင်းအဝိုင်းဂရုချတ်',
    'VIDEO ADS': 'ဗီဒီယိုကြော်ငြာများ', 'Admin Upload': 'Admin တင်ရန်', 'Upload Video Ad': 'ဗီဒီယိုကြော်ငြာတင်ရန်',
    'Customer Support Chat': 'ဖောက်သည်အကူအညီချတ်', 'Send': 'ပို့ရန်', 'Copy': 'ကူးယူရန်',
    'Group Members': 'ဂရုအဖွဲ့ဝင်များ', 'Invite a user': 'User ဖိတ်ခေါ်ရန်', 'Search by name or user ID': 'အမည် သို့မဟုတ် user ID ဖြင့်ရှာရန်', 'Invite': 'ဖိတ်ခေါ်ရန်',
    'Main Balance': 'အဓိကလက်ကျန်', 'Team Commission': 'အဖွဲ့ကော်မရှင်', 'Team Members': 'အဖွဲ့ဝင်များ',
  },
  th: {
    'Web3 Finance': 'การเงิน Web3', 'Light': 'สว่าง', 'Dark': 'มืด', 'Withdraw': 'ถอนเงิน',
    'Secure Web3 Platform': 'แพลตฟอร์ม Web3 ที่ปลอดภัย', 'Explore VIP Plans': 'ดูแผน VIP', 'Invite & Earn': 'เชิญและรับรายได้',
    'Total Assets': 'สินทรัพย์รวม', 'Deposit': 'ฝากเงิน', 'Market Trends (Live 50+ Assets)': 'แนวโน้มตลาด (สินทรัพย์สดกว่า 50 รายการ)',
    'Search coin name or symbol...': 'ค้นหาชื่อเหรียญหรือสัญลักษณ์...', 'Asset': 'สินทรัพย์', 'Live Price (USDT)': 'ราคาสด (USDT)', '24h Trend Chart': 'กราฟ 24 ชั่วโมง', '24h Change': 'เปลี่ยนแปลง 24 ชม.', 'Action': 'การดำเนินการ', 'Trade': 'เทรด',
    'CRYPTO TRADE': 'เทรดคริปโต', 'Demo trading mode': 'โหมดทดลองเทรด', 'Place Order': 'ส่งคำสั่ง', 'Buy': 'ซื้อ', 'Sell': 'ขาย', 'Amount (USDT)': 'จำนวน (USDT)', 'Enter amount': 'กรอกจำนวน',
    'VIP INVESTMENT TIERS (VIP 1 - VIP 10)': 'ระดับการลงทุน VIP (VIP 1 - VIP 10)', 'USDT WITHDRAWAL': 'ถอน USDT', 'Submit Withdrawal': 'ส่งคำขอถอนเงิน',
    'TRANSACTION HISTORY': 'ประวัติธุรกรรม', 'COMMUNITY GROUP CHAT': 'แชทกลุ่มชุมชน', 'VIDEO ADS': 'โฆษณาวิดีโอ', 'Admin Upload': 'อัปโหลดสำหรับแอดมิน', 'Upload Video Ad': 'อัปโหลดโฆษณาวิดีโอ',
    'Customer Support Chat': 'แชทฝ่ายสนับสนุน', 'Send': 'ส่ง', 'Copy': 'คัดลอก', 'Group Members': 'สมาชิกกลุ่ม', 'Invite a user': 'เชิญผู้ใช้', 'Search by name or user ID': 'ค้นหาด้วยชื่อหรือ user ID', 'Invite': 'เชิญ',
    'Main Balance': 'ยอดคงเหลือหลัก', 'Team Commission': 'ค่าคอมมิชชันทีม', 'Team Members': 'สมาชิกทีม',
  },
};

uiTranslations.my = {
  ...uiTranslations.my,
  'Trade & Earn Daily Fixed Income with ALEXCE': 'အရောင်းအဝယ်လုပ်ပြီး ALEXCE နှင့် နေ့စဉ်အမြတ်ရယူပါ',
  'Unlock high-yield VIP tiers ranging from VIP 1 to VIP 10 with guaranteed daily interest.': 'VIP ၁ မှ VIP ၁၀ အထိ နေ့စဉ်အတိုးဖြင့် အမြတ်မြင့်အစီအစဉ်များကို အသုံးပြုပါ။',
  'Explore VIP Plans': 'VIP အစီအစဉ်များကြည့်ရန်', 'Market Trends': 'စျေးကွက်လမ်းကြောင်း', 'Search': 'ရှာရန်',
  'Live Platform Withdrawals': 'လက်ရှိပလက်ဖောင်း ငွေထုတ်မှုများ', 'Real-time Feed': 'အချိန်နှင့်တပြေးညီဖိဒ်',
  'Referral Link': 'ရည်ညွှန်းလင့်ခ်', 'View Team Members': 'အဖွဲ့ဝင်များကြည့်ရန်', 'Account Settings & Security': 'အကောင့်ဆက်တင်နှင့် လုံခြုံရေး',
  'Edit Profile & Security': 'ပရိုဖိုင်နှင့်လုံခြုံရေးပြင်ရန်', 'Log Out': 'ထွက်ရန်', 'Save Changes': 'ပြောင်းလဲမှုသိမ်းရန်',
  'Only send BSC/BEP20 to this address': 'ဤလိပ်စာသို့ BSC/BEP20 သာပို့ပါ', 'I Have Made Payment (Auto-Deposit)': 'ငွေပေးချေပြီးပါပြီ (အလိုအလျောက်သွင်းရန်)',
  'No assets found matching': 'ကိုက်ညီသောပိုင်ဆိုင်မှုမတွေ့ပါ', 'Wallet Address': 'ပိုက်ဆံအိတ်လိပ်စာ', 'Completed': 'ပြီးစီးပြီ',
  'Options Market': 'Options စျေးကွက်', 'Alpha Signals': 'Alpha အချက်ပြများ', 'Convert Assets': 'ပိုင်ဆိုင်မှု ပြောင်းရန်',
};

uiTranslations.th = {
  ...uiTranslations.th,
  'Trade & Earn Daily Fixed Income with ALEXCE': 'เทรดและรับรายได้ประจำวันกับ ALEXCE',
  'Unlock high-yield VIP tiers ranging from VIP 1 to VIP 10 with guaranteed daily interest.': 'ปลดล็อกระดับ VIP 1 ถึง VIP 10 พร้อมผลตอบแทนรายวันที่กำหนดไว้',
  'Explore VIP Plans': 'ดูแผน VIP', 'Market Trends': 'แนวโน้มตลาด', 'Search': 'ค้นหา',
  'Live Platform Withdrawals': 'การถอนเงินบนแพลตฟอร์มแบบสด', 'Real-time Feed': 'ฟีดเรียลไทม์',
  'Referral Link': 'ลิงก์แนะนำ', 'View Team Members': 'ดูสมาชิกทีม', 'Account Settings & Security': 'การตั้งค่าบัญชีและความปลอดภัย',
  'Edit Profile & Security': 'แก้ไขโปรไฟล์และความปลอดภัย', 'Log Out': 'ออกจากระบบ', 'Save Changes': 'บันทึกการเปลี่ยนแปลง',
  'Only send BSC/BEP20 to this address': 'ส่ง BSC/BEP20 ไปยังที่อยู่นี้เท่านั้น', 'I Have Made Payment (Auto-Deposit)': 'ชำระเงินแล้ว (ฝากอัตโนมัติ)',
  'No assets found matching': 'ไม่พบสินทรัพย์ที่ตรงกัน', 'Wallet Address': 'ที่อยู่กระเป๋าเงิน', 'Completed': 'เสร็จสมบูรณ์',
  'Options Market': 'ตลาดออปชัน', 'Alpha Signals': 'สัญญาณ Alpha', 'Convert Assets': 'แปลงสินทรัพย์',
};

function TradingViewChart({ symbol, interval, darkMode }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return undefined;

    chartContainer.innerHTML = '';
    const chartWidget = document.createElement('div');
    chartWidget.className = 'tradingview-widget-container__widget';
    chartWidget.style.height = '100%';
    chartWidget.style.width = '100%';
    chartContainer.appendChild(chartWidget);

    const widgetScript = document.createElement('script');
    widgetScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    widgetScript.type = 'text/javascript';
    widgetScript.async = true;
    widgetScript.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'Asia/Yangon',
      theme: darkMode ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });
    chartContainer.appendChild(widgetScript);

    return () => {
      chartContainer.innerHTML = '';
    };
  }, [symbol, interval, darkMode]);

  return <div ref={chartContainerRef} className="tradingview-widget-container h-full w-full" />;
}

function AlignedCryptoChart({ symbol, interval, darkMode, currentPrice, entryPrice, side }) {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const loadCandles = async () => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=80`);
        if (!response.ok) throw new Error('Kline unavailable');
        const rows = await response.json();
        if (!cancelled) setCandles(rows.map((row) => ({ open: Number(row[1]), high: Number(row[2]), low: Number(row[3]), close: Number(row[4]) })));
      } catch {
        if (!cancelled) setCandles([]);
      }
    };
    loadCandles();
    const refresh = setInterval(loadCandles, 5000);
    return () => { cancelled = true; clearInterval(refresh); };
  }, [symbol, interval]);

  const fallbackCandles = Array.from({ length: 48 }, (_, index) => {
    const center = currentPrice || 1;
    const open = center * (1 + Math.sin(index * 0.7) * 0.004);
    const close = center * (1 + Math.sin((index + 1) * 0.7) * 0.004);
    return { open, close, high: Math.max(open, close) * 1.002, low: Math.min(open, close) * 0.998 };
  });
  const chartCandles = candles.length ? candles : fallbackCandles;
  const values = chartCandles.flatMap((candle) => [candle.high, candle.low]).concat([currentPrice || 0, entryPrice || 0]);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const padding = Math.max((maximum - minimum) * 0.08, (currentPrice || 1) * 0.001);
  const chartMin = minimum - padding;
  const chartMax = maximum + padding;
  const y = (price) => 12 + ((chartMax - price) / Math.max(chartMax - chartMin, 0.000001)) * 210;
  const xStep = 760 / Math.max(chartCandles.length - 1, 1);

  return <div className="relative h-full w-full">
    <svg viewBox="0 0 800 250" preserveAspectRatio="none" className="h-full w-full">
      {[0, 1, 2, 3, 4].map((line) => <line key={line} x1="0" x2="800" y1={12 + line * 52} y2={12 + line * 52} stroke={darkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="1" />)}
      {chartCandles.map((candle, index) => {
        const x = 20 + index * xStep;
        const bullish = candle.close >= candle.open;
        const color = bullish ? '#10b981' : '#f43f5e';
        const bodyTop = y(Math.max(candle.open, candle.close));
        const bodyHeight = Math.max(2, Math.abs(y(candle.open) - y(candle.close)));
        return <g key={`${symbol}-${index}`}><line x1={x} x2={x} y1={y(candle.high)} y2={y(candle.low)} stroke={color} strokeWidth="1.5" /><rect x={x - 3} y={bodyTop} width="6" height={bodyHeight} fill={color} /></g>;
      })}
      {currentPrice > 0 && <><line x1="0" x2="800" y1={y(currentPrice)} y2={y(currentPrice)} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 4" /><text x="8" y={Math.max(12, y(currentPrice) - 5)} fill="#38bdf8" fontSize="10">LIVE {currentPrice.toFixed(currentPrice < 1 ? 6 : 2)}</text></>}
      {entryPrice > 0 && <><line x1="0" x2="800" y1={y(entryPrice)} y2={y(entryPrice)} stroke={side === 'short' || side === 'sell' ? '#fb7185' : '#fbbf24'} strokeWidth="2" strokeDasharray="8 5" /><text x="8" y={Math.min(240, y(entryPrice) + 13)} fill={side === 'short' || side === 'sell' ? '#fb7185' : '#fbbf24'} fontSize="10">ENTRY {entryPrice.toFixed(entryPrice < 1 ? 6 : 2)}</text></>}
    </svg>
    <span className="absolute bottom-2 right-3 text-[10px] opacity-50">Binance live candles · {interval}</span>
  </div>;
}

function AlexceLogo() {
  return (
    <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-500/20" aria-label="ALEXCE logo">
      <svg viewBox="0 0 44 44" className="w-9 h-9" aria-hidden="true">
        <path d="M22 3.5 38.5 13v18L22 40.5 5.5 31V13L22 3.5Z" fill="#111827" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="m12.5 30 7.1-16h4.8l7.1 16h-4.4l-1.4-3.5h-7.7L16.6 30h-4.1Zm6.9-7h4.2l-2.1-5.4-2.1 5.4Z" fill="#f8fafc" />
        <path d="M15.5 25h13" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34.5" cy="9.5" r="2" fill="#a78bfa" />
      </svg>
    </div>
  );
}

function CryptoLogo({ coin, size = 'w-10 h-10' }) {
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const slug = cryptoLogoSlugs[coin.symbol] || coin.symbol.toLowerCase();
  const logoSources = [
    `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/128/color/${slug}.png`,
    `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${slug}.png`,
    `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
  ];

  return (
    <div className={`${size} rounded-full ${coin.logoBg} flex items-center justify-center font-black text-white shadow-md text-sm shrink-0 overflow-hidden`}>
      {logoSourceIndex < logoSources.length ? <img src={logoSources[logoSourceIndex]} alt={`${coin.name} logo`} className="w-full h-full object-cover" onError={() => setLogoSourceIndex((index) => index + 1)} /> : <span>{coin.logoText}</span>}
    </div>
  );
}

function MarketLogo({ coin }) {
  const domain = referenceLogoDomains[coin.symbol];
  const [logoAvailable, setLogoAvailable] = useState(Boolean(domain));

  if (!domain && !nonCryptoMarketSymbols.has(coin.symbol)) {
    return <CryptoLogo coin={coin} />;
  }

  if (!domain) {
    return <div className={`w-10 h-10 rounded-full ${coin.logoBg} flex items-center justify-center font-black text-white shadow-md text-xs shrink-0`}>{coin.logoText}</div>;
  }

  return (
    <div className={`w-10 h-10 rounded-full ${coin.logoBg} flex items-center justify-center font-black text-white shadow-md text-xs shrink-0 overflow-hidden`}>
      {logoAvailable ? <img src={`https://logo.clearbit.com/${domain}`} alt={`${coin.name} logo`} className="w-full h-full object-contain bg-white p-1.5" onError={() => setLogoAvailable(false)} /> : coin.logoText}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVip, setSelectedVip] = useState(null);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [vipLaunchStarted, setVipLaunchStarted] = useState(false);
  const [vipRestSeconds, setVipRestSeconds] = useState(300);
  const [vipLastActionAt, setVipLastActionAt] = useState(() => {
    const savedAction = window.localStorage.getItem('alexce-vip-last-action');
    return savedAction ? Number(savedAction) : 0;
  });
  const [currentTime, setCurrentTime] = useState(Date.now());
  const walletAddress = '0x99A3e0038aC4BAB1c0ED8eAb354FD2171969d922';

  const [userBalance, setUserBalance] = useState(12450.0);
  const [totalCommissionEarned, setTotalCommissionEarned] = useState(350.0);

  const [username, setUsername] = useState('ALEXCE');
  const [password, setPassword] = useState('123456');
  const [userPhone, setUserPhone] = useState('+959976543210');
  const [profileImage, setProfileImage] = useState(() => window.localStorage.getItem('alexce-profile-image') || '');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUsername, setTempUsername] = useState('ALEXCE');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tempPhone, setTempPhone] = useState('+959976543210');

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, address: '0x4421***1234', level: 'Level 1', vipPlan: 'VIP 2', amount: 200, commission: 14, time: '2 hours ago' },
    { id: 2, address: '0x9988***5544', level: 'Level 2', vipPlan: 'VIP 3', amount: 300, commission: 9, time: '5 hours ago' },
    { id: 3, address: '0x1234***7890', level: 'Level 3', vipPlan: 'VIP 1', amount: 100, commission: 1, time: '1 day ago' },
  ]);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! Welcome to ALEXCE Support. How can I help you with your VIP deposit, password change or withdrawal today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState([
    { id: 1, user: 'ALEXCE Team', userId: 'alexce-team', text: 'Welcome to the ALEXCE community room. Please keep the chat respectful.', time: '09:20', isCurrentUser: false },
    { id: 2, user: 'Crypto Trader', userId: 'crypto_7788', text: 'Has anyone tried the VIP 2 plan yet?', time: '09:24', isCurrentUser: false },
  ]);
  const [groupMessage, setGroupMessage] = useState('');
  const [groupAttachment, setGroupAttachment] = useState(null);
  const [groupMemberSearch, setGroupMemberSearch] = useState('');
  const [groupMembers, setGroupMembers] = useState([
    { id: 1, name: 'ALEXCE', userId: 'alexce_8921' },
    { id: 2, name: 'Crypto Trader', userId: 'crypto_7788' },
    { id: 3, name: 'May Zin', userId: 'mayzin_2045' },
    { id: 4, name: 'Ko Min', userId: 'komin_6612' },
  ]);
  const [groupUserDirectory] = useState([
    { id: 5, name: 'Thura Win', userId: 'thura_4410' },
    { id: 6, name: 'Su Su', userId: 'susu_9920' },
    { id: 7, name: 'Nilar Htet', userId: 'nilar_3156' },
    { id: 8, name: 'Bitcoin Lover', userId: 'btc_love88' },
  ]);
  const [refSubTab, setRefSubTab] = useState('deposit');
  const [marketSearch, setMarketSearch] = useState('');
  const [marketCategory, setMarketCategory] = useState('new');
  const [marketExchange, setMarketExchange] = useState('binance');
  const [p2pCurrency, setP2pCurrency] = useState('THB');
  const [p2pSide, setP2pSide] = useState('buy');
  const [p2pAmount, setP2pAmount] = useState('');
  const [p2pRates, setP2pRates] = useState({ USD: 1, THB: 32.5, MMK: 4450 });
  const [p2pRateUpdatedAt, setP2pRateUpdatedAt] = useState(Date.now());
  const [p2pUsdHistory, setP2pUsdHistory] = useState([1, 1.0002, 0.9998, 1.0001, 1]);
  const [p2pApiStatus, setP2pApiStatus] = useState('connecting');
  const [p2pNotice, setP2pNotice] = useState('');
  const [p2pIsAdmin, setP2pIsAdmin] = useState(false);
  const [p2pOrders, setP2pOrders] = useState([]);
  const [selectedTradeSymbol, setSelectedTradeSymbol] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1m');
  const [tradeMode, setTradeMode] = useState('Spot');
  const [chartExpanded, setChartExpanded] = useState(false);
  const [tradeOrders, setTradeOrders] = useState([]);
  const [futuresSide, setFuturesSide] = useState('long');
  const [futuresLeverage, setFuturesLeverage] = useState('10');
  const [futuresPositions, setFuturesPositions] = useState([]);
  const [tradFiSide, setTradFiSide] = useState('buy');
  const [tradFiPositions, setTradFiPositions] = useState([]);
  const [marketApiStatus, setMarketApiStatus] = useState('connecting');
  const [marketPriceUpdatedAt, setMarketPriceUpdatedAt] = useState(Date.now());
  const [videoAds, setVideoAds] = useState([
    { id: 1, title: 'Welcome to ALEXCE', description: 'Learn about our latest VIP opportunities.', url: '', isDemo: true },
  ]);
  const [videoAdTitle, setVideoAdTitle] = useState('');
  const [videoAdDescription, setVideoAdDescription] = useState('');
  const [videoAdFile, setVideoAdFile] = useState(null);
  const labels = languageLabels[language];

  useEffect(() => {
    let isMounted = true;
    const loadP2pRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('FX API unavailable');
        const data = await response.json();
        if (isMounted && data.rates) {
          setP2pRates({ USD: 1, THB: Number(data.rates.THB), MMK: Number(data.rates.MMK) });
          setP2pRateUpdatedAt(Date.now());
          setP2pUsdHistory((previous) => [...previous.slice(-11), Number(data.rates.USD || 1)]);
          setP2pApiStatus('live');
        }
      } catch {
        if (isMounted) setP2pApiStatus('offline');
      }
    };
    loadP2pRates();
    const rateInterval = setInterval(loadP2pRates, 60000);
    return () => { isMounted = false; clearInterval(rateInterval); };
  }, []);

  useEffect(() => {
    if (vipLaunchStarted || vipRestSeconds <= 0) return undefined;
    const countdown = setInterval(() => {
      setVipRestSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, [vipLaunchStarted, vipRestSeconds]);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(clock);
  }, []);

  const vipMinutes = String(Math.floor(vipRestSeconds / 60)).padStart(2, '0');
  const vipSeconds = String(vipRestSeconds % 60).padStart(2, '0');
  const vipCooldownMs = 24 * 60 * 60 * 1000;
  const vipCooldownRemaining = Math.max(0, vipCooldownMs - (currentTime - vipLastActionAt));
  const vipCooldownActive = vipLastActionAt > 0 && vipCooldownRemaining > 0;
  const cooldownHours = String(Math.floor(vipCooldownRemaining / (60 * 60 * 1000))).padStart(2, '0');
  const cooldownMinutes = String(Math.floor((vipCooldownRemaining % (60 * 60 * 1000)) / (60 * 1000))).padStart(2, '0');
  const cooldownSeconds = String(Math.floor((vipCooldownRemaining % (60 * 1000)) / 1000)).padStart(2, '0');
  const thailandFormatter = new Intl.DateTimeFormat('th-TH-u-ca-gregory', { timeZone: 'Asia/Bangkok', dateStyle: 'medium', timeStyle: 'medium' });
  const thailandTime = thailandFormatter.format(currentTime);
  const lastVipActionTime = vipLastActionAt ? thailandFormatter.format(vipLastActionAt) : null;
  const nextVipActionTime = vipLastActionAt ? thailandFormatter.format(vipLastActionAt + vipCooldownMs) : null;

  const handleVipDailyAction = () => {
    if (vipCooldownActive) return;
    const actionTime = Date.now();
    setVipLastActionAt(actionTime);
    window.localStorage.setItem('alexce-vip-last-action', String(actionTime));
    setVipLaunchStarted(true);
    setVipRestSeconds(0);
  };
  const originalTextNodes = useRef(new WeakMap());

  useEffect(() => {
    const translations = uiTranslations[language] || {};
    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let textNode = textWalker.nextNode();

    while (textNode) {
      if (textNode.parentElement && !['SCRIPT', 'STYLE'].includes(textNode.parentElement.tagName)) {
        if (!originalTextNodes.current.has(textNode)) originalTextNodes.current.set(textNode, textNode.nodeValue);
        const originalText = originalTextNodes.current.get(textNode);
        let translatedText = originalText;
        Object.entries(translations).forEach(([english, translated]) => {
          translatedText = translatedText.split(english).join(translated);
        });
        textNode.nodeValue = translatedText;
      }
      textNode = textWalker.nextNode();
    }

    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((element) => {
      if (!element.dataset.originalPlaceholder) element.dataset.originalPlaceholder = element.getAttribute('placeholder');
      const originalPlaceholder = element.dataset.originalPlaceholder;
      element.setAttribute('placeholder', translations[originalPlaceholder] || originalPlaceholder);
    });
  }, [language, activeTab]);
  const [tradeSide, setTradeSide] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeNotice, setTradeNotice] = useState('');

  const [marketData, setMarketData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 64230.0, change: '+2.5%', isUp: true, logoBg: 'bg-amber-500', logoText: '₿', sparklineColor: '#10b981', points: '10,25 25,18 40,30 55,15 70,20 85,8 100,12' },
    { name: 'Ethereum', symbol: 'ETH', price: 3450.0, change: '-1.2%', isUp: false, logoBg: 'bg-indigo-600', logoText: 'Ξ', sparklineColor: '#f43f5e', points: '10,10 25,20 40,15 55,28 70,22 85,32 100,35' },
    { name: 'Tether', symbol: 'USDT', price: 1.0, change: '+0.01%', isUp: true, logoBg: 'bg-emerald-500', logoText: '₮', sparklineColor: '#06b6d4', points: '10,20 25,22 40,19 55,21 70,20 85,22 100,20' },
    { name: 'Binance Coin', symbol: 'BNB', price: 580.5, change: '+3.8%', isUp: true, logoBg: 'bg-yellow-500 text-slate-950', logoText: 'B', sparklineColor: '#eab308', points: '10,30 25,25 40,20 55,18 70,12 85,15 100,5' },
    { name: 'Solana', symbol: 'SOL', price: 145.2, change: '+5.4%', isUp: true, logoBg: 'bg-gradient-to-tr from-purple-500 to-teal-400', logoText: 'S', sparklineColor: '#10b981', points: '10,35 25,28 40,22 55,15 70,10 85,12 100,4' },
    { name: 'Ripple', symbol: 'XRP', price: 0.58, change: '-0.4%', isUp: false, logoBg: 'bg-slate-700', logoText: '✕', sparklineColor: '#f43f5e', points: '10,15 25,18 40,22 55,20 70,25 85,28 100,30' },
    { name: 'Cardano', symbol: 'ADA', price: 0.39, change: '+1.1%', isUp: true, logoBg: 'bg-blue-600', logoText: '₳', sparklineColor: '#3b82f6', points: '10,22 25,20 40,25 55,18 70,15 85,19 100,12' },
    { name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change: '+8.9%', isUp: true, logoBg: 'bg-amber-600', logoText: 'Ð', sparklineColor: '#10b981', points: '10,38 25,30 40,25 55,20 70,12 85,8 100,2' },
    { name: 'Avalanche', symbol: 'AVAX', price: 27.8, change: '+2.2%', isUp: true, logoBg: 'bg-rose-600', logoText: 'A', sparklineColor: '#f43f5e', points: '10,25 25,20 40,22 55,18 70,15 85,12 100,10' },
    { name: 'Chainlink', symbol: 'LINK', price: 13.4, change: '-1.5%', isUp: false, logoBg: 'bg-blue-500', logoText: '⬡', sparklineColor: '#3b82f6', points: '10,12 25,18 40,20 55,25 70,22 85,28 100,30' },
    { name: 'Polkadot', symbol: 'DOT', price: 6.15, change: '+0.8%', isUp: true, logoBg: 'bg-pink-600', logoText: 'P', sparklineColor: '#ec4899', points: '10,20 25,22 40,19 55,21 70,18 85,20 100,16' },
    { name: 'Polygon', symbol: 'POL', price: 0.42, change: '-2.1%', isUp: false, logoBg: 'bg-purple-600', logoText: 'M', sparklineColor: '#a855f7', points: '10,15 25,20 40,25 55,28 70,30 85,32 100,35' },
    { name: 'Shiba Inu', symbol: 'SHIB', price: 0.000018, change: '+4.2%', isUp: true, logoBg: 'bg-amber-500', logoText: 'SH', sparklineColor: '#eab308', points: '10,30 25,22 40,18 55,20 70,15 85,10 100,8' },
    { name: 'Litecoin', symbol: 'LTC', price: 65.4, change: '+0.3%', isUp: true, logoBg: 'bg-slate-500', logoText: 'Ł', sparklineColor: '#64748b', points: '10,20 25,21 40,19 55,20 70,18 85,21 100,19' },
    { name: 'Uniswap', symbol: 'UNI', price: 6.8, change: '-0.9%', isUp: false, logoBg: 'bg-pink-500', logoText: '🦄', sparklineColor: '#ec4899', points: '10,18 25,20 40,22 55,25 70,24 85,26 100,28' },
    { name: 'Cosmos', symbol: 'ATOM', price: 4.85, change: '+1.6%', isUp: true, logoBg: 'bg-indigo-500', logoText: '⚛', sparklineColor: '#6366f1', points: '10,25 25,22 40,18 55,20 70,15 85,12 100,14' },
    { name: 'Monero', symbol: 'XMR', price: 162.1, change: '+0.5%', isUp: true, logoBg: 'bg-orange-600', logoText: 'ɱ', sparklineColor: '#f97316', points: '10,22 25,20 40,21 55,19 70,20 85,18 100,17' },
    { name: 'NEAR Protocol', symbol: 'NEAR', price: 4.5, change: '+6.1%', isUp: true, logoBg: 'bg-black text-white', logoText: 'N', sparklineColor: '#10b981', points: '10,32 25,25 40,20 55,15 70,12 85,8 100,5' },
    { name: 'Stellar', symbol: 'XLM', price: 0.095, change: '-0.2%', isUp: false, logoBg: 'bg-slate-800', logoText: '✦', sparklineColor: '#94a3b8', points: '10,18 25,19 40,20 55,21 70,20 85,22 100,21' },
    { name: 'Aptos', symbol: 'APT', price: 6.3, change: '+3.4%', isUp: true, logoBg: 'bg-slate-900', logoText: 'AP', sparklineColor: '#3b82f6', points: '10,28 25,22 40,19 55,15 70,18 85,12 100,10' },
    { name: 'Sui', symbol: 'SUI', price: 1.25, change: '+12.4%', isUp: true, logoBg: 'bg-cyan-600', logoText: 'SUI', sparklineColor: '#06b6d4', points: '10,38 25,30 40,22 55,16 70,10 85,5 100,2' },
    { name: 'Arbitrum', symbol: 'ARB', price: 0.54, change: '-1.8%', isUp: false, logoBg: 'bg-blue-600', logoText: 'AR', sparklineColor: '#3b82f6', points: '10,15 25,18 40,22 55,25 70,28 85,30 100,32' },
    { name: 'Optimism', symbol: 'OP', price: 1.45, change: '+2.7%', isUp: true, logoBg: 'bg-rose-500', logoText: 'OP', sparklineColor: '#f43f5e', points: '10,25 25,20 40,18 55,22 70,15 85,12 100,14' },
    { name: 'Render', symbol: 'RENDER', price: 5.2, change: '+7.3%', isUp: true, logoBg: 'bg-red-600', logoText: 'R', sparklineColor: '#ef4444', points: '10,30 25,25 40,20 55,14 70,10 85,8 100,4' },
    { name: 'Injective', symbol: 'INJ', price: 18.9, change: '+4.1%', isUp: true, logoBg: 'bg-purple-700', logoText: 'INJ', sparklineColor: '#a855f7', points: '10,28 25,22 40,18 55,15 70,12 85,10 100,9' },
    { name: 'Filecoin', symbol: 'FIL', price: 3.65, change: '-0.7%', isUp: false, logoBg: 'bg-emerald-600', logoText: '⨎', sparklineColor: '#10b981', points: '10,18 25,20 40,21 55,23 70,22 85,25 100,24' },
    { name: 'Hedera', symbol: 'HBAR', price: 0.065, change: '+1.9%', isUp: true, logoBg: 'bg-slate-800', logoText: 'ℏ', sparklineColor: '#64748b', points: '10,22 25,20 40,18 55,19 70,16 85,15 100,13' },
    { name: 'Immutable', symbol: 'IMX', price: 1.35, change: '-1.1%', isUp: false, logoBg: 'bg-slate-900', logoText: 'IM', sparklineColor: '#334155', points: '10,15 25,18 40,20 55,22 70,24 85,25 100,27' },
    { name: 'VeChain', symbol: 'VET', price: 0.024, change: '+0.4%', isUp: true, logoBg: 'bg-teal-600', logoText: 'V', sparklineColor: '#14b8a6', points: '10,20 25,21 40,19 55,20 70,18 85,19 100,17' },
    { name: 'Maker', symbol: 'MKR', price: 2150.0, change: '+1.2%', isUp: true, logoBg: 'bg-emerald-700', logoText: 'M', sparklineColor: '#059669', points: '10,25 25,22 40,20 55,18 70,15 85,18 100,14' },
    { name: 'Thorchain', symbol: 'RUNE', price: 4.1, change: '-3.2%', isUp: false, logoBg: 'bg-emerald-500', logoText: 'R', sparklineColor: '#10b981', points: '10,12 25,18 40,22 55,28 70,30 85,35 100,38' },
    { name: 'Aave', symbol: 'AAVE', price: 135.0, change: '+3.5%', isUp: true, logoBg: 'bg-purple-900', logoText: '👻', sparklineColor: '#a855f7', points: '10,28 25,24 40,20 55,17 70,15 85,12 100,10' },
    { name: 'Tezos', symbol: 'XTZ', price: 0.72, change: '-0.5%', isUp: false, logoBg: 'bg-blue-700', logoText: 'ꜩ', sparklineColor: '#2563eb', points: '10,18 25,19 40,21 55,20 70,22 85,21 100,23' },
    { name: 'Theta Network', symbol: 'THETA', price: 1.12, change: '+0.8%', isUp: true, logoBg: 'bg-cyan-500', logoText: 'Θ', sparklineColor: '#06b6d4', points: '10,20 25,19 40,18 55,17 70,18 85,16 100,15' },
    { name: 'Fantom', symbol: 'FTM', price: 0.55, change: '+5.2%', isUp: true, logoBg: 'bg-indigo-600', logoText: 'FT', sparklineColor: '#6366f1', points: '10,32 25,26 40,20 55,16 70,12 85,9 100,6' },
    { name: 'Algorand', symbol: 'ALGO', price: 0.14, change: '-1.4%', isUp: false, logoBg: 'bg-slate-900', logoText: 'Ⱥ', sparklineColor: '#64748b', points: '10,15 25,18 40,21 55,24 70,26 85,28 100,30' },
    { name: 'Flow', symbol: 'FLOW', price: 0.58, change: '+1.0%', isUp: true, logoBg: 'bg-emerald-500', logoText: 'F', sparklineColor: '#10b981', points: '10,22 25,20 40,19 55,21 70,18 85,17 100,16' },
    { name: 'MultiversX', symbol: 'EGLD', price: 26.5, change: '+0.3%', isUp: true, logoBg: 'bg-slate-800', logoText: 'E', sparklineColor: '#94a3b8', points: '10,20 25,21 40,20 55,19 70,20 85,18 100,19' },
    { name: 'Chiliz', symbol: 'CHZ', price: 0.062, change: '+2.1%', isUp: true, logoBg: 'bg-rose-700', logoText: 'CH', sparklineColor: '#e11d48', points: '10,25 25,22 40,19 55,17 70,15 85,14 100,12' },
    { name: 'Kava', symbol: 'KAVA', price: 0.45, change: '-0.9%', isUp: false, logoBg: 'bg-orange-700', logoText: 'K', sparklineColor: '#c2410c', points: '10,18 25,20 40,22 55,23 70,25 85,24 100,26' },
    { name: 'Gala', symbol: 'GALA', price: 0.021, change: '+4.8%', isUp: true, logoBg: 'bg-purple-600', logoText: 'G', sparklineColor: '#a855f7', points: '10,30 25,24 40,20 55,16 70,12 85,10 100,7' },
    { name: 'Curve DAO', symbol: 'CRV', price: 0.32, change: '-2.4%', isUp: false, logoBg: 'bg-red-700', logoText: 'CRV', sparklineColor: '#dc2626', points: '10,15 25,19 40,23 55,27 70,30 85,32 100,35' },
    { name: 'PancakeSwap', symbol: 'CAKE', price: 2.15, change: '+1.7%', isUp: true, logoBg: 'bg-amber-600', logoText: '🥞', sparklineColor: '#d97706', points: '10,24 25,21 40,19 55,17 70,16 85,14 100,12' },
    { name: 'Zcash', symbol: 'ZEC', price: 34.2, change: '+0.6%', isUp: true, logoBg: 'bg-amber-500', logoText: 'ⓩ', sparklineColor: '#f59e0b', points: '10,22 25,20 40,21 55,19 70,18 85,19 100,17' },
    { name: 'Dash', symbol: 'DASH', price: 24.8, change: '-0.3%', isUp: false, logoBg: 'bg-blue-800', logoText: 'Đ', sparklineColor: '#1e40af', points: '10,18 25,20 40,21 55,20 70,22 85,21 100,22' },
    { name: 'Neo', symbol: 'NEO', price: 10.5, change: '+2.2%', isUp: true, logoBg: 'bg-emerald-600', logoText: 'NEO', sparklineColor: '#059669', points: '10,25 25,22 40,19 55,17 70,15 85,13 100,11' },
    { name: 'Kusama', symbol: 'KSM', price: 18.4, change: '-1.0%', isUp: false, logoBg: 'bg-slate-900', logoText: 'KSM', sparklineColor: '#475569', points: '10,18 25,20 40,22 55,23 70,25 85,24 100,26' },
    { name: 'Synthetix', symbol: 'SNX', price: 1.55, change: '+3.1%', isUp: true, logoBg: 'bg-cyan-800', logoText: 'SNX', sparklineColor: '#0e7490', points: '10,26 25,22 40,19 55,16 70,14 85,12 100,10' },
    { name: 'Casper', symbol: 'CSPR', price: 0.011, change: '-0.5%', isUp: false, logoBg: 'bg-rose-800', logoText: 'C', sparklineColor: '#9f1239', points: '10,18 25,19 40,21 55,20 70,22 85,21 100,22' },
    { name: 'Jito', symbol: 'JTO', price: 2.8, change: '+9.5%', isUp: true, logoBg: 'bg-purple-500', logoText: 'JTO', sparklineColor: '#a855f7', points: '10,35 25,28 40,20 55,15 70,10 85,6 100,3' },
    { name: 'Pyth Network', symbol: 'PYTH', price: 0.31, change: '+4.0%', isUp: true, logoBg: 'bg-indigo-700', logoText: 'Ψ', sparklineColor: '#4f46e5', points: '10,28 25,24 40,20 55,17 70,15 85,13 100,11' },
    { name: 'Bonk', symbol: 'BONK', price: 0.000022, change: '+14.2%', isUp: true, logoBg: 'bg-amber-500', logoText: 'B', sparklineColor: '#f59e0b', points: '10,40 25,32 40,22 55,15 70,8 100,2' },
    { name: 'Floki', symbol: 'FLOKI', price: 0.00014, change: '+6.8%', isUp: true, logoBg: 'bg-amber-700', logoText: 'F', sparklineColor: '#b45309', points: '10,30 25,24 40,19 55,15 70,11 85,8 100,5' },
  ]);

  const filteredMarkets = marketData.filter((coin) => {
    const search = marketSearch.trim().toLowerCase();
    if (!search) return true;
    return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
  });

  const referenceMarkets = {
    stocks: [
      { name: 'Apple', symbol: 'AAPL', price: 229.50, change: '+1.2%', isUp: true, logoBg: 'bg-slate-700', logoText: 'A' },
      { name: 'Microsoft', symbol: 'MSFT', price: 415.20, change: '+0.8%', isUp: true, logoBg: 'bg-blue-700', logoText: 'M' },
      { name: 'NVIDIA', symbol: 'NVDA', price: 143.80, change: '+2.4%', isUp: true, logoBg: 'bg-emerald-700', logoText: 'N' },
      { name: 'Tesla', symbol: 'TSLA', price: 318.40, change: '-0.6%', isUp: false, logoBg: 'bg-red-700', logoText: 'T' },
    ],
    metals: [
      { name: 'Gold', symbol: 'XAUUSD', price: 3645.20, change: '+0.4%', isUp: true, logoBg: 'bg-amber-700', logoText: 'Au' },
      { name: 'Silver', symbol: 'XAGUSD', price: 41.20, change: '+0.7%', isUp: true, logoBg: 'bg-slate-500', logoText: 'Ag' },
      { name: 'Platinum', symbol: 'XPTUSD', price: 1390.00, change: '-0.2%', isUp: false, logoBg: 'bg-indigo-700', logoText: 'Pt' },
      { name: 'Palladium', symbol: 'XPDUSD', price: 1125.00, change: '+0.3%', isUp: true, logoBg: 'bg-purple-700', logoText: 'Pd' },
    ],
    indices: [
      { name: 'S&P 500', symbol: 'SPX', price: 6480.30, change: '+0.3%', isUp: true, logoBg: 'bg-blue-800', logoText: 'S' },
      { name: 'NASDAQ 100', symbol: 'NDX', price: 23890.10, change: '+0.6%', isUp: true, logoBg: 'bg-cyan-800', logoText: 'N' },
      { name: 'Dow Jones', symbol: 'DJI', price: 45520.40, change: '-0.1%', isUp: false, logoBg: 'bg-slate-700', logoText: 'D' },
    ],
    forex: [
      { name: 'Euro / US Dollar', symbol: 'EURUSD', price: 1.17, change: '+0.1%', isUp: true, logoBg: 'bg-blue-700', logoText: '€' },
      { name: 'British Pound / US Dollar', symbol: 'GBPUSD', price: 1.35, change: '-0.2%', isUp: false, logoBg: 'bg-red-700', logoText: '£' },
      { name: 'US Dollar / Japanese Yen', symbol: 'USDJPY', price: 147.20, change: '+0.2%', isUp: true, logoBg: 'bg-rose-700', logoText: '¥' },
    ],
    commodities: [
      { name: 'Crude Oil', symbol: 'WTI', price: 64.80, change: '+1.1%', isUp: true, logoBg: 'bg-orange-800', logoText: 'O' },
      { name: 'Brent Oil', symbol: 'BRENT', price: 68.10, change: '+0.9%', isUp: true, logoBg: 'bg-slate-800', logoText: 'B' },
      { name: 'Natural Gas', symbol: 'NATGAS', price: 3.02, change: '-0.4%', isUp: false, logoBg: 'bg-cyan-700', logoText: 'G' },
    ],
  };
  const marketSearchResults = marketData.filter((coin) => {
    const search = marketSearch.trim().toLowerCase();
    return !search || coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
  });
  const marketPageData = marketCategory === 'new'
    ? marketSearchResults.slice(-24).reverse()
    : marketCategory === 'all'
      ? marketSearchResults
      : marketCategory === 'gainers'
      ? [...marketSearchResults].sort((a, b) => Number.parseFloat(b.change) - Number.parseFloat(a.change)).slice(0, 24)
      : referenceMarkets[marketCategory] || marketSearchResults;
  const tradFiMarkets = [...referenceMarkets.forex, ...referenceMarkets.metals, ...referenceMarkets.indices, ...referenceMarkets.stocks, ...referenceMarkets.commodities];

  const referenceTradeCoin = Object.values(referenceMarkets).flat().find((coin) => coin.symbol === selectedTradeSymbol);
  const selectedTradeCoin = marketData.find((coin) => coin.symbol === selectedTradeSymbol) || referenceTradeCoin || marketData[0];
  const getMarketCoin = (symbol) => marketData.find((coin) => coin.symbol === symbol) || Object.values(referenceMarkets).flat().find((coin) => coin.symbol === symbol) || null;
  const getLivePrice = (symbol) => getMarketCoin(symbol)?.price || 0;
  const activeTradFiPosition = tradFiPositions.find((position) => position.symbol === selectedTradeSymbol);
  const activeFuturesPosition = futuresPositions.find((position) => position.symbol === selectedTradeSymbol);
  const activeSpotOrder = tradeOrders.find((order) => order.symbol === selectedTradeSymbol);

  const handleTrade = (e) => {
    e.preventDefault();
    const amount = Number(tradeAmount);
    if (tradeMode === 'TradFi') {
      if (!amount || amount <= 0) {
        setTradeNotice('Enter a trade size, for example 0.01.');
        return;
      }
      setTradFiPositions((previous) => [{
        id: Date.now(), symbol: selectedTradeCoin.symbol, side: tradFiSide,
        size: amount, entryPrice: selectedTradeCoin.price,
        openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }, ...previous]);
      setTradeNotice(`${tradFiSide === 'buy' ? 'Buy' : 'Sell'} ${amount} ${selectedTradeCoin.symbol} position opened.`);
      setTradeAmount('');
      return;
    }
    if (tradeMode === 'Futures') {
      if (!amount || amount <= 0) {
        setTradeNotice('Enter margin amount first.');
        return;
      }
      if (amount > userBalance) {
        setTradeNotice('Insufficient demo balance for this margin.');
        return;
      }
      const leverage = Number(futuresLeverage);
      const quantity = (amount * leverage) / selectedTradeCoin.price;
      setUserBalance((previous) => Number((previous - amount).toFixed(2)));
      setFuturesPositions((previous) => [{
        id: Date.now(), symbol: selectedTradeCoin.symbol, side: futuresSide, leverage, margin: amount,
        entryPrice: selectedTradeCoin.price, quantity, openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }, ...previous]);
      setTradeNotice(`${futuresSide === 'long' ? 'Long' : 'Short'} ${selectedTradeCoin.symbol} opened at ${leverage}x leverage.`);
      setTradeAmount('');
      return;
    }
    if (tradeMode === 'Options' || tradeMode === 'Alpha' || tradeMode === 'Convert') {
      setTradeNotice(`${tradeMode} is connected to the market interface. Choose Spot or Futures to place a demo order.`);
      return;
    }
    if (!amount || amount <= 0) {
      setTradeNotice('Enter a valid USDT amount first.');
      return;
    }

    if (tradeSide === 'buy' && amount > userBalance) {
      setTradeNotice('Insufficient demo balance for this buy order.');
      return;
    }

    setUserBalance((previous) => Number((previous + (tradeSide === 'buy' ? -amount : amount)).toFixed(2)));
    setTradeNotice(`${tradeSide === 'buy' ? 'Bought' : 'Sold'} ${selectedTradeCoin.symbol} for $${amount.toFixed(2)} USDT (demo order).`);
    setTradeOrders((previous) => [{
      id: Date.now(),
      side: tradeSide,
      symbol: selectedTradeCoin.symbol,
      amount,
      quantity: amount / selectedTradeCoin.price,
      price: selectedTradeCoin.price,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }, ...previous]);
    setTradeAmount('');
  };

  const closeFuturesPosition = (position) => {
    const currentPrice = getLivePrice(position.symbol) || position.entryPrice;
    const priceDifference = currentPrice - position.entryPrice;
    const pnl = (position.side === 'long' ? priceDifference : -priceDifference) * position.quantity;
    const returnedMargin = Math.max(0, position.margin + pnl);
    setUserBalance((previous) => Number((previous + returnedMargin).toFixed(2)));
    setFuturesPositions((previous) => previous.filter((item) => item.id !== position.id));
    setTradeNotice(`${position.symbol} position closed. ${pnl >= 0 ? 'Profit' : 'Loss'}: $${Math.abs(pnl).toFixed(2)} USDT.`);
  };

  const closeTradFiPosition = (position) => {
    const currentPrice = getLivePrice(position.symbol) || position.entryPrice;
    const pnl = (position.side === 'buy' ? currentPrice - position.entryPrice : position.entryPrice - currentPrice) * position.size;
    setTradFiPositions((previous) => previous.filter((item) => item.id !== position.id));
    setTradeNotice(`${position.symbol} position stopped. ${pnl >= 0 ? 'Profit' : 'Loss'}: $${Math.abs(pnl).toFixed(4)}.`);
  };

  const handleP2pOrder = (e) => {
    e.preventDefault();
    if (!Number(p2pAmount) || Number(p2pAmount) <= 0) {
      setP2pNotice('Enter a valid amount.');
      return;
    }
    const rate = p2pRates[p2pCurrency];
    const quoted = Number(p2pAmount) * rate * (p2pSide === 'buy' ? 1.005 : 0.995);
    setP2pOrders((previous) => [{
      id: Date.now(),
      type: p2pSide,
      currency: p2pCurrency,
      amount: Number(p2pAmount),
      quoted,
      status: 'Pending admin review',
      createdAt: Date.now(),
    }, ...previous]);
    setP2pNotice(`${p2pSide === 'buy' ? 'Buy' : 'Sell'} USDT offer created: ${quoted.toFixed(2)} ${p2pCurrency}.`);
    setP2pAmount('');
  };

  const updateP2pOrder = (orderId, status) => {
    setP2pOrders((previous) => previous.map((order) => order.id === orderId ? { ...order, status } : order));
  };

  const p2pCurrencyInfo = {
    THB: { name: 'Thai Baht', flag: '🇹🇭', logo: '฿' },
    USD: { name: 'US Dollar', flag: '🇺🇸', logo: '$' },
    MMK: { name: 'Myanmar Kyat', flag: '🇲🇲', logo: 'K' },
  };

  const handleVideoAdUpload = (e) => {
    e.preventDefault();
    if (!videoAdFile || !videoAdTitle.trim()) return;

    setVideoAds((previous) => [
      {
        id: Date.now(),
        title: videoAdTitle.trim(),
        description: videoAdDescription.trim(),
        url: URL.createObjectURL(videoAdFile),
        isDemo: false,
      },
      ...previous,
    ]);
    setVideoAdTitle('');
    setVideoAdDescription('');
    setVideoAdFile(null);
    e.target.reset();
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Please choose an image smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = String(reader.result);
      setProfileImage(imageData);
      window.localStorage.setItem('alexce-profile-image', imageData);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const liveWithdrawals = [
    { user: '0x8921***4312', amount: '$450.00', time: 'Just now' },
    { user: '0x3412***8890', amount: '$1,200.00', time: '1 min ago' },
    { user: '0x7765***1122', amount: '$250.00', time: '2 mins ago' },
  ];

  useEffect(() => {
    let isMounted = true;

    const loadMarketPrices = async () => {
      try {
        const endpoint = marketExchange === 'bybit'
          ? 'https://api.bybit.com/v5/market/tickers?category=spot'
          : 'https://api.binance.com/api/v3/ticker/24hr';
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Market API unavailable');
        const payload = await response.json();
        const tickers = marketExchange === 'bybit'
          ? (payload.result?.list || []).map((ticker) => ({ symbol: ticker.symbol, lastPrice: ticker.lastPrice, priceChangePercent: ticker.price24hPcnt * 100 }))
          : payload;
        if (isMounted) {
          setMarketData((previousData) => {
            const knownCoins = new Map(previousData.map((coin) => [coin.symbol, coin]));
            const liveCoins = tickers
              .filter((ticker) => ticker.symbol.endsWith('USDT') && Number(ticker.lastPrice) > 0)
              .filter((ticker) => !/(UPUSDT|DOWNUSDT|BULLUSDT|BEARUSDT)$/.test(ticker.symbol))
              .map((ticker) => {
                const symbol = ticker.symbol.replace(/USDT$/, '');
                const knownCoin = knownCoins.get(symbol);
                const price = Number(ticker.lastPrice);
                const changeValue = Number(ticker.priceChangePercent);
                return {
                  ...(knownCoin || { name: symbol, symbol, logoBg: 'bg-slate-700', logoText: symbol.slice(0, 4), sparklineColor: '#64748b', points: '10,20 30,18 50,22 70,16 90,20' }),
                  price,
                  change: `${changeValue >= 0 ? '+' : ''}${changeValue.toFixed(2)}%`,
                  isUp: changeValue >= 0,
                };
              });
            return liveCoins.length > 0 ? liveCoins : previousData;
          });
          setMarketPriceUpdatedAt(Date.now());
          setMarketApiStatus(marketExchange === 'bybit' ? 'bybit-live' : 'live');
        }
      } catch {
        if (isMounted) setMarketApiStatus('offline');
      }
    };

    loadMarketPrices();
    const liveInterval = setInterval(loadMarketPrices, 5000);
    return () => {
      isMounted = false;
      clearInterval(liveInterval);
    };
  }, [marketExchange]);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPos, setChatPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setChatPos({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragOffset.current = { x: e.clientX - chatPos.x, y: e.clientY - chatPos.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setChatPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    const touch = e.touches[0];
    dragOffset.current = { x: touch.clientX - chatPos.x, y: touch.clientY - chatPos.y };
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    setChatPos({ x: touch.clientX - dragOffset.current.x, y: touch.clientY - dragOffset.current.y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [chatPos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAddrs = ['0x4421***1234', '0x9988***5544', '0x1234***7890', '0x6677***3322'];
      const randomAmounts = ['$150.00', '$850.00', '$2,100.00', '$320.00'];
      const newWithdrawal = {
        user: randomAddrs[Math.floor(Math.random() * randomAddrs.length)],
        amount: randomAmounts[Math.floor(Math.random() * randomAmounts.length)],
        time: 'Just now',
      };
      setTeamMembers((prev) => (prev.length > 0 ? prev : prev));
      // Keep live withdrawal feed static in the UI
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const vipPlans = [
    { level: 'VIP 1', price: 100, cycle: '365Day', dailyProfit: '$5', totalProfit: '$1825', gradient: 'from-blue-600 via-indigo-600 to-cyan-500', glow: 'shadow-blue-500/20' },
    { level: 'VIP 2', price: 200, cycle: '365Day', dailyProfit: '$10', totalProfit: '$3650', gradient: 'from-purple-600 via-violet-600 to-indigo-500', glow: 'shadow-purple-500/20' },
    { level: 'VIP 3', price: 300, cycle: '365Day', dailyProfit: '$15', totalProfit: '$5475', gradient: 'from-fuchsia-600 via-pink-600 to-rose-500', glow: 'shadow-pink-500/20' },
    { level: 'VIP 4', price: 400, cycle: '365Day', dailyProfit: '$20', totalProfit: '$7300', gradient: 'from-rose-600 via-red-600 to-orange-500', glow: 'shadow-rose-500/20' },
    { level: 'VIP 5', price: 500, cycle: '365Day', dailyProfit: '$25', totalProfit: '$9125', gradient: 'from-orange-600 via-amber-600 to-yellow-500', glow: 'shadow-orange-500/20' },
    { level: 'VIP 6', price: 600, cycle: '365Day', dailyProfit: '$30', totalProfit: '$10950', gradient: 'from-emerald-600 via-teal-600 to-cyan-500', glow: 'shadow-emerald-500/20' },
    { level: 'VIP 7', price: 700, cycle: '365Day', dailyProfit: '$35', totalProfit: '$12775', gradient: 'from-cyan-600 via-sky-600 to-blue-500', glow: 'shadow-cyan-500/20' },
    { level: 'VIP 8', price: 800, cycle: '365Day', dailyProfit: '$40', totalProfit: '$14600', gradient: 'from-violet-600 via-purple-700 to-pink-600', glow: 'shadow-violet-500/20' },
    { level: 'VIP 9', price: 900, cycle: '365Day', dailyProfit: '$45', totalProfit: '$16425', gradient: 'from-amber-500 via-rose-600 to-purple-700', glow: 'shadow-amber-500/20' },
    { level: 'VIP 10', price: 1000, cycle: '365Day', dailyProfit: '$50', totalProfit: '$18250', gradient: 'from-yellow-400 via-amber-500 to-red-600', glow: 'shadow-yellow-500/30' },
  ];
  const vipCardColors = ['#26364d', '#3b2f5c', '#214a4b', '#2c523b', '#5a4b27', '#5a3826', '#5a2935', '#5a2d4d', '#3d315b', '#1e4a5a'];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const msg = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: msg }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'support', text: `Thanks for reaching out regarding "${msg}". Our support team is reviewing your request.` }]);
    }, 1000);
  };

  const handleSendGroupMessage = (e) => {
    e.preventDefault();
    const message = groupMessage.trim();
    if (!message && !groupAttachment) return;

    setGroupMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: username,
        userId: `user_${userPhone.replace(/\D/g, '').slice(-6)}`,
        text: message,
        mediaUrl: groupAttachment?.url,
        mediaType: groupAttachment?.type,
        mediaName: groupAttachment?.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      },
    ]);
    setGroupMessage('');
    setGroupAttachment(null);
  };

  const handleGroupAttachment = (e) => {
    const file = e.target.files?.[0];
    if (!file || (!file.type.startsWith('image/') && !file.type.startsWith('video/'))) return;

    setGroupAttachment({
      name: file.name,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file),
    });
    e.target.value = '';
  };

  const inviteableMembers = groupUserDirectory.filter((member) => {
    const query = groupMemberSearch.trim().toLowerCase();
    if (!query) return false;
    return member.name.toLowerCase().includes(query) || member.userId.toLowerCase().includes(query);
  });

  const handleInviteToGroup = (member) => {
    setGroupMembers((prev) => [...prev, member]);
    setGroupMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: 'ALEXCE Team',
        userId: 'alexce-team',
        text: `${username} invited ${member.name} (@${member.userId}) to the group.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false,
        isSystem: true,
      },
    ]);
    setGroupMemberSearch('');
  };

  const handleSimulateNewReferralPurchase = (levelType, vipPlanObj) => {
    if (!vipPlanObj) return;

    const rateMap = { 'Level 1': 0.07, 'Level 2': 0.03, 'Level 3': 0.01 };
    const commission = Number((vipPlanObj.price * (rateMap[levelType] || 0)).toFixed(2));

    setTotalCommissionEarned((prev) => Number((prev + commission).toFixed(2)));
    setTeamMembers((prev) => [
      {
        id: Date.now(),
        address: `0x${Math.random().toString(16).slice(2, 10)}***${Math.random().toString(10).slice(0, 4)}`,
        level: levelType,
        vipPlan: vipPlanObj.level,
        amount: vipPlanObj.price,
        commission,
        time: 'Just now',
      },
      ...prev,
    ].slice(0, 6));

    alert(`Referral commission simulated: +$${commission.toFixed(2)} USDT from ${levelType}.`);
  };

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'} min-h-screen`}>
      <header className={`${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'} sticky top-0 z-40 border-b backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="site-header-inner flex items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3">
              <AlexceLogo />
              <div>
                <div className="text-xl font-black tracking-tight">ALEXCE</div>
                <div className="text-[10px] uppercase tracking-[0.28em] opacity-60">Web3 Finance</div>
              </div>
            </div>

            <nav className="site-nav hidden md:flex items-center gap-2 text-xs font-semibold">
              {['home', 'trade', 'p2p', 'market', 'vip', 'videoads', 'share', 'team', 'history', 'groupchat', 'support', 'me'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === tab ? 'bg-purple-600 text-white' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                  {tab === 'groupchat' ? labels.groupChat : tab === 'videoads' ? labels.videoAds : tab === 'market' ? 'MARKET' : tab === 'p2p' ? 'P2P' : labels[tab]}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
                className={`${darkMode ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-200 text-slate-800 border-slate-300'} border px-2.5 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-cyan-500`}
              >
                <option value="en">English</option>
                <option value="my">မြန်မာ</option>
                <option value="th">ไทย</option>
              </select>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`px-3 py-2 rounded-xl text-xs font-bold ${darkMode ? 'bg-slate-800 text-slate-100' : 'bg-slate-200 text-slate-800'}`}
              >
                {darkMode ? labels.light : labels.dark}
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition"
              >
                {labels.withdraw}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="site-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className={`bg-gradient-to-r ${darkMode ? 'from-purple-900/50 via-indigo-950 to-slate-900 border-slate-800' : 'from-purple-100 via-indigo-50 to-slate-100 border-slate-200'} border rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8`}>
              <div className="space-y-4 max-w-xl">
                <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1.5 rounded-full font-bold border border-purple-500/20">Secure Web3 Platform</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">Trade & Earn Daily Fixed Income with ALEXCE</h1>
                <p className="opacity-80 text-sm leading-relaxed">Unlock high-yield VIP tiers ranging from VIP 1 to VIP 10 with guaranteed daily interest.</p>
                <div className="mobile-action-row flex gap-4 pt-2">
                  <button onClick={() => setActiveTab('vip')} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition">Explore VIP Plans</button>
                  <button onClick={() => setActiveTab('share')} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition">Invite & Earn</button>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} border p-6 rounded-2xl w-full md:w-80 space-y-4 shadow-xl`}>
                <div className="flex justify-between items-center text-sm opacity-70">
                  <span>Total Assets</span>
                  <span className="text-emerald-400 text-xs font-bold">+1.24%</span>
                </div>
                <div className="text-3xl font-black">${userBalance.toFixed(2)}</div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={() => setActiveTab('vip')} className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-xs font-bold transition">Deposit</button>
                  <button onClick={() => setActiveTab('withdraw')} className="bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-lg text-xs font-bold transition">Withdraw</button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold">Market Trends (Live 50+ Assets)</h2>
                  <p className="text-xs opacity-60">Prices update automatically in real-time with multi-colored sparkline charts.</p>
                </div>
                <div className="w-full sm:w-72">
                  <input
                    type="text"
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                    placeholder="Search coin name or symbol..."
                    className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500`}
                  />
                </div>
              </div>

              <div className={`mobile-scroll-table market-table ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl overflow-hidden shadow-xl max-h-[650px] overflow-y-auto`}>
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className={`border-b ${darkMode ? 'border-slate-800 bg-[#12161f] text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'} text-xs shadow-md`}>
                      <th className="p-4">Asset</th>
                      <th className="p-4">Live Price (USDT)</th>
                      <th className="p-4">24h Trend Chart</th>
                      <th className="p-4">24h Change</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'} text-sm`}>
                    {filteredMarkets.map((coin, index) => (
                      <tr key={`${coin.symbol}-${index}`} className={`transition ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                        <td className="p-4 flex items-center gap-3">
                          <MarketLogo coin={coin} />
                          <div>
                            <div className="font-bold">{coin.symbol}</div>
                            <div className="text-xs opacity-60">{coin.name}</div>
                          </div>
                        </td>
                        <td className="p-4 font-mono font-bold">${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="p-4 w-36">
                          <svg className="w-28 h-9 overflow-visible" viewBox="0 0 100 40">
                            <polyline fill="none" stroke={coin.sparklineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={coin.points} />
                          </svg>
                        </td>
                        <td className={`p-4 font-bold ${coin.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{coin.change}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => setActiveTab('vip')} className="bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition">Trade</button>
                        </td>
                      </tr>
                    ))}
                    {filteredMarkets.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center opacity-50 text-sm">No assets found matching "{marketSearch}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'p2p' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div><h2 className="text-2xl font-black text-amber-400">P2P MARKET</h2><p className="text-sm opacity-70 mt-1">Buy and sell USDT with Thailand Baht, US Dollar, or Myanmar Kyat.</p></div>
              <span className={`text-xs font-bold ${p2pApiStatus === 'live' ? 'text-emerald-400' : 'text-amber-400'}`}>● {p2pApiStatus === 'live' ? 'Live FX rates' : 'Updating FX rates'}</span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {['THB', 'USD', 'MMK'].map((currency) => <button key={currency} type="button" onClick={() => setP2pCurrency(currency)} className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition ${p2pCurrency === currency ? 'bg-amber-600 text-white' : darkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600'}`}><span className="text-lg">{p2pCurrencyInfo[currency].flag}</span><span>{p2pCurrencyInfo[currency].logo} {currency}<small className="block font-normal opacity-70">{p2pCurrencyInfo[currency].name}</small></span></button>)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[p2pCurrency, ...(p2pCurrency === 'USD' ? [] : ['USD'])].map((currency) => <div key={currency} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-lg`}><div className="flex items-center gap-2"><span className="text-2xl">{p2pCurrencyInfo[currency].flag}</span><div><div className="text-sm font-bold">{p2pCurrencyInfo[currency].name}</div><div className="text-[10px] opacity-60">{p2pCurrencyInfo[currency].logo} {currency}</div></div></div><div className="text-xl font-black mt-3">{p2pRates[currency]?.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-sm text-cyan-400">{currency}</span></div><div className="text-[10px] opacity-50 mt-1">Updated: {thailandFormatter.format(p2pRateUpdatedAt)}</div></div>)}
            </div>

            {p2pCurrency === 'USD' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-lg`}><div className="flex items-center justify-between"><div><h3 className="font-black">Live USD rate</h3><p className="text-xs opacity-60">Updated with the current FX feed</p></div><span className="text-xl font-black text-emerald-400">1 USD</span></div><svg viewBox="0 0 240 64" className="w-full h-16 mt-3" preserveAspectRatio="none"><polyline fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={p2pUsdHistory.map((value, index) => `${index * (240 / Math.max(p2pUsdHistory.length - 1, 1))},${48 - ((value - Math.min(...p2pUsdHistory)) / Math.max(Math.max(...p2pUsdHistory) - Math.min(...p2pUsdHistory), 0.0001)) * 36}`).join(' ')} /></svg></div>}

            <form onSubmit={handleP2pOrder} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-4`}>
                <h3 className="font-black">P2P order</h3>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/70"><button type="button" onClick={() => setP2pSide('buy')} className={`py-2.5 rounded-lg text-xs font-bold ${p2pSide === 'buy' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Buy USDT</button><button type="button" onClick={() => setP2pSide('sell')} className={`py-2.5 rounded-lg text-xs font-bold ${p2pSide === 'sell' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Sell USDT</button></div>
                <label className="block text-xs opacity-70">USDT amount<input type="number" min="0" step="0.01" value={p2pAmount} onChange={(e) => setP2pAmount(e.target.value)} placeholder="Enter USDT amount" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500`} /></label>
                <div className="flex justify-between text-xs opacity-60"><span>Live quote</span><span>{p2pAmount ? `${(Number(p2pAmount) * p2pRates[p2pCurrency]).toFixed(2)} ${p2pCurrency}` : `1 USDT = ${p2pRates[p2pCurrency]} ${p2pCurrency}`}</span></div>
                <button type="submit" className={`w-full py-3.5 rounded-xl text-sm font-black text-white ${p2pSide === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}>{p2pSide === 'buy' ? 'Create Buy Offer' : 'Create Sell Offer'}</button>
                {p2pNotice && <p className="text-xs text-cyan-400">{p2pNotice}</p>}
                <p className="text-[10px] opacity-50">Rates are live reference FX rates. P2P settlement is demo until a verified payment provider is connected.</p>
            </form>

            <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div><h3 className="font-black">History</h3><p className="text-xs opacity-60 mt-1">Buy and sell orders reviewed by admin.</p></div>
                <button type="button" onClick={() => setP2pIsAdmin((value) => !value)} className="text-xs font-bold text-amber-400 border border-amber-500/30 rounded-lg px-3 py-2">{p2pIsAdmin ? 'Hide Admin Review' : 'Admin Review'}</button>
              </div>
              {p2pOrders.length === 0 ? <p className="text-xs opacity-50">No P2P orders yet.</p> : <div className="space-y-2">{p2pOrders.map((order) => <div key={order.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}><div className="text-xs"><span className="font-bold uppercase">{order.type} USDT</span> · {order.amount} USDT → {order.quoted.toFixed(2)} {order.currency}<div className="opacity-50 mt-1">{thailandFormatter.format(order.createdAt)}</div></div><span className={`text-xs font-bold ${order.status === 'Approved - payment released' ? 'text-emerald-400' : order.status === 'Rejected' ? 'text-rose-400' : 'text-amber-400'}`}>{order.status}</span></div>)}</div>}
            </div>

            {p2pIsAdmin && <div className={`${darkMode ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50 border-amber-200'} border rounded-3xl p-5 shadow-xl space-y-5`}>
              <div><h3 className="font-black text-amber-400">Admin P2P Control</h3><p className="text-xs opacity-60 mt-1">Post rates and review incoming buy/sell requests.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{['THB', 'USD', 'MMK'].map((currency) => <label key={currency} className="text-xs font-bold">{p2pCurrencyInfo[currency].flag} {currency}<input type="number" min="0" step="0.0001" value={p2pRates[currency]} onChange={(e) => { setP2pRates((previous) => ({ ...previous, [currency]: Number(e.target.value) })); setP2pRateUpdatedAt(Date.now()); }} className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-xl px-3 py-2.5 text-sm`} /></label>)}</div>
              <div className="space-y-2">{p2pOrders.filter((order) => order.status === 'Pending admin review').length === 0 ? <p className="text-xs opacity-60">No pending orders.</p> : p2pOrders.filter((order) => order.status === 'Pending admin review').map((order) => <div key={order.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}><span className="text-xs">{order.type.toUpperCase()} · {order.amount} USDT · {order.currency}</span><div className="flex gap-2"><button type="button" onClick={() => updateP2pOrder(order.id, 'Approved - payment released')} className="bg-emerald-600 text-white rounded-lg px-3 py-2 text-xs font-bold">Approve</button><button type="button" onClick={() => updateP2pOrder(order.id, 'Rejected')} className="bg-rose-600 text-white rounded-lg px-3 py-2 text-xs font-bold">Reject</button></div></div>)}</div>
            </div>}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-cyan-400">CRYPTO MARKET</h2>
                <p className="text-sm opacity-70 mt-1">Current crypto prices and 24-hour market movements.</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="search" value={marketSearch} onChange={(e) => setMarketSearch(e.target.value)} placeholder="Search crypto..." className={`w-44 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500`} />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {[['new', 'New'], ['gainers', 'Hot Gainers'], ['all', 'All Crypto'], ['stocks', 'Stocks 24/5'], ['metals', 'Metals'], ['indices', 'Indices'], ['forex', 'Forex'], ['commodities', 'Commodities']].map(([category, label]) => <button key={category} type="button" onClick={() => setMarketCategory(category)} className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition ${marketCategory === category ? 'bg-cyan-600 text-white' : darkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600'}`}>{label}</button>)}
            </div>

            {marketCategory !== 'new' && marketCategory !== 'gainers' && <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">Crypto prices are live from {marketExchange === 'bybit' ? 'Bybit' : 'Binance'}. {marketCategory[0].toUpperCase() + marketCategory.slice(1)} quotes are reference instruments until a licensed multi-asset data provider API is connected.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {marketPageData.map((coin) => (
                <div key={coin.symbol} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-4 shadow-lg`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <MarketLogo coin={coin} />
                      <div className="min-w-0"><div className="font-bold">{coin.symbol}/USDT</div><div className="text-xs opacity-60 truncate">{coin.name}</div></div>
                    </div>
                    <span className={`text-xs font-bold ${coin.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{coin.change}</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3"><div className="text-xl font-black font-mono">${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><button type="button" onClick={() => { setSelectedTradeSymbol(coin.symbol); setTradeMode(tradingViewSymbols[coin.symbol] && !marketData.some((item) => item.symbol === coin.symbol) ? 'TradFi' : 'Spot'); setActiveTab('trade'); }} className="bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition">Trade</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trade' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-cyan-400">CRYPTO TRADE</h2>
                <p className="text-sm opacity-70 mt-1">Trade spot, futures, options and crypto markets from one terminal.</p>
              </div>
            </div>

            <div className={`flex gap-1 overflow-x-auto border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} pb-2`}>
              {['TradFi', 'Spot', 'Futures', 'Crypto Market', 'Options', 'Alpha', 'Convert'].map((mode) => (
                <button key={mode} type="button" onClick={() => { setTradeMode(mode); setTradeNotice(''); if (mode === 'TradFi') setSelectedTradeSymbol('EURUSD'); else if (mode === 'Spot' || mode === 'Futures' || mode === 'Crypto Market') setSelectedTradeSymbol('BTC'); }} className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition ${tradeMode === mode ? 'bg-cyan-600 text-white shadow-lg' : darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {mode}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-5 items-start">
              {['TradFi', 'Spot', 'Futures', 'Crypto Market'].includes(tradeMode) && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-4 sm:p-5 shadow-xl`}>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <select value={selectedTradeSymbol} onChange={(e) => setSelectedTradeSymbol(e.target.value)} className={`${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-cyan-500`}>
                      {(tradeMode === 'TradFi' ? tradFiMarkets : marketData.slice(0, 12)).map((coin) => <option key={coin.symbol} value={coin.symbol}>{tradeMode === 'TradFi' ? coin.symbol : `${coin.symbol}/USDT`}</option>)}
                    </select>
                    <div>
                      <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${selectedTradeCoin.isUp ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`}></span><span className="text-[10px] uppercase tracking-wider opacity-50">Last price</span></div>
                      <div className="text-xl font-black tabular-nums">${selectedTradeCoin.price < 1 ? selectedTradeCoin.price.toFixed(6) : selectedTradeCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div className={`text-xs font-bold ${selectedTradeCoin.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{selectedTradeCoin.change} 24h</div>
                    </div>
                  </div>
                  <div className="text-right text-xs opacity-60">{tradeMode === 'TradFi' ? 'TradFi market' : 'Crypto market'}<br />Live TradingView chart<br /><span className="text-[10px]">Updated {new Date(marketPriceUpdatedAt).toLocaleTimeString()}</span></div>
                </div>

                <div className={`${chartExpanded ? 'fixed inset-0 z-[60] rounded-none p-3 sm:p-6' : 'relative h-72 sm:h-96 rounded-2xl'} ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} border overflow-hidden`}>
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <button type="button" onClick={() => setChartExpanded((expanded) => !expanded)} className={`${darkMode ? 'bg-slate-800/90 text-white hover:bg-slate-700' : 'bg-white/90 text-slate-900 hover:bg-slate-100'} border border-white/10 rounded-lg px-3 py-2 text-xs font-bold shadow-lg`}>
                      {chartExpanded ? 'Exit view' : 'Expand chart'}
                    </button>
                  </div>
                  {tradeMode === 'TradFi' ? <TradingViewChart symbol={tradingViewSymbols[selectedTradeSymbol] || 'FX:EURUSD'} interval={selectedTimeframe === '1D' ? 'D' : selectedTimeframe === '1h' ? '60' : selectedTimeframe === '4h' ? '240' : selectedTimeframe.replace('m', '')} darkMode={darkMode} /> : <AlignedCryptoChart symbol={selectedTradeSymbol} interval={selectedTimeframe === '1D' ? '1d' : selectedTimeframe === '1h' ? '1h' : selectedTimeframe === '4h' ? '4h' : selectedTimeframe === '2m' ? '1m' : selectedTimeframe} darkMode={darkMode} currentPrice={selectedTradeCoin.price} entryPrice={activeFuturesPosition?.entryPrice || activeSpotOrder?.price} side={activeFuturesPosition?.side || activeSpotOrder?.side} />}
                  {tradeMode === 'TradFi' && activeTradFiPosition && <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-amber-400 pointer-events-none"><span className="absolute right-3 -top-6 rounded-md bg-amber-500 px-2 py-1 text-[10px] font-bold text-slate-950">Entry {activeTradFiPosition.entryPrice.toFixed(4)}</span></div>}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {['1m', '2m', '5m', '15m', '1h', '4h', '1D'].map((timeframe) => (
                    <button key={timeframe} type="button" onClick={() => setSelectedTimeframe(timeframe)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${selectedTimeframe === timeframe ? 'bg-cyan-600 text-white' : darkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}>
                      {timeframe}
                    </button>
                  ))}
                  <span className="ml-auto text-[10px] opacity-50">Live from TradingView</span>
                </div>
              </div>}

              {tradeMode === 'Options' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-5`}>
                <div><h3 className="text-lg font-black text-amber-400">Options Market</h3><p className="text-xs opacity-60 mt-1">Choose an options contract for {selectedTradeCoin.symbol}.</p></div>
                <div className="grid grid-cols-2 gap-3"><button type="button" className="py-3 rounded-xl bg-emerald-600 text-white font-bold">Call</button><button type="button" className="py-3 rounded-xl bg-rose-600/20 text-rose-400 font-bold">Put</button></div>
                <div className={`grid grid-cols-2 gap-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} p-4 rounded-2xl text-sm`}><div><span className="text-xs opacity-60">Underlying</span><div className="font-bold mt-1">{selectedTradeCoin.symbol}/USDT</div></div><div><span className="text-xs opacity-60">Spot price</span><div className="font-bold mt-1">${selectedTradeCoin.price.toLocaleString()}</div></div></div>
                <div className="grid grid-cols-2 gap-3"><div><label className="text-xs opacity-60">Expiry</label><select className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'} border rounded-xl px-3 py-3 text-sm`}><option>Today</option><option>Tomorrow</option><option>7 Days</option></select></div><div><label className="text-xs opacity-60">Strike</label><input value={selectedTradeCoin.price.toFixed(2)} readOnly className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'} border rounded-xl px-3 py-3 text-sm`} /></div></div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">Options order preview is available. Connect an exchange options API to submit live contracts.</div>
              </div>}

              {tradeMode === 'Alpha' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-4`}>
                <div><h3 className="text-lg font-black text-fuchsia-400">Alpha Signals</h3><p className="text-xs opacity-60 mt-1">Market opportunities based on the live selected pair.</p></div>
                {[['Momentum', 'Bullish', 'text-emerald-400'], ['Volume flow', 'Strong', 'text-cyan-400'], ['Risk level', 'Medium', 'text-amber-400']].map(([label, value, color]) => <div key={label} className={`flex items-center justify-between p-4 rounded-2xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}><span className="text-sm">{label}</span><span className={`text-sm font-bold ${color}`}>{value}</span></div>)}
                <div className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs text-fuchsia-300">Alpha insights are informational only and do not guarantee profit.</div>
              </div>}

              {tradeMode === 'Convert' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-4`}>
                <div><h3 className="text-lg font-black text-cyan-400">Convert Assets</h3><p className="text-xs opacity-60 mt-1">Instantly swap one supported asset for another.</p></div>
                <label className="block text-xs opacity-70">From<input value="100" readOnly className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'} border rounded-xl px-4 py-3 text-sm`} /></label>
                <label className="block text-xs opacity-70">Asset pair<select className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'} border rounded-xl px-4 py-3 text-sm`}><option>USDT → {selectedTradeCoin.symbol}</option><option>{selectedTradeCoin.symbol} → USDT</option></select></label>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">Live conversion quote will be supplied by the exchange API.</div>
              </div>}

              <form onSubmit={handleTrade} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-5`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-black">{tradeMode} {tradeMode === 'Convert' ? 'Asset' : 'Order'}</h3>
                  <span className="text-xs opacity-60">Balance ${userBalance.toFixed(2)}</span>
                </div>
                {tradeMode === 'TradFi' ? <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/70">
                  <button type="button" onClick={() => setTradFiSide('buy')} className={`py-2.5 rounded-lg text-sm font-bold transition ${tradFiSide === 'buy' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Buy / Long</button>
                  <button type="button" onClick={() => setTradFiSide('sell')} className={`py-2.5 rounded-lg text-sm font-bold transition ${tradFiSide === 'sell' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Sell / Short</button>
                </div> : tradeMode === 'Futures' ? <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/70">
                  <button type="button" onClick={() => setFuturesSide('long')} className={`py-2.5 rounded-lg text-sm font-bold transition ${futuresSide === 'long' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Long / Buy</button>
                  <button type="button" onClick={() => setFuturesSide('short')} className={`py-2.5 rounded-lg text-sm font-bold transition ${futuresSide === 'short' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Short / Sell</button>
                </div> : <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900/70">
                  <button type="button" onClick={() => setTradeSide('buy')} className={`py-2.5 rounded-lg text-sm font-bold transition ${tradeSide === 'buy' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Buy</button>
                  <button type="button" onClick={() => setTradeSide('sell')} className={`py-2.5 rounded-lg text-sm font-bold transition ${tradeSide === 'sell' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Sell</button>
                </div>}
                <div>
                  <label className="text-xs opacity-70 font-semibold">Market</label>
                  <div className={`mt-1 px-3 py-3 rounded-xl border text-sm font-bold ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>{selectedTradeCoin.name} ({selectedTradeCoin.symbol})</div>
                </div>
                {tradeMode === 'Futures' && <div><label className="text-xs opacity-70 font-semibold">Leverage</label><select value={futuresLeverage} onChange={(e) => setFuturesLeverage(e.target.value)} className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm`}><option value="2">2x</option><option value="5">5x</option><option value="10">10x</option><option value="20">20x</option><option value="50">50x</option></select></div>}
                <div>
                  <label className="text-xs opacity-70 font-semibold">{tradeMode === 'Futures' ? 'Margin (USDT)' : tradeMode === 'TradFi' ? 'Trade size / lots' : 'Amount (USDT)'}</label>
                  <input type="number" min="0" step="0.01" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder={tradeMode === 'TradFi' ? 'Example: 0.01' : 'Enter amount'} className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[25, 100, 500, 1000].map((amount) => <button key={amount} type="button" onClick={() => setTradeAmount(String(amount))} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${darkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}>${amount}</button>)}
                </div>
                <div className={`grid grid-cols-2 gap-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} rounded-xl p-3 text-xs`}><div><span className="opacity-60">{tradeMode === 'Futures' ? 'Mark price' : 'Live price'}</span><div className="font-bold mt-1">${selectedTradeCoin.price.toLocaleString()}</div></div><div><span className="opacity-60">Est. quantity</span><div className="font-bold mt-1">{tradeAmount && Number(tradeAmount) > 0 ? (tradeMode === 'Futures' ? (Number(tradeAmount) * Number(futuresLeverage) / selectedTradeCoin.price).toFixed(6) : (Number(tradeAmount) / selectedTradeCoin.price).toFixed(6)) : '0.000000'} {selectedTradeCoin.symbol}</div></div></div>
                <button type="submit" className={`w-full py-3.5 rounded-xl text-sm font-black text-white uppercase transition ${tradeMode === 'TradFi' ? tradFiSide === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500' : tradeMode === 'Futures' ? futuresSide === 'long' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500' : tradeSide === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}>{tradeMode === 'TradFi' ? `${tradFiSide === 'buy' ? 'Buy' : 'Sell'} ${selectedTradeCoin.symbol}` : tradeMode === 'Futures' ? `Open ${futuresSide}` : tradeMode === 'Convert' ? 'Convert Asset' : `${tradeSide} ${selectedTradeCoin.symbol}`}</button>
                {tradeNotice && <p className="text-xs text-cyan-400 leading-relaxed">{tradeNotice}</p>}
              </form>
            </div>
            <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl`}>
              <div className="flex items-center justify-between mb-4"><h3 className="font-black">Trade History</h3><span className="text-xs opacity-50">{tradeOrders.length} orders</span></div>
              {tradeOrders.length === 0 ? <p className="text-xs opacity-50">Your completed trades will appear here.</p> : <div className="space-y-2">{tradeOrders.map((order) => <div key={order.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}><div className="text-xs"><span className={`font-black uppercase ${order.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>{order.side}</span> <span className="font-bold">{order.symbol}</span><span className="opacity-60"> · {order.quantity.toFixed(6)} coins at ${order.price.toLocaleString()}</span></div><span className="text-[11px] opacity-50">${order.amount.toFixed(2)} USDT · {order.time}</span></div>)}</div>}
            </div>
            {tradeMode === 'Futures' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl`}>
              <div className="flex items-center justify-between mb-4"><h3 className="font-black">Open Positions</h3><span className="text-xs opacity-50">Live mark price</span></div>
              {futuresPositions.length === 0 ? <p className="text-xs opacity-50">No open futures positions.</p> : <div className="space-y-2">{futuresPositions.map((position) => { const currentPrice = getLivePrice(position.symbol) || position.entryPrice; const pnl = (position.side === 'long' ? currentPrice - position.entryPrice : position.entryPrice - currentPrice) * position.quantity; return <div key={position.id} className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}><div className="text-xs"><span className={`font-black uppercase ${position.side === 'long' ? 'text-emerald-400' : 'text-rose-400'}`}>{position.side}</span> <b>{position.symbol}</b> · {position.leverage}x<div className="opacity-60 mt-1">Entry ${position.entryPrice.toLocaleString()} · Mark ${currentPrice.toLocaleString()} · Margin ${position.margin.toFixed(2)}</div></div><div className="flex items-center gap-3"><span className={`font-black ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pnl >= 0 ? '+' : '-'}${Math.abs(pnl).toFixed(2)} PnL</span><button type="button" onClick={() => closeFuturesPosition(position)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-xs font-bold">Close</button></div></div>; })}</div>}
            </div>}
            {tradeMode === 'TradFi' && <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl`}>
              <div className="flex items-center justify-between mb-4"><h3 className="font-black">Open TradFi Positions</h3><span className="text-xs opacity-50">Live PnL</span></div>
              {tradFiPositions.length === 0 ? <p className="text-xs opacity-50">No open TradFi positions.</p> : <div className="space-y-2">{tradFiPositions.map((position) => { const currentPrice = getLivePrice(position.symbol) || position.entryPrice; const pnl = (position.side === 'buy' ? currentPrice - position.entryPrice : position.entryPrice - currentPrice) * position.size; return <div key={position.id} className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}><div className="text-xs"><span className={`font-black uppercase ${position.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>{position.side}</span> <b>{position.symbol}</b> · Size {position.size.toFixed(2)}<div className="opacity-60 mt-1">Entry ${position.entryPrice.toFixed(4)} · Current ${currentPrice.toFixed(4)}</div></div><div className="flex items-center gap-3"><span className={`font-black ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pnl >= 0 ? '+' : '-'}${Math.abs(pnl).toFixed(4)} PnL</span><button type="button" onClick={() => closeTradFiPosition(position)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-xs font-bold">Stop / Close</button></div></div>; })}</div>}
            </div>}
          </div>
        )}

        {activeTab === 'videoads' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-black text-rose-400">VIDEO ADS</h2>
              <p className="text-sm opacity-70 mt-1">Watch the latest ALEXCE announcements and promotional videos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-5 items-start">
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {videoAds.map((video) => (
                  <article key={video.id} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-xl`}>
                    {video.url ? <video src={video.url} controls className="w-full aspect-video bg-black object-contain" /> : <div className="w-full aspect-video bg-gradient-to-br from-rose-600 via-purple-700 to-cyan-600 flex items-center justify-center text-5xl">▶</div>}
                    <div className="p-4 space-y-2">
                      <h3 className="font-black">{video.title}</h3>
                      <p className="text-xs opacity-65 leading-relaxed">{video.description || 'ALEXCE video announcement'}</p>
                    </div>
                  </article>
                ))}
              </section>

              <form onSubmit={handleVideoAdUpload} className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-5 shadow-xl space-y-4`}>
                <div>
                  <h3 className="font-black text-amber-400">Admin Upload</h3>
                  <p className="text-xs opacity-60 mt-1">Upload a video for users to watch.</p>
                </div>
                <input required type="text" value={videoAdTitle} onChange={(e) => setVideoAdTitle(e.target.value)} placeholder="Video title" className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500`} />
                <textarea value={videoAdDescription} onChange={(e) => setVideoAdDescription(e.target.value)} placeholder="Short description" rows="3" className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-rose-500`} />
                <label className={`block cursor-pointer border border-dashed rounded-xl p-4 text-center text-xs ${darkMode ? 'border-slate-700 hover:bg-slate-900' : 'border-slate-300 hover:bg-slate-50'}`}>
                  <span>{videoAdFile ? videoAdFile.name : 'Choose MP4, WebM or MOV video'}</span>
                  <input required type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => setVideoAdFile(e.target.files?.[0] || null)} className="hidden" />
                </label>
                <button type="submit" className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-black transition">Upload Video Ad</button>
                <p className="text-[11px] text-amber-300/80">Preview upload is active in this browser. Cloud storage is needed for every user to see it.</p>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'vip' && (
          <div className="space-y-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border p-5 shadow-xl ${darkMode ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-cyan-500/30' : 'bg-gradient-to-r from-cyan-50 via-white to-purple-50 border-cyan-200'}`}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-bold">ALEXCE Trading System</p>
                <h2 className="text-xl sm:text-2xl font-black mt-1">Launch ALEXCE Trading System</h2>
                <p className="text-xs opacity-70 mt-1">Thailand time: {thailandTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center min-w-20">
                  <div className="text-2xl font-black text-amber-400 tabular-nums">{vipCooldownActive ? `${cooldownHours}:${cooldownMinutes}:${cooldownSeconds}` : 'READY'}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">{vipCooldownActive ? 'Next action in' : 'Available now'}</div>
                </div>
                <button type="button" disabled={vipCooldownActive} onClick={handleVipDailyAction} className={`px-4 py-3 rounded-xl text-xs font-black text-white transition ${vipCooldownActive ? 'bg-slate-600 cursor-not-allowed opacity-70' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
                  {vipCooldownActive ? '24H Cooldown' : 'Launch System'}
                </button>
              </div>
            </div>
            <div className={`${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl px-4 py-3 text-xs shadow-lg`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-bold opacity-80">VIP Launch History</span>
                {lastVipActionTime ? (
                  <span className="text-emerald-400">Used: {lastVipActionTime} (Thailand time)</span>
                ) : (
                  <span className="text-amber-400">Not used yet</span>
                )}
              </div>
              {nextVipActionTime && <div className="mt-1 opacity-60">Next available: {nextVipActionTime} (Thailand time)</div>}
            </div>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-amber-400">VIP INVESTMENT TIERS (VIP 1 - VIP 10)</h2>
              <p className="text-sm opacity-70">Choose your VIP card below to view deposit details or simulate referral commissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {vipPlans.map((plan, index) => (
                <div key={index} style={{ backgroundColor: vipCardColors[index] }} className={`rounded-3xl p-6 border border-white/25 shadow-2xl ${plan.glow} flex flex-col justify-between space-y-6 relative overflow-hidden`}>
                  <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-white/15"></div>
                  <div className="absolute right-5 top-16 w-16 h-10 rounded-lg border border-white/20 bg-white/10 rotate-12"></div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white">{plan.level}</span>
                      <span className="text-[10px] bg-black/40 text-white px-3 py-1 rounded-full font-bold">VIP CARD</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-8 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 border border-yellow-100/70 shadow-inner relative"><span className="absolute inset-x-2 top-3 border-t border-yellow-700/50"></span><span className="absolute inset-y-2 left-5 border-l border-yellow-700/50"></span></div>
                      <span className="text-lg font-black tracking-[0.25em] text-white/80">ALEXCE</span>
                    </div>
                    <div className="text-lg font-mono tracking-[0.16em] text-white/90">••••  ••••  ••••  {String(1000 + index).slice(-4)}</div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/70"><span>Member Card</span><span>Valid 12/30</span></div>
                    <div>
                      <span className="text-[11px] text-white/80 uppercase font-bold">Investment Price</span>
                      <div className="text-4xl font-black text-white mt-0.5">${plan.price} <span className="text-sm font-medium text-white/90">USDT</span></div>
                    </div>

                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs text-white border border-white/10">
                      <div>
                        <span className="text-white/70">Cycle</span>
                        <p className="font-bold mt-0.5">{plan.cycle}</p>
                      </div>
                      <div>
                        <span className="text-white/70">Daily Profit</span>
                        <p className="font-bold text-emerald-300 mt-0.5">{plan.dailyProfit}</p>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setSelectedVip(plan)} className="w-full py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-black text-xs rounded-2xl shadow-xl uppercase transition">
                    Deposit ${plan.price} to Unlock {plan.level}
                  </button>
                </div>
              ))}
            </div>

            {selectedVip && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className={`${darkMode ? 'bg-[#12161f] border-purple-500/40 text-white' : 'bg-white border-slate-300 text-slate-900'} border w-full max-w-md rounded-3xl p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto`}>
                  <button onClick={() => setSelectedVip(null)} className="absolute top-5 right-5 opacity-70 hover:opacity-100 font-bold text-lg">✕</button>

                  <div className="text-center space-y-2">
                    <p className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 py-1.5 px-3 rounded-full inline-block">
                      Only send BSC/BEP20 to this address
                    </p>
                    <h3 className="text-2xl font-black">{selectedVip.level} Activation</h3>
                    <p className="text-sm opacity-70">Send exactly <span className="text-emerald-400 font-bold">${selectedVip.price} USDT</span></p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${walletAddress}`} alt="QR" className="w-full h-full object-contain" />
                  </div>

                  <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'} border rounded-xl p-3 flex items-center justify-between gap-3`}>
                    <span className="text-xs font-mono text-cyan-400 truncate">{walletAddress}</span>
                    <button onClick={() => handleCopy(walletAddress)} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <p className="text-[11px] text-center opacity-70 font-bold">Simulate Referral Purchase (Test Auto Commission):</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => { handleSimulateNewReferralPurchase('Level 1', selectedVip); setSelectedVip(null); }} className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-[11px] font-bold">L1 (7%)</button>
                      <button onClick={() => { handleSimulateNewReferralPurchase('Level 2', selectedVip); setSelectedVip(null); }} className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-[11px] font-bold">L2 (3%)</button>
                      <button onClick={() => { handleSimulateNewReferralPurchase('Level 3', selectedVip); setSelectedVip(null); }} className="bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl text-[11px] font-bold">L3 (1%)</button>
                    </div>
                  </div>

                  <button onClick={() => {
                    setUserBalance((prev) => prev + selectedVip.price);
                    alert(`🎉 Deposit of $${selectedVip.price} USDT confirmed successfully! ${selectedVip.level} is now active and added to your balance.`);
                    setSelectedVip(null);
                  }} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl uppercase shadow-lg shadow-emerald-600/30 transition">
                    I Have Made Payment (Auto-Deposit)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className={`max-w-xl mx-auto space-y-6 ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-8 rounded-3xl`}>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-rose-400">USDT WITHDRAWAL</h2>
              <p className="text-xs opacity-70">Available Balance: <span className="text-emerald-400 font-bold">${userBalance.toFixed(2)} USDT</span></p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs opacity-70 font-semibold">Withdrawal Amount ($)</label>
                <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Enter amount" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500`} />
              </div>
              <div>
                <label className="text-xs opacity-70 font-semibold">TRC20 / BEP20 Wallet Address</label>
                <input type="text" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} placeholder="Paste your address here" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-rose-500`} />
              </div>
              <button onClick={() => {
                if (!withdrawAmount || !withdrawAddress) { alert('Please fill in all fields!'); return; }
                if (Number(withdrawAmount) > userBalance) { alert('Insufficient balance!'); return; }
                setUserBalance((prev) => prev - Number(withdrawAmount));
                alert(`Withdrawal request of $${withdrawAmount} submitted successfully!`);
                setWithdrawAmount('');
                setWithdrawAddress('');
              }} className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl uppercase tracking-wider shadow-lg shadow-rose-600/30 transition">
                Submit Withdrawal
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-cyan-400">TRANSACTION HISTORY</h2>
              <div className={`mobile-scroll-table ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl overflow-hidden shadow-xl`}>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'} text-xs`}>
                      <th className="p-4">Type</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    <tr className={darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="p-4 font-bold text-emerald-400">VIP 2 Deposit</td>
                      <td className="p-4 font-bold">$200.00 USDT</td>
                      <td className="p-4"><span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">Completed</span></td>
                      <td className="p-4 text-right opacity-60 text-xs">2026-06-12 14:20</td>
                    </tr>
                    <tr className={darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="p-4 font-bold text-rose-400">Withdrawal</td>
                      <td className="p-4 font-bold">$450.00 USDT</td>
                      <td className="p-4"><span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">Completed</span></td>
                      <td className="p-4 text-right opacity-60 text-xs">2026-06-10 09:15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border p-6 rounded-3xl shadow-2xl space-y-4`}>
              <div className={`flex justify-between items-center border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
                  <h3 className="text-base font-bold tracking-wide">Live Platform Withdrawals</h3>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">Real-time Feed</span>
              </div>

              <div className="space-y-3">
                {liveWithdrawals.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'} border p-3.5 rounded-2xl`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">💸</div>
                      <div>
                        <div className="text-xs opacity-60">Wallet Address</div>
                        <div className="text-sm font-mono font-bold text-cyan-400">{item.user}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-emerald-400">+{item.amount} USDT</div>
                      <div className="text-[11px] opacity-50">{item.time} • Successful</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'groupchat' && (
          <div className="group-chat-layout max-w-5xl mx-auto space-y-5">
            <div>
              <h2 className="text-2xl font-black text-cyan-400">COMMUNITY GROUP CHAT</h2>
              <p className="text-sm opacity-70 mt-1">Chat with other ALEXCE users and share your trading experience.</p>
            </div>

            <div className={`group-chat-card ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-xl`}>
              <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-sm">ALEXCE Community</span>
                </div>
                <span className="text-xs opacity-60">{groupMembers.length} members</span>
              </div>

              <div className={`h-[26rem] overflow-y-auto space-y-4 p-4 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                {groupMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[82%] ${message.isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="flex items-center gap-2 px-1 mb-1">
                        <span className={`text-[11px] font-bold ${message.isCurrentUser ? 'text-cyan-400' : 'text-purple-400'}`}>
                          {message.isCurrentUser ? `${message.user} (You)` : message.user}
                        </span>
                        {!message.isSystem && <span className="text-[10px] opacity-40">@{message.userId}</span>}
                        <span className="text-[10px] opacity-40">{message.time}</span>
                      </div>
                      <div className={`${message.isSystem ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300' : message.isCurrentUser ? 'bg-cyan-600 text-white rounded-br-none' : `${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800 border border-slate-200'} rounded-bl-none`} p-3 rounded-2xl text-sm leading-relaxed`}>
                        {message.text && <div>{message.text}</div>}
                        {message.mediaUrl && message.mediaType === 'image' && <img src={message.mediaUrl} alt={message.mediaName || 'Shared image'} className="mt-2 max-h-64 max-w-full rounded-xl object-contain" />}
                        {message.mediaUrl && message.mediaType === 'video' && <video src={message.mediaUrl} controls className="mt-2 max-h-64 max-w-full rounded-xl" />}
                        {message.mediaName && <div className="mt-1 text-[10px] opacity-60">{message.mediaName}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendGroupMessage} className={`p-3 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'} flex gap-2`}>
                <label className={`shrink-0 cursor-pointer ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} px-3 py-3 rounded-xl text-sm transition`} title="Upload image or video">
                  📎
                  <input type="file" accept="image/*,video/*" onChange={handleGroupAttachment} className="hidden" />
                </label>
                <input
                  type="text"
                  value={groupMessage}
                  onChange={(e) => setGroupMessage(e.target.value)}
                  placeholder="Write a message to the group..."
                  className={`flex-1 min-w-0 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500`}
                />
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 rounded-xl text-xs font-bold transition shadow-lg">
                  Send
                </button>
              </form>
              {groupAttachment && <div className={`px-4 pb-3 text-xs ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>Attached: {groupAttachment.name}</div>}
            </div>

            <aside className={`group-chat-members ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-4 shadow-xl`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Group Members</h3>
                <span className="text-xs opacity-60">{groupMembers.length}</span>
              </div>
              <div className="space-y-2 mb-5 max-h-40 overflow-y-auto">
                {groupMembers.map((member) => (
                  <div key={member.id} className={`flex items-center gap-2 p-2 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-black text-white">{member.name[0]}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{member.name}</div>
                      <div className="text-[10px] opacity-50 truncate">@{member.userId}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'} pt-4`}>
                <h3 className="font-bold text-sm mb-1">Invite a user</h3>
                <p className="text-[11px] opacity-60 mb-2">Search by name or user ID</p>
                <input type="search" value={groupMemberSearch} onChange={(e) => setGroupMemberSearch(e.target.value)} placeholder="Name or user ID" className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500`} />
                {groupMemberSearch && (
                  <div className="mt-2 space-y-2">
                    {inviteableMembers.length > 0 ? inviteableMembers.map((member) => (
                      <div key={member.id} className={`flex items-center justify-between gap-2 p-2 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{member.name}</div>
                          <div className="text-[10px] opacity-50 truncate">@{member.userId}</div>
                        </div>
                        <button type="button" onClick={() => handleInviteToGroup(member)} className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold">Invite</button>
                      </div>
                    )) : <p className="text-[11px] opacity-50 mt-2">No user found</p>}
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'share' && (
          <div className={`max-w-xl mx-auto space-y-6 ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border rounded-3xl p-6 md:p-8`}>
            <p className="text-sm font-medium opacity-80">Build your own team and receive multi-level commissions automatically.</p>

            <div className="space-y-1">
              <span className="text-xs opacity-70 font-medium">My Referral Link</span>
              <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'} border rounded-2xl p-3 flex items-center justify-between gap-3`}>
                <span className="text-xs font-mono text-cyan-400 truncate">https://alexce.exchange/#/register?invite=457465</span>
                <button onClick={() => handleCopy('https://alexce.exchange/#/register?invite=457465')} className="bg-purple-600 text-white px-5 py-1.5 rounded-xl text-xs font-bold">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className={`border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} flex gap-8 pt-2`}>
              <button onClick={() => setRefSubTab('deposit')} className={`pb-3 text-sm font-bold transition border-b-2 ${refSubTab === 'deposit' ? 'border-purple-400' : 'border-transparent opacity-60'}`}>Deposit</button>
              <button onClick={() => setRefSubTab('invite')} className={`pb-3 text-sm font-bold transition border-b-2 ${refSubTab === 'invite' ? 'border-purple-400' : 'border-transparent opacity-60'}`}>Invite</button>
            </div>

            <div className={`${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'} border rounded-2xl p-5 space-y-4`}>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                Invite friends to make their first deposit and you will receive a three-level commission reward.
              </p>

              <div className={`${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'} border rounded-xl overflow-hidden`}>
                <div className={`grid grid-cols-2 p-3 text-xs font-bold opacity-70 border-b ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-100'}`}>
                  <div>Level</div>
                  <div className="text-right">Commission Rate</div>
                </div>
                <div className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'} text-xs font-medium`}>
                  <div className="grid grid-cols-2 p-3"><div>Level 1</div><div className="text-right text-emerald-400 font-bold">7%</div></div>
                  <div className="grid grid-cols-2 p-3"><div>Level 2</div><div className="text-right text-cyan-400 font-bold">3%</div></div>
                  <div className="grid grid-cols-2 p-3"><div>Level 3</div><div className="text-right text-purple-400 font-bold">1%</div></div>
                </div>
              </div>
            </div>

            <button onClick={() => setActiveTab('team')} className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-cyan-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition uppercase">
              View Team Members
            </button>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-amber-400">TEAM COMMISSION DASHBOARD</h2>
                <p className="text-sm opacity-70">Total Commission Earned: <span className="text-emerald-400 font-bold">${totalCommissionEarned.toFixed(2)} USDT</span></p>
              </div>
            </div>

            <div className={`mobile-scroll-table ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl overflow-hidden shadow-xl`}>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'} text-xs`}>
                    <th className="p-4">Member Address</th>
                    <th className="p-4">Referral Level</th>
                    <th className="p-4">VIP Package</th>
                    <th className="p-4">Commission Earned</th>
                    <th className="p-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className={darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="p-4 font-mono font-bold text-cyan-400">{member.address}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${member.level === 'Level 1' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : member.level === 'Level 2' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
                          {member.level} ({member.level === 'Level 1' ? '7%' : member.level === 'Level 2' ? '3%' : '1%'})
                        </span>
                      </td>
                      <td className="p-4 font-bold text-amber-400">{member.vipPlan} (${member.amount})</td>
                      <td className="p-4 font-black text-emerald-400">+${member.commission.toFixed(2)} USDT</td>
                      <td className="p-4 text-right opacity-60 text-xs">{member.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className={`max-w-2xl mx-auto space-y-4 ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-3xl`}>
            <div className={`flex items-center gap-3 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} pb-4`}>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow">💬</div>
              <div>
                <h2 className="text-lg font-bold">ALEXCE Live Customer Support</h2>
                <p className="text-xs text-emerald-400 font-medium">● Online 24/7</p>
              </div>
            </div>

            <div className={`h-80 overflow-y-auto space-y-3 p-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'} rounded-2xl border`}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none shadow-lg' : `${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'} border rounded-bl-none`}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type your question here..." className={`flex-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500`} />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg">Send</button>
            </form>
          </div>
        )}

        {activeTab === 'me' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`bg-gradient-to-r ${darkMode ? 'from-purple-900/40 via-indigo-950 to-slate-900 border-slate-800' : 'from-purple-100 via-indigo-50 to-white border-slate-200'} border p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-20 h-20 shrink-0">
                  {profileImage ? <img src={profileImage} alt={`${username} profile`} className="w-20 h-20 rounded-3xl object-cover shadow-xl" /> : <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl">{username[0]}</div>}
                  <label className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-500 border-2 border-slate-950 flex items-center justify-center text-sm cursor-pointer shadow-lg" title="Upload profile photo">
                    📷
                    <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                  </label>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black">{username}</h2>
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">VIP 2 Active</span>
                  </div>
                  <p className="text-xs opacity-70 font-mono">ID: 8921456 | Phone: {userPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => {
                    setTempUsername(username);
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setTempPhone(userPhone);
                    setIsEditingProfile(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg transition"
                >
                  Edit Profile & Security
                </button>
                <button onClick={() => alert('Logged out successfully!')} className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-rose-500/30 transition">
                  Log Out
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border p-5 rounded-2xl shadow-lg space-y-1`}>
                <span className="text-xs opacity-60 font-medium">Main Balance</span>
                <div className="text-2xl font-black text-emerald-400">${userBalance.toFixed(2)} <span className="text-xs font-normal opacity-70">USDT</span></div>
              </div>
              <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border p-5 rounded-2xl shadow-lg space-y-1`}>
                <span className="text-xs opacity-60 font-medium">Team Commission</span>
                <div className="text-2xl font-black text-amber-400">${totalCommissionEarned.toFixed(2)} <span className="text-xs font-normal opacity-70">USDT</span></div>
              </div>
              <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border p-5 rounded-2xl shadow-lg space-y-1`}>
                <span className="text-xs opacity-60 font-medium">Team Members</span>
                <div className="text-2xl font-black text-cyan-400">{teamMembers.length} <span className="text-xs font-normal opacity-70">Users</span></div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-6 shadow-xl space-y-3`}>
              <h3 className="text-sm font-bold opacity-70 uppercase tracking-wider mb-4">Account Settings & Security</h3>

              <div onClick={() => { setTempUsername(username); setOldPassword(''); setNewPassword(''); setConfirmPassword(''); setTempPhone(userPhone); setIsEditingProfile(true); }} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition ${darkMode ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">🔒</span>
                  <div>
                    <div className="font-bold text-sm">Change Password & Security</div>
                    <div className="text-xs opacity-60">Update login password and phone number</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400">Modify →</span>
              </div>

              <div onClick={() => setActiveTab('vip')} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition ${darkMode ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-lg">👑</span>
                  <div>
                    <div className="font-bold text-sm">VIP Membership Tiers</div>
                    <div className="text-xs opacity-60">Upgrade your daily income yield</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-400">View →</span>
              </div>

              <div onClick={() => setActiveTab('share')} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition ${darkMode ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-lg">🔗</span>
                  <div>
                    <div className="font-bold text-sm">My Referral Link & QR</div>
                    <div className="text-xs opacity-60">Invite friends and get multi-level rewards</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400">Share →</span>
              </div>

              <div onClick={() => setActiveTab('history')} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition ${darkMode ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-lg">📊</span>
                  <div>
                    <div className="font-bold text-sm">Transaction Logs</div>
                    <div className="text-xs opacity-60">Check deposits and withdrawal records</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">History →</span>
              </div>

              <div onClick={() => setActiveTab('support')} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition ${darkMode ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold text-lg">🎧</span>
                  <div>
                    <div className="font-bold text-sm">Customer Support Chat</div>
                    <div className="text-xs opacity-60">Get instant help from assistant</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-400">Chat →</span>
              </div>
            </div>

            {isEditingProfile && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className={`${darkMode ? 'bg-[#12161f] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto`}>
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <h3 className="text-lg font-bold">Edit Profile & Security Settings</h3>
                    <button onClick={() => setIsEditingProfile(false)} className="opacity-70 hover:opacity-100 font-bold">✕</button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="opacity-70 font-semibold">New Username</label>
                      <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500`} />
                    </div>

                    <div>
                      <label className="opacity-70 font-semibold">Phone Number</label>
                      <input type="text" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500`} />
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="font-bold text-amber-400 mb-2">Change Password (Optional)</p>
                      <div className="space-y-2">
                        <div>
                          <label className="opacity-70">Old Password</label>
                          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter current password" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500`} />
                        </div>
                        <div>
                          <label className="opacity-70">New Password</label>
                          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500`} />
                        </div>
                        <div>
                          <label className="opacity-70">Confirm New Password</label>
                          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className={`w-full mt-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!tempUsername.trim()) { alert('Username cannot be empty!'); return; }

                      if (newPassword) {
                        if (oldPassword !== password) { alert('Incorrect old password!'); return; }
                        if (newPassword !== confirmPassword) { alert('New passwords do not match!'); return; }
                        setPassword(newPassword);
                      }

                      setUsername(tempUsername);
                      setUserPhone(tempPhone);
                      setIsEditingProfile(false);
                      alert('Profile and security settings updated successfully!');
                    }}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl shadow-lg transition mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <div
        className="chat-widget fixed z-50 cursor-grab active:cursor-grabbing select-none"
        style={{ left: `${chatPos.x}px`, top: `${chatPos.y}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-105 transition border-2 border-white/20 relative"
          >
            💬
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </button>
        ) : (
          <div className={`${darkMode ? 'bg-[#12161f] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden flex flex-col`}>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="font-bold text-sm">Live Support Chat</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }} className="text-white/80 hover:text-white font-bold text-base px-2">✕</button>
            </div>

            <div className={`h-72 overflow-y-auto space-y-3 p-4 ${darkMode ? 'bg-slate-900/60' : 'bg-slate-50'}`}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none shadow' : `${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800 border border-slate-200'} rounded-bl-none shadow-sm`}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className={`p-3 border-t ${darkMode ? 'border-slate-800 bg-[#12161f]' : 'border-slate-200 bg-white'} flex gap-2`}>
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type your message..." className={`flex-1 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500`} />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition">Send</button>
            </form>
          </div>
        )}
      </div>

      <footer className={`border-t ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'} mt-20 py-8`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold">Contact</p>
            <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline">LINE Account</a>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a href="https://line.me" target="_blank" rel="noopener noreferrer" aria-label="LINE" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="LINE">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00C300]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20 2H4C2.9 2 2 2.9 2 4v12c0 1.1.9 2 2 2h2v3l4-3h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 8h10v2H7V8zm8 4H7v-2h8v2z" />
              </svg>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="Facebook">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1877F2]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2V9.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
              </svg>
            </a>

            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" aria-label="Messenger" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="Messenger">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0084FF]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.5 2 2 6 2 10.7c0 2.7 1.4 5.2 3.6 6.8V22l3.2-1.8c.9.2 1.9.3 2.9.3 5.5 0 10-4 10-8.7S17.5 2 12 2zm2.7 11.2l-2.4-2.6-4.1 2.6 4.3-4.6 2.2 2.4 4.1-2.4-4.1 4.6z" />
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="Instagram">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gradient" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <linearGradient id="igGrad" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#f58529" />
                  <stop offset="50%" stopColor="#dd2a7b" />
                  <stop offset="100%" stopColor="#515bd4" />
                </linearGradient>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.8a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zm5.1-.9a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="url(#igGrad)" />
                <circle cx="12" cy="12" r="3" fill="white" opacity="0.15" />
              </svg>
            </a>

            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="Telegram">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#26A5E4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 3L3 10.2c-.9.3-.9 1.2-.2 1.5l4.3 1.5 1.6 4.6c.2.6.9.8 1.4.4L21 6.2c.7-.6.3-1.6-.5-1.2z" />
              </svg>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A66C2]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 11-.01 0zM3 8.98h4v12H3v-12zm7 0h3.6v1.7h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.5v6.6h-4v-5.9c0-1.4 0-3.2-2-3.2-2 0-2.3 1.6-2.3 3.1v6h-4v-12z" />
              </svg>
            </a>

            <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition transform hover:scale-105 focus:outline-none" title="WhatsApp">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.5 3.5A10 10 0 004.2 19.6L3 22l2.5-.7A10 10 0 1020.5 3.5zM17 14.8c-.4.9-2.2 1.9-3 2.1-.8.2-1.4.3-2.6-.1-2-.7-3.3-2.6-3.5-2.8-.2-.2-1-1.1-1-1.9 0-.8.5-1.3.7-1.6.2-.2.5-.2.8-.1.2.1.6.2.9.4.3.2.8.4 1.3.6.5.2.9.1 1.2-.1.3-.2.9-.6 1.2-.9.3-.3.5-.6.8-.2.3.4 1 1.5 1.1 1.7.1.2.1.4 0 .6z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs opacity-60">© 2026 ALEXCE Exchange Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
