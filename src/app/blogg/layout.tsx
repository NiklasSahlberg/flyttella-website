export const metadata = {
  title: 'Flyttellas Blogg',
  description: 'Läs våra tips och guider om flytt och städning i Stockholm',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
