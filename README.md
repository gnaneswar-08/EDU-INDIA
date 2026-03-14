# 🎓 EDU INDIA — Blockchain Certificate Verification Platform

> "Proof of Skills. Proof of Trust."

EDU INDIA is a blockchain-based platform that makes student certificates **tamper-proof** and **instantly verifiable**. Built on Polygon blockchain, it connects students, institutions, and recruiters in one trusted ecosystem.

---

## 🚀 Live Demo

- **Frontend:** Open `frontend/index.html` with Live Server
- **Backend:** Running on `http://localhost:5000`

---

## 🎯 The Problem We Solve

Fake certificates are a huge problem in India. Companies waste time calling universities to verify certificates. EDU INDIA solves this by storing certificate hashes on Polygon blockchain — where nobody can fake or change them.

---

## ✅ Features

### 🏛️ Institution Portal
- Enroll students with unique University ID
- Upload and issue documents to students
- Student records filtered by department and course
- Academic calendar with events
- Issue Student ID card with QR code
- Analytics dashboard

### 🎓 Student Portal
- Login with University ID given by institution
- View university-issued documents
- Upload same document to verify on blockchain
- SHA-256 hash verification
- Academic Timeline
- Skill Journey with proficiency levels
- Interested Domains selection
- Mask/Unmask University ID from recruiters

### 💼 Recruiter Portal
- Search students by name or skill
- Search by University ID to see verified certificates
- Filter students by domain
- View trending market skills in India

### 🔍 Public Verification Portal
- Anyone can verify any certificate
- Upload file + enter Certificate ID
- Instant tamper detection
- QR code scanning support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express.js |
| Database | MongoDB (Atlas / Local) |
| Blockchain | Polygon Mumbai (Solidity) |
| Hashing | SHA-256 |
| Auth | JWT + bcrypt |
| QR Code | qrcode npm package |

---

## 📁 Folder Structure
```
edu-india/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Certificate.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── certificates.js
│   │   └── verify.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── institution.html
│   ├── recruiter.html
│   ├── verify.html
│   └── css/
│       └── style.css
├── blockchain/
│   ├── contracts/
│   │   └── CertChain.sol
│   └── scripts/
│       └── deploy.js
└── README.md
```

---

## ⚙️ How to Run

### 1. Clone the project
```bash
git clone https://github.com/YOURUSERNAME/edu-india.git
cd edu-india
```

### 2. Install backend packages
```bash
cd backend
npm install
```

### 3. Create `.env` file inside backend folder
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/certchain
JWT_SECRET=your_secret_key_here
DEMO_MODE=true
CONTRACT_ADDRESS=DEMO_CONTRACT
POLYGON_RPC_URL=demo
PRIVATE_KEY=demo
```

### 4. Start the backend
```bash
node server.js
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### 5. Start the frontend
- Open VS Code
- Right click `frontend/index.html`
- Click **Open with Live Server**

---

## 🔄 How It Works
```
Institution enrolls student → Unique ID created → Document issued
        ↓
Student logs in with University ID → Sees issued documents
        ↓
Student uploads same file → SHA-256 hash verified → Stored on blockchain
        ↓
Recruiter searches University ID → Sees all verified certificates
        ↓
Anyone scans QR code → Instant verification on public portal
```

---

## 🔐 How Verification Works

1. When a certificate is uploaded, we generate a **SHA-256 hash** of the file
2. This hash is stored on the **Polygon blockchain** permanently
3. To verify, upload the same file — we hash it again and compare
4. If hashes match → ✅ **VERIFIED**
5. If hashes don't match → ❌ **TAMPERED**

> Even changing one pixel in the file creates a completely different hash!

---

## 🧪 Demo Credentials

| Role | Login | Password |
|------|-------|----------|
| Student | Use University ID tab | Same as University ID |
| Recruiter | recruiter@demo.com | 123456 |
| Institution | institution@demo.com | 123456 |

> Register new accounts directly from the login page

---

## 🌐 Blockchain Details

| Item | Value |
|------|-------|
| Network | Polygon Mumbai Testnet |
| Smart Contract | Solidity 0.8.19 |
| Transaction Cost | < ₹1 per certificate |
| Mode | Demo (DEMO_MODE=true) |

---

## 📱 Screenshots

### Login Page
- 3 portals: Student, Recruiter, Institution
- Student can login with University ID

### Student Dashboard
- University issued documents
- Upload to verify on blockchain
- Skill journey and domains

### Institution Portal
- Student records by department
- Add documents to students
- Calendar and analytics

### Recruiter Portal
- Search by University ID
- View verified certificates
- Trending skills

---

## 🔮 Future Plans

- Real Aadhaar / DigiLocker integration
- IPFS for decentralized file storage
- Mobile app (React Native)
- Government institution partnerships
- AI-based skill matching for recruiters
- Real Polygon mainnet deployment

---

## 👨‍💻 Built By

**Gnaneswar Reddy**
Built for Hackathon 2026

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⭐ If you like this project, give it a star on GitHub!
