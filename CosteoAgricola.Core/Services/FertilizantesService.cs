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
    public interface IFertilizantesService
    {
        FERTILIZANTE GetFertilizante(int id);
        FERTILIZANTE GetFertilizante(string desc);
        List<FERTILIZANTE> GetFertilizantes();
        List<dynamic> GetFertilizantesFiltro(string descripcion = null, string estado = null, string estatus = null, string inventariable = null);
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

        public List<dynamic> GetFertilizantesFiltro(string descripcion = null, string estado = null, string estatus = null, string inventariable = null)
        {
            var filter = "";
            var filter2 = "";
            var filter3 = "";
            var filter4 = "";

            ///CUANDO NO HAY NINGUN FILTRO SE MUESTRA TODO
            if (string.IsNullOrEmpty(descripcion) && string.IsNullOrEmpty(estado)
                && estatus.Equals("false") && inventariable.Equals("false"))
            {
                estatus = null;
                inventariable = null;
            }

            //CUANDO SOLO PONE LA DESCRIPCION (TOMA EL ESTATUS COMO FALSE)
            if (!string.IsNullOrEmpty(descripcion))
            {
                filter += " Where " + string.Format(" p.fert_desc like '%{0}%' or p.fert_estado like '%{0}%' or p.fert_id like '%{0}%'", descripcion);
            }

            /// CUANDO TIENE DESCRIPCION Y UN CICLO SELECCIONADO
            if (!string.IsNullOrEmpty(estado))
            {
                if (!filter.Contains("Where"))
                {
                    filter2 += " Where " + string.Format(" p.fert_estado = '{0}'", estado);
                }
                else
                {
                    filter2 += " and " + string.Format(" p.fert_estado = '{0}'", estado);
                }
            }

            ///CUANDO SELECCIONA ESTATUS (POR DEFAULT ES FALSE)
            if (!string.IsNullOrEmpty(estatus) && (estatus.Equals("true") || estatus.Equals("false")))
            {
                if (!filter.Contains("Where") && !filter2.Contains("Where"))
                {
                    filter3 += " Where " + string.Format(" p.fert_status = '{0}'", estatus);
                }
                else
                {
                    filter3 += " and " + string.Format(" p.fert_status = '{0}'", estatus);
                }

            }

            ///CUANDO SELECCIONA INVENTARIABLE (POR DEFAULT ES FALSE)
            if (!string.IsNullOrEmpty(inventariable) && (inventariable.Equals("true") || inventariable.Equals("false")))
            {
                if (!filter.Contains("Where") && !filter2.Contains("Where") && !filter3.Contains("Where"))
                {
                    filter4 += " Where " + string.Format(" p.fert_inventariables = '{0}'", inventariable);
                }
                else
                {
                    filter4 += " and " + string.Format(" p.fert_inventariable = '{0}'", inventariable);
                }

            }



            Sql query = new Sql(@" SELECT * FROM FERTILIZANTES p "
                                 + (!string.IsNullOrEmpty(descripcion) ? filter : "")
                                 + (!string.IsNullOrEmpty(estado) ? filter2 : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter3 : "")
                                 + (!string.IsNullOrEmpty(inventariable) ? filter4 : ""));

            return _fertilizantesRepository.GetByDynamicFilter(query);
        }

        
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
