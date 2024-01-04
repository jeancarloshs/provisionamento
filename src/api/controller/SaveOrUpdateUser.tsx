import { UserUpdate } from "../types/types";

export async function SaveNewUser(
  storedToken: string,
  nomeFuncionario: string,
  emailFuncionario: string,
  senhaFuncionario: string,
  status: number,
  permissaoDoColaborador: string,
  admin: boolean,
  cargoFuncionario: string
) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${storedToken}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    nomeFuncionario: nomeFuncionario,
    emailFuncionario: emailFuncionario,
    senhaFuncionario: senhaFuncionario,
    status: status,
    permissaoDoColaborador: permissaoDoColaborador,
    admin: admin,
    cargoFuncionario: cargoFuncionario,
  });

  let response = await fetch(`${urlApi}/inserirUsuario`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
  return data;
}

export async function UpdateUser(
  storedToken: string,
  userID: string,
  nomeFuncionario: string,
  emailFuncionario: string,
  senhaFuncionario: string,
  status: number,
  permissaoDoColaborador: string,
  admin: boolean,
  cargoFuncionario: string
) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${storedToken}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    nomeFuncionario: nomeFuncionario,
    emailFuncionario: emailFuncionario,
    senhaFuncionario: senhaFuncionario,
    status: status,
    permissaoDoColaborador: permissaoDoColaborador,
    admin: admin,
    cargoFuncionario: cargoFuncionario,
  });

  let response = await fetch(`${urlApi}/atualizarUsuario/${userID}`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
  return data;
}
