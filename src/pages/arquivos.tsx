"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Arquivos = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Arquivos"
  }, [])
  tokenVerify();
  return (
    <>
      <SideBar></SideBar>
    </>
  );
};

export default Arquivos;
