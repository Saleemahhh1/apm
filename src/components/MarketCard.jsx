import React, { useState, useEffect } from "react";
import { getMarketContract } from "../utils/contractHelpers";
import StakeModal from "./StakeModal";

export default function MarketCard({ address, onRefresh }) {
  const [details, setDetails] = useState({});
  const [openStake, setOpenStake] = useState(false);

  const loadDetails = async () => {
    try {
      const contract = await getMarketContract(address);
      const q = await contract.question();
      const resolved = await contract.resolved();
      setDetails({ question: q, resolved });
    } catch (err) {
      console.error("Error fetching market", err);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:shadow-green-400/20 transition">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-apmGreen">{details.question}</h3>
        <p className="text-sm text-white/60">Address: {address.slice(0, 8)}...{address.slice(-6)}</p>
        <p className="text-sm mt-2">Status: {details.resolved ? "✅ Resolved" : "🕒 Open"}</p>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={() => setOpenStake(true)} className="bg-apmGold text-darkBg px-4 py-2 rounded-lg font-semibold">
          Stake
        </button>
      </div>
      {openStake && <StakeModal address={address} onClose={() => setOpenStake(false)} onRefresh={onRefresh} />}
    </div>
  );
}
