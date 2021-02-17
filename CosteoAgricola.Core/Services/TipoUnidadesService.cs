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
    public interface ITipoUnidadesService
    {
        UNIDAD_TIPO GetUnidadTipo(int id);
        UNIDAD_TIPO GetUnidadTipo(string desc);
        List<UNIDAD_TIPO> GetUnidadesTipo();
    }

    public class TipoUnidadesService : ITipoUnidadesService
    {
        private readonly ITiposUnidadesRepository _tipoUnidadesRepository;

        public TipoUnidadesService(ITiposUnidadesRepository tipoUnidadesRepository)
        {
            _tipoUnidadesRepository = tipoUnidadesRepository;
        }


        public UNIDAD_TIPO GetUnidadTipo(int id)
        {
            return _tipoUnidadesRepository.Get(id);
        }

        public UNIDAD_TIPO GetUnidadTipo(string desc)
        {
            return _tipoUnidadesRepository.GetUnidadTipo(desc);
        }

        public List<UNIDAD_TIPO> GetUnidadesTipo()
        {
            return _tipoUnidadesRepository.GetAll("UNIDAD_TIPO").ToList();
        }

       

    }
}
