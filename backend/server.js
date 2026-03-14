const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/verify", require("./routes/verify"));

app.get("/", (req, res) => res.send("🚀 CertChain server running"));

mongoose.connect("mongodb://localhost:27017/certchain")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);