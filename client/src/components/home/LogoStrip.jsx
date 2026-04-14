export default function LogoStrip() {
  const items = ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Framer Motion", "JWT", "Render", "Netlify"];

  return (
    <section className="px-6 md:px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white/55 text-xs tracking-widest uppercase">
          Built With Modern Stack
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {items.map((x) => (
            <div
              key={x}
              className="px-4 py-2 rounded-full glass border border-white/10 text-white/75 text-sm hover:scale-[1.04] transition hover:shadow-[0_0_30px_rgba(0,229,255,0.10)]"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
