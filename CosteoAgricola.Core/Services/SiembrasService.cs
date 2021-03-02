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
    public interface ISiembrasService
    {
        SIEMBRA GetSiembra(int id);
        SIEMBRA GetSiembra(string desc);
        List<SIEMBRA> GetSiembras();
        List<dynamic> GetSiembrasFiltro(string descripcion = null, string ciclo = null, string estatus = null, string lote = null, string semilla = null);
        bool InsertUpdateSiembra(SIEMBRA siembras, out string Message);
        bool EliminarSiembra(int id, out string Message);
    }

    public class SiembrasService : ISiembrasService
    {
        private readonly ISiembrasRepository _siembrasRepository;

        public SiembrasService(ISiembrasRepository siembrasRepository)
        {
            _siembrasRepository = siembrasRepository;
        }

        public bool EliminarSiembra(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var siembra = _siembrasRepository.Get(id);

                _siembrasRepository.Remove(siembra);

                Message = "Siembra ah sido eliminado " + siembra.siembra_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Siembra No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public SIEMBRA GetSiembra(int id)
        {
            return _siembrasRepository.Get(id);
        }

        public SIEMBRA GetSiembra(string desc)
        {
            return _siembrasRepository.GetSiembra(desc);
        }

        public List<SIEMBRA> GetSiembras()
        {
            return _siembrasRepository.GetAll("SIEMBRAS").ToList();
        }

        public List<dynamic> GetSiembrasFiltro(string descripcion, string ciclo, string estatus, string lote, string semilla)
        {
            string filter = " ";
            string filter2 = " ";
            string filter3 = " ";
            string filter4 = " ";
            string filter5 = " ";

            ///CUANDO NO HAY NINGUN FILTRO SE MUESTRA TODO
            if (string.IsNullOrEmpty(descripcion)  && string.IsNullOrEmpty(ciclo)
                && estatus.Equals("false") && string.IsNullOrEmpty(lote) && string.IsNullOrEmpty(semilla))
            {
                estatus = null;
            }

            //CUANDO SOLO PONE LA DESCRIPCION (TOMA EL ESTATUS COMO FALSE)
            if (!string.IsNullOrEmpty(descripcion))
            {
                filter += " Where " + string.Format(" s.siembra_descripcion like '%{0}%' or se.sem_desc like '%{0}%' or l.lote_descripcion like '%{0}%' or c.ciclo_descripcion like '%{0}%'", descripcion);
            }

            ///CUANDO SOLO ES POR ESTATUS
            if (!string.IsNullOrEmpty(estatus) && (estatus.Equals("true") || estatus.Equals("false")))
            {
                if(!filter.Contains("Where"))
                {
                    filter3 += " Where " + string.Format(" s.siembra_status = '{0}'", estatus);
                }
                else
                {
                    filter3 += " and " + string.Format(" s.siembra_status = '{0}'", estatus);
                }
                

            }
            /// CUANDO TIENE DESCRIPCION Y UN CICLO SELECCIONADO
           if (!string.IsNullOrEmpty(ciclo))
            {
                if(!filter.Contains("Where") && !filter3.Contains("Where"))
                {
                    filter2 += " Where " + string.Format(" s.siembra_cicloID = '{0}'", ciclo);
                }
                else
                {
                    filter2 += " and " + string.Format(" s.siembra_cicloID = '{0}'", ciclo);
                }
            }
            /// CUANDO TIENE DESCRIPCION Y UN LOTE SELECCIONADO
            if (!string.IsNullOrEmpty(lote))
            {
                if (!filter.Contains("Where") && !filter3.Contains("Where") && !filter2.Contains("Where"))
                {
                    filter4 += " Where " + string.Format(" s.siembra_loteID = '{0}'", lote);
                }
                else
                {
                    filter4 += " and " + string.Format(" s.siembra_loteID = '{0}'", lote);
                }
            }
            /// CUANDO TIENE DESCRIPCION Y UNA SEMILLA SELECCIONADA
            if (!string.IsNullOrEmpty(semilla))
            {
                if (!filter.Contains("Where") && !filter3.Contains("Where") && !filter2.Contains("Where") && !filter4.Contains("Where"))
                {
                    filter5 += " Where " + string.Format(" s.siembra_semillaID = '{0}'", semilla);
                }
                else
                {
                    filter5 += " and " + string.Format(" s.siembra_semillaID = '{0}'", semilla);
                }
            }





            Sql query = new Sql(@" SELECT s.siembra_id, s.siembra_descripcion, s.siembra_status, 
                                    se.sem_desc AS Cultivo, 
                                    l.lote_descripcion as Lote,
                                    c.ciclo_descripcion as Ciclo
                                    FROM SIEMBRAS AS s
                                    INNER JOIN LOTES AS l ON l.lote_ID = s.siembra_loteID
                                    INNER JOIN SEMILLAS AS se ON se.sem_ID = s.siembra_semillaID
                                    INNER JOIN CICLOS AS c ON c.ciclo_id = s.siembra_cicloID"
                                 + (!string.IsNullOrEmpty(descripcion) ? filter : "")
                                 + (!string.IsNullOrEmpty(ciclo) ? filter2 : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter3 : "")
                                 + (!string.IsNullOrEmpty(lote) ? filter4 : "")
                                 + (!string.IsNullOrEmpty(semilla) ? filter5 : ""));

            return _siembrasRepository.GetByDynamicFilter(query);
        }


        public bool InsertUpdateSiembra(SIEMBRA siembras, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _siembrasRepository.InsertOrUpdate<int>(siembras);

                Message = "Siembra guardada " + siembras.siembra_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Siembra No pudo ser guardado Error: " + ex.Message;
            }

            return result;
        }

    }
}
