import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVip, setSelectedVip] = useState(null);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const walletAddress = '0x99A3e0038aC4BAB1c0ED8eAb354FD2171969d922';

  const [userBalance, setUserBalance] = useState(12450.0);
  const [totalCommissionEarned, setTotalCommissionEarned] = useState(350.0);

  const [username, setUsername] = useState('ALEXCE');
  const [password, setPassword] = useState('123456');
  const [userPhone, setUserPhone] = useState('+959976543210');

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
  const [refSubTab, setRefSubTab] = useState('deposit');
  const [marketSearch, setMarketSearch] = useState('');

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

  const liveWithdrawals = [
    { user: '0x8921***4312', amount: '$450.00', time: 'Just now' },
    { user: '0x3412***8890', amount: '$1,200.00', time: '1 min ago' },
    { user: '0x7765***1122', amount: '$250.00', time: '2 mins ago' },
  ];

  useEffect(() => {
    const liveInterval = setInterval(() => {
      setMarketData((prevData) =>
        prevData.map((coin) => {
          const fluctuation = (Math.random() - 0.48) * (coin.price * 0.003);
          const newPrice = Math.max(0.000001, coin.price + fluctuation);
          const isUp = fluctuation >= 0;
          const randomChangeVal = (Math.random() * 5).toFixed(2);
          const newChange = `${isUp ? '+' : '-'}${randomChangeVal}%`;

          return { ...coin, price: newPrice, change: newChange, isUp };
        }),
      );
    }, 2000);

    return () => clearInterval(liveInterval);
  }, []);

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
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-black text-lg shadow-lg shadow-purple-500/30">
                A
              </div>
              <div>
                <div className="text-xl font-black tracking-tight">ALEXCE</div>
                <div className="text-[10px] uppercase tracking-[0.28em] opacity-60">Web3 Finance</div>
              </div>
            </div>

            <nav className="site-nav hidden md:flex items-center gap-2 text-xs font-semibold">
              {['home', 'vip', 'share', 'team', 'history', 'support', 'me'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === tab ? 'bg-purple-600 text-white' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`px-3 py-2 rounded-xl text-xs font-bold ${darkMode ? 'bg-slate-800 text-slate-100' : 'bg-slate-200 text-slate-800'}`}
              >
                {darkMode ? 'Light' : 'Dark'}
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition"
              >
                Withdraw
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
                          <div className={`w-10 h-10 rounded-full ${coin.logoBg} flex items-center justify-center font-black text-white shadow-md text-sm shrink-0`}>
                            {coin.logoText}
                          </div>
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

        {activeTab === 'vip' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-amber-400">VIP INVESTMENT TIERS (VIP 1 - VIP 10)</h2>
              <p className="text-sm opacity-70">Choose your VIP card below to view deposit details or simulate referral commissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {vipPlans.map((plan, index) => (
                <div key={index} className={`rounded-3xl p-6 bg-gradient-to-br ${plan.gradient} border border-white/20 shadow-2xl ${plan.glow} flex flex-col justify-between space-y-6`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white">{plan.level}</span>
                      <span className="text-[10px] bg-black/40 text-white px-3 py-1 rounded-full font-bold">VIP CARD</span>
                    </div>
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
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl">
                  {username[0]}
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
