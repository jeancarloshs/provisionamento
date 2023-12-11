"use client";

export default async function UserLoged(token: string, id: number) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`,
    // "Content-Type": "application/json",
  };

  let response = await fetch(`${urlApi}/listausuario/${id}`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data;
}
