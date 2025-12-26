import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const gildaDisplay = localFont({
  src: "../../public/assets/fonts/GildaDisplay-Regular.ttf",
  variable: "--font-gilda-display",
  display: "swap",
  style: "normal",
  weight: "400",
});

export const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    {
      path: "../../public/assets/fonts/CormorantGaramond-VariableFont_wght.ttf",
      style: "normal",
      weight: "300 700",
    },
    {
      path: "../../public/assets/fonts/CormorantGaramond-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "300 700",
    },
  ],
});

export const openSans = localFont({
  variable: "--font-open-sans",
  display: "swap",
  src: [
    {
      path: "../../public/assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/assets/fonts/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
});
