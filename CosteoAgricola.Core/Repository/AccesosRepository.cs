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
    public interface IAccesosRepository : IRepositoryBase<Acceso>
    {
    }

    public class AccesosRepository : RepositoryBase<Acceso>, IAccesosRepository
    {
        public AccesosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
