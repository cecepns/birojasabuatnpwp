import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Mail,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/ui/Logo';

const MENU = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/articles', label: 'Artikel', icon: FileText },
  { to: '/admin/kontak', label: 'Pesan Kontak', icon: Mail },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout, user } = useAuth();

  const navContent = (
    <>
      <div className="px-5 py-6 border-b border-slate-100">
        <Logo className="h-10 w-auto" />
        <p className="mt-3 text-xs text-slate-500">Admin Panel</p>
        {user && (
          <p className="mt-1 text-sm font-medium text-slate-700 truncate">{user.name}</p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {MENU.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </NavLink>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          Lihat Website
        </a>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-slate-100">
        {navContent}
      </aside>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white flex flex-col shadow-xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
