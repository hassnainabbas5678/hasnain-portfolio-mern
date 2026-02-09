import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const { title, description, tech, imageUrl, liveUrl } = req.body;

  if (!title || !description) {
    return res.status(400).json({ ok: false, message: "Title and description are required" });
  }

  const project = await Project.create({
    title,
    description,
    tech: tech || "",
    imageUrl: imageUrl || "",
    liveUrl: liveUrl || ""
  });

  res.status(201).json({ ok: true, project });
};

export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ ok: true, projects });
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
