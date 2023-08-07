"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import FormVlan from "@/components/FormVlan/FormVlan";

const Vlan = () => {
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
      <FormVlan></FormVlan>
    </>
  );
};

export default Vlan;
