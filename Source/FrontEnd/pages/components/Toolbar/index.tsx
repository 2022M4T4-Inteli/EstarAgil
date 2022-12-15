import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

import { FiMenu } from "react-icons/fi";
import logo from "../../assets/horizontal_logo.svg";
import logout from "../../assets/logout.svg";
import { Toolbar } from "./styles";
import { useAuth } from "../../utils/auth";

//items do toolbar
const MENU_LIST = [
  { text: "Menu", href: "/" },
  { text: "Atividades", href: "/activities" },
  { text: "Relatórios", href: "/reports" },
];

//função que renderizá o componente de toolbar na tela
export default function ToolbarComponent({ ...props }) {
  const [navActive, setNavActive] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const { signOut } = useAuth();
  return (
    <Toolbar>
      <Image src={logo} width={100} height={70} alt="" />
      <div className="nav-items">
        {MENU_LIST.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={() => {
              setActiveIdx(idx);
              setNavActive(false);
            }}
            className={activeIdx == idx ? "active" : ""}
          >
            {item.text}
          </Link>
        ))}
      </div>
      <FiMenu color="#FFF" size={30} className="menu" />
      <button
        className="btn-logout"
        onClick={() => signOut().then(() => Router.push("/signin"))}
      >
        <Image src={logout} alt="" />
        <>Sair</>
      </button>
    </Toolbar>
  );
}
