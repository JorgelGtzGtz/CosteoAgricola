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
        UNIDADES GetUnidad(int id);
        UNIDADES GetUnidad(string desc);
        List<UNIDADES> GetUnidades();
       // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateUnidad(UNIDADES unidades, out string Message);
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

        public UNIDADES GetUnidad(int id)
        {
            return _unidadesRepository.Get(id);
        }

        public UNIDADES GetUnidad(string desc)
        {
            return _unidadesRepository.GetUnidad(desc);
        }

        public List<UNIDADES> GetUnidades()
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
        public bool InsertUpdateUnidad(UNIDADES unidades, out string Message)
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
