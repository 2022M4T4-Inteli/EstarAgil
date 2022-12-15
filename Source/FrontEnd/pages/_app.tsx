import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToolbarComponent from "./components/Toolbar";
import { useRouter } from "next/router";
import { AuthProvider, useAuth } from "./utils/auth";
import { useEffect } from "react";
import { useState } from "react";

//verify if user is logged
function isAuth() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("@App:token") != null;
  }
  return false;
}
//função direcionada a rederenziação do compoennte principal e injeção das rotas externas do sistema.
export default function App({ Component, pageProps }: AppProps) {
  var router = useRouter();
  var { isAuthenticated } = useAuth();
  const [auth, setAuth] = useState<boolean>(isAuth());
  useEffect(() => {
    if (!auth) router.push("/signin");
    else router.pathname == "/signin" && router.push("/");
  }, []);
  return (
    <AuthProvider>
      {router.pathname != "/signin" && <ToolbarComponent />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
