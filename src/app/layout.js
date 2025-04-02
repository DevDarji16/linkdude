import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata={
//   title:'LyncNest',
//   description: "Create and manage beautiful link-in-bio pages with Lyncnest.",
//   other: {
//     "google-site-verification": "JfU8igH1zHErnM1AZvwKvXb9RdduaneLT38zZiSLO9o",
//   }
// }


export const metadata = {
  title: "Lyncnest",
  description: "Create and manage beautiful link-in-bio pages with Lyncnest.",
  openGraph: {
    title: "Lyncnest",
    description: "Create and manage beautiful link-in-bio pages with Lyncnest.",
    url: "https://lyncnest.vercel.app",
    siteName: "LyncNest",
  
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
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
