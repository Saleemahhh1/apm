import React, { useState } from 'react'
import { createMarket } from '../utils/contractHelpers'

export default function CreatePrediction(){
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    if (!name) return alert('Enter title')
    setLoading(true)
    try {
      await createMarket(name)
      alert('Market created!')
      setName('')
    } catch(e){
      console.error(e)
      alert('Failed: ' + (e?.message||e))
    } finally { setLoading(false) }
  }

  return (
    <div className="card p-4">
      <h3 className="font-bold mb-2">Create Prediction / Market</h3>
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 mb-2 rounded bg-darkBg/60" placeholder="e.g. Will maize price exceed $120 on ..."/>
      <button disabled={loading} onClick={handle} className="w-full bg-apmGold text-darkBg py-2 rounded">{ loading ? 'Creating...' : 'Create Market' }</button>
      <p className="text-xs text-white/60 mt-2">You can create a prediction market which users can stake APM on.</p>
    </div>
  )
}
