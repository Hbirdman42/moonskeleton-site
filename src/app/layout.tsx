import type { Metadata } from "next";
import { Creepster, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const heading = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MoonSkeleton | Moon Skeleton Loves You",
    template: "%s | MoonSkeleton",
  },
  description:
    "Fan-made merch inspired by King Gizzard & the Lizard Wizard. T-shirts, woven blankets, and original designs.",
  keywords: [
    "King Gizzard",
    "Lizard Wizard",
    "band merch",
    "fan merch",
    "t-shirts",
    "woven blankets",
    "MoonSkeleton",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
