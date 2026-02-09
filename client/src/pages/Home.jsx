import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../utils/api";

import SkillsSection from "../components/home/SkillsSection";
import TestimonialsMarquee from "../components/home/TestimonialsMarquee";
import LogoStrip from "../components/home/LogoStrip";

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d }
  })
};

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((r) =>
      setProjects((r.data.projects || []).slice(0, 3))
    );
  }, []);

  return (
    <div>
      {/* HERO — MINIMAL, CENTERED, EXPENSIVE */}
      <section className="relative pt-28 pb-32 px-6 md:px-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-400/15 blur-[220px] rounded-full" />
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/15 blur-[220px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="inline-flex glass neon-border rounded-full px-5 py-2 text-xs text-white/70"
          >
            Full-Stack MERN Developer
          </motion.div>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-8 text-[3.2rem] md:text-[4.6rem] font-extrabold leading-tight"
          >
            <span className="name-gradient">Hasnain Abbas</span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mt-6 text-white/65 text-lg max-w-xl mx-auto"
          >
            I design and build premium websites and MERN applications
            that are clean, fast, and conversion-focused.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-12 flex justify-center gap-4"
          >
            <a href="/contact" className="neon-button px-9 py-4 text-base">
              Get a Quote
            </a>
            <a
              href="/portfolio"
              className="glass neon-border px-9 py-4 text-base rounded-xl hover:scale-[1.03] transition"
            >
              View Work
            </a>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-14 flex flex-wrap justify-center gap-4"
          >
            {["MERN Stack", "Premium UI/UX", "Admin Dashboards", "Performance"].map(
              (x) => (
                <div
                  key={x}
                  className="glass neon-border rounded-full px-6 py-3 text-sm text-white/75"
                >
                  {x}
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* TECH STRIP */}
      <LogoStrip />

      {/* FEATURED PROJECTS — CLEAN & CENTERED */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto text-center">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold"
        >
          Selected <span className="neon-text">Projects</span>
        </motion.h2>

        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="show"
          custom={0.1}
          viewport={{ once: true }}
          className="mt-4 text-white/60 max-w-xl mx-auto"
        >
          A few recent builds showcasing clean UI and solid architecture.
        </motion.p>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {projects.map((p) => (
            <div
              key={p._id}
              className="glass neon-border rounded-2xl overflow-hidden hover:scale-[1.02] transition"
            >
              <div className="relative group">
                <div className="h-48 bg-black/30">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-500"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/40 text-sm">
                      No preview
                    </div>
                  )}
                </div>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(5,7,15,0.2), rgba(5,7,15,0.9))"
                    }}
                  >
                    <div className="neon-button px-6 py-3 text-sm">
                      View Live
                    </div>
                  </a>
                )}
              </div>

              <div className="p-6">
                <div className="font-semibold text-lg">{p.title}</div>
                <div className="mt-2 text-white/65 text-sm line-clamp-2">
                  {p.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/portfolio"
            className="glass neon-border px-8 py-4 rounded-xl hover:scale-[1.03] transition inline-block"
          >
            View All Projects
          </a>
        </div>
      </section>

      {/* SKILLS */}
      <SkillsSection />

      {/* FULL-WIDTH TESTIMONIALS */}
      <TestimonialsMarquee />

      {/* FINAL CTA — SHORT */}
      <section className="py-28 px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto glass neon-border rounded-2xl p-12">
          <h3 className="text-3xl font-extrabold">
            Let’s build something <span className="neon-text">great</span>.
          </h3>
          <p className="mt-4 text-white/65">
            Share your idea — I’ll handle the rest.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a href="/contact" className="neon-button px-9 py-4">
              Get Started
            </a>
            <a
              href="/leave-review"
              className="glass neon-border px-9 py-4 rounded-xl hover:scale-[1.03] transition"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
