"use client";

export default async function deleteArchive(storedToken: string, archiveId: number) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${storedToken}`,
    "Content-Type": "application/json"
   }
   
   let response = await fetch(`${urlApi}/deletarArquivo/${archiveId}`, { 
     method: "DELETE",
     headers: headersList
   });
   
   let data = await response.json();
   console.log(data);
   return data;
}