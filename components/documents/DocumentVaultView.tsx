"use client";

import React, { useState, useRef } from "react";
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
  Camera,
  Loader2,
  FileCheck,
} from "lucide-react";

export function DocumentVaultView() {
  const [documents, setDocuments] = useState<DocumentUpload[]>(SYNTHETIC_DOCUMENTS);
  const [isUploading, setIsUploading] = useState(false);
  const [activeScanStatus, setActiveScanStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (fileName: string, fileSizeStr: string) => {
    setIsUploading(true);
    setActiveScanStatus("Uploading to secure Document AI vault...");

    try {
      // Call Document OCR API
      setActiveScanStatus("Extracting OCR text, VAT breakdown & line items...");
      const res = await fetch("/api/documents/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          clientOrgId: "cl-1",
        }),
      });

      const data = await res.json();

      if (data.success && data.document) {
        const docResult = data.document;
        const newDoc: DocumentUpload = {
          id: docResult.id || `doc-${Date.now()}`,
          fileName: docResult.fileName || fileName,
          fileSize: fileSizeStr,
          uploadedAt: "Just now",
          clientOrgId: "cl-1",
          status: "EXTRACTED_DRAFT",
          extractedData: {
            vendor: docResult.extractedData.vendor,
            date: docResult.extractedData.date,
            grossAmountPence: docResult.extractedData.grossAmountPence,
            vatAmountPence: docResult.extractedData.vatAmountPence,
            suggestedNominal: docResult.extractedData.suggestedNominal,
            confidence: docResult.extractedData.confidence,
          },
        };
        setDocuments((prev) => [newDoc, ...prev]);
      }
    } catch (err) {
      console.error("Document scan error:", err);
    } finally {
      setIsUploading(false);
      setActiveScanStatus(null);
    }
  };

  const handleNativeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = Math.round(file.size / 1024);
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
    processFile(file.name, sizeStr);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePresetSelect = (preset: "UBER" | "AWS" | "BRITISH_GAS") => {
    if (preset === "UBER") {
      processFile("Uber_Business_Receipt_Trip_94.pdf", "184 KB");
    } else if (preset === "AWS") {
      processFile("AWS_EMEA_Cloud_Invoice_Oct26.pdf", "342 KB");
    } else {
      processFile("British_Gas_Commercial_Supply_Bill.pdf", "512 KB");
    }
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
    <div className="card-surface p-4 sm:p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Client Document Vault &amp; Receipt OCR
            </h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              OCR Engine Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming receipts, invoices, and bank statements automatically digitized into double-entry journal vouchers.
          </p>
        </div>

        {/* Hidden native file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleNativeFileSelect}
          accept="image/*,application/pdf"
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm min-h-[42px] sm:min-h-[38px]"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Scanning Document...
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5" />
                Upload / Scan Receipt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Upload Dropzone & Quick Previews */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isUploading
            ? "border-amber-400 bg-amber-50/40"
            : "border-slate-300 hover:border-slate-900 hover:bg-slate-50/70 bg-slate-50/40"
        }`}
      >
        {isUploading ? (
          <div className="py-2 space-y-2">
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-amber-900">{activeScanStatus}</p>
            <p className="text-[11px] text-amber-700">Validating tax rates and matching nominal chart of accounts...</p>
          </div>
        ) : (
          <div>
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">
              Click or drag &amp; drop receipts, utility bills, or supplier invoices (PDF, PNG, JPG)
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports automatic VAT 20% extraction, vendor name parsing, and nominal ledger coding
            </p>
          </div>
        )}
      </div>

      {/* Preset demo triggers */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="text-[11px] font-medium text-slate-400">Quick OCR Test:</span>
        <button
          onClick={() => handlePresetSelect("UBER")}
          disabled={isUploading}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-[11px] font-medium"
        >
          + Uber Business Trip
        </button>
        <button
          onClick={() => handlePresetSelect("AWS")}
          disabled={isUploading}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-[11px] font-medium"
        >
          + AWS Cloud Hosting
        </button>
        <button
          onClick={() => handlePresetSelect("BRITISH_GAS")}
          disabled={isUploading}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-[11px] font-medium"
        >
          + British Gas Commercial
        </button>
      </div>

      {/* Document Records */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <FileText className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900">
                    {doc.fileName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{doc.fileSize}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Uploaded {doc.uploadedAt}
                  </span>
                  {doc.extractedData && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <Sparkles className="w-3 h-3" />
                      OCR Verified ({doc.extractedData.confidence}%)
                    </span>
                  )}
                </div>

                {/* Extracted Details Box */}
                {doc.extractedData && doc.status === "EXTRACTED_DRAFT" && (
                  <div className="mt-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-slate-400 block font-medium">Vendor:</span>
                      <strong className="text-slate-900">{doc.extractedData.vendor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Date:</span>
                      <strong className="text-slate-900">{doc.extractedData.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Gross / VAT:</span>
                      <strong className="text-slate-900 font-mono">
                        {formatGBP(doc.extractedData.grossAmountPence)}{" "}
                        <span className="text-slate-500 font-normal">
                          (VAT {formatGBP(doc.extractedData.vatAmountPence)})
                        </span>
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Suggested Nominal:</span>
                      <strong className="text-slate-900">{doc.extractedData.suggestedNominal}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {doc.status === "APPROVED" ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <FileCheck className="w-3.5 h-3.5" /> Posted to Ledger
                </span>
              ) : doc.status === "REJECTED" ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
                  <X className="w-3.5 h-3.5" /> Rejected
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(doc.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Reject draft"
                    aria-label="Reject draft"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleApprove(doc.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm min-h-[38px]"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve &amp; Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Security Boundary &amp; Audit Trail:</strong> Uploaded vouchers are preserved in immutable encrypted blob storage. Document AI extraction creates draft staging vouchers; final journal posting to Nominal Accounts requires explicit accountant sign-off in accordance with FRC / ICAEW compliance.
        </p>
      </div>
    </div>
  );
}
