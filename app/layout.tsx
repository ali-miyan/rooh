import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-custom">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
