"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { DEMO_FAQS } from "@/data/demo-fleet";
import { FaqEntry } from "@/types/cms";

interface FaqSectionProps {
  faqs?: FaqEntry[];
}

export function FaqSection({ faqs = DEMO_FAQS }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 bg-steel-50 border-b border-steel-200 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            Common Rental Questions
          </h2>
          <p className="text-sm sm:text-base text-steel-600 max-w-2xl mx-auto leading-relaxed">
            Click any question below to view how answers will be presented.
            Policy-specific answers use clear placeholders until verified by the
            business owner.
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "bg-white border-brand-400 shadow-md"
                    : "bg-white border-steel-200 hover:border-steel-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display text-base sm:text-lg font-extrabold text-steel-900">
                      {faq.question}
                    </span>
                    <span className="rounded-full bg-steel-100 border border-steel-200 px-2.5 py-0.5 text-[11px] font-semibold text-steel-600">
                      {faq.badgeText}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-steel-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-steel-100 text-sm sm:text-base text-steel-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
