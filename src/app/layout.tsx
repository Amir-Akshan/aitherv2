import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WalletProvider } from "@/contexts/WalletContext";

import { SparklesCore } from "@/components/sparkles";

export const metadata: Metadata = {
  title: "AitherLabs",
  description: "Empowering Solana with AI-Driven On-Chain Intelligence",
  icons: {
    icon: [
      { url: "/fav.png" },
      { url: "/fav.png", sizes: "16x16", type: "image/png" },
      { url: "/fav.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/fav.png" }],
    other: [
      {
        rel: "android-chrome",
        url: "/fav.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/fav.png",
        sizes: "512x512",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <WalletProvider>
          <Navbar />
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={3}
            particleDensity={100}
            className="w-full h-screen fixed top-0 bg-black "
            particleColor="#de5920"
          />
          <main>{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
