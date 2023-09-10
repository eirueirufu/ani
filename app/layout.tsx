import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "ANI",
  description: "An Animation information website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
