import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI workspace App",
  description: "this app powered by AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sesstion=await getServerSession(authOptions)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1>user name: {sesstion?.user.name}</h1>
        <h2>user Role: {sesstion?.user.role==='ADMIN'?'admin':'user'}</h2>
        <h2>user email: {sesstion?.user.email}</h2>
        {children}
      </body>
    </html>
  );
}
