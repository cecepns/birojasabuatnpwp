import { Check, Star } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { PRODUCTS, formatPrice } from '@/data/products';
import { SITE_CONFIG } from '@/utils/constants';

export default function Services({ pageTop = false }) {
  return (
    <section
      className={`${pageTop ? 'pb-16 md:pb-24' : 'section-padding'} bg-slate-50`}
    >
      <div className="container-main">
        <SectionTitle
          badge="Layanan Kami"
          title="Paket Layanan & Harga"
          subtitle="Pilih layanan yang sesuai kebutuhan Anda. Semua paket sudah termasuk pendampingan proses hingga selesai."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl p-6 md:p-8 shadow-card border transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
                  product.popular
                    ? 'border-brand-300 ring-2 ring-brand-100'
                    : 'border-slate-100'
                }`}
              >
                {product.popular && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    Populer
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-5 mb-6">
                  <span className="text-3xl font-extrabold text-brand-600">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="space-y-2.5 mb-8">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Syarat Dokumen
                  </p>
                  {product.requirements.map((req) => (
                    <div key={req} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{req}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="whatsapp"
                  size="md"
                  href={`${SITE_CONFIG.whatsappLink}?text=Halo, saya tertarik dengan layanan ${product.title}`}
                  className="w-full"
                >
                  Pesan Sekarang
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
