"use client";

import React, { useState } from "react";
import { formatGBP } from "@/lib/utils";

interface AreaChartProps {
  data: { month: string; revenuePence: number; costsPence: number }[];
}

export function HighPrecisionFinancialChart({ data }: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(data.length - 1);

  const maxVal = Math.max(...data.map((d) => Math.max(d.revenuePence, d.costsPence)));
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const pointsRev = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.revenuePence / maxVal) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pointsCost = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.costsPence / maxVal) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  // Create smooth bezier paths
  const generatePath = (pts: { x: number; y: number }[]) => {
    return pts.reduce((acc, curr, i, arr) => {
      if (i === 0) return `M ${curr.x} ${curr.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + curr.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
    }, "");
  };

  const revPath = generatePath(pointsRev);
  const costPath = generatePath(pointsCost);

  const activePoint = hoveredIndex !== null ? pointsRev[hoveredIndex] : pointsRev[pointsRev.length - 1];
  const activeCost = hoveredIndex !== null ? pointsCost[hoveredIndex] : pointsCost[pointsCost.length - 1];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Tooltip Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 mb-2 gap-2">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Period</span>
          <p className="text-sm font-bold text-slate-900">{activePoint.month} 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
            <span className="text-xs text-slate-600 font-medium">Revenue:</span>
            <span className="text-xs font-bold text-slate-900">{formatGBP(activePoint.revenuePence)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
            <span className="text-xs text-slate-600 font-medium">Expenses:</span>
            <span className="text-xs font-bold text-slate-700">{formatGBP(activeCost.costsPence)}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[640/220]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={(height - paddingY) / 2} x2={width - paddingX} y2={(height - paddingY) / 2} stroke="#f1f5f9" strokeDasharray="3 3" />

          {/* Cost Area & Line */}
          <path
            d={`${costPath} L ${pointsCost[pointsCost.length - 1].x} ${height - paddingY} L ${pointsCost[0].x} ${height - paddingY} Z`}
            fill="url(#costGrad)"
          />
          <path d={costPath} fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />

          {/* Revenue Area & Line */}
          <path
            d={`${revPath} L ${pointsRev[pointsRev.length - 1].x} ${height - paddingY} L ${pointsRev[0].x} ${height - paddingY} Z`}
            fill="url(#revenueGrad)"
          />
          <path d={revPath} fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Interactive vertical hover indicator */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingY - 10}
                x2={activePoint.x}
                y2={height - paddingY}
                stroke="#64748b"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <circle cx={activeCost.x} cy={activeCost.y} r="4" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          )}

          {/* Interactive touch/hover points */}
          {pointsRev.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - 20}
              y={0}
              width={40}
              height={height}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onTouchStart={() => setHoveredIndex(i)}
            />
          ))}

          {/* X Axis Labels */}
          {pointsRev.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className={`text-[11px] font-medium transition-colors ${
                hoveredIndex === i ? "fill-slate-900 font-bold" : "fill-slate-400"
              }`}
            >
              {pt.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
