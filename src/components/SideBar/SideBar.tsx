/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./SideBar.module.css";
import RootLayout from "@/app/layout";
import Provisionamento from "@/pages/provisionamento";
import NavBar from "../NavBar/NavBar";

let pages = [
  { name: "/", rota: "/" },
  { name: "/home", rota: "home" },
  { name: "/provisionamento", rota: "Provisionamento" },
];

const links = [
  { name: "Home", href: pages[1].name, icon: "" },
  { name: "Ativação ▼", href: pages[2].name, icon: "" },
  { name: "Opções", href: "#", icon: "" },
  { name: "Ajuda", href: "#", icon: "" },
];

export default function SideBar() {
  const [token, getToken] = useState<String | null>("");
  // const token = sessionStorage.removeItem("Token");
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("Token");
    getToken(storedToken);
  }, []);

  const exit = (() => {
    sessionStorage.removeItem("Token");
    pages[0].name
  })

  const RenderLi = (props: any) => {
    if (props.link.name.includes('Ativação')) {
      return (<details className={styles.details}>
        <summary className={styles.summary}>{props.link.name}</summary>
        <li className={styles.li}>
            <NavBar />
        </li>
      </details>);
    } else {
      return (
        <li className={styles.li}>
          <a key={props.link.name} href={props.link.href}>
            {props.link.name}
          </a>
        </li>
      );
    }
  }

  RootLayout

  return (
    <>
      <div className={styles.sidenav}>
        <img
          className={styles.imgSideNav}
          src="/assets/image/naxos_telecom_logo.png"
          alt="Naxos Telecom"
        />
        <ul key={links.length}>
          {links.map((link) => (
            <RenderLi key={link.name} link={link} />
          ))}
          <li className={styles.exit}>
            <a href={pages[0].name} onClick={exit}>Sair</a>
          </li>
        </ul>
      </div>
    </>
  );
}
