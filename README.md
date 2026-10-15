# Mini-LMS: Submission/File Service Prototype

Prototipe layanan penyimpanan tugas (*Submission/File Service*) yang
dikembangkan sebagai bagian dari sistem **Mini-LMS**. Layanan ini
dibangun menggunakan **Node.js** dan **Express**, dengan penyimpanan
file secara lokal berbasis folder serta metadata dalam format JSON.

## 👥 Anggota Kelompok dan Kontribusi

1.  **Nama Anggota 1** (NIM: `xxxxxxxx`) --- Perancangan kontrak API dan
    implementasi endpoint `POST` (upload).
2.  **Nama Anggota 2** (NIM: `xxxxxxxx`) --- Implementasi endpoint `GET`
    (metadata) dan perancangan struktur folder.
3.  **Nama Anggota 3** (NIM: `xxxxxxxx`) --- Pengujian sistem
    berdasarkan skenario dan penyusunan dokumentasi.
4.  **Nama Anggota 4** (NIM: `xxxxxxxx`) --- Validasi input dan
    penanganan error serta pengujian integrasi API.

> Ganti nama anggota dan NIM di atas sesuai dengan data kelompok.
> Pembagian kontribusi dapat disesuaikan dengan pekerjaan masing-masing
> anggota.

## ⚙️ Prasyarat Sistem

Pastikan perangkat sudah memiliki perangkat lunak berikut:

-   [Node.js](https://nodejs.org/) --- disarankan menggunakan versi LTS.
-   [Postman](https://www.postman.com/) atau Thunder Client untuk
    menguji API.

## 🚀 Instalasi dan Menjalankan Program

### 1. Unduh atau Clone Repositori

Ekstrak file ZIP proyek atau clone repositori GitHub. Setelah itu, buka
terminal dan masuk ke direktori proyek:

``` bash
cd mini-lms-submission
```

### 2. Instal Dependensi

Jalankan perintah berikut untuk memasang pustaka yang dibutuhkan:

``` bash
npm install express multer uuid
```

### 3. Jalankan Server

Jalankan server menggunakan Node.js:

``` bash
node server.js
```

Jika server berhasil dijalankan, terminal akan menampilkan pesan seperti
berikut:

``` text
Server berjalan di http://localhost:3000
```

Pastikan file `server.js` tersedia di direktori proyek sebelum
menjalankan perintah tersebut.

## 📄 Kontrak API (*API Endpoints*)

### 1. Unggah Tugas --- `POST /api/submissions`

**Deskripsi:** Mengunggah file tugas mahasiswa/siswa dan menyimpan
metadata file tersebut.

-   **Method:** `POST`
-   **URL:** `http://localhost:3000/api/submissions`
-   **Content-Type:** `multipart/form-data`

**Parameter request (Body → form-data):**

  -----------------------------------------------------------------------
  Parameter         Tipe              Wajib             Keterangan
  ----------------- ----------------- ----------------- -----------------
  `assignmentId`    Text              Ya                ID tugas yang
                                                        terdaftar,
                                                        misalnya
                                                        `asg-001`,
                                                        `asg-002`, atau
                                                        `asg-003`.

  `studentId`       Text              Ya                ID
                                                        mahasiswa/siswa
                                                        pengunggah,
                                                        misalnya
                                                        `MHS-12345`.

  `file`            File              Ya                Berkas tugas yang
                                                        akan diunggah,
                                                        misalnya PDF,
                                                        DOCX, atau
                                                        gambar.
  -----------------------------------------------------------------------

**Contoh respons sukses --- `201 Created`:**

``` json
{
  "success": true,
  "message": "Submission berhasil diunggah!",
  "data": {
    "fileId": "uuid-unik-file",
    "assignmentId": "asg-001",
    "studentId": "MHS-12345",
    "originalFilename": "tugas.pdf",
    "storedFilename": "uuid-unik-file.pdf",
    "path": "uploads/uuid-unik-file.pdf",
    "size": 10240,
    "uploadedAt": "2026-10-15T12:00:00.000Z"
  }
}
```

Nilai pada contoh respons di atas hanya ilustrasi. Nilai sebenarnya,
termasuk `fileId`, nama file tersimpan, ukuran file, dan waktu unggah,
bergantung pada file yang dikirim dan implementasi server.

### 2. Ambil Metadata Tugas --- `GET /api/submissions/:fileId`

**Deskripsi:** Mengambil informasi atau metadata file yang telah
diunggah berdasarkan `fileId`.

-   **Method:** `GET`
-   **URL:** `http://localhost:3000/api/submissions/:fileId`
-   **Parameter URL:** `fileId` --- UUID unik yang diperoleh dari
    respons upload.

Ganti `:fileId` dengan ID file yang sebenarnya. Contoh:

``` http
GET http://localhost:3000/api/submissions/uuid-unik-file
```

**Respons sukses --- `200 OK`:** Server mengembalikan objek JSON yang
berisi metadata file tersebut.

## 🧪 Panduan Pengujian

Pengujian dapat dilakukan menggunakan Postman. Jalankan server terlebih
dahulu, lalu ikuti skenario berikut.

### Skenario 1: Permintaan Valid (Upload Berhasil)

1.  Pilih method **POST** dan masukkan URL
    `http://localhost:3000/api/submissions`.

2.  Buka tab **Body**, lalu pilih **form-data**.

3.  Tambahkan parameter berikut:

    -   `assignmentId` --- `asg-001` (Text).
    -   `studentId` --- `MHS-12345` (Text).
    -   `file` --- pilih file dari komputer (File).

4.  Klik **Send**.

5.  **Hasil yang diharapkan:** Status HTTP `201 Created`, dan file
    beserta metadata berhasil disimpan.

    Ambil tangkapan layar sebagai **Bukti 1**.

### Skenario 2: Assignment Tidak Ditemukan

1.  Gunakan kembali endpoint upload.

2.  Ubah nilai `assignmentId` menjadi `asg-999`, yaitu ID simulasi yang
    tidak terdaftar.

3.  Pastikan `studentId` dan `file` sudah diisi dengan benar.

4.  Klik **Send**.

5.  **Hasil yang diharapkan:** Status HTTP `404 Not Found` dengan pesan
    bahwa assignment tidak ditemukan.

    Ambil tangkapan layar sebagai **Bukti 2**.

### Skenario 3: Input Tidak Lengkap

1.  Gunakan kembali endpoint upload.

2.  Kosongkan atau hilangkan salah satu parameter wajib, misalnya
    `studentId`, atau jangan sertakan file.

3.  Klik **Send**.

4.  **Hasil yang diharapkan:** Status HTTP `400 Bad Request` dengan
    pesan bahwa input belum lengkap.

    Ambil tangkapan layar sebagai **Bukti 3**.

> Catatan: Status dan pesan respons di atas merupakan hasil yang
> diharapkan berdasarkan kontrak API. Pastikan implementasi `server.js`
> menangani setiap skenario tersebut agar hasil pengujian sesuai.

## 🗂️ Penjelasan Teknis

### Identifier File

Setiap file yang diunggah mendapatkan identifier unik menggunakan **UUID
v4**. Identifier ini membantu membedakan file yang disimpan, termasuk
ketika beberapa file memiliki nama asli yang sama.

### Struktur Penyimpanan

File dan metadata disimpan secara lokal dalam direktori terpisah:

``` text
mini-lms-submission/
├── server.js
├── package.json
├── uploads/       # Penyimpanan file yang diunggah
└── metadata/      # Penyimpanan metadata dalam format JSON
```

Struktur di atas merupakan gambaran umum dan dapat disesuaikan dengan
implementasi proyek. Folder `uploads/` menyimpan berkas fisik, sedangkan
folder `metadata/` menyimpan informasi terkait berkas dalam file JSON.

## ✅ Ringkasan

Submission/File Service ini menyediakan dua fungsi utama:

-   **Upload submission:** menerima file tugas dan menyimpan file
    beserta metadata-nya.
-   **Get submission metadata:** mengambil metadata file berdasarkan
    `fileId`.

Prototipe ini menggunakan penyimpanan lokal sehingga sesuai untuk
demonstrasi dan pengujian awal. Untuk penggunaan produksi, pertimbangkan
penambahan autentikasi, validasi tipe dan ukuran file, serta kontrol
akses terhadap file dan metadata.
