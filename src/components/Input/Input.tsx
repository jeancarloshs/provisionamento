import { InputProps } from "@/api/types/types";
import styles from "./Input.module.css";
import { FieldError } from "react-hook-form";

interface EnhancedInputProps extends InputProps {
  register: any;
  error?: FieldError;
}

export default function Input(props: EnhancedInputProps) {
  const {
    inputHtmlFor,
    inputType,
    inputId,
    inputName,
    inputValue,
    inputOnChange,
    inputPlaceHolder,
    register,
    error,
  } = props;

  return (
    <>
      <label htmlFor={inputHtmlFor}></label>
      {error && (
        <span className="text-[12px] text-red-600">{error?.message}</span>
      )}
      <input
        className={styles.inputProvisionamento}
        type={inputType}
        id={inputId}
        {...register(inputName)}
        name={inputName}
        value={inputValue}
        onChange={inputOnChange}
        placeholder={inputPlaceHolder}
        required
      />
    </>
  );
}
