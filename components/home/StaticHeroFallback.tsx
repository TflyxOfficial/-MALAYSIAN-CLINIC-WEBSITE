export default function StaticHeroFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 70% 30%, #5C8F82 0%, #3C6E62 35%, #E5DFD3 75%, #F7F5F1 100%)",
        opacity: 0.85,
      }}
      aria-hidden
    />
  );
}
