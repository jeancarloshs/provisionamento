"use client";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

let pages = [
  { name: "/provisionamento", rota: "Provisionamento" },
  { name: "/bridge", rota: "Bridge" },
  { name: "/telefonia", rota: "Telefonia" },
  { name: "/vlan", rota: "Vlan" },
  { name: "/usuarios", rota: "Usuarios" },
  { name: "/serviços", rota: "Serviços" },
  { name: "/arquivos", rota: "Arquivos" },
];

const links = [
  { id: 1, name: "Comum", href: pages[0].name, icon: "", typeMenu: "Ativação" },
  { id: 2, name: "Bridge", href: pages[1].name, icon: "", typeMenu: "Ativação" },
  { id: 3, name: "Telefonia", href: pages[2].name, icon: "", typeMenu: "Ativação" },
  { id: 4, name: "Vlan", href: pages[3].name, icon: "", typeMenu: "Ativação" },
  { id: 5, name: "Usuarios", href: pages[4].name, icon: "", typeMenu: "Opções" },
  { id: 6, name: "Serviços", href: pages[5].name, icon: "", typeMenu: "Opções" },
  { id: 7, name: "Arquivos", href: pages[6].name, icon: "", typeMenu: "Opções" },
];

const quantityOfLinksDisplayed = 4;

// const optionsResult: any = (inicio:number, final:number) => {
//   const navBarResults: any = links.slice(0, quantityOfLinksDisplayed).map((link, index) => (
//     <li key={index}>
//       <a className={styles.linksLi} key={link.name} href={link.href}>
//         {link.name}
//       </a>
//     </li>
//   ));
//   return navBarResults;
// };

const navBarResults: any = links.map((link, index) => {
  // if (link.id < quantityOfLinksDisplayed) {
    return (<li key={index}>
      <a className={styles.linksLi} key={link.name} href={link.href}>
        {link.name}
      </a>
    </li>)
  // }
}

);

export default function NavBar(props: any) {
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
