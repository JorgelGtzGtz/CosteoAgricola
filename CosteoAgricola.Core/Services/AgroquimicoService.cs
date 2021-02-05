using CosteoAgricola.Core.Repository;
using dbconnection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IAgroquimicoService
    {
        AGROQUIMICOS GetAgroquimico(int id);
        AGROQUIMICOS GetAgroquimico(string desc);
        List<AGROQUIMICOS> GetAgroquimicos();
        // List<dynamic> GetUnidadesFiltro(string activo = null);
        bool InsertUpdateAgroquimico(AGROQUIMICOS agroquimico, out string Message);
        bool EliminarAgroquimico(int id, out string Message);
    }
    public class AgroquimicosService : IAgroquimicoService
    {
        private readonly IAgroquimicosRepository _agroquimicosRepository;

        public AgroquimicosService(IAgroquimicosRepository agroquimicosRepository)
        {
            _agroquimicosRepository = agroquimicosRepository;
        }
        public bool EliminarAgroquimico(int id, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                var agro = _agroquimicosRepository.Get(id);

                _agroquimicosRepository.Remove(agro);

                Message = "Agroquimico eliminado " + agro.agroq_nomComercial + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Agroquimico No pudo ser eliminado Error: " + ex.Message;
            }
            return result;
        }

        public AGROQUIMICOS GetAgroquimico(int id)
        {
            return _agroquimicosRepository.Get(id);
        }

        public AGROQUIMICOS GetAgroquimico(string desc)
        {
            return _agroquimicosRepository.GetAgroquimico(desc);
        }
        public List<AGROQUIMICOS> GetAgroquimicos()
        {
            return _agroquimicosRepository.GetAll("AGROQUIMICOS").ToList();
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
        public bool InsertUpdateAgroquimico(AGROQUIMICOS agroquimicos, out string Message)
        {
            Message = string.Empty;
            bool result = false;
            try
            {
                _agroquimicosRepository.InsertOrUpdate<int>(agroquimicos);

                Message = "Agroquimico guardado " + agroquimicos.agroq_nomComercial + "con exito";
                result = true;
            }
            catch (Exception ex)
            {

                Message = "Agroquimico No pudo ser guardada Error: " + ex.Message;
            }

            return result;
        }
    }
    }
