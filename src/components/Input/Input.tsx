import styles from "./Input.module.css";

type InputProps = {
  inputHtmlFor: string;
  inputClassName?: string;
  inputType: string;
  inputId: string;
  inputName: string;
  inputValue: string;
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceHolder: string;
};

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
