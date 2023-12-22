import { useState } from "react";
import styles from "./ScriptTextArea.module.css";

type TextAreaProps = {
  textAreaName: string;
  textAreaClassName?: string;
  valueResProvisioning: string;
  textAreaOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaId: string;
};

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