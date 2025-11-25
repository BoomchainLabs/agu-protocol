"use client";
import React, { useEffect, useState } from "react";
import LiquidityPositionCard from "./LiquidityPositionCard";

export default function LiquidityDashboard({ wallet }: { wallet: string }) {
  const [evmPositions, setEvmPositions] = useState<any[]>([]);
  const [solPositions, setSolPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`/api/liquidity/${wallet}`)
        .then((r) => r.json())
        .then((d) => setEvmPositions(d || []))
        .catch(() => setEvmPositions([])),
      fetch(`/api/sol-liquidity/${wallet}`)
        .then((r) => r.json())
        .then((d) => setSolPositions(d || []))
        .catch(() => setSolPositions([])),
    ]).then(() => setLoading(false));
  }, [wallet]);

  const dummyPositions =
    evmPositions.length > 0
      ? evmPositions
      : [
          {
            id: "42361",
            pool: {
              token0: { symbol: "USDe" },
              token1: { symbol: "0xSwap" },
              feeTier: "0.3%",
            },
            tickLower: { tickIdx: -60000 },
            tickUpper: { tickIdx: 60000 },
            currentTick: 0,
          },
        ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Liquidity Positions</h2>
      {loading && <div className="text-center opacity-70">Loading positions...</div>}
      {!loading && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dummyPositions.map((p) => (
            <LiquidityPositionCard
              key={p.id}
              tokenA={p.pool?.token0?.symbol || "N/A"}
              tokenB={p.pool?.token1?.symbol || "N/A"}
              feeTier={p.pool?.feeTier || "0.3%"}
              positionId={p.id}
              minTick={Number(p.tickLower?.tickIdx ?? -60000)}
              maxTick={Number(p.tickUpper?.tickIdx ?? 60000)}
              currentTick={Number(p.currentTick ?? null)}
            />
          ))}

          {solPositions.map((p) => (
            <LiquidityPositionCard
              key={p.id}
              tokenA={p.tokenA || p.pool?.tokenA || "SOL-token"}
              tokenB={p.tokenB || p.pool?.tokenB || "SOL-token"}
              feeTier={p.feeTier || "N/A"}
              positionId={p.id}
              minTick={p.minTick ?? -60000}
              maxTick={p.maxTick ?? 60000}
            />
          ))}
        </div>
      )}
    </div>
  );
}
