import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wenhaogege - Full Stack Developer & AI Enthusiast",
  description: "Personal blog of wenhaogege - Full Stack Developer specializing in Next.js, HarmonyOS development, and AI applications. Software Team Lead at Zhejiang University Xlab.",
  keywords: ["Full Stack Developer", "Next.js", "HarmonyOS", "ArkTS", "AI", "Machine Learning", "Software Development", "Zhejiang University"],
  authors: [{ name: "wenhaogege", url: "https://github.com/wenhaogege66" }],
  creator: "wenhaogege",
  publisher: "wenhaogege",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wenhaogege.dpdns.org",
    title: "wenhaogege",
    description: "Personal blog sharing insights on modern web development, HarmonyOS development, and AI applications.",
    siteName: "wenhaogege's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "wenhaogege - Full Stack Developer & AI Enthusiast",
    description: "Personal blog sharing insights on modern web development, HarmonyOS development, and AI applications.",
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
