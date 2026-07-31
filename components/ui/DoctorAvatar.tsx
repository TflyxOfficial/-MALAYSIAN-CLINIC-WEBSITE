function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const palette = ["#3C6E62", "#5C8F82", "#254A41", "#8C7A5B", "#5A5750"];

function initials(name: string): string {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function DoctorAvatar({
  seed,
  name,
  size = 72,
}: {
  seed: string;
  name: string;
  size?: number;
}) {
  const hash = hashSeed(seed);
  const color = palette[hash % palette.length];

  return (
    <div
      className="flex items-center justify-center rounded-full font-serif text-bone"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.32,
      }}
      role="img"
      aria-label={`Portrait placeholder for ${name}`}
    >
      {initials(name)}
    </div>
  );
}
