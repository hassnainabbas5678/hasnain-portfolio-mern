import express from "express";
import multer from "multer";
import Project from "../models/Project.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only images allowed"));
    cb(null, true);
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ ok: true, projects });
  } catch {
    res.status(500).json({ ok: false, message: "Failed to fetch projects" });
  }
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, liveUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ ok: false, message: "Title and description are required" });
    }

    let imageUrl = "";
    if (req.file?.buffer) {
      const base64 = req.file.buffer.toString("base64");
      imageUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    const project = await Project.create({
      title,
      description,
      tech: tech || "",
      liveUrl: liveUrl || "",
      imageUrl
    });

    res.status(201).json({ ok: true, project });
  } catch {
    res.status(500).json({ ok: false, message: "Failed to create project" });
  }
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, liveUrl } = req.body;

    const updates = {
      title,
      description,
      tech: tech || "",
      liveUrl: liveUrl || ""
    };

    if (req.file?.buffer) {
      const base64 = req.file.buffer.toString("base64");
      updates.imageUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!project) return res.status(404).json({ ok: false, message: "Project not found" });

    res.json({ ok: true, project });
  } catch {
    res.status(500).json({ ok: false, message: "Failed to update project" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "Failed to delete project" });
  }
});

export default router;
