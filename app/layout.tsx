import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { getCategories, getProducts } from "@/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.roohbyreja.com";
const logoUrl = `${siteUrl}/rooh-r-logo.png`; // Your brand logo
const ogImageUrl = `${siteUrl}/og-image.jpg`; // Recommended 1200x630 image for SEO

export const metadata: Metadata = {
  title: {
    default: "Rooh - Premium Luxury Abayas Collection",
    template: "%s | Rooh",
  },
  description:
    "A premium collection of luxury abayas featuring contemporary designs and traditional elegance. Discover modest fashion with modern style.",
  generator: "Next.js",
  applicationName: "Rooh",
  icons: {
    icon: [
      {
        url: logoUrl,
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
  },

  keywords: [
    "luxury abayas",
    "premium abayas",
    "modest fashion",
    "contemporary designs",
    "traditional elegance",
  ],
  authors: [{ name: "Rooh" }],
  creator: "Rooh",
  publisher: "Rooh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rooh",
    title: "Rooh - Premium Luxury Abayas Collection",
    description:
      "A premium collection of luxury abayas featuring contemporary designs and traditional elegance.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Rooh - Premium Luxury Abayas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rooh",
    creator: "@rooh",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en" className="font-custom">
      <head>
        {/* ✅ Structured Data for Logo (helps Google pick the right one) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: siteUrl,
              logo: logoUrl,
            }),
          }}
        />
      </head>
      <body>
        <Header categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
