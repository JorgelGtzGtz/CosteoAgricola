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
    public interface IAccesosTipoUsuarioRepository : IRepositoryBase<ACCESOS_TIPO_USUARIO>
    {
    }

    public class AccesosTipoUsuarioRepository : RepositoryBase<ACCESOS_TIPO_USUARIO>, IAccesosTipoUsuarioRepository
    {
        public AccesosTipoUsuarioRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
