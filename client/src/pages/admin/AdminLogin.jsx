import { useState } from "react";
import api from "../../utils/api";
import { setToken } from "../../hooks/useAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute top-[-140px] right-[10%] w-[420px] h-[420px] bg-cyan-400/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-160px] left-[8%] w-[520px] h-[520px] bg-purple-500/20 blur-[160px] rounded-full" />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md glass neon-border rounded-2xl p-8"
      >
        <div className="text-white/60 text-xs">SECURE ACCESS</div>
        <h1 className="mt-2 text-2xl font-semibold">
          Admin <span className="neon-text">Login</span>
        </h1>
        <p className="mt-3 text-white/60 text-sm">
          This page is intentionally hidden. Authorized access only.
        </p>

        <div className="mt-7 space-y-4">
          <div>
            <label className="text-xs text-white/55">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="text-xs text-white/55">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full neon-button px-6 py-4 text-base disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="text-xs text-white/45 text-center">
            Tip: Use a strong password and keep JWT secret safe.
          </div>
        </div>
      </form>
    </div>
  );
}
