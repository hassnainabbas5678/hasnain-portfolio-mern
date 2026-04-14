import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const sign = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

export async function login(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ ok: false });

  res.json({ ok: true, token: sign(admin._id) });
}
