import Image from "next/image";
import LandingPage from "./pages/test/test";
import NavigationBar from "./page-components/navigationbar";
import HomePage from "./page-components/Home";
import AboutPage from "./pages/about/page";
export default function Home() {
  return (
    <div className="">
      <HomePage />
      <AboutPage />
    </div>
  );
}
