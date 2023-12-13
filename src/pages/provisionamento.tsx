"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import FormProvisionamento from "@/components/FormProvisionamento/FormProvisionamento";
import tokenVerify from "@/api/middleware/tokenVerify";

const Provisionamento = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Provisionamento"
  }, [])
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <FormProvisionamento></FormProvisionamento>
    </>
  );
};

export default Provisionamento;
