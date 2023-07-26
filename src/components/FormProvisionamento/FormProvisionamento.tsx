"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import * as React from "react";
import styles from "./FormProvisionamento.module.css";
import UserLoged from "@/api/controller/UserLoged";
import externalTechnician from "@/api/controller/ExternalTechnician";
import servicesTypes from "@/api/controller/ServicesTypes";
import NavBar from "../NavBar/NavBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import provisioningModel from "@/api/models/Provisioning";
import saveDbModel from "@/api/models/SheetsDB";

// type Props = {
//   title: string;
//   name: string;
// };

export default function FormProvisionamento() {
  const [token, setToken] = useState<String | null>("");
  const [userData, setUserData] = useState({});
  const [userInternal, setUserName] = useState<any[] | null>(null);
  const [userExternal, setUserExternal] = useState<any[] | null>(null);
  const [typesServices, setServicesTypes] = useState<any[] | null>(null);
  const [provisionamentoState, setProvisionamentoState] = useState({
    clientName: "",
    clientAddress: "",
    equipmentAssets: "",
    serialNumber: "",
    positioning: "",
    serviceType: "",
    externalTechnician: "",
    internalTechnician: "",
  });
  const [resProvisioning, setResProvisioning] = useState("");
  const [saveSheetDB, setSaveSheetsDB] = useState("");

  const handleOnChangeProvisioning = (event: any, key: any) => {
    setProvisionamentoState({
      ...provisionamentoState,
      [key]: event.target.value,
    });
  };

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setResProvisioning(event.target.value);
  };

  const handleChangeSaveSheetsDb = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let clientName = provisionamentoState.clientName.trim();
    let clientAddress = provisionamentoState.clientAddress.trim();
    let equipmentAssets = provisionamentoState.equipmentAssets.trim();
    let serialNumber = provisionamentoState.serialNumber.trim();
    let positioning = provisionamentoState.positioning.trim();
    let servicesType = provisionamentoState.serviceType.trim();
    let externalTechnician = provisionamentoState.externalTechnician.trim();
    let internalTechnician = provisionamentoState.internalTechnician.trim();
    let saveSheetDB: any = await saveDbModel(clientName, externalTechnician, serialNumber, positioning, equipmentAssets, servicesType, internalTechnician)
    setSaveSheetsDB(saveSheetDB);
  };

  const handleOnProvisioning = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let clientName = provisionamentoState.clientName.trim();
    let clientAddress = provisionamentoState.clientAddress.trim();
    let equipmentAssets = provisionamentoState.equipmentAssets.trim();
    let serialNumber = provisionamentoState.serialNumber.trim();
    let positioning = provisionamentoState.positioning.trim();
    let servicesType = provisionamentoState.serviceType.trim();
    let externalTechnician = provisionamentoState.externalTechnician.trim();
    let internalTechnician = provisionamentoState.internalTechnician.trim();

    let data: any = await provisioningModel(clientName, clientAddress, equipmentAssets, serialNumber);
    setResProvisioning(data)
    // console.log("DATA", data)
  };
  
  const handleLimparDados = () => {
    setProvisionamentoState(
    {
    clientName: "",
    clientAddress: "",
    equipmentAssets: "",
    serialNumber: "",
    positioning: "",
    serviceType: "",
    externalTechnician: "",
    internalTechnician: "",
    });
    setResProvisioning("");
  };

  tokenVerify();

  useEffect(() => {
    // Verifica se está no ambiente do navegador antes de acessar o sessionStorage
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedToken = sessionStorage.getItem("Token") as string;
      setToken(storedToken);

      // Defina o tipo da variável decodedToken para o objeto decodificado.
      interface DecodedToken {
        id: number;
        storedToken: string;
        userName: string;
      }

      // Decodifica o token e obtém os dados do usuário
      const decodedToken: DecodedToken = jwt_decode(storedToken);
      setUserData(decodedToken);

      const fetchUserLoged = async () => {
        try {
          const id = decodedToken.id;
          let userName = await UserLoged(storedToken, id);
          setUserName(userName.data);
          let external = await externalTechnician(storedToken);
          setUserExternal(external.data[0]);
          let ServicesTypes = await servicesTypes(storedToken);
          setServicesTypes(ServicesTypes.data);
        } catch (e) {
          console.error("ERRO:", e);
        }
      };
      fetchUserLoged();
    }
  }, []);

  // Filtra apenas os instaladores
  const installers = Array.isArray(userExternal)
    ? userExternal.filter((user) => user.cargoFuncionario === "Instalador")
    : [];

  // Filtra apenas os funcionários do suporte
  const supportStaff = Array.isArray(userExternal)
    ? userExternal.filter((user) => user.cargoFuncionario === "Suporte")
    : [];

  // Verifica se userExternal é um array antes de fazer o mapeamento
  const servicesTypesOptions = Array.isArray(typesServices) ? (
    typesServices.map((type, index) => (
      <option key={index} value={type.tipoDeServico}>
        {type.tipoDeServico}
      </option>
    ))
  ) : (
    <option value="">Carregando...</option>
  );

  const userExternalOptions = Array.isArray(installers) ? (
    installers.map((user, index) => (
      <option key={index} value={user.nomeFuncionario}>
        {user.cargoFuncionario == "Instalador" ? user.nomeFuncionario : ""}
      </option>
    ))
  ) : (
    <option value="">Carregando...</option>
  );

  const userInternalOptions = Array.isArray(userInternal) ? (
    userInternal.map((user, index) => (
      <option key={index} value={user.nomeFuncionario}>
        {user.cargoFuncionario == "Suporte" ? user.nomeFuncionario : ""}
      </option>
    ))
  ) : (
    <option value="">Carregando...</option>
  );

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.containerForm}>
          <form action="#" method="POST" onSubmit={handleOnProvisioning} className={styles.formProvisionamento}>
            <label htmlFor="nome"></label>
            <input
              className={styles.inputProvisionamento}
              type="text"
              id="nome"
              name="nome"
              value={provisionamentoState.clientName}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "clientName")
              }
              placeholder="Nome"
              required
            />

            <label htmlFor="endereco"></label>
            <input
              className={styles.inputProvisionamento}
              type="text"
              id="endereco"
              name="endereco"
              value={provisionamentoState.clientAddress}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "clientAddress")
              }
              placeholder="Endereço"
              required
            />

            <label htmlFor="patrimonio"></label>
            <input
              className={styles.inputProvisionamento}
              type="text"
              name="patrimonio"
              value={provisionamentoState.equipmentAssets}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "equipmentAssets")
              }
              id="patrimonio"
              placeholder="Patrimonio"
              required
            />

            <label htmlFor="serialNumber"></label>
            <input
              className={styles.inputProvisionamento}
              type="text"
              name="serialNumber"
              value={provisionamentoState.serialNumber}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "serialNumber")
              }
              id="serialNumber"
              placeholder="S/N"
              required
            />

            <label htmlFor="posicionamento"></label>
            <input
              className={styles.inputProvisionamento}
              type="text"
              name="posicionamento"
              value={provisionamentoState.positioning}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "positioning")
              }
              id="posicionamento"
              placeholder="Posicionamento"
              required
            />

            <label htmlFor="tipoDeServico" className="selectLabel"></label>
            <select
              name="tipoDeServico"
              id="tipoDeServico"
              value={provisionamentoState.serviceType}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "serviceType")
              }
              className={styles.formSelect}
              required
            >
              <option value="">Tipo</option>
              {servicesTypesOptions}
            </select>

            <label htmlFor="instalador" className="selectLabel"></label>
            <select
              name="instalador"
              id="instalador"
              value={provisionamentoState.externalTechnician}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "externalTechnician")
              }
              className={styles.formSelect}
              required
            >
              <option value="">Instalador</option>
              {userExternalOptions}
            </select>

            <label htmlFor="suporte" className="selectLabel"></label>
            <select
              name="suporte"
              id="suporte"
              className={styles.formSelect}
              value={provisionamentoState.internalTechnician}
              onChange={(event) =>
                handleOnChangeProvisioning(event, "internalTechnician")
              }
            >
              <option value="{userInternalOptions}">{userInternalOptions}</option>
{/*               {userInternalOptions} */}
            </select>
            <button
              type="submit"
              id="btnProvisionar"
              name="btnProvisionar"
              className={styles.btn}
            >
              Provisionar
            </button>
            <button
              type="submit"
              id="btnRemover"
              name="btnProvisionar"
              className={styles.btn}
            >
              Remover
            </button>
            <br />
            <button
              type="submit"
              id="btnMac"
              name="btnMac"
              className={styles.btn}
            >
              Mac
            </button>
            <button
              type="submit"
              id="btnLocalizar"
              name="btnProvisionar"
              className={styles.btn}
            >
              Localizar
            </button>
          </form>
        </div>
        <div className={styles.codigoGerado}>
          <textarea
            name="scriptOLT"
            className={styles.scriptOLT}
            value={resProvisioning}
            onChange={handleChangeTextarea}
            id="scriptOLT"
            readOnly
          ></textarea>
          <button
            type="submit"
            id="btnLimpaInputs"
            name="btnLimpaInputs"
            onClick={handleLimparDados}
            className={styles.btnProvisionamento}
          >
            Limpar Dados
          </button>
          <button
            type="submit"
            id="btnEnviaPlanilha"
            name="btnEnviaPlanilha"
            onClick={handleChangeSaveSheetsDb}
            form="provisionamentoForm"
            className={styles.btnProvisionamento}
          >
            Enviar p/ Planilha
          </button>
          <button
            type="submit"
            id="btnCopiar"
            name="btnCopiar"
            className={styles.btnProvisionamento}
          >
            Copiar
          </button>
          <button
            type="submit"
            id="btnCopiar"
            name="btnCopiar"
            className={styles.btnProvisionamento}
          >
            Copiar
          </button>
        </div>
      </div>
    </>
  );
}
