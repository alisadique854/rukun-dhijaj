import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";

import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rukundhijaj.com"),

  title: {
    default: "CHICKEN CORNER",
    template: "%s | Chicken Corner  ",
  },

  description:
    "Chicken Corner   - Premium restaurant serving broast, burgers, pizza, shawarma, grills and fast delivery.",

  keywords: [
    "Chicken Corner",
    "ركن الدجاج",
    "Broast",
    "Burger",
    "Pizza",
    "Shawarma",
    "Grills",
    "Restaurant",
    "Food Delivery",
    "Saudi Arabia",
    "Jeddah",
    "Broasted Chicken",
    "Fast Food",
  ],

  applicationName: "Chicken Corner",

  authors: [
    {
      name: "Chicken Corner",
    },
  ],

  creator: "Chicken Corner",
  publisher: "Chicken Corner",

  verification: {
    google: "-s3p2iHv6ZRas9MfUScsyi5U1YLXYnSOXvonnqDsx1E",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://rukundhijaj.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rukundhijaj.com",
    siteName: "Chicken Corner",
    title: "Chicken Corner",
    description:
      "Premium restaurant serving broast, burgers, pizza, shawarma and grills.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Chicken Corner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chicken Corner",
    description:
      "Premium restaurant serving broast, burgers, pizza, shawarma and grills.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0F0F10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#0F0F10] text-white">
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}