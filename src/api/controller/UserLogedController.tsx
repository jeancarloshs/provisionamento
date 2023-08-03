"use client";
import { useState } from "react";

export default async function UserLoged(token: string, id: number) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`,
    // "Content-Type": "application/json",
  };

  let response = await fetch(`${urlApi}/listausuarios/${id}`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data;
}