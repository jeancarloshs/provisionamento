import { InputProps } from "@/api/types/types";
import styles from "./Input.module.css";

export default function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.inputHtmlFor}></label>
      <input
        className={styles.inputProvisionamento}
        type={props.inputType}
        id={props.inputId}
        name={props.inputName}
        value={props.inputValue}
        onChange={props.inputOnChange}
        placeholder={props.inputPlaceHolder}
        required
      />
    </>
  );
}
