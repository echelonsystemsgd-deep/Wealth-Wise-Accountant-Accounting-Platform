/**
 * Wealth Wise Accountant — Client Portfolio Model & Practice CRM Types
 * Defines practice management schemas, client health indicators, and billing profiles.
 */

import { UserRole, EntityType } from "@/lib/dal/types";

export type ClientComplianceStatus = "GOOD_STANDING" | "ACTION_REQUIRED" | "OVERDUE_FILING";
export type PracticeBillingModel = "INCLUDED_IN_RETAINER" | "DIRECT_SAAS_PRO" | "DIRECT_SAAS_STARTER";

export interface ManagedClient {
  id: string;
  practiceId: string;
  companyName: string;
  tradingName: string;
  companyNumber: string;
  vatNumber?: string;
  entityType: EntityType;
  primaryDirector: {
    name: string;
    email: string;
    phone: string;
  };
  assignedAccountant: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  tier: "STARTER_SOLE_TRADER" | "PRO_LTD" | "ENTERPRISE_CFO";
  billingModel: PracticeBillingModel;
  monthlyFeePence: number;
  complianceStatus: ClientComplianceStatus;
  deadlines: {
    nextVatReturnDate: string;
    nextAccountsDueDate: string;
    confirmationStatementDate: string;
  };
  healthMetrics: {
    unreconciledBankLinesCount: number;
    pendingReceiptsCount: number;
    draftInvoicesCount: number;
    cashBalancePence: number;
    unpaidReceivablesPence: number;
  };
  // Explicit attention placeholders
  integrationAttentionRequired?: {
    needsClientAction?: string[];
    needsAccountantAction?: string[];
  };
}

export interface PracticeUserSession {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  practiceId: string;
  practiceName: string;
  activeOrganisationId: string;
  activeOrganisationName: string;
  avatarUrl?: string;
}
