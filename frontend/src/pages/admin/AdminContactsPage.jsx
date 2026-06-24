import { useState, useEffect, useCallback } from 'react';
import { Search, Trash2, Loader2, Mail, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDebounce } from '@/hooks/useDebounce';
import Pagination from '@/components/admin/Pagination';
import {
  fetchAdminContacts,
  toggleContactRead,
  deleteContact,
} from '@/services/adminService';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const loadContacts = useCallback(async (page = 1, limit = pagination.limit) => {
    setLoading(true);
    try {
      const res = await fetchAdminContacts({
        page,
        limit,
        search: debouncedSearch,
      });
      setContacts(res.data);
      setPagination(res.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pagination.limit]);

  useEffect(() => {
    loadContacts(1);
  }, [loadContacts]);

  const handleToggleRead = async (contact) => {
    try {
      await toggleContactRead(contact.id, !contact.is_read);
      toast.success(contact.is_read ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca');
      loadContacts(pagination.page);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = (contact) => {
    toast(
      (t) => (
        <div>
          <p className="font-medium text-slate-900 mb-3">
            Hapus pesan dari {contact.name}?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteContact(contact.id);
                  toast.success('Pesan berhasil dihapus');
                  loadContacts(pagination.page);
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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Pesan Kontak</h2>
        <p className="text-sm text-slate-500">Pesan masuk dari form kontak website</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, pesan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">Belum ada pesan</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                  <th className="px-6 py-3 font-medium">Nama</th>
                  <th className="px-6 py-3 font-medium">Kontak</th>
                  <th className="px-6 py-3 font-medium">Layanan</th>
                  <th className="px-6 py-3 font-medium">Pesan</th>
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`hover:bg-slate-50/50 ${!contact.is_read ? 'bg-brand-50/30' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div>{contact.email}</div>
                      <div className="text-xs">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{contact.service || '-'}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                      {contact.message}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(contact.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleRead(contact)}
                          className="p-2 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          title={contact.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                        >
                          {contact.is_read ? (
                            <MailOpen className="w-4 h-4" />
                          ) : (
                            <Mail className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(contact)}
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
            onPageChange={(p) => loadContacts(p)}
            onLimitChange={(l) => loadContacts(1, l)}
          />
        </div>
      </div>
    </div>
  );
}
