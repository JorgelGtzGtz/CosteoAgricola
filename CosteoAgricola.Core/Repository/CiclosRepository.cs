using CosteoAgricola.Core.Factories;
using dbconnection;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosteoAgricola.Core.Repository
{
    public interface ICiclosRepository : IRepositoryBase<CICLO>
    {
        CICLO GetCiclo(int id);
        CICLO GetCiclo(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class CiclosRepository : RepositoryBase<CICLO>, ICiclosRepository
    {
        public CiclosRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public CICLO GetCiclo(int id)
        {
            var query = new Sql()
               .Select("*")
               .From("CICLO")
               .Where("lower(ciclo_id) = @0", id);

            var ciclo = this.Context.SingleOrDefault<CICLO>(query);

            return ciclo;
        }

        public CICLO GetCiclo(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("CICLO")
              .Where("lower(ciclo_descripcion) = @0", desc.ToLower());

            var ciclo = this.Context.SingleOrDefault<CICLO>(query);

            return ciclo;
        }
        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
