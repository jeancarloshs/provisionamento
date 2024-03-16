import { useEffect, useState } from "react";
import UserLoged from "../controller/UserLogedController";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "../types/types";

export default async function userConnected() {

  const storageToken = sessionStorage.getItem("Token") as string;

  const decodedToken: DecodedToken = jwt_decode(storageToken);
  const app = decodedToken.app;
  sessionStorage.setItem("app", app);

  try {
    const id = decodedToken.id;
    let userId = await UserLoged(storageToken, id);
    return userId;
  } catch (e) {
    console.error("ERRO:", e);
  }
};
