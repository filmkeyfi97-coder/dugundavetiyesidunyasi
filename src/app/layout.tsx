import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "../analytics/GoogleTagManager";
import GoogleTagManagerNoScript from "../analytics/GoogleTagManagerNoScript";
import GoogleAnalytics from "../analytics/GoogleAnalytics";
import SchemaMarkup from "../analytics/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Düğün Davetiyesi Dünyası - Özel Tasarım Davetiyeler",
  description: "Hayalinizdeki düğün davetiyesini tasarlayın ve özel anlarınızı unutulmaz kılın. Özel tasarım, hızlı teslimat ve kalite garantisi.",
  keywords: "düğün davetiyesi, özel tasarım, davetiye baskı, düğün organizasyonu",
  authors: [{ name: "Düğün Davetiyesi Dünyası" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Düğün Davetiyesi Dünyası - Özel Tasarım Davetiyeler",
    description: "Hayalinizdeki düğün davetiyesini tasarlayın ve özel anlarınızı unutulmaz kılın.",
    url: "https://dugundavetiyesidunyasi.com",
    siteName: "Düğün Davetiyesi Dünyası",
    images: [
      {
        url: "https://dugundavetiyesidunyasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Düğün Davetiyesi Dünyası",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Düğün Davetiyesi Dünyası - Özel Tasarım Davetiyeler",
    description: "Hayalinizdeki düğün davetiyesini tasarlayın ve özel anlarınızı unutulmaz kılın.",
    images: ["https://dugundavetiyesidunyasi.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  other: {
    'msapplication-TileColor': '#3B82F6',
    'msapplication-TileImage': '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
        <SchemaMarkup />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}
