import { JournalEntry, SalesInvoice, SupplierBill, BankStatementLine, Contact } from "./types";

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: "cnt-1",
    businessId: "biz-1",
    type: "CUSTOMER",
    name: "CloudScale Technologies Ltd",
    companyNumber: "11904291",
    vatNumber: "GB 894 201 93",
    email: "billing@cloudscale.io",
    paymentTermsDays: 14,
  },
  {
    id: "cnt-2",
    businessId: "biz-1",
    type: "CUSTOMER",
    name: "Meridian BioTech Ltd",
    companyNumber: "10984920",
    vatNumber: "GB 781 294 12",
    email: "accounts@meridianbio.co.uk",
    paymentTermsDays: 30,
  },
  {
    id: "cnt-3",
    businessId: "biz-1",
    type: "SUPPLIER",
    name: "Amazon Web Services EMEA SARL",
    vatNumber: "GB 340 4567 89",
    email: "aws-invoices@amazon.com",
    paymentTermsDays: 30,
  },
  {
    id: "cnt-4",
    businessId: "biz-1",
    type: "SUPPLIER",
    name: "Canary Wharf Workspace Ltd",
    vatNumber: "GB 654 3210 98",
    email: "billing@canarywharfworkspace.co.uk",
    paymentTermsDays: 7,
  },
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  // 1. Inception funding
  {
    id: "j-1001",
    businessId: "biz-1",
    entryDate: "2026-09-01",
    reference: "EQUITY-FOUNDER-01",
    sourceType: "MANUAL_JOURNAL",
    status: "POSTED",
    totalPence: 5000000, // £50,000.00
    postedAt: "2026-09-01T09:00:00Z",
    postedBy: "Sarah Jenkins, ACCA",
    lines: [
      {
        id: "jl-1",
        accountCode: "1000", // Bank
        debitPence: 5000000,
        creditPence: 0,
        description: "Initial share capital subscription",
      },
      {
        id: "jl-2",
        accountCode: "3000", // Share capital
        debitPence: 0,
        creditPence: 5000000,
        description: "Ordinary shares issued at par",
      },
    ],
  },
  // 2. Prior month consulting invoice posted
  {
    id: "j-1002",
    businessId: "biz-1",
    entryDate: "2026-09-15",
    reference: "INV-2026-088",
    sourceType: "SALES_INVOICE",
    status: "POSTED",
    totalPence: 222000, // £2,220.00 (1,850 + 370 VAT)
    postedAt: "2026-09-15T11:30:00Z",
    postedBy: "Sarah Jenkins, ACCA",
    lines: [
      {
        id: "jl-3",
        accountCode: "1100", // Debtors
        debitPence: 222000,
        creditPence: 0,
        description: "Invoice INV-2026-088 to Meridian BioTech",
      },
      {
        id: "jl-4",
        accountCode: "4000", // Revenue
        debitPence: 0,
        creditPence: 185000,
        description: "Full Stack Infrastructure Migration (Sprint 2)",
      },
      {
        id: "jl-5",
        accountCode: "2200", // VAT Output
        debitPence: 0,
        creditPence: 37000,
        description: "20% Standard Rate Output VAT",
      },
    ],
  },
  // 3. Payment received for invoice INV-2026-088
  {
    id: "j-1003",
    businessId: "biz-1",
    entryDate: "2026-09-29",
    reference: "PAY-MERIDIAN-088",
    sourceType: "BANK_TRANSACTION",
    status: "POSTED",
    totalPence: 222000,
    postedAt: "2026-09-29T14:15:00Z",
    postedBy: "Sarah Jenkins, ACCA",
    lines: [
      {
        id: "jl-6",
        accountCode: "1000", // Bank
        debitPence: 222000,
        creditPence: 0,
        description: "Payment received from Meridian BioTech",
      },
      {
        id: "jl-7",
        accountCode: "1100", // Debtors cleared
        debitPence: 0,
        creditPence: 222000,
        description: "Settlement of INV-2026-088",
      },
    ],
  },
  // 4. Current invoice issued (INV-2026-089)
  {
    id: "j-1004",
    businessId: "biz-1",
    entryDate: "2026-09-28",
    reference: "INV-2026-089",
    sourceType: "SALES_INVOICE",
    status: "POSTED",
    totalPence: 435000, // £4,350.00
    postedAt: "2026-09-28T16:00:00Z",
    postedBy: "Marcus Sterling",
    lines: [
      {
        id: "jl-8",
        accountCode: "1100", // Debtors
        debitPence: 435000,
        creditPence: 0,
        description: "Invoice INV-2026-089 to CloudScale Technologies",
      },
      {
        id: "jl-9",
        accountCode: "4000", // Revenue
        debitPence: 0,
        creditPence: 362500,
        description: "Enterprise Q3 Cloud Consulting & Architecture",
      },
      {
        id: "jl-10",
        accountCode: "2200", // VAT Output
        debitPence: 0,
        creditPence: 72500,
        description: "20% Standard Rate Output VAT",
      },
    ],
  },
  // 5. Office rent paid
  {
    id: "j-1005",
    businessId: "biz-1",
    entryDate: "2026-10-02",
    reference: "BILL-RENT-OCT",
    sourceType: "PURCHASE_BILL",
    status: "POSTED",
    totalPence: 245000, // £2,450.00
    postedAt: "2026-10-02T10:00:00Z",
    postedBy: "Sarah Jenkins, ACCA",
    lines: [
      {
        id: "jl-11",
        accountCode: "7000", // Rent Expense
        debitPence: 245000,
        creditPence: 0,
        description: "Workspace Canary Wharf October Rent",
      },
      {
        id: "jl-12",
        accountCode: "1000", // Bank Outflow
        debitPence: 0,
        creditPence: 245000,
        description: "Direct debit Canary Wharf",
      },
    ],
  },
];

export const INITIAL_INVOICES: SalesInvoice[] = [
  {
    id: "inv-1",
    businessId: "biz-1",
    invoiceNumber: "INV-2026-089",
    contactId: "cnt-1",
    contactName: "CloudScale Technologies Ltd",
    issueDate: "2026-09-28",
    dueDate: "2026-10-12",
    items: [
      {
        id: "item-1",
        description: "Enterprise Q3 Cloud Consulting & Architecture",
        accountCode: "4000",
        quantity: 1,
        unitPricePence: 362500,
        vatRatePercent: 20,
        vatPence: 72500,
        lineTotalPence: 435000,
      },
    ],
    subtotalPence: 362500,
    vatPence: 72500,
    totalPence: 435000,
    amountPaidPence: 0,
    amountDuePence: 435000,
    status: "ISSUED",
    journalEntryId: "j-1004",
  },
  {
    id: "inv-2",
    businessId: "biz-1",
    invoiceNumber: "INV-2026-088",
    contactId: "cnt-2",
    contactName: "Meridian BioTech Ltd",
    issueDate: "2026-09-15",
    dueDate: "2026-09-29",
    items: [
      {
        id: "item-2",
        description: "Full Stack Infrastructure Migration (Sprint 2)",
        accountCode: "4000",
        quantity: 1,
        unitPricePence: 185000,
        vatRatePercent: 20,
        vatPence: 37000,
        lineTotalPence: 222000,
      },
    ],
    subtotalPence: 185000,
    vatPence: 37000,
    totalPence: 222000,
    amountPaidPence: 222000,
    amountDuePence: 0,
    status: "PAID",
    journalEntryId: "j-1002",
  },
];

export const INITIAL_BILLS: SupplierBill[] = [
  {
    id: "bill-1",
    businessId: "biz-1",
    billNumber: "BILL-AWS-OCT",
    supplierId: "cnt-3",
    supplierName: "Amazon Web Services EMEA SARL",
    issueDate: "2026-10-01",
    dueDate: "2026-10-31",
    items: [
      {
        id: "item-3",
        description: "EC2 & RDS Cloud Hosting Usage Q3",
        accountCode: "7040",
        quantity: 1,
        unitPricePence: 62083,
        vatRatePercent: 20,
        vatPence: 12417,
        lineTotalPence: 74500,
      },
    ],
    subtotalPence: 62083,
    vatPence: 12417,
    totalPence: 74500,
    amountPaidPence: 0,
    amountDuePence: 74500,
    status: "APPROVED",
  },
  {
    id: "bill-2",
    businessId: "biz-1",
    billNumber: "BILL-RENT-OCT",
    supplierId: "cnt-4",
    supplierName: "Canary Wharf Workspace Ltd",
    issueDate: "2026-10-01",
    dueDate: "2026-10-08",
    items: [
      {
        id: "item-4",
        description: "Commercial Office Suite 4B Canary Wharf",
        accountCode: "7000",
        quantity: 1,
        unitPricePence: 245000,
        vatRatePercent: 0,
        vatPence: 0,
        lineTotalPence: 245000,
      },
    ],
    subtotalPence: 245000,
    vatPence: 0,
    totalPence: 245000,
    amountPaidPence: 245000,
    amountDuePence: 0,
    status: "PAID",
    journalEntryId: "j-1005",
  },
];

export const INITIAL_BANK_STATEMENT_LINES: BankStatementLine[] = [
  {
    id: "stmt-1",
    bankAccountId: "1000",
    transactionDate: "2026-10-08",
    description: "STRIPE PAYOUT REF 894021 - CLOUDSCALE",
    amountPence: 435000,
    isReconciled: false,
    suggestedMatch: {
      entityName: "CloudScale Technologies Ltd",
      targetReference: "INV-2026-089",
      confidencePercent: 98,
    },
  },
  {
    id: "stmt-2",
    bankAccountId: "1000",
    transactionDate: "2026-10-07",
    description: "AWS EMEA UK DIRECT DEBIT",
    amountPence: -74500,
    isReconciled: false,
    suggestedMatch: {
      entityName: "Amazon Web Services EMEA SARL",
      targetReference: "BILL-AWS-OCT",
      confidencePercent: 95,
    },
  },
  {
    id: "stmt-3",
    bankAccountId: "1000",
    transactionDate: "2026-10-06",
    description: "TFL TRAVEL CHARGE 4920",
    amountPence: -1480,
    isReconciled: false,
    suggestedMatch: {
      entityName: "Transport for London",
      targetReference: "RULE: 7050 Travel",
      confidencePercent: 99,
    },
  },
  {
    id: "stmt-4",
    bankAccountId: "1000",
    transactionDate: "2026-10-02",
    description: "WORKSPACE CANARY WHARF RENT",
    amountPence: -245000,
    isReconciled: true,
    matchedType: "BILL",
    matchedId: "bill-2",
  },
];
