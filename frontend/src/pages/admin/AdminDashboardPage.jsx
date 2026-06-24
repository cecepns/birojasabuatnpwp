import { FileText, Mail, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Kelola Artikel',
    desc: 'Tambah, edit, dan hapus artikel blog',
    to: '/admin/articles',
    icon: FileText,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Pesan Kontak',
    desc: 'Lihat pesan dari form kontak website',
    to: '/admin/kontak',
    icon: Mail,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Lihat Website',
    desc: 'Buka halaman publik website',
    to: '/',
    icon: Eye,
    color: 'bg-violet-50 text-violet-600',
    external: true,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h2>
      <p className="text-slate-500 mb-8">Selamat datang di panel admin Biro Jasa NPWP</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ title, desc, to, icon: Icon, color, external }) => (
          external ? (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:-translate-y-0.5 hover:shadow-glow transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-500">{desc}</p>
            </a>
          ) : (
            <Link
              key={to}
              to={to}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:-translate-y-0.5 hover:shadow-glow transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-500">{desc}</p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
