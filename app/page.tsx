"use client";

import React, { useState } from "react";
import { LandingPage } from "@/components/marketing/LandingPage";
import { ProjectScopeQuestionnaire } from "@/components/staging/ProjectScopeQuestionnaire";

export default function Home() {
  // Staging reservation lock mode is active by default
  const [showLivePrototype, setShowLivePrototype] = useState(false);

  if (showLivePrototype) {
    return (
      <div>
        {/* Floating banner to return to staging scope portal */}
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setShowLivePrototype(false)}
            className="px-3.5 py-1.5 bg-[#000000] text-[#C0A262] border border-[#C0A262] rounded-lg text-xs font-bold shadow-xl hover:bg-[#111111] transition-all flex items-center gap-2"
          >
            <span>← Return to Scope & Staging Portal</span>
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
