"use client";

import React from "react";

interface PipelineStep {
  label: string;
  count: number;
  sublabel: string;
}

interface IntakeFunnelProps {
  steps: PipelineStep[];
}

export function IntakeFunnelChart({ steps }: IntakeFunnelProps) {
  const max = Math.max(...steps.map((s) => s.count));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Document Pipeline</span>
          <p className="text-sm font-bold text-slate-900">Client Compliance & Verification Funnel</p>
        </div>
        <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
          Live Practice Funnel
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {steps.map((step, index) => {
          const percentage = Math.round((step.count / max) * 100);
          return (
            <div
              key={index}
              className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between relative overflow-hidden transition-all hover:bg-white hover:border-slate-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 truncate">{step.label}</span>
                <span className="text-[11px] font-bold text-slate-400">#{index + 1}</span>
              </div>
              <div className="mb-2">
                <div className="text-xl font-bold text-slate-900 tracking-tight">{step.count}</div>
                <div className="text-[11px] text-slate-500">{step.sublabel}</div>
              </div>
              {/* Funnel Level Bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-slate-900 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
