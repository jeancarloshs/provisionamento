import React from 'react'

interface UserAddProps {
  id: number;
  nomeFuncionario: string;
  cargoFuncionario: string;
  emailFuncionario: string;
  senhaFuncionario?: string;
  admin: boolean;
  permissaoDoColaborador: string;
  status: number;
}

export default function UserAdd(props: UserAddProps) {

}
