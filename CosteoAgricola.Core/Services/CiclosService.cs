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
    public interface ICiclosService
    {
        CICLO GetCiclo(int id);
        CICLO GetCiclo(string desc);
        List<CICLO> GetCiclos();
        List<dynamic> GetCiclosFiltro(string ciclo = null, string estatus = null);
        List<dynamic> GetCiclosFechas(string id = null);
        bool InsertUpdateCiclo(CICLO ciclos, out string Message);
        bool EliminarCiclo(int id, out string Message);
    }

    public class CiclosService : ICiclosService
    {
        private readonly ICiclosRepository _ciclosRepository;

        public CiclosService(ICiclosRepository ciclosRepository)
        {
            _ciclosRepository = ciclosRepository;
        }

        public bool EliminarCiclo(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var ciclo = _ciclosRepository.Get(id);

                _ciclosRepository.Remove(ciclo);

                Message = "Ciclo eliminado " + ciclo.ciclo_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Ciclo No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public CICLO GetCiclo(int id)
        {
            return _ciclosRepository.Get(id);
        }

        public CICLO GetCiclo(string desc)
        {
            return _ciclosRepository.GetCiclo(desc);
        }

        public List<CICLO> GetCiclos()
        {
            return _ciclosRepository.GetAll("CICLOS").ToList();
        }

        public List<dynamic> GetCiclosFiltro(string ciclo, string estatus)
        {
            string filter = " ";
            string filter3 = " ";

            if (estatus.Equals("false") && (string.IsNullOrEmpty(ciclo) || !string.IsNullOrEmpty(ciclo)))
            {
                estatus = null;
            }

            if (!string.IsNullOrEmpty(ciclo))
            {
                filter += " Where " + string.Format(" p.ciclo_descripcion like '%{0}%'", ciclo);
            }


            if ((!string.IsNullOrEmpty(estatus)))
            {
                if (!filter.Contains(" Where"))
                {
                    filter3 += " Where " + string.Format(" p.ciclo_status = '{0}'", estatus);
                }
                else
                {
                    filter3 += " and " + string.Format(" p.ciclo_status = '{0}'", estatus);
                }

            }





            Sql query = new Sql(@" SELECT p.*, 
                                    CONVERT(VARCHAR(10),p.ciclo_fechaIni,106) as Fecha_inicio,
		                            CONVERT(VARCHAR(10),p.ciclo_fechaFin,106) as Fecha_fin
                                    FROM CICLOS p"
                                 + (!string.IsNullOrEmpty(ciclo) ? filter : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter3 : ""));

            return _ciclosRepository.GetByDynamicFilter(query);
        }

        public List<dynamic> GetCiclosFechas(string id)
        {
            string filter = " Where ";
            if (!string.IsNullOrEmpty(id))
            {
                filter += string.Format(" ciclo_id = '{0}'", id);
            }

            Sql query = new Sql(@" SELECT MONTH(ciclo_fechaIni) as MesFechaIni,
		                            Day(ciclo_fechaIni) as DiaFechaIni,
		                            year(ciclo_fechaIni) as AnoFechaIni,

		                            MONTH(ciclo_fechaFin) as MesFechaFin,
		                            Day(ciclo_fechaFin) as DiaFechaFin,
		                            year(ciclo_fechaFin) as AnoFechaFin

                                    from CICLOS "+ (!string.IsNullOrEmpty(id) ? filter : ""));

            return _ciclosRepository.GetByDynamicFilter(query);
        }

        public bool InsertUpdateCiclo(CICLO ciclos, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _ciclosRepository.InsertOrUpdate<int>(ciclos);

                Message = "Ciclo guardado " + ciclos.ciclo_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Ciclo No pudo ser guardado Error: " + ex.Message;
            }

            return result;
        }

    }
}
