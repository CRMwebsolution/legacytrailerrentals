"use client";

import React, { useState } from "react";
import {
  Phone,
  Menu,
  X,
  Truck,
  MessageSquare,
  MapPin,
  Info,
} from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";

const NAV_LINKS = [
  { label: "Trailers", href: "#trailers" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  settings?: BusinessSettings;
}

export function Header({ settings = DEFAULT_BUSINESS_SETTINGS }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Concept Notice Strip */}
      {settings.isVisualMvpDemo && (
        <div className="bg-steel-950 text-steel-200 border-b border-steel-800 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 border border-brand-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-brand-300 uppercase tracking-wider">
                Visual MVP Demo
              </span>
              <span className="text-steel-300">
                Concept preview for{" "}
                <strong className="text-white font-semibold">
                  {settings.legalName}
                </strong>{" "}
                — Fleet, pricing &amp; policies shown as placeholders.
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-steel-400">
              <span className="inline-flex items-center gap-1 text-steel-300">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                {settings.locationFull}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-steel-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Business Logo (/images/logo.jpg) + Brand Title */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-14 h-14 rounded-xl bg-white border border-steel-200 p-1 flex items-center justify-center shadow-sm overflow-hidden shrink-0 group-hover:border-brand-500 transition-colors">
                <img
                  src={settings.logoUrl}
                  alt={`${settings.legalName} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-base sm:text-xl tracking-tight text-steel-900 leading-none">
                    {settings.businessName.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline-block rounded bg-steel-100 border border-steel-300 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-steel-700">
                    LLC
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-brand-700">
                    {settings.locationFull}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-7"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-steel-700 hover:text-brand-600 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Prominent Phone / Contact Placeholder Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={
                  settings.contactPhoneTel
                    ? `tel:${settings.contactPhoneTel}`
                    : "#contact"
                }
                className="inline-flex items-center gap-2.5 rounded-xl bg-steel-900 hover:bg-steel-800 text-white px-4 py-2.5 text-sm font-semibold transition-all shadow-sm"
                title="Phone number placeholder — adjustable from future Admin Settings"
              >
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-white">
                    (559) XXX-XXXX
                  </div>
                  <div className="text-[10px] font-medium text-brand-300 uppercase tracking-wider">
                    Phone Placeholder
                  </div>
                </div>
              </a>
              <a
                href="#rental-request"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 text-sm font-bold shadow-sm transition-all"
              >
                Request a Rental
              </a>
            </div>

            {/* Mobile Header Right Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-steel-100 hover:bg-steel-200 border border-steel-300 px-3 py-2 text-xs font-bold text-steel-800"
                aria-label="Contact Placeholder"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span className="hidden sm:inline">Phone Placeholder</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-xl p-2.5 text-steel-800 hover:bg-steel-100 border border-steel-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Compact Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-steel-200 bg-white shadow-xl">
            <div className="px-4 pt-3 pb-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-3.5 py-3 text-sm font-bold text-steel-800 bg-steel-50 hover:bg-brand-50 hover:text-brand-700 border border-steel-200/80 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-steel-200 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-steel-900 text-white px-4 py-3 text-sm font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-400" />
                    (559) XXX-XXXX
                  </span>
                  <span className="text-[11px] uppercase tracking-wider bg-steel-800 text-brand-300 px-2 py-0.5 rounded">
                    Phone Placeholder
                  </span>
                </a>
                <a
                  href="#rental-request"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3.5 text-sm font-bold shadow-sm"
                >
                  Request a Rental
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-steel-500 bg-steel-50 rounded-lg p-2.5 border border-steel-200">
                <Info className="w-4 h-4 text-brand-600 shrink-0" />
                <span>
                  Serving <strong>{settings.locationShort}</strong>. Phone,
                  hours, and inventory are structured for full Admin Dashboard
                  control.
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Mobile Action Bar (Bottom of Viewport on Mobile/Tablet) */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-steel-950/95 backdrop-blur-md border-t border-steel-800 px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
          <a
            href="#trailers"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm py-3.5 px-4 shadow-sm transition-colors"
          >
            <Truck className="w-4 h-4 shrink-0" />
            <span>View Trailers</span>
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 rounded-xl bg-steel-800 hover:bg-steel-700 active:bg-steel-600 text-white border border-steel-700 font-bold text-sm py-3.5 px-4 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </>
  );
}
