using dbconnection;
using CosteoAgricola.Core.Factories;

namespace CosteoAgricola.Core.Repository
{
    public interface ITipoUsuarioRepository : IRepositoryBase<TIPO_USUARIO>
    {
    }

    public class TipoUsuarioRepository : RepositoryBase<TIPO_USUARIO>, ITipoUsuarioRepository
    {
        public TipoUsuarioRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
