using CosteoAgricola.Core.Repository;
using dbconnection;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
   public interface IUnidadesService 
    {
        UNIDADE GetUnidad(int id);
        UNIDADE GetUnidad(string desc);
        List<UNIDADE> GetUnidades();
       // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateUnidad(UNIDADE unidades, out string Message);
        bool EliminarUnidad(int id, out string Message);
    }

    public class UnidadesService : IUnidadesService
    {
        private readonly IUnidadesRepository _unidadesRepository;

        public UnidadesService(IUnidadesRepository unidadesRepository)
        {
            _unidadesRepository = unidadesRepository;
        }

        public bool EliminarUnidad(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var unidad = _unidadesRepository.Get(id);

                _unidadesRepository.Remove(unidad);

                Message = "Unidad eliminada " + unidad.unidad_abrev + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Unidad No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public UNIDADE GetUnidad(int id)
        {
            return _unidadesRepository.Get(id);
        }

        public UNIDADE GetUnidad(string desc)
        {
            return _unidadesRepository.GetUnidad(desc);
        }

        public List<UNIDADE> GetUnidades()
        {
            return _unidadesRepository.GetAll("UNIDADES").ToList();
        }

        /*
        public List<dynamic> GetUnidadesFiltro(string activo = null)
        {
            string filter = " Where ";

            if (!string.IsNullOrEmpty(activo))
            {
                filter += string.Format("p.sem_status like '%{0}%'", activo);
            }

            Sql query = new Sql(@"select p.*, pt.sem_desc as NombreSemilla from SEMILLAS p
                                   on pt.sem_status = true" + (!string.IsNullOrEmpty(activo) ? filter : ""));
            return _unidadesRepository.GetByDynamicFilter(query);
        }
        */
        public bool InsertUpdateUnidad(UNIDADE unidades, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _unidadesRepository.InsertOrUpdate<int>(unidades);

                Message = "Unidad guardada " + unidades.unidad_abrev + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Unidad No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }

    }
}
