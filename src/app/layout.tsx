import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Flyttella - Din pålitliga flyttpartner",
  description: "Professionell flyttfirma i Stockholm. Vi erbjuder bohagsflytt, flyttstädning, bärhjälp och packning med kvalitetsgaranti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          {/* Google tag (gtag.js) */}
          <Script
            id="gtag-src"
            src="https://www.googletagmanager.com/gtag/js?id=AW-427570372"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-427570372');
            `}
          </Script>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`}
            strategy="lazyOnload"
          />
          {children}
          <Footer />
          <CookieConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
