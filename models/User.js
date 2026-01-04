// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  companyName: { type: String, default: "" },
  role: {
    type: String,
    enum: ["farmer", "transporter", "manager", "moderator","manufacturer", "admin"],
    default: "farmer",
  },
  avatar: { type: String, default: "" },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
  },
  fcmToken: { type: String, default: "" },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
