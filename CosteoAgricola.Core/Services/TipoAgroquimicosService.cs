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
    public interface ITipoAgroquimicosService
    {
        TIPO_AGROQUIMICO GetTipoAgro(int id);
        TIPO_AGROQUIMICO GetTipoAgro(string desc);
        List<TIPO_AGROQUIMICO> GetTipoAgros();
        List<dynamic> GetTipoAgroFiltro(string nombre = null, string estatus = null);
        bool InsertUpdateTipoAgro(TIPO_AGROQUIMICO tipoAgro, out string Message);
        bool EliminarTipoAgro(int id, out string Message);
    }
    public class TipoAgroquimicosService : ITipoAgroquimicosService
    {
        private readonly ITiposAgroquimicosRepository _tiposAgroquimicosRepository;

        public TipoAgroquimicosService(ITiposAgroquimicosRepository tiposAgroquimicosRepository)
        {
            _tiposAgroquimicosRepository = tiposAgroquimicosRepository;
        }

        public bool EliminarTipoAgro(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var tipo = _tiposAgroquimicosRepository.Get(id);

                _tiposAgroquimicosRepository.Remove(tipo);

                //Message = "Semilla eliminada " + semilla.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Tipo No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public TIPO_AGROQUIMICO GetTipoAgro(int id)
        {
            return _tiposAgroquimicosRepository.Get(id);
        }

        public TIPO_AGROQUIMICO GetTipoAgro(string desc)
        {
            return _tiposAgroquimicosRepository.GetTipoAgro(desc);
        }

        public List<dynamic> GetTipoAgroFiltro(string nombre = null, string estatus = null)
        {
            var filter = "";
            var filter2 = "";

            ///CUANDO NO HAY NINGUN FILTRO SE MUESTRA TODO
            if (string.IsNullOrEmpty(nombre) && estatus.Equals("false") )
            {
                estatus = null;
  
            }

            //CUANDO SOLO PONE LA DESCRIPCION (TOMA EL ESTATUS COMO FALSE)
            if (!string.IsNullOrEmpty(nombre))
            {
                filter += " Where " + string.Format(" p.tipoAgroq_desc like '%{0}%' or p.tipoAgroq_id like '%{0}%' or p.tipoAgroq_funcion like '%{0}%'", nombre);
            }

            ///CUANDO SELECCIONA ESTATUS (POR DEFAULT ES FALSE)
            if (!string.IsNullOrEmpty(estatus) && (estatus.Equals("true") || estatus.Equals("false")))
            {
                if (!filter.Contains("Where") )
                {
                    filter2 += " Where " + string.Format(" p.tipoAgroq_status = '{0}'", estatus);
                }
                else
                {
                    filter2 += " and " + string.Format(" p.tipoAgroq_status = '{0}'", estatus);
                }

            }




            Sql query = new Sql(@" SELECT * FROM TIPO_AGROQUIMICO p "
                                 + (!string.IsNullOrEmpty(nombre) ? filter : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter2 : ""));

            return _tiposAgroquimicosRepository.GetByDynamicFilter(query);
        }

        public List<TIPO_AGROQUIMICO> GetTipoAgros()
        {
            return _tiposAgroquimicosRepository.GetAll("TIPO_AGROQUIMICO").ToList();
        }

        public bool InsertUpdateTipoAgro(TIPO_AGROQUIMICO tipoAgro, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _tiposAgroquimicosRepository.InsertOrUpdate<int>(tipoAgro);

                //Message = "Semilla guardada " + semillas.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "tipoAgro No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }
    }
    }
