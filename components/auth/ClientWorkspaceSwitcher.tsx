"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Building2, ChevronDown, Check, ShieldCheck, Sparkles } from "lucide-react";

export function ClientWorkspaceSwitcher() {
  const { activeClient, allClients, switchClient, isAccountant } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // If client director, they only see their single assigned company (tenant sandbox)
  if (!isAccountant) {
    return (
      <div className="flex items-center gap-2 bg-[#141519] text-white px-3 py-1.5 rounded-lg border border-[#2e2a21] text-xs">
        <Building2 className="w-4 h-4 text-[#C0A262] shrink-0" />
        <span className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
          {activeClient.companyName}
        </span>
        <span className="hidden sm:inline text-[10px] bg-[#25241f] text-[#C0A262] px-1.5 py-0.5 rounded border border-[#4a4029]">
          Client Sandbox
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#141519] hover:bg-[#1c1d22] text-white px-3 py-1.5 rounded-lg border border-[#3e3422] transition-colors text-xs min-h-[38px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Building2 className="w-3.5 h-3.5 text-[#C0A262] shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-[#A08E64] font-medium leading-none">
            Active Client Workspace
          </span>
          <span className="font-semibold text-white truncate max-w-[130px] sm:max-w-[190px]">
            {activeClient.companyName}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[#A08E64] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 sm:w-80 bg-[#141519] border border-[#3e3422] rounded-xl shadow-2xl z-50 p-2 space-y-1">
            <div className="px-3 py-2 border-b border-[#26241e] flex items-center justify-between text-[11px] text-[#8c8272]">
              <span className="font-bold text-[#c9a84c] uppercase tracking-wider">
                Managed Client Portfolio
              </span>
              <span>{allClients.length} Entities</span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1 p-1">
              {allClients.map((client) => {
                const isSelected = client.id === activeClient.id;
                return (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      switchClient(client.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg flex items-start justify-between text-xs transition-colors ${
                      isSelected
                        ? "bg-[#25241f] text-white border border-[#c9a84c]/50"
                        : "text-[#d1d5db] hover:bg-[#1a1b22] hover:text-white"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{client.companyName}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#c9a84c]" />}
                      </div>
                      <div className="text-[10px] text-[#8c8272] flex items-center gap-2">
                        <span>{client.entityType}</span>
                        <span>•</span>
                        <span>{client.tier.replace(/_/g, " ")}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        client.complianceStatus === "GOOD_STANDING"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950/80 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {client.complianceStatus === "GOOD_STANDING" ? "Healthy" : "Action"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-2 pt-2 border-t border-[#26241e] text-[10px] text-[#8c8272] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>RLS Session filters database queries strictly to selected client.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
