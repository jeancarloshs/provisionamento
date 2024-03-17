"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Servicos = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Serviços"
  }, [])
  tokenVerify();
  return (
    <>
      <SideBar></SideBar>
    </>
  );
};

export default Servicos;
