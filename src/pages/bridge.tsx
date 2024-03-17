"use client";
import React, { useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";
import FormBridge from "@/components/FormBridge/FormBridge";

const Bridge = () => {
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Bridge"
  }, [])
  tokenVerify();
  return (
    <>
      <SideBar></SideBar>
      <FormBridge></FormBridge>
    </>
  );
};

export default Bridge;
