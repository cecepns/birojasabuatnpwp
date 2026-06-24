require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'birojasanpwp',
  waitForConnections: true,
  connectionLimit: 10,
});

const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const buildPagination = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit) || 0,
});

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ success: true, message: 'Server & database OK' });
  } catch {
    res.status(503).json({ success: false, message: 'Database connection failed' });
  }
});

// GET /api/articles
app.get('/api/articles', async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const search = sanitize(req.query.search || '');
    const sort = ['published_at', 'title', 'created_at'].includes(req.query.sort)
      ? req.query.sort
      : 'published_at';
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const category = sanitize(req.query.category || '');

    let where = "WHERE status = 'published'";
    const params = [];

    if (search) {
      where += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (category) {
      where += ' AND category = ?';
      params.push(category);
    }

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM articles ${where}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, image_url, category, author, published_at
       FROM articles ${where}
       ORDER BY ${sort} ${order}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: buildPagination(page, limit, total),
    });
  } catch (err) {
    console.error('GET /api/articles error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel' });
  }
});

// GET /api/articles/:slug
app.get('/api/articles/:slug', async (req, res) => {
  try {
    const slug = sanitize(req.params.slug);
    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, content, image_url, category, author, published_at
       FROM articles WHERE slug = ? AND status = 'published' LIMIT 1`,
      [slug]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('GET /api/articles/:slug error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel' });
  }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const service = sanitize(req.body.service || '');
    const message = sanitize(req.body.message);

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nama, email, nomor HP, dan pesan wajib diisi',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Format email tidak valid' });
    }

    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, service, message]
    );

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim. Kami akan segera menghubungi Anda.',
    });
  } catch (err) {
    console.error('POST /api/contact error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
