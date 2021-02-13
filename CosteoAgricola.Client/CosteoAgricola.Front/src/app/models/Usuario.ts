export class Usuario {
  usuario_id: number;
  emp_id ?: number;
  usuario_nom: string;
  usuario_correo: string;
  usuario_telefono: string;
  usuario_genero: string;
  tipoUsuario_id ?: number;
  usuario_login: string;
  usuario_password: string;
  usuario_status?: boolean;
  usuario_superAdmin?: boolean;
}
