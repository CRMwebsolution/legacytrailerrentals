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
import { useSiteData } from "@/context/SiteDataContext";

export default function HomePage() {
  const { siteData } = useSiteData();
  const [selectedTrailer, setSelectedTrailer] = useState<string>("");

  const activeFleet = useMemo(
    () =>
      siteData.fleet
        .filter((item) => item.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [siteData.fleet]
  );

  const activePolicies = useMemo(
    () =>
      siteData.policies
        .filter((p) => p.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [siteData.policies]
  );

  const activeFaqs = useMemo(
    () =>
      siteData.faqs
        .filter((f) => f.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [siteData.faqs]
  );

  const handleSelectTrailerForBooking = (trailerName: string) => {
    setSelectedTrailer(trailerName);
  };

  const handleSelectNeedHelp = () => {
    setSelectedTrailer("Not sure yet (please help me choose)");
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
          fleet={activeFleet}
          categories={siteData.categories}
          onSelectTrailerForBooking={handleSelectTrailerForBooking}
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
        <RentalInfoPreviewSection policies={activePolicies} />

        {/* 9. About the Business */}
        <AboutBusinessSection settings={siteData.settings} />

        {/* 10. Frequently Asked Questions */}
        <FaqSection faqs={activeFaqs} />

        {/* 11. Service Area */}
        <ServiceAreaSection settings={siteData.settings} />

        {/* 12. Final CTA */}
        <FinalCtaSection settings={siteData.settings} />
      </main>

      {/* 13. Contact, Online Booking, Contract Signature, Mock Payment & Footer */}
      <ContactAndFooterSection
        settings={siteData.settings}
        fleet={activeFleet}
        selectedTrailer={selectedTrailer}
        onTrailerChange={setSelectedTrailer}
      />
    </div>
  );
}
