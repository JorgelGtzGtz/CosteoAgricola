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
        List<dynamic> GetSemillasFiltro(string nombre = null, string inventariable = null, string status = null);
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

        public List<dynamic> GetSemillasFiltro(string semillas, string inventariable , string estatus)
        {
            string filter = " ";
            string filter2 = " ";
            string filter3 = " ";

            if (inventariable.Equals("false") && estatus.Equals("false") && (string.IsNullOrEmpty(semillas) || !string.IsNullOrEmpty(semillas)))
            {
                inventariable = null;
                estatus = null;
            }
           
            if (!string.IsNullOrEmpty(semillas))
            {
                filter += "Where "+ string.Format("pt.sem_desc like '%{0}%'", semillas);
            }

            if ((!string.IsNullOrEmpty(inventariable)))
            {
                if(!filter.Contains("Where"))
                {

                    filter2 += "Where " + string.Format("pt.sem_inventariable = '{0}'", inventariable);
                }
                else
                {
                    filter2 += "and " + string.Format("pt.sem_inventariable = '{0}'", inventariable);
                }
                
            }

            if ((!string.IsNullOrEmpty(estatus)))
            {
                if (!filter.Contains("Where") && !filter2.Contains("Where"))
                {
                    filter3 += "Where "+string.Format("pt.sem_status = '{0}'", estatus);
                }
                else
                {
                    filter3 += "and "+ string.Format("pt.sem_status = '{0}'", estatus);
                }

            }

           

            

            Sql query = new Sql(@"select pt.*, p.unidad_abrev as NombreUnidad from  UNIDADES p
                                 inner join SEMILLAS pt on pt.sem_unidad = p.unidad_id " 
                                 + (!string.IsNullOrEmpty(semillas) ? filter : "") 
                                 + (!string.IsNullOrEmpty(inventariable) ? filter2 : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter3 : ""));

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
