import type { Metadata } from "next";
import "./globals.css";
import "../styles/hornets-theme.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: "Hornets Dashboard",
  description: "Charlotte Hornets Team Dashboard",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="min-h-screen honeycomb-bg">{children}</body>
      </UserProvider>
    </html>
  );
}
