"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  RotateCcw, 
  MessageCircle, 
  ExternalLink, 
  ArrowLeft,
  Flame,
  ShieldAlert
} from "lucide-react";

interface BulldozerDemolitionProps {
  onReset?: () => void;
  isNotFoundRoute?: boolean;
}

export function BulldozerDemolition({ onReset, isNotFoundRoute = false }: BulldozerDemolitionProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isImpacted, setIsImpacted] = useState(false);
  const [showRubble, setShowRubble] = useState(false);

  useEffect(() => {
    // Reset state on animation trigger
    const startTimer = setTimeout(() => {
      setIsImpacted(false);
      setShowRubble(false);
    }, 0);

    // Impact triggers when bulldozer reaches center wall (1.8s)
    const impactTimer = setTimeout(() => {
      setIsImpacted(true);
      setShowRubble(true);
    }, 1800);

    // Reset wall before next loop cycle
    const resetTimer = setTimeout(() => {
      setIsImpacted(false);
      setShowRubble(false);
    }, 4600);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(impactTimer);
      clearTimeout(resetTimer);
    };
  }, [animationKey]);

  // Auto-loop demolition continuously every 5.2 seconds
  useEffect(() => {
    const loopTimer = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 5200);

    return () => clearInterval(loopTimer);
  }, []);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-x-hidden font-sans select-none py-8 sm:py-14">
      {/* Top & Bottom Industrial Hazard Striped Caution Bands */}
      <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-[repeating-linear-gradient(45deg,#F59E0B,#F59E0B_14px,#090A0D_14px,#090A0D_28px)] border-b border-[#F59E0B]/50 shadow-[0_4px_20px_rgba(245,158,11,0.3)] z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-[repeating-linear-gradient(45deg,#F59E0B,#F59E0B_14px,#090A0D_14px,#090A0D_28px)] border-t border-[#F59E0B]/50 shadow-[0_-4px_20px_rgba(245,158,11,0.3)] z-30" />

      {/* Background Ambient Warning Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12)_0%,rgba(0,0,0,0.95)_75%)]" />

      {/* Screen Shake Container on Impact */}
      <div className={`w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10 transition-transform ${isImpacted ? "animate-[shake_0.6s_ease-in-out]" : ""}`}>
        
        {/* Dynamic Demolition Stage Canvas */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 bg-[#0C0E14] border border-[#242736] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center">
          
          {/* Concrete / Brick Wall Texture Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141722_1px,transparent_1px),linear-gradient(to_bottom,#141722_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:24px_24px] opacity-40" />

          {/* Warning Flashing Beacon on Wall */}
          <div className="absolute top-2.5 sm:top-4 left-3 sm:left-6 flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-500/20 border border-red-500/40 rounded-full text-[9px] sm:text-[11px] font-bold text-red-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping" />
            <span>CRITICAL DEMOLITION PROTOCOL</span>
          </div>

          <div className="absolute top-2.5 sm:top-4 right-3 sm:right-6 text-[8px] sm:text-[10px] font-mono text-[#71717A] tracking-wider uppercase">
            STATUS: 404_DESTROYED
          </div>

          {/* CRACKED WALL STRUCTURE (Demolished by Bulldozer) */}
          <div 
            className={`relative z-10 transition-all duration-700 max-w-lg text-center px-3 sm:px-4 ${
              isImpacted 
                ? "scale-90 rotate-2 opacity-30 blur-[1px] translate-y-3 sm:translate-y-6" 
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <div className="inline-block relative">
              <span className="text-4xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-[#2B2E3E] select-none">
                404
              </span>
              {/* Shattered Crack Overlay */}
              {isImpacted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-0.5 bg-[#F59E0B] rotate-45 transform scale-125 shadow-[0_0_8px_#F59E0B]" />
                  <div className="w-full h-0.5 bg-[#F59E0B] -rotate-45 transform scale-125 shadow-[0_0_8px_#F59E0B]" />
                </div>
              )}
            </div>

            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white uppercase tracking-wider font-serif-heading mt-0.5 sm:mt-1">
              Wealth Wise Staging Core
            </h2>
            <p className="text-[10px] sm:text-xs text-[#9CA3AF] max-w-sm mx-auto mt-0.5 sm:mt-1 font-mono">
              [CONTAINER_ID: WW-STAGING-ALPHA]
            </p>
          </div>

          {/* FLYING RUBBLE PARTICLES & DUST SMOKE */}
          {showRubble && (
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              {/* Rock Fragment 1 */}
              <div className="absolute left-[52%] top-[45%] w-4 h-4 sm:w-6 sm:h-6 bg-[#3F3F46] border border-[#F59E0B]/50 rounded-xs animate-[flyRight_1.2s_ease-out_forwards]" />
              {/* Rock Fragment 2 */}
              <div className="absolute left-[48%] top-[50%] w-6 h-4 sm:w-8 sm:h-5 bg-[#27272A] border border-[#71717A] rounded-xs animate-[flyUp_1s_ease-out_forwards]" />
              {/* Rock Fragment 3 */}
              <div className="absolute left-[55%] top-[55%] w-3 h-3 sm:w-4 sm:h-4 bg-[#F59E0B] rounded-xs animate-[flyDown_1.4s_ease-out_forwards]" />
              {/* Flying Sparks */}
              <div className="absolute left-[50%] top-[40%] w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
              <div className="absolute left-[54%] top-[60%] w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              {/* Dust Wave */}
              <div className="absolute left-[20%] right-[20%] bottom-4 sm:bottom-8 h-8 sm:h-12 bg-[#F59E0B]/10 rounded-full blur-xl animate-pulse" />
            </div>
          )}

          {/* THE BULLDOZER UNIT (Drives across from left to right) */}
          <div 
            key={animationKey}
            className="absolute z-20 bottom-3 sm:bottom-6 md:bottom-8 left-0 animate-[driveAcross_4.8s_cubic-bezier(0.25,1,0.5,1)_forwards]"
          >
            {/* Animated Diesel Smoke Puffs */}
            <div className="absolute -top-4 sm:-top-6 left-8 sm:left-12 flex space-x-1 opacity-70">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#52525B] rounded-full animate-[smokePuff_1s_infinite_ease-out]" />
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#3F3F46] rounded-full animate-[smokePuff_1.3s_infinite_ease-out_0.2s]" />
            </div>

            {/* SVG Industrial Demolition Bulldozer */}
            <svg 
              className="w-32 sm:w-44 md:w-56 h-auto drop-shadow-[0_12px_24px_rgba(245,158,11,0.4)]" 
              viewBox="0 0 160 110" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roof Safety Amber Flashing Beacon */}
              <circle cx="68" cy="12" r="5" fill="#F59E0B" className="animate-pulse" />
              <path d="M 64 12 L 72 12 L 70 8 L 66 8 Z" fill="#D97706" />

              {/* Heavy Cabin Body */}
              <path d="M 40 76 L 40 34 L 86 34 L 98 76 Z" fill="#F59E0B" stroke="#000" strokeWidth="2.5" />
              
              {/* Reinforced Cabin Glass Tinted Window */}
              <rect x="48" y="40" width="22" height="24" rx="2" fill="#0C0E14" stroke="#D97706" strokeWidth="2" />
              {/* Cabin Roll Cage Slits */}
              <line x1="59" y1="40" x2="59" y2="64" stroke="#2B2D3A" strokeWidth="2" />

              {/* Heavy Engine Compartment */}
              <rect x="94" y="48" width="38" height="28" rx="3" fill="#D97706" stroke="#000" strokeWidth="2.5" />
              {/* Engine Grille Heat Vents */}
              <line x1="102" y1="54" x2="102" y2="70" stroke="#78350F" strokeWidth="2" />
              <line x1="108" y1="54" x2="108" y2="70" stroke="#78350F" strokeWidth="2" />
              <line x1="114" y1="54" x2="114" y2="70" stroke="#78350F" strokeWidth="2" />
              <line x1="120" y1="54" x2="120" y2="70" stroke="#78350F" strokeWidth="2" />

              {/* Vertical Exhaust Pipe */}
              <rect x="122" y="24" width="5" height="24" fill="#3F3F46" rx="1.5" />
              <rect x="120" y="22" width="9" height="3" fill="#18181B" rx="1" />

              {/* Hydraulic Arm Cylinder (Articulated Push Arm) */}
              <line x1="78" y1="72" x2="136" y2="84" stroke="#27272A" strokeWidth="9" strokeLinecap="round" />
              <line x1="78" y1="72" x2="136" y2="84" stroke="#71717A" strokeWidth="5" strokeLinecap="round" />
              <circle cx="78" cy="72" r="5" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="136" cy="84" r="5" fill="#F59E0B" stroke="#000" strokeWidth="2" />

              {/* HEAVY CURVED STEEL DEMOLITION BLADE WITH TEETH */}
              <path 
                d="M 136 46 Q 152 74 136 98 L 128 98 Q 142 74 128 46 Z" 
                fill="#E4E4E7" 
                stroke="#000" 
                strokeWidth="2.5" 
              />
              {/* Demolition Cutting Blade Teeth */}
              <polygon points="135,96 142,98 135,100" fill="#F59E0B" />
              <polygon points="137,70 144,72 137,74" fill="#F59E0B" />
              <polygon points="136,52 143,54 136,56" fill="#F59E0B" />

              {/* Track Chassis Body Assembly */}
              <rect x="22" y="74" width="94" height="24" rx="12" fill="#18181B" stroke="#000" strokeWidth="3" />

              {/* Track Steel Roller Wheels */}
              <circle cx="34" cy="86" r="7" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="51" cy="86" r="7" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="68" cy="86" r="7" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="85" cy="86" r="7" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              <circle cx="102" cy="86" r="7" fill="#F59E0B" stroke="#000" strokeWidth="2" />

              {/* Center Wheel Hub Pins */}
              <circle cx="34" cy="86" r="2.5" fill="#000" />
              <circle cx="51" cy="86" r="2.5" fill="#000" />
              <circle cx="68" cy="86" r="2.5" fill="#000" />
              <circle cx="85" cy="86" r="2.5" fill="#000" />
              <circle cx="102" cy="86" r="2.5" fill="#000" />

              {/* Continuous Track Cleats / Treads */}
              <line x1="26" y1="80" x2="26" y2="92" stroke="#3F3F46" strokeWidth="2" />
              <line x1="110" y1="80" x2="110" y2="92" stroke="#3F3F46" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Demolition Information Box */}
        <div className="bg-[#0E1017] border border-[#232635] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 text-center shadow-xl">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/15 border border-red-500/30 rounded-full text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              <span>404 Demolition Complete · Environment Wiped</span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-black font-serif-heading text-white">
              Staging Architecture Decommissioned
            </h1>

            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              The <strong>60-day project reservation period</strong> for Wealth Wise Accountant has expired without scope sign-off. As per automated pipeline guidelines, the temporary staging containers, draft databases, and live preview branches have been permanently dismantled by our demolition protocol.
            </p>
          </div>

          {/* Quick Details Box */}
          <div className="p-3.5 sm:p-4 bg-[#141620] rounded-xl sm:rounded-2xl border border-[#262838] text-xs text-left max-w-xl mx-auto space-y-1.5 sm:space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5 sm:gap-2">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B]" />
              <span className="text-xs sm:text-sm">To re-architect and reinstate your project:</span>
            </div>
            <p className="text-[#9CA3AF] text-[11px] leading-relaxed">
              To re-provision a dedicated staging container and preserve the November delivery timeline, contact the lead engineering team with the completed 13-question scope requirements and deposit confirmation.
            </p>
          </div>

          {/* Interactive Action Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
            {/* Replay Demolition Animation */}
            <button
              onClick={handleReplay}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1D202C] hover:bg-[#282C3D] text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-semibold transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
              <span>Replay Demolition</span>
            </button>

            {/* Official Agency Website */}
            <a
              href="https://mercianwealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1C1E29] hover:bg-[#252838] text-[#C0A262] border border-[#C0A262]/35 text-xs font-semibold transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Mercian Wealth</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/447851055929?text=Hi%20Dev%2C%20I%20am%20contacting%20you%20regarding%20reinstating%20the%20Wealth%20Wise%20Accountant%20staging%20environment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#22c35e] text-black text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Developer (07851055929)</span>
            </a>

            {/* Return to Staging Scope Portal or Homepage */}
            <Link
              href="/"
              onClick={() => onReset?.()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#090A0D] hover:bg-[#151722] text-[#A1A1AA] hover:text-white border border-[#2B2D3A] text-xs font-semibold transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Staging Portal</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Embedded CSS Keyframes for Animation */}
      <style jsx>{`
        @keyframes driveAcross {
          0% {
            transform: translateX(-140%);
          }
          35% {
            transform: translateX(10%);
          }
          48% {
            transform: translateX(35%);
          }
          65% {
            transform: translateX(65%);
          }
          100% {
            transform: translateX(140%);
          }
        }

        @keyframes smokePuff {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-24px) scale(1.6);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          15% { transform: translate(-8px, 4px) rotate(-1deg); }
          30% { transform: translate(8px, -4px) rotate(1deg); }
          45% { transform: translate(-6px, 2px) rotate(-0.5deg); }
          60% { transform: translate(6px, -2px) rotate(0.5deg); }
          75% { transform: translate(-3px, 1px) rotate(0deg); }
        }

        @keyframes flyRight {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(120px, 60px) rotate(180deg); opacity: 0; }
        }

        @keyframes flyUp {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-60px, -80px) rotate(-140deg); opacity: 0; }
        }

        @keyframes flyDown {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(80px, 90px) rotate(220deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
