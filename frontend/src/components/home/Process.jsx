import SectionTitle from '@/components/ui/SectionTitle';

const STEPS = [
  {
    step: '01',
    title: 'Konsultasi',
    description: 'Hubungi kami via WhatsApp atau form kontak. Jelaskan kebutuhan layanan Anda.',
  },
  {
    step: '02',
    title: 'Kirim Dokumen',
    description: 'Kirim dokumen persyaratan sesuai paket layanan yang dipilih.',
  },
  {
    step: '03',
    title: 'Proses Pengurusan',
    description: 'Tim kami memproses pengajuan Anda ke sistem resmi DJP/OSS.',
  },
  {
    step: '04',
    title: 'Selesai & Terima',
    description: 'Dokumen jadi dikirim ke email Anda. NPWP/NIB/PT siap digunakan!',
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-main">
        <SectionTitle
          badge="Cara Kerja"
          title="Proses Mudah dalam 4 Langkah"
          subtitle="Tidak perlu datang ke kantor. Semua bisa dikerjakan dari rumah dengan bantuan tim profesional kami."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, index) => (
            <div key={item.step} className="relative">
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-brand-300 to-brand-100" />
              )}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 h-full">
                <span className="inline-block text-4xl font-extrabold text-brand-100 mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
