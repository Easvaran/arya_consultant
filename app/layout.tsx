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
  metadataBase: new URL("https://aryaconsultant.com"),
  title: "Finance & Loan Services | ARYA CONSULTANT",
  description: "Get fast business loans, EMI calculators, and financial consulting services with ARYA CONSULTANT. Trusted finance partner for your growth.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
