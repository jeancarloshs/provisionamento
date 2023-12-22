import { ReactNode } from "react";

export interface UserList {
  id: string;
  nomeFuncionario: string;
  cargoFuncionario: string;
  emailFuncionario: string;
  admin: boolean;
  status: number;
  permissaoDoColaborador: string;
  createdAt: string;
  updateAt: string;
}

export interface DecodedToken {
  id: number;
  storedToken: string;
  userName: string;
}

export type ButtonProps = {
  btnId: string;
  btnName: string;
  btnText?: string;
  btnOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnClassName?: string;
  children: string;
};

export type SelectProps = {
  selectLabelHtmlFor: string
  selectLabelClassName?: string
  selectName: string;
  selectId: string;
  selectValue: string;
  selectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectClassName?: string;
  optionValue: string
  optionTypes: ReactNode;
}

export type TextAreaProps = {
  textAreaName: string;
  textAreaClassName?: string;
  valueResProvisioning: string;
  textAreaOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaId: string;
};

export type InputProps = {
  inputHtmlFor: string;
  inputClassName?: string;
  inputType: string;
  inputId: string;
  inputName: string;
  inputValue: string;
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceHolder: string;
};
