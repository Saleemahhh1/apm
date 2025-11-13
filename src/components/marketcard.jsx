import React from 'react'

export default function MarketCard({ address, onOpen }){
  return (
    <div className="p-4 border-b border-white/6 flex items-center justify-between">
      <div>
        <h4 className="font-semibold">Market — {address.slice(0,6)}...{address.slice(-4)}</h4>
        <p className="text-sm text-white/60">Tap to view details & stake</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onOpen} className="bg-apmGreen px-3 py-1 rounded text-darkBg">Open</button>
      </div>
    </div>
  )
}
