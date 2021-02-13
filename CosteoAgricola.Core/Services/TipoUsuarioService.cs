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
    public interface ITipoUsuarioService
    {
        TIPO_USUARIO GetTipoUsuario(int id);
        List<TIPO_USUARIO> GetTipoUsuarios();
        List<TIPO_USUARIO> GetTipoUsuariosFiltro(string nombre = null);
        bool InsertUpdateTipoUsuario(TIPO_USUARIO tipoPersonal, List<ACCESO> accesos, out string Message);
        bool EliminarTipoUsuario(int id, out string Message);
        List<ACCESO> GetTipoUsuarioAccesos(int id);
        List<ACCESO> GetAccesos();
    }

    public class TipoUsuarioService : ITipoUsuarioService
    {
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;
        private readonly IAccesosTipoUsuarioRepository _accesosTipoUsuarioRepository;
        private readonly IAccesosRepository _accesosRepository;

        public TipoUsuarioService(ITipoUsuarioRepository tipoUsuarioRepository, IAccesosTipoUsuarioRepository accesosTipoUsuarioRepository, IAccesosRepository accesosRepository) {
            _tipoUsuarioRepository = tipoUsuarioRepository;
            _accesosTipoUsuarioRepository = accesosTipoUsuarioRepository;
            _accesosRepository = accesosRepository;
        }

        public TIPO_USUARIO GetTipoUsuario(int id) {
            return _tipoUsuarioRepository.Get(id);
        }

        public List<TIPO_USUARIO> GetTipoUsuarios() {
            return _tipoUsuarioRepository.GetAll("TIPO_USUARIO").ToList();
        }

        public List<TIPO_USUARIO> GetTipoUsuariosFiltro(string nombre = null)
        {
            string filter = " Where ";

            if (!string.IsNullOrEmpty(nombre))
            {
                filter += string.Format("tipoUsuario_desc = '{0}' ", nombre);
            }

            Sql query = new Sql(@"select * from TIPO_USUARIO " + (!string.IsNullOrEmpty(nombre) ? filter : ""));
            return _tipoUsuarioRepository.GetByFilter(query);
        }

        public bool InsertUpdateTipoUsuario(TIPO_USUARIO tipoPersonal, List<ACCESO> accesos, out string Message)
        {

            Message = string.Empty;
            bool result = false;
            try
            {
                var id = _tipoUsuarioRepository.InsertOrUpdate<int>(tipoPersonal);
                tipoPersonal.tipoUsuario_id = id;
                Sql query = new Sql()
                .Select("*").From("ACCESOS_TIPO_USUARIO")
                .Where("ac_id_tipo_usuario = @0", id);
                List<ACCESOS_TIPO_USUARIO> _detallesActuales = _accesosTipoUsuarioRepository.GetByFilter(query);

                // Eliminar detalles que no existen en los actuales
                foreach (var detalleNoExiste in _detallesActuales.Where(p => !accesos.Any(p2 => p2.acceso_id == p.ac_id_accesos)))
                {
                    _accesosTipoUsuarioRepository.Remove(detalleNoExiste);
                }

                //Insertar o Actualizar detalles existentes o nuevos
                foreach (var detalle in accesos)
                {
                    query = new Sql()
                    .Select("*").From("ACCESOS_TIPO_USUARIO")
                    .Where("ac_id_tipo_usuario = @0 and ac_id_accesos = @1", id, detalle.acceso_id);
                    ACCESOS_TIPO_USUARIO accesosPersonal = _accesosTipoUsuarioRepository.Get(query);
                    if (accesosPersonal == null)
                    {
                        accesosPersonal = new ACCESOS_TIPO_USUARIO();
                        accesosPersonal.ac_id_accesos = detalle.acceso_id;
                        accesosPersonal.ac_id_tipo_usuario = id;
                    }
                    _accesosTipoUsuarioRepository.InsertOrUpdate<int>(accesosPersonal);
                }

                Message = "Tipo de Usuario guardado " + tipoPersonal.tipoUsuario_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "TipoUsuario No pudo ser guardado Error: " + ex.Message;
            }

            return result;
        }

        public bool EliminarTipoUsuario(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var tipo = _tipoUsuarioRepository.Get(id);
                Sql query = new Sql()
                .Select("*").From("ACCESOS_TIPO_USUARIO")
                .Where("ac_id_tipo_usuario = @0", tipo.tipoUsuario_id   );
                var listAccesos = _accesosTipoUsuarioRepository.GetByFilter(query);

                foreach (var item in listAccesos)
                {
                    _accesosTipoUsuarioRepository.Remove(item);
                }

                _tipoUsuarioRepository.Remove(tipo);

                Message = "Tipo Usuario eliminado " + tipo.tipoUsuario_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Usuario No pudo ser eliminado Error: " + ex.Message;
            }
            return result;
        }

        public List<ACCESO> GetTipoUsuarioAccesos(int id)
        {
            Sql query = new Sql(@"select a.* from ACCESOS a
                                inner join ACCESOS_TIPO_USUARIO ap on ap.ac_id_accesos = a.acceso_id
                                Where ap.ac_id_tipo_usuario = @0", id);
            List<ACCESO> accesos = _accesosRepository.GetByFilter(query);

            return accesos;
        }

        public List<ACCESO> GetAccesos()
        {
            return _accesosRepository.GetAll("ACCESOS").ToList();
        }
    }
}
