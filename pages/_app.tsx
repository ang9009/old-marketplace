import { AppProps } from "next/app";
import { FirebaseProvider } from "../components/context/FirebaseContext";
import { UserProvider } from "../components/context/UserContext";

import "../styles/global.css";
import "../styles/variables.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </FirebaseProvider>
  );
}

export default App;
