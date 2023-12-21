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
  status: number;
  permissaoDoColaborador: string;
  createdAt: string;
  updateAt: string;
}


export default function OpcoesComponent() {

  const [userList, setUserList] = useState<UserList[]>();
  const [loading, setLoading] = useState(false);
  const imageEdite = '/assets/image/icons8-maintenance-64.png';

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
      {/* {loading && (
        <img
          src='/assets/image/dot-revolve.svg'
          alt="Loading"
          className={styles.spinner}
        />
      )} */}
      {
        userList &&
        <div className={styles.containerTable}>
          <table className={styles.table}>
            <caption className={styles.caption}>USUARIOS</caption>
            <thead className={styles.thead}>
              <tr className={styles.tableTr}>
                <th className={styles.th}>Nome Funcionario</th>
                <th className={styles.th}>Cargo Funcionario</th>
                <th className={styles.th}>Permissão do Colaborador</th>
                <th className={styles.th}>Status do Colaborador</th>
                <th className={styles.th}>Editar</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {
                userList.map((user: UserList, index) => (
                  <tr key={index} className={user.status == 0 ? styles.tdUserInactive : styles.td}>
                    <td className={styles.td}>{user.nomeFuncionario}</td>
                    <td className={styles.td}>{user.cargoFuncionario}</td>
                    <td className={styles.td}>{user.permissaoDoColaborador}</td>
                    <td className={styles.td}>{user.status != 0 ? "Ativo" : "Inativo"}</td>
                    <td className={`${styles.td} ${styles.tdEdite}`}>
                      <a href={user.id} key={user.id}>
                        <img src={imageEdite} alt="Editar" className={styles.imageEdite} />
                      </a>
                      {/* <span>-</span> */}
                      <a href="#" key={user.id}>
                        <img src={imageEdite} alt="Excluir" className={styles.imageEdite} />
                      </a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </>
  );
}
