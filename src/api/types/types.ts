export interface UserList {
  id: string;
  nomeFuncionario: string;
  cargoFuncionario: string;
  emailFuncionario: string;
  admin: boolean;
  status: number;
  permissaoDoColaborador: string;
  createdAt: string;
  updateAt: string;
}

export interface DecodedToken {
  id: number;
  storedToken: string;
  userName: string;
}