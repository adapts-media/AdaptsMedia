// Metadata for this route lives in page.tsx (page-level metadata takes
// precedence anyway, so defining it here too was redundant).
export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Override the default <main> padding and hide navbar for this immersive page
    <div style={{ paddingTop: 0, marginTop: "-0px" }}>
      {children}
    </div>
  );
}
