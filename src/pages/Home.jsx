import React, { useEffect, useState } from "react";
import { getFactoryContract } from "../utils/contractHelpers";
import MarketCard from "../components/MarketCard";
import CreateMarket from "../components/CreateMarket";
import StakeModal from "../components/StakeModal";
import ResolvePanel from "../components/ResolvePanel";

export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const loadMarkets = async () => {
    try {
      const factory = await getFactoryContract();
      const all = await factory.allMarkets();
      setMarkets(all);
    } catch (err) {
      console.error("Error loading markets", err);
    }
  };

  useEffect(() => {
    loadMarkets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg via-green-950/40 to-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-apmGreen">Prediction Dashboard</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-apmGold text-darkBg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          + Create Market
        </button>
      </div>

      {markets.length === 0 ? (
        <div className="text-center text-white/70 mt-10">No active markets yet</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((addr, i) => (
            <MarketCard key={i} address={addr} onRefresh={loadMarkets} />
          ))}
        </div>
      )}

      {openCreate && <CreateMarket onClose={() => setOpenCreate(false)} onRefresh={loadMarkets} />}
    </div>
  );
}
