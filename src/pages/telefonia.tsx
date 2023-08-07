"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import FormTelefonia from "@/components/FormTelefonia/FormTelefonia";

const Telefonia = () => {
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <FormTelefonia></FormTelefonia>
    </>
  );
};

export default Telefonia;
