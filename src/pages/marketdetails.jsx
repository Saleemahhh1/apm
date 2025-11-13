import React, { useEffect, useState } from 'react'
import StakeModal from '../components/StakeModal'
import ResolvePanel from '../components/ResolvePanel'
import AIHelper from '../components/AIHelper'
import { getTokenContract, getFactoryContract } from '../utils/contractHelpers'
import { short } from '../utils/format'

export default function MarketDetails({ addr, goBack }){
  const [marketInfo, setMarketInfo] = useState(null)
  const [openStake, setOpenStake] = useState(false)

  useEffect(()=>{
    // fetch market metadata if available - placeholder
    setMarketInfo({ address: addr, title: 'Market: ' + addr.slice(0,8), creator: '0x1234...abcd' })
  },[addr])

  return (
    <div>
      <button onClick={goBack} className="text-sm text-white/60 mb-4">← Back</button>
      <div className="card p-6">
        <h2 className="text-2xl font-bold">{marketInfo?.title}</h2>
        <p className="text-white/60">Contract: { short(addr) }</p>
        <div className="mt-4 flex gap-4">
          <button onClick={()=>setOpenStake(true)} className="bg-apmGreen px-4 py-2 rounded text-darkBg">Stake APM</button>
          <ResolvePanel address={addr} />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Market Insights</h3>
          <AIHelper address={addr} />
        </div>
      </div>

      {openStake && <StakeModal onClose={()=>setOpenStake(false)} marketAddress={addr} />}
    </div>
  )
}
