"use client";

export default async function deleteCustomer(storedToken: string, customerId: number) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let app = sessionStorage.getItem("app");
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${storedToken}`,
    "Content-Type": "application/json"
   }
   
   let response = await fetch(`${urlApi}/removeCliente/${customerId}`, { 
     method: "DELETE",
     headers: headersList
   });
   
   let data = await response.json();
  //  console.log(data);
   return data;
}