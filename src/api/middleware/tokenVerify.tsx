/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function tokenVerify() {
  const [token, getToken] = useState<String | null>("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("Token");
    getToken(storedToken);
    if (storedToken === null) {
      router.push("/");
      alert("Sessão expirada");
    }
  }, [router]);

  return <></>;
}
