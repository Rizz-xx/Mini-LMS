const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON
app.use(express.json());

// Pastikan folder uploads dan metadata ada
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
if (!fs.existsSync("./metadata")) fs.mkdirSync("./metadata");

// Konfigurasi Penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// SIMULASI DATABASE ASSIGNMENT (Untuk validasi assignment tidak ditemukan)
const existingAssignments = ["asg-001", "asg-002", "asg-003"];

// 1. ENDPOINT POST: Upload Submission
app.post("/api/submissions", upload.single("file"), (req, res) => {
  const { assignmentId, studentId } = req.body;

  // Skenario: Input tidak lengkap
  if (!assignmentId || !studentId || !req.file) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({
      success: false,
      message:
        "Input tidak lengkap! Harap sertakan assignmentId, studentId, dan file.",
    });
  }

  // Skenario: Assignment tidak ditemukan
  if (!existingAssignments.includes(assignmentId)) {
    fs.unlinkSync(req.file.path);
    return res.status(404).json({
      success: false,
      message: `Assignment dengan ID '${assignmentId}' tidak ditemukan.`,
    });
  }

  // Buat Metadata
  const fileId = uuidv4();
  const metadata = {
    fileId: fileId,
    assignmentId: assignmentId,
    studentId: studentId,
    originalFilename: req.file.originalname,
    storedFilename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    uploadedAt: new Date().toISOString(),
  };

  // Simpan metadata ke file JSON
  fs.writeFileSync(
    `./metadata/${fileId}.json`,
    JSON.stringify(metadata, null, 2),
  );

  // Respons sukses
  return res.status(201).json({
    success: true,
    message: "Submission berhasil diunggah!",
    data: metadata,
  });
});

// 2. ENDPOINT GET: Mengambil Metadata Submission berdasarkan fileId
app.get("/api/submissions/:fileId", (req, res) => {
  const { fileId } = req.params;
  const metadataPath = `./metadata/${fileId}.json`;

  if (!fs.existsSync(metadataPath)) {
    return res.status(404).json({
      success: false,
      message: "File submission tidak ditemukan.",
    });
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  return res.status(200).json({
    success: true,
    data: metadata,
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
