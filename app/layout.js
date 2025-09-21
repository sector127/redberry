import { Poppins } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { LogIn } from "@/components/LogIn";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { NavBar } from "@/components/NavBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "RedSteam Clothing",
  description: "Redberry task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ClientSessionProvider >
        <header className="h-[80px] flex items-center justify-between py-2.5 px-[100]">
          <NavBar />
        </header>
        <main className="fixed-canvas">{children}</main>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
