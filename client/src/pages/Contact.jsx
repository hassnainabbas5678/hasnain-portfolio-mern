import { useState } from "react";
import api from "../utils/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", phone: "", message: "" });

      setStatus("sent");
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1800);
    }
  }

  const btnText =
    status === "sending" ? "Sending..." :
    status === "sent" ? "Message Sent ✓" :
    status === "error" ? "Failed — Try Again" :
    "Send Message";

  return (
    <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Let’s build something <span className="neon-text">serious</span>
          </h2>
          <p className="mt-5 text-white/65 text-lg">
            Share your requirements and I’ll respond with a clear plan, timeline, and quote.
          </p>

          <div className="mt-10 space-y-4">
            <div className="glass neon-border rounded-2xl p-6 hover:scale-[1.01] transition">
              <div className="text-white/60 text-xs">RESPONSE TIME</div>
              <div className="mt-2 font-semibold">Within 24 hours</div>
              <div className="mt-1 text-white/60 text-sm">Quick reply on WhatsApp/Email.</div>
            </div>

            <div className="glass neon-border rounded-2xl p-6 hover:scale-[1.01] transition">
              <div className="text-white/60 text-xs">DELIVERY</div>
              <div className="mt-2 font-semibold">Fast • Clean • Production-ready</div>
              <div className="mt-1 text-white/60 text-sm">
                Premium UI + secure backend + performance.
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="glass neon-border rounded-2xl p-8">
          <div className="text-white/60 text-xs">CONTACT FORM</div>
          <div className="mt-2 text-2xl font-semibold">Get a Quote</div>

          <div className="mt-7 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/55">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs text-white/55">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                placeholder="+92..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-white/55">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                placeholder="you@email.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-white/55">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={6}
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                placeholder="Tell me what you want to build..."
              />
            </div>
          </div>

          <button
            disabled={status === "sending"}
            className={`mt-6 w-full px-6 py-4 text-base rounded-xl flex items-center justify-center gap-3 transition ${
              status === "sent"
                ? "glass neon-border"
                : "neon-button"
            } disabled:opacity-60`}
          >
            {status === "sending" && (
              <span className="inline-block h-5 w-5 rounded-full border-2 border-black/40 border-t-black animate-spin" />
            )}
            {btnText}
          </button>

          <div className="mt-4 text-xs text-white/45">
            {status === "sent"
              ? "✅ Your message has been successfully submitted."
              : "By submitting, you agree to be contacted about your project."}
          </div>
        </form>
      </div>
    </section>
  );
}
