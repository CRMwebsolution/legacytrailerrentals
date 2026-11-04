"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Globe,
  Share2,
  Info,
  RotateCcw,
} from "lucide-react";
import { DEMO_FLEET_ITEMS } from "@/data/demo-fleet";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";
import { BusinessSettings, TrailerInventoryItem } from "@/types/cms";

interface ContactAndFooterSectionProps {
  settings?: BusinessSettings;
  fleet?: TrailerInventoryItem[];
  selectedTrailer: string;
  onTrailerChange: (trailer: string) => void;
}

export function ContactAndFooterSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
  fleet = DEMO_FLEET_ITEMS,
  selectedTrailer,
  onTrailerChange,
}: ContactAndFooterSectionProps) {
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
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<
    "privacy" | "terms" | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const handleResetDemoForm = () => {
    setDemoSubmitted(false);
  };

  return (
    <footer
      id="contact"
      className="bg-steel-950 text-white scroll-mt-20 pb-24 lg:pb-0"
    >
      {/* Main Contact + Rental-Request Form Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-steel-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Contact Placeholders, Socials & Map Placeholder */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 border border-brand-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
                Contact &amp; Location
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Get in Touch with {settings.businessName}
              </h2>
              <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
                Have questions about a trailer, hitch compatibility, or upcoming
                dates in {settings.confirmedCity}? Reach out directly or
                complete the rental request preview form.
              </p>
            </div>

            {/* Contact Info Placeholders Card */}
            <div className="rounded-2xl bg-steel-900 border border-steel-800 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Contact Information Placeholders
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
                      Phone / Text Placeholder
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
                      Email Placeholder
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
                      Confirmed City &amp; Pickup Address Slot
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
                      Business Hours Placeholder
                    </div>
                    <div className="font-bold text-white">
                      {settings.businessHoursDisplay}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Profile Links (Instagram Confirmed + GBP & Facebook Placeholders) */}
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

                {/* Google Business Profile Placeholder */}
                <div className="flex items-center justify-between rounded-xl bg-steel-950/70 border border-steel-800 px-4 py-3 text-sm text-steel-300">
                  <span className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-steel-400" />
                    <span>Google Business Profile</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-steel-800 text-amber-300 px-2 py-0.5 rounded">
                    Link Placeholder
                  </span>
                </div>

                {/* Facebook Link Placeholder */}
                <div className="flex items-center justify-between rounded-xl bg-steel-950/70 border border-steel-800 px-4 py-3 text-sm text-steel-300">
                  <span className="flex items-center gap-2.5">
                    <Share2 className="w-4 h-4 text-steel-400" />
                    <span>Facebook Page</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-steel-800 text-amber-300 px-2 py-0.5 rounded">
                    Link Placeholder
                  </span>
                </div>
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
                    Interactive Google Map embed placeholder — will display
                    confirmed Madera pickup area or service radius.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Rental-Request Form Preview */}
          <div
            id="rental-request"
            className="lg:col-span-7 rounded-3xl bg-white text-steel-900 p-6 sm:p-8 lg:p-10 shadow-2xl border border-steel-200 scroll-mt-24"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-steel-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Rental-Request Form Preview
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-steel-900 mt-0.5">
                  Request a Trailer Rental
                </h3>
              </div>
              <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900">
                Design Demo Only
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-steel-50 border border-steel-200 p-3.5 flex items-start gap-2.5 text-xs text-steel-600">
              <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>
                This form demonstrates the fields and mobile-first flow for
                submitting a rental request. In this MVP concept demo,
                submitting shows an on-screen preview without storing or sending
                data.
              </span>
            </div>

            {demoSubmitted ? (
              <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block rounded bg-emerald-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-950">
                      Demo Preview Complete — No Backend Submission
                    </span>
                    <h4 className="font-display text-xl font-extrabold text-steel-900">
                      Sample Rental Request Previewed!
                    </h4>
                    <p className="text-sm text-steel-700 leading-relaxed">
                      In the live version,{" "}
                      <strong>{settings.legalName}</strong> will receive these
                      details and contact you to confirm availability.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-emerald-200 p-4 text-xs sm:text-sm space-y-2 text-steel-700">
                  <div>
                    <strong className="text-steel-900">Name:</strong>{" "}
                    {fullName || "(Sample Visitor)"}
                  </div>
                  <div>
                    <strong className="text-steel-900">Phone / Email:</strong>{" "}
                    {phone || "(559) XXX-XXXX"} •{" "}
                    {email || "sample@example.com"}
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Preferred Contact Method:
                    </strong>{" "}
                    {preferredContact}
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Trailer Selection:
                    </strong>{" "}
                    {selectedTrailer || "Not sure yet — help me choose"}
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Requested Dates:
                    </strong>{" "}
                    {pickupDate || "TBD"} to {returnDate || "TBD"}
                  </div>
                  <div>
                    <strong className="text-steel-900">Tow Vehicle:</strong>{" "}
                    {towVehicle || "Not specified"}
                  </div>
                  <div>
                    <strong className="text-steel-900">
                      Pickup or Delivery Preference:
                    </strong>{" "}
                    {pickupOrDelivery}
                  </div>
                  {additionalDetails && (
                    <div>
                      <strong className="text-steel-900">
                        Additional Details:
                      </strong>{" "}
                      {additionalDetails}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetDemoForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-steel-900 hover:bg-steel-800 text-white font-bold text-xs sm:text-sm px-5 py-3"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return to Form Preview</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* 1. First and last name */}
                <div>
                  <label
                    htmlFor="req-fullname"
                    className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                  >
                    1. First and Last Name *
                  </label>
                  <input
                    id="req-fullname"
                    type="text"
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
                      htmlFor="req-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      2. Phone Number *
                    </label>
                    <input
                      id="req-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(559) 000-0000"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="req-email"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      3. Email Address *
                    </label>
                    <input
                      id="req-email"
                      type="email"
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
                      htmlFor="req-contact-method"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      4. Preferred Contact Method
                    </label>
                    <select
                      id="req-contact-method"
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
                      htmlFor="req-trailer"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      5. Trailer Selection
                    </label>
                    <select
                      id="req-trailer"
                      value={selectedTrailer}
                      onChange={(e) => onTrailerChange(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="">
                        Select a trailer (or help me choose)...
                      </option>
                      {fleet.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                      <option value="Not sure yet — please help me choose">
                        Not sure yet — please help me choose
                      </option>
                    </select>
                  </div>
                </div>

                {/* 6. Requested pickup date & 7. Requested return date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="req-pickup-date"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      6. Requested Pickup Date
                    </label>
                    <input
                      id="req-pickup-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="req-return-date"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      7. Requested Return Date
                    </label>
                    <input
                      id="req-return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                {/* 8. Tow vehicle & 9. Pickup or delivery preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="req-tow-vehicle"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      8. Tow Vehicle
                    </label>
                    <input
                      id="req-tow-vehicle"
                      type="text"
                      value={towVehicle}
                      onChange={(e) => setTowVehicle(e.target.value)}
                      placeholder="e.g., Ford F-150 / Chevy 2500"
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="req-delivery-pref"
                      className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                    >
                      9. Pickup or Delivery Preference
                    </label>
                    <select
                      id="req-delivery-pref"
                      value={pickupOrDelivery}
                      onChange={(e) => setPickupOrDelivery(e.target.value)}
                      className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Pickup in Madera, CA">
                        Pickup in Madera, CA
                      </option>
                      <option value="Inquire about local delivery (if offered)">
                        Inquire about local delivery (if offered)
                      </option>
                      <option value="Flexible — discuss with owner">
                        Flexible — discuss with owner
                      </option>
                    </select>
                  </div>
                </div>

                {/* 10. Additional details */}
                <div>
                  <label
                    htmlFor="req-details"
                    className="block text-xs font-bold uppercase tracking-wider text-steel-700 mb-1.5"
                  >
                    10. Additional Details
                  </label>
                  <textarea
                    id="req-details"
                    rows={3}
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Share what you plan to haul, preferred pickup time window, or any questions for the owner..."
                    className="w-full rounded-xl bg-steel-50 border border-steel-300 px-4 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-base py-4 px-6 shadow-md transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Rental Request (Demo Preview)</span>
                </button>
              </form>
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
              <span className="text-xs text-steel-400 mt-1 block">
                {settings.locationFull} • Instagram:{" "}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline"
                >
                  {settings.instagramHandle}
                </a>
              </span>
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
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-steel-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.legalName}. Visual MVP
            Demo Concept — {settings.locationFull}.
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
