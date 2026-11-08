import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QuoteProvider } from '@/lib/QuoteContext';
import CustomCursor from '@/components/layout/CustomCursor';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import QuoteModal from '@/components/shared/QuoteModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuoteProvider>
      <CustomCursor />
      <WhatsAppButton />
      <QuoteModal />
      <Component {...pageProps} />
    </QuoteProvider>
  );
}
