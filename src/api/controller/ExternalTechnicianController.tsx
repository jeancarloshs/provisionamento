"use client";

export default async function externalTechnician(storedToken: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${storedToken}`,
    "Content-Type": "application/json"
  }

  let response = await fetch(`${urlApi}/listaUsuarios`, {
    method: "GET",
    headers: headersList
  });

  let data = await response.json();
  // console.log("DATA", data);
  return data;
}