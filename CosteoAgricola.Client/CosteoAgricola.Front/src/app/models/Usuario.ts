export class Usuario {
  ID: number;
  Nombre: string;
  _Usuario: string;
  Contrasena: string;
  Telefono: string;
  Genero: string;
  eMail: string;
  SuperAdmin?: boolean;
  Estatus?: boolean;
  ID_TipoUsuario: number;
  esCliente?: boolean;
  Cliente_ID?: number;
}
