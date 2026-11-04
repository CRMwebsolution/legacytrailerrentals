import React from "react";
import { MapPin, Wallet, CalendarCheck, UserCheck } from "lucide-react";

const BENEFITS = [
  {
    title: "Locally serving Madera",
    description:
      "Based right here in Madera, California, making local trailer pickup and return convenient for homeowners, property owners, and local crews.",
    icon: MapPin,
  },
  {
    title: "Affordable rental options",
    description:
      "Practical daily and multi-day trailer rental options so you can tackle hauling jobs without the expense of buying and storing a trailer.",
    icon: Wallet,
  },
  {
    title: "Simple online booking",
    description:
      "Choose your trailer and dates, sign your rental agreement digitally, and complete payment in one clear booking flow.",
    icon: CalendarCheck,
  },
  {
    title: "Helpful personal service",
    description:
      "Reach out directly whenever you have questions about tow vehicle compatibility, hitch requirements, or scheduling.",
    icon: UserCheck,
  },
];

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-20 bg-white border-b border-steel-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            Why Choose Legacy
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            Dependable Local Trailer Rentals in Madera
          </h2>
          <p className="text-sm sm:text-base text-steel-600 leading-relaxed">
            Built around clear communication, practical rental options, and
            attentive local support.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-2xl bg-steel-50 border border-steel-200/90 p-6 space-y-4 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-extrabold text-steel-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-steel-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
