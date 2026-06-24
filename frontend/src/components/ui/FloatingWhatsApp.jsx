import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/utils/constants';

export default function FloatingWhatsApp() {
  return (
    <a
      href={SITE_CONFIG.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:bg-emerald-600"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
