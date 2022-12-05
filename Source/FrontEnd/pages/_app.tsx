import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToolbarComponent from "./components/Toolbar";
import { useRouter } from "next/router";

//função direcionada a rederenziação do compoennte principal e injeção das rotas externas do sistema.
export default function App({ Component, pageProps }: AppProps) {
  var router = useRouter();

  return (
    <>
      {router.pathname != "/signin" && <ToolbarComponent />}
      <Component {...pageProps} />
    </>
  );
}
