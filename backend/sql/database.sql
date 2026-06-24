-- Database: birojasanpwp
CREATE DATABASE IF NOT EXISTS birojasanpwp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE birojasanpwp;

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  category VARCHAR(100) DEFAULT NULL,
  author VARCHAR(100) DEFAULT 'Admin',
  status ENUM('draft', 'published') DEFAULT 'published',
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_published_at (published_at)
) ENGINE=InnoDB;

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(100) DEFAULT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Admin users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Default admin: admin@birojasabuatnpwp.com / admin123
INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@birojasabuatnpwp.com', '$2b$10$REK5oW9pFXvY7u.C8K9F0eogy8pZNMWBuvBNBZ2G0e15FykPrf1gC')
ON DUPLICATE KEY UPDATE email = email;

-- Sample articles
INSERT INTO articles (title, slug, excerpt, content, category, author, published_at) VALUES
(
  'Cara Membuat NPWP Online untuk Wajib Pajak Orang Pribadi',
  'cara-membuat-npwp-online-pribadi',
  'Panduan lengkap membuat NPWP pribadi secara online melalui sistem DJP. Pelajari syarat, langkah, dan tips agar proses cepat selesai.',
  '<p>NPWP (Nomor Pokok Wajib Pajak) adalah identitas wajib bagi setiap orang yang memiliki penghasilan di atas PTKP. Berikut panduan lengkapnya:</p><h2>Syarat Pembuatan NPWP Pribadi</h2><ul><li>Fotokopi KTP</li><li>Fotokopi Kartu Keluarga (KK)</li><li>Email aktif</li><li>Nomor HP aktif</li></ul><h2>Langkah Pembuatan</h2><p>Anda bisa mendaftar melalui sistem online DJP atau menggunakan jasa biro jasa terpercaya untuk proses yang lebih cepat dan mudah.</p><h2>Tips</h2><p>Pastikan data yang diisi sesuai dengan KTP. Kesalahan data dapat menyebabkan proses tertunda.</p>',
  'NPWP',
  'Admin',
  '2025-01-15 10:00:00'
),
(
  'Perbedaan NPWP Pribadi dan NPWP Badan, Mana yang Anda Butuhkan?',
  'perbedaan-npwp-pribadi-dan-badan',
  'Memahami perbedaan NPWP pribadi dan badan sangat penting sebelum mendirikan usaha. Simak penjelasan lengkapnya di artikel ini.',
  '<p>NPWP Pribadi digunakan untuk wajib pajak orang pribadi, sedangkan NPWP Badan untuk badan usaha seperti PT, CV, atau yayasan.</p><h2>NPWP Pribadi</h2><p>Digunakan oleh individu yang memiliki penghasilan. Cocok untuk freelancer, karyawan, dan pemilik UMKM perorangan.</p><h2>NPWP Badan</h2><p>Wajib dimiliki oleh badan usaha yang sudah berbadan hukum. Diperlukan untuk pelaporan pajak perusahaan.</p><h2>Kapan Butuh Keduanya?</h2><p>Jika Anda memiliki PT atau CV, Anda perlu NPWP Badan. Pemilik/director tetap membutuhkan NPWP Pribadi masing-masing.</p>',
  'NPWP',
  'Admin',
  '2025-02-01 10:00:00'
),
(
  'Apa Itu NIB dan Mengapa Penting untuk UMKM?',
  'apa-itu-nib-dan-kepentingannya',
  'NIB (Nomor Induk Berusaha) adalah identitas tunggal usaha di Indonesia. Pelajari fungsi, manfaat, dan cara mengurusnya.',
  '<p>NIB adalah nomor identitas tunggal yang wajib dimiliki setiap pelaku usaha di Indonesia, baik perorangan maupun badan usaha.</p><h2>Fungsi NIB</h2><ul><li>Identitas resmi usaha</li><li>Pintu masuk perizinan berusaha (OSS)</li><li>Syarat mengikuti tender dan kerja sama bisnis</li></ul><h2>Cara Mengurus NIB</h2><p>NIB bisa diurus melalui sistem OSS (Online Single Submission) secara mandiri atau melalui jasa biro jasa untuk proses yang lebih praktis.</p>',
  'NIB',
  'Admin',
  '2025-02-20 10:00:00'
),
(
  'Panduan Mendirikan PT Perorangan di Indonesia 2025',
  'panduan-pt-perorangan-indonesia-2025',
  'PT Perorangan adalah bentuk badan usaha baru yang memungkinkan satu orang mendirikan PT. Simak syarat dan prosesnya.',
  '<p>PT Perorangan diatur dalam UU Cipta Kerja, memungkinkan satu orang mendirikan perseroan terbatas tanpa perlu mitra.</p><h2>Syarat Pendirian</h2><ul><li>KTP pemohon</li><li>NPWP Pribadi</li><li>Email dan nomor HP aktif</li><li>Data KBLI (Klasifikasi Baku Lapangan Usaha)</li></ul><h2>Keuntungan PT Perorangan</h2><p>Proses lebih sederhana, biaya relatif terjangkau, dan memberikan status badan hukum resmi untuk usaha Anda.</p>',
  'PT Perorangan',
  'Admin',
  '2025-03-10 10:00:00'
),
(
  '5 Kesalahan Umum Saat Mengurus NPWP yang Harus Dihindari',
  'kesalahan-umum-saat-mengurus-npwp',
  'Hindari kesalahan-kesalahan berikut agar proses pembuatan NPWP Anda tidak tertunda atau ditolak.',
  '<p>Banyak orang mengalami kendala saat mengurus NPWP karena kesalahan kecil. Berikut yang perlu dihindari:</p><ol><li><strong>Data tidak sesuai KTP</strong> - Nama, NIK, dan alamat harus identik dengan KTP.</li><li><strong>Email tidak aktif</strong> - NPWP elektronik dikirim ke email, pastikan bisa diakses.</li><li><strong>Dokumen tidak jelas</strong> - Scan/foto harus terbaca jelas, tidak buram.</li><li><strong>Mengisi formulir salah</strong> - Perhatikan jenis wajib pajak yang dipilih.</li><li><strong>Tidak follow up</strong> - Pantau status pengajuan secara berkala.</li></ol>',
  'Tips',
  'Admin',
  '2025-04-05 10:00:00'
);
