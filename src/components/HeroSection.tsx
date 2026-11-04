import React from "react";
import {
  ArrowRight,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Sparkles,
  Camera,
} from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

interface HeroSectionProps {
  settings?: BusinessSettings;
}

export function HeroSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
}: HeroSectionProps) {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden border-b border-steel-800">
      {/* Subtle radial glow background matching logo royal blue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.38), transparent 50%), radial-gradient(circle at 85% 75%, rgba(37, 99, 235, 0.22), transparent 45%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-steel-900/90 border border-steel-700 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-steel-200">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{settings.legalName}</span>
              <span className="text-steel-600">•</span>
              <span className="text-brand-300 font-semibold">
                {settings.locationFull}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              {settings.heroHeadline}{" "}
              <span className="text-brand-400">
                {settings.heroHighlightText}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-steel-300 max-w-2xl leading-relaxed">
              {settings.heroSubheadline}
            </p>

            {/* Small Trust / Value Line Below Headline */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-steel-300 border-l-2 border-brand-500 pl-3.5">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                Locally serving {settings.confirmedCity}
              </span>
              <span className="text-steel-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                Simple request-first process
              </span>
              <span className="text-steel-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                Personal availability confirmation
              </span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#trailers"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base px-7 py-4 shadow-lg shadow-brand-600/25 transition-all"
              >
                <span>View Trailers</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#rental-request"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-steel-900 hover:bg-steel-800 text-white border border-steel-700 font-bold text-base px-7 py-4 transition-all"
              >
                <ClipboardList className="w-5 h-5 text-brand-400" />
                <span>Request a Rental</span>
              </a>
            </div>

            {/* Clear Expectation Note */}
            <p className="text-xs text-steel-400 max-w-xl">
              * Submitting a rental request allows our team to review your dates
              and tow setup and follow up directly to confirm availability.
            </p>
          </div>

          {/* Right Column: Strong Trailer-Focused Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-steel-900 border border-steel-700/80 shadow-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full bg-steel-800">
                <img
                  src="/images/demo/hero-trailer.png"
                  alt="Sample heavy-duty trailer placeholder in Madera, CA"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/90 via-steel-950/20 to-transparent" />

                {/* Top Badge on Image */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-steel-950/85 backdrop-blur-md border border-steel-700 px-3 py-1.5 text-xs font-semibold text-white">
                    <Camera className="w-3.5 h-3.5 text-brand-400" />
                    Hero Photo Placeholder
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-brand-600/95 text-white px-2.5 py-1 text-xs font-bold">
                    {settings.locationShort}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl bg-steel-950/90 backdrop-blur-md border border-steel-800 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-400">
                        Featured Fleet Concept
                      </p>
                      <p className="text-sm font-semibold text-white mt-0.5">
                        Dump, Utility, Car Hauler &amp; Enclosed Styles
                      </p>
                      <p className="text-xs text-steel-400 mt-0.5">
                        Owner photos &amp; confirmed specs will replace demo
                        visuals
                      </p>
                    </div>
                    <a
                      href="#trailers"
                      className="shrink-0 rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-3.5 py-2 text-xs font-bold transition-colors"
                    >
                      Explore
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
