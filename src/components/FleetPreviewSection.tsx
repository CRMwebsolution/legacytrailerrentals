"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Camera,
  Ruler,
  Weight,
  Clock,
  ArrowRight,
  X,
  Info,
  SlidersHorizontal,
  Images,
} from "lucide-react";
import { TRAILER_CATEGORIES } from "@/config/site.config";
import { DEMO_FLEET_ITEMS } from "@/data/demo-fleet";
import {
  getPrimaryTrailerPhoto,
  getTrailerRateDisplay,
} from "@/lib/site-data";
import {
  TrailerFilterCategory,
  TrailerInventoryItem,
} from "@/types/cms";

interface FleetPreviewSectionProps {
  fleet?: TrailerInventoryItem[];
  categories?: TrailerFilterCategory[];
  onSelectTrailerForRequest: (trailerName: string) => void;
}

export function FleetPreviewSection({
  fleet = DEMO_FLEET_ITEMS,
  categories = [...TRAILER_CATEGORIES],
  onSelectTrailerForRequest,
}: FleetPreviewSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TrailerFilterCategory>("All");
  const [activeGalleryItem, setActiveGalleryItem] =
    useState<TrailerInventoryItem | null>(null);

  const filteredTrailers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return fleet.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [
        item.name,
        item.category,
        item.dimensions,
        item.capacityOrFeature,
        item.summary,
        ...item.basicSpecs,
        ...item.searchKeywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [fleet, searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: fleet.length };
    for (const item of fleet) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [fleet]);

  return (
    <section
      id="trailers"
      className="py-16 sm:py-24 bg-steel-50 border-b border-steel-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-steel-900 text-brand-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Trailer Fleet Preview (Demo Layout)
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-steel-900 tracking-tight">
              Explore Our Trailer Styles
            </h2>
            <p className="text-sm sm:text-base text-steel-600 leading-relaxed">
              Filter by category or search by trailer size and job type. When
              you find the right style, click{" "}
              <strong className="text-steel-900 font-semibold">
                Request This Trailer
              </strong>{" "}
              to check dates with our Madera team.
            </p>
          </div>

          {/* Explicit Demo Inventory Notice */}
          <div className="rounded-xl bg-amber-50 border border-amber-200/90 p-3.5 sm:p-4 max-w-md flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong className="font-bold">Placeholder Fleet Notice:</strong>{" "}
              All trailer names, specifications, rates, and photos below are
              sample placeholders to demonstrate the catalog layout until the
              owner supplies confirmed fleet details.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 bg-white rounded-2xl border border-steel-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
            {/* Search Field */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-steel-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trailers by type, size (e.g., 14', dump, car hauler, enclosed)..."
                aria-label="Search demo trailers"
                className="w-full rounded-xl bg-steel-50 border border-steel-300 pl-11 pr-10 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-steel-500 px-1">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>
                Showing{" "}
                <strong className="text-steel-900">
                  {filteredTrailers.length}
                </strong>{" "}
                of {fleet.length} sample cards
              </span>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Trailer category filters"
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-steel-900 text-white shadow-sm"
                      : "bg-steel-100 hover:bg-steel-200 text-steel-700"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      isSelected
                        ? "bg-brand-600 text-white"
                        : "bg-white text-steel-600"
                    }`}
                  >
                    {categoryCounts[category] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of Polished Trailer Cards */}
        {filteredTrailers.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white border border-steel-200 p-12 text-center space-y-4">
            <p className="font-display text-xl font-bold text-steel-900">
              No sample trailers match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-sm text-steel-600 max-w-md mx-auto">
              Try clearing your search or switching back to all trailer
              categories, or contact us directly if you need a specific trailer
              size.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTrailers.map((trailer) => {
              const primaryPhoto = getPrimaryTrailerPhoto(trailer);
              const dailyRateDisplay = getTrailerRateDisplay(trailer, "daily");
              const weeklyRateDisplay = getTrailerRateDisplay(
                trailer,
                "weekly"
              );

              return (
                <article
                  key={trailer.id}
                  className="group rounded-2xl bg-white border border-steel-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Large Image Area with Category Badge & Photo-Count Indicator */}
                    <div className="relative aspect-[16/10] w-full bg-steel-900 overflow-hidden">
                      <img
                        src={primaryPhoto.url}
                        alt={primaryPhoto.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-950/75 via-transparent to-steel-950/30" />

                      {/* Top Row: Category Badge & Placeholder Pill */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-lg bg-brand-600 text-white px-3 py-1 text-xs font-extrabold tracking-wide shadow-sm">
                          {trailer.category}
                        </span>
                        {primaryPhoto.isPlaceholder && (
                          <span className="inline-flex items-center rounded-lg bg-steel-950/80 backdrop-blur-md border border-steel-700 px-2.5 py-1 text-[11px] font-semibold text-steel-200">
                            Placeholder Photo
                          </span>
                        )}
                      </div>

                      {/* Bottom Row: Availability Text & Photo-Count Indicator */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-steel-950/85 backdrop-blur-md border border-steel-700 px-2.5 py-1 text-xs font-semibold text-white">
                          <span className="w-2 h-2 rounded-full bg-brand-400" />
                          {trailer.availabilityStatusText}
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveGalleryItem(trailer)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-steel-950/85 hover:bg-brand-600 backdrop-blur-md border border-steel-700 hover:border-brand-400 px-2.5 py-1 text-xs font-bold text-white transition-colors"
                          title="Preview photo gallery for this trailer"
                        >
                          <Camera className="w-3.5 h-3.5 text-brand-400 group-hover:text-white" />
                          <span>{trailer.photos.length} Photos</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Title */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg sm:text-xl font-extrabold text-steel-900 leading-snug">
                          {trailer.name}
                        </h3>
                      </div>

                      {/* Prominent Rate Placeholder Box (Driven by `pricingRules`) */}
                      <div className="rounded-xl bg-steel-50 border border-steel-200 p-3.5 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-steel-500 block">
                            Sample Rate Placeholder
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-display text-2xl font-black text-steel-900">
                              {dailyRateDisplay}
                            </span>
                            <span className="text-xs font-medium text-steel-500">
                              ({weeklyRateDisplay})
                            </span>
                          </div>
                        </div>
                        {trailer.isDemoPlaceholder && (
                          <span className="rounded-md bg-amber-100 border border-amber-300 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                            Owner Pricing TBD
                          </span>
                        )}
                      </div>

                      {/* Dimensions & Capacity / Important Feature */}
                      <div className="space-y-2.5 text-xs sm:text-sm">
                        <div className="flex items-start gap-2.5 text-steel-700">
                          <Ruler className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-steel-900">
                              Dimensions:{" "}
                            </span>
                            <span>{trailer.dimensions}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-steel-700">
                          <Weight className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-steel-900">
                              Capacity / Feature:{" "}
                            </span>
                            <span>{trailer.capacityOrFeature}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-steel-700">
                          <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-steel-900">
                              Availability:{" "}
                            </span>
                            <span>{trailer.availabilityStatusText}</span>
                          </div>
                        </div>
                      </div>

                      {/* Spec Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {trailer.basicSpecs.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-lg bg-steel-100 border border-steel-200 px-2.5 py-1 text-xs font-semibold text-steel-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2">
                    <a
                      href="#rental-request"
                      onClick={() => onSelectTrailerForRequest(trailer.name)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm py-3.5 px-4 shadow-sm transition-all"
                    >
                      <span>Request This Trailer</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Fleet Photo Gallery Preview Strip (#gallery anchor for Header Nav) */}
        <div
          id="gallery"
          className="mt-14 rounded-2xl bg-steel-900 text-white p-6 sm:p-8 border border-steel-800 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-steel-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
                <Images className="w-4 h-4" />
                <span>Fleet Photo Gallery Preview (Placeholder)</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold">
                Multi-Angle Trailer Photo Showcase
              </h3>
              <p className="text-xs sm:text-sm text-steel-400">
                Demonstrates where real walkaround photos uploaded via the
                future Admin Dashboard will appear. Click any photo to preview
                the gallery modal.
              </p>
            </div>
            <span className="shrink-0 self-start sm:self-center rounded-lg bg-steel-800 border border-steel-700 px-3 py-1.5 text-xs font-semibold text-brand-300">
              Admin-Editable Photo Slots
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {fleet.map((item) => {
              const cover = getPrimaryTrailerPhoto(item);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveGalleryItem(item)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-steel-800 border border-steel-700 hover:border-brand-400 transition-all text-left focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  <img
                    src={cover.url}
                    alt={cover.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-950/90 via-steel-950/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[11px] font-bold text-white truncate">
                      {item.category}
                    </p>
                    <p className="text-[10px] text-brand-300 font-medium">
                      {item.photos.length} Photo Slots
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Photo Slot Preview Modal */}
      {activeGalleryItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/80 backdrop-blur-sm p-4"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-steel-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-steel-200 bg-steel-50">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                  Demo Gallery Modal • {activeGalleryItem.photos.length} Photo
                  Slots
                </span>
                <h4
                  id="gallery-modal-title"
                  className="font-display text-lg font-extrabold text-steel-900"
                >
                  {activeGalleryItem.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveGalleryItem(null)}
                className="rounded-lg p-2 text-steel-500 hover:text-steel-900 hover:bg-steel-200"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-steel-900">
                <img
                  src={getPrimaryTrailerPhoto(activeGalleryItem).url}
                  alt={getPrimaryTrailerPhoto(activeGalleryItem).alt}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-steel-950/85 text-white px-3 py-1 text-xs font-bold">
                  Primary Placeholder Image
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-steel-500 mb-2.5">
                  Admin-Manageable Photo Slots ({activeGalleryItem.photos.length}{" "}
                  Total):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGalleryItem.photos.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="flex items-center gap-2.5 rounded-xl bg-steel-50 border border-steel-200 p-3 text-xs font-medium text-steel-700"
                    >
                      <span className="w-6 h-6 rounded-lg bg-steel-900 text-brand-400 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{photo.caption}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-steel-200">
                <button
                  type="button"
                  onClick={() => setActiveGalleryItem(null)}
                  className="rounded-xl border border-steel-300 px-4 py-2.5 text-xs font-bold text-steel-700 hover:bg-steel-100"
                >
                  Close Preview
                </button>
                <a
                  href="#rental-request"
                  onClick={() => {
                    onSelectTrailerForRequest(activeGalleryItem.name);
                    setActiveGalleryItem(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 text-xs font-bold"
                >
                  <span>Request This Trailer</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
