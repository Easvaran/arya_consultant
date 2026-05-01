import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutContent from "@/components/LayoutContent";
import DynamicFavicon from "@/components/DynamicFavicon";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARYA CONSULTANT - Fast & Secure Loans",
  description: "Experience the future of digital banking with ARYA CONSULTANT. Instant approvals and competitive rates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWQGT4DS8Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'G-RWQGT4DS8Z');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <DynamicFavicon />
        <Toaster position="top-center" />
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
