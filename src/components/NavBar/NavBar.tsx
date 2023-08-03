"use client";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

let pages = [
  { name: "/provisionamento", rota: "Provisionamento" },
  { name: "/bridge", rota: "Bridge"},
  { name: "/telefonia", rota: "Telefonia"},
  { name: "/vlan", rota: "Vlan"}
];

const links = [
  { name: "Comum", href: pages[0].name, icon: "" },
  { name: "Bridge", href: pages[1].name, icon: "" },
  { name: "Telefonia", href: pages[2].name, icon: "" },
  { name: "Vlan", href: pages[3].name, icon: "" },
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
