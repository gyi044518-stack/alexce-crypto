import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'alexce-portfolio-holdings';
const HISTORY_KEY = 'alexce-portfolio-history';

const loadStored = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

function PortfolioValueChart({ history, darkMode }) {
  if (history.length < 2) {
    return (
      <div className={`h-48 flex items-center justify-center text-xs opacity-50 ${darkMode ? 'bg-slate-950/60' : 'bg-slate-50'} rounded-2xl border ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        Portfolio value chart appears once we have more than one snapshot.
      </div>
    );
  }
  const width = 800;
  const height = 200;
  const values = history.map((point) => point.value);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const padding = Math.max((maximum - minimum) * 0.1, maximum * 0.002, 0.000001);
  const chartMin = minimum - padding;
  const chartMax = maximum + padding;
  const stepX = width / Math.max(history.length - 1, 1);
  const y = (value) => 14 + ((chartMax - value) / Math.max(chartMax - chartMin, 0.000001)) * (height - 28);
  const path = history.map((point, index) => `${index === 0 ? 'M' : 'L'}${(index * stepX).toFixed(2)},${y(point.value).toFixed(2)}`).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  const first = history[0].value;
  const last = history[history.length - 1].value;
  const lineColor = last >= first ? '#10b981' : '#f43f5e';

  return (
    <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-48">
        {[0, 1, 2, 3].map((line) => (
          <line key={line} x1="0" x2={width} y1={14 + line * ((height - 28) / 3)} y2={14 + line * ((height - 28) / 3)} stroke={darkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="1" />
        ))}
        <path d={area} fill={lineColor} opacity="0.08" />
        <path d={path} fill="none" stroke={lineColor} strokeWidth="2.5" />
        <circle cx={(history.length - 1) * stepX} cy={y(last)} r="4" fill={lineColor} />
      </svg>
      <div className={`flex justify-between px-4 py-2 text-[10px] opacity-60 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        <span>{new Date(history[0].at).toLocaleString()}</span>
        <span>{new Date(history[history.length - 1].at).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function PortfolioTracker({ darkMode }) {
  const [holdings, setHoldings] = useState(() => loadStored(STORAGE_KEY, []));
  const [history, setHistory] = useState(() => loadStored(HISTORY_KEY, []));
  const [prices, setPrices] = useState({});
  const [form, setForm] = useState({ symbol: '', quantity: '', entryPrice: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    let isMounted = true;
    const loadPrices = async () => {
      const symbols = [...new Set(holdings.map((holding) => holding.symbol.toUpperCase()))];
      if (!symbols.length) {
        if (isMounted) setPrices({});
        return;
      }
      try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbols=[${symbols.map((symbol) => `"${symbol}USDT"`).join(',')}]`);
        if (!response.ok) throw new Error('Price unavailable');
        const rows = await response.json();
        if (!isMounted) return;
        const next = {};
        rows.forEach((row) => { next[row.symbol.replace(/USDT$/, '')] = Number(row.price); });
        setPrices((previous) => ({ ...previous, ...next }));
        const total = holdings.reduce((sum, holding) => sum + holding.quantity * (next[holding.symbol.toUpperCase()] ?? prices[holding.symbol.toUpperCase()] ?? 0), 0);
        if (total > 0) {
          setHistory((previousHistory) => {
            const now = Date.now();
            const previousPoint = previousHistory[previousHistory.length - 1];
            if (previousPoint && now - previousPoint.at < 60000) return previousHistory;
            const nextHistory = [...previousHistory, { at: now, value: total }].slice(-200);
            window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
            return nextHistory;
          });
        }
      } catch {
        /* keep previous prices */
      }
    };
    loadPrices();
    const interval = setInterval(loadPrices, 30000);
    return () => { isMounted = false; clearInterval(interval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdings]);

  const priceFor = (symbol) => prices[symbol.toUpperCase()];
  const totalValue = holdings.reduce((sum, holding) => {
    const price = priceFor(holding.symbol);
    return sum + (price ? holding.quantity * price : 0);
  }, 0);

  const addHolding = (event) => {
    event.preventDefault();
    const symbol = form.symbol.trim().toUpperCase();
    const quantity = Number(form.quantity);
    const entryPrice = form.entryPrice === '' ? null : Number(form.entryPrice);
    if (!/^[A-Z0-9]{2,10}$/.test(symbol)) { setFormError('Enter a valid coin symbol (e.g. BTC).'); return; }
    if (!Number.isFinite(quantity) || quantity <= 0) { setFormError('Enter a valid quantity.'); return; }
    if (entryPrice !== null && (!Number.isFinite(entryPrice) || entryPrice < 0)) { setFormError('Entry price must be a positive number.'); return; }
    setFormError('');
    setHoldings((previous) => {
      const existing = previous.find((holding) => holding.symbol === symbol);
      if (existing) {
        return previous.map((holding) => (holding.symbol === symbol
          ? { ...holding, quantity: holding.quantity + quantity, entryPrice: entryPrice ?? holding.entryPrice }
          : holding));
      }
      return [...previous, { id: `${symbol}-${Date.now()}`, symbol, quantity, entryPrice, addedAt: Date.now() }];
    });
    setForm({ symbol: '', quantity: '', entryPrice: '' });
  };

  const removeHolding = (id) => setHoldings((previous) => previous.filter((holding) => holding.id !== id));

  const card = `border rounded-3xl shadow-xl ${darkMode ? 'bg-[#12161f] border-slate-800' : 'bg-white border-slate-200'}`;
  const inputClass = `${darkMode ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-100 text-slate-900 border-slate-300'} border px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 w-full`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight">PORTFOLIO TRACKER</h2>
        <p className="text-xs opacity-60">Manually add your crypto holdings and track your portfolio value over time with live Binance prices.</p>
      </div>

      <div className={`${card} p-6`}>
        <span className="text-xs opacity-60 font-medium uppercase tracking-wider">Total Portfolio Value</span>
        <div className="text-4xl font-black font-mono text-emerald-400 mt-1">
          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-sm font-normal opacity-70 ml-2">USDT</span>
        </div>
        {history.length > 1 && (() => {
          const first = history[0].value;
          const last = history[history.length - 1].value;
          const change = first > 0 ? ((last - first) / first) * 100 : 0;
          return <div className={`text-xs font-bold mt-1 ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}% since first snapshot</div>;
        })()}
      </div>

      <PortfolioValueChart history={history} darkMode={darkMode} />

      <div className={`${card} p-6`}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Add Holding</h3>
        <form onSubmit={addHolding} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <label className="space-y-1 sm:col-span-1">
            <span className="text-[10px] opacity-60 font-bold uppercase">Symbol</span>
            <input value={form.symbol} onChange={(event) => setForm({ ...form, symbol: event.target.value.toUpperCase() })} placeholder="BTC" className={inputClass} />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-[10px] opacity-60 font-bold uppercase">Quantity</span>
            <input value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} placeholder="0.5" inputMode="decimal" className={inputClass} />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-[10px] opacity-60 font-bold uppercase">Entry price (optional)</span>
            <input value={form.entryPrice} onChange={(event) => setForm({ ...form, entryPrice: event.target.value })} placeholder="65000" inputMode="decimal" className={inputClass} />
          </label>
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-lg transition">Add</button>
        </form>
        {formError && <p className="text-rose-400 text-xs font-bold mt-2">{formError}</p>}
      </div>

      <div className={`${card} p-6`}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">My Holdings ({holdings.length})</h3>
        {holdings.length === 0 ? (
          <p className="text-xs opacity-50 text-center py-6">No holdings yet — add your first one above.</p>
        ) : (
          <div className="space-y-3">
            {holdings.map((holding) => {
              const price = priceFor(holding.symbol);
              const value = price ? holding.quantity * price : null;
              const profit = holding.entryPrice && price ? (price - holding.entryPrice) * holding.quantity : null;
              const profitPercent = holding.entryPrice && price ? ((price - holding.entryPrice) / holding.entryPrice) * 100 : null;
              return (
                <div key={holding.id} className={`flex items-center justify-between gap-3 p-4 rounded-2xl ${darkMode ? 'bg-slate-900/60 border border-slate-800' : 'bg-slate-50 border border-slate-200'}`}>
                  <div className="min-w-0">
                    <div className="font-black text-sm">{holding.symbol}<span className="opacity-50 font-normal text-xs">/USDT</span></div>
                    <div className="text-xs opacity-60 font-mono">{holding.quantity} {holding.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold">{value != null ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : <span className="opacity-40 text-xs">Loading…</span>}</div>
                    <div className="text-[10px] opacity-60 font-mono">{price ? `Live $${price.toLocaleString()}` : ''}{profit != null && <span className={profit >= 0 ? ' text-emerald-400' : ' text-rose-400'}> · {profit >= 0 ? '+' : ''}{profit.toFixed(2)} ({profitPercent.toFixed(1)}%)</span>}</div>
                  </div>
                  <button type="button" onClick={() => removeHolding(holding.id)} className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0">✕</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
