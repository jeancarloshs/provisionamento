import React, { ReactElement, ReactHTML, useEffect, useState } from "react";
import ButtonComponent from "../Button/ButtonComponent";
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { ModalProps } from "@/api/types/types";

export default function Modal(props: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checkUserPermission, setCheckUserPermission] = useState<boolean | undefined>(false);
  const [checkUserActive, setCheckUserActive] = useState<boolean | undefined>(false);
  const imageEdite = "/assets/image/icons8-maintenance-64.png";
  const [modalInfo, setModalInfo] = useState<ModalProps>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userStatus: 1,
    userRole: checkUserPermission,
    userPermission: "",
  });

  const handleModalChange = (event: any, key: any) => {
    modalInfo.userStatus = !!checkUserActive;
    modalInfo.userRole = !!checkUserPermission;
    setModalInfo({
      ...modalInfo,
      [key]: event.target.value,
    });
    console.log(modalInfo);
  };

  const handleModalSave = async () => {
    let missingField = null;
  
    switch (true) {
      case !modalInfo.userName:
        missingField = 'Nome do Usuário';
        break;
      case !modalInfo.userEmail:
        missingField = 'Email do Usuário';
        break;
      case !modalInfo.userPassword:
        missingField = 'Senha do Usuário';
        break;
      case !modalInfo.userStatus:
        missingField = 'Status do Usuário';
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
      });
      console.log(modalInfo);
    }
  };
  

  useEffect(() => {
    setCheckUserActive(props.userStatus == 1 ? true : false);
    setCheckUserPermission(props.userRole);
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
                      // onSubmit=
                      className={styles.formProvisionamento}
                    >
                      <Input
                        inputHtmlFor="nome"
                        inputType="text"
                        inputId="nome"
                        inputName="nome"
                        inputValue={props.userName ?? modalInfo.userName}
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
                        inputValue={props.userEmail ?? modalInfo.userEmail}
                        inputOnChange={(event) =>
                          handleModalChange(event, "userEmail")
                        }
                        inputPlaceHolder="Email do Usuário"
                      />
                      <Input
                        inputHtmlFor="senha"
                        inputType="password"
                        inputId="senha"
                        inputName="senha"
                        inputValue={
                          props.userPassword ?? modalInfo.userPassword
                        }
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
                          value="administrador"
                          onChange={(event) => {
                            setCheckUserPermission(!checkUserPermission);
                            handleModalChange(event, "userRole");
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
                        selectValue={
                          props.userPermission ?? modalInfo.userPermission
                        }
                        selectOnChange={(event) =>
                          handleModalChange(event, "userPermission")
                        }
                        optionValue="Cargo do Usuário"
                        optionTypes="{userExternalOptions}"
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
                    onClick={() => {
                      handleModalSave();
                      // setShowModal(false);
                    }}
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
