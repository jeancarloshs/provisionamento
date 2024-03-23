import { ReactElement, ReactNode } from "react";

export interface UserList {
  id:                       string;
  nomeFuncionario:          string;
  cargoFuncionario:         string;
  emailFuncionario:         string;
  senhaFuncionario:         string;
  admin:                    boolean;
  status:                   number;
  permissaoDoColaborador:   string;
  createdAt:                string;
  updatedAt:                string;
};

export interface DecodedToken {
  id:             number;
  storedToken:    string;
  userName:       string;
  app:            string;
};

export type ButtonProps = {
  btnId:            string;
  btnName:          string;
  btnText?:         string;
  btnOnClick?:      (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnClassName?:    string;
  children:         string;
};

export type SelectProps = {
  selectLabelHtmlFor:       string
  selectLabelClassName?:    string
  selectName:               string;
  selectId:                 string;
  selectValue:              string | undefined;
  selectOnChange?:          (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectClassName?:         string;
  optionValue:              string | undefined;
  optionTypes:              ReactNode;
};

export type TextAreaProps = {
  textAreaName:         string;
  textAreaClassName?:   string;
  valueResProvisioning: string;
  textAreaOnChange:     (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaId:           string;
};

export type InputProps = {
  inputHtmlFor:       string;
  inputClassName?:    string;
  inputType:          string;
  inputId:            string;
  inputName:          string;
  inputValue:         string | undefined;
  inputOnChange:      (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceHolder:   string;
};

export interface ProvisingProps {
  id:             string;
  clientes:       string;
  tecnicoRua:     string;
  numberSerial:   string;
  tipoDeAtivacao: string;
  posicionamento: string;
  patrimonioNX:   string;
  tecnicoSup:     string;
  data:           string;
};

export interface ServiceList {
  id:            string;
  tipoDeServico: string;
  createdAt:     Date;
  updatedAt:     Date;
};

export interface ArchivList {
  id:        string;
  nome:      string;
  url:       string;
  createdAt: string;
  updatedAt: string;
};

export interface ModalProps {
  userId?:            string;
  userName?:          string;
  userEmail?:         string;
  userPassword?:      string | undefined;
  userRole?:          boolean;
  userPermission?:    string;
  employeePosition?:  string;
  userStatus?:        number | any;
  isOpen?:            boolean;
  onClose?:           () => void;
  children?:          ReactElement;
  hasImage?:          boolean;
}

export interface UserUpdate {
  nomeFuncionario:        string;
  cargoFuncionario:       string;
  emailFuncionario:       string;
  senhaFuncionario:       string;
  admin:                  boolean;
  permissaoDoColaborador: string;
  status:                 number;
}