import { SelectProps } from '@/api/types/types';
import styles from './Select.module.css'

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
