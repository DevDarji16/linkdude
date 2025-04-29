import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CheckLogin } from "@/context/LoggedIn";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export const metadata = {
  title: "LinkDude – Your All-in-One Link Hub",
  description: "Create and manage beautiful link-in-bio pages with Linkdude.",
  openGraph: {
    title: "Linkdude",
    description: "Create and manage beautiful link-in-bio pages with Linkdude.",
    url: "https://linkdude.vercel.app",
    siteName: "Linkdude",
  
    type: "website",
  },
  
  other: {
    "google-site-verification": "JfU8igH1zHErnM1AZvwKvXb9RdduaneLT38zZiSLO9o",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        <CheckLogin>

        {children}
        </CheckLogin>
        </ThemeProvider>
      </body>
    </html>
  );
}
