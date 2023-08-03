"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Opcoes = () => {
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
    </>
  );
};

export default Opcoes;
