import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "./components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
