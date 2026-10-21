import type { Metadata, Viewport } from "next";
// Lettertypes (zelf-gehost via npm, geen Google-verbinding nodig)
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/caveat/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Happy State · De sportschool voor je binnenwereld",
  description:
    "Train je gedachten, emoties, intuïtie en zenuwstelsel met actieve groepslessen vol beweging, creativiteit en verbinding. Rotterdam.",
};

export const viewport: Viewport = { themeColor: "#F4EFE6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
