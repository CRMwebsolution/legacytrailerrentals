"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { getInitialSiteData } from "@/lib/site-data";
import {
  BusinessSettings,
  FaqEntry,
  RentalPolicySection,
  SiteDataPayload,
  TrailerContract,
  TrailerFilterCategory,
  TrailerInventoryItem,
  TrailerPhoto,
  TrailerPricingRule,
} from "@/types/cms";

export interface AdminUserSession {
  email: string;
  name: string;
  role: string;
  loggedInAt: string;
}

const ALLOWED_ADMIN_ACCOUNTS: Record<
  string,
  { password: string; name: string; role: string }
> = {
  "legacytrailerrentalsllc@gmail.com": {
    password: "dashboard",
    name: "Legacy Trailer Rentals LLC",
    role: "Owner Admin",
  },
  "cody@southernautomate.com": {
    password: "dashboard",
    name: "Cody (Southern Automate)",
    role: "System Admin",
  },
};

interface SiteDataContextValue {
  siteData: SiteDataPayload;
  adminUser: AdminUserSession | null;
  changeCount: number;
  loginAdmin: (
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  logoutAdmin: () => void;
  resetAllToDefaults: () => void;

  // Settings mutations
  updateSettings: (patch: Partial<BusinessSettings>) => void;

  // Fleet / Inventory mutations
  addTrailer: (trailer: TrailerInventoryItem) => void;
  updateTrailer: (
    id: string,
    patch: Partial<TrailerInventoryItem>
  ) => void;
  deleteTrailer: (id: string) => void;
  updateTrailerPricing: (
    inventoryId: string,
    pricingRules: TrailerPricingRule[]
  ) => void;

  // Per-Trailer Contract mutation
  updateTrailerContract: (
    inventoryId: string,
    patch: Partial<TrailerContract>
  ) => void;

  // Trailer Photo mutations
  addTrailerPhoto: (
    inventoryId: string,
    photo: Omit<TrailerPhoto, "id" | "inventoryId" | "sortOrder">
  ) => void;
  setPrimaryTrailerPhoto: (inventoryId: string, photoId: string) => void;
  updateTrailerPhotoCaption: (
    inventoryId: string,
    photoId: string,
    caption: string
  ) => void;
  deleteTrailerPhoto: (inventoryId: string, photoId: string) => void;

  // Categories mutation
  addCategory: (categoryName: string) => void;

  // Policies & FAQs mutations
  updatePolicySection: (
    id: string,
    patch: Partial<RentalPolicySection>
  ) => void;
  addFaq: (faq: Omit<FaqEntry, "id" | "sortOrder">) => void;
  updateFaq: (id: string, patch: Partial<FaqEntry>) => void;
  deleteFaq: (id: string) => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteDataPayload>(() =>
    getInitialSiteData()
  );
  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null);
  const [changeCount, setChangeCount] = useState<number>(0);

  const bumpChange = useCallback(() => {
    setChangeCount((c) => c + 1);
  }, []);

  const loginAdmin = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = ALLOWED_ADMIN_ACCOUNTS[normalizedEmail];
    if (!account || account.password !== password) {
      return {
        ok: false,
        error:
          "Invalid email or password. Use legacytrailerrentalsllc@gmail.com or cody@southernautomate.com with password: dashboard",
      };
    }

    setAdminUser({
      email: normalizedEmail,
      name: account.name,
      role: account.role,
      loggedInAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    return { ok: true };
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminUser(null);
  }, []);

  const resetAllToDefaults = useCallback(() => {
    setSiteData(getInitialSiteData());
    setChangeCount(0);
  }, []);

  const updateSettings = useCallback(
    (patch: Partial<BusinessSettings>) => {
      setSiteData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          ...patch,
        },
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const addTrailer = useCallback(
    (trailer: TrailerInventoryItem) => {
      setSiteData((prev) => {
        const nextCategories: TrailerFilterCategory[] = prev.categories.includes(
          trailer.category
        )
          ? prev.categories
          : [...prev.categories, trailer.category];
        return {
          ...prev,
          categories: nextCategories,
          fleet: [...prev.fleet, trailer],
        };
      });
      bumpChange();
    },
    [bumpChange]
  );

  const updateTrailer = useCallback(
    (id: string, patch: Partial<TrailerInventoryItem>) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const deleteTrailer = useCallback(
    (id: string) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.filter((item) => item.id !== id),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const updateTrailerPricing = useCallback(
    (inventoryId: string, pricingRules: TrailerPricingRule[]) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) =>
          item.id === inventoryId ? { ...item, pricingRules } : item
        ),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const updateTrailerContract = useCallback(
    (inventoryId: string, patch: Partial<TrailerContract>) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) =>
          item.id === inventoryId
            ? {
                ...item,
                contract: {
                  ...item.contract,
                  ...patch,
                  updatedAt: new Date().toISOString(),
                },
              }
            : item
        ),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const addTrailerPhoto = useCallback(
    (
      inventoryId: string,
      photo: Omit<TrailerPhoto, "id" | "inventoryId" | "sortOrder">
    ) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) => {
          if (item.id !== inventoryId) return item;
          const nextOrder = item.photos.length + 1;
          const newPhoto: TrailerPhoto = {
            ...photo,
            id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            inventoryId,
            sortOrder: nextOrder,
          };
          const updatedPhotos = photo.isPrimary
            ? [
                ...item.photos.map((p) => ({ ...p, isPrimary: false })),
                newPhoto,
              ]
            : [...item.photos, newPhoto];
          return {
            ...item,
            photos: updatedPhotos,
          };
        }),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const setPrimaryTrailerPhoto = useCallback(
    (inventoryId: string, photoId: string) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) => {
          if (item.id !== inventoryId) return item;
          return {
            ...item,
            photos: item.photos.map((p) => ({
              ...p,
              isPrimary: p.id === photoId,
            })),
          };
        }),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const updateTrailerPhotoCaption = useCallback(
    (inventoryId: string, photoId: string, caption: string) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) => {
          if (item.id !== inventoryId) return item;
          return {
            ...item,
            photos: item.photos.map((p) =>
              p.id === photoId ? { ...p, caption, alt: caption } : p
            ),
          };
        }),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const deleteTrailerPhoto = useCallback(
    (inventoryId: string, photoId: string) => {
      setSiteData((prev) => ({
        ...prev,
        fleet: prev.fleet.map((item) => {
          if (item.id !== inventoryId) return item;
          const remaining = item.photos.filter((p) => p.id !== photoId);
          if (remaining.length > 0 && !remaining.some((p) => p.isPrimary)) {
            remaining[0] = { ...remaining[0], isPrimary: true };
          }
          return {
            ...item,
            photos: remaining,
          };
        }),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const addCategory = useCallback(
    (categoryName: string) => {
      const trimmed = categoryName.trim();
      if (!trimmed) return;
      setSiteData((prev) => {
        if (prev.categories.includes(trimmed)) return prev;
        return {
          ...prev,
          categories: [...prev.categories, trimmed],
        };
      });
      bumpChange();
    },
    [bumpChange]
  );

  const updatePolicySection = useCallback(
    (id: string, patch: Partial<RentalPolicySection>) => {
      setSiteData((prev) => ({
        ...prev,
        policies: prev.policies.map((p) =>
          p.id === id ? { ...p, ...patch } : p
        ),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const addFaq = useCallback(
    (faq: Omit<FaqEntry, "id" | "sortOrder">) => {
      setSiteData((prev) => ({
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            ...faq,
            id: `faq-${Date.now()}`,
            sortOrder: prev.faqs.length + 1,
          },
        ],
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const updateFaq = useCallback(
    (id: string, patch: Partial<FaqEntry>) => {
      setSiteData((prev) => ({
        ...prev,
        faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  const deleteFaq = useCallback(
    (id: string) => {
      setSiteData((prev) => ({
        ...prev,
        faqs: prev.faqs.filter((f) => f.id !== id),
      }));
      bumpChange();
    },
    [bumpChange]
  );

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        adminUser,
        changeCount,
        loginAdmin,
        logoutAdmin,
        resetAllToDefaults,
        updateSettings,
        addTrailer,
        updateTrailer,
        deleteTrailer,
        updateTrailerPricing,
        updateTrailerContract,
        addTrailerPhoto,
        setPrimaryTrailerPhoto,
        updateTrailerPhotoCaption,
        deleteTrailerPhoto,
        addCategory,
        updatePolicySection,
        addFaq,
        updateFaq,
        deleteFaq,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
