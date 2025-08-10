import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { getCategories, getProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: {
    default: "Rooh - Premium Luxury Abayas Collection",
    template: "%s | Rooh",
  },
  description:
    "A premium collection of luxury abayas featuring contemporary designs and traditional elegance. Discover modest fashion with modern style.",
  generator: "Next.js",
  applicationName: "Rooh",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rooh.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rooh",
    title: "Rooh - Premium Luxury Abayas Collection",
    description:
      "A premium collection of luxury abayas featuring contemporary designs and traditional elegance.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rooh",
    creator: "@rooh",
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
  verification: {
    // Add your verification tokens here
    // google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <html lang="en" className="font-custom">
      <body>
        <Header categories={categories} products={products}  />
        {children}
        <Footer categories={categories} />
        
      </body>
    </html>
  );
}
