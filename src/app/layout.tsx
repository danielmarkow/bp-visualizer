import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blood Pressure Visualizer",
  description: "Blood pressure readings for humans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
