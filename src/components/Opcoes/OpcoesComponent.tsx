"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./Opcoes.module.css";
import RootLayout from "@/app/layout";
import Provisionamento from "@/pages/provisionamento";
import NavBar from "../NavBar/NavBar";

export default function OpcoesComponent() {
  return (
    <>
      <div className={styles.containerTable}>
        <table className={styles.table}>
          <caption>USUARIOS</caption>
          <thead className={styles.thead}>
            <tr className={styles.tableTr}>
              <th>Nome Funcionario</th>
              <th>Cargo Funcionario</th>
              <th>Permissão do Colaborador</th>
              <th>Status</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td>linha 1</td>
              <td>linha 2</td>
              <td>linha 3</td>
              <td>linha 4</td>
              <td>linha 5</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>Rodapé</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
