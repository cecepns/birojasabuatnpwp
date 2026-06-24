import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/utils/constants';
import heroImage from '@/assets/hero-image.png';

export default function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-400/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="order-1 lg:order-1 lg:col-start-1 lg:row-start-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 text-accent-400" />
              Terpercaya & Legal
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Jasa Pembuatan{' '}
              <span className="text-gradient">NPWP, NIB & PT</span>{' '}
              Cepat & Terpercaya
            </h1>

            <p className="mt-6 text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Urus perizinan pajak dan legalitas usaha Anda tanpa ribet. Proses
              online, harga transparan, pembayaran bisa setelah selesai, didampingi
              tim profesional berpengalaman.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="whatsapp" size="lg" href={SITE_CONFIG.whatsappLink}>
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link
                to="/layanan"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 text-base"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>

          <div className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent rounded-3xl pointer-events-none lg:hidden" />
              <img
                src={heroImage}
                alt="Konsultan jasa pembuatan NPWP dan NIB profesional"
                className="w-full h-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[560px] object-contain object-bottom mx-auto lg:mr-0 drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="order-3 lg:order-3 lg:col-start-1 lg:row-start-2 mt-0 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Proses Cepat' },
              { icon: Shield, label: '100% Legal & Aman' },
              { icon: CheckCircle2, label: '500+ Klien Puas' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <Icon className="w-5 h-5 text-accent-400 shrink-0" />
                <span className="text-sm text-blue-100 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
