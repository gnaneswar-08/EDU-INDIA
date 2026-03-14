const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Certificate = require("../models/Certificate");
const authMiddleware = require("../middleware/auth");

const DEMO_MODE = process.env.DEMO_MODE === "true";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Upload certificate
router.post("/upload", authMiddleware, upload.single("certificate"), async (req, res) => {
  try {
    const { holderName, issuerName, courseName } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ msg: "No file uploaded" });
    if (!holderName || !issuerName || !courseName)
      return res.status(400).json({ msg: "All fields required" });

    // Real SHA-256 hash — always computed from actual file bytes
    const fileHash = crypto.createHash("sha256").update(file.buffer).digest("hex");
    const certId = uuidv4();

    // Demo: generate fake TX hash that looks real
    const txHash = "0x" + crypto.randomBytes(32).toString("hex");
    console.log(`[DEMO] Cert ID: ${certId}`);
    console.log(`[DEMO] SHA-256: ${fileHash}`);
    console.log(`[DEMO] Fake TX: ${txHash}`);

    // QR code points to verify page
    const verifyUrl = `http://localhost:3000/verify.html?certId=${certId}`;
    const qrCode = await QRCode.toDataURL(verifyUrl);

    const cert = new Certificate({
      certId,
      userId: req.user.id,
      holderName,
      issuerName,
      courseName,
      fileHash,
      txHash,
      contractAddress: "DEMO_CONTRACT",
      isOnChain: true,
      qrCode
    });
    await cert.save();

    res.json({ success: true, certId, fileHash, txHash, qrCode, demoMode: true });
  } catch (err) {
    res.status(500).json({ msg: "Upload failed", error: err.message });
  }
});

// Get current user's certificates
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const certs = await Certificate.find({ userId: req.user.id }).sort({ issuedDate: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;