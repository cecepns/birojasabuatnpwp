import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const FAQS = [
  {
    q: 'Berapa lama proses pembuatan NPWP pribadi?',
    a: 'Umumnya 1-3 hari kerja setelah dokumen lengkap diterima. Waktu bisa bervariasi tergantung antrean sistem DJP.',
  },
  {
    q: 'Apakah bisa urus NPWP tanpa datang ke kantor?',
    a: 'Ya, 100% online. Anda cukup kirim dokumen via WhatsApp/email dan kami yang proses seluruhnya.',
  },
  {
    q: 'Dokumen apa saja yang dibutuhkan untuk NPWP Badan?',
    a: 'Scan Akte Pendirian, Scan SK Kemenkumham, dan NIK Notaris. Tim kami akan konfirmasi kelengkapan sebelum proses dimulai.',
  },
  {
    q: 'Apakah harga sudah termasuk semua biaya?',
    a: 'Ya, harga yang tertera sudah all-in untuk layanan standar. Tidak ada biaya tersembunyi. Jika ada kebutuhan khusus, akan dikonfirmasi terlebih dahulu.',
  },
  {
    q: 'Bagaimana cara pembayaran?',
    a: 'Pembayaran dilakukan setelah konsultasi via transfer bank. Kami akan kirimkan detail rekening setelah Anda konfirmasi layanan.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Tentu. Kami menjaga kerahasiaan data klien dan hanya menggunakan dokumen untuk keperluan pengurusan resmi.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ pageTop = false }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className={`${pageTop ? 'pb-16 md:pb-24' : 'section-padding'} bg-slate-50`}
    >
      <div className="container-main">
        <SectionTitle
          badge="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Temukan jawaban atas pertanyaan umum seputar layanan pembuatan NPWP, NIB, dan PT."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.q}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
