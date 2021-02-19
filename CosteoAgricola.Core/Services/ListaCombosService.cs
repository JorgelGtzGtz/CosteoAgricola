using dbconnection;
using CosteoAgricola.Core.Repository;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Services
{
    public interface IListaCombosService
    {
        List<TIPO_USUARIO> GetTipoUsuarios();
        List<UNIDADE> GetTipoMedidas();
        List<UNIDAD_TIPO> GetTiposUnidades();

        List<UNIDADE> GetTipoUnidades();

    }

    public class ListaCombosService : IListaCombosService
    {
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;
        private readonly IUnidadesRepository _unidadesRepository;
        private readonly ITiposUnidadesRepository _tiposUnidadesRepository;

        public ListaCombosService(ITipoUsuarioRepository tipoUsuarioRepository, IUnidadesRepository unidadesRepository, ITiposUnidadesRepository tiposUnidadesRepository)
        {
            _tipoUsuarioRepository = tipoUsuarioRepository;
            _unidadesRepository = unidadesRepository;
            _tiposUnidadesRepository = tiposUnidadesRepository;
        }


        public List<UNIDADE> GetTipoMedidas()
        {
            Sql query = new Sql()
               .Select("*").From("UNIDADES").Where("unidad_abrev = 'Kg' or unidad_abrev = 'Gr' or unidad_abrev = 'Mg'");
            return _unidadesRepository.GetByFilter(query);
        }
        public List<UNIDADE> GetTipoUnidades()
        {
            Sql query = new Sql()
               .Select("*").From("UNIDADES");
            return _unidadesRepository.GetByFilter(query);
        }

        public List<UNIDAD_TIPO> GetTiposUnidades()
        {
            Sql query = new Sql()
                .Select("*").From("UNIDAD_TIPO");
            return _tiposUnidadesRepository.GetByFilter(query);
        }

        public List<TIPO_USUARIO> GetTipoUsuarios()
        {
            Sql query = new Sql()
                .Select("*").From("TIPO_USUARIO");
            return _tipoUsuarioRepository.GetByFilter(query);
        }


    }
}
