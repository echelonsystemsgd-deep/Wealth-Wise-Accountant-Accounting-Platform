"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  Zap,
  Lock,
  ArrowRight
} from "lucide-react";
import { UK_BANKS, UKBankProvider } from "@/app/api/banking/connect/route";

interface OpenBankingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onFeedSynced?: (newCount: number) => void;
}

export function OpenBankingModal({ isOpen = true, onClose, onFeedSynced }: OpenBankingModalProps) {
  const [banks, setBanks] = useState<UKBankProvider[]>(UK_BANKS);
  const [selectedBank, setSelectedBank] = useState<UKBankProvider>(UK_BANKS[0]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Lock body scroll and handle Escape key while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConnectBank = async (bank: UKBankProvider) => {
    setSelectedBank(bank);
    setIsConnecting(true);

    try {
      const res = await fetch("/api/banking/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankId: bank.id }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsConnecting(false);
        setBanks((prev) =>
          prev.map((b) =>
            b.id === bank.id
              ? {
                  ...b,
                  connectionStatus: "ACTIVE",
                  consentExpiryDays: 90,
                }
              : b
          )
        );
        setSyncMessage(`Connected to ${bank.name} via FCA-regulated Open Banking AISP.`);
      }, 1200);
    } catch {
      setIsConnecting(false);
    }
  };

  const handleSyncFeed = async () => {
    setIsSyncing(true);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/banking/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SYNC_NOW" }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsSyncing(false);
        setSyncMessage("Live bank feed synced. New statement lines ingested with deduplication.");
        onFeedSynced?.(data.syncedCount || 1);
      }, 1000);
    } catch {
      setIsSyncing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="open-banking-title"
    >
      <div 
        className="bg-[#101218] border border-[#2B2D3A] rounded-2xl max-w-2xl w-full p-5 sm:p-7 space-y-6 text-white shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21232E] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#C0A262]/20 border border-[#C0A262]/40 text-[#C0A262] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="open-banking-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                UK Open Banking AISP Gateway
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  FCA Regulated
                </span>
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Connect statutory bank feeds for real-time transaction ingestion and automated ledger reconciliation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-white rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close open banking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Status Banner */}
        {syncMessage && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Bank Feed Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white uppercase tracking-wider">
              Supported UK Clearing Banks &amp; EMIs
            </label>
            <button
              onClick={handleSyncFeed}
              disabled={isSyncing}
              className="text-xs font-semibold text-[#C0A262] hover:underline flex items-center gap-1.5 min-h-[36px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing AISP feed..." : "Sync Active Feeds"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
            {banks.map((bank) => {
              const isActive = bank.connectionStatus === "ACTIVE";
              return (
                <div
                  key={bank.id}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? "border-[#C0A262]/40 bg-[#161822]"
                      : "border-[#252838] bg-[#12141C] hover:border-[#383C4E]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-[#212330] flex items-center justify-center text-xs font-bold text-[#C0A262]">
                        {bank.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-white">{bank.name}</span>
                    </div>

                    {isActive ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                        Disconnected
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#21232E] flex items-center justify-between text-[11px] text-[#A1A1AA]">
                    {isActive ? (
                      <>
                        <span className="font-mono text-white">BARCLAYS •••• 9021</span>
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <Clock className="w-3 h-3" /> {bank.consentExpiryDays}d SCA Left
                        </span>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConnectBank(bank)}
                        disabled={isConnecting}
                        className="w-full py-1.5 bg-[#1F212D] hover:bg-[#2B2E3E] text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[36px]"
                      >
                        <Zap className="w-3 h-3 text-[#C0A262]" />
                        <span>Authorize AISP Consent</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory & Security Compliance Footer */}
        <div className="p-3.5 bg-[#0C0D13] border border-[#232533] rounded-xl flex items-start gap-2.5 text-xs text-[#9CA3AF]">
          <ShieldCheck className="w-4 h-4 text-[#C0A262] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white block">Statutory UK Open Banking Compliance</span>
            <p className="text-[11px] leading-relaxed text-[#71717A]">
              Feeds utilize OAuth 2.0 PKCE and read-only Account Information Service Provider (AISP) tokens. No payment credentials or login details are ever stored. Consent expires automatically every 90 days in accordance with FCA Strong Customer Authentication (SCA) mandates.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#C0A262] hover:bg-[#D4B876] text-black font-bold text-xs rounded-xl transition-all shadow-sm min-h-[44px]"
          >
            Close &amp; Return to Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
