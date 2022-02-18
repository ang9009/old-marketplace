import { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/variables.css";
import { initializeApp } from "firebase/app";
import { FirebaseProvider } from "../components/context/FirebaseContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default App;
