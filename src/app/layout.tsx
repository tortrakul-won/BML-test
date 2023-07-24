import "./globals.css";
import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";

const baiJam = Bai_Jamjuree({
  subsets: ["thai", "latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bai-jamjuree",
});
export const metadata: Metadata = {
  title: "BML test",
  description: "test from BML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baiJam.variable} bg-[#333]`}>
      <body>{children}</body>
    </html>
  );
}
