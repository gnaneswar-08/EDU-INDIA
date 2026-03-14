const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  certId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  holderName: { type: String, required: true },
  issuerName: { type: String, required: true },
  courseName: { type: String, required: true },
  fileHash: { type: String, required: true },
  ipfsHash: { type: String },
  txHash: { type: String }, // blockchain transaction hash
  contractAddress: { type: String },
  isOnChain: { type: Boolean, default: false },
  qrCode: { type: String }, // base64 QR
  issuedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certSchema);