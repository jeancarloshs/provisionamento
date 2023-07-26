/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./SideBar.module.css";
import RootLayout from "@/app/layout";
import Provisionamento from "@/pages/provisionamento";

let pages = [
  { name: "/", rota: "/" },
  { name: "/home", rota: "home" },
  { name: "/provisionamento", rota: "Provisionamento" },
];

const links = [
  { name: "Home", href: pages[1].name, icon: "" },
  { name: "Provisionamento", href: pages[2].name, icon: "" },
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

  return (
    <RootLayout>
      <div className={styles.sidenav}>
        <img
          className={styles.imgSideNav}
          src="/assets/image/naxos_telecom_logo.png"
          alt="Naxos Telecom"
        />
        <ul key={links.length}>
          {links.map((link) => (
            <li className={styles.li} key={link.name}>
              <a key={link.name} href={link.href}>
                {link.name}
              </a>
            </li>
          ))}
          <li className={styles.exit}>
            <a href={pages[0].name} onClick={exit}>Sair</a>
          </li>
        </ul>
      </div>
    </RootLayout>
  );
}
