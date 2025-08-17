import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Chat Assistant - 智能对话助手",
  description: "体验下一代AI对话技术，获得智能、准确、有用的回答",
  keywords: "AI, 聊天, 对话, 人工智能, 助手",
  authors: [{ name: "AI Chat Assistant" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
