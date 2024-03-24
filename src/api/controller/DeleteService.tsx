"use client";

export default async function deleteService(storedToken: string, serviceId: number) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let app = sessionStorage.getItem("app");
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${storedToken}`,
    "Content-Type": "application/json"
   }
   
   let response = await fetch(`${urlApi}/deletarTipoDeServico/${serviceId}`, { 
     method: "DELETE",
     headers: headersList
   });
   
   let data = await response.json();
   console.log(data);
   return data;
}