// app/lender/deals/[dealId]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type TabId = "overview" | "structure" | "documents" | "photos" | "notes" | "ai-analysis";

type DealDetail = {
  id: string;
  dealName: string;
  borrowerName: string;
  propertyAddress: string;
  loanAmount: number;
  ltv: number;
  status: string;
  purchasePrice: number;
  rehabBudget: number;
  holdPeriodMonths: number;
  exitStrategy: string;
  points: number;
  rate: number;
  fees: number;
  arv: number;
  creditScore: number;
  experience: number;
  statusTimeline: { label: string; date: string }[];
  documents: { id: string; name: string; type: string; uploadedAt: string }[];
  photos: { id: string; url: string; label: "before" | "during" | "after" }[];
  notes: string[];
};

const mockDeal: DealDetail = {
  id: "demo-123",
  dealName: "SE Portland Fix & Flip",
  borrowerName: "John Doe Investments LLC",
  propertyAddress: "1234 SE Division St, Portland, OR 97202",
  loanAmount: 425000,
  ltv: 70,
  status: "In Underwriting",
  purchasePrice: 550000,
  rehabBudget: 90000,
  holdPeriodMonths: 9,
  exitStrategy: "Sell",
  points: 2.5,
  rate: 11.5,
  fees: 3500,
  arv: 750000,
  creditScore: 720,
  experience: 12,
  statusTimeline: [
    { label: "Application Received", date: "2025-12-10" },
    { label: "In Review", date: "2025-12-11" },
    { label: "In Underwriting", date: "2025-12-13" },
  ],
  documents: [
    { id: "doc-1", name: "Purchase Contract.pdf", type: "Contract", uploadedAt: "2025-12-11" },
    { id: "doc-2", name: "Scope of Work.pdf", type: "Scope", uploadedAt: "2025-12-12" },
  ],
  photos: [
    { id: "photo-1", url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", label: "before" },
    { id: "photo-2", url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", label: "during" },
  ],
  notes: [
    "Borrower has completed 3 prior flips with this lender.",
    "ARV supported by two comps within 0.5 miles.",
  ],
};

const tabConfig: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "structure", label: "Deal Structure" },
  { id: "ai-analysis", label: "AI Analysis" },
  { id: "documents", label: "Documents" },
  { id: "photos", label: "Photos" },
  { id: "notes", label: "Notes" },
];

export default function DealDetailPage() {
  const params = useParams<{ dealId: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const deal = useMemo(() => {
    return { ...mockDeal, id: params.dealId ?? mockDeal.id };
  }, [params.dealId]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{deal.dealName}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{deal.propertyAddress}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Borrower: {deal.borrowerName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400">Loan Amount</p>
            <p className="font-semibold text-slate-900 dark:text-slate-50">
              {deal.loanAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">LTV</p>
            <p className="font-semibold text-slate-900 dark:text-slate-50">{deal.ltv}%</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-200">
            {deal.status}
          </span>
        </div>
      </div>

      <div className="mt-4 border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex gap-4 overflow-x-auto text-sm">
          {tabConfig.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-2 py-2 transition ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-300"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 space-y-4">
        {activeTab === "overview" && <OverviewTab deal={deal} />}
        {activeTab === "structure" && <StructureTab deal={deal} />}
        {activeTab === "ai-analysis" && <AIAnalysisTab deal={deal} />}
        {activeTab === "documents" && <DocumentsTab deal={deal} />}
        {activeTab === "photos" && <PhotosTab deal={deal} />}
        {activeTab === "notes" && <NotesTab deal={deal} />}
      </div>
    </div>
  );
}

function OverviewTab({ deal }: { deal: DealDetail }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900 md:col-span-3">
        <h2 className="font-semibold text-slate-900 dark:text-slate-50">Key Terms</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:grid-cols-3">
          <div><dt className="text-slate-500 dark:text-slate-400">Loan Amount</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.loanAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">LTV</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.ltv}%</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Rate</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.rate}%</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Points</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.points} pts</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Hold Period</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.holdPeriodMonths} months</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Exit Strategy</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.exitStrategy}</dd></div>
        </dl>
      </div>
      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
        <h2 className="font-semibold text-slate-900 dark:text-slate-50">Status Timeline</h2>
        <ol className="space-y-2 text-xs">
          {deal.statusTimeline.map((item) => (
            <li key={item.label} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" /><div><p className="font-medium text-slate-900 dark:text-slate-50">{item.label}</p><p className="text-slate-500 dark:text-slate-400">{item.date}</p></div></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StructureTab({ deal }: { deal: DealDetail }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">Deal Structure</h2>
      <dl className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
        <div><dt className="text-slate-500 dark:text-slate-400">Purchase Price</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.purchasePrice.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</dd></div>
        <div><dt className="text-slate-500 dark:text-slate-400">Rehab Budget</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.rehabBudget.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</dd></div>
        <div><dt className="text-slate-500 dark:text-slate-400">Total Fees</dt><dd className="font-medium text-slate-900 dark:text-slate-50">{deal.fees.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</dd></div>
      </dl>
    </div>
  );
}

function AIAnalysisTab({ deal }: { deal: DealDetail }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const analyzeDeal = async () => {
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const riskLevel = deal.ltv > 75 ? "HIGH" : deal.ltv > 65 ? "MEDIUM" : "LOW";
    const profitMargin = ((deal.arv - deal.purchasePrice - deal.rehabBudget) / deal.purchasePrice * 100).toFixed(1);
    
    const aiReport = `🤖 AI DEAL ANALYSIS\n\n📊 RISK ASSESSMENT: ${riskLevel}\nLTV at ${deal.ltv}% ${deal.ltv > 75 ? "exceeds recommended 75% threshold" : deal.ltv > 65 ? "is within acceptable range but monitor closely" : "is excellent - well below 75%"}\n\n💰 PROFIT POTENTIAL\nEstimated profit margin: ${profitMargin}%\nARV: ${deal.arv.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}\nTotal in: ${(deal.purchasePrice + deal.rehabBudget).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}\n\n👤 BORROWER PROFILE\nCredit Score: ${deal.creditScore} - ${deal.creditScore >= 720 ? "Excellent" : deal.creditScore >= 680 ? "Good" : "Fair"}\nExperience: ${deal.experience} flips - ${deal.experience >= 10 ? "Highly experienced" : deal.experience >= 5 ? "Moderate experience" : "Limited experience"}\n\n📋 RECOMMENDATIONS\n${deal.ltv > 75 ? "⚠️ Request additional equity or reduce loan amount\n" : ""}${parseFloat(profitMargin) < 15 ? "⚠️ Thin profit margin - verify rehab budget accuracy\n" : ""}${deal.creditScore < 680 ? "⚠️ Below average credit - consider higher rate or points\n" : ""}${deal.experience < 5 ? "⚠️ Limited experience - recommend stricter oversight\n" : ""}${deal.ltv <= 70 && parseFloat(profitMargin) >= 20 && deal.creditScore >= 720 && deal.experience >= 10 ? "✅ Strong deal - recommended for approval" : "⚠️ Review recommendations before proceeding"}`;
    
    setAnalysis(aiReport);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">AI-Powered Deal Analysis</h2>
          <button
            onClick={analyzeDeal}
            disabled={analyzing}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {analyzing ? "Analyzing..." : "Run AI Analysis"}
          </button>
        </div>
        {analysis ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs font-mono text-slate-900 dark:bg-slate-800 dark:text-slate-100">
            {analysis}
          </pre>
        ) : (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Click "Run AI Analysis" to get an automated risk assessment and recommendations for this deal.
          </p>
        )}
      </div>
    </div>
  );
}

function DocumentsTab({ deal }: { deal: DealDetail }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:bg-slate-800">
        <p className="font-medium">Upload documents</p>
        <p className="text-xs">Drag and drop files here, or click to browse.</p>
        <button type="button" className="mt-2 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700">Choose files</button>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">Existing documents</h2>
        <ul className="space-y-2 text-xs">
          {deal.documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-50">{doc.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{doc.type} • Uploaded {doc.uploadedAt}</p>
              </div>
              <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300">View</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PhotosTab({ deal }: { deal: DealDetail }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:bg-slate-800">
        <p className="font-medium">Upload photos</p>
        <p className="text-xs">Drag and drop images here, or click to browse.</p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">Tag each photo as \"before\", \"during\", or \"after\" once uploaded.</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">Photo gallery</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {deal.photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
              <div className="relative h-32 w-full"><Image src={photo.url} alt={photo.label} fill className="object-cover transition group-hover:scale-105" /></div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-2 pb-1 pt-4 text-[10px] text-white">
                <span className="rounded-full bg-black/60 px-1.5 py-0.5 uppercase">{photo.label}</span>
                <button type="button" className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] hover:bg-black/70">Retag</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesTab({ deal }: { deal: DealDetail }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-slate-50">Internal notes</h2>
        <ul className="space-y-2 text-xs">
          {deal.notes.map((note, idx) => (
            <li key={idx} className="rounded-md bg-slate-50 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{note}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">New note composer will go here.</div>
    </div>
  );
}