import React, { ReactElement, ReactHTML, useState } from "react";
import ButtonComponent from "../Button/ButtonComponent";
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";

interface ModalProps {
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRole?: string;
  userPermission?: boolean;
  userStatus?: number;
  isOpen?: boolean;
  children?: ReactElement;
  hasImage?: boolean;
}

export default function Modal(props: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const imageEdite = "/assets/image/icons8-maintenance-64.png";

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
                        inputValue={props.userName ?? "Nome do Usuário"}
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("nome")
                        }
                        inputPlaceHolder="Nome do Usuário"
                      />
                      <Input
                        inputHtmlFor="email"
                        inputType="email"
                        inputId="email"
                        inputName="email"
                        inputValue={props.userEmail ?? "Email do Usuário"}
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("Email")
                        }
                        inputPlaceHolder="Email do Usuário"
                      />
                      <Input
                        inputHtmlFor="senha"
                        inputType="password"
                        inputId="senha"
                        inputName="senha"
                        inputValue={props.userPassword ?? "Senha do Usuário"}
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("Senha", props.userPassword)
                        }
                        inputPlaceHolder="Senha do Usuário"
                      />
                      <label className={styles.label}>
                        <input
                          type="radio"
                          value="ativo"
                          className={styles.inputLabel}
                          checked={props.userStatus == 1 ? true : false}
                        />
                        Ativo
                      </label>
                      <label className={styles.label}>
                        <input
                          type="radio"
                          value="inativo"
                          className={styles.inputLabel}
                          checked={props.userStatus == 0 ? true : false}
                        />
                        Inativo
                      </label>
                      <Select
                        selectLabelHtmlFor="cargo"
                        selectName="cargo"
                        selectId="cargo"
                        selectValue="valor"
                        // selectOnChange='{(event) => handleOnChangeProvisioning( event, "externalTechnician")}'
                        optionValue="Cargo do Usuário"
                        optionTypes="{userExternalOptions}"
                      ></Select>
                      <Select
                        selectLabelHtmlFor="permissao"
                        selectName="permissao"
                        selectId="permissao"
                        selectValue="valor"
                        // selectOnChange='{(event) => handleOnChangeProvisioning( event, "externalTechnician")}'
                        optionValue="Permissão do Usuário"
                        optionTypes={
                          <>
                            <option value={1}>Administrador</option>
                            <option value={0}>Usuário</option>
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
