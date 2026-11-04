/**
 * Database & Admin-CMS Ready Data Models for Legacy Trailer Rentals LLC.
 *
 * Every entity below is designed so that when a database (e.g. Supabase) and
 * Admin Dashboard are connected later, the admin can dynamically create,
 * update, reorder, or toggle:
 *  - Business Settings (phone numbers, email, hours, pickup address, logo, socials, service areas)
 *  - Trailer Inventory (add/edit/hide trailers, specs, dimensions, tow requirements)
 *  - Trailer Photos (upload multiple photos per trailer, set primary cover, reorder captions)
 *  - Pricing Rules (change daily/weekly/monthly rates, deposits, and add-on fees per trailer)
 *  - Rental Policies & FAQs (edit policy blocks and FAQ accordions)
 *  - Contracts (full CRUD on rental contract templates, clauses, and e-signature requirements)
 */

export type TrailerCategoryName =
  | "Dump Trailers"
  | "Utility Trailers"
  | "Car Haulers"
  | "Equipment"
  | "Enclosed Cargo"
  | (string & {});

export type TrailerFilterCategory = "All" | TrailerCategoryName;

/**
 * Editable from Admin -> Settings tab (`business_settings` table)
 */
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

/**
 * Editable from Admin -> Inventory -> Photos manager (`inventory_photos` table + storage bucket)
 */
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

/**
 * Editable from Admin -> Inventory -> Pricing tab (`pricing_rules` table)
 */
export interface TrailerPricingRule {
  id: string;
  inventoryId: string;
  rateType: "daily" | "weekly" | "monthly" | "security_deposit" | "addon";
  amount: number | null; // null while in placeholder mode; numeric(10,2) in DB
  displayLabel: string; // e.g., "$XX / day" in demo mode, or formatted "$125 / day" from DB
  note?: string;
  isActive: boolean;
}

/**
 * Editable from Admin -> Inventory tab (`inventory` table)
 */
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

  // Joined relations managed via Admin Dashboard
  photos: TrailerPhoto[];
  pricingRules: TrailerPricingRule[];
  defaultContractId?: string | null;
}

/**
 * Editable from Admin -> Policies / Content Blocks tab (`policy_sections` table)
 */
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

/**
 * Editable from Admin -> FAQ tab (`faqs` table)
 */
export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  badgeText: string;
  sortOrder: number;
  isActive: boolean;
}

/**
 * Editable from Admin -> Contracts CRUD tab (`contracts` table)
 * Included in the data layer now so future contract CRUD + booking assignment
 * plugs directly into `TrailerInventoryItem.defaultContractId` without refactoring.
 */
export interface ContractTemplate {
  id: string;
  title: string;
  slug: string;
  version: string;
  description: string;
  bodyContent: string;
  requiresDriverLicense: boolean;
  requiresInsuranceProof: boolean;
  requiresSignature: boolean;
  isActive: boolean;
  updatedAt: string;
}

/**
 * Unified payload returned by the data layer (`getSiteData()`) to render the site.
 */
export interface SiteDataPayload {
  settings: BusinessSettings;
  categories: TrailerFilterCategory[];
  fleet: TrailerInventoryItem[];
  policies: RentalPolicySection[];
  faqs: FaqEntry[];
  contracts: ContractTemplate[];
}
