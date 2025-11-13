import React, { useState } from 'react'
import Header from './components/Header'
import Landing from './pages/Landing'
import GetStartedModal from './components/GetStartedModal'
import Home from './pages/Home' // after login/connected

export default function App(){
  const [showModal, setShowModal] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [route, setRoute] = useState('landing') // 'landing' or 'home'

  const openGetStarted = () => setShowModal(true)
  const closeGetStarted = () => setShowModal(false)

  const handleConnectWallet = async () => {
    if (!window.ethereum) return alert('Install MetaMask or Binance Wallet')
    try {
      const accs = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // you can set account to state or global store:
      setAuthed(true)
      setRoute('home')
      setShowModal(false)
    } catch (e){
      console.error(e)
      alert('Connection failed')
    }
  }

  const handleRegister = (form) => {
    // for hackathon MVP: simple client-side stub
    if (!form.email || !form.name || form.password !== form.confirm) return alert('Please complete form & ensure passwords match')
    setAuthed(true)
    setRoute('home')
    setShowModal(false)
  }

  return (
    <div>
      <Header />
      { route === 'landing' && <Landing onGetStarted={openGetStarted} /> }
      { route === 'home' && <Home /> }
      <GetStartedModal open={showModal} onClose={closeGetStarted} onConnectWallet={handleConnectWallet} onRegister={handleRegister} />
    </div>
  )
}
