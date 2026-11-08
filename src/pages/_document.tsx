import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr" className="dark bg-[#0A0A0A] text-[#FAFAFA]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body className="bg-[#0A0A0A] text-[#FAFAFA] antialiased selection:bg-[#FAFAFA] selection:text-[#0A0A0A]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
