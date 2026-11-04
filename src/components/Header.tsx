"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Menu,
  X,
  Truck,
  MessageSquare,
  MapPin,
  Info,
  Shield,
  Sliders,
} from "lucide-react";
import { BusinessSettings } from "@/types/cms";
import { DEFAULT_BUSINESS_SETTINGS } from "@/lib/site-data";
import { useSiteData } from "@/context/SiteDataContext";

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
  const { adminUser, changeCount } = useSiteData();

  return (
    <>
      {/* Top Concept Notice & Admin Portal Strip */}
      <div className="bg-steel-950 text-steel-200 border-b border-steel-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {settings.isVisualMvpDemo && (
              <>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 border border-brand-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-brand-300 uppercase tracking-wider">
                  Visual MVP Demo
                </span>
                <span className="text-steel-300 hidden sm:inline">
                  Concept preview for{" "}
                  <strong className="text-white font-semibold">
                    {settings.legalName}
                  </strong>
                </span>
              </>
            )}
            {changeCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                {changeCount} Live Admin {changeCount === 1 ? "Edit" : "Edits"}{" "}
                Active (Until Refresh)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden md:inline-flex items-center gap-1 text-steel-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              {settings.locationFull}
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg bg-steel-800 hover:bg-brand-600 border border-steel-700 hover:border-brand-500 px-3 py-1 text-xs font-bold text-white transition-colors"
            >
              {adminUser ? (
                <>
                  <Sliders className="w-3.5 h-3.5 text-brand-400" />
                  <span>
                    Open Admin Dashboard ({adminUser.email.split("@")[0]})
                  </span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-brand-400" />
                  <span>Admin Login</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

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

            {/* Desktop Prominent Phone / Book Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={
                  settings.contactPhoneTel
                    ? `tel:${settings.contactPhoneTel}`
                    : "#contact"
                }
                className="inline-flex items-center gap-2.5 rounded-xl bg-steel-900 hover:bg-steel-800 text-white px-4 py-2.5 text-sm font-semibold transition-all shadow-sm"
                title="Phone number (editable from Admin Dashboard)"
              >
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-white">
                    {settings.contactPhoneDisplay}
                  </div>
                  <div className="text-[10px] font-medium text-brand-300 uppercase tracking-wider">
                    Call or Text
                  </div>
                </div>
              </a>
              <a
                href="#booking-form"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 text-sm font-bold shadow-sm transition-all"
              >
                Book a Trailer
              </a>
            </div>

            {/* Mobile Header Right Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-steel-100 hover:bg-steel-200 border border-steel-300 px-3 py-2 text-xs font-bold text-steel-800"
                aria-label="Contact Phone"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span className="hidden sm:inline">
                  {settings.contactPhoneDisplay}
                </span>
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
                    {settings.contactPhoneDisplay}
                  </span>
                </a>
                <a
                  href="#booking-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3.5 text-sm font-bold shadow-sm"
                >
                  Book a Trailer
                </a>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-steel-100 hover:bg-steel-200 border border-steel-300 text-steel-900 px-4 py-3 text-sm font-bold"
                >
                  <Shield className="w-4 h-4 text-brand-600" />
                  <span>
                    {adminUser ? "Open Admin Dashboard" : "Admin Login"}
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-steel-500 bg-steel-50 rounded-lg p-2.5 border border-steel-200">
                <Info className="w-4 h-4 text-brand-600 shrink-0" />
                <span>
                  Serving <strong>{settings.locationShort}</strong>. Phone,
                  hours, and inventory are adjustable in the Admin Dashboard.
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
