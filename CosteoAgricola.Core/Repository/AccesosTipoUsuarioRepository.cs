using dbconnection;
using CosteoAgricola.Core.Entities;
using CosteoAgricola.Core.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Repository
{
    public interface IAccesosTipoUsuarioRepository : IRepositoryBase<AccesosTipoUsuario>
    {
    }

    public class AccesosTipoUsuarioRepository : RepositoryBase<AccesosTipoUsuario>, IAccesosTipoUsuarioRepository
    {
        public AccesosTipoUsuarioRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
