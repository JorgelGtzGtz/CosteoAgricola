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
    public interface ISemillasService
    {
        SEMILLA GetSemilla(int id);
        SEMILLA GetSemilla(string desc);
        List<SEMILLA> GetSemillas();
        List<dynamic> GetSemillasFiltro(string activo = null);
        bool InsertUpdateSemilla(SEMILLA Semillas, out string Message);
        bool EliminarSemilla(int id, out string Message);
    }

    public class SemillasService : ISemillasService
    {
        private readonly ISemillasRepository _semillasRepository;

        public SemillasService(ISemillasRepository semillasRepository)
        {
            _semillasRepository = semillasRepository;
        }

        public bool EliminarSemilla(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var semilla = _semillasRepository.Get(id);

                _semillasRepository.Remove(semilla);

                Message = "Semilla eliminada " + semilla.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Semilla No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public SEMILLA GetSemilla(int id)
        {
            return _semillasRepository.Get(id);
        }

        public SEMILLA GetSemilla(string desc)
        {
            return _semillasRepository.GetSemilla(desc);
        }

        public List<SEMILLA> GetSemillas()
        {
            return _semillasRepository.GetAll("SEMILLAS").ToList();
        }

        public List<dynamic> GetSemillasFiltro(string activo = null)
        {
            string filter = " Where ";

            if (!string.IsNullOrEmpty(activo))
            {
                filter += string.Format("p.sem_status like '%{0}%'",activo);
            }

            Sql query = new Sql(@"select p.*, pt.sem_desc as NombreSemilla from SEMILLAS p
                                   on pt.sem_status = true" + (!string.IsNullOrEmpty(activo) ? filter : ""));
            return _semillasRepository.GetByDynamicFilter(query);
        }

        public bool InsertUpdateSemilla(SEMILLA semillas, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _semillasRepository.InsertOrUpdate<int>(semillas);

                Message = "Semilla guardada " + semillas.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Semilla No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }

    }
}
