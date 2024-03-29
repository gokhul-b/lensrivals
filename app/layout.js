import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import MobileNavbar from "@/components/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LensRivals",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <div className="lg:ml-32">
            <div className="lg:flex relative">
              <div className="hidden md:block">
                <SideBar />
              </div>
              <div className="md:hidden sticky top-0 z-10 bg-white">
                <MobileNavbar />
              </div>
              <div className="w-full">{children}</div>
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
