import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flyttfirma i Stockholm | Hela staden & Stockholms län | Flyttella',
  description:
    'Flyttfirma för hela Stockholm – innerstan, norrort, söderort, österort och västerort. Fasta priser, lokala team och flyttar mellan alla stadsdelar och kommuner i Stockholms län. Offert inom en minut.',
  keywords:
    'flyttfirma stockholm, flyttfirma i stockholm, flytthjälp stockholm, bohagsflytt stockholm, flytt stockholm, flyttfirma stockholms län, flyttfirma norrort, flyttfirma söderort',
  openGraph: {
    title: 'Flyttfirma i Stockholm | Hela staden & Stockholms län | Flyttella',
    description:
      'Professionell flyttfirma för hela Stockholm och Stockholms län. Fasta priser och lokala team i innerstan, norrort, söderort, österort och västerort.',
    type: 'website',
    locale: 'sv_SE',
    url: 'https://www.flyttella.se/flyttfirma-i-stockholm',
  },
  alternates: {
    canonical: 'https://www.flyttella.se/flyttfirma-i-stockholm',
  },
};

export default function FlyttfirmaStockholmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
