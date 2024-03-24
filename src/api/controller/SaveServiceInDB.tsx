"use client";

export default async function SaveServiceInDB(
  token: string,
  clientName: string,
  clientAddress: string,
  equipmentAssets: string,
  serialNumber: string,
  serviceType: number,
  positioning: string,
  externalTechnician: number,
  internalTechnician: number,
) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let app = sessionStorage.getItem("app");
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    "nomeCliente": `${clientName}`,
    "enderecoCliente": `${clientAddress}`,
    "tecnicoRua": externalTechnician,
    "numeroDeSerie": `${serialNumber}`,
    "tipoDeServico": serviceType,
    "posicionamento": `${positioning}`,
    "patrimonioNaxos": equipmentAssets,
    "tecnicoSup": internalTechnician,
    "app": app
  });

  let response = await fetch(`${urlApi}/provisionaClientes`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data
}