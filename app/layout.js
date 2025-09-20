import { Poppins } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { LogIn } from "@/components/LogIn";

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
        <header className="h-[80px] flex items-center justify-between py-2.5 px-[100]">
          <nav className="container mx-auto flex justify-between items-center">
            <Logo />
            <LogIn />
          </nav>
        </header>
        <main className="fixed-canvas">{children}</main>
      </body>
    </html>
  );
}
