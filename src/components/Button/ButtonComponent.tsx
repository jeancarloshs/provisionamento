import { useState } from "react";
import styles from "./ButtonComponent.module.css";
import { ButtonProps } from "@/api/types/types";

export default function ButtonComponent(props: ButtonProps) {
  return (
    <>
      <button
        type="submit"
        id={props.btnId}
        name={props.btnName}
        onClick={props.btnOnClick}
        className={props.btnClassName || styles.btnProvisionamento}
      >
        {props.children}
      </button>
    </>
  );
}
