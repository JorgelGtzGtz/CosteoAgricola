using CosteoAgricola.Core.Repository;
using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IFertilizantesService
    {
        FERTILIZANTE GetFertilizante(int id);
        FERTILIZANTE GetFertilizante(string desc);
        List<FERTILIZANTE> GetFertilizantes();
        // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateFertilizante(FERTILIZANTE fertilizantes, out string Message);
        bool EliminarFertilizante(int id, out string Message);
    }
    public class FertilizantesService : IFertilizantesService
    {
        private readonly IFertilizantesRepository _fertilizantesRepository;

        public FertilizantesService(IFertilizantesRepository fertilizantesRepository)
        {
            _fertilizantesRepository = fertilizantesRepository;
        }

        public bool EliminarFertilizante(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var fert = _fertilizantesRepository.Get(id);

                _fertilizantesRepository.Remove(fert);

                Message = "Fertilizante eliminado " + fert.fert_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Fertilizante No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public FERTILIZANTE GetFertilizante(int id)
        {
            return _fertilizantesRepository.Get(id);
        }

        public FERTILIZANTE GetFertilizante(string desc)
        {
            return _fertilizantesRepository.GetFertilizante(desc);
        }

        public List<FERTILIZANTE> GetFertilizantes()
        {
            return _fertilizantesRepository.GetAll("FERTILIZANTES").ToList();
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
        public bool InsertUpdateFertilizante(FERTILIZANTE fertilizantes, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _fertilizantesRepository.InsertOrUpdate<int>(fertilizantes);

                Message = "Unidad guardada " + fertilizantes.fert_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Fertilizante No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }

    }
}
