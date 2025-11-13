import React, { useState } from 'react'
import { getTokenContract } from '../utils/contractHelpers'
import { ethers } from 'ethers'

export default function StakeModal({ onClose, marketAddress }){
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const stake = async () => {
    if (!amount) return alert('Enter amount')
    setLoading(true)
    try {
      const signer = await (await import('../utils/contractHelpers')).getSigner()
      const token = await getTokenContract(signer)
      // Approve factory or market depending on flow - example approves factory
      const ap = await token.approve((await import('../utils/contractHelpers')).factoryAddress, ethers.parseUnits(amount, 18))
      await ap.wait()
      alert('Approved. Now call stake on market contract (implement call).')
    } catch(e){
      console.error(e); alert('Failed: ' + e?.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-darkBg rounded p-6 w-96">
        <h3 className="font-bold mb-3">Stake APM</h3>
        <input className="w-full p-2 mb-3 rounded bg-white/5" placeholder="Amount (APM)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={stake} className="bg-apmGreen px-4 py-2 rounded">{loading?'Processing...':'Stake'}</button>
          <button onClick={onClose} className="bg-white/5 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  )
}
