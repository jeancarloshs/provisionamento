import { useState } from "react";
import styles from "./ScriptTextArea.module.css";
import { TextAreaProps } from "@/api/types/types";

export default function ScriptTextArea(props: TextAreaProps) {
  return (
    <>
      <textarea
        name={props.textAreaName}
        className={styles.scriptOLT}
        value={props.valueResProvisioning}
        onChange={props.textAreaOnChange}
        id={props.textAreaId}
        readOnly
      ></textarea>
    </>
  );
}