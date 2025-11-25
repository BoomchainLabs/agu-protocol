"use client";
import React, { useState } from "react";
import LiquidityDashboard from "../components/LiquidityDashboard";
import SwapWidget from "../components/SwapWidget";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [chain, setChain] = useState<"base" | "solana">("base");

  const handleConnect = () => {
    if (wallet.trim()) {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWallet("");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">AGU Token dApp</h1>
          <p className="text-lg opacity-80">
            Manage liquidity and swap tokens across EVM and Solana networks
          </p>
        </div>

        {/* Connection Section */}
        {!isConnected ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-12 max-w-md">
            <h2 className="text-2xl font-bold mb-6">Connect Wallet</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm opacity-70 ml-1 block mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="0x... or your Solana address"
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={handleConnect}
                disabled={!wallet.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 mb-12 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-70">Connected Wallet</p>
              <p className="font-mono text-lg">{wallet}</p>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-6 py-2 rounded-xl bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 transition"
            >
              Disconnect
            </button>
          </div>
        )}

        {isConnected && (
          <>
            {/* Chain Selector */}
            <div className="mb-12 flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="base"
                  checked={chain === "base"}
                  onChange={(e) => setChain(e.target.value as "base")}
                  className="w-4 h-4"
                />
                <span>Base (EVM)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="solana"
                  checked={chain === "solana"}
                  onChange={(e) => setChain(e.target.value as "solana")}
                  className="w-4 h-4"
                />
                <span>Solana</span>
              </label>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Swap Widget */}
              <div>
                <SwapWidget chain={chain} />
              </div>

              {/* Right: Liquidity Dashboard */}
              <div className="lg:col-span-2">
                <LiquidityDashboard wallet={wallet} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
