import { Mail, Phone, MapPin } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/contact/ContactForm';
import Button from '@/components/ui/Button';
import PageLayout from '@/components/layout/PageLayout';
import { SITE_CONFIG } from '@/utils/constants';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container-main pt-6 md:pt-8">
          <SectionTitle
            badge="Hubungi Kami"
            title="Konsultasi Gratis Sekarang"
            subtitle="Punya pertanyaan seputar NPWP, NIB, atau PT? Tim kami siap membantu Anda."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Informasi Kontak</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Email</p>
                        <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">
                          {SITE_CONFIG.email}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE_CONFIG.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">WhatsApp</p>
                        <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
                          {SITE_CONFIG.whatsapp}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Area Layanan</p>
                      <p className="text-sm font-semibold text-slate-700">
                        Seluruh Indonesia (Online)
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Lebih Cepat via WhatsApp</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Chat langsung dengan tim kami untuk konsultasi gratis dan respon lebih cepat.
                </p>
                <Button variant="whatsapp" size="md" href={SITE_CONFIG.whatsappLink} className="w-full">
                  Chat WhatsApp
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-card border border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Kirim Pesan</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
