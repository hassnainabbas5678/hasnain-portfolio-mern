import { useState } from "react";

const faqs = [
  {
    q: "How long does a typical website take?",
    a: "Most portfolio/business websites take 5–10 days depending on content and features. Full MERN apps take longer based on requirements."
  },
  {
    q: "Do you provide support after delivery?",
    a: "Yes. I provide post-launch support and can also offer ongoing maintenance based on your needs."
  },
  {
    q: "What do you need to start?",
    a: "Your goals, examples/inspirations (if any), required pages, and any brand assets like logo, colors, or copy."
  },
  {
    q: "Can you rebuild my existing website into something premium?",
    a: "Yes. I can redesign your UI/UX, improve performance, and rebuild the backend properly if needed."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-6 md:px-10 py-20 max-w-5xl mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          FAQ <span className="neon-text">Answers</span>
        </h2>
        <p className="mt-5 text-white/65 text-lg">
          Clear answers to reduce friction and help clients move forward confidently.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {faqs.map((f, idx) => {
          const isOpen = open === idx;
          return (
            <button
              key={idx}
              onClick={() => setOpen(isOpen ? -1 : idx)}
              className="w-full text-left glass neon-border rounded-2xl p-6 hover:scale-[1.01] transition"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="text-lg font-semibold">{f.q}</div>
                <div className="text-primary text-xl">{isOpen ? "−" : "+"}</div>
              </div>
              {isOpen && (
                <p className="mt-4 text-white/70 leading-relaxed">
                  {f.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
