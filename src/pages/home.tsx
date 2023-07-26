"use client";
import React from "react";
import SideBar from "@/components/SideBar/SideBar";
import tokenVerify from "@/api/middleware/tokenVerify";

const Home = () => {
  tokenVerify()
  return (
    <>
      <SideBar></SideBar>
    </>
  );
};

export default Home;
