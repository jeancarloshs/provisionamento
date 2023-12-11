"use client";

export default async function servicesTypes(storedToken: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${storedToken}`,
  };

  let response = await fetch(`${urlApi}/listaServicos`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data
}
