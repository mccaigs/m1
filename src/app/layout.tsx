import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
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
  metadataBase: new URL("https://mccaigs.com"),
  title: {
    default: "McCaigs | Scotland's Elite Technical Studio",
    template: "%s | McCaigs",
  },
  description:
    "McCaigs is Scotland's Elite Technical Studio for ambitious businesses that need practical AI, automation, websites, internal systems, and digital products built properly.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    description:
      "Practical AI, automation, websites, internal systems, and digital products built properly for ambitious businesses.",
    locale: "en_GB",
    siteName: "McCaigs",
    title: "McCaigs | Scotland's Elite Technical Studio",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Practical AI, automation, websites, internal systems, and digital products built properly for ambitious businesses.",
    title: "McCaigs | Scotland's Elite Technical Studio",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
