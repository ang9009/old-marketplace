import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { UserProvider } from "../components/context/UserContext";
import firebaseConfig from "../config/firebase.config";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import "../styles/global.css";
import "../styles/variables.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

initializeApp(firebaseConfig);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split("/");

  return (
    <>
      <UserProvider>
        <Head>
          <title>CIS Marketplace</title>
        </Head>
        <div style={{ minHeight: "calc(100vh - var(--navbarHeight)" }}>
          {path[1] === "home" && <Navbar />}
          <Component {...pageProps} />
        </div>
        {path[1] === "home" && <Footer />}
      </UserProvider>
    </>
  );
}

export default App;
