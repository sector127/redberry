import { Poppins } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "@/providers/ClientSessionProvider";
import { NavBar } from "@/components/NavBar";
import { getServerSession } from "next-auth"; // Add this import
import { authOptions } from "./api/auth/[...nextauth]/route";
import ToastProvider from "@/providers/ToastProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "RedSteam Clothing",
  description: "Redberry task",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ClientSessionProvider session={session}>
          <ToastProvider>
            <header className="h-[80px] flex items-center justify-between py-2.5 px-[100px]">
              <NavBar />
            </header>
            <main className="fixed-canvas">{children}</main>
          </ToastProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
