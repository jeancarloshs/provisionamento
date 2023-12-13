"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import OpcoesComponent from "@/components/Opcoes/OpcoesComponent";
import tokenVerify from "@/api/middleware/tokenVerify";

const Opcoes = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Opções"
  }, [])
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <OpcoesComponent></OpcoesComponent>
    </>
  );
};

export default Opcoes;
