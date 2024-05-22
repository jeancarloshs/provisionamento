"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import * as React from "react";
import styles from "./FormVlan.module.css";
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
import CreateVlanModel from "@/api/models/CreateVlan";
import Select from '../Select/Select';
import Input from "../Input/Input";
import ScriptTextArea from "../ScriptTextArea/ScriptTextArea";
import ButtonComponent from "../Button/ButtonComponent";
import removeAccentuation from "@/api/helpers/removeAccentuation";
import RemovingVlanModel from "@/api/models/RemovingVlan";
import Container from "../Container/ContainerComponent";

export default function FormVlan() {
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
    vlan: "",
    vlanName: "",
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
    let servicesType = provisionamentoState.serviceType.trim();
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
    let vlan = provisionamentoState.vlan.trim();
    let vlanName = provisionamentoState.vlanName.trim();

    vlanName = removeAccentuation(vlanName);
    // serialNumber = `${serialNumber.slice(0, 4)}:${serialNumber.slice(4, serialNumber.length)}`;

    let data: any = await CreateVlanModel(vlan, vlanName);
    setResProvisioning(data);
    // console.log("DATA", data)
  };

  const handleOnRemovingOnu = async (event: any) => {
    event.preventDefault();
    let positioning = provisionamentoState.vlan.trim();
    
    let data: any = await RemovingVlanModel(positioning);
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
      serviceType: "",
      externalTechnician: "",
      internalTechnician: "",
      vlan: "",
      vlanName: "",
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
    ? userExternal.filter((user) => user.cargoFuncionario === "Instalador" && user.status == 1)
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
      <Container>
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
              inputValue={provisionamentoState.vlanName}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "vlanName")
              }
              inputPlaceHolder="Nome Vlan"
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
              inputPlaceHolder="VLAN"
            />

            {/* <Select
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
            ></Select> */}
          </form>
          <ButtonComponent
            btnId="btnProvisionar"
            btnName="btnProvisionar"
            btnOnClick={handleOnProvisioning}
            btnClassName={styles.btn}
          >
            Criar VLAN
          </ButtonComponent>
          <ButtonComponent
            btnId="btnRemover"
            btnName="btnRemover"
            btnOnClick={handleOnRemovingOnu}
            btnClassName={styles.btn}
          >
            Remover VLAN
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
          {/* <ButtonComponent
            btnId="btnEnviaPlanilha"
            btnName="btnEnviaPlanilha"
            btnOnClick={handleChangeSaveSheetsDb}
          >
            Enviar p/ Planilha
          </ButtonComponent> */}
          <ButtonComponent
            btnId="btnCopiar"
            btnName="btnCopiar"
            btnOnClick={handleCopyText}
          >
            Copiar
          </ButtonComponent>
        </div>
      </Container>
    </>
  );
}
