"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import FormTelefonia from "@/components/FormTelefonia/FormTelefonia";

const Telefonia = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Telefonia"
  })
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <FormTelefonia></FormTelefonia>
    </>
  );
};

export default Telefonia;
