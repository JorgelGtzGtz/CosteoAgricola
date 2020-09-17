using dbconnection;
using CosteoAgricola.Core.Factories;

namespace CosteoAgricola.Core.Repository
{
    public interface ITipoUsuarioRepository : IRepositoryBase<TiposUsuario>
    {
    }

    public class TipoUsuarioRepository : RepositoryBase<TiposUsuario>, ITipoUsuarioRepository
    {
        public TipoUsuarioRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
