import { useState } from 'react';
import styles from './ScriptTextArea.module.css';

type TextAreaProps = {
  valueResProvisioning: string;
}

export default function ScriptTextArea(props: TextAreaProps) {
  const [resProvisioning, setResProvisioning] = useState("");

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setResProvisioning(event.target.value);
  };

  return (
    <>
      <textarea
        name="scriptOLT"
        className={styles.scriptOLT}
        value={props.valueResProvisioning}
        onChange={handleChangeTextarea}
        id="scriptOLT"
        readOnly
      ></textarea>
    </>
  );
}
