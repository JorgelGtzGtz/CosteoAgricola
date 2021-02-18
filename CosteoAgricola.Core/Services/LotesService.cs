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
    public interface ILotesService
    {
        LOTE GetLote(int id);
        LOTE GetLote(string desc);
        List<LOTE> GetLotes();
        List<dynamic> GetLotesFiltro(string estatus = null, string hectarea1 = null, string hectarea2 = null);
        bool InsertUpdateLote(LOTE Lotes, out string Message);
        bool EliminarLote(int id, out string Message);
    }

    public class LotesService : ILotesService
    {
        private readonly ILotesRepository _lotesRepository;

        public LotesService(ILotesRepository lotesRepository)
        {
            _lotesRepository = lotesRepository;
        }

        public bool EliminarLote(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var item = _lotesRepository.Get(id);

                _lotesRepository.Remove(item);

                Message = "Lote eliminado " + item.lote_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Lote No pudo ser eliminada Error: " + ex.Message;
            }
            return result;
        }

        public LOTE GetLote(int id)
        {
            return _lotesRepository.Get(id);
        }

        public LOTE GetLote(string desc)
        {
            return _lotesRepository.GetLote(desc);
        }

        public List<LOTE> GetLotes()
        {
            return _lotesRepository.GetAll("LOTES").ToList();
        }

        public List<dynamic> GetLotesFiltro(string estatus, string hectarea1, string hectarea2)
        {
            Sql query = null;

            if (!string.IsNullOrEmpty(hectarea1) && !string.IsNullOrEmpty(hectarea2))
            {

                query = Sql.Builder.Append(";EXEC sp_filtroRango @0, @1, @2", hectarea1, hectarea2, estatus);
            }
            else
            {
                query = new Sql("Select * from lotes");

            }

            return _lotesRepository.GetByDynamicFilter(query);
        }
        public bool InsertUpdateLote(LOTE lotes, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _lotesRepository.InsertOrUpdate<int>(lotes);

                Message = "Lote guardado " + lotes.lote_descripcion + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Lote No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }
    }
}
