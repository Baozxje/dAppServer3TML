require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const qrCodeRoutes = require("./routes/qrcodes");
const transactionRoutes = require("./routes/transaction");
const productRoutes = require("./routes/product");
const forgotPasswordRoutes = require("./routes/forgotPassword");
const setupEventListeners = require("./blockchain/eventListener");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/qrcodes", qrCodeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth/transactions", transactionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    setupEventListeners();
  })
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
