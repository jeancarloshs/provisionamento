import { useState } from "react";
import styles from "./ButtonComponent.module.css";

type ButtonProps = {
  btnId: string;
  btnName: string;
  btnText?: string;
  btnOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnClassName?: string;
  children: string;
};

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
