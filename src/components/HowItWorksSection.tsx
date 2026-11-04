import React from "react";
import {
  Search,
  CalendarCheck,
  Truck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Choose a Trailer",
    description:
      "Browse the trailer categories and specifications to find the right size and style for your load, project, or tow vehicle.",
    icon: Search,
    badge: "Step 1",
  },
  {
    number: "02",
    title: "Book",
    description:
      "Select your pickup and return dates, review and sign the trailer's rental agreement, and complete your online payment.",
    icon: CalendarCheck,
    badge: "Step 2",
  },
  {
    number: "03",
    title: "Pick Up",
    description:
      "Arrive in Madera at your scheduled time (or coordinate your requested delivery) to hook up your trailer and start your job.",
    icon: Truck,
    badge: "Step 3",
  },
  {
    number: "04",
    title: "Return",
    description:
      "Bring the trailer back clean and on schedule when your haul is finished.",
    icon: RotateCcw,
    badge: "Step 4",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 bg-white border-b border-steel-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            Simple 4-Step Process
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-steel-600 leading-relaxed">
            Choose your trailer, sign your rental agreement and book online,
            pick up in Madera, and return when your project is done.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-steel-50 border border-steel-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-steel-900 text-brand-400 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-3xl font-black text-steel-300">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block rounded-md bg-white border border-steel-200 px-2.5 py-0.5 text-[11px] font-semibold text-steel-600 mb-2.5">
                    {step.badge}
                  </span>

                  <h3 className="font-display text-lg font-extrabold text-steel-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-steel-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-end mt-4 text-xs font-semibold text-brand-600">
                    <span>Next step</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
