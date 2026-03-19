import { Roboto } from "next/font/google";
import NavBar from "../../components/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  return (
    <div className={roboto.className}>
      <NavBar />
      {children}
    </div>
  );
}