import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packhjälp i Stockholm | Professionell packning | Flyttella',
  description:
    'Professionell packhjälp i Stockholm. Vi packar ditt bohag säkert, märker kartonger tydligt och sparar dig tid inför flytten. Fast pris utan dolda avgifter.',
  keywords:
    'packhjälp, packhjälp stockholm, packning flytt, flyttpackning, hjälp med packning, packa inför flytt',
  openGraph: {
    title: 'Packhjälp i Stockholm | Professionell packning | Flyttella',
    description:
      'Professionell packhjälp i Stockholm med fasta priser. Säker packning, tydlig märkning och kvalitativa material.',
    type: 'website',
    locale: 'sv_SE',
    url: 'https://www.flyttella.se/packhjalp',
  },
  alternates: {
    canonical: 'https://www.flyttella.se/packhjalp',
  },
};

export default function PackhjalpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
