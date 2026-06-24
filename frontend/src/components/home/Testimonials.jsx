import { Star, Quote } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const TESTIMONIALS = [
  {
    name: 'Budi Santoso',
    role: 'Pemilik UMKM',
    text: 'NPWP pribadi saya selesai dalam 2 hari. Prosesnya gampang, cukup kirim dokumen via WhatsApp. Recommended!',
    rating: 5,
  },
  {
    name: 'Dewi Lestari',
    role: 'Freelancer',
    text: 'Butuh NPWP untuk kerja remote ke luar negeri. Timnya responsif dan sabar jelasin step by step. Puas banget!',
    rating: 5,
  },
  {
    name: 'Ahmad Rizki',
    role: 'Pengusaha',
    text: 'Sudah 3x pakai jasa mereka untuk NPWP badan, NIB, dan PT perorangan. Selalu cepat dan harga sesuai.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <SectionTitle
          badge="Testimoni"
          title="Apa Kata Klien Kami"
          subtitle="Kepercayaan klien adalah prioritas utama. Berikut pengalaman mereka menggunakan layanan kami."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-slate-100 relative"
            >
              <Quote className="w-8 h-8 text-brand-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
