import React from "react";
import { HelpCircle, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

interface SelectionAssistanceCalloutProps {
  settings?: BusinessSettings;
  onSelectNeedHelp: () => void;
}

export function SelectionAssistanceCallout({
  settings = DEFAULT_BUSINESS_SETTINGS,
  onSelectNeedHelp,
}: SelectionAssistanceCalloutProps) {
  return (
    <section className="py-10 sm:py-12 bg-white border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-steel-900 via-steel-900 to-steel-800 text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-steel-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-400">
                Trailer-Selection Assistance
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Not sure which trailer fits your tow vehicle or job?
              </h2>
              <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
                Tell us what you are hauling and what truck or SUV you drive. We
                will help you choose the right trailer style, hitch size, and
                capacity for your project in {settings.confirmedCity}.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="#booking-form"
              onClick={onSelectNeedHelp}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-6 py-3.5 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask for Trailer Advice</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={
                settings.contactPhoneTel
                  ? `tel:${settings.contactPhoneTel}`
                  : "#contact"
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-steel-800 hover:bg-steel-700 text-white border border-steel-600 font-bold text-sm px-5 py-3.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              <span>{settings.contactPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
