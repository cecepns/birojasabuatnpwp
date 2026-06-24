import { Zap, HeadphonesIcon, BadgeCheck, Wallet } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const FEATURES = [
  {
    icon: Zap,
    title: 'Proses Cepat',
    description:
      'Pengurusan online tanpa antre. NPWP pribadi bisa selesai dalam 1-3 hari kerja.',
  },
  {
    icon: BadgeCheck,
    title: 'Legal & Terpercaya',
    description:
      'Semua proses sesuai regulasi DJP dan OSS. Dokumen Anda aman bersama kami.',
  },
  {
    icon: Wallet,
    title: 'Harga Transparan',
    description:
      'Tidak ada biaya tersembunyi. Harga yang tertera sudah all-in untuk layanan standar.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Konsultasi Gratis',
    description:
      'Tim kami siap membantu memilih layanan yang tepat via WhatsApp atau email.',
  },
];

export default function WhyUs({ pageTop = false }) {
  return (
    <section className={pageTop ? 'pt-24 pb-16 md:pb-24' : 'section-padding'}>
      <div className={`container-main ${pageTop ? 'pt-6 md:pt-8' : ''}`}>
        <SectionTitle
          badge="Mengapa Kami"
          title="Partner Terpercaya untuk Legalitas Usaha Anda"
          subtitle="Kami memahami betapa pentingnya NPWP dan perizinan usaha. Itulah mengapa kami hadir dengan layanan yang profesional, cepat, dan mudah diakses."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
