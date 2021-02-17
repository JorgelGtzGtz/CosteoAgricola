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
        List<dynamic> GetUnidadesFiltro(string unidades = null, string estatus = null);
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

        public List<dynamic> GetUnidadesFiltro(string unidades, string estatus)
        {
            string filter = " ";
            string filter2 = " ";

            if(string.IsNullOrEmpty(unidades) && estatus.Equals("false"))
             {
                estatus = null;
            }
            //MUESTRA LOS QUE CUMPLAN CON LA CADENA
            if (!string.IsNullOrEmpty(unidades))
            {
                filter += " Where " + string.Format(" pt.unidad_desc like '%{0}%' or pt.unidad_abrev like '%{0}%' ", unidades);

            }

            //MUESTRA LOS ACTIVOS/IN SIN NECESIDAD DE UNA CADENA
            if (!string.IsNullOrEmpty(unidades))
            {
                if (!filter.Contains("Where"))
                {
                    filter2 += " Where " + string.Format(" pt.unidad_status = '{0}' ", estatus);
                }
                else
                {
                    filter2 += " and " + string.Format(" pt.unidad_status = '{0}' ", estatus);
                }

            }
            else
            {
                filter2 += " Where " + string.Format(" pt.unidad_status = '{0}' ", estatus);
            }


            Sql query = new Sql(@"select pt.*, p.unidTipo_desc as NombreUnidadTipo from  UNIDAD_TIPO p
                                  inner join UNIDADES pt on pt.unidad_tipo = p.unidTipo_id "
                                  + (!string.IsNullOrEmpty(unidades) ? filter : "")
                                  + (!string.IsNullOrEmpty(estatus) ? filter2 : ""));

            return _unidadesRepository.GetByDynamicFilter(query);
        }
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
