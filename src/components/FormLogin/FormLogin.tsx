/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import modelLogin from "@/api/models/Login";
import styles from "./FormLogin.module.css";
// import spinnerImg from "/assets/image/dot-revolve.svg";

export default function FormLogin() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleOnChangeLogin = (event: any, key: any) => {
    setLoginState({ ...loginState, [key]: event.target.value });
  };

  const handleFormLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let email = loginState.email.trim();
    let password = loginState.password;

    const data = await modelLogin(email, password);

    console.log(data)

    let Home = "/home";

    if (data.auth === true) {
      let token = data.token;
      setLoading(true);
      sessionStorage.setItem("Token", token);
      setTimeout(() => {
        router.push(Home);
        // setLoading(false);
      }, 1000);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.box}>
          <img
            className={styles.imgLogo}
            src="/assets/image/naxos_telecom_logo.png"
            alt="Naxos Telecom"
          />
          <div className={styles.container}>
            <form
              className={styles.form}
              method="POST"
              onSubmit={handleFormLogin}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className={styles.inputValue}
                value={loginState.email}
                onChange={(event) => handleOnChangeLogin(event, "email")}
                required
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
                className={styles.inputValue}
                value={loginState.password}
                onChange={(event) => handleOnChangeLogin(event, "password")}
                required
              />

              <button
                type="submit"
                id="btnLogin"
                name="btnLogin"
                className={styles.inputLogin}
              >
                {loading && (
                  <img
                    src='/assets/image/dot-revolve.svg'
                    alt="Loading"
                    className={styles.spinner}
                  />
                )}
                { loading !== true ? 'Login' : '' }
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
