import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDebounce } from '@/hooks/useDebounce';
import Modal from '@/components/admin/Modal';
import Pagination from '@/components/admin/Pagination';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { isEditorContentEmpty } from '@/utils/editor';
import {
  fetchAdminArticles,
  fetchAdminArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/services/adminService';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  author: 'Admin',
  status: 'published',
  image_url: '',
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const debouncedSearch = useDebounce(search, 300);

  const loadArticles = useCallback(async (page = 1, limit = pagination.limit) => {
    setLoading(true);
    try {
      const res = await fetchAdminArticles({
        page,
        limit,
        search: debouncedSearch,
        sort: 'created_at',
        order: 'desc',
      });
      setArticles(res.data);
      setPagination(res.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pagination.limit]);

  useEffect(() => {
    loadArticles(1);
  }, [loadArticles]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = async (article) => {
    try {
      const res = await fetchAdminArticle(article.id);
      const full = res.data;
      setEditingId(article.id);
      setForm({
        title: full.title || '',
        slug: full.slug || '',
        excerpt: full.excerpt || '',
        content: full.content || '',
        category: full.category || '',
        author: full.author || 'Admin',
        status: full.status || 'published',
        image_url: full.image_url || '',
      });
      setModalOpen(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || isEditorContentEmpty(form.content)) {
      toast.error('Judul dan konten wajib diisi');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateArticle(editingId, form);
        toast.success('Artikel berhasil diperbarui');
      } else {
        await createArticle(form);
        toast.success('Artikel berhasil ditambahkan');
      }
      setModalOpen(false);
      loadArticles(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (article) => {
    toast(
      (t) => (
        <div>
          <p className="font-medium text-slate-900 mb-3">
            Hapus artikel &ldquo;{article.title}&rdquo;?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteArticle(article.id);
                  toast.success('Artikel berhasil dihapus');
                  loadArticles(pagination.page);
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium"
            >
              Hapus
            </button>
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Artikel</h2>
          <p className="text-sm text-slate-500">Kelola artikel blog website</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Artikel
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 text-slate-500">Belum ada artikel</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                  <th className="px-6 py-3 font-medium">Judul</th>
                  <th className="px-6 py-3 font-medium">Kategori</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{article.category || '-'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          article.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(article.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(article)}
                          className="p-2 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(article)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 pb-6">
          <Pagination
            pagination={pagination}
            onPageChange={(p) => loadArticles(p)}
            onLimitChange={(l) => loadArticles(1, l)}
          />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Artikel' : 'Tambah Artikel'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={inputClass}
                placeholder="auto dari judul"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar</label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Konten *</label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
