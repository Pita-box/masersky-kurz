import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import TopicSidebar from "@/components/TopicSidebar";
import { getAllVypisy } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Masérský kurz",
  description: "Osobní výuková platforma a kvízy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vypisy = getAllVypisy();
  
  return (
    <html lang="cs">
      <body>
        <Navigation />
        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', width: '100%', alignItems: 'flex-start' }}>
          <TopicSidebar vypisy={vypisy} />
          <main style={{ flex: 1, padding: 'var(--spacing-20) var(--spacing-40)', minWidth: 0 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
