import Admin from "../models/Admin.js";

export async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("⚠️ ADMIN_EMAIL / ADMIN_PASSWORD missing in .env (admin not created)");
    return;
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("✅ Admin already exists:", email);
    return;
  }

  await Admin.create({ email, password });
  console.log("✅ Admin created:", email);
}
