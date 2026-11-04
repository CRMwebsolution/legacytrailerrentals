import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site.config";
import { SiteDataProvider } from "@/context/SiteDataContext";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.LEGAL_NAME} | Trailer Rentals in ${SITE_CONFIG.LOCATION_FULL} (Visual MVP Demo)`,
  description:
    "Visual MVP homepage demo for Legacy Trailer Rentals LLC in Madera, California. Affordable trailer rental options and a straightforward rental request process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteDataProvider>{children}</SiteDataProvider>
        <Analytics />
      </body>
    </html>
  );
}
