"use client";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

let pages = [{ name: "/provisionamento", rota: "Provisionamento" }];

const links = [
  { name: "Comum", href: pages[0].name, icon: "" },
  { name: "Bridge", href: "#", icon: "" },
  { name: "Telefonia", href: "#", icon: "" },
  { name: "Vlan", href: "#", icon: "" },
];

const navBarResults: any = links.map((link, index) => (
  <li key={index}>
    <a className={styles.linksLi} key={link.name} href={link.href}>
      {link.name}
    </a>
  </li>
));

export default function NavBar() {
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.ul} key={navBarResults.length}>
            {navBarResults}
          </ul>
        </nav>
      </div>
    </>
  );
}
