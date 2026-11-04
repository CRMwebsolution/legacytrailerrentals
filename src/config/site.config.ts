/**
 * Centralized default configuration for Legacy Trailer Rentals LLC.
 *
 * When a database is connected later, these values serve as the initial seed
 * and fallback defaults for the `business_settings` table managed via the
 * Admin Dashboard.
 */

export const SITE_CONFIG = {
  // Confirmed Business Identity & Official Logo
  BUSINESS_NAME: "Legacy Trailer Rentals",
  LEGAL_NAME: "Legacy Trailer Rentals LLC",
  LOGO_URL: "/images/logo.jpg",
  CONFIRMED_CITY: "Madera",
  CONFIRMED_STATE: "California",
  CONFIRMED_STATE_ABBR: "CA",
  LOCATION_FULL: "Madera, California",
  LOCATION_SHORT: "Madera, CA",

  // Confirmed Social Profile
  INSTAGRAM_HANDLE: "@legacytrailerrentalz",
  INSTAGRAM_URL: "https://instagram.com/legacytrailerrentalz",

  // Admin-Adjustable Placeholders (To be updated via Admin Dashboard or owner config)
  CONTACT_PHONE_DISPLAY: "(559) XXX-XXXX (Phone Placeholder)",
  CONTACT_PHONE_TEL: "",
  CONTACT_PHONE_BUTTON_LABEL: "Call / Text: (559) XXX-XXXX (Placeholder)",
  CONTACT_EMAIL_DISPLAY: "contact@legacytrailerrentals-demo.com (Placeholder)",
  PICKUP_ADDRESS_DISPLAY: "Madera, CA — Pickup Location Details Coming from Owner",
  BUSINESS_HOURS_DISPLAY: "Hours of Operation — Details Coming from Owner",
  GOOGLE_BUSINESS_PLACEHOLDER_LABEL: "Google Business Profile (Link Placeholder)",
  FACEBOOK_PLACEHOLDER_LABEL: "Facebook Page (Link Placeholder)",

  // Terminology
  ITEM_LABEL_SINGULAR: "Trailer",
  ITEM_LABEL_PLURAL: "Trailers",
  TIMEZONE: "America/Los_Angeles",
  CURRENCY: "usd",

  // Demo Status Flag
  IS_VISUAL_MVP_DEMO: true,
} as const;

export type TrailerCategory =
  | "All"
  | "Dump Trailers"
  | "Utility Trailers"
  | "Car Haulers"
  | "Equipment"
  | "Enclosed Cargo";

export const TRAILER_CATEGORIES: TrailerCategory[] = [
  "All",
  "Dump Trailers",
  "Utility Trailers",
  "Car Haulers",
  "Equipment",
  "Enclosed Cargo",
];
