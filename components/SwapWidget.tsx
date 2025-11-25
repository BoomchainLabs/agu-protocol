"use client";
import React, { useState } from "react";

export default function SwapWidget({ chain = "base" }: { chain?: "base" | "solana" }) {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    setLoading(true);
    setStatus("Swapping...");
    try {
      const endpoint = chain === "base" ? "/api/swap" : "/api/sol-swap";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, amount }),
      });
      const data = await res.json();
      console.log(data);
      setStatus("Swap Initiated (Check Console)");
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      setStatus("Error: " + String(e));
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 max-w-md">
      <div className="text-xl font-bold mb-4">Swap ({chain.toUpperCase()})</div>
      <div className="space-y-3">
        <div>
          <label className="text-xs opacity-70 ml-1">From</label>
          <input
            className="w-full p-3 rounded-xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500"
            placeholder="Token Address"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-xs opacity-70 ml-1">To</label>
          <input
            className="w-full p-3 rounded-xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500"
            placeholder="Token Address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-xs opacity-70 ml-1">Amount</label>
          <input
            className="w-full p-3 rounded-xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          onClick={handleSwap}
          disabled={loading}
          className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Execute Swap"}
        </button>
        {status && <div className="text-center text-sm mt-2 opacity-80">{status}</div>}
      </div>
    </div>
  );
}
