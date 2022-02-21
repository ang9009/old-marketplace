import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { UserProvider } from "../components/context/UserContext";
import firebaseConfig from "../config/firebase.config";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";
import "../styles/variables.css";

initializeApp(firebaseConfig);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Head>
          <title>CIS Marketplace</title>
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default App;
