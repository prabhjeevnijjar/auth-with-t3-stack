import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "~/components/Header";
import ToastProvider from "~/components/ToastComponent";

export const metadata: Metadata = {
  title: "Create Hobby App",
  description: "User hobby selection",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="container mx-auto">
        <Header />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
