import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./extra.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frameflow — AI video briefing studio",
  description: "Turn property details into a clear, ready-to-shoot video plan.",
  openGraph: {
    title: "Frameflow — AI video briefing studio",
    description: "Turn property details into direction.",
    images: ["/og-frameflow.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frameflow — AI video briefing studio",
    description: "Turn property details into direction.",
    images: ["/og-frameflow.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
