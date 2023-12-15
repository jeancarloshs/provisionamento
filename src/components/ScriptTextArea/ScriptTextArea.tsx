import { useState } from 'react';
import styles from './ScriptTextArea.module.css';

export default async function ScriptTextArea(props: string) {
  
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
        value={props.resProvisioning}
        onChange={handleChangeTextarea}
        id="scriptOLT"
        readOnly
      ></textarea>
    </>
  );
}