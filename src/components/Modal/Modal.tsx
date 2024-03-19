import React, {
  FormEvent,
  ReactElement,
  ReactHTML,
  useEffect,
  useState,
} from "react";
import ButtonComponent from "../Button/ButtonComponent";
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { ModalProps } from "@/api/types/types";
import { SaveNewUser, UpdateUser } from "@/api/controller/SaveOrUpdateUser";

export default function Modal(props: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checkUserPermission, setCheckUserPermission] = useState<
    boolean | undefined
  >(false);
  const [checkUserActive, setCheckUserActive] = useState<boolean | undefined>(
    false
  );
  const [userUpdate, setUserUpdate] = useState();
  const [userCreateOrUpdate, setUserCreateOrUpdate] = useState();
  const imageEdite = "/assets/image/icons8-maintenance-64.png";
  const showPass = "/assets/image/olho.png";
  const hidePass = "/assets/image/visivel.png";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalProps>({
    userName: props.userName,
    userEmail: props.userEmail,
    userPassword: props.userPassword,
    userStatus: 1,
    userRole: checkUserActive,
    userPermission: "Usuário",
    employeePosition: props.employeePosition,
  });

  const handleModalChange = (event: any, key: any) => {
    modalInfo.userStatus = !!checkUserActive;
    modalInfo.userRole = !!checkUserPermission;
    setModalInfo({
      ...modalInfo,
      [key]: event.target.value,
    });
    // console.log(modalInfo);
  };

  const handleModalSave = async () => {
    let missingField = null;

    switch (true) {
      case !modalInfo.userName:
        missingField = "Nome do Usuário";
        break;
      case !modalInfo.userEmail:
        missingField = "Email do Usuário";
        break;
      case !modalInfo.userPassword:
        missingField = "Senha do Usuário";
        break;
      case !modalInfo.employeePosition:
        missingField = "Cargo do Usuário";
        break;
      default:
        break;
    }

    if (missingField) {
      alert(`Preencha ${missingField}`);
    } else {
      setShowModal(false);
      setModalInfo({
        userName: "",
        userEmail: "",
        userPassword: "",
        userStatus: 1,
        userRole: checkUserPermission,
        userPermission: "",
        employeePosition: "",
      });
    }
  };

  const handleFormPost = async (event: any) => {
    event.preventDefault();
    const token = sessionStorage.getItem("Token") as string;
    let userID = props.userId;
    let userName = modalInfo.userName?.trim();
    let userEmail = modalInfo.userEmail?.trim();
    let userPassword = modalInfo.userPassword?.trim();
    let userStatus: number = checkUserActive == true ? 1 : 0;
    let userPermission =
      checkUserPermission == true ? "Administrador" : "Usuário";
    let userRole = checkUserPermission;
    let employeePosition = modalInfo.employeePosition;

    handleModalSave();

    if (userID == undefined || userID == null || userID == "") {
      let createUser = await SaveNewUser(
        token,
        userName!,
        userEmail!,
        userPassword!,
        userStatus,
        userPermission,
        userRole!,
        employeePosition!
      );
      setUserCreateOrUpdate(createUser);
      if (createUser.success) {
        alert("Usuário criado com sucesso!!!");
      } else {
        alert(createUser.error);
      }
      return;
    }

    if (userID !== undefined || userID !== null || userID !== "") {
      let updateUser = await UpdateUser(
        token,
        userID!,
        userName!,
        userEmail!,
        userPassword!,
        userStatus,
        userPermission,
        userRole!,
        employeePosition!
      );
      setUserUpdate(updateUser);
      if (updateUser.success) {
        alert("Usuário Atualizado com sucesso!!!");
      } else {
        alert(updateUser.error);
      }
      return;
    }
  };

  useEffect(() => {
    setCheckUserActive(props.userStatus == 1 ? true : false);
    setCheckUserPermission(props.userRole);
    handleFormPost;
    handleModalChange;
    handleModalSave;
  }, []);

  return (
    <>
      {props.hasImage == true ? (
        <button onClick={() => setShowModal(true)}>
          <img src={imageEdite} alt="Editar" className={styles.imageEdite} />
        </button>
      ) : (
        <ButtonComponent
          btnId="adduser"
          btnName="Adicionar Usuário"
          btnOnClick={() => setShowModal(true)}
        >
          Adicionar
        </ButtonComponent>
      )}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm cursor-auto">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 text-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    {props.userId != null
                      ? "Editar Usuário"
                      : "Adicionar Usuário"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-red-500 hover:text-red-600 ease-linear transition-all duration-150 h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className={styles.containerForm}>
                    <form
                      method="POST"
                      onSubmit={handleFormPost}
                      className={styles.formProvisionamento}
                    >
                      <Input
                        inputHtmlFor="nome"
                        inputType="text"
                        inputId="nome"
                        inputName="nome"
                        inputValue={modalInfo.userName}
                        inputOnChange={(event) =>
                          handleModalChange(event, "userName")
                        }
                        inputPlaceHolder="Nome do Usuário"
                      />
                      <Input
                        inputHtmlFor="email"
                        inputType="email"
                        inputId="email"
                        inputName="email"
                        inputValue={modalInfo.userEmail}
                        inputOnChange={(event) =>
                          handleModalChange(event, "userEmail")
                        }
                        inputPlaceHolder="Email do Usuário"
                      />
                      <button className={styles.btnPassWord} onChange={(event) => {
                        event.preventDefault();
                        setShowPassword(!false)
                      }}>
                        <img src={showPassword ? showPass : hidePass} className={styles.imgPassWord} alt="Senha Oculta" />
                      </button>
                      <Input
                        inputHtmlFor="senha"
                        inputType={showPassword ? "text" : "password"}
                        inputId="senha"
                        inputName="senha"
                        inputValue={modalInfo.userPassword}
                        inputOnChange={(event) =>
                          handleModalChange(event, "userPassword")
                        }
                        inputPlaceHolder="Senha do Usuário"
                      />
                      <label htmlFor="ativo" className={styles.label}>
                        <input
                          type="checkbox"
                          value="ativo"
                          onChange={(event) => {
                            setCheckUserActive(!checkUserActive);
                            handleModalChange(event, "userStatus");
                          }}
                          className={styles.inputLabel}
                          checked={checkUserActive ? true : false}
                        />
                        {checkUserActive ? "Ativo" : "Inativo"}
                      </label>
                      <label htmlFor="administrador" className={styles.label}>
                        <input
                          type="checkbox"
                          value={"Administrador" ?? "Usuário"}
                          onChange={(event) => {
                            setCheckUserPermission(!checkUserPermission);
                            handleModalChange(event, "userRole");
                            handleModalChange(event, "userPermission");
                          }}
                          className={styles.inputLabel}
                          checked={checkUserPermission ? true : false}
                        />
                        Administrador
                      </label>
                      <Select
                        selectLabelHtmlFor="cargo"
                        selectName="cargo"
                        selectId="cargo"
                        selectValue={modalInfo.employeePosition}
                        selectOnChange={(event) =>
                          handleModalChange(event, "employeePosition")
                        }
                        optionValue="Cargo do Usuário"
                        optionTypes={
                          <>
                            <option value={"Instalador"}>Instalador</option>
                            <option value={"Suporte"}>Suporte</option>
                          </>
                        }
                      ></Select>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-[#fba828] text-white hover:bg-[#BC4920] active:bg-[#7a3015] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleFormPost}
                  // onClick={() => {
                  //   handleModalSave();
                  //   // setShowModal(false);
                  // }}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-75"></div>
        </>
      )}
    </>
  );
}