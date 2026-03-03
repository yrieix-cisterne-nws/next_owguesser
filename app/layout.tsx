import type { Metadata } from "next";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css"; // Vos styles globaux

export const metadata: Metadata = {
  title: "OWGuesser",
  description: "Guess the Overwatch heroes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-[#d7dbdd]">
          <Header />
          <main className="flex justify-center items-center min-h-auto grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}