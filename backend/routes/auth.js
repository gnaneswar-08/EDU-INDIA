const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPass, role: role || "user" });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Demo Aadhaar - Send OTP
router.post("/aadhaar-otp", (req, res) => {
  const { aadhaarNumber } = req.body;
  if (!aadhaarNumber || aadhaarNumber.length !== 12)
    return res.status(400).json({ msg: "Enter valid 12-digit Aadhaar number" });

  console.log(`[DEMO] OTP requested for Aadhaar ending: ${aadhaarNumber.slice(-4)}`);
  res.json({
    otpSent: true,
    msg: `OTP sent to mobile linked with XXXX-XXXX-${aadhaarNumber.slice(-4)}`
  });
});

// Demo Aadhaar - Verify OTP
router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === "123456") {
    res.json({ verified: true, msg: "✅ Aadhaar identity verified successfully" });
  } else {
    res.status(400).json({ verified: false, msg: "Invalid OTP. Use 123456 for demo." });
  }
});

module.exports = router;