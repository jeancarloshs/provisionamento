import React, { useState } from "react";
import ButtonComponent from "../Button/ButtonComponent";
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";

interface ModalProps {
  isOpen: boolean;
}

export default function Modal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const userOptions = () => {
    return <option value={1}>Ativo</option>;
  };
  
  return (
    <>
      <ButtonComponent
        btnId="adduser"
        btnName="Adicionar Usuário"
        btnOnClick={() => setShowModal(true)}
      >
        Adicionar
      </ButtonComponent>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm cursor-auto">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 text-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Adicionar Novo Usuário
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
                        inputValue="Nome do Colaborador"
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("nome")
                        }
                        inputPlaceHolder="Nome do Colaborador"
                      />
                      <Input
                        inputHtmlFor="email"
                        inputType="email"
                        inputId="email"
                        inputName="email"
                        inputValue="Email do Colaborador"
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("Email")
                        }
                        inputPlaceHolder="Email do Colaborador"
                      />
                      <Input
                        inputHtmlFor="senha"
                        inputType="password"
                        inputId="senha"
                        inputName="senha"
                        inputValue="Senha do Colaborador"
                        inputOnChange={(event) =>
                          // handleOnChangeProvisioning(event, "clientName")
                          console.log("Senha")
                        }
                        inputPlaceHolder="Senha do Usuário"
                      />
                      <Select
                        selectLabelHtmlFor="cargo"
                        selectName="cargo"
                        selectId="cargo"
                        selectValue="valor"
                        // selectOnChange='{(event) => handleOnChangeProvisioning( event, "externalTechnician")}'
                        optionValue="Cargo do Colaborador"
                        optionTypes="{userExternalOptions}"
                      ></Select>
                      <Select
                        selectLabelHtmlFor="permissao"
                        selectName="permissao"
                        selectId="permissao"
                        selectValue="valor"
                        // selectOnChange='{(event) => handleOnChangeProvisioning( event, "externalTechnician")}'
                        optionValue="Permissão do Colaborador"
                        optionTypes="{userExternalOptions}"
                      ></Select>
                      <Select
                        selectLabelHtmlFor="status"
                        selectName="status"
                        selectId="status"
                        selectValue="valor"
                        // selectOnChange='{(event) => handleOnChangeProvisioning( event, "externalTechnician")}'
                        optionValue="Status do Colaborador"
                        optionTypes='{userOptions}'
                      ></Select>
                    </form>
                  </div>

                  {/* <p className="my-4 text-black text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
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
