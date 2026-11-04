import React from "react";
import { Truck, ClipboardList, Phone, MessageSquare } from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

interface FinalCtaSectionProps {
  settings?: BusinessSettings;
}

export function FinalCtaSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
}: FinalCtaSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-steel-950/25 border border-white/25 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Ready to Plan Your Haul?
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Need a Trailer in {settings.locationFull}?
        </h2>

        <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed">
          Browse our trailer styles, submit a rental request with your preferred
          dates, or call, text, or message{" "}
          <strong>{settings.legalName}</strong> directly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 max-w-3xl mx-auto">
          <a
            href="#trailers"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-steel-950 hover:bg-steel-900 text-white font-bold text-sm sm:text-base px-6 py-4 shadow-lg transition-all"
          >
            <Truck className="w-5 h-5 text-brand-400" />
            <span>Browse Trailer Selection</span>
          </a>

          <a
            href="#rental-request"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-steel-50 text-steel-950 font-bold text-sm sm:text-base px-6 py-4 shadow-lg transition-all"
          >
            <ClipboardList className="w-5 h-5 text-brand-600" />
            <span>Submit a Rental Request</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-steel-950/25 hover:bg-steel-950/40 border border-white/35 text-white font-bold text-sm sm:text-base px-6 py-4 transition-all"
          >
            <Phone className="w-4 h-4" />
            <MessageSquare className="w-4 h-4" />
            <span>Call, Text, or Message Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
