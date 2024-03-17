"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import Helpe from "@/components/Helpe/Helpe";

const Ajuda = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Ajuda"
  }, [])
  tokenVerify();
  return (
    <>
      <SideBar></SideBar>
      <Helpe></Helpe>
    </>
  );
};

export default Ajuda;
