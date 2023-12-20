"use client";
import React, { StrictMode, useEffect } from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Home = () => {
  // Com o Array vazio ele executa somente 1 vez na tela
  useEffect(() => {
    document.title = "Provisionamento FTTH Naxos Telecom - Home";
  }, []);
  tokenVerify();
  return (
    <>
      <StrictMode>
        <SideBar></SideBar>
      </StrictMode>
    </>
  );
};

export default Home;
