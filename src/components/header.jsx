import React from 'react'
import WalletButton from './WalletButton'
import clsx from 'clsx'

export default function Header({ isBNBPrimary, setRoute }){
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apmGreen/30 to-bnbYellow/20 flex items-center justify-center border border-white/6">
            <span className="text-xl">🌿</span>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold">
              <span className={clsx(isBNBPrimary? 'text-bnbYellow' : 'text-apmGreen')}>APM</span>
              <span className="text-white/70">-</span>
              <span className={clsx(!isBNBPrimary? 'text-bnbYellow' : 'text-apmGreen')}>agro</span>
            </h1>
            <p className="text-xs text-white/60">decentralized agriculture forecasting</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Ticker isBNBPrimary={isBNBPrimary} symbol="BNB" color="bnbYellow" />
          <Ticker isBNBPrimary={!isBNBPrimary} symbol="APM" color="apmGreen" />
        </div>
        <button onClick={()=>setRoute('home')} className="bg-apmGold text-darkBg px-4 py-2 rounded font-semibold">Get Started</button>
        <WalletButton />
      </div>
    </header>
  )
}

function Ticker({ isBNBPrimary, symbol }) {
  const cls = isBNBPrimary ? 'text-white scale-105' : 'text-white/70'
  return (
    <div className={`px-3 py-1 rounded flex items-center gap-2 border border-white/6 ${isBNBPrimary ? 'pulse' : ''}`}>
      <div className={cls}>{symbol}</div>
      <div className="text-xs text-white/60">123.45</div>
    </div>
  )
}
