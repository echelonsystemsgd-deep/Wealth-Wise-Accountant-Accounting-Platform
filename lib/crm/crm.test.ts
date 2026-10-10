import { describe, it, expect } from "vitest";
import { SEEDED_CLIENTS } from "./seedData";
import { ManagedClient } from "./types";

describe("Phase 2 Practice CRM & Multi-Tenant Portfolio Verification", () => {
  it("should have seeded clients with valid UK company and entity structures", () => {
    expect(SEEDED_CLIENTS.length).toBeGreaterThanOrEqual(4);

    SEEDED_CLIENTS.forEach((client) => {
      expect(client.id).toBeDefined();
      expect(client.practiceId).toBe("prac-ww-1");
      expect(client.companyName).toBeTruthy();
      expect(["LTD", "SOLE_TRADER", "LLP"]).toContain(client.entityType);
      expect(client.primaryDirector.email).toContain("@");
      expect(client.assignedAccountant.role).toBeDefined();
    });
  });

  it("should enforce distinct billing models and positive fee pence", () => {
    const retainers = SEEDED_CLIENTS.filter((c) => c.billingModel === "INCLUDED_IN_RETAINER");
    const saas = SEEDED_CLIENTS.filter((c) => c.billingModel !== "INCLUDED_IN_RETAINER");

    expect(retainers.length).toBeGreaterThan(0);
    expect(saas.length).toBeGreaterThan(0);

    // Sole trader SaaS is £9.00 (900 pence)
    const soleTrader = SEEDED_CLIENTS.find((c) => c.entityType === "SOLE_TRADER");
    expect(soleTrader?.monthlyFeePence).toBe(900);
  });

  it("should maintain explicit action checklists for both accountant and client", () => {
    SEEDED_CLIENTS.forEach((client) => {
      const attention = client.integrationAttentionRequired;
      expect(attention).toBeDefined();

      if (attention?.needsAccountantAction) {
        expect(attention.needsAccountantAction.length).toBeGreaterThan(0);
      }
      if (attention?.needsClientAction) {
        expect(attention.needsClientAction.length).toBeGreaterThan(0);
      }
    });
  });

  it("should include compliance status and statutory filing deadlines", () => {
    SEEDED_CLIENTS.forEach((client) => {
      expect(["GOOD_STANDING", "ACTION_REQUIRED", "OVERDUE_FILING"]).toContain(client.complianceStatus);
      expect(client.deadlines.nextAccountsDueDate).toBeTruthy();
      expect(client.deadlines.nextVatReturnDate).toBeTruthy();
    });
  });
});
