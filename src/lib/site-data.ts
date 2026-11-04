import { SITE_CONFIG, TRAILER_CATEGORIES } from "@/config/site.config";
import {
  DEMO_FAQS,
  DEMO_FLEET_ITEMS,
  DEMO_POLICY_SECTIONS,
} from "@/data/demo-fleet";
import {
  BusinessSettings,
  SiteDataPayload,
  TrailerInventoryItem,
  TrailerPhoto,
} from "@/types/cms";

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  id: "default-settings",
  businessName: SITE_CONFIG.BUSINESS_NAME,
  legalName: SITE_CONFIG.LEGAL_NAME,
  logoUrl: SITE_CONFIG.LOGO_URL,
  confirmedCity: SITE_CONFIG.CONFIRMED_CITY,
  confirmedState: SITE_CONFIG.CONFIRMED_STATE,
  confirmedStateAbbr: SITE_CONFIG.CONFIRMED_STATE_ABBR,
  locationFull: SITE_CONFIG.LOCATION_FULL,
  locationShort: SITE_CONFIG.LOCATION_SHORT,
  contactPhoneDisplay: SITE_CONFIG.CONTACT_PHONE_DISPLAY,
  contactPhoneTel: SITE_CONFIG.CONTACT_PHONE_TEL,
  contactEmailDisplay: SITE_CONFIG.CONTACT_EMAIL_DISPLAY,
  pickupAddressDisplay: SITE_CONFIG.PICKUP_ADDRESS_DISPLAY,
  businessHoursDisplay: SITE_CONFIG.BUSINESS_HOURS_DISPLAY,
  instagramHandle: SITE_CONFIG.INSTAGRAM_HANDLE,
  instagramUrl: SITE_CONFIG.INSTAGRAM_URL,
  facebookUrl: "",
  facebookLabel: SITE_CONFIG.FACEBOOK_PLACEHOLDER_LABEL,
  googleBusinessUrl: "",
  googleBusinessLabel: SITE_CONFIG.GOOGLE_BUSINESS_PLACEHOLDER_LABEL,
  surroundingServiceAreas: [
    {
      id: "area-slot-1",
      name: "Surrounding Community Slot #1 (Pending Owner Verification)",
      isVerified: false,
    },
    {
      id: "area-slot-2",
      name: "Surrounding Community Slot #2 (Pending Owner Verification)",
      isVerified: false,
    },
    {
      id: "area-slot-3",
      name: "Surrounding Community Slot #3 (Pending Owner Verification)",
      isVerified: false,
    },
    {
      id: "area-slot-4",
      name: "Surrounding Community Slot #4 (Pending Owner Verification)",
      isVerified: false,
    },
  ],
  heroHeadline: "Reliable Trailer Rentals in",
  heroHighlightText: "Madera, California",
  heroSubheadline:
    "Affordable rental options and a simple booking process for local hauling, property cleanup, moving, and vehicle or equipment transport. Choose your trailer below, sign the rental agreement, and book online.",
  isVisualMvpDemo: SITE_CONFIG.IS_VISUAL_MVP_DEMO,
};

export function getInitialSiteData(): SiteDataPayload {
  return {
    settings: DEFAULT_BUSINESS_SETTINGS,
    categories: [...TRAILER_CATEGORIES],
    fleet: DEMO_FLEET_ITEMS.filter((item) => item.isActive).sort(
      (a, b) => a.sortOrder - b.sortOrder
    ),
    policies: DEMO_POLICY_SECTIONS.filter((section) => section.isActive).sort(
      (a, b) => a.sortOrder - b.sortOrder
    ),
    faqs: DEMO_FAQS.filter((faq) => faq.isActive).sort(
      (a, b) => a.sortOrder - b.sortOrder
    ),
  };
}

export function getPrimaryTrailerPhoto(
  trailer: TrailerInventoryItem
): TrailerPhoto {
  const sorted = [...trailer.photos].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    sorted.find((p) => p.isPrimary) ??
    sorted[0] ?? {
      id: "fallback",
      inventoryId: trailer.id,
      url: "/images/demo/hero-trailer.png",
      alt: trailer.name,
      caption: trailer.name,
      isPrimary: true,
      sortOrder: 1,
      isPlaceholder: true,
    }
  );
}

export function getTrailerRateDisplay(
  trailer: TrailerInventoryItem,
  rateType: "daily" | "weekly" | "monthly" | "security_deposit"
): string {
  const rule = trailer.pricingRules.find(
    (r) => r.rateType === rateType && r.isActive
  );
  if (!rule) return "Contact for rate";
  if (typeof rule.amount === "number") {
    const suffix =
      rateType === "daily"
        ? " / day"
        : rateType === "weekly"
          ? " / week"
          : rateType === "monthly"
            ? " / month"
            : "";
    return `$${rule.amount}${suffix}`;
  }
  return rule.displayLabel;
}
