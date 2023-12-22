"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import * as React from "react";
import styles from "./FormBridge.module.css";
import UserLoged from "@/api/controller/UserLogedController";
import externalTechnician from "@/api/controller/ExternalTechnicianController";
import servicesTypes from "@/api/controller/ServicesTypesController";
import NavBar from "../NavBar/NavBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import provisioningModel from "@/api/models/Provisioning";
import saveDbModel from "@/api/models/SheetsDB";
import copy from "copy-to-clipboard";
import RemoveOnuModel from "@/api/models/Remove";
import SearchByMac from "@/api/models/SearchByMac";
import SearchByPositioning from "@/api/models/SearchByPositioning";
import BridgeProvisioningWithWifiModel from "@/api/models/BridgeProvisioningWithWifi";
import BridgeProvisioningWithoutWifiModel from "@/api/models/BridgeProvisioningWithoutWifi";
import Input from "../Input/Input";
import Select from '../Select/Select.1';
import ButtonComponent from "../Button/ButtonComponent";
import ScriptTextArea from "../ScriptTextArea/ScriptTextArea";

export default function FormBridge() {
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
    vlan: "",
    onuType: "",
    serviceType: "",
    externalTechnician: "",
    internalTechnician: "",
  });
  const [removingOnuState, setRemovingOnuState] = useState({
    positioning: "",
  });
  const [searchByPositioningState, setSearchByPositioningState] = useState({
    positioning: "",
  });
  const [searchByMacState, setSearchByMacState] = useState({
    serialNumber: "",
  });
  const [resProvisioning, setResProvisioning] = useState("");
  const [saveSheetDB, setSaveSheetsDB] = useState("");
  const [copyText, setCopyText] = useState("");

  const handleOnChangeProvisioning = (event: any, key: any) => {
    setProvisionamentoState({
      ...provisionamentoState,
      [key]: event.target.value,
    });
  };

  const handleOnChangeRemovingOnu = (event: any, key: any) => {
    setRemovingOnuState({
      ...removingOnuState,
      [key]: event.target.value,
    });
  };

  const handlaOnChangeSearchByPositioning = (event: any, key: any) => {
    setSearchByPositioningState({
      ...searchByPositioningState,
      [key]: event?.target.value,
    });
  };

  const handleOnChangeSearchByMac = (event: any, key: any) => {
    setSearchByMacState({
      ...searchByMacState,
      [key]: event.target.value,
    });
  };

  const removeAccentuation = (text: string) => {
    const mapaAcentos: any = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      â: "a",
      ê: "e",
      î: "i",
      ô: "o",
      û: "u",
      à: "a",
      è: "e",
      ì: "i",
      ò: "o",
      ù: "u",
      ã: "a",
      õ: "o",
      ç: "c",
      ä: "a",
      ë: "e",
      ï: "i",
      ö: "o",
      ü: "u",
      ñ: "n",
    };

    const regexAcentos = /[áéíóúâêîôûàèìòùãõçäëïöüñ]/g;

    return text.replace(
      regexAcentos,
      (match: string | number) => mapaAcentos[match] || match
    );
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setResProvisioning(event.target.value);
  };

  const handleChangeSaveSheetsDb = async (event: any) => {
    event.preventDefault();
    let clientName = provisionamentoState.clientName.trim();
    let clientAddress = provisionamentoState.clientAddress.trim();
    let equipmentAssets = provisionamentoState.equipmentAssets.trim();
    let serialNumber = provisionamentoState.serialNumber.trim();
    let positioning = provisionamentoState.positioning.trim();
    let vlan = provisionamentoState.vlan.trim();
    let servicesType = provisionamentoState.serviceType.trim();
    let onuType = provisionamentoState.onuType.trim();
    let externalTechnician = provisionamentoState.externalTechnician.trim();
    let internalTechnician = provisionamentoState.internalTechnician.trim();
    let saveSheetDB: any = await saveDbModel(
      clientName,
      externalTechnician,
      serialNumber,
      positioning,
      equipmentAssets,
      servicesType,
      internalTechnician
    );
    setSaveSheetsDB(saveSheetDB);
  };

  const handleOnProvisioning = async (event: any) => {
    event.preventDefault();
    let clientName = provisionamentoState.clientName.trim();
    let clientAddress = provisionamentoState.clientAddress.trim();
    let equipmentAssets = provisionamentoState.equipmentAssets.trim();
    let serialNumber = provisionamentoState.serialNumber.trim();
    let positioning = provisionamentoState.positioning.trim();
    let vlan = provisionamentoState.vlan.trim();
    let onuType = provisionamentoState.onuType.trim();
    let servicesType = provisionamentoState.serviceType.trim();
    let externalTechnician = provisionamentoState.externalTechnician.trim();
    let internalTechnician = provisionamentoState.internalTechnician.trim();

    clientName = removeAccentuation(clientName);
    clientAddress = removeAccentuation(clientAddress);
    serialNumber = `${serialNumber.slice(0, 4)}:${serialNumber.slice(
      4,
      serialNumber.length
    )}`;

    if (onuType.valueOf() == "Nokia G-240WF") {
      let data: any = await BridgeProvisioningWithWifiModel(
        positioning,
        clientName,
        clientAddress,
        equipmentAssets,
        vlan
      );
      setResProvisioning(data);
      console.log("Nokia G-240WF Com Wi-Fi", onuType);
    } else {
      let data: any = await BridgeProvisioningWithoutWifiModel(
        positioning,
        clientName,
        clientAddress,
        equipmentAssets,
        vlan
      );
      setResProvisioning(data);
      console.log(" Nokia G-010G-P Sem Wi-fi", onuType);
    }

    // let data: any = await provisioningModel(clientName, clientAddress, serialNumber, positioning);
    // setResProvisioning(data)
    // console.log("DATA", data)
  };

  const handleOnRemovingOnu = async (event: any) => {
    event.preventDefault();
    let positioning = provisionamentoState.positioning.trim();

    let data: any = RemoveOnuModel(positioning);
    setResProvisioning(data);
  };

  const handleOnSearchByPositioning = async (event: any) => {
    event.preventDefault();
    let positioning = provisionamentoState.positioning.trim();

    let data: any = SearchByPositioning(positioning);
    setResProvisioning(data);
  };

  const handleOnSearchByMac = async (event: any) => {
    event.preventDefault();
    let serialNumber = provisionamentoState.serialNumber.trim();
    serialNumber = `${serialNumber.slice(0, 4)}:${serialNumber.slice(
      4,
      serialNumber.length
    )}`;

    let data: any = SearchByMac(serialNumber);
    setResProvisioning(data);
  };

  const handleCopyText = () => {
    // event.preventDefault()
    alert("Copiado para area de transferencia!!");
    copy(resProvisioning);
  };

  const handleLimparDados = () => {
    setProvisionamentoState({
      clientName: "",
      clientAddress: "",
      equipmentAssets: "",
      serialNumber: "",
      positioning: "",
      vlan: "",
      onuType: "",
      serviceType: "",
      externalTechnician: "",
      internalTechnician: "",
    });
    setResProvisioning("");
  };

  // tokenVerify();

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
          setUserExternal(external.data);
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
      <div className={styles.main}>
        <div className={styles.containerForm}>
          <form
            method="POST"
            onSubmit={handleOnProvisioning}
            className={styles.formProvisionamento}
          >
            <Input
              inputHtmlFor="nome"
              inputType="text"
              inputId="nome"
              inputName="nome"
              inputValue={provisionamentoState.clientName}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "clientName")
              }
              inputPlaceHolder="Nome"
            />

            <Input
              inputHtmlFor="endereco"
              inputType="text"
              inputId="endereco"
              inputName="endereco"
              inputValue={provisionamentoState.clientAddress}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "clientAddress")
              }
              inputPlaceHolder="Endereço"
            />

            <Input
              inputHtmlFor="patrimonio"
              inputType="text"
              inputId="patrimonio"
              inputName="patrimonio"
              inputValue={provisionamentoState.equipmentAssets}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "equipmentAssets")
              }
              inputPlaceHolder="Patrimonio"
            />

            <Input
              inputHtmlFor="serialNumber"
              inputType="text"
              inputId="serialNumber"
              inputName="serialNumber"
              inputValue={provisionamentoState.serialNumber}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "serialNumber")
              }
              inputPlaceHolder="S/N"
            />

            <Input
              inputHtmlFor="posicionamento"
              inputType="text"
              inputId="posicionamento"
              inputName="posicionamento"
              inputValue={provisionamentoState.positioning}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "positioning")
              }
              inputPlaceHolder="Posicionamento"
            />

            <Input
              inputHtmlFor="vlan"
              inputType="text"
              inputId="vlan"
              inputName="vlan"
              inputValue={provisionamentoState.vlan}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "vlan")
              }
              inputPlaceHolder="Vlan"
            />

            <label htmlFor="tipoDeOnu" className="selectLabel"></label>
            <select
              name="tipoDeOnu"
              id="tipoDeOnu"
              value={provisionamentoState.onuType}
              onChange={(event) => handleOnChangeProvisioning(event, "onuType")}
              className={styles.formSelect}
              required
            >
              <option value="">Modelo de ONU</option>
              <option value="Nokia G-240WF" id="NokiaWifi">
                Nokia G-240WF (Com WI-FI)
              </option>
              <option value="Nokia G-010G-P" id="NokiaLan">
                Nokia G-010G-P (Sem WI-FI)
              </option>
            </select>

            <Select
              selectLabelHtmlFor="tipoDeServico"
              selectName="tipoDeServico"
              selectId="tipoDeServico"
              selectValue={provisionamentoState.serviceType}
              selectOnChange={(event) =>
                handleOnChangeProvisioning(event, "serviceType")
              }
              optionValue="Tipo"
              optionTypes={servicesTypesOptions}
            ></Select>

            <Select
              selectLabelHtmlFor="instalador"
              selectName="instalador"
              selectId="instalador"
              selectValue={provisionamentoState.externalTechnician}
              selectOnChange={(event) =>
                handleOnChangeProvisioning(event, "externalTechnician")
              }
              optionValue="Instalador"
              optionTypes={userExternalOptions}
            ></Select>

            <Select
              selectLabelHtmlFor="suporte"
              selectName="suporte"
              selectId="suporte"
              selectValue={provisionamentoState.internalTechnician}
              selectOnChange={(event) =>
                handleOnChangeProvisioning(event, "internalTechnician")
              }
              optionValue="Suporte"
              optionTypes={userInternalOptions}
            ></Select>
          </form>
          <ButtonComponent
            btnId="btnProvisionar"
            btnName="btnProvisionar"
            btnOnClick={handleOnProvisioning}
            btnClassName={styles.btn}
          >
            Provisionar
          </ButtonComponent>
          <ButtonComponent
            btnId="btnRemover"
            btnName="btnRemover"
            btnOnClick={handleOnRemovingOnu}
            btnClassName={styles.btn}
          >
            Remover
          </ButtonComponent>
          <ButtonComponent
            btnId="btnMac"
            btnName="btnMac"
            btnOnClick={handleOnSearchByPositioning}
            btnClassName={styles.btn}
          >
            Mac
          </ButtonComponent>
          <ButtonComponent
            btnId="btnLocalizar"
            btnName="btnLocalizar"
            btnOnClick={handleOnSearchByMac}
            btnClassName={styles.btn}
          >
            Localizar
          </ButtonComponent>
        </div>
        <div className={styles.codigoGerado}>
          <ScriptTextArea
            textAreaName="scriptOLT"
            valueResProvisioning={resProvisioning}
            textAreaOnChange={handleChangeTextarea}
            textAreaId="scriptOLT"
          />
          <ButtonComponent
            btnId="btnLimpaInputs"
            btnName="btnLimpaInputs"
            btnOnClick={handleLimparDados}
          >
            Limpar Dados
          </ButtonComponent>
          <ButtonComponent
            btnId="btnEnviaPlanilha"
            btnName="btnEnviaPlanilha"
            btnOnClick={handleChangeSaveSheetsDb}
          >
            Enviar p/ Planilha
          </ButtonComponent>
          <ButtonComponent
            btnId="btnCopiar"
            btnName="btnCopiar"
            btnOnClick={handleCopyText}
          >
            Copiar
          </ButtonComponent>
        </div>
      </div>
    </>
  );
}
