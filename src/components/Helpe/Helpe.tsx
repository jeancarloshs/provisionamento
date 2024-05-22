"use client";
import listFiles from "@/api/controller/ListFilesController";
import styles from "./Helpe.module.css";
import { useState, useEffect } from "react";
import userConnected from "@/api/middleware/userConnected";
import Modal from "../Modal/Modal";
import UserLoged from "@/api/controller/UserLogedController";
import jwt_decode from "jwt-decode";

export default function Helpe() {
  const [token, setToken] = useState<String | null>("");
  const [files, setFiles] = useState<String | null>("");
  const [loading, setLoading] = useState(true);
  const imageEdite = "/assets/image/icons8-maintenance-64.png";
  const imageDelete = "/assets/image/icons8-excluir-16.png";
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState<string>("");
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const usersFetch = async () => {
    try {
      const userIdFunction = await userConnected();
      const userArrayId = userIdFunction.data[0]["id"];
      setUserId(userArrayId);
      const getToken = sessionStorage.getItem("Token") as string;
      setToken(getToken);

      if (getToken) {
        getFiles(getToken);
      }

      interface DecodedToken {
        id: number;
        storedToken: string;
        userName: string;
      }

      // Decodifica o token e obtém os dados do usuário
      const decodedToken: DecodedToken = jwt_decode(getToken);
      setUserData(decodedToken);
      const id = decodedToken.id;
      let userName = await UserLoged(getToken, id);
      setIsAdmin(userName.data[0].admin);
      // console.log('admin', userName.data[0].admin);
    } catch (e) {
      console.error("ERRO:", e);
    }
  };

  useEffect(() => {
    usersFetch();
  }, []);

  const getFiles = async (token: string) => {
    try {
      const filesResponse = await listFiles(token);
      const filesData = filesResponse.data;
      setFiles(filesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {isAdmin == true ? (
        <div className={styles.btnAdd}>
          <Modal />
        </div>
      ) : (
        null
      )}
      <div className={styles.containerTable}>
        <table className={styles.table}>
          <caption className={styles.caption}>AJUDA</caption>
          <thead className={styles.thead}>
            <tr className={styles.tableTr}>
              <th className={styles.th}>Nome Funcionario</th>
              <th className={styles.th}>Editar</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {Array.isArray(files) ? (
              files.map((item, index) => (
                <tr key={index} className={styles.td}>
                  <td className={styles.td}>
                    <a className={styles.links} key={item.id} href={item.url} target="_blank">{item.nome}</a>
                  </td>
                  {userId == "1" ? (
                    <td className={`${styles.td} ${styles.tdEdite}`}>
                      {/* <Modal docsId={item.id} docsName={item.nome} docsUrl={item.url} hasImage={true} /> */}
											<Modal userId={item.id} userName={item.nomeFuncionario} userEmail={item.emailFuncionario} userPassword={item.senhaFuncionario} userStatus={item.status} userRole={item.admin} employeePosition={item.cargoFuncionario} hasImage={true} />
                      <a href="#" data-confirm="Tem certeza ?">
                        <img src={imageDelete} alt="Excluir" className={styles.imageEdite} />
                      </a>
                    </td>
                  ) : (
                    null
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className={`${styles.td} ${styles.tdCenter}`} colSpan={2}>Nenhum Arquivo Encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
