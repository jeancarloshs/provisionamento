"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import FormVlan from "@/components/FormVlan/FormVlan";

const Vlan = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Vlan"
  }, [])
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <FormVlan></FormVlan>
    </>
  );
};

export default Vlan;
