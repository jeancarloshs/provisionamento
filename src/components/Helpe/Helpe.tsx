"use client";
import listFiles from "@/api/controller/ListFilesController";
import styles from "./Helpe.module.css";
import { useState, useEffect } from "react";

export default function Helpe() {
  const [token, setToken] = useState<String | null>("");
  const [files, setFiles] = useState<String | null>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = sessionStorage.getItem("Token") as string;
    setToken(getToken);

    if (getToken) {
      getFiles(getToken);
    }
  }, []);

  const getFiles = async (token: string) => {
    try {
      const filesResponse = await listFiles(token);
      const filesData = filesResponse.data;
      setFiles(filesData[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  }

  const servicesTypesOptions: any = Array.isArray(files) ? (
    files.map((item, index) => (
      <li key={index}>
        <a className={styles.links} key={item.id} href={item.url} target="_blank">
          {item.nome}
        </a>
      </li>
    ))
  ) : (
    <li>Carregando...</li>
  );

  return (
    <>
      <div className={styles.main}>
        {servicesTypesOptions.length > 0 ? (
          <ul key={servicesTypesOptions.length}>
            {servicesTypesOptions}
          </ul>
        ) : (
          <p>Nenhum arquivo disponível</p>
        )}
      </div>
    </>
  );
}