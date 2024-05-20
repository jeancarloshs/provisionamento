/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./SideBar.module.css";
import RootLayout from "@/app/layout";
import Provisionamento from "@/pages/provisionamento";
import NavBar from "../NavBar/NavBar";
import jwt_decode from "jwt-decode";
import UserLoged from "@/api/controller/UserLogedController";
import userConnected from "@/api/middleware/userConnected";
import { FaBars, FaTimes } from "react-icons/fa";

let pages = [
  { name: "/", rota: "/" },
  { name: "/home", rota: "home" },
  { name: "/provisionamento", rota: "Provisionamento" },
  { name: "/opcoes", rota: "Opções" },
  { name: "/ajuda", rota: "Ajuda" },
];

let listPages = [
  { name: "/provisionamento", rota: "Provisionamento" },
  { name: "/bridge", rota: "Bridge" },
  { name: "/telefonia", rota: "Telefonia" },
  { name: "/vlan", rota: "Vlan" },
  { name: "/usuarios", rota: "Usuarios" },
  { name: "/servicos", rota: "Servicos" },
  { name: "/arquivos", rota: "Arquivos" },
];

const listLinksActivation = [
  { name: "Comum", href: listPages[0].name, icon: "", typeMenu: "Ativação" },
  { name: "Bridge", href: listPages[1].name, icon: "", typeMenu: "Ativação" },
  {
    name: "Telefonia",
    href: listPages[2].name,
    icon: "",
    typeMenu: "Ativação",
  },
  { name: "Vlan", href: listPages[3].name, icon: "", typeMenu: "Ativação" },
];

const listLinksOptions = [
  { name: "Usuarios", href: listPages[4].name, icon: "", typeMenu: "Opções" },
  { name: "Serviços", href: listPages[5].name, icon: "", typeMenu: "Opções" },
  { name: "Arquivos", href: listPages[6].name, icon: "", typeMenu: "Opções" },
];

const links = [
  { name: "Home", href: pages[1].name, icon: "" },
  { name: "Ativação ▼", href: pages[2].name, icon: "" },
  { name: "Opções ▼", href: pages[3].name, icon: "" },
  { name: "Ajuda", href: pages[4].name, icon: "" },
];

export default function SideBar() {
  const [token, getToken] = useState<String | null>("");
  // const token = sessionStorage.removeItem("Token");
  const [userData, setUserData] = useState({});
  const [userInternal, setUserName] = useState<any[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>();
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);

  const handleResize = () => {
    if (window.innerWidth > 720) {
      setSideBar(true);
    } else {
      setSideBar(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("Token") as string;
    getToken(storedToken);

    const fetchUserLoged = async () => {
      await userConnected();
      try {
        interface DecodedToken {
          id: number;
          storedToken: string;
          userName: string;
        }

        // Decodifica o token e obtém os dados do usuário
        const decodedToken: DecodedToken = jwt_decode(storedToken);
        setUserData(decodedToken);
        const id = decodedToken.id;
        let userName = await UserLoged(storedToken, id);
        setIsAdmin(userName.data[0].admin);
        // console.log('admin', userName.data[0].admin);
      } catch (e) {
        console.error("ERRO:", e);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    fetchUserLoged();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const exit = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("app");
    pages[0].name;
  };

  const RenderLi = (props: any) => {
    if (props.link.name.includes("Ativação")) {
      return (
        <details className={styles.details}>
          <summary className={styles.summary}>{props.link.name}</summary>
          <>
            {listLinksActivation.map((link, index) => (
              <li key={index} className={styles.linksLi}>
                <a className={styles.linksLi} key={link.name} href={link.href}>
                  {link.name}
                </a>
              </li>
            ))}
          </>
        </details>
      );
    } else if (props.link.name.includes("Opções") && isAdmin) {
      return (
        <details className={styles.details}>
          <summary className={styles.summary}>{props.link.name}</summary>
          <>
            {listLinksOptions.map((link, index) => (
              <li key={index}>
                <a className={styles.linksLi} key={link.name} href={link.href}>
                  {link.name}
                </a>
              </li>
            ))}
          </>
        </details>
      );
    } else if (props.link.name.includes("Opções") && !isAdmin) {
      return null; // Não renderiza o link "Opções" quando isAdmin for falso
    } else {
      return (
        <li className={styles.li}>
          <a key={props.link.name} href={props.link.href}>
            {props.link.name}
          </a>
        </li>
      );
    }
  };

  RootLayout;

  return (
    <>
      <div className={styles.container}>
        {sideBar == true ? (
          <FaTimes onClick={showSideBar} className={styles.svg} />
        ) : (
          <FaBars onClick={showSideBar} className={styles.svg} />
        )}
        {sideBar && (
          <div className={styles.sidenav}>
            <img
              className={styles.imgSideNav}
              src="/assets/image/naxos_telecom_logo.png"
              alt="Naxos Telecom"
            />
            <ul key={links.length} className={styles.ul}>
              {links.map((link) => (
                <RenderLi key={link.name} link={link} />
              ))}
              <li className={styles.exit}>
                <a href={pages[0].name} onClick={exit}>
                  Sair
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
function async(arg0: () => void) {
  throw new Error("Function not implemented.");
}
