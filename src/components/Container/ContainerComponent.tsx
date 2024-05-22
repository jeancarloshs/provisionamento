import { useState } from "react";
import styles from "./ContainerComponent.module.css";

export default function Container(props: any) {
  return (
    <>
      <div className={styles.main}>
        {props.children}
      </div>
    </>
  );
}
