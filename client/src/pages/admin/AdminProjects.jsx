import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function TechChips({ tech }) {
  const list = (tech || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 6);

  if (!list.length) return <span className="text-white/35 text-sm">—</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full glass border border-white/10 text-xs text-white/75 hover:scale-[1.03] transition"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    liveUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  function resetForm() {
    setEditingId(null);
    setForm({ title: "", description: "", tech: "", liveUrl: "" });
    setImageFile(null);
    setImagePreview("");
  }

  function openAdd() {
    resetForm();
    setOpenForm(true);
  }

  function openEdit(p) {
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      tech: p.tech || "",
      liveUrl: p.liveUrl || ""
    });
    setImageFile(null);
    setImagePreview(p.imageUrl || "");
    setOpenForm(true);
  }

  function closeForm() {
    setOpenForm(false);
    resetForm();
  }

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  async function load() {
    setLoading(true);
    try {
      const r = await api.get("/projects");
      setProjects(r.data.projects || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    return () => {
      try {
        if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("tech", form.tech || "");
      fd.append("liveUrl", form.liveUrl || "");
      if (imageFile) fd.append("image", imageFile);

      if (isEditing) {
        await api.put(`/projects/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await api.post("/projects", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      await load();
      closeForm();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="w-full px-8 py-10 max-w-7xl">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold">
              Manage <span className="neon-text">Projects</span>
            </h1>
            <p className="mt-2 text-white/55">
              Add, update, and delete projects shown on your portfolio.
            </p>
          </div>

          <button onClick={openAdd} className="neon-button px-6 py-3 text-sm">
            + Add Project
          </button>
        </div>

        {/* TABLE */}
        <div className="mt-8 glass neon-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr className="text-xs text-white/60">
                  <th className="px-6 py-4 font-semibold">Project</th>
                  <th className="px-6 py-4 font-semibold">Tech</th>
                  <th className="px-6 py-4 font-semibold">Live</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={4}>
                      Loading projects...
                    </td>
                  </tr>
                )}

                {!loading && projects.length === 0 && (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={4}>
                      No projects yet. Click <b>Add Project</b>.
                    </td>
                  </tr>
                )}

                {!loading &&
                  projects.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-16 rounded-xl overflow-hidden border border-white/10 bg-black/30 flex items-center justify-center">
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-white/30 text-xs">No image</span>
                            )}
                          </div>

                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-white/55 text-xs line-clamp-1 max-w-[360px]">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <TechChips tech={p.tech} />
                      </td>

                      <td className="px-6 py-5">
                        {p.liveUrl ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            Open ↗
                          </a>
                        ) : (
                          <span className="text-white/35 text-sm">—</span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openEdit(p)}
                            className="glass neon-border px-4 py-2 rounded-xl text-sm hover:scale-[1.03] transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => remove(p._id)}
                            className="glass border border-white/10 px-4 py-2 rounded-xl text-sm text-red-300 hover:scale-[1.03] transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FORM (ONLY OPENS WHEN BUTTON CLICKED) */}
        {openForm && (
          <div className="mt-8 glass neon-border rounded-2xl p-8">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="text-xs text-white/55">
                  {isEditing ? "UPDATE PROJECT" : "ADD PROJECT"}
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {isEditing ? "Edit project details" : "Create a new project"}
                </div>
              </div>

              <button
                onClick={closeForm}
                className="glass neon-border px-5 py-2 rounded-xl text-sm hover:scale-[1.03] transition"
              >
                Close
              </button>
            </div>

            <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs text-white/55">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-white/55">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-white/55">
                  Tech (comma separated)
                </label>
                <input
                  name="tech"
                  value={form.tech}
                  onChange={onChange}
                  placeholder="React, Node.js, MongoDB, Tailwind"
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                />
                <div className="mt-3">
                  <TechChips tech={form.tech} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-white/55">Live Website URL</label>
                <input
                  name="liveUrl"
                  value={form.liveUrl}
                  onChange={onChange}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-white/55">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                />
                <div className="mt-2 text-xs text-white/45">
                  Upload JPG/PNG/WebP (max 2MB).
                </div>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="mt-4 h-44 w-full object-cover rounded-xl border border-white/10"
                  />
                )}
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  disabled={saving}
                  className="neon-button px-7 py-4 text-sm disabled:opacity-60 flex items-center gap-3"
                >
                  {saving && (
                    <span className="inline-block h-5 w-5 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                  )}
                  {isEditing ? "Update Project" : "Add Project"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  className="glass neon-border px-7 py-4 rounded-xl text-sm hover:scale-[1.03] transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
