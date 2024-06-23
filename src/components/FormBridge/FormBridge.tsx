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
import Select from "../Select/Select";
import ButtonComponent from "../Button/ButtonComponent";
import ScriptTextArea from "../ScriptTextArea/ScriptTextArea";
import removeAccentuation from "@/api/helpers/removeAccentuation";
import Container from "../Container/ContainerComponent";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    ? userExternal.filter(
        (user) => user.cargoFuncionario === "Instalador" && user.status == 1
      )
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

  interface IFormProvising {
    nome: string;
    endereco: string;
    patrimonio: string;
    serialNumber: string;
    posicionamento: string;
    tipoDeServico: string;
    instalador: string;
    suporte: string
    vlan: string;
    tipoDeOnu: string;
  }

  const schema = yup.object({
    nome: yup.string().required("Campo Nome é obrigatório").min(3, "Você precisa inserir pelo menos 3 caracteres."),
    endereco: yup.string().required("Campo Endereço é obrigatório"),
    patrimonio: yup.string().required("Campo Patrimonio é obrigatório"),
    serialNumber: yup.string().required("Campo Serial é obrigatório"),
    posicionamento: yup.string().required("Campo Posicionamento é obrigatório"),
    tipoDeServico: yup.string().required("Campo Tipo de Serviço é obrigatório"),
    instalador: yup.string().required("Campo Instalador é obrigatório"),
    suporte: yup.string().required("Campo Suporte é obrigatório"),
    vlan: yup.string().required("Campo VLAN é obrigatório"),
    tipoDeOnu: yup.string().required("Campo Tipo de ONU é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProvising>({
    resolver: yupResolver(schema),
  });

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
              register={register}
              error={errors.nome}
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
              register={register}
              error={errors.endereco}
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
              register={register}
              error={errors.patrimonio}
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
              register={register}
              error={errors.serialNumber}
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
              register={register}
              error={errors.posicionamento}
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
              register={register}
              error={errors.vlan}
              inputValue={provisionamentoState.vlan}
              inputOnChange={(event) =>
                handleOnChangeProvisioning(event, "vlan")
              }
              inputPlaceHolder="Vlan"
            />

            <label htmlFor="tipoDeOnu" className="selectLabel"></label>
            <p className="text-[12px] text-red-600">{errors?.tipoDeOnu?.message}</p>
            <select
              // name="tipoDeOnu"
              id="tipoDeOnu"
              {...register("tipoDeOnu")}
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
              register={register}
              error={errors.tipoDeServico}
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
              register={register}
              error={errors.instalador}
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
              register={register}
              error={errors.suporte}
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
            btnOnClick={handleSubmit(handleOnProvisioning)}
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
      </Container>
    </>
  );
}
