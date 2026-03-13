import { Roboto } from "next/font/google"
import "./global.css"
import Providers from "./provider.js"

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
        </Providers>
      </body>
    </html>
  )
}