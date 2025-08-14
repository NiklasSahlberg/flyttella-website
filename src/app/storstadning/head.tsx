export default function Head() {
  const title = 'Storstädning i Stockholm | Flyttella';
  const description = 'Professionell storstädning i Stockholm – grundlig djuprengöring av hem och företag. Fast pris, 50% RUT-avdrag och enkel bokning. Offert på 1 minut.';
  const url = 'https://www.flyttella.se/storstadning';
  const image = '/og-default.jpg';
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Flyttella" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content="index,follow" />
    </>
  );
}



