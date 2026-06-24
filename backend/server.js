require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'birojasanpwp-jwt-secret';

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

const slugify = (text) =>
  sanitize(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

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

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token tidak valid' });
  }
};

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ success: true, message: 'Server & database OK' });
  } catch {
    res.status(503).json({ success: false, message: 'Database connection failed' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows.length || !bcrypt.compareSync(password, rows[0].password)) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (err) {
    console.error('POST /api/auth/login error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal login' });
  }
});

// GET /api/auth/profile
app.get('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1',
      [req.user.id]
    );
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('GET /api/auth/profile error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil profil' });
  }
});

// GET /api/articles (public)
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

// GET /api/articles/:slug (public)
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

// --- ADMIN ROUTES ---

// GET /api/admin/articles
app.get('/api/admin/articles', authMiddleware, async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const search = sanitize(req.query.search || '');
    const sort = ['published_at', 'title', 'created_at', 'status'].includes(req.query.sort)
      ? req.query.sort
      : 'created_at';
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const status = sanitize(req.query.status || '');

    let where = 'WHERE 1=1';
    const params = [];

    if (search) {
      where += ' AND (title LIKE ? OR excerpt LIKE ? OR category LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (status && ['draft', 'published'].includes(status)) {
      where += ' AND status = ?';
      params.push(status);
    }

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM articles ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, category, author, status, published_at, created_at
       FROM articles ${where}
       ORDER BY ${sort} ${order}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: buildPagination(page, limit, countRows[0].total),
    });
  } catch (err) {
    console.error('GET /api/admin/articles error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel' });
  }
});

// GET /api/admin/articles/:id
app.get('/api/admin/articles/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ? LIMIT 1', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('GET /api/admin/articles/:id error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel' });
  }
});

// POST /api/admin/articles
app.post('/api/admin/articles', authMiddleware, async (req, res) => {
  try {
    const title = sanitize(req.body.title);
    const excerpt = sanitize(req.body.excerpt || '');
    const content = sanitize(req.body.content || '');
    const category = sanitize(req.body.category || '');
    const author = sanitize(req.body.author || 'Admin');
    const status = req.body.status === 'draft' ? 'draft' : 'published';
    const image_url = sanitize(req.body.image_url || '') || null;
    let slug = slugify(req.body.slug || title);

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi' });
    }

    const [existing] = await pool.query('SELECT id FROM articles WHERE slug = ?', [slug]);
    if (existing.length) slug = `${slug}-${Date.now()}`;

    const [result] = await pool.query(
      `INSERT INTO articles (title, slug, excerpt, content, image_url, category, author, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [title, slug, excerpt, content, image_url, category, author, status]
    );

    res.status(201).json({
      success: true,
      message: 'Artikel berhasil ditambahkan',
      data: { id: result.insertId },
    });
  } catch (err) {
    console.error('POST /api/admin/articles error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menambahkan artikel' });
  }
});

// PUT /api/admin/articles/:id
app.put('/api/admin/articles/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const title = sanitize(req.body.title);
    const excerpt = sanitize(req.body.excerpt || '');
    const content = sanitize(req.body.content || '');
    const category = sanitize(req.body.category || '');
    const author = sanitize(req.body.author || 'Admin');
    const status = req.body.status === 'draft' ? 'draft' : 'published';
    const image_url = sanitize(req.body.image_url || '') || null;
    const slug = slugify(req.body.slug || title);

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Judul dan konten wajib diisi' });
    }

    const [result] = await pool.query(
      `UPDATE articles SET title=?, slug=?, excerpt=?, content=?, image_url=?, category=?, author=?, status=?
       WHERE id=?`,
      [title, slug, excerpt, content, image_url, category, author, status, id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
    }

    res.json({ success: true, message: 'Artikel berhasil diperbarui' });
  } catch (err) {
    console.error('PUT /api/admin/articles/:id error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal memperbarui artikel' });
  }
});

// DELETE /api/admin/articles/:id
app.delete('/api/admin/articles/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
    }
    res.json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch (err) {
    console.error('DELETE /api/admin/articles/:id error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menghapus artikel' });
  }
});

// GET /api/admin/contacts
app.get('/api/admin/contacts', authMiddleware, async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const search = sanitize(req.query.search || '');
    const isRead = req.query.is_read;

    let where = 'WHERE 1=1';
    const params = [];

    if (search) {
      where += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (isRead === '0' || isRead === '1') {
      where += ' AND is_read = ?';
      params.push(parseInt(isRead, 10));
    }

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM contact_messages ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT id, name, email, phone, service, message, is_read, created_at
       FROM contact_messages ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: buildPagination(page, limit, countRows[0].total),
    });
  } catch (err) {
    console.error('GET /api/admin/contacts error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil pesan kontak' });
  }
});

// PATCH /api/admin/contacts/:id/read
app.patch('/api/admin/contacts/:id/read', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const isRead = req.body.is_read ? 1 : 0;
    const [result] = await pool.query('UPDATE contact_messages SET is_read = ? WHERE id = ?', [
      isRead,
      id,
    ]);
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
    }
    res.json({ success: true, message: 'Status pesan diperbarui' });
  } catch (err) {
    console.error('PATCH /api/admin/contacts/:id/read error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal memperbarui status pesan' });
  }
});

// DELETE /api/admin/contacts/:id
app.delete('/api/admin/contacts/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
    }
    res.json({ success: true, message: 'Pesan berhasil dihapus' });
  } catch (err) {
    console.error('DELETE /api/admin/contacts/:id error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menghapus pesan' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
