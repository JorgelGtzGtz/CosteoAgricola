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
    }

    public class ListaCombosService : IListaCombosService
    {
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;

        public ListaCombosService(ITipoUsuarioRepository tipoUsuarioRepository)
        {
            _tipoUsuarioRepository = tipoUsuarioRepository;
        }

        public List<TIPO_USUARIO> GetTipoUsuarios()
        {
            Sql query = new Sql()
                .Select("*").From("TIPO_USUARIO");
            return _tipoUsuarioRepository.GetByFilter(query);
        }


    }
}
