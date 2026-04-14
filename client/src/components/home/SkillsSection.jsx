import { useEffect, useRef, useState } from "react";
import SkillCard from "./SkillCard";

const frontend = [
  { name: "HTML5", value: 100 },
  { name: "CSS3", value: 100 },
  { name: "Tailwind CSS", value: 92 },
  { name: "JavaScript", value: 92 },
  { name: "React.js", value: 88 },
  { name: "Next.js", value: 78 }
];

const backend = [
  { name: "Node.js", value: 85 },
  { name: "Express.js", value: 80 },
  { name: "MongoDB", value: 90 },
  { name: "JWT Auth", value: 85 }
];

const tools = [
  { name: "Git", value: 90 },
  { name: "Figma", value: 88 },
  { name: "Netlify / Vercel", value: 90 },
  { name: "Render / Railway", value: 85 },
  { name: "Database Design", value: 86 }
];

export default function SkillsSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
      <div className="text-center">
        <div className="inline-flex glass neon-border rounded-full px-4 py-2 text-xs text-white/70">
          My Skills
        </div>

        <h2 className="mt-6 text-4xl md:text-6xl font-extrabold">
          Technical <span className="neon-text">Expertise</span>
        </h2>

        <p className="mt-4 text-white/65 text-lg max-w-2xl mx-auto">
          A visual overview of my proficiency across technologies and tools — built for
          performance, scalability, and premium UI.
        </p>
      </div>

      <div className="mt-14 grid lg:grid-cols-3 gap-6">
        <SkillCard title="Frontend Development" items={frontend} active={active} />
        <SkillCard title="Backend Development" items={backend} active={active} />
        <SkillCard title="Tools & Others" items={tools} active={active} />
      </div>
    </section>
  );
}
