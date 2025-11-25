"use client";
import React, { useMemo } from "react";

export interface LiquidityCardProps {
  tokenA: string;
  tokenB: string;
  feeTier: string | number;
  positionId: string;
  minTick: number;
  maxTick: number;
  currentTick?: number;
  cardImageUrl?: string;
}

function tickToX(tick: number, minTick: number, maxTick: number, width: number) {
  const span = maxTick - minTick || 1;
  return ((tick - minTick) / span) * width;
}

export default function LiquidityPositionCard({
  tokenA,
  tokenB,
  feeTier,
  positionId,
  minTick,
  maxTick,
  currentTick,
  cardImageUrl,
}: LiquidityCardProps) {
  const width = 320;
  const height = 180;

  const svgPath = useMemo(() => {
    const x1 = tickToX(minTick, minTick, maxTick, width);
    const x2 = tickToX(maxTick, minTick, maxTick, width);
    const cx = (x1 + x2) / 2;
    const y1 = 40;
    const y2 = 140;
    return `M ${x1} ${y1} Q ${cx} ${y2} ${x2} ${y1}`;
  }, [minTick, maxTick]);

  const leftDotX = tickToX(minTick, minTick, maxTick, width);
  const rightDotX = tickToX(maxTick, minTick, maxTick, width);

  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 to-fuchsia-700 text-white p-5 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold">
            {tokenA}/{tokenB}
          </div>
          <div className="text-sm opacity-80 mt-1">Fee tier: {feeTier}</div>
        </div>
        {cardImageUrl && (
          <img
            src={cardImageUrl}
            alt="card"
            className="w-14 h-14 rounded-lg opacity-90 object-cover"
          />
        )}
      </div>

      <div className="mt-4 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="block"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#ff7ad3" stopOpacity="0.9" />
              <stop offset="1" stopColor="#6a00ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <path
            d={svgPath}
            stroke="url(#g)"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={svgPath}
            stroke="#ffffff22"
            strokeWidth={20}
            fill="none"
            strokeLinecap="round"
          />

          <circle cx={leftDotX} cy={40} r={5} fill="#fff" stroke="#00000033" />
          <circle
            cx={rightDotX}
            cy={40}
            r={5}
            fill="#fff"
            stroke="#00000033"
          />

          {typeof currentTick === "number" && (
            <circle
              cx={tickToX(currentTick, minTick, maxTick, width)}
              cy={60}
              r={4}
              fill="#fff8"
            />
          )}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <div className="bg-black/30 rounded-md px-3 py-2">
          <span className="text-xs opacity-70">ID</span>
          <div className="font-mono text-sm">{positionId}</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-black/30 rounded-md px-3 py-2">
            <span className="text-xs opacity-70">Min Tick</span>
            <div className="font-mono">{minTick}</div>
          </div>
          <div className="flex-1 bg-black/30 rounded-md px-3 py-2">
            <span className="text-xs opacity-70">Max Tick</span>
            <div className="font-mono">{maxTick}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
