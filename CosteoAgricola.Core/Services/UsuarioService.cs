using dbconnection;
using CosteoAgricola.Core.Entities;
using CosteoAgricola.Core.Repository;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IUsuarioService
    {
        USUARIO GetUsuario(int id);
        USUARIO GetUsuario(string usr);
        USUARIO GetUsuario(string usr, string password);
        List<USUARIO> GetUsuarios();
        List<dynamic> GetUsuarioesFiltro(string nombre = null);
        bool InsertUpdateUsuario(USUARIO Usuario, out string Message);
        bool EliminarUsuario(int id, out string Message);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IAccesosTipoUsuarioRepository _accesosTipoUsuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository, IAccesosTipoUsuarioRepository accesosTipoUsuarioRepository) {
            _usuarioRepository = usuarioRepository;
            _accesosTipoUsuarioRepository = accesosTipoUsuarioRepository;
        }

        public USUARIO GetUsuario(int id) {
            return _usuarioRepository.Get(id);
        }

        public USUARIO GetUsuario(string usr, string password)
        {
            return _usuarioRepository.GetUsuario(usr, password);
        }

        public USUARIO GetUsuario(string usr)
        {
            return _usuarioRepository.GetUsuario(usr);
        }

        public List<USUARIO> GetUsuarios() {
            return _usuarioRepository.GetAll("USUARIO").ToList();
        }

        public List<dynamic> GetUsuarioesFiltro(string nombre = null)
        {
            string filter = " Where ";

            if (!string.IsNullOrEmpty(nombre))
            {
                filter += string.Format("p.usuario_nom like '%{0}%' or p.usuario_login like '%{0}%' or p.usuario_id like '%{0}%' or pt.tipoUsuario_desc like '%{0}%'", nombre);
            }

            Sql query = new Sql(@"select p.*, pt.tipoUsuario_desc as NombreTipo from  USUARIO p
                                  inner join TIPO_USUARIO pt on pt.tipoUsuario_id = p.tipoUsuario_id" + (!string.IsNullOrEmpty(nombre) ? filter : ""));
            return _usuarioRepository.GetByDynamicFilter(query);
        }

        public bool InsertUpdateUsuario(USUARIO usuario, out string Message) {

            Message = string.Empty;
            bool result = false;
            try
            {
                _usuarioRepository.InsertOrUpdate<int>(usuario);

                Message = "Usuario guardado " + usuario.usuario_nom + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Usuario No pudo ser guardado Error: " + ex.Message;
            }

            return result;
        }

        public bool EliminarUsuario(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var usuario = _usuarioRepository.Get(id);

                _usuarioRepository.Remove(usuario);

                Message = "Usuario eliminado " + usuario.usuario_nom + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Usuario No pudo ser eliminado Error: " + ex.Message;
            }
            return result;
        }

        public List<ACCESOS_TIPO_USUARIO> GetPermisosUsuario(int id)
        {
            Sql query = new Sql()
                .Select("*").From("ACCESOS_TIPO_USUARIO")
                .Where("ac_id_tipo_usuario = @0", id);

            return _accesosTipoUsuarioRepository.GetByFilter(query);
        }
    }
}
