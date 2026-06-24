import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/utils/constants';

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl gradient-hero px-8 py-12 md:px-16 md:py-16 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/15 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Urus NPWP & Legalitas Usaha?
            </h2>
            <p className="text-blue-100/80 text-lg mb-8">
              Konsultasi gratis sekarang. Tim kami siap membantu Anda memilih
              layanan yang tepat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="whatsapp" size="lg" href={SITE_CONFIG.whatsappLink}>
                Chat WhatsApp
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg" to="/kontak">
                Kirim Pesan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
