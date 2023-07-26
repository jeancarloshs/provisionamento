"use client";
import { useState } from "react";

export default async function modelLogin(email: string, password: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: email,
    password: password,
  });

  let response = await fetch(`${urlApi}/login`, {
    method: "POST",
    headers: headersList,
    body: bodyContent,
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data;
}
