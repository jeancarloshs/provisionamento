import { SelectProps } from '@/api/types/types';
import styles from './Select.module.css'
import { UseFormRegister, FieldError } from "react-hook-form";

interface EnhancedSelectProps extends SelectProps {
  register: any;
  error?: FieldError;
}

export default function Select(props: EnhancedSelectProps) {
  const { 
    selectLabelHtmlFor,
    selectLabelClassName,
    selectName,
    selectId,
    selectValue,
    selectOnChange,
    register,
    error
  } = props;

  return (
    <>
      <label htmlFor={selectLabelHtmlFor} className={selectLabelClassName}></label>
      {error && (
        <p className="text-[12px] text-red-600">{error.message}</p>
      )}
      <select
        name={selectName}
        id={selectId}
        {...register(selectName)}
        value={selectValue}
        onChange={selectOnChange}
        className={styles.formSelect}
        required
      >
        <option value="">{props.optionValue}</option>
        {props.optionTypes}
      </select>
    </>
  );
}
