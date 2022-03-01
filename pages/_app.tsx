import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import Head from "next/head";

import firebaseConfig from "../config/firebase.config";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import "../styles/variables.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-medium-image-zoom/dist/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import React from "react";

initializeApp(firebaseConfig);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split("/");

  return (
    <>
      <Head>
        <title>CIS Marketplace</title>
      </Head>
      <div style={{ minHeight: "calc(100vh - var(--navbarHeight)" }}>
        {path[1] === "home" && <Navbar />}
        <ToastContainer />
        <Component {...pageProps} />
      </div>
      {path[1] === "home" && <Footer />}
    </>
  );
}

export default App;
