import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const linkClass = (href) => {
    const isActive = location.pathname === href;
    return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-600 bg-brand-50'
        : 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
    }`;
  };

  const mobileLinkClass = (href) => {
    const isActive = location.pathname === href;
    return `block px-4 py-3 rounded-xl font-medium transition-colors ${
      isActive
        ? 'bg-brand-50 text-brand-600'
        : 'text-slate-700 hover:bg-brand-50 hover:text-brand-600'
    }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-slate-100">
      <nav className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo className="h-14 md:h-16 w-auto" />

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="whatsapp" size="sm" href={SITE_CONFIG.whatsappLink}>
              Hubungi Kami
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className={mobileLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="whatsapp"
                size="md"
                href={SITE_CONFIG.whatsappLink}
                className="w-full"
              >
                Hubungi WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
