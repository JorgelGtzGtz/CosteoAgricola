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

    }

    public class ListaCombosService : IListaCombosService
    {
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;
        private readonly IUnidadesRepository _unidadesRepository;

        public ListaCombosService(ITipoUsuarioRepository tipoUsuarioRepository, IUnidadesRepository unidadesRepository)
        {
            _tipoUsuarioRepository = tipoUsuarioRepository;
            _unidadesRepository = unidadesRepository;
        }


        public List<UNIDADE> GetTipoMedidas()
        {
            Sql query = new Sql()
               .Select("*").From("UNIDADES").Where("unidad_abrev = 'Kg' or unidad_abrev = 'Gr' or unidad_abrev = 'Mg'");
            return _unidadesRepository.GetByFilter(query);
        }

        public List<TIPO_USUARIO> GetTipoUsuarios()
        {
            Sql query = new Sql()
                .Select("*").From("TIPO_USUARIO");
            return _tipoUsuarioRepository.GetByFilter(query);
        }


    }
}
