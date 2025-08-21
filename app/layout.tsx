
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Finley - Your AI CFO",
  description: "Your AI CFO in your pocket, hunting fees and negotiating bills.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/finley-hero.png",
      button: {
        title: "Launch Finley",
        action: {
          type: "launch_frame",
          name: "Finley",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/finley-splash.png",
          splashBackgroundColor: "#1a1f2e",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
