import React from 'react'

export default function ResolvePanel({ address }){
  const resolve = async () => {
    alert('Resolve flow: call market.resolve(outcomeIndex). Ensure only owner can call.')
  }
  return <button onClick={resolve} className="bg-white/6 px-3 py-1 rounded">Resolve</button>
}
