"use client";

import React, { useState } from "react";
import { LandingPage } from "@/components/marketing/LandingPage";
import { ProjectScopeQuestionnaire } from "@/components/staging/ProjectScopeQuestionnaire";

export default function StagingPage() {
  const [showLivePrototype, setShowLivePrototype] = useState(false);

  if (showLivePrototype) {
    return (
      <div>
        <div className="fixed top-2 right-2 sm:top-3 sm:right-3 z-50">
          <button
            onClick={() => setShowLivePrototype(false)}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-[#000000] text-[#C0A262] border border-[#C0A262] rounded-lg text-[10px] sm:text-xs font-bold shadow-2xl hover:bg-[#111111] transition-all flex items-center gap-1.5 backdrop-blur-sm"
          >
            <span>← Return to Scope Portal</span>
          </button>
        </div>
        <LandingPage />
      </div>
    );
  }

  return (
    <ProjectScopeQuestionnaire
      onUnlockPreview={() => setShowLivePrototype(true)}
    />
  );
}
