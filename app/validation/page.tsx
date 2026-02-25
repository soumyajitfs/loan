"use client";

import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import { UploadValidationInput, UploadValidationResult, runUploadValidation } from "@/lib/document-engine";
import { useMemo, useState } from "react";

const baselineChecks = [
  { name: "Documents Signed", state: "warning" as const, metric: "112/128" },
  { name: "Compliance Cleared", state: "pass" as const, metric: "121/128" },
  { name: "Funds Confirmed", state: "pass" as const, metric: "118/128" },
  { name: "Title Verified", state: "fail" as const, metric: "104/128" },
  { name: "AML Complete", state: "pass" as const, metric: "126/128" },
];

const toBadge = (state: "pass" | "warning" | "fail") => {
  if (state === "pass") return { label: "Pass", tone: "green" as const };
  if (state === "warning") return { label: "Warning", tone: "amber" as const };
  return { label: "Fail", tone: "red" as const };
};

interface LockableDocument {
  id: string;
  name: string;
  category: string;
  approved: boolean;
  locked: boolean;
  approverId?: string;
  timestamp?: string;
}

const initialDocs: LockableDocument[] = [
  { id: "DOC-901", name: "Borrower ID Pack", category: "ID", approved: true, locked: false },
  { id: "DOC-902", name: "Discharge Authority", category: "Discharge", approved: true, locked: false },
  { id: "DOC-903", name: "Income Evidence Q4", category: "Income", approved: false, locked: false },
];

export default function ValidationPage() {
  const [input, setInput] = useState<UploadValidationInput>({
    fileName: "borrower_discharge_form.pdf",
    fileType: "pdf",
    category: "Discharge",
    hasMetadata: true,
    hasSignatureField: true,
    idExpiryValid: true,
    kycSatisfied: true,
  });
  const [result, setResult] = useState<UploadValidationResult | null>(null);
  const [documents, setDocuments] = useState<LockableDocument[]>(initialDocs);
  const [auditLog, setAuditLog] = useState<string[]>([]);

  const routingDecision = useMemo(() => {
    if (!result) return null;
    if (result.passed) {
      return {
        status: "Validated",
        routes: ["Auto-routed to PEXA", "Auto-routed to DMS", "Compliance status updated"],
      };
    }
    return {
      status: "Action Required",
      routes: ["Borrower notification sent", "Broker notification sent", "Compliance alert raised"],
    };
  }, [result]);

  const lockDocument = (id: string) => {
    const timestamp = new Date().toISOString();
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id && doc.approved ? { ...doc, locked: true, approverId: "CMP-204", timestamp } : doc))
    );
    setAuditLog((prev) => [`${id} locked by CMP-204 at ${timestamp}`, ...prev].slice(0, 6));
  };

  return (
    <div className="space-y-6">
      <Card title="Validation Engine Snapshot" subtitle="Readiness checks across settlement portfolio">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {baselineChecks.map((check) => {
            const badge = toBadge(check.state);
            return (
              <Card key={check.name} title={check.name}>
                <div className="flex items-center justify-between">
                  <StatusBadge label={badge.label} tone={badge.tone} />
                  <span className="text-xs font-semibold text-slate-600">{check.metric}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Smart Document Upload Engine" subtitle="Run validation checks at upload" className="xl:col-span-2">
          <div className="grid gap-3 md:grid-cols-2 text-sm">
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">File Name</span>
              <input
                value={input.fileName}
                onChange={(e) => setInput((prev) => ({ ...prev, fileName: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">File Type</span>
              <input
                value={input.fileType}
                onChange={(e) => setInput((prev) => ({ ...prev, fileType: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">Category</span>
              <select
                value={input.category}
                onChange={(e) => setInput((prev) => ({ ...prev, category: e.target.value as UploadValidationInput["category"] }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
              >
                <option value="">Select category</option>
                <option value="ID">ID</option>
                <option value="Income">Income</option>
                <option value="Property">Property</option>
                <option value="Discharge">Discharge</option>
                <option value="Compliance">Compliance</option>
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["hasMetadata", "Metadata"],
                ["hasSignatureField", "Signature"],
                ["idExpiryValid", "ID Expiry"],
                ["kycSatisfied", "KYC"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={Boolean(input[key as keyof UploadValidationInput])}
                    onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.checked }))}
                  />
                  <span className="text-xs text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() => setResult(runUploadValidation(input))}
            className="mt-4 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Validate Upload
          </button>
        </Card>

        <Card title="Validation Outcome" subtitle="Auto classification and routing decision">
          {!result ? (
            <p className="text-sm text-slate-600">Run validation to view result.</p>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Classification</span>
                <span className="font-semibold text-slate-900">{result.classifiedCategory}</span>
              </div>
              <StatusBadge label={routingDecision?.status ?? "Pending"} tone={result.passed ? "green" : "red"} />
              <ul className="space-y-1 text-slate-700">
                {routingDecision?.routes.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </div>
          )}
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Compliance Approval Locking" subtitle="Documents become immutable post approval" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Document</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3">Immutability</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{doc.name}</td>
                    <td className="px-4 py-3 text-slate-700">{doc.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge label={doc.approved ? "Approved" : "Pending"} tone={doc.approved ? "green" : "amber"} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge label={doc.locked ? "Locked" : "Editable"} tone={doc.locked ? "teal" : "slate"} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        disabled={!doc.approved || doc.locked}
                        onClick={() => lockDocument(doc.id)}
                        className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Lock Document
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Audit Log" subtitle="Immutable lock events">
          <ul className="space-y-2 text-xs text-slate-700">
            {auditLog.length === 0 ? <li>No lock events yet.</li> : auditLog.map((event) => <li key={event}>{event}</li>)}
          </ul>
        </Card>
      </section>
    </div>
  );
}
