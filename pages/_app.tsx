import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { FirebaseProvider } from "../components/context/FirebaseContext";
import { UserProvider } from "../components/context/UserContext";
import firebaseConfig from "../config/firebase.config";
import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";
import "../styles/variables.css";

initializeApp(firebaseConfig);

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;
