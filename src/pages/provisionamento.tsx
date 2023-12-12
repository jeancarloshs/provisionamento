"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import FormProvisionamento from "@/components/FormProvisionamento/FormProvisionamento";

const Provisionamento = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Provisionamento"
  })
  return (
    <>
      <SideBar></SideBar>
      <FormProvisionamento></FormProvisionamento>
    </>
  );
};

export default Provisionamento;
