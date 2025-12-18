import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Chess Timer",
  description:
    "Your pretty chess-timer",
  icons: {
    icon: "/chess-clock.svg",
  },
  openGraph: {
    title: "Chess Timer",
    description:
      "Your pretty chess-timer",
    url: "https://chesstimer.janhvi.me",
    siteName: "Chess Timer",
    images: [
      {
        url: "https://chesstimer.janhvi.me/og.png",
        width: 1200,
        height: 630,
        alt: "Chess Timer – Online Chess Clock",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chess Timer",
    description:
      "Your pretty chess-timer",
    images: ["https://chesstimer.janhvi.me/og.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
