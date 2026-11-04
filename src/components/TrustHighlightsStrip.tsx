import React from "react";
import { MapPin, Truck, ShieldCheck, Clock } from "lucide-react";

const TRUST_ITEMS = [
  {
    label: "Confirmed Base Location",
    value: "Madera, CA",
    subtext: "Local pickup & return in Madera, California",
    isPlaceholder: false,
    icon: MapPin,
  },
  {
    label: "Fleet Size / Categories",
    value: "[Owner Stat Placeholder]",
    subtext: "Confirmed trailer count & types coming from owner",
    isPlaceholder: true,
    icon: Truck,
  },
  {
    label: "Request Response Time",
    value: "[Owner Window Placeholder]",
    subtext: "Direct availability confirmation window TBD",
    isPlaceholder: true,
    icon: Clock,
  },
  {
    label: "Customer Reviews / History",
    value: "[Reviews Placeholder]",
    subtext: "Reserved for verified Google Business reviews",
    isPlaceholder: true,
    icon: ShieldCheck,
  },
];

export function TrustHighlightsStrip() {
  return (
    <section
      aria-label="Business highlights and trust placeholders"
      className="py-10 bg-steel-950 text-white border-b border-steel-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Business Highlights &amp; Metric Slots
          </p>
          <p className="text-xs text-steel-400">
            * Unverified figures are shown strictly as placeholders until
            confirmed by the owner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl bg-steel-900/90 border border-steel-800 p-4 sm:p-5 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-steel-800 border border-steel-700 text-brand-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-steel-400">
                      {item.label}
                    </span>
                    {item.isPlaceholder && (
                      <span className="rounded bg-steel-800 border border-steel-700 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                        Placeholder
                      </span>
                    )}
                  </div>
                  <p className="font-display text-base sm:text-lg font-extrabold text-white mt-1 truncate">
                    {item.value}
                  </p>
                  <p className="text-xs text-steel-400 mt-0.5 leading-snug">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
