"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./Opcoes.module.css";
import RootLayout from "@/app/layout";
import Provisionamento from "@/pages/provisionamento";
import NavBar from "../NavBar/NavBar";
import externalTechnician from "@/api/controller/ExternalTechnicianController";

interface UserList {
  id: string;
  nomeFuncionario: string;
  cargoFuncionario: string;
  emailFuncionario: string;
  admin: boolean;
  permissaoDoColaborador: string;
  createdAt: string;
  updateAt: string;
}


export default function OpcoesComponent() {

  const [userList, setUserList] = useState<UserList[]>();

  const usersFetch = async () => {
    const token = sessionStorage.getItem("Token") as string;
    var resUsersList = await externalTechnician(token)
    setUserList(resUsersList.data)
    // return resUsersList
  }


  useEffect(() => {
    usersFetch()
  }, []);

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
              <th>Editar</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {
              userList && userList.map((user: UserList, index) => (
                <tr key={index}>
                  <td>{user.nomeFuncionario}</td>
                  <td>{user.cargoFuncionario}</td>
                  <td>{user.permissaoDoColaborador}</td>
                  <td>{user.id}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
