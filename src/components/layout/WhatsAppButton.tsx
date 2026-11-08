import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface WhatsAppProps {
  number?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({ number: initialNumber, defaultMessage: initialMessage }: WhatsAppProps) {
  const [number, setNumber] = useState(initialNumber || '');
  const [message, setMessage] = useState(
    initialMessage || 'Merhaba, Bayraktar Creative hizmetleri hakkında bilgi ve projem için teklif almak istiyorum.'
  );
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    // If not provided in props, fetch settings
    if (!initialNumber) {
      fetch('/api/settings')
        .then((res) => res.json())
        .then((data) => {
          if (data?.whatsappNumber) setNumber(data.whatsappNumber);
          if (data?.whatsappDefaultMessage) setMessage(data.whatsappDefaultMessage);
        })
        .catch(() => {});
    }
  }, [initialNumber]);

  const cleanNumber = number ? number.replace(/[^0-9]/g, '') : '';
  const hasValidNumber = cleanNumber.length >= 8;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasValidNumber) {
      e.preventDefault();
      openQuoteModal('WhatsApp İletişim');
    }
  };

  const whatsappUrl = hasValidNumber
    ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
    : '#teklif';

  return (
    <aside
      aria-label="Hızlı İletişim"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <a
        href={whatsappUrl}
        onClick={handleClick}
        target={hasValidNumber ? '_blank' : '_self'}
        rel="noopener noreferrer"
        aria-label="WhatsApp üzerinden mesaj gönderin"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#18181B]/90 hover:bg-[#232326] text-white border border-white/10 hover:border-white/25 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-emerald-400 transition-transform group-hover:rotate-12" />
        <span className="text-xs font-medium tracking-wide">
          {hasValidNumber ? 'WhatsApp İletişim' : 'Hızlı Teklif Al'}
        </span>
      </a>
    </aside>
  );
}
