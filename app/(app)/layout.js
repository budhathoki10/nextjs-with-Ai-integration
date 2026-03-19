import { Roboto } from "next/font/google"
import NavBar from "../../components/Navbar"
import Cardmessages from "../../components/Cardmessages"
// import './global.css'
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>

          <NavBar></NavBar>
          {/* <Cardmessages></Cardmessages> */}
          {children}

      </body>
    </html>
  )
}