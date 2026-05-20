import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASPIRE Galderma Rewards – Earn, redeem, save & repeat",
  description: "ASPIRE Galderma Rewards is designed to support and reward you at every stage of your aesthetic journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Qualified Agent Script */}
        <Script
          id="qualified-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,q){w['QualifiedObject']=q;w[q]=w[q]||function(){
              (w[q].q=w[q].q||[]).push(arguments)};})(window,'qualified');
            `,
          }}
        />
        <Script
          src="https://js.qualified.com/qualified.js?token=hq3Yb4HGJv229SCs"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
