import Image from "next/image";
// import styles from "./page.module.css";
import Header from "./Components/Segments/Header";
import Search from "./Components/Segments/Search";
import NaviBar from "./Components/Segments/NavigationBar";
import Footer from "./Components/Segments/Footer";

export default function Home() {
  return (
    <div>
      <NaviBar />
      <Header />
      <Search />
      <Footer />
    </div>
  );
}
