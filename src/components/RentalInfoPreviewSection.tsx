import React from "react";
import {
  Clock,
  FileCheck2,
  CreditCard,
  Truck,
  Info,
} from "lucide-react";
import { DEMO_POLICY_SECTIONS } from "@/data/demo-fleet";
import { RentalPolicySection } from "@/types/cms";

const ICON_MAP = {
  clock: Clock,
  file: FileCheck2,
  card: CreditCard,
  truck: Truck,
};

interface RentalInfoPreviewSectionProps {
  policies?: RentalPolicySection[];
}

export function RentalInfoPreviewSection({
  policies = DEMO_POLICY_SECTIONS,
}: RentalInfoPreviewSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-steel-50 border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-steel-200 border border-steel-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-steel-800">
              Rental Information Preview
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
              What to Know Before You Rent
            </h2>
            <p className="text-sm sm:text-base text-steel-600 leading-relaxed">
              This section demonstrates where important rental policies and
              preparation checklists will appear once finalized by the business
              owner.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs font-semibold text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>No policies have been invented—awaiting owner specifics.</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((card) => {
            const Icon = ICON_MAP[card.iconKey] ?? FileCheck2;
            return (
              <div
                key={card.id}
                className="rounded-2xl bg-white border border-steel-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-steel-900 text-brand-400 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-steel-900">
                        {card.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900">
                      {card.statusLabel}
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-steel-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-steel-100 flex items-center justify-between text-xs text-steel-500">
                  <span>Policy slot ready for owner / Admin CMS copy</span>
                  <a
                    href="#contact"
                    className="font-bold text-brand-600 hover:text-brand-700"
                  >
                    Ask a question &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
