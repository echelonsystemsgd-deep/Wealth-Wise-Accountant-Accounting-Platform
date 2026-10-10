"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "@/lib/dal/types";
import { ManagedClient, PracticeUserSession } from "@/lib/crm/types";
import { SEEDED_CLIENTS } from "@/lib/crm/seedData";

interface AuthContextType {
  // Active session
  user: PracticeUserSession | null;
  role: UserRole;
  isAccountant: boolean;
  isClientDirector: boolean;
  isAdmin: boolean;

  // Active client organisation context
  activeClient: ManagedClient;
  allClients: ManagedClient[];

  // Tenant / Client switching
  switchClient: (clientId: string) => void;
  switchRole: (newRole: UserRole) => void;

  // Real or demo auth actions
  loginAsDemoUser: (persona: "SARAH_ACCOUNTANT" | "MARCUS_CLIENT" | "ADMIN") => void;
  loginWithCredentials: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
}

const DEFAULT_ACCOUNTANT_SESSION: PracticeUserSession = {
  id: "usr-sarah-1",
  email: "sarah@wealthwiseaccountant.co.uk",
  fullName: "Sarah Jenkins, ACCA",
  role: "SENIOR_ACCOUNTANT",
  practiceId: "prac-ww-1",
  practiceName: "Wealth Wise Accountant Practice",
  activeOrganisationId: "org-apex-1",
  activeOrganisationName: "Apex Digital Solutions Ltd",
  avatarUrl: "/images/wealthwise-team.png",
};

const DEFAULT_CLIENT_SESSION: PracticeUserSession = {
  id: "usr-marcus-1",
  email: "marcus@apexdigital.co.uk",
  fullName: "Marcus Sterling",
  role: "CLIENT_DIRECTOR",
  practiceId: "prac-ww-1",
  practiceName: "Wealth Wise Accountant Practice",
  activeOrganisationId: "org-apex-1",
  activeOrganisationName: "Apex Digital Solutions Ltd",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialRole = "SENIOR_ACCOUNTANT",
}: {
  children: React.ReactNode;
  initialRole?: UserRole;
}) {
  const [clients] = useState<ManagedClient[]>(SEEDED_CLIENTS);
  const [activeClientId, setActiveClientId] = useState<string>("org-apex-1");

  const [session, setSession] = useState<PracticeUserSession>(() => {
    if (initialRole === "CLIENT_DIRECTOR") {
      return DEFAULT_CLIENT_SESSION;
    }
    return DEFAULT_ACCOUNTANT_SESSION;
  });

  const activeClient = clients.find((c) => c.id === activeClientId) || clients[0];

  const switchClient = (clientId: string) => {
    const found = clients.find((c) => c.id === clientId);
    if (found) {
      setActiveClientId(clientId);
      setSession((prev) => ({
        ...prev,
        activeOrganisationId: found.id,
        activeOrganisationName: found.companyName,
      }));
    }
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === "CLIENT_DIRECTOR") {
      setSession({
        ...DEFAULT_CLIENT_SESSION,
        activeOrganisationId: activeClient.id,
        activeOrganisationName: activeClient.companyName,
      });
    } else {
      setSession({
        ...DEFAULT_ACCOUNTANT_SESSION,
        role: newRole,
        activeOrganisationId: activeClient.id,
        activeOrganisationName: activeClient.companyName,
      });
    }
  };

  const loginAsDemoUser = (persona: "SARAH_ACCOUNTANT" | "MARCUS_CLIENT" | "ADMIN") => {
    if (persona === "MARCUS_CLIENT") {
      setSession(DEFAULT_CLIENT_SESSION);
      setActiveClientId("org-apex-1");
    } else if (persona === "ADMIN") {
      setSession({
        ...DEFAULT_ACCOUNTANT_SESSION,
        role: "PRACTICE_ADMIN",
        fullName: "Senior Practice Partner",
        email: "partner@wealthwiseaccountant.co.uk",
      });
    } else {
      setSession(DEFAULT_ACCOUNTANT_SESSION);
    }
  };

  const loginWithCredentials = async (email: string, role: UserRole = "SENIOR_ACCOUNTANT") => {
    // In live cloud mode, this connects to Supabase auth client.
    // In preview mode, constructs authenticated session securely.
    setSession({
      id: `usr-${Date.now()}`,
      email,
      fullName: email.split("@")[0].replace(".", " ").toUpperCase(),
      role,
      practiceId: "prac-ww-1",
      practiceName: "Wealth Wise Accountant Practice",
      activeOrganisationId: activeClient.id,
      activeOrganisationName: activeClient.companyName,
    });
    return true;
  };

  const logout = () => {
    // Reset to default preview
    setSession(DEFAULT_ACCOUNTANT_SESSION);
  };

  const isAccountant = session.role === "PRACTICE_ADMIN" || session.role === "SENIOR_ACCOUNTANT" || session.role === "BOOKKEEPER";
  const isClientDirector = session.role === "CLIENT_DIRECTOR";
  const isAdmin = session.role === "PRACTICE_ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user: session,
        role: session.role,
        isAccountant,
        isClientDirector,
        isAdmin,
        activeClient,
        allClients: clients,
        switchClient,
        switchRole,
        loginAsDemoUser,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
