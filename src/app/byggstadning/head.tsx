'use client';

export default function Head() {
  const title = 'Byggstädning i Stockholm | Flyttella';
  const description = 'Professionell byggstädning i Stockholm – grov- och finstädning efter renovering och bygge. Fast pris, RUT‑avdrag och pålitligt resultat.';
  const url = 'https://www.flyttella.se/byggstadning';
  const image = '/cleaning_background.png';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </>
  );
}


