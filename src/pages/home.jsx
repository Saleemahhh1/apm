import React, { useEffect, useState } from 'react'
import MarketCard from '../components/MarketCard'
import CreatePrediction from '../components/CreatePrediction'
import { fetchDeployedMarkets } from '../utils/contractHelpers'

export default function Home({ onOpenMarket, isBNBPrimary }){
  const [markets, setMarkets] = useState([])
  useEffect(()=>{
    (async()=>{
      const arr = await fetchDeployedMarkets()
      setMarkets(arr || [])
    })()
  },[])

  const suggestions = [
    { title: "Will maize price reach $110 on 15 Dec 2025" },
    { title: "Will BNS fall to $80 on 1 Jan 2026" },
    { title: "Will groundnut price reach $150 on 10 Feb 2025" }
  ]

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="card p-4 mb-6">
          <h3 className="text-lg font-bold mb-2">Quick Suggestions</h3>
          <div className="flex gap-3">
            {suggestions.map((s,i)=>(
              <div key={i} className="flex-1 p-3 bg-white/3 rounded">
                <h4 className="font-semibold">{s.title}</h4>
                <button className="mt-2 bg-apmGreen px-3 py-1 rounded text-darkBg">Stake APM</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 mb-6">
          <h3 className="text-lg font-bold mb-4">Active Markets</h3>
          {markets.length===0 ? <div className="text-white/60">No markets found (or RPC/ABI mismatch)</div> :
            markets.map((m, idx)=> <MarketCard key={idx} address={m} onOpen={()=>onOpenMarket(m)} />)
          }
        </div>
      </div>

      <div className="col-span-4">
        <CreatePrediction />
        <div className="card p-4 mt-6">
          <h3 className="font-bold mb-2">AI Assistant</h3>
          <p className="text-white/70 text-sm">Use AI to analyze price trends & suggestions. (Integrate with a backend AI for live analysis)</p>
          <button className="mt-3 bg-apmGold px-3 py-2 rounded">Open AI Assistant</button>
        </div>
      </div>
    </div>
  )
}
