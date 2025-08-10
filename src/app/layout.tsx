import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Ephesis } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });
const ephesis = Ephesis({ subsets: ["latin"], weight: "400", variable: "--font-ephesis" });

import Header from "../components/layout/Header";

export const metadata: Metadata = {
  title: "ohei's Portfolio",
  description: "WEBデザイナー Haraya Kohei のポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJp.variable} ${ephesis.variable}`}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
