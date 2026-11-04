"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FleetPreviewSection } from "@/components/FleetPreviewSection";
import { SelectionAssistanceCallout } from "@/components/SelectionAssistanceCallout";
import { TrustHighlightsStrip } from "@/components/TrustHighlightsStrip";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { RentalInfoPreviewSection } from "@/components/RentalInfoPreviewSection";
import { AboutBusinessSection } from "@/components/AboutBusinessSection";
import { FaqSection } from "@/components/FaqSection";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { ContactAndFooterSection } from "@/components/ContactAndFooterSection";
import { getInitialSiteData } from "@/lib/site-data";

export default function HomePage() {
  // Single data-layer payload ready to be swapped with database/Supabase queries
  const siteData = useMemo(() => getInitialSiteData(), []);
  const [selectedTrailer, setSelectedTrailer] = useState<string>("");

  const handleSelectTrailerForRequest = (trailerName: string) => {
    setSelectedTrailer(trailerName);
  };

  const handleSelectNeedHelp = () => {
    setSelectedTrailer("Not sure yet — please help me choose");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header & Sticky Mobile Action Bar */}
      <Header settings={siteData.settings} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection settings={siteData.settings} />

        {/* 3. How It Works */}
        <HowItWorksSection />

        {/* 4. Trailer Fleet Preview (Visual Centerpiece + Gallery Showcase) */}
        <FleetPreviewSection
          fleet={siteData.fleet}
          categories={siteData.categories}
          onSelectTrailerForRequest={handleSelectTrailerForRequest}
        />

        {/* 5. Trailer-Selection Assistance */}
        <SelectionAssistanceCallout
          settings={siteData.settings}
          onSelectNeedHelp={handleSelectNeedHelp}
        />

        {/* 6. Trust or Business Highlights */}
        <TrustHighlightsStrip />

        {/* 7. Why Choose Legacy */}
        <WhyChooseUsSection />

        {/* 8. Rental Information Preview */}
        <RentalInfoPreviewSection policies={siteData.policies} />

        {/* 9. About the Business */}
        <AboutBusinessSection settings={siteData.settings} />

        {/* 10. Frequently Asked Questions */}
        <FaqSection faqs={siteData.faqs} />

        {/* 11. Service Area */}
        <ServiceAreaSection settings={siteData.settings} />

        {/* 12. Final CTA */}
        <FinalCtaSection settings={siteData.settings} />
      </main>

      {/* 13. Contact, Rental-Request Form Preview, and Footer */}
      <ContactAndFooterSection
        settings={siteData.settings}
        fleet={siteData.fleet}
        selectedTrailer={selectedTrailer}
        onTrailerChange={setSelectedTrailer}
      />
    </div>
  );
}
