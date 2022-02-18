import { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/variables.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
