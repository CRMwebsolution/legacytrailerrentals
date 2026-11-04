"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Instagram,
  Globe,
  Share2,
  Info,
  RotateCcw,
  FileSignature,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  PenTool,
  ExternalLink,
} from "lucide-react";
import {
  DEMO_FLEET_ITEMS,
  createDefaultTrailerContract,
} from "@/data/demo-fleet";
import {
  DEFAULT_BUSINESS_SETTINGS,
  getTrailerRateDisplay,
} from "@/lib/site-data";
import { BusinessSettings, TrailerInventoryItem } from "@/types/cms";

interface ContactAndFooterSectionProps {
  settings?: BusinessSettings;
  fleet?: TrailerInventoryItem[];
  selectedTrailer: string;
  onTrailerChange: (trailer: string) => void;
}

type BookingStep = "details" | "contract" | "payment" | "confirmed";

export function ContactAndFooterSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
  fleet = DEMO_FLEET_ITEMS,
  selectedTrailer,
  onTrailerChange,
}: ContactAndFooterSectionProps) {
  const [step, setStep] = useState<BookingStep>("details");

  // Step 1: Booking Details State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("Phone or Text");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [towVehicle, setTowVehicle] = useState("");
  const [pickupOrDelivery, setPickupOrDelivery] = useState(
    "Pickup in Madera, CA"
  );
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [stepError, setStepError] = useState<string | null>(null);

  // Step 2: Contract Signing State (Before Payment)
  const [signerLegalName, setSignerLegalName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedLicenseAndInsurance, setConfirmedLicenseAndInsurance] =
    useState(false);
  const [hasCanvasStroke, setHasCanvasStroke] = useState(false);
  const [signedTimestamp, setSignedTimestamp] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  // Step 3: Mock Online Payment State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "express">(
    "card"
  );
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardZip, setCardZip] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [paymentReceiptId, setPaymentReceiptId] = useState("");

  // Legal modal state
  const [activePolicyModal, setActivePolicyModal] = useState<
    "privacy" | "terms" | null
  >(null);

  // Resolve the currently selected trailer object (or fallback to first trailer)
  const matchedTrailer =
    fleet.find((t) => t.name === selectedTrailer) ?? fleet[0];

  const activeContract = matchedTrailer
    ? matchedTrailer.contract
    : createDefaultTrailerContract(selectedTrailer || "Selected Trailer");

  const dailyRateLabel = matchedTrailer
    ? getTrailerRateDisplay(matchedTrailer, "daily")
    : "$XX / day";

  const depositLabel = matchedTrailer
    ? getTrailerRateDisplay(matchedTrailer, "security_deposit")
    : "Deposit confirmed at booking";

  // Pre-fill signer & cardholder name from fullName when advancing steps
  useEffect(() => {
    if (fullName && !signerLegalName) {
      setSignerLegalName(fullName);
    }
    if (fullName && !cardholderName) {
      setCardholderName(fullName);
    }
  }, [fullName, signerLegalName, cardholderName]);

  // Canvas drawing handlers for optional drawn signature
  const getCanvasPoint = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    isDrawingRef.current = true;
    const pt = getCanvasPoint(e);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  };

  const drawMove = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pt = getCanvasPoint(e);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    setHasCanvasStroke(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearSignatureCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasCanvasStroke(false);
  };

  // Step 1 -> Step 2
  const handleAdvanceToContract = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);
    if (!selectedTrailer && fleet.length > 0) {
      onTrailerChange(fleet[0].name);
    }
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setStepError(
        "Please enter your name, phone number, and email address to continue to the rental contract."
      );
      return;
    }
    setStep("contract");
  };

  // Step 2 -> Step 3
  const handleSignContractAndAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);
    if (!signerLegalName.trim()) {
      setStepError(
        "Please type your full legal name to sign the rental contract."
      );
      return;
    }
    if (!agreedToTerms || !confirmedLicenseAndInsurance) {
      setStepError(
        "Please check the boxes confirming you agree to the trailer rental contract and requirements before proceeding to payment."
      );
      return;
    }
    setSignedTimestamp(
      new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setStep("payment");
  };

  // Step 3 -> Confirmed
  const handleCompleteMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);
    if (paymentMethod === "card") {
      if (!cardholderName.trim() || !cardNumber.trim()) {
        setStepError(
          "Please enter mock card details (or click 'Fill Demo Test Card') to complete the mock payment."
        );
        return;
      }
    }
    setBookingReference(
      `LTR-${Math.floor(100000 + Math.random() * 900000)}`
    );
    setPaymentReceiptId(
      `PAY-MOCK-${Math.floor(10000 + Math.random() * 90000)}`
    );
    setStep("confirmed");
  };

  const handleFillDemoCard = () => {
    setCardholderName(fullName || "Alex Ramirez");
    setCardNumber("4242 4242 4242 4242");
    setCardExpiry("08/29");
    setCardCvc("424");
    setCardZip("93637");
    setStepError(null);
  };

  const handleResetBookingFlow = () => {
    setStep("details");
    setAgreedToTerms(false);
    setConfirmedLicenseAndInsurance(false);
    setHasCanvasStroke(false);
    setStepError(null);
  };

  const hasFacebook = Boolean(
    settings.facebookUrl &&
      settings.facebookUrl.trim() &&
      settings.facebookUrl !== "#facebook-placeholder"
  );
  const hasGoogleBusiness = Boolean(
    settings.googleBusinessUrl &&
      settings.googleBusinessUrl.trim() &&
      settings.googleBusinessUrl !== "#google-profile-placeholder"
  );

  return (
    <footer
      id="contact"
      className="bg-steel-950 text-white scroll-mt-20 pb-24 lg:pb-0"
    >
      {/* Hidden anchor for legacy links */}
      <div id="rental-request" className="scroll-mt-24" />

      {/* Main Contact + 3-Step Trailer Booking & Payment Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-steel-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Contact Info, Socials & Map Placeholder */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 border border-brand-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
                Contact &amp; Online Booking
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Book Your Trailer with {settings.businessName}
              </h2>
              <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
                Complete the 3-step booking flow to select your trailer, sign
                its rental contract, and submit your mock online payment, or
                contact us directly in {settings.confirmedCity}.
              </p>
            </div>

            {/* Contact Info Placeholders Card */}
            <div className="rounded-2xl bg-steel-900 border border-steel-800 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Contact Information
                </span>
                <span className="rounded bg-steel-800 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  Admin-Adjustable
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-steel-800 text-brand-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-400 font-medium">
                      Phone / Text
                    </div>
                    <div className="font-bold text-white">
                      {settings.contactPhoneDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-steel-800 text-brand-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-400 font-medium">
                      Email
                    </div>
                    <div className="font-bold text-white break-all">
                      {settings.contactEmailDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-steel-800 text-brand-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-400 font-medium">
                      Confirmed City &amp; Pickup Address
                    </div>
                    <div className="font-bold text-white">
                      {settings.pickupAddressDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-steel-800 text-brand-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-400 font-medium">
                      Business Hours
                    </div>
                    <div className="font-bold text-white">
                      {settings.businessHoursDisplay}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Business Profiles (Instagram, Facebook, Google Business) */}
            <div className="rounded-2xl bg-steel-900 border border-steel-800 p-5 sm:p-6 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-steel-400 block">
                Social &amp; Business Profiles
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Confirmed Instagram Link */}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-steel-800/90 hover:bg-brand-500/20 border border-brand-500/40 px-4 py-3 text-sm font-bold text-white transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-brand-400" />
                    <span>Instagram: {settings.instagramHandle}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded">
                    Confirmed
                  </span>
                </a>

                {/* Google Business Profile (Clickable when filled out in Admin Dashboard) */}
                {hasGoogleBusiness ? (
                  <a
                    href={settings.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-steel-800/90 hover:bg-brand-500/20 border border-brand-500/40 px-4 py-3 text-sm font-bold text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-brand-400" />
                      <span>
                        {settings.googleBusinessLabel ||
                          "Google Business Profile"}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded">
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between rounded-xl bg-steel-950/70 border border-steel-800 px-4 py-3 text-sm text-steel-300">
                    <span className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-steel-400" />
                      <span>Google Business Profile</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-steel-800 text-amber-300 px-2 py-0.5 rounded">
                      Add in Admin
                    </span>
                  </div>
                )}

                {/* Facebook Page (Clickable when filled out in Admin Dashboard) */}
                {hasFacebook ? (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-steel-800/90 hover:bg-brand-500/20 border border-brand-500/40 px-4 py-3 text-sm font-bold text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Share2 className="w-4 h-4 text-brand-400" />
                      <span>{settings.facebookLabel || "Facebook Page"}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded">
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between rounded-xl bg-steel-950/70 border border-steel-800 px-4 py-3 text-sm text-steel-300">
                    <span className="flex items-center gap-2.5">
                      <Share2 className="w-4 h-4 text-steel-400" />
                      <span>Facebook Page</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-steel-800 text-amber-300 px-2 py-0.5 rounded">
                      Add in Admin
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl bg-steel-900 border border-steel-800 overflow-hidden">
              <div className="p-4 border-b border-steel-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel-300">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span>Service Area Map Placeholder</span>
                </div>
                <span className="text-xs font-semibold text-brand-400">
                  {settings.locationShort}
                </span>
              </div>
              <div className="aspect-[16/9] bg-steel-950 relative flex flex-col items-center justify-center p-6 text-center">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center space-y-2 max-w-xs">
                  <div className="w-12 h-12 rounded-full bg-brand-500/20 border-2 border-brand-400 text-brand-400 flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-display text-base font-extrabold text-white">
                    {settings.locationFull}
                  </p>
                  <p className="text-xs text-steel-400">
                    Interactive Google Map embed placeholder for the confirmed
                    Madera pickup location and service radius.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): 3-Step Trailer Booking, Contract Signature & Mock Payment */}
          <div
            id="booking-form"
            className="lg:col-span-7 rounded-3xl bg-white text-steel-900 p-6 sm:p-8 lg:p-10 shadow-2xl border border-steel-200 scroll-mt-24"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-steel-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Online Trailer Booking
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-steel-900 mt-0.5">
                  Book a Trailer
                </h3>
              </div>
              <span className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-bold text-brand-800">
                Sign Contract &amp; Pay Online (Demo)
              </span>
            </div>

            {/* 3-Step Progress Stepper */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => step !== "confirmed" && setStep("details")}
                className={`rounded-xl p-2.5 text-left border transition-colors ${
                  step === "details"
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-steel-50 text-steel-700 border-steel-200"
                }`}
              >
                <div className="text-[10px] font-bold uppercase opacity-80">
                  Step 1
                </div>
                <div className="text-xs sm:text-sm font-extrabold truncate">
                  1. Booking Details
                </div>
              </button>

              <button
                type="button"
                disabled={step === "details" || step === "confirmed"}
                onClick={() => step === "payment" && setStep("contract")}
                className={`rounded-xl p-2.5 text-left border transition-colors ${
                  step === "contract"
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-steel-50 text-steel-700 border-steel-200 disabled:opacity-60"
                }`}
              >
                <div className="text-[10px] font-bold uppercase opacity-80">
                  Step 2
                </div>
                <div className="text-xs sm:text-sm font-extrabold truncate">
                  2. Sign Contract
                </div>
              </button>

              <div
                className={`rounded-xl p-2.5 text-left border transition-colors ${
                  step === "payment" || step === "confirmed"
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-steel-50 text-steel-700 border-steel-200 opacity-60"
                }`}
              >
                <div className="text-[10px] font-bold uppercase opacity-80">
                  Step 3
                </div>
                <div className="text-xs sm:text-sm font-extrabold truncate">
                  3. Online Payment
                </div>
              </div>
            </div>

            {stepError && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-800">
                {stepError}
              </div>
            )}

            {/* ================================================================
                STEP 1: BOOKING DETAILS FORM
               ================================================================ */}
            {step === "details" && (
              <form onSubmit={handleAdvanceToContract} className="mt-6 space-y-5">
                {/* 1. First and last name */}
                <div>
                  <label
                    htmlFor="book-fullname"
                    className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                  >
                    1. First and Last Name *
                  </label>
                  <input
                    id="book-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Alex Ramirez"
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                {/* 2. Phone number & 3. Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      2. Phone Number *
                    </label>
                    <input
                      id="book-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(559) 000-0000"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="book-email"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      3. Email Address *
                    </label>
                    <input
                      id="book-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                {/* 4. Preferred contact method & 5. Trailer selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-contact-method"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      4. Preferred Contact Method
                    </label>
                    <select
                      id="book-contact-method"
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Phone or Text">
                        Phone or Text Message
                      </option>
                      <option value="Text Message">Text Message</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="book-trailer"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      5. Trailer Selection *
                    </label>
                    <select
                      id="book-trailer"
                      value={selectedTrailer || (fleet[0]?.name ?? "")}
                      onChange={(e) => onTrailerChange(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm font-semibold text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      {fleet.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                      <option value="Not sure yet (please help me choose)">
                        Not sure yet (please help me choose)
                      </option>
                    </select>
                  </div>
                </div>

                {/* 6. Pickup date & 7. Return date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-pickup-date"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      6. Pickup Date
                    </label>
                    <input
                      id="book-pickup-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="book-return-date"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      7. Return Date
                    </label>
                    <input
                      id="book-return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                {/* 8. Tow vehicle & 9. Pickup or delivery options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-tow-vehicle"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      8. Tow Vehicle
                    </label>
                    <input
                      id="book-tow-vehicle"
                      type="text"
                      value={towVehicle}
                      onChange={(e) => setTowVehicle(e.target.value)}
                      placeholder="e.g., Ford F-150 / Chevy 2500"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="book-delivery-pref"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      9. Pickup or Delivery Option
                    </label>
                    <select
                      id="book-delivery-pref"
                      value={pickupOrDelivery}
                      onChange={(e) => setPickupOrDelivery(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm font-semibold text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Pickup in Madera, CA">
                        Pickup in Madera, CA
                      </option>
                      <option value="Request Delivery (specify in comment box)">
                        Request Delivery (specify in comment box)
                      </option>
                    </select>
                  </div>
                </div>

                {/* 10. Comment Box / Additional details */}
                <div>
                  <label
                    htmlFor="book-details"
                    className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                  >
                    10. Comment Box / Additional Details
                    {pickupOrDelivery ===
                      "Request Delivery (specify in comment box)" && (
                      <span className="ml-2 text-brand-600">
                        (Please specify delivery address &amp; timing)
                      </span>
                    )}
                  </label>
                  <textarea
                    id="book-details"
                    rows={3}
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="If requesting delivery, specify the delivery address and timing here, or share what you are hauling..."
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-base py-4 px-6 shadow-md transition-all"
                >
                  <FileSignature className="w-5 h-5" />
                  <span>Continue to Rental Contract (Step 2 of 3)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* ================================================================
                STEP 2: PER-TRAILER CONTRACT SIGNATURE (BEFORE PAYMENT)
               ================================================================ */}
            {step === "contract" && (
              <form
                onSubmit={handleSignContractAndAdvance}
                className="mt-6 space-y-5"
              >
                <div className="rounded-2xl bg-steel-50 border border-steel-200 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-steel-200 pb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
                        Per-Trailer Rental Agreement (Signed Before Payment)
                      </span>
                      <h4 className="font-display text-lg font-extrabold text-steel-900">
                        {activeContract.title}
                      </h4>
                    </div>
                    <span className="rounded-md bg-white border border-steel-300 px-2.5 py-1 text-xs font-bold text-steel-700">
                      Version {activeContract.version}
                    </span>
                  </div>

                  <p className="text-xs text-steel-600">
                    {activeContract.summary}
                  </p>

                  {/* Scrollable Contract Body */}
                  <div className="max-h-48 overflow-y-auto rounded-xl bg-white border border-steel-300 p-4 text-xs sm:text-sm text-steel-700 whitespace-pre-line leading-relaxed font-sans">
                    {activeContract.termsBody}
                  </div>
                </div>

                {/* Required Contract Checkboxes */}
                <div className="space-y-3 rounded-2xl bg-brand-50/60 border border-brand-200 p-4">
                  <label className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-steel-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedLicenseAndInsurance}
                      onChange={(e) =>
                        setConfirmedLicenseAndInsurance(e.target.checked)
                      }
                      className="mt-1 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>
                      I confirm that I hold a valid driver&apos;s license,
                      active auto insurance, and a properly rated tow vehicle
                      for{" "}
                      <strong>
                        {matchedTrailer?.name || selectedTrailer}
                      </strong>
                      .
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-steel-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>
                      I have read and agree to the terms of{" "}
                      <strong>{activeContract.title}</strong> and understand
                      this digital signature is required prior to payment.
                    </span>
                  </label>
                </div>

                {/* Digital Signature Box (Typed + Optional Drawn Pad) */}
                <div className="space-y-4 rounded-2xl bg-white border border-steel-300 p-4 sm:p-5">
                  <div>
                    <label
                      htmlFor="signer-legal-name"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      Type Full Legal Name to Sign *
                    </label>
                    <input
                      id="signer-legal-name"
                      type="text"
                      required
                      value={signerLegalName}
                      onChange={(e) => setSignerLegalName(e.target.value)}
                      placeholder="Type your full legal name"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm font-bold text-steel-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>

                  {/* Optional Draw Signature Pad */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-steel-600">
                        <PenTool className="w-3.5 h-3.5 text-brand-600" />
                        Draw Signature Below (Optional or Use Typed Signature)
                      </span>
                      <button
                        type="button"
                        onClick={clearSignatureCanvas}
                        className="text-xs font-bold text-brand-600 hover:underline"
                      >
                        Clear Pad
                      </button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={520}
                      height={110}
                      onMouseDown={startDrawing}
                      onMouseMove={drawMove}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={drawMove}
                      onTouchEnd={stopDrawing}
                      className="w-full h-28 rounded-xl bg-steel-50 border border-dashed border-steel-400 cursor-crosshair touch-none"
                    />
                    {signerLegalName && (
                      <p className="text-xs text-steel-500">
                        Electronic Signature Preview:{" "}
                        <span className="italic font-serif text-base font-bold text-steel-900 ml-1">
                          {signerLegalName}
                        </span>
                        {hasCanvasStroke ? " (+ Drawn Signature)" : ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel-300 px-5 py-3.5 text-xs sm:text-sm font-bold text-steel-700 hover:bg-steel-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Details</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base py-3.5 px-6 shadow-md transition-all"
                  >
                    <FileSignature className="w-5 h-5" />
                    <span>Sign Contract &amp; Proceed to Payment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}

            {/* ================================================================
                STEP 3: MOCK ONLINE PAYMENT CHECKOUT
               ================================================================ */}
            {step === "payment" && (
              <form
                onSubmit={handleCompleteMockPayment}
                className="mt-6 space-y-5"
              >
                {/* Signed Contract + Booking Summary Banner */}
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 space-y-1">
                    <div className="font-bold">
                      Contract Signed by {signerLegalName} ({signedTimestamp})
                    </div>
                    <div>
                      <strong>Trailer:</strong>{" "}
                      {matchedTrailer?.name || selectedTrailer} •{" "}
                      <strong>Rate:</strong> {dailyRateLabel} ({depositLabel})
                    </div>
                    <div>
                      <strong>Option:</strong> {pickupOrDelivery}
                    </div>
                  </div>
                </div>

                {/* Mock Payment Method Selector */}
                <div className="rounded-2xl bg-steel-50 border border-steel-200 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-brand-600" />
                      <h4 className="font-display text-base font-extrabold text-steel-900">
                        Mock Online Payment Checkout
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleFillDemoCard}
                      className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 text-xs font-bold shadow-sm"
                    >
                      Fill Demo Test Card
                    </button>
                  </div>

                  {/* Method Tabs */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`rounded-xl p-3 text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 ${
                        paymentMethod === "card"
                          ? "bg-steel-900 text-white border-steel-900"
                          : "bg-white text-steel-700 border-steel-300"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-brand-400" />
                      <span>Credit or Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("express")}
                      className={`rounded-xl p-3 text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 ${
                        paymentMethod === "express"
                          ? "bg-steel-900 text-white border-steel-900"
                          : "bg-white text-steel-700 border-steel-300"
                      }`}
                    >
                      <span>Apple Pay / Google Pay (Mock)</span>
                    </button>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="Alex Ramirez"
                          className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                          Card Number (Mock) *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="w-full rounded-xl bg-white border border-steel-300 px-3.5 py-2.5 text-sm font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                            Expiration
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full rounded-xl bg-white border border-steel-300 px-3 py-2.5 text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="424"
                            className="w-full rounded-xl bg-white border border-steel-300 px-3 py-2.5 text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-steel-700 mb-1">
                            Billing ZIP
                          </label>
                          <input
                            type="text"
                            value={cardZip}
                            onChange={(e) => setCardZip(e.target.value)}
                            placeholder="93637"
                            className="w-full rounded-xl bg-white border border-steel-300 px-3 py-2.5 text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-white border border-steel-300 p-4 text-center space-y-2">
                      <p className="text-sm font-bold text-steel-900">
                        Mock Express Wallet Checkout Ready
                      </p>
                      <p className="text-xs text-steel-600">
                        Click the button below to simulate an instant Apple Pay
                        or Google Pay booking checkout.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-steel-500 pt-1">
                    <Info className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>
                      Mock payment mode: No real card is charged during this MVP
                      demo.
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("contract")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-steel-300 px-5 py-3.5 text-xs sm:text-sm font-bold text-steel-700 hover:bg-steel-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Contract</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base py-4 px-6 shadow-md transition-all"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Complete Mock Payment &amp; Confirm Booking</span>
                  </button>
                </div>
              </form>
            )}

            {/* ================================================================
                STEP 4: CONFIRMED BOOKING & MOCK RECEIPT
               ================================================================ */}
            {step === "confirmed" && (
              <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block rounded bg-emerald-200/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-950">
                      Booking &amp; Mock Payment Confirmed
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-extrabold text-steel-900">
                      Your Trailer Booking Is Complete!
                    </h4>
                    <p className="text-sm text-steel-700 leading-relaxed">
                      Booking Reference:{" "}
                      <strong className="text-steel-950">
                        {bookingReference}
                      </strong>{" "}
                      • Receipt:{" "}
                      <strong className="text-steel-950">
                        {paymentReceiptId}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-emerald-200 p-4 text-xs sm:text-sm space-y-2 text-steel-700">
                  <div>
                    <strong className="text-steel-900">Customer:</strong>{" "}
                    {fullName} ({phone} • {email})
                  </div>
                  <div>
                    <strong className="text-steel-900">Booked Trailer:</strong>{" "}
                    {matchedTrailer?.name || selectedTrailer}
                  </div>
                  <div>
                    <strong className="text-steel-900">Rental Dates:</strong>{" "}
                    {pickupDate || "Scheduled Pickup"} to{" "}
                    {returnDate || "Scheduled Return"}
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Pickup or Delivery:
                    </strong>{" "}
                    {pickupOrDelivery}
                  </div>
                  <div>
                    <strong className="text-steel-900">Signed Contract:</strong>{" "}
                    {activeContract.title} (Signed by {signerLegalName} at{" "}
                    {signedTimestamp})
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Mock Payment Status:
                    </strong>{" "}
                    Paid Online ({dailyRateLabel})
                  </div>
                  {additionalDetails && (
                    <div>
                      <strong className="text-steel-900">Comments:</strong>{" "}
                      {additionalDetails}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetBookingFlow}
                  className="inline-flex items-center gap-2 rounded-xl bg-steel-900 hover:bg-steel-800 text-white font-bold text-xs sm:text-sm px-5 py-3"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start Another Demo Booking</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar: Official Logo, Quick Nav, Legal Placeholders, Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-steel-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={settings.logoUrl}
                alt={`${settings.legalName} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-base text-white block leading-none">
                {settings.legalName}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-steel-400 mt-1">
                <span>{settings.locationFull}</span>
                <span>•</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline"
                >
                  Instagram: {settings.instagramHandle}
                </a>
                {hasFacebook && (
                  <>
                    <span>•</span>
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 hover:underline"
                    >
                      {settings.facebookLabel || "Facebook"}
                    </a>
                  </>
                )}
                {hasGoogleBusiness && (
                  <>
                    <span>•</span>
                    <a
                      href={settings.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 hover:underline"
                    >
                      {settings.googleBusinessLabel || "Google Business"}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <nav
            aria-label="Footer Quick Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-steel-300"
          >
            <a href="#trailers" className="hover:text-brand-400">
              Trailers
            </a>
            <a href="#how-it-works" className="hover:text-brand-400">
              How It Works
            </a>
            <a href="#why-choose-us" className="hover:text-brand-400">
              Why Choose Us
            </a>
            <a href="#faq" className="hover:text-brand-400">
              FAQ
            </a>
            <a href="#gallery" className="hover:text-brand-400">
              Gallery
            </a>
            <a href="#contact" className="hover:text-brand-400">
              Contact
            </a>
            <Link
              href="/admin"
              className="text-brand-400 hover:text-brand-300 font-bold"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-steel-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.legalName}. Visual MVP
            Demo Concept ({settings.locationFull}).
          </p>

          {/* Privacy & Terms Placeholders */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setActivePolicyModal("privacy")}
              className="hover:text-white underline underline-offset-4"
            >
              Privacy Policy (Placeholder)
            </button>
            <button
              type="button"
              onClick={() => setActivePolicyModal("terms")}
              className="hover:text-white underline underline-offset-4"
            >
              Terms of Service (Placeholder)
            </button>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Placeholder Modal */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/80 backdrop-blur-sm p-4"
        >
          <div className="bg-white text-steel-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-steel-200">
            <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-3 py-0.5 text-xs font-bold text-amber-900">
              Legal Document Placeholder
            </span>
            <h4 className="font-display text-xl font-extrabold">
              {activePolicyModal === "privacy"
                ? "Privacy Policy Placeholder"
                : "Terms & Rental Conditions Placeholder"}
            </h4>
            <p className="text-sm text-steel-600 leading-relaxed">
              This is a placeholder for <strong>{settings.legalName}</strong>
              &apos;s official{" "}
              {activePolicyModal === "privacy"
                ? "Privacy Policy"
                : "Terms of Service and Rental Agreement Summary"}{" "}
              in {settings.locationFull}. Final legal text and owner policies
              will be editable in the Admin Dashboard before production launch.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="rounded-xl bg-steel-900 hover:bg-steel-800 text-white px-5 py-2.5 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
