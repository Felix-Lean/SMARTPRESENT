import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from 'next/script';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: 'Smartpresent',
  description: 'Dein cleverer Geschenke Finder',
  icons: {
    icon: '/gift-favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YSHFRNTY56`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YSHFRNTY56', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <div className="gift-ribbon-left"></div>
        <div className="gift-ribbon-right"></div>
        <div className="pb-16 min-h-screen">
          {children}
        </div>
        
        <footer className="fixed bottom-0 right-0 p-4 text-xs text-gray-500 z-50 bg-white bg-opacity-80 rounded-tl-md">
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
        </footer>
      </body>
    </html>
  );
}
