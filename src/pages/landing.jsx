import React, { useEffect, useState } from 'react'
import AnimatedTicker from '../components/AnimatedTicker'
import RotatingGlobe from '../components/RotatingGlobe'
import GetStartedModal from '../components/GetStartedModal'

export default function Landing({ onGetStarted }) {
  const [isPrimary, setIsPrimary] = useState(true)
  useEffect(()=>{
    const id = setInterval(()=> setIsPrimary(p => !p), 2000)
    return ()=> clearInterval(id)
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-12 gap-6">
        {/* Left plain content */}
        <div className="col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-apmGreen/30 to-bnbYellow/20 border border-white/6">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className={isPrimary ? 'text-bnbYellow transition-colors duration-500' : 'text-apmGreen transition-colors duration-500'}>APM</span>
                <span className="text-white/70">-</span>
                <span className={!isPrimary ? 'text-bnbYellow transition-colors duration-500' : 'text-apmGreen transition-colors duration-500'}>agro</span>
              </h1>
              <p className="text-white/60 mt-1">Decentralized agriculture forecasting</p>
            </div>
          </div>

          <p className="text-white/70 mt-8 text-lg max-w-xl leading-relaxed">
            Decentralized agriculture forecasting and data democratization built on Binance Smart Chain.
          </p>

          <p className="text-white/60 mt-4">Turning local insights into global intelligence.</p>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onGetStarted}
              className="bg-apmGold text-darkBg px-5 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </button>

            <div className="flex items-center gap-3">
              <AnimatedTicker symbol="BNB" isPrimary={isPrimary} />
              <AnimatedTicker symbol="APM" isPrimary={!isPrimary} />
            </div>
          </div>

          <div className="mt-10 text-white/60 text-sm">
            <span className="inline-block mr-2">Network:</span>
            <span className="inline-block px-2 py-1 bg-white/5 rounded">BNB Smart Chain Testnet (Chain ID 97)</span>
          </div>
        </div>

        {/* Right visual */}
        <div className="col-span-5 flex flex-col items-center justify-center">
          <div className="w-full card p-6 flex flex-col items-center gap-6">
            <RotatingGlobe />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-apmGold">Realtime insights</h3>
              <p className="text-white/60 mt-1 text-sm">AI-ready market suggestions & fast staking UX</p>
            </div>
            <div className="w-full grid grid-cols-1 gap-3 mt-4">
              <div className="p-3 bg-white/3 rounded">
                <strong>Suggestion:</strong>
                <div className="text-sm text-white/70 mt-1">Will maize price reach $110 on 15 Dec 2025</div>
              </div>
              <div className="p-3 bg-white/3 rounded">
                <strong>Suggestion:</strong>
                <div className="text-sm text-white/70 mt-1">Will BNS fall to $80 on 1 Jan 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal control */}
      {/* onGetStarted is passed from App to open modal */}
    </div>
  )
}
