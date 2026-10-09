export interface ClientProfile {
  id: string;
  companyName: string;
  tradingName: string;
  companyNumber: string;
  vatNumber?: string;
  entityType: "LTD" | "SOLE_TRADER" | "PARTNERSHIP";
  directorName: string;
  contactEmail: string;
  status: "GOOD_STANDING" | "MISSING_DOCS" | "FILING_DUE" | "ACTION_REQUIRED";
  yearEnd: string;
  vatPeriodEnd?: string;
  nextDeadline: string;
  unreconciledCount: number;
  missingReceiptsCount: number;
  monthlyRevenuePence: number;
  monthlyExpensePence: number;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amountPence: number; // Positive = credit (money in), Negative = debit (money out)
  type: "DEPOSIT" | "PAYMENT";
  category?: string;
  status: "RECONCILED" | "UNMATCHED" | "SUGGESTED";
  suggestedMatch?: {
    type: "INVOICE" | "BILL" | "RULE";
    reference: string;
    targetName: string;
    confidence: number; // 0-100%
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientOrgId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  items: {
    description: string;
    quantity: number;
    unitPricePence: number;
    vatRatePercent: number;
  }[];
}

export interface DocumentUpload {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  clientOrgId: string;
  status: "ANALYSING" | "EXTRACTED_DRAFT" | "APPROVED" | "REJECTED";
  extractedData?: {
    vendor: string;
    date: string;
    grossAmountPence: number;
    vatAmountPence: number;
    suggestedNominal: string;
    confidence: number;
  };
}

export const SYNTHETIC_CLIENTS: ClientProfile[] = [
  {
    id: "cl-1",
    companyName: "Apex Digital Solutions Ltd",
    tradingName: "Apex Digital",
    companyNumber: "12849201",
    vatNumber: "GB 948 2018 44",
    entityType: "LTD",
    directorName: "Marcus Sterling",
    contactEmail: "marcus@apexdigital.co.uk",
    status: "MISSING_DOCS",
    yearEnd: "31 Dec 2026",
    vatPeriodEnd: "31 Oct 2026",
    nextDeadline: "28 Oct 2026 (VAT Q3 Return)",
    unreconciledCount: 8,
    missingReceiptsCount: 4,
    monthlyRevenuePence: 2845000,
    monthlyExpensePence: 1420000,
  },
  {
    id: "cl-2",
    companyName: "Vanguard Logistics Group Ltd",
    tradingName: "Vanguard Logistics",
    companyNumber: "09832104",
    vatNumber: "GB 392 1083 29",
    entityType: "LTD",
    directorName: "Elena Rostova",
    contactEmail: "finance@vanguardlogistics.com",
    status: "FILING_DUE",
    yearEnd: "30 Nov 2026",
    vatPeriodEnd: "30 Sep 2026",
    nextDeadline: "15 Oct 2026 (Annual Accounts)",
    unreconciledCount: 3,
    missingReceiptsCount: 1,
    monthlyRevenuePence: 6890000,
    monthlyExpensePence: 4120000,
  },
  {
    id: "cl-3",
    companyName: "Kensington Studio Interiors",
    tradingName: "Kensington Studio",
    companyNumber: "14029311",
    entityType: "SOLE_TRADER",
    directorName: "Julian Hayes",
    contactEmail: "julian@kensingtonstudio.co.uk",
    status: "GOOD_STANDING",
    yearEnd: "05 Apr 2027",
    nextDeadline: "31 Jan 2027 (Self Assessment)",
    unreconciledCount: 0,
    missingReceiptsCount: 0,
    monthlyRevenuePence: 1120000,
    monthlyExpensePence: 480000,
  },
  {
    id: "cl-4",
    companyName: "GreenPulse Solar Energy Ltd",
    tradingName: "GreenPulse Solar",
    companyNumber: "13904928",
    vatNumber: "GB 482 9104 11",
    entityType: "LTD",
    directorName: "Dr. Aris Vance",
    contactEmail: "aris@greenpulsesolar.co.uk",
    status: "ACTION_REQUIRED",
    yearEnd: "31 Dec 2026",
    vatPeriodEnd: "31 Oct 2026",
    nextDeadline: "19 Oct 2026 (Corporation Tax Notice)",
    unreconciledCount: 12,
    missingReceiptsCount: 6,
    monthlyRevenuePence: 4450000,
    monthlyExpensePence: 2890000,
  },
];

export const SYNTHETIC_TRANSACTIONS: BankTransaction[] = [
  {
    id: "tx-1",
    date: "08 Oct 2026",
    description: "STRIPE PAYOUT REF 894021",
    amountPence: 435000,
    type: "DEPOSIT",
    category: "Sales Revenue",
    status: "SUGGESTED",
    suggestedMatch: {
      type: "INVOICE",
      reference: "INV-2026-089",
      targetName: "CloudScale Technologies",
      confidence: 98,
    },
  },
  {
    id: "tx-2",
    date: "07 Oct 2026",
    description: "AWS EMEA UK DIRECT DEBIT",
    amountPence: -74500,
    type: "PAYMENT",
    category: "Software & Hosting",
    status: "SUGGESTED",
    suggestedMatch: {
      type: "BILL",
      reference: "BILL-OCT-004",
      targetName: "Amazon Web Services",
      confidence: 95,
    },
  },
  {
    id: "tx-3",
    date: "06 Oct 2026",
    description: "TFL TRAVEL CHARGE 4920",
    amountPence: -1480,
    type: "PAYMENT",
    category: "Travel & Subsistence",
    status: "SUGGESTED",
    suggestedMatch: {
      type: "RULE",
      reference: "AUTO-TRAVEL-RULE",
      targetName: "Transport for London",
      confidence: 99,
    },
  },
  {
    id: "tx-4",
    date: "04 Oct 2026",
    description: "UNKNOWN BACS TRANSFER - J SMITH",
    amountPence: 120000,
    type: "DEPOSIT",
    status: "UNMATCHED",
  },
  {
    id: "tx-5",
    date: "02 Oct 2026",
    description: "WORKSPACE CANARY WHARF RENT",
    amountPence: -245000,
    type: "PAYMENT",
    category: "Rent & Premises",
    status: "RECONCILED",
  },
];

export const SYNTHETIC_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-089",
    clientOrgId: "cl-1",
    customerName: "CloudScale Technologies Ltd",
    customerEmail: "accounts@cloudscale.io",
    issueDate: "28 Sep 2026",
    dueDate: "12 Oct 2026",
    status: "SENT",
    subtotalPence: 362500,
    vatPence: 72500,
    totalPence: 435000,
    items: [
      {
        description: "Enterprise Q3 Cloud Consulting & Architecture",
        quantity: 1,
        unitPricePence: 362500,
        vatRatePercent: 20,
      },
    ],
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-088",
    clientOrgId: "cl-1",
    customerName: "Meridian BioTech Ltd",
    customerEmail: "billing@meridianbio.co.uk",
    issueDate: "15 Sep 2026",
    dueDate: "29 Sep 2026",
    status: "PAID",
    subtotalPence: 185000,
    vatPence: 37000,
    totalPence: 222000,
    items: [
      {
        description: "Full Stack Infrastructure Migration (Sprint 2)",
        quantity: 1,
        unitPricePence: 185000,
        vatRatePercent: 20,
      },
    ],
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-090",
    clientOrgId: "cl-1",
    customerName: "Aether Health Labs",
    customerEmail: "finance@aetherhealth.com",
    issueDate: "05 Oct 2026",
    dueDate: "19 Oct 2026",
    status: "DRAFT",
    subtotalPence: 120000,
    vatPence: 24000,
    totalPence: 144000,
    items: [
      {
        description: "Monthly Retainer & System Maintenance",
        quantity: 1,
        unitPricePence: 120000,
        vatRatePercent: 20,
      },
    ],
  },
];

export const SYNTHETIC_DOCUMENTS: DocumentUpload[] = [
  {
    id: "doc-1",
    fileName: "Apple_Store_Invoice_MBP_M3.pdf",
    fileSize: "412 KB",
    uploadedAt: "08 Oct 2026, 14:22",
    clientOrgId: "cl-1",
    status: "EXTRACTED_DRAFT",
    extractedData: {
      vendor: "Apple Retail UK Ltd",
      date: "07 Oct 2026",
      grossAmountPence: 249900,
      vatAmountPence: 41650,
      suggestedNominal: "7040 - Computer & IT Equipment",
      confidence: 97,
    },
  },
  {
    id: "doc-2",
    fileName: "British_Gas_Commercial_Q3.pdf",
    fileSize: "890 KB",
    uploadedAt: "06 Oct 2026, 09:15",
    clientOrgId: "cl-1",
    status: "EXTRACTED_DRAFT",
    extractedData: {
      vendor: "British Gas Lite",
      date: "04 Oct 2026",
      grossAmountPence: 38240,
      vatAmountPence: 1820,
      suggestedNominal: "7020 - Light & Heat",
      confidence: 94,
    },
  },
  {
    id: "doc-3",
    fileName: "Stationery_Viking_Sept.pdf",
    fileSize: "230 KB",
    uploadedAt: "02 Oct 2026, 11:40",
    clientOrgId: "cl-1",
    status: "APPROVED",
  },
];
