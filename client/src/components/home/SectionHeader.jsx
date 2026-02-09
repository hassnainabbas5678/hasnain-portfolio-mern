export default function SectionHeader({ eyebrow, title, highlight, desc, right }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="inline-flex glass neon-border rounded-full px-4 py-2 text-xs text-white/70">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">
          {title} <span className="neon-text">{highlight}</span>
        </h2>
        {desc && <p className="mt-4 text-white/65 text-lg">{desc}</p>}
      </div>
      {right && <div className="min-w-[220px]">{right}</div>}
    </div>
  );
}
