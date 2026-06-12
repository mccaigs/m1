import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { rootStructuredData, siteConfig, siteUrl, socialImageUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  applicationName: siteConfig.name,
  category: "technology",
  creator: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "AI consultancy Scotland",
    "AI automation Scotland",
    "business automation Scotland",
    "custom software development Scotland",
    "deterministic AI systems",
    "Edinburgh technical studio",
    "internal business systems",
    "startup product development",
  ],
  metadataBase: new URL(siteUrl),
  other: {
    "geo.placename": "Edinburgh",
    "geo.region": "GB-SCT",
  },
  publisher: siteConfig.legalName,
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: "%s | McCaigs",
  },
  icons: {
    apple: "/apple-icon",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    description: siteConfig.description,
    images: [{ alt: `${siteConfig.name} team working in the Edinburgh studio`, height: 720, url: socialImageUrl, width: 1280 }],
    locale: "en_GB",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    type: "website",
    url: siteUrl,
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    images: [socialImageUrl],
    site: "@mccaigs",
    title: `${siteConfig.name} | ${siteConfig.title}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={rootStructuredData} />
        {children}
      </body>
    </html>
  );
}
