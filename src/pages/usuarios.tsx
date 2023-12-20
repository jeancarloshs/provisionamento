"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import OpcoesComponent from "@/components/Opcoes/OpcoesComponent";

const Usuarios = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Usuarios"
  }, [])
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <OpcoesComponent></OpcoesComponent>
    </>
  );
};

export default Usuarios;
