import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const heading = Space_Grotesk({
  weight: ["500", "600", "700"],
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
        <CartProvider>
          <div className="bg-foreground text-center text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-background py-2.5 px-4">
            Moon Skeleton Loves You
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
