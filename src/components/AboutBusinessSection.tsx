import React from "react";
import {
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  ArrowRight,
  Globe,
  Share2,
} from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

interface AboutBusinessSectionProps {
  settings?: BusinessSettings;
}

export function AboutBusinessSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
}: AboutBusinessSectionProps) {
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
    <section className="py-16 sm:py-20 bg-white border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Owner / Business Photo Placeholder + Official Logo Badge */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-steel-100 border-2 border-dashed border-steel-300 p-6 sm:p-8 aspect-[4/3] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-2xl bg-white border border-steel-200 p-2 flex items-center justify-center shadow-sm">
                <img
                  src={settings.logoUrl}
                  alt={`${settings.legalName} Official Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-0.5 text-xs font-bold text-amber-900">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Owner / Yard Photo Placeholder
                </span>
                <h3 className="font-display text-lg font-extrabold text-steel-900">
                  Owner or Fleet Photo Slot
                </h3>
                <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                  Reserved for a photo of the business owner, pickup yard, or
                  branded trailer lineup in {settings.locationFull}.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Introductory Copy Based Strictly on Provided Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              <MapPin className="w-3.5 h-3.5" />
              <span>About the Business • {settings.locationFull}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
              Local Trailer Rentals Built on Simple, Personal Service
            </h2>

            <p className="text-sm sm:text-base text-steel-700 leading-relaxed">
              <strong>{settings.legalName}</strong> is a local trailer rental
              business serving <strong>{settings.locationFull}</strong>. Whether
              you are hauling materials, handling a weekend project, or
              transporting equipment, our focus is on offering affordable rental
              options and a simple online booking experience.
            </p>

            <p className="text-sm sm:text-base text-steel-600 leading-relaxed">
              Choose your trailer, review and sign the rental agreement during
              booking, and count on helpful personal service from a local{" "}
              {settings.confirmedCity} business.
            </p>

            <div className="rounded-xl bg-steel-50 border border-steel-200 p-4 text-xs text-steel-600">
              <strong className="text-steel-900 font-bold">
                Owner Story Placeholder Note:
              </strong>{" "}
              Additional background details or a personal message from the owner
              can be added here once supplied. No personal biography or founding
              story has been invented for this demo.
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-steel-900 hover:bg-steel-800 text-white font-bold text-sm px-6 py-3.5 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-brand-400" />
                <span>Contact the Owner</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-steel-100 hover:bg-steel-200 border border-steel-300 text-steel-800 font-bold text-sm px-5 py-3.5 transition-colors"
              >
                <span>Instagram: {settings.instagramHandle}</span>
              </a>
              {hasFacebook && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 font-bold text-sm px-5 py-3.5 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-brand-600" />
                  <span>{settings.facebookLabel || "Facebook"}</span>
                </a>
              )}
              {hasGoogleBusiness && (
                <a
                  href={settings.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 font-bold text-sm px-5 py-3.5 transition-colors"
                >
                  <Globe className="w-4 h-4 text-brand-600" />
                  <span>
                    {settings.googleBusinessLabel || "Google Business Profile"}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
