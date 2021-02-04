using CosteoAgricola.Core.Repository;
using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface ILotesService
    {
        LOTES GetLote(int id);
        LOTES GetLote(string desc);
        List<LOTES> GetLotes();
        // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateLote(LOTES Lotes, out string Message);
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

        public LOTES GetLote(int id)
        {
            return _lotesRepository.Get(id);
        }

        public LOTES GetLote(string desc)
        {
            return _lotesRepository.GetLote(desc);
        }

        public List<LOTES> GetLotes()
        {
            return _lotesRepository.GetAll("LOTES").ToList();
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
        public bool InsertUpdateLote(LOTES lotes, out string Message)
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
