const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const Certificate = require("../models/Certificate");

const upload = multer({ storage: multer.memoryStorage() });

// Verify by uploading the file + certId
router.post("/check", upload.single("certificate"), async (req, res) => {
  try {
    const { certId } = req.body;
    const file = req.file;

    if (!certId || !file)
      return res.status(400).json({ msg: "certId and certificate file are required" });

    // Hash the uploaded file
    const uploadedHash = crypto.createHash("sha256").update(file.buffer).digest("hex");

    // Find in MongoDB
    const dbCert = await Certificate.findOne({ certId });
    if (!dbCert)
      return res.json({ isValid: false, msg: "Certificate ID not found in records" });

    // Compare hashes — if file was tampered even 1 byte, this fails
    const isValid = dbCert.fileHash === uploadedHash;

    console.log(`[DEMO] Verify: stored=${dbCert.fileHash.slice(0,16)}... uploaded=${uploadedHash.slice(0,16)}... match=${isValid}`);

    res.json({
      isValid,
      holderName: dbCert.holderName,
      issuerName: dbCert.issuerName,
      courseName: dbCert.courseName,
      issuedDate: dbCert.issuedDate,
      txHash: dbCert.txHash,
      fileHash: uploadedHash,
      storedHash: dbCert.fileHash,
      demoMode: true
    });
  } catch (err) {
    res.status(500).json({ msg: "Verification failed", error: err.message });
  }
});

// Quick lookup by certId (no file needed — for QR scan landing)
router.get("/:certId", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certId: req.params.certId });
    if (!cert) return res.status(404).json({ msg: "Certificate not found" });
    res.json({
      certId: cert.certId,
      holderName: cert.holderName,
      issuerName: cert.issuerName,
      courseName: cert.courseName,
      isOnChain: cert.isOnChain,
      issuedDate: cert.issuedDate,
      txHash: cert.txHash
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;