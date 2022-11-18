import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router from 'next/router';

import { FiMenu } from "react-icons/fi";
import logo from "../../assets/horizontal_logo.svg";
import logout from "../../assets/logout.svg";
import { Toolbar } from "./styles";

const MENU_LIST = [
  { text: "Menu", href: "/" },
  { text: "Atividades", href: "/activities" },
  { text: "Relatórios", href: "/reports" },
];

export default function ToolbarComponent({ ...props }) {
  const [navActive, setNavActive] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
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
      <FiMenu color="#FFF" size={30} className="menu"/>
      <button className="btn-logout" onClick={() => Router.push('/signin')}>
        <Image src={logout} alt="" />
        <>Sair</>
      </button>
    </Toolbar>
  );
}
// <Link
//     onClick={() => {
//       setActiveIdx(idx);
//       setNavActive(false);
//     }}
//     href={"/activities"}
//   >
//     Atividades
//   </Link>
//   <Link
//     onClick={() => {
//       setActiveIdx(idx);
//       setNavActive(false);
//     }}
//     href={"/reports"}
//   >
//     Relatórios
//   </Link>
{
  /* <a href="javascript:void(0);" className="icon" onclick="myFunction()">
  <i className="fa fa-bars"></i>
    </a> */
}
