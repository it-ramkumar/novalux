import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "NovaLux | Premium Triple Van Seat with Recline & Bed Conversion",
  description: "Upgrade your camper van with NovaLux premium convertible triple van seat to bed. Space-saving, 6-foot bed, black leather finish.",
  keywords: "van seat, camper van seat, van bed conversion, swivel seat, reclinable seat, NovaLux, van conversion, sprinter seat, transit seat",
  authors: [{ name: "NovaLux" }],
  openGraph: {
    title: "NovaLux | Premium Triple Van Seat with Recline & Bed Conversion",
    description: "Premium convertible triple van seat to bed for luxury van conversions",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav-icon2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/fav-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0a]`}
      >
        {children}
      </body>
    </html>
  );
}