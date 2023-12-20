import styles from './Select.module.css'

type SelectProps = {
    selectLabelHtmlFor: string
    selectLabelClassName: string
    selectName: string;
    selectId: string;
    selectValue: string;
    selectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectClassName?: string;
    optionValue: string
    optionTypes: string[];
}

export default function Select(props: SelectProps) {
  return (
    <>
      <label htmlFor={props.selectLabelHtmlFor} className={props.selectLabelClassName}></label>
      <select
        name={props.selectName}
        id={props.selectId}
        value={props.optionValue}
        onChange={props.selectOnChange}
        className={styles.formSelect}
        required
      >
        <option value="">{props.optionValue}</option>
        {props.optionTypes}
      </select>
    </>
  );
}
