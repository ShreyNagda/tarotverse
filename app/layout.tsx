import type { Metadata } from "next";
import "./globals.css";
import { Inter, Cinzel } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "TarotVerse - Tarot Card Reader",
  description:
    "Unlock the mysteries of your future through the ancient wisdom of Tarot",
};

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer position="top-center" hideProgressBar />
        {children}
      </body>
    </html>
  );
}
