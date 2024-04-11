import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Title } from "./components/Title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human Visual Processing Test",
  description: "A test demonstrating the impressive speed and accuracy of human visual processing, and some applications to artificial intelligence and machine learning | Simon Marcus",
  authors: [{ name: "Simon Marcus", url: "https://🔗.to/simon" }],
  creator: "Simon Marcus",
  keywords: 'human visual processing, visual processing test, artificial intelligence, machine learning, computer vision, one-shot learning, simon marcus',
  icons: [
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: 'apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: 'android-chrome-512x512.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: 'android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: 'favicon.ico',
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " m-1 mb-0 md:m-4 md:mb-0 lg:m-6 lg:mb-0"}>
        <Title />
        {children}
        <div id='footer' className='footer text-center text-slate-500 mb-2'>
          <a rel='noopener' href='https://🔗.to/simon' target="_blank">Simon Marcus</a> | 
          <a rel='noopener' href='https://github.com/simon-marcus/visual-processing-test' target="_blank"> GitHub</a>
        </div>
      </body>
    </html>
  );
}
