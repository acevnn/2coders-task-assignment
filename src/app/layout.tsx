import type { Metadata } from "next";
import "../styles/globals.scss";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Football Hub",
    template: "%s | Football Hub",
  },
  description: "Sports and entertainment streaming platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Football Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
