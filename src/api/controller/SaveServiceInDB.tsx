"use client";

export default async function SaveServiceInDB(
  token: string,
  clientName: string,
  equipmentAssets: string,
  serviceType: number,
  positioning: string,
  externalTechnician: number,
  internalTechnician: number
) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    "nomeCliente": `${clientName}`,
    "enderecoCliente": "",
    "tecnicoRua": `${externalTechnician}`,
    "numeroDeSerie": `${equipmentAssets}`,
    "posicionamento": `${positioning}`,
    "patrimonioNaxos": `${equipmentAssets}`,
    "tecnicoSup": `${internalTechnician}`,
    "created_at": "",
    "update_at": "",
    "tipoDeServico": `${serviceType}`,
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