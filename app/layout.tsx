import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Title } from "./components/Title";
import { AboutButton } from "./components/AboutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human Visual Processing Test",
  description: "Advancing AI and computer vision by better understanding human spatial cognition and world models | Simon Marcus",
  twitter: {
    title: "Human Visual Processing Test",
    description: "Advancing AI and computer vision by better understanding human spatial cognition and world models | Simon Marcus",
    card: "summary_large_image",
    creator: "Simon Marcus",
    site: "https://visual-processing-test.onlyhumean.com",
    images: ["https://visual-processing-test.onlyhumean.com/icon.png"],
  },
  openGraph: {
    title: "Human Visual Processing Test",
    description: "Advancing AI and computer vision by better understanding human spatial cognition and world models | Simon Marcus",
    url: "https://visual-processing-test.onlyhumean.com",
    siteName: "Human Visual Processing Test",
    images: ["https://visual-processing-test.onlyhumean.com/icon.png"],
    locale: "en-US",
    type: "website",
  },
  authors: [{ name: "Simon Marcus", url: "https://🔗.to/simon" }],
  creator: "Simon Marcus",
  keywords: 'human visual processing, visual processing test, artificial intelligence, machine learning, computer vision, one-shot learning, simon marcus',
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
        <div id='footer' className='footer text-center text-slate-500 mb-2 pr-1 md:pr-6 lg:pr-12 w-full'>
          <a rel='noopener' href='https://🔗.to/simon' target="_blank">Simon Marcus</a> | 
          <a rel='noopener' href='https://github.com/simon-marcus/visual-processing-test' target="_blank"> GitHub</a> |
          <AboutButton />
        </div>
      </body>
    </html>
  );
}
