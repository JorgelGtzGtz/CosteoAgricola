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
    public interface IAccesosRepository : IRepositoryBase<ACCESO>
    {
    }

    public class AccesosRepository : RepositoryBase<ACCESO>, IAccesosRepository
    {
        public AccesosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
