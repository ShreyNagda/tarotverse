import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "TarotVerse - Tarot Card Reader",
  description:
    "Unlock the mysteries of your future through the ancient wisdom of Tarot",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="images/icon.png" type="image/png" />
      <body className={`${inter.className}`}>
        <ToastContainer position="top-center" hideProgressBar />
        {children}
      </body>
    </html>
  );
}
