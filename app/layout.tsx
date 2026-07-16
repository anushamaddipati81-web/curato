import type { Metadata } from "next";
import "./globals.css";
import { WorkspaceProvider } from "@/lib/workspace-context";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Curato — Discover products for your Instagram carousels",
  description: "Find real products faster and collect links for creating Instagram carousels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WorkspaceProvider>
          <div className="min-h-screen">
            <Navbar />
            <main className="pb-20">{children}</main>
          </div>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
