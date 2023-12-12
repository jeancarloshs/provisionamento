"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Usuarios = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Usuarios"
  })
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
    </>
  );
};

export default Usuarios;
