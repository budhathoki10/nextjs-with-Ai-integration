import { Roboto } from "next/font/google"
import "./global.css"
import Providers from "./provider.js"
import { Toaster } from "@/components/ui/sonner"


const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}