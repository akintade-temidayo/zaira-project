import { Geist } from "next/font/google";
import "./globals.css";

// ✅ removed Geist_Mono — it was preloading but never used
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ fixes the preload warning
});

export const metadata = {
  title: "Zaira - Food Blog",
  description: "Discover and share amazing recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}