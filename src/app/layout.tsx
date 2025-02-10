import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers/Providers";

export const metadata: Metadata = {
  title: "Users and Posts",
  description: "An app to display users and posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
