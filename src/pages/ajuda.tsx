"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import Helpe from "@/components/Helpe/Helpe";

const Ajuda = () => {
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <Helpe></Helpe>
    </>
  );
};

export default Ajuda;
