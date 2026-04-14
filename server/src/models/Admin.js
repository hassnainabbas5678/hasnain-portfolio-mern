import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

schema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

schema.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

export default mongoose.model("Admin", schema);
