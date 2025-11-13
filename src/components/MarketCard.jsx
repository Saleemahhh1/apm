import React from "react";
import { useNavigate } from "react-router-dom";

export default function MarketCard({ market }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/market/${market.id}`);
  };

  const statusColors = {
    Open: "bg-apmGreen/30 text-apmGreen",
    Closed: "bg-yellow-500/30 text-yellow-500",
    Resolved: "bg-red-500/30 text-red-500",
  };

  return (
    <div
      onClick={handleClick}
      className="bg-darkBg/50 border border-white/10 p-5 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      {/* STATUS */}
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${statusColors[market.status] || "bg-white/10 text-white"}`}>
        {market.status}
      </div>

      {/* TITLE & DESCRIPTION */}
      <h2 className="text-xl font-bold mb-2">{market.question}</h2>
      <p className="text-white/60 mb-4 truncate">{market.description}</p>

      {/* OUTCOME PREVIEW */}
      <div className="flex justify-between mb-4">
        <div className="text-green-400 font-semibold">YES: {market.yesPrice} APM</div>
        <div className="text-red-400 font-semibold">NO: {market.noPrice} APM</div>
      </div>

      {/* LIQUIDITY BAR */}
      <div className="h-3 w-full bg-white/10 rounded-full mb-2">
        <div
          className="h-3 rounded-full bg-apmGreen"
          style={{ width: `${market.liquidityPercentage}%` }}
        />
      </div>
      <p className="text-xs text-white/60">Liquidity: {market.totalLiquidity} APM</p>
    </div>
  );
}
