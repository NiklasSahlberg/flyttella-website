'use client';

export default function Head() {
  const title = 'Dödsbostädning i Stockholm | Flyttella';
  const description = 'Omsorgsfull dödsbostädning i Stockholm – sortering, grov- och finstädning inför försäljning eller överlåtelse. Fast pris, RUT‑avdrag och trygg hantering.';
  const url = 'https://www.flyttella.se/dodsbo-stadning';
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


