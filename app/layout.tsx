import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elbernberdera-portfolio.vercel.app"),
  title: {
    default: "Elbern S. Berdera | Full-Stack Web Developer",
    template: "%s | Elbern S. Berdera",
  },
  description:
    "Portfolio of Elbern S. Berdera, a full-stack web developer building custom web applications, internal tools, backend APIs, database integrations, and automated data pipelines.",
  keywords: [
    "Elbern Berdera",
    "Full-Stack Web Developer",
    "Django Developer",
    "Laravel Developer",
    "Next.js Developer",
    "Backend API Developer",
    "PostgreSQL",
    "MongoDB",
    "Data Pipelines",
    "Butuan City",
    "Philippines",
  ],
  authors: [{ name: "Elbern S. Berdera" }],
  creator: "Elbern S. Berdera",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Elbern S. Berdera | Full-Stack Web Developer",
    description:
      "Custom web applications, internal tools, backend APIs, database integrations, and automated data workflows for startups and remote teams.",
    siteName: "Elbern S. Berdera Portfolio",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elbern S. Berdera | Full-Stack Web Developer",
    description:
      "Custom web applications, internal tools, backend APIs, database integrations, and automated data workflows.",
  },
  robots: {
    index: true,
    follow: true,
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