import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/utils/constants';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-main section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo variant="white" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Menu</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Layanan</h3>
            <ul className="space-y-2.5 text-sm">
              <li>NPWP Pribadi</li>
              <li>NPWP Badan</li>
              <li>NIB Pribadi & Badan</li>
              <li>PT Perorangan</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2.5 text-sm hover:text-accent-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-accent-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                  {SITE_CONFIG.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <span>Layanan online seluruh Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            {SITE_CONFIG.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
