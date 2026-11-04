"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Camera,
  Settings,
  FileText,
  HelpCircle,
  Lock,
  LogOut,
  ExternalLink,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Star,
  Upload,
  DollarSign,
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Share2,
} from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { createDefaultTrailerContract } from "@/data/demo-fleet";
import { getPrimaryTrailerPhoto } from "@/lib/site-data";
import { TrailerInventoryItem } from "@/types/cms";

type AdminTab =
  | "inventory"
  | "photos"
  | "settings"
  | "contracts"
  | "policies-faqs";

const PRESET_DEMO_IMAGES = [
  { label: "Dump Trailer", url: "/images/demo/dump-trailer.png" },
  { label: "Utility Trailer", url: "/images/demo/utility-trailer.png" },
  { label: "Car Hauler", url: "/images/demo/car-hauler.png" },
  { label: "Enclosed Cargo", url: "/images/demo/enclosed-cargo.png" },
  { label: "Equipment Flatbed", url: "/images/demo/deckover-flatbed.png" },
  { label: "Hero Equipment Trailer", url: "/images/demo/hero-trailer.png" },
];

export default function AdminDashboardPage() {
  const {
    siteData,
    adminUser,
    changeCount,
    loginAdmin,
    logoutAdmin,
    resetAllToDefaults,
    updateSettings,
    addTrailer,
    updateTrailer,
    deleteTrailer,
    updateTrailerPricing,
    updateTrailerContract,
    addTrailerPhoto,
    setPrimaryTrailerPhoto,
    updateTrailerPhotoCaption,
    deleteTrailerPhoto,
    updatePolicySection,
    addFaq,
    updateFaq,
    deleteFaq,
  } = useSiteData();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<AdminTab>("inventory");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected trailer for Photo Manager tab
  const [selectedPhotoTrailerId, setSelectedPhotoTrailerId] = useState<string>(
    siteData.fleet[0]?.id ?? ""
  );
  const [newPhotoUrl, setNewPhotoUrl] = useState(
    "/images/demo/dump-trailer.png"
  );
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoIsPrimary, setNewPhotoIsPrimary] = useState(false);

  // Selected trailer for Per-Trailer Contract tab
  const [selectedContractTrailerId, setSelectedContractTrailerId] =
    useState<string>(siteData.fleet[0]?.id ?? "");

  // New Trailer Modal / Form state
  const [showAddTrailerForm, setShowAddTrailerForm] = useState(false);
  const [newTrailerName, setNewTrailerName] = useState("");
  const [newTrailerCategory, setNewTrailerCategory] = useState("Dump Trailers");
  const [newTrailerDimensions, setNewTrailerDimensions] = useState("");
  const [newTrailerCapacity, setNewTrailerCapacity] = useState("");
  const [newTrailerDailyRate, setNewTrailerDailyRate] = useState("$125 / day");
  const [newTrailerWeeklyRate, setNewTrailerWeeklyRate] =
    useState("$650 / week");
  const [newTrailerSpecs, setNewTrailerSpecs] = useState(
    "Tandem Axle, Electric Brakes, Loading Ramps"
  );
  const [newTrailerImage, setNewTrailerImage] = useState(
    "/images/demo/dump-trailer.png"
  );

  // New Service Area state
  const [newServiceAreaName, setNewServiceAreaName] = useState("");

  // New FAQ state
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqBadge, setNewFaqBadge] = useState("Verified Policy");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = loginAdmin(loginEmail, loginPassword);
    if (!result.ok) {
      setLoginError(result.error ?? "Login failed");
    }
  };

  const handleQuickFill = (email: string) => {
    setLoginEmail(email);
    setLoginPassword("dashboard");
    setLoginError(null);
  };

  const handleCreateTrailer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrailerName.trim()) return;
    const id = `trailer-${Date.now()}`;
    const trimmedName = newTrailerName.trim();
    const created: TrailerInventoryItem = {
      id,
      slug: trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: trimmedName,
      category: newTrailerCategory.trim() || "Utility Trailers",
      isActive: true,
      isDemoPlaceholder: false,
      sortOrder: siteData.fleet.length + 1,
      dimensions: newTrailerDimensions.trim() || "Custom Dimensions",
      capacityOrFeature:
        newTrailerCapacity.trim() || "Standard Payload & Tie-Downs",
      basicSpecs: newTrailerSpecs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      availabilityStatusText: "Available to Book",
      summary: "Added via Admin Dashboard.",
      searchKeywords: [
        trimmedName.toLowerCase(),
        newTrailerCategory.toLowerCase(),
      ],
      contract: createDefaultTrailerContract(trimmedName),
      photos: [
        {
          id: `photo-${Date.now()}`,
          inventoryId: id,
          url: newTrailerImage || "/images/demo/dump-trailer.png",
          alt: trimmedName,
          caption: `${trimmedName} Main View`,
          isPrimary: true,
          sortOrder: 1,
          isPlaceholder: false,
        },
      ],
      pricingRules: [
        {
          id: `price-${Date.now()}-daily`,
          inventoryId: id,
          rateType: "daily",
          amount: null,
          displayLabel: newTrailerDailyRate.trim() || "$XX / day",
          isActive: true,
        },
        {
          id: `price-${Date.now()}-weekly`,
          inventoryId: id,
          rateType: "weekly",
          amount: null,
          displayLabel: newTrailerWeeklyRate.trim() || "$XXX / week",
          isActive: true,
        },
        {
          id: `price-${Date.now()}-deposit`,
          inventoryId: id,
          rateType: "security_deposit",
          amount: null,
          displayLabel: "Deposit confirmed at booking",
          isActive: true,
        },
      ],
    };

    addTrailer(created);
    setSelectedPhotoTrailerId(created.id);
    setSelectedContractTrailerId(created.id);
    setNewTrailerName("");
    setNewTrailerDimensions("");
    setNewTrailerCapacity("");
    setShowAddTrailerForm(false);
    showToast(`Added "${created.name}" to live inventory!`);
  };

  const handleFileUploadToPhotoUrl = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // ============================================================================
  // 1. LOGIN VIEW (When not authenticated)
  // ============================================================================
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-steel-950 text-white flex flex-col justify-between p-4 sm:p-6">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-bold text-steel-200 hover:text-white"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
              <img
                src={siteData.settings.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span>&larr; Back to Public Homepage</span>
          </Link>
          <span className="rounded-full bg-brand-500/20 border border-brand-500/40 px-3 py-1 text-xs font-bold text-brand-300">
            Mock Admin Portal
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-8 bg-white text-steel-900 rounded-3xl shadow-2xl border border-steel-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 rounded-2xl bg-white border border-steel-200 p-2 mx-auto shadow-sm flex items-center justify-center">
              <img
                src={siteData.settings.logoUrl}
                alt={siteData.settings.legalName}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 border border-brand-200 px-3 py-0.5 text-xs font-bold text-brand-700">
              <Lock className="w-3.5 h-3.5" />
              Admin Dashboard Login
            </span>
            <h1 className="font-display text-2xl font-extrabold text-steel-900">
              {siteData.settings.legalName}
            </h1>
            <p className="text-xs sm:text-sm text-steel-600">
              Sign in to adjust trailer photos, prices, hours, phone numbers,
              socials, inventory, policies, and per-trailer contracts. Changes
              persist in memory until you refresh the browser.
            </p>
          </div>

          {/* Quick-Fill Demo Account Buttons */}
          <div className="rounded-2xl bg-steel-50 border border-steel-200 p-3.5 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-steel-500">
              Authorized Demo Accounts (Click to Quick-Fill):
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() =>
                  handleQuickFill("legacytrailerrentalsllc@gmail.com")
                }
                className="w-full text-left rounded-xl bg-white hover:bg-brand-50 border border-steel-200 hover:border-brand-300 px-3 py-2 text-xs transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-steel-900">
                    legacytrailerrentalsllc@gmail.com
                  </div>
                  <div className="text-steel-500">Password: dashboard</div>
                </div>
                <span className="rounded bg-brand-100 text-brand-800 px-2 py-0.5 text-[10px] font-bold">
                  Fill Owner
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill("cody@southernautomate.com")}
                className="w-full text-left rounded-xl bg-white hover:bg-brand-50 border border-steel-200 hover:border-brand-300 px-3 py-2 text-xs transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-steel-900">
                    cody@southernautomate.com
                  </div>
                  <div className="text-steel-500">Password: dashboard</div>
                </div>
                <span className="rounded bg-steel-200 text-steel-800 px-2 py-0.5 text-[10px] font-bold">
                  Fill Admin
                </span>
              </button>
            </div>
          </div>

          {loginError && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-800">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="legacytrailerrentalsllc@gmail.com"
                className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="dashboard"
                className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 px-6 shadow-md transition-colors"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-steel-500">
          Mock Admin Dashboard • Legacy Trailer Rentals LLC (Madera, CA)
        </p>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD VIEW
  // ============================================================================
  const selectedPhotoTrailer =
    siteData.fleet.find((t) => t.id === selectedPhotoTrailerId) ??
    siteData.fleet[0];

  const selectedContractTrailer =
    siteData.fleet.find((t) => t.id === selectedContractTrailerId) ??
    siteData.fleet[0];

  return (
    <div className="min-h-screen bg-steel-100 text-steel-900 flex flex-col">
      {/* Top Sticky Admin Bar */}
      <header className="sticky top-0 z-40 bg-steel-950 text-white border-b border-steel-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
              <img
                src={siteData.settings.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-extrabold text-base sm:text-lg text-white leading-none">
                  Admin Control Center
                </span>
                <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {adminUser.role}
                </span>
              </div>
              <p className="text-xs text-steel-400 mt-0.5">
                Signed in as{" "}
                <strong className="text-steel-200">{adminUser.email}</strong> •
                Saved in session memory until browser refresh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="rounded-xl bg-steel-900 border border-steel-700 px-3 py-2 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 inline mr-1 text-brand-400" />
              {changeCount} {changeCount === 1 ? "Edit" : "Edits"} Active
            </span>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <span>View Live Homepage</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                resetAllToDefaults();
                showToast("Reset all demo data back to initial defaults.");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-steel-800 hover:bg-steel-700 border border-steel-700 text-steel-200 px-3 py-2 text-xs font-bold transition-colors"
              title="Reset all in-memory edits"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 rounded-xl bg-steel-900 hover:bg-red-950/60 border border-steel-800 hover:border-red-700 text-steel-300 hover:text-red-200 px-3 py-2 text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-steel-900 border-t border-steel-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("inventory")}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                activeTab === "inventory"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-steel-300 hover:bg-steel-800 hover:text-white"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>1. Inventory &amp; Prices ({siteData.fleet.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                activeTab === "photos"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-steel-300 hover:bg-steel-800 hover:text-white"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>2. Trailer Photos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                activeTab === "settings"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-steel-300 hover:bg-steel-800 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>3. Hours, Phones &amp; Socials</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("contracts")}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                activeTab === "contracts"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-steel-300 hover:bg-steel-800 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>4. Trailer Contracts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("policies-faqs")}
              className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                activeTab === "policies-faqs"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-steel-300 hover:bg-steel-800 hover:text-white"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>5. Policies &amp; FAQs ({siteData.faqs.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-steel-950 text-white border border-brand-500 px-4 py-3 shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ====================================================================
            TAB 1: TRAILER INVENTORY & PRICING
           ==================================================================== */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-steel-200 shadow-sm">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-steel-900">
                  Trailer Inventory &amp; Pricing Manager
                </h1>
                <p className="text-sm text-steel-600 mt-1">
                  Edit trailer titles, categories, dimensions, daily/weekly
                  rates, deposits, and visibility. Changes immediately update
                  the homepage catalog.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTrailerForm((prev) => !prev)}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-3 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {showAddTrailerForm ? "Cancel New Trailer" : "Add New Trailer"}
                </span>
              </button>
            </div>

            {/* Add New Trailer Form */}
            {showAddTrailerForm && (
              <form
                onSubmit={handleCreateTrailer}
                className="bg-white rounded-2xl border-2 border-brand-500 p-6 shadow-lg space-y-5"
              >
                <div className="flex items-center justify-between border-b border-steel-200 pb-3">
                  <h2 className="font-display text-lg font-extrabold text-steel-900">
                    Add New Trailer to Fleet
                  </h2>
                  <span className="text-xs font-bold text-brand-600">
                    Appears immediately on Homepage
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Trailer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTrailerName}
                      onChange={(e) => setNewTrailerName(e.target.value)}
                      placeholder="e.g., 16' Heavy Duty Dump Trailer"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTrailerCategory}
                      onChange={(e) => setNewTrailerCategory(e.target.value)}
                      placeholder="Dump Trailers, Utility Trailers..."
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={newTrailerDimensions}
                      onChange={(e) => setNewTrailerDimensions(e.target.value)}
                      placeholder="e.g., 7' × 16' · 24&quot; Sides"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Daily Rate Display
                    </label>
                    <input
                      type="text"
                      value={newTrailerDailyRate}
                      onChange={(e) => setNewTrailerDailyRate(e.target.value)}
                      placeholder="e.g., $135 / day"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Weekly Rate Display
                    </label>
                    <input
                      type="text"
                      value={newTrailerWeeklyRate}
                      onChange={(e) => setNewTrailerWeeklyRate(e.target.value)}
                      placeholder="e.g., $700 / week"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Capacity / Key Feature
                    </label>
                    <input
                      type="text"
                      value={newTrailerCapacity}
                      onChange={(e) => setNewTrailerCapacity(e.target.value)}
                      placeholder="e.g., 14K GVWR · Hydraulic Scissor Hoist"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Spec Badges (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={newTrailerSpecs}
                      onChange={(e) => setNewTrailerSpecs(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Initial Cover Photo (Preset or Upload)
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={newTrailerImage}
                        onChange={(e) => setNewTrailerImage(e.target.value)}
                        className="flex-1 rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm"
                      >
                        {PRESET_DEMO_IMAGES.map((img) => (
                          <option key={img.url} value={img.url}>
                            Preset: {img.label}
                          </option>
                        ))}
                      </select>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-steel-900 hover:bg-steel-800 text-white px-3.5 py-2.5 text-xs font-bold shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUploadToPhotoUrl(e, (url) => {
                              setNewTrailerImage(url);
                              showToast(
                                "Uploaded custom photo for new trailer!"
                              );
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddTrailerForm(false)}
                    className="rounded-xl border border-steel-300 px-4 py-2.5 text-xs font-bold text-steel-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 text-xs font-bold shadow-sm"
                  >
                    Create Trailer
                  </button>
                </div>
              </form>
            )}

            {/* Existing Fleet Cards List */}
            <div className="space-y-4">
              {siteData.fleet.map((trailer) => {
                const cover = getPrimaryTrailerPhoto(trailer);
                const dailyRule = trailer.pricingRules.find(
                  (r) => r.rateType === "daily"
                );
                const weeklyRule = trailer.pricingRules.find(
                  (r) => r.rateType === "weekly"
                );
                const depositRule = trailer.pricingRules.find(
                  (r) => r.rateType === "security_deposit"
                );

                return (
                  <div
                    key={trailer.id}
                    className={`rounded-2xl bg-white border p-5 sm:p-6 shadow-sm transition-all ${
                      trailer.isActive
                        ? "border-steel-200"
                        : "border-steel-300 bg-steel-50/70 opacity-75"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Thumbnail & Quick Actions */}
                      <div className="lg:col-span-3 space-y-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-steel-900 border border-steel-200">
                          <img
                            src={cover.url}
                            alt={cover.alt}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 rounded-md bg-steel-950/85 text-white px-2 py-0.5 text-[10px] font-bold">
                            {trailer.photos.length} Photos
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              updateTrailer(trailer.id, {
                                isActive: !trailer.isActive,
                              });
                              showToast(
                                trailer.isActive
                                  ? `Hidden "${trailer.name}" from homepage`
                                  : `Published "${trailer.name}" on homepage`
                              );
                            }}
                            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border ${
                              trailer.isActive
                                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                                : "bg-steel-200 border-steel-300 text-steel-700"
                            }`}
                          >
                            {trailer.isActive ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Visible</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPhotoTrailerId(trailer.id);
                              setActiveTab("photos");
                            }}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-steel-100 hover:bg-brand-50 border border-steel-300 px-3 py-2 text-xs font-bold text-steel-800"
                          >
                            <Camera className="w-3.5 h-3.5 text-brand-600" />
                            <span>Photos</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedContractTrailerId(trailer.id);
                              setActiveTab("contracts");
                            }}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-steel-100 hover:bg-brand-50 border border-steel-300 px-3 py-2 text-xs font-bold text-steel-800"
                          >
                            <FileText className="w-3.5 h-3.5 text-brand-600" />
                            <span>Contract</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              deleteTrailer(trailer.id);
                              showToast(`Removed "${trailer.name}"`);
                            }}
                            className="inline-flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 p-2 text-red-700"
                            title="Delete trailer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Editable Details & Pricing */}
                      <div className="lg:col-span-9 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Trailer Name
                            </label>
                            <input
                              type="text"
                              value={trailer.name}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  name: e.target.value,
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm font-bold text-steel-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Category
                            </label>
                            <input
                              type="text"
                              value={trailer.category}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  category: e.target.value,
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm font-semibold text-steel-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Pricing Row */}
                        <div className="rounded-xl bg-brand-50/60 border border-brand-200 p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-800 mb-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              Daily Price / Display
                            </label>
                            <input
                              type="text"
                              value={dailyRule?.displayLabel ?? ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const nextRules = trailer.pricingRules.map(
                                  (r) =>
                                    r.rateType === "daily"
                                      ? {
                                          ...r,
                                          amount: null,
                                          displayLabel: val,
                                        }
                                      : r
                                );
                                updateTrailerPricing(trailer.id, nextRules);
                              }}
                              placeholder="e.g., $120 / day"
                              className="w-full rounded-lg bg-white border border-brand-300 px-3 py-2 text-sm font-bold text-steel-900"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-800 mb-1">
                              Weekly Price / Display
                            </label>
                            <input
                              type="text"
                              value={weeklyRule?.displayLabel ?? ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const nextRules = trailer.pricingRules.map(
                                  (r) =>
                                    r.rateType === "weekly"
                                      ? {
                                          ...r,
                                          amount: null,
                                          displayLabel: val,
                                        }
                                      : r
                                );
                                updateTrailerPricing(trailer.id, nextRules);
                              }}
                              placeholder="e.g., $600 / week"
                              className="w-full rounded-lg bg-white border border-brand-300 px-3 py-2 text-sm font-semibold text-steel-900"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-800 mb-1">
                              Deposit Note
                            </label>
                            <input
                              type="text"
                              value={depositRule?.displayLabel ?? ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const nextRules = trailer.pricingRules.map(
                                  (r) =>
                                    r.rateType === "security_deposit"
                                      ? {
                                          ...r,
                                          amount: null,
                                          displayLabel: val,
                                        }
                                      : r
                                );
                                updateTrailerPricing(trailer.id, nextRules);
                              }}
                              placeholder="e.g., $150 refundable deposit"
                              className="w-full rounded-lg bg-white border border-brand-300 px-3 py-2 text-sm text-steel-900"
                            />
                          </div>
                        </div>

                        {/* Dimensions, Capacity & Availability Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Dimensions
                            </label>
                            <input
                              type="text"
                              value={trailer.dimensions}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  dimensions: e.target.value,
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3 py-2 text-xs sm:text-sm text-steel-900"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Capacity / Feature
                            </label>
                            <input
                              type="text"
                              value={trailer.capacityOrFeature}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  capacityOrFeature: e.target.value,
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3 py-2 text-xs sm:text-sm text-steel-900"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Availability Badge Text
                            </label>
                            <input
                              type="text"
                              value={trailer.availabilityStatusText}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  availabilityStatusText: e.target.value,
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3 py-2 text-xs sm:text-sm text-steel-900"
                            />
                          </div>
                        </div>

                        {/* Specs & Per-Trailer Contract Link */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-500 mb-1">
                              Spec Pills (Comma Separated)
                            </label>
                            <input
                              type="text"
                              value={trailer.basicSpecs.join(", ")}
                              onChange={(e) =>
                                updateTrailer(trailer.id, {
                                  basicSpecs: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                })
                              }
                              className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3 py-2 text-xs text-steel-900"
                            />
                          </div>

                          <div className="flex items-center justify-between gap-2 rounded-xl bg-steel-50 border border-steel-200 px-3.5 py-2">
                            <div className="min-w-0">
                              <span className="block text-[10px] font-bold uppercase text-steel-500">
                                This Trailer&apos;s Rental Contract
                              </span>
                              <span className="block text-xs font-bold text-steel-900 truncate">
                                {trailer.contract.title} (v
                                {trailer.contract.version})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedContractTrailerId(trailer.id);
                                setActiveTab("contracts");
                              }}
                              className="shrink-0 rounded-lg bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 text-xs font-bold"
                            >
                              Edit Contract
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: TRAILER PHOTOS MANAGER
           ==================================================================== */}
        {activeTab === "photos" && selectedPhotoTrailer && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-steel-900">
                    Trailer Photo Gallery Manager
                  </h1>
                  <p className="text-sm text-steel-600 mt-1">
                    Upload photos from your device or add image URLs, edit angle
                    captions, and choose the primary cover photo for each
                    trailer.
                  </p>
                </div>

                <div className="w-full sm:w-80">
                  <label className="block text-xs font-bold uppercase text-steel-500 mb-1">
                    Select Trailer to Manage Photos:
                  </label>
                  <select
                    value={selectedPhotoTrailer.id}
                    onChange={(e) => setSelectedPhotoTrailerId(e.target.value)}
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm font-bold text-steel-900"
                  >
                    {siteData.fleet.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.photos.length} photos)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Photo Box */}
              <div className="rounded-2xl bg-steel-50 border border-steel-200 p-5 space-y-4">
                <h2 className="font-display text-base font-extrabold text-steel-900">
                  Add New Photo to &ldquo;{selectedPhotoTrailer.name}&rdquo;
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5">
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Upload Local Image or Choose Preset
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-steel-900 hover:bg-steel-800 text-white px-4 py-2.5 text-xs font-bold shrink-0">
                        <Upload className="w-4 h-4 text-brand-400" />
                        <span>Upload from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUploadToPhotoUrl(e, (dataUrl) => {
                              setNewPhotoUrl(dataUrl);
                              showToast(
                                "Image loaded from device! Click 'Add Photo' to save."
                              );
                            })
                          }
                        />
                      </label>
                      <select
                        value={
                          PRESET_DEMO_IMAGES.some((p) => p.url === newPhotoUrl)
                            ? newPhotoUrl
                            : ""
                        }
                        onChange={(e) => {
                          if (e.target.value) setNewPhotoUrl(e.target.value);
                        }}
                        className="flex-1 rounded-xl bg-white border border-steel-300 px-3 py-2.5 text-xs font-semibold"
                      >
                        <option value="">Or select preset image...</option>
                        {PRESET_DEMO_IMAGES.map((img) => (
                          <option key={img.url} value={img.url}>
                            {img.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Photo Caption / Angle Label
                    </label>
                    <input
                      type="text"
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      placeholder="e.g., Rear Loading Ramp Open"
                      className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div className="md:col-span-3 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-steel-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPhotoIsPrimary}
                        onChange={(e) => setNewPhotoIsPrimary(e.target.checked)}
                        className="rounded border-steel-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span>Set as Cover</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        addTrailerPhoto(selectedPhotoTrailer.id, {
                          url: newPhotoUrl,
                          alt:
                            newPhotoCaption.trim() ||
                            selectedPhotoTrailer.name,
                          caption:
                            newPhotoCaption.trim() ||
                            `Walkaround Angle #${
                              selectedPhotoTrailer.photos.length + 1
                            }`,
                          isPrimary: newPhotoIsPrimary,
                          isPlaceholder: false,
                        });
                        setNewPhotoCaption("");
                        setNewPhotoIsPrimary(false);
                        showToast(
                          `Added photo to "${selectedPhotoTrailer.name}"!`
                        );
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-4 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {selectedPhotoTrailer.photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`rounded-2xl border overflow-hidden bg-white flex flex-col justify-between ${
                      photo.isPrimary
                        ? "border-2 border-brand-600 shadow-md"
                        : "border-steel-200"
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-steel-900">
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="rounded-lg bg-steel-950/85 text-white px-2.5 py-1 text-xs font-bold">
                            Slot #{index + 1}
                          </span>
                          {photo.isPrimary && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-brand-600 text-white px-2.5 py-1 text-xs font-bold shadow-sm">
                              <Star className="w-3 h-3 fill-current" />
                              Primary Cover
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-steel-500">
                          Caption / Slot Description
                        </label>
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) =>
                            updateTrailerPhotoCaption(
                              selectedPhotoTrailer.id,
                              photo.id,
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg bg-steel-50 border border-steel-300 px-3 py-2 text-xs font-semibold text-steel-900"
                        />
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-steel-100">
                      {!photo.isPrimary ? (
                        <button
                          type="button"
                          onClick={() => {
                            setPrimaryTrailerPhoto(
                              selectedPhotoTrailer.id,
                              photo.id
                            );
                            showToast("Updated primary cover photo!");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-steel-100 hover:bg-brand-50 text-steel-800 hover:text-brand-700 px-3 py-1.5 text-xs font-bold transition-colors"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Make Cover Photo</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-brand-700">
                          Active Cover Image
                        </span>
                      )}

                      <button
                        type="button"
                        disabled={selectedPhotoTrailer.photos.length <= 1}
                        onClick={() => {
                          deleteTrailerPhoto(selectedPhotoTrailer.id, photo.id);
                          showToast("Removed photo slot");
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-40 text-red-700 px-2.5 py-1.5 text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: BUSINESS SETTINGS, HOURS, PHONES & SOCIALS
           ==================================================================== */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Contact, Hours, Phones & Socials */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 border-b border-steel-200 pb-3">
                  <Phone className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display text-xl font-extrabold text-steel-900">
                    Phone Numbers, Hours &amp; Pickup Info
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Displayed Phone Number (Header, Callout &amp; Footer)
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.contactPhoneDisplay}
                      onChange={(e) =>
                        updateSettings({ contactPhoneDisplay: e.target.value })
                      }
                      placeholder="e.g., (559) 555-0144"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm font-bold text-steel-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Click-to-Call Dial Number (tel: link, optional)
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.contactPhoneTel}
                      onChange={(e) =>
                        updateSettings({ contactPhoneTel: e.target.value })
                      }
                      placeholder="e.g., 5595550144"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm text-steel-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Public Contact Email
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.contactEmailDisplay}
                      onChange={(e) =>
                        updateSettings({ contactEmailDisplay: e.target.value })
                      }
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm text-steel-900"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-steel-600 mb-1">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      Business / Pickup Hours
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.businessHoursDisplay}
                      onChange={(e) =>
                        updateSettings({ businessHoursDisplay: e.target.value })
                      }
                      placeholder="e.g., Mon to Sat: 7:00 AM to 6:00 PM"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm font-semibold text-steel-900"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-steel-600 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      Pickup Address / Location Display
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.pickupAddressDisplay}
                      onChange={(e) =>
                        updateSettings({ pickupAddressDisplay: e.target.value })
                      }
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm text-steel-900"
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles Card: Instagram, Facebook, Google Business */}
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 border-b border-steel-200 pb-3">
                  <Share2 className="w-5 h-5 text-brand-600" />
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-steel-900">
                      Socials &amp; Business Profiles
                    </h2>
                    <p className="text-xs text-steel-500">
                      When Facebook or Google Business URLs are filled out
                      below, they automatically appear as clickable links on the
                      homepage.
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                    Instagram Handle &amp; URL
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={siteData.settings.instagramHandle}
                      onChange={(e) =>
                        updateSettings({ instagramHandle: e.target.value })
                      }
                      placeholder="@legacytrailerrentalz"
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={siteData.settings.instagramUrl}
                      onChange={(e) =>
                        updateSettings({ instagramUrl: e.target.value })
                      }
                      placeholder="https://instagram.com/legacytrailerrentalz"
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                    Facebook Page Display Name &amp; URL
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={siteData.settings.facebookLabel}
                      onChange={(e) =>
                        updateSettings({ facebookLabel: e.target.value })
                      }
                      placeholder="Facebook Page"
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                    <input
                      type="url"
                      value={siteData.settings.facebookUrl}
                      onChange={(e) =>
                        updateSettings({ facebookUrl: e.target.value })
                      }
                      placeholder="https://facebook.com/yourpage"
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Google Business Profile */}
                <div>
                  <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                    Google Business Profile Display Name &amp; URL
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={siteData.settings.googleBusinessLabel}
                      onChange={(e) =>
                        updateSettings({ googleBusinessLabel: e.target.value })
                      }
                      placeholder="Google Business Profile"
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                    <input
                      type="url"
                      value={siteData.settings.googleBusinessUrl}
                      onChange={(e) =>
                        updateSettings({ googleBusinessUrl: e.target.value })
                      }
                      placeholder="https://maps.google.com/..."
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Messaging, Brand Identity & Surrounding Service Areas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
                <h2 className="font-display text-xl font-extrabold text-steel-900 border-b border-steel-200 pb-3">
                  Brand Identity, Logo &amp; Hero Copy
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.businessName}
                      onChange={(e) =>
                        updateSettings({ businessName: e.target.value })
                      }
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                      Legal Entity Name
                    </label>
                    <input
                      type="text"
                      value={siteData.settings.legalName}
                      onChange={(e) =>
                        updateSettings({ legalName: e.target.value })
                      }
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                    Hero Headline &amp; Highlighted Location Text
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={siteData.settings.heroHeadline}
                      onChange={(e) =>
                        updateSettings({ heroHeadline: e.target.value })
                      }
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={siteData.settings.heroHighlightText}
                      onChange={(e) =>
                        updateSettings({ heroHighlightText: e.target.value })
                      }
                      className="rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm font-bold text-brand-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-steel-600 mb-1">
                    Hero Supporting Statement
                  </label>
                  <textarea
                    rows={3}
                    value={siteData.settings.heroSubheadline}
                    onChange={(e) =>
                      updateSettings({ heroSubheadline: e.target.value })
                    }
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Service Area Manager */}
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
                <h2 className="font-display text-xl font-extrabold text-steel-900 border-b border-steel-200 pb-3">
                  Surrounding Service Area Slots
                </h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newServiceAreaName}
                    onChange={(e) => setNewServiceAreaName(e.target.value)}
                    placeholder="Add surrounding city (e.g., Fresno, Chowchilla, Kerman)..."
                    className="flex-1 rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newServiceAreaName.trim()) return;
                      updateSettings({
                        surroundingServiceAreas: [
                          ...siteData.settings.surroundingServiceAreas,
                          {
                            id: `area-${Date.now()}`,
                            name: newServiceAreaName.trim(),
                            isVerified: true,
                          },
                        ],
                      });
                      setNewServiceAreaName("");
                      showToast("Added service area city!");
                    }}
                    className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-xs font-bold shrink-0"
                  >
                    + Add Area
                  </button>
                </div>

                <div className="space-y-2">
                  {siteData.settings.surroundingServiceAreas.map((area) => (
                    <div
                      key={area.id}
                      className="flex items-center gap-2 rounded-xl bg-steel-50 border border-steel-200 p-2.5"
                    >
                      <input
                        type="text"
                        value={area.name}
                        onChange={(e) =>
                          updateSettings({
                            surroundingServiceAreas:
                              siteData.settings.surroundingServiceAreas.map(
                                (a) =>
                                  a.id === area.id
                                    ? { ...a, name: e.target.value }
                                    : a
                              ),
                          })
                        }
                        className="flex-1 rounded-lg bg-white border border-steel-300 px-3 py-1.5 text-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateSettings({
                            surroundingServiceAreas:
                              siteData.settings.surroundingServiceAreas.filter(
                                (a) => a.id !== area.id
                              ),
                          })
                        }
                        className="rounded-lg bg-red-50 hover:bg-red-100 text-red-700 p-1.5"
                        title="Remove area"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: PER-TRAILER CONTRACTS MANAGER
           ==================================================================== */}
        {activeTab === "contracts" && selectedContractTrailer && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-5">
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-steel-900">
                    Per-Trailer Rental Agreements
                  </h1>
                  <p className="text-sm text-steel-600 mt-1">
                    Each trailer has its own customizable rental agreement that
                    customers must review and sign during booking before
                    completing online payment.
                  </p>
                </div>

                <div className="w-full sm:w-80">
                  <label className="block text-xs font-bold uppercase text-steel-500 mb-1">
                    Select Trailer to Edit Contract:
                  </label>
                  <select
                    value={selectedContractTrailer.id}
                    onChange={(e) =>
                      setSelectedContractTrailerId(e.target.value)
                    }
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-3.5 py-2.5 text-sm font-bold text-steel-900"
                  >
                    {siteData.fleet.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Trailer Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {siteData.fleet.map((t) => {
                  const isSelected = t.id === selectedContractTrailer.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedContractTrailerId(t.id)}
                      className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold border transition-colors ${
                        isSelected
                          ? "bg-steel-900 text-white border-steel-900"
                          : "bg-steel-50 text-steel-700 border-steel-200 hover:bg-steel-100"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>

              {/* Selected Trailer Contract Editor */}
              <div className="rounded-2xl bg-steel-50 border border-steel-200 p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
                        Editing Contract For Trailer:
                      </span>
                      <h2 className="font-display text-lg sm:text-xl font-extrabold text-steel-900">
                        {selectedContractTrailer.name}
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateTrailerContract(
                        selectedContractTrailer.id,
                        createDefaultTrailerContract(
                          selectedContractTrailer.name
                        )
                      );
                      showToast(
                        `Reset contract for "${selectedContractTrailer.name}" to default template`
                      );
                    }}
                    className="rounded-xl bg-white hover:bg-steel-100 border border-steel-300 px-3.5 py-2 text-xs font-bold text-steel-700"
                  >
                    Reset This Trailer&apos;s Contract
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Contract Title (Shown at Booking Step 2)
                    </label>
                    <input
                      type="text"
                      value={selectedContractTrailer.contract.title}
                      onChange={(e) =>
                        updateTrailerContract(selectedContractTrailer.id, {
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm font-bold text-steel-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                      Version
                    </label>
                    <input
                      type="text"
                      value={selectedContractTrailer.contract.version}
                      onChange={(e) =>
                        updateTrailerContract(selectedContractTrailer.id, {
                          version: e.target.value,
                        })
                      }
                      className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm font-semibold text-steel-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                    Short Summary Line
                  </label>
                  <input
                    type="text"
                    value={selectedContractTrailer.contract.summary}
                    onChange={(e) =>
                      updateTrailerContract(selectedContractTrailer.id, {
                        summary: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm text-steel-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                    Full Contract Clauses &amp; Rental Terms for This Trailer
                  </label>
                  <textarea
                    rows={8}
                    value={selectedContractTrailer.contract.termsBody}
                    onChange={(e) =>
                      updateTrailerContract(selectedContractTrailer.id, {
                        termsBody: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-white border border-steel-300 px-4 py-3 text-sm text-steel-900 leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-steel-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        selectedContractTrailer.contract.requiresDriverLicense
                      }
                      onChange={(e) =>
                        updateTrailerContract(selectedContractTrailer.id, {
                          requiresDriverLicense: e.target.checked,
                        })
                      }
                    />
                    <span>Requires Driver&apos;s License Confirmation</span>
                  </label>

                  <label className="inline-flex items-center gap-2 text-xs font-bold text-steel-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        selectedContractTrailer.contract.requiresInsuranceProof
                      }
                      onChange={(e) =>
                        updateTrailerContract(selectedContractTrailer.id, {
                          requiresInsuranceProof: e.target.checked,
                        })
                      }
                    />
                    <span>Requires Proof of Insurance Confirmation</span>
                  </label>

                  <label className="inline-flex items-center gap-2 text-xs font-bold text-steel-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        selectedContractTrailer.contract.requiresSignature
                      }
                      onChange={(e) =>
                        updateTrailerContract(selectedContractTrailer.id, {
                          requiresSignature: e.target.checked,
                        })
                      }
                    />
                    <span>Requires Digital Signature Before Payment</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: POLICIES & FAQS MANAGER
           ==================================================================== */}
        {activeTab === "policies-faqs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Rental Information Policies */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
                <h2 className="font-display text-xl font-extrabold text-steel-900 border-b border-steel-200 pb-3">
                  Rental Policy Cards (Section 8)
                </h2>

                {siteData.policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="rounded-xl bg-steel-50 border border-steel-200 p-4 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-steel-500 mb-1">
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={policy.title}
                          onChange={(e) =>
                            updatePolicySection(policy.id, {
                              title: e.target.value,
                            })
                          }
                          className="w-full rounded-lg bg-white border border-steel-300 px-3 py-1.5 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-steel-500 mb-1">
                          Status Badge
                        </label>
                        <input
                          type="text"
                          value={policy.statusLabel}
                          onChange={(e) =>
                            updatePolicySection(policy.id, {
                              statusLabel: e.target.value,
                            })
                          }
                          className="w-full rounded-lg bg-white border border-steel-300 px-3 py-1.5 text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-steel-500 mb-1">
                        Bullet Points (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={policy.items.join("\n")}
                        onChange={(e) =>
                          updatePolicySection(policy.id, {
                            items: e.target.value.split("\n").filter(Boolean),
                          })
                        }
                        className="w-full rounded-lg bg-white border border-steel-300 px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Manager */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-steel-200 shadow-sm space-y-4">
                <h2 className="font-display text-xl font-extrabold text-steel-900 border-b border-steel-200 pb-3">
                  FAQ Accordion Items (Section 10)
                </h2>

                {/* Add FAQ */}
                <div className="rounded-xl bg-brand-50/60 border border-brand-200 p-4 space-y-3">
                  <p className="text-xs font-bold uppercase text-brand-800">
                    Add New FAQ Question
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      placeholder="Question..."
                      className="sm:col-span-2 rounded-lg bg-white border border-steel-300 px-3 py-2 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={newFaqBadge}
                      onChange={(e) => setNewFaqBadge(e.target.value)}
                      placeholder="Badge label"
                      className="rounded-lg bg-white border border-steel-300 px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    placeholder="Answer..."
                    className="w-full rounded-lg bg-white border border-steel-300 px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
                      addFaq({
                        question: newFaqQuestion.trim(),
                        answer: newFaqAnswer.trim(),
                        badgeText: newFaqBadge.trim() || "Verified Policy",
                        isActive: true,
                      });
                      setNewFaqQuestion("");
                      setNewFaqAnswer("");
                      showToast("Added new FAQ question!");
                    }}
                    className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-xs font-bold"
                  >
                    + Add FAQ
                  </button>
                </div>

                {/* Existing FAQs */}
                <div className="space-y-3">
                  {siteData.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="rounded-xl bg-steel-50 border border-steel-200 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            updateFaq(faq.id, { question: e.target.value })
                          }
                          className="flex-1 rounded-lg bg-white border border-steel-300 px-3 py-1.5 text-xs font-bold text-steel-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            deleteFaq(faq.id);
                            showToast("Removed FAQ item");
                          }}
                          className="rounded-lg bg-red-50 hover:bg-red-100 text-red-700 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) =>
                          updateFaq(faq.id, { answer: e.target.value })
                        }
                        className="w-full rounded-lg bg-white border border-steel-300 px-3 py-1.5 text-xs text-steel-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
