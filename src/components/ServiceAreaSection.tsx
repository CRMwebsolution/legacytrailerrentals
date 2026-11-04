import React from "react";
import { MapPin, CheckCircle2, Compass } from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

interface ServiceAreaSectionProps {
  settings?: BusinessSettings;
}

export function ServiceAreaSection({
  settings = DEFAULT_BUSINESS_SETTINGS,
}: ServiceAreaSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-steel-900 text-white p-6 sm:p-10 lg:p-12 border border-steel-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 border border-brand-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
                <Compass className="w-4 h-4" />
                <span>Service Area</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Proudly Based in{" "}
                <span className="text-brand-400">{settings.locationFull}</span>
              </h2>

              <p className="text-sm sm:text-base text-steel-300 leading-relaxed max-w-2xl">
                Our confirmed home base is{" "}
                <strong className="text-white">{settings.locationShort}</strong>
                . Space is built into this layout to highlight nearby
                communities and delivery radius options as soon as the business
                owner confirms which surrounding areas they serve.
              </p>

              {/* Confirmed Location Badge */}
              <div className="inline-flex items-center gap-3 rounded-2xl bg-steel-800/90 border border-brand-500/50 px-5 py-3.5">
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Confirmed Location
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {settings.locationFull}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Surrounding Service Area Placeholders */}
            <div className="lg:col-span-5 rounded-2xl bg-steel-950/80 border border-steel-800 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-steel-400">
                  Surrounding Service Area Slots
                </span>
                <span className="rounded bg-steel-800 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  Awaiting Owner List
                </span>
              </div>

              <div className="space-y-2.5">
                {settings.surroundingServiceAreas.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-2.5 rounded-xl bg-steel-900 border border-steel-800 px-3.5 py-2.5 text-xs font-medium text-steel-300"
                  >
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{slot.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-steel-400 leading-normal">
                * Additional cities have intentionally been left as placeholders
                until verified by {settings.legalName}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
