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
    public interface ISemillasRepository : IRepositoryBase<SEMILLAS>
    {
        SEMILLAS GetSemilla(int id);
        SEMILLAS GetSemilla(string desc);
        List<dynamic> GetByDynamicFilter(Sql query);
    }
    public class SemillasRepository : RepositoryBase<SEMILLAS>, ISemillasRepository
    {
        public SemillasRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }


        public SEMILLAS GetSemilla(int id)
        {
            var query = new Sql()
               .Select("*")
               .From("SEMILLAS")
               .Where("lower(sem_ID) = @0", id);

            var semilla = this.Context.SingleOrDefault<SEMILLAS>(query);

            return semilla;
        }

        public SEMILLAS GetSemilla(string desc)
        {
            var query = new Sql()
              .Select("*")
              .From("SEMILLAS")
              .Where("lower(sem_desc) = @0", desc.ToLower());

            var semilla = this.Context.SingleOrDefault<SEMILLAS>(query);

            return semilla;
        }
        public List<dynamic> GetByDynamicFilter(Sql sql)
        {
            return this.Context.Fetch<dynamic>(sql);
        }
    }
}
