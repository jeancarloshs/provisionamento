"use client";

export default function login() {
  return (
    <>
      <div className="grid-12 codigoGerado">
<label htmlFor="scriptOLT"><h2>Script</h2></label>
<textarea name="scriptOLT" id="scriptOLT"></textarea>
<button type="submit" id="btnLimpaInputs" name="btnLimpaInputs" className="btn BtnCopiar btnAcoes" >Limpar Dados</button>
<button type="submit" id="btnEnviaPlanilha" name="btnEnviaPlanilha" className="btn BtnCopiar btnAcoes" >Enviar p/ Planilha</button>
<button type="submit" id="btnCopiar" name="btnCopiar" className="btn BtnCopiar btnAcoes" >Copiar</button>
</div>
    </>
  );
}



