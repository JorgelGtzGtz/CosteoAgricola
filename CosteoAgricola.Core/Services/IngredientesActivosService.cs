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
    public interface IIngredientesActivosService
    {
        INGREDIENTES_ACTIVO GetIngrediente(int id);
        INGREDIENTES_ACTIVO GetIngrediente(string desc);
        List<INGREDIENTES_ACTIVO> GetIngredientes();
        List<dynamic> GetIngredienteFiltro(string nombre = null, string estatus = null);
        bool InsertUpdateIngrediente(INGREDIENTES_ACTIVO ingrediente, out string Message);
        bool EliminarIngrediente(int id, out string Message);
    }

    public class IngredientesActivosService : IIngredientesActivosService
    {
        private readonly IIngredientesActivosRepository _ingredientesActivosRepository;

        public IngredientesActivosService(IIngredientesActivosRepository ingredientesActivosRepository)
        {
            _ingredientesActivosRepository = ingredientesActivosRepository;
        }

        public bool EliminarIngrediente(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var tipo = _ingredientesActivosRepository.Get(id);

                _ingredientesActivosRepository.Remove(tipo);

                //Message = "Semilla eliminada " + semilla.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Ingrediente No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public INGREDIENTES_ACTIVO GetIngrediente(int id)
        {
            return _ingredientesActivosRepository.Get(id);
        }

        public INGREDIENTES_ACTIVO GetIngrediente(string desc)
        {
            return _ingredientesActivosRepository.GetIngrediente(desc);
        }

        public List<dynamic> GetIngredienteFiltro(string nombre = null, string estatus = null)
        {
            var filter = "";
            var filter2 = "";

            ///CUANDO NO HAY NINGUN FILTRO SE MUESTRA TODO
            if (string.IsNullOrEmpty(nombre) && estatus.Equals("false"))
            {
                estatus = null;

            }

            //CUANDO SOLO PONE LA DESCRIPCION (TOMA EL ESTATUS COMO FALSE)
            if (!string.IsNullOrEmpty(nombre))
            {
                filter += " Where " + string.Format(" i.ingredAct_desc like '%{0}%' or i.ingredAct_id like '%{0}%' or i.unidad_ID like '%{0}%'", nombre);
            }

            ///CUANDO SELECCIONA ESTATUS (POR DEFAULT ES FALSE)
            if (!string.IsNullOrEmpty(estatus) && (estatus.Equals("true") || estatus.Equals("false")))
            {
                if (!filter.Contains("Where"))
                {
                    filter2 += " Where " + string.Format(" i.ingredAct_status = '{0}'", estatus);
                }
                else
                {
                    filter2 += " and " + string.Format(" i.ingredAct_status = '{0}'", estatus);
                }

            }




            Sql query = new Sql(@" select i.*, u.unidad_abrev as NombreUnidad from  UNIDADES u
                                    inner join INGREDIENTES_ACTIVOS i on i.unidad_ID = u.unidad_id"
                                 + (!string.IsNullOrEmpty(nombre) ? filter : "")
                                 + (!string.IsNullOrEmpty(estatus) ? filter2 : ""));

            return _ingredientesActivosRepository.GetByDynamicFilter(query);
        }

        public List<INGREDIENTES_ACTIVO> GetIngredientes()
        {
            return _ingredientesActivosRepository.GetAll("INGREDIENTES_ACTIVOS").ToList();
        }

        public bool InsertUpdateIngrediente(INGREDIENTES_ACTIVO ingrediente, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _ingredientesActivosRepository.InsertOrUpdate<int>(ingrediente);

                //Message = "Semilla guardada " + semillas.sem_desc + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "ingrediente No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }
    }
    }
