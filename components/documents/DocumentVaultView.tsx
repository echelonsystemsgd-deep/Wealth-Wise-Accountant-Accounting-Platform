"use client";

import React, { useState } from "react";
import { SYNTHETIC_DOCUMENTS, DocumentUpload } from "@/lib/synthetic-data";
import { formatGBP } from "@/lib/utils";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Check,
  X,
  AlertCircle,
  Clock,
} from "lucide-react";

export function DocumentVaultView() {
  const [documents, setDocuments] = useState<DocumentUpload[]>(SYNTHETIC_DOCUMENTS);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocumentUpload = {
        id: `doc-${Date.now()}`,
        fileName: "Uber_Business_Receipt_Trip_94.pdf",
        fileSize: "184 KB",
        uploadedAt: "Just now",
        clientOrgId: "cl-1",
        status: "EXTRACTED_DRAFT",
        extractedData: {
          vendor: "Uber London Ltd",
          date: "09 Oct 2026",
          grossAmountPence: 3420,
          vatAmountPence: 570,
          suggestedNominal: "7050 - Travel & Subsistence",
          confidence: 96,
        },
      };
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
    }, 1200);
  };

  const handleApprove = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "APPROVED" } : d))
    );
  };

  const handleReject = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "REJECTED" } : d))
    );
  };

  return (
    <div className="card-surface p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Client Document Vault & OCR Intake Sandbox
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming receipts, invoices, and bank statements parsed into draft ledger entries for review.
          </p>
        </div>
        <button
          onClick={simulateUpload}
          disabled={isUploading}
          className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[38px]"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          {isUploading ? "Analysing Document..." : "Simulate Receipt Upload"}
        </button>
      </div>

      {/* Upload Dropzone Preview */}
      <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
        <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-xs font-bold text-slate-700">
          Drag & drop invoices or receipts (PDF, PNG, JPG)
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Files are automatically parsed by the document extraction queue into draft transactions
        </p>
      </div>

      {/* Document Records */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {doc.fileName}
                  </span>
                  <span className="text-[11px] text-slate-400">{doc.fileSize}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Uploaded {doc.uploadedAt}
                  </span>
                  {doc.extractedData && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      OCR Match ({doc.extractedData.confidence}%)
                    </span>
                  )}
                </div>

                {/* Extracted Details Box */}
                {doc.extractedData && doc.status === "EXTRACTED_DRAFT" && (
                  <div className="mt-2.5 p-2.5 rounded bg-slate-50 border border-slate-200/80 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-slate-400 block">Vendor:</span>
                      <strong className="text-slate-800">{doc.extractedData.vendor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Date:</span>
                      <strong className="text-slate-800">{doc.extractedData.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Gross / VAT:</span>
                      <strong className="text-slate-800">
                        {formatGBP(doc.extractedData.grossAmountPence)} (VAT {formatGBP(doc.extractedData.vatAmountPence)})
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Suggested Nominal:</span>
                      <strong className="text-slate-800">{doc.extractedData.suggestedNominal}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {doc.status === "APPROVED" ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                  <Check className="w-3 h-3" /> Posted to Ledger
                </span>
              ) : doc.status === "REJECTED" ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">
                  <X className="w-3 h-3" /> Rejected
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(doc.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                    title="Reject draft"
                    aria-label="Reject draft"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleApprove(doc.id)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm min-h-[36px]"
                  >
                    <Check className="w-3 h-3" /> Approve & Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Security Boundary:</strong> Raw client attachments are stored in an encrypted vault. The OCR engine operates solely on read-only drafts. General ledger posting requires verified accountant sign-off.
        </p>
      </div>
    </div>
  );
}
