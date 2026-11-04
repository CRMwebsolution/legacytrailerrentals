/**
 * Database & Admin-Ready Data Models for Legacy Trailer Rentals LLC.
 *
 * Every entity below is structured so the Admin Dashboard can dynamically
 * manage:
 *  - Business Settings (phone numbers, email, hours, pickup address, logo, socials, service areas)
 *  - Trailer Inventory (add/edit/hide trailers, specs, dimensions, tow requirements)
 *  - Per-Trailer Rental Contract (each trailer has its own customizable contract signed at booking before payment)
 *  - Trailer Photos (upload multiple photos per trailer, set primary cover, reorder captions)
 *  - Pricing Rules (change daily/weekly/monthly rates, deposits, and add-on fees per trailer)
 *  - Rental Policies & FAQs (edit policy blocks and FAQ accordions)
 */

export type TrailerCategoryName =
  | "Dump Trailers"
  | "Utility Trailers"
  | "Car Haulers"
  | "Equipment"
  | "Enclosed Cargo"
  | (string & {});

export type TrailerFilterCategory = "All" | TrailerCategoryName;

export interface BusinessSettings {
  id: string;
  businessName: string;
  legalName: string;
  logoUrl: string;
  confirmedCity: string;
  confirmedState: string;
  confirmedStateAbbr: string;
  locationFull: string;
  locationShort: string;

  // Contact & Hours (Editable in Admin)
  contactPhoneDisplay: string;
  contactPhoneTel: string;
  contactEmailDisplay: string;
  pickupAddressDisplay: string;
  businessHoursDisplay: string;

  // Social & Directory Links (Editable in Admin)
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  facebookLabel: string;
  googleBusinessUrl: string;
  googleBusinessLabel: string;

  // Service Area (Editable in Admin)
  surroundingServiceAreas: {
    id: string;
    name: string;
    isVerified: boolean;
  }[];

  // Hero & Banner Copy (Editable in Admin)
  heroHeadline: string;
  heroHighlightText: string;
  heroSubheadline: string;
  isVisualMvpDemo: boolean;
}

export interface TrailerPhoto {
  id: string;
  inventoryId: string;
  url: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
  sortOrder: number;
  isPlaceholder: boolean;
}

export interface TrailerPricingRule {
  id: string;
  inventoryId: string;
  rateType: "daily" | "weekly" | "monthly" | "security_deposit" | "addon";
  amount: number | null;
  displayLabel: string;
  note?: string;
  isActive: boolean;
}

/**
 * Per-trailer rental contract (managed per individual trailer in the Admin Dashboard
 * and signed by the customer during booking before online payment).
 */
export interface TrailerContract {
  title: string;
  version: string;
  summary: string;
  termsBody: string;
  requiresDriverLicense: boolean;
  requiresInsuranceProof: boolean;
  requiresSignature: boolean;
  updatedAt: string;
}

export interface TrailerInventoryItem {
  id: string;
  slug: string;
  name: string;
  category: TrailerCategoryName;
  isActive: boolean;
  isDemoPlaceholder: boolean;
  sortOrder: number;
  dimensions: string;
  capacityOrFeature: string;
  basicSpecs: string[];
  availabilityStatusText: string;
  summary: string;
  searchKeywords: string[];

  // Per-trailer relations managed via Admin Dashboard
  photos: TrailerPhoto[];
  pricingRules: TrailerPricingRule[];
  contract: TrailerContract;
}

export interface RentalPolicySection {
  id: string;
  slug: string;
  title: string;
  statusLabel: string;
  iconKey: "clock" | "file" | "card" | "truck";
  items: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  badgeText: string;
  sortOrder: number;
  isActive: boolean;
}

export interface SiteDataPayload {
  settings: BusinessSettings;
  categories: TrailerFilterCategory[];
  fleet: TrailerInventoryItem[];
  policies: RentalPolicySection[];
  faqs: FaqEntry[];
}
